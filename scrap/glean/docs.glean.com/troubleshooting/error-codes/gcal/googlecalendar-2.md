---
url: "https://docs.glean.com/troubleshooting/error-codes/gcal/googlecalendar-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gcal/googlecalendar-2"
title: "GOOGLECALENDAR-2"
description: "GOOGLECALENDAR-2 Error Code"
fetched_at: "2026-09-01T13:30:13.927Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   Could not validate that the google calendar api is set up correctly with the right scopes.

## Resolution[​](#resolution "Direct link to Resolution")

-   Ensure that the Google Calendar API (calendar-json.googleapis.com) is enabled on your Google Project. Head to [https://admin.google.com/u/1/ac/owl/domainwidedelegation](https://admin.google.com/u/1/ac/owl/domainwidedelegation) and ensure that the google client ID has been granted the `https://www.googleapis.com/auth/calendar` or `https://www.googleapis.com/auth/calendar.readonly` scope. Ensure that the app with the respective google client id is listed as trusted in the following [https://admin.google.com/ac/owl/list?tab=configuredApps](https://admin.google.com/ac/owl/list?tab=configuredApps).

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
