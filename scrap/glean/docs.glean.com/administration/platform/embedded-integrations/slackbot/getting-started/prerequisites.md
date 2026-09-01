---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/getting-started/prerequisites"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/getting-started/prerequisites"
title: "Prerequisites and requirements"
description: "What you need before installing Glean in Slack."
fetched_at: "2026-09-01T13:29:12.031Z"
---
On this page

Before you install Glean in Slack, verify that your environment meets the requirements below. Glean in Slack uses the Slack connector together with Slack Real Time Search (RTS), plus admin access to both Glean and Slack.

-   **Slack Workspace Owner or Slack Workspace Admin:** required for workspace-level setup.
-   **Slack Org Owner:** required for Slack Enterprise Grid setup.

## Required access and permissions[​](#required-access-and-permissions "Direct link to Required access and permissions")

### Glean permissions[​](#glean-permissions "Direct link to Glean permissions")

-   **Glean admin role:** required to configure connectors and enable Glean in Slack features in the Admin console.
-   **Glean Assistant license:** users who interact with Glean in Slack must have an active Glean Assistant license. Users without a license will not receive responses.

### Slack permissions[​](#slack-permissions "Direct link to Slack permissions")

-   **Slack Workspace Owner or Slack Workspace Admin:** required for workspace-level setup, including installing the Glean app, authorizing OAuth scopes, and managing workspace-level settings.
-   **Slack Org Owner:** required for Slack Enterprise Grid setup.
-   **App installation permissions:** your Slack workspace must allow admins to install third-party apps. If your organization restricts app installations, you may need approval from your Slack org admin.

## Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

### Slack environment[​](#slack-environment "Direct link to Slack environment")

A **Slack workspace** or **Slack Enterprise Grid** organization. Glean supports both standard workspaces and Enterprise Grid.

### Glean prerequisites[​](#glean-prerequisites "Direct link to Glean prerequisites")

-   A working **Slack connector** configured in the Glean Admin console. The Slack connector provides engagement signals. Slack RTS retrieves live Slack messages at query time.
    -   For setup instructions, see [Slack connector setup](/connectors/native/slack/setup/slack-connector).
-   Both the Slack connector and the Slack RTS identity crawl should be healthy before rollout.

note

Glean in Slack is enabled through the Slack connectors in the Admin console. You do not install the bot separately.

### Slack RTS connector[​](#slack-rts-connector "Direct link to Slack RTS connector")

The Slack RTS connector is a federated connector. It does not crawl or index Slack message content. Instead, Glean fetches live Slack messages at query time via Slack's Real-Time Search API. Message bodies are processed in memory only and are not written into a Glean index.

For migration and setup, see [Upgrading to Slack RTS](/administration/platform/embedded-integrations/slackbot/getting-started/upgrading-to-slack-rts).

## Optional enhancements[​](#optional-enhancements "Direct link to Optional enhancements")

### Code Writer[​](#code-writer "Direct link to Code Writer")

Code Writer lets users turn Slack conversations into draft pull requests in GitHub. To use Code Writer in Slack:

-   The **GitHub connector** must be configured and connected to the repositories where Code Writer will open pull requests.
-   The **Code Writer tools** must be set up in the Admin console with a GitHub connector instance and the Glean GitHub App installed.
-   Users need to complete **GitHub OAuth authentication** on first use.

For details, see [Configure Code Writer](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer).

### Slack sidebar[​](#slack-sidebar "Direct link to Slack sidebar")

The Slack sidebar provides a dedicated Glean interface in Slack's UI. To enable the sidebar:

-   The Glean Slack App must be **authorized** in the Slack API.
-   The **Agent or Assistant** feature must be enabled on the Glean Slack App.
-   Additional OAuth scopes (`assistant:write`) and event subscriptions (`assistant_thread_started`, `assistant_thread_context_changed`) are required.

For details, see [Set up Slack sidebar](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar). |

## Checklist summary[​](#checklist-summary "Direct link to Checklist summary")

Use this checklist to confirm readiness before proceeding to installation:

-   [ ]  You have Glean Admin console access
-   [ ]  You have Slack Workspace Owner/Admin access, or Slack Org Owner access for Enterprise Grid
-   [ ]  Your Slack workspace allows third-party app installations
-   [ ]  The Slack connector is configured and healthy in Glean
-   [ ]  Users who will interact with Glean in Slack have Glean Assistant licenses
-   [ ]  You have reviewed [Upgrading to Slack RTS](/administration/platform/embedded-integrations/slackbot/getting-started/upgrading-to-slack-rts)
-   [ ]  (Optional) GitHub connector is set up if you plan to use Code Writer
