---
url: "https://www.glean.com/perspectives/glean-waldo-explained-enhancing-search-efficiency-with-frontier-llms"
canonical: "https://www.glean.com/perspectives/glean-waldo-explained-enhancing-search-efficiency-with-frontier-llms"
title: "Glean Waldo explained enhancing search efficiency with frontier LLMs"
description: "The Glean Team | Glean Waldo explained: Agentic search model that improves search efficiency with frontier LLMs through optimized retrieval and reduced tokens."
fetched_at: "2026-09-01T13:27:38.942Z"
---
Last updated Jun 04, 2026.

# Glean Waldo explained enhancing search efficiency with frontier LLMs

0

minutes read

![Glean Waldo explained enhancing search efficiency with frontier LLMs](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

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

# Glean Waldo explained: enhancing search efficiency with frontier LLMs

[Waldo](https://www.glean.com/blog/waldo-launch) is Glean's reinforcement learning model for enterprise search planning — by handling retrieval separately from reasoning, it cuts end-to-end latency by roughly 50% and reduces token consumption by about 25%, according to Glean's published benchmarks (April 2025). Most enterprise AI queries burn time and tokens because one model handles both finding information and reasoning over it, even though these are fundamentally different jobs.

Waldo focuses exclusively on the information-gathering phase — identifying what to retrieve and how to query for it — before handing context to a frontier LLM for final answer generation. The result is faster responses at lower cost, with no regression in answer quality.

## What is Waldo?

Waldo is an agentic search model purpose-built for [enterprise AI search](https://www.glean.com/blog/enterprise-ai-search-rag). It handles one job — search planning and evidence gathering — then passes well-assembled context to a frontier LLM so the reasoning model can focus entirely on synthesis and response generation.

Rather than repurposing a general-purpose model for retrieval, Waldo determines what information a query needs, formulates the right retrieval strategy, and gathers the relevant context before handing off to a frontier LLM. This approach reflects the broader shift toward [agentic retrieval](https://www.glean.com/blog/agentic-rag-explained), where AI systems actively plan and adapt their search strategies rather than relying on a single-pass lookup.

The core insight behind Waldo is straightforward. Most enterprise AI tasks don't start with reasoning — they start with finding the right context scattered across documents, messages, and tools.

Using a frontier model for both retrieval planning and answer generation is like hiring a senior analyst to pull files from a cabinet before doing the actual analysis. In Glean's benchmarks, Waldo handles the file-pulling at ~250 ms P50 latency per call, more than 10x faster than a default reasoning model would take for the same step.

Glean built Waldo on NVIDIA's Nemotron 3 Nano open foundation model and post-trained it for search planning using reinforcement learning. The Nemotron 3 Nano architecture uses a hybrid mixture-of-experts design that activates only [3 billion of its 30 billion parameters](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) per inference call, delivering up to 4x higher throughput than its predecessor. The RL training process shaped Waldo to improve retrieval planning rather than generate natural language answers — a deliberate constraint that keeps the model small, fast, and sharply focused on the task where speed matters most.

## Why enterprise AI needs a dedicated search planning layer

Most enterprise work begins with information retrieval. An engineer troubleshooting a production incident searches runbooks, Slack threads, and past postmortems. A sales rep preparing for a call pulls recent product updates, competitive intel, and account history from a dozen systems.

A new hire hunts through wikis, onboarding docs, and recorded walkthroughs during their first weeks. In every case, the quality of the final output depends on finding the right context first. IDC research quantifies the drag: the average knowledge worker spends roughly [2.5 hours per day](https://www.synergissoftware.com/blog/workforce-efficiency-its-time-to-calculate-the-cost-of-opportunity-loss) — about 30% of the workday — just searching for information.

When a single frontier model handles both the search planning and the reasoning, it allocates expensive compute to tasks that don't require deep inference. Decomposing a query into sub-questions, selecting which data sources to hit, and deciding when enough evidence has been gathered are procedural, latency-sensitive operations. They benefit from speed and precision, not from the broad world knowledge and nuanced generation capabilities that make frontier models valuable.

Bundling both roles into one model means paying frontier-model costs for work that a smaller, purpose-trained model can do faster and cheaper. Research from Centific demonstrates this cost problem concretely: in agentic AI frameworks, [input token costs dominate total spending](https://www.centific.com/blog/ai-token-consumption-costs) because chained LLM calls accumulate massive input context, making the case for separating retrieval from reasoning even stronger.

A composable architecture separates these concerns. [Glean Search](https://www.glean.com/product/workplace-search-ai) applies this principle across 100+ enterprise data sources, with a dedicated search planning layer handling retrieval orchestration at low latency before passing a well-assembled context package to a frontier model.

The separation of search planning from reasoning mirrors how effective teams already work: one person gathers the briefing materials, another analyzes them and writes the recommendation. The result is lower compute cost, faster end-to-end response times, and a frontier model that operates on better-prepared input.

## How Waldo works with frontier LLMs

The interaction between Waldo and a frontier LLM follows a clear handoff pattern: Waldo handles search planning and evidence gathering, then the frontier model takes over for [agentic reasoning](https://www.glean.com/blog/a-complete-guide-to-agentic-reasoning) and synthesis. Each model operates in the phase where its design strengths matter most, and neither duplicates the other's work.

### Search planning and query decomposition

When a query arrives, Waldo breaks it into discrete sub-questions and determines which tools, connectors, and data sources to query for each. For a question like "What were the key takeaways from last quarter's product review, and how do they relate to this quarter's roadmap?" Waldo identifies that it needs to retrieve product review notes, roadmap documents, and potentially related meeting transcripts — each from different systems.

It issues targeted retrievals, evaluates the returned evidence, and decides whether sufficient context has been gathered or whether additional passes are needed. The iterative evidence-gathering loop operates at the sub-second latencies discussed earlier, keeping the retrieval phase fast even for multi-source queries.

### Handoff to frontier models for reasoning and synthesis

Once Waldo determines it has assembled adequate context, it packages the retrieved evidence and passes it to a frontier LLM. At this point, the frontier model receives a focused context window containing the relevant documents, passages, and metadata — without having spent any tokens on figuring out where to look or what to retrieve.

The frontier model's full capacity goes toward the high-value work: synthesizing information across sources, drawing inferences, resolving contradictions, and generating a coherent response. Organizations pay frontier-model token costs only for the reasoning step, not for the retrieval orchestration that preceded it.

### Intelligent query routing

Not every query requires the full retrieval-then-reasoning pipeline. In Glean's testing, roughly half of enterprise queries can be answered through a fast path with minimal reasoning — a straightforward factual lookup, a link to the right document, or a direct answer from a single authoritative source.

Intelligent routing evaluates incoming queries and directs simple retrievals down a lightweight path, reserving the full Waldo-plus-frontier pipeline for complex, multi-step questions. This routing prevents unnecessary frontier-model invocations, reducing overall compute costs without affecting answer quality for queries that do require deep reasoning.

## Performance gains: latency, token cost, and quality

Waldo's architecture — separating search planning from reasoning — produces measurable gains across three dimensions. In Glean's internal benchmarks, end-to-end latency drops by approximately 50%, because the retrieval phase runs on a model optimized for speed rather than a frontier model that carries overhead from capabilities irrelevant to search planning. Token consumption decreases by roughly 25%, since the frontier model receives pre-gathered context instead of generating tokens to plan and execute searches itself.

Answer quality holds steady — there is no regression, because the reasoning step still runs on a full-capability frontier model working with the same (or better-prepared) evidence.

These numbers matter more at scale than they might seem in isolation. An organization running thousands of AI-assisted queries per day across support, sales, and engineering teams compounds both the latency savings and the token cost reductions. With enterprise AI spending surging to [$37 billion in 2025](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/) according to Menlo Ventures, the pressure to optimize inference costs is intensifying across every department.

A 50% latency improvement means employees waiting one to two seconds instead of three to four for complex queries — a difference that determines whether people trust the tool enough to make it part of their default workflow. A 25% reduction in token consumption translates directly to lower infrastructure costs as usage scales. As Forrester analyst Rowan Curran noted, "There is an increasing appeal for these more directed models for tasks within overall agentic workflows and executions."

The training approach reinforces the privacy model. Glean post-trained Waldo using reinforcement learning to improve retrieval planning, and the training process used no customer document content. The model learns how to plan searches effectively, not what any specific organization's documents contain.

## What types of tasks benefit most from agentic search

Retrieval-heavy workflows see the largest performance gains from Waldo's dedicated search planning layer. Support teams resolving tickets often need to pull information from [knowledge management](https://www.glean.com/blog/enterprise-knowledge-management-guide) systems, past tickets, product documentation, and internal engineering notes — all within a single interaction.

Sales teams preparing for calls need account history, recent product changes, competitive positioning, and relevant case studies assembled from different systems. New employees during [onboarding](https://www.glean.com/blog/building-the-foundations-of-employee-success) need to locate policies, process documentation, team norms, and tooling guides scattered across wikis, shared drives, and messaging channels. In each case, the bottleneck is gathering the right context from multiple sources, which is exactly the step Waldo accelerates.

Cross-team knowledge discovery — finding expertise, decisions, or context that originated in a different department — is another area where multi-source evidence gathering provides clear advantages. These queries typically span organizational boundaries, requiring retrieval from systems the questioner may not even know to check. Because Glean Search connects to 100+ enterprise data sources through its [Enterprise Graph](https://www.glean.com/product/enterprise-graph), Waldo can identify relevant evidence across team boundaries without requiring the user to specify where to look.

Simple lookups benefit less, which is where intelligent routing earns its value. When a query has a single, obvious answer in a known location, routing it through a lightweight path avoids the overhead of the full retrieval pipeline. The practical effect is that search planning becomes critical infrastructure primarily for the complex, multi-step queries that consume the most time and compute — the ones where faster, cheaper retrieval delivers the clearest return.

## Frequently asked questions

### What is the difference between an agentic search model and a standard retrieval system?

A standard retrieval system matches a query against an index and returns ranked results. An agentic search model actively plans the retrieval strategy — decomposing queries into sub-questions, selecting data sources, gathering evidence iteratively, and deciding when enough context has been collected before handing off to a reasoning model. For a deeper look at how these [AI agents](https://www.glean.com/blog/ai-agents-enterprise) operate in enterprise environments, see how organizations are applying them across departments.

### Does Waldo replace frontier LLMs?

No — Waldo handles search planning and evidence gathering, then passes the assembled context to a frontier LLM for reasoning and response generation. The two models work in sequence, each operating in the phase where its design strengths apply.

### How does Waldo maintain enterprise data privacy?

Glean post-trained Waldo using reinforcement learning to improve retrieval planning, and the training process used no customer document content. The model learns how to plan searches — it does not memorize the contents of any organization's documents, and all data access respects existing enterprise permissions.

### What kind of latency improvement can teams expect?

In Glean's internal benchmarks, end-to-end query latency drops by approximately 50% compared to single-model architectures. The search planning phase runs at roughly 250 ms P50 latency per call, with the actual improvement varying by query complexity.

### Can Waldo handle queries that require deep multi-step reasoning?

Waldo handles the multi-step search planning portion — decomposing queries, retrieving evidence from multiple sources, and iterating until sufficient context is gathered. The frontier LLM then handles the deep reasoning: drawing inferences, synthesizing across sources, and resolving contradictions.

A dedicated search planning layer addresses the most common bottleneck in enterprise AI workflows — finding the right context — while preserving frontier model capabilities for the reasoning work that justifies their cost. Waldo demonstrates what becomes possible when retrieval and reasoning each get a model designed for the job. [Request a demo](https://www.glean.com/get-a-demo) to explore how Glean and AI can transform your workplace.

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
