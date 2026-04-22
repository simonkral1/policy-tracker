# Legislative Digest Routine

## What this produces

A weekly structured digest of AI and digital-governance developments across the EU, UK, G7, OECD, UN, and Council of Europe — framed around SaferAI's frontier-AI risk management agenda.

Each run writes one file:

```
content/{YYYY-MM-DD}/legislative-digest.md
```

and opens a PR on branch `claude/{YYYY-MM-DD}-legislative` against `main`.

## Why this exists

This Routine ports Chloé Touzet's existing weekly monitoring workflow from an interactive Cowork task into a scheduled, auditable, version-controlled artefact. Same scope, same searches, same editorial framing — just reliably produced every Monday and reviewable as a PR.

## Schedule

Recommended: **weekly, Monday 08:00 Europe/Paris**.

- Chloé currently reads policy developments on Monday mornings. Aligning the digest to land before her review slot preserves her cadence.
- Daylight-saving shifts are absorbed by using Europe/Paris rather than UTC.

Configure the cron in the Routine form at `claude.ai/code/routines` — see `docs/ROUTINE-SETUP.md` at the repo root for the full setup walkthrough.

## Expected output

- Frontmatter with `date`, `type: legislative`, `title`, `period_start`, `period_end`, `sources_cited`, `editor_note`.
- Five body sections in fixed order: `🔴 ACT NOW`, `🟡 ON THE RADAR`, `🟢 PIPELINE WATCH`, `📅 EVENTS & HEARINGS`, `💡 EDITORIAL NOTE`.
- Every item carries `stage`, at least one source URL, a `Why it matters` line, and `confidence: low` with a `why:` line where a fact is uncertain.

Full schema in [`output-schema.md`](output-schema.md).

## Success criteria (ISC-style checklist)

On every run, verify:

- [ ] File path is `content/{today}/legislative-digest.md` and the directory was created.
- [ ] Frontmatter validates against `scripts/validate-frontmatter.ts`.
- [ ] All five body sections are present in the canonical order.
- [ ] Empty sections say `_No items this period._` — they are not omitted.
- [ ] Every item under `ACT NOW`, `ON RADAR`, `PIPELINE WATCH` has `stage`, `Sources`, `Why it matters`.
- [ ] Every deadline has a source URL pointing at an authoritative page.
- [ ] `🆕 NEW` markers were computed by comparing to the last 4 digests in `content/`.
- [ ] `sources_cited` in frontmatter equals the number of distinct URLs in the body.
- [ ] Commit is on a `claude/*` branch, not `main`.
- [ ] PR body equals `editor_note`.

## Modifying the prompt safely

The prompt is a **faithful port of Chloé's Cowork prompt**. Guardrails for edits:

1. **Do not change the five-section output structure.** Chloé's downstream triage relies on it.
2. **Do not narrow the scope.** The prompt explicitly surfaces safe-by-design opportunities beyond "AI risk management" labels — that breadth is intentional.
3. **Do change** source lists when `sources/legislative.yaml` changes — the prompt reads that file at runtime, so sources are configured there, not inline in the prompt.
4. **Do add** newly relevant searches by appending to Phase 2; don't remove existing ones without flagging to Chloé.
5. When in doubt, loop Chloé in before merging.

## Manually re-running

To re-run outside the schedule (e.g. after fixing a broken source):

1. Go to `claude.ai/code/routines`.
2. Open the Legislative Digest routine.
3. Click **Run now**.
4. A one-off run executes and opens a PR just like a scheduled run would.

Alternatively, trigger via the API — see `docs/ROUTINE-SETUP.md` for the endpoint and auth header.

## Troubleshooting

- **Empty digest.** Read `content/{date}/legislative-digest.md` — the Routine may legitimately have found nothing (quiet week). If that's wrong, check Phase 2 searches weren't blocked.
- **PR not opened.** Check the Routine log for `gh pr create` errors. Most common cause: the Claude GitHub App lost write access.
- **Stale source.** If a target in `sources/legislative.yaml` keeps failing, mark it `priority: experimental` or remove it.
