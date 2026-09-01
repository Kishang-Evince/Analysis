---
url: "https://docs.glean.com/troubleshooting/error-codes/box/box-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/box/box-3"
title: "BOX_3"
description: "BOX_3 Error Code"
fetched_at: "2026-09-01T13:30:11.234Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We cannot access information for one or more specific Box users in your configuration.

## Resolution[​](#resolution "Direct link to Resolution")

-   Verify that all user IDs in your Glean configuration are valid and correspond to actual users in your Box enterprise
    
-   In your Box Developer Console, navigate to your Box application → **Configuration** tab → **Application Scopes** and ensure **"Manage users"** is checked/enabled
    
-   Confirm that the authenticated user has Admin or Co-Admin permissions to access information about other users
    
-   Remove any user IDs for users who no longer exist or have been deleted from your Box enterprise
    
-   For JWT applications: ensure the application is configured with **"App Access + Enterprise Access"** application access
    

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
