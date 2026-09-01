---
url: "https://docs.glean.com/connectors/native/outlook/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/outlook/choose-your-setup"
title: "Choose your Outlook setup"
description: "Work out which of the two Outlook setups is yours, the new guided setup or the existing setup, and how read-only, permission-aware indexing fits into each."
fetched_at: "2026-09-01T13:29:37.930Z"
---
On this page

Glean connects to Outlook with a read-only, certificate-based Microsoft Entra app. Which one is yours depends on your Glean deployment, not on when you personally connect Outlook.

-   **New setup** applies to new Glean deployments. Deployments created on or after August 14th, 2026 use the new setup by default.
-   **Previous setup** applies to existing Glean deployments. Even if you are connecting Outlook for the first time, your deployment keeps its current setup unless Glean enables the new flow for you.

Both paths use the same certificate authentication, the same single-tenant Microsoft Entra app registration, and the same read-only permission model. What differs is the onboarding experience and how much you configure up front.

## What both setups give you[​](#what-both-setups-give-you "Direct link to What both setups give you")

The connection modes are the same in both paths, and both are read-only.

-   **Data crawling and indexing (native).** Glean crawls email and calendar into a permission-aware search index. This is the default path for search.
-   **Data fetching (federated).** Glean fetches live results at query time. Available alongside native indexing.

Glean indexes email messages, threads, and calendar events with read-only Microsoft Graph permissions (`Mail.Read`, `Calendars.Read`, `User.Read.All`, and `GroupMember.Read.All`), and never writes to, sends, or modifies anything in Outlook through this app. The new setup's Connect step authorizes Outlook's tools (Central or Custom) as an independent step from indexing. See [Set up Outlook](/connectors/native/outlook/new-setup) for what that step does.

## Outlook setup comparison: New versus previous[​](#outlook-setup-comparison-new-versus-previous "Direct link to Outlook setup comparison: New versus previous")

-   **New setup** is a guided three-step Admin console flow. You **Connect** to authorize Outlook's tools, **set up indexing** with the certificate-based Azure app, then **review and begin**, all in one place.
-   **Previous setup** is the current connector setup. You register the certificate-based app, upload the certificate, grant permissions, and configure the crawl yourself.

|  | New setup | Previous setup |
| --- | --- | --- |
| **What you prepare in Microsoft** | The guided flow walks you through authorizing Outlook's tools, then the Azure app, read-only permissions, and certificate for indexing | You register the Azure app, upload the certificate, and grant the read-only permissions yourself |
| **What you configure in Glean** | The three-step flow. Connect to authorize tools, set up indexing, then review and begin | Authentication, crawl scope, and restrictions |
| **Who needs to be involved** | A Glean admin, and a Microsoft Global Admin to register the app and grant admin consent | The same two roles |
| **How indexing runs** | In the background once you begin it, on the crawl schedule | On the crawl schedule you configure |
| **Whose permissions apply** | Permission-aware. Outlook access controls, mirrored into the index and enforced at query time | The same |
| **What changes for your current setup** | Not applicable. You are connecting Outlook for the first time | Nothing. Your connector, its configuration, and its crawl continue to run unchanged |
| **Where to start** | [Set up Outlook](/connectors/native/outlook/new-setup) | [Previous setup](/connectors/native/outlook/setup) |

For what the connector indexes, whose permissions it enforces, and its limitations, see the [Outlook overview](/connectors/native/outlook/about).

## See also[​](#see-also "Direct link to See also")

-   [Outlook overview](/connectors/native/outlook/about) covers what gets indexed, permissions, and limitations.
-   [Set up Outlook](/connectors/native/outlook/new-setup) is the new guided setup flow.
-   [Previous setup](/connectors/native/outlook/setup) is the existing connector setup reference.
