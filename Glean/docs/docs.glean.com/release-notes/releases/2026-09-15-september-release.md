---
url: "https://docs.glean.com/release-notes/releases/2026-09-15-september-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-09-15-september-release"
title: "September 15, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:33.008Z"
---
On this page

**Release version:** `release-2026-09-15`

This release adds 284 new vendor MCP server templates, per-user usage details, an updated left navigation, and four new open models, along with new beta API and connector capabilities, enhancements across Assistant, Agents, and the Admin Console, security improvements, and fixes.

## Major Launches[​](#major-launches "Direct link to Major Launches")

#### 284 new vendor MCP server templates[​](#284-new-vendor-mcp-server-templates "Direct link to 284 new vendor MCP server templates")

The MCP server directory now includes 284 new vendor templates spanning legal, finance, real estate, HR and recruiting, marketing, healthcare, security, productivity, and developer tools — including Evernote, DeepL, Tableau Cloud, Meltwater, Coursera, DataCamp, GitBook, draw.io, WeTransfer, Reclaim.ai, Neon, WorkOS, AveryGPT, and Legal Brain Agent for researching Japanese laws, precedents, guidelines, and legal books. Unverified templates are visually separated with caution indicators so admins can make informed choices, and the Ticketmaster template ships disabled pending qualification.

**How to access:** Admins explicitly add and enable each server from the MCP server directory in the Admin Console; most templates use per-user OAuth.

[Learn more](https://docs.glean.com/administration/tools/supported-mcp-servers) Glean MCP *\[ROAD-1441\]*

* * *

#### Per-user usage details[​](#per-user-usage-details "Direct link to Per-user usage details")

Admins can now drill into an individual user's monthly usage, and eligible users can view their own usage trends and breakdowns.

**How to access:** On by default. Admins drill in from the Usage dashboard in the Admin Console; eligible users view their own usage from Settings.

[Learn more](https://docs.glean.com/administration/management/usage/set-usage-limits-and-alerts) Admin Console *\[ROAD-1568\]*

* * *

#### Search and Chat APIs callable without the experimental header (beta)[​](#search-and-chat-apis-callable-without-the-experimental-header-beta "Direct link to Search and Chat APIs callable without the experimental header (beta)")

POST /api/search, GET /api/search/filters, and POST /api/chat no longer require the `X-Glean-Include-Experimental` header, simplifying integrations that call these endpoints.

**How to access:** Available in private beta on a phased basis; contact your Glean account team to participate.

Developer Platform *\[ROAD-1473\]*

* * *

#### Tableau permissions crawling (beta)[​](#tableau-permissions-crawling-beta "Direct link to Tableau permissions crawling (beta)")

Glean can now crawl Tableau permissions without per-user crawls, keeping Tableau content permissions-aware with less setup.

**How to access:** Available in private beta and admin-gated; contact your Glean account team to participate.

Connectors *\[ROAD-1232\]*

* * *

#### Updated left navigation[​](#updated-left-navigation "Direct link to Updated left navigation")

Glean's left navigation is reorganized into tiers with an overflow menu. Users can customize their own sidebar, and admins can set the default sidebar layout for their organization from Admin Console → Appearance.

**How to access:** Managed rollout begins September 15, 2026, with general availability on September 29, 2026. Admins can enable it early from the Feature rollouts page.

[Learn more](https://docs.glean.com/administration/management/appearance/left-navigation) Search experience *\[ROAD-1603\]*

* * *

#### Collapsed "Show work" summary in Assistant[​](#collapsed-show-work-summary-in-assistant "Direct link to Collapsed \"Show work\" summary in Assistant")

Intermediate reasoning and tool calls now collapse into a single expandable "Show work" summary once a response is ready, keeping conversations easy to read while preserving full visibility into how Assistant reached its answer.

**How to access:** Managed rollout. Admins can enable it from the Feature rollouts page.

Assistant *\[ROAD-1679\]*

* * *

#### Redesigned model picker in Assistant[​](#redesigned-model-picker-in-assistant "Direct link to Redesigned model picker in Assistant")

The model picker now shows cost and intelligence ratings and notes for each model, helping users choose the right model for the task at hand.

**How to access:** Managed rollout. Admins can enable it from the Feature rollouts page.

Assistant *\[ROAD-1669\]*

## AI & Model Updates[​](#ai--model-updates "Direct link to AI & Model Updates")

#### Four new open models in Assistant and Agents[​](#four-new-open-models-in-assistant-and-agents "Direct link to Four new open models in Assistant and Agents")

Four open models are now available: GLM-5.3, a premium open model for complex knowledge work and agentic tasks; GLM-5.3 Flash for faster, cost-efficient everyday workflows; Kimi K3 for artifact creation and design-heavy workflows; and DeepSeek V4.1 Flash for fast, highly cost-efficient general knowledge work and agentic use. GLM-5.3 and Kimi K3 are premium models; GLM-5.3 Flash and DeepSeek V4.1 Flash are standard models. GLM-5.3 Flash, DeepSeek V4.1 Flash, and Kimi K3 are the first open models with primary placement in the model picker. All four are served through Glean's US-based inference-hosting providers and follow the regional controls for open models (see [manage open models by region](https://docs.glean.com/administration/open-models-by-region)).

**How to access:** For Glean Universal Model Key deployments, go to **Admin Console → Models → Other open models**, turn on open models trained by Chinese companies, and select **Save**. Access can also be restricted by department or team, or blocked separately for Assistant or Agents.

[Learn more](https://docs.glean.com/administration/llms) Assistant *\[ROAD-1670\]*

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Document type filter grouping[​](#document-type-filter-grouping "Direct link to Document type filter grouping")

The Type filter now groups Glean documents with other document types under a single Document option, making it easier to narrow results.

**How to access:** Use the Type filter on the search results page.

Search

* * *

#### Per-application usage breakdown in billing drill-down[​](#per-application-usage-breakdown-in-billing-drill-down "Direct link to Per-application usage breakdown in billing drill-down")

Admins can now break down a user's model usage by application in the billing drill-down, with mixed denominations separated automatically.

**How to access:** Open a user's usage drill-down from the Usage dashboard in the Admin Console.

Admin Console

* * *

#### Unsubscribe from agent notification emails[​](#unsubscribe-from-agent-notification-emails "Direct link to Unsubscribe from agent notification emails")

Users can now unsubscribe from agent notification emails, including agent updated or paused notices, approval digests, admin-disabled notices, bulk-delete completion emails, and rate-limit emails.

**How to access:** Use the unsubscribe option in any agent notification email.

Agents

* * *

#### GitHub skill import guidance[​](#github-skill-import-guidance "Direct link to GitHub skill import guidance")

The skill import flow now explains how to pick a specific skill folder when a pasted GitHub URL points at a parent directory.

**How to access:** Go to Settings → Skills and select Import from GitHub.

[Learn more](https://docs.glean.com/user-guide/assistant/skills) Assistant *\[ROAD-1407\]*

* * *

#### Meeting notes default sorting by created date[​](#meeting-notes-default-sorting-by-created-date "Direct link to Meeting notes default sorting by created date")

Meeting notes now sort by created date by default, so the most relevant notes are easier to find.

**How to access:** Open Meeting notes; the new default sorting applies automatically.

Assistant

* * *

#### Clearer voice-chat icon in recent chats[​](#clearer-voice-chat-icon-in-recent-chats "Direct link to Clearer voice-chat icon in recent chats")

A waveform icon now identifies voice chats in your recent chats, making them easier to spot at a glance.

**How to access:** Applies automatically in your recent chats list.

Assistant

* * *

#### Agent schedules stay visible after switch to manual run[​](#agent-schedules-stay-visible-after-switch-to-manual-run "Direct link to Agent schedules stay visible after switch to manual run")

When an agent is switched to manual runs, activated users can still see, pause, or resume its schedule.

**How to access:** Open the agent's schedule view.

Agents

* * *

#### Admin Console polish[​](#admin-console-polish "Direct link to Admin Console polish")

The Admin Console now has consistent page headers and spacing, icons on connector action buttons, and improved Add connector dialog sizing.

**How to access:** Applies automatically across the Admin Console.

Admin Console

* * *

#### OneDrive artifact export[​](#onedrive-artifact-export "Direct link to OneDrive artifact export")

OneDrive upload actions now export supported PowerPoint and Excel artifacts to the user's OneDrive root, rename conflicting files automatically, and handle large files with retries and parallel uploads.

**How to access:** Use a OneDrive upload action on a supported artifact.

Tools

* * *

#### Clearer MCP write-action approval prompts[​](#clearer-mcp-write-action-approval-prompts "Direct link to Clearer MCP write-action approval prompts")

Approval prompts for MCP write actions now name the action by its human-readable title and the connected app instance, so users know exactly what they're approving.

**How to access:** Applies automatically when an MCP write action requests approval.

Glean MCP

* * *

#### Artifacts and image generation tools on by default for Glean MCP[​](#artifacts-and-image-generation-tools-on-by-default-for-glean-mcp "Direct link to Artifacts and image generation tools on by default for Glean MCP")

The artifacts and image generation tool bundles are now enabled by default on the default Glean MCP server and on new custom servers.

**How to access:** On by default; admins can turn either bundle off in MCP server settings.

Glean MCP

* * *

#### Web SDK chat bar capabilities[​](#web-sdk-chat-bar-capabilities "Direct link to Web SDK chat bar capabilities")

The new `customizations.features.chatBarCapabilities` option lets you choose which chat bar controls the embedded chat widget shows. Omitting the option leaves existing behavior unchanged.

**How to access:** Set the option in your Web SDK configuration.

Developer Platform

* * *

#### Zendesk connector save-then-authorize setup[​](#zendesk-connector-save-then-authorize-setup "Direct link to Zendesk connector save-then-authorize setup")

Zendesk connector setup now uses a save-then-authorize flow for a smoother configuration experience.

**How to access:** Set up or reconfigure the Zendesk connector in the Admin Console.

Connectors

* * *

#### Ironclad setup guidance for `na1` customers[​](#ironclad-setup-guidance-for-na1-customers "Direct link to ironclad-setup-guidance-for-na1-customers")

Ironclad setup guidance now clarifies that `na1` customers should leave the Server domain field empty unless OAuth requires it.

**How to access:** See the guidance in the Ironclad connector setup flow.

Connectors

* * *

#### Per-host LLM Gateway selection for managed deployments[​](#per-host-llm-gateway-selection-for-managed-deployments "Direct link to Per-host LLM Gateway selection for managed deployments")

Generated macOS and Windows mobile device management (MDM) scripts now configure only the LLM Gateway hosts you select.

**How to access:** Select hosts when generating MDM scripts in the Admin Console.

Admin Console

## Security[​](#security "Direct link to Security")

#### Zendesk OAuth bounded token lifetimes[​](#zendesk-oauth-bounded-token-lifetimes "Direct link to Zendesk OAuth bounded token lifetimes")

Zendesk OAuth now uses bounded token lifetimes with refresh-token renewal, reducing the exposure window of long-lived credentials.

**How to access:** Applies automatically to Zendesk OAuth connections.

Connectors

* * *

#### Glean MCP agent tools respect admin approval policies[​](#glean-mcp-agent-tools-respect-admin-approval-policies "Direct link to Glean MCP agent tools respect admin approval policies")

Glean MCP agent tools now respect admin approval policies for write actions, so administrative controls apply consistently.

**How to access:** Applies automatically based on your configured approval policies.

Glean MCP

* * *

#### Azure Files bounded access keys[​](#azure-files-bounded-access-keys "Direct link to Azure Files bounded access keys")

Azure Files access now uses bounded keys for Azure role-based access control metadata, and users must be allowed by both Azure role-based access control and file-level permissions to see content.

**How to access:** Applies automatically to the Azure Files connector.

Connectors

* * *

#### GCP dedicated Cloud Build IAM roles for Secure Web Proxy forwarding rules[​](#gcp-dedicated-cloud-build-iam-roles-for-secure-web-proxy-forwarding-rules "Direct link to GCP dedicated Cloud Build IAM roles for Secure Web Proxy forwarding rules")

Dedicated Cloud Build IAM roles on GCP can now manage the Service Directory records created for Secure Web Proxy Private Service Connect forwarding rules, keeping build permissions narrowly scoped.

**How to access:** Applies automatically to GCP deployments.

Platform

## Fixes[​](#fixes "Direct link to Fixes")

#### Salesforce nested public-group permissions[​](#salesforce-nested-public-group-permissions "Direct link to Salesforce nested public-group permissions")

Fixed an issue where nested public-group hierarchies in Salesforce could over-grant permissions.

Connectors

* * *

#### Slack Enterprise Grid channel permissions[​](#slack-enterprise-grid-channel-permissions "Direct link to Slack Enterprise Grid channel permissions")

Slack Enterprise Grid now uses the real-time Slack identity source as the authority for channel permissions.

Connectors

* * *

#### Collections shared with everyone appear in search[​](#collections-shared-with-everyone-appear-in-search "Direct link to Collections shared with everyone appear in search")

Collections shared as "Everyone can edit" now appear in search for non-owners.

Search

* * *

#### Glean MCP search on search-only deployments[​](#glean-mcp-search-on-search-only-deployments "Direct link to Glean MCP search on search-only deployments")

Fixed Glean MCP search and document retrieval for search-only deployments; MCP Chat is now offered only when Chat is enabled.

Glean MCP

* * *

#### LLM-only mode no longer uses read tools[​](#llm-only-mode-no-longer-uses-read-tools "Direct link to LLM-only mode no longer uses read tools")

LLM-only (no sources) mode no longer uses the document reader or MCP read tools, so responses stay strictly source-free as expected.

Assistant
