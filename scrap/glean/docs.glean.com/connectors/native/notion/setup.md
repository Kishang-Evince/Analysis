---
url: "https://docs.glean.com/connectors/native/notion/setup"
canonical: "https://docs.glean.com/connectors/native/notion/setup"
title: "Notion setup"
description: "<SetupPathBanner"
fetched_at: "2026-09-01T13:29:36.124Z"
---
On this page

You're reading the **previous setup**[Connecting Notion for the first time? →](/connectors/native/notion/new-setup)

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
