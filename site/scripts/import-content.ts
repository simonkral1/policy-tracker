#!/usr/bin/env bun
/**
 * import-content.ts
 *
 * Walks ../content/YYYY-MM-DD/ (relative to the site/ directory) and copies
 * digest markdown files into site/src/content/<type>/<date>.md so Astro's
 * content collections can pick them up.
 *
 * Mappings:
 *   legislative-digest.md -> src/content/legislative/<date>.md
 *   newsletter-digest.md  -> src/content/newsletter/<date>.md
 *   paper-tracking.md     -> src/content/papers/<date>.md
 *
 * Safe if ../content does not exist or has no dated folders.
 */

import { readdir, stat, mkdir, rm, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_DIR = resolve(__dirname, "..");
const CONTENT_SRC = resolve(SITE_DIR, "..", "content");
const CONTENT_DST = resolve(SITE_DIR, "src", "content");

const TYPES = ["legislative", "newsletter", "papers"] as const;
type DigestType = (typeof TYPES)[number];

const FILE_MAP: Record<string, DigestType> = {
  "legislative-digest.md": "legislative",
  "newsletter-digest.md": "newsletter",
  "paper-tracking.md": "papers",
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

async function ensureCleanCollections(): Promise<void> {
  for (const type of TYPES) {
    const dir = join(CONTENT_DST, type);
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });
  }
}

async function importAll(): Promise<{ imported: number; skipped: number }> {
  let imported = 0;
  let skipped = 0;

  if (!existsSync(CONTENT_SRC)) {
    console.log(`[import-content] No content dir at ${CONTENT_SRC}; nothing to import.`);
    return { imported, skipped };
  }

  const entries = await readdir(CONTENT_SRC);
  for (const entry of entries) {
    if (!DATE_RE.test(entry)) {
      skipped += 1;
      continue;
    }
    const dayDir = join(CONTENT_SRC, entry);
    const s = await stat(dayDir).catch(() => null);
    if (!s || !s.isDirectory()) {
      skipped += 1;
      continue;
    }

    for (const [filename, type] of Object.entries(FILE_MAP)) {
      const src = join(dayDir, filename);
      if (!existsSync(src)) continue;
      const dst = join(CONTENT_DST, type, `${entry}.md`);
      await copyFile(src, dst);
      imported += 1;
    }
  }

  return { imported, skipped };
}

async function main(): Promise<void> {
  await ensureCleanCollections();
  const { imported, skipped } = await importAll();
  console.log(
    `[import-content] imported=${imported} skipped=${skipped} src=${CONTENT_SRC}`,
  );
}

main().catch((err) => {
  console.error("[import-content] failed:", err);
  process.exit(1);
});
