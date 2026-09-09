---
url: "https://www.glean.com/perspectives/how-waldo-reduces-latency-and-token-usage-without-compromising-quality"
canonical: "https://www.glean.com/perspectives/how-waldo-reduces-latency-and-token-usage-without-compromising-quality"
title: "How Waldo reduces latency and token usage without compromising quality"
description: "The Glean Team | Waldo reduces latency by 50% and token usage by 25% without compromising quality through intelligent search planning and optimized model architecture."
fetched_at: "2026-09-01T13:27:58.009Z"
---
Last updated Jul 03, 2026.

# How Waldo reduces latency and token usage without compromising quality

0

minutes read

![How Waldo reduces latency and token usage without compromising quality](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

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

# How Waldo reduces latency and token usage without compromising quality

Waldo, Glean's agentic search model, reduces latency and token usage by separating retrieval work from reasoning work, letting a smaller, purpose-built model handle query decomposition and evidence gathering before a frontier model ever sees the prompt. In Glean's production deployments, this architectural split cuts response times roughly in half and trims token consumption by about 25%, with no drop in answer accuracy or citation correctness.

The idea is straightforward: frontier large language models are excellent reasoners, but [reducing latency](https://www.glean.com/blog/waldo-agentic-search-model) means not asking them to do everything. Retrieval, tool planning, and evidence selection don't require the same computational weight as synthesizing a final answer. A dedicated agent can handle those steps faster and cheaper.

For enterprise teams running thousands of search queries a day, the difference compounds quickly. Lower latency means employees get answers in under a second instead of waiting several seconds per query.

Fewer tokens per request means lower infrastructure cost at scale. And because the reasoning model still handles the final synthesis, answer accuracy and citation correctness stay intact. As [enterprise AI search](https://www.glean.com/blog/enterprise-ai-search-rag) becomes central to how organizations operate, optimizing that cost-performance ratio matters more than ever.

## How Waldo reduces latency and token usage in the search pipeline

Waldo is an agentic search model that runs before the frontier reasoning model, handling query decomposition, tool routing, and evidence gathering so the larger model focuses only on synthesis and response generation.

Within Glean's Agentic Engine, Waldo acts as a lightweight orchestrator at the front of the AI search pipeline. When a query arrives, Waldo breaks it into sub-queries, decides which tools and data sources to call, and gathers relevant evidence.

Only after that retrieval phase is finished does the frontier model receive a focused, pre-filtered prompt for final reasoning. This separation means the most expensive model in the stack never touches retrieval work.

The performance gains are concrete. On a per-call basis, Waldo runs roughly 10x faster than a default reasoning model, with a P50 latency of about 250 ms compared to roughly three seconds. Research from Stevens Institute of Technology confirms this pattern: [a single LLM call takes approximately 800 milliseconds](https://online.stevens.edu/blog/hidden-economics-ai-agents-token-costs-latency/), but multi-step orchestration flows can take 10 to 30 seconds without a specialized retrieval layer.

Across the full pipeline, that translates to approximately 50% lower end-to-end latency and about 25% fewer tokens consumed per query. These numbers hold without regression in answer accuracy, citation correctness, or relevance scoring.

Waldo is built on a compact base model, post-trained specifically on search planning tasks rather than general instruction-following. That specialization is the key to its speed.

Query decomposition and tool routing are pattern-matching jobs that a purpose-built model can handle at a fraction of the cost of a frontier reasoner. By reserving the large model for synthesis and reasoning, you get the same answer accuracy while cutting the time and compute spent on every request.

For enterprise workloads where search volume is high and latency tolerance is low, this separation of concerns turns an architectural choice into a measurable operational advantage.

## How monolithic model architectures create retrieval bottlenecks

Most AI systems funnel every step through a single frontier model. Query understanding, tool selection, document reading, evidence evaluation, and response generation all run on the same heavyweight architecture. This monolithic design means the most expensive, highest-latency model in your stack handles work that doesn't require its full reasoning capability.

Retrieval is a well-defined, high-frequency job. Breaking down a question, choosing which data sources to query, reading results, and deciding when you have enough evidence are tasks that demand precision and speed. They don't require the kind of multi-step reasoning that justifies a frontier model's computational cost.

The mismatch creates a compounding problem. Organizations pay frontier-model prices for what amounts to search-planning work.

Users wait through frontier-model latency on tasks that a purpose-built model could resolve in milliseconds. At enterprise scale, where Glean Search handles thousands of queries daily, this overhead shows up in both infrastructure bills and employee wait times.

Consider the arithmetic. If a frontier model takes roughly three seconds per call and a typical agentic query requires four to six retrieval steps before final synthesis, the retrieval phase alone can consume 12 to 18 seconds of large language model (LLM) inference time.

A specialized model running those same steps at 250 ms each completes the retrieval phase in one to two seconds. The frontier model's deep reasoning capability sits idle during retrieval, burning tokens on pattern-matching work it's overqualified to perform. This is why enterprises increasingly use [small models for 80% of their API calls](https://www.clarifai.com/blog/top-cost-efficient-small-models) and reserve large models for complex reasoning, cutting compute costs by up to 70%.

Prompt tuning and caching strategies don't address the root cause. The pipeline architecture determines how compute is allocated across retrieval and reasoning, and changing that allocation requires a structural redesign.

You need an architecture where each model handles the work it was built for.

## How Waldo separates search planning from reasoning

### Query decomposition and tool routing

Waldo breaks a complex question into sub-queries and determines which tools and data sources to call before the frontier model is invoked. A question like "How did our Q1 revenue compare to forecast, and what drove the gap?" becomes a structured plan: pull revenue actuals from the finance system, retrieve the forecast from the planning tool, and search internal documents for variance commentary.

The planning step includes deciding order of operations and which of Glean's 100-plus connectors to hit. Waldo evaluates dependencies between sub-queries, sequences them for efficiency, and routes each one to the appropriate data source. This orchestration happens at the Agentic Engine layer, where Waldo coordinates retrieval across enterprise systems without requiring the frontier model to manage tool selection or call sequencing.

A non-obvious advantage of this separation: Waldo's planning decisions are deterministic for a given query structure. The same type of question consistently routes through the same retrieval pattern, which makes debugging and auditing straightforward. This deterministic behavior is one of the principles behind [agentic reasoning](https://www.glean.com/blog/agentic-reasoning-modern-work) in enterprise settings.

When a frontier model handles planning, its non-deterministic nature means identical queries can produce different tool-call sequences on different runs.

### Evidence gathering and sufficiency detection

After routing sub-queries, Waldo reads results from each retrieval step and evaluates whether the gathered evidence is sufficient to answer the original question. If results from one source are incomplete, Waldo decides whether to search further or whether the existing evidence is strong enough to hand off.

This "stop when you have enough" behavior is critical. Without it, retrieval agents tend to over-fetch, pulling documents from every available source regardless of whether the first two results already contain a definitive answer. Each unnecessary retrieval loop adds latency and inflates [token usage](https://www.glean.com/product/overview) without improving the final response.

When Waldo determines it has sufficient evidence, it assembles a pre-constructed, grounded context package for the frontier model. The reasoning model receives filtered, relevant passages rather than raw search results. This approach builds on the principles of [retrieval-augmented generation](https://www.glean.com/blog/rag-for-llms), where grounding model outputs in retrieved evidence improves accuracy and reduces hallucination.

Waldo's filtering step means the frontier model reasons over cleaner input and spends its tokens on synthesis rather than sifting through irrelevant documents.

## What makes Waldo's architecture different from standard AI search

The structural differences between a monolithic AI search system and Waldo's two-model approach show up across every stage of the query lifecycle. Here's how the two architectures compare on six dimensions that matter for enterprise deployments:

<table style="min-width: 75px; border-collapse: collapse; border: 1px solid #ccc;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Capability</th><th colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Standard approach</th><th colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Waldo's approach</th></tr><tr><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Query planning</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Frontier model decomposes query</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Specialized search model plans retrieval</td></tr><tr><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Tool selection</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Frontier model selects and calls tools</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Waldo routes to the right tools at ~250 ms P50</td></tr><tr><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Evidence reading</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Frontier model reads all retrieved documents</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Waldo reads, filters, and stops when evidence is sufficient</td></tr><tr><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Context handoff</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">No separation - one model does everything</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Grounded context handed to frontier model for reasoning only</td></tr><tr><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Latency profile</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">~3s per LLM call</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">~250 ms per Waldo call; ~50% lower end-to-end latency</td></tr><tr><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Token cost</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Full frontier-model token spend on retrieval + reasoning</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">~25% fewer tokens by offloading retrieval to a smaller model</td></tr></tbody></table>

The comparison highlights a principle that extends beyond any single product: composable architectures, where specialized models own distinct stages of a pipeline, reflect where enterprise AI is heading. Monolithic systems hit a ceiling when you try to optimize one dimension (speed, cost, accuracy) without degrading another. A two-model design lets you tune each stage independently.

Within Glean's architecture, this composability preserves quality by keeping the frontier model focused on what it does best. It receives pre-filtered evidence grounded in the Enterprise Graph's permission-aware retrieval, then synthesizes that evidence into accurate, cited answers. The reasoning model's token budget goes entirely toward analysis and response generation rather than being split across retrieval and reasoning tasks.

One detail worth noting: Waldo's architecture doesn't require replacing your frontier model. It sits upstream in the pipeline, which means you can swap the downstream reasoning model as new versions ship without retraining or reconfiguring the retrieval layer.

## How Waldo maintains answer quality with fewer tokens

Quality regression is the typical risk when you optimize for speed or cost. Teams that reduce token budgets or switch to smaller models often see accuracy drop and hallucination rates climb. Waldo avoids this tradeoff by changing who does retrieval, not how much evidence gets gathered.

The same volume of evidence reaches the frontier model in both architectures. Waldo gathers it faster and with less token overhead, but the reasoning model's input remains equivalent.

Think of Waldo's role as changing the delivery vehicle without reducing the payload. The frontier model still sees the full body of relevant passages it needs to construct an accurate, grounded response.

Post-training on search planning tasks is what makes this possible. Waldo learned domain-specific retrieval patterns through targeted training on query decomposition, tool routing, and evidence sufficiency.

A general-purpose frontier model handles these tasks adequately, but a model post-trained specifically for retrieval planning handles them with higher precision at lower computational cost. The specialization is similar to how a compiler optimizes code more efficiently than an interpreter, even though both produce the same output.

The quality story also benefits from cleaner input to the reasoning model. When a frontier model handles its own retrieval, it receives raw document dumps that may include irrelevant passages or low-relevance results.

Waldo's filtering step removes noise before handoff. The reasoning model works with a tighter evidence set, which reduces the surface area for hallucination and improves citation accuracy. Research on context compression supports this approach: the FinOps Foundation reports that [semantic filtering can achieve 70–80% reductions in tokens](https://www.finops.org/insights/token-economics-the-atomic-unit-of-ai-value/) sent to the underlying language model, with measurable improvements in answer quality.

In Glean's enterprise deployments, switching retrieval to Waldo produced no regression in answer accuracy or citation correctness across thousands of production queries. Within Glean Assistant, the Agentic Engine's permission-aware pipeline feeds Waldo a scoped evidence set, and Waldo passes only what's relevant and accessible to the frontier model.

The reasoning model produces equivalent or marginally better outputs because it works with pre-filtered context rather than doing its own document triage.

## What Waldo means for enterprise AI performance and cost

A 25% reduction in token cost per query compounds into significant savings on LLM inference spend. For an organization running 50,000 AI search queries per day, that reduction translates to millions of fewer tokens consumed monthly. At current frontier-model pricing, the savings can offset a meaningful portion of an enterprise AI deployment's operating cost.

Lower latency drives a less obvious but equally important outcome: adoption. Across Glean's 2025 enterprise deployments, internal usage data shows that response times above two seconds correlate with lower repeat usage and reduced task completion rates.

When Glean Assistant returns answers in under a second instead of three to four seconds, employees build the habit of reaching for AI search instead of defaulting to manual workflows. Faster answers change whether people use the tool at all. Understanding how [input token count impacts latency](https://www.glean.com/blog/glean-input-token-llm-latency) helps explain why architectural choices at the retrieval layer have such a direct effect on user experience.

The specialized-model approach also scales more predictably than a monolithic architecture. As query volume grows, the frontier model handles a proportionally smaller share of total compute because Waldo absorbs the retrieval workload. This means your most expensive model's utilization scales sub-linearly with demand, a cost curve that finance teams can forecast and plan around.

IT and security teams benefit from a structural advantage: Waldo's architecture doesn't change the permission model or governance layer. Permission-aware retrieval through the Enterprise Graph works the same regardless of whether a frontier model or Waldo handles the retrieval step.

Access controls, audit logs, and data governance remain intact. Adding a specialized model to the pipeline introduces no new attack surface.

Token management is becoming a board-level conversation for large enterprises scaling AI across thousands of employees. According to Menlo Ventures' survey of 495 enterprise AI decision-makers, [enterprise generative AI spending reached $37 billion in 2025](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/), and multi-model deployment has become the standard as organizations recognize that different models excel at different tasks. Waldo is an architectural change that reduces per-query cost at the model level, something prompt engineering and caching alone cannot achieve.

## How to evaluate whether an agentic search model fits your workflow

Start by measuring your current baseline. Track end-to-end latency from query submission to answer delivery, token consumption per query across all model calls, and answer quality scores including accuracy, citation grounding, and hallucination rate. Without these numbers, you can't quantify the impact of any architectural change.

Identify retrieval-heavy patterns in your query mix. Workloads that involve frequent query decomposition, multiple tool calls per question, or reading across several data sources benefit most from a specialized retrieval model. If most of your queries are simple lookups that resolve in a single retrieval step, the latency and cost gains from a two-model architecture will be smaller.

Compare per-call latency using a P50 benchmark. Waldo runs at approximately 250 ms P50, compared to roughly three seconds for a frontier model performing the same retrieval task.

Per-call numbers don't tell the full story. Measure end-to-end latency across the complete pipeline, including all retrieval steps, context assembly, and final reasoning. The cumulative difference across multi-step queries is where the architectural advantage compounds.

Evaluate answer accuracy, citation grounding, and hallucination rates together rather than relying on a single metric. All three should remain stable or improve after introducing a specialized retrieval model. For a structured approach to measuring these dimensions, see this guide on [evaluating AI agents](https://www.glean.com/blog/enterprise-agent-evaluation-guide) in production environments.

Run A/B comparisons on a representative sample of your actual query traffic, not synthetic benchmarks. [Glean Agents](https://www.glean.com/product/ai-agents) provide built-in evaluation against these dimensions, which simplifies the comparison process.

Consider cost trajectory over a 12- to 18-month horizon. The gap between "frontier model does everything" and "specialized models handle retrieval" widens as query volume increases.

Model a scenario where your AI search usage doubles or triples, then compare the token cost curves of both architectures. The inflection point where a two-model approach becomes dramatically cheaper often arrives faster than teams expect. Broadening your understanding of how [enterprise search with LLM technology](https://www.glean.com/blog/enterprise-search-llm-tech) is evolving can help frame that analysis.

## Frequently asked questions

### What specific techniques does Waldo use to reduce latency?

Waldo uses query decomposition to break complex questions into sub-queries, then routes each sub-query to the appropriate data source through Glean's connector framework. Its sufficiency detection mechanism stops retrieval as soon as evidence is adequate, preventing unnecessary additional calls. These techniques combined produce a P50 latency of approximately 250 ms per retrieval call.

### How does Waldo compare to other search models in terms of performance?

Waldo operates roughly 10x faster per call than using a frontier model for the same retrieval tasks. The end-to-end pipeline shows approximately 50% lower latency and 25% fewer tokens consumed. Unlike general-purpose small models, Waldo is post-trained specifically on search planning tasks, which gives it higher precision on query decomposition and tool routing than a model trained for general instruction-following.

### What metrics should teams use to evaluate Waldo's effectiveness?

Track four dimensions: end-to-end latency (time from query to answer), token consumption per query (across all model calls in the pipeline), answer accuracy (correctness of the final response), and citation grounding (whether cited sources actually support the claims in the answer). Compare these metrics with and without the specialized retrieval model to isolate its impact.

### Does Waldo work for simple queries or only complex multi-step searches?

Waldo handles both, but the performance advantage is most pronounced on complex, multi-step queries that require decomposition and multiple tool calls. For simple single-source lookups, Waldo still processes the retrieval step faster than a frontier model would, but the absolute time savings per query are smaller because there's less retrieval work to offload.

### What are the practical implications of using Waldo in enterprise settings?

The primary implications are lower per-query cost, faster response times that drive higher adoption rates, and a more predictable cost curve as usage scales. From a governance perspective, Waldo operates within the same permission-aware retrieval framework as the rest of Glean's architecture, so existing access controls and audit capabilities remain unchanged.

The shift from monolithic AI pipelines to composable, specialized-model architectures is already changing how enterprise teams think about search performance and cost. Waldo represents that shift in practice: a purpose-built model that handles retrieval faster and cheaper while the frontier model focuses on delivering accurate, cited answers.

[Request a demo to explore how Glean and AI can transform your workplace.](https://www.glean.com/get-a-demo) We can walk you through how Waldo fits into your existing infrastructure and what the performance gains look like on your data.

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
