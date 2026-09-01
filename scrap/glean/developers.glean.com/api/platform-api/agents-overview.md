---
url: "https://developers.glean.com/api/platform-api/agents-overview"
canonical: "https://developers.glean.com/api/platform-api/agents-overview"
title: "Agents API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:57.648Z"
---
The Agents API lets you discover Glean agents, inspect their input and output schemas, and execute agent runs. Use it to embed Glean's agentic capabilities directly into your own applications and workflows.

## Use Cases

### Agent Discovery

Search for agents available to the authenticated user and retrieve their configuration to decide which agent to invoke.

### Schema Inspection

Fetch an agent’s input and output schemas so you can build type-safe integrations and validate payloads before invoking a run.

### Agent Execution

Create agent runs to execute Glean agents programmatically and incorporate their results into downstream automation.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/api/agents/search`](/api/platform-api/platform-agents-search) | [Search agents](/api/platform-api/platform-agents-search) |
| GET | [`/api/agents/{agent_id}`](/api/platform-api/platform-agents-get) | [Get agent](/api/platform-api/platform-agents-get) |
| GET | [`/api/agents/{agent_id}/schemas`](/api/platform-api/platform-agents-get-schemas) | [Get agent schemas](/api/platform-api/platform-agents-get-schemas) |
| POST | [`/api/agents/{agent_id}/runs`](/api/platform-api/platform-agents-create-run) | [Create agent run](/api/platform-api/platform-agents-create-run) |

For per-user integrations, authenticate with OAuth. The [Platform API authentication guide](/api/platform-api/authentication) covers the Glean OAuth Authorization Server and external-IdP options. Use a Glean-issued token for global permissions with `X-Glean-ActAs`, or when no OAuth path exists.

For error responses, see [Platform API Errors](/errors) for the shared ProblemDetail code reference and remediation guidance.
