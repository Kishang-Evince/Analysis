---
url: "https://docs.glean.com/administration/agent-trace-export"
canonical: "https://docs.glean.com/administration/agent-trace-export"
title: "Export agent traces"
description: "Send Glean agent execution traces to your observability platform through standard OTLP export."
fetched_at: "2026-09-01T13:28:59.398Z"
---
On this page

Glean can push agent execution traces to your observability platform through standard OpenTelemetry Protocol (OTLP) export. This gives your team visibility into agent runs, tool calls, and LLM interactions using the monitoring tools you already operate.

Exported traces follow OpenTelemetry semantic conventions and include spans for agent runs, tool executions, and LLM calls. You can view them in any platform that accepts OTLP data, such as Datadog, Dynatrace, Grafana, Langfuse, LangSmith, Braintrust, or Splunk.

## How it works[​](#how-it-works "Direct link to How it works")

When you enable trace export, Glean pushes OTLP/HTTP traces with protobuf encoding to a customer-configured endpoint. Before export, Glean filters attributes, transforms span data, and excludes internal-only spans so that only customer-relevant telemetry leaves the system.

Each exported trace captures the full lifecycle of an agent run, from the initial request through tool calls and LLM interactions to the final response.

## Set up trace export[​](#set-up-trace-export "Direct link to Set up trace export")

1

Open the Admin console

Navigate to the trace export settings in the **Admin console**.

2

Enter the OTLP endpoint

Provide the OTLP/HTTP endpoint URL for your observability platform.

3

Configure request headers

Add any request headers your platform requires. For authentication tokens, use the `{{token}}` substitution syntax in the header value and enter the secret separately. The secret is stored encrypted and isn't shown again after you save.

4

Enable export

Turn on trace export. Glean begins pushing traces for new agent runs immediately.

## Exported trace attributes[​](#exported-trace-attributes "Direct link to Exported trace attributes")

Each span includes a set of attributes that follow [OpenTelemetry semantic conventions for generative AI](https://opentelemetry.io/docs/specs/semconv/gen-ai/). Every trace also includes a root span that acts as a structural anchor for the run. The attributes vary by span type.

### Common attributes[​](#common-attributes "Direct link to Common attributes")

These attributes appear on every exported span:

| Attribute | Description |
| --- | --- |
| `gen_ai.conversation.id` | Conversation identifier |
| `enduser.id` | Email or identifier of the end user who initiated the run |
| `gen_ai.operation.name` | Operation name for the span, such as `invoke_agent`, `execute_tool`, or `chat` (omitted on the root span) |

### Agent run spans[​](#agent-run-spans "Direct link to Agent run spans")

| Attribute | Description |
| --- | --- |
| `gen_ai.agent.id` | Unique identifier for the agent |
| `gen_ai.agent.name` | Display name of the agent |
| `glean.agent.mode` | Agent execution mode |

### Tool spans[​](#tool-spans "Direct link to Tool spans")

The attributes on a tool span depend on the tool's export classification (see [Tool data classification](#tool-data-classification)).

| Attribute | Description | When exported |
| --- | --- | --- |
| `gen_ai.tool.name` | Name of the tool | Always, but masked to `GLEAN_INTERNAL_TOOL` for redacted tools |
| `gen_ai.tool.call.id` | Unique identifier for the tool call | Always |
| `error.type` | Error classification, if the tool call failed | Always (when present) |
| `gen_ai.tool.description` | Description of the tool | Only for fully exportable tools |
| `gen_ai.tool.call.arguments` | Arguments passed to the tool | Only for fully exportable tools |
| `gen_ai.tool.call.result` | Result returned by the tool | Only for fully exportable tools |

### Tool data classification[​](#tool-data-classification "Direct link to Tool data classification")

Glean classifies each tool into one of two export levels:

-   **Full export** — the tool name, description, call arguments, and call result are all included in the trace. This applies to customer-authored tools: custom action packs, custom MCP servers, and custom OpenAPI servers, along with any template-backed tool configured to allow externalization.
-   **Redacted** — the tool name is replaced with the placeholder `GLEAN_INTERNAL_TOOL`, and only the call ID and error type (when present) are retained. The tool's description, arguments, and result are omitted because they may be sensitive, proprietary, or retrieval-heavy. Glean's native built-in tools are always redacted, including Glean Search, Code Search, Employee Search, Expert Search, People Search, and Glean Document Reader. Any tool whose classification can't be resolved also fails closed to redacted.

### LLM call spans[​](#llm-call-spans "Direct link to LLM call spans")

| Attribute | Description |
| --- | --- |
| `gen_ai.request.model` | Model requested for the LLM call |
| `gen_ai.response.model` | Model that produced the response |
| `gen_ai.response.id` | Provider request identifier for the response |
| `gen_ai.provider.name` | LLM provider (for example, `openai`, `anthropic`, `aws.bedrock`) |
| `gen_ai.response.finish_reasons` | Reasons the model stopped generating |
| `gen_ai.usage.input_tokens` | Number of input tokens |
| `gen_ai.usage.output_tokens` | Number of output tokens |
| `gen_ai.usage.cache_read.input_tokens` | Cache-read input tokens |
| `gen_ai.usage.cache_creation.input_tokens` | Cache-creation input tokens |
| `gen_ai.usage.reasoning.output_tokens` | Reasoning output tokens |
| `gen_ai.response.time_to_first_chunk` | Time to first response chunk, in seconds |
| `gen_ai.output.messages` | Model output messages, serialized as JSON |
| `error.type` | Error classification, if the LLM call failed |

## Scope and limitations[​](#scope-and-limitations "Direct link to Scope and limitations")

Trace export currently covers:

-   OTLP/HTTP with protobuf encoding
-   Admin-configured export to a single OTLP endpoint
-   Attribute filtering and internal span exclusion before export

The following are not currently supported:

-   OpenTelemetry logs or metrics
-   Historical bulk export or backfill
-   SIEM-specific export formats
-   Delivery durability guarantees

## See also[​](#see-also "Direct link to See also")

-   [Agent insights for admins](/administration/insights/agents)
-   [Debug an agent](/agents/create-agents/debug-agent)
