---
url: "https://docs.glean.com/connectors/native/outlook/setup"
canonical: "https://docs.glean.com/connectors/native/outlook/setup"
title: "Indexing connector setup and reference"
description: "Set up the Outlook indexing connector, including permissions, what gets indexed, known limitations, and setup steps."
fetched_at: "2026-10-13T08:50:10.788Z"
---
On this page

You're reading the **previous setup**[Connecting Outlook for the first time? →](/connectors/native/outlook/new-setup)

This section covers setup requirements, permissions, and behavior specific to the Outlook indexing connector. For real-time access setup, see the [overview](/connectors/native/outlook/about).

## Before you start[​](#before-you-start "Direct link to Before you start")

Have these in place before you configure the Outlook indexing connector:

-   **Azure tenant administrator** — an Azure tenant admin must grant admin consent for the Microsoft Graph application permissions below.
-   **A registered Azure AD application.** Register it with the Microsoft Graph application permissions, and upload a certificate to the app registration (**App registration → Certificates & secrets → Certificates**). Indexing requires certificate-based authentication. A client secret works only for real-time access. Outlook requires its own dedicated app registration, separate from any Microsoft 365 parent app or other connector apps you have configured.
-   **Microsoft 365 / Exchange Online** — the connector supports Exchange Online only, not on-premises or legacy Exchange Server.
-   **(Optional) Scoping decisions** — an Azure AD product access group (`productAccessGroupId`) to limit which mailboxes are indexed, and an allowed sender-domain list.

## Required permissions[​](#required-permissions "Direct link to Required permissions")

The Outlook indexing app requires all four Microsoft Graph application permissions. A Global Administrator or Privileged Role Administrator must grant admin consent.

| Application permission | Purpose |
| --- | --- |
| `Mail.Read` | Read email messages in the mailboxes Glean indexes |
| `Calendars.Read` | Read calendar events. Outlook setup requires this permission, but it doesn't enable calendar indexing through the email connector |
| `User.Read.All` | Read directory users to map mailboxes to Glean users |
| `GroupMember.Read.All` | Read group membership, including the product access group used to scope email indexing |

## What gets indexed[​](#what-gets-indexed "Direct link to What gets indexed")

| Content type | Support | Notes |
| --- | --- | --- |
| Email messages and threads | Full | The Inbox, Sent folder, and other configured mail folders within each user's **primary mailbox**. Messages are grouped into threads for each user. |
| Message metadata | Full | Subject lines, participants (From, To, Cc, Bcc), sent/received timestamps, and conversation identifiers. |
| Email body | Text only | Text content of messages. Glean doesn't index formatting or inline media. |
| Attachments | Not indexed by default | When attachment indexing is enabled in the connector configuration, Glean indexes eligible attachment content and metadata. Otherwise, attachment content may be searchable through the OneDrive or SharePoint connectors instead. |

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   **Message limit.** By default, Glean indexes each user’s 5,000 most recent messages. As new messages arrive, Glean updates the index while retaining at least those 5,000 messages for each user. Increasing the lookback window or message limit for each user isn’t self-service. Contact Glean Support to request a change. See [Outlook crawl restrictions](/connectors/native/outlook/restrictions).
-   **Lookback window and message cap interaction.** Increasing the lookback window alone doesn't raise the message cap for each user. If a mailbox has reached its cap, contact Glean Support to raise both settings. You can also use real-time access to access older messages.
-   **Conversation thread cap.** Glean truncates individual threads with more than **1,000 messages**.
-   **Excluded folders.** Glean doesn't index the Junk Email (spam) or Deleted Items folders.
-   **Online Archive mailboxes.** Glean excludes separate Online Archive (In-Place Archive) mailboxes, but indexes the standard "Archive" folder within a user's primary mailbox.
-   **Mailbox model.** The connector doesn't support shared mailboxes, delegated mailboxes, group conversations, or public folders. It enforces a 1:1 relationship between a user and their primary mailbox.
-   Calendar events aren't part of the Outlook email index. For calendar indexing and supported meeting transcripts, see [Outlook Calendar](/connectors/native/outlook-calendar/). Keep `Calendars.Read` in the Outlook app's required permissions.
-   **Connector deletion.** The **Admin console** doesn't offer self-service deletion; contact your Glean representative.
-   **Sensitive findings.** Each indexed email is visible only to its mailbox owner, so email may not match sharing-based policy filters. Glean scans Outlook email weekly, not continuously. For information about scanning email, contact your Glean account team. See [Manage policies](/administration/protect/sensitive-findings/manage-policies#frequency).

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

The connector combines periodic full crawls with frequent incremental updates using Microsoft Graph delta queries.

-   **Initial full crawl** — crawls mailboxes for users in the configured product access group across the Inbox, Sent, and selected folders.
-   **Incremental updates** — delta queries on mail folders discover new messages, detect updates, and detect deletions or moves on a frequent schedule subject to Microsoft's Outlook mail API throttling limits (about 10,000 requests per 10 minutes per mailbox).
-   **Deletion handling** — when a user deletes messages or moves them to junk/spam, Glean removes the thread on the next incremental pass.

Glean's crawling system centrally manages crawl schedules. The **Admin console** has no connector-level crawl-frequency setting.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Setup occurs in both the Azure portal and the Glean **Admin console**. Choose the guide that matches your retrieval and authentication needs:

-   [Set up certificates for data crawling and indexing](/connectors/native/outlook/native)
-   [Set up certificates for real-time access](/connectors/native/outlook/certificate-federated)
-   [Set up certificates for indexing and real-time access](/connectors/native/outlook/certificate-native-federated)
-   [Set up client ID and secret for real-time access](/connectors/native/outlook/federated)

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   **Permission propagation.** Each thread belongs to a single mailbox owner from Azure AD, and only that owner sees the indexed email in Glean. Product access group membership and any allowed sender domains further restrict scope.
-   **Read-only access.** The Graph app uses only read scopes; Glean never writes or modifies Outlook data.
-   **Authentication.** Indexing requires a certificate. Real-time access supports certificate-based auth or client ID + secret.
