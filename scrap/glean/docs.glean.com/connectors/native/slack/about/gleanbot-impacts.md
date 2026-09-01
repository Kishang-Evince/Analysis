---
url: "https://docs.glean.com/connectors/native/slack/about/gleanbot-impacts"
canonical: "https://docs.glean.com/connectors/native/slack/about/gleanbot-impacts"
title: "Slack connector changes Gleanbot impacts and FAQ"
description: "Learn about the impacts of the Slack connector changes on Gleanbot."
fetched_at: "2026-09-01T13:29:42.926Z"
---
On this page

## What is this migration?[​](#what-is-this-migration "Direct link to What is this migration?")

Gleanbot is being migrated from the existing **native Slack app** (custom app) to the **Slack RTS (Real-Time Search) marketplace app**. This is driven by Slack's requirement to deprecate **Discovery APIs** and **rate-limit custom Data Access apps**. The RTS app is the compliant, long-term path.

## Gleanbot behavior during Slack RTS migration[​](#gleanbot-behavior-during-slack-rts-migration "Direct link to Gleanbot behavior during Slack RTS migration")

When you upgrade from the legacy **Slack App** to **Slack RTS**, there is a short window where Glean in Slack may be partially unavailable:

-   **Backend processing:** Internal configuration syncs typically take around **10 minutes**.
-   **Channel invitations:** Because Slack rate-limits how quickly bots can be invited to channels, upgrading a large number of channels takes longer.
    -   For most customers, the channel invitation process typically completes within an additional 20 minutes.

During this window, admins and users may notice:

-   **Inconsistent responses:** Gleanbot may temporarily fail to respond or show intermittent behavior.
-   **Dual-app activity:** You may see both the legacy app and the new RTS app responding to messages briefly as the transition completes.
-   **Broken Slack Tools:** Interactive components from **Glean** or **Agents** may fail or show "broken" options in Slack share settings.

> **Note:** This behavior is expected during the upgrade window and does not affect your data or long-term search functionality.

### Minimizing channel noise from bot joins[​](#minimizing-channel-noise-from-bot-joins "Direct link to Minimizing channel noise from bot joins")

When the **Slack RTS bot** is invited into channels, Slack automatically generates native system messages (e.g., “Glean was added to this channel”). To minimize disruption, Glean has disabled its own multi-line welcome messages for the RTS application.

#### Configurable notification settings[​](#configurable-notification-settings "Direct link to Configurable notification settings")

On most Slack plans, administrators can temporarily suppress these notifications. Follow [Slack’s guide to managing join and leave messages](https://slack.com/intl/en-in/help/articles/115002695043-Manage-join-and-leave-messages#:~:text=if%20they%27d%20like.-,Manage%20join%20and%20leave%20messages,-By%20default%2C%20messages) to silence these notifications at the workspace or channel level.

#### Slack Enterprise Grid limitations[​](#slack-enterprise-grid-limitations "Direct link to Slack Enterprise Grid limitations")

On **Slack Enterprise Grid**, native `bot was added to the channel` system messages cannot be suppressed or muted.

-   This is a native Slack platform limitation and cannot be modified via Glean or Slack administrative settings.
-   While Glean’s custom welcome messages remain disabled to reduce noise, the one-time Slack-generated notification will still appear when the app joins a channel.

### If you don't migrate to Slack RTS[​](#if-you-dont-migrate-to-slack-rts "Direct link to If you don't migrate to Slack RTS")

For customers who stay on deprecated Slack connectors (legacy central app or Discovery APIs):

-   Glean in Slack (Gleanbot) may stop working altogether.
-   Agents that use Slack tools in Slack may stop working.
-   Self-serve migration to RTS will not be possible. Glean Support can help fix some tools in agents), but we cannot automatically restore your previous Glean in Slack configuration, such as adding Gleanbot back to all of the channels where it was previously present.

Plan your migration early to avoid losing Glean in Slack capabilities.

## What happens during migration?[​](#what-happens-during-migration "Direct link to What happens during migration?")

### Bot appearance changes[​](#bot-appearance-changes "Direct link to Bot appearance changes")

The old Glean bot (custom app) is replaced by the new **Glean marketplace app** (the RTS instance). This new app will automatically appear in the workspace or enterprise once the admin authorizes the **RTS connector**.

The old Glean bot (custom app) is replaced **as the responding bot** by the new Glean marketplace app (the RTS instance).

### New bot is added to existing channels[​](#new-bot-is-added-to-existing-channels "Direct link to New bot is added to existing channels")

Within **about 1–2 hours** of setting up the RTS instance, the new Glean bot is programmatically invited to all channels the old bot was previously part of. **During this window, users will not see the Gleanbot in channels and will not be able to interact with it until the invite job completes.**

warning

This 1–2 hour unavailability window impacts **all users** in the workspace — even if the RTS connector is set to “Visible to test group only.” The channel invite job runs globally and is not scoped to a specific user group.

This invite job:

-   Runs in the background regardless of whether the RTS connector is set to “Visible to test group only” or “Visible to all users”.
-   Uses channel-invite scopes on the old custom app to discover and invite the RTS bot to matching channels.
-   May take longer than 2 hours in very large workspaces if Slack rate limits channel invites.

During this window, it is normal for the new Glean app to appear in Slack but not yet be present in every channel where the old bot lived.

### Emails from the legacy Glean app[​](#emails-from-the-legacy-glean-app "Direct link to Emails from the legacy Glean app")

After migration, you may still see emails or notifications from Slack that reference the legacy Glean app, which is renamed **Enterprise Graph**. This is expected:

-   The legacy app continues to run in the background to provide ranking signals that keep search and Gleanbot responses high quality.
-   These emails do not mean a second active bot is responding in channels, and they do not change what data Glean can see in Slack.

For new Gleanbot interactions in Slack, you should use the RTS-powered Glean app.

### Configurations[​](#configurations "Direct link to Configurations")

All Gleanbot-related configurations are automatically migrated from the native instance to the RTS instance:

-   Bot configs (channel settings, response behavior, greenlist/redlist)
-   Redlisted and greenlisted channels are preserved and applied to the new bot
-   App-channel mappings (which AI apps are associated with which channels)
-   /glean configure settings

### Digest settings[​](#digest-settings "Direct link to Digest settings")

Digest settings are migrated to the RTS instance, but daily digest delivery is unavailable for tenants using Slack RTS. Daily digest is not supported for RTS‑powered deployments.

### Tools[​](#tools "Direct link to Tools")

Tools and their associated channel configurations are migrated to the new RTS instance.

The necessary changes are made to migrate the agents that use these tools to the new RTS instance.

Because tools are tied to a connector instance (CSI), the migration script re-associates them with the RTS CSI.

note

During migration, Slack tools and agents may return temporary errors (for example, "slack bot is not enabled") until all endpoints have finished migrating. This can take around 2 hours or more depending on how many agents and tools need to migrate. These errors are expected and will resolve automatically once migration is complete.

### Agents[​](#agents "Direct link to Agents")

Agents that were added to Slack channels are preserved. Specifically:

-   Agent-to-channel mappings are migrated to the RTS instance.
-   Agents configured with **"send message to channel"** tools have their channel doc ID references updated to point to the new RTS instance doc IDs.

### Users see a new bot responding[​](#users-see-a-new-bot-responding "Direct link to Users see a new bot responding")

After migration, users will see the **new Glean app** responding in all channels instead of the old custom app.

Functionally, the experience will be identical:

-   Same **slash commands** (e.g. `/glean`)
-   Same **@mentions**
-   Same **interactive components** (buttons, menus, modals), now driven by the RTS app

### Old app stops responding[​](#old-app-stops-responding "Direct link to Old app stops responding")

Tagging or @mentioning the **old custom app** will no longer trigger a response.

-   The native bot is disabled as part of the migration.
-   Only the **new RTS-powered Glean app** will respond.

### Old bot interaction buttons stop working[​](#old-bot-interaction-buttons-stop-working "Direct link to Old bot interaction buttons stop working")

Any existing message buttons/interactive components from the old bot. For example, the following will no longer function:

-   **"Show Sources"**
-   Feedback buttons
-   Tool buttons on previous responses

These interactive elements are tied to the old app's **`app_id`**, and Slack routes interactions based on the originating app. Once the old app is silenced, these interactions cannot be processed.

### Proactive thread summarization paused[​](#proactive-thread-summarization-paused "Direct link to Proactive thread summarization paused")

The **proactive long-thread summarization** feature (where Gleanbot automatically summarizes lengthy threads) will not work post-migration.

Reason:

-   The RTS marketplace app does **not** have scopes to listen to **all public channel messages** passively.

There are no followups planned for this feature yet.

## Frequently Asked Questions[​](#frequently-asked-questions "Direct link to Frequently Asked Questions")

### Will Gleanbot work for users not in the Slack RTS greenlist?

Yes.

-   Gleanbot migration is not partial, it applies to all users in the tenant as soon as the RTS connector is set up and the migration job finishes (typically within a few hours). All users will interact with the new RTS-powered Gleanbot regardless of whether they are in the RTS search greenlist.
-   Once migration is complete, the Slack context used by Gleanbot (e.g., conversation replies, webhooks, etc.) comes from the RTS connector for all users.
-   The RTS search greenlist only controls who can see or access RTS-powered Slack results on the Glean search page, in chat, or via Gleanbot. It does not control who can use Gleanbot in Slack.
-   Users who are not in the greenlist can still access Slack results through the native connector.
-   The only visible change for users is that, instead of the old custom app, the **RTS-powered Glean app** responds everywhere.

### Will Gleanbot work if a user hasn't authenticated with Slack RTS?

Gleanbot will still respond, but the **quality of responses may be degraded** for unauthenticated users, because the bot will not have access to their **personal Slack context** (DMs, private channels, etc.)

### Will \`/glean\` slash command still work?

Yes.

Once the RTS app is installed:

-   Slack routes the `/glean` command to the **most recently installed app** — the RTS app.
    -   The slash glean commands are removed on the custom app, so the conflict shouldn’t happen in the first place.

### Can we roll back to the native app if needed?

Please reach out to Glean support for assistance.

### Will there be two Glean bots visible in Slack?

Users will see **both** apps listed in Slack:

-   Glean (RTS marketplace app) — the active, responding app
-   Enterprise Graph (legacy custom app) — runs in the background

However:

-   Only the **Glean RTS app** will be active and responsive for new Gleanbot interactions.
-   The old app is **silenced** for new responses but should not be uninstalled; it continues to provide background identity and ranking signals used for search quality and Gleanbot behavior.

### What admin steps are required?

1.  Remove slash commands
2.  **Reinstall** the updated custom app in the workspace.
3.  Setup a new Slack Real-Time Search connector for the same workspace / organisation and complete the **Authorization** in the Glean Admin console.
4.  Migration of the following happens automatically:
    -   Gleanbot configs
    -   Agents
    -   Tools

### What if the admin doesn't update the custom app manifest?

The RTS setup validation will fail with:

-   Error code **SLACK-10** (for custom apps), or
-   Error code **SLACK-13** (for central apps),

blocking the migration until the **required scopes** are added.

### How long will it take for the new Gleanbot to appear in channels?

In most workspaces:

-   The RTS Glean app appears in Slack as soon as the RTS connector is authorized.
-   Within about **1–2 hours**, a background job invites the RTS bot into the channels where the old bot was present.
-   **During this 1–2 hour window, users will not see the Gleanbot in channels and cannot interact with it.** This applies to **all users** in the workspace, even if the RTS connector is configured as “Visible to test group only.”

In very large tenants (many workspaces and channels), this can take longer if Slack rate limits channel invites. If you still don’t see the Glean bot in expected channels after a few hours:

-   Check that the RTS connector shows as **Authorized** in the Glean Admin console.
-   Confirm that the RTS app appears under **Slack → Apps**.
-   In any specific channel, you can also add the RTS bot manually via “Add apps to this channel” and selecting **Glean**.

### Can admins mute the “Glean was added to this channel” messages?

It depends on your Slack plan:

-   **Standard Slack workspaces:** Admins can often reduce join/leave notifications by adjusting workspace or channel‑level settings. See Slack’s guide: [Manage join and leave messages](https://slack.com/intl/en-in/help/articles/115002695043-Manage-join-and-leave-messages#:~:text=if%20they%27d%20like.-,Manage%20join%20and%20leave%20messages,-By%20default%2C%20messages).
-   **Slack Enterprise Grid:** The native `bot was added to the channel` system messages cannot be suppressed or muted. This is Slack platform behavior and cannot be changed via Glean configuration.

Glean has already disabled its own custom welcome messages for the RTS app to avoid adding extra noise. However, the one‑time Slack‑generated join notification will still appear when the app is first added to a channel.
