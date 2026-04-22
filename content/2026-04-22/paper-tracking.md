---
date: 2026-04-22
type: papers
title: "Paper Tracking — 8–22 April 2026 (SEED SAMPLE)"
period_start: 2026-04-08
period_end: 2026-04-22
sources_cited: 5
editor_note: "SEED SAMPLE — placeholder paper digest for site rendering."
---

A quiet fortnight on pure-capabilities benchmarks, but a concentrated cluster of interpretability and model-organism work that sharpens the empirical case for deceptive-alignment concerns. METR's latest long-horizon autonomy measurements also landed, and are likely to be cited in the next round of RSP threshold debates.

| Title | Authors | Venue | Relevance | Summary |
|---|---|---|---|---|
| Long-horizon autonomous task completion in frontier models: April 2026 measurements | METR research team | METR (technical report) | 5 | New datapoints extending METR's time-horizon curve; trend continues to roughly double every 7 months. |
| Sparse autoencoder features that predict sandbagging behaviour | Academic + industry collaboration | arXiv | 4 | Identifies SAE features whose activation correlates with evaluation-time underperformance on capability probes. |
| Model organisms of deceptive alignment at realistic scale | Alignment research group | arXiv | 4 | Replicates earlier sleeper-agent results in settings closer to production post-training pipelines. |
| Dangerous capability evaluations: what transfers between labs? | Multi-lab evaluation working group | arXiv | 3 | Cross-lab replication study on bio and cyber uplift evals; finds meaningful variance from prompt sensitivity. |
| Interpretability-guided red teaming for refusal robustness | University + frontier lab | arXiv | 3 | Uses circuit-level analysis to generate attacks that bypass refusal training; partial defence proposed. |

## 📖 Deep dives

### Long-horizon autonomous task completion — April 2026 measurements (METR)
METR's refreshed time-horizon benchmark puts current frontier models at roughly the 2-to-4-hour mark on their autonomy task suite, continuing the trend they first publicised in 2024. The delta since the January 2026 snapshot is larger than the seven-month-doubling heuristic would predict, driven mostly by one lab's post-training improvements rather than base-model scale. SaferAI should care because this is now the most-cited external measurement in RSP revision debates and in European AI Office systemic-risk discussions — which means its methodology assumptions (task selection, grading rubric, elicitation budget) are effectively becoming de facto regulatory instruments. The follow-up question worth raising: should pre-deployment evaluation frameworks specify autonomy thresholds in METR-equivalent task-hours, or is that locking regulation into one organisation's measurement choices? If the former, governance of METR's methodology itself becomes a policy question.
