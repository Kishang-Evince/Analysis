---
url: "https://docs.glean.com/troubleshooting/error-codes/salesforce/salesforce-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/salesforce/salesforce-3"
title: "SALESFORCE_3"
description: "SALESFORCE_3 Error Code"
fetched_at: "2026-09-01T13:30:29.335Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

We require field level read permissions for some specific fields for each of the Salesforce objects that would be crawled. This error shows up when we detect that field level permissions were not set for a field.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   We require Read Access for a few basic fields in each object so that it can be crawled successfully. Follow the instructions mentioned in the [Salesforce documentation](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/users_profiles_fls.htm) in order to set the field level permissions.
-   To validate if the field level permissions were set, ensure that you can view these fields when logged in as the authenticated user on Salesforce while viewing a document of that object.

Refer to the error message for the exact field of the object that is failing validation.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
