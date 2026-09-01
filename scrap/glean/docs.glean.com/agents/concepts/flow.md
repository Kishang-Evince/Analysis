---
url: "https://docs.glean.com/agents/concepts/flow"
canonical: "https://docs.glean.com/agents/concepts/flow"
title: "Flow"
fetched_at: "2026-09-01T13:29:16.387Z"
---
On this page

When building agents, you define the order in which tools happen, and how your agent reacts to different situations along the way. This is called flow.

When you build an agent, you organize its flow by creating a series of steps. These might include collecting data, making decisions, calling Sub-agents, or sending messages. Each step depends on the results from earlier steps, forming a clear sequence. Sometimes, your flow can branch, meaning your agent makes choices and follows different paths based on specific conditions or information.

## Branches[​](#branches "Direct link to Branches")

A branch is a logical path that the agent follows depending on certain criteria. You set up these criteria so the agent knows when to take one path over another. This is similar to using “If/Then” statements in programming: if the condition you specify is met, the agent goes one way; if not, the agent can do something else.

When you build an agent workflow, you add branches to make decisions. For example, you might want your agent to check what kind of request it received, and then act accordingly. You define the possible branches and set the rules the agent uses to decide which branch to take.

The example below shows an HR bot that will need to take different tools depending on what the user requests at the first trigger.

## Sub-agents[​](#sub-agents "Direct link to Sub-agents")

A Sub-agent is a type of agent that you can include as a step within another agent’s workflow. Think of a Sub-agent as a helper agent: instead of having one big agent do every single task, you can break up your automation into smaller pieces. Each Sub-agent focuses on a specific part of the overall process. This makes your workflows easier to manage, update, and reuse in different scenarios.

When building your main agent in Glean, you can add a step that calls a Sub-agent to handle certain tools or decisions. For example, say you have a main agent to help onboard new employees. You could use Sub-agents to take care of just the document collection, scheduling meetings, or summarizing policies. This way, if you need to update how document collection works, you only have to change that Sub-agent, not the whole onboarding workflow.

## How Sub-agents handle memory[​](#how-sub-agents-handle-memory "Direct link to How Sub-agents handle memory")

When you run a Sub-agent, all the outputs and relevant data from its steps are kept in memory, just like with other steps in your main agent. This lets you use the Sub-agent’s results in future steps. Each Sub-agent has access to necessary context, and it returns its outputs to the parent agent when finished. This way, your main agent can reason across everything done so far, including what the Sub-agent accomplished.
