---
url: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-10"
canonical: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-10"
title: "SERVICENOW_10"
description: "SERVICENOW_10 Error Code"
fetched_at: "2026-09-01T13:30:29.691Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The OAuth session user does not match the configured Glean service account. This typically occurs when an admin or other user signs in during the OAuth authorization step instead of the designated Glean service account (for example, "gleansearch").

## Resolution[​](#resolution "Direct link to Resolution")

1.  Navigate to your Glean Admin Console and go to the ServiceNow connector settings.
2.  Redo the OAuth authorization flow.
3.  When prompted to sign in to ServiceNow during the OAuth step, sign in as the **"gleansearch"** service account (or whichever service account is configured for Glean).
4.  Complete the OAuth flow and rerun validation to confirm the error is resolved.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
