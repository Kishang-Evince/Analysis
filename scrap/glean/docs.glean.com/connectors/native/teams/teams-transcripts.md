---
url: "https://docs.glean.com/connectors/native/teams/teams-transcripts"
canonical: "https://docs.glean.com/connectors/native/teams/teams-transcripts"
title: "Teams transcripts"
description: "Index Microsoft Teams meeting transcripts so meeting content powers Glean summaries and AI answers."
fetched_at: "2026-09-01T13:29:45.499Z"
---
On this page

Glean can index Microsoft Teams meeting transcripts so that meeting content powers AI answers and meeting summaries. Once enabled, attendees can generate a summary from the **Today** calendar card on the Glean home page, and transcript content grounds Glean's answers about meetings they attended.

This page covers the additional setup required for transcripts. It builds on the base [Microsoft Teams connector](/connectors/native/teams/), which must be configured first.

note

Teams does not expose a document URL for meeting transcripts, so transcripts do not appear as standalone documents in search results. Transcript content is used to generate meeting summaries and to ground chat and AI answers, not to return a transcript as its own search result.

## How it works[​](#how-it-works "Direct link to How it works")

Glean reads your calendar through the Microsoft Graph API to find meetings that have transcripts, then fetches the transcript content for those meetings.

1.  Glean enumerates calendar events (Outlook calendar) to identify meetings with associated transcripts.
2.  For each meeting, Glean reads the online meeting and its transcript through the meeting transcript endpoints.
3.  Transcript content is made available for meeting summaries and AI answers.

For related calendar features, see [Calendar search and tools setup](/administration/tools/setup-tools/calendar-search-tools-setup).

### Transcript fetching modes[​](#transcript-fetching-modes "Direct link to Transcript fetching modes")

Transcripts can be fetched in two ways, controlled during connector setup:

-   **Eager crawling (default):** Glean fetches transcript content for all accessible meetings in the background, so summaries and answers are ready before anyone asks for them.
-   **On demand:** If you turn off eager crawling, Glean fetches a meeting's transcript only when it's needed, such as when an attendee clicks **Summarize** on the **Today** card or asks Glean to summarize the meeting. This keeps transcript API volume low.

note

Eager crawling fetches transcripts across many meetings and users at once. Make sure the [application access policy](#configure-the-application-access-policy) covers all the users whose meetings you want to crawl. See [Crawling behavior](#crawling-behavior).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you enable transcripts, verify the following:

-   The [Microsoft Teams connector](/connectors/native/teams/) is configured and operational.
-   Meetings are accessible through Outlook. Meetings organized ad hoc directly from a Teams channel are not indexed.
-   Transcripts are visible only to meeting attendees. Non-attendees cannot access transcript content in Glean.

## Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

Transcripts use a **separate Entra ID app registration** from the messaging connector, with its own **Application (client) ID**. The transcript app uses the **same certificate and private key** as the messaging app — upload the certificate to this app registration too — and you enter its client ID separately in Glean.

Grant admin consent for the following Microsoft Graph **application** permissions on the transcript app:

-   `Calendars.Read`
-   `OnlineMeetings.Read.All`
-   `OnlineMeetingTranscript.Read.All`

note

**Transcripts and meetings only (no messages).** To index transcripts without crawling Teams messages, configure the transcript app with the three scopes above plus the identity scopes Glean needs to resolve attendees:

-   `User.Read.All`
-   `GroupMember.Read.All`

Without the messaging permissions (`ChannelMessage.Read.All`, `Chat.Read.All`, and so on), Glean does not crawl Teams messages.

## Set up transcript indexing (Azure)[​](#set-up-transcript-indexing-azure "Direct link to Set up transcript indexing (Azure)")

Register the transcript app and grant it API access the same way as the main connector app (see [Microsoft Teams setup](/connectors/native/teams/setup#microsoft-teams-setup-azure) for the app registration, certificate, and admin-consent steps), then complete the transcript-specific steps below.

### Configure the application access policy[​](#configure-the-application-access-policy "Direct link to Configure the application access policy")

Microsoft requires an [application access policy](https://learn.microsoft.com/en-us/graph/cloud-communication-online-meeting-application-access-policy#configure-application-access-policy) for an application to access online meetings and transcripts. Without this policy, transcript crawling fails with a **TEAMS-2** error even when the API permissions are granted.

1.  Install [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-macos?view=powershell-7.1) if it is not already installed. PowerShell is available for both macOS and Windows.
    
2.  Install and connect to the Microsoft Teams module:
    
    ```
    Install-Module MicrosoftTeamsImport-Module MicrosoftTeamsConnect-MicrosoftTeams
    ```
    
    This prompts you to sign in to Microsoft.
    
3.  Create an application access policy using the **transcript app's** Application (client) ID:
    
    ```
    New-CsApplicationAccessPolicy -Identity Glean-Meetings-App-Policy -AppIds "<transcript_client_id>" -Description "Glean Meetings App Policy"
    ```
    
4.  Grant the policy globally:
    
    ```
    Grant-CsApplicationAccessPolicy -PolicyName Glean-Meetings-App-Policy -Global
    ```
    
    This grants the application tenant-wide access to online meetings. You can revoke it at any time through PowerShell.
    

warning

Use the **transcript app's** client ID, not the main messaging connector's client ID. Referencing the wrong client ID, or creating the policy without granting it globally, is the most common cause of **TEAMS-2** errors and silently returns zero transcripts.

note

Application access policy changes can take up to 30 minutes to propagate, and in some cases up to 24–48 hours.

### Enable transcript API access in Teams[​](#enable-transcript-api-access-in-teams "Direct link to Enable transcript API access in Teams")

A Teams Administrator or Global Administrator completing the transcript setup must enable this setting.

1.  In the Teams admin center, go to **Meetings → Meeting settings**
2.  Under **Transcript API access**, turn on **Microsoft Graph access**
3.  Select **Configure**, then:
    -   Turn on **Include speaker attribution** so transcripts retrieved through the Graph API identify who said what
    -   To allow or block individual apps and agents, use the link to the Microsoft Entra admin center to manage API permissions for each app. Make sure Glean's transcript app isn't blocked
4.  Click **Save**.

note

This setting controls Microsoft Graph access to meeting transcripts only. It's required for transcript indexing, not for the base Teams channel and chat connector. The Entra permissions and the application access policy above are still required.

warning

If **Microsoft Graph access** is off, Glean can't fetch transcripts, regardless of the app permissions you've granted. Turn it on during setup so transcript retrieval doesn't fail.

### Provide transcript credentials in Glean[​](#provide-transcript-credentials-in-glean "Direct link to Provide transcript credentials in Glean")

In the Microsoft Teams connector setup, complete the transcript section:

-   **Directory (tenant) ID** — the same tenant ID as the messaging connector.
-   **Transcript Application (client) ID** — the client ID of the transcript app registration.
-   **Client certificate** and **private key** — the same certificate and PKCS#8 private key pair used for the messaging app. (Legacy client-secret deployments enter a separate transcript client secret instead.)
-   Glean crawls transcript content eagerly by default. To fetch transcripts on demand instead, turn off **crawl transcript content eagerly**.

Glean automatically enables meeting crawling when transcripts are turned on.

## Crawling behavior[​](#crawling-behavior "Direct link to Crawling behavior")

-   Eager crawling (the default) fetches transcript content for all accessible meetings in the background, so summaries and answers are ready before anyone asks for them.
-   On-demand fetching keeps transcript API volume low because Glean fetches a transcript only when an attendee needs it. To use on-demand fetching, turn off **crawl transcript content eagerly**.
-   Eager crawling fetches transcripts for many users at once. If the application access policy is scoped to only a subset of users but Glean attempts to crawl all users, the repeated failed attempts can cause throttling. Grant the policy globally, or scope eager crawling to the users the policy covers.

## Limitations[​](#limitations "Direct link to Limitations")

-   Meetings organized ad hoc directly from a Teams channel (not accessible through Outlook) are not indexed.
-   Transcripts are visible only to meeting attendees.
-   Teams does not provide a document URL for transcripts, so a transcript is not returned as a standalone search result. Transcript content powers summaries and AI answers instead.
-   Transcript content access is subject to standard Microsoft Graph API rate limits (see [Crawling behavior](#crawling-behavior)).

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Transcripts are not appearing (TEAMS-2)

Transcripts require an application access policy granted globally. Verify that the policy references the **transcript app's** Application (client) ID and was granted with `Grant-CsApplicationAccessPolicy -Global`. Allow 30 minutes — and in some cases 24–48 hours — for the policy to propagate. See the [TEAMS-2 error reference](/troubleshooting/error-codes/microsoft/teams/teams-2).

### Transcript crawling is being throttled

With eager crawling enabled, Glean attempts to fetch transcripts for all accessible users. If the application access policy covers only some users, the failed attempts for the remaining users can trigger throttling. Grant the policy globally (or to all licensed users), or turn off eager crawling to fetch transcripts on demand instead.

### Grant admin consent fails with an entitlement-grants error

Granting admin consent can intermittently fail with "Number of entitlement grants cannot exceed the allowed maximum (1500)." Refresh the Azure portal page and confirm whether the permissions were granted; the error often clears on refresh. If it persists, grant consent with a different Global Administrator account.

## FAQs[​](#faqs "Direct link to FAQs")

### Do transcripts appear as search results?

No. Teams does not expose a document URL for transcripts, so a transcript is not returned as its own search result. Transcript content is used to generate meeting summaries on the **Today** card and to ground Glean's answers about meetings you attended.

### What's the difference between on-demand and eager crawling?

Eager crawling (the default) fetches transcript content for all accessible meetings in the background, so summaries and answers are ready immediately. On demand fetches a transcript only when it's needed, such as when you click **Summarize** or ask Glean about the meeting, which keeps transcript API volume lower.

### Does the transcript app use a separate certificate?

No. The transcript app uses the **same certificate and private key** as the messaging connector — upload the same certificate to the transcript app registration. Only the Application (client) ID differs. Legacy client-secret deployments use a separate transcript client secret.

### Why does setup use a separate app for transcripts?

Transcripts require a distinct set of Microsoft Graph permissions and an application access policy scoped to a specific app. Keeping transcripts in their own app registration lets you grant only the transcript scopes — and apply the access policy — without affecting the messaging connector. It also makes a transcripts-and-meetings-only setup possible.

### Can I index transcripts without crawling Teams messages?

Yes. Configure the transcript app with `Calendars.Read`, `OnlineMeetings.Read.All`, and `OnlineMeetingTranscript.Read.All`, plus `User.Read.All` and `GroupMember.Read.All` for identity resolution. Without the messaging permissions, Glean does not crawl Teams messages.

### Why do I see an "Action required: Enable Teams transcript access by 7/29" banner in the admin console?

This banner is surfaced by Glean to notify Microsoft 365 administrators about a Microsoft change: Teams meeting transcript access through Microsoft Graph must now be explicitly enabled in the Teams admin center. It is a Microsoft-side control, not a Glean feature change.

-   **Who sees it.** Only administrators with permissions to manage connectors in the Glean admin console. It is not shown to end users.
-   **When it appears.** In deployments that have a Microsoft Teams connector connected. It appears regardless of whether **crawl transcript content eagerly** is turned on or off in the connector, so admins whose deployments don't use Teams transcripts may still see it.
-   **What to do.** Follow [Enable transcript API access in Teams](#enable-transcript-api-access-in-teams) on this page. If you do not use Teams transcripts, you can dismiss the banner with the "×" in its upper right.
-   **Impact of not enabling it.** Only Teams meeting transcript retrieval is affected. Once Microsoft enforces the setting, Glean can't fetch Teams meeting transcripts and meeting summaries and AI answers grounded in Teams transcripts become unavailable. The base Microsoft Teams channels, chats, and messages connector is not affected, and there is no impact on sign-in or other Glean features.
