---
url: "https://docs.glean.com/connectors/native/outlook/about"
canonical: "https://docs.glean.com/connectors/native/outlook/about"
title: "Outlook overview"
description: "Connect Glean to Microsoft Outlook to index and search email, with optional real-time access."
fetched_at: "2026-10-13T08:50:09.155Z"
---
On this page

The Outlook connector indexes and searches Microsoft Outlook email and metadata in Glean, and can optionally fetch live data at query time to cover the freshest messages. It uses the Microsoft Graph API and supports Microsoft 365 / Exchange Online only. It doesn't support on-premises or legacy Exchange.

App registration

Existing Outlook connectors use their own Azure app registration, set up independently from OneDrive and SharePoint. In the [new guided setup](/connectors/native/outlook/new-setup), Outlook is set up alongside your other [Microsoft 365](/connectors/native/microsoft365/) connectors. It still registers its own certificate-based Azure app and certificate. Only the tenant ID is shared with the Microsoft 365 suite. In both flows, Outlook's Azure app is separate from OneDrive's or SharePoint's.

Calendar content

The Outlook connector indexes email, not calendar events. It uses `Calendars.Read` to surface calendar events in the **Today** card. Use the separate Outlook Calendar connector for calendar indexing and supported meeting transcripts. See [Outlook Calendar](/connectors/native/outlook-calendar/).

Keep the permissions required by the Outlook setup guide, including `Calendars.Read`. A separate calendar connector doesn't remove this Outlook setup requirement. If your organization still uses an existing Teams-based calendar connection, keep its configuration until your Glean account team confirms the transition.

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

## Understand calendar crawl coverage[​](#calendar-event-crawling "Direct link to Understand calendar crawl coverage")

Calendar event indexing is separate from Outlook email indexing. If your calendar integration crawls events, Outlook Calendar and existing Teams-based calendar connections use the organizer's copy of each event by default, rather than copies in attendees' calendars.

Glean may not index meetings from organizers whose calendars it doesn't crawl, even if an attendee can see the meeting in Outlook. This can include external organizers or people in your organization. The rule determines which events Glean crawls, not who can view an indexed event.

This restriction applies only to background indexing. If your organization has configured calendar search tools, they can still retrieve these meetings in real time. Calendar access permissions and supported date ranges still apply. See [Calendar search and tools setup](/administration/tools/setup-tools/calendar-search-tools-setup).

## Set up Outlook[​](#set-up-outlook "Direct link to Set up Outlook")

-   **[Choose your setup](/connectors/native/outlook/choose-your-setup)** covers the new guided setup and the existing per-method setup.
-   **[New setup](/connectors/native/outlook/new-setup)** follows this path if you are connecting Outlook for the first time. The new setup connects Outlook alongside your other Microsoft 365 connectors, in a single guided flow.
-   **[Previous setup](/connectors/native/outlook/setup)** follows this path if Outlook was already connected to your deployment before the new setup was introduced. Those connectors continue to work, and there is no migration to run.
-   **[Indexing connector](/connectors/native/outlook/native)** sets up certificates for data crawling and indexing, the default retrieval path.
-   **[Real-time access](/connectors/native/outlook/certificate-federated)** sets up certificates for real-time email fetching. You can use a [client ID and secret](/connectors/native/outlook/federated) instead.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Each thread belongs to a single mailbox owner from Azure AD, and only that owner sees the indexed email in Glean. Product access group membership and any allowed sender domains further restrict scope. The Graph app uses only read scopes, and Glean never writes or modifies Outlook data.
