---
url: "https://www.glean.com/blog/open-agent-platform"
canonical: "https://www.glean.com/blog/open-agent-platform"
title: "Glean's open agent platform: because while not all agents will be built on Glean, all agents should be connected to enterprise data"
description: "Arvind Jain  | Glean’s support for the latest universal standards of communication and open agent frameworks, including Anthropic’s Model Context Protocol (MCP), LangChain, LangGraph, Nvidia NIM, OpenAI Agents SDK (via MCP) and many more to come in the future."
fetched_at: "2026-09-01T13:26:49.082Z"
---
Last updated Mar 27, 2025.

# Glean's open agent platform: because while not all agents will be built on Glean, all agents should be connected to enterprise data

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a07483653e8ea8ef7c77930_arvind.png)

Arvind Jain

CEO



](/authors/arvind-jain)

![Glean's open agent platform: because while not all agents will be built on Glean, all agents should be connected to enterprise data](https://cdn.prod.website-files.com/613513981b0efaf850830620/67e5005e25722c25d32a58c7_3rd%20party%20agents.webp)

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

Glean is an open and extensible Work AI platform where enterprises bring their own cloud, LLM, security provider, and — available now — third-party agents. While Glean is a powerful platform for creating and orchestrating agents, it’s understandable that customers working in even the largest of Glean environments won’t be building all their agents in Glean. We firmly believe enterprises should be given a choice when building their agent tech stacks. We also believe that other agent frameworks benefit from Glean by gaining access to indexed enterprise data - data that’s indexed and secured only once -  and enabling agents built anywhere to be grounded in relevant, personalized context. 

Glean flourishes when operating in a larger ecosystem, and fails when isolated in a walled garden. That’s why today I’m sharing Glean’s support for the latest universal standards of communication and open agent frameworks, including [Anthropic’s Model Context Protocol](https://developers.glean.com/agents/mcp) (MCP), [LangChain](https://developers.glean.com/agents/langchain), LangGraph, [Nvidia NIM](https://developers.glean.com/guides/agents/nvidia-example), OpenAI Agents SDK (via MCP), and many more to come in the future.

Glean began as an enterprise search solution breaking down knowledge silos across the organization and now we’re seeing that mission extending to breaking down application silos. We see a future where agents overcome the barriers that have traditionally made automating knowledge work across SaaS applications a manual, time-consuming, and brittle process. 

## Open standards of agent communication

Agents act autonomously to get work done, reasoning through complex tasks and pulling in the right tools and workflows. While LLMs excel at reasoning, they lack enterprise knowledge, processes, and the ability to take action. This is where agent platforms step in, orchestrating and securing agentic work to align with user goals. 

Enterprise work is scattered across disconnected SaaS tools, often requiring workers to switch between multiple applications for a single task. Traditional automation has been rigid and expensive, reserved for critical processes. Agents change this by enabling dynamic, context-aware automation for individuals and teams. Yet, the agent and SaaS landscape remains fragmented, making it hard for agents to access data in other applications, call other tools and accomplish their work.

Rather than further fragment the industry by creating our own bespoke APIs and conventions, the value of agents could be realized faster with a common communication framework. It would also avoid customers being locked into a single system, unable to take advantage of a future filled with ever more innovative models and easy-to-use tooling. I firmly believe we’re still in the early innings of AI and that everyone should have the freedom and flexibility to adapt their approach, without coming face-to-face with a heavy rearchitecture.

This is why I’m personally enthused by the introduction of universal communication protocols like Anthropic’s Model Context Protocol (MCP), LangChain’s Agent Protocol, and Cisco, LangChain, and Galileo’s [AGNTCY](https://outshift.cisco.com/blog/building-the-internet-of-agents-introducing-the-agntcy). These aim to provide an open standard for AI agents to connect to various tools and agents without bespoke integrations. When every agent speaks the same language, it’s easy for them to collaborate and uplevel work in the enterprise.

While Glean seeks to make it easy for everyone to build agents in the enterprise, there is a diversity of preferences filled by open-source agent framework alternatives. As an open platform committed to meeting those preferences, we offer support for LangChain and LangGraph. If you do choose to build on Glean, we’ll deliver an enterprise-wide agent experience that empowers everyone to build and deploy agents. Our platform supports scalable orchestration across both first and third-party agents, all anchored in your enterprise data and safeguarded by strict permissions enforcement.

![Developer Platform Ecosystem](https://cdn.prod.website-files.com/613513981b0efaf850830620/67e4ffcba4446ac664851bca_diagram.webp)

*The Glean developer platform with support for MCP, LangChain, and LangGraph. Some capabilities, including Agent and Connector SDKs, are coming soon.* 

## MCP use cases for Glean

Prototyping Glean support for new open agent frameworks like MCP provided us with valuable learnings on how they’re best utilized in the ecosystem:

### Glean Agents calling external tools 

MCP provides a standardized way to connect agents to different data sources and tools based on the client-server architecture. The framework establishes communication between:

-   Host: Agents that initiate connectors
-   Clients: Connectors
-   Servers: Services that provide resources (context), prompts (templated messages), and tools (functions to execute)

With Glean operating as the host, it can connect out to any number of enterprise tools, as long as they have MCP servers in place. This enables Glean to expand its support to a number of new actions, with little to no engineering effort. Let’s look at an example of a customer who wants Glean to resolve tickets through its homegrown Support Hub:

![MCP Server Diagram](https://cdn.prod.website-files.com/613513981b0efaf850830620/67e5000d22ad5af891a24de8_diagram2.webp)

While this is a straightforward example involving the retrieval and updating of a support ticket, in the future, steps within the agentic reasoning engine could be delegated to various other systems, orchestrated by Glean. You could also imagine that Glean, through conversations with other agents, could actually spawn another agent’s work. That’s because protocols are being designed for bidirectional communication, leveraging the dynamic nature of agents to get work done without needing to wait for explicit triggers. It’s pretty neat stuff.

### External tools calling Glean Agents

We can also use Glean in another agent environment, say within the popular AI IDE Cursor. In this example, engineers never have to leave their IDE to gather full enterprise context including documentation, communication, and their code base from Glean.

While [Glean in GitHub](https://www.glean.com/agents/github) offers a similar experience, with added support for automated PR descriptions and code reviews, we had not yet built Cursor or Codeium integrations. With MCP, we don’t have to. 

We see a future where Glean Agents work in concert with both tools and other agents. In some scenarios, like a developer environment where engineers spend their day, it makes sense for Glean’s strengths to be tapped in that environment. In other scenarios, you may turn to Glean Agents for its secure data access, permissions enforcement, and orchestration capabilities with third party agents. The cooperation across boundaries is now becoming a reality. 

## What comes next

New protocols and developer frameworks for building agents have reinforced the need for orchestration across both first-party and third-party agents. They’ve also underscored the value of a horizontal AI platform like Glean in the enterprise.

Our customers want to index their data just once — intelligently bringing context into agents rather than duplicating efforts across multiple solutions. Customers also want to secure, govern, and observe their agents in one go. Glean is designed to help users do just that — guaranteeing permissions awareness, access authentication, and enterprise data protection. 

There’s value in the AI ecosystem - with its developer-friendly frameworks and standardized communication protocols - as well as in a unified platform that secures and indexes your data. Glean delivers both. 

[MCP documentation and repo](https://developers.glean.com/agents/mcp) available now.

[LangChain documentation and repo](https://developers.glean.com/agents/langchain) available now.

[Nvidia NIM documentation and repo](https://developers.glean.com/guides/agents/nvidia-example) available now.

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
