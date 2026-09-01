---
url: "https://docs.glean.com/troubleshooting/error-codes/gchat/gchat-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gchat/gchat-2"
title: "GCHAT-2"
description: "GCHAT-2 Error Code"
fetched_at: "2026-09-01T13:30:14.318Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

We are unable to fetch an access token for a required API scope. The error message displayed in the console should display the specific scope we're missing.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Head to [https://admin.google.com/ac/owl/domainwidedelegation](https://admin.google.com/ac/owl/domainwidedelegation) and ensure the client ID displayed in the error message has been granted the specified API scope
-   For more information on the specified API scope: [https://developers.google.com/workspace/chat/authenticate-authorize](https://developers.google.com/workspace/chat/authenticate-authorize)

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
