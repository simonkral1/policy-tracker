# Newsletter Digest Routine

## What this produces

A weekly structured digest summarising the 1–3 most frontier-AI-risk-relevant items from each core policy newsletter SaferAI tracks — with cross-newsletter deduplication and a short themes section.

Each run writes one file:

```
content/{YYYY-MM-DD}/newsletter-digest.md
```

and opens a PR on branch `claude/{YYYY-MM-DD}-newsletter` against `main`.

## Why this exists

SaferAI's policy team reads ~20 policy-adjacent newsletters. Reading all of them every week is an hour+ of work, with a lot of overlap. This Routine does the scan-and-dedup pass so the team can read one file instead of twenty, and trust that anything frontier-risk-relevant has been surfaced.

## Schedule

Recommended: **weekly, Sunday 18:00 Europe/Paris**, so the digest is ready for Monday morning.

Most core newsletters publish weekly — some Sunday evening (Transformer, Import AI), some Monday morning (AI Policy Perspectives). Sunday evening captures the bulk; Monday-morning items will show up in next week's digest, which is an acceptable lag.

## Expected output

- Frontmatter with `date`, `type: newsletter`, `title`, `period_start` (date − 7 days), `period_end` (date), `sources_cited`, `editor_note`.
- Body grouped by newsletter; up to 3 items per newsletter with URL, publication date, stage, and a 2–4 sentence `Why it matters`.
- A final `🔗 Cross-newsletter themes` section (up to 3 bullets).

Full schema in [`output-schema.md`](output-schema.md).

## Success criteria

On every run, verify:

- [ ] File path is `content/{today}/newsletter-digest.md`.
- [ ] Frontmatter validates.
- [ ] Every included item falls within `period_start` and `period_end`.
- [ ] No item appeared in any of the last 4 newsletter digests (unless explicitly marked `(follow-up)`).
- [ ] Items covered by multiple newsletters are merged under one `### title` with a `Sources:` list.
- [ ] Per-newsletter cap of 3 items is respected.
- [ ] Every item has a `Why it matters` of 2–4 sentences.
- [ ] Promotional and admin posts were excluded.
- [ ] Commit is on a `claude/*` branch.
- [ ] PR body equals `editor_note`.

## Modifying the prompt safely

1. **Source list is config, not prompt.** Add or remove newsletters by editing `sources/newsletters.yaml` — the prompt reads it at runtime.
2. **Do not change the grouping.** The policy team scans by newsletter name; reordering would break muscle memory.
3. **Do change** the `ignore` list in Phase 2 as you learn which noise to suppress.
4. **Priority tiers** — if a `priority: experimental` newsletter proves valuable for three consecutive digests, promote it to `secondary` (or `core`) in the source YAML; don't hardcode it in the prompt.

## Manually re-running

`claude.ai/code/routines` → Newsletter Digest → **Run now**.

## Troubleshooting

- **RSS 404 or feed drift.** Run `bun run verify:rss` locally; update `sources/newsletters.yaml` with the new URL.
- **Newsletter behind login.** Politico AI Decoded is the known case. The prompt handles this by skipping and logging; if you want its content, add a shared subscription address and an archive-page fetch step.
- **Digest feels thin.** Check the dedup pass wasn't too aggressive. Run with secondary newsletters enabled for a week to see if signal improves.
- **Digest feels noisy.** Tighten the selection criteria in Phase 2 — push harder on "would this change the policy team's plan this week?".
