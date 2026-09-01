---
url: "https://docs.glean.com/tools/glean/plan-execute"
canonical: "https://docs.glean.com/tools/glean/plan-execute"
title: "Plan and execute steps"
description: "Give an agent step access to supported apps and let Glean plan, choose tools, and complete complex tasks with agentic reasoning."
fetched_at: "2026-09-01T13:30:07.545Z"
---
On this page

Plan & execute steps use agentic reasoning to follow your guidance, decide what to do, choose which apps to use, and respond. Instead of selecting individual tools one by one for this step, you give the step access to supported apps, and Glean uses the relevant capabilities within those apps to complete the task.

## Adaptive planning[​](#adaptive-planning "Direct link to Adaptive planning")

Adaptive Planning performs iterative reasoning for complex tasks. It continuously plans and re-plans as it learns, keeping ideas that hold up and dropping those that don't. This makes it effective for creative and strategic work, tasks requiring nuance and exploration, and finding the right information even when you're not sure how to ask.

The system orchestrates across your enterprise tools and third-party agents, pulling relevant context from calendars, data warehouses, databases, and codebases. It selects the right tools for each job to complete work end-to-end, and the experience is interactive, allowing you to ask follow-up questions and dig deeper as you go.

### Dynamic task delegation[​](#dynamic-task-delegation "Direct link to Dynamic task delegation")

In supported Autonomous Agents, the **Task** tool can extend this planning behavior by breaking a complex request into smaller sub-tasks and delegating them to independent sub-agents. The parent agent receives the results and can use them in follow-up steps or its final response.

This approach is useful for multi-step work and research-heavy requests. The Task tool preserves the agent's permissions and error-handling behavior. Glean enables the capability by default in supported workflows.

### Planning modes[​](#planning-modes "Direct link to Planning modes")

Plan & Execute offers two modes that allow you to optimize for either speed or thoroughness:

**Basic Mode**: Basic Mode uses the same architecture as before and honors your previous model selections, ensuring uninterrupted agent usage as you explore adaptive planning. This mode uses no reasoning.

**Fast Mode**: Tries to answer questions quickly with limited re-planning and less compute allocated toward reasoning. Best for straightforward tasks requiring quick responses. Actions from connected apps (MCP tools) are not available in Fast mode.

**Thinking Mode**: Spends additional time thinking through questions to thoroughly answer them. Adaptive Planning operates at full capacity, reasoning harder, thinking more deeply, and planning/re-planning more frequently. Best for complex tasks requiring deep reasoning capabilities. Supports the full set of tools, including actions from connected apps.

note

Workflow mode agents can use tools in plan and execute steps, but workflow mode agents do not create artifacts. If you need an artifact, use an Auto mode agent instead.

Because this step relies on agentic reasoning, only language models in the "agentic reasoning" class can power this functionality. Available models include:

-   GPT-5
-   Claude Sonnet 4.6

## Building with Plan & Execute[​](#building-with-plan--execute "Direct link to Building with Plan & Execute")

Configure a Plan & Execute step by choosing which connected apps it may use, for example Jira, Slack, Gmail, or Google Docs instead of selecting every tool one by one. Glean picks the right tools inside those apps to complete the task. That keeps setup lighter and matches how you grant access elsewhere such as while using MCP.

note

If you already built agents with specific tools, those agents keep working. Glean migrates them so you do not have to rebuild. Migration preserves your previous scope: we do not automatically add every new tool from an app just because the app is connected.

Existing Plan & Execute agents that already reference individual tools continue to work as-is. Glean migrates the experience without requiring customers to rebuild those agents, and it does not automatically expand the agent to new tools from that app.

If one step used several tools from the same app and any of those tools required confirmation, then every tool from that app in that step still requires confirmation.

The app-level model applies to *Plan & Execute* and *Auto mode agents*. *Static workflow* agents still use explicitly selected steps and tools.
