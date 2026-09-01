---
url: "https://docs.glean.com/troubleshooting/error-codes/box/box-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/box/box-1"
title: "BOX_1"
description: "BOX_1 Error Code"
fetched_at: "2026-09-01T13:30:11.222Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We are unable to authenticate with Box.

## Resolution[​](#resolution "Direct link to Resolution")

-   Verify that your Box application has been created and configured correctly in the Box Developer Console
    
-   Confirm that the OAuth Client ID and OAuth Client Secret fields in Glean match the credentials from your Box application
    
-   Ensure that your Box application has not expired, been deleted, or disabled
    
-   Check that the redirect URI in your Box application settings matches what you've configured in Glean
    
-   For JWT applications: verify that the JWT private key and credentials are correctly entered and that a Box Admin has authorized the application
    

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
