---
url: "https://docs.glean.com/connectors/native/slack/setup/slack-connector"
canonical: "https://docs.glean.com/connectors/native/slack/setup/slack-connector"
title: "Slack"
description: "Learn how to integrate Glean with Slack."
fetched_at: "2026-09-01T13:29:42.956Z"
---
On this page

The Slack connector connects Slack to Glean for engagement signals, identity metadata, and Glean in Slack (Gleanbot and tools). Deploy it together with Slack Real Time Search (RTS):

-   Slack RTS fetches all Slack messages live at query time from Slack directly.
-   The Slack connector provides engagement signals and identity metadata to improve ranking.

note

After setting up a Slack connector, you must set up a [Slack Real Time Search](/connectors/native/slack/setup/slack-rts-connector/).

## Key capabilities[​](#key-capabilities "Direct link to Key capabilities")

-   **Signals and ranking**: Collects engagement events (such as mentions, clicks, and reactions) and identity metadata (users, channels, workspaces, memberships). Glean uses these “second‑order” signals to improve Slack RTS ranking and cross‑app relevance.
    
-   **Identity crawls**: Periodic full and incremental identity crawls provide user, channel, workspace, and membership metadata. This metadata is stored in Glean and used by Slack RTS, Glean in Slack, and tools.
    
-   **Glean in Slack and Tools**: Provides the Slack app and event plumbing Glean in Slack (Gleanbot) and tools need to receive mentions, process slash commands (for example, `/glean`), and post replies. Full functionality requires this connector and Slack Real Time Search, plus completed identity crawls.
    
-   **Webhooks**: Uses Slack Events API webhooks for real‑time identity and engagement events (for example, `member_joined_channel`, `app_mention`, `link_shared`). These events supply signals and trigger Gleanbot and tools.
    

note

For most tenants, this connector isn't the primary source of Slack search results. Slack Real Time Search (RTS) is the primary path for live Slack messages in Glean Search and Glean. The Slack connector adds additional relevancy signals and, where your rate limits allow, indexes your Slack data as well.

## Modes (Select during setup)[​](#modes-select-during-setup "Direct link to Modes (Select during setup)")

-   **Single Workspace**: One connector instance authorized for a single workspace. Recommended for customers with a single Slack workspace.
-   **Slack Enterprise**: One connector instance authorized for the Slack Enterprise Grid organization; covers all workspaces. Recommended for enterprise customers with multiple workspaces and the Slack Enterprise license.

## Supported objects/entities[​](#supported-objectsentities "Direct link to Supported objects/entities")

-   Public channels (messages and threads)
-   Private channels (messages and threads, if authorized)
-   Direct messages (DMs) and group DMs (if authorized)
-   Channel and user metadata (for search enrichment and Gleanbot features)
    
    note
    
    These objects are the primary sources of ranking signals and metadata.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   **Workspace-level connectors**: The user setting up this connector must be a Slack Workspace Owner or Slack Workspace Admin. For more information, see [Find owners and admins](https://slack.com/intl/en-in/help/articles/360003534892-Browse-people-and-user-groups-in-Slack#:~:text=Find%20owners%20and%20admins&text=your%20left%20sidebar.-,If%20you%20don't%20see%20this%20option%2C%20click%20More%20to,org%2Dlevel%20owners%20and%20admins).
-   **Enterprise Grid connectors**: The user setting up this connector must be a Slack Org Owner.
-   Slack **workspace domain**, e.g., if your Slack URL is `yourdomain.slack.com`, the domain is `yourdomain`.
-   Slack workspace ID. Your Slack **Workspace ID** (starts with T...) and, for Enterprise Grid, your **Enterprise ID** (starts with E...).
-   **Slack Enterprise plan** (Enterprise/Grid mode only): Verify that your organization is on a Slack Enterprise plan.

> Each user must individually authorize the app to access their private messages and DMs.

## Decide your mode[​](#decide-your-mode "Direct link to Decide your mode")

You can select single workspace or Enterprise (org-level) based on your Slack plan and target scope.

-   Slack (Single workspace)
-   Slack Enterprise

## Set up Slack[​](#set-up-slack "Direct link to Set up Slack")

1.  In Glean **Admin console** → **Connector** → select **Slack** for single workspace or select **Slack Enterprise** for the Enterprise (org-level) Slack.
2.  Click **Setup**.

### Gather account details[​](#gather-account-details "Direct link to Gather account details")

1.  Open [Slack](https://app.slack.com/client) on web.
2.  Look for your workspace name in the top left. Click your workspace name and find the Slack URL in the menu, ending in `.slack.com`. The domain is the portion before `.slack.com`, e.g. if the URL is `yourdomain.slack.com`, the domain would be `yourdomain`. Enter the domain in Glean.
3.  The URL must be of the form `app.slack.com/client/T12345678`. Copy this last part of the URL and paste it into Glean as the workspace ID. Note the [workspace ID](https://slack.com/help/articles/221769328-Locate-your-Slack-URL-or-ID#free,-pro,-and-business+-plans-2) will start with `T`.
    
    note
    
    For Enterperise Slack connectors, the domain is listed in the form `domain.enterprise.slack.com`. The URL is of the form `app.slack.com/client/E12345678/C12345678`. Copy the enterprise part of the URL and paste it into Glean as the enterprise ID.
    

### Create an app[​](#create-an-app "Direct link to Create an app")

1.  Visit the [Slack API site](https://api.slack.com/apps) and click **Create New App**.
2.  Choose **From an app manifest**.
3.  Select the same workspace you chose on the previous screen and click **Next**.
4.  Replace existing YAML comment with the manifest from your setup page and click Next. Visit your Glean setup page to find the correct manifest for your deployment.
5.  Click **Create**.

### Generate a token[​](#generate-a-token "Direct link to Generate a token")

1.  Click the **Basic Information** tab and scroll down until you see **App-Level Tokens**.
2.  Click **Generate Token and Scopes**.
3.  Name the token **Glean**.
4.  Click **Add Scope** and add the scope `authorizations:read`.
5.  Click **Generate** and paste the token into Glean.

### Add an icon[​](#add-an-icon "Direct link to Add an icon")

1.  Click the **Basic Information** tab.
2.  Download this [logo](https://app.glean.com/images/admin/glean-logo2-512.png).
3.  Click **Choose File** and select the logo you just downloaded above.

### Enable event subscriptions[​](#enable-event-subscriptions "Direct link to Enable event subscriptions")

1.  Click on the **Event Subscriptions** tab.
2.  Check if the **Enable Events** toggle is on. If not, turn it on and **Save Changes** at the bottom of the page.

### Connect to Glean[​](#connect-to-glean "Direct link to Connect to Glean")

1.  Click the **Collaborators** tab and add at least one additional administrator from your company.
2.  Copy and paste the following fields from **Basic Information** into Glean: **Client ID**, **Client Secret**, **Signing Secret**.
3.  Make sure the **App-level token** you generated in the [Generate a token](#generate-a-token) step is entered in Glean.
4.  Go to **OAuth & Permissions** from the left navigation and click **Install to Workspace**.
5.  Click **Save** in Glean to save the entered information, then click the link to finish authorizing access to Slack.

### Enterprise Grid rollout[​](#enterprise-grid-rollout "Direct link to Enterprise Grid rollout")

For Enterprise Grid deployments, after completing the steps above, approve and deploy the app across your organization:

1.  In Slack, go to **Org Settings** → **Integrations** → **Installed apps**.
2.  Click **Manage** → **Approve for organization**.
3.  Click **Manage** → **Add to workspaces**, select all workspaces, and select **Default for future workspaces**.

### Common Enterprise setup error[​](#common-enterprise-setup-error "Direct link to Common Enterprise setup error")

| **Error** | **Cause** | **Resolution** |
| --- | --- | --- |
| `not_owner` | The user setting up the connector is not a Slack Org Owner. | Have a Slack Org Owner complete the setup. |

## Content configuration[​](#content-configuration "Direct link to Content configuration")

note

Inclusion and exclusion rules control what Slack content is available in Glean across all features. They don't modify native Slack permissions.

### Exclusion (Redlist) options[​](#exclusion-redlist-options "Direct link to Exclusion (Redlist) options")

Exclusion (redlisting) is used when we don't want Glean to access specific channels.

You can exclude:

-   Public channels by channel ID
-   Private channels by channel ID

When a channel is redlisted:

-   Data from that channel is not accessed.

To configure Slack channel redlists today, contact Glean Support with the list of Slack channel IDs to exclude for your Slack connector.

### Inclusion (Greenlist) options[​](#inclusion-greenlist-options "Direct link to Inclusion (Greenlist) options")

Inclusion (greenlisting) tells Glean which channels it should access. Use inclusion rules when you want Glean to access a small, controlled set of channels.

You can include:

-   Public channels by channel ID (for example, public `C1234` channel)
-   Private channels by channel ID (for example, private `Q2398` channel)

When a channel is greenlisted:

-   Only data in greenlisted channels are accessed.
-   If a channel is both greenlisted and redlisted, the redlist (exclusion) rule takes precedence.

To configure Slack channel greenlists today, contact Glean Support with the list of Slack channel IDs to include for your Slack connector.

note

If Inclusion (Greelisting) options are enabled, only data from the Inclusion category is used. If Exclusion (Redlisting) options are enabled, all data in the exclusion category is not used. If both rules are applied, then the data is not used, as the exclusion rule takes priority.

For general background on redlisting and greenlisting across connectors, and for how to obtain Slack channel IDs, see [Excluding content](/connectors/excluding-content).

## Next steps[​](#next-steps "Direct link to Next steps")

The Slack connector connects Slack to Glean and powers the in-Slack experience. After connecting Slack, set up **Glean in Slack (Gleanbot)** to bring search and AI-powered answers into your Slack workspace.

[

### Set up Glean in Slack

Install Gleanbot, configure bot responses, deploy the Slack sidebar, and roll out features for your organization.







](/administration/platform/embedded-integrations/slackbot/getting-started/prerequisites)[

### End-user documentation

Share with your users so they can search, ask questions, and use Assistant directly in Slack.







](/user-guide/embedded-integrations/slack/)[

### Slack tools

Let agents post messages to Slack channels and DMs from agent workflows.







](/tools/connector/slack)
