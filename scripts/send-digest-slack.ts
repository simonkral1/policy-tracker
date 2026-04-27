#!/usr/bin/env bun

import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

type DigestType = "legislative" | "newsletter" | "papers";

interface DigestSummary {
  file: string;
  title: string;
  type: DigestType;
  date: string;
  periodStart?: string;
  periodEnd?: string;
  sourcesCited?: number;
  snippet: string;
  highlights: string[];
  siteUrl: string;
}

interface SlackResponse {
  ok: boolean;
  error?: string;
  channel?: { id?: string };
  user?: { id?: string };
  ts?: string;
  [key: string]: unknown;
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

const REPO_ROOT = path.resolve(import.meta.dir, "..");

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

function cleanDigestTitle(value: string): string {
  return value
    .replace(/\s*🆕\s*NEW\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
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

function formatDate(dateIso: string): string {
  const value = new Date(dateIso);
  return value.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function resolveBaseSiteUrl(): string {
  return (
    process.env.POLICY_TRACKER_SITE_URL?.trim().replace(/\/$/, "") ||
    `https://${process.env.GITHUB_REPOSITORY_OWNER ?? "unknown"}.github.io/${process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "policy-tracker"}`
  );
}

function resolveSiteUrl(type: DigestType, date: string): string {
  return `${resolveBaseSiteUrl()}/digests/${type}/${date}/`;
}

function extractHighlights(body: string): string[] {
  const titles: string[] = [];
  const headingRe = /^###\s+(.+?)\s*$/gm;
  let match: RegExpExecArray | null;
  while ((match = headingRe.exec(body)) !== null && titles.length < 3) {
    titles.push(cleanDigestTitle(match[1]));
  }
  return titles;
}

function buildPublicSnippet(body: string, highlights: string[]): string {
  if (highlights.length > 0) {
    return `Top items: ${highlights.slice(0, 3).join("; ")}.`;
  }

  const stripped = stripMarkdown(body);
  return stripped.length > 280
    ? `${stripped.slice(0, 277).trimEnd()}...`
    : stripped;
}

function collectInputFiles(argv: string[]): { dryRun: boolean; files: string[] } {
  const dryRun = argv.includes("--dry-run");
  const files = argv
    .filter((arg) => arg !== "--dry-run")
    .flatMap((arg) => arg.split(","))
    .map((arg) => arg.trim())
    .filter(Boolean);

  if (files.length > 0) return { dryRun, files };

  const envFiles =
    process.env.CHANGED_DIGEST_FILES?.split(/\r?\n|,/)
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
  const date = coerceIsoDate(data.date);

  if (
    (type !== "legislative" && type !== "newsletter" && type !== "papers") ||
    typeof title !== "string" ||
    !date
  ) {
    return null;
  }

  const highlights = extractHighlights(parsed.content);

  return {
    file,
    title: cleanDigestTitle(title),
    type,
    date,
    periodStart: coerceIsoDate(data.period_start),
    periodEnd: coerceIsoDate(data.period_end),
    sourcesCited:
      typeof data.sources_cited === "number" ? data.sources_cited : undefined,
    snippet: buildPublicSnippet(parsed.content, highlights),
    highlights,
    siteUrl: resolveSiteUrl(type, date),
  };
}

function byDigestOrder(a: DigestSummary, b: DigestSummary): number {
  if (a.date !== b.date) return b.date.localeCompare(a.date);
  return TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
}

function buildSlackText(digests: DigestSummary[]): string {
  const dates = [...new Set(digests.map((digest) => digest.date))];
  if (digests.length === 1) {
    return `Policy Tracker updated: ${digests[0].title}`;
  }
  if (dates.length === 1) {
    return `Policy Tracker updated: ${digests.length} digests for ${formatDate(dates[0])}`;
  }
  return `Policy Tracker updated: ${digests.length} new digests`;
}

function buildSlackBlocks(digests: DigestSummary[]): unknown[] {
  const introMessage = process.env.POLICY_TRACKER_SLACK_INTRO_MESSAGE?.trim();
  const blocks: unknown[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: buildSlackText(digests),
        emoji: false,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${digests.length === 1 ? "A new digest is live." : `${digests.length} digests are live.`}\n<${resolveBaseSiteUrl()}/archive/|Browse archive>`,
      },
    },
  ];

  if (introMessage) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: introMessage,
      },
    });
  }

  blocks.push({ type: "divider" });

  for (const digest of digests) {
    const meta = [
      `*${TYPE_LABEL[digest.type]}*`,
      formatDate(digest.date),
      digest.sourcesCited === undefined ? null : `${digest.sourcesCited} sources`,
    ].filter(Boolean);

    const highlights =
      digest.highlights.length > 0
        ? `\n*Highlights:*\n${digest.highlights.map((item) => `• ${item}`).join("\n")}`
        : "";

    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${meta.join(" · ")}\n*<${digest.siteUrl}|${digest.title}>*\n${digest.snippet}${highlights}`,
      },
    });
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "Read digest", emoji: false },
          url: digest.siteUrl,
        },
      ],
    });
  }

  return blocks.slice(0, 50);
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function slackApi(
  method: string,
  token: string,
  payload: Record<string, unknown>,
): Promise<SlackResponse> {
  const response = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as SlackResponse;
  if (!data.ok) {
    throw new Error(`${method} failed: ${data.error ?? "unknown_error"}`);
  }
  return data;
}

async function resolveSlackUserId(token: string): Promise<string> {
  const configured = process.env.POLICY_TRACKER_SLACK_USER_ID?.trim();
  if (configured) return configured;

  const email = process.env.POLICY_TRACKER_SLACK_USER_EMAIL?.trim() || "simon@safer-ai.org";
  const data = await slackApi("users.lookupByEmail", token, { email });
  if (!data.user?.id) {
    throw new Error(`users.lookupByEmail did not return a user id for ${email}`);
  }
  return data.user.id;
}

async function sendSlackDm(digests: DigestSummary[]): Promise<void> {
  const token = requiredEnv("POLICY_TRACKER_SLACK_TOKEN");
  const configuredChannelId = process.env.POLICY_TRACKER_SLACK_CHANNEL_ID?.trim();
  let channelId = configuredChannelId;

  if (!channelId) {
    const userId = await resolveSlackUserId(token);
    const conversation = await slackApi("conversations.open", token, {
      users: userId,
    });
    channelId = conversation.channel?.id;
    if (!channelId) {
      throw new Error("conversations.open did not return a channel id");
    }
  }

  const message = await slackApi("chat.postMessage", token, {
    channel: channelId,
    text: buildSlackText(digests),
    blocks: buildSlackBlocks(digests),
    unfurl_links: false,
    unfurl_media: false,
  });

  console.log(`channel=${channelId}`);
  console.log(`ts=${message.ts ?? ""}`);
}

export async function main(argv: string[] = process.argv.slice(2)): Promise<number> {
  const { dryRun, files } = collectInputFiles(argv);
  const uniqueFiles = [...new Set(files)];

  if (uniqueFiles.length === 0) {
    console.log("No digest files supplied; skipping Slack notification.");
    return 0;
  }

  const digests = (
    await Promise.all(uniqueFiles.map((file) => loadDigest(file)))
  )
    .filter((digest): digest is DigestSummary => digest !== null)
    .sort(byDigestOrder);

  if (digests.length === 0) {
    console.log("No valid digest markdown files found; skipping Slack notification.");
    return 0;
  }

  console.log(`digests=${digests.length}`);
  console.log(`text=${buildSlackText(digests)}`);
  for (const digest of digests) console.log(`file=${digest.file}`);

  if (dryRun) {
    console.log("--- BLOCK PREVIEW ---");
    console.log(JSON.stringify(buildSlackBlocks(digests), null, 2));
    return 0;
  }

  await sendSlackDm(digests);
  return 0;
}

if (import.meta.main) {
  const code = await main();
  process.exit(code);
}
