---
url: "https://docs.glean.com/troubleshooting/error-codes/jira/jira-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/jira/jira-3"
title: "JIRA_3"
description: "JIRA_3 Error Code"
fetched_at: "2026-09-01T13:30:24.320Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   We are unable to fetch users from the product access groups entered.

## Resolution[​](#resolution "Direct link to Resolution")

-   For Jira Data Center, please ensure that the product access groups entered are correct and the service account provided has the relevant permissions. The service account needs to have Administer Jira Global permissions for our crawler to work. [official documentation](https://confluence.atlassian.com/adminjiraserver/managing-global-permissions-938847142.html)
-   For Jira Cloud, please ensure you install the forge app from the link generated in the setup instructions.

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
