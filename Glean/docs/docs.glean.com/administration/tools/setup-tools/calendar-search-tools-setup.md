---
url: "https://docs.glean.com/administration/tools/setup-tools/calendar-search-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/calendar-search-tools-setup"
title: "Calendar Search Tools Setup"
description: "Configure Google and Outlook calendar access for Glean Assistant and agents, and distinguish live lookup from indexed meeting features"
fetched_at: "2026-10-13T08:49:32.047Z"
---
On this page

Configure calendar access so people can find meetings in Glean Assistant and agents. Glean supports Google Calendar and Microsoft Outlook Calendar, with separate requirements for live lookup and indexed meeting features.

## Compare calendar lookup support[​](#compare-calendar-lookup-support "Direct link to Compare calendar lookup support")

The expanded lookups apply to both Google and Outlook calendars. The following table distinguishes them from legacy workflow and indexed meeting features.

| Where people use calendar data | Calendar lookup support |
| --- | --- |
| Glean Assistant and autonomous agents | Look 3–12 months back or ahead, look up a colleague's calendar when the requester has access, and search accessible team, room, resource, subscribed, and holiday calendars |
| Legacy workflow agents | Receive calendar lookup performance improvements, but not the expanded date-range, colleague-calendar, or shared-calendar lookup capabilities |
| Indexed Search and homepage meeting features | Use indexed events and available transcripts according to the connector's existing indexing scope. Expanded live lookup doesn't add shared calendars to the index or extend the indexing window |

Live lookup retrieves calendar data from the provider at query time, also called federated access. It doesn't require the requested event to be in Glean's native index. Keep native indexing configured for features that depend on indexed events.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Configure the provider connection and calendar permissions for your meeting ecosystem. Users must already have access to the calendars they request. Admin consent to connector permissions doesn't grant users broader visibility into other people's events.

If a user has free/busy access, Glean doesn't expose titles, descriptions, or attendees that the source calendar hides. Access to private-event details also depends on the user's source permissions.

### Google Calendar[​](#google-calendar "Direct link to Google Calendar")

Configure Google Calendar data fetching. The existing connector setup uses the Google Drive service account and domain-wide delegation, with the Google Calendar API enabled and the `https://www.googleapis.com/auth/calendar.readonly` scope. See [Google Calendar setup](/connectors/native/gcal/setup).

The native indexing prerequisites and Google Calendar MCP authorization are separate setup requirements. Don't require an indexing crawl to finish before validating live calendar lookup.

### Microsoft Outlook Calendar[​](#microsoft-outlook-calendar "Direct link to Microsoft Outlook Calendar")

Configure Microsoft calendar access through the Microsoft Teams connector, or through the standalone Outlook Calendar connector if your organization has migrated to it. Calendar lookup uses the configured connector's calendar-access credentials, which come from the transcript app for Teams. Ask your Glean admin which connector your organization uses.

Check that the Microsoft Entra app used for calendar access has the Microsoft Graph `Calendars.Read` application permission with admin consent and valid credentials. Delegated `Calendars.Read` permission alone isn't sufficient. Follow the connector's setup guidance for its other required permissions. Outlook email setup alone doesn't configure calendar lookup.

For Teams-based calendar access, see [Set up the Teams connector](/connectors/native/teams/setup) and [Teams transcripts](/connectors/native/teams/teams-transcripts) for the app and permission setup. Looking up calendar events doesn't require those events to have transcripts.

## Compare indexed meeting and transcript features[​](#compare-indexed-meeting-and-transcript-features "Direct link to Compare indexed meeting and transcript features")

The following table covers existing meeting and transcript features. The workflow-agent column doesn't describe the expanded autonomous-agent lookups.

| Meeting element | Search | Home page summarization | Glean queries | Workflow agent |
| --- | --- | --- | --- | --- |
| Microsoft Outlook Calendar events | Searching for Outlook calendar events is supported | Supported through calendar events on Calendar card on home page | Querying for past and upcoming Outlook events is supported | Fetch events through the Calendar search workflow step, without the expanded lookup capabilities |
| Microsoft Teams transcripts | Unsupported due to unavailability of transcript URL from Microsoft | Summarization of team transcripts is supported. Follow-up Q&A is unsupported | Querying for past teams transcripts is supported | Ability to fetch transcript is unsupported |
| Google Calendar events | Searching for Google calendar events is supported | Supported through calendar events on Calendar card on home page | Querying for past and upcoming Google Calendar events is supported | Fetch events through the Calendar search workflow step, without the expanded lookup capabilities |
| Google Meet transcript | Supported through app:googlecalendar, meeting title search and structured results (based on ranking relevance) | Summarization of Meet transcripts and follow-up Q&A is unsupported | Querying for past Google meet transcripts is supported | Google transcripts are stored as a Google doc. Ability to read transcript documents is supported |

Use the connector guides for indexing and other meeting features:

[

### Google Calendar







](/connectors/native/gcal/)[

### Microsoft Teams







](/connectors/native/teams/)

## Verify calendar lookup[​](#verify-calendar-lookup "Direct link to Verify calendar lookup")

After you configure calendar access:

1.  In Glean Assistant, ask about a known meeting in your own calendar.
2.  Try a longer-range query, such as “Find my meetings with Acme from the last six months.”
3.  Ask about a colleague's calendar or a shared calendar you can already view in the source.
4.  Check that the returned event details match your source permissions. A user with free/busy access shouldn't receive private meeting details.

For user-facing examples and workflow step configuration, see [Calendar search](/tools/glean/calendar-search).
