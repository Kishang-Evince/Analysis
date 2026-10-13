---
url: "https://docs.glean.com/release-notes/releases/2026-09-22-september-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-09-22-september-release"
title: "September 22, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:33.232Z"
---
On this page

**Release version:** 556

This release adds 182 new vendor Model Context Protocol (MCP) server templates to the MCP server directory, introduces a getting started checklist in the left navigation, moves new MCP setup into the Connectors experience, and brings Monday.com items and updates into Glean search. It also adds Claude Opus 5.5, GPT-6 Sol, and GPT-6 Luna in Assistant and Agents. This release includes agent scheduling and library improvements, new admin controls, security hardening for mobile sign-out and Azure Files permissions, the start of the memory & personalization free trial for Enterprise Flex plans, and the retirement of the legacy v1 browser extension experience.

## Major Launches[​](#major-launches "Direct link to Major Launches")

#### 182 new vendor MCP server templates[​](#182-new-vendor-mcp-server-templates "Direct link to 182 new vendor MCP server templates")

The MCP server directory now includes 182 additional vendor Model Context Protocol (MCP) server templates, spanning legal, finance, sales, marketing, real estate, construction, security, developer tools, research, and more. Notable additions include Trello, Stack Overflow, Elicit, TikTok for Business, Alpha Vantage, Whimsical, Interactive Brokers, GrowthBook, Cypress Cloud, DeepJudge, and Paxton Legal Research. Most templates use per-user OAuth, so each person authorizes their own account, and templates that haven't completed Glean verification are visually flagged in the directory so admins can make informed choices.

**How to access:** Admins explicitly add and enable each server from the MCP server directory in the Admin Console — no servers are turned on automatically. See the [full list of supported servers](https://docs.glean.com/administration/tools/supported-mcp-servers).

[Learn more](https://docs.glean.com/administration/tools/connect-remote-mcp-servers-to-glean)

Glean MCP *\[ROAD-1441\]*

* * *

#### Getting started checklist in the left navigation[​](#getting-started-checklist-in-the-left-navigation "Direct link to Getting started checklist in the left navigation")

A new **Getting started** checklist in the left navigation helps you discover key features and get up to speed with Glean faster. The checklist walks new users through the most useful first steps — like connecting data sources, trying Assistant, and exploring agents — so teams see value from Glean sooner without needing a guided rollout. It's especially helpful for organizations onboarding new employees or expanding Glean to new departments.

**How to access:** The checklist appears automatically in the left navigation. It's on by default for everyone, and no admin action is required.

Glean Home *\[ROAD-1705\]*

* * *

#### MCP setup moves to Connectors[​](#mcp-setup-moves-to-connectors "Direct link to MCP setup moves to Connectors")

Starting September 22, 2026, all net-new Model Context Protocol (MCP) connections are set up through the Connectors experience instead of the separate Tools area. This brings MCP servers and native connectors into one place, so admins manage all of Glean's data and tool connections from a single, consistent workflow. All customers also see the redesigned connectors table on the Connectors page, which makes it easier to scan and manage existing connections. Existing MCP configurations are unchanged and keep working as before.

**How to access:** Go to **Admin Console → Connectors** to set up new MCP connections and see the new connectors table. No migration is required for existing configurations.

Connectors & MCP *\[ROAD-1706\]*

* * *

#### Monday.com items and updates in Glean search[​](#mondaycom-items-and-updates-in-glean-search "Direct link to Monday.com items and updates in Glean search")

Monday.com items, nested items, updates, and replies are now searchable in Glean. Search results open the correct Monday item or board, and Monday permissions are preserved so people only see content they can already access in Monday. This means project details, task conversations, and status updates that previously lived only inside Monday boards are now part of your company-wide search — making it easier to find the full context of a project without switching tools. Content appears after the next successful full content crawl.

**How to access:** An admin must enable item indexing with `crawl.indexItems.enabled=true`, and each end user must authorize Monday in Glean under **User Settings → Data Sources → Monday** to search items and comments.

[Learn more](https://docs.glean.com/connectors/native/monday/)

Connectors *\[ROAD-1711\]*

## Deprecations & Sunsets[​](#deprecations--sunsets "Direct link to Deprecations & Sunsets")

#### Legacy v1 browser extension experience retired[​](#legacy-v1-browser-extension-experience-retired "Direct link to Legacy v1 browser extension experience retired")

The legacy v1 search-only overlay experience in the Glean browser extension is retired. The option to switch back to the v1 experience has been removed, and individual users still on v1 move to the v2 side panel experience, which offers chat, search, and page context in one place. Deployments still configured for the v1 overlay deployment-wide are not automatically upgraded.

**How to access:** No action is required for users who already have the browser extension — the v2 side panel experience applies automatically.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar)

Browser Extension *\[ROAD-1643\]*

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Claude Opus 5.5 in Assistant and Agents[​](#claude-opus-55-in-assistant-and-agents "Direct link to Claude Opus 5.5 in Assistant and Agents")

Claude Opus 5.5 is now available as a premium Anthropic model in Assistant and Agents. It's designed for coding, agentic workflows, long-running enterprise tasks, research, and knowledge work, and provides an upgrade path from earlier Opus models. Usage may be subject to usage-based pricing.

**How to access:** Select Claude Opus 5.5 from supported Assistant and agent model settings where premium Anthropic models are available.

[Learn more](https://docs.glean.com/administration/llms)

Assistant & Agents *\[ROAD-1715\]*

* * *

#### GPT-6 Sol and GPT-6 Luna in Assistant and Agents[​](#gpt-6-sol-and-gpt-6-luna-in-assistant-and-agents "Direct link to GPT-6 Sol and GPT-6 Luna in Assistant and Agents")

GPT-6 Sol and GPT-6 Luna are now available in Assistant model choice and Agents across Glean Universal Model Key and Customer Key configurations. These models give teams more choice for Assistant conversations and agent workflows. Pricing details are not included in this release note.

**How to access:** Select GPT-6 Sol or GPT-6 Luna from supported Assistant and agent model settings.

[Learn more](https://docs.glean.com/administration/llms)

Assistant & Agents *\[ROAD-1724\]*

* * *

#### Find agents by owner in the Agents library[​](#find-agents-by-owner-in-the-agents-library "Direct link to Find agents by owner in the Agents library")

The Agents library now includes an Owner filter alongside the existing Creator filter. It supports multiple owners — both people and groups — and matches agents owned by any selected owner. This keeps agents discoverable even after ownership transfers, such as when an agent's original creator leaves the company.

**How to access:** Open the Agents library and use the **Owner** filter. No admin action is required.

Agents

* * *

#### Scheduled agents keep their subscribers[​](#scheduled-agents-keep-their-subscribers "Direct link to Scheduled agents keep their subscribers")

Agents that run on a schedule no longer pause subscriptions when the agent's owner switches between scheduled and manual runs. Previously, that switch paused every active subscription until each subscriber manually reactivated it. Subscribers now stay subscribed through the change and are still notified of agent changes by email.

**How to access:** This applies automatically to all scheduled agents. No action is required.

Agents

* * *

#### Simpler agent scheduling[​](#simpler-agent-scheduling "Direct link to Simpler agent scheduling")

Setting and editing an agent's schedule is now a short guided flow. Setting a schedule asks for the inputs the scheduled run should use and then the cadence; editing one opens on the cadence and confirms the inputs afterwards, so editing a schedule no longer changes what a manual run does. Removing a schedule has moved to an overflow menu next to the schedule action, and steps with nothing to fill in are skipped.

**How to access:** Open any agent you can schedule and select the schedule action. No admin action is required.

Agents

* * *

#### People profiles stay in embedded chat[​](#people-profiles-stay-in-embedded-chat "Direct link to People profiles stay in embedded chat")

Embedded Web SDK chat now keeps people profiles, the org chart, teams, and team pages inside the embedded experience instead of opening separate app.glean.com pages. If your organization embeds Glean chat in an internal portal or app, users can now explore people and team information without leaving that experience.

**How to access:** This applies automatically to embedded chat built with the Glean Web SDK. No configuration changes are required.

Web SDK

* * *

#### Browser notifications setting has moved[​](#browser-notifications-setting-has-moved "Direct link to Browser notifications setting has moved")

The **Allow browser notifications from Assistant and agent runs** toggle has been removed from the Chat preferences dialog. Browser notification preferences are now managed in one place.

**How to access:** Go to **Settings → Preferences → Notifications** to manage browser notifications.

Assistant

* * *

#### Smoother link typing in the composer[​](#smoother-link-typing-in-the-composer "Direct link to Smoother link typing in the composer")

URLs typed in the Assistant composer no longer convert to a link pill before you finish typing, so you can paste or type out a full link without it being cut short.

**How to access:** This applies automatically in the Assistant composer. No action is required.

Assistant

* * *

#### Browser extension side panel polish[​](#browser-extension-side-panel-polish "Direct link to Browser extension side panel polish")

The browser extension side panel now includes an X icon to close the chat bar menu, along with updated placeholder text, for a cleaner and more predictable experience.

**How to access:** This applies automatically in the browser extension side panel. No action is required.

Browser Extension

* * *

#### Deploy OpenCode through the LLM Gateway with MDM[​](#deploy-opencode-through-the-llm-gateway-with-mdm "Direct link to Deploy OpenCode through the LLM Gateway with MDM")

Administrators can now deploy OpenCode through the LLM Gateway mobile device management (MDM) setup on macOS and Windows, with managed configuration and a selected OAuth client. This lets IT teams roll out OpenCode to managed devices with the same MDM workflow used for other LLM Gateway apps.

**How to access:** In the Admin Console, open the LLM Gateway MDM setup, select OpenCode, and choose an eligible OAuth client to generate the deployment configuration.

Admin Console

* * *

#### Control over home page background images[​](#control-over-home-page-background-images "Direct link to Control over home page background images")

Admins can now allow or disallow end-user changes to the home page background image. When custom backgrounds are disallowed, previously selected backgrounds revert to the default, keeping a consistent look across the organization.

**How to access:** Go to **Admin Console → Appearance** and set the background image preference for your organization.

Admin Console

* * *

#### SSO credential-expiry alerts on by default[​](#sso-credential-expiry-alerts-on-by-default "Direct link to SSO credential-expiry alerts on by default")

Single sign-on (SSO) credential-expiry email alerts are now enabled by default. Workspace administrators receive advance notice when Azure SSO credentials are nearing expiration, helping prevent authentication disruptions before they affect users.

**How to access:** Alerts are sent automatically to workspace administrators. No setup is required, and admins can adjust notification preferences if needed.

Admin Console

* * *

#### Clearer usage labels for Memory & personalization[​](#clearer-usage-labels-for-memory--personalization "Direct link to Clearer usage labels for Memory & personalization")

Usage breakdowns in the personal usage view and the billing admin UI now label memory usage as **Memory & personalization** instead of an internal codename, so the Assistant usage breakdown matches the name used elsewhere in the product.

**How to access:** The updated label appears automatically in personal usage and billing views. No action is required.

[Learn more](https://docs.glean.com/administration/assistant/configuration/memory-personalization)

Admin Console

* * *

#### Memory & personalization free trial for Enterprise Flex plans[​](#memory--personalization-free-trial-for-enterprise-flex-plans "Direct link to Memory & personalization free trial for Enterprise Flex plans")

Enterprise Flex plans receive a 30-day free trial of Memory & personalization usage starting September 17, 2026. During the trial, memory usage does not consume FlexCredits. After the trial ends, usage bills against FlexCredits starting October 17, 2026. Billing admins may want to review expected usage before the billing start date.

**How to access:** The trial applies automatically to Enterprise Flex plans. Review usage in the billing section of the Admin Console.

[Learn more](https://docs.glean.com/administration/assistant/configuration/memory-personalization)

Admin Console

* * *

#### Now on by default for everyone[​](#now-on-by-default-for-everyone "Direct link to Now on by default for everyone")

The following experiences, previously announced on September 15, 2026, are now on by default for all users:

-   Updated left navigation, reorganized into tiers with an overflow menu and customizable sidebar
-   Redesigned model picker in Assistant, with cost and intelligence ratings and notes
-   Collapsed **Show work** summary in Assistant, which tucks intermediate reasoning and tool calls into a single expandable summary
-   New homepage experience, with a dedicated space for company announcements, featured agents, and resources

**How to access:** These experiences apply automatically. No admin action is required.

Assistant

## Security[​](#security "Direct link to Security")

#### Mobile sign-out now revokes tokens on the server[​](#mobile-sign-out-now-revokes-tokens-on-the-server "Direct link to Mobile sign-out now revokes tokens on the server")

Logging out of the Glean iOS and Android apps now revokes the stored refresh token on the server, following the OAuth 2.0 token revocation standard. A signed-out session can no longer be used to obtain new access tokens, strengthening protection if a device is lost or shared.

**How to access:** This applies automatically when users sign out of the Glean mobile apps. No action is required.

Mobile

* * *

#### Stricter Azure Files permission enforcement[​](#stricter-azure-files-permission-enforcement "Direct link to Stricter Azure Files permission enforcement")

Azure Files now uses bounded keys for Azure role-based access control metadata and requires both Azure role-based access control and file-system permissions to allow access before indexed files are visible in Glean. Because both checks must pass, access may tighten for some users whose visibility previously relied on only one of the two.

**How to access:** This applies automatically to the Azure Files connector. No admin action is required.

Connectors

## Fixes[​](#fixes "Direct link to Fixes")

#### Inline charts no longer remain blank[​](#inline-charts-no-longer-remain-blank "Direct link to Inline charts no longer remain blank")

Fixed an issue where inline charts could remain blank after a follow-up question until the page was refreshed.

Assistant

* * *

#### GitHub connector sync failures resolved[​](#github-connector-sync-failures-resolved "Direct link to GitHub connector sync failures resolved")

Fixed GitHub connector sync failures that occurred when a pull request review no longer had an associated GitHub user.

Connectors

* * *

#### Configurable MCP connect timeout[​](#configurable-mcp-connect-timeout "Direct link to Configurable MCP connect timeout")

The Model Context Protocol (MCP) connect timeout is now configurable via the `mcp.toolsStore.connectTimeoutSecs` search config, allowing deployments with slower MCP server initialization to connect successfully.

Glean MCP

* * *

#### Tighter network rules for GCP internal load balancers[​](#tighter-network-rules-for-gcp-internal-load-balancers "Direct link to Tighter network rules for GCP internal load balancers")

Google Cloud Platform (GCP) Capsule internal load balancers are now restricted to private network sources instead of permitting all source ranges at the firewall layer.

Platform

* * *

#### Egnyte transcript content now searchable[​](#egnyte-transcript-content-now-searchable "Direct link to Egnyte transcript content now searchable")

Fixed an issue where valid Egnyte Web Video Text Tracks (WebVTT) transcript files could be indexed without searchable transcript content.

Connectors
