---
date: 2026-05-05
type: newsletter
title: "Newsletter digest — 5 May 2026"
period_start: 2026-04-28
period_end: 2026-05-05
sources_cited: 7
editor_note: "Direct RSS and landing-page fetches were blocked again (403 across all newsletters); selection relied on web search and per-post URL verification. Five core newsletters confirmed in-window items, with the dominant story shifting from AISI evaluation findings (last week) to the White House's emerging informal pre-release licensing regime for frontier models — Transformer leads on it, EU AI Act Newsletter #101 picks up the European mirror via the IMCO/LIBE Anthropic hearing. Import AI 455 lands a major essay on automated AI R&D the same week Epoch publishes a 660k-H100e compute-smuggling estimate; both feed the compute-threshold debate. Anton Leicht, Hyperdimensional and Peter Wildeford remain quiet; Dwarkesh's in-window episode is technical not policy."
---

## Transformer

### Government control of AI has begun 🆕 NEW
- **URL:** https://www.transformernews.ai/p/government-control-of-ai-has-begun-mythos-cybersecurity-white-house-trump
- **Published:** 2026-05-01 (approximate; piece references the 4 May NYT scoop on pre-release vetting and the 29 April Axios scoop on the Anthropic executive order)
- **Stage:** analysis
- **Why it matters:** Transformer's lead this week argues the US has, without an executive order or statute, slid into an "informal, highly improvised licensing regime" for frontier models — the White House asked Anthropic not to expand Mythos access, is workshopping a new AI policy memo to replace Biden's NSM-AI, and is reportedly drafting a working group on pre-release model review (NYT, 4 May; Axios, 4 May; Bloomberg, 4 May). The piece's policy claim is that ad-hoc White House intervention without statutory authority or pre-defined capability thresholds is the worst of both worlds: it concentrates discretion in the executive while giving labs no rule to plan against. This is the strongest US-side argument SaferAI has yet had to make for a *statutory* pre-deployment evaluation regime — and it lands two weeks before the AI Act Omnibus reconvenes (13 May) and three weeks before the Cypriot Presidency closes. Worth citing in any near-term comparative-governance brief.
- **Confidence:** medium
- **Why (confidence):** Transformer URL verified; article date inferred from the NYT/Axios/Bloomberg reporting it cites (all 4 May) and the search-result timestamp ("4 days ago"). Substantive claims align with NYT, Axios and Bloomberg coverage from the same day.

### Weekly briefing — Anthropic sues Pentagon, CHATBOT Act, Google–DoD deal 🆕 NEW
- **URL:** https://www.transformernews.ai/t/briefing
- **Published:** 2026-05-02 (approximate; weekly briefing covering the 28 April CHATBOT Act introduction and 1 May Pentagon deals)
- **Stage:** reported
- **Why it matters:** Three policy-actionable items in one issue. (1) The 28 April Cruz/Schatz/Curtis/Schiff CHATBOT Act creates a federal "family-account" regime for minors' chatbot use — narrow scope, but signals that the Senate Commerce package Cruz has trailed for "the next six weeks" will lead with child-safety framing rather than systemic-risk framing, which is the wrong lever for SaferAI's agenda and worth pushing back on early. (2) Anthropic has now formally sued the Pentagon in the Northern District of California and the DC Circuit alleging an "unlawful campaign of retaliation"; the Pentagon simultaneously announced procurement deals with eight rivals including Google, Nvidia and SpaceX, locking in a multi-vendor frontier-model footprint that excludes the lab AISI rates as the most capable. (3) Anthropic's reported $50bn round at >$900bn marks a valuation overtake of OpenAI for the first time and changes the political-economy backdrop to every Anthropic-vs-state story below.

## GDM AI Policy Perspectives

_No frontier-risk-policy items this week._ The single in-window post — Conor Griffin, Don Wallace and Theo Brown, "Science Needs AI Data Stocktakes" (https://www.aipolicyperspectives.com/p/science-needs-ai-data-stocktakes, 2026-04-30) — is a proof-of-concept on AI-for-fusion data quality, interesting for the AI-for-science file but outside SaferAI's frontier-risk-management agenda. Still no AI Policy Primer #25; #24 (2026-04-09) remains the last issue in that series.

## Anton Leicht — Threading the Needle

_No items this week._ Same status as the past two digests — no in-window post surfaced via search and the landing page was 403. Worth re-checking after the 13 May trilogue, which is where Leicht's beat would normally re-engage.

## Hyperdimensional

_No items this week._ Dean Ball's last confirmed Hyperdimensional post remains "New Sages Unrivalled" (2026-04-08); his recent White-House-vetting and Mythos commentary continues to appear in The Dispatch and on X rather than the Substack. No in-window Hyperdimensional item to cite.

## Import AI

### Import AI 455: AI systems are about to start building themselves 🆕 NEW
- **URL:** https://jack-clark.net/2026/05/04/import-ai-455-automating-ai-research/
- **Published:** 2026-05-04
- **Stage:** analysis
- **Why it matters:** Jack Clark's first issue back from the 26 April skip is the long essay he had trailed: a claim that the engineering pieces of frontier AI development — coding, debugging, training-loop orchestration — are now sufficiently automatable that "model end-to-end trains its successor" is plausibly a one- to two-year proof-of-concept, with OpenAI publicly targeting an "automated AI research intern by September 2026". He stacks the well-cited METR-style task-length progression (~30s in 2022 → ~12h with Opus 4.6 in 2026) and reports Mythos Preview clocks 52× speedups on a research-engineering benchmark where Opus 4 was at 2.9× a year earlier. For SaferAI: this is the most-cited primary source the policy team will be asked about by funders and journalists this month, and it is the strongest available evidence base for arguing that the AI Act systemic-risk tier needs a *capability-trajectory* trigger (R&D-acceleration metrics, autonomy-window benchmarks) rather than a static FLOP threshold. Read in full before any compute-threshold-design conversation in the next fortnight.

## Peter Wildeford — The Power Law

_No in-window post confirmed on peterwildeford.substack.com._ The "Mythos is just the beginning" post on blog.peterwildeford.com — flagged by search as "~2 weeks ago" — appears to date to ~21 April, outside this window and just outside the prior digest's window. Source YAML still points to the Substack URL as the canonical feed; if blog.peterwildeford.com is in fact still active, the YAML may need a second look in next week's audit.

## Epoch AI — Gradient Updates

### Diversion and resale: estimating compute smuggling to China 🆕 NEW
- **URL:** https://epochai.substack.com/p/diversion-and-resale-estimating-compute
- **Published:** 2026-04-29
- **Stage:** analysis
- **Why it matters:** Epoch's first Gradient Update in months puts a number on a quantity the export-control debate has been arguing about without one: ~660,000 H100-equivalents (90% CI 290k–1.6M) of cumulative restricted compute physically diverted to China through end-2025 — higher than CNAS's and ChinaTalk's estimates but with overlapping confidence intervals. The piece lands the same week six men were federally charged with chip-smuggling and the same week Import AI 455 puts automated-AI-R&D on the policy table, which together reframe the BIS-controls and AI-Diffusion-rule debate around a question the policy team has been pushed off: are the existing controls binding at the margin, and at what loss-rate do they stop mattering? Useful primary citation in any submission on AI Act systemic-risk methodology, BIS comments, or G7 export-control coordination work.

## Dwarkesh Podcast

_No frontier-risk-policy item this week._ The in-window episode, "Reiner Pope — The math behind how LLMs are trained and served" (https://www.dwarkesh.com/p/reiner-pope, 2026-04-29, 2h14m), is a technical blackboard lecture on training/inference economics by the MatX CEO and former Google TPU lead — useful primer reading for anyone working compute-governance or chip-supply briefs, but not policy news. Flag for the technical-staff reading list, not the digest.

## EU AI Act Newsletter

### #101: Trilogue Breakdown 🆕 NEW
- **URL:** https://artificialintelligenceact.substack.com/p/the-eu-ai-act-newsletter-101-trilogue
- **Published:** 2026-05-04 (approximate; "1 day ago" as of 5 May)
- **Stage:** trilogue
- **Why it matters:** Risto Uuk's first issue after the 28 April Omnibus collapse confirms three things SaferAI needs to plan against. (1) The breakdown was on the Annex I conformity-assessment architecture for AI-in-products, not on the high-risk-deadline postponement, so the August 2 obligations remain legally in force pending a successful 13 May reconvene under the Cypriot Presidency. (2) Chancellor Merz is now publicly diverging from the SPD on AI Act simplification, calling EU rules a "corset" on industrial AI; the SPD is pushing back that the Omnibus would gap protections and benefit non-EU firms, which materially changes the German vote calculus on any compromise text. (3) IMCO/LIBE has invited Anthropic to a Parliamentary hearing on the "safety and cybersecurity risks potentially posed by advanced AI systems" via the Mythos model — the first time a frontier lab will testify to Parliament specifically on frontier-risk capabilities, and the natural venue for SaferAI to push for AISI-style binding evaluations to be written into the AI Office's enforcement architecture before the Cypriot Presidency closes on 30 June.

## 🔗 Cross-newsletter themes

- **Pre-release model vetting is now the dominant frontier-risk-policy story on both sides of the Atlantic.** Transformer's "Government control of AI has begun" frames the US move as an informal, ad-hoc licensing regime emerging without statutory authority; EU AI Act Newsletter #101 reports IMCO/LIBE summoning Anthropic to a Parliamentary hearing on Mythos-class capabilities. This is the single biggest agenda shift since AISI's 13 April Mythos finding — expect Anton Leicht, Hyperdimensional, GDM AI Policy Perspectives, Lawfare and Tech Policy Press to converge on it within a week.
- **Compute governance is splitting into "diversion" and "trajectory" tracks.** Epoch's 660k-H100e smuggling estimate (Gradient Updates, 29 April) and Import AI 455's automated-AI-R&D essay (4 May) are the two anchor data points the policy team will hear cited together for the next month. Together they argue the static FLOP-threshold approach in both BIS controls and the AI Act systemic-risk tier is increasingly poorly fitted to the actual compute landscape — leakage on one side, capability acceleration per FLOP on the other.
- **The Anthropic–state story has now produced legal, procurement, and supervisory artefacts in the same week.** Anthropic's Pentagon lawsuit (covered in Transformer's briefing) sits alongside the Pentagon's eight-vendor procurement workaround (1 May), the White House's pre-release-vetting EO drafting (4 May NYT/Axios/Bloomberg), and the European Parliament's Mythos hearing invitation (EU AI Act Newsletter #101). For SaferAI: the legal and procurement angles are downstream effects; the supervisory artefacts (US informal licensing + Parliament hearing) are the ones to engage on.

## 🔇 Quiet this week

_Newsletters scanned but with no in-window frontier-risk-relevant item — see per-newsletter notes above for specifics._

- GDM AI Policy Perspectives — 30 April post is AI-for-science, out of scope for SaferAI's agenda.
- Anton Leicht — Threading the Needle — no in-window post surfaced; third week running.
- Hyperdimensional — no in-window Substack post; commentary continues to appear in The Dispatch.
- Peter Wildeford — The Power Law — no in-window post confirmed on the Substack; possible blog.peterwildeford.com post just outside this window.
- Dwarkesh Podcast — in-window episode is technical (training/inference math), not policy.
