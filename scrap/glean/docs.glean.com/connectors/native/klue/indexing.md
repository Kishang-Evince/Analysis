---
url: "https://docs.glean.com/connectors/native/klue/indexing"
canonical: "https://docs.glean.com/connectors/native/klue/indexing"
title: "Klue indexing"
description: "What the Klue connector indexes, how it syncs and enforces permissions, and how to set it up."
fetched_at: "2026-09-01T13:29:33.756Z"
---
On this page

The Klue connector indexes your Klue cards and battlecards into Glean search, so people find competitive intelligence next to content from your other connected apps. Glean syncs users and groups through SCIM, so results stay permission-aware.

## Why connect Klue to Glean[​](#why-connect-klue-to-glean "Direct link to Why connect Klue to Glean")

-   Find Klue cards and battlecards from Glean search, next to content from your other connected apps.
-   Keep Klue's access controls intact by syncing users and groups through SCIM, so people see only the content they can already see in Klue.
-   Filter results using Klue metadata, including competitors, competitor groups, topics, and tags.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Card | A non-dynamic Klue card, including its title, body content, sources, and author. Dynamic cards are generated at view time and are not indexed. |
| Battlecard | Competitive content aggregated from member cards. Only non-dynamic battlecards visible to everyone are indexed. |

Glean attaches competitors, competitor groups, topics, and tags to these documents as metadata facets. Glean does not index these elements as standalone documents.

## Requirements[​](#requirements "Direct link to Requirements")

-   A Klue administrator account (required to generate the API key).

## API scopes[​](#api-scopes "Direct link to API scopes")

Glean connects to Klue with a single Admin API key. The key needs two scopes:

-   `content:read` grants access to your Klue cards and battlecards.
-   `scim:read` reads users and groups so Glean can apply Klue's document permissions.

Glean checks both scopes and its connection to Klue when you save the connector. If a check fails - for example, the key is invalid, is missing a required scope, or Glean cannot reach Klue - the connector does not save.

## Set up the connector[​](#set-up-the-connector "Direct link to Set up the connector")

### Generate an API key in Klue[​](#generate-an-api-key-in-klue "Direct link to Generate an API key in Klue")

1.  Sign in to Klue as an admin.
2.  Go to **Apps & Integrations** > **Manage API Keys**.
3.  Click **Create a new API key**.
4.  Give the key a description and set an expiration that matches your security policy.
5.  Grant both required scopes: `content:read` and `scim:read`.
6.  Copy the API key and store it somewhere secure.

### Enter the connection details in Glean[​](#enter-the-connection-details-in-glean "Direct link to Enter the connection details in Glean")

1.  In the Glean admin console, go to **Connectors** > **Add Connector** and select **Klue**.
2.  Paste the API key into the **API Key** field.
3.  Click **Save**. Glean verifies both content access and SCIM access before it finishes setup.

## Permissions[​](#permissions "Direct link to Permissions")

Glean uses the two API scopes to index Klue content and keep its permissions intact:

-   `content:read` reads the cards and battlecards that Glean indexes.
-   `scim:read` reads Klue users and groups so Glean knows who can access each document.

If the key is missing `scim:read`, Glean cannot read these identities and the connector cannot be set up.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

Glean runs both full and incremental crawls on a recurring schedule. Incremental crawls fetch only the cards and battlecards that changed since the last run. Full crawls re-index all content periodically to ensure completeness.

Glean also reads users and groups over SCIM to apply document permissions.
