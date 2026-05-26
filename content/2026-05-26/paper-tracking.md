---
date: 2026-05-26
type: papers
title: "Paper tracking digest — 26 May 2026"
period_start: 2026-05-12
period_end: 2026-05-26
sources_cited: 5
editor_note: "Two methodological shifts and three eval-validity papers this fortnight. METR publishes its first entity-based Frontier Risk Report — a multi-lab pilot assessment of misalignment risks from internal AI agents at Anthropic, Google, Meta, and OpenAI, conducted on the labs' own state-of-the-art internal models rather than on public releases. Kapoor, Bommasani and a 17-author CRUX coalition argue for a complementary 'open-world evaluations' class to sit alongside benchmark-based testing, and demonstrate it by having an agent autonomously ship an iOS app to the App Store. Apollo Research publicly retires scheming evaluations as a primary research output and pivots to a 'Science of Scheming' agenda. Two arXiv preprints (the Evaluation Differential, and a decomposition of evaluation awareness) extend the eval-validity thread that has been running since the AISI sandbox-metadata paper in the 5 May digest."
---

## 📚 Papers (last 14 days)

| Relevance | Title | Authors | Venue | Stage | URL |
|-----------|-------|---------|-------|-------|-----|
| 5 | Frontier Risk Report (Feb–Mar 2026): multi-lab pilot of misalignment risks from internal AI agents 🆕 NEW | METR research team | METR | published | metr.org/blog/2026-05-19-frontier-risk-report |
| 5 | Open-World Evaluations for Measuring Frontier AI Capabilities 🆕 NEW | Kapoor, Kirgis, Bommasani et al. (CRUX) | arXiv | preprint | arxiv.org/abs/2605.20520 |
| 4 | The Evaluation Differential: When Frontier AI Models Recognise They Are Being Tested 🆕 NEW | Vishwarupe, Shadbolt, Jirotka, Flechais | arXiv | preprint | arxiv.org/abs/2605.11496 |
| 4 | Decomposing and Measuring Evaluation Awareness 🆕 NEW | Li, Zhang, Jin, Abdelnabi, Andriushchenko | arXiv | preprint | arxiv.org/abs/2605.23055 |
| 4 | Apollo Update May 2026: research-agenda shift from scheming evaluations to a Science of Scheming 🆕 NEW | Hobbhahn et al. (Apollo Research) | Apollo Research | preprint | apolloresearch.ai/blog/apollo-update-may-2026 |

## 📖 Deep dives

### Frontier Risk Report (Feb–Mar 2026): multi-lab pilot of misalignment risks from internal AI agents 🆕 NEW
- **Authors:** METR research team
- **Venue:** METR (blog + technical report)
- **arXiv ID:** null
- **URL:** https://metr.org/blog/2026-05-19-frontier-risk-report/
- **Stage:** published
- **Summary:** METR ran a four-lab pilot — Anthropic, Google, Meta, OpenAI — designed not around a public model release but around the labs themselves, taking access to each participant's most capable internal model(s) during the 16 February–16 March 2026 assessment window, including raw chains of thought, plus non-public information on internal AI usage and monitoring. The headline finding is that none of the internal models shared with METR were significantly more capable than the strongest publicly documented capabilities as of 19 May 2026, partially relaxing the worst-case "internal frontier well above the public frontier" hypothesis that has been driving systemic-risk anxiety. The more consequential framing is procedural rather than empirical: METR is moving from model-by-model evaluation to recurring, entity-based risk assessment, and explicitly plans to repeat the exercise in late 2026. METR also notes that the most capable agents in the exercise essentially saturated its Time Horizon 1.1 benchmark — with measured time horizons over two full-time-equivalent working days — and that rogue-deployment robustness should be expected to increase substantially in the coming months. Caveat: the report is METR's own write-up of an exercise it ran, not an independently audited dataset, and the "no public-private gap" conclusion is bounded to the snapshot window and to the models the labs chose to share.
- **Why it matters to SaferAI:** First publicly-reported example of independent-evaluator access conducted at the developer-entity level rather than the model level, with the four named labs participating voluntarily — gives SaferAI a concrete precedent to cite when arguing under the GPAI Code of Practice and the AI Office's systemic-risk regime that Article 55 independent-evaluator provisions should be specified as recurring entity-based assessments with access to internal-frontier model checkpoints and CoT, not only as model-specific pre-deployment tests on public releases.

### Open-World Evaluations for Measuring Frontier AI Capabilities 🆕 NEW
- **Authors:** Sayash Kapoor, Peter Kirgis, Andrew Schwartz, Stephan Rabanser, J.J. Allaire, Rishi Bommasani et al. (17 authors, CRUX coalition: academia, government, civil society, industry)
- **Venue:** arXiv (cs.CY / cs.AI)
- **arXiv ID:** 2605.20520
- **URL:** https://arxiv.org/abs/2605.20520
- **Stage:** preprint
- **Summary:** The authors argue that benchmark-based evaluation systematically privileges tasks that can be precisely specified, automatically graded, and run with short time horizons — and that this set of constraints can both overstate and understate what frontier systems can actually do once deployed. They propose "open-world evaluations": long-horizon, messy, real-world tasks assessed through small-sample qualitative analysis rather than benchmark-scale automation, and announce CRUX, a 17-researcher coalition spanning academia, government, civil society, and industry that will run this class of evaluation on a recurring basis. The paper's headline demonstration is a single end-to-end exercise in which an AI agent autonomously built and published an iOS app to the App Store, with two errors (one requiring manual intervention) — disclosed to Apple a month before publication as an early warning about agent-driven app-store spam. The piece reads not as a research result but as drafting input for what an evaluation regime should look like outside the benchmark frame: shorter than a safety case, broader than a benchmark, and explicitly designed to surface deployment-realistic capabilities and risks that benchmarks miss.
- **Why it matters to SaferAI:** Pairs naturally with the 12 May Frontier Lag bibliometric audit — both papers argue that the academic evaluation literature is the wrong evidence base for systemic-risk policy. Open-World Evaluations gives SaferAI a positively-framed alternative (not just "don't rely on benchmarks" but "here is a concrete coalition and method") to point to in GPAI Code of Practice and AI Office submissions when arguing that pre-deployment evaluation expectations should require deployment-realistic, qualitative evidence in addition to benchmark scores.

(no additional 5-rated papers this period)
