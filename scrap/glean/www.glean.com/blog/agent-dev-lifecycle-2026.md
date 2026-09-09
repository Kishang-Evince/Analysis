---
url: "https://www.glean.com/blog/agent-dev-lifecycle-2026"
canonical: "https://www.glean.com/blog/agent-dev-lifecycle-2026"
title: "Enable every agent to drive ROI with a robust agent development lifecycle"
description: "Arvind Jain  | Discover how to build, govern, and scale enterprise AI agents like software with Glean's Agent Development Lifecycle (ADLC) and new Work AI platform features."
fetched_at: "2026-09-01T13:26:24.428Z"
---
Last updated May 12, 2026.

# Enable every agent to drive ROI with a robust agent development lifecycle

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a07483653e8ea8ef7c77930_arvind.png)

Arvind Jain

CEO



](/authors/arvind-jain)

![Enable every agent to drive ROI with a robust agent development lifecycle](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a0306718df418cadea000e3_e9621541-7b7f-4aa6-bff9-ee208611f15b.webp)

Listen to article

0:00

0.5x 1x 1.5x 2x

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

Listen to article

0:00

0.5x 1x 1.5x 2x

Most CIOs have already integrated agents into productivity suites, are running in individual business units, and are enabling teams to stitch together customized agents. Yet, when asked about the total ROI of these initiatives, most CIOs are still figuring out the numbers. Many teams are also building siloed, brittle agents with no coherent strategy stringing them together, making them difficult to govern and resulting in AI sprawl.  

Instead, CIOs should treat agents like software. Like other software systems, agents depend on context, tools, permissions, workflows, runtime safeguards, and ongoing oversight. To drive enterprise value, agents should be well-designed, tested, rolled out carefully, monitored in production, and improved over time in the same way that engineering teams deliver other types of enterprise-grade software.  

Enterprises that implement agents using a model that mirrors the software development lifecycle gain three things they do not get from ad‑hoc AI pilots alone:

-   A shared way to talk about agents across functions.
-   A repeatable pattern that defines ROI for each agent and for the portfolio as a whole.
-   A clear view of risk and ownership at every step.

ADLC has been a critical factor in helping our customers like [Zillow](https://www.glean.com/resources/customer-stories/zillow), [Ericsson](https://www.glean.com/resources/customer-stories/ericsson), and [Motive](https://www.glean.com/resources/customer-stories/motive) scale agent adoption, with millions of agent runs per week. ADLC has also enabled us at Glean to create meaningful results for our own teams: a single agent deployed within Glean’s engineering team reclaimed 17,000+ engineering hours per year and more than $1.7M in ROI.

Based on these results, it’s clear that the Agent Development Lifecycle is not another framework for experimenting with agents, but rather a disciplined way to build agents that generate clear business value.

And now, we are building the ADLC directly into Glean’s Work AI platform.  

## **Introducing the Agent Development Lifecycle**

When you talk to teams whose agent projects have stalled, you rarely hear “the model wasn’t smart enough.” You hear statements like the agent didn’t have the right context, the integrations are brittle and continually have to be rebuilt across agents, or no one knows what success looks like post-launch.

Each of these pain points speaks to the lack of an operating model. Every function and vendor ends up reinventing a mini software development lifecycle for agents, with its own language, metrics, and standards. That makes it very hard to compare agents, govern them, or decide which ones deserve more investment.

The Enterprise ADLC provides a single lifecycle that every agent builder can follow. For a simple, low-risk workflow, teams may move through these steps in minutes or hours; for a business-critical agent, they may take days or even a few weeks to execute. But, the discipline to follow the ADLC matters either way. Let’s dig in.

**Opportunity** – Start by spelling out the business problem the agent is intended to solve. Use plain language: who is affected today, how work happens without the agent, and what tangible change you expect if the agent succeeds. This anchors everything that follows to outcomes the business already cares about, not just an interesting demo.

**Design** – Describe what the agent is actually responsible for. Define the unit of work (a ticket, an incident, a call, a workflow), when it should run, what information it needs, and what it should produce every time. Be explicit about what’s in scope, what’s out of scope, and which assumptions need to be tested early.

**Performance** – Turn that intent into a small, concrete set of success metrics: the business KPIs you expect to move, plus agent‑centric quality and safety signals. Agree on baselines and target ranges, and decide up front what would cause you to expand, pause, or roll back the agent.

**Context** – Identify the minimum set of permission‑aware data sources, tools, examples, and feedback signals the agent needs to do its job and to be evaluated fairly. This includes which systems it can read from, which actions it is allowed to take, and what telemetry you will use to understand how it’s performing.

**Develop** – Turn the design into a reliable agent. Choose the right execution model (for example, a structured workflow versus more flexible auto‑mode), then test against golden examples, run it in parallel with the existing process, and pilot with design partners until the agent behaves predictably-not just on a hand‑picked demo set.

**Launch** – Treat rollout as a change‑management exercise, not a switch flip. Decide who will see the agent first, how it will show up in their workflow, what training and communication they need, and which guardrails, SLOs, and kill switches must be in place before you broaden access.

**Monitor & Improve** – Operate the agent like any other critical system. Use dashboards, alerts, and runbooks to track impact and quality over time, handle incidents, and feed real‑world signals-user feedback, overrides, drift in key metrics-back into earlier stages of the lifecycle so the agent keeps improving.

This step is not a one-time stage but is actually an ongoing process as agents are maintained, monitored, upgraded, and eventually sunset as business needs change.  

## **New capabilities for Glean agents unlock the ADLC**

We’ve focused our product investments around the major stages of the ADLC: designing the right agents, activating your enterprise context with full control, rolling out agents with confidence, and operating them as a portfolio.

Here’s what’s new:

-   **Auto‑mode agents are now generally available:** Describe what you want an agent to accomplish, and auto-mode agents handle the rest by planning, reasoning, and acting across your enterprise graph, within the guardrails and managed actions your organization controls. No predefined workflow. No manual configuration. It's a fundamentally faster path from intent to something you can test and iterate on immediately. This is the most significant release we've shipped for agent builders to date.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a023e14f66cc6a2373dc545_38af6bed.png)

-   **Debug and trace views:** Agents fail in ways that aren't always obvious. When something goes wrong mid-run, you need to see exactly what happened, not just the final output. The debug view surfaces every step: the inputs, the tool calls, and the decisions that produced each outcome. That kind of visibility closes the loop between "something went wrong" and "here's what to change."
-   **Sub-agents:** Rather than build one monolithic agent to handle every aspect of a process, teams can now build reusable sub-agents that can be invoked when needed. This allows agents to operate like how the best engineering teams build systems: modular, testable, and governed at every layer.
-   **Agent sandbox:** Agent sandbox is now available for agents. This powerful feature gives each autonomous agent a secure, private runtime environment: a file system for organizing and retrieving intermediate outputs across a long-running task, like analyzing large batches of Gong calls, and a code interpreter for computation that goes beyond what language model reasoning alone can handle reliably.

To learn more about agent sandbox, [check out this blog post](https://www.glean.com/blog/agent-sandbox-2026).

-   **Agent library:** As the number of agents in your organization grows, discoverability becomes a real problem. The agent library gives administrators control over which agents are visible to whom, how they're described, and how they're categorized. This ensures the right agents reach the right people, and the catalog doesn't become noise. Verification and curation controls mean that what's surfaced to employees reflects a deliberate decision, not just whatever got published most recently.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a023e14f66cc6a2373dc548_f92b296b.png)

-   **Agent access policies:** Now, admins can declare organization-wide guardrails that all agents have to follow, like preventing interns from writing to any system of record using agents. This provides enterprises with peace of mind and ensures that all of your agents are under control.
-   **Agent insights:** New insights surfaces give you a view into which agents are trending, which are rarely used, where users are giving negative feedback, and how behavior is changing over time. Feedback mechanisms inside agents let builders collect structured signals to drive iteration.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a023e14f66cc6a2373dc54b_cfa89873.png)

The next wave of enterprise AI won’t be won by the teams with the most agent demos. It will be won by the teams that can turn promising ideas into repeatable, measurable outcomes which is what the Agent Development Lifecycle is designed to provide. It gives teams a practical model for deciding what to build, grounding agents in the right context, and improving them based on real-world performance.

Our new Agent features reflect a broader shift in how enterprises need to approach agents: as systems that must be designed, governed, and improved over time.

Because in the enterprise, success won’t come from shipping the most agents. It will come from building agents that are trustworthy, governable, and genuinely useful-the kind organizations can improve over time and scale with confidence.

‍

## **Ready to go inside the ADLC?**

We have captured these ideas-and many detailed examples-in our new eBook, ***The CIO’s Guide to Enterprise AI Agents***, which introduces the ADLC, walks through concrete agent examples across Support, Sales, and Engineering, and shows how to measure ROI in a way your CFO will trust.

{{richtext-banner-component}}

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

![The CIO’s guide to enterprise AI agents](https://cdn.prod.website-files.com/613513981b0efaf850830620/69fcd879e1a13d819ee57eb4_ad5921f2-a2dd-4949-bc23-0718ef1d01bb.webp)

## The CIO’s guide to enterprise AI agents

Discover how CIOs can turn AI agents into real ROI. Learn the Enterprise Agent Development Lifecycle to build, measure, and scale high-value AI across your business.

[Get The Resource](/resources/guides/cio-enterprise-ai-agents)

![The CIO’s guide to enterprise AI agents](https://cdn.prod.website-files.com/613513981b0efaf850830620/69fcd879e1a13d819ee57eb4_ad5921f2-a2dd-4949-bc23-0718ef1d01bb.webp)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
