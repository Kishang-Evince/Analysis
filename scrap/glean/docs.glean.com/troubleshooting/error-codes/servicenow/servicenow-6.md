---
url: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-6"
canonical: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-6"
title: "SERVICENOW_6"
description: "SERVICENOW_6 Error Code"
fetched_at: "2026-09-01T13:30:30.080Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   There exist some records in some of the tables (see the setup instructions for the complete list of tables) which we access that we don't have full access to. This is typically attributed to records outside of the global scope (i.e HR or Employee Core Knowledge Base).
-   Since access is limited, this results in reduced scope of what gets crawled and limits our ability to grant accurate permissions.

## Resolution[​](#resolution "Direct link to Resolution")

-   One can reproduce the error by using the [Rest API Explorer](https://docs.servicenow.com/bundle/washingtondc-api-reference/page/integrate/inbound-rest/concept/use-REST-API-Explorer.html), impersonating the service account user (gleansearchuser), and querying each of the listed tables. If the response is empty, that indicates a table our service account user does not have full access to.
-   Coordinate with the ServiceNow admin to see if [cross-scope access](https://docs.servicenow.com/bundle/tokyo-application-development/page/build/applications/task/set-RCA-level.html) is feasible to allow the globally-scope user to access non-global components.
-   Also consider adding any additional roles to the ServiceNow service account that allows it to access components from this non-global scope (i.e an sn\_hr\_core.admin role for HR scopes)
-   If granting higher privileges is infeasible and you accept the ramifications of the issue above, you can bypass this check with checking "Ignore under permissioned access to tables"

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
