---
url: "https://docs.glean.com/release-notes/releases/2026-09-08-september-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-09-08-september-release"
title: "September 08, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:32.758Z"
---
On this page

This release adds 31 new vendor MCP server templates to the Glean MCP directory, brings GPT-6 Astra to Assistant and Agents, and introduces single-owner agent governance — alongside enhancements across connectors, the browser extension, and admin tooling.

## Major Launches[​](#major-launches "Direct link to Major Launches")

#### Connect 31 new vendor MCP servers from the directory[​](#connect-31-new-vendor-mcp-servers-from-the-directory "Direct link to Connect 31 new vendor MCP servers from the directory")

The Glean MCP server directory now includes 31 new vendor templates, so your teams can bring more third-party tools directly into Assistant and Agents. New additions include ClickHouse Cloud, PineGap, OneSignal, Demandbase, ServiceNow (customer-defined MCP Server Console endpoints), Coevera, Nutshell CRM, Adobe Customer Journey Analytics, Tabs, MuleSoft Platform, Onplana, Commercient Data Lake and Data Hub, Pensieve, Aleph, AI for Work, Adobe Workfront, Windsor.ai for CRM, Reevo, CredCore Tusk Liquid, Revealed, Matia, Suger, Smarter Drafter, Bloomberg Law, Elite Site Optimizer, Parallel Search, Zylo, Voicenter, Orca Scan, Fullstory, and Parallel. Most templates use per-user OAuth; Parallel Search connects anonymously, and some vendors (Demandbase, Bloomberg Law, Adobe Workfront) require vendor-side enablement or entitlement.

**How to access:** In the Admin Console, open the MCP server directory, select a vendor template, and connect and enable it for your organization.

[Learn more](https://docs.glean.com/administration/tools/supported-mcp-servers) Glean MCP *\[ROAD-1441\]*

#### Choose the right API-key header when configuring MCP servers[​](#choose-the-right-api-key-header-when-configuring-mcp-servers "Direct link to Choose the right API-key header when configuring MCP servers")

When you configure an MCP server that authenticates with an API key, you can now choose which header Glean uses to send the credential — for example `Authorization` or `X-API-Key` — from a dropdown in the configuration flow. This removes a common source of setup ambiguity and failed connections when a vendor's server expects the key in a non-default header. The option is available to admins by default, so you can match each server's expected header format without workarounds or support tickets.

**How to access:** In the Admin Console, open your MCP server's API key configuration and select the header format from the dropdown.

[Learn more](https://docs.glean.com/administration/tools/connect-remote-mcp-servers-to-glean) Glean MCP *\[ROAD-1640\]*

#### Configure default sidebar navigation in the new Appearance panel[​](#configure-default-sidebar-navigation-in-the-new-appearance-panel "Direct link to Configure default sidebar navigation in the new Appearance panel")

A new Appearance panel in the Admin Console lets you configure which navigation items appear by default in the upcoming customizable sidebar. You can decide ahead of time which destinations your users see first — so when the new left navigation reaches your organization, it reflects the workflows that matter most to your teams rather than a generic default. The panel is available to admins now, giving you time to review and set your preferred defaults.

**How to access:** Go to Admin Console → Appearance → sidebar navigation defaults.

Admin Console *\[ROAD-1603\]*

## AI & Model Updates[​](#ai--model-updates "Direct link to AI & Model Updates")

#### GPT-6 Astra is available in Assistant and Agents[​](#gpt-6-astra-is-available-in-assistant-and-agents "Direct link to GPT-6 Astra is available in Assistant and Agents")

You can now use GPT-6 Astra in Glean Assistant and Agents. Astra is strongest on long-running artifact workflows and complex reasoning, coding, and agentic work, and delivers a quality advantage over GPT-5.6 Sol and Terra, with tradeoffs in latency and input-token cost. GPT-6 Astra is generally available for Enterprise Flex, Glean Core Suite, and Enterprise (Customer Key) customers; it is not available on Enterprise (Glean Key) or Enterprise Flex in a preview period, and Azure support is coming shortly after.

**How to access:** Admins can enable GPT-6 Astra for eligible users; once enabled, users can select it in Assistant and Agents.

[Learn more](https://docs.glean.com/glean-core-suite-pricing) AI Models *\[ROAD-1685\]*

## Critical Updates[​](#critical-updates "Direct link to Critical Updates")

#### Agents now have a single owner[​](#agents-now-have-a-single-owner "Direct link to Agents now have a single owner")

Agents now enforce a single owner per agent by default, giving each agent one clear point of accountability. Adding multiple owners is no longer supported; instead, owners can transfer ownership through the share dialog, and the previous owner automatically becomes an Editor with full edit access. Existing agents with multiple owners have a two-week grace period, after which they are automatically migrated to a single owner — the agent's creator when possible, otherwise the first owner alphabetically. The original creator is preserved as audit metadata in all cases.

**How to access:** No action is needed — this change applies automatically, and existing multi-owner agents migrate after the grace period.

Agents *\[ROAD-1558\]*

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Review changes before publishing an agent[​](#review-changes-before-publishing-an-agent "Direct link to Review changes before publishing an agent")

The agent builder's publish modal now shows you the changes that will be published, so you can review exactly what's changing before it goes live. This diff view helps you catch unintended edits, confirm the scope of an update, and publish with confidence — especially useful for agents shared broadly across your organization.

**How to access:** No action is needed — the diff view appears automatically in the publish modal when you publish an agent.

Agent Builder

#### Export meeting notes from every tab in the Library[​](#export-meeting-notes-from-every-tab-in-the-library "Direct link to Export meeting notes from every tab in the Library")

When you open a meeting note artifact from the Library that doesn't have an associated chat, export actions now appear on every tab — matching the experience on the standalone summary page. You no longer need to navigate to a specific tab or reopen the note elsewhere to export your transcript, summary, or notes.

**How to access:** Open a meeting note from the Library; export actions are available on every tab.

[Learn more](https://docs.glean.com/user-guide/assistant/meeting-notes/) Assistant *\[ROAD-769\]*

#### Download the Glean MCP installer from Connected Apps[​](#download-the-glean-mcp-installer-from-connected-apps "Direct link to Download the Glean MCP installer from Connected Apps")

You can now download the Glean MCP installer directly from Connected Apps to configure Glean MCP on supported macOS and Windows devices. The one-click installer download is available from the MCP connect card and is on by default, so you can set up Glean MCP on your device without waiting for a centrally managed deployment.

**How to access:** Open Connected Apps and use the download option on the MCP connect card.

[Learn more](https://docs.glean.com/administration/platform/mcp/mdm-mcp) Glean MCP

#### Service Cloud migration banner shows its full content[​](#service-cloud-migration-banner-shows-its-full-content "Direct link to Service Cloud migration banner shows its full content")

The Service Cloud migration banner in the browser extension now expands vertically to show its full content, instead of hiding part of the message behind an internal scrollbar. The banner keeps its existing width and layout, so you can read the complete migration guidance at a glance.

**How to access:** No action is needed — the banner displays its full content automatically in the browser extension.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar) Browser Extension *\[ROAD-1461\]*

#### Pasted links appear as compact pills in the composer[​](#pasted-links-appear-as-compact-pills-in-the-composer "Direct link to Pasted links appear as compact pills in the composer")

When you paste a URL into the Assistant composer that doesn't resolve to a Glean document, it now appears as a compact link pill with smart truncation, keeping long URLs from cluttering your message. Hover over the pill to see the full URL, and rest assured the original destination is preserved exactly when you submit your message.

**How to access:** No action is needed — paste any URL into the Assistant composer to see the new link pills.

Chat

#### Ask table-level questions about entire SharePoint Lists[​](#ask-table-level-questions-about-entire-sharepoint-lists "Direct link to Ask table-level questions about entire SharePoint Lists")

Assistant and Agents can now read a SharePoint List as a single aggregate table document. Paste a list's landing-page URL and Glean reads the entire list as one table — removing the previous cap of roughly 200 items — so you can ask table-level questions like totals, filters, and cross-row comparisons over the full list.

**How to access:** Requires SharePoint Extension Actions setup; once configured, reference a SharePoint List by its landing-page URL in Assistant or Agents.

Connectors *\[ROAD-1662\]*

#### Azure Files search supports custom metadata and ownership facets[​](#azure-files-search-supports-custom-metadata-and-ownership-facets "Direct link to Azure Files search supports custom metadata and ownership facets")

If your organization uses the Azure Files connector, search now supports custom metadata fields (`x-ms-meta-*`) as searchable custom fields. In addition, author and owner facets are derived from resolved NTFS file ownership when user identity metadata is available, so you can filter Azure Files results by who owns them.

**How to access:** No action is needed — custom metadata fields and ownership facets are picked up automatically where the metadata is available.

Connectors

#### Configured-agent status in the extension admin console is now reliable[​](#configured-agent-status-in-the-extension-admin-console-is-now-reliable "Direct link to Configured-agent status in the extension admin console is now reliable")

The browser-extension admin console now keeps configured-agent status and counts accurate. Agents that have been deleted, are inaccessible, or can't be retrieved are clearly labeled with role-appropriate recovery guidance, so you know exactly what to fix and how. New configurations also exclude legacy static workflows and show only configured agents, giving you a clean, trustworthy view of what your users will see in the extension.

**How to access:** No action is needed — the improvements appear automatically in the browser-extension admin console.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar) Browser Extension *\[ROAD-1461\]*

#### Generate MDM deployment scripts from a central page[​](#generate-mdm-deployment-scripts-from-a-central-page "Direct link to Generate MDM deployment scripts from a central page")

Workspace admins can now use a central MDM deployment page in the Admin Console to generate macOS and Windows deployment scripts for enabled MCP Servers and LLM Gateway. Instead of assembling deployment configurations by hand for each platform, you generate ready-to-use scripts in one place and push them through your MDM provider — making managed rollout of Glean MCP across your device fleet faster and less error-prone.

**How to access:** Open the MDM deployment page in the Admin Console and generate scripts for your enabled MCP Servers and LLM Gateway.

[Learn more](https://docs.glean.com/administration/platform/mcp/mdm-mcp) Admin Console

#### Expiring Google Drive permissions stay accurate through large crawls[​](#expiring-google-drive-permissions-stay-accurate-through-large-crawls "Direct link to Expiring Google Drive permissions stay accurate through large crawls")

Google Drive permission crawls now correctly handle paginated, time-limited access grants for files and shared drives. When a crawl spans multiple pages of results, expiring permissions are tracked accurately all the way through, so search results continue to respect exactly who has access — even in large Drive environments with many temporary access grants.

**How to access:** No action is needed — this improvement applies automatically to Google Drive permission crawls.

Connectors

#### Agent sharing is on by default for new customers[​](#agent-sharing-is-on-by-default-for-new-customers "Direct link to Agent sharing is on by default for new customers")

For new Glean customers, agent sharing is now enabled by default for all users unless the admin explicitly scopes it. This means teams at newly onboarded organizations can share the agents they build right away, without waiting for an admin to switch sharing on. Admins retain full control and can scope or restrict sharing at any time from agent access settings.

**How to access:** No action is needed for new customers — sharing is on by default; admins can adjust scope in agent access settings.

[Learn more](https://docs.glean.com/administration/managing-agents/agent-access) Agents *\[ROAD-1557\]*

## Fixes[​](#fixes "Direct link to Fixes")

#### Approval-gated agent actions report their true status[​](#approval-gated-agent-actions-report-their-true-status "Direct link to Approval-gated agent actions report their true status")

Agent actions that require user approval no longer report success while still awaiting approval; deferred actions now correctly show as pending approval.

Agents

#### MCP SSE tool discovery no longer drops sessions[​](#mcp-sse-tool-discovery-no-longer-drops-sessions "Direct link to MCP SSE tool discovery no longer drops sessions")

MCP SSE tool discovery now keeps the session alive through initialization and tool listing, preventing session-not-found failures during tool refresh.

Glean MCP

#### PagerDuty incident crawls are faster[​](#pagerduty-incident-crawls-are-faster "Direct link to PagerDuty incident crawls are faster")

Fixed PagerDuty connector pagination that caused excessive API calls and slow incident crawling.

Connectors

#### NetSuite crawls put less load on your source[​](#netsuite-crawls-put-less-load-on-your-source "Direct link to NetSuite crawls put less load on your source")

NetSuite full crawls now run daily by default while hourly incremental crawls preserve freshness, reducing load on the NetSuite API.

Connectors

#### Chat history can be re-enabled across multiple identities[​](#chat-history-can-be-re-enabled-across-multiple-identities "Direct link to Chat history can be re-enabled across multiple identities")

Users with multiple email identities can now re-enable chat history; privacy settings apply consistently across all of a user's identities.

Chat
