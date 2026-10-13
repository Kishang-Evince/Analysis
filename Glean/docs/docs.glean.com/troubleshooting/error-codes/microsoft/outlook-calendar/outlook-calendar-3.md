---
url: "https://docs.glean.com/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-3"
title: "OUTLOOK-CALENDAR_3"
description: "OUTLOOK-CALENDAR_3 Error Code"
fetched_at: "2026-10-13T08:51:12.393Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Microsoft Graph reports that meeting transcript access is disabled in the Microsoft Teams admin center.

## Resolution[​](#resolution "Direct link to Resolution")

Ask a Teams Administrator or Global Administrator to check the tenant-level transcript access setting:

1.  Open the [Teams admin center](https://admin.teams.microsoft.com/).
2.  Go to **Meetings → Meeting settings**.
3.  Under **Transcript API access**, turn on **Microsoft Graph access**.

**Include speaker attribution** is optional. Glean automatically retrieves transcript text without speaker names when this setting is off.

If **Microsoft Graph access** is already on, check app-level permissions next. Click **Configure**, then use the link to the **Microsoft Entra admin center** to verify that Glean's transcript app isn't blocked and has the required application permissions and admin consent. Other permission problems can block transcript retrieval without producing this error code.

A Global Administrator or Privileged Role Administrator must grant admin consent for Microsoft Graph application permissions. The Teams Administrator role alone can't grant this consent.

Transcript retrieval also requires an application access policy. See [Teams transcripts](/connectors/native/teams/teams-transcripts) for the full setup requirements.

For additional assistance, contact [Glean Support](https://support.glean.com).
