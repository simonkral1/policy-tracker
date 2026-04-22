#!/usr/bin/env bun
/**
 * validate-sources.ts
 *
 * Parses every YAML file under `sources/` and validates it against the
 * corresponding Zod schema defined in `sources/schema.ts`.
 *
 * Exit codes:
 *   0 — every present file validated
 *   1 — at least one file failed validation
 *
 * Missing files are reported as warnings and do not fail the run.
 */

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

import {
  newslettersFileSchema,
  papersFileSchema,
  legislativeFileSchema,
  peopleFileSchema,
  eventsFileSchema,
} from "../sources/schema.ts";

// ---------- ANSI helpers (no deps) ----------
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  dim: "\x1b[2m",
};
const tty = process.stdout.isTTY;
const paint = (code: string, s: string) => (tty ? `${code}${s}${C.reset}` : s);
const ok = (s: string) => paint(C.green, s);
const err = (s: string) => paint(C.red, s);
const warn = (s: string) => paint(C.yellow, s);
const dim = (s: string) => paint(C.dim, s);

// ---------- File table ----------
interface FileSpec {
  file: string;
  schema: z.ZodTypeAny;
}

const REPO_ROOT = path.resolve(import.meta.dir, "..");
const SOURCES_DIR = path.join(REPO_ROOT, "sources");

const FILES: FileSpec[] = [
  { file: "newsletters.yaml", schema: newslettersFileSchema },
  { file: "papers.yaml", schema: papersFileSchema },
  { file: "legislative.yaml", schema: legislativeFileSchema },
  { file: "people.yaml", schema: peopleFileSchema },
  { file: "events.yaml", schema: eventsFileSchema },
];

// ---------- Zod → human lines ----------
function formatZodError(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const p = issue.path.length === 0 ? "<root>" : issue.path.join(".");
    return `  ${p} → ${issue.message}`;
  });
}

// ---------- Per-file validation ----------
interface Result {
  file: string;
  status: "ok" | "fail" | "missing" | "parse-error";
  errors?: string[];
}

async function validateFile(spec: FileSpec): Promise<Result> {
  const abs = path.join(SOURCES_DIR, spec.file);
  if (!existsSync(abs)) {
    return { file: spec.file, status: "missing" };
  }
  let raw: string;
  try {
    raw = await readFile(abs, "utf8");
  } catch (e) {
    return {
      file: spec.file,
      status: "parse-error",
      errors: [`  could not read file: ${(e as Error).message}`],
    };
  }

  let data: unknown;
  try {
    data = parseYaml(raw);
  } catch (e) {
    return {
      file: spec.file,
      status: "parse-error",
      errors: [`  YAML parse error: ${(e as Error).message}`],
    };
  }

  const parsed = spec.schema.safeParse(data);
  if (parsed.success) {
    return { file: spec.file, status: "ok" };
  }
  return {
    file: spec.file,
    status: "fail",
    errors: formatZodError(parsed.error),
  };
}

// ---------- Printing ----------
function printResult(r: Result): void {
  switch (r.status) {
    case "ok":
      console.log(`${ok("✓")} ${r.file} ${dim("— valid")}`);
      break;
    case "missing":
      console.log(`${warn("!")} ${r.file} ${dim("— missing (skipped)")}`);
      break;
    case "parse-error":
    case "fail":
      console.log(`${err("✗")} ${r.file}`);
      for (const line of r.errors ?? []) console.log(err(line));
      break;
  }
}

// ---------- Entry point ----------
export async function main(): Promise<number> {
  console.log(paint(C.bold, "Validating sources/*.yaml"));
  console.log(dim(`  directory: ${SOURCES_DIR}`));

  const results = await Promise.all(FILES.map(validateFile));
  for (const r of results) printResult(r);

  const failed = results.filter(
    (r) => r.status === "fail" || r.status === "parse-error",
  );
  const missing = results.filter((r) => r.status === "missing");
  const good = results.filter((r) => r.status === "ok");

  console.log();
  console.log(
    `${good.length} valid · ${failed.length} failed · ${missing.length} missing`,
  );

  return failed.length === 0 ? 0 : 1;
}

if (import.meta.main) {
  const code = await main();
  process.exit(code);
}
