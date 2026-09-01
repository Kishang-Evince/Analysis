---
url: "https://docs.glean.com/connectors/native/powerbi/assistant"
canonical: "https://docs.glean.com/connectors/native/powerbi/assistant"
title: "Power BI in Assistant"
description: "Connect the Microsoft Fabric Power BI MCP server so users can ask natural-language questions about Power BI data in Glean Assistant."
fetched_at: "2026-09-01T13:29:38.274Z"
---
On this page

Power BI in Assistant allows users to ask natural-language questions about Power BI reports and current data in governed semantic models. [Power BI indexing](/connectors/native/powerbi/connector) supplies discovery and routing context, while the Microsoft Fabric Power BI MCP server supplies live schema and query results.

## How it works[​](#how-it-works "Direct link to How it works")

1.  Glean uses indexed Power BI assets to identify a relevant report, dashboard, workspace, or semantic model.
2.  Assistant retrieves report metadata or semantic-model schema when it needs more context.
3.  Assistant generates and executes Data Analysis Expressions (DAX) for the selected semantic model through the Microsoft Fabric Power BI MCP server.
4.  Power BI evaluates the requesting user’s access, including row-level security, at query time.
5.  Assistant explains the result and can link back to the related Power BI asset.

Live query results are not added to the Power BI connector index.

## Requirements[​](#requirements "Direct link to Requirements")

Power BI setup in Glean has two parts. First, [set up Power BI indexing](/connectors/native/powerbi/connector) in the Microsoft 365 suite setup. Then, in the same Power BI setup, open **Connect tools** to configure the delegated OAuth app for live Assistant queries.

Before you connect Power BI to Assistant, confirm the following additional requirements:

-   Power BI or Fabric administrator access to enable the required tenant settings.
-   Microsoft Entra administrator access to create a delegated OAuth app.
-   A client secret for the delegated OAuth app.
-   Build permission on each semantic model that users should query.
-   A semantic model in a standard workspace. Semantic models in **My Workspace** are not supported for this flow.
-   Users who will query Power BI must be able to authorize the delegated OAuth app with their own Microsoft identity.

### Power BI and Fabric settings required for setup[​](#power-bi-and-fabric-settings-required-for-setup "Direct link to Power BI and Fabric settings required for setup")

1.  In the Power BI admin portal, open **Tenant settings** > **Integration settings**.
2.  Enable **Users can use the Power BI Model Context Protocol server endpoint (preview)**.
3.  Enable **Semantic Model Execute Queries REST API**. This setting enables users to run Data Analysis Expressions (DAX) queries through the Power BI Representational State Transfer (REST) API.
4.  Apply the settings to the entire organization or to the security groups that should use Power BI tools, according to your organization’s policy.

The MCP endpoint setting allows the integration to use the remote Power BI MCP server. The Semantic Model Execute Queries REST API setting allows Assistant to run live DAX queries. For more information, see [Fabric integration tenant settings](https://learn.microsoft.com/en-us/fabric/admin/service-admin-portal-integration).

## Configure the delegated OAuth app[​](#configure-the-delegated-oauth-app "Direct link to Configure the delegated OAuth app")

1.  Create a second [Microsoft Entra app registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app). Do not reuse the [connector service principal app](/connectors/native/powerbi/connector#1-create-the-connector-service-principal-app).
2.  In the [Microsoft Entra admin center](https://entra.microsoft.com/), open **App registrations** > **New registration**. On the **Register an application** page, enter these values:
    -   **Name**: `Glean Power BI MCP`
    -   **Supported account types**: Accounts in this organizational directory only (single tenant)
    -   **Redirect URI**: Leave blank for now. You will add the Web redirect URI after Glean displays it.
3.  In the app registration, open **API permissions** > **Add a permission**, select **Power BI Service**, choose **Delegated permissions**, and add:
    -   `Dataset.Read.All`
    -   `Report.Read.All`
    -   `Workspace.Read.All`
4.  In **API permissions** > **Add a permission**, select **Microsoft Graph**, choose **Delegated permissions**, and add:
    -   `offline_access`
5.  In **API permissions**, select **Grant admin consent for** your organization if your tenant requires it. Then open **Certificates & secrets** > **Client secrets** > **New client secret** and create a secret. Copy the secret’s **Value** immediately and keep it with the app’s **Application (client) ID** for [Connect tools in Glean](#connect-tools-in-glean).

## Connect tools in Glean[​](#connect-tools-in-glean "Direct link to Connect tools in Glean")

After configuring the delegated OAuth app in Microsoft Entra ID, return to Glean to connect it:

1.  Open the Microsoft 365 suite setup and select **Power BI**.
2.  Open **Connect tools**. This step is available after **Set up indexing** is complete.
3.  Enter the delegated OAuth app’s **Application (client) ID** and **Client secret**.
4.  Copy the **Redirect URI** shown in Glean.
5.  Return to the app registration in Microsoft Entra ID. Open **Authentication** > **Add a platform** > **Web**, enter the Redirect URI from Glean, and save the configuration.
6.  Confirm that the delegated permissions listed in Glean match the permissions in the app registration.
7.  Select **Connect** and complete the Microsoft authorization flow.
8.  Review the setup and save the tools configuration.

The redirect URI is deployment-specific. Always copy the current value shown in Glean instead of using an example from another deployment.

## Available Power BI MCP tools[​](#available-power-bi-mcp-tools "Direct link to Available Power BI MCP tools")

Glean exposes the following read and query tools from the remote Power BI MCP server for live Assistant workflows. For Microsoft’s setup flow, see [Get started with the remote Power BI MCP server](https://learn.microsoft.com/en-us/power-bi/developer/mcp/remote-mcp-server-get-started). For details about each tool, including its required Power BI permissions, see [Power BI MCP server tools and required permissions](https://learn.microsoft.com/en-us/power-bi/developer/mcp/remote-mcp-server-tools).

| Tool | What it does |
| --- | --- |
| **Get Report Metadata** | Retrieves report pages, visuals, filters, and linked semantic-model context when available. |
| **Get Semantic Model Schema** | Retrieves tables, columns, measures, relationships, hierarchies, and other model metadata. |
| **Generate Query** | Uses Power BI Copilot to generate DAX from a natural-language question and schema context. |
| **Execute Query** | Runs DAX for a semantic model and returns current results for the authenticated user. |

## Manage Power BI MCP tool access in Glean[​](#manage-power-bi-mcp-tool-access-in-glean "Direct link to Manage Power BI MCP tool access in Glean")

Glean admins can control who can see and invoke the Power BI MCP tools separately from Power BI permissions. Glean access settings do not grant access to Power BI data; Power BI still evaluates each user’s delegated permissions, Build permission, and row-level security at query time.

### Set visibility for the tool pack[​](#set-visibility-for-the-tool-pack "Direct link to Set visibility for the tool pack")

To control which users can use the Power BI tools in Glean:

1.  In the Glean **Admin console**, navigate to **Tools** and open the Power BI tool pack.
2.  Open the **Configuration** tab and select **Edit settings** under **Enable tools**.
3.  Choose the surfaces where the tools should be available, such as **Chat**, **Agents**, or **Glean MCP Server**.
4.  Under **Access**, choose **All teammates**, **Specific departments**, or **Specific teammates**, then select **Save**.

For more information, see [Manage tool access](/administration/tools/managing-tools/tool-visibility-scoping).

### Set access for individual tools[​](#set-access-for-individual-tools "Direct link to Set access for individual tools")

For tool packs that support per-tool controls, a Glean admin can open the Glean MCP server that contains the Power BI tools, select **Add tools**, open the **External Tools** tab, and select **Tool advanced settings**. The settings group tools as **Read tools** or **Write tools**. Use each tool’s **Access** menu to choose **All teammates**, **Specific departments**, or **Specific teammates**.

The Power BI tools documented here are read and query tools only. They appear under **Read tools** and do not modify Power BI reports, dashboards, workspaces, or semantic models. For details, see [Managing tool access](/administration/tools/managing-tools/managing-role-based-access-tools).

## Generate DAX queries with Power BI Copilot[​](#generate-dax-queries-with-power-bi-copilot "Direct link to Generate DAX queries with Power BI Copilot")

This section applies to live Assistant questions, not Power BI indexing. To answer a question with current data, Assistant uses the Power BI MCP server to generate and run a [Data Analysis Expressions (DAX)](https://learn.microsoft.com/en-us/dax/) query against a semantic model:

-   **Generate Query** asks Power BI Copilot to turn the user’s question and semantic-model context into DAX.
-   **Execute Query** runs the DAX query and returns current results for the authenticated user.

`Generate Query` is optional. It requires the applicable Power BI Copilot license or capacity, which may not be available in every organization. When `Generate Query` is unavailable or not enabled, Assistant can use the semantic-model schema to generate DAX and then call **Execute Query** directly.

Assistant should prefer existing measures and the governed semantic model behind a report rather than attempting to calculate answers from dashboard labels or indexed metadata alone.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Search visibility and live query access are separate controls:

-   Glean’s index controls whether a user can discover a Power BI object in Search.
-   Power BI evaluates the user’s delegated access when Assistant runs a live query.
-   The user needs Build permission on the target semantic model for query execution.
-   Power BI row-level security continues to apply at runtime for delegated user queries.
-   The connector service principal handles indexing and does not provide the user’s live query permissions.

Glean uses the Power BI MCP server for read and query operations. It does not modify Power BI reports, dashboards, workspaces, or semantic models.
