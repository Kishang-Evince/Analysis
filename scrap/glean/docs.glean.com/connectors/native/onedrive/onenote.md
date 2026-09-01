---
url: "https://docs.glean.com/connectors/native/onedrive/onenote"
canonical: "https://docs.glean.com/connectors/native/onedrive/onenote"
title: "OneNote"
description: "Configure OneNote indexing in Glean on top of your existing Microsoft 365 OneDrive and SharePoint connectors."
fetched_at: "2026-09-01T13:29:37.134Z"
---
On this page

Glean's OneNote capability extends your existing OneDrive and SharePoint connectors to index OneNote notebooks, sections, and page content for permission-aware search. It reuses the same Microsoft Graph app registration and OAuth configuration as those connectors — there's no separate OneNote connector tile in the Admin console, and it shares all app registration, permissions, and security settings with your OneDrive/SharePoint setup.

## Before you start[​](#before-you-start "Direct link to Before you start")

Have these in place before you enable OneNote, so your IT or security team can approve everything in one request:

-   **An existing OneDrive and/or SharePoint connector** — OneNote rides on top of these connectors. Configure OneDrive (for personal notebooks) and/or SharePoint (for team notebooks) first.
-   **The same Microsoft 365 app registration** — OneNote reuses the app already used by OneDrive/SharePoint. You add **one delegated scope** (`Notes.Read.All`); no new app registration is required.
-   **A Microsoft Entra (Azure AD) tenant administrator** — to add the delegated scope and grant admin consent, and a **Glean admin** to enable OneNote on the connectors.
-   **Per-user authentication** — page-level OneNote content uses delegated, per-user OAuth. Each user who wants OneNote results must connect Microsoft 365 in Glean; admin configuration alone is not sufficient.

## Required permissions[​](#required-permissions "Direct link to Required permissions")

OneNote reuses the Microsoft 365 app registration that already serves OneDrive and SharePoint. You add the following **delegated** Microsoft Graph permissions and grant admin consent.

For your CISO or IT security team

The OneNote capability is **read-only**. Glean reads OneNote notebooks, sections, and pages through Microsoft Graph on behalf of the signed-in user and enforces the same Microsoft 365 permissions; it does not write, modify, or delete content in your tenant.

| Scope (delegated) | What it unlocks |
| --- | --- |
| `Notes.Read.All` | Reads OneNote notebooks, sections, and pages on behalf of the signed-in user. |
| `User.Read` | Reads the signed-in user's profile during the OAuth flow. |
| `offline_access` | Issues a refresh token so Glean maintains access for long-running crawls. |

OneNote reuses the application permissions already granted on the shared app for OneDrive/SharePoint (such as `User.Read.All` and `Files.ReadWrite.All`) as-is, and needs no new application permissions.

## What gets indexed[​](#what-gets-indexed "Direct link to What gets indexed")

The OneDrive and SharePoint connectors surface OneNote content, subject to the same Microsoft 365 permissions.

| Content type | Support | Notes |
| --- | --- | --- |
| Notebooks | Full | Notebook name, parent location (OneDrive or SharePoint), owner, and modified timestamps. |
| Sections | Full | Section name and parent notebook. Section is captured so results stay organized within the Notebook → Section → Page hierarchy. |
| Pages (body content) | Beta · per-user OAuth | Page title and body text, created by / last modified by, created / modified timestamps, the Notebook → Section → Page hierarchy, and the page's Microsoft 365 web link. Requires `Notes.Read.All` and each user connecting Microsoft 365 in Glean. |
| Rich content (ink, some embedded objects) | Limited | May not be fully searchable. |
| Page attachments | Metadata only | May not be indexed, or indexed only as metadata, depending on rollout state. |
| Consumer OneNote (outlook.com / live.com accounts) | Not supported | Only notebooks stored in OneDrive for Business or SharePoint Online are in scope. |

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   **Beta.** OneNote support is in beta and behavior may change.
-   **Page-level content requires per-user OAuth.** Until a user connects Microsoft 365 in Glean, they see notebook files surfaced through OneDrive/SharePoint but not page-level OneNote content for notebooks that require delegated access.
-   **Storage locations.** Glean indexes only notebooks stored in OneDrive for Business or SharePoint Online; it doesn't support consumer OneNote (outlook.com / live.com).
-   **Content coverage.** Some rich content (ink, certain embedded objects) may not be fully searchable, and page attachments may be indexed only as metadata.
-   **Freshness.** Initial coverage may require a standard connector crawl cycle. Incremental updates rely on Graph delta queries and webhooks, so there may be a short delay before page edits appear in Glean.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

OneNote uses the Microsoft 365 app registration that already serves your OneDrive and SharePoint connectors.

1

Add the OneNote delegated scope to your existing app

1.  Sign in to the [Azure portal](https://portal.azure.com/) as a tenant administrator and go to **Microsoft Entra ID** → **App registrations**.
2.  Select the existing app registration used by your Glean OneDrive/SharePoint connectors. (OneDrive and SharePoint must share a single Microsoft 365 app — confirm the **Application (client) ID** and **Directory (tenant) ID** match on both connectors in Glean.)
3.  Go to **API permissions** → **Add a permission** → **Microsoft Graph** → **Delegated permissions** and add:
    -   `User.Read`
    -   `offline_access`
    -   `Notes.Read.All`
4.  Click **Grant admin consent** for your tenant.

If this app is already used for OneDrive/SharePoint data fetching, you typically only need to add `Notes.Read.All` — the OAuth redirect URI is already configured. Otherwise, under **Authentication** → **Platform configurations**, add a **Web** platform with the redirect URI shown in the Glean Admin console for the OneDrive and SharePoint connectors (these should match).

2

Enable OneNote on the OneDrive and SharePoint connectors

In the **Glean Admin console**, open each connector under **Platform** → **Connectors** and select the **Allow OneNote content fetching with OAuth** option, then save.

Repeat for:

-   **OneDrive** — for notebooks stored in users' OneDrive folders.
-   **SharePoint** — for notebooks stored in SharePoint team sites.

3

Ask users to connect Microsoft 365 in Glean

Page-level OneNote content uses delegated, per-user access, so admin configuration alone is not sufficient. Each user who wants OneNote results must:

1.  Open Glean in a browser.
2.  Go to **profile picture** → **Your settings** → **Connectors**.
3.  Find the **Microsoft 365** tile and click **Connect**, then complete the Microsoft sign-in flow.

After connecting, Glean retrieves the OneNote content that user is authorized to access, and search results begin to include OneNote pages subject to crawl freshness.

## Choosing OneDrive or SharePoint for OneNote[​](#choosing-onedrive-or-sharepoint-for-onenote "Direct link to Choosing OneDrive or SharePoint for OneNote")

Many organizations store notebooks in both OneDrive and SharePoint:

-   **OneDrive** — personal notebooks stored under each user's OneDrive ("my notes" scenarios).
-   **SharePoint** — team notebooks in SharePoint-backed team sites, and project- or department-wide notebooks attached to Microsoft 365 groups.

Enable OneNote on both connectors for comprehensive coverage. If you start small, begin with OneDrive for personal notebooks and add SharePoint once you're ready to include team notebooks.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   **Permission model.** Glean doesn't change your Microsoft 365 permissions. OneNote content appears in Glean only if the user has access to the notebook, section, or page in Microsoft 365 **and** has completed the Microsoft 365 connection (delegated OAuth) in Glean.
-   **Read-only access.** Glean uses the granted scopes only to read content and maintain permission maps; it does not perform write operations in your tenant.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Admin console shows a Reconnect prompt after enabling OneNote[​](#admin-console-shows-a-reconnect-prompt-after-enabling-onenote "Direct link to Admin console shows a Reconnect prompt after enabling OneNote")

This is expected when you enable OneNote after the initial Microsoft 365 authorization. The existing OAuth token doesn't include `Notes.Read.All`, so Glean detects a scope mismatch and prompts you to reconnect.

To resolve:

1.  In the Admin console, go to the **OneDrive** or **SharePoint** connector settings.
2.  Click **Reconnect** and complete the Microsoft sign-in flow.
3.  Repeat for the other connector if you enabled OneNote in both.

Once reconnected, OneNote crawls resume automatically.

### OneNote crawls fail with insufficient-scope errors[​](#onenote-crawls-fail-with-insufficient-scope-errors "Direct link to OneNote crawls fail with insufficient-scope errors")

If you see crawl or sync failures that reference insufficient permissions or missing scopes, the connector's cached token likely doesn't include `Notes.Read.All`. This happens when someone enables OneNote after the original authorization and hasn't reconnected yet.

To resolve, follow the reconnect steps above. If crawl errors persist after reconnecting, verify that `Notes.Read.All` (Delegated) appears in your app registration's API permissions and that you've granted admin consent.

## FAQs[​](#faqs "Direct link to FAQs")

### Should I configure OneNote in OneDrive or in SharePoint?

It depends where your notebooks live:

-   Personal notebooks → enable OneNote on OneDrive.
-   Team notebooks in SharePoint sites → enable OneNote on SharePoint.
-   Most customers enable OneNote on both connectors for full coverage.

### Does enabling OneNote change any permissions in Microsoft 365?

No. Glean does not change permissions in your tenant. It reads OneNote content through Microsoft Graph under the scopes you grant and enforces the same access controls that already exist in Microsoft 365.

### What happens if a user doesn't connect Microsoft 365 in Glean?

That user does not see page-level OneNote content. They may still see notebook files indexed as normal OneDrive/SharePoint documents, depending on your existing connector configuration.

### Can I limit which users' OneNote content is indexed?

Yes. OneNote coverage respects the scoping already configured on your OneDrive and SharePoint connectors (for example, by user, group, or site).
