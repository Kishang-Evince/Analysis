---
url: "https://docs.glean.com/connectors/native/slack/upgrade/enterprise-grid-seg-migration"
canonical: "https://docs.glean.com/connectors/native/slack/upgrade/enterprise-grid-seg-migration"
title: "Complete your Slack Enterprise Grid migration"
description: "Complete the migration from the Slack Enterprise Grid (Discovery API) connector to the new Slack Enterprise (Web API) connector."
fetched_at: "2026-09-01T13:29:43.610Z"
---
On this page

Glean is moving your Slack Enterprise Grid connector from the Discovery API to the new Web API-powered Slack Enterprise connector. Glean has already migrated your existing configuration - the Slack Enterprise domain, Enterprise ID, App-Level Token, and Signing Secret - so you only need to install the Glean app across your workspaces and add your **Client ID** and **Client Secret**.

Follow this guide when Glean has started the migration for you and you see a setup page titled **Finish upgrading your Slack Enterprise connection** in the admin console. If you're upgrading your Slack connector on your own instead, follow the [Slack Enterprise Grid (Discovery API) app upgrade guide](/connectors/native/slack/upgrade/enterprise-grid-app-upgrade).

warning

Don't change any of the prefilled fields on the setup page. Enter only the **Client ID** and **Client Secret**, then authorize.

## Install the Glean app across your workspaces[​](#install-the-glean-app-across-your-workspaces "Direct link to Install the Glean app across your workspaces")

1.  Go to the [Slack API site](https://api.slack.com/apps) and select your custom Glean app.
2.  In the left sidebar, open **Settings → Manage Distribution** and confirm the app is distributed. In the top right, click **Manage → Approve for organization**, then click **Approve** to confirm the scopes.
3.  In the top right, click **Manage → Add to workspaces**, then:
    -   Select all workspaces by selecting the top checkbox
    -   Select **Default for future workspaces** so Glean installs automatically in any workspaces you add later

## Add your credentials and authorize[​](#add-your-credentials-and-authorize "Direct link to Add your credentials and authorize")

1.  In the same app, open **Settings → Basic Information** and scroll to **App Credentials**.
2.  Copy the **Client ID** and paste it into the **Client ID** field on the Glean setup page.
3.  Next to **Client Secret**, click **Show**, copy the value, and paste it into the **Client Secret** field.
4.  Leave every other field on the page as it is.
5.  Click **Authorize** and complete the Slack sign-in.

When authorization succeeds, your migration is complete.

## See also[​](#see-also "Direct link to See also")

-   [Slack Enterprise Grid (Discovery API) app upgrade guide](/connectors/native/slack/upgrade/enterprise-grid-app-upgrade)
-   [Slack connector changes: Gleanbot impacts and FAQ](/connectors/native/slack/about/gleanbot-impacts)
