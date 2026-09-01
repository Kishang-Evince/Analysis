---
url: "https://docs.glean.com/administration/tools/setup-tools/"
canonical: "https://docs.glean.com/administration/tools/setup-tools/"
title: "Set up tools"
description: "Browse tool setup guides so Glean Assistant and agents can work in your connected apps. Search by name or filter by category."
fetched_at: "2026-09-01T13:29:15.020Z"
---
On this page

Use this page to find the setup guide for the tool you want to enable in Glean.

**Tool setup depends on how and when your connector was deployed**

-   **Connectors deployed using the new setup flow on or after August 14, 2026:** Associated tools are enabled automatically during connector setup. No separate manual tool setup is required. The new setup flow is available for [Google Drive](https://docs.glean.com/connectors/native/gdrive/new-setup), [Google Calendar](https://docs.glean.com/connectors/native/gcal/new-setup), [Gmail](https://docs.glean.com/connectors/native/gmail/new-setup), [Microsoft 365](https://docs.glean.com/connectors/native/microsoft365/new-setup), [Outlook](https://docs.glean.com/connectors/native/outlook/new-setup), [SharePoint](https://docs.glean.com/connectors/native/sharepoint/new-setup), [OneDrive](https://docs.glean.com/connectors/native/onedrive/new-setup), [Salesforce](https://docs.glean.com/connectors/native/salesforce/new-setup), [Notion](https://docs.glean.com/connectors/native/notion/new-setup), [Slack](https://docs.glean.com/connectors/native/slack/setup/unified-setup), and [BigQuery](https://docs.glean.com/connectors/native/bigquery).
-   **Connectors deployed before August 14, 2026, or using the previous setup flow:** Follow the relevant guide below to deploy tools manually.

Choose a guide based on where the tool operates:

-   **By Glean** for built-in tools from Glean
-   **By connector** for tools tied to a connected app such as Jira or Salesforce
-   **Custom tools** for tools you build yourself or import from an MCP server

Search by name or filter by category, then open a guide to connect and configure the tool.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you set up a tool, make sure you have:

-   Access to the Glean Admin console so you can add and configure tools.
-   A connector for any tool that works with a specific application, such as Jira, Salesforce, or Google Workspace.
-   The authentication details required by the tool you want to enable, especially if the setup uses OAuth.

If you need to complete one of those steps first:

-   Go to the [Connectors hub](/connectors) to connect the underlying application.
-   See the [Tools overview](/administration/tools) to understand how tools differ from connectors and where tools can be used.
-   See the [Tools OAuth reference](/administration/tools/tools-oauth-reference) for supported authentication methods and OAuth requirements.

AllBy GleanBy connectorCustom tools

### By Glean

Tools Glean provides out of the box.

[

### Code Writer

Enable the Code Writer tool for code-generation workflows.







](/administration/tools/setup-tools/code-writer-tools-setup)[

### Web Search

Allow Glean to search the public web within answers.







](/administration/tools/setup-tools/web-search-tools-setup)[

### Create Redirect Tools

Build redirect write tools with the Redirect URL Builder template.







](/administration/tools/setup-tools/redirect-tools)

### By connector

Tools that act on content from a connected connector.

[

### Jira

Create, edit, comment on, and search Jira issues, including JSM.







](/administration/tools/setup-tools/jira-tools-setup)[

### Confluence

Search and act on Confluence pages and spaces.







](/administration/tools/setup-tools/confluence-tools-setup)[

### Google Workspace

Enable tools across Gmail, Drive, Docs, and Calendar.







](/administration/tools/setup-tools/google-tools-setup)[

### Microsoft 365

Set up Microsoft 365 tools and extension tools.







](/administration/tools/setup-tools/m365-tools-setup)[

### Salesforce

Set up Salesforce tools and extension tools for CRM records.







](/administration/tools/setup-tools/salesforce-tools-setup)[

### GitHub

Search code, issues, and pull requests across repositories.







](/administration/tools/setup-tools/github-tools-setup)[

### Zendesk

Search and act on Zendesk support tickets.







](/administration/tools/setup-tools/zendesk-tools-setup)[

### Snowflake

Query Snowflake data warehouses from Glean.







](/administration/tools/setup-tools/snowflake-tools-setup)[

### Databricks

Connect Databricks for data and analytics tools.







](/administration/tools/setup-tools/databricks-tools-setup)[

### Calendar search

Let Glean find and reason over calendar events.







](/administration/tools/setup-tools/calendar-search-tools-setup)

### Custom tools

Tools you build yourself.

[

### Build a custom tool

Create your own tools with Glean.Opens developers.glean.com







](https://developers.glean.com/guides/actions/create-actions)[

### Import from an MCP server

Import custom tools from a remote MCP server.







](/administration/tools/connect-remote-mcp-servers-to-glean)

## Next steps[​](#next-steps "Direct link to Next steps")

After you add and authenticate a tool, fine-tune how it behaves:

[

### Chat vs. Agents

Control which surfaces can access each tool.







](/administration/tools/managing-tools/tools-chat-vs-agents)[

### Per-tool enable/disable

Turn off specific risk-heavy operations such as delete or archive.







](/administration/tools/managing-tools/per-tool-enable-disable)[

### Tool visibility scoping

Restrict availability to specific users, teams, or departments.







](/administration/tools/managing-tools/tool-visibility-scoping)
