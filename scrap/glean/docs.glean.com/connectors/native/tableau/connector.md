---
url: "https://docs.glean.com/connectors/native/tableau/connector"
canonical: "https://docs.glean.com/connectors/native/tableau/connector"
title: "Tableau indexing"
description: "Set up Tableau indexing to make permission-aware workbooks and data source metadata discoverable in Glean, with folded view metadata where enabled."
fetched_at: "2026-09-01T13:29:45.004Z"
---
On this page

The Tableau connector indexes Tableau content into Glean for permission-aware search, so teams can discover relevant analytics assets without leaving Glean. The connector works with both Tableau Cloud (Online) and Tableau Server using the Tableau Server REST API.

Beta availability

The Tableau Connected App setup and Tableau in Assistant are currently beta features and aren't enabled by default. Contact your Glean representative or [Glean Support](https://support.glean.com) to confirm whether your deployment has access.

## Choose a setup method[​](#choose-a-setup-method "Direct link to Choose a setup method")

Tableau supports two authentication methods. In deployments using the current Tableau setup flow, new connector instances use Connected App credentials. PAT setup remains available for existing PAT-based connector instances or deployments that present the PAT setup form. Follow the page that matches your connector instance:

[

Beta

### Connected App setup

Configure indexing and Tableau in Assistant with Connected App credentials and per-user impersonation.







](/connectors/native/tableau/setup-connected-app)[

### Personal Access Token setup

Configure PAT-based indexing and per-user Tableau access. This method does not enable Tableau in Assistant.







](/connectors/native/tableau/setup-personal-access-token)

info

The Connected App setup is the current path for new Assistant-capable Tableau connector instances. Use the Personal Access Token setup for existing PAT-based connector instances or when your deployment presents the PAT setup form.

## Who completes each setup?[​](#who-completes-each-setup "Direct link to Who completes each setup?")

The Glean administrator completes the authentication method available for the Tableau connector instance. End users do not choose between Connected App and PAT during normal use; what they see depends on the method configured for their instance.

| User or admin | [Connected App setup](/connectors/native/tableau/setup-connected-app) | [Personal Access Token setup](/connectors/native/tableau/setup-personal-access-token) |
| --- | --- | --- |
| **Tableau and Glean admins** | Create the Connected App, enter its credentials in Glean, and complete the **Connect** step. | Create the admin PAT and enter its name and secret in the Tableau connector setup in Glean. |
| **End users** | No Tableau credential setup is required. Users can search indexed Tableau content and use [Tableau in Assistant](/connectors/native/tableau/assistant), subject to their Tableau permissions. | Each user must connect a personal Tableau PAT under **Your Settings** → **Apps** → **Tableau** to see permission-aware Tableau results. |
| **Assistant access** | Available after the admin completes the **Connect** step and enables the required tools. | Not available for PAT-based connector instances. |

## Supported features[​](#supported-features "Direct link to Supported features")

The connector enables central ingestion and permission-aware search across your Tableau site, including workbooks and data sources. When view folding is enabled, view metadata is added to the parent workbook. Permission enforcement depends on the authentication mode: Connected App instances use per-user sessions minted by Glean, while PAT-based instances use per-user Tableau PATs.

-   **Workbook indexing:** Crawls Tableau workbook metadata including name, description, project, owner, sheet count, and timestamps.
-   **Data source indexing:** Crawls published Tableau data source metadata including name, database name, type, owner, and connected workbook count.
-   **Per-user permission enforcement:** Glean evaluates each user's Tableau access. Connected App instances mint a Tableau session for the corresponding Tableau username; PAT-based instances use that user's Tableau Personal Access Token.
-   **Incremental crawls:** Supports incremental crawls using `updatedAt` timestamp filtering, fetching only content modified since the last crawl cycle. Runs approximately every **45 minutes** by default.
-   **Full crawls:** Periodic full crawls re-enumerate all workbooks and data sources. Runs approximately every **24 hours** by default.
-   **Webhook-driven updates:** Automatically registers webhooks in Tableau for workbook and data source create, update, and delete events, enabling near-real-time sync.
-   **Identity crawling:** Crawls Tableau users and site roles. Unlicensed users are crawled but marked as inactive. Admin users are grouped into a synthetic admin group with access to all content.
-   **Multiple instances:** Supports connecting multiple Tableau sites to a single Glean deployment.
-   **API usage:** Glean uses the [Tableau Server REST API](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm), with default version `3.23`, to ingest supported metadata.

## Content scope and supported objects[​](#content-scope-and-supported-objects "Direct link to Content scope and supported objects")

The connector indexes metadata for Tableau workbooks and data sources, along with user identity and site role information. When datasource metadata fetching is enabled, datasource schema metadata can also be added to the datasource document. When view folding is enabled, view metadata can be added to the parent workbook with per-view access controls. Raw dashboard visuals, thumbnails, workbook binaries, and underlying table rows are not indexed.

-   **Workbooks:** Workbook name, description, content URL, project, owner (name and email), sheet count, size, tags, `createdAt`, and `updatedAt`.
-   **Folded view metadata:** View names, content URLs, tags, and per-view access controls can be added to the parent workbook when view folding is enabled. This metadata does not create a separate indexed view document.
-   **Data sources:** Data source name, database name, content URL, type, published status, connected workbook count, project, owner (name and email), size, tags, `createdAt`, and `updatedAt`.
-   **Datasource schema metadata:** When enabled, datasource descriptions, tables, fields, field descriptions, and parameters.
-   **Users:** Email, full name, site role, auth setting, external auth user ID, last login, and active or inactive status.
-   **Groups:** A synthetic "AdminGroup" containing users with site roles: `ServerAdministrator`, `SiteAdministratorCreator`, or `SiteAdministratorExplorer`.

## API endpoints[​](#api-endpoints "Direct link to API endpoints")

Glean uses the [Tableau Server REST API](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm), with default version `3.23`. This API is used to authenticate, crawl content and identity data, and register webhooks for near-real-time updates. The same API is used for both Tableau Cloud and Tableau Server.

| Endpoint | Description |
| --- | --- |
| `POST /api/{version}/auth/signin` | Authenticate using PAT or Connected App JWT credentials |
| `GET /api/{version}/sites/{siteId}/users` | List all users on the site |
| `GET /api/{version}/sites/{siteId}/users/{userId}` | Get a specific user's details |
| `GET /api/{version}/sites/{siteId}/workbooks` | List all workbooks |
| `GET /api/{version}/sites/{siteId}/datasources` | List all data sources |
| `GET /api/{version}/sites/{siteId}/datasources/{datasourceId}` | Get a specific data source's details (used to fetch `webpageUrl`) |
| `GET /api/{version}/sites/{siteId}/views` | Fetch view metadata used for folding into parent workbooks |
| `GET /api/{version}/sites/{siteId}/webhooks` | List all registered webhooks |
| `POST /api/{version}/sites/{siteId}/webhooks` | Create a new webhook |

The default API version is `3.23`, the lowest version that supports all crawler and Assistant endpoints. Older versions may not support all configured operations.

## Webhook events[​](#webhook-events "Direct link to Webhook events")

Glean automatically registers webhooks in Tableau to capture workbook and data source create, update, and delete events in near-real-time.

Webhook events are:

| Event | Description |
| --- | --- |
| `WorkbookCreated` | A new workbook is published |
| `WorkbookUpdated` | An existing workbook is modified |
| `WorkbookDeleted` | A workbook is deleted |
| `DatasourceCreated` | A new data source is published |
| `DatasourceUpdated` | An existing data source is modified |
| `DatasourceDeleted` | A data source is deleted |

## Limitations[​](#limitations "Direct link to Limitations")

The connector indexes metadata rather than raw Tableau visualizations or table rows. Workbooks and data sources are supported as indexed documents. Folded view metadata and datasource schema metadata are available only when the corresponding deployment configuration is enabled.

-   Glean indexes **metadata** for workbooks and data sources. Depending on configuration, datasource descriptions, tables, fields, parameters, and folded view names, URLs, and tags can also be added to the relevant parent document.
-   Raw dashboard visuals, thumbnails, workbook binaries, and underlying table rows aren't indexed or rendered in Glean.
-   Folded view content is permission-aware and can affect the access granted to the parent workbook. It is not a replacement for live Tableau view data; use [Tableau in Assistant](/connectors/native/tableau/assistant) for live queries and view images.
-   Thumbnails and preview images aren't indexed.
-   The `fields=_all_` query parameter causes `500` errors on the `/datasources` and `/workbooks` endpoints, so specific field lists are used instead. This means some non-default fields may not be captured.
-   Users with the `Unlicensed` site role are crawled for ownership attribution but can't sign in to Tableau or authenticate in Glean.
-   The API version defaults to **3.23**. Older versions may not support all crawler and Assistant operations.
-   There are no greenlist (inclusion) or redlist (exclusion) filters. All workbooks and data sources accessible to the configured admin credentials are indexed. Folded view metadata follows the parent workbook.
-   In the PAT-based setup, per-user token refresh runs approximately every **10 minutes**. If a user's PAT expires or is revoked, their Tableau results stop appearing until they re-authenticate.

## Requirements[​](#requirements "Direct link to Requirements")

Review these requirements before setting up either Tableau indexing method:

### Shared requirements[​](#shared-requirements "Direct link to Shared requirements")

-   The authorizing Tableau user must have one of the following site roles: **Server Administrator**, **Site Administrator Creator**, or **Site Administrator Explorer**. These roles grant access to all content on the site.
-   The Glean administrator must have access to the **Admin console** with permission to manage connector settings.
-   Glean must be able to reach your Tableau instance domain over HTTPS at the REST API base URL (`https://<domain>/api/<version>/`).
-   The webhook base URL must be reachable by Tableau so it can deliver event notifications for workbook and data source changes.
-   The Tableau REST API version is configurable via `apiVersion` in the instance configuration. Glean paginates API responses at 100 items per page.
-   Both methods require the Tableau **site domain**, **site content URL** when applicable, and a **webhook base URL**. The setup pages explain where to enter these values in Glean.

### Glean-managed values[​](#glean-managed-values "Direct link to Glean-managed values")

The following values are generated and managed automatically by Glean. You don't need to provide them:

-   **Site credentials token:** a session token obtained when Glean signs in to Tableau. Glean refreshes it automatically.
-   **Site ID:** stored after the first successful authentication.
-   **Per-user credentials:** In the PAT-based setup, obtained for each authenticated user from their personal access token and refreshed on a configurable schedule. In the Connected App setup, Glean mints per-user sessions from the Connected App.

For setup-specific permissions and credentials, see [Set up using Connected App](/connectors/native/tableau/setup-connected-app) or [Set up using Personal Access Token](/connectors/native/tableau/setup-personal-access-token).

## Content visibility[​](#content-visibility "Direct link to Content visibility")

Content visibility is controlled by the authentication method:

-   **Connected App setup:** Glean mints a Tableau session for the corresponding Tableau username. Users see only content available to them in Tableau.
-   **Personal Access Token setup:** Each user provides their own Tableau PAT. Users see only content available to them in Tableau after they authenticate in Glean.
-   **Admin group:** Users with `ServerAdministrator`, `SiteAdministratorCreator`, or `SiteAdministratorExplorer` roles automatically have access to all indexed content.
-   **Content ownership:** Content owners always retain access to their own workbooks and data sources.

note

There are no per-workbook, per-data source, or per-project inclusion or exclusion filters available for the Tableau connector.

## See also[​](#see-also "Direct link to See also")

-   [Set up using Connected App](/connectors/native/tableau/setup-connected-app): configure the current indexing and Assistant-capable path
-   [Set up using Personal Access Token](/connectors/native/tableau/setup-personal-access-token): configure PAT-based indexing and per-user access
-   [Tableau in Assistant](/connectors/native/tableau/assistant): use live Tableau data in Glean Assistant
-   [Troubleshooting and FAQs](/connectors/native/tableau/troubleshooting): common issues and questions for Tableau in Glean
