---
url: "https://www.glean.com/blog/mcp-mar-drop-2026"
canonical: "https://www.glean.com/blog/mcp-mar-drop-2026"
title: "Introducing MCP in Glean: From connectivity to enterprise-ready actions"
description: "Roshan Dheram  | Learn how Glean brings MCP to the enterprise with better tool quality, smarter agent orchestration, and built-in security controls for safe AI actions."
fetched_at: "2026-09-01T13:26:48.486Z"
---
Last updated Mar 10, 2026.

# Introducing MCP in Glean: From connectivity to enterprise-ready actions

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6995ce317e5c62105fff07bc_Roshan%20Dheram.jpg)

Roshan Dheram

Product Manager



](/authors/roshan-dheram)

![Introducing MCP in Glean: From connectivity to enterprise-ready actions](https://cdn.prod.website-files.com/613513981b0efaf850830620/69b03c44ee1d0415ef3184b8_mcp_assistant_and_agents.webp)

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

The Model Context Protocol (MCP) is emerging as the standard for connecting AI models to the systems where work actually happens. It allows AI to interact with tools across the enterprise, project management systems, collaboration platforms, data warehouses, developer tools, and many others, so agents can move beyond answering questions to actually taking actions.

At Glean, we adopted MCP early, and already operate a remote MCP server that exposes Glean’s enterprise context inside AI chats and IDEs. Now, we’re bringing the broader MCP tools ecosystem into Glean Assistant and Agents, expanding the available action space. Glean makes it easy to get started with MCP through its directory, which features 17 preloaded servers from Amplitude, Asana, Atlassian Rovo, Box, Canva, ClickUp, GitHub, HubSpot, Intercom, Linear, Lucid, Monday, Notion, PagerDuty, ThoughtSpot, Udemy, and WisdomAI, while also supporting any compatible remote MCP server.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/69af61a57930c362bd93b21b_Blog%20Asset.png)

But once AI can talk to a tool, the real work begins. MCP streamlines connectivity, but it does not guarantee the quality of the underlying tools or their safe operation in an enterprise environment. Organizations still need to solve two critical problems: ensuring agents reliably take the right action at the right time, and participating in an open ecosystem without compromising security.

At Glean, we have been tackling these challenges for years. We have built one of the deepest enterprise context layers available, with native support for 100+ connectors and actions. From that experience, we know that context quality matters: if AI cannot find the right data, it hallucinates; if it cannot execute the right action, it risks destructive writes. As MCP expands the reach of agents into enterprise systems, those actions must be carefully governed so they remain in scope, authorized, and secure.

## MCP solves connectivity, but outcomes depend on tool quality and agent orchestration 

MCP makes it easier to connect agents to enterprise systems, but it does not guarantee that the tools on the other side are high quality. That’s why we treat MCP as only the starting point. To make MCP tools enterprise-ready, we apply the same quality and reliability techniques we use for native actions in Glean, so agents can use them correctly.

### Scaling to thousands of actions with tool search 

When organizations adopt MCP broadly, the number of available tools can quickly grow into the hundreds or thousands. If all of those tools are presented directly to the model, they consume valuable context window space and make it harder for the agent to identify the right action.

Glean solves this with tool search. Instead of reasoning over all the tools available, agents retrieve a small, targeted subset of candidate tools that are most relevant to the request. This allows the model to operate over a focused set of actions while keeping the broader ecosystem available.

By narrowing the action space, tool search improves both accuracy and efficiency.

### **Learning and improving actions through enterprise memory** 

Knowing which tool to use is only part of the problem. Agents must also learn how to use tools effectively. Glean captures agent execution traces, recording which actions were called, in what order, with which arguments, and what outcomes those calls produced. Over time, the platform learns which action sequences consistently succeed for specific types of tasks.

At runtime, these successful patterns are retrieved from enterprise memory and surfaced to the agent as natural-language guidance. This allows the AI to reuse proven sequences rather than rediscovering them from scratch. As more agents run across the platform, the system continuously improves its understanding of how actions should be used together.

### Defining workflows with reusable skills

Individual MCP tools describe what a single action does, but they do not define how to complete an entire task. Real enterprise work often requires multiple steps across multiple systems.

Skills model the task itself (e.g., “build an account plan”) as a markdown spec that includes the recommended sequence of steps, which actions to call at each step, and when not to use them. These SKILL.md files are executable specifications that the agent engine can load and run, enabling workflows to be defined as reusable programs. There's where skills come in handy, they’re reusable packages of instructions, templates, and tools that teach Assistant how to execute specific tasks with domain expertise.

Together, these capabilities ensure MCP becomes more than a connectivity layer. By combining tool search, enterprise memory, and skills, Glean ensures agents can discover the right actions, learn to use them effectively, and execute complex workflows reliably at enterprise scale.

## MCP enables connectivity, guardrails keep it safe

In the enterprise, interoperability often comes with security trade-offs. While the ability for AI to connect directly to enterprise systems makes MCP powerful, it also introduces new risks. When agents can take actions with MCP, they become exposed to prompt injection attacks, misuse, unauthorized data access, and vulnerable or poorly designed tools.

Making MCP safe in the enterprise therefore requires more than simply connecting agents to tools. It requires governance, strict permission boundaries, runtime safeguards, and continuous monitoring so that agents can operate across systems without expanding the organization’s security surface area.

### Centralized governance and control over MCP

To protect MCP, we start by giving enterprises full control over how it is used. Glean only supports remote MCP servers that are registered and centrally managed. Admins decide which MCP servers and tools are allowed, who can use them in Assistant, and who can use them in Agents. They also control who is allowed to build agents that call those actions.

This centralized governance ensures that MCP access is explicitly approved, discoverable, and auditable. Enterprises can review available actions, limit them to specific groups, and disable or revoke access if something changes. Rather than exposing a wide surface area by default, MCP usage is controlled by administrators.

### Enforcing least-privilege execution for every action

Every MCP action runs under the end user’s identity and permissions. Actions are therefore limited to what that user is already allowed to see or change in the underlying system. The platform never elevates privileges or executes actions with broader access than the requesting user.

For higher-impact operations, Glean introduces human-in-the-loop verification by default. Before an action executes, the user sees the changes the agent intends to make and must confirm them. This prevents accidental or destructive actions and keeps the user in control.

We also run agent-alignment checks that compare the planned action to the user’s original instruction. If the user asked the agent to update an Asana task in a project, the system verifies that the agent isn’t trying to update a task in a different project instead. Any drift from the requested task is blocked before the action runs.

### Defending MCP as a potential AI attack surface

Because MCP connects AI agents to real systems and data, it must be treated as a potential attack surface. Glean therefore treats all MCP tools as untrusted endpoints.

Inputs and outputs flowing through MCP are scanned for prompt injection, malicious code, hidden instructions, and other adversarial patterns. Attempts to override system policies, manipulate the agent’s reasoning, or insert instructions that alter downstream action behavior are blocked before they can propagate.

By combining centralized governance, least-privilege execution, runtime safety protections, and continuous inspection of action interactions, Glean allows organizations to adopt MCP without sacrificing security or control. The result is a platform where agents can interact with enterprise systems confidently-while enterprises retain full visibility, authority, and protection over how those interactions occur.

## Bringing MCP to the enterprise reliably and safely

MCP is an important step forward for connecting AI to the systems where work actually happens. But connectivity alone isn’t enough. Enterprises still need to ensure that the actions agents call are reliable, that they’re executed correctly, and that the ecosystem is governed securely. 

At Glean, we focus on building high-quality actions and an agent engine that can discover the right action, learn how to use it effectively, and improve over time, while enforcing strong security controls so organizations can safely participate in the MCP ecosystem.

If you want to learn more about MCP in Glean, [reach out to our team for a demo](https://www.glean.com/get-a-demo) and check out our [March drop page](https://www.glean.com/product-drop/march-2026) for our latest feature releases.

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
