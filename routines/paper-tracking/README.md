# Paper Tracking Routine

## What this produces

A fortnightly (14-day window) digest of research papers most likely to change how SaferAI thinks about frontier-AI risk management — ranked by relevance, with deep-dive treatments for the highest-ranked items.

Each run writes one file:

```
content/{YYYY-MM-DD}/paper-tracking.md
```

and opens a PR on branch `claude/{YYYY-MM-DD}-papers` against `main`.

## Why this exists

arXiv cs.CL, cs.LG, and cs.CY together post hundreds of papers a week. SaferAI's policy team cannot read them all, and the high-impact papers for *policy* are a different set from the high-impact papers for *research*. This Routine does tracked-author sweeps, keyword-filtered venue sweeps, and judgment-based additions, then compresses the output into a ranked table plus deep-dives for the best items.

## Schedule

Recommended: **fortnightly, Tuesday 09:00 Europe/Paris**.

- Paper-tracking benefits from a 14-day window (to let v2s land and let frontier-lab reports get noticed beyond their PR launch day). Running weekly produces too much noise; running monthly is too slow for the arXiv cadence.
- Tuesday morning avoids Monday's legislative digest.

## Expected output

- Frontmatter with `date`, `type: papers`, `title`, `period_start` (date − 14 days), `period_end` (date), `sources_cited`, `editor_note`.
- Section 1: papers table sorted by `relevance_score` descending.
- Section 2: deep-dive treatments for every paper with `relevance_score: 5`.

Full schema in [`output-schema.md`](output-schema.md).

## Success criteria

- [ ] File path is `content/{today}/paper-tracking.md`.
- [ ] Frontmatter validates.
- [ ] Every paper has `relevance_score` between 2 and 5 (1s excluded).
- [ ] Table is sorted descending by `relevance_score`, ties broken alphabetically.
- [ ] Every relevance-5 paper has a matching deep dive in Section 2.
- [ ] No paper appeared in any of the last 4 paper digests (unless marked `follow-up`).
- [ ] v2 papers replace v1 rather than double-listing.
- [ ] Summaries lead with policy implications, not abstract paraphrase.
- [ ] Commit is on a `claude/*` branch.
- [ ] PR body equals `editor_note`.

## Modifying the prompt safely

1. **Tracked authors, categories, venues, keywords are config.** Edit `sources/papers.yaml`. The prompt reads it at runtime.
2. **Relevance scale is the editorial rubric.** If you change the scale definitions, all downstream readers need to be told — leave a note in the editor_note of the first digest after the change.
3. **Don't lower the default cutoff.** Papers with `relevance_score: 1` are excluded by design. Including them produces filler.
4. **Do add** a new priority axis (e.g. "safety institute reports") by adding a new section to `sources/papers.yaml` and a matching Phase 1 sweep in the prompt.

## Manually re-running

`claude.ai/code/routines` → Paper Tracking → **Run now**.

## Troubleshooting

- **Digest empty.** Some fortnights the research frontier is quiet — especially around major conference deadlines (pre-submission) and immediately post-conference. Verify by spot-checking arXiv manually.
- **Same paper keeps appearing.** Check version handling — the prompt should treat v2 as same-as-v1 unless conclusions changed. If it didn't, flag as a prompt bug.
- **Relevance feels miscalibrated.** Review a week's digest with Chloé; adjust the rubric in `prompt.md` Phase 3.
- **arXiv rate-limiting.** If the Routine hits rate limits, add small delays between category sweeps; do not parallelise aggressively.
