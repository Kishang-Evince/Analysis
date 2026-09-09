---
url: "https://www.glean.com/perspectives/how-intelligent-model-routing-saves-tokens-in-production-ai"
canonical: "https://www.glean.com/perspectives/how-intelligent-model-routing-saves-tokens-in-production-ai"
title: "How intelligent model routing saves tokens in production AI"
description: "The Glean Team | Intelligent model routing saves tokens by directing AI requests to the cheapest capable model, reducing production costs by 40-85% without quality loss."
fetched_at: "2026-09-01T13:27:47.927Z"
---
Last updated Jul 14, 2026.

# How intelligent model routing saves tokens in production AI

0

minutes read

![How intelligent model routing saves tokens in production AI](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

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

# How intelligent model routing saves tokens in production AI

Intelligent model routing matches each AI request to the right-sized model based on complexity, cutting token waste without sacrificing answer quality. Instead of funneling every query through a single large language model, a routing layer evaluates what each request actually needs and picks the right model.

Most production AI systems default to one model for all tasks. A simple lookup consumes the same tokens as a multi-step reasoning chain, which means organizations pay for compute they never needed. Model routing breaks that pattern by treating model selection as a real-time classification problem.

The payoff is measurable. Teams running diverse AI workloads, from quick entity extraction to deep analytical queries, can reduce token consumption significantly while maintaining or improving response quality across the board. Research from the [R2-Router project](https://arxiv.org/abs/2602.02823) (ICML 2026) demonstrated that intelligent routing achieves state-of-the-art performance at 4–5x lower cost compared to existing approaches by jointly optimizing model selection and output-length budgets.

## What is intelligent model routing?

Intelligent model routing is a system-level capability that sits between incoming requests and a pool of available models. It classifies each query by complexity, required reasoning depth, and context length, then directs the request to the model that fits the task. The routing decision happens in milliseconds, invisible to the end user.

Consider the difference between two requests hitting the same AI system. "What's our Q3 revenue target?" needs a fast, precise lookup. "Analyze the gap between our Q3 pipeline and historical close rates, then recommend adjustments to our sales strategy" requires multi-step reasoning, longer context, and a more capable model. Static model assignment treats both identically, burning tokens on the simple query and sometimes under-serving the complex one. Intelligent routing sizes the response to the task.

The routing layer evaluates signals before any model processes the request: query type, token budget, whether the task requires search retrieval or [agentic reasoning](https://www.glean.com/blog/agentic-reasoning-future-ai), and how much context the response needs. Glean's [Model Hub](https://www.glean.com/blog/model-hub) takes this approach by providing access to multiple models and automatically selecting the right one based on task requirements. A straightforward factual lookup routes to a smaller, faster model. A complex workflow fans out through the Agentic Engine for multi-step planning and execution. Early internal research on agentic reasoning showed a 24% increase in response relevance when queries were routed to the appropriate reasoning path rather than handled uniformly.

## How right-sized reasoning reduces token consumption

Right-sized reasoning applies only the inference depth a task actually requires. A factual lookup - "What's the PTO policy?" - doesn't need chain-of-thought planning. A strategic analysis does. When every query gets the same reasoning treatment, you pay for computation that adds nothing to the answer.

The savings scale quickly. In most enterprise environments, 60% to 70% of daily AI queries are routine: status checks, policy lookups, simple summaries. Routing those requests to smaller, faster models cuts token consumption on the majority of your workload while keeping larger reasoning models available for the queries that genuinely need them. The **Model Hub** in Glean classifies each request and assigns it to the right model tier, so routine queries resolve with fewer tokens and lower latency. According to [Oplexa's 2026 analysis](https://oplexa.com/ai-inference-cost-crisis-2026/), tiered model routing reduces inference spend by 60–80%, with 80% of routine enterprise traffic safely diverted to cost-optimized tiers.

Latency drops alongside cost. Smaller models return answers faster, which means employees get responses in under a second for simple questions instead of waiting for a heavyweight model to finish reasoning through a problem it didn't need to reason through at all. Research on [input token count](https://www.glean.com/blog/glean-input-token-llm-latency) and LLM responsiveness confirms that reducing the tokens a model processes directly improves time to first response. That speed difference compounds across thousands of daily interactions into measurable productivity gains. For a deeper look at where tokens go in enterprise workloads, see how teams approach [token efficiency in enterprise AI](https://www.glean.com/blog/token-efficiency-enterprise-ai).

## Why context retrieval matters more than context window size

Over-retrieval is one of the biggest hidden drivers of token waste in production AI. When a retrieval layer pulls 20 documents to answer a question that only needs two, the model processes thousands of unnecessary tokens before generating a response. Expanding context windows doesn't fix this problem - it masks it by allowing more waste per query.

Effective model routing depends on precise retrieval: pulling only the content that's relevant, scoped by permissions and filtered by the relationships between people, documents, and teams. The **Enterprise Graph** maps these relationships across an organization's entire tool ecosystem - functioning as a [knowledge graph](https://www.glean.com/blog/enterprise-ai-knowledge-graph) that helps the retrieval layer understand which documents are authoritative, which are outdated, and which belong to projects the user actually works on. That precision means the model receives a focused context window rather than a bloated one, cutting input tokens while improving answer accuracy.

Permission-aware retrieval adds another layer of efficiency. When the system knows which documents a user can access before retrieval begins, it eliminates irrelevant results at the source instead of filtering them after token-expensive processing. Building the right [permissions structure](https://www.glean.com/blog/secure-generative-ai-for-the-enterprise-requires-the-right-permissions-structure) is essential to this approach. Glean enforces permissions upstream of the language model, which prevents both data leakage and wasted tokens on content the user can't see. Teams looking to reduce token spend in multi-step workflows should start with retrieval quality, not model size - the gains are often larger and more immediate. Learn more about how to [optimize token efficiency](https://www.glean.com/perspectives/how-to-optimize-token-efficiency-in-agentic-systems) in agentic systems.

## Where intelligent routing has the biggest impact on production AI performance

Intelligent model routing delivers outsized gains in workloads where query complexity varies widely within the same system. Four areas stand out.

**Customer support automation.** Most support tickets follow known patterns: password resets, shipping status, return policies. A smaller model handles these with a templated lookup and a short response. Escalated cases - billing disputes that span multiple accounts, technical issues requiring diagnostic reasoning - route to a model with deeper inference capabilities. The **Agentic Engine** orchestrates multi-step resolution for these complex tickets, searching knowledge bases, pulling customer history, and drafting a response that addresses the root cause rather than just the symptom. Organizations exploring this approach can see how [AI agents in customer service](https://www.glean.com/blog/ai-customer-service-transform) are already transforming support workflows.

**Internal knowledge Q&A.** "Where's the parental leave policy?" resolves in milliseconds through a lightweight model and direct retrieval. "Walk me through our compliance requirements for processing EU customer data under the new contract terms" requires cross-referencing legal documents, regional policies, and contract language. Routing the first query to a reasoning-heavy model wastes tokens. Routing the second to a lightweight model produces an incomplete answer. Matching each to the right tier handles both correctly.

**Agentic workflows.** Multi-step workflows don't need the same model at every step. A planning step might require a capable reasoning model, while individual execution steps - running a search, extracting a data point, formatting a response - can use smaller, faster models. Glean's approach to agentic reasoning assigns different models to different steps within the same workflow, optimizing token spend at each stage rather than running a single large model end to end.

**Content generation at scale.** Standardized outputs like meeting summaries, status updates, and onboarding checklists follow predictable patterns. Strategic content - competitive positioning documents, executive briefings, customer proposals - demands more nuanced generation. Routing standardized work to efficient models frees token budget for the content that benefits from deeper reasoning. Teams running diverse [enterprise AI systems](https://www.glean.com/resources/guides/token-economy-enterprise-ai) across these categories see the clearest ROI from routing because the complexity distribution is wide enough to exploit.

## What separates effective routing from naive model switching

Naive model switching uses static rules: if the query is under 50 tokens, send it to the small model; if it mentions "analyze," send it to the large one. These heuristics break quickly. A short query can require deep reasoning ("What's our exposure if the Fed raises rates 50 basis points?"), and a long query can be a simple copy-paste lookup.

Effective routing evaluates contextual signals beyond surface-level heuristics. Query type, required reasoning depth, whether the task needs retrieval or agentic planning, and the user's role and recent activity all factor into the routing decision. The **Enterprise Graph** and **Personal Graph** provide these signals by mapping relationships across documents, people, teams, and activity patterns. A query from a financial analyst about rate exposure routes differently than the same words from someone searching for a meeting note - because the system understands the intent behind the request, not just its syntax.

Permission awareness is another dividing line. Effective routing must respect data access controls before selecting a model and retrieval path. If a query touches restricted data, the routing layer needs to know that before it decides which model and which documents to involve. Systems that evaluate permissions after model selection risk processing tokens on content the user can't see, wasting compute and creating security gaps. Glean enforces permissions at the retrieval layer, upstream of any model, so routing decisions are permission-aware from the start. Over time, effective routing also adapts. Usage patterns reveal which query types consistently need more reasoning depth and which resolve reliably with lighter models, allowing the routing layer to refine its classifications without manual rule updates.

## How to measure token efficiency without sacrificing answer quality

Tracking token efficiency requires metrics that capture both cost and quality in tandem. A system that cuts tokens by 40% but degrades answer accuracy by 15% hasn't saved anything - it's just shifted the cost to rework, follow-up queries, and lost trust. The goal is a declining cost curve alongside a flat or improving quality curve.

<table _hash="hFvIB8" style="min-width: 75px; border-collapse: collapse; border: 1px solid #ccc;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr _hash="QrAos6"><th colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Metric</th><th colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">What it measures</th><th colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Why it matters</th></tr><tr _hash="hnEsXN"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Tokens per resolved query</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Total input and output tokens consumed to fully answer a question</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Directly tracks cost efficiency per interaction</td></tr><tr _hash="4CfIVk"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Answer accuracy rate</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Percentage of responses rated correct or useful by end users</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Confirms routing decisions don't degrade quality</td></tr><tr _hash="bpvCOu"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Routing precision</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">How often the selected model matches the optimal model for a task</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Indicates whether the routing layer is making good decisions</td></tr><tr _hash="wVx4RF"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Latency per query tier</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Response time segmented by query complexity</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Confirms that simple queries resolve faster through lighter models</td></tr><tr _hash="WmUZ82"><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Cost per query tier</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Token cost segmented by routed model</td><td colspan="1" rowspan="1" style="text-align: left; border: 1px solid #ccc; padding: 8px;">Reveals where savings are concentrated and where spend is justified</td></tr></tbody></table>

The key is segmenting these metrics by complexity tier rather than averaging across all queries. Aggregate numbers hide problems. If your average tokens-per-query drops but your complex-query accuracy also drops, the routing layer might be under-serving hard questions to save tokens on easy ones. Break the data into tiers - simple lookups, moderate reasoning, complex multi-step - and track each independently.

Glean surfaces usage analytics through its admin dashboard, giving teams visibility into how queries distribute across model tiers and where token spend concentrates. That segmented view lets you identify whether routing decisions are improving over time or whether specific query categories need recalibration. The pattern you want to see: routine queries getting cheaper and faster while complex queries maintain or improve their accuracy scores.

## How to evaluate an AI platform's routing capabilities

Start with the most basic question: does the platform classify queries before routing, or does it default to a single model for everything? A platform that sends all requests to one model - regardless of complexity - offers no routing at all. Look for a multi-model architecture where different models handle different tiers of work, with automatic classification deciding which tier each query belongs to.

Evaluate the retrieval layer independently from the model layer. Routing is only as good as the context it provides. If the platform retrieves 30 documents for a query that needs three, even the best model wastes tokens processing irrelevant content. Ask how the platform scopes retrieval: does it understand document relationships, recency, authority, and user context? The **Enterprise Graph** in Glean maps these relationships to deliver focused retrieval, which means models receive fewer, higher-quality inputs. Understanding how [retrieval-augmented generation](https://www.glean.com/blog/rag-for-llms) works is essential to evaluating whether a platform's retrieval layer is genuinely reducing token waste or simply masking it with larger context windows.

Security is non-negotiable. Confirm that routing respects enterprise permission models end to end. The routing layer, retrieval layer, and model layer should all enforce access controls consistently. If permissions are checked only at the final response stage, the system has already processed restricted content upstream - burning tokens and creating risk. Test with real production workloads, not synthetic benchmarks. Routing performance varies dramatically between controlled demos and actual enterprise query distributions, where you'll see edge cases, ambiguous queries, and complexity patterns that benchmarks don't capture.

## Frequently asked questions

### What is intelligent model routing and how does it work?

Intelligent model routing classifies each AI request by complexity and directs it to the best-fit model from a pool of available options. The routing decision evaluates query type, required reasoning depth, and context needs in milliseconds, so simple lookups go to fast, efficient models while complex analytical tasks go to more capable ones.

### How does right-sized reasoning differ from traditional reasoning methods?

Traditional approaches apply the same reasoning depth to every query, regardless of complexity. Right-sized reasoning matches inference effort to task requirements - a policy lookup gets a direct retrieval, while a multi-step analysis gets full chain-of-thought planning. The result is lower token consumption on routine work without sacrificing quality on hard problems.

### What impact do these strategies have on overall AI performance?

Teams running intelligent routing see lower token costs, faster response times for routine queries, and maintained or improved accuracy on complex tasks. [Gartner forecasts](https://www.gartner.com/en/newsroom/press-releases/2026-03-25-gartner-predicts-that-by-2030-performing-inference-on-an-llm-with-1-trillion-parameters-will-cost-genai-providers-over-90-percent-less-than-in-2025) that LLM inference costs will drop over 90% by 2030, but agentic models already require 5–30x more tokens per task than standard chatbots - making intelligent routing essential to keeping total spend in check. The combined effect is a more scalable AI deployment where adding query volume doesn't proportionally increase compute spend, because the majority of new queries route to efficient models.

Intelligent model routing turns token management from a scaling problem into a scaling advantage - matching compute to complexity across every query your organization runs. The right platform handles routing, retrieval, and model selection automatically, so your teams focus on the work instead of the infrastructure. [Request a demo](https://www.glean.com/get-a-demo) to explore how Glean and AI can transform your workplace.

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
