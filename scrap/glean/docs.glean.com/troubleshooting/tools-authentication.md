---
url: "https://docs.glean.com/troubleshooting/tools-authentication"
canonical: "https://docs.glean.com/troubleshooting/tools-authentication"
title: "Troubleshooting tools authentication"
description: "Resolve recurring re-authentication prompts, OAuth token errors, connection issues, and actions that return instructions instead of running for Glean tools."
fetched_at: "2026-09-01T13:30:37.203Z"
---
On this page

This page helps you diagnose and resolve authentication issues with Glean tools, including repeated re-authentication prompts, expired token errors, connection failures, and cases where an action returns instructions instead of running.

## Assistant returns instructions instead of running an action[​](#assistant-returns-instructions-instead-of-running-an-action "Direct link to Assistant returns instructions instead of running an action")

If Assistant *describes* how to do something (or writes out a query or the steps for you to run) instead of performing a connected-app action, and you never see a **Connect** prompt, this is almost always a **reasoning mode** issue, not an authentication or permissions problem.

Actions from connected apps (MCP tools) only load in **Thinking** mode. In **Fast** mode, and in **Adaptive** mode when it stays on the fast path, these tools aren't loaded at all, so there's nothing to authorize and no **Connect** prompt appears.

To fix it:

1.  Open the reasoning-mode selector in the chat input.
2.  Select **Thinking**. (If you use **Adaptive**, naming the connected app in your request makes it more likely to switch to Thinking, but selecting Thinking is the reliable option.)
3.  Re-run your request. Your mode selection persists across queries.

Because the mode is a per-user setting, the same request can work for one teammate and not another. The difference is the mode they're in, not their access. For more on modes, see [Reasoning modes](/user-guide/assistant/glean-chat#reasoning-modes). If you're already in Thinking mode and the action still doesn't run, continue with the authentication checks below.

## Why a tool keeps asking you to reconnect[​](#why-a-tool-keeps-asking-you-to-reconnect "Direct link to Why a tool keeps asking you to reconnect")

Tools use OAuth to access source systems on your behalf. After you click **Connect** and authorize a tool, Glean stores an access token and (where available) a refresh token. Glean uses the refresh token to get new access tokens without prompting you again.

You'll be asked to reconnect if any of the following happen:

-   The refresh token expires because of the source system's token lifetime policy.
-   You or an admin revoked the Glean connected app in the source system.
-   The custom OAuth app's client secret was rotated but not updated in the Glean Admin Console.
-   A required site-level or org-level approval hasn't been granted (for example, a Jira site admin hasn't authorized the OAuth app for the Atlassian site).

## Choose an OAuth setup for tools[​](#choose-an-oauth-setup-for-tools "Direct link to Choose an OAuth setup for tools")

When setting up tools, admins choose between two authentication methods:

### Central[​](#central "Direct link to Central")

The **Central** option uses a Glean-managed OAuth app. This is the fastest way to get started - no additional configuration is needed in the source system. Token refresh is handled automatically.

Use Central when:

-   You want the quickest setup with no OAuth app management overhead.
-   Your organization's security policy allows Glean-managed OAuth apps.

### Custom[​](#custom "Direct link to Custom")

The **Custom** option uses an OAuth app that your organization creates and manages in the source system. This gives you control over the app's permissions, branding, and token policies.

Use Custom when:

-   Your security team requires customer-managed OAuth apps.
-   You need to configure longer refresh token lifetimes to reduce re-authentication frequency. For example, Databricks recommends setting refresh token lifetimes to approximately three months on custom OAuth apps.
-   You need to control which API scopes the app can access.

tip

If teammates are being prompted to re-authenticate frequently with a custom OAuth app, check the refresh token lifetime policy in the source system. Extending the lifetime reduces how often teammates need to reconnect.

## Re-authenticate a tool[​](#re-authenticate-a-tool "Direct link to Re-authenticate a tool")

### As a teammate[​](#as-a-teammate "Direct link to As a teammate")

1.  Run an agent that uses the tool, or trigger the tool directly in Assistant.
2.  When prompted, click **Connect**.
3.  Complete the authorization flow in the source system and return to Glean.

### As an admin[​](#as-an-admin "Direct link to As an admin")

If a teammate's tools authorization needs to be reset:

1.  Go to **Admin Console → Platform → Tools**.
2.  Open the tools.
3.  Find the teammate whose authorization needs to be reset and clear their stored credentials.
4.  Ask the teammate to re-run the agent and click **Connect** when prompted.

## Individual connector notes[​](#individual-connector-notes "Direct link to Individual connector notes")

### Jira[​](#jira "Direct link to Jira")

-   The first time Jira tools are used at your organization, a **Jira site admin must authorize the OAuth app for your Atlassian site**. Until this is done, other teammates will see authorization errors when they try to connect.
-   If you manage multiple Jira sites, create a **separate tools per site** so each can be bound to its own connector instance.
-   This applies to both Cloud and Service Management - Jira Data Center (on-premises) isn't supported for tools.

For setup details, see [Jira tools setup](/administration/tools/setup-tools/jira-tools-setup).

### Salesforce[​](#salesforce "Direct link to Salesforce")

-   Salesforce tools use **OAuth for each teammate that's separate from the Salesforce connector** used for search indexing. Connecting or disconnecting one doesn't affect the other.
-   If a teammate revokes the Glean connected app in Salesforce (under **Setup → Connected Apps OAuth Usage** or **My Personal Information → Connections**), they'll need to re-authorize by running an agent that uses a Salesforce tool and clicking **Connect**.
-   If you use a custom OAuth app, you can configure the refresh token policy in the connected app settings in Salesforce to control token lifetime.

For setup details, see [Salesforce tools setup](/administration/tools/setup-tools/salesforce-tools-setup).

### Google[​](#google "Direct link to Google")

-   Google Calendar, Google Docs, Google Sheets, and Gmail tools use **OAuth for each teammate**. Each teammate is prompted to connect the first time they run tools.
-   If a teammate revokes the Glean app from their [Google account permissions](https://myaccount.google.com/permissions), they'll need to reconnect the next time they run a Google tool.
-   The newer Google Calendar, Google Docs, Google Sheets, and Gmail tools use OAuth user authentication and don't support Domain-wide Delegation.

For setup details, see [Google tools setup](/administration/tools/setup-tools/google-tools-setup).

### Zendesk[​](#zendesk "Direct link to Zendesk")

-   Zendesk access tokens are **long-lived**, so teammates should not need to reconnect Zendesk tools on a daily basis.
-   If teammates are seeing repeated re-authentication prompts, verify the tool's authentication configuration and contact Glean Support if the issue persists.

For setup details, see [Zendesk tools setup](/administration/tools/setup-tools/zendesk-tools-setup).

### Slack[​](#slack "Direct link to Slack")

-   Slack tools use **custom OAuth only**. If your Slack app has token rotation enabled, configure token rotation correctly in your Slack OAuth app to avoid unexpected re-authentication prompts.

## When to contact your admin vs. Glean Support[​](#when-to-contact-your-admin-vs-glean-support "Direct link to When to contact your admin vs. Glean Support")

| Situation | Who to contact |
| --- | --- |
| You're prompted to reconnect and clicking **Connect** resolves it | No action needed - this is normal after a token expires |
| You're prompted to reconnect every time you run the tool | Your admin - the tool's OAuth configuration or the source system's token policy may need adjustment |
| Clicking **Connect** fails or doesn't show an authorization screen | Your admin - the OAuth app may be misconfigured or require site-level approval |
| Assistant writes out instructions or a query instead of running the action, and no **Connect** prompt appears | No admin action needed. Switch to **Thinking** mode (connected-app actions don't load in Fast or Adaptive-on-the-fast-path). See [Assistant returns instructions instead of running an action](#assistant-returns-instructions-instead-of-running-an-action) |
| Multiple teammates across your organization are affected at the same time | Glean Support - this may indicate a platform-level issue |

## See also[​](#see-also "Direct link to See also")

-   [OAUTH\_TOKEN\_EXPIRED](/troubleshooting/error-codes/authentication/oauth-token-expired)
-   [OAUTH\_TOKEN\_NOT\_FOUND](/troubleshooting/error-codes/authentication/oauth-token-not-found)
-   [OAUTH\_TOKEN\_REFRESH\_FAILED](/troubleshooting/error-codes/authentication/oauth-token-refresh-failed)
