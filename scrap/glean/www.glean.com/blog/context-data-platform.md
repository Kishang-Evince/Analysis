---
url: "https://www.glean.com/blog/context-data-platform"
canonical: "https://www.glean.com/blog/context-data-platform"
title: "Context is the next data platform-and why context graphs are key to understanding processes"
description: "Arvind Jain  | Everyone is suddenly talking about context graphs as AI’s next trillion‑dollar opportunity. At Glean, we’re excited - because it finally has a name."
fetched_at: "2026-09-01T13:26:31.918Z"
---
Last updated Jan 07, 2026.

# Context is the next data platform-and why context graphs are key to understanding processes

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a07483653e8ea8ef7c77930_arvind.png)

Arvind Jain

CEO



](/authors/arvind-jain)

![Context is the next data platform-and why context graphs are key to understanding processes](https://cdn.prod.website-files.com/613513981b0efaf850830620/695dcde7ebbfe37d3d087fd8_ContextGraph-Blog-1-6-26%20\(1\).jpg)

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

Everyone is suddenly talking about context graphs, stemming from the post by Jaya Gupta and Ashu Garg on [AI’s next trillion‑dollar opportunity](https://x.com/JayaGup10/status/2003525933534179480). At Glean, we’re excited - because it finally has a name. Context graphs that understand not just your data, but how your company actually works. 

We’re at a point where nearly everything in the enterprise has been digitized: decisions and structured data are captured in systems of record, while everyday work unfolds across communications tools, project management systems, code repositories, and more. 

Context graphs shed light on how work really gets done in the enterprise, enabling automation. With the rise of agents and their ability to reason and act, there’s a major unlock ahead with automation, but only if that reasoning is grounded in the right enterprise context.

## Context has to evolve as AI advances

Glean was founded with the understanding that great search is the foundation of context. That means understanding content: indexing unstructured data so employees can search across their enterprise and quickly find the most recent and relevant information-like the latest design doc, policy update, or customer note-needed to answer a question or unblock a task.

But as AI has begun to take on more complex work, we’ve learned that this foundation needs to expand. It’s not enough to understand enterprise data alone; systems also need relationship knowledge. How work gets done in an enterprise is fundamentally relationship-driven-knowing who owns an account, who approves a contract, which engineer is on call, or which teams collaborate when an incident escalates. 

RPA and workflow tools have sought to automate the best-understood processes in organizations, but the majority of work is distributed - done by individuals and small teams, with the processes documented only as 'tribal knowledge.'  How do we bring this majority of work into the automation fold, and enable Agents to learn and automate this work? This is where context graphs come to play. 

## Context graphs are really about capturing process reality to automate work

### **Glean’s refinement to context graphs: “You can’t reliably capture the why; you can capture the how.”**  

The *why* is often a thinking step that usually resides in someone’s head- you can’t actually model it. Sometimes it’s hinted at in a meeting transcript or a Slack thread, but much of it never gets written down in a clean or durable way. 

The *how*, on the other hand, leaves a rich digital trail: recurring steps, data updates, approvals, collaboration patterns, changing fields, and cross-system behavior over time. Over many cycles, those process traces approximate the why: you can infer rationales from patterns in how work repeatedly gets done - not from trying to literally store every human thought.

With that in mind, the goal behind context graphs becomes capturing the "how" (the process) now, and to learn the "why" (the intent) over time. If agents are meant to automate real work in the enterprise, the path is modeling processes deeply to both understand the conditions under which work proceeds, pauses, or escalates so the next time a situation presents itself, the agent can figure out the right actions to take.

## Context graphs are a technical investment

Creating this level of knowledge and understanding isn’t easy. Building context graphs is hard:

-   **Observability (via connectors and apps):** Getting a full understanding of what happens in an enterprise requires more than clean, structured decision data from systems of record. It requires observability across the connectors and applications where work actually happens-both the breadth to capture activity across the many tools employees use, and the depth to extract meaningful signals from each connector. For example, a connector to Salesforce may expose a deal stage change, but true observability comes from also seeing activity across connected apps: a document edited in Google Docs, a message sent in Slack, a meeting created in Calendar, or a record updated in Salesforce-each captured directly from the underlying system via its connector.**‍**
-   **Understanding activity data:** Beyond indexing content, systems must capture low-level activity signals: discrete, timestamped actions taken within tools. These include events like a document edit, a field update, a comment added, a Slack message sent, or a file uploaded. Capturing these actions in chronological order-and tracking how state changes between them-provides the raw activity data.**‍**
-   **Deriving higher-level understanding of tasks, projects, and initiatives:** Only after collecting this atomic activity data can systems begin to infer higher-level constructs. Patterns along with semantic understanding across many low-level actions-repeated document edits, coordinated Slack messages, and frequent updates to the same records-can be aggregated to indicate a task, a project, or a broader initiative. For example, a sequence of document creation, edits, Slack messages, and record updates across several days may collectively represent a customer onboarding effort or a product launch, even if that work was never explicitly labeled as such in any single system.

Separating signals from noise is difficult, especially in an enterprise. At Glean, for example, our task understanding reaches ~80% accuracy-an indicator of how strong all the upstream technology needs to be to make this viable. This is made more impressive by the fact that being for the enterprise, context graphs aren’t built at internet scale. Data can’t be aggregated across customers, and the resulting datasets are both smaller and inaccessible to humans due to privacy constraints-requiring the graphs to be inferred algorithmically.

## Context graphs are part of the foundational suite of technologies that form the next data platform

While context graphs are getting the most attention right now, at Glean we know that solving context can’t rely on a single technology. Getting to real process understanding requires a stack of technologies working together: connectors to observe activity across tools, indexes to enable fast retrieval, graphs to model enterprise structure and relationships, and memory to capture what happens when agents actually execute work. This stack is what allows systems to move from raw enterprise data to agents that can act.

As agents begin to operate in the enterprise, learning becomes essential. What works for humans doesn’t always translate directly to agents. By capturing execution traces-how agents use tools, in what sequences, and with what outcomes-systems can learn from agentic work in practice. These traces form enterprise memory, capturing what actually works for agents over time. Process understanding doesn’t come from the context graph alone; it emerges from the combination of structural understanding and learned behavior. 

When you step back and look at all of these layers together-connectors, indexes, graphs, and personal and enterprise memory-you realize you’ve effectively built an entirely new data platform. One designed not for reporting or analytics, but as the backbone of agentic automation: a system that observes how work happens, learns from execution in practice, and enables agents to reliably carry work forward across the enterprise. At Glean, we now have this context platform in place-including the graph-after six years of technical investment.

## Context is foundational to agentic work

The real question behind Jaya and Ashu’s post is how we enable agents to successfully get work done in the enterprise. How can they learn, understand, and operate like your enterprise? If agents are going to take on more work, that opportunity depends on a context foundation, one that understands your enterprise data, your relationships, and your processes. 

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
