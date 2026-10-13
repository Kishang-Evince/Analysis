---
url: "https://docs.glean.com/connectors/native/sharepoint/across-glean"
canonical: "https://docs.glean.com/connectors/native/sharepoint/across-glean"
title: "SharePoint across Glean"
description: "Where your connected SharePoint content shows up in Glean, and how permission scoping works across every surface."
fetched_at: "2026-10-13T08:50:15.139Z"
---
On this page

Connecting SharePoint makes its content available in search, Glean Assistant answers, agent workflows, and tools. This page explains where that content appears and how existing SharePoint permissions apply in each experience.

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

### Tools







](/tools/connector/microsoft-365)

## Search[​](#search "Direct link to Search")

SharePoint pages, Office documents, PDFs, and list items become first-class search results, ranked alongside every other source you connect. Because Glean understands activity signals (who authored, edited, and engaged with a document), the most relevant and authoritative SharePoint content rises to the top instead of relying on keyword matching alone.

Users can narrow to SharePoint with the `app:sharepoint` filter, and results respect site and library structure so a result links back to its original location in SharePoint.

## Assistant[​](#assistant "Direct link to Assistant")

Glean Assistant uses your SharePoint content as grounding for its answers. When someone asks a question that your SharePoint pages or documents can answer, Assistant retrieves the relevant passages, synthesizes a response, and cites the underlying documents so the user can verify the source.

Assistant draws on both indexed content and, when [real-time search](/connectors/native/sharepoint/real-time-access) is enabled, content fetched live at query time, so answers can reflect documents created moments ago.

## Agents[​](#agents "Direct link to Agents")

Agents read and summarize SharePoint documents as steps in automated workflows. An agent might pull the latest version of a policy page, identify the sections that changed, and route a summary to the right team, all while honoring the permissions of the user the agent runs on behalf of. See [Glean Agents](/agents/introduction) for how to build these workflows.

## Analyze all rows in a SharePoint List[​](#analyze-all-rows-in-a-sharepoint-list "Direct link to Analyze all rows in a SharePoint List")

You can ask Glean to filter, count, sum, or compare values across all rows in a SharePoint List. Glean reads the list when you submit the request, including results that span multiple pages.

Glean doesn't add the complete list as a separate document to its index. You don't need to enable real-time search for this analysis.

### Before you begin[​](#before-you-begin "Direct link to Before you begin")

Your Glean admin must configure SharePoint and enable **Microsoft SharePoint Extension Tools**. If your organization uses [New setup](/connectors/native/sharepoint/new-setup), Glean configures these tools during SharePoint setup. If your connector uses [Previous setup](/connectors/native/sharepoint/setup), your admin must add the tools from **Admin console → Platform → Tools**.

The first time a user runs a SharePoint tool, Glean prompts them to connect Microsoft 365. The tools use that user's existing SharePoint permissions. See [Microsoft 365 tools and extension tools setup](/administration/tools/setup-tools/m365-tools-setup) for configuration and OAuth instructions.

### Ask a question in Glean[​](#ask-a-question-in-glean "Direct link to Ask a question in Glean")

1.  Open the SharePoint List.
2.  Copy the web address from your browser. The address usually ends in `/Lists/<list-name>/AllItems.aspx`.
3.  Paste the web address into Glean and ask a question. For example:
    -   `How many open items are assigned to each owner?`
    -   `Sum the story points by sprint.`
    -   `Show items due this month, grouped by status.`

### Use a list in an Auto mode agent[​](#use-a-list-in-an-auto-mode-agent "Direct link to Use a list in an Auto mode agent")

Confirm that your admin enabled **Microsoft SharePoint Extension Tools** for Agents.

1.  In **Agent builder**, go to **Skills**, select the add button, and then select **Use existing skill**.
2.  In **Add existing skill**, search for `sharepoint_analyze_lists` and add it to the agent.
3.  In the agent instructions or input, include the SharePoint List web address and describe the analysis.

See [Create agents with Auto mode](/agents/auto-mode-agent) for more agent setup instructions.

SharePoint List analysis can read, filter, and summarize list items, but it can't create or update them. Use other SharePoint tools to create or update list items, manage document library files, or read SharePoint site pages.

## Use SharePoint tools[​](#use-sharepoint-tools "Direct link to Use SharePoint tools")

SharePoint tools let Glean Assistant and agents read list rows and site pages, manage document library files, and create or update list items. The tools use the signed-in user's SharePoint permissions. See [Microsoft 365 tools](/tools/connector/microsoft-365) for the available tools.

## Next steps[​](#next-steps "Direct link to Next steps")

[

### Set up the connector







](/connectors/native/sharepoint/set-up-indexing-connector)[

### Set up SharePoint tools







](/administration/tools/setup-tools/m365-tools-setup)[

### Add real-time search







](/connectors/native/sharepoint/real-time-access)
