---
url: "https://developers.glean.com/guides/agents/overview"
canonical: "https://developers.glean.com/guides/agents/overview"
title: "Building Agents with Glean | Glean Developer"
description: "Complete guide to building AI agents using Glean's ecosystem of tools and libraries"
fetched_at: "2026-09-01T13:23:02.018Z"
---
On this page

Glean provides multiple ways to build AI agents that can search and reason over your organization's knowledge. This guide helps you choose the right approach and get started with building agent-powered applications.

## Choose Your Approach[​](#choose-your-approach "Direct link to Choose Your Approach")

[

### Direct API Integration

Use Glean's REST APIs directly for maximum control and customization







](/guides/agents/direct-api)[

### LangChain Integration

Python LangChain integration for Glean's search and chat capabilities







](/guides/agents/langchain)[

### MCP Integration

Connect AI models and IDEs to Glean via standardized protocol







](/guides/mcp)[

### Glean Agent Toolkit

Pre-built Glean tools that work across multiple agent frameworks







](/guides/agents/toolkit)

## Comparison & Decision Guide[​](#comparison--decision-guide "Direct link to Comparison & Decision Guide")

| Approach | Complexity | Flexibility | Time to Deploy | Best For |
| --- | --- | --- | --- | --- |
| **Direct API** | High | Maximum | Medium | Custom integrations, multi-language |
| **LangChain** | Medium | High | Fast | Python ecosystem, rich tooling |
| **MCP** | Low | Medium | Fast | IDE integration, standardized tools |
| **Glean Agent Toolkit** | Medium | High | Medium | Cross-platform compatibility, multi-framework tools |

### Questions to Consider[​](#questions-to-consider "Direct link to Questions to Consider")

1.  **What's your technical background?**
    
    -   Non-technical → [Agent Builder](https://docs.glean.com/agents/)
    -   Python developer → LangChain
    -   Multi-language → Direct API
2.  **Where will the agent run?**
    
    -   IDE/Editor → MCP
    -   Web application → Direct API
    -   Multiple frameworks → Glean Agent Toolkit
3.  **How much customization do you need?**
    
    -   Simple Q&A → [Agent Builder](https://docs.glean.com/agents/)
    -   Complex workflows → Direct API
    -   Multi-framework tools → Glean Agent Toolkit

## Authentication & Setup[​](#authentication--setup "Direct link to Authentication & Setup")

All approaches require Glean API credentials:

1.  **Get API Token**: Request a [user-scoped API token](/api-info/client/authentication/glean-issued#available-scopes)
2.  **Required Scopes**: `agents` and `chat` are required for agent execution; `search` may be needed depending on your agent's configuration
3.  **Environment Setup**: Configure your Glean instance and token

## Need a No-Code Solution?[​](#need-a-no-code-solution "Direct link to Need a No-Code Solution?")

For creating agents without writing code, use Glean's built-in Agent Builder:

[

### Glean Agent Builder

Create agents with drag-and-drop interface, pre-built templates, and custom instructions. Perfect for business users and rapid prototyping.







](https://docs.glean.com/agents/)

The Agent Builder provides a visual interface for creating agents directly in Glean. Agents created this way can still be accessed programmatically via the [Agents API](/api/client-api/agents/overview) for integration with your applications.

## Next Steps[​](#next-steps "Direct link to Next Steps")

-   **New to Glean?** Start with [Agent Builder](https://docs.glean.com/agents/) (no-code solution)
-   **Python Developer?** Try [LangChain Integration](/guides/agents/langchain)
-   **IDE User?** Set up [MCP Integration](/guides/mcp)
-   **Multi-Framework?** Explore [Glean Agent Toolkit](/guides/agents/toolkit)
-   **Custom Needs?** Use [Direct API Integration](/guides/agents/direct-api)
-   **Need Help?** Check the [API Reference](/api/client-api/agents/overview) for technical details
