#!/usr/bin/env bun
/**
 * verify-rss.ts
 *
 * Reads sources/newsletters.yaml and HEAD/GETs every non-null RSS URL.
 * Records HTTP status, content-type, and response size. Prints a
 * human-readable table or machine-readable JSON (with --json).
 *
 * Passes if >= 80% of feeds respond with 2xx/3xx. Otherwise exits 1.
 * Never aborts early — always completes all checks in parallel.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";

import { newslettersFileSchema } from "../sources/schema.ts";

const USER_AGENT = "SaferAI-Policy-Tracker/0.1 rss-verifier";
const TIMEOUT_MS = 10_000;

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
const dim = (s: string) => paint(C.dim, s);

// ---------- Types ----------
interface CheckResult {
  name: string;
  rss: string;
  status: number | null;
  contentType: string | null;
  size: number | null;
  ok: boolean;
  error?: string;
}

// ---------- Checker ----------
async function check(name: string, rss: string): Promise<CheckResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(rss, {
      method: "GET",
      headers: { "User-Agent": USER_AGENT, Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*" },
      signal: controller.signal,
      redirect: "follow",
    });
    const body = await res.arrayBuffer();
    return {
      name,
      rss,
      status: res.status,
      contentType: res.headers.get("content-type"),
      size: body.byteLength,
      ok: res.status >= 200 && res.status < 400,
    };
  } catch (e) {
    const msg = (e as Error).message || String(e);
    return {
      name,
      rss,
      status: null,
      contentType: null,
      size: null,
      ok: false,
      error: msg,
    };
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Table printing ----------
function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}

function printTable(results: CheckResult[]): void {
  const nameW = Math.min(
    28,
    Math.max(4, ...results.map((r) => r.name.length)),
  );
  const rssW = Math.min(48, Math.max(3, ...results.map((r) => r.rss.length)));
  const header = `${paint(C.bold, "name".padEnd(nameW))}  ${paint(C.bold, "rss".padEnd(rssW))}  ${paint(C.bold, "status".padEnd(8))}  ok?`;
  console.log(header);
  console.log(dim("-".repeat(nameW + rssW + 8 + 6 + 6)));
  for (const r of results) {
    const name = truncate(r.name, nameW).padEnd(nameW);
    const rss = truncate(r.rss, rssW).padEnd(rssW);
    const statusStr = (r.status === null ? r.error ?? "err" : String(r.status))
      .padEnd(8);
    const flag = r.ok ? ok("yes") : err("no");
    console.log(`${name}  ${rss}  ${statusStr}  ${flag}`);
  }
}

// ---------- Entry point ----------
export async function main(argv: string[] = process.argv.slice(2)): Promise<number> {
  const jsonMode = argv.includes("--json");

  const repoRoot = path.resolve(import.meta.dir, "..");
  const yamlPath = path.join(repoRoot, "sources", "newsletters.yaml");
  const raw = await readFile(yamlPath, "utf8");
  const parsed = newslettersFileSchema.parse(parseYaml(raw));

  const checks = parsed.newsletters
    .filter((n) => n.rss !== null && typeof n.rss === "string")
    .map((n) => ({ name: n.name, rss: n.rss as string }));

  const settled = await Promise.allSettled(
    checks.map(({ name, rss }) => check(name, rss)),
  );
  const results: CheckResult[] = settled.map((s, i) => {
    if (s.status === "fulfilled") return s.value;
    return {
      name: checks[i].name,
      rss: checks[i].rss,
      status: null,
      contentType: null,
      size: null,
      ok: false,
      error: (s.reason as Error)?.message ?? String(s.reason),
    };
  });

  const total = results.length;
  const passing = results.filter((r) => r.ok).length;
  const ratio = total === 0 ? 1 : passing / total;

  if (jsonMode) {
    console.log(
      JSON.stringify(
        {
          total,
          passing,
          ratio,
          threshold: 0.8,
          results,
        },
        null,
        2,
      ),
    );
  } else {
    console.log(paint(C.bold, "Verifying RSS feeds in sources/newsletters.yaml"));
    console.log();
    printTable(results);
    console.log();
    console.log(
      `${passing}/${total} feeds reachable (${(ratio * 100).toFixed(0)}%) — threshold 80%`,
    );
  }

  return ratio >= 0.8 ? 0 : 1;
}

if (import.meta.main) {
  const code = await main();
  process.exit(code);
}
