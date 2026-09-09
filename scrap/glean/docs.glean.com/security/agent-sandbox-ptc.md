---
url: "https://docs.glean.com/security/agent-sandbox-ptc"
canonical: "https://docs.glean.com/security/agent-sandbox-ptc"
title: "Agent Sandbox & Programmatic Tool Calling"
description: "Learn about Agent Sandbox and Programmatic Tool Calling (PTC), which give Glean a virtual computer for enterprise data analysis and cross-system aggregation."
fetched_at: "2026-09-01T13:29:54.555Z"
---
On this page

Agent Sandbox gives Glean a virtual computer that has a file system, shell, and code interpreter that sits alongside the LLM. It can store results, run commands, and write and execute analysis code in a sandboxed environment.

Programmatic Tool Calling (PTC) lets Glean orchestrate tools directly from code running in a sandboxed execution environment, avoiding a model round trip for each tool call. This reduces latency in multi-step workflows and lowers token usage by processing or filtering data before it enters the model's context window.

## About Agent Sandbox[​](#about-agent-sandbox "Direct link to About Agent Sandbox")

Enterprise data can span many systems, such as Salesforce, Zendesk, Slack, Confluence, Jira, and more. Analytical questions may require combining these sources and operating on large numbers of records.

Without Agent Sandbox, a context window constrains models. Models can't hold every relevant row from multiple enterprise sources in one prompt, perform reliable arithmetic over hundreds or thousands of records, or process workflows that require many retrieval steps or large working sets.

Agent Sandbox removes the context window limit by giving the model a virtual file system where it can do the following:

-   **Process data in batches** - Paginate through thousands of data points across multiple systems
-   **Store intermediate results** - Keep working files in the sandbox instead of in the model’s context
-   **Run Python for exact computation** - Execute aggregations, joins, and custom business logic with code instead of relying on natural-language reasoning

Only the final summarized or filtered output needs to enter the model’s context window. Exact operations like record counts, aggregates, date ordering, and conditional rules run in the interpreter where they’re reliable, not inferred through reasoning where they’re error-prone.

## About Programmatic Tool Calling (PTC)[​](#about-programmatic-tool-calling-ptc "Direct link to About Programmatic Tool Calling (PTC)")

PTC lets the model invoke tools directly from sandbox code, without a full model round-trip for each call.

Without PTC, each tool use requires a separate model generation step. For example, paging through Salesforce data requires over 10 separate model turns.

With PTC, one script orchestrates multiple tool calls, such as loops, branches, and paging. The model writes a program that calls Glean Search, Document Reader, JQL, SOQL, and other allowlisted tools. Filtering and merging happen in code between calls. The model only returns when it needs to interpret results and produce the user-facing answer.

For example, instead of over 10 model turns to page through Salesforce opportunities, PTC runs one program that fetches, filters, and merges all the data before returning results.

## Benefits[​](#benefits "Direct link to Benefits")

Agent Sandbox and Programmatic Tool Calling (PTC) provide the following benefits:

-   **Cross-system analysis** - Combine data from multiple enterprise sources in a single workflow
-   **Large-scale data processing** - Work with thousands of records that won’t fit in a context window
-   **Reliable computation** - Use Python for exact counts, aggregations, and arithmetic
-   **Faster multi-step workflows** - Reduce latency by orchestrating tool calls from code
-   **Lower token usage** - Process and filter data before it enters the model’s context
-   **Auditable workflows** - Inspect intermediate steps and artifacts in the sandbox for debugging

### Example use cases[​](#example-use-cases "Direct link to Example use cases")

The following are example use cases for Agent Sandbox and PTC:

| Use Case | Query |
| --- | --- |
| Pipeline review | Go through all open Salesforce opportunities closing this quarter. Group by stage, owner, and ARR. Flag any stuck in the same stage for 30+ days. Give me a risk-adjusted forecast. |
| Competitive analysis | Analyze all closed-lost deals from Q4. Group by competitor, identify the top reasons we lost, and surface patterns across deal size and segment. |
| Support ticket analysis | Go through all support tickets from the past 60 days. Identify the top 10 most common issues, calculate first-response time and resolution time, and flag open tickets older than 7 days. |
| Postmortem review | Go through all post-mortems from the last 6 months. What are the recurring root causes, and which ones have we actually fixed vs. just acknowledged? |
| Customer evidence | Pull all customer conversations from Gong, Zendesk, and Slack mentioning "memory." How many unique customers have asked for it, what are their use cases, and what workarounds are they using? |
| Time analysis | How do I spend my time? Pull my calendar data and categorize meetings by type, participants, and frequency. Show me where my time goes. |
| Org chart growth | Show me how the engineering org has grown over the past year. Break down by team, hiring velocity, and reporting structure. |

## Activate Agent Sandbox and PTC[​](#activate-agent-sandbox-and-ptc "Direct link to Activate Agent Sandbox and PTC")

PTC only runs inside an Agent Sandbox session. In Glean’s configuration, sandbox code execution can be available without PTC, while PTC always requires an active sandbox so generated code can call tools through the host agent. For eligible customers, Glean enables both together for Glean in Thinking mode.

### Model support[​](#model-support "Direct link to Model support")

Code execution is exposed through a generic shell tool rather than a single vendor’s native “code mode” API, so models that participate in the agentic loop with sandbox access can drive the same shell abstraction. The underlying sandbox may be Glean-operated or provider-hosted depending on deployment settings. Models that omit the shell tool (for example some fast or minimal tool sets) do not support Agent Sandbox or PTC.

The following models automatically leverage Agent Sandbox and PTC:

-   GPT 5.4 or later
-   Claude Sonnet 4.6
-   Claude Opus 4.6 or later
-   Gemini Pro 3.1

If you're on Glean Key, select these models using your model picker in chat. If you're on Customer Key, select these models in the LLM section of **Admin Console → Settings**.

## Security & data protection[​](#security--data-protection "Direct link to Security & data protection")

Agent Sandbox provides a secure, isolated execution environment that ensures customer data remains protected at every layer.

For Glean's broader security posture, certifications, and compliance documentation, see the following pages:

-   [Glean Security Page](https://www.glean.com/security)
-   [Glean Trust Portal (under NDA)](https://trust.glean.com)
-   [Security & Architecture Hub (Help Center)](/security)
-   [Data Analysis: File Security (Help Center)](/administration/assistant/data-analysis/file-security)
-   [Data Analysis: Technical Overview (Help Center)](/administration/assistant/data-analysis/technical-overview)

### Sandbox isolation[​](#sandbox-isolation "Direct link to Sandbox isolation")

Every sandbox instance runs in an isolated environment designed to keep each session separate and protect customer data.

-   **Per-tenant, per-session isolation:** Each sandbox is dedicated to a single customer environment and a single session. There is no cross-session or cross-tenant access to data, code, or artifacts. Customer data is not sent to any external orchestration services.
-   **Ephemeral by design:** When a session ends, sandbox data and artifacts are removed. If conversation history across turns is enabled, filesystem state can be preserved only as needed to support pause/resume.
-   **No cross-sandbox communication:** Sandboxes cannot detect or interact with other instances, and each session remains isolated from the others.

### Data residency[​](#data-residency "Direct link to Data residency")

Sandbox execution runs on infrastructure Glean operates on behalf of your isolated customer environment-not on end-user devices. Data you process in the sandbox stays within your tenant’s Glean boundary and is not sent to third-party orchestration services for sandbox control.

For how Glean provisions isolated sandbox workloads, see [Data Analysis: Technical Overview](/administration/assistant/data-analysis/technical-overview).

### Network security[​](#network-security "Direct link to Network security")

-   **No outbound internet access by default:** When egress is required (for example, for LLM provider calls), only pre-approved domains are permitted via allowlisting.
-   **Restricted ingress:** Only authenticated internal systems can communicate with sandbox instances.
-   **No access to infrastructure credentials:** Sandboxes do not have access to cloud IAM credentials, secrets, or other infrastructure resources.

### Execution security[​](#execution-security "Direct link to Execution security")

Processes in the sandbox run under strict execution controls:

-   **Non-root execution:** Processes run with non-root permissions and cannot escalate privileges
-   **Resource limits:** Per-sandbox CPU and memory limits are enforced to prevent abuse and resource exhaustion.
-   **Scoped file system:** The sandbox file system is scoped to the session, with no access to the host or to other tenants' file systems.

### Permissions & access control[​](#permissions--access-control "Direct link to Permissions & access control")

Agent Sandbox inherits and enforces Glean's existing permission model, ensuring users can only access data they are already authorized to see.

-   **Permission-aware retrieval:** All results respect the user's existing source-application permissions. Permission changes propagate immediately.
-   **No privilege escalation path:** Even in the event of a prompt injection attempt, the sandbox cannot access data beyond the user's existing entitlements.

### AI security[​](#ai-security "Direct link to AI security")

Glean provides runtime AI security capabilities that detect and block prompt injection attacks, jailbreak attempts, malicious code, and toxic content across Glean Assistant, Glean Agents, and sandboxed tools.

Optional Palo Alto Networks Prisma AIRS integration is available for organizations requiring additional runtime defenses.

### Programmatic Tool Calling (PTC) security[​](#programmatic-tool-calling-ptc-security "Direct link to Programmatic Tool Calling (PTC) security")

PTC enables LLM-generated code to orchestrate enterprise tools from within the sandbox. Additional security controls include:

-   **No credentials in sandbox:** The sandbox never holds authentication tokens, API keys, or secrets. Tool calls are mediated by the host agent - no credentials cross the sandbox boundary.
-   **Tool allowlisting:** Only explicitly allowlisted tools are exposed. By default, the allowlist is restricted to a curated set of read-only native tools. Write tools are not supported through programmatic tool calling. Administrators control which tools are exposed.
-   **Global call budget:** A per-session cap on total tool invocations prevents runaway loops or resource exhaustion.
-   **Permission enforcement:** All tool calls go through the same permission-aware execution path as direct tool calls. Source-app ACLs are enforced outside the sandbox.
-   **Results stay in session:** Tool results remain within the ephemeral session and are removed when it ends.
-   **Code inspection:** All sandbox code is logged and available for audit. Malicious code detection inspects PTC-generated code for exfiltration patterns.

### Compliance[​](#compliance "Direct link to Compliance")

Glean’s platform-level compliance certifications extend to Agent Sandbox: SOC 2 Type II, ISO 27001, ISO 42001, HIPAA, GDPR, TX-RAMP Level 2.

## FAQ[​](#faq "Direct link to FAQ")

**What to do if an agent can’t process a large document?** If your agent returns errors or incomplete results when processing large documents, try using thinking mode. When Agent Sandbox is available, it can read and process document content in segments rather than loading everything into the context window at once. You can also split the work across sub-agents, where each sub-agent processes a portion of the content with its own isolated memory. For more information on managing agent memory, see [Memory](/agents/concepts/memory).
