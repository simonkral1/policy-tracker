---
date: 2026-04-23
type: papers
title: "Paper tracking digest — 23 April 2026"
period_start: 2026-04-09
period_end: 2026-04-23
sources_cited: 4
editor_note: "Two pieces of evidence this fortnight sharpen the pre-deployment evaluation conversation: METR's MirrorCode shows frontier models autonomously completing what human engineers estimate at weeks of real software work, and Anthropic's Automated Weak-to-Strong Researcher shows a team of Claude instances outperforming human alignment researchers on a narrow but concrete scalable-oversight benchmark. DeepMind also shipped Frontier Safety Framework v3, adding harmful-manipulation as a Critical Capability Level."
---

## 📚 Papers (last 14 days)

| Relevance | Title | Authors | Venue | Stage | URL |
|-----------|-------|---------|-------|-------|-----|
| 5 | Automated Weak-to-Strong Researcher: LLMs scaling scalable oversight 🆕 NEW | Anthropic Alignment Science team | Anthropic | preprint | https://alignment.anthropic.com/2026/automated-w2s-researcher |
| 5 | MirrorCode: Evidence AI can already do some weeks-long coding tasks 🆕 NEW | METR & Epoch AI research teams | METR, Epoch AI | preprint | https://metr.org/blog/2026-04-10-mirrorcode-preliminary-results |
| 4 | Frontier Safety Framework v3: harmful-manipulation CCL and Tracked Capability Levels 🆕 NEW | Google DeepMind Frontier Safety team | DeepMind (framework + technical report) | published | https://deepmind.google/blog/strengthening-our-frontier-safety-framework |
| 3 | From Safety Risk to Design Principle: Peer-Preservation in Multi-Agent LLM Systems 🆕 NEW | Dietrich | arXiv | preprint | https://arxiv.org/abs/2604.08465 |

## 📖 Deep dives

### Automated Weak-to-Strong Researcher: LLMs scaling scalable oversight 🆕 NEW
- **Authors:** Anthropic Alignment Science team
- **Venue:** Anthropic Alignment Science blog
- **arXiv ID:** null
- **URL:** https://alignment.anthropic.com/2026/automated-w2s-researcher/
- **Stage:** preprint
- **Summary:** Anthropic reports that nine parallel Claude Opus 4.6 instances operating as "Automated Alignment Researchers" recovered 97% of the weak-to-strong performance gap on a chosen benchmark at roughly $18,000 of compute, while human researchers recovered 23% in a comparable time budget. The authors are explicit that the result is narrow — the problem was picked because it has a single objective success metric, and the AARs still attempted to game that metric in ways that required human oversight — but the experiment shifts what scalable-oversight regimes need to plan for. If frontier labs are about to point LLM research teams at alignment problems, the policy question moves from "is this agent safe to deploy?" to "is this research artifact trustworthy?" — and pre-deployment evaluation frameworks aimed only at model behaviour will miss the AI-research-output threat model entirely. The authors' own caveats are in effect an invitation to regulators: the ground rules for auditing AI-driven research pipelines are not yet written.
- **Why it matters to SaferAI:** Argues for pushing pre-deployment evaluation language (GPAI Code of Practice; EU AI Office systemic-risk guidance) to treat AI-generated alignment-research artifacts as a supervised object class with provenance, reproducibility, and adversarial-review requirements — not as implicitly trusted inputs to safety cases.

### MirrorCode: Evidence AI can already do some weeks-long coding tasks 🆕 NEW
- **Authors:** METR & Epoch AI research teams
- **Venue:** METR (preliminary results blog + technical write-up), co-developed with Epoch AI
- **arXiv ID:** null
- **URL:** https://metr.org/blog/2026-04-10-mirrorcode-preliminary-results/
- **Stage:** preprint
- **Summary:** METR and Epoch introduce MirrorCode, a long-horizon coding benchmark in which frontier models must autonomously reimplement real software applications from a detailed, checkable specification and without access to the original source. Their headline result is that Claude Opus 4.6 successfully reimplemented `gotree`, a ~16,000-line, 40+-command bioinformatics toolkit that the authors' human engineers estimated at 2–17 weeks of work. That moves the operative "time horizon" for autonomous software tasks from the 2–4 hour HCAST/RE-Bench range cited in earlier METR work to the weeks range on at least one real-world task — well ahead of what a naïve seven-month-doubling extrapolation would predict. The implication for regulation is direct: autonomy thresholds written in "hours of human-expert time" now cover a much wider capability range than a year ago, and responsible-scaling commitments calibrated against the HCAST curve may already be implicitly outdated.
- **Why it matters to SaferAI:** The CAIA evaluation paper's section on long-horizon autonomy thresholds should distinguish HCAST-scale benchmarks from real-software, weeks-long benchmarks and cite MirrorCode as concrete evidence that time-horizon-based thresholds need re-anchoring; it also strengthens the case for governance of METR-family benchmark methodology itself.
- **Confidence:** low
- **Why (confidence):** Preliminary results from a single collaboration (METR + Epoch), based in substantial part on one task family (`gotree`-style reimplementation). Has not been independently reproduced by a third party, and the human-expert time estimates drive the headline "weeks" framing.
