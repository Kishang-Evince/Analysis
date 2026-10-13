---
url: "https://docs.glean.com/connectors/configure-tools-in-connector/config-tools-mcp-from-connector"
canonical: "https://docs.glean.com/connectors/configure-tools-in-connector/config-tools-mcp-from-connector"
title: "Set up tools and MCP integrations from Connectors"
description: "Choose and configure a catalog integration that provides data indexing, live tools, or both capabilities."
fetched_at: "2026-10-13T08:49:38.577Z"
---
On this page

The Connectors catalog is the starting point for integrations that provide indexed content, live tools, or both. Use this page when you want Glean to search an application's content, let Assistant or Agents work with the application in real time, or support both experiences.

**Data indexing** crawls permission-aware content and makes it searchable in Glean. **Tools** call the application when a user or agent makes a request. Tools can retrieve current data or perform actions, but they don't make the application's content searchable.

Glean deployments created on or after September 22, 2026, use **Connectors** to set up catalog-backed MCP integrations. For earlier deployments, check **Connectors** first. If the integration isn't listed there, use **Platform → Tools**. Existing configurations remain in their current setup flow and aren't moved automatically.

This page covers integrations available in **Admin console → Connectors → Add connector**. For a custom or unlisted remote MCP server, use [Connect remote MCP servers to Glean](/administration/tools/connect-remote-mcp-servers-to-glean) instead.

## Choose the setup path[​](#choose-the-setup-path "Direct link to Choose the setup path")

Start by searching for the application in the Connectors catalog:

A single application can have more than one catalog entry. For example, one entry might index content while another provides MCP tools. Choose the entry that matches the capability you need. The entries are not duplicates.

-   **Data indexing only:** The setup includes data configuration and does not include a **Tools** tab.
-   **Tools only:** The setup opens on the **Tools** tab. This integration does not crawl content.
-   **Data indexing and tools:** The setup includes both data configuration and a **Tools** tab.

If the integration isn't listed but you have its remote MCP server details, import it from **Admin console → Platform → Tools**. If you need to index content from an unlisted source, review [custom connectors](/connectors/custom/about) and [partner connectors](/connectors/partner/).

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

Make sure that:

-   You have administrator access to the Glean **Admin console**.
-   You can authorize the application or obtain the credentials requested during setup.
-   You completed any vendor-side prerequisites linked from the setup page.

Authentication varies by integration. The setup page identifies the required method and connection details.

## Set up a catalog integration[​](#set-up-a-catalog-integration "Direct link to Set up a catalog integration")

1.  In the Glean **Admin console**, go to **Connectors → Add connector**.
2.  Search for the application.
3.  Open the entry that provides the capability you need.
4.  Follow the setup instructions:
    -   For an indexing-only entry, configure the content, permissions, and crawl settings.
    -   For a tools-only entry, configure the connection from the **Tools** tab.
    -   For a combined entry, complete the data setup and then configure the **Tools** tab.
5.  Authenticate when prompted, then save the connector.

If Glean has not verified a vendor-provided MCP server, the setup page displays a compatibility notice. Follow any linked vendor instructions before you connect.

## Verify the connector[​](#verify-the-connector "Direct link to Verify the connector")

Return to the **Connectors** page and find the new row. Check each configured capability independently:

-   **Data indexing:** Confirm that setup or sync begins for a connector that indexes content. For a tools-only connector, Glean shows **Not available** because it doesn't index content.
-   **Tools:** Confirm that the status is **On**, then test a tool with an account that has the required source permissions. For an indexing-only connector, Glean shows **Not available** because it doesn't provide tools.
-   **User access:** Confirm that the connector is available to the intended users or test group.

For indexing phases and metrics, see [Sync progress](/connectors/connectors-monitoring).

## Manage an existing MCP configuration[​](#manage-an-existing-mcp-configuration "Direct link to Manage an existing MCP configuration")

Existing MCP configurations aren't moved automatically. Continue to manage a configuration from its current connector or from **Platform → Tools**. Don't create a duplicate connector only to move it to the catalog flow.

If meeting tools in an existing Zoom MCP connection fail with `401 Unauthorized`, contact Glean Support to confirm the appropriate update path before removing or replacing the connection. For connections created from the Zoom MCP template under **Platform → Tools** and still managed there, see [Upgrade Zoom MCP permissions](/administration/tools/connect-remote-mcp-servers-to-glean#upgrade-zoom-mcp-permissions).
