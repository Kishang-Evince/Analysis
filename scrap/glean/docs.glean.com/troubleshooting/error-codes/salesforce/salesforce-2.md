---
url: "https://docs.glean.com/troubleshooting/error-codes/salesforce/salesforce-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/salesforce/salesforce-2"
title: "SALESFORCE_2"
description: "SALESFORCE_2 Error Code"
fetched_at: "2026-09-01T13:30:29.321Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   This error shows up when we are not able to validate permissions necessary for crawling a particular object.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Ensure that the permissions mentioned in [this article here](/connectors/native/salesforce/about#how-permissions-work) are set correctly. Specifically, if any one of the following objects is enabled for crawl, we require both Read and View All permissions under Standard Object Permissions for that particular object.
    -   Account
    -   Campaign
    -   Case
    -   Contact
    -   Lead
    -   Opportunity

Refer to the error message for the exact permission that is failing validation.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
