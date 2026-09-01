---
url: "https://docs.glean.com/connectors/native/slack/upgrade/manifest-faqs"
canonical: "https://docs.glean.com/connectors/native/slack/upgrade/manifest-faqs"
title: "Slack app manifest and RTS migration FAQs"
description: "Frequently asked questions about updating your Slack app manifest for the Real-Time Search (RTS) migration."
fetched_at: "2026-09-01T13:29:44.076Z"
---
Common questions about the one-time Slack app manifest update required for the Slack Real-Time Search (RTS) migration.

### Why do I need to update my Slack app manifest?

To keep Gleanbot and your Slack experiences working long term, we are migrating from your existing custom app to the new Slack Real‑Time Search (RTS) app, which is the Slack‑compliant, supported path going forward. We reuse your current custom app once to:

-   Copy over all of your existing Gleanbot, agents, and tools configurations, and
-   Automatically invite the new RTS‑based Glean bot into all the same channels your current bot is in.

This requires a small manifest update to add a few additional bot scopes to your existing app.

### What are the new permission scopes used for?

The manifest update adds the following bot scopes to your existing custom app:

-   `channels:manage, channels:write.invites`: Let Glean automatically invite the new RTS Glean bot into all public channels where the old bot currently lives, and preserve your existing channel-level Gleanbot settings (greenlists/redlists, app-channel mappings, etc.).
-   `groups:write, groups:write.invites`: Do the same for private channels, so the new bot continues to work wherever the old bot was already installed.
-   `im:write, mpim:write`: Allow the new RTS bot to send DMs and multi-person messages in the same places where Gleanbot already responds today (for example, when users run /glean or when agents send messages to a channel), ensuring those experiences keep working after migration.

### What happens if I don't update the manifest?

Updating the manifest is a one‑time prerequisite for installing and testing the RTS connector. Without these scopes, Slack RTS setup validation will fail and we cannot complete the background migration of your Gleanbot, agents, and tools.

### Will this impact my end users?

End users will not see any change in how Gleanbot behaves while you are still testing RTS. Once you decide to go live, their experience simply shifts from the legacy Gleanbot app to the new RTS Glean app, with the same commands and channel coverage they have today.

### Will updating the manifest trigger a Slack reindex?

No. Updating and reinstalling the Slack app with the new manifest does **not** regenerate OAuth tokens or trigger a full Slack reindex. It only changes the app configuration (name, commands, scopes) so that Glean can migrate Gleanbot, agents, and tools to the new RTS app. Only regenerating credentials or tokens would cause a new indexing cycle.

### Both the old and new Gleanbot are responding — what should I do?

Immediately after you migrate, there is a short period where both the old and new Glean apps may respond in the same channel while Slack finishes processing the migration. This usually resolves on its own within about 30 minutes. If you still see both bots responding after that, contact Glean Support for assistance.

### Can I remove the old app now that I’m done with migration?

Not yet. The old app (renamed “Glean Enterprise Graph” in most cases) may still be used for signals and background migration tasks even after RTS is active.

Removing it too early can impact the Slack experiences. If you have a strong need to remove the old app, contact Glean Support so we can confirm it is safe for your deployment.

### I can't find the Slack app — what if it was created by a different user?

If the Slack app was created by another user, it won't appear under your own apps at [api.slack.com/apps](https://api.slack.com/apps). To find it:

1.  Open your Slack workspace settings.
2.  Go to **Integrations** → **Installed Apps**.
3.  This page lists all installed apps in the workspace, regardless of which user created them.
4.  Locate **Glean** and click **App Details** to review or update the manifest.

For more details on working with app manifests, see [Slack's documentation on configuring apps with app manifests](https://docs.slack.dev/app-manifests/configuring-apps-with-app-manifests/).

### Can I roll back the Slack RTS migration?

No. Because of Slack’s API and rate-limit changes, there is no supported rollback path to the pre-RTS behavior.

If you see issues after migration, the supported path is to address them on RTS (for example, by tuning configuration or escalating issues to Slack), not to revert the migration.

### If Glean in Slack is not working as expected during migration, should I modify the old Gleanbot app?

No. If Glean in Slack looks broken during or shortly after migration (for example, Gleanbot is not responding in some channels or only the new app is partially present), do **not** modify, rename, or uninstall the old Glean app. During migration:

-   The old app is still responsible for inviting the new RTS bot into channels.
-   Slack rate-limits these invites, so the process can take tens of minutes (and longer in very large workspaces). Changing the old app while this is in progress can interrupt migration or leave channels in a partially migrated state. Instead:
-   Wait at least ~30 minutes to see if the behavior resolves on its own.
-   If Gleanbot is still not working as expected after that, contact Glean Support for help rather than changing the old app.

### Which Slack Real Time Search connector should I choose?

Match the RTS connector to your existing Slack setup:

-   If your current setup is a **single‑workspace Slack central app or custom app**, select the **Slack Real Time Search (Single Workspace)** connector, not the Enterprise version.
-   If your current setup is **Slack Enterprise Grid (Discovery API)**, select the **Slack Real Time Search Enterprise** connector, not the single‑workspace version.

### Why don't my Slack DMs or private channels show up in Glean?

There are two common reasons:

1.  **Admin has disabled DM or private-channel search.** Check your settings in **Admin** → **Connectors** → **Slack Real Time Search Enterprise** and under **Search permissions**, confirm that **Search private channels** and **Search private messages** are turned on as appropriate. If **Search private messages** is off, Glean will not request DM scopes and nobody will see DM content, even if they have connected Slack.
    
2.  **User hasn't authorized Slack RTS yet.** Even if the admin allows private content, Glean can only search private channels and DMs after the user personally authorizes Slack RTS. See [End-user authorization](/connectors/native/slack/setup/slack-rts-connector/) for instructions.
