---
url: "https://docs.glean.com/connectors/native/powerbi/connector"
canonical: "https://docs.glean.com/connectors/native/powerbi/connector"
title: "Set up Power BI indexing"
description: "Set up the Power BI connector to index permission-aware metadata and definitions in Glean."
fetched_at: "2026-09-01T13:29:38.548Z"
---
On this page

The Power BI connector indexes metadata, definitions, and permissions so users can find governed Power BI content in Glean Search and Assistant.

The connector is the **discovery layer**. It does not index Power BI table rows or execute live queries. To ask questions about current data, set up [Power BI in Assistant](/connectors/native/powerbi/assistant) after completing the indexing setup.

## Supported scope[​](#supported-scope "Direct link to Supported scope")

The connector supports Power BI Service and Microsoft Fabric cloud content. It indexes these object types:

-   **Workspaces**: Workspace names, descriptions, links, and workspace-level access information.
-   **Reports**: Report metadata, pages, visual titles and text, visual types, fields or measures used by visuals, and linked semantic models where available.
-   **Semantic models**: Model metadata, tables, columns, measures, partitions, relationships, and other definition content where available. Power BI formerly called semantic models **datasets**.
-   **Dashboards**: Dashboard metadata and links to related reports or semantic models where available. Support is metadata-focused; rich report and semantic-model definitions provide the primary context for Assistant routing.

For indexing boundaries and unsupported content, see [Limitations](#limitations).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, confirm that you have:

-   A configured Microsoft 365 suite in Glean. Power BI inherits the tenant ID from the parent suite, so the Power BI setup page doesn't ask you to enter it.
-   Power BI or Fabric administrator access to update tenant settings.
-   Microsoft Entra administrator access to create an app registration and client secret.
-   Permission to grant the connector service principal, or the security group that contains it, Contributor access in each workspace that Glean should index.

Power BI users and groups come from the linked Microsoft 365 identity integration. Set up [Microsoft 365](/connectors/native/microsoft365/) before relying on group-based Power BI permissions.

## Set up the connector[​](#set-up-the-connector "Direct link to Set up the connector")

Power BI uses a service principal app for background crawling.

note

Create a separate delegated OAuth app when you set up [Power BI in Assistant](/connectors/native/powerbi/assistant). Do not reuse the connector service principal app.

### 1\. Create the connector service principal app[​](#1-create-the-connector-service-principal-app "Direct link to 1. Create the connector service principal app")

In the [Microsoft Entra admin center](https://entra.microsoft.com/), create an app registration with these values:

-   **Name**: `Glean Power BI Connector`
-   **Supported account types**: Accounts in this organizational directory only (single tenant)
-   **Redirect URI**: Leave blank

Create a client secret. Copy the **Application (client) ID** and secret **Value** for the Power BI connector setup in Glean.

Do not add delegated permissions to this app. The connector uses app-only client credentials.

### 2\. Allow the connector app to use Power BI admin APIs[​](#2-allow-the-connector-app-to-use-power-bi-admin-apis "Direct link to 2. Allow the connector app to use Power BI admin APIs")

1.  In **Microsoft Entra ID** > **Groups**, create or open the security group that you will use to scope the connector’s tenant settings and workspace access.
2.  Open **Members** > **Add members**, search for `Glean Power BI Connector`, and add the connector service principal app.
3.  Sign in to the [Power BI admin portal](https://app.powerbi.com/).
4.  Open **Tenant settings** > **Developer settings**.
5.  Enable **Service principals can call Fabric public APIs**. If your tenant uses the older label, enable **Allow service principals to use Power BI APIs** instead.
6.  If the setting applies only to specific security groups, add the same security group and select **Apply**.
7.  Open **Admin API settings**.
8.  Enable **Service principals can access read-only admin APIs**.
9.  If the setting applies only to specific security groups, add the same security group and select **Apply**.

The connector needs the read-only admin API setting for tenant-wide discovery and permission crawling.

### 3\. Grant workspace access[​](#3-grant-workspace-access "Direct link to 3. Grant workspace access")

Repeat these steps for every workspace that Glean should index:

1.  In Power BI, open the workspace.
2.  Select **Manage access** > **Add people or groups**.
3.  Add the `Glean Power BI Connector` service principal or the security group from the previous step.
4.  Assign the **Contributor** role.

Glean uses this access only for read, list, and definition operations. It does not create, update, delete, publish, or otherwise modify Power BI content.

Without workspace access, Glean may still index basic catalog metadata, but it cannot retrieve rich report or semantic-model definitions for that workspace.

### 4\. Configure the indexing step in Glean[​](#4-configure-the-indexing-step-in-glean "Direct link to 4. Configure the indexing step in Glean")

After completing the Microsoft Entra, tenant-setting, and workspace-access steps above, return to Glean:

1.  Open the Microsoft 365 suite setup and select **Power BI**.
2.  Enter an organization-visible name for the connector.
3.  In **Set up indexing**, enter the connector app’s **Application (client) ID** and **Client secret**.
4.  Select **Continue** to validate the configuration.
5.  Review the setup and save the indexing configuration.

Use the setup instructions shown in Glean for deployment-specific values. Do not substitute the connector app credentials for the delegated OAuth credentials used by Assistant.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Glean uses crawled Power BI permissions and linked Microsoft 365 identities to control indexed visibility.

-   Workspace roles provide baseline access to content in the workspace.
-   Direct user and group grants can provide access to individual reports, semantic models, or dashboards.
-   Organization-wide shares give organization-wide visibility.
-   Access entries that do not grant access are not treated as grants.

The indexed access controls determine who can discover a Power BI object in Glean. They do not guarantee that the user can run a live query for the underlying semantic model. Power BI performs a separate permission check when Assistant queries live data.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

The connector currently relies on periodic full crawls rather than incremental crawls based on Power BI timestamps. Changes to content or permissions appear in Glean after a successful crawl and indexing pipeline completes.

If you need current table values, use [Power BI in Assistant](/connectors/native/powerbi/assistant). Assistant retrieves live query results at answer time; those results are not part of connector indexing.

## Limitations[​](#limitations "Direct link to Limitations")

-   The connector indexes metadata and definitions, not Power BI table rows or fact data.
-   Exported report files and live query results are not part of connector indexing.
-   Dashboard indexing is metadata-focused; reports and semantic models provide the richer routing context.
-   Rich report and semantic-model definitions require Contributor access in the relevant workspaces.
-   Power BI Report Server (on-premises) is not supported.
-   Creating or modifying Power BI content from Glean is not supported.
-   Power BI content and permission changes may not appear until the next successful crawl.
