---
url: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-gemini-chat/"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-gemini-chat/"
title: "Glean in Gemini chat"
description: "Connect Glean to Google Gemini Enterprise so users can ask questions grounded in company knowledge from Glean."
fetched_at: "2026-09-01T13:29:10.996Z"
---
On this page

This admin guide covers connecting **Glean** to **Google Gemini Enterprise** using the Glean Model Context Protocol (MCP) server, so end users can ask work questions in Gemini and get answers grounded in company knowledge from Glean.

Glean in Gemini connects your organization’s permission-aware enterprise knowledge to Gemini Enterprise through a custom MCP server data store. Once connected, Gemini can search, read, and synthesize across the systems Glean already indexes.

![Gemini chat answering a work question with grounded citations from Glean](/img/administration/platform/embed-integrate/glean-in-gemini-chat/intro.png)

With the recommended default tool set, this integration is read-only - it can search and synthesize company knowledge but does not create, update, or delete records in connected systems. If you enable write-capable tools on the selected MCP server path, Gemini can surface those actions as well.

## What users get[​](#what-users-get "Direct link to What users get")

-   Ask Gemini questions that need company context and get answers grounded in Glean.
-   Receive answers with citations to the underlying internal sources.
-   Use the Glean tools enabled on the selected MCP server path as Gemini actions.

## How it works[​](#how-it-works "Direct link to How it works")

Glean exposes a Model Context Protocol (MCP) server. You register that server in Gemini Enterprise as a custom MCP server data connector. When a user chats with Gemini, Gemini calls Glean's MCP server, authenticates the user via OAuth, and uses the returned context to answer.

```
Gemini chat ──▶ Custom MCP Server connector ──▶ Glean MCP server                  (OAuth per user)                 (permission-aware)
```

## Components[​](#components "Direct link to Components")

-   **Glean MCP server:** Exposes Glean's search and knowledge tools over a standard protocol that Gemini can call. The default path (`/mcp/default`) loads 12 actions: `search`, `read_document`, `chat`, `code_search`, `employee_search`, `user_activity`, `memory`, `gmail_search`, `meeting_lookup`, `knowledge_graph_query`, `knowledge_graph_schema`, and `memory_schema`.
-   **Glean OAuth client:** Lets Gemini authenticate each user to Glean, so results are always returned with that user's permissions enforced.
-   **Gemini data store and app:** Registers the Glean server inside Gemini Enterprise and surfaces it to end users through a branded web app.

## Core capabilities[​](#core-capabilities "Direct link to Core capabilities")

| Capability | What it does | Visibility |
| --- | --- | --- |
| **Grounded answers** | Gemini answers work questions using company knowledge retrieved from Glean. | Each answer is generated for the asking user and reflects their Glean permissions. |
| **Citations** | Answers include links to the underlying internal sources in Glean-connected systems. | Citations are personalized - each user only sees sources they can already access. |
| **Tool invocation** | Glean tools enabled on the selected MCP server path are exposed as Gemini actions (for example, `search`, `read_document`, `chat`, `code_search`, `employee_search`, `user_activity`, and `memory`). | Tools run on behalf of the signed-in user and respect Glean permissions. |
| **Permission-aware authentication** | Each user authorizes Glean via OAuth from inside Gemini. | Each user authorizes individually; every response respects that user's Glean permissions. |

## Get started[​](#get-started "Direct link to Get started")

[

### Set up Glean in Gemini chat

Admins: gather prerequisites, prepare Glean, and create the custom MCP server data store in Gemini Enterprise.

Start setup





](/administration/platform/embedded-integrations/glean-in-gemini-chat/prerequisites)[

### Use Glean in Gemini chat

End users: authorize Glean and ask work questions in Gemini chat. Share this link with your users once setup is complete.

Share with your users





](/administration/platform/embedded-integrations/glean-in-gemini-chat/get-started-user)

## Who is involved[​](#who-is-involved "Direct link to Who is involved")

This setup involves two admin personas and one end-user persona.

| Persona | Responsibilities |
| --- | --- |
| **Glean admin** | Provide the Glean MCP server URL, confirm the required MCP tools are enabled, and create the Glean OAuth client. |
| **Google Cloud or Gemini Enterprise admin** | Create the custom MCP server data store, enable actions, connect the data store to a Gemini app, and publish the app. |
| **End user** | Authorize Glean the first time they use the app, then ask questions in Gemini chat. |

## Requirements[​](#requirements "Direct link to Requirements")

-   Glean admin access - to locate the MCP server URL and create an OAuth client.
-   Google Cloud or Gemini Enterprise admin access - to create the data store, enable tools, and publish the app.
-   A Google Cloud project - Gemini Enterprise resources are created inside a project you own.
-   Your Glean backend URL (`<tenant_id>-be.glean.com`) - used to build the server, authorization, and token URLs. Find it in **[About Glean](https://app.glean.com/admin/about-glean)** under **Server instance (QE)**.

For the full list, including details you will collect during setup, see [Prerequisites](/administration/platform/embedded-integrations/glean-in-gemini-chat/prerequisites).
