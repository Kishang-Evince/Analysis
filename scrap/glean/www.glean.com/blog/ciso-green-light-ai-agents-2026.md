---
url: "https://www.glean.com/blog/ciso-green-light-ai-agents-2026"
canonical: "https://www.glean.com/blog/ciso-green-light-ai-agents-2026"
title: "How to get your CISO’s green light on AI agents"
description: "Sandy Tang Sunil Agrawal | Learn how Cvent scaled to 6,000 AI agents using the AWARE framework, giving CIOs and CISOs shared criteria to govern agent risk without slowing the business down."
fetched_at: "2026-09-01T13:26:30.732Z"
---
Last updated Jun 11, 2026.

# How to get your CISO’s green light on AI agents

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/69b0f4b762bd5a1a6e70e8b4_Sandy%20\(1\).png)

Sandy Tang

Product Marketing



](/authors/sandy-tang)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/67ac95165f7b0f3e4b901ab2_Sunil%20Agarwal.jpeg)

Sunil Agrawal

Chief Security Officer



](/authors/sunil-agrawal)

![How to get your CISO’s green light on AI agents](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a2af827f71707e6e675c751_CIO_CISO-Greenlight-blogbanner.webp)

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

When Cvent, an events technology company, was looking to roll agents out across their enterprise workflows, they ended up with over 6,000 AI agents in production for their 5,500 employees. While Cvent's CIO saw agents as a transformative force for faster workflows and more automation, enabling teams to do more without headcount growth, the CISO saw it as a window to more exposure. It meant unaudited actions, permissioned access running at machine speed, and data influencing changes across systems without a human in the loop. 

Compromise wasn't the answer to solving this tension, as 'risk is too high' often becomes the default answer with agents never shipping. Instead, it took a shared framework that let both leaders approve. 

In a recent [CXOTalk conversation](https://www.cxotalk.com/episode/ai-agent-governance-inside-the-glean-aware-framework-with-cvents-cio-and-ciso) with Cvent’s CIO Pradeep Mannakkara and CISO Ben Mayrides, they explained what it takes for CIOs and CISOs to work together on agent governance, how they use the [AWARE framework](https://www.glean.com/resources/guides/aware) to create shared decision criteria, and why governance works better when it helps teams move with more clarity.

Here’s the practical takeaway: **if you want your CISO’s green light, don’t show up with AI ambition alone. Show up with a clearer way to evaluate intent, context, guardrails, runtime risk, and observability.**

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a2b42e63ca46f3b8c8f849f_6a2af97a81884b286d9d2d2e_6a2af6d6b83bcf7037797fb4_CIS__CIO_Greenlight-Stats.webp)

## Why agents break the old security playbook

Traditional security architectures were designed for deterministic software. You know what the code does, you can trace the logs, and the access patterns are predictable. AI agents break every one of those assumptions.

Agents reason. They take actions across apps and file systems, and often in sequences that no human has predefined. Your existing IAM controls weren’t built for an actor that decides, mid-task, to query a database and then write back to a Slack channel. Your observability tooling wasn’t designed to trace a chain of decisions made in natural language.

This is why the CISO’s instinct to say no isn’t irrational, especially given the tools they have. The real problem is that security teams lack the right framework to evaluate agents systematically. Mayrides argues enterprises need purpose-built technical governance for agents, not just broad organizational frameworks. He points out that frameworks like the EU AI Act and the NIST Risk Management Framework are useful, but they don’t go deep enough into the technical controls required to govern agentic systems in practice.

Without shared criteria, “risk is too high” is the only defensible answer. Mayrides put it plainly: **“Risk is too high is never the final answer. It’s only ever ‘risk is too high *for now*.’”** The goal is building the criteria to move from now to approval.

## The AWARE framework: a shared language for CIOs and CISOs

One of the clearest ideas in the CXOTalk conversation is that security and IT move faster when they replace gut-feel objections with shared evaluation criteria.

Mayrides describes the value of having an evaluation framework agreed in advance. Instead of a CISO saying, “I just don’t like it,” the organization can evaluate each proposal against the same bar every time. That removes ambiguity, makes tradeoffs more concrete, and gets security out of the role of abstract gatekeeper and into the role of partner in a business decision.

That’s also where the AWARE framework, developed by Glean’s Work AI Institute with Databricks and Palo Alto Networks’ Unit 42, becomes useful. In the conversation, Cvent describes using it as a way to break down agent risk into practical dimensions rather than debating AI in the abstract.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a2b42e73ca46f3b8c8f84b2_6a2af97a81884b286d9d2d32_6a2af6fd698ed3182ee432e0_CISO_CIO-AWARE.webp)

## What CIOs and CISOs each want and where they meet

The CIO is usually trying to unlock value quickly. The CISO is trying to make sure that speed doesn’t create exposure.

These priorities are different, but they are not opposed. The overlap is a structured risk process that helps the business answer three things clearly:  

-   What can move forward now
-   What needs guardrails first
-   What is too risky now, and why

That’s what CISO buy-in actually looks like in practice: not a blanket yes or no, but a repeatable way to separate safe acceleration from unnecessary risk.

## How Cvent’s rollout had security buy-in

Cvent’s approach inverted the typical enterprise sequence. Rather than waiting until governance was airtight before allowing any agent deployment, they deliberately encouraged broad creation early to build AI fluency across the organization, while putting the foundational security controls in place to experiment safely. The 6,000 agents didn’t happen despite their governance program; it was the result of building both together from the start.

“

> We needed people to understand what agents can and can't do before we could write good rules about them. You can't govern what your organization doesn't understand yet.

- Pradeep Mannakkara, CIO, Cvent

The second key move: introducing ROI gates. New agent projects now pass through a value-creation filter before they reach security review. Does this agent have a measurable business case? If not, it doesn’t proceed – which means the CISO’s team is only ever reviewing requests that the business has already validated as worth pursuing with organizational investment in making it work. The CISO becomes a partner in getting real projects across the finish line, not a gatekeeper standing between the business and its ideas.

The third element is a sandbox-first deployment model. Agents prove themselves in isolated environments with no access to customer data or production systems. Only after passing that evaluation do they graduate to production with a defined scope, permissions, and observable behavior.

In the conversation, Mannakkara explains that Cvent looked for a paved road: technologies with built-in controls that let employees move quickly within a trusted environment. He points to Glean as a prime example of this approach; by integrating it across tools like email, Slack, Box, and Salesforce, Cvent gave employees a way to experiment and work across their tech stack with fine-grained security controls already in place. This reduced pressure on IT to custom-build every request while keeping work inside boundaries that security had already approved, and effectively accelerated their AI enablement journey by around 9 months.

That’s an important lesson for enterprise leaders. Sometimes, the path to security approval is not waiting until governance is perfect. It’s giving users a safer runway, instrumenting the environment, and then tightening controls as adoption moves from literacy to production.

## The path forward

The most important lesson from the discussion was that the green light does not come from eliminating all risk. It comes from having a shared language to make agent risk legible, governable, and easier to act on together.

The AWARE framework gives CIOs and CISOs a common structure for discussing agent behavior, risk, and control. It points toward a more useful model for enterprise AI: one where speed and governance are not opposites, because guardrails are part of how the system is designed from the start.

Getting a CISO’s approval on AI agents is about showing that you can answer the questions that matter: who is acting, what context they’re acting in, what keeps them in scope, what happens when risk spikes, and whether you can trace what they did afterward.

That’s a better conversation for security and a better foundation for enterprise AI.

## Ready to bring your CISO into the conversation?

Download the complete AWARE framework guide, or see how Glean Protect maps to each pillar in our Security Showcase.

[Get the AWARE framework](/resources/guides/aware) [Watch the Security Showcase](/security-showcase)

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

[Get The Resource](#)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
