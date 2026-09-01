---
url: "https://www.glean.com/perspectives/how-to-optimize-token-efficiency-in-agentic-systems"
canonical: "https://www.glean.com/perspectives/how-to-optimize-token-efficiency-in-agentic-systems"
title: "How to optimize token efficiency in agentic systems"
description: "The Glean Team | Token efficiency in agentic systems improves when engineering teams stop trimming prompt wording and start addressing the actual cost drivers: bloated retrieval, unmanaged message histories, and unconstrained refinement loops."
fetched_at: "2026-09-01T13:27:55.699Z"
---
Last updated Jun 03, 2026.

# How to optimize token efficiency in agentic systems

0

minutes read

![How to optimize token efficiency in agentic systems](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

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

# How to optimize token efficiency in agentic systems

Token efficiency in agentic systems improves when engineering teams stop trimming prompt wording and start addressing the actual cost drivers: bloated retrieval, unmanaged message histories, and unconstrained refinement loops.

Most teams treat cutting token spend as a text-editing problem — shortening system prompts or compressing few-shot examples. But in multi-agent systems, the expensive work happens across planning, tool use, inter-agent communication, verification, and retries. Cutting a few words from a prompt while leaving those stages untouched barely moves the needle on cost reduction in AI workflows.

This article walks through [context engineering](https://www.glean.com/blog/context-engineering-ai-the-foundation-of-reliable-high-performing-models) practices — the discipline of curating what goes into each prompt — that target the full token lifecycle, from observing where spend actually accumulates to fixing the architectural patterns that inflate it.

## Reframe token efficiency as an architecture problem, not a prompt problem

Token efficiency is not a goal by itself. The real objective is reliable outcomes per token spent — getting the same quality result with fewer wasted cycles. Framing the problem this way shifts attention from cosmetic prompt trimming to the structural decisions that determine AI agent performance: how context flows between agents, how much history each step carries, and how many loops run before a task completes.

A Concordia University study of 30 multi-agent software development tasks in ChatDev illustrates where tokens actually go. Code review alone consumed 59.4% of all tokens, and input tokens — the context fed to models, not the text they generated — accounted for 53.9% of total usage. The communication tax between agents, not generation itself, dominated cost.

Anthropic's research on context rot — the degradation in model recall accuracy as the number of tokens in a prompt grows — reinforces the point. Larger contexts don't just cost more — they perform worse. Engineering teams that [focus on context management](https://www.glean.com/perspectives/how-to-improve-ai-agent-performance-with-context-engineering) rather than prompt length see compounding returns in both cost and quality.

The pattern holds in production settings too. Splitting work across [specialized agent types](https://www.augmentcode.com/guides/ai-agent-loop-token-cost-context-constraints) with a routing layer cuts token usage by reducing redundant context passing, while also lowering latency without sacrificing accuracy. Each agent received only the context it needed, eliminating redundant retrieval and bloated message histories.

Glean's [Agentic Engine](https://www.glean.com/product/agentic-engine) applies the same principle at the platform level — orchestrating multi-step workflows so each agent stage receives only the enterprise context required for its task, rather than replaying the full conversation. That architectural choice is the single biggest lever for improving token efficiency across production deployments. The ordered steps in the sections that follow trace that path: observe your cost map first, then fix context management, memory, routing, iterative loops, and repeated work.

## 1\. Measure where tokens actually go before you optimize anything

The first mistake most teams make is treating token consumption as a single number — total tokens per request or total cost per day. That number hides everything useful. To find real savings, you need to break usage down by stage: retrieval, planning, tool calls, execution, review, reflection, memory updates, and retries.

Track input tokens, output tokens, and reasoning tokens separately. Input tokens usually dominate the bill, but reasoning tokens are where unpredictability lives. The Concordia University study found reasoning tokens ranged from 17,280 to 40,000 across different coding tasks, making per-task cost nearly impossible to predict from averages alone.

Token counts alone don't tell you whether the spend was worth it. Layer in business and [workflow metrics](https://www.glean.com/blog/enterprise-agent-evaluation-guide) alongside token data:

-   **Task success rate.** How often does the workflow complete without human intervention?
-   **Groundedness.** Did the agent use real sources, or did it hallucinate?
-   **Time to completion.** How long does the full workflow take end to end?
-   **Human correction rate.** How often does a person need to fix the output?
-   **Latency per step.** Which stages slow the workflow down?

A workflow that costs $0.12 per run but fails 40% of the time is more expensive than one that costs $0.30 and succeeds reliably.

Build a cost map per workflow, not per model call. A cheap call repeated 10 times during retries costs more than one strong call that finishes the job. A 2026 Stevens Institute of Technology study frames this as the "Unreliability Tax" — the hidden cost of agents that partially complete work, then require human cleanup or repeated runs.

Look for token hot spots tied to failure patterns. Most teams optimize average spend, but the expensive tail — the 10% of runs that consume five or six times the median — often drives more [total cost](https://www.glean.com/blog/understanding-the-ai-tax-how-to-avoid-the-hidden-cost-of-ai) than the other 90% combined. Those tails usually trace back to ambiguous instructions, missing context, or unbounded loops.

Glean's Enterprise Graph, which [maps relationships](https://www.glean.com/blog/knowledge-graph-agentic-engine) across your organization's documents, people, and tools, can surface which enterprise data sources are being queried most frequently across agent workflows, helping teams identify retrieval hot spots before guessing at where to cut.

## 2\. Stop stuffing full context into every turn

More context does not mean better context. Large prompts dilute the signal the model needs, increase latency, and reduce reliability. The relationship between prompt size and output quality is not linear — past a point, adding tokens actively hurts.

The most common mistake in enterprise agent design is loading full documents, complete chat histories, and raw tool outputs into every step "just in case." Teams treat the context window (the total text a model can process in a single call) like cheap storage. Anthropic's research on context rot shows the opposite: model recall degrades as the number of tokens in the prompt grows, especially for facts buried in the middle of long inputs.

Claude Code, for example, uses file paths combined with targeted commands like `grep` and `head` to analyze codebases without loading full files into context. The model retrieves data just in time rather than carrying everything forward.

Context engineering — the practice of deliberately curating what goes into each prompt — is a bigger lever for cutting token spend than compressing prompts. The core moves are:

-   [**Progressive retrieval**](https://www.glean.com/blog/agentic-rag-explained)**.** Store references and identifiers outside the prompt. Fetch the exact snippet at the moment of action.
-   **Evidence ranking.** Score search results by relevance and recency before inserting them. Include the top three or four, not all 15.
-   **Permission-aware filtering.** Only retrieve data the user is authorized to see. Smaller, compliant prompts beat bloated, over-permissioned ones.
-   **Working memory hygiene.** Drop information that is no longer needed for the next decision. Context should shrink between steps, not grow.

Sending 2,000 highly relevant tokens beats sending 20,000 loosely related ones, both for cost and for output quality.

Enterprise workflows add another layer: the data you retrieve must respect existing access boundaries. Pulling an entire document into an agent's context when the user only has access to two sections creates both a security problem and a token waste problem. Glean's permission-aware retrieval and Enterprise Graph deliver only the relevant, authorized snippets an agent needs — reducing prompt size while preserving access controls.

## 3\. Replace raw transcripts with structured state and memory

Long conversation history is not durable memory. Every message appended to a growing transcript becomes a compounding tax — more input tokens per turn, slower responses, and higher risk of the model losing track of earlier decisions. Research confirms this degradation is significant: a large-scale study of over 200,000 simulated conversations found that LLMs exhibit an average performance drop of 39% in [multi-turn settings](https://arxiv.org/abs/2505.06120) compared to single-turn, driven primarily by increased unreliability rather than reduced aptitude.

Persist what matters: the task objective, active constraints, key decisions made, tool outputs that changed the plan, unresolved questions, and the next action. Store these as structured state — summaries, key-value pairs, or diffs — rather than replaying every message verbatim.

Different types of memory serve different purposes. The table below breaks down three layers that effective agent systems use:

Memory layer

What it stores

Lifespan

Token impact

**Working state**

Current task objective, active constraints, tool results from the last step, immediate next action

Single task or turn sequence

Small and constant — refreshed each step, never grows unbounded

**Session summary**

Decisions made, dead ends explored, open questions, compressed conversation highlights

One session or workflow run

Moderate — written once at checkpoints, replaces raw transcript

**Long-term facts**

Validated user preferences, organizational policies, reusable retrieval patterns, past task outcomes

Across sessions

Queried on demand, not loaded by default — adds tokens only when relevant

Summaries should preserve evidence and open questions, not just conclusions. "Decided to use approach B" is less useful than "evaluated A and B; A failed due to rate limits; B succeeded with 340ms latency; open question: whether B scales past 1,000 concurrent users."

The LOOP Skill Engine takes structured memory further by compiling successful agent traces into branch-free recipes — compact sequences of actions that skip the exploratory steps. Stevens Institute researchers propose a similar pattern: storing past plans in a vector store (a database optimized for semantic similarity search) and querying that store before expensive planning, so the agent starts from prior knowledge instead of reasoning from scratch.

Good memory design directly improves automated workflows. An agent that can recover from an interruption by reading a compact state representation — rather than re-processing an entire conversation — finishes faster, costs less, and produces more consistent results. Glean's Personal Graph maintains per-user context and interaction history in a structured, permission-aware format, functioning as an enterprise memory layer that agents can query without loading bulk history.

## 4\. Route tasks by complexity instead of sending everything through the heaviest path

Many engineering teams build one powerful workflow and send every request through it. Every task gets the same planning loops, the same agent count, the same model, and the same tool set — regardless of whether the task is a simple lookup or a multi-step investigation. The result is avoidable token spend and unpredictable latency.

Not every task needs deep planning, multiple agents, or expensive reasoning. A factual lookup that could finish in a single retrieval call should not trigger a five-step orchestration pipeline. Add a [routing layer](https://www.glean.com/blog/agentic-reasoning-modern-work) that classifies incoming requests before execution: small and fast for straightforward tasks, heavier orchestration for ambiguous or high-stakes work.

Route by three factors: complexity (how many steps and decisions), risk (what happens if the answer is wrong), and required context depth (how much enterprise data the agent needs to access). Simple classification, even rule-based, prevents the majority of unnecessary token consumption.

Keep the tool set minimal per route. When an agent receives a prompt listing 30 available tools, the model spends tokens evaluating which tools apply — and more tool options increase the chance of selection errors. A route that only needs search and summarization should not see database-write or code-execution tools in its prompt.

Google's Gemini Robotics team introduced the concept of a "thinking budget" — tuning how much reasoning depth a model applies per task. The same principle works for agent orchestration: match the thinking budget and the number of orchestration layers to the actual difficulty.

Simpler tasks complete faster when they skip unnecessary planning steps. Routing across specialized agent types also reduces latency, because lightweight paths avoid the queue behind heavier orchestration.

The fastest path to cost reduction in AI agent systems is reducing unnecessary orchestration, not reducing intelligence where it matters. Glean's Agentic Engine routes work across specialized agent types, matching orchestration depth to task complexity so that simple lookups resolve quickly while complex, multi-step investigations get the reasoning depth they need.

## 5\. Design review, reflection, and multi-agent loops to end cleanly

Iteration improves quality — up to a point. After that point, each additional loop burns tokens with diminishing or zero returns. In multi-agent systems, review and reflection loops are often the single largest source of [token waste](https://arxiv.org/abs/2510.26585), and recent research shows that lightweight runtime supervision alone can cut multi-agent token consumption by nearly 30% without sacrificing task success rates.

The communication tax compounds quickly. When agents pass full context back and forth, each turn adds the entire prior output plus the review commentary to the next prompt. A 10-cycle Reflexion loop — a self-reflection pattern where an agent critiques and revises its own output — can consume roughly 50 times the tokens of a single pass due to quadratic growth in token count per turn.

A 2026 Stevens Institute of Technology analysis of AI agent economics found that unconstrained agents spent $5 to $8 per task. The same tasks with dynamic turn limits cost 24% less with comparable output quality.

Set bounded loops with clear exit conditions:

-   **Maximum turns.** Hard cap on how many review or revision cycles can run before the system stops or escalates.
-   **Minimum improvement threshold.** After each iteration, measure whether correctness, groundedness, or completeness actually improved. If the delta falls below a threshold, stop iterating.
-   **Clear handoff conditions.** Define what "done" looks like before the loop starts — not after the agent has already spent tokens debating it.

Pass diffs and issue lists into review steps, not entire artifacts. If a reviewer agent needs to check whether three specific issues were fixed, send it those three issues and the changed sections. Sending the full 4,000-token document for a two-line fix wastes the reviewer's entire input budget on re-reading unchanged content.

Add evaluator signals at each iteration boundary. Did the last pass introduce new errors? Did groundedness improve or stay flat?

If two consecutive iterations show no measurable gain, further revision is unlikely to help.

Reliability sometimes requires more tokens. A verification step that catches a factual error before the output reaches a user is worth the spend. The goal is not fewer loops but controlled loops — where every iteration has a measurable purpose.

Glean Agents plan, adapt, and act with enterprise context and governance, with built-in guardrails that prevent runaway loops from burning through budgets without producing better results.

## 6\. Turn repeated workflows into reusable plans, caches, and deterministic paths

The most expensive token you spend is the one you spend discovering a plan you already know works. When agents re-derive the same retrieval pattern, tool sequence, and output format for a task they have completed dozens of times before, every run pays the full reasoning cost again.

Graduate repeated tasks from exploration to guided execution. After an agent successfully completes a workflow — say, triaging support tickets or generating a weekly metrics summary — store the plan: which tools it called, in what order, what retrieval patterns it used, what the expected outputs looked like. On the next run, start from that stored plan instead of making the model figure it out from scratch.

The LOOP Skill Engine, published in a 2026 arXiv paper by Wang et al., demonstrates the scale of this approach. By compiling successful agent traces into branch-free recipes — stored in a compact format the researchers call SKILL.md — the system achieved 93.3% token savings on daily repeated tasks and 99.98% savings on high-frequency operations. The hybrid design preserves adaptability: the stored path handles the predictable parts, and the model's reasoning handles edge cases that deviate from the recipe.

Cache stable context blocks, validated intermediate results, and reusable instructions. [Prompt caching](https://arxiv.org/abs/2601.06007) alone — reusing the static portions of a prompt across calls — can cut input token costs by up to 90%, according to the same 2026 Stevens Institute analysis. A comprehensive evaluation across three major LLM providers found that strategic caching reduced API costs by 41–80% for agentic workloads. Add freshness checks and versioning so cached content does not go stale, but do not rebuild the cache on every call.

Token efficiency in mature agentic systems comes from reuse, orchestration design, and governance — not from making every individual request smaller. Gartner's 2025 research on AI engineering predicted that organizations using structured agent governance and reuse patterns would cut inference costs by up to 30% compared to those running ad hoc agent deployments. The gap between low-cost and high-cost teams is usually whether the system learns from prior runs or treats every request as a first encounter.

Glean's Agentic Engine can store and reuse validated execution patterns, reducing discovery cost for recurring enterprise workflows. When the retrieval path, tool sequence, and output format are already known, the agent skips the planning phase and applies its reasoning budget to the parts of the task that actually require judgment.

## Frequently asked questions about token efficiency in agentic systems

### What are the common mistakes engineering teams make regarding token efficiency?

The three most frequent mistakes are treating token consumption as a single aggregate number instead of breaking it down by stage, stuffing full documents and conversation histories into every prompt turn, and running unbounded review loops where agents iterate without clear exit conditions. Each of these inflates cost while masking the actual source of waste.

### How can teams effectively reduce token consumption in agentic systems?

Start by mapping where tokens go across each workflow stage — retrieval, planning, execution, review, and retries — then target the largest concentrations. The highest-impact moves are routing simple tasks away from heavy orchestration, replacing raw conversation transcripts with structured state, and caching validated plans for repeated workflows. These changes cut consumption without reducing output quality.

### How does token efficiency impact AI agent performance?

Lower token counts per turn reduce latency, improve model recall (less context rot), and produce more grounded outputs. Agents that receive focused, relevant context outperform agents that receive everything — the model spends fewer tokens parsing irrelevant material and more on the actual task. Efficient token use and better AI agent performance are the same problem.

### What are the economic implications of poor token management in AI projects?

Costs scale faster than most teams expect. Quadratic token growth in multi-turn loops, the Unreliability Tax from failed runs that require human cleanup, and redundant planning across repeated workflows can push per-task costs from cents to dollars. At enterprise scale — thousands of agent runs per day — the difference between managed and unmanaged token consumption is often an order of magnitude in monthly spend.

### What is the simplest rule for engineering teams to remember?

Measure before you cut. Map token consumption by workflow stage, identify the expensive failure tails, and fix those first. Teams that optimize the average miss the 10% of runs consuming 50% of the budget.

Token efficiency in agentic systems is a design discipline, not a prompt-editing trick — and the teams that treat it as an architecture problem will spend less, ship faster, and build agents that actually hold up in production. The steps above give you a clear sequence: measure, retrieve selectively, structure memory, route by complexity, bound your loops, and reuse what works. [Request a demo](https://www.glean.com/get-a-demo) to explore how Glean and AI can transform your workplace.

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
