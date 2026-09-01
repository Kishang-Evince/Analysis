---
url: "https://docs.glean.com/troubleshooting/error-codes/microsoft/sharepoint/sharepointonprem-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/microsoft/sharepoint/sharepointonprem-1"
title: "SHAREPOINTONPREM-1"
description: "SHAREPOINTONPREM-1 Error Code"
fetched_at: "2026-09-01T13:30:28.502Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   We are unable to list site groups using the REST API for the given Sharepoint on-premises server site collection.

## Resolution[​](#resolution "Direct link to Resolution")

The provided user credentials must be an administrator of the configured site collection.

-   Navigate to the owners page for the Sharepoint server: `http://<domain>/_admin/owners.aspx`. The page should look like the following (for domain `sp-onprem-2016` and site collection `/sites/TeamSiteCollection1`)
    
-   Ensure the account used for authenticating via NTLM is a site collection administrator (listed in any of the above boxes).
    
-   Double-check the username and password inputs.
    

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
