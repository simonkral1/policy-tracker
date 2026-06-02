---
date: 2026-06-02
type: papers
title: "Paper tracking digest — 2 June 2026"
period_start: 2026-05-19
period_end: 2026-06-02
sources_cited: 2
editor_note: "Two pieces this fortnight, both on oversight and eval validity. AISI publishes the first systematic map of how AI oversight could erode — four oversight surfaces (internal activations, chain-of-thought, external actions, inter-agent communication), more than twenty distinct degradation pathways, drawn from twenty-five expert interviews — landing as drafting input for the GPAI Code of Practice oversight provisions exactly as the AI Office's systemic-risk regime negotiates the same surfaces. The eval-validity thread that has been running since the AISI sandbox-metadata paper in the 5 May digest extends with a new mechanism: Deckenbach et al. show that fine-tuning models on synthetic documents describing evaluation traits inflates safety-benchmark scores even when the model never verbalises evaluation awareness, sharpening rather than retiring the awareness concern."
---

## 📚 Papers (last 14 days)

| Relevance | Title | Authors | Venue | Stage | URL |
|-----------|-------|---------|-------|-------|-----|
| 5 | Will it become harder to oversee AI systems? 🆕 NEW | UK AISI Oversight team | UK AI Security Institute | published | aisi.gov.uk/blog/will-it-become-harder-to-oversee-ai-systems |
| 4 | Models That Know How Evaluations Are Designed Score Safer 🆕 NEW | Deckenbach, Puerto, Geiping, Abdelnabi | arXiv | preprint | arxiv.org/abs/2605.28591 |

## 📖 Deep dives

### Will it become harder to oversee AI systems? 🆕 NEW
- **Authors:** UK AI Security Institute Oversight team
- **Venue:** UK AI Security Institute (blog + technical report)
- **arXiv ID:** null
- **URL:** https://www.aisi.gov.uk/blog/will-it-become-harder-to-oversee-ai-systems
- **Stage:** published
- **Summary:** AISI provides the first systematic map of how today's AI oversight stack could erode as systems scale. The report names four oversight surfaces — internal activations, chain-of-thought, external actions, and inter-agent communication — and enumerates more than twenty distinct pathways by which each could fail (latent reasoning, opaque CoT, evaluation gaming, multi-agent coordination outside the audit boundary, and others), drawn from twenty-five expert interviews across frontier developers, government, NGOs, and academia plus a literature review. The procedural framing is the policy headline: current oversight techniques work, but they work because of contingent properties of today's models — text-based reasoning, weak eval-gaming, human-interpretable activations — and AISI argues these properties should be actively measured and preserved rather than assumed. The report does not predict timelines; it offers a taxonomy and a concrete list of asks for developers and regulators. AISI's practical recommendations: developers should track exposure to each degradation pathway across model generations, preserve currently-available oversight channels by default, and invest in emerging fallbacks (e.g. activation-level probing) before the underlying property stops holding. The piece is timed against the GPAI Code of Practice's oversight provisions and the AI Office's draft systemic-risk guidance, both of which are negotiating exactly these surfaces.
- **Why it matters to SaferAI:** First systematic, jurisdiction-backed taxonomy of how the oversight stack itself can degrade — directly usable as drafting input in CAIA paper section 5 and in GPAI Code of Practice submissions, replacing the current state of arguing for "oversight" as an abstract category with a specific four-surface, twenty-pathway map that the AI Office and national competent authorities can require GPAISR providers to track and report against. Pairs naturally with the AISI sandbox-metadata paper from the 5 May digest (one of the twenty-plus pathways) and with the Irving/Krueger Article 55 safety-case template from the 19 May digest (which now has a defensible "containment-stack" leg to draw from).

(no additional 5-rated papers this period)
