---
url: "https://docs.glean.com/troubleshooting/error-codes/jira-onprem/jira-5"
canonical: "https://docs.glean.com/troubleshooting/error-codes/jira-onprem/jira-5"
title: "JIRA_5"
description: "JIRA_5 Error Code"
fetched_at: "2026-09-01T13:30:23.698Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   Failed to validate Glean webhook registration. Webhooks are important for keeping the data fresh and providing the best Glean experience.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   For Jira Data Center, please ensure that the service account has the relevant permissions to register a webhook. The service account needs to have Administer Jira Global permissions for our crawler to work. ([official documentation](https://confluence.atlassian.com/adminjiraserver/managing-global-permissions-938847142.html))
-   For Jira Data Center, please ensure that the webhook created is not disabled. Official documentation on how to check this.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
