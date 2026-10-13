---
url: "https://docs.glean.com/troubleshooting/error-codes/slackentgrid/slackentgrid-7"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slackentgrid/slackentgrid-7"
title: "SLACKENTGRID-7"
fetched_at: "2026-10-13T08:51:18.478Z"
---
**Issue**

The Glean Slack custom app is not configured for all workspaces where the RTS app has been configured. Glean detected one or more workspaces that the RTS app is configured for but where the custom app is not installed. Content from these workspaces can't be indexed until the Glean Slack custom app is installed in each one.

**Resolution**

Review each workspace listed in the validation error and decide whether Glean should crawl it before installing the custom app. Then take the corresponding action:

-   To include a workspace in Glean, install the Glean Slack custom app.
-   To exclude a workspace from Glean, add its workspace ID to the workspace denylist on the Slack connector displaying this alert. Don't add the workspace ID to the associated RTS connector. Glean won't crawl denylisted workspaces. This option is appropriate for archived workspaces and any workspaces you intentionally exclude.

If you decide to include a workspace, install the custom app:

1.  In your Slack Enterprise organization, go to **Tools & Settings** → **Organization settings**.
2.  Click **Integrations → Installed apps**.
3.  Find and click on your Glean Slack custom app.
4.  In the top right, click **Manage → Add to workspaces**.
    -   Select all workspaces that Glean should index. This should include every workspace configured in your Glean Slack connector.
    -   Make sure to also select **Default for future workspaces** so that newly created workspaces are included automatically.
5.  Click **Add** to confirm.

**If you choose not to enable Default for future workspaces,** Glean will not automatically gain access to any newly created workspaces. These future workspaces will not be included in the Enterprise Graph, and their data will remain unavailable until the Glean app is explicitly installed in each workspace.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
