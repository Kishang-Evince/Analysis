---
url: "https://docs.glean.com/agents/how-agents-work"
canonical: "https://docs.glean.com/agents/how-agents-work"
title: "How agents work"
fetched_at: "2026-09-01T13:29:17.201Z"
---
On this page

Glean Agents are reusable workflows that automate work for you and your teammates. You can discover, launch, and manage these agents from the [Agent Library](https://www.glean.com/agent-library), then open any agent to see how it is built and what it does.

Every agent starts with a **trigger**, followed by a series of **steps**. Each step can perform a tool, make a decision about what to do next, or call another agent. As the agent runs, it builds up memory so later steps can use the results of earlier steps. Supported Autonomous Agents can also use the **Task** tool to delegate parts of a complex request at run time.

The agent follows the following pattern:

1.  Trigger: How the agent starts
2.  Steps: The ordered set of things the agent does
3.  Tools: Concrete tasks the agent performs
4.  Flow: How the agent decides what to do next
5.  Memory: What the agent remembers as it runs

## How to build agents[​](#how-to-build-agents "Direct link to How to build agents")

The [Agent Builder course](https://community.glean.com/home/courses/glean-agent-builder-8o6bl) in Glean Academy is a self-paced, on-demand training that helps builders learn how to design and create Glean agents, from the basics of getting started to more advanced workflows. It covers the core building experience such as setting up agent steps, using natural language or manual configuration, and working with key concepts like branching, looping, read and search, and respond patterns so learners can move from simple agents to more powerful automations.

## Triggers[​](#triggers "Direct link to Triggers")

A *trigger* is an event that starts the agent.

Triggers define *when* the agent runs. For example, an agent might start when:

-   You *run it manually* from the Library or a link.
-   A *scheduled time* is reached such as a daily digest.
-   An external *content or system update* happens.

By configuring triggers, you decide which situations should automatically kick off the agent, so it can work without you manually starting it every time.

For more information on trigger types, see the [Triggers](/agents/concepts/triggers) article.

## Steps[​](#steps "Direct link to Steps")

A *step* is a single unit of work inside an agent.

You define a sequence of steps, and the agent runs them one by one. In each step, the agent can either:

-   Perform an *tool*, for example, search your knowledge base, analyze data, or send a message.
-   Use *flow logic* to choose between multiple possible paths, based on conditions you specify.

You configure steps in the **Agent Builder**, where you can:

-   Add new steps.
-   Reorder them.
-   Define conditions for when each step should run.

## Tools[​](#tools "Direct link to Tools")

An *tool* is the concrete task an agent performs in a step. Typical tools include:

-   *Reading data* (documents, tickets, records, calendars).
-   *Writing to connectors* (updating tickets, logging notes).
-   *Drafting content* (emails, summaries, reports).
-   *Updating documents* or other external systems.

Most agents use multiple tools, chained together across steps, to complete an entire workflow from start to finish.

For a full list of available tools, see the [Tools](/tools/tools-overview) section.

## Flow[​](#flow "Direct link to Flow")

*Flow* determines how the agent moves from one step to the next.

With flow, you can:

-   Add *branches* that choose different paths based on conditions, for example, “if this is a bug report, do X; otherwise, do Y”.
-   Call *sub-agents* to offload part of the work to another agent, then return to the main agent when the sub-agent finishes.

This lets you model complex processes using clear, readable logic instead of one long, rigid script.

For more information, see the [Flow](/agents/concepts/flow) article.

## Dynamic task delegation[​](#dynamic-task-delegation "Direct link to Dynamic task delegation")

Supported Autonomous Agents can use the **Task** tool to break a complex, multi-step request into smaller sub-tasks and delegate them to independent sub-agents. The parent agent uses the results from those sub-agents to continue the work, complete follow-up steps, or prepare the final response. The Task tool preserves the agent's permissions and error-handling behavior.

This is useful when a request requires work across several systems or involves research-heavy analysis. For example, an agent can divide a research request into focused investigations, delegate each investigation, and combine the returned findings into one response.

The delegation happens as part of the agent's work. You don't need to manage each sub-task yourself. Glean enables this capability by default in supported workflows. Builders must configure a supported Autonomous Agent with a step that can delegate work through the Task tool.

For more information about the step that plans and executes work, see [Plan and execute steps](/tools/glean/plan-execute).

## Memory[​](#memory "Direct link to Memory")

As an agent runs, every step adds its outputs into a persistent memory log. Later steps can access this memory to reuse earlier results, make informed decisions based on the full execution history, or pass data to sub-agents. When the Task tool delegates work, the parent agent can use the returned results in later steps.

While all data is stored in memory, you control how much of it is visible to each step through context settings. By default, the system employs a sequential context model where each step inherits only the output of the one immediately preceding it. You can refine this behavior to include all previous outputs or no prior outputs at all. To further optimize performance, use the `[[ ]]` syntax to explicitly reference a specific step’s output or an initial agent input. By combining the "no prior outputs" setting with these targeted references, you can pull exactly what you need from memory without the token overhead of a full history, maintaining precise data continuity and cost efficiency. For more information, see the [Memory](/agents/concepts/memory) article.
