---
url: "https://docs.glean.com/connectors/native/outlook-calendar/permissions"
canonical: "https://docs.glean.com/connectors/native/outlook-calendar/permissions"
title: "Outlook Calendar permissions"
description: "Review required Microsoft Graph application permissions, administrator roles, and calendar and transcript access controls for Outlook Calendar"
fetched_at: "2026-10-13T08:50:08.740Z"
---
On this page

Grant the Outlook Calendar application read access to calendar, identity, and meeting data. These application permissions let Glean retrieve content, but don't grant every Glean user access to every meeting.

## Grant application permissions[​](#grant-application-permissions "Direct link to Grant application permissions")

Complete the standalone setup with a Microsoft Entra Global Administrator account and permission to manage connectors in Glean. Grant all five Microsoft Graph application permissions to the app registered for Outlook Calendar.

| Application permission | Purpose |
| --- | --- |
| `User.Read.All` | Read user identities for permission mapping |
| `GroupMember.Read.All` | Read group membership for identity and access mapping |
| `Calendars.Read` | Read calendar events |
| `OnlineMeetings.Read.All` | Read online meeting metadata |
| `OnlineMeetingTranscript.Read.All` | Read meeting transcripts |

Choose **Application permissions**, not delegated permissions. A Global Administrator can grant admin consent. Microsoft also permits a Privileged Role Administrator to complete this consent step. Application Administrator, Cloud Application Administrator, and Teams Administrator roles alone can't grant consent for these Microsoft Graph application permissions. See Microsoft's [Grant tenant-wide admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent).

The connector validates all five permissions even when **Enable Transcript Content Crawling** is off. This option isn't a reduced-permission setup path.

The connector doesn't require `Mail.Read`, `Chat.Read.All`, or `ChannelMessage.Read.All`. Email and Teams message indexing use separate connectors.

## Authorize meeting transcripts[​](#authorize-meeting-transcripts "Direct link to Authorize meeting transcripts")

Microsoft requires additional controls for transcript retrieval:

-   An application access policy that authorizes the Outlook Calendar app for the relevant meeting organizers
-   **Microsoft Graph access** turned on under **Transcript API access** in the **Teams admin center** (off by default)
-   App-level permissions that don't block the Outlook Calendar app

A Teams Administrator or Global Administrator manages the Teams transcript-access setting. This role is separate from the role required to grant Graph application consent.

**Include speaker attribution** is optional. Turning it off can remove speaker names from transcript text, but doesn't prevent Glean from retrieving the text. See [Set up Outlook Calendar](/connectors/native/outlook-calendar/setup#configure-transcript-access).

## Understand user visibility[​](#understand-user-visibility "Direct link to Understand user visibility")

For indexed non-draft events, Glean maps the organizer and attendees to users and groups. Draft events are visible to the organizer. Glean doesn't treat application consent as permission for all users to view all events.

Live calendar lookup uses source-calendar permissions, separately from indexed event permissions. See [Calendar search](/tools/glean/calendar-search#prerequisites) for access requirements by Glean experience.

Transcript retrieval also checks the user's access to the meeting. An administrator's application permissions don't make transcripts available to users who lack that access.

Crawl restrictions determine which content Glean retrieves. They don't replace document permissions. For missing events, see [Troubleshoot Outlook Calendar](/connectors/native/outlook-calendar/troubleshooting#a-meeting-is-missing-from-search).
