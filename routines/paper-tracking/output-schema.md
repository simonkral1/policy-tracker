# Paper Tracking Digest — Output Schema

The authoritative reference for what a paper-tracking digest file looks like.

## File path

```
content/{YYYY-MM-DD}/paper-tracking-digest.md
```

## Frontmatter

| Field           | Type    | Notes                                                           |
|-----------------|---------|-----------------------------------------------------------------|
| `date`          | date    | ISO 8601, same as directory name.                               |
| `type`          | string  | Literal `papers`.                                               |
| `title`         | string  | e.g. `"Paper tracking digest — 27 April 2026"`.                 |
| `period_start`  | date    | `date` − 14 days.                                               |
| `period_end`    | date    | `date`.                                                         |
| `sources_cited` | integer | Count of distinct URLs in the body.                             |
| `editor_note`   | string  | One or two sentences on what shifted at the research frontier. Reused as PR body. |

## Body

Two sections.

### Section 1: Papers table

```markdown
## 📚 Papers (last 14 days)

| Relevance | Title | Authors | Venue | Stage | URL |
|-----------|-------|---------|-------|-------|-----|
| 5 | {title} 🆕 NEW | {first 3, et al.} | {venue(s)} | preprint | {arxiv short URL} |
| 4 | {title} 🆕 NEW | ... | ... | accepted | ... |
```

Sort descending by `relevance_score`. Ties broken by alphabetical title.

Markers:
- `🆕 NEW` — not in any of the last 4 digests.
- `(follow-up: v2)` — v2 of a paper previously covered at v1, included because conclusions changed.
- `(retracted)` — paper has been retracted; include if retraction happened in the period.

If no qualifying papers this period, write `_No qualifying papers this period._` and omit Section 2.

### Section 2: Deep dives (relevance 5 only)

```markdown
## 📖 Deep dives

### {Title} 🆕 NEW
- **Authors:** {first 3, et al.}
- **Venue:** {arXiv, METR | arXiv, NeurIPS 2026 | ...}
- **arXiv ID:** {NNNN.NNNNN or null}
- **URL:** {primary URL}
- **Stage:** {preprint | accepted | published | retracted}
- **Summary:** {3–5 sentences, policy-implication framing}
- **Why it matters to SaferAI:** {one concrete sentence}
- **Confidence:** low  # only if uncertain
- **Why (confidence):** {reason}  # only if confidence: low

(repeat per 5-rated paper; or `_No 5-rated papers this period._`)
```

## Relevance scale

| Score | Meaning |
|-------|---------|
| 5     | Directly changes SaferAI's position on a live policy question. Likely to be cited in a CAIA paper within 3 months. |
| 4     | Substantive new evidence on a SaferAI-tracked topic; worth deep-reading. |
| 3     | Solid contribution, adjacent to SaferAI's agenda; worth awareness. |
| 2     | Noted; included because tracked author or priority venue. |
| 1     | Not included. |

## Stage vocabulary (papers)

- `preprint` — arXiv or lab page, not peer-reviewed.
- `accepted` — accepted at a venue (e.g. NeurIPS 2026) but not yet in proceedings.
- `published` — in proceedings or journal.
- `retracted` — formally retracted.

## Version and follow-up handling

- Paper appears at v1 in digest week 1. Week 3 a v2 lands.
  - If v2 does not change conclusions → skip entirely.
  - If v2 changes conclusions → include as `### {Title} 🆕 NEW (follow-up: v2)` with a Summary explaining what changed.
- Paper appears at v1, is later retracted → include as `(retracted)` with Stage: retracted.

## 40-line worked example

```markdown
---
date: 2026-04-27
type: papers
title: "Paper tracking digest — 27 April 2026"
period_start: 2026-04-13
period_end: 2026-04-27
sources_cited: 5
editor_note: "METR's new elicitation protocol is the week's frontier-evaluation story; expect it to be referenced in GPAI CoP discussions."
---

## 📚 Papers (last 14 days)

| Relevance | Title | Authors | Venue | Stage | URL |
|-----------|-------|---------|-------|-------|-----|
| 5 | Elicitation under task-complete oversight 🆕 NEW | Barnes, Chen, Patel et al. | arXiv, METR | preprint | arxiv.org/abs/2604.01234 |
| 4 | Safety cases for scalable oversight 🆕 NEW | Irving, Krueger et al. | arXiv | preprint | arxiv.org/abs/2604.02345 |
| 3 | Benchmarking deceptive alignment monitors 🆕 NEW | Evans, Ngo et al. | arXiv | preprint | arxiv.org/abs/2604.03456 |

## 📖 Deep dives

### Elicitation under task-complete oversight 🆕 NEW
- **Authors:** Barnes, Chen, Patel et al.
- **Venue:** arXiv, METR
- **arXiv ID:** 2604.01234
- **URL:** https://arxiv.org/abs/2604.01234
- **Stage:** preprint
- **Summary:** METR proposes a concrete elicitation protocol for frontier-model evaluations that separates capability elicitation from safety testing. The result reframes what "sufficient elicitation" can mean in regulatory evidence — the authors show that existing safety cases underestimate capabilities by 20–40% on their tasks. They recommend a procedural standard that could slot directly into GPAI CoP evaluation requirements.
- **Why it matters to SaferAI:** Provides a concrete procedural standard SaferAI can cite in GPAI CoP submissions and in CAIA's evaluation paper.
```

## Validation

Run `bun run validate:digest content/{date}/paper-tracking-digest.md` to check frontmatter, section order, relevance sort, and stage vocabulary.
