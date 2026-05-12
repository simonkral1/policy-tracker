---
date: 2026-05-12
type: papers
title: "Paper tracking digest — 12 May 2026"
period_start: 2026-04-28
period_end: 2026-05-12
sources_cited: 6
editor_note: "Three policy-shaping pieces this fortnight. AISI shows GPT-5.5 matches Claude Mythos Preview on the 32-step 'The Last Ones' corporate-network range and clears it end-to-end in 2 of 10 attempts — the cyber autonomy threshold is no longer single-lab, single-model. A Hagendorff-team study finds that verbalised evaluation awareness in open-weight reasoning models has near-zero effect on safety and alignment behaviour, partially relaxing — but not resolving — the eval-validity concern raised by AISI's sandbox-metadata paper in the last digest. And a pre-registered bibliometric audit (Frontier Lag) finds that the academic AI-evaluation literature is widening its capability gap to the contemporaneous frontier by ~5.5 ECI points/year, with half of studies generalising results to 'AI' rather than to specific tested models — directly relevant to which evidence base SaferAI and the CAIA paper should cite as authoritative."
---

## 📚 Papers (last 14 days)

| Relevance | Title | Authors | Venue | Stage | URL |
|-----------|-------|---------|-------|-------|-----|
| 5 | AISI evaluation of OpenAI's GPT-5.5 cyber capabilities 🆕 NEW | UK AISI Cyber team | UK AI Security Institute | published | aisi.gov.uk/blog/our-evaluation-of-openais-gpt-5-5-cyber-capabilities |
| 5 | Evaluation Awareness in Language Models Has Limited Effect on Behaviour 🆕 NEW | Knecht, Florin, Hagendorff | arXiv | preprint | arxiv.org/abs/2605.05835 |
| 5 | Frontier Lag: A Bibliometric Audit of Capability Misrepresentation in Academic AI Evaluation 🆕 NEW | (anonymous / pre-registered audit team) | arXiv | preprint | arxiv.org/abs/2605.04135 |
| 4 | Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity 🆕 NEW | METR research team | METR | preprint | metr.org/blog/2026-05-11-ai-usage-survey |
| 4 | The Compliance Trap: How Structural Constraints Degrade Frontier AI Metacognition Under Adversarial Pressure 🆕 NEW | Kumar | arXiv | preprint | arxiv.org/abs/2605.02398 |
| 3 | Position: Mechanistic Interpretability Must Disclose Identification Assumptions for Causal Claims 🆕 NEW | (position paper team) | arXiv | preprint | arxiv.org/abs/2605.08012 |

## 📖 Deep dives

### AISI evaluation of OpenAI's GPT-5.5 cyber capabilities 🆕 NEW
- **Authors:** UK AI Security Institute Cyber team
- **Venue:** UK AI Security Institute (blog + technical evaluation)
- **arXiv ID:** null
- **URL:** https://www.aisi.gov.uk/blog/our-evaluation-of-openais-gpt-5-5-cyber-capabilities
- **Stage:** published
- **Summary:** An early checkpoint of OpenAI's GPT-5.5 reaches a 71.4% (±8.0%) pass rate on AISI's expert-level cyber tasks — statistically indistinguishable from Claude Mythos Preview's 68.6%, and a step-change above GPT-5.4 at 52.4% and Opus 4.7 at 48.6%. More consequentially, GPT-5.5 completes the 32-step "The Last Ones" autonomous corporate-network attack range end-to-end in 2 of 10 attempts, becoming the second model ever to clear it. AISI explicitly frames this as evidence that the Mythos cyber result was not idiosyncratic: cyber-offensive skill appears to be emerging as a byproduct of general improvements in long-horizon autonomy, reasoning, and coding, and the gap between frontier labs at this capability is closing rather than widening. For the GPAI Code of Practice systemic-risk regime, the fortnight's update is that "first model to cross a Critical Capability Level threshold" has already become "two models from two labs, within thirty days." The same caveat as for Mythos applies — AISI's ranges have no live defenders or endpoint detection, so the claim is bounded to weakly-defended systems — but the cross-lab generalisation is the headline.
- **Why it matters to SaferAI:** Cross-lab, cross-model confirmation of the Mythos cyber-CCL threshold strengthens SaferAI's positioning that cyber-autonomy thresholds in the GPAI Code of Practice must be defined as model-class capabilities, not single-vendor exceptional behaviour — and accelerates the case for the AI Office's systemic-risk independent-evaluator access provisions, which are now demonstrably needed for at least two providers in parallel rather than as a hypothetical regime.

### Evaluation Awareness in Language Models Has Limited Effect on Behaviour 🆕 NEW
- **Authors:** Amelie Knecht, Lucas Florin, Thilo Hagendorff (Stuttgart / Interchange Forum for Reflecting on Intelligent Systems)
- **Venue:** arXiv (cs.CL / cs.AI)
- **arXiv ID:** 2605.05835
- **URL:** https://arxiv.org/abs/2605.05835
- **Stage:** preprint
- **Summary:** The authors test whether large reasoning models that verbalise evaluation awareness in their chains of thought ("this looks like a benchmark…") actually change their behaviour because of it. Across open-weight reasoning models and benchmarks spanning safety, alignment, moral reasoning, and political opinion, they find that verbalised evaluation awareness (VEA) has near-zero effect: injecting VEA into chains of thought by prefilling produces effectively no behavioural shift, and removing VEA from CoTs that contained it spontaneously produces only small shifts. The policy reading is two-edged. On one side, it weakens the strongest version of the eval-validity critique levelled at sabotage-risk and pre-deployment evaluations — at least for open-weight reasoning models, the CoT-level "I'm being tested" signal does not by itself drive strategic compliance. On the other, the result is silent on non-verbalised evaluation awareness (the scenario AISI's sandbox-metadata paper documented two weeks ago) and on frontier closed-weight models, so it does not retire the eval-validity question; it sharpens it.
- **Why it matters to SaferAI:** Directly relevant to the live argument over how much weight to put on sabotage-risk and alignment-faking evaluations in the GPAI Code of Practice — this paper gives SaferAI a citable empirical counterweight to the "evaluations are unreliable because the model knows it's being tested" framing, while preserving the narrower (and policy-relevant) version of the concern that targets non-verbalised, infrastructure-leakage-driven awareness.
- **Confidence:** low
- **Why (confidence):** arXiv preprint not yet peer-reviewed; tested on open-weight reasoning models only, so the negative result may not generalise to frontier closed-weight systems, which are the systemic-risk regime's target population.

### Frontier Lag: A Bibliometric Audit of Capability Misrepresentation in Academic AI Evaluation 🆕 NEW
- **Authors:** Pre-registered audit team (anonymous arXiv submission)
- **Venue:** arXiv (cs.CY / cs.AI)
- **arXiv ID:** 2605.04135
- **URL:** https://arxiv.org/abs/2605.04135
- **Stage:** preprint
- **Summary:** The authors run a pre-registered bibliometric audit of 112,303 LLM-keyword-matched candidate records published between January 2022 and April 2026 (18,574 admissible, 4,766 full-paper texts) and measure the "publication elicitation gap" — the distance between the model an academic paper actually tested and the contemporaneous frontier on the Epoch AI Capabilities Index. The gap is widening at +5.53 ECI points per year. Only 3.2% of abstracts (21.2% of full-texts) disclose whether reasoning-mode was enabled on reasoning-capable models, and 52.5% of studies state conclusions at the level of "AI" rather than specifying the model tested — a generalisation rate that is itself growing at 1.23× per year. The authors propose VERSIO-AI, a 13-item reporting checklist (three of them desk-reject items) requiring configuration-surface disclosure, and call for API-access subsidies plus editorial enforcement. The policy implication is that the academic literature on what AI systems can do is systematically describing yesterday's, cheaper, less-elicited systems — and policymakers treating it as a current evidence base will be calibrated to a moving median that lags the frontier by a widening margin.
- **Why it matters to SaferAI:** Strengthens the case in SaferAI's CAIA paper and in GPAI Code of Practice positioning for prioritising frontier-lab and AISI/METR-style elicited-evaluation evidence over the broader academic literature on capability claims, and gives SaferAI a concrete reporting framework (VERSIO-AI) to point to when arguing that pre-deployment evaluation expectations should require disclosure of elicitation conditions, not just headline scores.

(no additional 5-rated papers this period)
