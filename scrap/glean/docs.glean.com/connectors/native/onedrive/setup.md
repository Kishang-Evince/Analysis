---
url: "https://docs.glean.com/connectors/native/onedrive/setup"
canonical: "https://docs.glean.com/connectors/native/onedrive/setup"
title: "Set up the indexing connector"
description: "Set up the OneDrive indexing connector in Glean, including permissions, what gets indexed, and step-by-step setup."
fetched_at: "2026-09-01T13:29:37.559Z"
---
On this page

You're reading the **previous setup**[Connecting OneDrive for the first time? →](/connectors/native/onedrive/new-setup)

This section covers setup requirements, permissions, and configuration specific to the OneDrive indexing connector. For real-time access and read and write tools setup, see the [overview](/connectors/native/onedrive/).

## Before you start[​](#before-you-start "Direct link to Before you start")

Have these ready before you configure the OneDrive indexing connector, so you don't hit mid-setup delays:

-   **Global (tenant) administrator** — a Microsoft 365 Global Admin must grant admin consent for all API permissions and configure the SharePoint REST API. This can't be completed with a lower-privileged role.
-   **Microsoft 365 parent connector already configured** — OneDrive inherits its app registration, client ID, tenant ID, and certificate from the [Microsoft 365](/connectors/native/microsoft365/) parent connector. Complete M365 setup first.
-   **API permissions approved in advance.** The OneDrive-specific scope (`Files.ReadWrite.All`) and identity scopes shared with the M365 parent must be granted as application permissions with admin consent. Share the [permissions table](#required-permissions) with your Chief Information Security Officer (CISO) or security team before starting. `Files.ReadWrite.All` is required only to create webhook subscriptions. Glean never writes to your files.
-   **Time to allow** — plan for the Azure app configuration and Glean Admin console setup, followed by the initial crawl, which takes hours to days depending on corpus size.

## Required permissions[​](#required-permissions "Direct link to Required permissions")

Grant all permissions as **application permissions** on the shared Microsoft 365 app registration. Indexing doesn't support delegated permissions.

**Tell us what you need, and we’ll build the request.**

The baseline permissions are always included. Select any extras below and the permission set updates instantly. Then copy it to hand to your IT or security team, so every scope is requested in one pass.

Index OneDrive contentAlways includedCrawls and indexes OneDrive files, folders, and permissions with near-real-time webhook-driven freshness.OneNote page indexing (beta)Indexes OneNote page body content. Requires per-user OAuth consent — each user must individually connect their M365 account in Glean. Without this, only Notebook and Section objects are visible.

Permissions to request from ITCopy request

Microsoft Graph API Application

-   `Files.ReadWrite.All`Creates and reauthorizes webhook subscriptions over OneDrive drives so changes appear in near-real-time. No files are written.
-   `Sites.FullControl.All`Required to pick up OneDrive permission changes (advanced features and granular security management); OneDrive drives are SharePoint-backed. Not enforced during setup validation — the connector still functions — but without it permissions can go stale. See the Microsoft Graph delta documentation on scanning permission hierarchies.

## What gets indexed[​](#what-gets-indexed "Direct link to What gets indexed")

| Content type | Support | Notes |
| --- | --- | --- |
| Documents (Word, Excel, PowerPoint, PDF, text) | Full | Files up to 64 MB are downloaded for indexing. Up to 16.875 MB of converted text content is indexed. Password-protected files are indexed as metadata only. |
| Folders | Full | All personal folders by default. Scopeable to specific Azure AD groups. |
| Document metadata | Full | Author, last modified, created date, and permissions. |
| OneNote — Notebooks and Sections | Full | Indexed as folders and documents by default. |
| OneNote — Pages (body content) | Limited beta | Requires `Notes.Read.All` plus OAuth for each user. See [OneNote setup](/connectors/native/onedrive/onenote). |
| Images, videos, drawings | Metadata only | Not downloaded by default. Optical Character Recognition (OCR) off by default. Contact Support to discuss options. |
| Files with generic or unrecognized content types | Metadata only by default | When a specific content type is configured for additional parsing, Glean attempts to detect the file’s actual format. Text and other supported formats may be indexed. Files that resolve to unsupported binary formats remain metadata-only. Contact Glean Support to discuss a specific file type. |
| Files larger than 64 MB | Metadata only | Title, author, and permissions are indexed. Content is not. |
| Consumer OneDrive (personal Microsoft accounts) | Not supported | OneDrive for Business (M365 tenant) only. |

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   **OneNote page indexing requires consent from each user.** The OneNote beta requires each user to individually authenticate their M365 account in Glean. Admin configuration alone is not sufficient.

## Setup steps[​](#setup-steps "Direct link to Setup steps")

1

Set up the Microsoft 365 parent connector

Registers the shared Azure app and configures certificate authentication. Required before any child connectors. See the [Microsoft 365 setup guide](/connectors/native/microsoft365/).

2

Grant the required API permissions

Using the app created during [Microsoft 365 setup](/connectors/native/microsoft365/), sign into the [Azure portal](https://portal.azure.com/). Navigate to **Microsoft Entra ID** → **Manage** → **App registrations** and select the app created for the Microsoft 365 suite.

Select **Manage** → **API Permissions** → **Add a permission**, select **Microsoft Graph**, choose **Application permissions**, and add `Files.ReadWrite.All`.

Then select **Grant admin consent**.

3

Configure OneDrive in the Glean Admin console

In the Glean Admin console, select OneDrive as a child connector under Microsoft 365. Credentials are inherited. Set the crawl scope and save.

To increase full crawl indexing speed, Glean recommends 1–10 additional applications with the same permission settings as the parent app. Repeat the permission setup for each additional app and paste the additional **Application (client) ID** into the Glean web app. You only need to upload the certificate once in Glean.

4

(Optional) Enable real-time access or read and write tools

Enable additional connection modes after the base connector is running. See [real-time access](/connectors/native/onedrive/real-time-access) and the [Microsoft 365 read and write tools](/tools/connector/microsoft-365).

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   **Permission propagation.** Glean maps document-level permissions from OneDrive one-to-one and strictly enforces search-result visibility from those mappings.
-   **Security and compliance.** All authentication uses secure OAuth 2.0 flows, requires admin consent, and uses no delegated user privileges for indexing.

## Hide Microsoft 365 content with Purview sensitivity labels[​](#hide-microsoft-365-content-with-purview-sensitivity-labels "Direct link to Hide Microsoft 365 content with Purview sensitivity labels")

Glean can exclude sensitive Microsoft 365 content from search results by integrating with Microsoft Purview sensitivity labels. When you enable this integration, Glean skips indexing SharePoint and OneDrive items that carry the labels you select. Because Glean never indexes these items, they don't appear in results. For more information, see [Restrict O365 content via sensitivity labels](/administration/protect/sensitive-findings/restrict-content-via-sensitivity-labels).

## See also[​](#see-also "Direct link to See also")

-   [Choose your OneDrive setup](/connectors/native/onedrive/choose-your-setup) shows which setup is yours and how tools, indexed search, and add-ons fit into each.
-   [OneDrive overview](/connectors/native/onedrive/about) covers connection methods, what gets indexed, permissions, and limitations.
