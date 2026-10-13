---
url: "https://docs.glean.com/connectors/native/sharepoint/about"
canonical: "https://docs.glean.com/connectors/native/sharepoint/about"
title: "SharePoint overview"
description: "Connect Glean to Microsoft SharePoint for indexed search, real-time data fetching, and agentic actions."
fetched_at: "2026-10-13T08:50:15.160Z"
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

For indexed content details, including supported site-list item types and crawl limitations, see [What gets indexed](/connectors/native/sharepoint/set-up-indexing-connector#what-gets-indexed).

## Which capabilities do you need?[​](#which-capabilities-do-you-need "Direct link to Which capabilities do you need?")

Use the comparison below to see what each capability contributes to search, ranking, and agent behavior.

| What you get | Indexed connector | Real-time search | Read and write tools |
| --- | --- | --- | --- |
| Coverage | Org-wide: everything crawled is searchable by anyone with permission | Per-user: only content the querying user can access | — |
| Freshness | Near real-time (webhook-driven updates) | Always live (fetched at query time) | — |
| AI ranking (activity signals) | ✓ Full ranking | ✗ Not available | — |
| Fetch unindexed content by URL (for example, sharing links) | ✗ (only documents already in the index) | ✓ (fetched live, even if never indexed) | — |
| Agents read and summarize documents | ✓ | ✓ | Through read tools |
| Analyze all rows in a SharePoint List | — | — | ✓ |
| Agents can move, update, or share files | — | — | ✓ |
| Content stored in Glean's index | Yes (crawled and indexed) | No (nothing stored) | No |
| Separate app registration | No (inherits Microsoft 365) | No (inherits Microsoft 365) | Only for custom OAuth |
| Separate tool configuration | No | No | Included with [New setup](/connectors/native/sharepoint/new-setup); manual with [Previous setup](/connectors/native/sharepoint/setup) |
| Best for | Broad, ranked, everyday search | Volatile or sensitive content kept current and unindexed | Analyzing list data and managing files |

## Set up SharePoint[​](#set-up-sharepoint "Direct link to Set up SharePoint")

-   **[Choose your setup](/connectors/native/sharepoint/choose-your-setup):** Start with this page to identify which of Glean's two setup paths applies to you, which depends on when SharePoint was connected to your deployment.
-   **[New setup](/connectors/native/sharepoint/new-setup):** Follow this path if you are connecting SharePoint for the first time. The new setup connects SharePoint and configures indexing on a single page in the **Admin console**.
-   **[Previous setup](/connectors/native/sharepoint/setup):** Follow this path if SharePoint was already connected to your deployment before the new setup was introduced. Those connectors continue to work, and there is no migration to run.
-   **[Set up the indexing connector](/connectors/native/sharepoint/set-up-indexing-connector):** This page covers indexing in detail. It describes the permissions the connector requires, what Glean crawls from your SharePoint sites, pages, lists, and document libraries, and how to scope the crawl.
-   **[Real-time search](/connectors/native/sharepoint/real-time-access):** Real-time search fetches content live from SharePoint at query time, which suits content that must always be current or that you would rather not store in Glean's index.
-   **[Use SharePoint in Glean](/connectors/native/sharepoint/across-glean#analyze-all-rows-in-a-sharepoint-list):** Learn how to filter, count, sum, and compare values across all rows in a SharePoint List.
-   **[Read and write tools](/tools/connector/microsoft-365):** SharePoint tools let Glean Assistant and agents analyze lists, read site pages, and manage document library files.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Glean reads all user access permissions from SharePoint and enforces them at query time, so users only see results they have access to. For details, see [permission enforcement](/connectors/native/sharepoint/security/permissions) and the [activity signals](/connectors/native/sharepoint/security/api#activity-endpoints) used for ranking. All authentication uses certificate-based application permissions with admin consent; no delegated user privileges are used for indexing.
