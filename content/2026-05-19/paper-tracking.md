---
date: 2026-05-19
type: papers
title: "Paper tracking digest — 19 May 2026"
period_start: 2026-05-05
period_end: 2026-05-19
sources_cited: 6
editor_note: "Two policy-shaping pieces this fortnight. AISI publishes its first comparative biological-uplift evaluation of frontier models, finding that Claude Mythos and GPT-5.5 both clear the GPAI Code of Practice 'bio-uplift specialist threshold' tasks at 1.4×–1.9× uplift over expert-only baselines — making bio the second Critical Capability Level after cyber to be cleared cross-lab within thirty days. Separately, Irving, Krueger, and collaborators publish a structured safety-case template designed to slot directly into AI Act Article 55 systemic-risk documentation, the first concrete drafting input from the UK AISI–Cambridge axis on what an Article 55 safety case is actually meant to contain. Apollo and METR add follow-up evidence on scheming and long-horizon cyber autonomy."
---

## 📚 Papers (last 14 days)

| Relevance | Title | Authors | Venue | Stage | URL |
|-----------|-------|---------|-------|-------|-----|
| 5 | AISI comparative biological-uplift evaluation: Mythos and GPT-5.5 🆕 NEW | UK AISI Bio team | UK AI Security Institute | published | aisi.gov.uk/blog/our-bio-uplift-evaluations |
| 5 | Structured Safety Cases for Frontier AI: A Template for AI Act Article 55 🆕 NEW | Irving, Krueger, Mehlhorn et al. | arXiv, UK AISI | preprint | arxiv.org/abs/2605.11782 |
| 4 | Long-horizon Cyber Autonomy: from "The Last Ones" to 168-hour attack ranges 🆕 NEW | METR research team | METR | preprint | metr.org/blog/2026-05-15-long-horizon-cyber |
| 4 | Scheming Evaluation Suite v2: Frontier model deception under realistic deployment pressure 🆕 NEW | Apollo Research team | Apollo Research | preprint | apolloresearch.ai/research/scheming-eval-suite-v2 |
| 3 | API-mediated fine-tuning attacks: a survey of disclosed and undisclosed vulnerabilities 🆕 NEW | Carlini, Tramèr et al. | arXiv | preprint | arxiv.org/abs/2605.09415 |
| 3 | What 'sufficient elicitation' would mean under Article 55: a legal analysis 🆕 NEW | Krishnamurthy, Veale, Lazcoz | arXiv, FAccT 2026 | accepted | arxiv.org/abs/2605.10248 |

## 📖 Deep dives

### AISI comparative biological-uplift evaluation: Mythos and GPT-5.5 🆕 NEW
- **Authors:** UK AI Security Institute Bio team
- **Venue:** UK AI Security Institute (blog + technical evaluation)
- **arXiv ID:** null
- **URL:** https://www.aisi.gov.uk/blog/our-bio-uplift-evaluations
- **Stage:** published
- **Summary:** AISI ran a controlled within-subjects study where biology-PhD-level expert participants attempted a battery of seven multi-step laboratory-protocol design and troubleshooting tasks, calibrated against the GPAI Code of Practice "bio-uplift specialist threshold" and reviewed against the WHO BWC dual-use criteria. Expert-only baselines were compared against expert-plus-Claude-Mythos and expert-plus-GPT-5.5 conditions, with model access mediated through AISI's standard evaluation harness. Both frontier models produced statistically significant uplift: Mythos reached 1.9× expert-only on task completion rate and 2.1× on rubric-graded quality; GPT-5.5 reached 1.4× and 1.6× respectively. Mirroring the cyber pattern from the previous fortnight, AISI explicitly frames this as the second Critical Capability Level — after cyber-offensive autonomy — to be independently cleared by two frontier providers within a thirty-day window, and the first time the bio-uplift CCL has been crossed under disclosed, replicable protocol by an independent evaluator. AISI is careful that the protocols stop at protocol design and do not test downstream weaponisation, and that the "specialist threshold" tasks are designed to exclude material already accessible via Google Scholar — so results should not be read as evidence of weaponisation uplift in the lay-user threat model.
- **Why it matters to SaferAI:** First independent cross-lab evidence that the bio-uplift CCL — the second of the three CCLs in the GPAI Code of Practice systemic-risk regime — has been cleared by multiple frontier providers within the same window, which strengthens SaferAI's positioning that independent-evaluator access provisions in the AI Act systemic-risk regime cannot be calibrated as one-off, single-vendor exceptions and that triage capacity at AISI-equivalent national bodies needs to scale to parallel rather than serial evaluations.

### Structured Safety Cases for Frontier AI: A Template for AI Act Article 55 🆕 NEW
- **Authors:** Geoffrey Irving, David Krueger, Sara Mehlhorn et al. (UK AISI / Cambridge / MILA)
- **Venue:** arXiv (cs.CY / cs.AI), UK AISI technical report
- **arXiv ID:** 2605.11782
- **URL:** https://arxiv.org/abs/2605.11782
- **Stage:** preprint
- **Summary:** The authors propose a structured safety-case template that operationalises the AI Act Article 55 systemic-risk documentation requirement, adapting the Goal-Structuring Notation (GSN) tradition from aviation and nuclear safety to frontier-AI evidence. They specify five required argument legs — capability-bound claims, deployment-bound claims, elicitation-procedure claims, containment-stack claims, and incident-detection claims — each with sub-claims, admissible evidence types, and refutation conditions a regulator could use to reject the case. A worked example applies the template to a Mythos-class frontier model and shows what a defensible Article 55 safety case in front of a national competent authority would have to look like in 2026, given current evaluation evidence. The paper is explicitly written as drafting input for the GPAI Code of Practice safety-case section rather than as a research result, and is the first such template produced jointly from inside the UK AISI–Cambridge–MILA axis.
- **Why it matters to SaferAI:** Gives SaferAI a concrete, citable safety-case structure from authors already operating inside the UK AISI / Cambridge / MILA axis — usable as drafting input in CAIA paper section 5 and in GPAI Code of Practice submissions, replacing the current state of arguing for "safety cases" as an abstract evidentiary form with a specific five-leg template a national regulator could enforce.
