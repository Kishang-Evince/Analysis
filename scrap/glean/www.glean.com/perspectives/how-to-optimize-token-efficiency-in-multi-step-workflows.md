---
url: "https://www.glean.com/perspectives/how-to-optimize-token-efficiency-in-multi-step-workflows"
canonical: "https://www.glean.com/perspectives/how-to-optimize-token-efficiency-in-multi-step-workflows"
title: "How to optimize token efficiency in multi-step workflows"
description: "The Glean Team | How to optimize token efficiency in multi-step workflows: Map token usage across retrieval, planning, and execution stages to reduce costs by 60%."
fetched_at: "2026-09-01T13:27:56.227Z"
---
Last updated Jul 14, 2026.

# How to optimize token efficiency in multi-step workflows

0

minutes read

![How to optimize token efficiency in multi-step workflows](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

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

# How to Optimize Token Efficiency in Multi-Step Workflows

Token efficiency in multi-step workflows improves when you treat token usage as a systems-level problem rather than a wording problem. The biggest cost drivers are not your prompts themselves but accumulated context, redundant retrieval, unused tool schemas, and unmanaged memory that compounds across every step of a workflow.

Most optimization guides focus on trimming individual prompts. That helps, but it misses where the real waste lives. In agentic workflows where a model plans, selects tools, reads observations, and carries state forward, each action expands context and multiplies cost.

The strategies that matter most work across the full lifecycle of a workflow: what enters the prompt, what gets retrieved, which tools are exposed, how memory is written back, and when the system is allowed to keep iterating.

## How to optimize token efficiency in multi-step workflows

Start by reframing the goal. You are not chasing the fewest tokens per call. You are chasing the most useful work per token.

That distinction matters because aggressive token cutting often degrades output quality or forces extra turns that cost more than the tokens you saved. A practical approach covers six areas, roughly in order of impact: measure per-step usage, reduce context before it reaches the model, redesign memory, constrain tools, stop unnecessary loops, and route work to the right model. The urgency is growing: according to [Gartner, agentic models require 5 to 30 times more tokens per task](https://www.gartner.com/en/newsroom/press-releases/2026-03-25-gartner-predicts-that-by-2030-performing-inference-on-an-llm-with-1-trillion-parameters-will-cost-genai-providers-over-90-percent-less-than-in-2025) than a standard chatbot, which means even falling per-token prices will not offset unoptimized workflows.

Measurement comes first because session-level averages hide the real problems. A workflow can look acceptable overall while a single stage quietly burns most of the budget. Track input tokens, output tokens, cache reads and writes, and total turns per run.

When [GitHub's agentic workflows team](https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows/) audited their pipelines, they found that unused MCP tool registrations were the single most common inefficiency. A GitHub MCP server exposing 40 tools added 10 to 15 KB of schema per turn. Removing the tools no workflow actually called cut per-run context by 8 to 12 KB with zero behavior change.

The cost math reinforces why per-step measurement matters. [Output tokens typically cost three to eight times more than input tokens](https://benchlm.ai/llm-pricing), depending on the provider and model tier. Even a modest workflow generating a few hundred tokens per call adds up fast at scale — and every token spent on irrelevant context or verbose output is money spent on work your product never uses. Testing by Glean's engineering team confirms that [input token count](https://www.glean.com/blog/glean-input-token-llm-latency) directly correlates with latency, making bloated context a performance problem as well as a cost one.

Research from Zhejiang and Westlake universities showed that a lightweight supervision framework called [SupervisorAgent reduced token consumption by 29.68%](https://arxiv.org/abs/2510.26585) on the GAIA benchmark without hurting task success rates. The framework works through real-time intervention that corrects inefficient model behavior mid-run.

In enterprise environments, platforms with deep organizational context, like Glean's [Enterprise Graph](https://www.glean.com/enterprise-context/enterprise-graph), improve retrieval relevance by combining task context, user context, and permissions. Permission-aware retrieval means the model spends fewer tokens processing irrelevant or unauthorized documents. That dual benefit makes retrieval design one of the highest-impact levers for token efficiency at scale.

## 1\. Measure token usage by step, not by session

A token budget for your entire workflow is more useful than a budget for any individual prompt. Map every stage — planner call, retriever call, tool invocation, observation handoff, memory update, verification pass, final synthesis — and assign each one a token baseline before you start optimizing.

Session-level averages are where waste hides. A four-turn workflow that occasionally balloons to 18 turns looks fine on average but triples your cost on those anomalous runs. GitHub's [Daily Token Usage Auditor](https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows/) pattern catches exactly this problem: it flags workflows with abnormal usage spikes, and a companion Optimizer agent then creates issues with concrete fixes for the offending stages. Without per-step visibility, you optimize the wrong thing.

The metric that matters most is token efficiency score — useful output divided by total tokens consumed. Normalize by workload size: tokens per successful task completion, turns per completed workflow, and input-to-output ratio per step. If your system design evolved from a chat prototype, inspect how multi-turn conversation prompts became persistent histories that replay on every call. That migration artifact is often a major source of unnecessary input tokens. Platforms that model how individual users work, like Glean's [Personal Graph](https://www.glean.com/enterprise-context/personal-graph), reduce the retrieval overhead at every step by surfacing contextually relevant information without forcing the model to sort through broad, unpersonalized results.

## 2\. Shrink what enters the model before every turn

Context accumulates faster than the task advances in any multi-step workflow. The default behavior in most agent frameworks is to pass the full transcript, the complete tool catalog, and every retrieved document into every model call. That default is expensive and counterproductive. These fragmented costs often go unnoticed — what some analysts call the [hidden cost of AI](https://www.glean.com/blog/understanding-the-ai-tax-how-to-avoid-the-hidden-cost-of-ai) — because they spread across infrastructure bills rather than appearing in a single line item.

Scope instructions to the current job. Your planner stage needs planning rules, not formatting constraints. Your output formatter needs structure definitions, not retrieval logic. When each stage receives only the instructions it needs, you cut input tokens and sharpen the model's focus simultaneously. A bloated context degrades reasoning quality — when your agent only loads what it needs, the output is sharper, not just cheaper.

Retrieve less, but retrieve better. Instead of pulling full documents, pull the specific passages that answer the query — the core principle behind [retrieval-augmented generation](https://www.glean.com/blog/rag-for-llms). Glean's [search architecture](https://www.glean.com/enterprise-search) is built to return relevant results rather than entire files, which means fewer tokens enter the reasoning loop while relevance stays high. For tool definitions, load capability on demand. One production team demonstrated this with 30 specialized workflows: loading everything upfront consumed roughly 150,000 tokens, but a skill-based architecture that loads only lightweight metadata — about 100 tokens per skill description — and injects full instructions on demand dropped that to approximately 3,000 tokens. Summarize long tool outputs before they re-enter the reasoning loop. An observation that returns 2,000 tokens of raw JSON when the model only needs three fields is pure waste. Extract what matters, discard the rest, and pass forward a compact summary.

## 3\. Replace full-history memory with layered memory

Memory architecture in agentic systems directly shapes future token costs because every fact you store gets replayed into future prompts. The common mistake is "store everything, replay everything." A ten-turn workflow that carries its full transcript forward can spend more tokens on history than on the task itself.

Split memory by purpose. Short-term episodic memory holds the current task's state and recent observations. Long-term semantic memory stores facts likely to matter across sessions — project context, user preferences, domain knowledge. Procedural memory captures learned patterns for how to complete recurring tasks. Each type gets queried differently, and only the relevant slice enters any given prompt. Carry forward state summaries, not raw transcripts. When a planning stage completes, summarize its output into a compact state object — the decision made, the key facts found, the next step — and pass that forward instead of the full reasoning trace.

Write memory selectively and keep it grounded. Save only facts with a reasonable chance of reuse, tag them with source, recency, and confidence, and validate before write-back. Bad context in memory propagates forward and compounds across runs, creating a silent cost multiplier. Glean's [knowledge graph](https://www.glean.com/enterprise-context) applies a version of this principle at the platform level: it understands how individual users work, what they access, and what matters to their role, so retrieval stays personalized without replaying broad organizational context into every query. That selective, identity-aware approach to context is one of the fastest paths to better agent performance and lower per-run cost.

## 4\. Constrain tool access and keep deterministic work out of the reasoning loop

Every tool your agent can access adds tokens to the prompt. Tool definitions, argument schemas, usage descriptions, and returned observations all enter the context window. A large tool catalog creates permanent prompt inflation that compounds across every turn of a multi-step workflow.

Register only the tools a given workflow stage actually needs. A smaller, curated tool set improves selection accuracy and reduces the tokens spent describing options the model will never use. One team built an architecture for 30 specialized workflows where each skill loads only its required tools on demand and unloads them afterward. That load-execute-unload cycle dropped their system prompt from roughly 150,000 tokens to approximately 3,000 — a reduction that made multi-step agentic tasks viable at scale.

Move deterministic work out of the model loop entirely. Metadata fetching, file reading, field validation, format conversion, and permission checks are code problems, not reasoning problems. Every time the model performs work that a function call could handle, you pay reasoning-tier token costs for commodity operations. Keep tool outputs structured and compact — return only the fields the next step needs, in a consistent format. Standardize observation formats across tools so the model does not need to parse different structures at every step. Glean's [agent builder](https://www.glean.com/ai-agents/agent-builder) supports this approach: when you build an agent, you configure which connectors and actions it uses, so the agent operates with a focused toolset matched to its task rather than the full catalog of over 100 enterprise integrations.

## 5\. Stop token waste from retries, loops, and unnecessary handoffs

Multi-step workflows can keep spending tokens until a hard limit stops them. Without guardrails, a single failed tool call can trigger a retry loop that burns thousands of tokens repeating the same mistake. Loop control is one of the highest-return investments in any agentic system.

Set explicit limits on turns, retries, and context expansions. A retry budget forces the agent to either succeed within a defined window or escalate cleanly instead of spiraling. Research on multi-agent systems has documented agents entering repetitive action loops — calling the same tool with the same arguments, re-reading the same document, or asking the same clarifying question — without recognizing the pattern. Production analysis shows that [multi-agent orchestration can consume 4 to 15 times more tokens](https://www.obviousworks.ch/en/token-optimization-saves-up-to-80-percent-llm-costs/) than a single well-designed agent when these loops go unchecked. An adaptive filter that detects repeated behavior and redirects the agent to a different strategy or a graceful exit prevents these loops from consuming your budget. Treat repeated actions as a supervision signal, not just a cost problem. They often indicate an upstream issue: ambiguous instructions, missing context, or a tool that returns unhelpful observations.

Reduce avoidable handoffs between agents. Every handoff duplicates instructions, state, and evidence because the receiving agent needs enough context to act. Use multiple agents only when task specialization clearly justifies the handoff cost. Add lightweight verification at critical decision points — not constant self-reflection after every step. Glean's [Agentic Engine](https://www.glean.com/platform/agentic-engine) handles orchestration with enterprise context: it plans multi-step sequences and adapts when intermediate results change the path. Caching results for repeated subproblems within a run further reduces redundant computation — [semantic caching alone can cut LLM API costs by up to 68.8%](https://wundergraph.com/blog/rag-cost-optimization) in typical production workloads, according to data from Redis. If two branches of a workflow need the same retrieved passage, serve it from cache rather than re-retrieving and re-processing.

## 6\. Route the right model and output format to each stage

Not every stage in a workflow needs the same model. Using a large reasoning model for simple classification, tool selection, or field extraction is a common and expensive default. Matching model capability to task complexity is one of the fastest ways to cut cost without affecting output quality.

Route by task type. Smaller, faster models handle classification, routing, summarization, and structured extraction well. Reserve your most capable model for stages that require synthesis, judgment, nuanced generation, or multi-source reasoning. A workflow that routes a support ticket might use a lightweight model to classify the issue category, a mid-tier model to retrieve and summarize relevant documentation, and a capable reasoning model to draft the customer response. Each stage gets the model it needs and nothing more. The broader trend supports this strategy: [Epoch AI research shows LLM inference prices have fallen 9x to 900x per year](https://epoch.ai/data-insights/llm-inference-price-trends) depending on the task, making smaller models dramatically cheaper while still matching the performance benchmarks that frontier models set just a year or two earlier.

Constrain output shape at every step. When a stage only needs a JSON object with three fields, request exactly that structure. Set token ceilings per step so no stage can silently expand. Separate intermediate outputs from user-facing outputs — internal reasoning traces and tool observations do not need the polish or length of a final response. Glean's [Model Hub](https://www.glean.com/platform/model-hub) gives teams access to a range of models and the ability to route different tasks to different models within the same platform. The combination of task-appropriate model selection and strict output constraints means you pay for reasoning only where reasoning adds value, and you review quality alongside cost rather than treating them as opposing forces.

## How to optimize token efficiency in multi-step workflows: frequently asked questions

### What factors influence token efficiency in multi-step workflows?

The biggest factors are context accumulation across steps, the number and size of tool definitions loaded per turn, memory replay strategy, retry and loop behavior, and model selection per stage. Workflows that address all five areas typically see meaningful reductions in per-run token costs compared to unoptimized versions.

### How can I optimize token usage when using tools in agentic systems?

Register only the tools each stage actually needs, load tool definitions on demand rather than upfront, and keep tool outputs compact by returning only the fields the next step requires. Moving deterministic operations like validation and metadata lookup into code rather than the model loop eliminates reasoning-tier token costs for commodity work.

### What are the best practices for managing memory in multi-step AI workflows?

Split memory into short-term episodic, long-term semantic, and procedural layers. Carry forward state summaries instead of raw transcripts, write selectively with source and recency tags, and validate facts before storing them. Bad memory propagates into future prompts and compounds cost across every subsequent run.

### How does workflow complexity affect token costs?

Each additional step in a workflow multiplies context because observations, tool outputs, and intermediate reasoning carry forward. A five-step workflow does not cost five times a single call — it often costs significantly more because of context duplication at handoff points. Scoping context per step and summarizing between stages keeps the multiplier closer to linear. Approaches like [agentic RAG](https://www.glean.com/blog/agentic-rag-explained) help by dynamically adapting retrieval depth to each step's actual needs rather than retrieving a fixed set of documents regardless of the query.

### What strategies improve token efficiency in AI agents without hurting quality?

Per-step measurement identifies where waste actually lives. Scoped context and on-demand tool loading reduce input tokens. Layered memory prevents history replay. Loop limits and retry budgets stop runaway spending. Model routing matches capability to task complexity. Applied together, these strategies reduce cost while improving output quality because a focused context produces sharper reasoning.

Token efficiency in multi-step workflows comes down to treating every stage as a design decision — what context enters, which model runs, and when the system stops. The teams that get this right spend less per run while producing more reliable, grounded outputs. [Request a demo](https://www.glean.com/get-a-demo) to explore how Glean and AI can transform your workplace.

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
