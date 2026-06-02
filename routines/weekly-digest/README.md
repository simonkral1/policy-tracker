# Weekly Digest Routine

The **active** SaferAI Policy Tracker routine. Runs once a week (Monday 08:00 BST,
"SaferAI — Weekly Digest" on [claude.ai/code/routines](https://claude.ai/code/routines))
and produces a single consolidated digest at `content/<YYYY-MM-DD>/weekly-digest.md`
(`type: weekly`).

It covers everything the policy team tracks in one file:

- **Legislative / regulatory** — formal movement (bills, consultations, delegated/
  implementing acts, codes of practice, executive orders, standards-body actions,
  enforcement), in the ACT NOW / ON THE RADAR / PIPELINE sections.
- **Coverage** — the broad AI-news landscape (newsletters + the geopolitics,
  safety & risk, capability, and hype/trends beats).
- **Research** — new frontier-risk-relevant papers.

Format and tone follow **Transformer Weekly** (NEED TO KNOW lead → themed sections
with bold lead-in bullets and inline links → BEST OF THE REST → editorial), but
deliberately short, with hard per-section caps. See [`prompt.md`](prompt.md).

## Retired predecessors

This routine replaced four separate ones, all now **paused** on the Routines
dashboard and retained here only for history:

- [`../legislative-digest/`](../legislative-digest/) — legislative movement
- [`../newsletter-digest/`](../newsletter-digest/) — newsletter + coverage
- [`../paper-tracking/`](../paper-tracking/) — research papers
- "News review" (never had a repo prompt) — broad AI-news beats

Their `content/` history (`legislative-digest.md`, `newsletter-digest.md`,
`paper-tracking.md`, `news-updates.md`) still renders on the site; the four
legacy Astro collections remain for that reason.
