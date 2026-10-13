---
url: "https://docs.glean.com/release-notes/"
canonical: "https://docs.glean.com/release-notes/"
title: "Release Notes"
description: "Welcome to the Glean Release Notes. Here, you'll find information on recently launched features and improvements."
fetched_at: "2026-10-13T08:50:28.465Z"
---
# Release Notes

Welcome to the Glean Release Notes. Here, you'll find information on recently launched features and improvements.

[

### Coming Soon

Learn about upcoming features and improvements in Glean







](/release-notes/coming-soon)[

### Product and feature retirements

Information about deprecated and sunset features in Glean







](/release-notes/sunset)[

### Glean Betas

Learn about Glean Betas in the Gleaniverse's Admin Hub (Glean Admins Only)







](https://community.glean.com/home/clubs/beta-directory-zihb9)

Oct 8

2026

**Release version:** `561`

This release brings activity-based memory to eligible deployments, 79 new MCP server templates, general availability for the Power BI connector, a new Marketo connector beta, and faster voice conversations. It also adds a set of admin and interface enhancements and reliability fixes.

## Major launches

#### Glean remembers context from your work

Activity-based memory is rolling out to eligible AWS, GCP, and self-hosted deployments using Glean Key or Customer Key. Glean learns helpful context from your activity so Assistant responses become more personalized and relevant over time, without you re-explaining your role, projects, or preferences in every chat. Admins get a memory control in the Admin Console to turn memory on or off for their organization. Customers that already use memory keep their explicit on or off choice, and every user keeps their individual memory controls. Availability depends on supported models and rollout readiness.

**How to access:** Rollout is automatic for eligible deployments starting October 8, 2026. Admins manage the organization-wide setting in the Admin Console, and users manage their own memory controls in Settings.

[Learn more](https://docs.glean.com/administration/assistant/configuration/memory-personalization)

#### 79 new MCP server templates

The MCP server library keeps growing. This release adds 79 new remote server templates spanning finance, compliance, ecommerce, marketing, analytics, and operations — including Teamwork.com, Assembled, Profit.co, SE Ranking, NocoDB, Supernova, Rally, and infosociétés by Contract-Factory for searching public French company and director-mandate data. Most templates authenticate with per-user OAuth, some use a vendor API key, and a few need no authentication. Each template is ready to configure, so admins can bring vendor tools into Assistant and Agents without building custom integrations.

**How to access:** Admins explicitly add and enable each server from the MCP server directory in the Admin Console; users then authorize access with their own accounts where required.

[Learn more](https://docs.glean.com/administration/tools/supported-mcp-servers)

#### Power BI connector is generally available

The Power BI connector is now generally available. Admins can connect Power BI through Microsoft 365 in the Admin Console so users can discover reports, dashboards, and semantic models in Glean search, and query live Power BI data in Assistant using their own Power BI permissions. This brings governed business intelligence content into the same place you already search and ask questions, while respecting the access rules your BI team has configured. Live query tools require the supported Microsoft MCP service and tenant settings, and availability may roll out in phases.

**How to access:** Admins connect Power BI from the Microsoft 365 setup in the Admin Console. Users search Power BI content and query live data in Assistant with their existing Power BI permissions.

[Learn more](https://docs.glean.com/connectors/native/powerbi/assistant)

#### Marketo connector is now in beta

The Marketo connector is now available in beta. Teams that manage campaigns in Marketo can bring that content into Glean, so marketing knowledge is searchable alongside the rest of your company's content. As a beta connector, setup and coverage may continue to evolve based on customer feedback.

**How to access:** Contact your Glean account team to enable beta access, then set up the connector from the Admin Console.

[Learn more](https://docs.glean.com/connectors/native/marketo/)

#### Skill scanning and safety review

Glean now scans skills uploaded locally and skills imported from a third-party repository, such as GitHub, for unsafe instructions, malicious code, harmful content, and bundle problems. Skills from Glean are safe by default and are not scanned. Admins see scan statuses — Not scanned, Scan in progress, Pass, Review recommended, and Disabled — along with findings for each skill. Scanning is fail-open: a skill stays available until an admin disables it, and disabled skills are excluded from use. Skill scanning is managed as a billed advanced feature.

**How to access:** On by default. Admins review scan statuses and findings under Admin console → Skills → Manage, and manage scanning and pricing under Admin console → Advanced features.

[Learn more](https://docs.glean.com/administration/managing-skills/skill-scanning)

## AI & model updates

#### Faster, more natural voice conversations

Voice conversations in Glean now run on OpenAI GPT Live by default for Glean Key deployments using OpenAI and Azure OpenAI. Conversations feel more natural, with faster replies and better robustness to background noise, and GPT Live handles speech directly without a separate transcription model. Deployments on earlier release versions keep the previous voice models until they upgrade.

**How to access:** No action needed. The new default applies automatically to Glean Key deployments on release version 561 or later.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)

## Critical updates

#### GitHub tool retirement: Refresh your GitHub MCP tools

The deprecated GitHub tools now name their GitHub MCP replacements, so admins can see exactly which GitHub MCP tool to use in place of each retired tool. GitHub MCP also now supports a larger set of tools than the previous defaults.

**How to access:** Admins who have already set up GitHub MCP need to refresh tools from the Admin Console to pick up the expanded toolset.

#### Azure Files share-level permissions are now enforced

Azure Files share-level role assignments are now considered alongside other Azure Files permissions when Glean decides who can read a document. This keeps search results aligned with the access rules your storage team manages in Azure.

**How to access:** No action needed. The updated permissions evaluation applies automatically to Azure Files content.

## Deprecations & sunsets

#### "Copy message link" removed from user messages in Chat

The "Copy message link" button was removed from user messages in Chat. The "Copy message text" button is unchanged, so you can still copy your message content.

**How to access:** No action needed; this change applies automatically.

## Enhancements

#### Assistant responses start faster

Glean Assistant uses a streamlined agent harness with leaner instructions and tool outputs. Responses start faster and follow your intent more closely, especially in longer or more complex conversations.

**How to access:** No action needed; the improvement applies automatically in Assistant.

#### Devin can connect to Glean Remote MCP without custom setup

Devin is now on the Glean-managed list of approved MCP applications, so it can connect to Glean Remote MCP through OAuth without an admin adding a custom redirect URI.

**How to access:** Connect Devin to Glean Remote MCP using OAuth. No custom redirect URI configuration is needed.

[Learn more](https://docs.glean.com/administration/oauth/dynamic-client-registration)

#### Clearer MCP Insights attribution

MCP Insights now credits calls made through `run_tool` to the tool that actually ran. For example, a Jira or Slack action appears under that server's name instead of under `run_tool`. Each dispatched call is counted once in MCP call totals, and historical `run_tool` entries no longer appear, so usage reporting reflects real tool activity.

**How to access:** Open MCP Insights in the Admin Console. The updated attribution applies automatically.

#### Easier planning in the Feature Rollouts Beta tab

The Beta tab on the Admin Console Feature Rollouts page now groups features that share the same target GA date and supports sortable target-date ordering, making it easier to plan for upcoming changes. Features without a date remain at the end of the list.

**How to access:** Open Admin Console → Feature Rollouts → Beta tab.

[Learn more](https://docs.glean.com/administration/feature-rollouts)

#### Find transferred agents by their current owner

Agents with transferred ownership now show the current owner's name in the Owner filter, so transferred agents are easier to find and manage.

**How to access:** Use the Owner filter in the agents list. Transferred agents appear under their current owner.

#### Redesigned agent share emails

Agent share emails have a new layout: the sharer's message appears with an agent card showing the agent's author, favorites, runs, last update, and description, followed by an "Open agent" button. Recipients get the context they need to decide whether to try an agent before opening it.

**How to access:** No action needed; the new layout applies to agent share emails automatically.

#### Smoother chat start and interface polish

Starting a new chat no longer navigates to the homepage or a previous chat, and bordered collapsible sections now transition their corners and chevrons more smoothly.

**How to access:** No action needed; these improvements apply automatically.

#### Customize Azure Files search result display

Azure Files administrators can now customize how file and folder search results appear from the connector's Results display tab, matching the display controls available for other connectors.

**How to access:** Open the Azure Files connector settings in the Admin Console and use the Results display tab.

#### Fresher Zoom recordings and transcripts

Zoom meeting recordings and transcripts are now refreshed hourly, so recent meetings show up in search and Assistant sooner.

**How to access:** No action needed; the faster refresh applies automatically to the Zoom connector.

## Fixes

#### Chat owners can rename, delete, and move their chats again

Fixed an issue where chat owners could see only Share in the chat menu and could not rename, delete, or move their chats to a project.

#### Glean Desktop stays signed in and recovers after sleep

The desktop app now preserves an existing signed-in session when token refresh fails because of a temporary network or server interruption, and it waits for connectivity and retries after a computer wakes from sleep — reducing unexpected sign-outs and persistent blank screens.

#### Salesforce Case Assistant loads case feeds for all permitted users

Fixed an issue where the Glean Case Assistant side panel in Salesforce Service Cloud failed to load Case feed posts and comments for users without the View All Data permission.

#### More reliable Google Chat crawls

Google Chat crawls now stop pagination on empty message pages, skip zero-byte and oversized attachments instead of retrying them, and preserve the configured delegate count independently for each space — improving message coverage and crawl reliability.

#### Clearer calendar connection errors

An invalid Microsoft Graph app credential for a Teams or Outlook Calendar connection — such as an expired client secret or revoked admin consent — is now reported as an authorization failure instead of an unexplained server error, and meeting lookup explains calendar failures in plain language so admins know to renew the connector credentials.

Oct 7

2026

## Model launch

#### Claude Haiku 5.5 in Assistant and Agents

Claude Haiku 5.5 is now available as a selectable model in Glean Assistant and Agents. It is the fastest model in the Claude 5.5 family, built for high-volume, speed-sensitive work, and a meaningful upgrade over Haiku 4.5. It is also the first Haiku model with effort levels, giving teams control over how much the model thinks and how many tokens it uses. It showed promise on simpler tasks such as information extraction, preparing discovery materials, and structured deliverables. This feature may be subject to usage-based pricing.

**How to access:** Admin gated — admins manage model availability from the Admin Console. Once enabled, select Claude Haiku 5.5 from the model picker in Assistant or in your agent's model settings.

Model Launch *\[ROAD-1779\]*

Oct 6

2026

**Release version:** `560`

This release brings GPT-6.1 Sol to Glean, moves the Showpad connector to general availability, opens the Vitally connector beta, and redesigns the Assistant model picker with cost and intelligence ratings. The Glean browser extension now opens in your browser's native side panel, and the release also delivers admin setup improvements, security hardening, and reliability fixes.

## Major launches

#### Showpad connector now generally available

The Showpad connector is now generally available, and the Beta label has been removed from the setup experience. Connect Showpad to make your sales enablement content findable in Glean alongside the rest of your company knowledge. The connector supports federated search and fetch with per-user permissions, so each person sees only the Showpad content they already have access to — results stay permissions-aware without extra configuration.

**How to access:** Admins can add Showpad from the **Add data source** page in the Admin console.

[Learn more](https://docs.glean.com/connectors/native/showpad/)  
Connectors *\[ROAD-1504\]*

#### Vitally connector now in open beta

The Vitally connector is now available in open beta. Connect Vitally to bring your customer success data — accounts, notes, and conversations — into Glean search and Assistant, so customer-facing teams can find what they need without switching tools. As an open beta, the connector is still evolving, and your feedback helps shape what ships at general availability.

**How to access:** Admins can add Vitally from **Admin console → Connectors** and connect their Vitally workspace. No Glean enablement request is needed.

[Learn more](https://docs.glean.com/connectors/native/vitally/)  
Connectors *\[ROAD-1731\]*

#### Glean browser extension opens in your browser's side panel

The Glean browser extension now opens in your browser's native side panel instead of overlaying the page. It stays beside page content and remains open as you navigate between tabs, so you can keep Glean search and Assistant alongside whatever you're working on. The side panel experience is currently in beta.

**How to access:** Admins can turn on the side panel experience for their organization from the **Feature rollouts** page in the Admin console.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar)  
Platform *\[ROAD-1693\]*

#### Redesigned model picker in Assistant

Glean Assistant's model picker has been redesigned to show cost and intelligence ratings, plus short notes about what each model is best at. Instead of guessing which model fits your task, you can compare options at a glance and pick the right balance of speed, capability, and cost. The redesigned picker is now available by default for everyone.

**How to access:** Open the model picker in the Assistant composer. No admin action is needed.

Assistant

## AI & model updates

#### GPT-6.1 Sol in Assistant and Agents

GPT-6.1 Sol, a new OpenAI model, is now live for supported Glean experiences, giving you another premium model option in Assistant and Agents. Availability depends on your deployment's model key setup: deployments on the Glean Universal Model Key get access managed by Glean, while deployments using customer-provided keys need their own OpenAI credentials for the model.

**How to access:** Select GPT-6.1 Sol from the model picker in Assistant or on supported Agent steps where it's enabled. Admins control model availability in the Admin console.

Assistant *\[ROAD-1756\]*

## Critical updates

#### Task update API now changes only status and execution feedback

The task update endpoint `PUT /api/v1/tasks/{task_id}` now updates only a task's status and execution-feedback tracking. Other task details — such as title, description, assignee, and dates — are preserved and can no longer be edited through this endpoint, and empty or invalid requests now return an error. This is a breaking change for integrations that edit other task fields through this endpoint.

**How to access:** No action needed unless your integration edits other task details through this endpoint. If it does, migrate it to update only status and execution feedback.

Platform

#### Deny-all protection for unconfigured GCP endpoints

Google Cloud Platform (GCP) deployments now apply a deny-all Cloud Armor policy to external Google Kubernetes Engine (GKE) default HTTP backends during web application firewall deployment. Requests routed to those catch-all backends receive an HTTP 403 response. Configured application routes and internal ingress behavior remain unchanged, so normal Glean traffic is unaffected.

**How to access:** No action needed. The protection applies automatically to GCP deployments.

Platform

#### Tighter rate limits protect search performance

Rate limiting for OpenSearch is now tighter on deployments that use centralized rate limiting, preventing request spikes that could degrade search performance. Only deployments with centralized rate limiting for OpenSearch are affected.

**How to access:** No action needed. The updated limits apply automatically on affected deployments.

Platform

## Deprecations & sunsets

#### Web SDK Chat option applicationId is deprecated

The Web software development kit (SDK) Chat option `applicationId` is deprecated. AI Applications were deprecated in August 2025 and were migrated to Agents, so use `agentId` instead when embedding Glean Chat.

**How to access:** Update Web SDK Chat embeds that still pass `applicationId` to use `agentId`.

[Learn more](https://docs.glean.com/release-notes/sunset/)  
Platform

#### Built-in skill-creation guides removed from MCP skill discovery

Model Context Protocol (MCP) clients no longer receive Glean's built-in create-skill and create-skill-lite guides from the skill discovery tool. Creating a skill in Glean Assistant is unchanged.

**How to access:** No action needed. Skill creation in Glean Assistant works as before.

Glean MCP

## Enhancements

#### Manage ServiceNow object crawling from the Objects table

ServiceNow administrators can now enable or disable crawling for configured native and custom objects directly from the Objects table, while preserving each object's mappings and settings. Native objects saved as enabled can also crawl even when their corresponding legacy object flag remains disabled, so you can manage crawl scope in one place without reconfiguring objects.

**How to access:** Admins manage crawling from the Objects table in the ServiceNow connector settings.

Connectors

#### Setup suggestions on the admin dashboard

Admins now see actionable connector and tool setup suggestions on the admin dashboard, making it easier to spot and complete the next most valuable setup steps for their deployment.

**How to access:** Open the dashboard in the Admin console. Suggestions appear automatically.

Admin Capabilities

#### Assistant renders inline math

Glean Assistant now renders inline math expressions — for example, x² + y² = r² — within a sentence instead of showing raw LaTeX markup. Dollar amounts like "$5 and $10" continue to display as plain text, so everyday answers aren't affected.

**How to access:** No action needed. Math rendering applies automatically in Assistant responses.

Assistant

#### See your Microsoft 365 upload destination

The Microsoft 365 upload action now shows the selected OneDrive or SharePoint destination both during setup and after saving, so you can confirm exactly where uploaded files will go before and after you configure the action.

**How to access:** The destination appears in the Microsoft 365 upload action's setup and saved configuration views.

Actions

#### Updated Superhuman Docs logo

The Superhuman Docs connector — formerly Coda — now shows the updated Superhuman Docs logo throughout the setup experience.

**How to access:** No action needed. The updated logo appears automatically.

Connectors

#### Usage page tabs ordered by usage

Application tabs on the Usage page are now ordered by usage for the selected month, so your organization's most-used applications are easier to find.

**How to access:** Open the Usage page in the Admin console. Tabs are reordered automatically for the selected month.

Admin Capabilities

#### Search Google Drive file descriptions and custom properties

Google Drive search now supports facets for file descriptions and custom properties, making these metadata values searchable in indexed documents. Teams that use Drive metadata to organize content can now filter and find files by those values in Glean.

**How to access:** No action needed. The new facets apply automatically as Google Drive content is indexed.

Connectors

#### Usage limit and evaluation APIs accept email addresses

The experimental usage limit and evaluation APIs now accept a user's email address anywhere a user ID is accepted, and they return the user's email alongside the user ID in responses. This makes the APIs easier to use with systems that identify people by email.

**How to access:** Pass an email address in place of a user ID in the experimental usage limit and evaluation APIs.

Platform

#### Clearer Power BI setup instructions

Power BI connector setup now shows instructions for the selected indexing or tools step, so you see only the guidance that applies to what you're configuring.

**How to access:** Open the Power BI connector setup in the Admin console. Step-specific instructions appear as you move through setup.

Connectors

#### Let Glean manage the scheduled refresh rollout for interactive artifacts

Admins can now let Glean manage the rollout of scheduled refresh for interactive artifacts, starting no earlier than October 22, 2026. If you've already chosen an audience for the capability, your existing choices remain respected — opting into the managed rollout only hands the pacing to Glean.

**How to access:** Admins opt in from the scheduled refresh rollout setting in the Admin console.

Admin Capabilities *\[ROAD-1574\]*

#### Dedicated token scopes for limit-increase requests

Dedicated token scopes for usage limit-increase requests now separate ordinary request submissions from billing decisions, so existing admin, agent, and usage grants gain no new request authority. Availability still requires the request API rollout and your current resource permissions.

**How to access:** Grant the new limit-increase request scopes to tokens that should submit or decide requests, once the request API is rolled out to your deployment.

Platform

#### SharePoint group site discovery works with split credentials

SharePoint group site discovery now succeeds when the Microsoft 365 identity app lacks site enumeration access but the SharePoint app has it. Glean routes discovery through the app that holds the permission, so split-credential setups no longer miss group sites.

**How to access:** No action needed. The fix applies automatically to affected Microsoft 365 configurations.

Connectors

#### Hardened prompt enhancement in Agent Builder

The AI prompt-enhancement feature in Agent Builder is now more robust against malicious instruction inputs, improving protection against prompt injection.

**How to access:** No action needed. The hardening applies automatically.

Agents

#### Safer group name handling for custom data sources

Group names in custom data source identity operations are now handled more safely, improving the security of identity management for custom data sources.

**How to access:** No action needed. The improvement applies automatically.

Platform

#### GCP deployments honor operation skip settings

GCP deployments now honor operation skip settings when running through the Cloud Run deployment service, so configured skips are respected consistently across deployment paths.

**How to access:** No action needed. Existing skip settings are honored automatically.

Platform

## Fixes

#### Oversized artifact saves no longer corrupt content

Saves that exceed storage capacity are now rejected safely, preserving the previous version instead of corrupting saved content.

Assistant

#### Canvas task lists keep text and checkbox state

Canvas task-list text and checkbox state are now preserved when saving collaborative documents.

Assistant

#### Sub-agents receive all AI-generated inputs

Agents that hand off to a sub-agent with AI-generated inputs no longer fail with input-generation errors when the model lists inputs on separate lines. All planned inputs are passed to the sub-agent, so these agents complete without manual workarounds.

Agents

#### Slack requests route to the right deployment

Fixed Slack routing for organizations whose Slack Enterprise Grid spans multiple Glean deployments, preventing spurious sign-in errors from deployments that don't own the workspace.

Connectors

#### ServiceNow setup respects deselected content types

ServiceNow connector setup with OAuth now respects the content types an admin deselects, and setup no longer fails on instances without the ServiceNow Content Publishing application when those types are turned off.

Connectors

Oct 1

2026

**Release version:** `559`

This release makes Agent Identity generally available, brings the Fathom, Crayon, and Veeva Vault connectors and the Platform Skills API to general availability, and turns on the updated left navigation for everyone. It also adds six new Model Context Protocol (MCP) server templates, new admin controls for Salesforce API usage and voice transcription, and a set of reliability fixes.

## Major launches

#### Agent Identity is now generally available

Give each Glean agent its own identity — its own governed account in every system it connects to — so agents act and appear as themselves instead of running under a person's credentials. Builders can attach admin-governed service credentials to their agents and configure dedicated Slack and Teams apps, while admins manage service credentials and Knowledge Profiles using existing access controls. The result is clearer attribution for agent activity and tighter governance over what each agent can reach.

**How to access:** Available by default. Admins manage service credentials and Knowledge Profiles in the Admin console; builders attach credentials when configuring their agents.

[Learn more](https://docs.glean.com/administration/agent-identity)

Agents *\[ROAD-1542\]*

#### Fathom connector now generally available

The Fathom connector is now generally available. Connect Fathom to bring meeting recordings, transcripts, and summaries into Glean, so your team can search meeting content and ask Assistant about it alongside the rest of your company knowledge — with each person's Fathom permissions respected.

**How to access:** Admins set up Fathom from the Admin console under Data sources.

[Learn more](https://docs.glean.com/connectors/native/fathom/)

Connectors *\[ROAD-1664\]*

#### Crayon connector now generally available

The Crayon connector is now generally available. Connect Crayon to index battlecards and AI-generated Sparks, making competitive intelligence insights searchable in Glean so sales and product teams can find the latest competitive context where they already work.

**How to access:** Admins add Crayon from the Admin console under Data sources, provide a Crayon API key, and start a crawl.

[Learn more](https://docs.glean.com/connectors/native/crayon/)

Connectors *\[ROAD-1259\]*

#### Veeva Vault connector now generally available

The native Veeva Vault connector is now available to set up from the Add data source page. It indexes quality documents and related metadata while respecting each user's authorized access in Veeva Vault, so regulated content stays permissions-aware in Glean search and Assistant answers.

**How to access:** Admins configure Veeva Vault from the Add data source page using their Vault URL and integration credentials.

[Learn more](https://docs.glean.com/connectors/native/veeva-vault/)

Connectors *\[ROAD-1042\]*

#### Platform Skills API now generally available

The Skills API — 14 operations under `/api/skills/` — is now generally available, so you can discover, validate, import, sync, version, and manage skills programmatically. Integrations can call these endpoints without sending the `X-Glean-Include-Experimental` header.

**How to access:** Available through the Glean Platform API with an appropriately scoped API token.

[Learn more](https://developers.glean.com/api/platform-api/skills-overview)

Developer Platform *\[ROAD-1473\]*

#### Updated left navigation now on for everyone

The reorganized left navigation is now generally available. Navigation items are arranged into tiers so your most-used destinations stay visible while the rest move into an overflow menu. You can customize which items appear in your own sidebar, and admins can set the default sidebar layout for the organization.

**How to access:** On by default. Customize your own sidebar directly in the left navigation; admins set workspace defaults under Admin console → Appearance.

[Learn more](https://docs.glean.com/administration/management/appearance/left-navigation)

Search experience *\[ROAD-1603\]*

#### Six new MCP server templates

The Model Context Protocol (MCP) server library keeps growing. This release adds six new remote server templates: GIS Cloud for maps, layers, and spatial data; Lightrun for inspecting live runtime values and metrics; MYOB for read-only financial queries; PaidSync for analyzing and managing advertising campaigns; Avoma for meeting tools; and Prisma Postgres for database management. Most templates authenticate with per-user OAuth.

**How to access:** Admins add and enable the servers they want from the MCP server directory in the Admin console.

[Learn more](https://docs.glean.com/administration/tools/supported-mcp-servers)

Actions *\[ROAD-1441\]*

## Critical updates

#### SharePoint group sites discovered with split app permissions

Fixed SharePoint group site discovery for deployments where the Microsoft 365 identity app lacks site enumeration access but the SharePoint app has it. Group sites are now discovered using the app that holds the required permission, so site coverage stays complete.

**How to access:** No action needed. The fix applies automatically.

Connectors

#### Document scans no longer skip documents

Fixed a pagination issue that could omit documents during scans of sharded document storage, so scans now reliably cover every document.

**How to access:** No action needed. The fix applies automatically.

Platform

## Enhancements

#### Control Glean's daily Salesforce API usage

Admins can configure Glean's daily Salesforce API-call budget directly in the Salesforce connector's Advanced settings, making it easier to manage API consumption alongside other integrations. The minimum setting is 16,500 calls per day.

**How to access:** Admin console → Salesforce connector → Advanced settings.

[Learn more](https://docs.glean.com/connectors/native/salesforce/setup)

Connectors *\[ROAD-1742\]*

#### Published SharePoint documents stay searchable during drafts

Glean now keeps the latest published version of a SharePoint document searchable while a newer draft version exists, so published content no longer disappears from search while someone works on an update.

**How to access:** No action needed. The behavior applies automatically to SharePoint content.

[Learn more](https://docs.glean.com/connectors/native/sharepoint/restrictions)

Connectors *\[ROAD-1516\]*

#### User data masked in agent traces (beta)

Agent traces available to agent builders now mask user data, protecting personal information while builders review and debug agent runs. Masking applies to traces going forward.

**How to access:** Available in beta. Agent builders see masked traces automatically when viewing agent runs.

Agents *\[ROAD-1645\]*

#### Launched features grouped by date in Feature rollouts

The Launched tab on the admin console Feature rollouts page now groups features that became generally available on the same date into a single row and lists dates with the most recent first. Select the GA on column header to reverse the order.

**How to access:** Admin console → Feature rollouts → Launched tab.

[Learn more](https://docs.glean.com/administration/feature-rollouts)

Admin Capabilities *\[ROAD-732\]*

#### Product type breakdown in billing CSV exports

Billing CSV exports now honor the Product type breakdown setting for department views and Glean usage group views, adding product-specific usage columns when the setting is enabled.

**How to access:** Turn on Product type breakdown in the billing dashboard, then export the CSV.

Admin Capabilities

#### Longer agent descriptions

Agent descriptions can now contain up to 2,000 characters, giving you more room to explain an agent's purpose and behavior so teammates know exactly what an agent does before they run it.

**How to access:** Edit the description when creating or updating an agent.

Agents

#### Find past agent runs with the Agents filter

Chat search now has an Agents filter, so you can find past agent runs without scrolling through all of your chats.

**How to access:** Open search from your chat history and select the Agents filter.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/search-past-chats)

Assistant *\[ROAD-1684\]*

#### Protection against overwriting a newer agent version

Glean now detects when an agent's published version changes while you are editing it. If you try to publish from an older version, you can save your work as a version or load the latest version before publishing again, helping prevent accidental overwrites.

**How to access:** No action needed. The check runs automatically when you publish an agent.

Agents

#### Google Drive file descriptions and custom properties indexed

Google Drive crawls now include file descriptions and custom properties in metadata, so this information can be used when indexing documents and improving search relevance.

**How to access:** No action needed. The metadata is included automatically in Google Drive crawls.

Connectors

#### Dedicated calendar skills for Google Calendar and Outlook

Calendar scheduling, rescheduling, and agenda creation now use dedicated Google Calendar and Microsoft Outlook skills, selected automatically according to your connected calendar tools, for more reliable meeting workflows.

**How to access:** No action needed. The right calendar skill is selected automatically.

Assistant

#### Set up Box MCP tools and indexing together

Admins can now set up Box MCP tools and Box indexing together in one guided connector setup flow, instead of configuring them separately.

**How to access:** Admin console → Connectors → Box.

Connectors *\[ROAD-941\]*

#### Consistent Slack access enforcement

The Slack unified connector now applies admin user-access selections consistently to both real-time and synced Slack content, so the people you select see the same Slack results everywhere.

**How to access:** No action needed. Existing user-access selections are enforced automatically.

Connectors

#### GPT Transcribe for realtime voice transcription

GPT Transcribe is now available as a selectable realtime voice transcription model for deployments that use their own OpenAI or Azure OpenAI key, on version 559.0 and later.

**How to access:** Admins using their own OpenAI or Azure OpenAI key can select GPT Transcribe as the realtime voice transcription model in the Admin console.

Admin Capabilities *\[ROAD-1743\]*

#### New usage scopes for API tokens and OAuth clients

API tokens and OAuth clients can now use two usage scopes. `USAGE` reads and evaluates usage for the signed-in user and agents they can edit. `ADMIN_USAGE` manages workspace usage limits and settings, and still requires billing permissions.

**How to access:** Select the scopes when creating or updating API tokens or OAuth clients.

Developer Platform

#### Clearer model picker icons

Model picker icons are updated for readability, including an effort indicator in the compact composer, so it's easier to compare models at a glance.

**How to access:** No action needed. The updated icons appear automatically in the model picker.

Assistant

## Fixes

#### More reliable code execution in chat

Improved recovery from stalled code execution: command timeouts now return an error to the assistant instead of failing the chat, and stopped commands are cleaned up more reliably.

Assistant

#### Chat reads large documents during indexing

Chat can now finish reading a large document even while background indexing of that document is still running, instead of timing out before a fresh copy is fetched.

Assistant

#### Outlook Calendar scheduling works on extension pack deployments

Assistant meeting scheduling, rescheduling, and agenda skills now reliably find the Microsoft Outlook Calendar tools on deployments using the Outlook Calendar extension pack, and handle all-day Outlook events correctly.

Assistant

#### Manage Zoom meetings through Zoom MCP

The Zoom MCP template now requests meeting create, update, and delete OAuth scopes. After an admin recreates the Zoom MCP server and users reconnect Zoom, authorized users can schedule and manage Zoom meetings through Glean.

Actions

#### Single approval card for MCP tool calls

Approving an MCP tool call in Assistant or an agent no longer shows the same tool call twice with different icons. Only one card is shown.

Actions

Sep 29

2026

[→ View](/release-notes/releases/2026-09-29-september-release)

Sep 24

2026

[→ View](/release-notes/releases/2026-09-24-september-release)

Sep 22

2026

[→ View](/release-notes/releases/2026-09-22-september-release)

Sep 15

2026

[→ View](/release-notes/releases/2026-09-15-september-release)

Sep 10

2026

[→ View](/release-notes/releases/2026-09-10-september-release)

Sep 8

2026

[→ View](/release-notes/releases/2026-09-08-september-release)

Sep 3

2026

[→ View](/release-notes/releases/2026-09-03-september-release)

Aug 31

2026

[→ View](/release-notes/releases/2026-08-31-august-release)

Aug 18

2026

[→ View](/release-notes/releases/2026-08-18-august-release)

Aug 13

2026

[→ View](/release-notes/releases/2026-08-13-august-release)

Aug 12

2026

[→ View](/release-notes/releases/2026-08-12-august-release)

Jul 29

2026

[→ View](/release-notes/releases/2026-07-29-july-release)

Jul 15

2026

[→ View](/release-notes/releases/2026-07-15-july-release)

Jul 1

2026

[→ View](/release-notes/releases/2026-07-01-july-release)

Jun 17

2026

[→ View](/release-notes/releases/2026-06-17-june-release)

Jun 3

2026

[→ View](/release-notes/releases/2026-06-03-june-release)

May 20

2026

[→ View](/release-notes/releases/2026-05-20-may-release)

May 6

2026

[→ View](/release-notes/releases/2026-05-06-may-release)

Apr 22

2026

[→ View](/release-notes/releases/2026-04-22-april-release)

Apr 8

2026

[→ View](/release-notes/releases/2026-04-08-april-release)

Mar 25

2026

[→ View](/release-notes/releases/2026-03-25-march-release)

Mar 11

2026

[→ View](/release-notes/releases/2026-03-11-march-release)

Feb 25

2026

[→ View](/release-notes/releases/2026-02-25-february-release)

Feb 11

2026

[→ View](/release-notes/releases/2026-02-11-february-release)

Jan 28

2026

[→ View](/release-notes/releases/2026-01-28-january-release)

Jan 14

2026

[→ View](/release-notes/releases/2026-01-14-january-release)

Dec 25

2025

[→ View](/release-notes/releases/2025-12-25-december-release)

Dec 17

2025

[→ View](/release-notes/releases/2025-12-17-december-release)

Dec 3

2025

[→ View](/release-notes/releases/2025-12-03-december-release)

Nov 19

2025

[→ View](/release-notes/releases/2025-11-19-november-release)

Nov 5

2025

[→ View](/release-notes/releases/2025-11-05-november-release)

Oct 22

2025

[→ View](/release-notes/releases/2025-10-22-october-release)

Oct 8

2025

[→ View](/release-notes/releases/2025-10-08-october-release)

Sep 25

2025

[→ View](/release-notes/releases/2025-09-25-september-release)

Sep 24

2025

[→ View](/release-notes/releases/2025-09-24-september-release)

Sep 15

2025

[→ View](/release-notes/releases/2025-09-15-september-release)

Sep 10

2025

[→ View](/release-notes/releases/2025-09-10-september-release)

Aug 27

2025

[→ View](/release-notes/releases/2025-08-27-august-release)

Aug 22

2025

[→ View](/release-notes/releases/2025-08-22-august-release)

Aug 12

2025

[→ View](/release-notes/releases/2025-08-12-august-release)

Jul 30

2025

[→ View](/release-notes/releases/2025-07-30-july-release)

Jul 16

2025

[→ View](/release-notes/releases/2025-07-16-july-release)

Jul 10

2025

[→ View](/release-notes/releases/2025-07-10-july-release)

Jul 2

2025

[→ View](/release-notes/releases/2025-07-02-july-release)

Jun 18

2025

[→ View](/release-notes/releases/2025-06-18-june-release)

Jun 4

2025

[→ View](/release-notes/releases/2025-06-04-june-release)

May 20

2025

[→ View](/release-notes/releases/2025-05-20-may-release)

Apr 30

2025

[→ View](/release-notes/releases/2025-04-30-april-release)

Apr 17

2025

[→ View](/release-notes/releases/2025-04-17-april-release)
