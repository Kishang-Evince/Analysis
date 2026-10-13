---
url: "https://docs.glean.com/connectors/native/teams/teams-transcripts"
canonical: "https://docs.glean.com/connectors/native/teams/teams-transcripts"
title: "Teams transcripts"
description: "Maintain transcript access for an existing Teams-based calendar connection, or find setup guidance for the standalone Outlook Calendar connector"
fetched_at: "2026-10-13T08:50:21.702Z"
---
On this page

Use this guide only if your existing Glean Teams connector still manages calendar events and meeting transcripts. For a new standalone connection, see [Set up Outlook Calendar](/connectors/native/outlook-calendar/setup). Outlook Calendar doesn't require the Glean Teams connector.

Keep an existing Teams-based calendar connection's credentials and configuration until your Glean account team confirms the transition. Don't repeat setup or create a duplicate connection.

The instructions on this page apply to transcript access through an already configured Microsoft Teams connector. In that configuration, transcript content supports meeting summaries and answers about meetings users can access.

note

Teams does not expose a document URL for meeting transcripts, so transcripts do not appear as standalone documents in search results. Transcript content is used to generate meeting summaries and to ground chat and AI answers, not to return a transcript as its own search result.

## How it works[​](#how-it-works "Direct link to How it works")

Glean uses the Microsoft Graph API to retrieve meeting transcripts and associate them with calendar events. During background crawling:

1.  Glean discovers available meeting transcripts through Microsoft Graph.
2.  Glean reads the online meeting to match each transcript to a calendar event.
3.  Glean uses transcripts associated with calendar events for meeting summaries and AI answers.

For retrieval, Glean must have indexed both a Microsoft Outlook calendar event for the Teams meeting and its corresponding transcript. Glean Assistant and Agents can then use the transcript to summarize the meeting or answer questions. The calendar result must include full meeting details, and the user must have access to both the calendar event and the indexed transcript.

For related calendar features, see [Calendar search and tools setup](/administration/tools/setup-tools/calendar-search-tools-setup).

### Transcript fetching modes[​](#transcript-fetching-modes "Direct link to Transcript fetching modes")

Transcripts can be fetched in two ways, controlled during connector setup:

-   **Eager crawling (default):** Glean fetches transcript content in the background to support meeting summaries and AI answers. It can fetch only transcripts that Microsoft Graph allows it to access.
-   **On demand:** If you turn off eager crawling, Glean fetches a meeting's transcript only when it's needed, such as when a user with access to the meeting clicks **Summarize** on the **Today** card or asks Glean to summarize the meeting. This keeps transcript API volume low.

Speaker attribution is optional for both fetching modes. If your organization turns off **Include speaker attribution**, Glean automatically retrieves transcript text without speaker names. The text still supports meeting summaries and AI answers.

note

Eager crawling fetches transcripts across many meetings and users at once. Make sure the [application access policy](#configure-the-application-access-policy) covers all the users whose meetings you want to crawl. See [Crawling behavior](#crawling-behavior).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you enable transcripts, verify the following:

-   Your existing [Microsoft Teams connector](/connectors/native/teams/) still manages calendar and transcript access. These prerequisites don't apply to standalone Outlook Calendar setup.
-   Meetings are accessible through Outlook. Meetings organized ad hoc directly from a Teams channel are not indexed.
-   Users need permission to access a meeting before they can retrieve its transcript in Glean.

## Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

Transcripts use a **separate Entra ID app registration** from the messaging connector, with its own **Application (client) ID**. The transcript app uses the **same certificate and private key** as the messaging app — upload the certificate to this app registration too — and you enter its client ID separately in Glean.

Ask a Global Administrator or Privileged Role Administrator to grant admin consent for the following Microsoft Graph application permissions on the transcript app:

-   `Calendars.Read`
-   `OnlineMeetings.Read.All`
-   `OnlineMeetingTranscript.Read.All`

The Teams Administrator role alone can't grant this consent.

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
    
4.  Assign the policy to the users whose meetings the app needs to access. If your organization approves a global assignment, run:
    
    ```
    Grant-CsApplicationAccessPolicy -PolicyName Glean-Meetings-App-Policy -Global
    ```
    
    A global assignment applies to users without an individually assigned application access policy. It doesn't override existing assignments. If a user has another policy, add the transcript app to that policy without removing access for other apps.
    

warning

Use the transcript app's client ID, not the messaging app's client ID. Check that the assigned policy includes that app and covers the relevant meeting organizers.

Application access policy changes can take up to 30 minutes to affect Microsoft Graph calls. See Microsoft's [Configure application access policy](https://learn.microsoft.com/en-us/graph/cloud-communication-online-meeting-application-access-policy#configure-application-access-policy) for per-user assignment and policy details.

### Enable transcript API access in Teams[​](#enable-transcript-api-access-in-teams "Direct link to Enable transcript API access in Teams")

Microsoft Graph access to meeting transcripts is off by default. A Teams Administrator or Global Administrator must turn on **Microsoft Graph access** for transcript retrieval, even if the app has the required permissions and application access policy.

1.  In the **Teams admin center**, go to **Meetings → Meeting settings**.
2.  Under **Transcript API access**, turn on **Microsoft Graph access**.
3.  Click **Configure**, then:
    -   (Optional) Turn on **Include speaker attribution** to include speaker names in transcripts.
    -   To allow or block individual apps and agents, use the link to the **Microsoft Entra admin center** to manage API permissions for each app. Make sure Glean's transcript app isn't blocked.

**Microsoft Graph access** controls access to meeting transcripts, not to Teams channels and chats. You still need the Entra permissions and application access policy.

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

Calendar crawling uses organizer-owned events by default. Glean may not index a meeting in an attendee's calendar if it doesn't crawl the organizer's calendar. Missing calendar events can prevent Glean from associating transcripts with indexed meetings, even when Glean can fetch the transcript content. See [Understand calendar crawl coverage](/connectors/native/outlook/about#calendar-event-crawling).

-   Eager crawling (the default) fetches transcript content in the background to support meeting summaries and AI answers. Glean can fetch only transcripts that Microsoft Graph allows it to access.
-   On-demand fetching keeps transcript API volume low because Glean fetches a transcript only when a user with access to the meeting needs it. To use on-demand fetching, turn off **crawl transcript content eagerly**.
-   Eager crawling fetches transcripts for many users at once. Check that the application access policy covers the meeting organizers in the crawl scope. Ask your Glean account team to confirm the crawl scope before changing policy assignments.

## Limitations[​](#limitations "Direct link to Limitations")

-   Meetings organized ad hoc directly from a Teams channel (not accessible through Outlook) are not indexed.
-   Transcript access follows the user's permissions for the meeting.
-   Teams does not provide a document URL for transcripts, so a transcript is not returned as a standalone search result. Transcript content powers summaries and AI answers instead.
-   Transcript content access is subject to standard Microsoft Graph API rate limits (see [Crawling behavior](#crawling-behavior)).

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Transcripts are not appearing (TEAMS-2)

Verify that the application access policy includes the transcript app's **Application (client) ID** and covers the relevant meeting organizers. A global assignment doesn't override an individual user's policy. Allow up to 30 minutes for policy changes to affect Microsoft Graph calls. See [Configure the application access policy](#configure-the-application-access-policy) and the [TEAMS-2 error reference](/troubleshooting/error-codes/microsoft/teams/teams-2).

### Transcript crawling is being throttled

Check the returned Microsoft Graph error before changing access. Confirm that the application access policy covers the meeting organizers in the crawl scope. Ask your Glean account team to review the crawl scope and transcript-fetching settings rather than granting broader access to resolve throttling.

### Grant admin consent fails with an entitlement-grants error

Granting admin consent can intermittently fail with "Number of entitlement grants cannot exceed the allowed maximum (1500)." Refresh the Azure portal page and confirm whether the permissions were granted; the error often clears on refresh. If it persists, grant consent with a different Global Administrator account.

## Frequently asked questions[​](#faqs "Direct link to Frequently asked questions")

### Why are speaker names missing from meeting summaries and answers?

Your organization might have turned off **Include speaker attribution** in the **Teams admin center**. Glean can still use the transcript text, but it doesn't receive speaker names with the transcript. Ask a Teams Administrator or Global Administrator to check the setting. See [Enable transcript API access in Teams](#enable-transcript-api-access-in-teams).

### Do transcripts appear as search results?

No. Teams does not expose a document URL for transcripts, so a transcript is not returned as its own search result. Transcript content is used to generate meeting summaries on the **Today** card and to ground Glean's answers about meetings you can access.

### What's the difference between on-demand and eager crawling?

Eager crawling (the default) fetches transcript content for all accessible meetings in the background, so summaries and answers are ready immediately. On demand fetches a transcript only when it's needed, such as when you click **Summarize** or ask Glean about the meeting, which keeps transcript API volume lower.

### Does the transcript app use a separate certificate?

No. The transcript app uses the **same certificate and private key** as the messaging connector — upload the same certificate to the transcript app registration. Only the Application (client) ID differs. Legacy client-secret deployments use a separate transcript client secret.

### Why does setup use a separate app for transcripts?

Transcripts require a distinct set of Microsoft Graph permissions and an application access policy scoped to a specific app. Keeping transcripts in their own app registration lets you grant only the transcript scopes — and apply the access policy — without affecting the messaging connector. It also makes a transcripts-and-meetings-only setup possible.

### Can I index transcripts without crawling Teams messages?

Yes. For a new connection, use the standalone Outlook Calendar connector. See [Set up Outlook Calendar](/connectors/native/outlook-calendar/setup). Keep an existing Teams-based calendar connection's configuration until your Glean account team confirms the transition.

### Why do I see an "Action required: Enable Teams transcript access by 7/29" banner in the Admin console?

This banner is surfaced by Glean to notify Microsoft 365 administrators about a Microsoft change: Teams meeting transcript access through Microsoft Graph must now be explicitly enabled in the Teams admin center. It is a Microsoft-side control, not a Glean feature change.

-   **Who sees it.** Only administrators with permissions to manage connectors in the Glean **Admin console**. It is not shown to end users.
-   **When it appears.** In deployments that have a Microsoft Teams connector connected. It appears regardless of whether **crawl transcript content eagerly** is turned on or off in the connector, so admins whose deployments don't use Teams transcripts may still see it.
-   **What to do.** Follow [Enable transcript API access in Teams](#enable-transcript-api-access-in-teams) on this page. If you do not use Teams transcripts, you can dismiss the banner with the "×" in its upper right.
-   **Impact of not enabling it.** Only Teams meeting transcript retrieval is affected. Once Microsoft enforces the setting, Glean can't fetch Teams meeting transcripts and meeting summaries and AI answers grounded in Teams transcripts become unavailable. The base Microsoft Teams channels, chats, and messages connector is not affected, and there is no impact on sign-in or other Glean features.
