---
url: "https://docs.glean.com/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-3"
title: "OUTLOOK-CALENDAR_3"
description: "OUTLOOK-CALENDAR_3 Error Code"
fetched_at: "2026-09-01T13:30:28.237Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

-   The Glean application cannot access meeting transcripts from your Outlook Calendar through the Microsoft Graph API

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   Transcript API access is not enabled for your tenant. By default, Microsoft Graph access to meeting transcripts is off, so apps and agents cannot access meeting transcripts regardless of the app-level permissions granted.
-   Microsoft Graph access is enabled at the tenant level, but the Glean app is blocked from accessing transcripts in the per-app API permission settings.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

To resolve this error, try the following steps.

### Enable transcript API access and speaker attribution[​](#enable-transcript-api-access-and-speaker-attribution "Direct link to Enable transcript API access and speaker attribution")

1.  In the left navigation of the [Teams admin center](https://admin.teams.microsoft.com/), go to **Meetings** → **Meeting settings**.
2.  Under **Transcript API access**, turn the **Microsoft Graph access** toggle **On** to allow apps and agents to access meeting transcripts.
3.  Select **Configure**, then turn on **Include speaker attribution**.

If you continue to see this error, contact [Glean Support](https://support.glean.com).
