---
url: "https://www.glean.com/perspectives/optimizing-token-consumption-why-routing-matters-more-than-cost"
canonical: "https://www.glean.com/perspectives/optimizing-token-consumption-why-routing-matters-more-than-cost"
title: "Optimizing token consumption why routing matters more than cost"
description: "The Glean Team | Optimizing token consumption needs routing strategy over cost focus. Smart model selection cuts LLM spending 50% more than price reduction alone."
fetched_at: "2026-09-01T13:28:00.630Z"
---
Last updated Jun 02, 2026.

# Optimizing token consumption why routing matters more than cost

0

minutes read

![Optimizing token consumption why routing matters more than cost](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

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

# Token routing: why it cuts AI spend more reliably than cheaper models

Token routing, the practice of directing different tasks to different models based on complexity and reasoning depth, reduces token consumption (the total units of text that AI models process and bill against) more reliably than falling per-token prices alone. The reason is straightforward: routing controls how much compute each task actually uses, while cheaper prices only shrink the unit cost of compute you're already burning.

Most teams track cost per token as their primary AI spending metric. But based on Glean's internal analysis of enterprise agent deployments (2025), AI agents can consume hundreds to thousands of times more tokens per task than single-turn chat interactions.

When volume grows that fast, steep per-token price drops still leave your total bill climbing. The metric that matters is cost per outcome: what you spend to get a useful result, not what you spend per unit of raw compute.

Token routing treats AI cost management as an architecture decision. Instead of negotiating rates or defaulting every request to a single model, routing assigns each task to the model best suited for it: a lightweight model for simple lookups, a more capable model for [multi-step reasoning](https://www.glean.com/blog/agentic-reasoning-future-ai). The rest of this article breaks down how that works in practice and where teams see the biggest impact.

## What token routing actually means (and why it's different from choosing a cheaper model)

Token routing is the practice of directing different parts of a workflow, or different tasks within an agent's execution, to different large language models (LLMs) based on three factors: task complexity, data sensitivity, and required reasoning depth. A straightforward entity extraction might go to a small, fast model - a practical example of [choosing the right model](https://www.glean.com/blog/enterprise-language-models-choosing-the-right-approach-for-your-business-needs) for each task. A nuanced policy question that requires synthesizing information across multiple documents gets routed to a larger model with stronger reasoning capabilities.

Routing assigns each task to the right model dynamically, sometimes dozens of different assignments within a single agent run, rather than sending all tasks to one model. An [empirical study of over 100 trillion tokens](https://openrouter.ai/state-of-ai) by OpenRouter found that reasoning-optimized models now account for more than half of all routed tokens, underscoring how quickly agentic inference has reshaped consumption patterns.

Based on Glean's internal benchmarking of enterprise workflows (2025), identical tasks on the same model can produce token counts that vary by an order of magnitude or more, depending on prompt structure, context length, and output format. Routing gives you a mechanism to match model capability to task demand, which compresses that variance instead of absorbing it.

Per-token prices have fallen sharply across major model providers - [input costs have dropped roughly 85%](https://www.digitalapplied.com/blog/llm-api-pricing-index-cost-tracker-ai-agent-deployments) since GPT-4's launch - yet enterprise AI spending continues to rise. The gap exists because agentic workloads generate orders of magnitude more tokens than a single-turn chat exchange. An AI agent plans, retrieves information, reasons across steps, and takes action, each requiring its own inference call.

Consider a support agent resolving a customer ticket - a common pattern among [AI agents in the enterprise](https://www.glean.com/blog/ai-agents-enterprise). That agent might execute 15 to 20 model calls in sequence: retrieving account history, classifying the issue, drafting a response, checking policy compliance, and summarizing the resolution. Each call consumes tokens. Without routing, every one of those calls hits the same high-capability model, whether the task requires deep reasoning or not.

With routing, the classification step runs on a fast, inexpensive model while the policy-compliance check, which needs to parse nuanced language across multiple documents, runs on a model built for that kind of work. Glean Search uses this approach to serve permission-aware, cited answers by routing simpler retrieval tasks to lightweight models and reserving deeper reasoning for complex queries that span multiple enterprise data sources.

## Why cheaper models alone don't solve the cost problem

Every new frontier model launches at a premium price point, and every enterprise team gravitates toward it. According to [Menlo Ventures' 2025 enterprise AI report](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/), the application layer alone is now a $19 billion market, with horizontal AI the fastest-growing segment. The pattern repeats every few months: a more capable model appears, teams adopt it for everything from summarization to multi-step research, and total spending increases even as older models drop in price. Price reductions on last-generation models don't help when your production traffic has already shifted to the newest one.

The deeper issue is context re-ingestion - part of what some call the [hidden cost of AI](https://www.glean.com/blog/understanding-the-ai-tax-how-to-avoid-the-hidden-cost-of-ai). Agentic workflows don't make a single call and stop. Each step feeds its output into the next call, which means the model re-reads the entire accumulated context at every stage.

A procurement agent that pulls vendor contracts, compares terms, and drafts a recommendation might execute eight to 12 model calls in sequence. By the final call, the input payload includes everything generated in prior steps, duplicating tokens the model has already processed.

Retry logic compounds the problem further. When an agent's output doesn't meet a confidence threshold or fails a validation step, the entire sequence often reruns with the accumulated context plus the failed attempt. A single retry can double the token footprint of a workflow that was already expensive on its first pass.

Flat-rate budgeting makes the problem worse. As [Deloitte's analysis of AI token economics](https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-tokens-how-to-navigate-spend-dynamics.html) argues, traditional TCO models need a fundamental refresh because token-based costs are inherently unpredictable. Teams that allocate a fixed monthly budget for AI inference often set it based on early usage patterns: single-turn queries, lightweight summarization, narrow retrieval.

When those same teams deploy multi-step agents, token consumption can jump dramatically within weeks, according to Glean's internal analysis of agentic workflow deployments (2025). The budget didn't account for agentic workflows that re-ingest full context at every step and retry repeatedly on ambiguous outputs.

Glean's Agentic Engine, the multi-step planning and orchestration layer in the Glean platform, addresses the context compounding problem directly by maintaining state across steps in a workflow, so downstream calls receive structured intermediate results instead of re-processing raw accumulated context.

## How multi-model routing reduces total token consumption

Multi-model routing assigns each task within a workflow to the most cost-efficient model that can handle it at the required quality level. Classification and entity extraction, tasks with clear right-or-wrong outputs, run on small, fast models that consume a fraction of the tokens a frontier model would use.

Planning and synthesis tasks that require nuanced reasoning across multiple documents go to more capable models. The routing decision happens before the call, not after.

Output sensitivity adds a second routing dimension. Intermediate results like confidence scores, document rankings, and draft outlines tolerate lower-cost models because a human or downstream step will refine them.

Customer-facing outputs, compliance summaries, and board-level analyses need the precision that comes from a higher-capability model. Routing these two categories to the same model wastes spend on internal outputs that no one outside the system will ever read.

Context-length routing is less obvious but equally impactful. Instead of passing a 30,000-token document directly to a frontier model for analysis, a smaller model - often paired with [retrieval-augmented generation](https://www.glean.com/blog/rag-for-llms) - can first summarize or extract the relevant passages.

The frontier model then receives a compressed input and produces a higher-quality answer because its attention isn't diluted across irrelevant content. Glean Agents implement this compress-then-analyze pattern - a form of [agentic RAG](https://www.glean.com/blog/agentic-rag-explained) - through the Agentic Engine, which pre-compresses retrieved context before passing it to reasoning steps. Glean describes the broader framework as [the token economy](https://www.glean.com/webinars/token-economy).

The cascade pattern ties these dimensions together. Every task starts at the lowest viable model tier. If the model's confidence score falls below a defined threshold, the task escalates to the next tier. Research from UC Berkeley, Anyscale, and Canva published at [ICLR 2025](https://www.swfte.com/blog/intelligent-llm-routing-multi-model-ai) showed that trained routers using this pattern can achieve an 85% cost reduction while maintaining 95% of GPT-4-level performance. A well-tuned cascade routes most tasks to the cheapest tier, reserving frontier models for the subset that genuinely demands them.

## What a practical routing architecture looks like

Building a routing system doesn't require custom infrastructure from scratch. The architecture follows four repeatable patterns that most engineering teams can implement incrementally.

### Classify before you dispatch

An orchestrator layer sits between the user's request and the model fleet. Before any inference call, the orchestrator assesses the reasoning complexity of the task. Is the request a simple lookup, a structured extraction, or a multi-step analysis? This classification step itself uses a small model and costs a few hundred tokens. That small upfront investment prevents thousands of wasted tokens downstream by keeping simple tasks off expensive models.

### Set token budgets per task, not per model

Most teams track spending by model: how much went to the frontier model versus the mid-range model. A more useful control is a token ceiling per agent run, including retries and context re-ingestion. Without ceilings, long-tail variance creates budget surprises: a single complex query that triggers multiple retries can consume far more tokens than the median run. Per-task budgets cap that variance before it compounds.

### Instrument cost per outcome, not cost per call

Track the total tokens and total spend required to produce one correct result, broken down by step and model tier. Cost per call is misleading because a cheap call that produces a wrong answer triggers an expensive retry chain.

Based on Glean's internal analysis of agent workflows (2025), the correlation between a model's predicted token usage and its actual consumption is weak. Model self-estimates are unreliable for budgeting. Production observability data is the only trustworthy input for routing decisions.

Glean's platform instruments each step of an agent workflow, so teams can identify exactly where tokens accumulate and which model tiers deliver correct outcomes at each stage.

### Build a routing decision table

Map every model call in your workflow against three variables: task complexity (low, medium, high), output sensitivity (internal versus external), and context length (short, medium, long). Assign a model tier to each combination, then validate with side-by-side quality comparisons on 30 to 50 representative inputs. Revisit this table quarterly as new model releases shift the capability-to-cost ratio.

## Why routing matters more for agentic workloads

Agentic systems are expensive primarily because of [input tokens, not output tokens](https://www.glean.com/blog/glean-input-token-llm-latency). Each loop in an agent's execution re-reads the full conversation history, tool outputs, and accumulated context from prior steps.

A five-step agent run where each step processes 4,000 tokens of context doesn't consume 20,000 input tokens. It consumes closer to 60,000, because each step re-ingests everything that came before it. The sheer volume of input tokens overwhelms any per-unit savings.

Token consumption and accuracy don't follow a linear relationship. Based on Glean's internal benchmarking across enterprise deployments (2025), accuracy tends to peak at intermediate cost levels and then saturate. Throwing more tokens at a problem past a certain point doesn't improve outcomes.

A frontier model processing a simple classification task doesn't produce a better answer than a mid-tier model; it just produces a more expensive one. Routing gives you per-action control over where you spend reasoning budget, so expensive computation goes only to the steps where it changes the result.

For teams evaluating AI agent costs, understanding where tokens accumulate is a prerequisite to controlling them. Most of the spend hides in context re-ingestion and retry loops, not in the final answer generation.

[Glean Agents](https://www.glean.com/agents) address this pattern by drawing on the Enterprise Graph, Glean's structured representation of relationships across documents, people, and tools, to provide agents with pre-organized context rather than raw document dumps. When an agent has structured context at the start of a workflow, each subsequent step processes less redundant input, and the total token footprint shrinks.

## How routing improves AI scalability without sacrificing quality

When multi-model routing is properly scoped, teams can target significant reductions in total token spend on multi-step workflows. Results depend on workflow complexity and model selection, but the savings compound across every agent run. The savings come from routing frontier models to orchestration and reasoning tasks while mid-range models handle structured execution: extraction, formatting, classification, and summarization.

Quality doesn't degrade when routing is properly scoped. Mid-range models match frontier performance on structured tasks where the expected output format is well-defined.

A model extracting five fields from a contract performs identically whether it's a 70-billion-parameter model or a 13-billion-parameter model, as long as the extraction schema is clear. Routing exploits this equivalence by reserving frontier capacity for tasks where model size actually correlates with quality.

Latency improves alongside cost. Smaller models respond faster - partly due to more efficient [KV caching and throughput](https://www.glean.com/blog/glean-kv-caches-llm-latency) characteristics - which reduces end-to-end time for multi-step workflows.

A 10-step agent run where seven steps use a fast mid-range model and three steps use a frontier model completes in less total wall-clock time, because smaller models have lower inference latency per call. For user-facing workflows like searching for an answer during a live customer call, latency matters as much as accuracy.

Routing also future-proofs your architecture. Model capabilities improve across the board every six to 12 months, and a task that required a frontier model last year may run equivalently on a mid-range model today.

A routing layer lets you shift tasks between tiers without rearchitecting your workflow logic. Glean's platform manages model selection within its enterprise governance and permissions framework, so teams can update routing rules centrally while maintaining the same permission-aware, cited outputs across every workflow.

## How to start controlling token consumption with routing

Start by measuring what you already have, then route incrementally as you build confidence in your quality thresholds.

1.  **Audit every model call in your current workflows.** For each call, record the task type, input token count, output token count, model used, and what the output feeds into downstream. Most teams discover that the bulk of their token spend comes from a handful of recurring task patterns.

1.  **Score each task on three dimensions.** Rate every task for reasoning complexity (does the model need to synthesize across sources, or is the answer extractable from a single passage?), output sensitivity (internal intermediate result or customer-facing final output?), and context length (how many tokens does the input contain?). These three scores determine the model tier.

1.  **Run side-by-side quality comparisons.** Before moving any task to a cheaper model tier, test on 30 to 50 representative inputs. Compare outputs from the current model and the proposed model using domain-specific quality criteria, not generic benchmarks. If quality holds, route the task down.

1.  **Implement token ceilings per agent run and per workflow.** Set maximum input and output token budgets for each agent execution. When a run hits its ceiling, it terminates or escalates to a human rather than continuing to consume tokens on retries.

1.  **Build cost-per-outcome observability.** Log total tokens and total cost for each completed workflow, broken down by step and model tier. Glean's platform provides this visibility by instrumenting each step of an agent workflow, so you can identify which steps are the most expensive relative to their contribution to the final result.

1.  **Review your routing table quarterly.** New model releases shift the capability-to-cost ratio continuously. A task that needed a frontier model six months ago may run equally well on a model that costs one-fifth as much today. Apply a token cost management framework to structure these reviews.

## Frequently asked questions

### How can routing improve token efficiency in AI?

Routing directs each step in a multi-model workflow to the most cost-efficient model that meets the task's quality requirements. By handling the majority of tasks at the cheapest viable tier and reserving frontier models for complex reasoning, teams can significantly reduce total token spend without degrading output quality.

### What are the limitations of relying solely on cheaper models?

Cheaper models lack the reasoning depth needed for multi-step synthesis, nuanced policy interpretation, and ambiguous classification. Routing everything to a single budget model doesn't reduce volume. Agentic workloads still generate the same number of calls, and quality drops on the tasks that matter most.

### How does token efficiency impact AI scalability?

Without routing, scaling agentic workloads scales spending linearly. Double the users, double the token bill. Routing decouples usage growth from cost growth by compressing per-task consumption, so teams can expand AI-driven workflows without proportional budget increases.

### What are the future trends in AI token management?

The industry is moving toward outcome-based pricing, where you pay for completed tasks rather than raw tokens consumed. Enterprises are building token governance programs, including budgets, ceilings, observability, and quarterly reviews, with the same rigor they apply to cloud infrastructure spend.

### Can models predict their own token costs before executing a task?

Not reliably. Based on Glean's internal analysis of enterprise agent workflows (2025), the correlation between predicted and actual token usage is weak. Token budgets and routing decisions should be built from production observability data, not from model self-estimates.

Token routing turns AI cost management from a pricing negotiation into an engineering discipline - one where you control spend at the task level, not the contract level. The teams that get this right build the operational foundation to scale AI across more workflows and higher-stakes decisions with full visibility into where every token goes.

[Request a demo to explore how Glean and AI can transform your workplace.](https://www.glean.com/get-a-demo)

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
