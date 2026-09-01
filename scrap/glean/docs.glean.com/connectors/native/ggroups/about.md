---
url: "https://docs.glean.com/connectors/native/ggroups/about"
canonical: "https://docs.glean.com/connectors/native/ggroups/about"
title: "Google Groups overview"
description: "Learn what the Glean Google Groups connector indexes, how it enforces Google Groups permissions, and how Google Vault exports work."
fetched_at: "2026-09-01T13:29:28.684Z"
---
On this page

Connect your Google Groups domain to Glean so you can search conversations from your Workspace groups. The connector uses Google Vault to export and index group conversations, then enforces Google Groups permissions at query time. Crawled data remains within your organization's GCP project.

Google Drive must already be connected before you set up Google Groups. For setup instructions, see [Setup](/connectors/native/ggroups/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

-   The connector captures and indexes conversations from Google Groups in the Google Workspace domain.
-   It enforces end-user permissions so users only see conversations they can access in Google Groups.
-   It keeps crawled data within the customer's GCP project.
-   It retrieves group settings and permissions through the Google Groups Settings API.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object type | Description |
| --- | --- |
| Google Groups | Mailing lists managed in Google Workspace. |
| Google Groups conversations | Message threads within a group. |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   Google Vault API for exporting Google Groups conversations.
-   Google Groups Settings API for retrieving group settings and permissions.
-   Google Cloud Storage API for reading content from generated Vault exports.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

Google Groups content is collected through Google Vault exports. Export operations are subject to Google Vault's organization-wide quotas and may share capacity with other Vault workflows. The connector uses the resulting exports to update the indexed corpus.

## Limitations[​](#limitations "Direct link to Limitations")

-   A Google Vault license is required to crawl Google Groups. Vault is included with some Workspace editions, including Business Plus, Enterprise, Enterprise Essentials for domain-verified organizations, Education editions, and G Suite Business.
-   Export operations may be delayed when organization-wide Vault quotas are heavily used.
-   Deleted groups or conversations may not be indexed if they are no longer present in Vault or if Google Workspace retention rules have purged them.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   The connector indexes messages and relevant metadata such as senders, subjects, timestamps, and permissions.
-   Original system permissions are maintained. Users only see conversations allowed by group membership and Google Groups sharing settings.
-   The authentication model uses service accounts with tightly scoped permissions.
-   Operations run within the customer's GCP project to support data residency.
-   No group conversation content indexed in Glean is shown to unauthorized users.

## See also[​](#see-also "Direct link to See also")

-   [Google Groups setup](/connectors/native/ggroups/setup)
