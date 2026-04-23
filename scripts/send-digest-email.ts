#!/usr/bin/env bun

import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import nodemailer from "nodemailer";

type DigestType = "legislative" | "newsletter" | "papers";

interface DigestSummary {
  file: string;
  title: string;
  type: DigestType;
  date: string;
  periodStart?: string;
  periodEnd?: string;
  sourcesCited?: number;
  editorNote?: string;
  snippet: string;
  highlights: string[];
  siteUrl: string;
  githubUrl: string;
}

interface TypeColorSet {
  text: string;
  bg: string;
  border: string;
}

const TYPE_LABEL: Record<DigestType, string> = {
  legislative: "Legislative",
  newsletter: "Newsletter",
  papers: "Papers",
};

const TYPE_ORDER: Record<DigestType, number> = {
  legislative: 0,
  newsletter: 1,
  papers: 2,
};

const TYPE_COLORS: Record<DigestType, TypeColorSet> = {
  legislative: {
    text: "#3d6690",
    bg: "#e1e2ef",
    border: "#9ab2cc",
  },
  newsletter: {
    text: "#700c8c",
    bg: "#f4e4f7",
    border: "#d6addf",
  },
  papers: {
    text: "#5b7b7a",
    bg: "#e3ebea",
    border: "#abc2bf",
  },
};

const REPO_ROOT = path.resolve(import.meta.dir, "..");

function parseBool(value: string | undefined, fallback = false): boolean {
  if (value === undefined) return fallback;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function stripMarkdown(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normaliseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function formatDate(dateIso: string): string {
  const value = new Date(dateIso);
  return value.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function extractHighlights(body: string): string[] {
  const titles: string[] = [];
  const headingRe = /^###\s+(.+?)\s*$/gm;
  let match: RegExpExecArray | null;
  while ((match = headingRe.exec(body)) !== null && titles.length < 3) {
    titles.push(match[1].replace(/\s+/g, " ").trim());
  }
  return titles;
}

function coerceIsoDate(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim().length >= 10) {
    return value.slice(0, 10);
  }
  return undefined;
}

function resolveSiteUrl(type: DigestType, date: string): string {
  const configured = process.env.POLICY_TRACKER_SITE_URL?.trim();
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "policy-tracker";
  const owner = process.env.GITHUB_REPOSITORY_OWNER ?? "unknown";
  const baseUrl = configured && configured.length > 0
    ? configured
    : `https://${owner}.github.io/${repo}`;

  return `${normaliseUrl(baseUrl)}/digests/${type}/${date}/`;
}

function resolveGitHubUrl(file: string): string {
  const server = process.env.GITHUB_SERVER_URL ?? "https://github.com";
  const repo = process.env.GITHUB_REPOSITORY ?? "";
  return `${normaliseUrl(server)}/${repo}/blob/main/${file}`;
}

function resolveBaseSiteUrl(): string {
  return normaliseUrl(
    process.env.POLICY_TRACKER_SITE_URL?.trim() ||
      `https://${process.env.GITHUB_REPOSITORY_OWNER ?? "unknown"}.github.io/${process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "policy-tracker"}`,
  );
}

function resolveLogoUrl(): string {
  return `${resolveBaseSiteUrl()}/brand/saferai-logo.png`;
}

function collectInputFiles(argv: string[]): { dryRun: boolean; files: string[] } {
  const dryRun = argv.includes("--dry-run");
  const files = argv
    .filter((arg) => arg !== "--dry-run")
    .flatMap((arg) => arg.split(","))
    .map((arg) => arg.trim())
    .filter(Boolean);

  if (files.length > 0) return { dryRun, files };

  const envFiles = process.env.CHANGED_DIGEST_FILES
    ?.split(/\r?\n|,/)
    .map((value) => value.trim())
    .filter(Boolean) ?? [];

  return { dryRun, files: envFiles };
}

async function loadDigest(file: string): Promise<DigestSummary | null> {
  if (!file.startsWith("content/") || !file.endsWith(".md")) return null;

  const absPath = path.join(REPO_ROOT, file);
  let raw: string;
  try {
    raw = await readFile(absPath, "utf8");
  } catch (error) {
    console.warn(`Could not read ${file}: ${(error as Error).message}`);
    return null;
  }
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;

  const type = data.type;
  const title = data.title;
  const dateValue = coerceIsoDate(data.date);

  if (
    (type !== "legislative" && type !== "newsletter" && type !== "papers") ||
    typeof title !== "string" ||
    !dateValue
  ) {
    return null;
  }

  const snippetSource =
    typeof data.editor_note === "string" && data.editor_note.trim().length > 0
      ? data.editor_note.trim()
      : stripMarkdown(parsed.content).slice(0, 280).trim();

  const snippet =
    snippetSource.length > 280
      ? `${snippetSource.slice(0, 277).trimEnd()}...`
      : snippetSource;

  const periodStart = coerceIsoDate(data.period_start);
  const periodEnd = coerceIsoDate(data.period_end);
  const sourcesCited =
    typeof data.sources_cited === "number" ? data.sources_cited : undefined;
  const editorNote =
    typeof data.editor_note === "string" ? data.editor_note.trim() : undefined;

  return {
    file,
    title: title.trim(),
    type,
    date: dateValue,
    periodStart,
    periodEnd,
    sourcesCited,
    editorNote,
    snippet,
    highlights: extractHighlights(parsed.content),
    siteUrl: resolveSiteUrl(type, dateValue),
    githubUrl: resolveGitHubUrl(file),
  };
}

function byDigestOrder(a: DigestSummary, b: DigestSummary): number {
  if (a.date !== b.date) return b.date.localeCompare(a.date);
  return TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
}

function buildSubject(digests: DigestSummary[]): string {
  if (digests.length === 1) {
    return `Policy Tracker updated: ${digests[0].title}`;
  }

  const uniqueDates = [...new Set(digests.map((digest) => digest.date))];
  if (uniqueDates.length === 1) {
    return `Policy Tracker updated: ${digests.length} digests for ${formatDate(uniqueDates[0])}`;
  }

  return `Policy Tracker updated: ${digests.length} new digests`;
}

function buildTextBody(digests: DigestSummary[]): string {
  const intro = digests.length === 1
    ? "A new Policy Tracker digest is live."
    : `${digests.length} Policy Tracker digests are live.`;

  const blocks = digests.map((digest) => {
    const lines = [
      `${TYPE_LABEL[digest.type]}: ${digest.title}`,
      `Date: ${formatDate(digest.date)}`,
    ];

    if (digest.periodStart && digest.periodEnd) {
      lines.push(
        `Coverage: ${formatDate(digest.periodStart)} to ${formatDate(digest.periodEnd)}`,
      );
    }
    if (digest.sourcesCited !== undefined) {
      lines.push(`Sources cited: ${digest.sourcesCited}`);
    }
    lines.push(`Summary: ${digest.editorNote ?? digest.snippet}`);
    if (digest.highlights.length > 0) {
      lines.push("Highlights:");
      for (const highlight of digest.highlights) {
        lines.push(`- ${highlight}`);
      }
    }
    lines.push(`Read on site: ${digest.siteUrl}`);
    lines.push(`View in GitHub: ${digest.githubUrl}`);
    return lines.join("\n");
  });

  return [
    intro,
    "",
    ...blocks.flatMap((block) => [block, ""]),
    "Archive:",
    `${resolveBaseSiteUrl()}/archive/`,
  ].join("\n");
}

function buildHtmlBody(subject: string, digests: DigestSummary[]): string {
  const intro = digests.length === 1
    ? "A new Policy Tracker digest is live."
    : `${digests.length} Policy Tracker digests are live.`;
  const homeUrl = resolveBaseSiteUrl();
  const archiveUrl = `${homeUrl}/archive/`;
  const logoUrl = resolveLogoUrl();

  const cards = digests.map((digest) => {
    const colors = TYPE_COLORS[digest.type];
    const meta: string[] = [
      `<strong>${escapeHtml(TYPE_LABEL[digest.type])}</strong>`,
      escapeHtml(formatDate(digest.date)),
    ];

    if (digest.periodStart && digest.periodEnd) {
      meta.push(
        `Covering ${escapeHtml(formatDate(digest.periodStart))} to ${escapeHtml(formatDate(digest.periodEnd))}`,
      );
    }
    if (digest.sourcesCited !== undefined) {
      meta.push(`${digest.sourcesCited} sources`);
    }

    const highlights = digest.highlights.length > 0
      ? `<ul style="margin:0.85rem 0 0 1.15rem;padding:0;color:#202137;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.55;">${digest.highlights
          .map((highlight) => `<li style="margin:0.3rem 0;">${escapeHtml(highlight)}</li>`)
          .join("")}</ul>`
      : "";

    return `
      <section style="border:1px solid #e5e3e0;border-radius:4px;padding:22px 24px 24px;margin:0 0 18px;background:#ffffff;">
        <div style="font-size:12px;color:#5a5a6a;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.08em;font-family:Inter,Arial,sans-serif;">${meta.join(" · ")}</div>
        <div style="margin:0 0 12px;">
          <span style="display:inline-block;color:${colors.text};background:${colors.bg};border:1px solid ${colors.border};padding:4px 10px;border-radius:2px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;font-family:Inter,Arial,sans-serif;">
            ${escapeHtml(TYPE_LABEL[digest.type])}
          </span>
        </div>
        <h2 style="font-size:29px;line-height:1.12;margin:0 0 12px;font-family:'Source Serif 4',Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-0.01em;">
          <a href="${escapeHtml(digest.siteUrl)}" style="color:#202137;text-decoration:none;">${escapeHtml(digest.title)}</a>
        </h2>
        <p style="margin:0;color:#5a5a6a;line-height:1.6;font-size:15px;font-family:Inter,Arial,sans-serif;">${escapeHtml(digest.editorNote ?? digest.snippet)}</p>
        ${highlights}
        <p style="margin:16px 0 0;">
          <a href="${escapeHtml(digest.siteUrl)}" style="display:inline-block;background:#5b86b5;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:2px;font-weight:600;font-family:Inter,Arial,sans-serif;">Read digest</a>
          <a href="${escapeHtml(digest.githubUrl)}" style="display:inline-block;margin-left:10px;color:#3d6690;font-family:Inter,Arial,sans-serif;">View source</a>
        </p>
      </section>
    `;
  });

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body style="margin:0;padding:24px;background:#f9f8f8;color:#202137;">
        <div style="max-width:760px;margin:0 auto;">
          <header style="margin:0 0 28px;">
            <div style="background:rgba(255,255,255,0.92);border:1px solid #e5e3e0;padding:14px 20px;">
              <a href="${escapeHtml(homeUrl)}" style="display:inline-flex;align-items:center;gap:12px;text-decoration:none;">
                <img src="${escapeHtml(logoUrl)}" alt="SaferAI" style="height:40px;width:auto;display:block;" />
                <span style="color:#5a5a6a;font-size:14px;font-family:Inter,Arial,sans-serif;padding-left:12px;margin-left:4px;border-left:1px solid #e5e3e0;">Policy Tracker</span>
              </a>
            </div>
            <div style="padding:26px 0 8px;">
              <div style="display:flex;align-items:center;gap:0;margin-bottom:30px;">
                <div style="flex:1;border-top:1px solid #1a1a24;"></div>
                <span style="font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#5a5a6a;padding:0 0 0 12px;white-space:nowrap;">
                  Weekly Issue
                  <strong style="background:#5b86b5;color:#ffffff;padding:5px 11px;margin-left:8px;font-weight:500;font-size:11px;letter-spacing:0.14em;display:inline-block;">Email Update</strong>
                </span>
              </div>
              <h1 style="margin:0 0 12px;font-size:42px;line-height:1.02;color:#202137;font-family:'Source Serif 4',Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-0.02em;">${escapeHtml(subject)}</h1>
              <p style="margin:0;max-width:60ch;color:#5a5a6a;line-height:1.55;font-size:17px;font-family:Inter,Arial,sans-serif;">${escapeHtml(intro)}</p>
            </div>
          </header>
          ${cards.join("")}
          <footer style="border-top:1px solid #e5e3e0;padding-top:18px;font-size:13px;color:#5a5a6a;font-family:Inter,Arial,sans-serif;">
            <p style="margin:0 0 8px;">SaferAI — generated by Claude Code Routines.</p>
            <p style="margin:0 0 8px;">This email was sent automatically after new digest content landed on <code style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;background:#ffffff;border:1px solid #e5e3e0;padding:2px 6px;border-radius:2px;">main</code>.</p>
            <p style="margin:0;"><a href="${escapeHtml(archiveUrl)}" style="color:#3d6690;">Browse the archive</a></p>
          </footer>
        </div>
      </body>
    </html>
  `;
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function sendEmail(subject: string, text: string, html: string): Promise<void> {
  const host = requiredEnv("POLICY_TRACKER_SMTP_HOST");
  const from = requiredEnv("POLICY_TRACKER_EMAIL_FROM");
  const to = requiredEnv("POLICY_TRACKER_EMAIL_TO");
  const port = Number.parseInt(process.env.POLICY_TRACKER_SMTP_PORT ?? "587", 10);
  const secure = parseBool(process.env.POLICY_TRACKER_SMTP_SECURE, port === 465);
  const user = process.env.POLICY_TRACKER_SMTP_USER?.trim();
  const pass = process.env.POLICY_TRACKER_SMTP_PASS?.trim();
  const replyTo = process.env.POLICY_TRACKER_EMAIL_REPLY_TO?.trim();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth:
      user && pass
        ? {
            user,
            pass,
          }
        : undefined,
  });

  await transporter.verify();

  const info = await transporter.sendMail({
    from,
    to,
    replyTo: replyTo || undefined,
    subject,
    text,
    html,
  });

  console.log(`message_id=${info.messageId}`);
  console.log(`accepted=${(info.accepted ?? []).join(",")}`);
  if ((info.rejected ?? []).length > 0) {
    console.log(`rejected=${info.rejected.join(",")}`);
  }
}

export async function main(argv: string[] = process.argv.slice(2)): Promise<number> {
  const { dryRun, files } = collectInputFiles(argv);
  const uniqueFiles = [...new Set(files)];

  if (uniqueFiles.length === 0) {
    console.log("No digest files supplied; skipping email.");
    return 0;
  }

  const digests = (
    await Promise.all(uniqueFiles.map(async (file) => loadDigest(file)))
  )
    .filter((digest): digest is DigestSummary => digest !== null)
    .sort(byDigestOrder);

  if (digests.length === 0) {
    console.log("No valid digest markdown files found; skipping email.");
    return 0;
  }

  const subject = buildSubject(digests);
  const text = buildTextBody(digests);
  const html = buildHtmlBody(subject, digests);

  console.log(`digests=${digests.length}`);
  console.log(`subject=${subject}`);
  for (const digest of digests) {
    console.log(`file=${digest.file}`);
  }

  if (dryRun) {
    console.log("--- TEXT PREVIEW ---");
    console.log(text);
    return 0;
  }

  await sendEmail(subject, text, html);
  return 0;
}

if (import.meta.main) {
  const code = await main();
  process.exit(code);
}
