---
date: 2026-05-13
type: news
title: "News updates — 13 May 2026"
period_start: 2026-05-06
period_end: 2026-05-13
sources_cited: 15
editor_note: "Two stories define the week. (1) The transatlantic pre-deployment-evaluation architecture put in place on 5 May has already produced its first lab-level split: OpenAI committed on 11 May to give EU cyber defenders access to GPT-5.5-Cyber under the new Trusted Access for Cyber programme, while the Commission confirms Anthropic continues to withhold equivalent Mythos access after four or five meetings. (2) The US federal-preemption push scored its first state-legislative win — Colorado SB 26-189 cleared both chambers in five days (Senate 34-1 on 7 May, House 57-6 on 9 May) and goes to Governor Polis's desk, gutting the country's first comprehensive AI law. Secondary: ServiceNow's 'kill switch' launch at Knowledge 2026 is the first major enterprise-software response to the agentic-incident wave the PocketOS case crystallised, and Kim Yong-beom's 12 May Facebook post on an 'AI citizen dividend' shed 5.1% off the Kospi before the Korean president walked it back."
---

## Geopolitics & AI

### Korea's 'AI citizen dividend' Facebook post triggers 5.1% Kospi drop, then presidential walk-back 🆕 NEW
- **Sources:**
  - https://www.bloomberg.com/news/articles/2026-05-12/korea-floats-citizen-dividend-using-ai-profits-samsung-falls
  - https://www.bloomberg.com/news/articles/2026-05-13/korea-president-clarifies-policy-chief-s-citizen-dividend-post
  - https://www.japantimes.co.jp/business/2026/05/12/tech/korea-citizen-dividend-ai-gains/
  - https://en.sedaily.com/finance/2026/05/12/kim-yong-beoms-ai-dividend-remarks-rattle-korean-market
  - https://www.koreatimes.co.kr/business/companies/20260513/chief-policy-staffs-idea-of-national-dividends-using-ai-profit-triggers-concerns
- **Published:** 2026-05-12 to 2026-05-13
- **Stage:** announced
- **Beat:** geopolitics-ai
- **Why it matters:** Kim Yong-beom, chief of the Presidential Office's policy planning office, used a Facebook post on 12 May to argue that "as competition over AI chips, power grids and data centres reshapes the structure of the Korean economy, a new social contract is needed to ensure the fruits do not remain confined to specific companies or asset-holding classes." He proposed a "national dividend" funded by AI-era tax revenues, with suggested uses including startup capital for young people, basic income for farming and fishing communities, support for artists, and stronger old-age pensions. Foreign outlets read the post as a windfall levy on Samsung Electronics and SK hynix; the Kospi sank as much as 5.1% intraday before paring losses when Kim clarified he meant "excess tax revenue" rather than a new corporate levy. President Lee Jae Myung then publicly framed the post on 13 May as "a review of a plan to distribute the national excess tax revenue generated from excess profits in the AI sector to the public as a citizen's dividend." For SaferAI: this is the first time a G20 government's senior economic adviser has put the political-economy of frontier-AI rents on the front page as a *redistribution* question rather than a *concentration* question, and it lands in the same Korea that the prior digest flagged for $30bn of hyperscaler–chaebol compute commitments. The substantive proposal is unlikely to survive contact with the chaebol lobby, but the rhetorical move — frontier AI as a national tax base — is portable: if it travels to Brussels via the AI Office's emerging Article 53/55 enforcement debate or to Westminster ahead of the next King's Speech, it will reframe systemic-risk obligations as the *floor* of a much larger fiscal conversation. Worth tracking as the first market-moving political-economy signal in the Korea file.

## Safety & Risk management

### ServiceNow launches AI Control Tower 'kill switch' at Knowledge 2026, citing the PocketOS-style 9-second incident 🆕 NEW (follow-up to prior digest's PocketOS item)
- **Sources:**
  - https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-expands-AI-Control-Tower-to-discover-observe-govern-secure-and-measure-AI-deployed-across-any-system-in-the-enterprise/default.aspx
  - https://fortune.com/2026/05/06/servicenow-kill-switch-ai-agents-bill-mcdermott/
  - https://www.theregister.com/software/2026/05/05/servicenow-adds-agent-kill-switches-to-ai-control-tower/5228579
- **Published:** 2026-05-05 (announcement) to 2026-05-06 (in-window coverage)
- **Stage:** announced
- **Beat:** safety-risk-management
- **Why it matters:** ServiceNow used its Knowledge 2026 keynote in Las Vegas to extend AI Control Tower with what CEO Bill McDermott called "the kill switch" — a single-action pause/redirect/stop capability for any AI agent operating across an enterprise, including agents from third-party vendors. McDermott opened the announcement with the PocketOS-style example — "an AI agent gained elevated permissions and, in 9 seconds, deleted an entire production database — customer records, reservations, every backup" — and ServiceNow's press release commits to detection-to-shutdown in real time when an agent operates beyond its permission scope. The product enters Innovation Lab in May; general availability is scheduled for August 2026 and ServiceNow is offering the tier free for one year (a stated $2m value) to enterprises that deploy it. Three points for SaferAI's risk-management line: (1) this is the first major enterprise-software vendor to launch an agent-containment product *named* against the agentic-incident category the OECD AI Incidents Monitor logged for the first time two weeks ago, which moves the deployment-configuration argument from policy advocacy into vendor roadmap; (2) the technical premise — that the safe-by-design unit of analysis is the *deployment*, not the model — is now a commercial claim with an addressable budget, which strengthens the case for incident-reporting templates that capture write-access scoping and confirmation-step bypasses rather than only model-class capability; (3) for the GPAI Code of Practice serious-incident-reporting drafting still in progress, the existence of a commercial kill-switch product weakens the "infeasible to operationalise" objection that has been raised against agent-level containment obligations. Worth citing in the next AI Office incident-reporting submission and in any near-term enterprise-deployer outreach.

## Capability uplifts

_No frontier-tier release in window. GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro and DeepSeek V4 Pro all remain the live comparison set; the in-window movement on capability is exclusively on the access-governance side and is captured under Regulatory developments below._

## Regulatory developments

### Transatlantic pre-deployment-evaluation split: OpenAI commits GPT-5.5-Cyber to EU access via TAC programme, Anthropic continues to withhold Mythos 🆕 NEW
- **Sources:**
  - https://www.cnbc.com/2026/05/11/openai-eu-cyber-model-anthropic-mythos-gpt.html
  - https://www.axios.com/2026/05/07/openai-gpt-55-cybersecurity-model
  - https://www.yahoo.com/news/articles/openai-offers-eu-access-cybersecurity-120959802.html
- **Published:** 2026-05-07 (Axios on TAC programme expansion) to 2026-05-11 (CNBC on EU access commitment and Commission confirmation)
- **Stage:** announced
- **Beat:** regulatory-developments
- **Why it matters:** On 11 May the European Commission publicly confirmed that OpenAI has committed to give EU cyber defenders access to GPT-5.5-Cyber for evaluation and potential deployment, via the highest tier of OpenAI's Trusted Access for Cyber (TAC) programme — which Axios reported on 7 May as the expanded developer-side mechanism. By contrast, the Commission stated that talks with Anthropic on equivalent Mythos access had reached "four or five" meetings but were "not yet at the same stage as the solution we have on the table from OpenAI." The substantive divergence matters because UK AISI's most recent cyber evaluation puts GPT-5.5 and Mythos on a statistical par at the "The Last Ones" 32-step autonomous attack range (2/10 and 3/10 end-to-end clears respectively), so the EU is — for the first time post-Mythos — being offered structured pre-deployment access to one frontier cyber-capability model and not the other. Three readings for SaferAI's transatlantic work: (1) the policy team's positioning that *binding* Article 92 access is structurally different from voluntary CAISI-style agreements just gained an empirical test case — OpenAI's voluntary EU offer is real but partial, and Anthropic's voluntary non-offer is the precise gap Article 92 would close; (2) the lab-level divergence weakens the "two-track US vs EU governance" framing — the divergence is now lab-by-lab within each jurisdiction, not jurisdiction-by-jurisdiction, which is a stronger argument for harmonised access powers than for jurisdictional duplication; (3) Anthropic's holdout posture against the EU sits awkwardly beside the company's Pentagon lawsuit (covered in the prior newsletter digest) — the political-economy of the lab's regulator-engagement strategy is becoming a story in its own right. Worth a short comparative-access brief before the 18–21 May Brussels plenary the legislative digest flags as the Omnibus formal-adoption window.

### Colorado SB 26-189 clears both chambers in five days, gutting the country's first comprehensive AI law 🆕 NEW (was: first committee unanimous 4 May → now: passed both chambers, on governor's desk)
- **Sources:**
  - https://leg.colorado.gov/bills/sb26-189
  - https://coloradosun.com/2026/05/12/colorado-ai-law-rewrite-passes/
  - https://www.cpr.org/2026/05/12/ai-artificial-intelligence-disclosure-bill-colorado/
  - https://www.jdsupra.com/legalnews/colorado-rewrites-its-landmark-ai-law-9230800/
- **Published:** 2026-05-09 (House passage) to 2026-05-12 (in-window legal analysis and governor's commitment)
- **Stage:** adopted (pending signature)
- **Beat:** regulatory-developments
- **Why it matters:** SB 26-189 cleared the Colorado Senate 34-1 on 7 May and the House 57-6 on 9 May — five days after unanimous first-committee passage, which the legislative digest had flagged but at that stage as an open process. Governor Polis has publicly committed to sign. The substantive effect is that the first comprehensive US state AI law — SB 24-205, the Colorado AI Act — is being *replaced* rather than reformed: SB 189 (i) delays the operative date from 30 June 2026 to 1 January 2027, (ii) repeals the affirmative duties to prevent algorithmic discrimination, (iii) drops the requirement that companies explain how their AI systems work, (iv) replaces the comprehensive risk-assessment and disclosure regime with a basic consumer-notice obligation, and (v) narrows scope from "high-risk AI" to "automated decision-making technology" with a thinner definition. The political read: the DOJ–xAI federal-preemption suit (covered in the legislative digest under "🟡 ON THE RADAR") did its job *without going to judgment* — Colorado legislators chose accelerated retreat over a constitutional fight, and the fact that the SB 24-205 lead sponsor Senator Rodriguez was the architect of the rewrite makes the climb-down explicit. For SaferAI: the federal-state preemption test SaferAI flagged is no longer a contested *legal* question in Colorado — it is a confirmed *political* outcome, which is the more durable version. California SB 53 is now structurally the next target, and its first incident-reporting window (open since January 2026 under Cal OES) is the natural pressure point. The implication for the AI Office's enforcement architecture is asymmetric and unfavourable: the US comparative-governance baseline is now demonstrably softer than it was in late April, which strengthens both the case for AI Act systemic-risk binding obligations *and* the political headwind for them.

## Hype & trends

_Live story is captured under Geopolitics above — the Korean 'AI citizen dividend' post is simultaneously the week's largest market-moving AI-related event (Kospi −5.1%) and the most consequential political-economy framing shift in the frontier-AI rents debate. No further hype/trend item rose above the noise floor; the Q1 venture concentration story remains where the prior digest left it._

## Quiet / watchlist

- **Geopolitics & AI:** No new in-window UK / India / UAE / Singapore announcement of policy weight. India's AI Safety Institute announcement under the IndiaAI Mission predates this window; no in-window operational milestone surfaced. Korea (above) is this week's live geopolitics story.
- **Safety & Risk management:** No new AISI publication in window; the late-April Frontier-cyber and evaluation-awareness papers (covered in the paper-tracking digest) remain the live empirical base. International AI Safety Report 2026 update cycle has not produced an in-window deliverable.
- **Capability uplifts:** No new frontier-model release in window. The comparison set remains GPT-5.5 / Opus 4.7 / Gemini 3.1 Pro / DeepSeek V4 Pro; the CAISI evaluation of DeepSeek V4 Pro (published 3 May, finding an ~8-month frontier gap) sits just outside the 7-day window but is generating sustained in-window analytical pushback (notably from independent trackers placing the gap at ~2.7% on public leaderboards) — flag as a candidate carry-forward for next week if a SaferAI-relevant secondary analysis lands.
- **Regulatory developments:** EU Digital Omnibus on AI provisional agreement (7 May) is covered in the 11 May legislative digest under "🔴 ACT NOW"; news angle is materially the same and is not repeated here. White House AI security executive order remains in "studying" stage (Hassett, 6 May) — no new on-record movement this week beyond the OpenAI TAC expansion above. CADA Tech Sovereignty Package 27 May College agenda still tracked by the legislative digest.
- **Hype & trends:** "Comment and Control" prompt-injection remediation post-mortems flagged for watch last week have not yet been published; carry forward. No in-window viral AI consumer story crossed the policy-relevance threshold.
