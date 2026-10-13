---
url: "https://docs.glean.com/release-notes/releases/2026-10-01-october-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-10-01-october-release"
title: "October 1, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:33.464Z"
---
On this page

**Release version:** `559`

This release makes Agent Identity generally available, brings the Fathom, Crayon, and Veeva Vault connectors and the Platform Skills API to general availability, and turns on the updated left navigation for everyone. It also adds six new Model Context Protocol (MCP) server templates, new admin controls for Salesforce API usage and voice transcription, and a set of reliability fixes.

## Major launches[​](#major-launches "Direct link to Major launches")

#### Agent Identity is now generally available[​](#agent-identity-is-now-generally-available "Direct link to Agent Identity is now generally available")

Give each Glean agent its own identity — its own governed account in every system it connects to — so agents act and appear as themselves instead of running under a person's credentials. Builders can attach admin-governed service credentials to their agents and configure dedicated Slack and Teams apps, while admins manage service credentials and Knowledge Profiles using existing access controls. The result is clearer attribution for agent activity and tighter governance over what each agent can reach.

**How to access:** Available by default. Admins manage service credentials and Knowledge Profiles in the Admin console; builders attach credentials when configuring their agents.

[Learn more](https://docs.glean.com/administration/agent-identity)

Agents *\[ROAD-1542\]*

#### Fathom connector now generally available[​](#fathom-connector-now-generally-available "Direct link to Fathom connector now generally available")

The Fathom connector is now generally available. Connect Fathom to bring meeting recordings, transcripts, and summaries into Glean, so your team can search meeting content and ask Assistant about it alongside the rest of your company knowledge — with each person's Fathom permissions respected.

**How to access:** Admins set up Fathom from the Admin console under Data sources.

[Learn more](https://docs.glean.com/connectors/native/fathom/)

Connectors *\[ROAD-1664\]*

#### Crayon connector now generally available[​](#crayon-connector-now-generally-available "Direct link to Crayon connector now generally available")

The Crayon connector is now generally available. Connect Crayon to index battlecards and AI-generated Sparks, making competitive intelligence insights searchable in Glean so sales and product teams can find the latest competitive context where they already work.

**How to access:** Admins add Crayon from the Admin console under Data sources, provide a Crayon API key, and start a crawl.

[Learn more](https://docs.glean.com/connectors/native/crayon/)

Connectors *\[ROAD-1259\]*

#### Veeva Vault connector now generally available[​](#veeva-vault-connector-now-generally-available "Direct link to Veeva Vault connector now generally available")

The native Veeva Vault connector is now available to set up from the Add data source page. It indexes quality documents and related metadata while respecting each user's authorized access in Veeva Vault, so regulated content stays permissions-aware in Glean search and Assistant answers.

**How to access:** Admins configure Veeva Vault from the Add data source page using their Vault URL and integration credentials.

[Learn more](https://docs.glean.com/connectors/native/veeva-vault/)

Connectors *\[ROAD-1042\]*

#### Platform Skills API now generally available[​](#platform-skills-api-now-generally-available "Direct link to Platform Skills API now generally available")

The Skills API — 14 operations under `/api/skills/` — is now generally available, so you can discover, validate, import, sync, version, and manage skills programmatically. Integrations can call these endpoints without sending the `X-Glean-Include-Experimental` header.

**How to access:** Available through the Glean Platform API with an appropriately scoped API token.

[Learn more](https://developers.glean.com/api/platform-api/skills-overview)

Developer Platform *\[ROAD-1473\]*

#### Updated left navigation now on for everyone[​](#updated-left-navigation-now-on-for-everyone "Direct link to Updated left navigation now on for everyone")

The reorganized left navigation is now generally available. Navigation items are arranged into tiers so your most-used destinations stay visible while the rest move into an overflow menu. You can customize which items appear in your own sidebar, and admins can set the default sidebar layout for the organization.

**How to access:** On by default. Customize your own sidebar directly in the left navigation; admins set workspace defaults under Admin console → Appearance.

[Learn more](https://docs.glean.com/administration/management/appearance/left-navigation)

Search experience *\[ROAD-1603\]*

#### Six new MCP server templates[​](#six-new-mcp-server-templates "Direct link to Six new MCP server templates")

The Model Context Protocol (MCP) server library keeps growing. This release adds six new remote server templates: GIS Cloud for maps, layers, and spatial data; Lightrun for inspecting live runtime values and metrics; MYOB for read-only financial queries; PaidSync for analyzing and managing advertising campaigns; Avoma for meeting tools; and Prisma Postgres for database management. Most templates authenticate with per-user OAuth.

**How to access:** Admins add and enable the servers they want from the MCP server directory in the Admin console.

[Learn more](https://docs.glean.com/administration/tools/supported-mcp-servers)

Actions *\[ROAD-1441\]*

## Critical updates[​](#critical-updates "Direct link to Critical updates")

#### SharePoint group sites discovered with split app permissions[​](#sharepoint-group-sites-discovered-with-split-app-permissions "Direct link to SharePoint group sites discovered with split app permissions")

Fixed SharePoint group site discovery for deployments where the Microsoft 365 identity app lacks site enumeration access but the SharePoint app has it. Group sites are now discovered using the app that holds the required permission, so site coverage stays complete.

**How to access:** No action needed. The fix applies automatically.

Connectors

#### Document scans no longer skip documents[​](#document-scans-no-longer-skip-documents "Direct link to Document scans no longer skip documents")

Fixed a pagination issue that could omit documents during scans of sharded document storage, so scans now reliably cover every document.

**How to access:** No action needed. The fix applies automatically.

Platform

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Control Glean's daily Salesforce API usage[​](#control-gleans-daily-salesforce-api-usage "Direct link to Control Glean's daily Salesforce API usage")

Admins can configure Glean's daily Salesforce API-call budget directly in the Salesforce connector's Advanced settings, making it easier to manage API consumption alongside other integrations. The minimum setting is 16,500 calls per day.

**How to access:** Admin console → Salesforce connector → Advanced settings.

[Learn more](https://docs.glean.com/connectors/native/salesforce/setup)

Connectors *\[ROAD-1742\]*

#### Published SharePoint documents stay searchable during drafts[​](#published-sharepoint-documents-stay-searchable-during-drafts "Direct link to Published SharePoint documents stay searchable during drafts")

Glean now keeps the latest published version of a SharePoint document searchable while a newer draft version exists, so published content no longer disappears from search while someone works on an update.

**How to access:** No action needed. The behavior applies automatically to SharePoint content.

[Learn more](https://docs.glean.com/connectors/native/sharepoint/restrictions)

Connectors *\[ROAD-1516\]*

#### User data masked in agent traces (beta)[​](#user-data-masked-in-agent-traces-beta "Direct link to User data masked in agent traces (beta)")

Agent traces available to agent builders now mask user data, protecting personal information while builders review and debug agent runs. Masking applies to traces going forward.

**How to access:** Available in beta. Agent builders see masked traces automatically when viewing agent runs.

Agents *\[ROAD-1645\]*

#### Launched features grouped by date in Feature rollouts[​](#launched-features-grouped-by-date-in-feature-rollouts "Direct link to Launched features grouped by date in Feature rollouts")

The Launched tab on the admin console Feature rollouts page now groups features that became generally available on the same date into a single row and lists dates with the most recent first. Select the GA on column header to reverse the order.

**How to access:** Admin console → Feature rollouts → Launched tab.

[Learn more](https://docs.glean.com/administration/feature-rollouts)

Admin Capabilities *\[ROAD-732\]*

#### Product type breakdown in billing CSV exports[​](#product-type-breakdown-in-billing-csv-exports "Direct link to Product type breakdown in billing CSV exports")

Billing CSV exports now honor the Product type breakdown setting for department views and Glean usage group views, adding product-specific usage columns when the setting is enabled.

**How to access:** Turn on Product type breakdown in the billing dashboard, then export the CSV.

Admin Capabilities

#### Longer agent descriptions[​](#longer-agent-descriptions "Direct link to Longer agent descriptions")

Agent descriptions can now contain up to 2,000 characters, giving you more room to explain an agent's purpose and behavior so teammates know exactly what an agent does before they run it.

**How to access:** Edit the description when creating or updating an agent.

Agents

#### Find past agent runs with the Agents filter[​](#find-past-agent-runs-with-the-agents-filter "Direct link to Find past agent runs with the Agents filter")

Chat search now has an Agents filter, so you can find past agent runs without scrolling through all of your chats.

**How to access:** Open search from your chat history and select the Agents filter.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/search-past-chats)

Assistant *\[ROAD-1684\]*

#### Protection against overwriting a newer agent version[​](#protection-against-overwriting-a-newer-agent-version "Direct link to Protection against overwriting a newer agent version")

Glean now detects when an agent's published version changes while you are editing it. If you try to publish from an older version, you can save your work as a version or load the latest version before publishing again, helping prevent accidental overwrites.

**How to access:** No action needed. The check runs automatically when you publish an agent.

Agents

#### Google Drive file descriptions and custom properties indexed[​](#google-drive-file-descriptions-and-custom-properties-indexed "Direct link to Google Drive file descriptions and custom properties indexed")

Google Drive crawls now include file descriptions and custom properties in metadata, so this information can be used when indexing documents and improving search relevance.

**How to access:** No action needed. The metadata is included automatically in Google Drive crawls.

Connectors

#### Dedicated calendar skills for Google Calendar and Outlook[​](#dedicated-calendar-skills-for-google-calendar-and-outlook "Direct link to Dedicated calendar skills for Google Calendar and Outlook")

Calendar scheduling, rescheduling, and agenda creation now use dedicated Google Calendar and Microsoft Outlook skills, selected automatically according to your connected calendar tools, for more reliable meeting workflows.

**How to access:** No action needed. The right calendar skill is selected automatically.

Assistant

#### Set up Box MCP tools and indexing together[​](#set-up-box-mcp-tools-and-indexing-together "Direct link to Set up Box MCP tools and indexing together")

Admins can now set up Box MCP tools and Box indexing together in one guided connector setup flow, instead of configuring them separately.

**How to access:** Admin console → Connectors → Box.

Connectors *\[ROAD-941\]*

#### Consistent Slack access enforcement[​](#consistent-slack-access-enforcement "Direct link to Consistent Slack access enforcement")

The Slack unified connector now applies admin user-access selections consistently to both real-time and synced Slack content, so the people you select see the same Slack results everywhere.

**How to access:** No action needed. Existing user-access selections are enforced automatically.

Connectors

#### GPT Transcribe for realtime voice transcription[​](#gpt-transcribe-for-realtime-voice-transcription "Direct link to GPT Transcribe for realtime voice transcription")

GPT Transcribe is now available as a selectable realtime voice transcription model for deployments that use their own OpenAI or Azure OpenAI key, on version 559.0 and later.

**How to access:** Admins using their own OpenAI or Azure OpenAI key can select GPT Transcribe as the realtime voice transcription model in the Admin console.

Admin Capabilities *\[ROAD-1743\]*

#### New usage scopes for API tokens and OAuth clients[​](#new-usage-scopes-for-api-tokens-and-oauth-clients "Direct link to New usage scopes for API tokens and OAuth clients")

API tokens and OAuth clients can now use two usage scopes. `USAGE` reads and evaluates usage for the signed-in user and agents they can edit. `ADMIN_USAGE` manages workspace usage limits and settings, and still requires billing permissions.

**How to access:** Select the scopes when creating or updating API tokens or OAuth clients.

Developer Platform

#### Clearer model picker icons[​](#clearer-model-picker-icons "Direct link to Clearer model picker icons")

Model picker icons are updated for readability, including an effort indicator in the compact composer, so it's easier to compare models at a glance.

**How to access:** No action needed. The updated icons appear automatically in the model picker.

Assistant

## Fixes[​](#fixes "Direct link to Fixes")

#### More reliable code execution in chat[​](#more-reliable-code-execution-in-chat "Direct link to More reliable code execution in chat")

Improved recovery from stalled code execution: command timeouts now return an error to the assistant instead of failing the chat, and stopped commands are cleaned up more reliably.

Assistant

#### Chat reads large documents during indexing[​](#chat-reads-large-documents-during-indexing "Direct link to Chat reads large documents during indexing")

Chat can now finish reading a large document even while background indexing of that document is still running, instead of timing out before a fresh copy is fetched.

Assistant

#### Outlook Calendar scheduling works on extension pack deployments[​](#outlook-calendar-scheduling-works-on-extension-pack-deployments "Direct link to Outlook Calendar scheduling works on extension pack deployments")

Assistant meeting scheduling, rescheduling, and agenda skills now reliably find the Microsoft Outlook Calendar tools on deployments using the Outlook Calendar extension pack, and handle all-day Outlook events correctly.

Assistant

#### Manage Zoom meetings through Zoom MCP[​](#manage-zoom-meetings-through-zoom-mcp "Direct link to Manage Zoom meetings through Zoom MCP")

The Zoom MCP template now requests meeting create, update, and delete OAuth scopes. After an admin recreates the Zoom MCP server and users reconnect Zoom, authorized users can schedule and manage Zoom meetings through Glean.

Actions

#### Single approval card for MCP tool calls[​](#single-approval-card-for-mcp-tool-calls "Direct link to Single approval card for MCP tool calls")

Approving an MCP tool call in Assistant or an agent no longer shows the same tool call twice with different icons. Only one card is shown.

Actions
