---
url: "https://docs.glean.com/connectors/native/slack/upgrade/enterprise-grid-app-upgrade"
canonical: "https://docs.glean.com/connectors/native/slack/upgrade/enterprise-grid-app-upgrade"
title: "Slack Enterprise Grid (Discovery API) App Upgrade Guide"
description: "Learn how to upgrade your Slack Enterprise Grid (Discovery API) app to the Slack Real-Time Search (RTS) Enterprise connector."
fetched_at: "2026-09-01T13:29:43.676Z"
---
On this page

## Who this guide is for[​](#who-this-guide-is-for "Direct link to Who this guide is for")

Use this guide if:

-   Your organization uses a Slack Enterprise Grid connector based on the Discovery API.
-   You already have a custom Glean Slack app installed in your Enterprise Grid organization.
-   You need to update that app and enable Slack Real‑Time Search (RTS) for Enterprise Grid.

## Current vs new configuration[​](#current-vs-new-configuration "Direct link to Current vs new configuration")

### Current configuration[​](#current-configuration "Direct link to Current configuration")

In the current setup:

-   Your Enterprise Grid connector uses Slack’s Discovery API.
-   Glean uses a custom Slack app installed in your Enterprise Grid organization.
-   A central Slack app is also associated with your instance; the main difference is that your organization has added a custom app on top of that.

### New configuration after the upgrade[​](#new-configuration-after-the-upgrade "Direct link to New configuration after the upgrade")

After you complete this upgrade:

-   Your existing custom Slack app is updated with a new manifest:
    -   The app name and bot display name change to **Enterprise Graph**.
    -   Slash commands (such as `/glean`) are removed.
    -   Interactivity is disabled.
    -   Additional bot scopes are granted: `channels:manage`, `channels:write.invites`, `groups:write`, `groups:write.invites`, `im:write`, `mpim:write`.
-   You authorize the Slack RTS app for Enterprise Grid via the `slackRtsEnterprise` self‑serve page.
-   The manifest used in self‑serve is specific to your deployment.

You continue to use the Enterprise Grid Discovery API connector, but RTS and the updated app manifest now control how Glean connects to Slack.

## Upgrade window and temporary downtime[​](#upgrade-window-and-temporary-downtime "Direct link to Upgrade window and temporary downtime")

When you upgrade from the legacy **Slack Enterprise Grid** to **Slack RTS**, there is a short window where Glean in Slack may be partially unavailable:

-   **Backend processing:** Internal configuration syncs typically take around **10 minutes**.
-   **Channel invitations:** Because Slack rate-limits how quickly bots can be invited to channels, upgrading a large number of channels takes longer.
    -   For most customers, the channel invitation process typically completes within an additional 20 minutes.

During this window, admins and users may notice:

-   **Inconsistent responses:** Gleanbot may temporarily fail to respond or show intermittent behavior.
-   **Dual-app activity:** You may see both the legacy app and the new RTS app responding to messages briefly as the transition completes.
-   **Broken Slack Tools:** Interactive components from **Glean** or **Agents** may fail or show "broken" options in Slack share settings.

> **Note:** This behavior is expected during the upgrade window and does not affect your data or long-term search functionality.

> **Important:** Once you start the RTS upgrade, do not modify or uninstall your legacy Slack app. The legacy app is responsible for inviting the new RTS bot into your channels-a process that is rate-limited by Slack. Removing or changing the legacy app too early will interrupt this sync and may leave the new bot missing from your channels. Wait until Glean confirms the upgrade is complete before making any changes to the old app.

## Before upgrading to Slack Real Time Search (RTS)[​](#before-upgrading-to-slack-real-time-search-rts "Direct link to Before upgrading to Slack Real Time Search (RTS)")

-   Confirm your current Slack connector type (Central App, Custom App, or Enterprise Grid) and follow the specific upgrade guide for that version. If your current setup is Slack Enterprise Grid (Discovery API), ensure you select the Slack Real Time Search Enterprise connector, not the single‑workspace version. Using the incorrect guide or connector type will result in setup failures.
    
-   Choose a low-traffic window (typically 30–60 minutes) for the upgrade. Notify your Slack admins that Gleanbot and Slack search results may be intermittently unavailable or show "dual-app" responses during this time.
    
-   Decide on a test group strategy (for example, IT/support or Slack-heavy teams) to validate performance before a full org-level rollout.
    
-   Ensure you have the necessary Slack Workspace Admin or Org Owner permissions. You will need the permissions to authorize the new RTS app and manage manifest changes.
    

## Upgrade steps[​](#upgrade-steps "Direct link to Upgrade steps")

### 1\. Confirm your current configuration[​](#1-confirm-your-current-configuration "Direct link to 1. Confirm your current configuration")

1.  In the Glean Admin Console, navigate to **Connectors**.
    
2.  Search for your existing **Slack** connector and click **Setup**.
    
3.  Review the configuration fields: If you see the following fields, you are using a Slack Enterprise Grid (Discovery API):
    
    -   Slack Enterprise domain (for example, `yourdomain.enterprise.slack.com`)
    -   Slack Enterprise ID (starts with `E`)
    -   App-Level Token
    -   Client ID
    -   Client secret
    -   Signing secret
    
    note
    

Enterprise customers without a custom Slack app will still see all of the fields above. The custom app fields (App-Level Token, Client ID, Client secret, Signing secret) may be blank. If those fields are empty in your existing connector configuration, they must be migrated manually. Contact Glean Support to coordinate this migration. :::

### 2\. Update your existing custom Slack app manifest[​](#2-update-your-existing-custom-slack-app-manifest "Direct link to 2. Update your existing custom Slack app manifest")

note

Before you authorize Slack RTS Enterprise in Glean (step 4), you must finish updating the manifest of your existing custom Slack app. If you run the RTS Enterprise authorization flow before this manifest update is complete, Slack can create an extra app instance or surface confusing `app not enabled` or permission errors. Always complete this step and confirm it succeeds before you click Authorize in step 4.

1.  In Glean, on the Slack RTS setup page click **Show setup instructions**.
2.  Locate the section providing the Slack app manifest and copy the code block.
3.  In a new browser tab, go to the [Slack app admin panel](https://api.slack.com/apps) and open the existing custom Slack app that your Slack connector is currently using (typically named **Glean**).
4.  Navigate to **App Manifest** in the left sidebar.
5.  Paste the new manifest that you copied from Glean, overwriting the old one, and click **Save Changes**.
6.  Click **Install App**, then click **Reinstall to *Your Workspace***.
7.  Click **Allow** to confirm the updated permission scopes.
8.  Once successful, go back to Glean Admin console.

This ensures the updated app does not conflict with other Glean Slack apps that use the same name and slash commands, and that it has the required bot scopes for Enterprise Grid RTS.

### 3\. Set up Slack Real Time Search (RTS) Enterprise[​](#3-set-up-slack-real-time-search-rts-enterprise "Direct link to 3. Set up Slack Real Time Search (RTS) Enterprise")

note

After you update the custom app manifest in Step 2, complete this step to configure the Slack RTS Enterprise connector.

1.  In Glean, go to **Admin Console** → **Platform** → **Connectors** → **Add connector**.
    
2.  Select **Slack Real Time Search Enterprise**.
    
3.  On the **Setup** tab, enter your **Slack Enterprise Domain** and **Slack Enterprise ID**. Make sure you are a Slack admin (with permissions to install and manage apps in your Enterprise Grid organization).
    
    1.  Open Slack on the web at `https://app.slack.com/client`.
    2.  **Slack Enterprise Domain:** Click your organization’s name (top-left). The domain is the text before `.enterprise.slack.com` (for example, if the URL is `acme.slack.com`, `acme` is your domain.) You need to enter this value in the **Slack domain** field in Glean.
    3.  **Slack Enterprise ID:** Look at your browser’s address bar. The page URL should look like `https://app.slack.com/client/E12345678/...`. The ID starting with **E** immediately following `/client/` is your **Enterprise ID** (e.g., `E12345678`). You need to enter this value into the **Slack Enterprise ID** field in Glean.

### 4\. Authorize Glean to access your Slack Enterprise Grid instance[​](#4-authorize-glean-to-access-your-slack-enterprise-grid-instance "Direct link to 4. Authorize Glean to access your Slack Enterprise Grid instance")

1.  In Glean, return to the **Admin Console** → **Platform** → **Connectors** and open the Slack RTS Enterprise connector you just added.
2.  On the **Setup** tab, click **Authorize** and follow the generated Slack link.
3.  Complete the authorization flow in Slack. This performs the OAuth flow using the updated manifest permissions from your custom app.
4.  After the authorization completes successfully, click **Sync now** on the **Slack RTS Enterprise** connector to start the initial message mapping.
5.  Click **Save** to store the configuration.

note

You can expect to see the Slack RTS connector show only a small number of records being "synced." For more information, see [Expected Admin crawl status for RTS](/connectors/native/slack/setup/slack-rts-connector/#expected-admin-crawl-status-for-rts).

### 5\. (Optional) Configure a test group[​](#5-optional-configure-a-test-group "Direct link to 5. (Optional) Configure a test group")

Roll out RTS safely by starting with a subset of users before expanding to the entire organization. After setting up the Slack RTS connector:

1.  In **Admin Console** → **Platform** → **Connectors** → **Slack Real Time Search** → **Overview** navigate to the **Settings** section.
    
2.  Under **Visibility in Glean**, select **Visible to test group only**.
    
3.  Choose an existing test group or create a new test group. For more information, see [Test groups for connectors](/administration/search/hiding-content#test-groups-for-connectors).
    
    Common strategies include:
    
    -   **Pilot cohort:** IT, Support, or identified power users.
    -   **Slack-heavy teams:** Engineering or Customer Success.

**Note on Visibility:** Only users within the selected test group will see Slack RTS results.

-   Each user must still perform a one-time Slack authorization (see end-user section).
-   Once validated, you can switch visibility to **Visible to all users**.

#### Guidelines for test users[​](#guidelines-for-test-users "Direct link to Guidelines for test users")

Ask your pilot users to:

-   Use Glean for your normal Slack‑related searches and questions for 1–2 weeks.
-   When something looks off, capture:
    -   The exact query you ran
    -   What you expected to see
    -   What you actually saw (screenshot if possible)
    -   Whether you were in **Search**, **Assistant**, or **Gleanbot**

### 6\. End-user authorization[​](#6-end-user-authorization "Direct link to 6. End-user authorization")

After you complete the steps above, each end-user must authorize the Slack app once to see permission‑aware Slack results (including private channels, DMs, and group DMs). Until a user authorizes, Slack Real Time Search is not used for that user’s Slack results.

End users will see a Slack authorization banner on the **Search**, **Home** pages, and Slack channels to connect Slack Real Time Search.

#### Slack Admin App Approval[​](#slack-admin-app-approval "Direct link to Slack Admin App Approval")

If your Slack workspace has [Admin App Approval](https://slack.com/help/articles/222386767-Manage-app-approval-for-your-workspace) enabled, end users who attempt to authorize the Glean app may be blocked by a pending‑request gate instead of completing the OAuth flow directly. A Slack workspace or org admin must approve the Glean Marketplace app before end users can complete authorization:

1.  As a Slack admin, go to the **Slack Admin** → **Manage Apps** page and view the list of pending app requests. For more information, see [Manage apps in an Enterprise organization](https://slack.com/help/articles/360000281563-Manage-apps-in-an-Enterprise-organization#approve-or-restrict-an-app).
2.  Locate the pending request for the **Glean** Marketplace app.
3.  Approve at least one user’s request. Once approved, access typically propagates to other users across workspaces.

#### When do users see the Slack RTS authorization prompt?[​](#when-do-users-see-the-slack-rts-authorization-prompt "Direct link to When do users see the Slack RTS authorization prompt?")

You will be prompted to authorize when:

-   Use Glean in Slack (for example, run `/glean` or mention `@Glean`) for the first time after RTS is enabled.
-   Run a search in Glean where Slack results would be shown (from the Home or Search page).
-   Connect Slack Real Time Search from **Your settings** → **Connectors** → **Slack Real Time Search**.

-   Home page experience
-   Search experience
-   Slack channel

After you authorize Slack Real Time Search, you can confirm the connection in your Glean settings (**Your settings** → **Connectors** → **Slack Real Time Search**).

![Slack RTS Connect](/img/connectors/native/slack-rts/slack-rts-connect1.png)

If you dismiss or miss this banner, you can authorize Slack later from your Glean settings:

1.  In Glean, go to **Your settings** → **Connectors**.
2.  Locate **Slack Real Time Search**.
3.  Click **Connect** or **Re-authorize** and complete the Slack sign-in flow.

After authorization, users will:

-   See a dedicated Slack section in search results containing messages and threads.
-   Receive Slack-sourced content within **Assistant** and **Gleanbot** responses.
-   **Note:** Users can re-trigger authorization at any time via their **Glean Settings** page.

## Minimizing channel noise from bot joins[​](#minimizing-channel-noise-from-bot-joins "Direct link to Minimizing channel noise from bot joins")

To reduce visible channel-join noise during migration, you can temporarily turn off Slack’s join/leave messages. For details, see [Slack connector changes: Gleanbot impacts and FAQ](/connectors/native/slack/about/gleanbot-impacts#minimizing-channel-noise-from-bot-joins) and [Slack’s help article on managing join and leave messages](https://slack.com/intl/en-in/help/articles/115002695043-Manage-join-and-leave-messages#:~:text=if%20they%27d%20like.-,Manage%20join%20and%20leave%20messages,-By%20default%2C%20messages).

## Limitations and functionality differences[​](#limitations-and-functionality-differences "Direct link to Limitations and functionality differences")

-   **Applies only to Enterprise Grid with an existing custom Glean app**: This guide assumes your Enterprise Grid connector already uses a custom Glean Slack app. If your Enterprise Grid connector uses the Discovery API and does not have a custom Glean app, this flow is not supported in self‑serve, and Glean provides separate, one‑off documentation for those customers.
-   **No change to the underlying Discovery API connector**: You are not asked to replace your existing Enterprise Grid Discovery API connector with a new Slack native connector. Only the custom app manifest and RTS Enterprise configuration are updated.
-   **Per‑deployment manifest:** The manifest used in the RTS Enterprise self‑serve experience is specific to each deployment. Do not reuse a manifest from another customer or environment; always copy the manifest provided in your own RTS Enterprise setup page.
-   There is no way to partially upgrade Glean in Slack. Once you complete the Slack RTS setup, the Gleanbot migration job runs for your entire workspace, even if Slack RTS search is only visible to a test group.

### If you don't complete this upgrade[​](#if-you-dont-complete-this-upgrade "Direct link to If you don't complete this upgrade")

For Enterprise Grid customers who remain on the deprecated Discovery API connector without RTS Enterprise enabled:

-   Slack results in Glean may become stale or incomplete as Discovery APIs are rate-limited and deprecated.
-   There may be some degradation in the Glean in Slack (Gleanbot) and agents that use Slack tools experience.

We strongly recommend completing this upgrade to avoid losing Slack coverage in Glean.
