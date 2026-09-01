---
url: "https://docs.glean.com/troubleshooting/error-codes/gchat/gchat-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gchat/gchat-3"
title: "GCHAT-3"
description: "GCHAT-3 Error Code"
fetched_at: "2026-09-01T13:30:14.346Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

We are unable to make an API request for a required API scope. The error message displayed in the console should display the specific scope we're unable to validate.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Make sure the 'Google Chat API' is enabled for the Glean GCP Project in use. It can be enabled in the API Library. Head to `https://console.developers.google.com/apis/api/chat.googleapis.com/overview?project=<glean-gcp-project-id>` to check.
    -   If your Glean GCP project is Glean hosted, this step must be performed by your Glean representative.
-   Once the API is enabled, you need to configure the app. Click on Manage and switch to the Configuration tab. If your Glean GCP project is Glean hosted, this step must be performed by your Glean representative. Fill out the fields as below:
    -   App status: LIVE - available to users
    -   App name: Glean
    -   Avatar URL: `https://app.glean.com/images/admin/glean-logo2-256.png`
    -   Description: Google Chat app for Glean
    -   Turn off Enable interactive features

Enable Log errors to Logging

-   App status: LIVE - available to users
-   App name: Glean
-   Avatar URL: `https://app.glean.com/images/admin/glean-logo2-256.png`
-   Description: Google Chat app for Glean
-   Turn off Enable interactive features
-   Enable Log errors to Logging
-   Head to [https://admin.google.com/ac/owl/domainwidedelegation](https://admin.google.com/ac/owl/domainwidedelegation) and ensure the client ID displayed in the error message has been granted the specified API scope
-   If validation still fails:
    -   Ensure that the directory admin email configured in the associated google drive instance has access to google chat from [https://admin.google.com/ac/apps/gmail/hangoutsservicesettings](https://admin.google.com/ac/apps/gmail/hangoutsservicesettings).
    -   Login to Google Chat using the directory admin email and send a chat message to any other user. This marks the user as an active google chat user for the API to work.
-   For more information on the specified API scope: [https://developers.google.com/workspace/chat/authenticate-authorize](https://developers.google.com/workspace/chat/authenticate-authorize)

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
