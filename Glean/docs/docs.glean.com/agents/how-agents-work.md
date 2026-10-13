---
url: "https://docs.glean.com/agents/how-agents-work"
canonical: "https://docs.glean.com/agents/how-agents-work"
title: "How agents work"
description: "Learn how Glean Agents use triggers, tools, steps, and flow logic to automate complex tasks across Auto mode and Workflow mode."
fetched_at: "2026-10-13T08:49:37.282Z"
---
On this page

Glean Agents are reusable AI solutions that use instructions, knowledge, tools, and context to complete tasks for you and your team. Discover, launch, and manage agents from the [Agent Library](https://www.glean.com/agent-library), then open any agent to review its features.

Build agents using two available modes:

-   Auto mode: The default starting experience for most use cases. Describe the desired outcome in natural language, then review, refine, and test the draft in [Builder Assistant](/agents/auto-mode-agent).
-   Workflow mode: Best for fixed, repeatable processes that require explicit control over each step, branch, and hand-off. See [Create your first Workflow agent](/agents/create-agents/create-your-first-agent).

Agents combine these core building blocks:

1.  Goal and instructions: Target outcomes and behavioral rules
2.  Knowledge and context: Information available to the agent
3.  Tools and actions: Tasks the agent performs
4.  Execution: Process execution through Auto mode or Workflow mode
5.  Output and memory: Results produced and context retained during a run

Use [Auto mode](#auto-mode-task-patterns) for open-ended tasks such as research, analysis, summarization, and drafting. Use Workflow mode for fixed sequences requiring controlled logic.

For workflows that must continue without an active user session, use an [Independent Agent](/agents/independent-agents). Independent Agents add a system profile, supported channel presence, and admin-managed credentials to standard building blocks.

## How to build agents[​](#how-to-build-agents "Direct link to How to build agents")

The [Agent Builder course](https://community.glean.com/home/courses/glean-agent-builder-8o6bl) in Glean Academy provides self-paced training to design and create agents. For most use cases, open [Create agents with Auto mode](/agents/auto-mode-agent), describe the desired outcome in Builder Assistant, and refine the generated draft.

To enforce step-by-step control, create a [Workflow mode agent](/agents/create-agents/create-your-first-agent). Workflow mode supports manually configured steps, branches, loops, and hand-offs between tools.

### Auto mode task patterns[​](#auto-mode-task-patterns "Direct link to Auto mode task patterns")

Auto mode suits tasks where the agent determines the execution path. Common patterns include:

-   Research: Gather and compare information from multiple sources.
-   Analysis: Examine data and identify findings or recommendations.
-   Summarization: Condense documents, conversations, or other inputs into a summary.
-   Drafting: Create emails, reports, responses, or other text outputs from available context.

For reliable results, describe the goal clearly, provide necessary knowledge and tools, and test the draft before publishing. Switch to Workflow mode when tasks require predictable sequences.

## Core capabilities across agent modes[​](#core-capabilities-across-agent-modes "Direct link to Core capabilities across agent modes")

Both Auto mode and Workflow mode agents rely on common operational components: *triggers* determine when an agent runs, while *tools* determine what actions an agent can take.

### Triggers[​](#triggers "Direct link to Triggers")

A *trigger* is an event that starts an agent run.

Triggers define execution timing. Agents start through several events:

-   Manual initiation from the Library or a direct link
-   Reaching a scheduled time, such as a daily digest
-   Receiving external content or system updates

Triggers are optional. Configuring a trigger enables automatic execution without manual intervention. Feature support varies between Auto mode and Workflow mode.

For details, see [Triggers](/agents/concepts/triggers).

### Tools[​](#tools "Direct link to Tools")

A *tool* is a concrete task an agent executes. Tools function in both agent modes: assign tools to individual steps in Workflow mode, or let the agent select tools dynamically based on the target outcome in Auto mode. Common tools perform these actions:

-   Read data from documents, tickets, records, or calendars
-   Write to connectors to update tickets or log notes
-   Draft emails, summaries, or reports
-   Update external documents and systems

For a complete list, see [Tools](/administration/tools).

## Building Workflow mode agents: steps vs. flow[​](#building-workflow-mode-agents-steps-vs-flow "Direct link to Building Workflow mode agents: steps vs. flow")

Workflow mode structures tasks using *steps* for specific actions and *flow* for routing logic between those steps.

### Steps: individual units of work[​](#steps-individual-units-of-work "Direct link to Steps: individual units of work")

A *step* is a single unit of work inside a Workflow mode agent.

Set up a sequence of steps for the agent to execute. In each step, the agent performs one of these functions:

-   Runs a *tool* to search a knowledge base, analyze data, or send a message.
-   Applies *flow logic* to select execution paths based on specified conditions.

Configure steps in agent builder to:

-   Add new steps
-   Reorder execution sequence
-   Define conditional rules for each step

### Flow: step routing and logic[​](#flow-step-routing-and-logic "Direct link to Flow: step routing and logic")

In Workflow mode, *flow* controls how the agent navigates from one step to the next. While steps define the individual tasks, flow defines the direction and connections between those tasks.

Flow configuration supports these structures:

-   Add *branches* that select paths based on conditions, for example, if a request contains a bug report, execute Path A; otherwise, execute Path B.
-   Call *sub-agents* to delegate tasks, then return to the main flow upon completion.

These options help build complex logic without writing long code scripts.

For details, see [Flow](/agents/concepts/flow).

## Dynamic task delegation[​](#dynamic-task-delegation "Direct link to Dynamic task delegation")

Auto mode agents can use the *Task* tool to split complex requests into sub-tasks and delegate them to independent sub-agents. The primary agent uses responses from sub-agents to complete follow-up steps or generate final output. The Task tool maintains agent permissions and error handling routines.

Use delegation when requests involve research across multiple systems. For example, an agent can divide a research topic into focused sub-queries, delegate each task, and consolidate findings into a single response.

The system handles delegation automatically during task execution. Glean enables this feature by default for supported Auto mode agents. Builders configure agents to route work using the Task tool.

For details on step execution, see [Plan and execute steps](/tools/glean/plan-execute).

## Memory[​](#memory "Direct link to Memory")

In Workflow mode, each step saves output to working memory. Subsequent steps access memory to reuse results, make decisions, or pass data to sub-agents. When delegating tasks through the Task tool, primary agents access sub-agent results in downstream steps.

Manage memory visibility across steps using context settings. By default, steps use a sequential context model where each step receives output only from the immediately preceding step. Adjust settings to include all prior outputs or no prior outputs.

To optimize performance and reduce token usage, use `[[ ]]` syntax to reference specific step outputs or initial user inputs directly. Combining the "no prior outputs" setting with direct references passes exact data without loading full execution history.

For details, see [Memory](/agents/concepts/memory).
