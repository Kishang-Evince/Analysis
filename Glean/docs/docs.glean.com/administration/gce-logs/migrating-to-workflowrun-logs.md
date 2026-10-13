---
url: "https://docs.glean.com/administration/gce-logs/migrating-to-workflowrun-logs"
canonical: "https://docs.glean.com/administration/gce-logs/migrating-to-workflowrun-logs"
title: "WorkflowRun event log"
description: "Reference for the WorkflowRun event type in Glean Customer Event Logs and how to use it in your analytics."
fetched_at: "2026-10-13T08:49:09.096Z"
---
On this page

Glean Assistant and Glean Agents interactions run as workflows. The `WorkflowRun` event type in Glean Customer Event Logs captures each top-level workflow invocation as a single, well-structured entry, giving you comprehensive visibility into usage across Glean AI products — including agents, AI Answers, Summarization, Deep Research, Daily Digests, and more.

Because it consolidates all relevant execution data in one place, `WorkflowRun` makes analysis of assistant usage, agent activity, and AI-driven features simpler, more reliable, and more performant.

The following users might be interested in the `WorkflowRun` event log:

-   **Admins**: Managing analytics pipelines, log integrations, and product dashboards
-   **Data and business analysts**: Building queries or KPI dashboards from Glean event logs
-   **Developers and IT**: Who join Glean logs with other systems or manage feature adoption
-   **End users**: Relying on metrics or dashboards powered by workflow data

## Key fields in WorkflowRun[​](#key-fields-in-workflowrun "Direct link to Key fields in WorkflowRun")

Each `WorkflowRun` event includes:

### Core Identifiers

-   **`runId`**: Globally unique identifier for the top-level workflow invocation
-   **`chatSessionId`** and **`sessionTrackingToken`**: Links to the user session context

### Execution Context

-   **`feature`**: Indicates the Glean capability used (for example, `AI_ANSWER`, `DAILY_DIGESTS`, `AGENT`)
-   **`initiator`**: Source of execution (for example, `USER`, `SYSTEM`, `AUTOMATION`, `EVAL`)
-   **`platform`**: Where the workflow originated (for example, `WEB` or `REST_API`)

### Workflow Details

-   **`workflowExecutions`**: Includes workflow-level IDs, namespaces (for example, `AGENT` or `STATIC_WORKFLOW`), and execution status
-   **`stepExecutions`**: Captures granular information about steps, status, errors, tools used, and citations

info

For a detailed description of these fields, see [Event schemas](/administration/gce-logs/data-dictionary-detailed).

## Relationship to Chat and Workflow logs[​](#relationship-to-chat-and-workflow-logs "Direct link to Relationship to Chat and Workflow logs")

Glean AI usage spans these event types:

-   **`CHAT`**: Base chat turns, including interactions from surfaces such as Slack. Use this event type for chat-volume and chat-response analysis.
-   **`HUMAN_ONLY_CHAT_MESSAGE`**: Metadata for user-authored chat messages, without the assistant response.
-   **`WORKFLOW_RUN`**: Comprehensive workflow tracking. Use this event type for workflow, agent, and AI-feature metrics; it does not replace `CHAT` for all chat analytics.
-   **`WORKFLOW`** (Deprecated): Replaced by `WORKFLOW_RUN`. Doesn't receive new data.

Workflow Deprecation

`WorkflowRun` became the source of truth for workflow metrics when it replaced the `Workflow` log in June 2025. If you analyze historical data that spans that cutover, join across `Chat`, `Workflow`, and `WorkflowRun` to get complete workflow metrics for that period. For data after the cutover, use `WorkflowRun` for workflow metrics, while continuing to use `CHAT` and `HUMAN_ONLY_CHAT_MESSAGE` for chat analytics. See [Insights production queries](/administration/gce-logs/insights-production-queries) for stitching queries that cover the transition.

## Common use cases[​](#common-use-cases "Direct link to Common use cases")

-   **Agent usage analysis**: Track user engagement with custom agents.
-   **Agent usage analysis**: Track user engagement with custom agents
-   **AI feature adoption**: Monitor usage of AI Answers, Summarization, and more
-   **Performance monitoring**: Analyze workflow execution times and success rates
-   **User behavior insights**: Understand how users interact with AI features
-   **Performance monitoring**: Analyze workflow execution times and success rates.
-   **User behavior insights**: Understand how users interact with AI features.

See [Insights production queries](/administration/gce-logs/insights-production-queries) for detailed examples of working with `WorkflowRun` data.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### How can I analyze agents usage with WorkflowRun?

See [Insights production queries](/administration/gce-logs/insights-production-queries) for example queries that consume this event type.

### Will previous Workflow events appear in WorkflowRun?

No. `WorkflowRun` contains only data generated after it replaced the `Workflow` log. To analyze earlier periods, join across `Chat`, `Workflow`, and `WorkflowRun`.

### How do I identify user-triggered workflows vs. system-triggered or automated workflows?

Filter on `initiator = 'USER'`. The `feature`, `namespace`, or `workflow_id` fields can further segment by workflow type.

### Some workflow\_ids look like names, others are random strings—why?

Named IDs are Glean-provided or default workflows. Random-appearing IDs are custom or user-defined.

### Where is the latest schema and field documentation?

See [Event schemas](/administration/gce-logs/data-dictionary-detailed) for schema definitions and [Insights production queries](/administration/gce-logs/insights-production-queries) for query examples.

## See also[​](#see-also "Direct link to See also")

-   [Overview](/administration/gce-logs/data-dictionary)
-   [Event schemas](/administration/gce-logs/data-dictionary-detailed)
-   [Insights production queries](/administration/gce-logs/insights-production-queries)

### Need help?

**Still have questions or want implementation advice?** Reach out to your Glean admin.
