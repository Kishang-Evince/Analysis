---
url: "https://docs.glean.com/troubleshooting/error-codes/jira/jira-5"
canonical: "https://docs.glean.com/troubleshooting/error-codes/jira/jira-5"
title: "JIRA_5"
description: "JIRA_5 Error Code"
fetched_at: "2026-09-01T13:30:24.700Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   Failed to validate Glean webhook registration. Webhooks are important for keeping the data fresh and providing the best Glean experience.

## Resolution:[​](#resolution "Direct link to Resolution:")

For Jira Data Center, verify the following configurations:

-   **Service account permissions**: The service account must have administrator Jira global permissions. This is required for the crawler to register webhooks. For more information, see [Managing global permissions](https://confluence.atlassian.com/adminjiraserver/managing-global-permissions-938847142.html).
-   **Webhook status**: Ensure the created webhook is not disabled. For more information, see [Managing webhooks](https://confluence.atlassian.com/adminjiraserver101/managing-webhooks-1455427884.html).
