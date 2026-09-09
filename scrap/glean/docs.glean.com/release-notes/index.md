---
url: "https://docs.glean.com/release-notes/"
canonical: "https://docs.glean.com/release-notes/"
title: "Release Notes"
description: "Welcome to the Glean Release Notes. Here, you'll find information on recently launched features and improvements."
fetched_at: "2026-09-01T13:29:51.213Z"
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

Aug 18

2026

This release expands Glean’s AI capabilities, improves agent administration and collaboration, adds new platform integrations, and strengthens security, privacy, and reliability across connected data sources.

* * *

## Major Launches

* * *

#### Connect Glean content events to your automations

The experimental Glean Triggers API lets developers subscribe to content events from connected data sources and deliver those events to external platforms and agents. You can register trigger subscriptions, search matching events, manage a trigger’s lifecycle, and receive signed webhook deliveries. This makes it possible to connect Glean activity to automation platforms, developer tools, and custom agent workflows while preserving the permissions of the subscribing user. The API is designed for integration builders who want Glean events to initiate work outside the Glean interface.

**How to access:** Use the Platform API with a token that has the required trigger scope, and include the experimental opt-in header on requests. The API is intended for developers and integration builders; the surface is experimental and may change.

Developer Platform

* * *

#### See your AI security posture in one place

Guardrails Insights gives security and governance teams a centralized view of AI guardrail activity. Instead of reviewing individual findings one at a time, administrators can use the dashboard to understand trends, policy confidence, topics, and high-risk users. The result is a clearer picture of where AI usage is creating risk and where investigation or policy changes may be needed. This is especially useful for teams responsible for monitoring AI usage, reviewing violations, and communicating security posture across the organization.

**How to access:** Open the AI Security Guardrails Insights dashboard from Glean Protect. Access depends on your organization’s Protect configuration and administrator permissions.

Protect

* * *

#### Preserve important agent drafts with saved versions

Agent Builder now lets you create named, immutable checkpoints of a draft agent. Saved versions give you a dependable way to preserve a meaningful configuration before making further edits, without changing the existing draft, staged, and published lifecycle. You remain in the editable draft state after saving. When you want to reuse an earlier checkpoint, select it from version history and load it back into draft, then continue editing or publish it through the normal workflow. This helps teams experiment more safely and revisit prior working states without maintaining parallel copies.

**How to access:** Open an agent in Agent Builder and use the version history or version selector to save, view, load, or delete draft checkpoints.

Agents

* * *

#### Rediscover useful work in the redesigned Library

The redesigned Library makes durable artifacts easier to find and revisit. You can browse artifacts you created, artifacts shared directly with you, and explicitly public company artifacts. New filters help you narrow results by creator team or department, while sorting options make it easier to find recently created or popular content. The experience is designed to move beyond a constantly changing recently viewed list, so high-signal artifacts are easier to rediscover after the original task is complete.

**How to access:** Open Library in Glean and use the ownership, department, creator, and sorting controls to browse and filter artifacts.

Library

* * *

#### Bring support agents into your browser workflow

Agents in the Glean Browser Extension lets users launch configured support agents directly from supported Zendesk, Salesforce Service Cloud, and ServiceNow pages. The agent can use the current ticket or case context so you can work without copying information into another window. This provides a replacement path for embedded support experiences and gives administrators a dedicated way to configure which agents are available. Starting August 24, 2026, the experience is generally available to eligible deployments with existing embedded-integration usage.

**How to access:** Install and sign in to the Glean Browser Extension. Eligible users can open the extension sidebar on a supported ticket or case page and select the Agents tab. Admins can configure access from the browser-extension settings.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar#agents)  
Agents

* * *

## AI & Model Updates

* * *

#### Choose Gemini 3.7 Flash for fast, capable agent work

Gemini 3.7 Flash is now available as a model option in Assistant and Agents. It is designed for high-volume, low-latency work while supporting stronger reasoning for well-scoped tasks. You can select low, medium, or high thinking levels depending on whether you want faster responses or more deliberate reasoning. The model is available across supported Assistant and Agents surfaces, with access varying by deployment key configuration. Gemini 3.6 Flash remains available under More models, so existing model choices are not removed.

**How to access:** In Assistant, open the model selector and choose Gemini 3.7 Flash. For Customer Key deployments, an administrator may need to make the model available from Admin Console → Platform → Models.

Assistant and Agents

* * *

#### Get smarter defaults for workflow agents

Workflow agents that use “Let Glean decide” now default to GPT 5.6 Luna when it is available, with GPT 5.1 used as a fallback. This improves the default model choice without requiring builders to update existing agents. Explicit model selections remain unchanged, so teams that have deliberately chosen a specific model keep that configuration. The change applies to the default path only and is intended to improve the baseline experience for workflows that do not specify a model themselves.

**How to access:** No action is required for existing workflow agents using “Let Glean decide.” Open an agent’s model settings in Agent Builder if you want to review or choose an explicit model.

Agents

* * *

#### Use Anthropic models with your custom key

Custom-key customers can now use supported Anthropic models through Glean for production workloads. This gives teams another provider option when selecting models for their organization’s AI experience and lets customers align model usage with their existing provider and key-management strategy. Availability depends on the models supported by the configured Anthropic provider and the deployment’s permissions and setup.

**How to access:** An administrator must configure the Anthropic provider and custom key in the model settings available to your deployment. Once enabled, users can select supported Anthropic models wherever the model picker is available.

Models

* * *

#### Use real-time voice more naturally when you are interrupted

Real-time voice now includes a Talk uninterrupted control when Glean detects that you started speaking while it was responding. Tap the notice to switch into a push-to-talk interaction and finish your turn before Glean responds. This gives you a clearer way to continue speaking without losing your thought or competing with the assistant’s response. The control is designed for natural back-and-forth conversations on web, desktop, and mobile, where interruptions are expected and a hands-free interaction should not require restarting the exchange.

**How to access:** Start a real-time voice session from the waveform button in the composer. If Glean detects an interruption, tap the Talk uninterrupted notice to continue speaking.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)  
Assistant

* * *

## Critical Updates

#### Review the new Engram Memory billing treatment

Engram Memory usage is now billed for Glean Core Suite plans across supported models. Migration usage remains free. For Enterprise Flex credit plans, usage remains free through September 15, 2026, and begins consuming FlexCredits on September 16, 2026. This change affects how memory-related usage appears in plan economics, but it does not change the underlying memory experience. Review your plan and usage expectations before the Enterprise Flex billing date if your organization relies on persistent Assistant memory.

**How to access:** No product action is required. Administrators should review their plan and usage reporting, and contact their Glean representative with billing questions.

Assistant Memory

* * *

#### Update integrations that use the Agents subscription schema

The public Agents REST subscription schema no longer includes the `allowAllBgWriteActions` field. Integrations that referenced this field should remove it from their requests or generated models. Background-run behavior and the internal setting remain unchanged, so this is a schema cleanup rather than a change to how subscriptions execute. The update matters only to integrations that directly consume the public subscription schema and expect the removed field to be present.

**How to access:** Update any integration or generated client that references `allowAllBgWriteActions`, then validate the subscription request against the current public schema.

Assistant API

* * *

#### Require HTTPS for dynamically registered MCP servers

Dynamic MCP client registration now requires server URLs that use HTTPS. Registrations that use an `http://` URL will fail with a clear error instead of sending registration traffic over plaintext. This protects credentials and registration metadata while preserving the existing dynamic-registration workflow for secure servers. If you manage a custom MCP server that uses dynamic registration, confirm that its public registration URL is HTTPS before attempting to connect it.

**How to access:** No action is needed for existing secure servers. Update any custom MCP server configuration that uses an `http://` registration URL to use HTTPS.

MCP

* * *

#### Limit certificate setup to full administrators

Certificate management APIs now require full administrator permissions to complete the SSL certificate setup flow. This narrows a sensitive configuration path to the role intended to manage organization-wide certificates and reduces the chance that a lower-privilege administrator changes security infrastructure unintentionally.

**How to access:** Full administrators can continue to complete certificate setup from the administrator experience. Users without full administrator permissions should contact an administrator with the required role.

Admin Console

* * *

#### Keep OneDrive access groups consistent

OneDrive Product Access Group membership checks now use stable datasource user IDs. This prevents inconsistent access decisions caused by relying on identifiers that could vary between checks. Administrators should see more reliable enforcement of the groups that control which users can access OneDrive content through Glean, without needing to change the groups themselves or reconfigure the connector.

**How to access:** No action is required. Continue managing Product Access Groups through the existing OneDrive administration workflow.

OneDrive

* * *

#### Let users request access to protected chats and artifacts

Users who open a protected chat or artifact they cannot access can now submit an access request instead of relying on an out-of-band message. The requester can optionally include context, while the owner can review and approve or deny the request. Approved users join under the existing participant and permission controls. This creates a clearer, auditable path for collaboration while keeping the owner or authorized administrator in control of access.

**How to access:** Open a protected chat or artifact. If you do not have access, use the request-access action and optionally add a message for the owner.

Assistant

* * *

#### Give Viewer-shared chats a consistent home in Projects

Chats shared with Viewer access now appear in Projects, including deployments where Multiplayer Chat is disabled. This makes shared conversations easier to find and gives recipients a consistent place to return to chats they can read. The change does not expand the underlying permission: a Viewer can see the chat only when it has been shared with them and continues to have Viewer-level access.

**How to access:** Open Projects and look for chats that have been shared with you as a Viewer.

Projects

* * *

## Deprecations & Sunsets

#### Use the updated Embedded integrations administration URL

The Embedded integrations administration page now uses a URL that matches its page name. Existing Glean Assist links and bookmarks continue to work through redirects, so saved links do not need to be changed immediately. When updating internal documentation, onboarding materials, or bookmarks, use the new Embedded integrations route so future references align with the current product terminology and the browser-extension transition.

**How to access:** Navigate to Embedded integrations from the Admin Console. Existing Glean Assist URLs will redirect to the updated page.

Embedded Integrations

* * *

## Enhancements

#### Find skills faster in Settings

The Skills tab in Settings now includes search by skill name. Use it to filter personal, shared, and platform skills instead of scanning the full list. Search results update within the current tab and show a clear empty state when no skill matches. This is particularly useful for organizations with many shared skills or for users who remember the purpose of a skill but not where it appears in the list.

**How to access:** Open Settings → Skills and enter a skill name in the search field.

Skills

* * *

#### Understand agent tools at a glance

Agent Builder now separates datasource tools into Read and Write sections. Each section has its own count, search behavior, and Add all tools control, making it easier to understand what an agent can retrieve and what it can change. Approval settings appear only when write tools are selected, so builders can see the relevant safety control in context instead of interpreting a mixed list. The same distinction is available when configuring action packs and MCP servers.

**How to access:** Open an agent in Agent Builder and expand a datasource, action pack, or MCP tool selection. Use the Read and Write sections to review or change the toolset.

Agent Builder

* * *

#### Make agent version history easier to scan

The version history menu now puts saved-version names first, with the date and author underneath. Only the current version is labeled Published, and empty histories explain how to begin tracking changes. Expanded version groups scroll into view, and hover highlights clear correctly after selection. Together, these changes make it easier to distinguish versions, understand the current lifecycle state, and navigate a growing history without opening each version one by one.

**How to access:** Open an agent in Agent Builder and open its version history menu.

Agents

* * *

#### Start voice with useful context sooner

Voice onboarding is now shorter and more personalized. New users see a concise welcome and can opt into a daily briefing rather than stepping through a multi-screen tutorial. The briefing can help users begin with relevant work context, while returning users continue to receive the standard voice greeting. This reduces setup friction and gets you to a useful voice interaction faster without changing the normal experience after onboarding.

**How to access:** Start real-time voice from the waveform button in the Glean composer. New users will see the updated welcome automatically.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)

Assistant

* * *

#### Identify inactive agents before cleanup

The inactive agents CSV export now includes a Last edited by email column. Administrators can use this information to identify the person who last changed an unused agent before deciding whether to archive, update, or remove it. The added detail makes cleanup conversations more targeted and reduces the need to investigate ownership through separate systems.

**How to access:** Export the inactive agents CSV from the Agents administration or insights experience and review the new column.

Agent Insights

* * *

#### Preserve approval settings while editing tool selections

Agent Builder now retains Run without approval settings when you edit actions in a selected action pack or change the tools selected for an MCP server. This prevents an edit to the tool list from unexpectedly resetting an intentional approval choice. Newly added action packs and MCP servers still start with Run without approval turned off, so builders must explicitly enable the setting for new additions.

**How to access:** Open an agent’s action pack or MCP configuration in Agent Builder, then edit its tools. Review the approval setting before saving changes.

Agent Builder

* * *

#### Complete support-agent forms with less clutter

Support agents now show automatically captured ticket-page content as a compact, non-editable pill instead of placing the full captured content directly in the form. The complete context is still sent when the agent runs. Forms also place focus on the first empty field, so you can begin entering the information the agent actually needs without moving past prefilled context. This makes browser-based support workflows easier to scan and faster to complete.

**How to access:** Open a supported Zendesk, Salesforce Service Cloud, or ServiceNow page with the Glean Browser Extension, then open the Agents tab.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar#agents)  
Glean Extension

* * *

#### Make agent status notifications clearer

Agent Builder notifications now state the outcome of the action that occurred. Publishing, sending an agent for review, and approving or rejecting a review each display a corresponding success message. Import failures are now reported as errors instead of warnings, making it easier to distinguish a completed action from a problem that needs attention. These clearer messages reduce uncertainty during publishing and review workflows, especially when several changes are being made in sequence.

**How to access:** No action is required. The updated messages appear automatically in Agent Builder when you publish, review, approve, reject, or import an agent.

Agent Builder

* * *

#### Search large app lists more easily

The Agent Builder app-selection dropdown now supports search. When many Teams or Slack apps are available, enter an app name to narrow the list instead of scrolling through every option. This reduces the time required to configure an agent for a specific app and makes the selection experience more manageable for organizations with multiple connected workspaces or channels.

**How to access:** Open the app-selection dropdown in Agent Builder and enter the name of the Teams or Slack app you want to select.

Agent Builder

* * *

#### Run eligible MCP tools in the background

MCP tools now support background execution by default. This allows eligible tool calls to continue without blocking an interactive flow, while administrators retain control through each tool’s Background Execution Policy. You can disable background execution when a tool needs to remain synchronous or requires closer review. The setting is applied per tool, so teams can choose a different execution policy for different connected capabilities.

**How to access:** Administrators can review each MCP tool’s Background Execution Policy from the MCP server configuration and disable background execution when needed.

MCP

* * *

#### Allow eligible Composio writes to run without a confirmation click

Administrators can now allow Composio write tools to run in the background without manual confirmation by default. Existing policies remain unchanged, and administrators continue to control the behavior through each tool’s Background Execution Policy. This can shorten workflows where a write is already governed and does not need an additional confirmation step, while preserving the ability to require confirmation for higher-risk actions.

**How to access:** Configure the Background Execution Policy for the relevant Composio write tool. Agent creators can then use the eligible action in an interactive agent.

Actions

* * *

#### Separate host-app setup from MCP server management

The Glean MCP servers administration page now opens with separate Host apps and MCP servers tabs. Host apps show where connected clients are configured and used, while MCP servers provide the server and tool-management workflow. Separating these concepts makes it easier for administrators to find setup information, review usage, and manage the right object without navigating through a combined page.

**How to access:** Open the Glean MCP servers page in the Admin Console and choose the Host apps or MCP servers tab.

MCP

* * *

#### Add Skills tools to selected MCP servers

Administrators can add Glean’s Skill tools-`find_skills`, `read_skill_files`, and `run_tool`-to an MCP server. Connected MCP clients can then discover relevant skills on demand and run their underlying tools without loading the full catalog up front. The tools are opt-in per server and are not enabled automatically, giving administrators control over which clients can discover and execute skills through each MCP connection.

**How to access:** Open an MCP server in the Admin Console, choose the Skill tools pack from the tool catalog, and save the server configuration.

MCP

* * *

#### Find Glean content through DocuSign MCP

DocuSign MCP is now generally available through Glean’s managed MCP catalog using DocuSign’s production server and OAuth endpoints. This gives administrators a production connection path for DocuSign workflows through the managed catalog. Connections created during the beta period may still point to the earlier environment, so they may need to be recreated or re-authenticated before they use the production endpoints.

**How to access:** Open the managed MCP catalog, select DocuSign, and complete the OAuth connection flow. If you connected during beta and experience an issue, recreate or re-authenticate the connection.

Docusign MCP

* * *

#### Make streamed chat responses feel smoother

Chat responses now use a subtle fade-in animation as new text streams into the conversation. The change keeps the existing generation indicator while making the response feel less abrupt as it appears. It does not change the answer content, model behavior, or response timing; it is a presentation improvement intended to make active generation easier to follow and the overall chat experience more polished.

**How to access:** No action is required. The animation appears automatically while new Assistant text streams into a chat.

Assistant

* * *

#### Give OAuth clients authorized access to Skills APIs

Dynamically registered OAuth clients can now request the Skills scope when they need authorized access to Glean’s Skills APIs. This provides a more precise permission boundary for integrations that discover or use skills, without requiring broader access than the client needs. Existing clients are unaffected unless they need Skills API access; those clients should update their registration request and consent configuration to include the new scope.

**How to access:** Update the dynamic OAuth client registration to request the Skills scope, then complete the normal authorization flow.

Skills API

* * *

#### Resolve skill access more efficiently

Skill access checks now use an optimized permission filter by default. The change improves how Glean resolves which skills are available to a user while preserving the intended access rules. Users and administrators should see the same permission outcomes, with a more efficient path used behind the scenes when Glean evaluates accessible skills.

**How to access:** No action is required. Skill availability continues to follow your existing permissions and sharing settings.

Skills

* * *

#### Match exported LLM token counts to billing

Exported LLM event data now reports cache-adjusted input-token counts, matching the values used for billing and Agent event exports. This prevents the raw and cache-related token buckets from overlapping and making manual cost calculations appear higher than the billed amount. The change does not alter the underlying cost calculation; it makes the exported data reflect the same adjusted input count used by pricing.

**How to access:** No action is required. Use the updated input-token count in exported LLM event data when performing manual usage or cost analysis.

LLM Usage

* * *

## Fixes

#### Reduce false positives when reviewing pasted or quoted text

AI Security guardrails now better distinguish a genuine prompt-injection attempt from text you are pasting, quoting, or reviewing. This reduces false positives for configuration files, security documentation, assistant responses, and ordinary business questions while preserving detection for concealed or agent-directed attacks. Findings also provide more useful investigation context by showing the triggering text, its source and location, and the potential impact on an agent.

Protect

* * *

#### Keep ServiceNow search text out of request URLs

ServiceNow search inputs are now sent in the request body rather than the URL. Search behavior and supported inputs remain unchanged, while search text and related parameters are less likely to be retained in load-balancer access logs. This reduces exposure of potentially sensitive business information and personal data during normal ServiceNow searches.

ServiceNow

* * *

#### Prevent GitLab access changes from removing valid memberships

GitLab identity updates now preserve crawl-scope information so memberships populated by a dedicated crawl are not incorrectly removed by a simple identity run. This addresses a race condition that could cause some users to lose access to GitLab documents and makes access updates more reliable when multiple identity crawls are active.

GitLab

* * *

#### Index Notion pages that previously disappeared from search

Some Notion pages could be silently omitted from the search index when an internal document-processing path encountered missing chunk metadata. The parser now handles that case safely, allowing affected pages to be indexed instead of being dropped. This restores discoverability for pages that were present in Notion but did not appear in Glean search.

Notion

* * *

#### Keep SharePoint crawling reliable with many custom columns

SharePoint site-page crawling now selects only the fields required by Glean when custom columns are not configured. This avoids requests that fail when a list contains a large number of unsupported custom columns, allowing the crawl to continue and making site-page content more reliable to index.

Sharepoint

* * *

Aug 13

2026

This release adds a new fast model, expands agent administration and safety controls, improves connector reliability, and resolves several customer-impacting workflow issues.

* * *

## AI & Model Updates

#### Get faster, more capable responses with Gemini 3.7 Flash

Gemini 3.7 Flash is now available as a model option in Glean Assistant and Agents. It is designed for high-volume, tool-using workflows where response speed matters, while providing stronger performance for well-scoped reasoning and coding tasks. The model is available across Glean Universal Model Key and Customer Key deployments covered by the supported release version. Gemini 3.7 Flash appears as a premium model, while earlier Flash models remain available in the model picker for teams that need them.

**How to access:** Open the model selector in Assistant or choose a model when configuring an agent. Administrators can exclude the model from **Admin Console → Platform → Models** if their organization does not want it available.

Assistant & Agents *\[ROAD-1647\]*

* * *

#### Improve Fast Mode responses with GPT-5.6 Luna

Fast Mode now uses GPT-5.6 Luna with low reasoning instead of the previous lightweight model. You should see improved answer quality while retaining the quick response experience that Fast Mode is designed to provide. No workflow changes are required: existing Fast Mode conversations and entry points continue to work, and the model change is applied automatically as the updated default becomes available.

**How to access:** Select Fast Mode in Assistant as usual. No administrator or end-user action is required.

Assistant

* * *

#### Give admins control over agent default models

Administrators can configure the default model set used by agent steps, giving teams more control over the models selected across agent types and supported modes. This helps organizations establish a consistent baseline for agent behavior instead of relying only on product defaults. The setting applies where the selected mode supports the configured model set; individual agent or step configuration can continue to determine behavior where those controls are available.

**How to access:** Administrators can use the deployment’s agent model configuration controls to set the default model set. No action is required from end users unless their administrator changes the organization’s defaults.

Agents

* * *

## Enhancements

#### Open chat side panels without text reflow

Chat side panels, including artifact and source panels, now open and close with smoother transitions. The panel reaches its final width immediately while its contents animate in place, so the conversation no longer repeatedly resizes or rewraps as the panel appears. Closing a panel also returns you directly to the main conversation view without intermediate layout shifts. This makes it easier to keep your place while reviewing sources, working with artifacts, or moving between the conversation and supporting content on web and mobile.

**How to access:** Open an artifact or chat source panel from a conversation. The improved behavior is automatic; no settings change is required.

Chat

* * *

#### Control staged agent review request emails

Moderators can now opt out of staged agent review request emails through their collaboration email notification settings. This gives moderation teams more control over review-request traffic while preserving the messages needed to keep agents reviewed.

**How to access:** Update collaboration email preferences for moderation notifications in your notification settings. No action is needed if you want to keep receiving these messages.

Notifications

* * *

#### See agent risk posture more clearly in Agent Scan

The Agent Scan experience now gives administrators a clearer view of agent risk. The dashboard separates Critical and High risk counts, combines Medium and Low risk agents into a simpler summary, and exposes the counts needed for the risk overview. Filters are also easier to use: Creator is a compact searchable single-select control, Risk supports multiple selections, and policy status styling is consistent across the admin experience. Policy audiences now show names for individual people or groups and reveal the full recipient list on hover.

**How to access:** Open the admin Agent Guardrails page and use the Agent Scan dashboard, filters, and policy audience details. No end-user action is required.

Protect

* * *

#### Understand agent permissions before activation

Before you activate an agent, the permissions screen now explains what each tool can do and whether it may act without asking for approval. Tools are identified as read-only, able to run without approval, or requiring approval. MCP servers also show whether all, some, or none of their enabled write tools can run unattended. The display follows administrator approval policies, so a tool that an administrator requires to pause will be shown as requiring approval even when the agent’s own configuration requests otherwise.

**How to access:** Open an agent that uses tools or MCP servers and review the permissions screen before activating it. No configuration change is required.

Agents

* * *

#### Separate read and write tools for MCP servers

When you build or review an agent, each MCP server’s capabilities are now separated into **Read tools** and **Write tools** with individual counts. This makes it easier to see whether a server can only retrieve information or can also change data. The layout also makes the write-tool approval control easier to understand, and the control is hidden when a server has no enabled write tools. Selecting or removing a tool in one section does not change the selections in the other section.

**How to access:** Open an agent’s **Capabilities** tab and expand an MCP server. Review or adjust the Read tools and Write tools selections there.

Agents

* * *

#### Share meeting notes and imported summaries directly from the artifact

Artifact owners can now use the Share action directly from the header of meeting notes and imported meeting summaries, even when the original chat thread is no longer available. This gives owners a reliable way to share the artifact itself without needing to reopen or locate the conversation that created it. In cases where no linked chat thread exists, the Chat action remains hidden so the available actions accurately reflect what you can use.

**How to access:** Open a meeting note or imported meeting summary that you own, then select **Share** from the artifact header.

Artifacts

* * *

#### Retrieve schemas for Glean-native tools through the Tool Metadata API

Clients can now retrieve input schemas and descriptions for Glean-native tools through the Tool Metadata API. This helps integrations understand the inputs expected by native capabilities such as Meeting Lookup before invoking them. Existing action-pack and external MCP behavior remains unchanged, so current integrations do not need to change how they use those tools. The improvement is especially useful for clients that need to inspect tool definitions dynamically while building or running agent workflows.

**How to access:** Use the Tool Metadata API when your client needs the input schema or description for a Glean-native tool. No end-user action is required.

Agents

* * *

#### Restore full insights visibility for Insights Moderators

Insights Moderators can again view insights for all agents, including agents they do not own or edit. This restores the broader visibility needed by moderation and oversight teams to review agent activity across an organization rather than being limited to agents associated with their own accounts. Agent owners and regular users do not need to change their sharing settings for this access to work.

**How to access:** Sign in with an Insights Moderator role and open the agent insights experience. Access is controlled by your organization’s role assignment.

Insights

* * *

#### Keep MCP moderation focused on Glean-hosted servers

MCP Server Moderators are now limited to administering Glean-hosted MCP servers and viewing MCP Insights. Managing third-party MCP connections-including creating, updating, deleting, refreshing, or repairing third-party hosts and accessing their templates-continues to require the existing tool-administration permissions. This keeps moderation responsibilities aligned with the surfaces they are intended to govern while preserving established controls for external connections.

**How to access:** MCP Server Moderators can use the Glean-hosted MCP administration and MCP Insights surfaces. Ask an administrator for tool-administration permissions when third-party MCP management is required.

MCP

* * *

#### Find recent Outlook mail sooner

New or changed Outlook messages delivered through webhooks are now prioritized ahead of background full-refresh crawls in the mailbox thread queue. As a result, recent mail can become searchable sooner without interrupting other mailbox crawl operations. This is an automatic indexing improvement: it does not change how users search Outlook, and it does not require administrators to reconfigure the connector.

**How to access:** Search Outlook content in Glean as usual. No user or administrator action is required.

Outlook

* * *

#### Improve OneDrive and SharePoint crawl reliability

OneDrive and SharePoint crawls now use more efficient exact-key batch deletion when cleaning up delta results. This reduces the chance of slowdowns or stalls on large drives and helps keep connector processing predictable as content changes over time. The improvement is applied to the crawl process automatically and does not change the way users search or access content.

**How to access:** Continue using OneDrive and SharePoint connectors normally. No user or administrator action is required.

OneDrive & SharePoint

* * *

#### Capture user intent for MCP usage analysis

MCP tool calls now capture the user’s intent for usage logging and downstream analysis. This gives organizations better context for understanding why MCP tools are used, supporting more useful operational and adoption analysis. The change does not alter the tool’s result or require users to provide a new form field outside the MCP interaction. Intent capture is handled as part of the MCP tool-call experience and its associated usage logging.

**How to access:** No action is required. Intent information is captured automatically for supported MCP tool calls.

MCP

* * *

## Fixes

#### Hosted Excel, Outlook, SharePoint, and Teams actions are more reliable

Hosted Composio actions for Excel, Outlook, SharePoint, and Teams are now more reliable. An infrastructure issue could previously cause intermittent failures when these actions were used in hosted workflows. Reliability protections have been improved so the supporting service is less likely to become unavailable during periods of platform pressure. Existing workflows continue to work without changes, and no action is required from users or administrators.

Actions

* * *

#### ServiceNow Create Request forms load correctly

ServiceNow Create Request no longer fails with “Failed to fetch action data” after you select a catalog when the action has no catalog restriction configured. The form now proceeds to the catalog-item step when no specific allowlist is set, while configured catalog restrictions continue to be enforced. This restores the expected request-creation flow without requiring administrators to add an unnecessary catalog restriction.

ServiceNow

* * *

#### Sign in to the Android app with Intune MAM policies

Android sign-in now works more reliably for organizations using Intune Mobile Application Management, including BYOD devices that are not enrolled in full device management. The flow handles both permissive and restrictive “Receive data from other apps” policies, uses Microsoft Edge when Intune requires a managed browser, and provides clearer guidance when Edge is missing or not recognized as managed. Users without Intune app protection are unaffected.

[Learn more](https://docs.glean.com/administration/management/features/mobile-intune-mam)  
Glean Mobile

* * *

#### Find identity-provider groups when sharing

Searching for identity-provider groups, such as Azure AD or Microsoft 365 groups, is now more reliable when sharing an agent, chat, or other item. You can search using text from any part of a group name, and matching groups continue to appear consistently in tenants with many groups. Previously, a group could be omitted unless you typed the full name or started with its exact prefix. The sharing flow and group selection behavior remain unchanged once you find the group.

Sharing

* * *

#### Export and import agents without tool-creation permissions

Agent export and import now work for users who do not have permission to create tools when the agent uses datasource actions. Previously, the export could fail because an action could not be resolved to a portable name. Actions are now represented with stable names rather than environment-specific identifiers, allowing the workflow to be downloaded and reused correctly without granting additional tool-creation permissions.

Agents

* * *

Aug 12

2026

> **New cadence:** We’re moving to twice-weekly release notes to match our release cadence, so you’ll know what shipped sooner.

## ✨ Major Launches

#### Find and reuse your past Assistant chats without leaving the conversation

You can now ask Glean to find and pick up your earlier Assistant conversations directly from a new chat, so you can continue long-running work without hunting through your history. Only your own conversations that are stored in Chat History are surfaced, and existing retention and privacy controls still apply.

**How to access:** In a new Assistant conversation, just ask Glean to find a previous chat (for example, reference what you were working on). Glean surfaces matching conversations from your own Chat History. No setup is required.

Assistant

#### Discover useful next steps directly from Glean Home

Glean Home can now surface personalized Cowork suggestions based on your recent work. Each card recommends a concrete next step, such as preparing for a meeting, summarizing a call, drafting a follow-up, or updating a document, and opens the relevant Assistant workflow with context already provided. This helps you discover valuable Glean capabilities without knowing the exact prompt or navigating through multiple product areas. Suggestions are designed around practical work journeys and include source-backed context so you can understand why a recommendation is relevant.

**How to access:** Open Glean Home and select a suggested card when one appears. No admin setup is required for supported Glean Key deployments.

Glean Home *\[ROAD-1444\]*

#### Understand usage by department and support internal chargeback

Billing administrators can now see how Glean usage is distributed across departments. The new department view helps you compare consumption, identify teams that are under-adopting or driving the most usage, and export the data for budgeting, chargeback, showback, and internal reporting. Department attribution follows the department metadata available through your identity provider or organization chart, so the view reflects the structure your organization already maintains. This gives finance and platform teams a clearer organizational lens on Glean adoption and consumption.

**How to access:** Open **Admin Console → Usage** and select **By departments**. Use the department table to compare usage or download the data as a CSV.

[Learn more](https://docs.glean.com/administration/management/usage/flexcredits-dashboard#by-departments)

Usage and Billing *\[ROAD-1340\]*

#### Set monthly usage limits for individual departments

Billing administrators can now set a monthly usage limit for each department. This lets you align Glean usage with the way your organization manages budgets, give different teams different levels of headroom, and choose between alert-only monitoring and blocking additional billable usage after a limit is reached. Department limits apply to each member of the department rather than creating a shared pool, and individual user overrides remain available for people who need more capacity. Limits reset at the start of each calendar month.

**How to access:** Open **Admin Console → Usage → By departments**, open the department’s actions menu, select **Manage usage limit**, enter the monthly amount, and save. Confirm that department metadata is mapped in your people data.

[Learn more](https://docs.glean.com/administration/management/usage/set-usage-limits-and-alerts#set-limits-within-a-department)

Usage and Billing

#### Delegate work to dynamic sub-agents with Task Tool

Autonomous Agents can now delegate work through the Task Tool by default in supported workflows. This gives an agent a consistent way to create and route work to dynamic sub-agents, support follow-up steps, and use model routing suited to the task. You can use the capability to break a larger workflow into focused pieces while preserving the agent’s permissions and error-handling behavior. The change also removes the need for the previous external experiment path for supported Task Tool workflows.

**How to access:** Create or open a supported autonomous agent and configure a step that delegates work through the Task Tool. The capability is enabled automatically for supported workflows.

Autonomous Agents *\[ROAD-1622\]*

#### Let agents act as themselves with governed service credentials

Agent Identity lets an agent use its own scoped service credentials instead of borrowing the identity of the person who invoked it. Actions can therefore appear under the agent’s own account in connected systems, while Glean records the triggering user or schedule separately for auditability. Admins can limit the credential to the tools and data the agent needs, reducing permission sprawl and preventing the agent from inheriting unintended user access. Scheduled and background agents can also continue running without depending on a person’s OAuth session.

**How to access:** An admin creates and scopes a service credential in the target system, registers it in **Admin Console → Agent identity**, and controls its audience. A builder can then attach the credential to an autonomous agent.

[Learn more](https://docs.glean.com/administration/agent-identity)

Agent Identity *\[ROAD-1542\]*

#### Query Databricks Genie from Glean Assistant

Assistant can now route natural-language data questions to Databricks Genie spaces, allowing business users to ask questions about governed Databricks data without leaving Glean. Glean uses indexed Genie space metadata, such as titles, descriptions, sample questions, and table information, to select the best matching space. Direct Databricks SQL remains available as an explicit fallback when requested or when no suitable Genie space is found. Results are returned in Assistant while Databricks permissions continue to control what each user can access.

**How to access:** Your admin must configure the Databricks connector and tools, verify that Genie spaces are indexed, and enable the Databricks tools for Chat under **Admin Console → Platform → Tools**. Then ask Assistant a question about your Databricks data.

[Learn more](https://docs.glean.com/administration/assistant/warehouse-data/connect-databricks-genie-to-glean-assistant)

Databricks in Assistant

#### Catch up on the last two minutes of a live meeting in one click

When you join a live meeting late or lose track of the discussion, Meeting Notes can now summarize the most recent part of the transcript for you. After the transcript has more than two minutes of content, select **Catch me up** above the composer to get a concise recap of what was just discussed. This helps you rejoin the conversation without asking others to repeat themselves and keeps you focused on the meeting instead of on note-taking. The summary is generated from the live transcript already available in the meeting.

**How to access:** Open a live meeting transcription in Glean desktop. After more than two minutes of transcript are available, select **Catch me up** above the composer. Meeting Notes access is controlled by your admin under **Admin Console → Assistant → Meeting Notes**.

[Learn more](https://docs.glean.com/user-guide/assistant/meeting-notes/transcription-and-consent)

Meeting Notes *\[ROAD-769\]*

## 🤖 AI & Model Updates

#### A faster default model for Adaptive Mode, Fast Mode, and Search

Adaptive Mode, Fast Mode, and Search in Chat now use GPT-5.4-mini as their default model, delivering faster, more efficient responses in these modes.

**How to access:** No action needed - these modes use the new default model automatically.

Assistant

#### Set the default model for workflow agents

Admins can now configure the default model set that powers workflow agents, giving teams more control over which model is used for workflow-agent steps.

**How to access:** In the Admin Console, set the default model set for workflow agents in your model configuration.

Agents

#### Choose GPT-5.6 models across Assistant and Agents

GPT-5.6 Sol, GPT-5.6 Terra, and GPT-5.6 Luna are now available as premium models across supported Assistant and Agent surfaces. The model hub gives admins control over which models are enabled, while users can choose from the models made available to them when model selection is supported. Luna is initially focused on eligible agent workflows, while Sol and Terra are available in supported model-choice surfaces. Premium models may affect usage-based consumption, so administrators can manage availability according to their organization’s needs and billing policy.

**How to access:** In **Admin Console → Platform → LLMs**, enable the GPT-5.6 models in the Model Hub. Users can then select supported models from the Assistant model picker or Agent model settings.

[Learn more](https://docs.glean.com/administration/llms)

Models

#### Configure AI action models by deployment and workflow

Admins can now configure the model used for AI-powered actions with clearer deployment-aware controls. The configuration supports choosing an eligible model, setting visibility for the people who can use the action, and keeping the action aligned with the model availability of the deployment. This helps platform owners balance response quality, cost, and access while giving users a predictable experience when they invoke actions such as summarization, drafting, or other AI-assisted workflows.

**How to access:** Open the relevant action in **Admin Console → Platform → Actions**, select its configuration, and review the available model and visibility settings. The choices shown depend on your deployment and enabled models.

AI Actions

#### Use Claude 4.1 in Assistant

Claude 4.1 is now available for supported Assistant experiences, giving users another model option for tasks that benefit from Anthropic’s latest available capabilities. Administrators retain control over whether the model is enabled and which users or workflows can access it. The model appears alongside other configured models rather than changing every user’s existing selection automatically, so teams can evaluate it within their current model governance and usage-management practices.

**How to access:** An admin must enable Claude 4.1 in **Admin Console → Platform → LLMs**. Once enabled for your deployment, select it from the Assistant model picker where model choice is available.

[Learn more](https://docs.glean.com/administration/llms)

Assistant Models

#### Select models separately for individual applications

Model selection can now be configured at the application level instead of relying only on one broad deployment setting. This gives administrators more control over which applications can use particular models and helps align model access with the needs, risk profile, and cost expectations of each workflow. Users see only the models made available to the application and audience they are using, so the experience remains governed without requiring every application to expose the full model catalog.

**How to access:** Open **Admin Console → Platform → LLMs** or the relevant application’s model configuration and review the enabled models and visibility settings. Exact options depend on your deployment.

[Learn more](https://docs.glean.com/administration/llms)

Model Administration

#### New Glean Key autonomous agents start with GPT-5.6 Luna

New autonomous agents on Glean Key now use GPT-5.6 Luna as their default model, giving new agents a more capable starting point without requiring you to choose a model during setup. Existing autonomous agents keep their current model settings, so this change does not silently alter agents already in use. Workflow-agent defaults are also unchanged. For administrators, the Glean Key model controls now make the transition clearer: Luna can be enabled while it is off, and GPT-5.4 can be disabled after Luna is enabled. Legacy large and small workflow defaults are no longer presented as default choices for Glean Key.

**How to access:** Create a new autonomous agent to use the new default automatically. To review Glean Key model settings, open **Admin Console → Models** and select the Glean Key model configuration.

[Learn more](https://docs.glean.com/administration/llms)

Agents and Model Administration

## ⚠️ Critical Updates

#### Knowledge Profile searches now surface only company-wide pinned results

For searches performed with a Knowledge Profile, private and department-scoped pinned results are no longer shown as suggested results; only company-wide pins appear. This keeps pinned suggestions aligned with content that is broadly visible across your organization.

**How to access:** No action needed - this applies automatically. If you previously relied on private or department-scoped pins appearing under a Knowledge Profile, note that only company-wide pins will now surface.

Search

#### Restrict public links to people who already have access

Public-link settings now make it easier to prevent accidental broad sharing. Administrators can choose whether users may create public links and can restrict link creation to specific groups. When restricted sharing is selected, only people who already have access to the underlying content can open the link. This gives organizations a clearer control point for balancing collaboration with information protection and helps prevent a link from becoming an unintended access path to a chat, artifact, or other user-generated content.

**How to access:** Admins can review public-link controls in the organization’s sharing and access settings. End users will see the permitted sharing options when they open a chat or artifact’s share dialog.

Sharing and Permissions

#### Connect MCP hosts with a simpler OAuth consent experience

Connecting a third-party MCP host to Glean now uses a single, clearer user-facing permission instead of exposing a long technical list of OAuth scopes. The consent screen explains that MCP access operates within your existing permissions and the settings approved by your admin, while Glean narrows the underlying scopes to the resources the host needs. This makes the first connection easier to understand without removing the admin and per-tool controls that govern what the MCP host can access.

**How to access:** Admins who already use the Glean OAuth Authorization Server do not need to change anything. To enable it for a new deployment, open **Admin Console → Settings → Third-party access (OAuth)** and enable **Glean OAuth Server**. Users then connect their MCP host and approve the simplified consent screen.

[Learn more](https://docs.glean.com/administration/oauth/authorization-server)

Glean MCP OAuth

#### Plan for the retirement of Claude Opus 4.1

Claude Opus 4.1 is being retired from Glean model availability. Administrators should review agents, actions, and other workflows that explicitly select this model and move them to a supported replacement before the retirement date. Existing workflows may continue to run during the transition window, but they will need a supported model after the model is removed. Reviewing model usage now helps you avoid unexpected changes to production agents and gives you time to test a replacement under your organization’s access and usage policies.

**How to access:** Open **Admin Console → Platform → LLMs** and review configurations that use Claude Opus 4.1. Choose a supported replacement and save the updated configuration before the retirement deadline shown in your deployment.

[Learn more](https://docs.glean.com/administration/llms)

Model Administration

#### Move workflows off GPT-5.1 before it is retired

GPT-5.1 is being removed from supported model choices. If an agent, action, or application explicitly depends on GPT-5.1, update that configuration to a supported model before the retirement date. The change is intended to reduce reliance on an older model version while preserving a clear migration path through the Model Hub. Administrators should also review any model-specific prompts, output expectations, or cost assumptions before switching production workflows to a replacement.

**How to access:** Open **Admin Console → Platform → LLMs**, search for GPT-5.1 in your enabled-model and workflow configurations, and select a supported replacement before the retirement deadline shown for your deployment.

[Learn more](https://docs.glean.com/administration/llms)

Model Administration

#### Control application and tool access with clearer admin settings

Administrators now have more consistent controls for managing who can use connected applications, tools, and agent capabilities. Access settings can be applied to users or groups, and the admin experience includes clearer guidance about where a setting takes effect and how it affects end-user visibility. These controls help teams roll out integrations safely, limit sensitive actions to the right audiences, and troubleshoot access without requiring users to guess whether a feature is unavailable or simply restricted by policy.

**How to access:** Open the relevant application, tool, or agent configuration in the Admin Console and review its **Visibility**, **Access**, or **Configuration** settings. Use the available user or group controls to define the intended audience.

Admin Access Controls

#### Admins can control who receives audio artifacts during rollout

Glean Key administrators now have explicit controls for audio artifacts. You can let Glean manage the rollout, enable audio artifacts for everyone, limit them to admins, or turn them off. These controls help you introduce podcast-style audio artifacts at a pace that matches your organization’s privacy, compliance, and adoption requirements. The setting applies to new audio generation; an audio artifact that has already finished generating remains playable even if the setting later changes. If access is revoked while generation is in progress, the generation is stopped cleanly rather than remaining stuck.

**How to access:** Open **Admin Console → Glean Assistant → Settings → Audio artifacts** on a Glean Key deployment, choose the audience setting, and save. Customer Key deployments do not show this setting.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)

Audio Artifacts

#### Delegate MCP administration without granting full admin access

The MCP Server Moderator role is now enabled by default in deployments that do not provide an explicit override. Administrators can use this role to delegate Glean MCP server management and MCP Insights access without granting broader administrator permissions. The role remains governed by the deployment-level feature setting, so organizations that need a stricter permission model can disable it. This change makes it easier to separate day-to-day MCP administration from organization-wide administrative authority while keeping access controlled through existing role management.

**How to access:** Assign the **MCP Server Moderator** role through your deployment’s Admin Console role and permissions controls. If your deployment explicitly disables the role, it will remain unavailable.

MCP Server Administration

#### Departmental moderators now see the publish action they can actually use

Departmental agent moderators now receive an action that matches their publishing scope. When an agent was created outside the departments a moderator oversees, the builder previously displayed **Publish**, even though the publish request would be rejected. The action now appears as **Request to publish**, making the next step clear and avoiding a failed publish attempt. Moderators can still publish agents created within their departments, and organization-wide agent admins are unaffected. This change makes agent governance more predictable for teams that use department-scoped moderation.

**How to access:** Open an agent in the builder as a departmental moderator. The available action is shown in the agent’s publishing controls and reflects the creator’s department and your assigned scope.

Agent Permissions

#### Notifications work without customer-specific enablement

Notifications delivered through Glean’s Notify platform now work by default, removing the need for customer-specific enablement before supported notification workflows can operate. This reduces setup friction for organizations using notification delivery and makes behavior more consistent across deployments. There is no change required for customers who already use the platform. Existing notification configuration and delivery paths continue to apply; the improvement is that the underlying delivery capability is available by default instead of requiring an additional customer-level activation step.

**How to access:** No action is required. Use supported notification workflows as usual; delivery is available automatically through the Notify platform.

Notifications

#### Tableau connections work with older supported REST API versions

The Tableau connector now starts with REST API version 3.23 instead of 3.27. This improves compatibility for Tableau Server and Tableau Cloud environments whose maximum supported API version is below 3.27, reducing setup and crawl failures caused by a version mismatch. The change is backward-compatible for environments that support newer Tableau APIs, and it does not require you to change your existing Tableau configuration. Glean continues to use the connector’s supported setup and authentication flow while requesting an API version that works across a broader range of Tableau deployments.

**How to access:** No action is required. Use the Tableau connector setup and crawl workflows normally. Existing configurations continue to use the compatible default.

Tableau Connector

## 🌅 Deprecations & Sunsets

#### Gemini 3 Pro has been removed

Gemini 3 Pro has been removed following its March 25, 2026 deprecation date and is no longer available for selection in Assistant or Agents.

**How to access:** If your organization used Gemini 3 Pro, switch any affected Assistant or agent configurations to another available model in the Admin Console.

Models

## 🎨 Enhancements

#### Consistent meeting titles across chat, transcripts, Notes, and Summaries

Meeting titles now stay in sync across chat, transcripts, Notes, and Summaries after you rename a meeting or generate a Summary, so you see the same title everywhere.

**How to access:** No action needed - titles stay consistent automatically.

Meetings

#### Faster data refresh in Canvas artifacts

Refreshing data in a Canvas artifact is now faster and skips an unnecessary agent interaction when the artifact supports deterministic refresh.

**How to access:** No action needed - refresh is faster automatically for supported artifacts.

Artifacts

#### Spot chats that ran into an error from the left navigation

Conversations that hit an error before finishing now show an error indicator in the left navigation, making it easier to find chats that may need to be retried or reviewed.

**How to access:** No action needed - the indicator appears automatically next to affected chats.

Assistant

#### See read and write tool counts for external MCP servers at a glance

When choosing external MCP tools in the Admin Console, each server now shows how many read and write tools it provides before you expand it, and servers that provide no tools are no longer listed.

**How to access:** In the Admin Console, open external MCP tool selection to see per-server read and write tool counts.

MCP

#### Choose whether to notify teammates when sharing an agent

When you share an agent with new teammates, you can now decide whether to notify them. A "Notify teammates" checkbox appears whenever you add teammates, so you can alert them to their new access or share quietly.

**How to access:** When sharing an agent, use the "Notify teammates" checkbox to control whether new teammates receive a notification.

Agents

#### LumApps connector now captures deleted and archived content

The LumApps connector now supports webhooks for deleted and archived content, keeping search results more accurate as content changes in LumApps.

**How to access:** Available automatically on the LumApps connector; no additional setup is required.

Connectors

#### Clearer GitLab Cloud connector setup guidance

GitLab Cloud setup now guides admins to use either a Group Access Token or a Service Account token scoped to a single top-level group, with links to official GitLab documentation and clearer notes on when webhooks are created automatically versus configured manually.

**How to access:** In the Admin Console, follow the updated GitLab Cloud connector setup flow.

Connectors

#### Export historical user spend, including zero-usage and deleted users

Billing moderators can now export historical user spend, including users with zero usage and deleted users, for more complete cost reporting.

**How to access:** In the Admin Console billing area, billing moderators can export historical user spend.

Billing

#### Per-app and per-user spend limits with the AI gateway

When the AI gateway is enabled, monthly spend limits are now enforced per connected app and per user within each app, so a budget set on one app is evaluated independently of others. Deployments that do not use the AI gateway are unaffected and continue to enforce workspace-wide, per-user, and per-agent limits.

**How to access:** With the AI gateway enabled, set per-app and per-user monthly spend limits in the Admin Console.

Billing

#### Splunk MCP server is now connection-verified with a setup guide

The Splunk MCP server template now appears as "Connection verified" in the MCP catalog and ships with step-by-step instructions for connecting Splunk using a dedicated service account, a least-privilege role, and an encrypted MCP token.

**How to access:** In the MCP catalog, select the Splunk template and use "Show setup instructions" to complete service-account setup.

MCP

#### Support for the latest Model Context Protocol revision

Glean's MCP servers now support the 2026-07-28 revision of the Model Context Protocol specification. Clients that speak the newer revision negotiate it automatically, and clients on earlier revisions continue to work unchanged.

**How to access:** No action needed - supported clients negotiate the new revision automatically.

MCP

#### More resilient Slack tools under heavy concurrent use

Slack tools used by Assistant, voice, and agents are now more resilient when many requests run at once. Glean no longer opens a new Slack connection for every skill lookup and tool dispatch, so Slack per-account connection rate limits no longer reject requests mid-turn and cause an assistant or scheduled agent to abandon its remaining steps.

**How to access:** No action needed - this reliability improvement applies automatically.

Slack

#### Zendesk Extension Tools action pack is now available to set up

Resolved an issue where the Zendesk Extension Tools action pack did not appear in the list of supported action packs and therefore could not be configured. It is now available to set up.

**How to access:** In the Admin Console under Actions, add the Zendesk Extension Tools action pack.

Actions

#### Filter Glean Home suggestions by assistant capability

Glean Home suggestions can now be filtered by the assistant capabilities they use. This gives admins and product teams a more focused way to evaluate or manage suggestion experiences when a deployment exposes only selected workflows. The filter separates suggestions based on the underlying capability rather than requiring you to inspect each card individually, making it easier to understand what types of actions are being promoted and to keep the Home experience aligned with the workflows available to your organization.

**How to access:** Open the Glean Home suggestion management or configuration view and use the assistant-capability filter when reviewing available suggestions. The filter appears automatically where suggestion controls are enabled.

Glean Home

#### Upload more text-based file formats safely

File uploads now support more than 50 additional text-based formats, including TSV, TOML, RST, and Markdown. Glean continues to block unsafe or unsupported files such as executables, archives, scripts, and audio or video formats where applicable. This makes it easier to bring structured text and configuration files into Assistant for analysis, summarization, and content generation without weakening the existing security checks that validate file types before processing.

**How to access:** In Assistant, choose the file-upload control and select a supported text file. If your organization has file upload disabled, an admin can enable it from the Glean section of workspace Settings.

[Learn more](https://docs.glean.com/administration/assistant/features/file-upload#supported-file-formats)

File Upload

#### Read Assistant more comfortably with updated typography

Assistant now uses Inter typography with updated spacing and visual hierarchy across the core chat experience. Responses, controls, and structured content have a more consistent appearance across operating systems, making dense workflows easier to scan and giving the product a more predictable visual rhythm. The update does not change how you start chats, use tools, or access existing content; it improves the readability and polish of the surfaces you already use.

**How to access:** No action is required. The updated typography and spacing appear automatically in Assistant.

Assistant

#### Open Assistant with the new application URL

Assistant now has a dedicated application URL, making it easier to bookmark, link to, and open the Assistant experience directly. The new URL supports a clearer entry point for users who want to move straight into chat rather than starting from a general Glean surface. Existing navigation continues to work, so teams can adopt the direct URL gradually without changing links or workflows immediately.

**How to access:** Open the Assistant application from your existing Glean navigation or use the direct Assistant URL provided for your deployment.

Assistant

#### Use more skills and configure their visibility

Skills now support additional setup and access controls so organizations can make reusable agent capabilities available to the right audiences. Admins and builders can configure skills as part of their agent workflows, while visibility settings help prevent a skill from appearing to users who should not use it. This supports more consistent reuse of approved instructions and capabilities across agents without requiring each builder to recreate the same behavior.

**How to access:** Open the Skills area in Glean or the relevant agent builder, then review the skill’s setup and access controls. Your admin may need to enable or grant access to the skill.

Skills

#### Show more connected sources and actions in the Assistant app

The Assistant app now exposes additional connected sources and actions from the application experience, making it easier to discover what Glean can use to answer questions or complete work. The expanded surface helps users find supported integrations without memorizing connector names or navigating through separate configuration pages. Availability still depends on the connectors and actions enabled for your organization, so users see a governed set of options aligned with their deployment.

**How to access:** Open the Assistant app and use its sources or actions controls to review what is available. If an option is missing, ask an admin to verify connector and action visibility settings.

Assistant App

#### Export and review uploaded files with clearer format support

The file-upload experience now better communicates which text-based formats can be selected and processed. This complements the expanded format support by reducing confusion when a valid file does not use one of the most common extensions. Glean validates files after selection and continues to apply server-side security checks, so the broader format support improves compatibility without treating every file type as acceptable. You can upload supported files to analyze them, ask questions, or create content from their contents.

**How to access:** In Assistant, select the upload control and choose a supported file. If a file is rejected, check its format against the supported file types in the public file-upload guidance.

[Learn more](https://docs.glean.com/administration/assistant/features/file-upload#supported-file-formats)

File Upload

#### See generated image batches more naturally on native mobile

When Glean generates several images in native mobile chat, the preview now uses one large hero image with supporting thumbnails instead of desktop-style artifact framing. The whole preview is a single accessible tap target, so you can open the full image canvas without hunting for a small control. The layout is designed for mobile screens and keeps the available images visible at a glance. Desktop and mobile web previews are unchanged, so this improvement is focused on making generated image results easier to scan and open in the native mobile experience.

**How to access:** In the Glean mobile app, generate or open a chat response containing multiple images. Tap the hero image or thumbnail area to open the full image canvas.

Mobile Chat

#### Find artifact types faster with clearer filter names and icons

Search filters now use friendlier names and an icon that matches each artifact type. In artifact-focused searches, documents, interactive artifacts, meeting notes, images, and other supported types are easier to distinguish than when every row used the same generic artifact icon. The **With artifact** filter also uses clearer wording in Assistant search. These changes reduce the time needed to understand what a filter represents and make it easier to narrow results when you are looking for a specific kind of artifact.

**How to access:** Open Search, optionally scope to Assistant or Artifacts, and open the **With artifact** or **Type** filter. The updated labels and icons appear in the filter list automatically.

Search and Artifacts

#### Review all agent versions in one timeline

The agent builder’s version picker now presents drafts, saved versions, staged changes, and published versions in one time-ordered timeline instead of splitting them between Drafts and Published tabs. This gives you a single view of an agent’s history and makes it easier to understand which version is current, which changes are ready to publish, and what was saved previously. Existing version actions remain available, including selecting a version and managing staged or saved versions where those actions apply.

**How to access:** Open an agent in the builder and open the version picker. Review the timeline from the current version through earlier drafts, saved versions, and published checkpoints.

Agent Builder

#### Search, sort, and evaluate agents more easily when configuring an MCP server

Admins configuring a Glean MCP server can now use a more capable agent picker. Search and familiar filters help you find the right agents, sorting and usage metadata provide more context, and descriptions are available without leaving the picker. Agents that cannot be selected, including disabled human-in-the-loop agents, remain visible with an explanation rather than disappearing and leaving you unsure why they are unavailable. The staged selection model remains in place, so your changes are applied when you save the MCP server configuration.

**How to access:** Open **Admin Console → Glean MCP servers**, edit an MCP server, and open its **Agents** section. Use the search, filters, sorting controls, and agent details in the picker before selecting **Save**.

Glean MCP Server

#### Review every configured GitHub extension in one place

The GitHub connector setup page now shows all configured file extensions used for indexing instead of limiting the visible list to a small fixed number. When many extensions are configured, they appear in a scrollable area so you can review the full configuration without losing access to the search and add controls. This makes it easier to verify that the connector covers the file types your engineering and documentation teams rely on and reduces the risk of overlooking an extension that was configured earlier.

**How to access:** Open the GitHub connector’s setup page in the Admin Console and review the configured file extensions. Scroll within the extension list to see entries beyond the initially visible rows.

GitHub Connector

#### Usage tables now label model spend by the selected period

The Models tables in the Admin Console now use the same period-aware labels as the users and departments tables. For the current month, the column is labeled **MTD usage**; for a previous month or all-time view, it is labeled **Usage**. The same wording is used in relevant application breakdowns and CSV exports. This makes it easier to interpret the numbers you are reviewing and avoids confusing a month-to-date value with a historical or all-time total.

**How to access:** Open **Admin Console → Usage → By models** and choose the current month, a previous month, or **All time**. The table and CSV export header update to match the selected period.

Usage and Billing

#### Open directory details without leaving AI Security Insights

The AI Security Insights user list now supports directory person cards. When you need more context about a high-risk user, you can hover over the user in the list and view the available directory details without navigating away from the insights dashboard. The existing user, department, pagination, and risk information remain in place, so the person card adds context without disrupting the review workflow.

**How to access:** Open **/admin/agent-guardrails/insights** and hover over a user in the user issues panel to open their directory person card.

AI Security Insights

#### MCP server lists now count inherited managed tools correctly

MCP server lists now include tools inherited from Glean-managed toolsets when showing the enabled tool count. Previously, a server could show zero tools in the list even though its detail page contained inherited tools. The count now reflects the union of enabled built-in tools and available managed-toolset members without double-counting overlaps or including unavailable tools. This gives admins a more accurate at-a-glance view when comparing servers and deciding which configuration to open.

**How to access:** Open the MCP server list in the Admin Console. The corrected tool count appears automatically for servers that use Glean-managed toolsets.

MCP Server Administration

#### Sharing language now makes restricted access explicit

The restricted-access option in sharing dialogs now says **Restricted to only people with access**. The wording clarifies that choosing this option does not grant access to new people; it limits access to people who already have it. Sharing behavior and the dialog layout are unchanged. The clearer label helps you choose the right sharing scope, especially when you are sharing a chat or artifact with a group and need to understand whether recipients must already be permitted to view it.

**How to access:** Open a chat or artifact sharing dialog and select the restricted-access option. The updated explanation appears in the sharing controls.

Sharing and Permissions

#### Assistant Replies preferences stay with each chat

Your Assistant Replies preference is now saved separately for each chat. If you turn Assistant Replies off in one conversation, leave it, and reopen it later, that chat remembers your choice. A different chat can keep a different setting, so changing the preference in one conversation does not change it elsewhere. The preference is stored locally in the web experience and does not modify the backend chat data, preserving the existing chat history and collaboration behavior.

**How to access:** Open any chat, change the **Assistant Replies** preference, and return to the conversation later. The setting is restored for that chat automatically.

Assistant Chat

#### Customer log streams include LLM response latency metrics

Customer event streams now include per-call time-to-first-token and total latency for LLM calls. Time-to-first-token measures how long it takes before the model begins responding, while total latency captures the full duration of the call. These fields give administrators and platform teams more context when monitoring AI responsiveness, investigating slow experiences, or comparing performance across usage patterns. The change adds observability to customer-visible LLM call events without requiring application changes or changes to the way users submit Assistant or agent requests.

**How to access:** No action is required. Review LLM call events in your existing customer log stream; the latency fields are included automatically for new events.

Customer Event Logs

## 🐛 Fixes

#### Reliable indexing of OneDrive and SharePoint updates

Fixed a rare crawling issue in OneDrive and SharePoint where a failure between fetching an update and storing it could result in a permanently missed update. Updates are now stored before the crawl position advances, so changes are no longer lost.

**How to access:** No action needed - the fix applies automatically.

Connectors

#### OneDrive documents that previously failed to index are now processed correctly

Fixed an issue that prevented some OneDrive documents from being indexed. OneDrive documents are now processed correctly, with SharePoint handling unchanged.

**How to access:** No action needed - the fix applies automatically.

Connectors

#### Glean Chat recovers from errors on follow-up turns

Fixed an issue where Glean Chat could fail with a "Something went wrong" error on follow-up turns when the underlying AI provider could not decrypt a prior reasoning context. Glean now clears the invalid context and recovers the conversation turn.

**How to access:** No action needed - the fix applies automatically.

Assistant

#### Zoom recordings open directly from search results

Zoom meeting recording search results now link directly to the recording's share URL with the play passcode included, so the recording opens without a separate passcode prompt. Links to the older recording details page continue to resolve to the same result.

**How to access:** No action needed - recording links open directly.

Zoom

#### Slack direct messages reliably appear in federated search

Fixed an issue where Slack direct messages found through federated search could be missing from results on deployments that index Slack but exclude private messages from native search.

**How to access:** No action needed - the fix applies automatically.

Slack

#### Prevent connector reindexing from leaving stale or broken results

Connector reindexing could leave affected customer content in an inconsistent state after source changes, including results that pointed to missing pages or returned 404 errors. The reindexing flow now handles those changes more safely so refreshed content is available from the connector without leaving stale references behind. This improves trust in search results after large updates, deletions, or connector maintenance and reduces the need for customers to retry indexing or investigate broken links manually.

Connectors and Search

#### Avoid request failures after a usage limit is reached

Some customers could receive HTTP 429 errors on every response after reaching a configured usage limit, even when the request should have returned a clear limit message or allowed a non-billable experience to continue. The usage-limit handling path now returns the correct response behavior instead of repeatedly surfacing a generic rate-limit failure. This makes limits easier to understand for end users and gives administrators a more predictable control mechanism when a user, agent, or organization reaches its configured threshold.

Usage Limits

#### Keep Deep Research jobs from running out of memory

Large or complex Deep Research jobs could consume too much memory and fail before producing results. The workflow now handles the research execution more efficiently so longer investigations are less likely to terminate because of an out-of-memory condition. This helps users continue using Deep Research for substantial questions while preserving the context and intermediate work needed to produce a useful response instead of forcing them to restart with a smaller request.

Deep Research

#### Keep AWS connector links working after deployment changes

Some AWS-hosted connector experiences could generate links that pointed to an unavailable endpoint, resulting in 404 errors when users opened a connector result or management path. The URL handling now uses the correct AWS deployment context, so connector links resolve to the expected destination. This restores normal navigation for affected AWS-hosted customers and reduces the need to repair links or retry connector actions manually.

AWS Connectors

#### Apply connector permissions consistently through hierarchy changes

Connector permissions could be applied incorrectly when access was inherited through parent and child connector relationships. The permission evaluation path now preserves the intended hierarchy so users receive the correct access to indexed content, including after connector configuration changes. This reduces the risk of users seeing content they should not access or losing access that an administrator intended to grant, and it makes connector governance more predictable for organizations with layered source configurations.

Connector Permissions

#### Long Deep Research chats are less likely to fail before answering

Deep Research sessions with very long histories could fail with an error instead of returning an answer. The route now handles large conversation histories without sending the entire history inline in the request, allowing the session to continue while preserving earlier context. This is especially helpful when you return to an extended research thread and need to build on prior findings rather than start over.

Deep Research

#### GitHub code search results now open the correct file

GitHub federated code search results could lead to 404 pages when the result URL used an invalid reference. Results now resolve through the repository’s default branch, so selecting a file opens the expected GitHub page instead of an error. This restores the basic workflow of searching code in Glean and jumping directly to the matching file for inspection.

GitHub Search

#### New Slack Real Time Search connections can complete authorization

New Slack Real Time Search connector setups could fail before OAuth began because the authorization URL was not generated. The setup flow now handles newly created instances correctly, allowing the authorization URL to be created and the OAuth process to start. Existing Slack Real Time Search instances continue to use their saved MCP scope settings.

Slack Real Time Search

#### Long-running Spaces chats can continue past large-history limits

Long-running Spaces conversations could fail when their history became too large for the request sent to the AI workflow. The conversation history is now read directly from stored chat events for this route, avoiding the request-size limit while preserving the context needed for follow-up turns. This helps you continue an established Spaces discussion instead of losing the thread when the conversation grows.

Spaces

#### Tools work correctly across multiple Microsoft 365 instances

When multiple Microsoft 365 instances were connected, tool selection could use the wrong identity mapping, causing tools to be missing or unavailable in some contexts. Tool selection now respects the identity mapping for additional Microsoft 365 instances, so the tools exposed to an agent match the configured connection. This improves reliability for organizations that separate Microsoft 365 environments or maintain more than one connected instance.

Microsoft 365 Tools

Jul 29

2026

## User Features

#### Model Selector in Builder Assistant

Builder Assistant now includes a model selector so agent builders can choose which large language model powers each compiler chat. The chat bar shows the current model, and every response clearly indicates which model was used, matching the Assistant experience. This gives admins more control over cost and quality when Builder Assistant usage is billed, while keeping the default "Auto" model for new sessions.

**How to access:** Administrators must enable for your organization. Builder Assistant with model selection is available to all customers who can access the Agent Builder and use Builder Assistant. Admins should ensure that any premium models they want builders to use are enabled in their model settings. No additional configuration is required beyond existing model and billing setup. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/get-started/golive/model-choice)

Agents *\[ROAD-1566\]*

* * *

#### Call Third-Party Agents from Glean Agents via A2A

Glean agents can now call external third-party agents that support the A2A (Agent-to-Agent) protocol, so complex workflows can seamlessly span Glean and other agent platforms. Admins register external A2A agent servers in the Admin Console with OAuth credentials, and agent builders can add those external agents as sub-agents in Plan & Execute and Auto Mode workflows. This lets Glean agents delegate specialized tasks to domain-specific agents built on any A2A-compliant platform, while preserving per-user authentication, permissions, and governance across systems. This feature is available for all customers using Glean Agents and may be subject to usage-based pricing.

**How to access:** Administrators must enable for your organization. To enable this capability, a Glean admin must go to the Admin Console and register one or more external A2A agent servers, including their A2A agent card URL and OAuth client credentials, under Settings → Third-party agents. Admins should then configure which external agents are available to use in agent workflows via Settings → Assistant → Agent orchestrator. Once configured, agent builders can select and add these third-party agents as sub-agents in the agent builder; no additional setup is required for end users beyond any standard sign-in or consent flow enforced by the external platform. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/platform/expose-agents-over-a2a)

Agents *\[ROAD-1560\]*

* * *

#### Adaptive Reasoning \[Customer key\]

Adaptive reasoning dynamically decides how long to reason based on the user's query. This makes Glean Assistant feel faster for easy queries while preserving its quality for more difficult ones.

[Learn more](https://docs.glean.com/administration/assistant/features/adaptive-reasoning)

Assistant *\[ROAD-1376\]*

* * *

#### Glean Assistant can now query BigQuery with natural language or SQL

Glean Assistant can now query BigQuery directly through BigQuery MCP, Google's official MCP server for BigQuery, so users can ask questions in natural language or run SQL against approved projects and datasets without leaving Assistant. This makes Glean a front door to your warehouse so business users get governed, self-serve access to live data while data teams stay in control of what is exposed and how it is queried.

[Learn more](https://docs.glean.com/tools/connector/googlecloud)

Connectors *\[ROAD-1165\]*

* * *

#### Claude Opus 5 in Assistant and Agents

Claude Opus 5, Anthropic's latest premium Opus-class model, is now available in Glean Assistant model choice and in Agents. It delivers Anthropic's highest-quality performance for coding, agentic workflows, and long-horizon enterprise tasks, giving teams a powerful new option when they need stronger reasoning than standard models can provide. Customers already using Opus-class models can adopt Opus 5 as their new Anthropic premium choice without changing how they work in Assistant or the agent builder. This feature may be subject to usage-based pricing; see your plan details for how premium models are billed.

**How to access:** Administrators must enable Claude Opus 5 for your organization before users and agent builders can select it. In the Admin Console, go to Platform → LLMs (Model Hub), make sure your Anthropic provider configuration is set up, and turn on the Claude Opus 5 model for Assistant and Agents. If you want to limit access, you can hide premium models from model pickers or restrict Claude Opus 5 to specific departments using the existing model governance controls. Once enabled, end users can pick Claude Opus 5 from the model picker in Assistant, and builders can select it in the agent builder for eligible agents and steps. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/llms)

Agents *\[ROAD-1592\]*

* * *

#### Gemini 3.6 Flash in Assistant and Agents

Gemini 3.6 Flash is now available in Glean Assistant model choice and in the Agents model hub. Gemini 3.6 Flash offers significantly better cost efficiency than larger frontier models while maintaining strong reasoning for well-scoped agent tasks.

**How to access:** Glean Universal Model Key: Gemini 3.6 Flash appears automatically in the Assistant model choice dropdown and Agents model hub. Admins can exclude it via Admin Console → Platform → Models.

Customer Key: Gemini 3.6 Flash is available via Admin Console → Platform → Models. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/llms)

Agents *\[ROAD-1584\]*

* * *

#### A simpler setup flow for end users connecting to Glean MCP

We've refined the end-user setup experience so the default Glean MCP server is the clearest path for most users, while still preserving access to additional servers for advanced use cases. The updated flow also makes connected apps and authorization wording easier to understand, and gives users clearer setup options depending on the host.

**How to access:** End users can go to Settings → Third party apps and MCP and use the Glean MCP setup flow to pick a host and connect to Glean. The default server is highlighted as the recommended path, while additional servers remain available for advanced use cases.

[Learn more](https://docs.glean.com/administration/platform/mcp/host-guides/end-user-configuration)

Assistant *\[PACT-331\]*

* * *

#### Assistant typography refresh and visual polish

Assistant now uses Inter typography with updated spacing and visual hierarchy for a consistent, easier-to-read experience across all devices.

[Learn more](https://docs.glean.com/administration/management/customization/home-page)

Assistant *\[ROAD-1526\]*

* * *

#### Glean Assistant on external AI platforms via A2A (Cross-platform)

Introduces a cross-platform A2A foundation that lets Glean Assistant run as a governed, first-class agent inside external AI platforms and agent runtimes, starting with Gemini and expanding to other ecosystems over time. The shared protocol and packaging model reuse Glean's enterprise context, permissions, and guardrails so users can ask Glean from their preferred AI surface without duplicating configuration or exposing extra data. Admins get a consistent way to authorize external platforms, manage which Glean capabilities are available where, and monitor usage across environments.

**How to access:** From the Glean admin console, enable external AI platform access/A2A and connect each supported platform using its service account or OAuth configuration. Use the A2A settings to choose which Glean agents (including Glean Assistant) can be invoked from each external platform and which user groups are allowed to use them. Refer to the Help Center setup guide for per-platform steps (for example, registering Glean Assistant in Gemini or other A2A-capable marketplaces). This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/platform/a2a-server)

Connectors *\[ROAD-1463\]*

* * *

#### Simplified MCP OAuth consent and scope surface

Connecting third-party MCP hosts to Glean now uses a single, clear consent screen instead of a long list of technical OAuth scopes. The new experience groups MCP access into one user-facing permission, aligns that approval with each person's existing permissions and admin-approved settings, and narrows the underlying scopes to only the resources the host needs. Additional instrumentation on consent approvals and declines helps admins monitor rollout safety and refine their MCP strategy over time.

**How to access:** Admins already using the Glean OAuth Authorization Server for remote MCP servers do not need to take any action; users will automatically see the updated consent screen the next time they connect a host. To start using OAuth with remote MCP servers, open the Admin Console, go to Settings → Third-party access (OAuth), and enable the Glean OAuth Server. Then configure the MCP hosts you want to allow, and users can initiate the connection from their host and complete the simplified consent flow in their browser.

[Learn more](https://docs.glean.com/administration/oauth/authorization-server)

Connectors *\[ROAD-1448\]*

* * *

#### NetSuite MCP support

NetSuite MCP support lets teams use Glean Assistant and agents to run live, permission-aware workflows against NetSuite on top of the existing indexed NetSuite connector. Users can ask Glean to look up customers, invoices, purchase orders, and other NetSuite records in natural language and pull the latest data into their conversations without switching tools. This capability is initially available to a small set of customers while we validate quality and coverage across common NetSuite use cases.

**How to access:** Admins can configure NetSuite MCP from the Glean Admin Console under Platform → Actions by adding the NetSuite MCP server as an action pack. During setup, provide the NetSuite MCP server URL and OAuth details so Glean can connect as an MCP host. Once the action pack is connected and its tools are enabled, eligible users can invoke NetSuite MCP actions from Glean Assistant and agents, with access governed by their NetSuite permissions.

[Learn more](https://docs.glean.com/connectors/native/netsuite/)

Connectors *\[ROAD-1336\]*

* * *

#### Get trusted Glean answers directly in Slack channels

Glean can now share trusted answers directly in Slack channels.

Glean can now post high-quality answers directly into Slack channel threads, so everyone can see them immediately without first clicking "view response." These public replies are generated only from content that's broadly visible in your company (such as public Slack channels and org-wide documents), so they're safe to share and easy to trust. Teammates can still personalize the answer with their own private context when they need a more tailored response.

**How to access:** To use public answers in Slack, first set up the Slack Real Time Search connector from the Glean Admin Console and install the Glean app in your Slack workspace or Enterprise Grid. If you have already done this, you can jump to the 'Embedded Integrations' tab to view the Glean in Slack setup page.

On this setup page, enable Gleanbot to respond in channels publicly and/or proactively. You can enable it for all public channels by default, or choose specific channels where you want Glean to participate.

Once enabled, channel members can ask questions in Slack and Glean will search across your company's public corpus (including public Slack channels) to generate shared responses, while still respecting each user's permissions for any follow-up personalization.

[Learn more](https://docs.glean.com/administration/platform/embedded-integrations/slackbot/public-mode-glean-slack-channel)

Embedded Integrations *\[ROAD-908\]*

* * *

#### Persistent extension install button on Glean Home

Users who are actively using Glean but have not yet installed the browser extension will now see a persistent "Finish setup" style button on Glean Home that guides them to install the extension. This makes it clear that setup is incomplete and gives people a simple, always-available way to add the extension and unlock features like sidebar search, new tab page, and integrated search in apps like Google Drive and Box. The prompt appears only for eligible users and does not affect usage or billing.

[Learn more](https://docs.glean.com/user-guide/apps/installing-the-browser-extension)

Glean Extension *\[ROAD-1581\]*

## Admin Features

#### Admin dashboard now offers personalized recommendations of connectors, tools, and features to enable

The admin dashboard has been updated to include recommended connectors, tools, and features, alongside the existing notifications widget. The goal is to help admins discover the features that will open up new use cases for their users.

[Learn more](https://docs.glean.com/administration/management/notifications/admin-notifications-dashboard)

Admin Capabilities *\[ROAD-1549\]*

* * *

#### Greenhouse connector migration to Harvest v3 APIs

Greenhouse connector Harvest v3 migration lets admins update their existing Greenhouse connector from legacy Harvest API credentials to Harvest v3 (OAuth) ahead of Greenhouse's August 31, 2026 deprecation deadline. Admins can add the new client ID and client secret in the Glean admin console without re-indexing or downtime, preserving existing search results and permissions. In beta: opt in from the admin console.

**How to access:** In the Glean admin console, open Connectors > Greenhouse > Setup and add Harvest v3 (OAuth) credentials (client ID and client secret). Keep the existing Harvest API Key and Webhook Secret in place, then save and wait for validation to complete.

[Learn more](https://docs.glean.com/connectors/native/greenhouse/harvest-v3-migration)

Connectors *\[ROAD-1393\]*

* * *

#### Granular controls for who can manage MCP servers

Admins can now delegate MCP server administration without giving full admin access. The new MCP Server Moderator role lets designated users create and manage MCP servers and view MCP Insights, making it easier to put ownership closer to the teams actually running AI workflows.

**How to access:** A Glean administrator can assign the MCP Server Moderator role to designated users so they can manage MCP servers and view MCP Insights without receiving broader admin permissions. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/tools/managing-tools/managing-role-based-access-tools)

Assistant *\[PACT-345\]*

* * *

#### More precise access control for MCP tools

Admins can now configure tool-level access controls directly from the Glean MCP server experience. This makes it easier to control which tools different users can access, while keeping permissions aligned across the broader tools and admin surfaces.

**How to access:** In the Glean Admin Console, open a Glean MCP server, click Add tools, go to External Tools, and open Tool advanced settings for a tool pack. From there, admins can set access for individual read and write tools, and those changes stay synchronized with the Tools admin experience. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/tools/managing-tools/managing-role-based-access-tools)

Assistant *\[PACT-344\]*

* * *

#### Glean is now available through the ChatGPT app marketplace

Glean's remote MCP server can now be enabled through the ChatGPT app marketplace, making it easier for admins to roll out Glean in ChatGPT and connect users to enterprise search and other Glean-powered workflows from that surface.

**How to access:** ChatGPT workspace admins can add the Glean MCP server from the ChatGPT admin connector experience and authenticate it with Glean OAuth. Once configured, users can enable Glean in individual ChatGPT conversations from the tools menu when they want to use it. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/platform/mcp/host-guides/chatgpt)

Assistant *\[PACT-14\]*

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
