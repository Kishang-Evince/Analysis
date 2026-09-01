---
url: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-8"
canonical: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-8"
title: "SERVICENOW_8"
description: "SERVICENOW_8 Error Code"
fetched_at: "2026-09-01T13:30:30.286Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   Glean has detected that one or more of your ServiceNow scripted user criteria are using `gs.getUser()` or `gs.getUserID()` functions.
-   These functions cause conflicts when used in diagnostic tools and are not recommended for scripted user criteria.
-   ServiceNow recommends using the pre-defined `user_id` variable instead for better performance and compatibility.

## Resolution[​](#resolution "Direct link to Resolution")

-   In ServiceNow **User Criteria** record(s) that are scripted (i.e., where the *Script* field is used), replace any usage of `gs.getUser()` or `gs.getUserID()` with the pre-defined `user_id` variable in your scripted user criteria.
-   The `user_id` variable contains the user sys\_id against whom the evaluation is happening and is available by default in the script context.
-   Update your scripted user criteria scripts to use `user_id` instead of calling session APIs.

For example, instead of:

```
var userData = gs.getUserID();
```

Use:

```
var userData = user_id;
```

For more information, see ServiceNow's [user\_id variable usage for user criteria documentation](https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0780775).

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
