---
url: "https://docs.glean.com/troubleshooting/error-codes/box/box-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/box/box-2"
title: "BOX_2"
description: "BOX_2 Error Code"
fetched_at: "2026-09-01T13:30:11.211Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We cannot access your Box user information.

## Resolution[​](#resolution "Direct link to Resolution")

-   In your Box Developer Console, navigate to your Box application → **Configuration** tab → **Application Scopes**
    
-   Ensure that **"Manage users"** is checked/enabled and save the configuration changes
    
-   For JWT applications: after enabling the "Manage users" scope, ensure that a Box Admin has re-authorized the application in the Box Admin Console
    
-   Verify that the authenticated user has Admin or Co-Admin permissions to view other users in the organization
    

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
