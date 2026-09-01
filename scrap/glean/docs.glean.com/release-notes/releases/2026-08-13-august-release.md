---
url: "https://docs.glean.com/release-notes/releases/2026-08-13-august-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-08-13-august-release"
title: "August 13, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:54.451Z"
---
On this page

This release adds a new fast model, expands agent administration and safety controls, improves connector reliability, and resolves several customer-impacting workflow issues.

* * *

## AI & Model Updates[​](#ai--model-updates "Direct link to AI & Model Updates")

#### Get faster, more capable responses with Gemini 3.7 Flash[​](#get-faster-more-capable-responses-with-gemini-37-flash "Direct link to Get faster, more capable responses with Gemini 3.7 Flash")

Gemini 3.7 Flash is now available as a model option in Glean Assistant and Agents. It is designed for high-volume, tool\-using workflows where response speed matters, while providing stronger performance for well-scoped reasoning and coding tasks. The model is available across Glean Universal Model Key and Customer Key deployments covered by the supported release version. Gemini 3.7 Flash appears as a premium model, while earlier Flash models remain available in the model picker for teams that need them.

**How to access:** Open the model selector in Assistant or choose a model when configuring an agent. Administrators can exclude the model from **Admin Console → Platform → Models** if their organization does not want it available.

Assistant & Agents *\[ROAD-1647\]*

* * *

#### Improve Fast Mode responses with GPT-5.6 Luna[​](#improve-fast-mode-responses-with-gpt-56-luna "Direct link to Improve Fast Mode responses with GPT-5.6 Luna")

Fast Mode now uses GPT-5.6 Luna with low reasoning instead of the previous lightweight model. You should see improved answer quality while retaining the quick response experience that Fast Mode is designed to provide. No workflow changes are required: existing Fast Mode conversations and entry points continue to work, and the model change is applied automatically as the updated default becomes available.

**How to access:** Select Fast Mode in Assistant as usual. No administrator or end-user action is required.

Assistant

* * *

#### Give admins control over agent default models[​](#give-admins-control-over-agent-default-models "Direct link to Give admins control over agent default models")

Administrators can configure the default model set used by agent steps, giving teams more control over the models selected across agent types and supported modes. This helps organizations establish a consistent baseline for agent behavior instead of relying only on product defaults. The setting applies where the selected mode supports the configured model set; individual agent or step configuration can continue to determine behavior where those controls are available.

**How to access:** Administrators can use the deployment’s agent model configuration controls to set the default model set. No action is required from end users unless their administrator changes the organization’s defaults.

Agents

* * *

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Open chat side panels without text reflow[​](#open-chat-side-panels-without-text-reflow "Direct link to Open chat side panels without text reflow")

Chat side panels, including artifact and source panels, now open and close with smoother transitions. The panel reaches its final width immediately while its contents animate in place, so the conversation no longer repeatedly resizes or rewraps as the panel appears. Closing a panel also returns you directly to the main conversation view without intermediate layout shifts. This makes it easier to keep your place while reviewing sources, working with artifacts, or moving between the conversation and supporting content on web and mobile.

**How to access:** Open an artifact or chat source panel from a conversation. The improved behavior is automatic; no settings change is required.

Chat

* * *

#### Control staged agent review request emails[​](#control-staged-agent-review-request-emails "Direct link to Control staged agent review request emails")

Moderators can now opt out of staged agent review request emails through their collaboration email notification settings. This gives moderation teams more control over review-request traffic while preserving the messages needed to keep agents reviewed.

**How to access:** Update collaboration email preferences for moderation notifications in your notification settings. No action is needed if you want to keep receiving these messages.

Notifications

* * *

#### See agent risk posture more clearly in Agent Scan[​](#see-agent-risk-posture-more-clearly-in-agent-scan "Direct link to See agent risk posture more clearly in Agent Scan")

The Agent Scan experience now gives administrators a clearer view of agent risk. The dashboard separates Critical and High risk counts, combines Medium and Low risk agents into a simpler summary, and exposes the counts needed for the risk overview. Filters are also easier to use: Creator is a compact searchable single-select control, Risk supports multiple selections, and policy status styling is consistent across the admin experience. Policy audiences now show names for individual people or groups and reveal the full recipient list on hover.

**How to access:** Open the admin Agent Guardrails page and use the Agent Scan dashboard, filters, and policy audience details. No end-user action is required.

Protect

* * *

#### Understand agent permissions before activation[​](#understand-agent-permissions-before-activation "Direct link to Understand agent permissions before activation")

Before you activate an agent, the permissions screen now explains what each tool can do and whether it may act without asking for approval. Tools are identified as read-only, able to run without approval, or requiring approval. MCP servers also show whether all, some, or none of their enabled write tools can run unattended. The display follows administrator approval policies, so a tool that an administrator requires to pause will be shown as requiring approval even when the agent’s own configuration requests otherwise.

**How to access:** Open an agent that uses tools or MCP servers and review the permissions screen before activating it. No configuration change is required.

Agents

* * *

#### Separate read and write tools for MCP servers[​](#separate-read-and-write-tools-for-mcp-servers "Direct link to Separate read and write tools for MCP servers")

When you build or review an agent, each MCP server’s capabilities are now separated into **Read tools** and **Write tools** with individual counts. This makes it easier to see whether a server can only retrieve information or can also change data. The layout also makes the write-tool approval control easier to understand, and the control is hidden when a server has no enabled write tools. Selecting or removing a tool in one section does not change the selections in the other section.

**How to access:** Open an agent’s **Capabilities** tab and expand an MCP server. Review or adjust the Read tools and Write tools selections there.

Agents

* * *

#### Share meeting notes and imported summaries directly from the artifact[​](#share-meeting-notes-and-imported-summaries-directly-from-the-artifact "Direct link to Share meeting notes and imported summaries directly from the artifact")

Artifact owners can now use the Share action directly from the header of meeting notes and imported meeting summaries, even when the original chat thread is no longer available. This gives owners a reliable way to share the artifact itself without needing to reopen or locate the conversation that created it. In cases where no linked chat thread exists, the Chat action remains hidden so the available actions accurately reflect what you can use.

**How to access:** Open a meeting note or imported meeting summary that you own, then select **Share** from the artifact header.

Artifacts

* * *

#### Retrieve schemas for Glean-native tools through the Tool Metadata API[​](#retrieve-schemas-for-glean-native-tools-through-the-tool-metadata-api "Direct link to Retrieve schemas for Glean-native tools through the Tool Metadata API")

Clients can now retrieve input schemas and descriptions for Glean-native tools through the Tool Metadata API. This helps integrations understand the inputs expected by native capabilities such as Meeting Lookup before invoking them. Existing action-pack and external MCP behavior remains unchanged, so current integrations do not need to change how they use those tools. The improvement is especially useful for clients that need to inspect tool definitions dynamically while building or running agent workflows.

**How to access:** Use the Tool Metadata API when your client needs the input schema or description for a Glean-native tool. No end-user action is required.

Agents

* * *

#### Restore full insights visibility for Insights Moderators[​](#restore-full-insights-visibility-for-insights-moderators "Direct link to Restore full insights visibility for Insights Moderators")

Insights Moderators can again view insights for all agents, including agents they do not own or edit. This restores the broader visibility needed by moderation and oversight teams to review agent activity across an organization rather than being limited to agents associated with their own accounts. Agent owners and regular users do not need to change their sharing settings for this access to work.

**How to access:** Sign in with an Insights Moderator role and open the agent insights experience. Access is controlled by your organization’s role assignment.

Insights

* * *

#### Keep MCP moderation focused on Glean-hosted servers[​](#keep-mcp-moderation-focused-on-glean-hosted-servers "Direct link to Keep MCP moderation focused on Glean-hosted servers")

MCP Server Moderators are now limited to administering Glean-hosted MCP servers and viewing MCP Insights. Managing third-party MCP connections—including creating, updating, deleting, refreshing, or repairing third-party hosts and accessing their templates—continues to require the existing tool-administration permissions. This keeps moderation responsibilities aligned with the surfaces they are intended to govern while preserving established controls for external connections.

**How to access:** MCP Server Moderators can use the Glean-hosted MCP administration and MCP Insights surfaces. Ask an administrator for tool-administration permissions when third-party MCP management is required.

MCP

* * *

#### Find recent Outlook mail sooner[​](#find-recent-outlook-mail-sooner "Direct link to Find recent Outlook mail sooner")

New or changed Outlook messages delivered through webhooks are now prioritized ahead of background full-refresh crawls in the mailbox thread queue. As a result, recent mail can become searchable sooner without interrupting other mailbox crawl operations. This is an automatic indexing improvement: it does not change how users search Outlook, and it does not require administrators to reconfigure the connector.

**How to access:** Search Outlook content in Glean as usual. No user or administrator action is required.

Outlook

* * *

#### Improve OneDrive and SharePoint crawl reliability[​](#improve-onedrive-and-sharepoint-crawl-reliability "Direct link to Improve OneDrive and SharePoint crawl reliability")

OneDrive and SharePoint crawls now use more efficient exact-key batch deletion when cleaning up delta results. This reduces the chance of slowdowns or stalls on large drives and helps keep connector processing predictable as content changes over time. The improvement is applied to the crawl process automatically and does not change the way users search or access content.

**How to access:** Continue using OneDrive and SharePoint connectors normally. No user or administrator action is required.

OneDrive & SharePoint

* * *

#### Capture user intent for MCP usage analysis[​](#capture-user-intent-for-mcp-usage-analysis "Direct link to Capture user intent for MCP usage analysis")

MCP tool calls now capture the user’s intent for usage logging and downstream analysis. This gives organizations better context for understanding why MCP tools are used, supporting more useful operational and adoption analysis. The change does not alter the tool’s result or require users to provide a new form field outside the MCP interaction. Intent capture is handled as part of the MCP tool-call experience and its associated usage logging.

**How to access:** No action is required. Intent information is captured automatically for supported MCP tool calls.

MCP

* * *

## Fixes[​](#fixes "Direct link to Fixes")

#### Hosted Excel, Outlook, SharePoint, and Teams actions are more reliable[​](#hosted-excel-outlook-sharepoint-and-teams-actions-are-more-reliable "Direct link to Hosted Excel, Outlook, SharePoint, and Teams actions are more reliable")

Hosted Composio actions for Excel, Outlook, SharePoint, and Teams are now more reliable. An infrastructure issue could previously cause intermittent failures when these actions were used in hosted workflows. Reliability protections have been improved so the supporting service is less likely to become unavailable during periods of platform pressure. Existing workflows continue to work without changes, and no action is required from users or administrators.

Actions

* * *

#### ServiceNow Create Request forms load correctly[​](#servicenow-create-request-forms-load-correctly "Direct link to ServiceNow Create Request forms load correctly")

ServiceNow Create Request no longer fails with “Failed to fetch action data” after you select a catalog when the action has no catalog restriction configured. The form now proceeds to the catalog-item step when no specific allowlist is set, while configured catalog restrictions continue to be enforced. This restores the expected request-creation flow without requiring administrators to add an unnecessary catalog restriction.

ServiceNow

* * *

#### Sign in to the Android app with Intune MAM policies[​](#sign-in-to-the-android-app-with-intune-mam-policies "Direct link to Sign in to the Android app with Intune MAM policies")

Android sign-in now works more reliably for organizations using Intune Mobile Application Management, including BYOD devices that are not enrolled in full device management. The flow handles both permissive and restrictive “Receive data from other apps” policies, uses Microsoft Edge when Intune requires a managed browser, and provides clearer guidance when Edge is missing or not recognized as managed. Users without Intune app protection are unaffected.

[Learn more](https://docs.glean.com/administration/management/features/mobile-intune-mam) Glean Mobile

* * *

#### Find identity-provider groups when sharing[​](#find-identity-provider-groups-when-sharing "Direct link to Find identity-provider groups when sharing")

Searching for identity-provider groups, such as Azure AD or Microsoft 365 groups, is now more reliable when sharing an agent, chat, or other item. You can search using text from any part of a group name, and matching groups continue to appear consistently in tenants with many groups. Previously, a group could be omitted unless you typed the full name or started with its exact prefix. The sharing flow and group selection behavior remain unchanged once you find the group.

Sharing

* * *

#### Export and import agents without tool-creation permissions[​](#export-and-import-agents-without-tool-creation-permissions "Direct link to Export and import agents without tool-creation permissions")

Agent export and import now work for users who do not have permission to create tools when the agent uses datasource actions. Previously, the export could fail because an action could not be resolved to a portable name. Actions are now represented with stable names rather than environment-specific identifiers, allowing the workflow to be downloaded and reused correctly without granting additional tool-creation permissions.

Agents

* * *
