---
url: "https://docs.glean.com/connectors/native/quip/"
canonical: "https://docs.glean.com/connectors/native/quip/"
title: "Quip"
description: "Index Quip documents, spreadsheets, and optional folders in Glean using the Quip Admin API, OAuth 2.0, and Salesforce-backed setup."
fetched_at: "2026-09-01T13:29:39.425Z"
---
On this page

Quip treats documents and messages as threads. The Glean Quip connector indexes threads Glean can reach through the Admin API so your organization can search documents, spreadsheets, and (optionally) folders in Glean.

## Supported features and limitations[​](#supported-features-and-limitations "Direct link to Supported features and limitations")

Indexing depends on what your Quip tenant exposes through the **Quip Admin API** and your Salesforce contract (for example Events).

### Supported objects[​](#supported-objects "Direct link to Supported objects")

-   **Documents** (threads of type `document`)
-   **Spreadsheets** (threads of type `spreadsheet`)
-   **Folders** (only when folder support is enabled)

### Supported behavior[​](#supported-behavior "Direct link to Supported behavior")

-   List threads (documents and spreadsheets) via the Quip Admin API
-   Read thread body and metadata (title, author, created and updated times, permissions)
-   Read folder metadata and hierarchy when folder indexing is on
-   Read document- and folder-level sharing for permission-aware behavior in Glean
-   **Activity and events** only if you license the Quip Events API add-on from Salesforce (not part of the default setup)

### Limitations[​](#limitations "Direct link to Limitations")

-   Chat rooms, thread comments, and tasks are not ingested
-   Folders are off by default; turning them on can require extra configuration
-   Only data available through the **Quip Admin API** is indexed; personal tokens from `quip.com/dev/token` are not supported
-   Default Admin API rate limit is **100 requests per minute** per user (Salesforce can raise it on request)
-   Near-real-time activity requires the Salesforce add-on for the Activities API

## Requirements[​](#requirements "Direct link to Requirements")

You need Admin API access, OAuth credentials, the right Quip admin roles, and Glean admin access.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   **Quip Admin API** enabled for your org (off by default—request it from Salesforce)
-   Access to a live Quip tenant and **company admin** privileges
-   Ability to create and rotate **OAuth 2.0** client credentials for the integration
-   (Optional) A higher Admin API rate limit for large orgs

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   **Client ID** and **Client secret** from your Quip Admin API OAuth app
-   **Access token** and **refresh token** with `ADMIN_READ` and `USER_READ`
-   The integration user must appear on the **Admin API users** list in Quip with the admin API management permission (that permission is hidden until Admin API is enabled)
-   Your Quip **company ID** (from the Quip admin console)
-   Your Quip **instance hostname** (for example `yourcompany.quip.com`)
-   A **dedicated Quip user** (service-style account) used only for Glean—strongly recommended

### Before you connect[​](#before-you-connect "Direct link to Before you connect")

-   Ask Salesforce/Quip support to enable the **Quip Admin API**
-   (Optional) Ask support to raise the per-user limit toward **500 requests per minute** (default is 100)
-   In Quip, create an OAuth application named **Glean** with `ADMIN_READ` and `USER_READ`
-   In the Quip admin console, copy the **company ID** and confirm the **instance hostname**
-   Add the integration user to **Admin API users** with the required permissions
-   (Optional) Purchase the **Quip Events API** add-on if you need activity or event ingestion

## Configuration and setup[​](#configuration-and-setup "Direct link to Configuration and setup")

Work is split between **Quip** (API access, OAuth app, IDs) and the Glean **Admin console** (fields, authorize).

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Quip company admin access
-   Glean admin access to configure connectors
-   Admin API enabled and OAuth values ready (see [Before you connect](#before-you-connect))

### Enable the Quip Admin API[​](#enable-the-quip-admin-api "Direct link to Enable the Quip Admin API")

1.  Confirm the Admin API is allowed for your org. If it is not on yet, follow Salesforce/Quip support guidance—see [Quip Admin API requirements](https://quip.com/dev/admin/documentation/current#section/Requirements). When you request enablement, ask to raise the per-user rate limit to **500 requests per minute** if you expect a large corpus (default is **100**).
2.  As a sanity check, call the [`/users/list`](https://quip.com/dev/admin/documentation/current#operation/listUsersAtCompany) endpoint with admin credentials.

### Add Quip identifiers in Glean[​](#add-quip-identifiers-in-glean "Direct link to Add Quip identifiers in Glean")

1.  As an admin in Quip, open **Admin console** → **Settings** → **Site settings** → **Site profile** and copy the **company ID** into the matching field in Glean.
2.  Enter the **Quip instance name** (subdomain only). For example, if you use `https://acme.quip.com`, enter `acme`.

### Generate a Quip API key and authorize Glean[​](#generate-a-quip-api-key-and-authorize-glean "Direct link to Generate a Quip API key and authorize Glean")

1.  In Quip, go to **Admin console** → **Settings** → **Integrations** → **New API key**. Enable only **`ADMIN_READ`** and **`USER_READ`**.
2.  In Glean, paste the **Client ID** and **Client secret** from that key into the connector fields.
3.  In Glean, click **Authorize** and complete the flow from the link you are given.

For authentication details, see [Quip automation API authentication](https://quip.com/dev/automation/documentation/current#tag/Authentication).
