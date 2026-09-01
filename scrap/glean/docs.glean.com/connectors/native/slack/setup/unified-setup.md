---
url: "https://docs.glean.com/connectors/native/slack/setup/unified-setup"
canonical: "https://docs.glean.com/connectors/native/slack/setup/unified-setup"
title: "Set up Slack"
description: "Connect Slack data and read and write tools to Glean."
fetched_at: "2026-09-01T13:29:43.435Z"
---
On this page

You're reading the **new setup**[Already have Slack connected? →](/connectors/native/slack/setup/choose-your-setup)

Connect Slack to Glean through a single guided flow in the Glean admin console. You enter your workspace details, connect Slack, and set up sync.

1.  Workspace detailstoday — current step
2.  Connect Slacktoday — current step
3.  Set up synctoday — current step
4.  Identity crawl and search switch ona few days — happens automatically

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   The user setting up this connector must be an admin on the organization's Slack instance, with the ability to install apps. For more information, see [Find owners and admins](https://slack.com/intl/en-in/help/articles/360003534892-Browse-people-and-user-groups-in-Slack#:~:text=Find%20owners%20and%20admins&text=your%20left%20sidebar.-,If%20you%20don't%20see%20this%20option%2C%20click%20More%20to,org%2Dlevel%20owners%20and%20admins).
-   For Slack Enterprise Grid, the user must be a Slack Org Owner.
-   Each user must individually authorize the app to access their private messages and DMs.

### Step 1. Select your workspace type and enter workspace details[​](#step-1-select-your-workspace-type-and-enter-workspace-details "Direct link to Step 1. Select your workspace type and enter workspace details")

In the Glean **Admin console**, go to **Connectors** and add the **Slack** connector. Select your workspace type.

-   **Single workspace.** Your organization uses a single Slack workspace (Free, Pro, or Business+).
-   **Enterprise grid.** Your organization uses Slack's Enterprise Grid with multiple workspaces.

Then enter the matching account details.

**For a single workspace**

1.  Open [Slack](https://app.slack.com/client) on the web.
2.  Click your workspace name (top left) to find the Slack URL, which ends in `.slack.com`. The domain is the portion before `.slack.com`. For example, `yourdomain` is the domain in `yourdomain.slack.com`. Enter this as the **Slack domain**.
3.  The page URL should be in the form `app.slack.com/client/T12345678`. Copy the part starting with **T** and enter it as the **Slack team ID**.

**For Slack Enterprise Grid**

1.  Open [Slack](https://app.slack.com/client) on the web.
2.  Click your organization's name (top left) to find the domain, in the form `yourdomain.enterprise.slack.com`. Enter this as the **Slack Enterprise domain**.
3.  The page URL should be in the form `app.slack.com/client/E12345678/...`. Copy the part starting with **E** and enter it as the **Enterprise ID**.

### Step 2. Connect Slack[​](#step-2-connect-slack "Direct link to Step 2. Connect Slack")

This step connects Glean to Slack. It powers Glean in Slack (Gleanbot) and Slack tools. For Slack Enterprise Grid, complete Step 3 to extend this same connection to every workspace in your organization.

1.  Configure search permissions. Public channel content is searchable by default. Turn on the toggles to also include private channels and direct messages.
2.  Select **Connect**. You're redirected to Slack to finish authorizing access. If your organization uses Slack Enterprise Grid, also select at least one workspace to authorize.

To learn more about what this step searches, its permissions, and its crawling behavior, see [Slack Real Time Search](/connectors/native/slack/setup/slack-rts-connector/).

### Step 3. Add Glean to all workspaces (Slack Enterprise Grid only)[​](#step-3-add-glean-to-all-workspaces-slack-enterprise-grid-only "Direct link to Step 3. Add Glean to all workspaces (Slack Enterprise Grid only)")

This step applies only if you selected **Enterprise grid** in Step 1. It approves the centrally hosted Glean app for every workspace in your organization, extending Glean in Slack (Gleanbot) and Slack tools to each one.

1.  Open [Slack](https://app.slack.com/client) on the web.
2.  Click your organization name to open your organization management tab, then select **Tools & settings** → **Organization settings**.
3.  Select **Integrations** → **Installed apps**, then find and select the **Glean** app.
4.  Select **Manage** → **Approve for organization**, and approve the requested scopes.
5.  Select **Manage** → **Add to workspaces**. Select all workspaces using the top checkbox, and also select **Default for future workspaces**.
6.  Select **Next** to approve the scopes, then select **I'm ready to add this app** and **Add App**.

### Step 4. Set up sync[​](#step-4-set-up-sync "Direct link to Step 4. Set up sync")

This step creates a Slack app Glean uses to keep engagement signals and identity metadata in sync, and to receive the event webhooks that keep tools up to date.

1.  Go to the [Slack API site](https://api.slack.com/apps) and select **Create New App**.
2.  Choose **Blank app**. Don't choose **From a manifest**.
3.  Enter `Enterprise Graph` as the app name, select the same workspace you configured in Step 1, and select **Create App**.
4.  Select **App Manifest** in the left navigation, then select **YAML**.
5.  Replace the existing YAML with the app manifest shown on the Glean setup page, then select **Save Changes**.
6.  On the **Basic Information** tab, add the Glean logo as the app icon.
7.  On the **Event Subscriptions** tab, turn on **Enable Events** and save your changes.
8.  On the **Collaborators** tab, add at least one additional administrator from your company.

**For a single workspace**

1.  From **Basic Information**, copy the **Client ID**, **Client Secret**, and **Signing Secret** into Glean, then select **Authorize** and complete authentication.

**For Slack Enterprise Grid**

1.  From **Basic Information**, copy the **Client ID**, **Client Secret**, and **Signing Secret** into Glean.
2.  Go to **Install App** in the left navigation and select **Install to Organization**.
3.  Open [Slack](https://app.slack.com/client) on the web, open your organization management tab from the top left, and select **Tools & settings** → **Organization settings**.
4.  Select **Integrations** → **Installed apps**, then find and select the **Enterprise Graph** app.
5.  Select **Manage** → **Approve for organization**, and approve the requested scopes.
6.  Select **Manage** → **Add to workspaces**, select all workspaces using the top checkbox, and also select **Default for future workspaces**.
7.  Select **Next** to approve the scopes, then select **I'm ready to add this app** and **Add App**.
8.  Back in Glean, select **Authorize** to save the entered information. You're redirected to Slack to finish authorizing access.

## What happens next[​](#what-happens-next "Direct link to What happens next")

Once setup is complete, Glean runs a full identity crawl for users, channels, workspaces, and memberships. This crawl must complete at least once for Slack search results, Glean in Slack, and ranking signals to be fully accurate. For expected crawl behavior and search results, see [Slack Real Time Search](/connectors/native/slack/setup/slack-rts-connector/#expected-admin-crawl-status-for-rts) and [Slack](/connectors/native/slack/setup/slack-connector).
