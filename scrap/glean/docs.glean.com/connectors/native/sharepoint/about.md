---
url: "https://docs.glean.com/connectors/native/sharepoint/about"
canonical: "https://docs.glean.com/connectors/native/sharepoint/about"
title: "SharePoint overview"
description: "Connect Glean to Microsoft SharePoint for indexed search, real-time data fetching, and agentic actions."
fetched_at: "2026-09-01T13:29:40.569Z"
---
On this page

Glean connects to Microsoft SharePoint for indexed and real-time search, scoped to each user's permissions. All content access operates under the shared [Microsoft 365](/connectors/native/microsoft365/) parent connector app registration. Client secrets are not supported for SharePoint or OneDrive. Microsoft retired Azure ACS on April 2, 2026, so certificate authentication is the only supported method.

Part of the Microsoft 365 connector

SharePoint is a child connector of the [Microsoft 365](/connectors/native/microsoft365/) parent connector, which provides shared authentication and identity crawling. Set up Microsoft 365 first; SharePoint then inherits its credentials (client ID, tenant ID, and certificate) and needs only SharePoint-specific configuration.

## Capabilities[​](#capabilities "Direct link to Capabilities")

Glean connects to SharePoint once, through the shared Microsoft 365 app registration, and that single connection provides three capabilities: indexed search, real-time search, and read and write tools. The [new setup](/connectors/native/sharepoint/new-setup) configures all three in one pass, because indexing and real-time search are both turned on when you connect and tools are set up in the same flow. With the [previous setup](/connectors/native/sharepoint/setup), indexing is configured first and an administrator enables real-time search separately. Real-time search and tools each require the individual user to authorize their own SharePoint account before they take effect for that user.

[

### Indexed connector







](/connectors/native/sharepoint/set-up-indexing-connector)[

### Real-time search







](/connectors/native/sharepoint/real-time-access)[

### Read and write tools







](/tools/connector/microsoft-365)

## Which capabilities do you need?[​](#which-capabilities-do-you-need "Direct link to Which capabilities do you need?")

Use the comparison below to see what each capability contributes to search, ranking, and agent behavior.

| What you get | Indexed connector | Real-time search | Read and write tools |
| --- | --- | --- | --- |
| Coverage | Org-wide: everything crawled is searchable by anyone with permission | Per-user: only content the querying user can access | - |
| Freshness | Near real-time (webhook-driven updates) | Always live (fetched at query time) | - |
| AI ranking (activity signals) | ✓ Full ranking | ✗ Not available | - |
| Fetch unindexed content by URL (for example, sharing links) | ✗ (only documents already in the index) | ✓ (fetched live, even if never indexed) | - |
| Agents read and summarize documents | ✓ | ✓ | Through read tools |
| Agents can move, update, or share files | - | - | ✓ |
| Content stored in Glean's index | Yes (crawled and indexed) | No (nothing stored) | No |
| Separate app registration | No (inherits Microsoft 365) | No (inherits Microsoft 365) | Only for custom OAuth |
| Separate tool configuration | No | No | Yes (Admin console → Platform → Tools) |
| Best for | Broad, ranked, everyday search | Volatile or sensitive content kept current and unindexed | Agentic file management |

## Set up SharePoint[​](#set-up-sharepoint "Direct link to Set up SharePoint")

-   **[Choose your setup](/connectors/native/sharepoint/choose-your-setup):** Start with this page to identify which of Glean's two setup paths applies to you, which depends on when SharePoint was connected to your deployment.
-   **[New setup](/connectors/native/sharepoint/new-setup):** Follow this path if you are connecting SharePoint for the first time. The new setup connects SharePoint and configures indexing on a single page in the **Admin console**.
-   **[Previous setup](/connectors/native/sharepoint/setup):** Follow this path if SharePoint was already connected to your deployment before the new setup was introduced. Those connectors continue to work, and there is no migration to run.
-   **[Set up the indexing connector](/connectors/native/sharepoint/set-up-indexing-connector):** This page covers indexing in detail. It describes the permissions the connector requires, what Glean crawls from your SharePoint sites, pages, lists, and document libraries, and how to scope the crawl.
-   **[Real-time search](/connectors/native/sharepoint/real-time-access):** Real-time search fetches content live from SharePoint at query time, which suits content that must always be current or that you would rather not store in Glean's index.
-   **[Read and write tools](/tools/connector/microsoft-365):** Read and write tools let Glean agents and Assistant act on SharePoint document libraries. You configure them separately from indexing.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Glean reads all user access permissions from SharePoint and enforces them at query time, so users only see results they have access to. For details, see [permission enforcement](/connectors/native/sharepoint/security/permissions) and the [activity signals](/connectors/native/sharepoint/security/api#activity-endpoints) used for ranking. All authentication uses certificate-based application permissions with admin consent; no delegated user privileges are used for indexing.
