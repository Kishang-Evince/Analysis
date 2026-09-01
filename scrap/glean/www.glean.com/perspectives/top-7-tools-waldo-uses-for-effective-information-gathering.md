---
url: "https://www.glean.com/perspectives/top-7-tools-waldo-uses-for-effective-information-gathering"
canonical: "https://www.glean.com/perspectives/top-7-tools-waldo-uses-for-effective-information-gathering"
title: "Top 7 tools Waldo uses for effective information gathering"
description: "The Glean Team | Top 7 tools Waldo uses for effective information gathering include network mappers, data analyzers, and document scanners for comprehensive research."
fetched_at: "2026-09-01T13:28:03.589Z"
---
Last updated Jul 03, 2026.

# Top 7 tools Waldo uses for effective information gathering

0

minutes read

![Top 7 tools Waldo uses for effective information gathering](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

### Table of contents

[

Heading 2

](#)

[

Heading 3

](#)

[

Heading 4

](#)

[

Heading 5

](#)

[

Heading 6

](#)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

Share this article:

# Top 7 Tools Waldo Uses for Effective Information Gathering

Waldo uses seven tools during the information-gathering phase: unified [enterprise search](https://www.glean.com/blog/what-is-enterprise-search), query decomposition, hybrid semantic-and-keyword retrieval, context-aware ranking, retrieval-augmented generation, agentic tool selection, and security and governance controls. Together, these capabilities let the model break down complex questions, search across connected systems, and assemble cited evidence before a frontier language model generates its final answer.

Agentic search models like Waldo represent a shift in how enterprise teams collect and synthesize information. Rather than relying on a single model to handle everything from retrieval to reasoning, these tools separate the search phase from the analysis phase, producing faster and more accurate results.

The sections below walk through each of the seven tools, explain what it does, and show how the overall architecture turns a broad question into a well-sourced answer.

## What is Waldo and how does it gather information?

Waldo is an agentic search model designed specifically for the information-gathering phase of enterprise AI workflows. When a user asks a question, Waldo does not immediately attempt to generate an answer. Instead, it decomposes the query into sub-tasks, decides which retrieval tools to call, searches for supporting evidence across internal and external sources, and assembles a complete context package.

Only then does it hand that package to a frontier language model for final synthesis. According to Glean's published benchmarks at launch, separating retrieval from reasoning cuts latency by roughly 50% and token consumption by about 25% compared to running the full workload on a single reasoning model — without any drop in answer quality.

During a typical information-gathering run, Waldo orchestrates multiple tools in sequence. It might start by querying an internal knowledge base for a product spec, then pull usage data from an analytics platform, then search company communications for the most recent decision on that topic. At each step, it evaluates the quality of what it finds — discarding low-relevance results and requesting additional context where gaps remain.

The result is a curated evidence set rather than a raw dump of search hits. For example, if a sales engineer asks "What changed in our enterprise pricing model last quarter?", Waldo would locate the pricing committee's decision document, cross-reference it with the updated rate card, and surface the Slack thread where the VP of Sales confirmed the rollout date — all before a single word of the final answer is written.

Finding the right internal document, the right data point, or the right person who knows the answer accounts for a significant share of knowledge workers' time. McKinsey estimates that employees spend about 20% of their workweek searching for internal information or tracking down colleagues who can help — and [IDC data](https://cottrillresearch.com/various-survey-statistics-workers-spend-too-much-time-searching-for-information/) suggests the figure may be even higher, with knowledge workers spending roughly 2.5 hours per day just searching for information. By treating information gathering as a distinct, optimizable phase, Waldo turns that retrieval bottleneck into a structured, auditable process.

## Tool 1: unified enterprise search across connected systems

The foundation of effective information gathering is deceptively simple: search every system where knowledge actually lives. In practice, enterprise knowledge is scattered across many application types:

-   Document stores (Google Drive, SharePoint, Confluence)
-   Messaging platforms (Slack, Microsoft Teams)
-   Ticketing systems (Jira, Zendesk, ServiceNow)
-   CRM records (Salesforce, HubSpot)
-   Project management tools (Asana, Monday)

When Waldo needs to gather evidence for a question, its first move is querying a unified search layer that connects to more than 100 workplace applications — pulling results from all of them in a single pass. A single search pass eliminates the most common retrieval bottleneck: not finding the answer, but not knowing where to look. As [IBM notes](https://www.ibm.com/think/topics/enterprise-search), modern enterprise search platforms incorporate AI technologies to organize disparate data sources into searchable indexes that enable fast, precise query processing.

What makes this more than a federated search wrapper is permission-aware retrieval. Every result Waldo surfaces respects the access controls already configured in the source system. If a document in Google Drive is shared only with the legal team, a marketing manager's query won't return it — even if the content is highly relevant.

Permission-aware access is a hard requirement for regulated industries like financial services and healthcare, where exposing restricted data during an internal search could trigger a compliance violation. The permission model runs at query time, not as a batch sync, so access changes propagate immediately.

Consider a product manager preparing for a quarterly business review. They need the latest customer churn analysis from the data team's Snowflake dashboard, a summary of recent support escalations from Zendesk, and the competitive analysis slide deck someone on strategy shared last month. Without unified search, that's three separate tools, three separate queries, and a manual synthesis step.

With Glean Search spanning all connected systems, Waldo handles that retrieval in a single orchestrated pass — returning results ranked by relevance, freshness, and the searcher's own work context. The product manager gets a curated evidence set instead of a scavenger hunt. For a deeper look at how AI transforms this process, see how [enterprise AI search](https://www.glean.com/blog/enterprise-ai-search-rag) combines retrieval and generation to surface precise answers.

## Tool 2: query decomposition and multi-step planning

Complex enterprise questions rarely have single-source answers. When someone asks "What's our competitive positioning for the Q3 deal with Acme Corp?", the answer sits across multiple systems and documents — none of which, on its own, tells the full story.

Waldo handles this by decomposing the original question into discrete sub-queries before executing any search. For the Acme Corp example, the planner might generate four parallel tracks: recent activity and communications involving Acme, internal win/loss analysis for similar deals, product comparison documents relevant to Acme's tech stack, and Slack conversations where the account team discussed deal strategy.

According to Glean's published benchmarks, the planning step runs on a lightweight model that operates roughly 10x faster per call than a full reasoning model. Planning doesn't require deep inference — it requires pattern recognition over query structure and a map of available data sources. By keeping the planner fast and cheap, Waldo can evaluate multiple decomposition strategies without burning time or compute.

The planner also decides when enough evidence has been gathered. Not every question requires the full orchestration loop; based on Glean's observed query patterns, roughly half of incoming queries resolve on a fast path, where the planner identifies that a single well-targeted search will return sufficient context and skips the multi-step sequence entirely.

The decomposition capability is central to the Agentic Engine's design. Waldo treats a query as a plan to be executed, where each step builds on what previous steps found — an approach known as [agentic reasoning](https://www.glean.com/blog/a-complete-guide-to-agentic-reasoning). If the first sub-query about Acme's recent activity reveals that the deal shifted from a renewal to an expansion, the planner adjusts downstream queries to focus on expansion-specific competitive positioning rather than renewal benchmarks.

That adaptive loop turns a broad question into a well-scoped evidence package — something a single-pass search cannot match.

## Tool 3: hybrid search combining semantic and keyword retrieval

Retrieval quality depends on matching the right search technique to the right kind of query — and most enterprise questions benefit from both techniques at once. Waldo pairs keyword search with semantic search on every retrieval call.

Keyword search is built for precision: when someone searches for "SOC-2 audit report Q1 2026," you want exact term matching to surface that specific document. Semantic search is built for recall: when someone searches for "how do we handle customer data deletion requests," it should find the data privacy runbook even if it never uses the word "deletion." Running both in parallel and merging the results captures matches that either approach alone would miss. For a detailed comparison of these [hybrid search techniques](https://www.glean.com/blog/hybrid-vs-rag-vector), including how they differ from pure vector search, see Glean's breakdown.

The hybrid approach is especially valuable when queries cross departmental boundaries. An engineer searching "deployment rollback procedure" and a support agent searching "how to undo a release" are asking for the same runbook, but the vocabulary gap between the two queries would defeat a purely keyword-based system. Semantic search bridges that gap by matching on meaning rather than terms.

Keyword search keeps the system precise for identifiers that carry no semantic weight — model numbers, customer account IDs, internal project codenames, or API endpoint names. Without the keyword component, a semantic-only system might return conceptually related but factually wrong documents.

The practical impact is a better signal-to-noise ratio in Waldo's evidence collection. Fewer false negatives mean the system doesn't miss relevant documents buried under unfamiliar terminology, and fewer false positives mean the downstream reasoning model spends its context window on genuinely useful evidence rather than tangentially related noise.

Glean Search applies this hybrid retrieval across every connected source, so the quality gain compounds as more systems are integrated — each new connector adds both keyword-indexed and semantically embedded content to the search layer.

## Tool 4: context-aware ranking powered by enterprise and personal graphs

Finding relevant documents is only half the retrieval problem — the other half is ranking them so the most useful results surface first. A keyword-and-semantic search might return 40 documents that match a query about a product launch timeline, but the one written by the project lead last week matters more than a draft from six months ago by someone who left the company.

Waldo's ranking layer factors in signals that go well beyond text relevance: organizational structure, document freshness, author expertise on the topic, and the searcher's own work patterns.

Two knowledge structures make this possible. The [Enterprise Graph](https://www.glean.com/product/enterprise-graph) maps relationships between people, teams, projects, documents, and communication channels across the organization. It knows that the VP of Engineering owns the infrastructure roadmap, that the roadmap was last updated three days ago, and that the infrastructure team's Confluence space is the authoritative source for deployment standards.

The Personal Graph captures individual signals — which tools a person uses most, which colleagues they collaborate with frequently, and which topics they've been working on recently. Together, these graphs let the ranking model personalize results for each user without requiring any manual configuration. To understand how [knowledge graphs](https://www.glean.com/blog/knowledge-graph-agentic-engine) provide the contextual foundation for enterprise AI — including multi-hop reasoning and process-pattern recognition — see Glean's deep dive on the topic.

The practical difference shows up in how results rank for different people. A finance analyst asking about "Q3 revenue forecast" sees the CFO's latest board deck at the top; a sales director asking the same question sees the regional pipeline report first. The underlying document set is identical, but the ranking reflects who is asking and why. [Gartner research](https://www.synergissoftware.com/blog/workforce-efficiency-its-time-to-calculate-the-cost-of-opportunity-loss) found that 47% of digital workers struggle to find the information they need to do their jobs effectively — personalized, context-aware ranking is what closes that gap.

Without a context layer like this, every query starts cold, and users spend time scrolling past irrelevant results to find the one document they actually need.

## Tool 5: retrieval-augmented generation for grounded, cited answers

Once Waldo has gathered and ranked its evidence, the next step is turning that evidence into a direct answer — not a list of links. [Retrieval-augmented generation](https://www.glean.com/blog/retrieval-augmented-generation-rag-the-key-to-enabling-generative-ai-for-the-enterprise) (RAG) is the technique that handles this step.

RAG works by feeding specific retrieved documents into a language model as input context, rather than relying solely on the model's training data. The output is a synthesized answer with inline citations pointing back to the source documents, so the reader can verify any claim by clicking through to the original.

The citation layer matters more than it might seem. In enterprise settings, an answer without provenance is an answer that can't be trusted for decision-making. If a compliance officer asks about the company's data retention policy, they need to know whether the answer came from the current policy document or an outdated wiki page.

RAG makes provenance transparent: every statement in the generated response traces back to a specific source, and the reader can evaluate both the answer and the quality of the evidence behind it. Source-grounded generation is fundamentally different from a general-purpose language model, which may produce fluent text with no connection to any verifiable document.

RAG also reduces hallucination risk by anchoring generation in retrieved enterprise data rather than the model's parametric memory. According to a [2026 analysis of RAG benchmarks](https://www.cmarix.com/blog/rag-ai-statistics/), retrieval-augmented generation can reduce AI hallucinations by 40–71% compared to baseline LLMs — a critical improvement for enterprise use cases where accuracy is non-negotiable.

Glean Assistant applies this pattern across research and analysis workflows — teams get answers they can act on because the supporting evidence is visible, traceable, and current. For data-heavy questions like "What was our customer acquisition cost trend over the last four quarters?", the answer pulls from actual reports and dashboards rather than generating plausible-sounding numbers from training data.

## Tool 6: agentic tool selection and orchestration

Not every query calls for the same set of tools. A question about organizational reporting structure needs people-and-team data from the Enterprise Graph, while a question about quarterly revenue trends needs structured data from a connected analytics platform.

A question about a product decision needs documents and message threads. [Waldo's orchestration layer](https://www.glean.com/blog/waldo-launch) evaluates each incoming query and autonomously selects which tools to invoke, in what order, and with what parameters — routing to the right retrieval and analysis capabilities based on the nature of the question.

Waldo adapts its strategy per problem, which is what makes the system agentic. If a question requires both a document search and a structured data lookup, it runs them in parallel and merges the results before passing the combined evidence to the language model. If a question is straightforward enough to resolve with a single search, the orchestrator skips the multi-tool sequence entirely.

Based on Glean's observed data, adaptive routing is why roughly half of all queries resolve on a fast path — the system doesn't impose unnecessary complexity on simple questions.

The orchestration layer also handles error recovery. If a retrieval call returns thin or low-confidence results, the system reformulates the sub-query — broadening search terms, targeting a different source system, or adjusting the time window — and retries before escalating.

Glean Agents build on this same [agent orchestration](https://www.glean.com/product/agent-orchestration) pattern for multi-step workflows that go beyond information gathering into action-taking. The underlying principle is the same: match the tool to the task, sequence intelligently, and recover gracefully when a step underperforms.

## Tool 7: security, governance, and audit controls for compliant data collection

Every tool in Waldo's information-gathering stack operates inside a security perimeter that enforces access controls at the retrieval level — not as a post-processing filter. When Waldo queries a connected system, it inherits the requesting user's permissions in that system.

A search that spans Salesforce, Confluence, and Google Drive applies three separate permission checks, one per source, before any result enters the evidence set. Inheriting the user's permissions means Waldo never surfaces data that the user wouldn't be able to access by logging into the source application directly.

For teams in financial services, healthcare, and government, permission-aware retrieval is a baseline requirement — but it's not sufficient on its own. These organizations also need to know what happened during an information-gathering session: which sources were queried, what evidence was retrieved, and how the final answer was assembled. A proper [permissions structure](https://www.glean.com/blog/secure-generative-ai-for-the-enterprise-requires-the-right-permissions-structure) is essential to ensuring that generative AI delivers secure and relevant results in complex enterprise environments.

Waldo produces audit trails that log this entire chain, giving compliance teams a reviewable record of every retrieval and generation step. If a regulator asks how a particular analysis was produced, the organization can trace it back to specific documents and the sequence of tool calls that surfaced them.

Glean's security and governance model adds a further constraint: zero-day data retention for enterprise content processed during search and generation. Customer data is never used to train external models, and content processed during a query is not persisted beyond the session.

These governance controls sit upstream of every retrieval and generation step. For organizations evaluating information-gathering tools, the architecture means that adopting agentic search doesn't require relaxing existing data governance policies — the system operates within the same boundaries that IT and security teams have already defined.

## How to choose the right information-gathering tools for your workflow

### Match tools to query complexity

Not every question needs a full agentic orchestration loop. Simple lookups — "Where's the brand guidelines PDF?" — resolve on a fast path with a single targeted search, while multi-source questions that require decomposition, cross-referencing, and synthesis need the full tool chain. Understanding where your team's typical queries fall on this spectrum helps set realistic expectations for response time and depth.

### Evaluate tools on context depth, not just speed

Effective information-gathering tools understand who is asking, what they're working on, and which sources are authoritative for that person's role. Look for platforms that maintain a persistent context layer — Glean's Enterprise Graph and Personal Graph, for example, map relationships across people, teams, and documents so every query is ranked for the person asking, not just for text relevance. Speed matters, but a fast answer from the wrong document is worse than a slightly slower answer from the right one.

### Prioritize governed, permission-aware platforms

Any tool that searches across enterprise systems must respect existing access controls without requiring manual configuration per query. Audit trails, data residency options, and zero-day retention for processed content should be table stakes, not premium add-ons. If a platform can't demonstrate permission-aware retrieval at the connector level, it's not ready for regulated environments. Recent research shows that [hallucination rates](https://www.scottgraffius.com/blog/files/ai-hallucinations-2026.html) for complex reasoning tasks still exceed 33%, making governed, grounded retrieval systems — rather than unanchored generation — a prerequisite for trustworthy enterprise AI.

## Frequently asked questions

### What specific tools does Waldo use during information gathering?

Waldo uses seven core capabilities: unified enterprise search across 100+ connected applications, query decomposition and multi-step planning, hybrid semantic-and-keyword retrieval, context-aware ranking via enterprise and personal knowledge graphs, retrieval-augmented generation with inline citations, agentic tool selection and orchestration, and security and governance controls including permission-aware access and audit logging.

### How does Waldo decide which tools to use for a given query?

A lightweight planning model evaluates each incoming query and selects the appropriate tools, sequencing, and parameters based on the question's complexity and data requirements. Simple queries resolve on a fast path with a single search call; complex multi-source questions trigger the full decomposition and orchestration loop.

### Can Waldo integrate with existing enterprise tools for enhanced information gathering?

Yes. Waldo operates on top of a search infrastructure that connects to more than 100 workplace applications, including document stores, messaging platforms, CRM systems, ticketing tools, and analytics platforms. Each connector inherits the source system's permission model, so integration doesn't require reconfiguring access controls.

### What are the advantages of using an agentic search model for information gathering?

Agentic search treats a query as a plan to be executed rather than a single retrieval event. That design means the system can decompose complex questions, search multiple sources in parallel, evaluate result quality mid-stream, and adapt its strategy when initial results are insufficient. The result is more complete, better-sourced evidence sets — with lower latency and fewer wasted tokens compared to passing the full reasoning burden to a single large model.

### What are best practices for using Waldo in the information-gathering process?

Start with clear, specific questions rather than broad prompts — Waldo's decomposition works best when the intent is unambiguous. Review cited sources in generated answers to build confidence in the evidence chain, and confirm that relevant source systems are connected so Waldo can search your full knowledge base. For a broader perspective on how modern [information retrieval](https://www.glean.com/blog/glean-information-retrieval-2024) techniques are evolving, see Glean's comprehensive guide.

The right information-gathering tools turn a scattered search across dozens of systems into a single, structured retrieval process — one that delivers sourced answers instead of ranked links. When your team can trust the evidence behind every response, decisions move faster and with less rework. [Request a demo](https://www.glean.com/get-a-demo) to explore how Glean and AI can transform your workplace.

[

Back to Perspectives home

](/perspectives)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

## Recent posts

[

![Glean’s proactive AI suite drives organizational transformation for single and multiplayer work](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8f0b8957e021f85e681e07_Banner%20\(2\).jpg)

August 26, 2026

### Glean’s proactive AI suite drives organizational transformation for single and multiplayer work

Glean introduces proactive AI that anticipates priorities, takes action, and improves how individuals and teams get work done.

![Marisa Huff](https://cdn.prod.website-files.com/613513981b0efaf850830620/6909cff45d623a5c2428374d_Marisa.jpeg)

Marisa Huff

Product Marketing

![Kelly Huang](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a0ae02225a70d46713e5d4f_Kelly%20Huang.webp)

Kelly Huang

Product Marketing Manager

](/blog/proactive-ai-for-enterprises)

No items found.

[

![Glean Agents can now work independently, build faster, and stay governed at scale](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecd5c847f851871aa6214_agents-banner.webp)

August 26, 2026

### Glean Agents can now work independently, build faster, and stay governed at scale

Our latest updates to Glean Agents provide them with the intelligence, governance, and reliability needed to drive and scale real work.

![Anuraag Gupta](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecdd4522f428d26e3d4a5_anurag-gupta.jpeg)

Anuraag Gupta

Product Manager Lead, Agents

](/blog/glean-agents-go-2026)

No items found.

[

![Introducing Glean Transform, your company's mission control for AI transformation](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a95ea719f88eaa3cb10fb33_ai-transform.png)

August 26, 2026

### Introducing Glean Transform, your company's mission control for AI transformation

Glean Transform maps how work gets done, identifies high-impact AI opportunities, and measures automation value after deployment across your entire enterprise.

![Malik Ismail](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecc88202eae656d145868_Malik%20Ismail.jpeg)

Malik Ismail

Head of applied AI

![Haohan Tang](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ef80123c83ebce56b354e_Haohan.jpeg)

Haohan Tang

Software Engineer

](/blog/glean-transform-ai-transformation)

No items found.

[

![Scale AI usage without runaway spend with Glean’s AI usage controls ](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecae4634c80145cdffe88_cost-governance-banner.webp)

August 26, 2026

### Scale AI usage without runaway spend with Glean’s AI usage controls

Glean gives enterprises the visibility and controls they need to expand AI usage confidently while keeping costs predictable

![Kathleen Qin](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecb7bc4d60fcd4d9b63d8_Kathleen%20Qin.jpeg)

Kathleen Qin

Product Manager

](/blog/go-cost-governance-2026)

No items found.

[

![Right-sizing intelligence: Glean saves 81% on token costs and is preferred 78% of the time versus Claude Cowork](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ed201e4b8f1567ff77642_go-benchmark-Banner.webp)

August 26, 2026

### Right-sizing intelligence: Glean saves 81% on token costs and is preferred 78% of the time versus Claude Cowork

A benchmark of 180+ enterprise tasks shows that auto routing, backed by high-quality context, can deliver token cost savings while achieving better performance.

![Matthew Zhao](https://cdn.prod.website-files.com/613513981b0efaf850830620/698cf8afdc94f4c0969da8fa_Matt.png)

Matthew Zhao

Engineering

![Jessica Kwok](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec942d15209655a4308d7_Jess%20Kwok.jpeg)

Jessica Kwok

Product Manager

![Karthik Rajkumar](https://cdn.prod.website-files.com/613513981b0efaf850830620/698cf94bd1b022aaa167835f_Karthik.png)

Karthik Rajkumar

Applied Scientist

](/blog/go-glean-cowork)

No items found.

[

![Celebrating the 2026 Glean Partner Award Winners](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8deebe4a5b39c6e255d913_Glean%20Partner%20Award%20winners.png)

August 25, 2026

### Celebrating the 2026 Glean Partner Award Winners

Meet the 2026 Glean Partner Award winners, recognizing the partners driving transformation, collaboration, delivery excellence, customer impact, innovation, and regional growth with Glean.

![Glean](https://cdn.prod.website-files.com/613513981b0efaf850830620/641443b7208e558a59f93731_glean-author-symbol.jpg)

Glean

](/blog/2026-glean-partner-award-winners)

No items found.

## Work AI that works.

[Get a demo](/get-a-demo)

![CTA BG](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/67a9cf6a0c3b882fc397780c_9bc5d6fcbe55519f7e2590b28a3ddc3e_Home%20-%20Universal%20CTA.webp)
