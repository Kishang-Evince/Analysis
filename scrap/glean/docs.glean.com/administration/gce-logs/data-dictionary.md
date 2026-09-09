---
url: "https://docs.glean.com/administration/gce-logs/data-dictionary"
canonical: "https://docs.glean.com/administration/gce-logs/data-dictionary"
title: "Overview"
description: "Glean's usage analytics log provides a structured, easy-to-analyze record of key user actions such as searches, clicks, chats, and feedback. These logs enable clients to measure engagement, improve adoption, and build custom dashboards for internal analysis."
fetched_at: "2026-09-01T13:29:00.811Z"
---
On this page

Glean's usage analytics log provides a structured, easy-to-analyze record of key user actions such as searches, clicks, chats, and feedback. These logs enable clients to measure engagement, improve adoption, and build custom dashboards for internal analysis.

By default, Glean Customer Event logging is enabled and events are written as a unified stream called `glean-customer-event` to a log bucket in object storage (for example, Google Cloud Storage or Amazon S3) in your Glean project. For analytics and ad‑hoc queries, these logs are typically loaded into a data warehouse (such as BigQuery or Athena).

GCE log export is delivered as a single unified stream. Filtering by event type, connector, user, or content is not supported at the export layer-all events flow to the configured destination. Downstream systems (BigQuery, Athena, Splunk, and similar) must apply filters after ingestion. Plan destination index sizing, retention, and license consumption accordingly.

Exports of these logs to customer-managed analytics destinations (for example, a BigQuery dataset in your own project) are **not** enabled by default. The exact project, dataset, and table names are set your organization during onboarding and feature enablement and may differ from the examples shown here.

If you would like to understand the options to consume these logs, or are unsure where your `glean-customer-event` logs are stored or exactly which project/dataset/table to query, contact your Glean Account team.

## Glean Customer Event Types[​](#glean-customer-event-types "Direct link to Glean Customer Event Types")

The table below summarizes the key event types captured in the Glean customer event log, along with a brief description and examples to help you understand what each event represents and how it can be used in your analytics.

| **Event Type** | **Description** | **Example Action Logged** |
| --- | --- | --- |
| SEARCH | Metadata about user search actions, including queries, filters, and surfaces. | A user types a search query in the Glean New Tab Page. |
| SEARCH\_CLICK | Captures clicks on search results. | A user clicks the second result on the full-page web app. |
| SEARCH\_FEEDBACK | User-submitted feedback on the quality or helpfulness of search results. | A user rates search results as 3/5 and leaves a comment. |
| AUTOCOMPLETE | Logs interactions with autocomplete suggestions while typing. | Autocomplete suggestions appear as a user types "onboard…". |
| CHAT | Represents a message sent to Glean. | A user sends a question on New Tab Page. |
| CHAT\_CITATIONS | Lists source documents referenced in the AI response to a chat. | AI cites a Google Doc and a Confluence page in response. |
| CHAT\_CITATION\_CLICK | Logs when a user clicks on a cited source in a chat response. | A user clicks on the linked Google Doc cited by the AI. |
| CHAT\_FEEDBACK | Captures feedback left by users on a chat message or assistant response. | A user downvotes a Glean reply and adds a comment. |
| AI\_ANSWER | Logs the AI-generated response returned for a search query.  
  
**Note:** Starting July 2025, AI Answers are now available in Workflow runs instead. See the [AI Answer Analysis query](/administration/gce-logs/data-dictionary-examples#search-quality--performance) for how to query both event types. | The AI generates a short answer summarizing multiple docs. |
| AI\_ANSWER\_VOTE | Tracks upvotes/downvotes on AI-generated answers. | A user upvotes an AI answer in a search result panel. |
| AI\_SUMMARY | Records when an AI summary is generated. | A user requests a summary of a long Slack thread. |
| AI\_SUMMARY\_VOTE | Captures user votes on AI-generated summaries. | A user clicks thumbs-down on a doc summary. |
| SHORTCUT | Logs use of Glean shortcuts (e.g., go/alias). | A user visits go/standups which redirects to a calendar. |
| CLIENT\_EVENT | Frontend interactions like button clicks, page loads, and other UI activity. | A user clicks "See more" on a suggested docs carousel. |
| WORKFLOW\_RUN | A single invocation of a Workflow, the underlying execution unit for Agent and Glean requests. | A user runs an Agent. |
| LLM\_CALL | Logs LLM (Large Language Model) API calls made by Glean, including token usage, model information, provider details, audio usage, and request dimensions. | An AI workflow makes a call to GPT-4 consuming 1000 input tokens. |
| MCP\_USAGE | Logs MCP tool usage, including the tool, server, client application, authentication method, status, and duration. | An agent calls a built-in MCP search tool. |
| WORKFLOW\_CONVERSATION | Captures the full conversation history within a workflow run, including all messages exchanged between the user and agent. | Records all user and agent messages in a workflow session. |
| WORKFLOW | Detailed logs providing execution details for a Workflow. *DEPRECATED as of 2025-06-13: use WORKFLOW\_RUN events instead.* | A user initiates a content review workflow. |
| GLEAN\_BOT\_ACTIVITY | Background actions or proactive behaviors by Glean bot, such as reminders or nudges. | The Gleanbot nudges a user to follow up on an unread file. |
| PRODUCT\_SNAPSHOT | This event type contains once-daily snapshots (not event logs) of entities in Glean, across seven types: USER, WORKFLOW, WORKFLOW\_STEP, SUBSCRIPTION, ACTION\_PACK, ACTION, and ACTION\_INSTANCE. Each snapshot captures the state of the object at a point in time and is useful for understanding historical configuration and metadata for users, workflows, and tools. | Captures the attributes of users, eg: departmentID, startdate, etc. |
