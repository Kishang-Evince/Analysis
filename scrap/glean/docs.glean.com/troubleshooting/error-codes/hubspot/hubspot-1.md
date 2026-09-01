---
url: "https://docs.glean.com/troubleshooting/error-codes/hubspot/hubspot-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/hubspot/hubspot-1"
title: "HUBSPOT_1"
description: "HUBSPOT_1 Error Code"
fetched_at: "2026-09-01T13:30:22.795Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   Either the access token entered is incorrect, or the HubSpot account (or portal) whose ID has been entered does not match the account where the Glean crawler app has been created.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Double check that the access token entered is correct and belongs to the Glean crawler app that you created. If the access token seems correct, then follow the steps below.
-   The Glean crawler app needs to be created in the account that you want Glean to crawl. So if you see that the account ID entered is not the one you want Glean to crawl, then enter the correct account ID.
-   Else, if you see that the account ID is correct, then most likely you have created the app in a different account. In this case, create a new app in the correct HubSpot account, and enter its credentials.

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
