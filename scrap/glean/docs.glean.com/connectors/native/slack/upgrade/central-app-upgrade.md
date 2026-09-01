---
url: "https://docs.glean.com/connectors/native/slack/upgrade/central-app-upgrade"
canonical: "https://docs.glean.com/connectors/native/slack/upgrade/central-app-upgrade"
title: "Slack Central App Upgrade Guide"
description: "Learn how to upgrade your Central App to the Slack Real-Time Search (RTS) connector."
fetched_at: "2026-09-01T13:29:43.474Z"
---
On this page

warning

This upgrade impacts how Glean accesses Slack data. Review the [Limitations and functionality differences](#limitations-and-functionality-differences) and [Gleanbot impacts and FAQ](/connectors/native/slack/about/gleanbot-impacts) before proceeding.

This upgrade path applies to **Slack Central App** configurations that use a single Slack workspace. For more information, see [Identify connector type](/connectors/native/slack/upgrade/identify-connector-type).

If your existing Slack connector is configured as **Slack Enterprise Grid (Discovery API)** using an Enterprise Domain and Enterprise ID, follow the [Slack Enterprise Grid (Discovery API) App Upgrade Guide](/connectors/native/slack/upgrade/enterprise-grid-app-upgrade) instead.

## Current configuration[​](#current-configuration "Direct link to Current configuration")

Your Slack connector is currently configured with the shared, legacy central Slack app managed by Glean.

In this configuration:

-   The connector was originally set up using a central Slack app, not a customer‑owned custom app.
-   Real‑time search (RTS) is not yet wired through the dedicated RTS Slack app for this connector.

## New configuration after the upgrade[​](#new-configuration-after-the-upgrade "Direct link to New configuration after the upgrade")

After you complete this upgrade:

-   You keep the existing Slack connector that was set up with the central Slack app, and
-   You add a new customer‑owned custom Slack app and authorize the RTS Slack app, both linked to the same Slack instance.

From the new Additional App setup tab on the existing Slack connector, you:

-   Create a new custom Slack app that points to your legacy Slack instance.
-   Copy the app’s Client ID, Client secret, and Signing secret into Glean.
-   Authorize Glean to access your Slack workspace using this custom app and the RTS Slack app.

The end state is:

-   The original connector continues to exist, but
-   RTS and the new custom Slack app are configured through the Additional App setup flow, and future behavior is driven by this combined setup rather than by the central app alone.

## Upgrade window and temporary downtime[​](#upgrade-window-and-temporary-downtime "Direct link to Upgrade window and temporary downtime")

When you upgrade from the legacy **Central App** to **Slack RTS**, there is a short window where Glean in Slack may be partially unavailable:

-   **Backend processing:** Internal configuration syncs typically take around **10 minutes**.
-   **Channel invitations:** Because Slack rate-limits how quickly bots can be invited to channels, upgrading a large number of channels takes longer.
    -   For most customers, the channel invitation process typically completes within an additional 20 minutes.

During this window, admins and users may notice:

-   **Inconsistent responses:** Gleanbot may temporarily fail to respond or show intermittent behavior.
-   **Dual-app activity:** You may see both the legacy app and the new RTS app responding to messages briefly as the transition completes.
-   **Broken Slack Tools:** Interactive components from **Glean** or **Agents** may fail or show "broken" options in Slack share settings.

> **Note:** This behavior is expected during the upgrade window and does not affect your data or long-term search functionality.

> **Important:** Once you start the RTS upgrade, do not modify or uninstall your legacy Slack app. The legacy app is responsible for inviting the new RTS bot into your channels—a process that is rate-limited by Slack. Removing or changing the legacy app too early will interrupt this sync and may leave the new bot missing from your channels. Wait until Glean confirms the upgrade is complete before making any changes to the old app.

## Before upgrading to Slack Real Time Search (RTS)[​](#before-upgrading-to-slack-real-time-search-rts "Direct link to Before upgrading to Slack Real Time Search (RTS)")

-   Confirm your current Slack connector type (Central App, Custom App, or Enterprise Grid) and follow the specific upgrade guide for that version. If your current setup is a single-workspace Slack central app, ensure you select the Slack Real Time Search (single workspace) connector, not the Enterprise version. Using the incorrect guide or connector type will result in setup failures.
    
-   Choose a low-traffic window (typically 30–60 minutes) for the upgrade. Notify your Slack admins that Gleanbot and Slack search results may be intermittently unavailable or show "dual-app" responses during this time.
    
-   Decide on a test group strategy (for example, IT/support or Slack-heavy teams) to validate performance before a full org-level rollout.
    
-   Ensure you have the necessary Slack Workspace Admin or Org Owner permissions. You will need the permissions to authorize the new RTS app and manage manifest changes.
    

## Slack central app upgrade steps[​](#slack-central-app-upgrade-steps "Direct link to Slack central app upgrade steps")

### 1\. Confirm your current configuration[​](#1-confirm-your-current-configuration "Direct link to 1. Confirm your current configuration")

Before starting, verify that you are currently using the Slack Central setup:

1.  In the Glean Admin Console, navigate to **Connectors**.
2.  Search for your existing **Slack** connector and click **Setup**.
3.  Review the configuration fields:
    -   **Central App Setup:** You should see a basic configuration with **Slack domain** and **Slack ID** fields.
    -   **Custom Instance:** If you see additional fields like **Client Secret** or **App-Level Token**, you are on a Slack custom instance and should refer to the [Custom App upgrade guide](/connectors/native/slack/upgrade/custom-app-upgrade) instead.
    -   **Slack Enterprise Grid (Discovery API):** If you see fields such as **Slack Enterprise domain** (for example, `yourdomain.enterprise.slack.com`) and **Slack Enterprise ID** (starts with `E`), your connector is using Slack Enterprise Grid. Use the [Slack Enterprise Grid (Discovery API) App Upgrade Guide](/connectors/native/slack/upgrade/enterprise-grid-app-upgrade) instead.

### 2\. Reauthorize your Slack Central App[​](#2-reauthorize-your-slack-central-app "Direct link to 2. Reauthorize your Slack Central App")

You must refresh the connection for your existing Central app before adding RTS:

1.  On the existing Slack connector setup page, click **Authorize**.
2.  Click **Allow** on the Slack authorization screen.
3.  Wait for the success message confirming your Slack Central app is successfully reauthorized.

### 3\. Upgrade your Existing Slack Custom Instance[​](#3-upgrade-your-existing-slack-custom-instance "Direct link to 3. Upgrade your Existing Slack Custom Instance")

note

Before you add and authorize the Slack Real-Time Search (RTS) connector (steps 4–6), you must finish updating your existing Slack custom instance in this step. If you authorize RTS before this upgrade is complete, Slack can create an extra RTS app or surface confusing `app not enabled` or integration errors. Always complete this step and confirm it succeeds before you move on to step 4.

1.  Navigate to your existing Slack instance's setup page.
    
2.  Select the **Additional App** tab and follow the instructions to create a new custom Slack app.
    
3.  Input your new app's Client ID, Client secret, and Signing secret into Glean.
    
4.  Click **Authorize**.
    
5.  Once this upgrade is complete, continue with **Step 4: Add the Slack Real-Time Search (RTS) connector**.
    

### 4\. Add the Slack Real-Time Search (RTS) connector[​](#4-add-the-slack-real-time-search-rts-connector "Direct link to 4. Add the Slack Real-Time Search (RTS) connector")

1.  Click **Add Connector** in the Glean Admin Console.
2.  Search for **Slack** and select **Slack Real-Time Search**.

### 5\. Configure Slack identifiers[​](#5-configure-slack-identifiers "Direct link to 5. Configure Slack identifiers")

Locate and enter the specific identifiers for your Slack workspace:

1.  **Slack Domain:** Click your workspace name (top-left). The domain is the text before `.slack.com` (e.g., if the URL is `acme.slack.com`, `acme` is your domain.) You need to enter this value in the **Slack domain** field in Glean.
2.  **Slack Team ID:** Look at your browser’s address bar. The page URL should look like `https://app.slack.com/client/T12345678/...`. The ID starting with **T** immediately following `/client/` is your **Slack Team ID** (e.g., `T12345678`). You need to enter this value into the **Slack team ID** field in Glean.

note

These must exactly match the values in your primary central Slack connector.

### 6\. Authorize and finalize[​](#6-authorize-and-finalize "Direct link to 6. Authorize and finalize")

1.  Click **Authorize** on the Slack RTS setup page.
2.  Once authorized, click **Start Sync**.
3.  Wait for the synchronization process to complete. You have now successfully migrated to Slack RTS.

note

You can expect to see the Slack RTS connector show only a small number of records being "synced." For more information, see [Expected Admin crawl status for RTS](/connectors/native/slack/setup/slack-rts-connector/#expected-admin-crawl-status-for-rts).

### 7\. (Optional) Configure a test group[​](#7-optional-configure-a-test-group "Direct link to 7. (Optional) Configure a test group")

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

### 8\. End-user authorization[​](#8-end-user-authorization "Direct link to 8. End-user authorization")

After you complete the steps above, each end-user must authorize the Slack app once to see permission‑aware Slack results (including private channels, DMs, and group DMs). Until a user authorizes, Slack Real Time Search is not used for that user’s Slack results.

End users will see a Slack authorization banner on the **Search**, **Home** pages, and Slack channels to connect Slack Real Time Search.

#### Slack Admin App Approval[​](#slack-admin-app-approval "Direct link to Slack Admin App Approval")

If your Slack workspace has [Admin App Approval](https://slack.com/help/articles/222386767-Manage-app-approval-for-your-workspace) enabled, end users who attempt to authorize the Glean app may be blocked by a pending‑request gate instead of completing the OAuth flow directly. A Slack workspace admin must approve the Glean Marketplace app before end users can complete authorization:

1.  As a Slack admin, go to the **Slack Admin** → **Manage Apps** page and view the list of pending app requests. For more information, see [Manage app approval for your workspace](https://slack.com/help/articles/222386767-Manage-app-approval-for-your-workspace).
2.  Locate the pending request for the **Glean** Marketplace app.
3.  Approve at least one user’s request. Once approved, access typically propagates to other users in the workspace.

note

To understand how the Slack authorization banner behaves:

-   **Non-dismissible authorization banner**: The Slack authorization banner cannot be dismissed and will remain visible until you have completed all required Slack authorizations. If your organization uses Slack, you may still see the banner until the dual authorization is complete.
-   **No reauthorization needed**: If you have already authorized Slack as part of a previous migration (for example, authorizing both the RTS Marketplace app and the custom app), you will not be asked to authorize again.

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

-   **Applies only to central‑app Slack connectors:** This upgrade flow is intended for Slack connectors that were originally created using the central Slack app. Other setups, such as those that already use a custom Slack app or the Slack Enterprise Grid / Discovery API connector, have different upgrade paths and are not covered here.
-   **Additional App setup does not configure Gleanbot on the new app:** The Additional App setup tab guides admins through creating a new custom Slack app, entering its Client ID, Client secret, and Signing secret, and authorizing Glean to access Slack. This flow creates a custom Slack app “without Gleanbot,” so it does not enable Gleanbot or other bot‑driven interactive features on the new app.
-   There is no way to partially upgrade Glean in Slack. Once you complete the Slack RTS setup, the Gleanbot migration job runs for your entire workspace, even if Slack RTS search is only visible to a test group.

### If you don't complete this upgrade[​](#if-you-dont-complete-this-upgrade "Direct link to If you don't complete this upgrade")

For tenants still on the legacy central app:

-   Glean in Slack may stop working altogether.
-   Agents that use Slack Tools may stop working.
-   Self-serve migration to RTS will not be possible. Glean Support can help fix some tools in agents), but we cannot automatically restore your previous Glean in Slack configuration, such as adding Gleanbot back to all of the channels where it was previously present.

We strongly recommend completing this upgrade to avoid disruptions.
