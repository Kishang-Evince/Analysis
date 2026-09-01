---
url: "https://docs.glean.com/troubleshooting/error-codes/gmail/gmail-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gmail/gmail-4"
title: "GMAIL-4"
description: "GMAIL-4 Error Code"
fetched_at: "2026-09-01T13:30:21.548Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   Could not validate that the gmail api is set up correctly with the right scopes.

## Resolution[​](#resolution "Direct link to Resolution")

-   Ensure that the Gmail API (gmail.googleapis.com) is enabled on your Google Project. Head to [https://admin.google.com/u/1/ac/owl/domainwidedelegation](https://admin.google.com/u/1/ac/owl/domainwidedelegation) and ensure that the google client ID has been granted the [https://www.googleapis.com/auth/gmail.readonly](https://www.googleapis.com/auth/gmail.readonly) scope. Ensure that the app with the respective google client id is listed as trusted in the following [https://admin.google.com/ac/owl/list?tab=configuredApps](https://admin.google.com/ac/owl/list?tab=configuredApps).

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
