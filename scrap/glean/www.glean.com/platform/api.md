---
url: "https://www.glean.com/platform/api"
canonical: "https://www.glean.com/platform/api"
title: "Glean APIs: Build Secure Enterprise AI Agents & Integrations"
description: "Easily integrate Glean APIs to add secure, intelligent AI search and agents to any enterprise app. Simplify development with powerful, context-aware tools."
fetched_at: "2026-09-01T13:25:26.640Z"
---
![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a8762c2558af4929f65a8d9_hero5050-bluevariant-bg.webp)![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a8762c1b1d9dbe406315813_hero5050-bluevariant-bg-mob.webp)

API

# Build your own AI agents on full enterprise context.

Context is the next data platform. Glean provides the foundation for chatbots and agents to become the new tools of work.

[

Get a demo

Get a demo

](/get-a-demo)

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a8efbe8c1310f310950e1b0_API%20Hero%20Desktop.png)

## Build on Glean

![Placeholder platform image](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a7fb0061aedb0161f48f520_product-default.png)

Search

### Custom AI, without the complexity

Bring all enterprise knowledge together with secure, permissions-aware search.

![Placeholder platform image](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/699f815ec21f3a2cbbabc38e_api_build-1.webp)

Agents

### Context-aware agents

Build in any framework and give your agents the full context of your company.

![Placeholder platform image](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/699f815efc56fc2196529401_api_build-2.webp)

Chatbots

### Best-in-class retrieval for any AI app

Deliver grounded answers right inside the tools your team works in everyday.

## Get started in minutes.

[

View developer docs

View developer docs

](#)

Search API

Copy code

```javascript
from glean.api_client
import Glean

with Glean(api_token = "YOUR_GLEAN_API_TOKEN", instance = "your-company") as glean:
  res = glean.client.agents.create_and_wait_run(
    agent_id = "agent_123",
    input = {
      "query": "Analyze monthly sales performance"
    }
  )
print(res)
```

Chat API

Copy code

```javascript
from glean.api_client
import Glean

with Glean(api_token = "YOUR_GLEAN_API_TOKEN", instance = "your-company") as glean:
  res = glean.client.chat.create(
    messages = [{
      "fragments": [{
        "text": "Summarize our Q4 goals"
      }]
    }]
  )
print(res)
```

Agent API

Copy code

```javascript
from glean.api_client
import Glean

with Glean(api_token = "YOUR_GLEAN_API_TOKEN", instance = "your-company") as glean:
  res = glean.client.search.search(query = "vacation policy")
print(res)
```

## Build your way with open APIs

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a8d479a38c108ec74716b68_Document%20Search%20Icon.svg)

Indexing SDK

Bring custom, permission-aware data into Glean alongside 100+ out-of-the-box connectors.

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a8d47502309578fd6e3570d_Stacked%20Layers%20Icon.svg)

Web SDK

Embed Glean’s UI in your apps to power context-aware chatbots and agents where work happens.

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a8d47502da9d4db6fde2ded_Wrench%20Icon.svg)

Agent toolkit

Build agents in your preferred framework - OpenAI, LangChain, Google ADK, CrewAI, and more - all grounded in the full context of your enterprise.

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a8d475039effe68d72aa32d_Server%20Rack%20Icon.svg)

Remote MCP servers

Run Glean in MCP-enabled IDEs and apps like Cursor, VS Code, Windsurf, and Claude Desktop.

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a8d4750f85201bf18c844be_Gear%20Icon.svg)

Custom actions

Automate your work with 100+ native actions, or create your own using MCP and the OpenAPI spec.

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a8cc7d73eb0d09a82f4d03f_Blue-glimmer.png)

Build in your language

Build in your agent framework

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/699f5d219bb47dd13cc1e86c_icon_s.svg)

Use Glean where you work

## Glean indexes and understands your data everywhere it lives.

275+ app connectors for personalized and permissions-enforced enterprise search.

[

View all connectors

View all connectors

](/platform/connectors)

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6a84237fd1585c7b3bd51f36_integrations-bg.webp)

## FAQs

What can developers build with Glean APIs?

Developers can build AI agents, chatbots, search experiences, and context-aware enterprise applications on Glean’s search and context platform.

What APIs and SDKs does Glean provide?

Glean provides APIs and tools for search, chat, agents, indexing, web embedding, remote MCP, and custom actions.

Can developers bring custom enterprise data into Glean?

Yes. The Indexing SDK lets teams add custom, permission-aware data alongside Glean’s existing connectors.

Can Glean APIs support custom agents in other frameworks?

Yes. Glean supports agents built with preferred frameworks such as OpenAI, LangChain, Google ADK, CrewAI, and others.

Can teams embed Glean inside their own products or workflows?

Yes. The Web SDK helps teams embed Glean UI and context-aware chat or agent experiences where work already happens.

Does Glean support custom actions and MCP-enabled workflows?

Yes. Teams can automate work with native actions, create custom actions using OpenAPI and MCP, and use Glean in MCP-enabled IDEs and apps.

## See Enterprise AI in action

[Get a demo](/get-a-demo)
