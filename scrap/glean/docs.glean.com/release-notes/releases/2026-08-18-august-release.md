---
url: "https://docs.glean.com/release-notes/releases/2026-08-18-august-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-08-18-august-release"
title: "August 18, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:54.651Z"
---
On this page

This release expands Glean’s AI capabilities, improves agent administration and collaboration, adds new platform integrations, and strengthens security, privacy, and reliability across connected data sources.

* * *

## Major Launches[​](#major-launches "Direct link to Major Launches")

* * *

#### Connect Glean content events to your automations[​](#connect-glean-content-events-to-your-automations "Direct link to Connect Glean content events to your automations")

The experimental Glean Triggers API lets developers subscribe to content events from connected data sources and deliver those events to external platforms and agents. You can register trigger subscriptions, search matching events, manage a trigger’s lifecycle, and receive signed webhook deliveries. This makes it possible to connect Glean activity to automation platforms, developer tools, and custom agent workflows while preserving the permissions of the subscribing user. The API is designed for integration builders who want Glean events to initiate work outside the Glean interface.

**How to access:** Use the Platform API with a token that has the required trigger scope, and include the experimental opt-in header on requests. The API is intended for developers and integration builders; the surface is experimental and may change.

Developer Platform

* * *

#### See your AI security posture in one place[​](#see-your-ai-security-posture-in-one-place "Direct link to See your AI security posture in one place")

Guardrails Insights gives security and governance teams a centralized view of AI guardrail activity. Instead of reviewing individual findings one at a time, administrators can use the dashboard to understand trends, policy confidence, topics, and high-risk users. The result is a clearer picture of where AI usage is creating risk and where investigation or policy changes may be needed. This is especially useful for teams responsible for monitoring AI usage, reviewing violations, and communicating security posture across the organization.

**How to access:** Open the AI Security Guardrails Insights dashboard from Glean Protect. Access depends on your organization’s Protect configuration and administrator permissions.

Protect

* * *

#### Preserve important agent drafts with saved versions[​](#preserve-important-agent-drafts-with-saved-versions "Direct link to Preserve important agent drafts with saved versions")

Agent Builder now lets you create named, immutable checkpoints of a draft agent. Saved versions give you a dependable way to preserve a meaningful configuration before making further edits, without changing the existing draft, staged, and published lifecycle. You remain in the editable draft state after saving. When you want to reuse an earlier checkpoint, select it from version history and load it back into draft, then continue editing or publish it through the normal workflow. This helps teams experiment more safely and revisit prior working states without maintaining parallel copies.

**How to access:** Open an agent in Agent Builder and use the version history or version selector to save, view, load, or delete draft checkpoints.

Agents

* * *

#### Rediscover useful work in the redesigned Library[​](#rediscover-useful-work-in-the-redesigned-library "Direct link to Rediscover useful work in the redesigned Library")

The redesigned Library makes durable artifacts easier to find and revisit. You can browse artifacts you created, artifacts shared directly with you, and explicitly public company artifacts. New filters help you narrow results by creator team or department, while sorting options make it easier to find recently created or popular content. The experience is designed to move beyond a constantly changing recently viewed list, so high-signal artifacts are easier to rediscover after the original task is complete.

**How to access:** Open Library in Glean and use the ownership, department, creator, and sorting controls to browse and filter artifacts.

Library

* * *

#### Bring support agents into your browser workflow[​](#bring-support-agents-into-your-browser-workflow "Direct link to Bring support agents into your browser workflow")

Agents in the Glean Browser Extension lets users launch configured support agents directly from supported Zendesk, Salesforce Service Cloud, and ServiceNow pages. The agent can use the current ticket or case context so you can work without copying information into another window. This provides a replacement path for embedded support experiences and gives administrators a dedicated way to configure which agents are available. Starting August 24, 2026, the experience is generally available to eligible deployments with existing embedded-integration usage.

**How to access:** Install and sign in to the Glean Browser Extension. Eligible users can open the extension sidebar on a supported ticket or case page and select the Agents tab. Admins can configure access from the browser-extension settings.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar#agents) Agents

* * *

## AI & Model Updates[​](#ai--model-updates "Direct link to AI & Model Updates")

* * *

#### Choose Gemini 3.7 Flash for fast, capable agent work[​](#choose-gemini-37-flash-for-fast-capable-agent-work "Direct link to Choose Gemini 3.7 Flash for fast, capable agent work")

Gemini 3.7 Flash is now available as a model option in Assistant and Agents. It is designed for high-volume, low-latency work while supporting stronger reasoning for well-scoped tasks. You can select low, medium, or high thinking levels depending on whether you want faster responses or more deliberate reasoning. The model is available across supported Assistant and Agents surfaces, with access varying by deployment key configuration. Gemini 3.6 Flash remains available under More models, so existing model choices are not removed.

**How to access:** In Assistant, open the model selector and choose Gemini 3.7 Flash. For Customer Key deployments, an administrator may need to make the model available from Admin Console → Platform → Models.

Assistant and Agents

* * *

#### Get smarter defaults for workflow agents[​](#get-smarter-defaults-for-workflow-agents "Direct link to Get smarter defaults for workflow agents")

Workflow agents that use “Let Glean decide” now default to GPT 5.6 Luna when it is available, with GPT 5.1 used as a fallback. This improves the default model choice without requiring builders to update existing agents. Explicit model selections remain unchanged, so teams that have deliberately chosen a specific model keep that configuration. The change applies to the default path only and is intended to improve the baseline experience for workflows that do not specify a model themselves.

**How to access:** No action is required for existing workflow agents using “Let Glean decide.” Open an agent’s model settings in Agent Builder if you want to review or choose an explicit model.

Agents

* * *

#### Use Anthropic models with your custom key[​](#use-anthropic-models-with-your-custom-key "Direct link to Use Anthropic models with your custom key")

Custom-key customers can now use supported Anthropic models through Glean for production workloads. This gives teams another provider option when selecting models for their organization’s AI experience and lets customers align model usage with their existing provider and key-management strategy. Availability depends on the models supported by the configured Anthropic provider and the deployment’s permissions and setup.

**How to access:** An administrator must configure the Anthropic provider and custom key in the model settings available to your deployment. Once enabled, users can select supported Anthropic models wherever the model picker is available.

Models

* * *

#### Use real-time voice more naturally when you are interrupted[​](#use-real-time-voice-more-naturally-when-you-are-interrupted "Direct link to Use real-time voice more naturally when you are interrupted")

Real-time voice now includes a Talk uninterrupted control when Glean detects that you started speaking while it was responding. Tap the notice to switch into a push-to-talk interaction and finish your turn before Glean responds. This gives you a clearer way to continue speaking without losing your thought or competing with the assistant’s response. The control is designed for natural back-and-forth conversations on web, desktop, and mobile, where interruptions are expected and a hands-free interaction should not require restarting the exchange.

**How to access:** Start a real-time voice session from the waveform button in the composer. If Glean detects an interruption, tap the Talk uninterrupted notice to continue speaking.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice) Assistant

* * *

## Critical Updates[​](#critical-updates "Direct link to Critical Updates")

#### Review the new Engram Memory billing treatment[​](#review-the-new-engram-memory-billing-treatment "Direct link to Review the new Engram Memory billing treatment")

Engram Memory usage is now billed for Glean Core Suite plans across supported models. Migration usage remains free. For Enterprise Flex credit plans, usage remains free through September 15, 2026, and begins consuming FlexCredits on September 16, 2026. This change affects how memory-related usage appears in plan economics, but it does not change the underlying memory experience. Review your plan and usage expectations before the Enterprise Flex billing date if your organization relies on persistent Assistant memory.

**How to access:** No product action is required. Administrators should review their plan and usage reporting, and contact their Glean representative with billing questions.

Assistant Memory

* * *

#### Update integrations that use the Agents subscription schema[​](#update-integrations-that-use-the-agents-subscription-schema "Direct link to Update integrations that use the Agents subscription schema")

The public Agents REST subscription schema no longer includes the `allowAllBgWriteActions` field. Integrations that referenced this field should remove it from their requests or generated models. Background-run behavior and the internal setting remain unchanged, so this is a schema cleanup rather than a change to how subscriptions execute. The update matters only to integrations that directly consume the public subscription schema and expect the removed field to be present.

**How to access:** Update any integration or generated client that references `allowAllBgWriteActions`, then validate the subscription request against the current public schema.

Assistant API

* * *

#### Require HTTPS for dynamically registered MCP servers[​](#require-https-for-dynamically-registered-mcp-servers "Direct link to Require HTTPS for dynamically registered MCP servers")

Dynamic MCP client registration now requires server URLs that use HTTPS. Registrations that use an `http://` URL will fail with a clear error instead of sending registration traffic over plaintext. This protects credentials and registration metadata while preserving the existing dynamic-registration workflow for secure servers. If you manage a custom MCP server that uses dynamic registration, confirm that its public registration URL is HTTPS before attempting to connect it.

**How to access:** No action is needed for existing secure servers. Update any custom MCP server configuration that uses an `http://` registration URL to use HTTPS.

MCP

* * *

#### Limit certificate setup to full administrators[​](#limit-certificate-setup-to-full-administrators "Direct link to Limit certificate setup to full administrators")

Certificate management APIs now require full administrator permissions to complete the SSL certificate setup flow. This narrows a sensitive configuration path to the role intended to manage organization-wide certificates and reduces the chance that a lower-privilege administrator changes security infrastructure unintentionally.

**How to access:** Full administrators can continue to complete certificate setup from the administrator experience. Users without full administrator permissions should contact an administrator with the required role.

Admin Console

* * *

#### Keep OneDrive access groups consistent[​](#keep-onedrive-access-groups-consistent "Direct link to Keep OneDrive access groups consistent")

OneDrive Product Access Group membership checks now use stable datasource user IDs. This prevents inconsistent access decisions caused by relying on identifiers that could vary between checks. Administrators should see more reliable enforcement of the groups that control which users can access OneDrive content through Glean, without needing to change the groups themselves or reconfigure the connector.

**How to access:** No action is required. Continue managing Product Access Groups through the existing OneDrive administration workflow.

OneDrive

* * *

#### Let users request access to protected chats and artifacts[​](#let-users-request-access-to-protected-chats-and-artifacts "Direct link to Let users request access to protected chats and artifacts")

Users who open a protected chat or artifact they cannot access can now submit an access request instead of relying on an out-of-band message. The requester can optionally include context, while the owner can review and approve or deny the request. Approved users join under the existing participant and permission controls. This creates a clearer, auditable path for collaboration while keeping the owner or authorized administrator in control of access.

**How to access:** Open a protected chat or artifact. If you do not have access, use the request-access action and optionally add a message for the owner.

Assistant

* * *

#### Give Viewer-shared chats a consistent home in Projects[​](#give-viewer-shared-chats-a-consistent-home-in-projects "Direct link to Give Viewer-shared chats a consistent home in Projects")

Chats shared with Viewer access now appear in Projects, including deployments where Multiplayer Chat is disabled. This makes shared conversations easier to find and gives recipients a consistent place to return to chats they can read. The change does not expand the underlying permission: a Viewer can see the chat only when it has been shared with them and continues to have Viewer-level access.

**How to access:** Open Projects and look for chats that have been shared with you as a Viewer.

Projects

* * *

## Deprecations & Sunsets[​](#deprecations--sunsets "Direct link to Deprecations & Sunsets")

#### Use the updated Embedded integrations administration URL[​](#use-the-updated-embedded-integrations-administration-url "Direct link to Use the updated Embedded integrations administration URL")

The Embedded integrations administration page now uses a URL that matches its page name. Existing Glean Assist links and bookmarks continue to work through redirects, so saved links do not need to be changed immediately. When updating internal documentation, onboarding materials, or bookmarks, use the new Embedded integrations route so future references align with the current product terminology and the browser-extension transition.

**How to access:** Navigate to Embedded integrations from the Admin Console. Existing Glean Assist URLs will redirect to the updated page.

Embedded Integrations

* * *

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Find skills faster in Settings[​](#find-skills-faster-in-settings "Direct link to Find skills faster in Settings")

The Skills tab in Settings now includes search by skill name. Use it to filter personal, shared, and platform skills instead of scanning the full list. Search results update within the current tab and show a clear empty state when no skill matches. This is particularly useful for organizations with many shared skills or for users who remember the purpose of a skill but not where it appears in the list.

**How to access:** Open Settings → Skills and enter a skill name in the search field.

Skills

* * *

#### Understand agent tools at a glance[​](#understand-agent-tools-at-a-glance "Direct link to Understand agent tools at a glance")

Agent Builder now separates datasource tools into Read and Write sections. Each section has its own count, search behavior, and Add all tools control, making it easier to understand what an agent can retrieve and what it can change. Approval settings appear only when write tools are selected, so builders can see the relevant safety control in context instead of interpreting a mixed list. The same distinction is available when configuring action packs and MCP servers.

**How to access:** Open an agent in Agent Builder and expand a datasource, action pack, or MCP tool selection. Use the Read and Write sections to review or change the toolset.

Agent Builder

* * *

#### Make agent version history easier to scan[​](#make-agent-version-history-easier-to-scan "Direct link to Make agent version history easier to scan")

The version history menu now puts saved-version names first, with the date and author underneath. Only the current version is labeled Published, and empty histories explain how to begin tracking changes. Expanded version groups scroll into view, and hover highlights clear correctly after selection. Together, these changes make it easier to distinguish versions, understand the current lifecycle state, and navigate a growing history without opening each version one by one.

**How to access:** Open an agent in Agent Builder and open its version history menu.

Agents

* * *

#### Start voice with useful context sooner[​](#start-voice-with-useful-context-sooner "Direct link to Start voice with useful context sooner")

Voice onboarding is now shorter and more personalized. New users see a concise welcome and can opt into a daily briefing rather than stepping through a multi-screen tutorial. The briefing can help users begin with relevant work context, while returning users continue to receive the standard voice greeting. This reduces setup friction and gets you to a useful voice interaction faster without changing the normal experience after onboarding.

**How to access:** Start real-time voice from the waveform button in the Glean composer. New users will see the updated welcome automatically.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)

Assistant

* * *

#### Identify inactive agents before cleanup[​](#identify-inactive-agents-before-cleanup "Direct link to Identify inactive agents before cleanup")

The inactive agents CSV export now includes a Last edited by email column. Administrators can use this information to identify the person who last changed an unused agent before deciding whether to archive, update, or remove it. The added detail makes cleanup conversations more targeted and reduces the need to investigate ownership through separate systems.

**How to access:** Export the inactive agents CSV from the Agents administration or insights experience and review the new column.

Agent Insights

* * *

#### Preserve approval settings while editing tool selections[​](#preserve-approval-settings-while-editing-tool-selections "Direct link to Preserve approval settings while editing tool selections")

Agent Builder now retains Run without approval settings when you edit actions in a selected action pack or change the tools selected for an MCP server. This prevents an edit to the tool list from unexpectedly resetting an intentional approval choice. Newly added action packs and MCP servers still start with Run without approval turned off, so builders must explicitly enable the setting for new additions.

**How to access:** Open an agent’s action pack or MCP configuration in Agent Builder, then edit its tools. Review the approval setting before saving changes.

Agent Builder

* * *

#### Complete support-agent forms with less clutter[​](#complete-support-agent-forms-with-less-clutter "Direct link to Complete support-agent forms with less clutter")

Support agents now show automatically captured ticket-page content as a compact, non-editable pill instead of placing the full captured content directly in the form. The complete context is still sent when the agent runs. Forms also place focus on the first empty field, so you can begin entering the information the agent actually needs without moving past prefilled context. This makes browser-based support workflows easier to scan and faster to complete.

**How to access:** Open a supported Zendesk, Salesforce Service Cloud, or ServiceNow page with the Glean Browser Extension, then open the Agents tab.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar#agents) Glean Extension

* * *

#### Make agent status notifications clearer[​](#make-agent-status-notifications-clearer "Direct link to Make agent status notifications clearer")

Agent Builder notifications now state the outcome of the action that occurred. Publishing, sending an agent for review, and approving or rejecting a review each display a corresponding success message. Import failures are now reported as errors instead of warnings, making it easier to distinguish a completed action from a problem that needs attention. These clearer messages reduce uncertainty during publishing and review workflows, especially when several changes are being made in sequence.

**How to access:** No action is required. The updated messages appear automatically in Agent Builder when you publish, review, approve, reject, or import an agent.

Agent Builder

* * *

#### Search large app lists more easily[​](#search-large-app-lists-more-easily "Direct link to Search large app lists more easily")

The Agent Builder app-selection dropdown now supports search. When many Teams or Slack apps are available, enter an app name to narrow the list instead of scrolling through every option. This reduces the time required to configure an agent for a specific app and makes the selection experience more manageable for organizations with multiple connected workspaces or channels.

**How to access:** Open the app-selection dropdown in Agent Builder and enter the name of the Teams or Slack app you want to select.

Agent Builder

* * *

#### Run eligible MCP tools in the background[​](#run-eligible-mcp-tools-in-the-background "Direct link to Run eligible MCP tools in the background")

MCP tools now support background execution by default. This allows eligible tool calls to continue without blocking an interactive flow, while administrators retain control through each tool’s Background Execution Policy. You can disable background execution when a tool needs to remain synchronous or requires closer review. The setting is applied per tool, so teams can choose a different execution policy for different connected capabilities.

**How to access:** Administrators can review each MCP tool’s Background Execution Policy from the MCP server configuration and disable background execution when needed.

MCP

* * *

#### Allow eligible Composio writes to run without a confirmation click[​](#allow-eligible-composio-writes-to-run-without-a-confirmation-click "Direct link to Allow eligible Composio writes to run without a confirmation click")

Administrators can now allow Composio write tools to run in the background without manual confirmation by default. Existing policies remain unchanged, and administrators continue to control the behavior through each tool’s Background Execution Policy. This can shorten workflows where a write is already governed and does not need an additional confirmation step, while preserving the ability to require confirmation for higher-risk actions.

**How to access:** Configure the Background Execution Policy for the relevant Composio write tool. Agent creators can then use the eligible action in an interactive agent.

Actions

* * *

#### Separate host-app setup from MCP server management[​](#separate-host-app-setup-from-mcp-server-management "Direct link to Separate host-app setup from MCP server management")

The Glean MCP servers administration page now opens with separate Host apps and MCP servers tabs. Host apps show where connected clients are configured and used, while MCP servers provide the server and tool-management workflow. Separating these concepts makes it easier for administrators to find setup information, review usage, and manage the right object without navigating through a combined page.

**How to access:** Open the Glean MCP servers page in the Admin Console and choose the Host apps or MCP servers tab.

MCP

* * *

#### Add Skills tools to selected MCP servers[​](#add-skills-tools-to-selected-mcp-servers "Direct link to Add Skills tools to selected MCP servers")

Administrators can add Glean’s Skill tools—`find_skills`, `read_skill_files`, and `run_tool`—to an MCP server. Connected MCP clients can then discover relevant skills on demand and run their underlying tools without loading the full catalog up front. The tools are opt-in per server and are not enabled automatically, giving administrators control over which clients can discover and execute skills through each MCP connection.

**How to access:** Open an MCP server in the Admin Console, choose the Skill tools pack from the tool catalog, and save the server configuration.

MCP

* * *

#### Find Glean content through DocuSign MCP[​](#find-glean-content-through-docusign-mcp "Direct link to Find Glean content through DocuSign MCP")

DocuSign MCP is now generally available through Glean’s managed MCP catalog using DocuSign’s production server and OAuth endpoints. This gives administrators a production connection path for DocuSign workflows through the managed catalog. Connections created during the beta period may still point to the earlier environment, so they may need to be recreated or re-authenticated before they use the production endpoints.

**How to access:** Open the managed MCP catalog, select DocuSign, and complete the OAuth connection flow. If you connected during beta and experience an issue, recreate or re-authenticate the connection.

Docusign MCP

* * *

#### Make streamed chat responses feel smoother[​](#make-streamed-chat-responses-feel-smoother "Direct link to Make streamed chat responses feel smoother")

Chat responses now use a subtle fade-in animation as new text streams into the conversation. The change keeps the existing generation indicator while making the response feel less abrupt as it appears. It does not change the answer content, model behavior, or response timing; it is a presentation improvement intended to make active generation easier to follow and the overall chat experience more polished.

**How to access:** No action is required. The animation appears automatically while new Assistant text streams into a chat.

Assistant

* * *

#### Give OAuth clients authorized access to Skills APIs[​](#give-oauth-clients-authorized-access-to-skills-apis "Direct link to Give OAuth clients authorized access to Skills APIs")

Dynamically registered OAuth clients can now request the Skills scope when they need authorized access to Glean’s Skills APIs. This provides a more precise permission boundary for integrations that discover or use skills, without requiring broader access than the client needs. Existing clients are unaffected unless they need Skills API access; those clients should update their registration request and consent configuration to include the new scope.

**How to access:** Update the dynamic OAuth client registration to request the Skills scope, then complete the normal authorization flow.

Skills API

* * *

#### Resolve skill access more efficiently[​](#resolve-skill-access-more-efficiently "Direct link to Resolve skill access more efficiently")

Skill access checks now use an optimized permission filter by default. The change improves how Glean resolves which skills are available to a user while preserving the intended access rules. Users and administrators should see the same permission outcomes, with a more efficient path used behind the scenes when Glean evaluates accessible skills.

**How to access:** No action is required. Skill availability continues to follow your existing permissions and sharing settings.

Skills

* * *

#### Match exported LLM token counts to billing[​](#match-exported-llm-token-counts-to-billing "Direct link to Match exported LLM token counts to billing")

Exported LLM event data now reports cache-adjusted input-token counts, matching the values used for billing and Agent event exports. This prevents the raw and cache-related token buckets from overlapping and making manual cost calculations appear higher than the billed amount. The change does not alter the underlying cost calculation; it makes the exported data reflect the same adjusted input count used by pricing.

**How to access:** No action is required. Use the updated input-token count in exported LLM event data when performing manual usage or cost analysis.

LLM Usage

* * *

## Fixes[​](#fixes "Direct link to Fixes")

#### Reduce false positives when reviewing pasted or quoted text[​](#reduce-false-positives-when-reviewing-pasted-or-quoted-text "Direct link to Reduce false positives when reviewing pasted or quoted text")

AI Security guardrails now better distinguish a genuine prompt-injection attempt from text you are pasting, quoting, or reviewing. This reduces false positives for configuration files, security documentation, assistant responses, and ordinary business questions while preserving detection for concealed or agent-directed attacks. Findings also provide more useful investigation context by showing the triggering text, its source and location, and the potential impact on an agent.

Protect

* * *

#### Keep ServiceNow search text out of request URLs[​](#keep-servicenow-search-text-out-of-request-urls "Direct link to Keep ServiceNow search text out of request URLs")

ServiceNow search inputs are now sent in the request body rather than the URL. Search behavior and supported inputs remain unchanged, while search text and related parameters are less likely to be retained in load-balancer access logs. This reduces exposure of potentially sensitive business information and personal data during normal ServiceNow searches.

ServiceNow

* * *

#### Prevent GitLab access changes from removing valid memberships[​](#prevent-gitlab-access-changes-from-removing-valid-memberships "Direct link to Prevent GitLab access changes from removing valid memberships")

GitLab identity updates now preserve crawl-scope information so memberships populated by a dedicated crawl are not incorrectly removed by a simple identity run. This addresses a race condition that could cause some users to lose access to GitLab documents and makes access updates more reliable when multiple identity crawls are active.

GitLab

* * *

#### Index Notion pages that previously disappeared from search[​](#index-notion-pages-that-previously-disappeared-from-search "Direct link to Index Notion pages that previously disappeared from search")

Some Notion pages could be silently omitted from the search index when an internal document-processing path encountered missing chunk metadata. The parser now handles that case safely, allowing affected pages to be indexed instead of being dropped. This restores discoverability for pages that were present in Notion but did not appear in Glean search.

Notion

* * *

#### Keep SharePoint crawling reliable with many custom columns[​](#keep-sharepoint-crawling-reliable-with-many-custom-columns "Direct link to Keep SharePoint crawling reliable with many custom columns")

SharePoint site-page crawling now selects only the fields required by Glean when custom columns are not configured. This avoids requests that fail when a list contains a large number of unsupported custom columns, allowing the crawl to continue and making site-page content more reliable to index.

Sharepoint

* * *
