---
url: "https://docs.glean.com/connectors/native/outlook/about"
canonical: "https://docs.glean.com/connectors/native/outlook/about"
title: "Outlook overview"
description: "Connect Glean to Microsoft Outlook to index and search email, with optional real-time access."
fetched_at: "2026-09-01T13:29:37.581Z"
---
On this page

The Outlook connector indexes and searches Microsoft Outlook email and metadata in Glean, and can optionally fetch live data at query time to cover the freshest messages. It uses the Microsoft Graph API and supports Microsoft 365 / Exchange Online only. It doesn't support on-premises or legacy Exchange.

App registration

Existing Outlook connectors use their own Azure app registration, set up independently from OneDrive and SharePoint. In the [new guided setup](/connectors/native/outlook/new-setup), Outlook is set up alongside your other [Microsoft 365](/connectors/native/microsoft365/) connectors. It still registers its own certificate-based Azure app and certificate. Only the tenant ID is shared with the Microsoft 365 suite. In both flows, Outlook's Azure app is separate from OneDrive's or SharePoint's.

note

The Outlook connector indexes **email only**. It uses `Calendars.Read` to surface calendar events in the Glean Today card. The [Microsoft Teams connector](/connectors/native/teams/) serves calendar search and meeting transcripts.

## Capabilities[​](#capabilities "Direct link to Capabilities")

Glean connects to Outlook in two retrieval modes: indexed search and real-time access. The [new setup](/connectors/native/outlook/new-setup) turns both on when you connect, alongside your other Microsoft 365 connectors in the same guided flow. With the [previous setup](/connectors/native/outlook/setup), you can configure the modes independently or together. To configure both modes with one certificate-based app, see [Set up certificates for indexing and real-time access](/connectors/native/outlook/certificate-native-federated).

[

### Indexed connector







](/connectors/native/outlook/native)[

### Real-time access







](/connectors/native/outlook/certificate-federated)

## Which capabilities do you need[​](#which-capabilities-do-you-need "Direct link to Which capabilities do you need")

| What you get | Indexed connector | Real-time access |
| --- | --- | --- |
| Method | Builds a native indexed corpus in Glean | Retrieves live data through the Microsoft Graph API at query time |
| Access scope | Most recent 5,000 messages per user, maintained as new messages arrive | Accesses email outside the indexed window or limits |
| Visibility | Appears in global search and the "All" tab | Typically surfaces when filtering for Outlook (`app:Outlook`) |
| Authentication | Certificate-based only | Certificate-based, or client ID + secret |
| Best for | Broad, ranked, everyday email search | Fresh or overflow messages not yet in the index |

## Set up Outlook[​](#set-up-outlook "Direct link to Set up Outlook")

-   **[Choose your setup](/connectors/native/outlook/choose-your-setup)** covers the new guided setup and the existing per-method setup.
-   **[New setup](/connectors/native/outlook/new-setup)** follows this path if you are connecting Outlook for the first time. The new setup connects Outlook alongside your other Microsoft 365 connectors, in a single guided flow.
-   **[Previous setup](/connectors/native/outlook/setup)** follows this path if Outlook was already connected to your deployment before the new setup was introduced. Those connectors continue to work, and there is no migration to run.
-   **[Indexing connector](/connectors/native/outlook/native)** sets up certificates for data crawling and indexing, the default retrieval path.
-   **[Real-time access](/connectors/native/outlook/certificate-federated)** sets up certificates for real-time email fetching. You can use a [client ID and secret](/connectors/native/outlook/federated) instead.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Each thread belongs to a single mailbox owner from Azure AD, and only that owner sees the indexed email in Glean. Product access group membership and any allowed sender domains further restrict scope. The Graph app uses only read scopes, and Glean never writes or modifies Outlook data.
