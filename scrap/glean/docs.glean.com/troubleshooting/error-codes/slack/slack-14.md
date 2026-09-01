---
url: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-14"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-14"
title: "SLACK-14"
description: "SLACK-14 error code"
fetched_at: "2026-09-01T13:30:30.918Z"
---
**Issue**

The Glean Slack custom app is not configured for all workspaces where the RTS app has been configured. Glean detected one or more workspaces that the RTS app is configured for but where the custom app is not installed. Content from these workspaces can't be indexed until the Glean Slack custom app is installed in each one.

**Resolution**

Install the Glean Slack custom app in every workspace where the RTS app is configured. The specific workspaces still missing the custom app are surfaced during validation when setting up the Slack connector.

1.  In your Slack Enterprise organization, go to **Tools & Settings** → **Organization settings**.
2.  Click **Integrations → Installed apps**.
3.  Find and click on your Glean Slack custom app.
4.  In the top right, click **Manage → Add to workspaces**.
    -   Select all workspaces that Glean should index. This should include every workspace configured in your Glean Slack connector.
    -   Make sure to also select **Default for future workspaces** so that newly created workspaces are included automatically.
5.  Click **Add** to confirm.

**If you choose not to enable Default for future workspaces,** Glean will not automatically gain access to any newly created workspaces. These future workspaces will not be included in the Enterprise Graph, and their data will remain unavailable until the Glean app is explicitly installed in each workspace.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
