---
url: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-5"
canonical: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-5"
title: "SERVICENOW_5"
description: "SERVICENOW_5 Error Code"
fetched_at: "2026-09-01T13:30:30.136Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   Unable to access the advanced user criteria REST endpoint /user\_criteria

## Resolution[​](#resolution "Direct link to Resolution")

-   Validate that the create GleanSearch scripted API has been created and configured as per the [instructions for Advanced setup](/connectors/native/servicenow/setup-advanced)
    
-   Ensure the ACL to use that scripted API is granted to the service account user
    
-   Ensure the provided API Namespace configuration matches with the created GleanSearch scripted API
    
    ![](/img/troubleshooting/error-codes/servicenow-errorcode5.png)

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
