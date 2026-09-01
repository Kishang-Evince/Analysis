---
url: "https://www.glean.com/blog/harness-context-manager"
canonical: "https://www.glean.com/blog/harness-context-manager"
title: "The harness as the context manager"
description: "Nikhil Mandava Ayushi Mrigen | Harnesses are being leveraged as distributed context management systems for agents and are continuously evolving to keep pace with the scaling demands of AI."
fetched_at: "2026-09-01T13:26:42.222Z"
---
Last updated Apr 29, 2026.

# The harness as the context manager

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/620e86b206d0ccac81e58f9f_Nikhil.png)

Nikhil Mandava

Engineering



](/authors/nikhil-mandava)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6462f2e79401364b82dca8bf_TGLEMJFFG-U03E273NP8R-88c93dfd4003-512.png)

Ayushi Mrigen

Engineering



](/authors/ayushi-mrigen)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/63ee2d63b34d7f2e4c76aa72_chau-tran.png)

Chau Tran

Engineering



](/authors/chau-tran)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/698b49499603e9054f4c9c07_abhi-samantapudi.jpeg)

Abhilash Samantapudi

Product Manager



](/authors/abhilash-samantapudi)

![The harness as the context manager](https://cdn.prod.website-files.com/613513981b0efaf850830620/69f1e031fc9c9f53cf1e9f7a_WorkingAI_HarnessCover.webp)

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

Contextless AI wastes tokens

Learn how context, model routing, and execution design shape the cost and performance of enterprise AI.

Get the whitepaper



](/resources/guides/token-economy-enterprise-ai)

Share this article:

Listen to article

0:00

0.5x 1x 1.5x 2x

Harnesses, the execution logic that surrounds models, are producing gains in long-running agent performance across the industry. LangChain improved [Terminal-Bench](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering) by +13.7 points through harness changes alone that held the model constant. Vercel cut [80% of its agent's tools](https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools) and saw higher reliability at 3.5x lower latency. In these cases, the performance delta came from the harness, not the model.

We are in a period of rapid harness iteration driven by a shift in what agents are expected to do. Teams are pushing agents into longer-running, multi-step work and finding that first-generation architectures degrade fast. The common pattern of a single system prompt (often 20K+ tokens of conditional instructions) with 20 to 40 tool schemas injected upfront does not hold up. At Glean, we reduced our own system prompt by 45%+ by moving instructions into skills that load progressively instead. The difference shows up fast on tasks like filling in a 200-question RFP, where each question requires independent multi-source research, and compiled answers need to be validated and written back into a spreadsheet.

There is a perception that harnesses are changing as models become more capable. That is not the only driver. Harnesses are being rebuilt because we are giving agents more work, which requires more context. Every additional tool call, skill invocation, search result, and execution output adds to the context window. This is a problem we know well at Glean. Our roots are in enterprise search, where the core challenge has always been narrowing a vast information space down to the precise context needed to get the job done accurately. Similarly, as the volume and variety of work flowing through an agent increases, context management becomes the central engineering problem. The harness is, at its core, a distributed context management system.

At Glean, perfecting our harness is an ongoing pursuit. Now on our third iteration, each rebuild reflects new shifts in model capabilities, technology, and how AI is used across the enterprise. This post covers four changes in harness design:

-   **Programmatic tool calling (PTC) in sandboxes** moves workflow logic into sandboxed code, keeping intermediate state in variables and files rather than in the prompt.
-   **Sub-agents** decompose a single agent loop into isolated execution contexts, each with its own context window.
-   **Compaction** preserves the load-bearing conversation state while moving raw intermediate outputs into file systems.
-   **Search-first discovery of skills** decouples tool and skill discovery from schema hydration, fetching full definitions only at execution time.

In this blog, we’ll walk through each of these changes and how our harness has evolved over time to better scale context. 

## Code as the main execution primitive

Code is becoming the main execution primitive for agents. As work gets more complex, agents need to iterate through result sets, branch on conditions, filter and join data, rank evidence, batch operations, and parallelize independent steps. Code expresses that logic more naturally than a series of conversational tool calls where the model re-derives its plan from chat history on every turn.

Glean uses PTC to move this workflow logic into a sandboxed execution environment. Tools are exposed as Python-callable functions, so the model writes a small program that retrieves, filters, branches, loops, writes to disk, and takes action in one execution rather than across dozens of conversational turns. 20 tool calls can happen inside one sandbox run, and the orchestrator sees only the summary and structured metadata that come back. Intermediate data stays in Python variables and files.

With PTC embedded into the right harness, we were able to realize the following gains: 

-   **Latency.** Independent operations can be batched and parallelized inside a single code run rather than serialized across LLM round-trips.
-   **Reliability.** Loops, filters, joins, and conditional branching are more robust in code than in a fragile chain of chat turns where the model reconstructs its plan from conversation history on every step. This also makes it easier for the agent to recover from errors, as it has stack traces it can inspect. 
-   **Consistency.** Scripts can be saved as skills, making it easier to do the same sequence of tool calls for common tasks at both the enterprise and personal level. 
-   **Context efficiency at scale.** Only the summary or final outputs return to the orchestrator, not every intermediate artifact. This means that larger analyses, bulk operations, and long-running tasks that need to paginate, store, compute, and revisit state become feasible because the agent has program scope and a filesystem outside the context window.

## Subagents as context isolation boundaries

Sub-agents are not new to Glean’s harness, but PTC expanded their scale and reliability. The orchestrator agent can write code to programmatically launch parallel subagents. 

Sub-agents become especially powerful when the orchestrator agent needs to apply the same level of analysis across a large collection of independent items, such as researching hundreds of customers or analyzing thousands of support tickets. In these cases, each sub-agent can execute independently on its own task with its own context window and token budget, while the orchestrator agent supplies the shared instructions for how to perform the work through a prompt template or programmatic task definition. With sub-agents the depth of analysis improves as each one can focus its attention on the context and the job to be done without distraction. 

This pattern lets the system scale out repeatable reasoning without overloading a single context window, and it echoes ideas from [Recursive Language Models](https://arxiv.org/abs/2512.24601v1) where higher-level agents decompose work and delegate bounded tasks to lower-level workers. 

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/69f1e00eec23eb507b5c0369_WorkingAI_Blog1.webp)

*When it comes to multi-agent work, the orchestrator agent distributes tasks to sub-agents which work independently and in parallel with their own isolated context. As the sub-agents complete their work, they hand off the results back to the orchestrator which aggregates the response. All agents can make use of the Enterprise Graph, skills index, sandbox, and model hub to complete work.*

## Compaction strategies to preserve the working state

While subagents help distribute work across many independent tasks, keeping parallel lines of reasoning isolated and manageable, they do not address how context builds up over time within a single agent. In Glean, we saw about ~5% of queries hit context window limits. 

To solve this, we designed a compaction approach that preserves the parts of conversation state that are load-bearing for continued execution: user intent, decisions made so far, approaches that failed, planned next steps, and recent high-signal tool outputs. Everything else is either summarized or moved out of the context window into the filesystem. The goal is a compressed but semantically complete representation of the task state that lets the agent pick up where it left off after many turns.

There are two technical layers to how this works in practice:

-   The first is **conversation compaction**. We condense the raw back and forth of earlier turns with what the user asked for, what the agent has tried, what worked, what did not, and what it plans to do next.
-   The second is **tool-output compaction**. Large tool outputs are written to files in the sandbox filesystem and reduced to summaries with file paths

Compaction and sub-agents reinforce each other. Sub-agents reduce how much irrelevant detail the orchestrator ever sees by keeping intermediate work inside isolated contexts. Compaction handles what remains in the orchestrator's own history, preserving task coherence across time. One manages context spatially, the other temporally.

## Search-first discovery for skills

Skills are emerging as an open standard for packaging reusable expertise. There are benefits to this approach, including progressive disclosure where the agent preloads the skill's name and description, then fetches the full payload only when the task actually requires it. 

We found that progressive disclosure alone, however, does not go far enough at enterprise scale. It is not feasible for an agent to browse hundreds of tools or skills as even one-line descriptions per item add up and create noise the agent has to reason through on requests where most of those capabilities are irrelevant. That’s why we introduce an index over all skills and only load relevant ones into context. 

Discovery in Glean is a three-phased approach: 

-   **Search the index.** The model recognizes it needs a capability and queries the index. Our skill search is more powerful than semantic search alone, since we leverage enterprise graph signals to rank based on creator, usage, and more. The aim is to find the right skill even in scenarios where multiple individuals create and share similar skills.
-   **See the short list & lightweight descriptions.** The index returns a short list of candidates with names, descriptions, and execution hints. This is the first time the model sees any detail about these capabilities. It can then select from this targeted list to complete its task.
-   **Hydrate the full schema at execution time.** Only when the model commits to executing a specific skill does the full schema or [skill.md](http://skill.md) file enter context. 

With Glean, the agent never pays the context tax of browsing the full capability surface. Descriptions appear only for capabilities the model has actively searched for. Full schemas appear only for the one it is about to execute. Each layer of detail is disclosed at the moment the agent needs it. The agent makes better selections because it is reasoning over a targeted short list rather than scanning hundreds of entries, allowing the harness to scale to a large capability surface.

## Harnesses distribute context management

Glean’s harness is getting better at scaling and managing context, because it's more distributed: programmatic tool calling allows for complex execution logic, sub-agents isolate context, compaction preserves task state while offloading context, and skill discovery keeps agents focused on the task at hand. 

The harness never stops evolving. Each new generation of AI at work exposes the limits of what came before, and our harness evolves with it, expanding to meet the growing demands of agents and the context required for reliable results at enterprise scale. Want to bring a reliable context management system to your agents? Book a Glean [demo](https://www.glean.com/get-a-demo) today.

‍

**Authors:** [Nikhil Mandava](https://www.linkedin.com/in/nikmandava/), [Ayushi Mrigen](https://www.linkedin.com/in/ayushimrigen/)**,** [Chau Tran](https://www.linkedin.com/in/chau-tran-ba9a5727/)**,** [Abhi Samantapudi](https://www.linkedin.com/in/abhilash-samantapudi/)**,** [Julie Mills](https://www.linkedin.com/in/julie-mills/), [Matt Ding](https://www.linkedin.com/in/mattding/)

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
