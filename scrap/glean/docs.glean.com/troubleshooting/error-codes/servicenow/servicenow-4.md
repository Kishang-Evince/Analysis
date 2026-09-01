---
url: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-4"
title: "SERVICENOW_4"
description: "SERVICENOW_4 Error Code"
fetched_at: "2026-09-01T13:30:29.896Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   There are advanced user criterias in the ServiceNow instance and the current setup mode does not support advanced user criterias.
-   Any permissioning schema that depends on these advanced user criterias will not be fully adhered to.
-   For more information on advanced user criteria see this [article](https://www.servicenow.com/community/now-platform-blog/a-deep-dive-to-user-criteria/ba-p/2281285).

## Resolution[​](#resolution "Direct link to Resolution")

There are 2 options:

-   Support advanced user criteria: Consider performing ServiceNow setup in Advanced mode (switch from Simple) to support advanced user criterias.
-   Ignore advanced user criteria: If you accept the ramifications of being unable to adhere to permissions dependent on advanced user criterias, you can bypass the check by ticking the "Ignore present advanced user criterias" checkbox.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
