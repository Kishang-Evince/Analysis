---
url: "https://docs.glean.com/connectors/native/looker/connector"
canonical: "https://docs.glean.com/connectors/native/looker/connector"
title: "Set up Looker indexing"
description: "Set up the Looker connector to index permission-aware saved content and optional Model and Explore metadata in Glean."
fetched_at: "2026-10-13T08:50:02.450Z"
---
On this page

The Looker connector is the discovery layer for Glean. It indexes permission-aware metadata from Looker so users can find governed content in Glean Search and Assistant.

The connector does not index warehouse rows or execute live analytics queries. To answer questions about current Looker data, set up [Looker in Assistant](/connectors/native/looker/assistant) after configuring indexing.

## Supported scope[​](#supported-scope "Direct link to Supported scope")

The connector supports hosted Looker instances that expose the Looker API. Customer-hosted or on-premises Looker instances are not supported.

### Saved content[​](#saved-content "Direct link to Saved content")

The connector indexes the following saved-content types:

-   **Looks:** Title, description, folder, creator, update information, usage counts, model identifier when available, and a link to the Look in Looker
-   **User dashboards:** Title, description, folder, creator, update information, dashboard element text, and a link to the dashboard in Looker
-   **LookML dashboards:** Title, description, folder or built-in location when available, dashboard element text, model identifier when available, and a link to the dashboard in Looker

Dashboard element text can include visualization titles, title cards, subtitles, body text, notes, and text or descriptions from linked Looks.

### Optional semantic metadata[​](#optional-semantic-metadata "Direct link to Optional semantic metadata")

When semantic indexing is enabled for the Looker connector, Glean indexes a limited set of semantic metadata:

-   **Models:** Model name and label
-   **Explores:** Model name and label, Explore name and label, description, and group label

Glean publishes only visible Explores whose effective LookML definition has no required access grants. Hidden, gated, or unclassifiable Explores are omitted. Semantic documents are permission-aware and are intended to route users to the correct Looker Model or Explore; they are not a copy of the Looker semantic layer.

## Requirements[​](#requirements "Direct link to Requirements")

Before you configure the connector, confirm that you have:

-   A supported, hosted Looker instance with the Looker API available
-   A Looker account for Glean with the Admin role, or with the [non-Admin access](#non-admin-access) below
-   An API3 client ID and client secret for that account

### Non-Admin access[​](#non-admin-access "Direct link to Non-Admin access")

An Admin account indexes all content. A non-Admin account indexes only content in folders that it can view, and needs:

-   A role with the **All** model set and the `see_users`, `access_data`, `see_looks`, `see_user_dashboards`, and `see_lookml_dashboards` permissions. For semantic indexing, also add `explore` and `see_lookml`.
-   **View** access to **Shared** and to each folder with customized access, including personal folders and folders created later. Grant access in **Admin** > **Content Access**.

## Set up the connector[​](#set-up-the-connector "Direct link to Set up the connector")

### 1\. Identify the Looker instance name[​](#1-identify-the-looker-instance-qualifier "Direct link to 1. Identify the Looker instance name")

For `.looker.com` instances, enter the part of the hostname before `.looker.com` in the connector's **Instance name** field. For `.looker.app` instances, enter the full hostname. These examples show both formats:

-   If the Looker URL is `https://acme.looker.com`, enter `acme`.
-   If the Looker URL is `https://acme.cloud.looker.com`, enter `acme.cloud`.
-   If the Looker URL is `https://acme.looker.app/browse`, enter `acme.looker.app`.

Do not include `https://`, a port, a path, or a query string. Existing `.looker.com` connections don't need changes.

The managed Looker MCP server uses the full hostname rather than a `.looker.com` qualifier. See [Looker in Assistant](/connectors/native/looker/assistant).

### 2\. Generate Looker API3 credentials[​](#2-generate-looker-api3-credentials "Direct link to 2. Generate Looker API3 credentials")

For more information about generating API credentials, see [Looker API authentication](https://cloud.google.com/looker/docs/api-auth).

The credential steps depend on the type of account that Glean uses:

**API-only service account:**

1.  Sign in to your Looker instance as an administrator.
2.  Open the **Admin** panel, go to **Users**, and open the **Service Accounts** tab.
3.  Select **Add Service Accounts**, enter a name, and assign the role from [Requirements](#requirements).
4.  Open the service account, create an API3 key, then copy the **Client ID** and **Client Secret**.

**Standard user:**

1.  Ask a Looker administrator to enable API credential management for your user on the **Admin** panel’s **Users** page.
2.  Open your **Account** page and go to **API Keys**.
3.  Create or use an API3 key, then copy the **Client ID** and **Client Secret**.

Store the client secret securely. Glean uses the client credentials to obtain and refresh a short-lived bearer token for connector API requests.

### 3\. Configure indexing in Glean[​](#3-configure-indexing-in-glean "Direct link to 3. Configure indexing in Glean")

important

Use the Looker API3 credentials from the previous step, not the OAuth client credentials used for [Looker in Assistant](/connectors/native/looker/assistant).

1.  In Glean, navigate to **Admin console** > **Connectors** > **Add connector**.
2.  Select **Looker**.
3.  Enter the following values in the setup form:
    -   **Connector name**: An organization-visible name for this Looker indexing connection, such as `Acme Looker`.
    -   **Instance name**: The qualifier before `.looker.com`, such as `acme.cloud`, or the full `.looker.app` hostname, such as `acme.looker.app`. Do not include `https://`, a port, a path, or a query string.
    -   **API Client ID**: The **Client ID** from the Looker API3 key.
    -   **API Client Secret**: The **Client Secret** from the same Looker API3 key.
4.  Select **Save**.
5.  Run or wait for the initial full crawl, then verify that expected Looks and dashboards appear in Glean Search.

### 4\. Enable semantic indexing (optional)[​](#4-enable-semantic-indexing-optional "Direct link to 4. Enable semantic indexing (optional)")

Semantic indexing is optional and is not required for saved-content indexing or the managed Looker MCP connection. It is rollout-controlled, so the setting may not appear in every deployment. If semantic indexing is not available in your connector configuration, contact [Glean Support](https://support.glean.com) or your Glean representative to confirm availability.

To build the semantic index, the indexing credential must be able to read Looker Models and list and read the LookML project files required for each Model and its included files. Saved-content indexing does not use these project-file requests.

1.  Confirm that **ModelSet-aware identity crawling** is enabled for the Looker connector.
2.  Enable **semantic indexing** for the connector.
3.  **Save** the configuration and wait for the next successful [semantic full crawl](#crawling-and-freshness).
4.  Search for a known [Model or Explore](/connectors/native/looker/overview#semantic-metadata) to verify publication.

Glean does not publish semantic documents from a partial or failed snapshot. The semantic crawl runs after the Looker identity full crawl, but this dependency does not independently verify that identity data is complete or current. Review the identity crawl status before relying on semantic permissions.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

For saved Looks and dashboards, Glean applies Looker permissions in two layers:

1.  **Content access:** Looker returns the users permitted to access a content item through its content metadata.
2.  **Role and ModelSet access:** Glean evaluates the user’s Looker roles, permission sets, and ModelSets. Relevant permissions include `see_looks`, `see_user_dashboards`, and `see_lookml_dashboards`.

A user must satisfy both layers to see a permissioned saved-content result in Glean. Looker administrators are retained as an explicit fallback audience.

Public Looks are treated as public content by the connector. Do not mark a Look as public unless its data and link are intended for public access.

For semantic documents, Glean uses a separate Model query-access audience based on the Looker role permissions `access_data` and `explore` and the role’s ModelSet. Explores with effective `required_access_grants` are not indexed; Glean does not attempt to evaluate user-attribute-derived access grants during semantic crawling.

Indexed visibility does not grant live query access. When Assistant uses the managed Looker MCP server, Looker authorizes the request as the user who connected their Looker account.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

-   Saved Looks and dashboards use periodic full crawls.
-   Semantic Models and Explores use a separate semantic full crawl when semantic indexing is enabled.
-   Incremental and activity crawls are not implemented for Looker.
-   Webhook\-based updates are not used.
-   Content, permission, and semantic-index changes appear after the relevant successful crawl and indexing pipeline complete.

## Limitations[​](#limitations "Direct link to Limitations")

-   Customer-hosted or on-premises Looker is not supported.
-   The connector indexes metadata, not warehouse rows, query results, or raw LookML.
-   Explore fields, measures, dimensions, filters, and parameters are retrieved live by the MCP integration rather than indexed as semantic documents.
-   Hidden, gated, or unclassifiable Explores are excluded from semantic indexing.
-   Redlist/greenlist filters, custom object selection, and lookback-period configuration are not available for the connector.
-   The connector does not create, update, delete, publish, or otherwise modify Looker content.
