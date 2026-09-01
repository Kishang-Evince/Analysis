---
url: "https://docs.glean.com/release-notes/releases/2025-10-08-october-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-10-08-october-release"
title: "October 08, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:52.778Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Get notifications when Glean Assistant completes long-running queries[​](#get-notifications-when-glean-assistant-completes-long-running-queries "Direct link to Get notifications when Glean Assistant completes long-running queries")

Glean now supports browser notifications for Glean Assistant responses in Chat. When a user receives a reply in Chat and the Glean tab isn’t in focus, a notification will appear, allowing the user to click and jump directly back into the exact thread. This feature helps users stay engaged with long-running queries and ensures they never miss a response.

**How to access:** Notifications require the user to opt in twice—once in Glean and once in their browser and the user must also enable browser notifications at the OS level on Mac or Windows. The user can turn off notifications at any time via the Preferences tab in their settings page.

[Learn more](https://docs.google.com/document/d/1LlZijhsBfJ_KpOq9lrf3KU_XuhOSxfi1RDzi1C9eJrc/edit?tab=t.0)

Assistant *FR-4198*

* * *

#### Easily access Glean Assistant directly in the Glean Desktop App[​](#easily-access-glean-assistant-directly-in-the-glean-desktop-app "Direct link to Easily access Glean Assistant directly in the Glean Desktop App")

Glean Desktop App now offers a chat-first experience, making it easier to access Glean Assistant directly from your desktop. Use quick chat to open a dedicated window and attach screenshots to your chat conversations, streamlining research and collaboration. These enhancements help you find information, summarize content, and interact with your company’s knowledge base more efficiently—right from your desktop.

[Learn more](/user-guide/apps/chat-first-experience)

Assistant *FR-4146*

* * *

#### RSS feed for release notes[​](#rss-feed-for-release-notes "Direct link to RSS feed for release notes")

You can now subscribe to Glean release notes via an RSS feed. RSS feeds can integrate with Slack, email, or other subscription tools to notify you when our release notes are published.

**How to access:** Use your favorite RSS reader and the RSS-linked XML page.

[Learn more](/release-notes/)

Glean Home *FR-3950*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Support for Claude Sonnet 4.5 in the model hub (Agents only)[​](#support-for-claude-sonnet-45-in-the-model-hub-agents-only "Direct link to Support for Claude Sonnet 4.5 in the model hub (Agents only)")

Claude Sonnet 4.5 is now available in the Glean model hub for use with Agents. This update gives organizations access to Anthropic’s latest model via Amazon Bedrock or Google Vertex AI, enabling more advanced reasoning and improved performance for agentic workflows.

[Learn more](/administration/llms)

Agents *FR-4236*

* * *

#### Glean in ServiceNow published in app store[​](#glean-in-servicenow-published-in-app-store "Direct link to Glean in ServiceNow published in app store")

The Glean for ServiceNow integration is now officially listed in the ServiceNow Store, making it easier to discover, install, and manage the embedded integrations within your ServiceNow environment. There's no change in functionality, configuration or permissions.

**How to access:** Install the app from ServiceNow’s App Store. The Links and Documents section contains detailed instructions on how to set up Glean in ServiceNow for each workspace.

[Learn more](/administration/platform/embedded-integrations/glean-in-service-now)

Embedded Integrations *FR-4035*
