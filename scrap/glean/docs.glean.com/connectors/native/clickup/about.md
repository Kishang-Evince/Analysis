---
url: "https://docs.glean.com/connectors/native/clickup/about"
canonical: "https://docs.glean.com/connectors/native/clickup/about"
title: "ClickUp overview"
description: "Learn what the Glean ClickUp connector retrieves through ClickUp's MCP server, how it enforces ClickUp permissions, and which objects are in scope."
fetched_at: "2026-09-01T13:29:24.190Z"
---
On this page

note

**Beta:** This page contains beta features and may change.

The ClickUp connector uses ClickUp’s Model Context Protocol (MCP) server to provide live, permission-aware access to your work management data. Instead of using a crawler or maintaining an indexed corpus, Glean Search, Glean, and agents query ClickUp content directly.

To connect ClickUp to Glean, see [Setup](/connectors/native/clickup/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

-   **Real-time data access:** This live-mode MCP connector queries ClickUp directly, providing the most up-to-date results without the need for crawl schedules or index management. Because results are fetched at request time, they always reflect the current state of your ClickUp workspace.
-   **Federated search & fetch:** Glean executes live searches against the ClickUp MCP server to retrieve tasks, docs, and other assets. When deep context is required-such as for Glean answers or rich previews-Glean fetches full task details, including comments and document page content, on demand.
-   **Core module coverage:** The connector is optimized for ClickUp’s primary work management objects, providing deep support for the hierarchy of Spaces, Folders, and Lists, as well as Tasks and Docs.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The connector focuses on core ClickUp work management objects and exposes them through live (federated) queries:

-   Tasks (including standard task fields and custom fields).
-   ClickUp Docs (multi‑page documents with rich text content).
-   Additional asset types that may appear in results when available through the MCP server, such as whiteboards, dashboards, attachments, and chat messages.

## Scope[​](#scope "Direct link to Scope")

The ClickUp connector returns tasks and docs from the ClickUp workspaces that users have authorized in Glean, along with key metadata that helps users interpret search results.

### Tasks[​](#tasks "Direct link to Tasks")

Task results can include task content, comments, and available metadata.

In Glean, task results surface a clear title, a snippet from the description or comments, and key metadata such as status, assignees, list and space, priority, due date, and last updated time.

### Docs[​](#docs "Direct link to Docs")

Doc results can include document content and available metadata.

In Glean, doc results surface a title, a content snippet, and key metadata such as owner, location, and last updated time.

## Use case examples[​](#use-case-examples "Direct link to Use case examples")

The ClickUp connector enables leaders in Product, Engineering, PMO, and Customer Success to access real-time project data. Here are examples of how different teams can query ClickUp directly from Glean:

-   **Project & program management**
    
    -   "Find all tasks related to the ‘Q4 Marketing Launch’."
    -   "Show my team’s tasks due this week and summarize their current status."
    -   "Summarize the latest progress on Feature Y based on task descriptions and comments."
-   **Engineering & incident response**
    
    -   "Find all tasks related to Incident X across all product spaces."
    -   "Show me all tasks assigned to Jane Doe that are currently in progress."
    -   "What is the status of the tasks blocked this week in the Development folder?"
-   **Knowledge & operations**
    
    -   "Summarize the ‘Onboarding’ page from the ‘Team Wiki’ Doc."
    -   "Find all tasks in the Roadmap space that were updated in the last 7 days."
    -   "Who is currently part of the Engineering team in ClickUp?"

## Permissions & security[​](#permissions--security "Direct link to Permissions & security")

### Permission model[​](#permission-model "Direct link to Permission model")

The connector mirrors ClickUp’s workspace‑based authorization model as exposed via MCP:

-   During OAuth, users grant access for specific ClickUp workspaces; the MCP server then enforces what objects each user can see based on their ClickUp role and membership in those workspaces.
-   Glean issues all MCP calls using the current user’s token, so results are permission‑aware: users cannot see ClickUp tasks or docs they would not be able to access directly in ClickUp.

### Data access model[​](#data-access-model "Direct link to Data access model")

-   All ClickUp data is retrieved on demand via the ClickUp MCP server URL `https://mcp.clickup.com/mcp` using the STREAMABLE\_HTTP transport.
-   The connector is designed as a live‑mode integration and does not maintain a separate ClickUp index or document processor in Glean; ClickUp appears in Search, Glean, and agents via federated search/fetch, not via a crawler.

Glean’s standard platform‑level security (encryption in transit and at rest, tenant isolation, and audit logging) continues to apply to any transient ClickUp content used to answer queries.

## See also[​](#see-also "Direct link to See also")

-   [ClickUp setup](/connectors/native/clickup/setup)
-   [ClickUp troubleshooting and FAQs](/connectors/native/clickup/troubleshooting)
