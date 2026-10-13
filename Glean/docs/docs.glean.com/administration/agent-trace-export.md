---
url: "https://docs.glean.com/administration/agent-trace-export"
canonical: "https://docs.glean.com/administration/agent-trace-export"
title: "Export agent traces"
description: "Send Glean agent execution traces to your observability platform through standard OTLP export."
fetched_at: "2026-10-13T08:49:05.694Z"
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

Add resource attributes (optional)

Under **Resource attributes**, add any static metadata your platform needs for routing or grouping. Each row takes an **Attribute name** and an **Attribute value**. See [Resource attributes](#resource-attributes) for limits and reserved names.

5

Enable export

Turn on trace export. Glean begins pushing traces for new agent runs immediately.

## Destination configuration[​](#destination-configuration "Direct link to Destination configuration")

The following table lists the endpoint URL, headers, auth token, and resource attributes each platform expects. Enter `{{token}}` literally in the header value, and replace values in angle brackets with your own. If your provider gives you a tenant-specific or region-specific endpoint, use that exact value.

| Destination | OTLP endpoint URL | Headers | Auth token | Resource attributes |
| --- | --- | --- | --- | --- |
| [Datadog APM](https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest/traces/) | `https://otlp.<DD_SITE>/v1/traces` | `DD-API-KEY: {{token}}` | Datadog API key | — |
| [Datadog LLM Observability](https://docs.datadoghq.com/llm_observability/instrumentation/otel_instrumentation/) | Same regional endpoint as Datadog APM | `DD-API-KEY: {{token}}`  
`DD-OTLP-SOURCE: llmobs` | Datadog API key | — |
| [Grafana Cloud / Tempo](https://grafana.com/docs/grafana-cloud/send-data/otlp/send-data-otlp/) | `https://otlp-gateway-<region>.grafana.net/otlp/v1/traces` | `Authorization: Basic {{token}}` | Base64 of `<instance-id>:<access-policy-token>` | — |
| [Honeycomb](https://docs.honeycomb.io/send-data/go/opentelemetry-sdk) | US: `https://api.honeycomb.io/v1/traces`  
EU: `https://api.eu1.honeycomb.io/v1/traces` | `x-honeycomb-team: {{token}}` | Honeycomb team API key | — |
| [New Relic](https://docs.newrelic.com/docs/opentelemetry/best-practices/opentelemetry-otlp/) | US: `https://otlp.nr-data.net:4318/v1/traces`  
EU: `https://otlp.eu01.nr-data.net:4318/v1/traces` | `api-key: {{token}}` | New Relic ingest or license key | — |
| [Dynatrace](https://docs.dynatrace.com/docs/ingest-from/opentelemetry/otlp-api) | `https://<environment-id>.live.dynatrace.com/api/v2/otlp/v1/traces` | `Authorization: Api-Token {{token}}` | API token with the `openTelemetryTrace.ingest` scope | — |
| [Splunk Observability Cloud](https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-components/exporters/otlphttp-exporter) | `https://ingest.<realm>.observability.splunkcloud.com/v2/trace/otlp` | `X-SF-Token: {{token}}` | Splunk access token | — |
| [Elastic Observability](https://www.elastic.co/docs/solutions/observability/get-started/quickstart-elastic-cloud-otel-endpoint) | Your managed OTLP or APM HTTP traces endpoint | API key: `Authorization: ApiKey {{token}}`  
Secret token: `Authorization: Bearer {{token}}` | Elastic API key or APM secret token | — |
| [Coralogix](https://coralogix.com/docs/opentelemetry/instrumentation-options/nodejs-opentelemetry-instrumentation/) | `https://ingress.<region>.coralogix.com:443/v1/traces` | `Authorization: Bearer {{token}}` | Send-Your-Data API key | `cx.application.name: <application>`  
`cx.subsystem.name: <subsystem>` |
| [SigNoz Cloud](https://signoz.io/docs/ingestion/signoz-cloud/overview/) | `https://ingest.<region>.signoz.cloud:443/v1/traces` | `signoz-ingestion-key: {{token}}` | SigNoz ingestion key | — |
| [SigNoz self-hosted](https://signoz.io/docs/ingestion/self-hosted/overview/) | Your OTLP/HTTP traces endpoint, commonly `http(s)://<host>:4318/v1/traces` | Any headers you define | Your own token | — |
| [Uptrace](https://uptrace.dev/get/opentelemetry-python/otlp) | `https://api.uptrace.dev/v1/traces` | `uptrace-dsn: {{token}}` | Full Uptrace DSN, not only its token component | — |
| [HyperDX](https://www.hyperdx.io/docs/install/opentelemetry) | `https://in-otel.hyperdx.io/v1/traces` | `authorization: {{token}}` | HyperDX ingestion API key | — |
| [Observe](https://docs.observeinc.com/docs/configure-your-own-otel-collector-in-a-non-kubernetes-environment) | `https://<customer>.collect.observeinc.com/v2/otel/v1/traces` | `authorization: Bearer {{token}}`  
Add `x-observe-target-package: <package>` when Observe supplies one | Observe ingest token | — |
| [Chronosphere](https://docs.chronosphere.io/ingest/metrics-traces/otel/otlp-endpoints) | The exact tenant OTLP/HTTP traces endpoint Chronosphere supplies | `API-Token: {{token}}` | Chronosphere API token | — |
| [Better Stack](https://betterstack.com/docs/logs/tracing/) | `https://<ingesting-host>/v1/traces` | `Authorization: Bearer {{token}}` | Better Stack source token | — |
| [Sentry](https://docs.sentry.io/concepts/otlp/direct/traces/) | The OTLP traces URL in **Project Settings → Client Keys (DSN) → OpenTelemetry** | `x-sentry-auth: sentry sentry_key={{token}}` | The Sentry public key shown with the OTLP endpoint | — |
| [groundcover](https://docs.groundcover.com/integrations/data-sources/opentelemetry/sending-from-an-opentelemetry-collector) | Your BYOC or inCloud OTLP HTTP traces endpoint | `apikey: {{token}}` | Third-party ingestion key | — |
| [Arize AX](https://arize.com/docs/ax/observe/tracing/configure/otel-collector-deployment-patterns) | `https://otlp.arize.com/v1/traces`, or the endpoint Arize supplies | `api_key: {{token}}`  
`space_id: <space-id>` | Arize API key | `model_id: <project-name>`  
Add `openinference.project.name: <project-name>` when your Arize setup specifies it |
| [Langfuse](https://langfuse.com/docs/opentelemetry/get-started) | EU: `https://cloud.langfuse.com/api/public/otel/v1/traces`  
Use your US, JP, HIPAA, or self-hosted hostname when applicable | `Authorization: Basic {{token}}`  
`x-langfuse-ingestion-version: 4` | Base64 of `<public-key>:<secret-key>` | — |
| [LangSmith](https://docs.langchain.com/langsmith/trace-with-opentelemetry) | `https://api.smith.langchain.com/otel/v1/traces` | `x-api-key: {{token}}`  
`Langsmith-Project: <project-name>` | LangSmith API key | — |
| [Braintrust](https://www.braintrust.dev/docs/integrations/sdk-integrations/opentelemetry) | `https://api.braintrust.dev/otel/v1/traces` | `Authorization: Bearer {{token}}`  
`x-bt-parent: project_id:<project-id>` or `project_name:<name>` | Braintrust API key | — |
| [Traceloop](https://docs.traceloop.com/docs/openllmetry/integrations/traceloop) | The environment-specific OTLP/HTTP traces endpoint shown in Traceloop | Use the API-key header shown with that endpoint | Environment-specific Traceloop API key | — |

## Resource attributes[​](#resource-attributes "Direct link to Resource attributes")

Resource attributes are static key-value pairs that Glean attaches to the OpenTelemetry resource on every span sent to a destination. Use them for values your observability platform expects outside of transport headers, such as a project, namespace, or environment identifier. You configure them separately for each export destination.

For example:

| Attribute name | Attribute value |
| --- | --- |
| `model_id` | `customer-project` |
| `service.namespace` | `customer-agents` |

Glean sets `service.name` to `glean` and manages it for you. Attempts to set `service.name` yourself are rejected.

warning

Resource attribute values are exported with every span. Don't enter credentials, tokens, or sensitive user data. For authentication, use request headers with the `{{token}}` substitution syntax instead.

The following limits apply to each destination:

| Limit | Value |
| --- | --- |
| Resource attributes per destination | 32 |
| Attribute name length | 256 characters |
| Attribute value length | 1,024 characters |
| Total size of all attributes | 16 KiB |

Attribute names are case-sensitive, must be unique within a destination, and can't be empty. Values can't be empty either.

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
| `gen_ai.tool.name` | Name of the tool | Always |
| `gen_ai.tool.call.id` | Unique identifier for the tool call | Always |
| `error.type` | Error classification, if the tool call failed | Always (when present) |
| `gen_ai.tool.call.arguments` | Arguments passed to the tool | Only for fully exportable tools |
| `gen_ai.tool.call.result` | Result returned by the tool | Only for fully exportable tools |

Glean's native tools' descriptions, arguments, and results are redacted because they may be sensitive, proprietary, or retrieval-heavy.

### Tool data classification[​](#tool-data-classification "Direct link to Tool data classification")

Agent trace export fully exports customer-authored tools. The tool name, call arguments, and call result are all included in the trace. This applies to custom action packs, custom MCP servers, and custom OpenAPI servers, along with any template-backed tool configured to allow externalization.

Glean's native tools' descriptions, arguments, and results are redacted because they may be sensitive, proprietary, or retrieval-heavy.

### LLM call spans[​](#llm-call-spans "Direct link to LLM call spans")

| Attribute | Description |
| --- | --- |
| `gen_ai.request.model` | Model requested for the LLM call |
| `gen_ai.response.model` | Model that produced the response |
| `gen_ai.response.id` | Provider request identifier for the response |
| `gen_ai.provider.name` | LLM provider (for example, `openai`, `anthropic`, `aws.bedrock`) |
| `gen_ai.response.finish_reasons` | Reasons the model stopped generating |
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
