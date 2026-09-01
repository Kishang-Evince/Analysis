---
url: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-2"
title: "SERVICENOW_2"
description: "SERVICENOW_2 Error Code"
fetched_at: "2026-09-01T13:30:29.709Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   This indicates the service account is unable to access one of the record tables (see the setup instructions for a complete list of tables that we access)

## Resolution[​](#resolution "Direct link to Resolution")

-   Validate that each selected crawl mode (i.e [ITSM](https://www.servicenow.com/products/itsm.html), [APM](https://www.servicenow.com/products/application-portfolio-management.html), [SPM)](https://www.servicenow.com/products/strategic-portfolio-management.html) are applications which existing in the ServiceNow instance
-   Ensure each of the outlined tables exist
-   Validate the service account user has the appropriate roles (listed in the setup instructions) that are prerequisites to access those tables.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
