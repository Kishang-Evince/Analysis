---
url: "https://docs.glean.com/administration/gce-logs/data-dictionary"
canonical: "https://docs.glean.com/administration/gce-logs/data-dictionary"
title: "Overview"
description: "Overview of Glean's usage analytics log, the event types it records, and what you can measure with them."
fetched_at: "2026-10-13T08:49:08.447Z"
---
On this page

Glean's usage analytics log provides a structured, easy-to-analyze record of key user actions such as searches, clicks, chats, and feedback. These logs enable clients to measure engagement, improve adoption, and build custom dashboards for internal analysis.

By default, Glean Customer Event logging is enabled and events are written as a unified stream called `glean-customer-event` to a log bucket in object storage (for example, Google Cloud Storage or Amazon S3) in your Glean project. For analytics and ad‑hoc queries, these logs are typically loaded into a data warehouse (such as BigQuery or Athena).

Glean delivers GCE logs as a single unified stream. Filtering by event type, connector, user, or content is not supported at the export layer. All events flow to the configured destination. Downstream systems (BigQuery, Athena, Splunk, and similar) must apply filters after ingestion. Plan destination index sizing, retention, and license consumption accordingly.

AWS Athena schema

For AWS deployments, the raw `glean_customer_event_external` Athena table uses a schema-on-read definition over the JSON event stream. The table declares a broad set of payload fields, but its columns do not guarantee that every deployment emits every event type or field. A declared field is `NULL` when the corresponding event does not populate it. The table definition and event producers evolve independently, so a field documented here might not yet be available in every deployment's table. Filter on `jsonPayload.type` before reading the matching payload struct.

Exports of these logs to customer-managed analytics destinations (for example, a BigQuery dataset in your own project) are **not** enabled by default. The exact project, dataset, and table names are set your organization during onboarding and feature enablement and may differ from the examples shown here.

If you would like to understand the options to consume these logs, or are unsure where your `glean-customer-event` logs are stored or exactly which project/dataset/table to query, contact your Glean Account team.

## Glean Customer Event Types[​](#glean-customer-event-types "Direct link to Glean Customer Event Types")

The table below summarizes the key event types captured in the Glean customer event log, along with a brief description and examples to help you understand what each event represents and how it can be used in your analytics. For the field-level schema of each event type, see [Event schemas](/administration/gce-logs/data-dictionary-detailed).

| **Event Type** | **Description** | **Example Action Logged** |
| --- | --- | --- |
| SEARCH | Metadata about a user search action, including the query, the filters applied and the surface it came from. | A user types a search query in the Glean New Tab Page. |
| SEARCH\_CLICK | Documents a click on a search result. | A user clicks the second result on the full-page web app. |
| SEARCH\_FEEDBACK | User-submitted feedback on the quality or helpfulness of search results. | A user rates search results as 3/5 and leaves a comment. |
| AUTOCOMPLETE | An autocomplete request made as a user types, and the suggestions returned. | Autocomplete suggestions appear as a user types "onboard…". |
| CHAT | A chat turn sent to Glean, including the assistant response. | A user sends a question on the Glean homepage. |
| HUMAN\_ONLY\_CHAT\_MESSAGE | Captures metadata for a user-authored chat message. Unlike `CHAT`, this event does not contain the assistant response. | A user sends a message with a file attached. |
| VOICE\_CHAT | Captures a real-time voice interaction, including transcription and response latency. | A user asks Glean a question using real-time voice. |
| CHAT\_CITATIONS | Documents the citations that were used to generate a chat response. | AI cites a Google Doc and a Confluence page in response. |
| CHAT\_CITATION\_CLICK | Documents clicks on citations within chat responses. | A user clicks on the linked Google Doc cited by the AI. |
| CHAT\_FEEDBACK | Feedback left by users on a chat message or assistant response. | A user downvotes a Glean reply and adds a comment. |
| AI\_ANSWER | The AI-generated answer returned for a search query.  
  
**Note:** Starting July 2025, AI Answers are available in Workflow runs instead. See [Insights production queries](/administration/gce-logs/insights-production-queries#search) for how to query both event types. | The AI generates a short answer summarizing multiple docs. |
| AI\_ANSWER\_VOTE | Upvotes and downvotes left on AI-generated answers. | A user upvotes an AI answer in a search result panel. |
| AI\_SUMMARY | Documents usages of the AI Summary feature. | A user requests a summary of a long Slack thread. |
| AI\_SUMMARY\_VOTE | Upvotes and downvotes left on AI-generated summaries. | A user clicks thumbs-down on a doc summary. |
| SHORTCUT | Documents usage of Glean Shortcuts, for example go/alias. | A user visits go/standups which redirects to a calendar. |
| CLIENT\_EVENT | Events taken by users in the Glean application. Captures a wide variety of actions. | A user clicks "See more" on a suggested docs carousel. |
| WORKFLOW\_RUN | A single top-level invocation of a Glean Workflow request. Includes details for all associated and nested workflow executions. | A user runs an Agent. |
| LLM\_CALL | Logs LLM (Large Language Model) API calls made by Glean, including token usage, model and provider information, audio usage and request dimensions. | An AI workflow makes a call to GPT-4 consuming 1000 input tokens. |
| MCP\_USAGE | Logs MCP tool usage, including the tool, server, client, authentication, status, and timing. | An agent calls a built-in MCP search tool. |
| ACTION | Logs an action execution, including its status, timing, and identifiers used to associate it with a workflow or session. This is distinct from `ACTION` entities represented inside `PRODUCT_SNAPSHOT` events. | An agent executes an action through a workflow. |
| ARTIFACT | Logs artifact lifecycle actions and metadata, such as artifact type, version, surface and export format. | A user creates or exports an artifact. |
| WORKFLOW\_CONVERSATION | Captures the conversation history and input fields associated with a workflow run. | Records all user and agent messages in a workflow session. |
| WORKFLOW\_CLASSIFICATION | Records the taxonomy classification assigned to an agent or workflow. A batch pipeline classifies every agent once per day, so these records describe agent definitions rather than individual user activity. Written by a Python pipeline, so the record carries no user identifiers or query text. | — |
| WORKFLOW | Detailed logs providing execution details for a Workflow. *DEPRECATED as of 2025-06-13: use WORKFLOW\_RUN events instead.* | A user initiates a content review workflow. |
| GLEAN\_BOT\_ACTIVITY | Documents activities performed by Glean Bot across various platforms. | The Gleanbot nudges a user to follow up on an unread file. |
| PRODUCT\_SNAPSHOT | Once-daily snapshots (not event logs) of entities in Glean. Each snapshot captures the state of an object at a point in time, which is useful for understanding historical configuration and metadata for users, workflows, and tools. See the event schema for the entity types covered. | Captures user attributes such as departmentID and startdate. |
