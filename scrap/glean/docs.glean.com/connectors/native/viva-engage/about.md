---
url: "https://docs.glean.com/connectors/native/viva-engage/about"
canonical: "https://docs.glean.com/connectors/native/viva-engage/about"
title: "Microsoft Viva Engage"
description: "Search Microsoft Viva Engage community messages in Glean."
fetched_at: "2026-09-01T13:29:46.689Z"
---
On this page

The Microsoft Viva Engage connector indexes messages from public and private communities so users can find them in Glean. It supports instances running in [Native Mode](https://learn.microsoft.com/en-us/viva/engage/native-mode-guide) and uses the [Data Export API](https://learn.microsoft.com/en-us/rest/api/yammer/data-export-apis) to keep content up to date.

## What gets indexed[​](#what-gets-indexed "Direct link to What gets indexed")

| Content type | Support | Notes |
| --- | --- | --- |
| Community messages (public and private) | Full | Messages from public and private communities. Search access is enforced by community membership. |
| Direct messages | Not indexed | Private messages between individual users are not crawled or indexed. |
| Files | Not indexed | Handled by the SharePoint connector. |
| Reactions and likes | Not available | Cannot be acquired from the Data Export API. |

## Set up Viva Engage[​](#set-up-viva-engage "Direct link to Set up Viva Engage")

-   **[Connector setup](/connectors/native/viva-engage/setup):** Register the Azure app, grant delegated permissions, and configure the connector in Glean. Covers required permissions, known limitations, and setup steps.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Glean honors Viva Engage's permission model, so users only see results from communities they belong to. The connector uses OAuth 2.0 delegated authentication and requests only the scopes it needs.
