---
url: "https://docs.glean.com/connectors/native/onedrive/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/onedrive/choose-your-setup"
title: "Choose your OneDrive setup"
description: "Work out which of the two OneDrive setups is yours, the new guided setup or the previous setup, and how tools, indexed search, and real-time access fit into each."
fetched_at: "2026-09-01T13:29:37.104Z"
---
On this page

Glean connects to OneDrive as a child of the [Microsoft 365](/connectors/native/microsoft365/) connector. Which one is yours depends on your Glean deployment, not on when you personally connect OneDrive.

-   **New setup** applies to new Glean deployments. Deployments created on or after August 14th, 2026 use the new setup by default.
-   **Previous setup** applies to existing Glean deployments. Even if you are connecting OneDrive for the first time, your deployment keeps its current setup unless Glean enables the new flow for you.

Both paths use the same certificate authentication, the same shared Microsoft 365 app registration, and the same permission model. What differs is the onboarding experience and how much you configure up front.

## OneDrive setup comparison: New versus previous[​](#onedrive-setup-comparison-new-versus-previous "Direct link to OneDrive setup comparison: New versus previous")

Both setups give you the same indexed connector once complete, and both are permission-aware. Real-time access is also available in both paths. What differs is when tools become available and how you configure the underlying app.

-   **New setup** uses a guided flow. It authorizes OneDrive's tools, sets up the shared Microsoft 365 Azure app and certificate, grants the OneDrive permissions, and starts the crawl, all in one place.
-   **Previous setup** is the current connector setup. You register the app, upload the certificate, grant permissions, and configure the crawl yourself.

|  | New setup | Previous setup |
| --- | --- | --- |
| **What you prepare in Microsoft** | The guided flow walks you through authorizing OneDrive's tools, then the shared Microsoft 365 app, certificate, and OneDrive permissions | You register the Microsoft 365 app, upload the certificate, and grant the OneDrive permissions yourself |
| **What you configure in Glean** | The two-step flow. Connect to authorize tools, then set up indexing | Retrieval methods, crawl scope, restrictions, and real-time access |
| **Who needs to be involved** | A Glean admin, and a Microsoft 365 Global Admin to grant admin consent | The same two roles |
| **How indexing runs** | In the background once you begin it, on the crawl schedule | On the crawl schedule you configure |
| **Whose permissions apply** | Permission-aware. OneDrive access controls, mirrored into the index and enforced at query time | The same |
| **What changes for your current setup** | Not applicable. You are connecting OneDrive for the first time | Nothing. Your connector, its configuration, and its crawl continue to run unchanged |
| **Where to start** | [Set up OneDrive](/connectors/native/onedrive/new-setup) | [Set up the indexing connector](/connectors/native/onedrive/setup) |

For what each connection method retrieves, whose permissions it enforces, and its limitations, see the [OneDrive overview](/connectors/native/onedrive/about).

## See also[​](#see-also "Direct link to See also")

-   [OneDrive overview](/connectors/native/onedrive/about) covers connection methods, what gets indexed, permissions, and limitations.
-   [Set up OneDrive](/connectors/native/onedrive/new-setup) is the new guided setup flow.
-   [Set up the indexing connector](/connectors/native/onedrive/setup) is the previous connector setup reference.
-   [Real-time access](/connectors/native/onedrive/real-time-access) covers the always-live retrieval option.
