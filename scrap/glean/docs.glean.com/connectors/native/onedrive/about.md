---
url: "https://docs.glean.com/connectors/native/onedrive/about"
canonical: "https://docs.glean.com/connectors/native/onedrive/about"
title: "OneDrive overview"
description: "Connect Glean to Microsoft OneDrive for indexed search, real-time access, and read and write tools."
fetched_at: "2026-09-01T13:29:36.924Z"
---
On this page

Glean connects to Microsoft OneDrive in three ways, each serving a different use case. All content access runs under the shared [Microsoft 365](/connectors/native/microsoft365/) parent connector app registration. OneDrive doesn't support client secrets — certificate authentication is the only method.

Part of the Microsoft 365 connector

OneDrive is a child connector of the [Microsoft 365](/connectors/native/microsoft365/) parent connector, which provides shared authentication and identity crawling. Set up Microsoft 365 first. OneDrive then inherits its credentials (client ID, tenant ID, and certificate) and needs only OneDrive-specific configuration.

## Capabilities[​](#capabilities "Direct link to Capabilities")

Glean connects to OneDrive once, through the shared Microsoft 365 app registration, and that single connection provides three capabilities: indexed search, real-time access, and read and write tools. The [new setup](/connectors/native/onedrive/new-setup) configures all three in one pass, because indexing and real-time access are both turned on when you connect and tools are set up in the same flow. With the [previous setup](/connectors/native/onedrive/setup), indexing is configured first and an administrator enables real-time access separately. Real-time access and tools each require the individual user to authorize their own OneDrive account before they take effect for that user.

[

### Indexed connector







](/connectors/native/onedrive/setup)[

### Real-time access







](/connectors/native/onedrive/real-time-access)[

### Read and write tools







](/tools/connector/microsoft-365)

## Which capabilities do you need[​](#which-capabilities-do-you-need "Direct link to Which capabilities do you need")

Use the comparison below to see what each capability contributes to search, ranking, and agent behavior.

| What you get | Indexed connector | Real-time access | Read and write tools |
| --- | --- | --- | --- |
| Coverage | Org-wide: everything crawled is searchable by anyone with permission | Per-user: only content the querying user can access | – |
| Freshness | Near real-time (webhook-driven updates) | Always live (fetched at query time) | – |
| Fetch a specific document by URL | ✗ (only documents already in the index) | ✓ (fetched live, even if never indexed) | – |
| Agents can read and summarize documents | ✓ | ✓ | Through read tools |
| Agents can create, move, or share files | – | – | ✓ |
| Content stored in Glean's index | Yes (crawled and indexed) | No (nothing stored) | No |
| Separate app registration | No (inherits Microsoft 365) | No (inherits Microsoft 365) | Yes (separate setup) |
| Best for | Broad, ranked, everyday search | Volatile or sensitive content kept current | Agentic file management |

## Set up OneDrive[​](#set-up-onedrive "Direct link to Set up OneDrive")

-   **[Choose your setup](/connectors/native/onedrive/choose-your-setup):** Start with this page to identify which of Glean's two setup paths applies to you, which depends on when OneDrive was connected to your deployment.
-   **[New setup](/connectors/native/onedrive/new-setup):** Follow this path if you are connecting OneDrive for the first time. The new setup connects OneDrive and configures indexing on a single page in the **Admin console**.
-   **[Previous setup](/connectors/native/onedrive/setup):** Follow this path if OneDrive was already connected to your deployment before the new setup was introduced. Those connectors continue to work, and there is no migration to run. This page also covers indexing in detail—required permissions, what Glean crawls, and setup steps.
-   **[Real-time access](/connectors/native/onedrive/real-time-access):** An optional layer that fetches content live from OneDrive at query time — for content that must always be current, or that you'd rather not store in Glean's index.
-   **[Read and write tools](/tools/connector/microsoft-365):** The New setup configures these through a separate Central or Custom OAuth step. They let Glean agents act in OneDrive.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Glean reads all user access permissions from OneDrive and enforces them at query time, so users only see results they have access to. All authentication uses certificate-based application permissions with admin consent. Indexing uses no delegated user privileges.
