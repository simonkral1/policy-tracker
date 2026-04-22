# Legislative Digest — Output Schema

The authoritative reference for what a legislative digest file looks like. Maintainers can validate by eye against this document; validators in `scripts/` enforce the same shape programmatically.

## File path

```
content/{YYYY-MM-DD}/legislative-digest.md
```

`{YYYY-MM-DD}` is the date the digest was produced (branch cut date).

## Frontmatter

Required YAML fields:

| Field           | Type    | Notes                                                                 |
|-----------------|---------|-----------------------------------------------------------------------|
| `date`          | date    | ISO 8601, same as directory name.                                     |
| `type`          | string  | Literal `legislative`.                                                |
| `title`         | string  | Human-readable, e.g. `"Legislative digest — 27 April 2026"`.          |
| `period_start`  | date    | `date` − 14 days.                                                     |
| `period_end`    | date    | `date` + 60 days.                                                     |
| `sources_cited` | integer | Count of distinct URLs in the body. Computed, not estimated.          |
| `editor_note`   | string  | One or two sentences. Reused verbatim as PR body.                     |

## Body

Exactly five sections in this order:

1. `## 🔴 ACT NOW` — deadline ≤ 14 days.
2. `## 🟡 ON THE RADAR` — deadline 15–60 days.
3. `## 🟢 PIPELINE WATCH` — entered pipeline in last 14 days.
4. `## 📅 EVENTS & HEARINGS` — next 30 days, markdown table.
5. `## 💡 EDITORIAL NOTE` — two or three prose sentences.

Empty sections are not omitted — they contain `_No items this period._`.

## Item format (sections 1–3)

```markdown
### {Title} 🆕 NEW
- **Organiser:** {EC, EP committee, national regulator, etc.}
- **Jurisdiction:** {EU | UK | US | France | ...}
- **Stage:** {draft | consultation-open | consultation-closed | amendments | trilogue | adopted | in-force | superseded}
- **Deadline:** {YYYY-MM-DD or "TBC"}
- **Sources:**
  - {url-1}
  - {url-2}  # optional
- **Why it matters:** {one or two sentences, frontier-risk framing}
- **Confidence:** low  # only if uncertain
- **Why (confidence):** {one line explaining the gap}  # only if confidence: low
```

`🆕 NEW` appears when the item did not appear in any of the last 4 digests, OR when it moved stage in the past 7 days. Stage moves also get a parenthetical:

```markdown
### {Title} 🆕 NEW (was: consultation-open → now: consultation-closed)
```

## Events table format (section 4)

```markdown
| Date       | Event                                      | Organiser                     | URL                                     |
|------------|--------------------------------------------|-------------------------------|-----------------------------------------|
| 2026-05-14 | AIDA hearing on GPAI Codes of Practice     | European Parliament AIDA      | https://www.europarl.europa.eu/...      |
```

Sorted ascending by date.

## 40-line worked example

```markdown
---
date: 2026-04-27
type: legislative
title: "Legislative digest — 27 April 2026"
period_start: 2026-04-13
period_end: 2026-06-26
sources_cited: 6
editor_note: "Two AI Act implementing acts opened for consultation; CADA procedural vote delayed by two weeks; French SGDSN published its first AI-sector supervisory guidance."
---

## 🔴 ACT NOW

### AI Act implementing act on GPAI model documentation 🆕 NEW
- **Organiser:** European Commission DG CNECT
- **Jurisdiction:** EU
- **Stage:** consultation-open
- **Deadline:** 2026-05-05
- **Sources:**
  - https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives/14321
- **Why it matters:** Scope of mandatory model-card fields is where SaferAI can push safety-case language into implementing law.

## 🟡 ON THE RADAR

_No items this period._

## 🟢 PIPELINE WATCH

### CADA procedural vote rescheduled 🆕 NEW (was: amendments → now: amendments, new date)
- **Organiser:** European Parliament ITRE
- **Jurisdiction:** EU
- **Stage:** amendments
- **Deadline:** 2026-06-18
- **Sources:**
  - https://www.europarl.europa.eu/committees/en/itre/...
- **Why it matters:** Compute-cluster reporting thresholds still unresolved.

## 📅 EVENTS & HEARINGS

| Date       | Event                              | Organiser                 | URL                                  |
|------------|------------------------------------|---------------------------|--------------------------------------|
| 2026-05-14 | AIDA hearing on GPAI CoP           | EP AIDA                   | https://www.europarl.europa.eu/...   |

## 💡 EDITORIAL NOTE

The Commission is front-loading GPAI implementing acts ahead of the summer break, which creates a narrow window for safety-case advocacy. CADA's delay is procedural, not political — expect the June vote to hold.
```

## Validation

Run `bun run validate:digest content/{date}/legislative-digest.md` to check frontmatter, section order, stage vocabulary, and URL-per-claim rules.
