---
url: "https://docs.glean.com/connectors/native/veeva-vault/about"
canonical: "https://docs.glean.com/connectors/native/veeva-vault/about"
title: "Veeva Vault overview"
description: "Learn how the Veeva Vault connector works and how to configure it for Glean."
fetched_at: "2026-09-01T13:29:45.976Z"
---
On this page

Use the Veeva Vault connector to index Veeva Vault quality documents in Glean.

For an overview of the Veeva Vault connector and its benefits, see the [Veeva Vault integration page](https://www.glean.com/connectors/veeva).

To connect the connector, see [Setup](/connectors/native/veeva-vault/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

-   Indexes Veeva Vault quality documents and their associated permissions.
-   Lets you control crawl scope by configuring allowed document types.
-   Stores searchable metadata such as document type, subtype, classification, and status.
-   Preserves additional queryable Vault fields and surfaces them as searchable custom fields when they are available in your Vault configuration.
-   Opens each result in the corresponding Veeva Vault document version URL.
-   Supports Dynamic Access Control pattern so you can further restrict what the Glean integration user can see. See [Configure Dynamic Access Control for Glean access](/connectors/native/veeva-vault/setup#step-5-configure-dynamic-access-control-for-glean-access).

## What Glean crawls[​](#what-glean-crawls "Direct link to What Glean crawls")

Glean indexes Veeva Vault quality documents. To support indexing and access control, the connector syncs related users, groups, auto-managed groups, document property metadata, lifecycle definitions, document role assignments, and document deletions.

You can configure allowed document types to restrict which documents are included in the crawl. The connector reads document property metadata before the crawl starts to include queryable metadata fields and resolve document structure correctly.

## How crawl and sync work[​](#how-crawl-and-sync-work "Direct link to How crawl and sync work")

After the initial indexing run, Glean updates content and permissions periodically.

The connector uses separate crawl scopes for:

-   users
-   groups
-   auto-managed groups
-   document property metadata
-   documents
-   deletions

The documents crawl depends on the document property metadata crawl.

Before crawling documents, the connector reads lifecycle definitions to identify the steady-state statuses for each lifecycle and the lifecycle-state permission rules that affect document visibility.

For documents in scope, Glean fetches document metadata first, then fetches document role assignments for those document IDs, and then exports and downloads the document renditions used for indexing.

During incremental syncs, Glean fetches documents modified since the last crawl. If a previously indexed document no longer matches a steady-state status for its lifecycle, Glean removes it during a later incremental update.

The connector also runs a separate deletions crawl to remove documents that were deleted in Veeva Vault.

## Permissions[​](#permissions "Direct link to Permissions")

Glean preserves Veeva Vault permissions for indexed documents.

To build document access, Glean combines:

-   the users and groups assigned through Veeva document role assignments
-   the roles that have document view access in the document's current lifecycle state

A user or group is granted access in Glean only if its assigned document role is allowed to view the document in that lifecycle state.

## Limitations[​](#limitations "Direct link to Limitations")

-   The current connector scope is Veeva Vault quality documents.
-   Glean indexes only documents whose current status is a steady-state status for that document's lifecycle.
-   Documents that move out of a steady-state status are removed during later incremental syncs.
