---
url: "https://docs.glean.com/troubleshooting/error-codes/box/box-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/box/box-4"
title: "BOX_4"
description: "BOX_4 Error Code"
fetched_at: "2026-09-01T13:30:11.247Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The Box OAuth user does not have full admin-level privileges required for Box content access.

## Resolution[​](#resolution "Direct link to Resolution")

-   In your Box Admin Console, navigate to **Users** → **Managed Users** and find the OAuth user account being used for the Glean integration
    
-   Verify that the user's role is set to **"Admin"** (not "Co-admin")
    
-   If the user is currently a Co-admin, upgrade them to full Admin status or configure Glean to use a different Box account that has full Admin privileges
    
-   Note: Only one user can have the Admin role, so you may need to transfer admin rights from the current Admin
    
-   Alternative: Consider using JWT (Server Authentication) instead of OAuth 2.0, which doesn't have this admin role requirement
    

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
