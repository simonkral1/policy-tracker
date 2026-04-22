#!/usr/bin/env bun
/**
 * validate-content.ts
 *
 * Walks `content/YYYY-MM-DD/` directories and validates every `*.md` digest:
 *   - frontmatter has date (ISO), type (legislative|newsletter|papers), non-empty title
 *   - optional period_start / period_end are ISO, sources_cited is a number, editor_note is a string
 *   - directory name matches frontmatter date
 *   - filename matches type (legislative-digest.md, newsletter-digest.md, paper-tracking.md)
 *   - body ≥ 50 stripped chars
 *   - legislative digests contain all five required section headings
 *
 * Exit codes:
 *   0 — clean
 *   1 — any file had at least one error
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// ---------- ANSI ----------
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  dim: "\x1b[2m",
};
const tty = process.stdout.isTTY;
const paint = (c: string, s: string) => (tty ? `${c}${s}${C.reset}` : s);
const ok = (s: string) => paint(C.green, s);
const err = (s: string) => paint(C.red, s);
const warn = (s: string) => paint(C.yellow, s);
const dim = (s: string) => paint(C.dim, s);

// ---------- Constants ----------
const REPO_ROOT = path.resolve(import.meta.dir, "..");
const CONTENT_DIR = path.join(REPO_ROOT, "content");

const TYPE_TO_FILENAME: Record<string, string> = {
  legislative: "legislative-digest.md",
  newsletter: "newsletter-digest.md",
  papers: "paper-tracking.md",
};

const VALID_TYPES = new Set(Object.keys(TYPE_TO_FILENAME));

const LEGISLATIVE_REQUIRED_HEADINGS = [
  "🔴 ACT NOW",
  "🟡 ON THE RADAR",
  "🟢 PIPELINE WATCH",
  "📅 EVENTS & HEARINGS",
  "💡 EDITORIAL NOTE",
];

const DATE_DIR_RE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T.*)?$/;

// ---------- Helpers ----------
function isIsoDate(v: unknown): v is string {
  if (typeof v !== "string") return false;
  if (!ISO_DATE_RE.test(v)) return false;
  const t = Date.parse(v);
  return !Number.isNaN(t);
}

function stripMarkdown(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_`~\-\[\]\(\)!|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

interface FileReport {
  file: string;
  errors: string[];
}

async function validateMarkdownFile(
  dirName: string,
  fileName: string,
  absPath: string,
): Promise<FileReport> {
  const rel = path.relative(REPO_ROOT, absPath);
  const errors: string[] = [];

  let raw: string;
  try {
    raw = await readFile(absPath, "utf8");
  } catch (e) {
    return { file: rel, errors: [`could not read: ${(e as Error).message}`] };
  }

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(raw);
  } catch (e) {
    return {
      file: rel,
      errors: [`frontmatter parse error: ${(e as Error).message}`],
    };
  }

  const fm = parsed.data as Record<string, unknown>;
  const body = parsed.content ?? "";

  // date
  const dateVal = fm.date;
  const dateStr =
    dateVal instanceof Date
      ? dateVal.toISOString().slice(0, 10)
      : typeof dateVal === "string"
        ? dateVal
        : undefined;
  if (dateStr === undefined) {
    errors.push("frontmatter.date missing");
  } else if (!isIsoDate(dateStr)) {
    errors.push(`frontmatter.date not ISO-parseable: ${String(dateVal)}`);
  } else {
    const dirDateStr = dateStr.slice(0, 10);
    if (dirDateStr !== dirName) {
      errors.push(
        `directory ${dirName} does not match frontmatter date ${dirDateStr}`,
      );
    }
  }

  // type
  const typeVal = fm.type;
  if (typeof typeVal !== "string" || !VALID_TYPES.has(typeVal)) {
    errors.push(
      `frontmatter.type must be one of legislative|newsletter|papers (got: ${String(typeVal)})`,
    );
  } else {
    const expected = TYPE_TO_FILENAME[typeVal];
    if (fileName !== expected) {
      errors.push(
        `filename ${fileName} does not match type ${typeVal} (expected ${expected})`,
      );
    }
  }

  // title
  if (typeof fm.title !== "string" || fm.title.trim().length === 0) {
    errors.push("frontmatter.title missing or empty");
  }

  // optional period_start / period_end
  if (fm.period_start !== undefined) {
    const v =
      fm.period_start instanceof Date
        ? fm.period_start.toISOString()
        : fm.period_start;
    if (!isIsoDate(v as string)) {
      errors.push(
        `frontmatter.period_start not ISO-parseable: ${String(fm.period_start)}`,
      );
    }
  }
  if (fm.period_end !== undefined) {
    const v =
      fm.period_end instanceof Date
        ? fm.period_end.toISOString()
        : fm.period_end;
    if (!isIsoDate(v as string)) {
      errors.push(
        `frontmatter.period_end not ISO-parseable: ${String(fm.period_end)}`,
      );
    }
  }

  // optional sources_cited
  if (fm.sources_cited !== undefined && typeof fm.sources_cited !== "number") {
    errors.push(
      `frontmatter.sources_cited must be a number (got: ${typeof fm.sources_cited})`,
    );
  }

  // optional editor_note
  if (fm.editor_note !== undefined && typeof fm.editor_note !== "string") {
    errors.push(
      `frontmatter.editor_note must be a string (got: ${typeof fm.editor_note})`,
    );
  }

  // body length
  const stripped = stripMarkdown(body);
  if (stripped.length <= 50) {
    errors.push(
      `body too short: ${stripped.length} non-markup chars (need > 50)`,
    );
  }

  // legislative-specific headings
  if (typeVal === "legislative") {
    for (const heading of LEGISLATIVE_REQUIRED_HEADINGS) {
      if (!body.includes(heading)) {
        errors.push(`legislative digest missing required heading: ${heading}`);
      }
    }
  }

  return { file: rel, errors };
}

// ---------- Entry point ----------
export async function main(): Promise<number> {
  console.log(paint(C.bold, "Validating content/*/*.md"));
  console.log(dim(`  directory: ${CONTENT_DIR}`));

  if (!existsSync(CONTENT_DIR)) {
    console.log(warn(`! ${CONTENT_DIR} does not exist — nothing to validate`));
    return 0;
  }

  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  const reports: FileReport[] = [];
  let filesSeen = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!DATE_DIR_RE.test(entry.name)) {
      reports.push({
        file: path.join("content", entry.name),
        errors: [
          `directory name is not YYYY-MM-DD (got: ${entry.name}) — skipping contents`,
        ],
      });
      continue;
    }

    const dayDir = path.join(CONTENT_DIR, entry.name);
    const files = await readdir(dayDir);
    for (const fname of files) {
      if (!fname.endsWith(".md")) continue;
      filesSeen += 1;
      const abs = path.join(dayDir, fname);
      const s = await stat(abs);
      if (!s.isFile()) continue;
      reports.push(await validateMarkdownFile(entry.name, fname, abs));
    }
  }

  // print
  let failedFiles = 0;
  for (const r of reports) {
    if (r.errors.length === 0) {
      console.log(`${ok("✓")} ${r.file}`);
    } else {
      failedFiles += 1;
      console.log(`${err("✗")} ${r.file}`);
      for (const line of r.errors) console.log(err(`  ${line}`));
    }
  }

  console.log();
  console.log(
    `${filesSeen} markdown files checked · ${failedFiles} with errors`,
  );

  return failedFiles === 0 ? 0 : 1;
}

if (import.meta.main) {
  const code = await main();
  process.exit(code);
}
