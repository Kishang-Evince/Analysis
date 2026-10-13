---
url: "https://docs.glean.com/release-notes/releases/2026-10-08-october-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-10-08-october-release"
title: "October 08, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:33.698Z"
---
On this page

**Release version:** `561`

This release brings activity-based memory to eligible deployments, 79 new MCP server templates, general availability for the Power BI connector, a new Marketo connector beta, and faster voice conversations. It also adds a set of admin and interface enhancements and reliability fixes.

## Major launches[​](#major-launches "Direct link to Major launches")

#### Glean remembers context from your work[​](#glean-remembers-context-from-your-work "Direct link to Glean remembers context from your work")

Activity-based memory is rolling out to eligible AWS, GCP, and self-hosted deployments using Glean Key or Customer Key. Glean learns helpful context from your activity so Assistant responses become more personalized and relevant over time, without you re-explaining your role, projects, or preferences in every chat. Admins get a memory control in the Admin Console to turn memory on or off for their organization. Customers that already use memory keep their explicit on or off choice, and every user keeps their individual memory controls. Availability depends on supported models and rollout readiness.

**How to access:** Rollout is automatic for eligible deployments starting October 8, 2026. Admins manage the organization-wide setting in the Admin Console, and users manage their own memory controls in Settings.

[Learn more](https://docs.glean.com/administration/assistant/configuration/memory-personalization)

#### 79 new MCP server templates[​](#79-new-mcp-server-templates "Direct link to 79 new MCP server templates")

The MCP server library keeps growing. This release adds 79 new remote server templates spanning finance, compliance, ecommerce, marketing, analytics, and operations — including Teamwork.com, Assembled, Profit.co, SE Ranking, NocoDB, Supernova, Rally, and infosociétés by Contract-Factory for searching public French company and director-mandate data. Most templates authenticate with per-user OAuth, some use a vendor API key, and a few need no authentication. Each template is ready to configure, so admins can bring vendor tools into Assistant and Agents without building custom integrations.

**How to access:** Admins explicitly add and enable each server from the MCP server directory in the Admin Console; users then authorize access with their own accounts where required.

[Learn more](https://docs.glean.com/administration/tools/supported-mcp-servers)

#### Power BI connector is generally available[​](#power-bi-connector-is-generally-available "Direct link to Power BI connector is generally available")

The Power BI connector is now generally available. Admins can connect Power BI through Microsoft 365 in the Admin Console so users can discover reports, dashboards, and semantic models in Glean search, and query live Power BI data in Assistant using their own Power BI permissions. This brings governed business intelligence content into the same place you already search and ask questions, while respecting the access rules your BI team has configured. Live query tools require the supported Microsoft MCP service and tenant settings, and availability may roll out in phases.

**How to access:** Admins connect Power BI from the Microsoft 365 setup in the Admin Console. Users search Power BI content and query live data in Assistant with their existing Power BI permissions.

[Learn more](https://docs.glean.com/connectors/native/powerbi/assistant)

#### Marketo connector is now in beta[​](#marketo-connector-is-now-in-beta "Direct link to Marketo connector is now in beta")

The Marketo connector is now available in beta. Teams that manage campaigns in Marketo can bring that content into Glean, so marketing knowledge is searchable alongside the rest of your company's content. As a beta connector, setup and coverage may continue to evolve based on customer feedback.

**How to access:** Contact your Glean account team to enable beta access, then set up the connector from the Admin Console.

[Learn more](https://docs.glean.com/connectors/native/marketo/)

#### Skill scanning and safety review[​](#skill-scanning-and-safety-review "Direct link to Skill scanning and safety review")

Glean now scans skills uploaded locally and skills imported from a third-party repository, such as GitHub, for unsafe instructions, malicious code, harmful content, and bundle problems. Skills from Glean are safe by default and are not scanned. Admins see scan statuses — Not scanned, Scan in progress, Pass, Review recommended, and Disabled — along with findings for each skill. Scanning is fail-open: a skill stays available until an admin disables it, and disabled skills are excluded from use. Skill scanning is managed as a billed advanced feature.

**How to access:** On by default. Admins review scan statuses and findings under Admin console → Skills → Manage, and manage scanning and pricing under Admin console → Advanced features.

[Learn more](https://docs.glean.com/administration/managing-skills/skill-scanning)

## AI & model updates[​](#ai--model-updates "Direct link to AI & model updates")

#### Faster, more natural voice conversations[​](#faster-more-natural-voice-conversations "Direct link to Faster, more natural voice conversations")

Voice conversations in Glean now run on OpenAI GPT Live by default for Glean Key deployments using OpenAI and Azure OpenAI. Conversations feel more natural, with faster replies and better robustness to background noise, and GPT Live handles speech directly without a separate transcription model. Deployments on earlier release versions keep the previous voice models until they upgrade.

**How to access:** No action needed. The new default applies automatically to Glean Key deployments on release version 561 or later.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)

## Critical updates[​](#critical-updates "Direct link to Critical updates")

#### GitHub tool retirement: Refresh your GitHub MCP tools[​](#github-tool-retirement-refresh-your-github-mcp-tools "Direct link to GitHub tool retirement: Refresh your GitHub MCP tools")

The deprecated GitHub tools now name their GitHub MCP replacements, so admins can see exactly which GitHub MCP tool to use in place of each retired tool. GitHub MCP also now supports a larger set of tools than the previous defaults.

**How to access:** Admins who have already set up GitHub MCP need to refresh tools from the Admin Console to pick up the expanded toolset.

#### Azure Files share-level permissions are now enforced[​](#azure-files-share-level-permissions-are-now-enforced "Direct link to Azure Files share-level permissions are now enforced")

Azure Files share-level role assignments are now considered alongside other Azure Files permissions when Glean decides who can read a document. This keeps search results aligned with the access rules your storage team manages in Azure.

**How to access:** No action needed. The updated permissions evaluation applies automatically to Azure Files content.

## Deprecations & sunsets[​](#deprecations--sunsets "Direct link to Deprecations & sunsets")

#### "Copy message link" removed from user messages in Chat[​](#copy-message-link-removed-from-user-messages-in-chat "Direct link to \"Copy message link\" removed from user messages in Chat")

The "Copy message link" button was removed from user messages in Chat. The "Copy message text" button is unchanged, so you can still copy your message content.

**How to access:** No action needed; this change applies automatically.

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Assistant responses start faster[​](#assistant-responses-start-faster "Direct link to Assistant responses start faster")

Glean Assistant uses a streamlined agent harness with leaner instructions and tool outputs. Responses start faster and follow your intent more closely, especially in longer or more complex conversations.

**How to access:** No action needed; the improvement applies automatically in Assistant.

#### Devin can connect to Glean Remote MCP without custom setup[​](#devin-can-connect-to-glean-remote-mcp-without-custom-setup "Direct link to Devin can connect to Glean Remote MCP without custom setup")

Devin is now on the Glean-managed list of approved MCP applications, so it can connect to Glean Remote MCP through OAuth without an admin adding a custom redirect URI.

**How to access:** Connect Devin to Glean Remote MCP using OAuth. No custom redirect URI configuration is needed.

[Learn more](https://docs.glean.com/administration/oauth/dynamic-client-registration)

#### Clearer MCP Insights attribution[​](#clearer-mcp-insights-attribution "Direct link to Clearer MCP Insights attribution")

MCP Insights now credits calls made through `run_tool` to the tool that actually ran. For example, a Jira or Slack action appears under that server's name instead of under `run_tool`. Each dispatched call is counted once in MCP call totals, and historical `run_tool` entries no longer appear, so usage reporting reflects real tool activity.

**How to access:** Open MCP Insights in the Admin Console. The updated attribution applies automatically.

#### Easier planning in the Feature Rollouts Beta tab[​](#easier-planning-in-the-feature-rollouts-beta-tab "Direct link to Easier planning in the Feature Rollouts Beta tab")

The Beta tab on the Admin Console Feature Rollouts page now groups features that share the same target GA date and supports sortable target-date ordering, making it easier to plan for upcoming changes. Features without a date remain at the end of the list.

**How to access:** Open Admin Console → Feature Rollouts → Beta tab.

[Learn more](https://docs.glean.com/administration/feature-rollouts)

#### Find transferred agents by their current owner[​](#find-transferred-agents-by-their-current-owner "Direct link to Find transferred agents by their current owner")

Agents with transferred ownership now show the current owner's name in the Owner filter, so transferred agents are easier to find and manage.

**How to access:** Use the Owner filter in the agents list. Transferred agents appear under their current owner.

#### Redesigned agent share emails[​](#redesigned-agent-share-emails "Direct link to Redesigned agent share emails")

Agent share emails have a new layout: the sharer's message appears with an agent card showing the agent's author, favorites, runs, last update, and description, followed by an "Open agent" button. Recipients get the context they need to decide whether to try an agent before opening it.

**How to access:** No action needed; the new layout applies to agent share emails automatically.

#### Smoother chat start and interface polish[​](#smoother-chat-start-and-interface-polish "Direct link to Smoother chat start and interface polish")

Starting a new chat no longer navigates to the homepage or a previous chat, and bordered collapsible sections now transition their corners and chevrons more smoothly.

**How to access:** No action needed; these improvements apply automatically.

#### Customize Azure Files search result display[​](#customize-azure-files-search-result-display "Direct link to Customize Azure Files search result display")

Azure Files administrators can now customize how file and folder search results appear from the connector's Results display tab, matching the display controls available for other connectors.

**How to access:** Open the Azure Files connector settings in the Admin Console and use the Results display tab.

#### Fresher Zoom recordings and transcripts[​](#fresher-zoom-recordings-and-transcripts "Direct link to Fresher Zoom recordings and transcripts")

Zoom meeting recordings and transcripts are now refreshed hourly, so recent meetings show up in search and Assistant sooner.

**How to access:** No action needed; the faster refresh applies automatically to the Zoom connector.

## Fixes[​](#fixes "Direct link to Fixes")

#### Chat owners can rename, delete, and move their chats again[​](#chat-owners-can-rename-delete-and-move-their-chats-again "Direct link to Chat owners can rename, delete, and move their chats again")

Fixed an issue where chat owners could see only Share in the chat menu and could not rename, delete, or move their chats to a project.

#### Glean Desktop stays signed in and recovers after sleep[​](#glean-desktop-stays-signed-in-and-recovers-after-sleep "Direct link to Glean Desktop stays signed in and recovers after sleep")

The desktop app now preserves an existing signed-in session when token refresh fails because of a temporary network or server interruption, and it waits for connectivity and retries after a computer wakes from sleep — reducing unexpected sign-outs and persistent blank screens.

#### Salesforce Case Assistant loads case feeds for all permitted users[​](#salesforce-case-assistant-loads-case-feeds-for-all-permitted-users "Direct link to Salesforce Case Assistant loads case feeds for all permitted users")

Fixed an issue where the Glean Case Assistant side panel in Salesforce Service Cloud failed to load Case feed posts and comments for users without the View All Data permission.

#### More reliable Google Chat crawls[​](#more-reliable-google-chat-crawls "Direct link to More reliable Google Chat crawls")

Google Chat crawls now stop pagination on empty message pages, skip zero-byte and oversized attachments instead of retrying them, and preserve the configured delegate count independently for each space — improving message coverage and crawl reliability.

#### Clearer calendar connection errors[​](#clearer-calendar-connection-errors "Direct link to Clearer calendar connection errors")

An invalid Microsoft Graph app credential for a Teams or Outlook Calendar connection — such as an expired client secret or revoked admin consent — is now reported as an authorization failure instead of an unexplained server error, and meeting lookup explains calendar failures in plain language so admins know to renew the connector credentials.
