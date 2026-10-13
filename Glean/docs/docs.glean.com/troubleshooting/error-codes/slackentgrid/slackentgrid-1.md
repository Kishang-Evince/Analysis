---
url: "https://docs.glean.com/troubleshooting/error-codes/slackentgrid/slackentgrid-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slackentgrid/slackentgrid-1"
title: "SLACKENTGRID-1"
description: "Issue"
fetched_at: "2026-10-13T08:51:17.941Z"
---
**Issue**

-   Glean is unable to find the discovery token post-authentication for Slack Enterprise Grid.

**Resolution**

-   Reattempt authorization. Ensure that authorization succeeds, i.e. redirects back to Glean after acknowledging the crawler app's permissions. Reach out to us: [https://support.glean.com](https://support.glean.com) to diagnose further. Glean is unable to reconcile the token from post-authorization internally assuming authorization succeeded.
