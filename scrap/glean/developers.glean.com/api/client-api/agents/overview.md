---
url: "https://developers.glean.com/api/client-api/agents/overview"
canonical: "https://developers.glean.com/api/client-api/agents/overview"
title: "Agents API Overview | Glean Developer"
description: "Programmatic control and integration with Glean agents"
fetched_at: "2026-09-01T13:22:51.800Z"
---
On this page

The Agents API provides programmatic control over Glean agents, enabling you to build, deploy, and manage AI agents across your organization. This API allows you to integrate Glean's agent capabilities directly into your applications and workflows.

## Use Cases

### Agent Discovery

Search and retrieve available agents in your deployment to understand what capabilities are available for integration.

### Agent Execution

Create and manage agent runs with streaming or blocking responses for real-time chat interfaces and batch processing.

### Schema Inspection

Examine agent input and output schemas for integration planning and validation in your applications.

### Real-time Integration

Stream agent responses to chat interfaces and applications for immediate user feedback and interaction.

### External Application Integration

Embed Glean agents into your existing systems and workflows for seamless AI-powered assistance.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/agents`](/api/client-api/agents/create-agent) | [Create an agent](/api/client-api/agents/create-agent)
Create an agent.

 |
| POST | [`/rest/api/v1/agents/runs/stream`](/api/client-api/agents/create-and-stream-run) | [Create an agent run and stream the response](/api/client-api/agents/create-and-stream-run)

Executes an \[agent\](https://developers.glean.com/agents/agents-api) run and returns the result as a stream of server-sent events (SSE). \*\*Note\*\*: If the agent uses an input form trigger, all form fields (including optional fields) must be included in the \`input\` object.

 |
| POST | [`/rest/api/v1/agents/runs/wait`](/api/client-api/agents/create-and-wait-run) | [Create an agent run and wait for the response](/api/client-api/agents/create-and-wait-run)

Executes an \[agent\](https://developers.glean.com/agents/agents-api) run and returns the final response. \*\*Note\*\*: If the agent uses an input form trigger, all form fields (including optional fields) must be included in the \`input\` object.

 |
| POST | [`/rest/api/v1/agents/search`](/api/client-api/agents/search-agents) | [Search agents](/api/client-api/agents/search-agents)

Search for \[agents\](https://developers.glean.com/agents/agents-api) by agent name.

 |
| GET | [`/rest/api/v1/agents/{agent_id}`](/api/client-api/agents/get-agent) | [Retrieve an agent](/api/client-api/agents/get-agent)

Returns details of an \[agent\](https://developers.glean.com/agents/agents-api) created in the Agent Builder.

 |
| POST | [`/rest/api/v1/agents/{agent_id}`](/api/client-api/agents/edit-agent) | [Edit an agent](/api/client-api/agents/edit-agent)

Creates a draft or publishes an \[agent\](https://developers.glean.com/agents/agents-api). Use \`isDraft=true\` to save a draft, or \`isDraft=false\` (or omit) to publish immediately. Only draft and publish modes are supported.

 |
| POST | [`/rest/api/v1/agents/{agent_id}/import`](/api/client-api/agents/import-agent) | [Import an agent](/api/client-api/agents/import-agent)

Imports an \[agent\](https://developers.glean.com/agents/agents-api) from its on-disk folder representation (spec.yaml, instructions.md, skills/, subagents/) packaged as a zip, and creates or updates the agent. Inverse of the export flow: the folder-to-schema conversion runs server-side. The bundle must contain only regular files; symlinks are resolved by the caller at packaging time.

 |
| GET | [`/rest/api/v1/agents/{agent_id}/schemas`](/api/client-api/agents/get-agent-schemas) | [List an agent's schemas](/api/client-api/agents/get-agent-schemas)

Return \[agent\](https://developers.glean.com/agents/agents-api)'s input and output schemas. You can use these schemas to detect changes to an agent's input or output structure.

 |

## Agent Builder Integration[​](#agent-builder-integration "Direct link to Agent Builder Integration")

Agents are created and configured through Glean's Agent Builder interface. The API provides programmatic access to these user-created agents.

![Agent Builder Interface](/img/agents/agent-builder.png)

### Finding Agent IDs[​](#finding-agent-ids "Direct link to Finding Agent IDs")

To use an agent programmatically, you'll need its Agent ID. You can find this in the Agent Builder URL:

![Agent ID in URL](/img/agents/agent-id.png)

The Agent ID appears in the URL path: `/admin/agents/{agentId}`

## Protocol Compatibility[​](#protocol-compatibility "Direct link to Protocol Compatibility")

The Agents API implements a subset of the [LangChain Agent Protocol](https://langchain-ai.github.io/agent-protocol/api.html#tag/agents), specifically:

-   **[Agents](https://langchain-ai.github.io/agent-protocol/api.html#tag/agents)**: Agent discovery and metadata
-   **[Runs](https://langchain-ai.github.io/agent-protocol/api.html#tag/runs)**: Agent execution and run management

This ensures compatibility with any agent runtime that supports this standard protocol.

## Authentication & Setup[​](#authentication--setup "Direct link to Authentication & Setup")

Before using the Agents API, ensure you have:

1.  **API Token**: A [user-scoped API token](/api-info/client/authentication/glean-issued#available-scopes) with `agents` scope
2.  **Agent Access**: Permissions to access the agents you want to use
3.  **Base URL**: Your organization's Glean instance URL

## Common Integration Patterns[​](#common-integration-patterns "Direct link to Common Integration Patterns")

### Streaming Responses[​](#streaming-responses "Direct link to Streaming Responses")

For real-time chat interfaces, use the streaming endpoints to provide immediate feedback:

```
const response = await fetch('/agents/agent-123/runs', {  method: 'POST',  headers: { 'Authorization': 'Bearer your-token' },  body: JSON.stringify({     query: 'What is our vacation policy?',    stream: true   })});const reader = response.body.getReader();// Process streaming chunks...
```

### Batch Processing[​](#batch-processing "Direct link to Batch Processing")

For bulk operations, use the blocking endpoints to process multiple queries:

```
import asynciofrom glean.api_client import Gleanasync def process_queries(queries):    with Glean(api_token="your-token", instance="your-org") as client:        tasks = [            client.agents.create_and_wait_run(                agent_id="agent-123",                 query=query            ) for query in queries        ]        return await asyncio.gather(*tasks)
```

## Next Steps[​](#next-steps "Direct link to Next Steps")

-   Browse the API endpoint documentation above for detailed request/response schemas
-   Check out the [Building Agents guide](/guides/agents/overview) for different ways to create agent-powered applications
-   Review [authentication requirements](/api-info/client/authentication/overview) for API access
