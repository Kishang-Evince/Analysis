---
url: "https://docs.glean.com/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-2"
title: "OUTLOOK-CALENDAR_2"
description: "OUTLOOK-CALENDAR_2 Error Code"
fetched_at: "2026-09-01T13:30:28.273Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

-   The Glean Outlook Calendar application cannot access online meetings and transcripts.

## Possible reason[​](#possible-reason "Direct link to Possible reason")

-   An [application access policy](https://learn.microsoft.com/en-us/graph/cloud-communication-online-meeting-application-access-policy#configure-application-access-policy) has not been configured for applications to access meetings and transcripts.
-   Without this policy, even with the correct API permissions granted, the application cannot access online meeting content.

## Possible resolution[​](#possible-resolution "Direct link to Possible resolution")

To resolve this error, try the following resolution:

### Configure application access policy for online meetings[​](#configure-application-access-policy-for-online-meetings "Direct link to Configure application access policy for online meetings")

Configure an application access policy for your Glean Outlook Calendar application.

See the Outlook Calendar setup instructions in the admin console, specifically the section **Configure access policy to access online meetings**.

If you continue to see this error, contact [Glean Support](https://support.glean.com).
