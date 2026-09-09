---
url: "https://www.glean.com/perspectives/why-organizational-context-is-a-bottleneck-for-software-engineers-using-ai-tools"
canonical: "https://www.glean.com/perspectives/why-organizational-context-is-a-bottleneck-for-software-engineers-using-ai-tools"
title: "Why organizational context is a bottleneck for software engineers using AI tools"
description: "The Glean Team | Organizational context bottlenecks software engineers using AI tools - the real constraint isn't generating code but knowing what needs building and why."
fetched_at: "2026-09-01T13:28:12.922Z"
---
Last updated Jul 03, 2026.

# Why organizational context is a bottleneck for software engineers using AI tools

0

minutes read

![Why organizational context is a bottleneck for software engineers using AI tools](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

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

# Why organizational context is a bottleneck for software engineers using AI tools

Organizational context - the accumulated knowledge about why code exists, how systems connect, and what tradeoffs were made - is the primary bottleneck preventing software engineers from getting real productivity gains out of AI coding tools. Even as [84% of developers now use or plan to use AI tools](https://keyholesoftware.com/software-development-statistics-2026-market-size-developer-trends-technology-adoption/), only a third trust the output - because when an AI assistant generates code without understanding your team's architecture decisions, security posture, or domain conventions, the output requires so much human validation that it can slow engineers down rather than speed them up.

A 2025 METR study found that experienced developers using AI tools took 19% longer on real-world tasks. Validating context-poor output - checking whether generated code respected internal APIs, followed team conventions, and fit the existing system - ate the time savings entirely.

The context AI needs to produce useful code lives in video calls, Slack threads, architecture decision records, and hallway conversations - none of it indexed, none of it accessible to the model at inference time. Until that organizational knowledge becomes retrievable, AI tools will keep producing plausible code that doesn't fit.

## Why writing code was never the real bottleneck

The bottleneck in software development has always been understanding, not typing - understanding requirements, system boundaries, and why a previous team chose a specific tradeoff over an obvious alternative. AI coding assistants accelerate the roughly 20% of a developer's time spent writing new code, but according to Forrester's 2024 State of DevOps Report, developers spend about 76% of their time on planning, reviewing, debugging, and collaborating - activities where [coding time and efficiency](https://www.glean.com/blog/software-development-success-relies-on-maximizing-coding-time-and-efficiency) depend entirely on organizational context no model has access to.

Consider a concrete scenario: an engineer asks an AI assistant to add a retry mechanism to a payment service. Even with good [AI prompting in software engineering](https://www.glean.com/blog/glean-ai-prompting-guide-engineers), the model generates clean, idiomatic retry logic in seconds. But the organization already has a shared retry library mandated by the platform team, a circuit-breaker pattern required for all payment-adjacent services, and a specific backoff policy documented in a Confluence page last updated eight months ago.

The AI doesn't know any of this. The engineer now spends 30 minutes in code review explaining why the generated approach won't pass merge approval - and another 20 minutes rewriting it to match internal standards.

According to LinearB's 2024 analysis of 400+ development teams, merge approvals remain 77% human-controlled even when code generation is AI-assisted, because reviewers must validate whether the output fits the organization's architecture and domain language. A recent [academic survey found that 72% of developers report at least halving the time](https://arxiv.org/html/2603.16975v1) for boilerplate and documentation tasks, yet debugging and planning showed markedly lower benefits - confirming that AI excels at routine work but struggles where contextual understanding matters most. When AI generates code faster without contextual grounding, the bottleneck moves downstream to code review, integration testing, and incident response.

As Derek Comartin put it in early 2026: "The bottleneck has been context, not writing code." The [AI tools that actually work for software engineers](https://www.glean.com/blog/best-ai-tools-for-software-engineers) are the ones that close this gap between generation speed and contextual accuracy - tools built on retrieval systems like Glean's Enterprise Graph that can surface the organizational knowledge a model needs before it generates a single line of code.

## Where organizational context actually lives - and why AI can't reach it

The most consequential decisions in software organizations happen in places no AI tool indexes. An architect explains a migration strategy on a video call, while a staff engineer flags a deprecated dependency in a Slack thread that disappears into scroll history within days.

These moments shape how systems get built, but they leave no retrievable trace for an AI coding assistant to reference.

Even context that does get documented fragments across disconnected tools. Architecture decision records sit in Confluence and API contracts live in GitHub repos, while incident postmortems are scattered across Jira and Google Docs. No unified retrieval layer connects them.

When an engineer asks an AI assistant about a service's rate-limiting strategy, the model can't stitch together the ADR from six months ago, the Slack discussion that amended it, and the on-call runbook that reflects actual production behavior.

Documented context also degrades silently. API docs become wrong after refactors, and ADRs stop reflecting reality after outages force architectural pivots. No clear ownership model exists to keep this information current.

When AI retrieves stale context, it produces what engineers increasingly call "context poisoning": suggestions that follow deprecated patterns, reference renamed services, or conflict with architectural principles adopted after the documentation was written. Glean addresses this through the Enterprise Graph, which connects content across tools and tracks relationships between documents, people, and projects - surfacing the most relevant, current context rather than returning whatever was last indexed.

## How missing context compounds across software engineering workflows

Context gaps don't stay contained. A single piece of missing organizational knowledge ripples through code generation, review, and onboarding in ways that multiply the cost far beyond the original omission.

### Code generation produces plausible but wrong output

Without awareness of internal service boundaries, naming conventions, or domain language, AI-generated code introduces tight coupling where the organization expects loose contracts. A model asked to build an order-processing handler might produce clean CRUD logic - create the record and update the status. But the team actually uses explicit domain events and bounded contexts: an `OrderPlaced` event triggers downstream inventory and billing services independently. This pattern aligns with broader data on AI code quality: [code churn rose from a 3.3% baseline in 2021 to 7.1% in 2025](https://larridin.com/developer-productivity-hub/developer-productivity-benchmarks-2026), suggesting that AI-generated code is being rewritten at significantly higher rates than human-written code.

The CRUD-style output strips away the intent and workflow logic that experienced engineers encode deliberately. This is where [generative AI for software engineers](https://www.glean.com/blog/generative-ai-for-software-engineers-is-more-than-code-completion) needs to go beyond token prediction: it needs a retrieval layer like Glean's Enterprise Graph that can supply domain models, naming conventions, and architectural patterns before generation begins.

### Code review becomes the new bottleneck

When AI generates code without organizational context, the burden shifts entirely to reviewers. They must mentally reconstruct the missing context the model lacked - whether the approach complies with the team's security posture, uses the mandated shared library, and follows the naming pattern the platform team agreed on last quarter.

According to the State of Code Review 2024 report, average merge time at large companies sits around 13 hours, and much of that wait traces back to reviewers needing to verify organizational fit rather than code correctness. Glean's Personal Graph can reduce this overhead by surfacing relevant team decisions, prior reviews, and related documentation directly in the engineer's workflow.

### Onboarding and knowledge transfer stall

New engineers arrive without institutional memory, and current AI tools share exactly the same blind spots. A junior developer joining a payments team can generate syntactically correct code on day one, but they can't intuit that the team avoids synchronous calls to the fraud-detection service because of a latency incident 18 months ago. Research from [MIT Sloan confirms this pattern](https://mitsloan.mit.edu/ideas-made-to-matter/how-generative-ai-affects-highly-skilled-workers): while junior developers saw AI productivity gains of 27–39%, senior developers gained only 8–13%, precisely because experienced engineers already possess the organizational context that AI lacks.

AI can't fill that gap either - it wasn't in the room, didn't read the postmortem, and doesn't know the unwritten rules. Onboarding remains slow even when code generation is fast, because the knowledge that matters most is organizational, not syntactic.

Glean Assistant can shorten this ramp by giving new engineers cited, permission-aware [context-rich responses](https://www.glean.com/blog/glean-chat-software-engineer-code) drawn from postmortems, incident tickets, and team wikis - surfacing the institutional knowledge that would otherwise take months to absorb through hallway conversations.

## Why software engineers say context matters more than the tools themselves

The real constraint on AI-assisted software development is the absence of reliable, searchable, permission-aware organizational knowledge. Engineers feel this acutely: 87% of developers report faster development cycles with AI tools according to GitHub's 2024 Developer Survey, yet Bain's 2025 Technology Report measured only a 10-15% actual productivity boost. The promise to [double developer productivity](https://www.glean.com/blog/ai-developer-productivity) remains elusive without solving the context problem first.

That perception gap - feeling faster while measurable output barely moves - traces directly to context deficits that tools alone can't close.

A senior developer intuitively knows that a two-year-old ADR about rate-limiting is still the governing document for API gateway decisions. They know because they sat in the meeting, reviewed three proposals, and watched the team reject alternatives for reasons never written down.

Encoding that kind of judgment for hundreds of engineers across distributed teams is a fundamentally different problem than building a faster autocomplete. According to LinearB's research, the average team now uses 4.7 AI tools, but only 1.8 of those integrate with each other - creating information silos even within the AI stack itself.

Organizations with more than 10 SaaS tools and distributed teams experience this most acutely. The knowledge needed to produce correct output is spread across communication tools, documentation platforms, and code repositories - each with its own access model and search limitations.

Glean Search addresses this by unifying retrieval across 100+ enterprise connectors, with permission-aware results scoped to what each engineer is authorized to see - turning fragmented knowledge into a single searchable layer that AI tools can actually use.

## What makes the context problem harder at enterprise scale

Context challenges don't scale linearly with organization size - they compound. A five-person startup keeps context in a shared Slack channel and a few Notion pages.

A 5,000-person engineering organization has context scattered across hundreds of repositories, thousands of documents, and dozens of tools - each with its own access controls, search index, and staleness curve. Building an [enterprise knowledge graph](https://www.glean.com/blog/enterprise-ai-knowledge-graph) that connects these fragmented sources is the foundational challenge.

<table style="min-width: 75px; border-collapse: collapse; border: 1px solid #ccc;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Challenge</th><th colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Why it's harder at scale</th><th colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Impact on AI tool effectiveness</th></tr><tr><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Knowledge fragmentation</td><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Dozens of tools, hundreds of repos, thousands of docs</td><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">AI retrieves incomplete context</td></tr><tr><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Permission complexity</td><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Different teams, different access levels</td><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">AI surfaces wrong info or excludes needed info</td></tr><tr><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Context staleness</td><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Info decays faster in large orgs with frequent refactors and reorgs</td><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">AI suggests outdated patterns</td></tr><tr><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Relevance ranking</td><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">Volume overwhelms simple retrieval</td><td colspan="1" rowspan="1" style="border: 1px solid #ccc; padding: 8px;">AI drowns in noise or misses signals</td></tr></tbody></table>

Permission complexity alone creates a problem most AI tools ignore entirely. An engineer on the infrastructure team and an engineer on the application team need different context for the same question about a shared service. Without permission-aware retrieval, AI either surfaces information the user shouldn't see or excludes relevant context the user is authorized to access but that lives in a tool the AI doesn't connect to.

[Context engineering](https://www.glean.com/blog/context-engineering-ai-the-foundation-of-reliable-high-performing-models) treats context retrieval as a system design problem. Organizations solving context at the platform level - making knowledge retrievable, structured, and permission-aware - report up to 30% efficiency improvements according to Bain's 2025 Technology Report.

Those that treat context as an afterthought plateau at the 10-15% range, no matter how many AI coding tools they deploy. Microsoft research found it takes 11 weeks for users to fully realize gains from AI tools, and much of that ramp-up time is spent building informal context bridges that the tools themselves can't provide.

The Glean Agentic Engine compresses that ramp by connecting retrieval directly to the organizational knowledge graph, so AI actions are grounded in current, authorized information from day one.

## How context-aware systems change the equation for engineering teams

Engineering teams need to move from "hunt and stitch" - manually gathering context from five tools before asking an AI anything - to "ask and act," where the system delivers relevant organizational knowledge alongside the response. The shift toward [integrating generative AI](https://www.glean.com/blog/transforming-the-way-software-engineers-work-by-integrating-generative-ai) into engineering workflows makes this transition increasingly urgent.

This requires more than keyword search. It requires a [knowledge graph](https://www.glean.com/blog/knowledge-graph-agentic-engine) that connects people, content, and interactions so that retrieval reflects relationships and recency, not just keyword matches.

When an engineer asks about the authentication service's rate-limiting behavior, a context-aware system returns the governing ADR, the Slack thread where the team discussed exceptions, the recent incident that prompted a threshold change, and the engineer who owns that service - ranked by relevance, not just keyword match.

Permission awareness is non-negotiable at this layer. Engineering organizations have legitimate reasons for access boundaries: security-sensitive codebases and unreleased product plans among them. A context system that ignores permissions is a liability, while one that respects them becomes a trusted default for the entire engineering org.

[Glean Agents](https://www.glean.com/agents) operate within this permission-aware framework, coordinating across tools and knowledge sources while respecting each user's existing access controls - so the retrieved context is both relevant and authorized.

Context maintenance also has to be continuous, not periodic. In organizations with frequent refactors, team restructures, and evolving architecture, context decays within weeks. This is where [agentic reasoning](https://www.glean.com/blog/agentic-reasoning-modern-work) becomes essential - AI systems that can dynamically re-evaluate and update their contextual understanding as organizations change.

The organizations pulling ahead are the ones that have made their organizational knowledge structured and trustworthy enough for AI to act on - not the ones with the most AI tools.

## Frequently asked questions

### What specific aspects of organizational context hinder software engineers from using AI tools effectively?

Undocumented decisions from meetings and Slack threads, fragmented knowledge across disconnected tools, stale documentation that no longer reflects production reality, and missing permission models that prevent AI from retrieving the right information for the right user. These gaps force engineers to validate AI output manually, eroding the speed gains the tools promise.

### How does the lack of context affect the performance of AI in software development?

AI without organizational context generates plausible but incorrect output - code that ignores internal libraries, violates architectural patterns, or references deprecated APIs. This shifts the bottleneck from writing code to reviewing it, increasing merge times and requiring senior engineers to spend more time on validation than creation.

### What strategies can organizations implement to improve context for AI tool usage?

Connect knowledge sources through a unified, permission-aware retrieval layer rather than relying on individual tool integrations. Establish ownership models for documentation currency. Invest in knowledge graph infrastructure - like Glean's Enterprise Graph - that maps relationships between people, projects, and content, so AI tools can retrieve context that's current, relevant, and authorized.

### Why do software engineers feel that context is a bigger issue than the AI tools themselves?

Because the tools work. Code generation is fast and syntactically correct. The failure mode is contextual, not mechanical: output that doesn't fit the organization's architecture, conventions, or constraints.

### What are the implications of context-related bottlenecks on software project outcomes?

Teams plateau at 10-15% productivity gains instead of the 30%+ that Bain found context-aware organizations achieve. Code review cycles lengthen as reviewers compensate for missing context. Over time, teams adopt AI tools superficially - using them for boilerplate but reverting to manual workflows for anything that requires organizational understanding.

The gap between what AI tools can generate and what your engineering team actually needs comes down to whether the organizational context behind your code is structured and permission-aware. Closing that gap requires platform-level investment in how organizational knowledge is retrieved and governed. [Request a demo](https://www.glean.com/get-a-demo) to explore how Glean and AI can transform your workplace.

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
