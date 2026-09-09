---
url: "https://www.glean.com/perspectives/comparing-retrieval-routing-and-orchestration-impact-on-token-usage"
canonical: "https://www.glean.com/perspectives/comparing-retrieval-routing-and-orchestration-impact-on-token-usage"
title: "Comparing retrieval routing and orchestration impact on token usage"
description: "The Glean Team | Comparing retrieval routing and orchestration impact on token usage reveals routing cuts tokens by 36% while preserving response quality and speed."
fetched_at: "2026-09-01T13:27:36.102Z"
---
Last updated Jul 14, 2026.

# Comparing retrieval routing and orchestration impact on token usage

0

minutes read

![Comparing retrieval routing and orchestration impact on token usage](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

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

# Comparing Retrieval, Routing, and Orchestration: Impact on Token Usage

Architectural decisions around retrieval depth, query routing, and workflow orchestration determine how many tokens your AI system burns per query. Those decisions also determine whether your monthly API bill lands at $50,000 or $500,000. These three layers interact in ways that make static configurations costly and brittle across real enterprise workloads.

The core tension is straightforward. Deeper retrieval pulls more context into the prompt, which improves factual grounding but inflates token costs and latency. Shallow retrieval saves tokens but underserves complex, multi-hop questions.

Routing decides which model or retrieval strategy handles each query. Orchestration governs how multi-step workflows chain these decisions together, controlling whether token usage grows linearly or stays bounded. Understanding how each layer drives consumption is the difference between a deployment that scales and one that stalls under its own cost structure.

## How retrieval, routing, and orchestration each affect token consumption

Retrieved context is typically the largest variable component of billed tokens in any [retrieval-augmented generation](https://www.glean.com/blog/rag-for-llms) (RAG) system. A top-10 dense retrieval strategy pulls substantially more prompt tokens than a top-3 approach, and [always-heavy retrieval inflates total billed tokens by over a third](https://arxiv.org/abs/2606.02581) compared to per-query routing. Yet the relationship between retrieval depth and answer quality is not linear.

Definitional queries often get accurate answers from the model's parametric knowledge alone, meaning retrieval adds cost without improving the response. Multi-hop analytical queries, by contrast, genuinely need deeper context to produce grounded answers. A static retrieval configuration that treats every query the same way either overspends on simple questions or underserves complex ones.

Recent CA-RAG research ([Mishra, 2026](https://arxiv.org/abs/2606.02581)) demonstrates that per-query routing achieves 26% fewer billed tokens than always-heavy retrieval, with equivalent answer quality. The savings concentrate in simpler queries like definitions and classifications, where full retrieval adds no value.

Enterprise deployments have reached [$500K to $1M or more in monthly API costs](https://thesoogroup.com/blog/why-your-enterprise-ai-poc-will-die-in-production). At that scale, a 26% reduction translates to [token efficiency](https://www.glean.com/blog/token-efficiency-enterprise-ai) gains worth hundreds of thousands of dollars per year.

Routing addresses the second layer of waste. Without per-query routing, every question hits the same model with the same retrieval depth. "What is our PTO policy?" gets the same treatment as "Analyze Q3 revenue trends across all product lines." Matching query complexity to the right model tier and strategy [can cut costs by roughly 80%](https://thesoogroup.com/blog/why-your-enterprise-ai-poc-will-die-in-production).

Routing is not just about picking a cheaper model. Effective routing selects a strategy bundle: the model, the retrieval depth, the prompt template, and the response length constraint, all tuned together.

A utility function that balances quality, latency, and token cost can support multiple operating points through weight adjustment alone. You dial the tradeoff for different query classes without rebuilding the pipeline.

Orchestration is where costs compound or stay contained. In multi-turn agentic workflows, each step adds tokens to the running context. Gartner's 2026 analysis found that [agentic models require 5 to 30 times more tokens](https://oplexa.com/ai-inference-cost-crisis-2026/) per task than standard chatbots. A single routing error at step one propagates to every downstream step, inflating cost across the entire workflow.

Orchestration decisions control when to summarize accumulated context, when to discard intermediate state, and when to checkpoint. These choices govern whether a five-step workflow costs five times a single query or 15 times. Sequential tool chains multiply both latency and token cost, while parallel execution with selective context passing reduces both.

Glean's Enterprise Graph and [hybrid search](https://www.glean.com/blog/hybrid-vs-rag-vector) architecture address the retrieval layer directly. By combining dense and sparse retrieval with reranking, the system retrieves fewer but higher-relevance passages per query. That approach reduces prompt token volume without sacrificing the factual grounding that [agentic reasoning workflows](https://www.glean.com/blog/agentic-reasoning-future-ai) depend on.

The orchestration layer then determines how retrieved context flows through multi-step plans. It summarizes where possible and passes only relevant fragments to downstream agents, avoiding the context bloat that turns a well-designed retrieval pipeline into an expensive one.

## Why retrieval depth is the largest single driver of token cost

### How retrieval depth maps to billed tokens

Every query to a RAG system generates three categories of billed tokens. Prompt tokens cover system instructions, the retrieved context window, and the user query itself. Completion tokens cover the generated answer, and embedding tokens cover the vector encoding used during retrieval.

Of these three, retrieved context is the variable that swings cost most dramatically. System instructions and the query itself are relatively fixed, and completion length varies within a narrower band. The retrieved passages, however, can range from zero to tens of thousands of tokens depending on how many documents the system pulls into the prompt.

Adding passages has diminishing returns. After the first three to five high-relevance passages, each additional passage contributes less to answer quality while contributing the same fixed cost in prompt tokens. The result is a concave quality curve but a linear cost curve, and the gap widens with every extra passage retrieved.

### Matching retrieval depth to query complexity

Not every query needs the same amount of context, but classifying queries before retrieval is itself a cost decision. A second model call to assess difficulty defeats the purpose if it adds latency and tokens.

Lightweight classification signals avoid that overhead. Word count, cue words ("compare," "analyze," "summarize across"), and simple heuristic scoring can separate single-fact lookups from multi-hop reasoning tasks without invoking a model. A query containing three named entities and a temporal modifier ("Q3 2025") signals analytical complexity, while a five-word definitional query does not.

For queries that do need retrieval, reranking is the most direct path to fewer but better passages. A two-stage pipeline retrieves a broad initial set and then scores each passage for relevance to the specific query. You pay embedding tokens for the broad retrieval but prompt tokens only for the reranked subset.

Glean's self-learning language model adapts to each company's internal vocabulary and usage patterns over time. In a company's first six months on the platform, [search quality typically improves by 20%](https://www.glean.com/blog/agentic-reasoning-future-ai) through continuous learning. That increasing precision means retrieval returns more relevant passages from the start, reducing the need to over-retrieve as a hedge against missing the right document.

## How per-query routing reduces token waste without sacrificing answer quality

Per-query routing independently matches each incoming query to the smallest effective strategy bundle: the model tier, retrieval depth, prompt template, and response length constraint that can produce a satisfactory answer. Rather than applying a single pipeline to every query, routing treats each question as its own resource allocation decision.

The CA-RAG framework's 26% token reduction and 34% latency improvement illustrate the aggregate effect, but the distribution of savings matters more than the average. Simple queries, which make up the majority of enterprise workloads, account for a disproportionate share of the reduction. The savings come from not applying deep retrieval and high-capacity models to questions that never needed them.

A cost-aware routing utility function formalizes this decision. The function combines a quality prior, estimated from query characteristics and historical outcomes, with normalized penalties for latency and total billed tokens. The system selects the highest-scoring strategy from the candidate set, and adjusting the penalty weights shifts the operating point without changing the strategy catalog.

A well-designed router exercises the full catalog of available strategies rather than collapsing to a near-fixed policy. If your routing logs show that 95% of queries hit the same strategy, the router is not routing - it has become a static pipeline with extra overhead. Effective routing produces a distribution of strategy selections that reflects the actual diversity of incoming queries. In practice, [between 70% and 80% of production enterprise workloads](https://www.swfte.com/blog/ai-api-pricing-trends-2026) run identically on mid-tier or budget-tier models as they do on premium, which means a well-tuned router can divert the majority of traffic to cheaper models without quality loss.

Glean's query planning step rewrites each query with enterprise-specific knowledge before routing it. The system understands which data sources are available, how they can be queried, and what enterprise-specific terms mean in context. That rewriting step gives the router better signal for classification, because a query rewritten with the right internal terminology is easier to classify accurately than a raw user question full of ambiguous shorthand.

## What the orchestration layer controls that retrieval and routing cannot

### Context accumulation across multi-step workflows

Retrieval and routing operate at the single-query level. Orchestration governs what happens across queries in a multi-step workflow, where decisions at each stage shape the token budget for every stage that follows.

Each step in an agentic workflow adds its output to the running context. A research step might contribute 2,000 tokens of retrieved passages, an analysis step adds its intermediate conclusions, and a drafting step includes the accumulated context plus its own generation. Without active management, context grows linearly with each step.

The compounding problem extends beyond cost. When an earlier step retrieves irrelevant context or produces a weak intermediate answer, every downstream step inherits that noise. The later model calls spend tokens processing information that actively degrades their output - not just wasted cost, but negative value.

Orchestration decisions determine whether context growth stays bounded or runs away. Summarizing intermediate results between steps compresses the context window while preserving essential information. Discarding intermediate state entirely after extraction removes noise, and checkpointing allows a workflow to restart from a clean state at a known-good step rather than rerunning from the beginning.

### Sequencing, parallelization, and tool call management

Sequential execution is the default in most agentic architectures, and it is the most expensive pattern. Each step waits for the previous one to complete, which means latency and token cost both stack linearly.

Parallel execution breaks this pattern. When two sub-tasks are independent, running them simultaneously eliminates the latency overlap and allows selective context passing. Each parallel branch receives only the context it needs, and the outputs are merged at a join point with only the relevant portions carrying forward.

State and memory management determines what counts as essential versus redundant context. A well-designed orchestration layer maintains a compact state representation that captures key facts, decisions, and constraints from earlier steps without carrying forward raw retrieved passages or verbose intermediate outputs.

Glean Agents use multi-step planning with sub-agents and tool selection to manage this complexity. As [enterprise AI agents](https://www.glean.com/blog/ai-agents-enterprise) mature, each sub-agent receives a scoped task and the minimal context needed to complete it, rather than the full conversation history. The [Agentic Engine](https://www.glean.com/blog/agentic-reasoning-future-ai) coordinates the plan, assigns sub-agents, selects tools, and merges results, keeping each branch lean and purpose-specific.

## Measuring the cost-quality tradeoff: metrics that matter

Measuring token efficiency requires tracking the right metrics at the right layer. A single metric cannot capture the interaction between retrieval, routing, and orchestration. The table below maps key metrics to the architectural layer each one diagnoses.

<table _hash="RE3472" style="min-width: 75px; border-collapse: collapse; border: 1px solid #ccc;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr _hash="qzuZ8b"><th colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Metric</th><th colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">What it reveals</th><th colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Architecture layer it diagnoses</th></tr><tr _hash="YZUU4j"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Total billed tokens per query</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Direct cost driver; includes prompt, completion, and embedding tokens</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Retrieval depth, prompt design</td></tr><tr _hash="WV4V7E"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Input-to-output token ratio</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Whether retrieved context is disproportionately large relative to the answer produced</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Retrieval precision, context management</td></tr><tr _hash="sulxWO"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Answer quality proxy (e.g., citation accuracy, factual grounding score)</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Whether token reductions degrade the usefulness of responses</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Routing strategy, retrieval relevance</td></tr><tr _hash="xhhArp"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">p95/p99 latency</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Behavior of the slowest queries; often dominated by deep retrieval or sequential orchestration</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Orchestration sequencing, routing edge cases</td></tr><tr _hash="9MgSPv"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Tool call count and sequencing</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">How many external calls a workflow makes and whether they run in parallel or series</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Orchestration design</td></tr><tr _hash="bA0Rqf"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Cost per resolved task (not per query)</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">True economic efficiency across multi-step workflows, not just single-turn cost</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">All three layers combined</td></tr></tbody></table>

The danger of single-metric focus is that improvements in one area can quietly degrade another. Aggressively cutting retrieval depth reduces token cost per query but may introduce ambiguity in the retrieved context. Ambiguous context produces longer, less focused responses that sometimes fail to answer the original question, triggering retries that consume more tokens than deeper retrieval would have.

Cost per resolved task captures this dynamic better than cost per query. A task that resolves in one well-grounded response at 4,000 tokens is cheaper than a task that takes three shallow attempts at 1,500 tokens each. Measuring at the task level reveals whether token savings at the query level are real or illusory.

The same strategy catalog can support multiple operating points through weight adjustment in the routing utility function. You do not need a different architecture for cost-sensitive batch processing and latency-sensitive user-facing queries. You need different weights on the same function.

Glean uses an LLM-based evaluation system to grade both retrieval quality and generation quality. The system assesses whether the retrieved documents are relevant to the user's question and whether the generated response accurately extracts information from those documents. [Internal testing](https://www.glean.com/blog/agentic-reasoning-future-ai) showed that human graders agreed with each other only 79% of the time, while the AI-based evaluation system reached 74% agreement - demonstrating near-human consistency for automated quality monitoring at scale.

## Practical techniques to optimize token efficiency across all three layers

### Retrieval-layer techniques

Set an explicit context budget per query as a first-class constraint, not an afterthought. Define the maximum number of tokens available for retrieved context before retrieval begins, and enforce it during passage selection.

Apply reranking to surface the most relevant passages early, and stop retrieving when sufficient signal is obtained. A two-stage retrieval pipeline that broadly searches and then precisely reranks gives you the recall benefits of wide retrieval with the token efficiency of narrow context windows.

Use token-aware chunking to process high-value sections of documents first. Headers, summaries, and conclusion sections often contain the information density a query needs. Retrieve these high-value chunks first, and pull in additional detail incrementally only when the initial chunks do not satisfy the query.

### Routing-layer techniques

Follow the "start small, then escalate" pattern. Route every query to the smallest effective model and shallowest retrieval depth first, and escalate to a larger model or deeper retrieval only when the initial response does not meet quality thresholds. One mid-market firm applied this approach and saw its monthly AI bill [drop from $42K to $11K](https://www.swfte.com/blog/ai-api-pricing-trends-2026) - a 74% reduction - by routing 80% of traffic to budget-tier models while reserving premium models for complex reasoning.

Separate workloads by latency profile. User-facing queries need fast responses and benefit from aggressive routing to smaller models, while batch processing tasks can tolerate higher latency and deeper retrieval. Routing these workloads through separate paths avoids forcing one profile's constraints onto the other.

Log every routing decision and monitor for drift. A router that made good decisions last month may degrade as query patterns shift, new data sources come online, or model behavior changes after updates.

### Orchestration-layer techniques

Summarize conversation history into compact state between workflow steps. Intelligent context management - selectively extracting and retaining key facts rather than carrying full transcripts - can reduce token usage dramatically. The key is compressing at natural breakpoints rather than at arbitrary token limits.

Use selective context passing between workflow steps. Each sub-task in a multi-step workflow should receive only the context it needs, not the full accumulated history. Define explicit input contracts for each step that specify exactly which fields, facts, or constraints it requires from upstream steps.

Set explicit token budgets with guardrails for each workflow step. A budget without enforcement is a suggestion, and guardrails that truncate or summarize context when it exceeds the step's budget prevent any single step from consuming the token allocation intended for later steps. For high-repetition workloads, [semantic caching can cut API costs by up to 73%](https://redis.io/blog/llm-token-optimization-speed-up-apps/) by storing query embeddings and serving cached answers for semantically similar requests - eliminating the LLM call entirely on cache hits.

Glean's [connector ecosystem](https://www.glean.com/connectors) ingests and indexes content across enterprise applications like Salesforce, Jira, Confluence, and Slack, which means the retrieval layer has broad coverage without requiring redundant tool calls during orchestration. The data is already indexed and permission-aware, so the orchestration layer retrieves from a unified index rather than making separate API calls to each source system and processing their raw responses.

## Frequently asked questions

### How much can per-query routing actually save compared to a fixed retrieval strategy?

Per-query routing typically reduces total billed tokens by 20 to 30%, with savings concentrated in simpler queries that make up the majority of enterprise workloads. The exact reduction depends on your query mix: organizations with a high proportion of definitional or lookup queries see larger savings than those whose workload is dominated by complex analytical questions.

### Does reducing retrieval depth always hurt answer quality?

No. For many query types, shallower retrieval with better reranking produces equivalent or higher quality answers. Quality degrades only when you reduce retrieval depth for queries that genuinely need multi-document context, such as cross-referencing or trend analysis across multiple sources.

### What role does the orchestration layer play in token cost at scale?

Orchestration controls how tokens accumulate across multi-step workflows. Without active context management, every step adds to a growing context window, and later steps pay the full cumulative cost. Summarization, selective context passing, and parallel execution can keep multi-step workflows close to the cost of their individual steps rather than multiplying them. For teams building [agentic RAG](https://www.glean.com/blog/agentic-rag-explained) systems, orchestration design is the primary lever for controlling cost at scale.

### Can I adjust cost-quality tradeoffs without changing my model or retrieval infrastructure?

Yes. A routing utility function with adjustable weights lets you shift between cost-focused and quality-focused operating points using the same models, the same retrieval pipeline, and the same strategy catalog. You change the penalty weights for latency and token cost, and the router selects different strategies accordingly.

### What is the single highest-impact change for reducing token cost?

Setting an explicit context budget per query and enforcing it during retrieval. Retrieved context is the largest variable component of billed tokens, and most over-spending comes from retrieving more passages than the query actually needs. A hard token budget with reranking to prioritize the most relevant passages within that budget addresses the biggest cost driver directly.

The architecture decisions you make around retrieval depth, query routing, and orchestration directly shape whether your AI deployment scales efficiently or becomes a runaway cost center. Getting these three layers right is not a one-time exercise - it requires ongoing measurement, routing adjustments, and context management as your workloads evolve. [Request a demo](https://www.glean.com/get-a-demo) to explore how we can help you build AI systems that deliver grounded answers without burning through your token budget.

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
