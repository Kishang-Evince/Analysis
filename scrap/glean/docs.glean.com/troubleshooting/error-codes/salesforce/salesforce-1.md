---
url: "https://docs.glean.com/troubleshooting/error-codes/salesforce/salesforce-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/salesforce/salesforce-1"
title: "SALESFORCE_1"
description: "SALESFORCE_1 Error Code"
fetched_at: "2026-09-01T13:30:29.296Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   This error shows up when we are not able to retrieve the administrative permissions available to the authenticated user.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Ensure that the permissions mentioned in [this article here](/connectors/native/salesforce/about#how-permissions-work) are set correctly. Specifically,
-   Ensure that the `View Roles and Role Hierarchy` permission is set.
-   Ensure that the `View Setup and Configuration` permission is set.
-   Ensure that the `API Enabled` permission is set.
-   Ensure that the `View All Profiles` permission is set. 
-   Ensure that the `View Data Categories in Setup` is set.
-   Some objects also require administrative permissions to be set in order to be able to crawl them. Specifically if you have enabled any of the below objects for crawl, ensure that their corresponding administrative permission is set. 

Reports: Ensure that the `View Reports in Public Folders` permission is set. Dashboards: Ensure that the `View Dashboards in Public Folders` permission is set. FeedItem/Chatter: Ensure that the `View All Data` permission is set. ContentDocument: Ensure that the `Query All Files` permission is set. To grant this permission, follow the instructions in this [Salesforce help article](https://help.salesforce.com/s/articleView?id=000381258&type=1).

Refer to the error message for the exact permission that is failing validation.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
