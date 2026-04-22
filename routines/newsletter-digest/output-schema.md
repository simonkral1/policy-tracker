# Newsletter Digest — Output Schema

The authoritative reference for what a newsletter digest file looks like.

## File path

```
content/{YYYY-MM-DD}/newsletter-digest.md
```

## Frontmatter

| Field           | Type    | Notes                                                           |
|-----------------|---------|-----------------------------------------------------------------|
| `date`          | date    | ISO 8601, same as directory name.                               |
| `type`          | string  | Literal `newsletter`.                                           |
| `title`         | string  | e.g. `"Newsletter digest — 27 April 2026"`.                     |
| `period_start`  | date    | `date` − 7 days.                                                |
| `period_end`    | date    | `date`.                                                         |
| `sources_cited` | integer | Count of distinct URLs in the body. Computed, not estimated.   |
| `editor_note`   | string  | One or two sentences on the week's pattern. Reused as PR body.  |

## Body

Body is grouped by newsletter, then a final cross-newsletter themes section.

```markdown
## {Newsletter name}

### {Item title} 🆕 NEW
- **URL:** {url}
- **Published:** {YYYY-MM-DD}
- **Stage:** {reported | analysis | opinion | event | <legislative stage>}
- **Why it matters:** {2–4 sentences, policy-implication framing}
- **Confidence:** low  # only if uncertain
- **Why (confidence):** {reason}  # only if confidence: low

(repeat up to 3 items; or `_No items this week._`)

## {Next newsletter name}
...

## 🔗 Cross-newsletter themes

- **{Theme}:** {one-sentence synthesis; list of newsletters}.
(up to 3)
```

## Item format — merged (multi-source)

When two or more newsletters covered the same item, merge under the newsletter with the most substantive analysis:

```markdown
### {Item title} 🆕 NEW
- **Sources:**
  - {url-primary}
  - {url-other}
- **Published:** {YYYY-MM-DD earliest}
- **Stage:** {…}
- **Why it matters:** {… note other newsletters covered it}
```

## Stage vocabulary for newsletter items

Newsletter items rarely sit at legislative stages. Use this broader vocabulary:

- `reported` — new factual reporting.
- `analysis` — analysis post synthesising prior reporting.
- `opinion` — opinion column or essay.
- `event` — coverage of an event (conference, hearing, summit).
- Any of the legislative stages (`draft`, `consultation-open`, `consultation-closed`, `amendments`, `trilogue`, `adopted`, `in-force`) when the item is directly about a piece of legislation.

## Follow-up items

If the same underlying story has been covered in a prior digest but developed materially this week, the item can be included as a follow-up:

```markdown
### {Item title} 🆕 NEW (follow-up to 2026-04-13)
...
```

Reference the prior digest date. Follow-ups count against the per-newsletter cap of 3.

## 40-line worked example

```markdown
---
date: 2026-04-27
type: newsletter
title: "Newsletter digest — 27 April 2026"
period_start: 2026-04-20
period_end: 2026-04-27
sources_cited: 8
editor_note: "Three newsletters converged on the new CoP draft; US state-level AI liability bills getting unusual cross-newsletter attention."
---

## Transformer

### Anthropic publishes v2 safety case for Claude 4.5 🆕 NEW
- **URL:** https://www.transformernews.ai/p/anthropic-v2-safety-case
- **Published:** 2026-04-24
- **Stage:** analysis
- **Why it matters:** First frontier-lab safety case to explicitly address deceptive-alignment monitoring. Raises the bar for what "systemic risk" evidence looks like under AI Act Article 55.

## AI Policy Perspectives

_No items this week._

## Hyperdimensional

### California SB-1047 successor passes Senate 🆕 NEW
- **Sources:**
  - https://www.hyperdimensional.co/p/sb-2047
  - https://www.transformernews.ai/p/sb-2047
- **Published:** 2026-04-22
- **Stage:** amendments
- **Why it matters:** Revived liability framework, narrower scope than SB-1047. Three newsletters covered it — worth reading Ball's analysis for the procedural politics.

## 🔗 Cross-newsletter themes

- **GPAI CoP draft:** Transformer, AI Policy Perspectives, and Anton Leicht all covered the new CoP draft; emerging consensus that enforcement detail is thin.
- **US state liability:** Hyperdimensional and Transformer both flag state-level momentum as the frontier-risk policy venue to watch this quarter.
```

## Validation

Run `bun run validate:digest content/{date}/newsletter-digest.md` to check frontmatter, section grouping, and URL-per-claim rules.
