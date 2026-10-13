---
url: "https://docs.glean.com/connectors/native/powerbi/assistant"
canonical: "https://docs.glean.com/connectors/native/powerbi/assistant"
title: "Power BI in Assistant"
description: "Connect Microsoft Fabric IQ MCP so users can ask natural-language questions about Power BI data in Glean Assistant."
fetched_at: "2026-10-13T08:50:11.197Z"
---
On this page

Power BI in Assistant allows users to ask natural-language questions about Power BI reports and current data in governed semantic models. [Power BI indexing](/connectors/native/powerbi/connector) supplies discovery and routing context, while Microsoft Fabric IQ MCP supplies live schema and query results.

## How it works[​](#how-it-works "Direct link to How it works")

1.  Glean uses indexed Power BI assets to identify a relevant report, dashboard, workspace, or semantic model.
2.  Assistant retrieves report metadata or semantic-model schema when it needs more context.
3.  Assistant generates Data Analysis Expressions (DAX) and executes them against the selected semantic model through Fabric IQ MCP.
4.  Power BI evaluates the requesting user’s access, including row-level security, at query time.
5.  Assistant explains the result and can link back to the related Power BI asset.

Live query results are not added to the Power BI connector index.

## Requirements[​](#requirements "Direct link to Requirements")

Power BI setup in Glean has two parts. First, [set up Power BI indexing](/connectors/native/powerbi/connector) in the Microsoft 365 suite setup. Then, in the same Power BI setup, open **Connect tools** to configure the delegated OAuth app for live Assistant queries.

Before you connect Power BI to Assistant, confirm the following additional requirements:

-   A tenant whose home region supports all Fabric workloads. Fabric IQ MCP is not available in Power BI-only regions or sovereign clouds.
-   Permission to create a single-tenant Microsoft Entra app registration.
-   A client secret for the delegated OAuth app.
-   Access to each Power BI report or semantic model that the user should query.
-   Users who will query Power BI must be able to authorize the delegated OAuth app with their own Microsoft identity.

## Configure the delegated OAuth app[​](#configure-the-delegated-oauth-app "Direct link to Configure the delegated OAuth app")

1.  Create a second [Microsoft Entra app registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app). Do not reuse the [connector service principal app](/connectors/native/powerbi/connector#1-create-the-connector-service-principal-app).
2.  In the [Microsoft Entra admin center](https://entra.microsoft.com/), open **App registrations** > **New registration**. On the **Register an application** page, enter these values:
    -   **Name**: `Glean Fabric IQ MCP`
    -   **Supported account types**: Accounts in this organizational directory only (single tenant)
    -   **Redirect URI**: Leave blank for now. You will add the Web redirect URI after Glean displays it.
3.  In the app registration, open **API permissions** > **Add a permission**, select **Power BI Service**, choose **Delegated permissions**, and add:
    -   `Item.Read.All`
    -   `Item.Execute.All`
    -   `Dataset.Read.All`
4.  In **API permissions** > **Add a permission**, select **Microsoft Graph**, choose **Delegated permissions**, and add:
    -   `offline_access`
5.  If your tenant’s consent policy prevents users from consenting to these permissions, use your organization’s admin approval workflow. These permissions do not require administrator consent by default.
6.  Open **Certificates & secrets** > **Client secrets** > **New client secret** and create a secret. Copy the secret’s **Value** immediately and keep it with the app’s **Application (client) ID** for [Connect tools in Glean](#connect-tools-in-glean).

## Connect tools in Glean[​](#connect-tools-in-glean "Direct link to Connect tools in Glean")

After configuring the delegated OAuth app in Microsoft Entra ID, return to Glean to connect it:

1.  Open the Microsoft 365 suite setup and select **Power BI**.
2.  Open **Connect tools**. This step is available after **Set up indexing** is complete.
3.  For **Network access**, keep **Public endpoint** unless your Microsoft Fabric organization has Private Link enabled. If it does, select **Private Link**.
4.  Enter the delegated OAuth app’s **Application (client) ID** and **Client secret**.
5.  Copy the **Redirect URI** shown in Glean.
6.  Return to the app registration in Microsoft Entra ID. Open **Authentication** > **Add a platform** > **Web**, enter the Redirect URI from Glean, and save the configuration.
7.  Confirm that the delegated permissions listed in Glean match the permissions in the app registration.
8.  Select **Connect** and complete the Microsoft authorization flow.
9.  Review the setup and save the tools configuration.

The redirect URI is deployment-specific. Always copy the current value shown in Glean instead of using an example from another deployment.

## Available Fabric IQ MCP tools[​](#available-fabric-iq-mcp-tools "Direct link to Available Fabric IQ MCP tools")

Glean exposes the following read and query tools from Fabric IQ MCP for live Assistant workflows. For Microsoft’s setup and tool documentation, see [Connect to Fabric IQ MCP](https://learn.microsoft.com/en-us/fabric/iq/connectors/fabric-iq-mcp).

| Tool | What it does |
| --- | --- |
| `DiscoverArtifacts` | Searches for Power BI reports and semantic models by name. |
| `ResolveFabricItem` | Resolves the URL of a supported Microsoft Fabric item for use by other tools. |
| `GetReportMetadata` | Retrieves metadata for a Power BI report. |
| `GetSemanticModelSchema` | Retrieves schema information for a semantic model. |
| `ValueSearch` | Searches a semantic model for specific stored values when available. |
| `ExecuteQuery` | Runs DAX against one semantic model and returns current results for the authenticated user. |

Fabric IQ MCP replaces Microsoft’s earlier [Power BI MCP consumption endpoint (preview)](https://learn.microsoft.com/en-us/power-bi/developer/mcp/remote-mcp-server-get-started) for this integration. Fabric IQ adds `DiscoverArtifacts`, `ResolveFabricItem`, and `ValueSearch`; retains `GetReportMetadata`, `GetSemanticModelSchema`, and `ExecuteQuery`; and does not expose the preview endpoint’s `GenerateQuery` tool. Glean generates DAX using indexed Power BI context and the live metadata returned by Fabric IQ, then calls `ExecuteQuery`.

## Manage Fabric IQ MCP tool access in Glean[​](#manage-fabric-iq-mcp-tool-access-in-glean "Direct link to Manage Fabric IQ MCP tool access in Glean")

Glean admins can control who can see and invoke the Fabric IQ MCP tools separately from Power BI permissions. Glean access settings do not grant access to Power BI data; Fabric IQ still evaluates each user’s delegated permissions and row-level security at query time.

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

## Generate DAX queries[​](#generate-dax-queries "Direct link to Generate DAX queries")

This section applies to live Assistant questions, not Power BI indexing. To answer a question with current data, Assistant uses indexed Power BI context with Fabric IQ MCP metadata to generate a [Data Analysis Expressions (DAX)](https://learn.microsoft.com/en-us/dax/) query. It then calls `ExecuteQuery` to run the DAX and return current results for the authenticated user. This flow does not require Power BI Copilot.

Assistant should prefer existing measures and the governed semantic model behind a report rather than attempting to calculate answers from dashboard labels or indexed metadata alone.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Search visibility and live query access are separate controls:

-   Glean’s index controls whether a user can discover a Power BI object in Search.
-   Power BI evaluates the user’s delegated access when Assistant runs a live query.
-   The user must be able to access the target report or semantic model. Fabric IQ MCP does not require a workspace role or Build permission on the semantic model.
-   Power BI row-level security continues to apply at runtime for delegated user queries.
-   The connector service principal handles indexing and does not provide the user’s live query permissions.

Glean uses Fabric IQ MCP for read and query operations. It does not modify Power BI reports, dashboards, workspaces, or semantic models.
