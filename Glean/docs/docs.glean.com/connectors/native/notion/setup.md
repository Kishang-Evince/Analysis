---
url: "https://docs.glean.com/connectors/native/notion/setup"
canonical: "https://docs.glean.com/connectors/native/notion/setup"
title: "Notion setup"
description: "Set up native Notion with the previous workflow and manage personal authorization for Notion Live Mode and standalone Notion MCP"
fetched_at: "2026-10-13T08:50:06.167Z"
---
On this page

You're reading the **previous setup**[Connecting Notion for the first time? →](/connectors/native/notion/new-setup)

Connect Notion to Glean to index shared content. You can also manage personal authorization for Notion Live Mode or a standalone Notion MCP connection.

### Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

-   The user setting up this data source must be the **Notion Admin**.

### Create an integration[​](#create-an-integration "Direct link to Create an integration")

1.  Create a new integration by going to [https://www.notion.com/my-integrations](https://www.notion.com/my-integrations).

![](/images/admin/notion/my_integrations.png)  
  

2.  Click the **New integration** button. Name the integration "Glean".
3.  Associate the integration with your workspace by selecting it from the drop down menu. (You can only do this if you are an admin of that workspace.) Click **Submit**.

![](/images/admin/notion/associated_workspace.png)  
  

### Configuring the integration[​](#configuring-the-integration "Direct link to Configuring the integration")

1.  Click **Capabilities** and select capabilities according to the screenshot below:

![](/images/admin/notion/capabilities_comments.png)  
  

2.  Click **Save changes**.
3.  Click **Distribution** and ensure that the integration is not public.

### Enter credentials into Glean[​](#enter-credentials-into-glean "Direct link to Enter credentials into Glean")

1.  Click **Secrets** and copy and paste the internal integration token and workspace into Glean.
2.  Click **Save** in Glean.

### Indexing pages[​](#indexing-pages "Direct link to Indexing pages")

1.  Share the integration with the pages you want indexed. You can do this by navigating to a page, clicking the three-dot menu in the top right corner, and clicking **Connections -> Add connections -> Glean**.
2.  Please note that Notion provides no information about which users a page is shared with, so Glean cannot respect permissions for Notion pages. Please only share pages which you would want to be available to all Glean users at your company.

You’re all set!

## Disconnect your Notion account[​](#disconnect-your-notion-account "Direct link to Disconnect your Notion account")

These disconnect and reconnect steps apply when the native Notion connector uses Live Mode with per-user authorization. For a standalone Notion MCP connection, see [Disconnect Notion MCP](#disconnect-notion-mcp).

If the **Notion** panel in **Settings → Connectors** shows the following message, it doesn't offer a personal disconnect control:

> This connector was added by your admin and is available in Glean. No configuration is required.

Contact your Glean admin to change the organization's connector.

Disconnecting removes your personal Notion authorization from Glean. It doesn't remove your organization's Notion connector or change the integration used for indexing.

To disconnect an account you've authorized:

1.  In Glean, go to **Settings → Connectors**.
2.  Click **Notion**.
3.  If you see **Search access**, open the three-dot menu for the Notion connection you want to disconnect and click **Disconnect** to open its authorization settings. If you already see **What you get**, continue to the next step.
4.  Under **What you get**, turn off the Notion authorization toggle.

Glean shows a success notification when it disconnects the account.

To reconnect to the native Notion connector, open **Notion** in **Settings → Connectors**. If you see **Search access**, click **Authorize** for the connection you want to reconnect. Under **What you get**, turn the Notion authorization toggle on and complete the Notion authorization flow.

## Disconnect Notion MCP[​](#disconnect-notion-mcp "Direct link to Disconnect Notion MCP")

Use these steps for a standalone Notion MCP connection that you've authorized with your own Notion account through OAuth. This is separate from the native Notion connector's **Search access** settings. Connections that use admin-managed credentials don't offer this personal disconnect option.

To disconnect your standalone Notion MCP connection:

1.  In Glean, go to **Settings → Connectors**.
2.  Click your standalone Notion MCP connection.
3.  Under **Authorize additional tools**, open the three-dot menu for the authorized connection and click **Disconnect**. Glean opens a confirmation dialog.
4.  In the confirmation dialog, click **Disconnect**.

Your agents can't use that connection's tools until you reconnect.

To reconnect, open the same connection in **Settings → Connectors**. Under **Authorize additional tools**, click **Authorize** and complete the Notion authorization flow.
