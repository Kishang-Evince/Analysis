---
url: "https://docs.glean.com/connectors/native/sharepoint/across-glean"
canonical: "https://docs.glean.com/connectors/native/sharepoint/across-glean"
title: "SharePoint across Glean"
description: "Where your connected SharePoint content shows up in Glean, and how permission scoping works across every surface."
fetched_at: "2026-09-01T13:29:40.554Z"
---
On this page

Connecting SharePoint does more than add a search source. It makes your SharePoint knowledge available everywhere Glean works: in search, in Assistant answers, inside agent workflows, and as actions your tools can take. This page explains where that content shows up and how access stays under control on every surface.

Permissions follow the user, everywhere

Access is always scoped to each user's existing SharePoint permissions. A user only ever sees the sites, pages, and files they could already open in SharePoint, whether the content reaches them through search, an Assistant answer, or an agent. Connecting SharePoint never widens who can see what. For the full model, see [permission design](/connectors/native/sharepoint/security/permission-design).

## What SharePoint powers in Glean[​](#what-sharepoint-powers-in-glean "Direct link to What SharePoint powers in Glean")

Once connected, SharePoint content powers experiences across Glean:

[

### Glean Search







](/user-guide/search/how-to-search-in-glean)[

### Glean Assistant







](/user-guide/assistant/glean-chat)[

### Glean Agents







](/agents/introduction)[

### Tools (actions)







](/tools/connector/microsoft-365)

## Search[​](#search "Direct link to Search")

SharePoint pages, Office documents, PDFs, and list items become first-class search results, ranked alongside every other source you connect. Because Glean understands activity signals (who authored, edited, and engaged with a document), the most relevant and authoritative SharePoint content rises to the top instead of relying on keyword matching alone.

Users can narrow to SharePoint with the `app:sharepoint` filter, and results respect site and library structure so a result links back to its original location in SharePoint.

## Assistant[​](#assistant "Direct link to Assistant")

Glean Assistant uses your SharePoint content as grounding for its answers. When someone asks a question that your SharePoint pages or documents can answer, Assistant retrieves the relevant passages, synthesizes a response, and cites the underlying documents so the user can verify the source.

Assistant draws on both indexed content and, when [real-time search](/connectors/native/sharepoint/real-time-access) is enabled, content fetched live at query time, so answers can reflect documents created moments ago.

## Agents[​](#agents "Direct link to Agents")

Agents read and summarize SharePoint documents as steps in automated workflows. An agent might pull the latest version of a policy page, extract the sections that changed, and route a summary to the right team, all while honoring the permissions of the user the agent runs on behalf of. See [agents](/agents/introduction) for how to build these workflows.

## Tools (actions)[​](#tools-actions "Direct link to Tools (actions)")

Beyond reading content, Glean can let agents and Assistant take actions against Microsoft 365. These actions run on the [Microsoft 365 MCP server](/tools/connector/microsoft-365) and are configured separately from the indexing connector. Use them when you want Glean not just to surface SharePoint knowledge, but to act on it.

## Next steps[​](#next-steps "Direct link to Next steps")

[

### Set up the connector







](/connectors/native/sharepoint/set-up-indexing-connector)[

### Add real-time search







](/connectors/native/sharepoint/real-time-access)
