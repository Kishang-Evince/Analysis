---
url: "https://docs.glean.com/connectors/native/sharepoint/set-up-indexing-connector"
canonical: "https://docs.glean.com/connectors/native/sharepoint/set-up-indexing-connector"
title: "Set up the indexing connector"
description: "Learn how to set up the indexing connector."
fetched_at: "2026-09-01T13:29:41.406Z"
---
On this page

This section covers the indexed connector's permissions, indexed content, and scope. For step-by-step configuration in the Admin console, see [Choose your setup](/connectors/native/sharepoint/choose-your-setup).

## Before you start[​](#before-you-start "Direct link to Before you start")

Have these in place before you configure the SharePoint indexing connector, to avoid mid-setup delays:

-   **Global (tenant) administrator:** A tenant administrator with global admin privileges for both the Azure/Entra ID and SharePoint admin portals must grant admin consent for the API permissions and configure the SharePoint REST API. This can't be completed with a lower-privileged role.
-   **Microsoft 365 parent connector already configured:** SharePoint inherits its app registration, client ID, tenant ID, and certificate from the [Microsoft 365](/connectors/native/microsoft365/) parent connector. Complete M365 setup first.
-   **Permissions approved in advance:** The scopes below must be granted as application permissions, on both the Microsoft Graph API and the SharePoint REST API, with admin consent. Share the [permissions table](#required-permissions) with your CISO or security team before starting.

## Required permissions[​](#required-permissions "Direct link to Required permissions")

The SharePoint connector requires `Sites.FullControl.All` on both the Microsoft Graph API and the SharePoint REST API to index all content and synchronize permission changes. All permissions are granted as **application permissions** on the shared Microsoft 365 app registration. Delegated permissions are not supported for indexing.

For your CISO or IT security team

-   **Glean is read-only for content.** Glean never writes, modifies, or deletes anything in SharePoint.
-   **`Sites.FullControl.All` technically grants write access, but Glean never uses it.** Microsoft does not offer a granular read-only scope for these SharePoint endpoints, so `FullControl` is the only tier that can read site, page, and list permissions. The scope includes write capabilities, but Glean's access is strictly read-only, as stated above.
-   **`Files.ReadWrite.All` is used only for change notifications.** It is required solely to create and reauthorize webhook subscriptions, not to change files.
-   **Every result is permission-scoped.** Users only ever see SharePoint content they are already allowed to open.

Permissions are grouped below by API surface. Each scope lists **why Glean needs it** and **what breaks without it**, so you can justify every grant in your IT request.

-   Microsoft Graph API
-   SharePoint REST API
-   Conditional
-   Alternatives & trade-offs

| Scope | Why Glean needs it | What breaks without it |
| --- | --- | --- |
| `Sites.FullControl.All` | Consumes webhooks and scans permission hierarchies using the `/delta` endpoint to pick up permission changes in near real-time. Enables activity signals used for search ranking. | Permissions update every 24 hours instead of near real-time, and activity signals for AI ranking are lost. |
| `Files.ReadWrite.All` | Required by Microsoft to create and manage webhook subscriptions over drives. Used solely to subscribe to change events; no files are written. | Can't subscribe to change notifications. Content freshness falls back to scheduled crawls, causing stale results. |
| `User.Read.All` | Enumerates tenant users to align SharePoint identities with Glean profiles and enforce document-level permissions. | Permission mapping fails. Users may see content they shouldn't, or be blocked from content they should access. |
| `GroupMember.Read.All` | Reads Microsoft 365 group membership to resolve group-based permissions. | Group-based permissions aren't resolved. Content shared with groups may be over- or under-shared in search. |
| `Member.Read.Hidden` | Reads hidden-visibility group membership, used when confidential teams have shared content. | Content shared with hidden groups may be over-shared in search results. |
| `Reports.Read.All` | Reads usage reports to validate crawl coverage and auto-scale Glean infrastructure for your corpus size. | Infrastructure scaling relies on manual estimates, which may cause slower crawls for large tenants. |

| Scope | Why Glean needs it |
| --- | --- |
| `Sites.FullControl.All` | Retrieves permissions for site pages and site lists. Microsoft does not provide granular controls or a dedicated read scope for these data endpoints, so `FullControl` is required. |

| Scope | When needed | What it enables |
| --- | --- | --- |
| `SensitivityLabels.Read.All` | Only if excluding content by [Purview sensitivity labels](/connectors/native/sharepoint/restrictions#exclude-with-purview-sensitivity-labels). | Reads sensitivity labels so labeled content can be excluded from indexing. |
| `Notes.Read.All` (Delegated) | Only if enabling OneNote page-body indexing. Each user must individually connect their M365 account in Glean. | Page-level OneNote body content. Without it, only Notebooks and Sections index. |

### Sites.FullControl.All compared with Sites.Selected[​](#sitesfullcontrolall-compared-with-sitesselected "Direct link to Sites.FullControl.All compared with Sites.Selected")

You can use `Sites.Selected` instead of `Sites.FullControl.All`, but this introduces significant trade-offs. See [Set up selected sites](/connectors/native/sharepoint/setup-selected-sites).

| Capability | `Sites.FullControl.All` (recommended) | `Sites.Selected` (limited) |
| --- | --- | --- |
| Permission update speed | Near real-time (webhook) | Every 24 hours |
| Security staleness window | Seconds to minutes | Up to 24 hours |
| AI ranking signals | Full activity and content metadata | None |
| Site configuration | Automatic | Manual (each site added explicitly) |
| Ongoing admin burden | Low | High (must maintain the site list) |

Avoid `Sites.Read.All` as a substitute. Like `Sites.Selected`, it causes significant indexing latency, freshness issues, and ranking drawbacks. If you can't grant `Sites.FullControl.All`, contact Glean Support to discuss configuration options.

### Build your request[​](#build-your-request "Direct link to Build your request")

As you select the capabilities you need, Glean builds the exact permission set to request. Copy it straight into your IT ticket or email, so every scope is requested in one pass.

**Tell us what you need, and we’ll build the request.**

Indexing SharePoint sites and files is always included. Select any extras below and the permission set updates instantly. Then copy it to hand to your IT or security team, so every scope is requested in one pass.

Index SharePoint sites & filesAlways includedCrawl sites, document libraries, pages, and lists with permission-aware access.Real-time search (live fetch)Supplement indexed results with content fetched live from SharePoint. Adds delegated permissions and per-user authentication.Exclude by Purview sensitivity labelsRead sensitivity labels so labeled content can be excluded from indexing.OneNote page-body indexingIndex OneNote page content (not just notebooks and sections). Each user connects their M365 account in Glean.Limit to selected sites (Sites.Selected)Grant access to an explicit list of sites instead of the whole tenant. Significant trade-offs — see below.

Permissions to request from ITCopy request

Microsoft Graph API Application

-   `Sites.FullControl.All`Read site, page, and list permissions; consume webhooks for near real-time permission updates.
-   `Files.ReadWrite.All`Create and reauthorize webhook subscriptions over drives. No files are written.
-   `User.Read.All`Map SharePoint identities to Glean profiles for document-level permissions.
-   `GroupMember.Read.All`Resolve group-based permissions from Microsoft 365 group membership.
-   `Member.Read.Hidden`Resolve permissions for content shared with hidden-visibility groups.
-   `Reports.Read.All`Read usage reports to validate crawl coverage and auto-scale infrastructure.

SharePoint REST API Application

-   `Sites.FullControl.All`Read permissions for site pages and site lists (no granular read scope exists for these endpoints).

## What gets indexed[​](#what-gets-indexed "Direct link to What gets indexed")

| Content type | Notes |
| --- | --- |
| Pages | Classic site pages, web part pages, wiki pages, and modern page library items. |
| Document libraries and folders | Site drives containing documents, and the folders within SharePoint sites. |
| Native file types: Word, Excel, PowerPoint, PDF, text | Office formats, PDF, and text files. |
| Files with generic or unrecognized content types | Metadata only by default. When a specific content type is configured for additional parsing, Glean attempts to detect the file’s actual format. Text and other supported formats may be indexed. Files that resolve to unsupported binary formats remain metadata-only. Contact Glean Support to discuss a specific file type. |
| Site lists | Basic lists, calendar lists, discussion boards, custom lists in datasheet view, task lists, and issue tracking lists. Not all list types and list attachments are crawled. |
| OneNote | Limited support: notebooks indexed as folders; sections indexed as standalone content. |
| View pages | Not indexed. List or library view pages (for example, URLs ending in `AllItems.aspx` or `DocSetHome.aspx`) are UI containers, not content. |

Glean also honors the SharePoint search-visibility setting on sites and lists, supports [greenlist/redlist crawling restrictions](/connectors/native/sharepoint/restrictions), excludes [draft content](/connectors/native/sharepoint/restrictions#exclude-draft-content) by default, and excludes content with selected [Purview sensitivity labels](/connectors/native/sharepoint/restrictions#exclude-with-purview-sensitivity-labels) when that integration is enabled. Glean Support can enable published-version visibility for the SharePoint deployment, allowing Glean to index and serve the latest published version for supported SharePoint items when one exists. Classic site pages with a published version and a newer draft are not supported because a SharePoint API limitation prevents Glean from retrieving the published version's content.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   **SharePoint view pages are not indexed.** Glean doesn't index list or library view pages such as URLs ending in `AllItems.aspx` or `DocSetHome.aspx`. These are UI containers, not content items.
-   **Draft content is excluded by default.** Glean excludes pages, list items, and drive items in a draft state: when the latest version is a minor (draft) version, the item is checked out, or it's pending moderation. When published-version visibility is enabled, Glean can index and serve the latest published version for supported SharePoint items when one exists. Classic site pages with a published version and a newer draft are not supported because a SharePoint API limitation prevents Glean from retrieving the published version's content. See [Exclude draft content](/connectors/native/sharepoint/restrictions#exclude-draft-content).
-   **Generic or unrecognized content types.** These files are metadata-only by default. When a specific content type is configured for additional parsing, Glean attempts to detect the file’s actual format. Content is indexed only when the detected format is supported and parsing succeeds.
-   **`Sites.Selected` causes 24-hour permission staleness.** Permission changes take up to 24 hours to propagate, and activity signals for ranking are unavailable.

## Setup steps[​](#setup-steps "Direct link to Setup steps")

### 1\. Set up the Microsoft 365 parent connector[​](#1-set-up-the-microsoft-365-parent-connector "Direct link to 1. Set up the Microsoft 365 parent connector")

Registers the shared Azure app and configures certificate authentication. Required before any child connectors. See the [Microsoft 365 setup guide](/connectors/native/microsoft365/).

### 2\. Grant the required API permissions[​](#2-grant-the-required-api-permissions "Direct link to 2. Grant the required API permissions")

Add the application permissions on both the Microsoft Graph API and the SharePoint REST API, then grant admin consent. Use the [permissions table](#required-permissions) to brief your security team in advance.

### 3\. Configure SharePoint in the Glean Admin console[​](#3-configure-sharepoint-in-the-glean-admin-console "Direct link to 3. Configure SharePoint in the Glean Admin console")

Select SharePoint as a child connector under Microsoft 365. Credentials are inherited. Set the crawl scope and save. For the setup steps, see [Choose your setup](/connectors/native/sharepoint/choose-your-setup).

### 4\. Enable real-time access[​](#4-enable-real-time-access "Direct link to 4. Enable real-time access")

The new setup enables real-time search automatically. With the previous setup, an administrator enables it separately once the connector is running. See [real-time access](/connectors/native/sharepoint/real-time-access).

## Verify the connection[​](#verify-the-connection "Direct link to Verify the connection")

After the initial crawl completes:

-   **Check crawl status.** In the Glean Admin console, confirm the SharePoint connector's crawl completed without errors.
-   **Search with the app filter.** Search in Glean using the **SharePoint** app filter and confirm pages, documents, and list content appear for a user who has access in SharePoint.
-   **No results?** See [Troubleshooting](#troubleshooting).

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

-   **Certificate expired or invalid.** Errors such as "certificate is not authorized for this application" or "Invalid JWT token. The token is expired" mean the authentication certificate needs to be rotated. Generate a new certificate, upload it to every Azure app registration in use, update the [Microsoft 365](/connectors/native/microsoft365/) parent connector in Glean, then re-save to validate. If you're moving off an older client-secret (ACS) setup, switch fully to [certificate authentication](/connectors/native/sharepoint/secrets-to-certificate-migration).
-   **Private key rejected on upload.** If validation fails because the private key begins with `BEGIN RSA PRIVATE KEY`, it's in the wrong format. Convert it to unencrypted PKCS#8 with `openssl pkcs8 -topk8 -inform PEM -outform PEM -in oldkey.key -out privatekey.key -nocrypt` so it begins with `BEGIN PRIVATE KEY`, then re-upload the matching certificate and key. Use the same certificate on every Azure app registration.
-   **A site or list returns nothing.** Glean honors the SharePoint search-visibility setting and any [greenlist/redlist restrictions](/connectors/native/sharepoint/restrictions); content excluded there isn't indexed. If you use `Sites.Selected`, newly added sites must be granted explicitly.
-   **Permission changes lag.** With `Sites.FullControl.All`, permission updates are near real-time; with `Sites.Selected`, they can take up to 24 hours.
