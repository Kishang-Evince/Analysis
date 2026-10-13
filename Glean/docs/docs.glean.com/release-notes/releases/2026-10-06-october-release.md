---
url: "https://docs.glean.com/release-notes/releases/2026-10-06-october-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-10-06-october-release"
title: "October 06, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:33.473Z"
---
On this page

**Release version:** `560`

This release brings GPT-6.1 Sol to Glean, moves the Showpad connector to general availability, opens the Vitally connector beta, and redesigns the Assistant model picker with cost and intelligence ratings. The Glean browser extension now opens in your browser's native side panel, and the release also delivers admin setup improvements, security hardening, and reliability fixes.

## Major launches[​](#major-launches "Direct link to Major launches")

#### Showpad connector now generally available[​](#showpad-connector-now-generally-available "Direct link to Showpad connector now generally available")

The Showpad connector is now generally available, and the Beta label has been removed from the setup experience. Connect Showpad to make your sales enablement content findable in Glean alongside the rest of your company knowledge. The connector supports federated search and fetch with per-user permissions, so each person sees only the Showpad content they already have access to — results stay permissions-aware without extra configuration.

**How to access:** Admins can add Showpad from the **Add data source** page in the Admin console.

[Learn more](https://docs.glean.com/connectors/native/showpad/) Connectors *\[ROAD-1504\]*

#### Vitally connector now in open beta[​](#vitally-connector-now-in-open-beta "Direct link to Vitally connector now in open beta")

The Vitally connector is now available in open beta. Connect Vitally to bring your customer success data — accounts, notes, and conversations — into Glean search and Assistant, so customer-facing teams can find what they need without switching tools. As an open beta, the connector is still evolving, and your feedback helps shape what ships at general availability.

**How to access:** Admins can add Vitally from **Admin console → Connectors** and connect their Vitally workspace. No Glean enablement request is needed.

[Learn more](https://docs.glean.com/connectors/native/vitally/) Connectors *\[ROAD-1731\]*

#### Glean browser extension opens in your browser's side panel[​](#glean-browser-extension-opens-in-your-browsers-side-panel "Direct link to Glean browser extension opens in your browser's side panel")

The Glean browser extension now opens in your browser's native side panel instead of overlaying the page. It stays beside page content and remains open as you navigate between tabs, so you can keep Glean search and Assistant alongside whatever you're working on. The side panel experience is currently in beta.

**How to access:** Admins can turn on the side panel experience for their organization from the **Feature rollouts** page in the Admin console.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar) Platform *\[ROAD-1693\]*

#### Redesigned model picker in Assistant[​](#redesigned-model-picker-in-assistant "Direct link to Redesigned model picker in Assistant")

Glean Assistant's model picker has been redesigned to show cost and intelligence ratings, plus short notes about what each model is best at. Instead of guessing which model fits your task, you can compare options at a glance and pick the right balance of speed, capability, and cost. The redesigned picker is now available by default for everyone.

**How to access:** Open the model picker in the Assistant composer. No admin action is needed.

Assistant

## AI & model updates[​](#ai--model-updates "Direct link to AI & model updates")

#### GPT-6.1 Sol in Assistant and Agents[​](#gpt-61-sol-in-assistant-and-agents "Direct link to GPT-6.1 Sol in Assistant and Agents")

GPT-6.1 Sol, a new OpenAI model, is now live for supported Glean experiences, giving you another premium model option in Assistant and Agents. Availability depends on your deployment's model key setup: deployments on the Glean Universal Model Key get access managed by Glean, while deployments using customer-provided keys need their own OpenAI credentials for the model.

**How to access:** Select GPT-6.1 Sol from the model picker in Assistant or on supported Agent steps where it's enabled. Admins control model availability in the Admin console.

Assistant *\[ROAD-1756\]*

## Critical updates[​](#critical-updates "Direct link to Critical updates")

#### Task update API now changes only status and execution feedback[​](#task-update-api-now-changes-only-status-and-execution-feedback "Direct link to Task update API now changes only status and execution feedback")

The task update endpoint `PUT /api/v1/tasks/{task_id}` now updates only a task's status and execution-feedback tracking. Other task details — such as title, description, assignee, and dates — are preserved and can no longer be edited through this endpoint, and empty or invalid requests now return an error. This is a breaking change for integrations that edit other task fields through this endpoint.

**How to access:** No action needed unless your integration edits other task details through this endpoint. If it does, migrate it to update only status and execution feedback.

Platform

#### Deny-all protection for unconfigured GCP endpoints[​](#deny-all-protection-for-unconfigured-gcp-endpoints "Direct link to Deny-all protection for unconfigured GCP endpoints")

Google Cloud Platform (GCP) deployments now apply a deny-all Cloud Armor policy to external Google Kubernetes Engine (GKE) default HTTP backends during web application firewall deployment. Requests routed to those catch-all backends receive an HTTP 403 response. Configured application routes and internal ingress behavior remain unchanged, so normal Glean traffic is unaffected.

**How to access:** No action needed. The protection applies automatically to GCP deployments.

Platform

#### Tighter rate limits protect search performance[​](#tighter-rate-limits-protect-search-performance "Direct link to Tighter rate limits protect search performance")

Rate limiting for OpenSearch is now tighter on deployments that use centralized rate limiting, preventing request spikes that could degrade search performance. Only deployments with centralized rate limiting for OpenSearch are affected.

**How to access:** No action needed. The updated limits apply automatically on affected deployments.

Platform

## Deprecations & sunsets[​](#deprecations--sunsets "Direct link to Deprecations & sunsets")

#### Web SDK Chat option applicationId is deprecated[​](#web-sdk-chat-option-applicationid-is-deprecated "Direct link to Web SDK Chat option applicationId is deprecated")

The Web software development kit (SDK) Chat option `applicationId` is deprecated. AI Applications were deprecated in August 2025 and were migrated to Agents, so use `agentId` instead when embedding Glean Chat.

**How to access:** Update Web SDK Chat embeds that still pass `applicationId` to use `agentId`.

[Learn more](https://docs.glean.com/release-notes/sunset/) Platform

#### Built-in skill-creation guides removed from MCP skill discovery[​](#built-in-skill-creation-guides-removed-from-mcp-skill-discovery "Direct link to Built-in skill-creation guides removed from MCP skill discovery")

Model Context Protocol (MCP) clients no longer receive Glean's built-in create-skill and create-skill-lite guides from the skill discovery tool. Creating a skill in Glean Assistant is unchanged.

**How to access:** No action needed. Skill creation in Glean Assistant works as before.

Glean MCP

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Manage ServiceNow object crawling from the Objects table[​](#manage-servicenow-object-crawling-from-the-objects-table "Direct link to Manage ServiceNow object crawling from the Objects table")

ServiceNow administrators can now enable or disable crawling for configured native and custom objects directly from the Objects table, while preserving each object's mappings and settings. Native objects saved as enabled can also crawl even when their corresponding legacy object flag remains disabled, so you can manage crawl scope in one place without reconfiguring objects.

**How to access:** Admins manage crawling from the Objects table in the ServiceNow connector settings.

Connectors

#### Setup suggestions on the admin dashboard[​](#setup-suggestions-on-the-admin-dashboard "Direct link to Setup suggestions on the admin dashboard")

Admins now see actionable connector and tool setup suggestions on the admin dashboard, making it easier to spot and complete the next most valuable setup steps for their deployment.

**How to access:** Open the dashboard in the Admin console. Suggestions appear automatically.

Admin Capabilities

#### Assistant renders inline math[​](#assistant-renders-inline-math "Direct link to Assistant renders inline math")

Glean Assistant now renders inline math expressions — for example, x² + y² = r² — within a sentence instead of showing raw LaTeX markup. Dollar amounts like "$5 and $10" continue to display as plain text, so everyday answers aren't affected.

**How to access:** No action needed. Math rendering applies automatically in Assistant responses.

Assistant

#### See your Microsoft 365 upload destination[​](#see-your-microsoft-365-upload-destination "Direct link to See your Microsoft 365 upload destination")

The Microsoft 365 upload action now shows the selected OneDrive or SharePoint destination both during setup and after saving, so you can confirm exactly where uploaded files will go before and after you configure the action.

**How to access:** The destination appears in the Microsoft 365 upload action's setup and saved configuration views.

Actions

#### Updated Superhuman Docs logo[​](#updated-superhuman-docs-logo "Direct link to Updated Superhuman Docs logo")

The Superhuman Docs connector — formerly Coda — now shows the updated Superhuman Docs logo throughout the setup experience.

**How to access:** No action needed. The updated logo appears automatically.

Connectors

#### Usage page tabs ordered by usage[​](#usage-page-tabs-ordered-by-usage "Direct link to Usage page tabs ordered by usage")

Application tabs on the Usage page are now ordered by usage for the selected month, so your organization's most-used applications are easier to find.

**How to access:** Open the Usage page in the Admin console. Tabs are reordered automatically for the selected month.

Admin Capabilities

#### Search Google Drive file descriptions and custom properties[​](#search-google-drive-file-descriptions-and-custom-properties "Direct link to Search Google Drive file descriptions and custom properties")

Google Drive search now supports facets for file descriptions and custom properties, making these metadata values searchable in indexed documents. Teams that use Drive metadata to organize content can now filter and find files by those values in Glean.

**How to access:** No action needed. The new facets apply automatically as Google Drive content is indexed.

Connectors

#### Usage limit and evaluation APIs accept email addresses[​](#usage-limit-and-evaluation-apis-accept-email-addresses "Direct link to Usage limit and evaluation APIs accept email addresses")

The experimental usage limit and evaluation APIs now accept a user's email address anywhere a user ID is accepted, and they return the user's email alongside the user ID in responses. This makes the APIs easier to use with systems that identify people by email.

**How to access:** Pass an email address in place of a user ID in the experimental usage limit and evaluation APIs.

Platform

#### Clearer Power BI setup instructions[​](#clearer-power-bi-setup-instructions "Direct link to Clearer Power BI setup instructions")

Power BI connector setup now shows instructions for the selected indexing or tools step, so you see only the guidance that applies to what you're configuring.

**How to access:** Open the Power BI connector setup in the Admin console. Step-specific instructions appear as you move through setup.

Connectors

#### Let Glean manage the scheduled refresh rollout for interactive artifacts[​](#let-glean-manage-the-scheduled-refresh-rollout-for-interactive-artifacts "Direct link to Let Glean manage the scheduled refresh rollout for interactive artifacts")

Admins can now let Glean manage the rollout of scheduled refresh for interactive artifacts, starting no earlier than October 22, 2026. If you've already chosen an audience for the capability, your existing choices remain respected — opting into the managed rollout only hands the pacing to Glean.

**How to access:** Admins opt in from the scheduled refresh rollout setting in the Admin console.

Admin Capabilities *\[ROAD-1574\]*

#### Dedicated token scopes for limit-increase requests[​](#dedicated-token-scopes-for-limit-increase-requests "Direct link to Dedicated token scopes for limit-increase requests")

Dedicated token scopes for usage limit-increase requests now separate ordinary request submissions from billing decisions, so existing admin, agent, and usage grants gain no new request authority. Availability still requires the request API rollout and your current resource permissions.

**How to access:** Grant the new limit-increase request scopes to tokens that should submit or decide requests, once the request API is rolled out to your deployment.

Platform

#### SharePoint group site discovery works with split credentials[​](#sharepoint-group-site-discovery-works-with-split-credentials "Direct link to SharePoint group site discovery works with split credentials")

SharePoint group site discovery now succeeds when the Microsoft 365 identity app lacks site enumeration access but the SharePoint app has it. Glean routes discovery through the app that holds the permission, so split-credential setups no longer miss group sites.

**How to access:** No action needed. The fix applies automatically to affected Microsoft 365 configurations.

Connectors

#### Hardened prompt enhancement in Agent Builder[​](#hardened-prompt-enhancement-in-agent-builder "Direct link to Hardened prompt enhancement in Agent Builder")

The AI prompt-enhancement feature in Agent Builder is now more robust against malicious instruction inputs, improving protection against prompt injection.

**How to access:** No action needed. The hardening applies automatically.

Agents

#### Safer group name handling for custom data sources[​](#safer-group-name-handling-for-custom-data-sources "Direct link to Safer group name handling for custom data sources")

Group names in custom data source identity operations are now handled more safely, improving the security of identity management for custom data sources.

**How to access:** No action needed. The improvement applies automatically.

Platform

#### GCP deployments honor operation skip settings[​](#gcp-deployments-honor-operation-skip-settings "Direct link to GCP deployments honor operation skip settings")

GCP deployments now honor operation skip settings when running through the Cloud Run deployment service, so configured skips are respected consistently across deployment paths.

**How to access:** No action needed. Existing skip settings are honored automatically.

Platform

## Fixes[​](#fixes "Direct link to Fixes")

#### Oversized artifact saves no longer corrupt content[​](#oversized-artifact-saves-no-longer-corrupt-content "Direct link to Oversized artifact saves no longer corrupt content")

Saves that exceed storage capacity are now rejected safely, preserving the previous version instead of corrupting saved content.

Assistant

#### Canvas task lists keep text and checkbox state[​](#canvas-task-lists-keep-text-and-checkbox-state "Direct link to Canvas task lists keep text and checkbox state")

Canvas task-list text and checkbox state are now preserved when saving collaborative documents.

Assistant

#### Sub-agents receive all AI-generated inputs[​](#sub-agents-receive-all-ai-generated-inputs "Direct link to Sub-agents receive all AI-generated inputs")

Agents that hand off to a sub-agent with AI-generated inputs no longer fail with input-generation errors when the model lists inputs on separate lines. All planned inputs are passed to the sub-agent, so these agents complete without manual workarounds.

Agents

#### Slack requests route to the right deployment[​](#slack-requests-route-to-the-right-deployment "Direct link to Slack requests route to the right deployment")

Fixed Slack routing for organizations whose Slack Enterprise Grid spans multiple Glean deployments, preventing spurious sign-in errors from deployments that don't own the workspace.

Connectors

#### ServiceNow setup respects deselected content types[​](#servicenow-setup-respects-deselected-content-types "Direct link to ServiceNow setup respects deselected content types")

ServiceNow connector setup with OAuth now respects the content types an admin deselects, and setup no longer fails on instances without the ServiceNow Content Publishing application when those types are turned off.

Connectors
