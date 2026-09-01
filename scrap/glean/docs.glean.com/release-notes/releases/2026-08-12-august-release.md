---
url: "https://docs.glean.com/release-notes/releases/2026-08-12-august-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-08-12-august-release"
title: "August 12, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:54.427Z"
---
On this page

> **New cadence:** We’re moving to twice-weekly release notes to match our release cadence, so you’ll know what shipped sooner.

## ✨ Major Launches[​](#-major-launches "Direct link to ✨ Major Launches")

#### Find and reuse your past Assistant chats without leaving the conversation[​](#find-and-reuse-your-past-assistant-chats-without-leaving-the-conversation "Direct link to Find and reuse your past Assistant chats without leaving the conversation")

You can now ask Glean to find and pick up your earlier Assistant conversations directly from a new chat, so you can continue long-running work without hunting through your history. Only your own conversations that are stored in Chat History are surfaced, and existing retention and privacy controls still apply.

**How to access:** In a new Assistant conversation, just ask Glean to find a previous chat (for example, reference what you were working on). Glean surfaces matching conversations from your own Chat History. No setup is required.

Assistant

#### Discover useful next steps directly from Glean Home[​](#discover-useful-next-steps-directly-from-glean-home "Direct link to Discover useful next steps directly from Glean Home")

Glean Home can now surface personalized Cowork suggestions based on your recent work. Each card recommends a concrete next step, such as preparing for a meeting, summarizing a call, drafting a follow-up, or updating a document, and opens the relevant Assistant workflow with context already provided. This helps you discover valuable Glean capabilities without knowing the exact prompt or navigating through multiple product areas. Suggestions are designed around practical work journeys and include source-backed context so you can understand why a recommendation is relevant.

**How to access:** Open Glean Home and select a suggested card when one appears. No admin setup is required for supported Glean Key deployments.

Glean Home *\[ROAD-1444\]*

#### Understand usage by department and support internal chargeback[​](#understand-usage-by-department-and-support-internal-chargeback "Direct link to Understand usage by department and support internal chargeback")

Billing administrators can now see how Glean usage is distributed across departments. The new department view helps you compare consumption, identify teams that are under-adopting or driving the most usage, and export the data for budgeting, chargeback, showback, and internal reporting. Department attribution follows the department metadata available through your identity provider or organization chart, so the view reflects the structure your organization already maintains. This gives finance and platform teams a clearer organizational lens on Glean adoption and consumption.

**How to access:** Open **Admin Console → Usage** and select **By departments**. Use the department table to compare usage or download the data as a CSV.

[Learn more](https://docs.glean.com/administration/management/usage/flexcredits-dashboard#by-departments)

Usage and Billing *\[ROAD-1340\]*

#### Set monthly usage limits for individual departments[​](#set-monthly-usage-limits-for-individual-departments "Direct link to Set monthly usage limits for individual departments")

Billing administrators can now set a monthly usage limit for each department. This lets you align Glean usage with the way your organization manages budgets, give different teams different levels of headroom, and choose between alert-only monitoring and blocking additional billable usage after a limit is reached. Department limits apply to each member of the department rather than creating a shared pool, and individual user overrides remain available for people who need more capacity. Limits reset at the start of each calendar month.

**How to access:** Open **Admin Console → Usage → By departments**, open the department’s actions menu, select **Manage usage limit**, enter the monthly amount, and save. Confirm that department metadata is mapped in your people data.

[Learn more](https://docs.glean.com/administration/management/usage/set-usage-limits-and-alerts#set-limits-within-a-department)

Usage and Billing

#### Delegate work to dynamic sub-agents with Task Tool[​](#delegate-work-to-dynamic-sub-agents-with-task-tool "Direct link to Delegate work to dynamic sub-agents with Task Tool")

Autonomous Agents can now delegate work through the Task Tool by default in supported workflows. This gives an agent a consistent way to create and route work to dynamic sub-agents, support follow-up steps, and use model routing suited to the task. You can use the capability to break a larger workflow into focused pieces while preserving the agent’s permissions and error-handling behavior. The change also removes the need for the previous external experiment path for supported Task Tool workflows.

**How to access:** Create or open a supported autonomous agent and configure a step that delegates work through the Task Tool. The capability is enabled automatically for supported workflows.

Autonomous Agents *\[ROAD-1622\]*

#### Let agents act as themselves with governed service credentials[​](#let-agents-act-as-themselves-with-governed-service-credentials "Direct link to Let agents act as themselves with governed service credentials")

Agent Identity lets an agent use its own scoped service credentials instead of borrowing the identity of the person who invoked it. Actions can therefore appear under the agent’s own account in connected systems, while Glean records the triggering user or schedule separately for auditability. Admins can limit the credential to the tools and data the agent needs, reducing permission sprawl and preventing the agent from inheriting unintended user access. Scheduled and background agents can also continue running without depending on a person’s OAuth session.

**How to access:** An admin creates and scopes a service credential in the target system, registers it in **Admin Console → Agent identity**, and controls its audience. A builder can then attach the credential to an autonomous agent.

[Learn more](https://docs.glean.com/administration/agent-identity)

Agent Identity *\[ROAD-1542\]*

#### Query Databricks Genie from Glean Assistant[​](#query-databricks-genie-from-glean-assistant "Direct link to Query Databricks Genie from Glean Assistant")

Assistant can now route natural-language data questions to Databricks Genie spaces, allowing business users to ask questions about governed Databricks data without leaving Glean. Glean uses indexed Genie space metadata, such as titles, descriptions, sample questions, and table information, to select the best matching space. Direct Databricks SQL remains available as an explicit fallback when requested or when no suitable Genie space is found. Results are returned in Assistant while Databricks permissions continue to control what each user can access.

**How to access:** Your admin must configure the Databricks connector and tools, verify that Genie spaces are indexed, and enable the Databricks tools for Chat under **Admin Console → Platform → Tools**. Then ask Assistant a question about your Databricks data.

[Learn more](https://docs.glean.com/administration/assistant/warehouse-data/connect-databricks-genie-to-glean-assistant)

Databricks in Assistant

#### Catch up on the last two minutes of a live meeting in one click[​](#catch-up-on-the-last-two-minutes-of-a-live-meeting-in-one-click "Direct link to Catch up on the last two minutes of a live meeting in one click")

When you join a live meeting late or lose track of the discussion, Meeting Notes can now summarize the most recent part of the transcript for you. After the transcript has more than two minutes of content, select **Catch me up** above the composer to get a concise recap of what was just discussed. This helps you rejoin the conversation without asking others to repeat themselves and keeps you focused on the meeting instead of on note-taking. The summary is generated from the live transcript already available in the meeting.

**How to access:** Open a live meeting transcription in Glean desktop. After more than two minutes of transcript are available, select **Catch me up** above the composer. Meeting Notes access is controlled by your admin under **Admin Console → Assistant → Meeting Notes**.

[Learn more](https://docs.glean.com/user-guide/assistant/meeting-notes/transcription-and-consent)

Meeting Notes *\[ROAD-769\]*

## 🤖 AI & Model Updates[​](#-ai--model-updates "Direct link to 🤖 AI & Model Updates")

#### A faster default model for Adaptive Mode, Fast Mode, and Search[​](#a-faster-default-model-for-adaptive-mode-fast-mode-and-search "Direct link to A faster default model for Adaptive Mode, Fast Mode, and Search")

Adaptive Mode, Fast Mode, and Search in Chat now use GPT-5.4-mini as their default model, delivering faster, more efficient responses in these modes.

**How to access:** No action needed — these modes use the new default model automatically.

Assistant

#### Set the default model for workflow agents[​](#set-the-default-model-for-workflow-agents "Direct link to Set the default model for workflow agents")

Admins can now configure the default model set that powers workflow agents, giving teams more control over which model is used for workflow-agent steps.

**How to access:** In the Admin Console, set the default model set for workflow agents in your model configuration.

Agents

#### Choose GPT-5.6 models across Assistant and Agents[​](#choose-gpt-56-models-across-assistant-and-agents "Direct link to Choose GPT-5.6 models across Assistant and Agents")

GPT-5.6 Sol, GPT-5.6 Terra, and GPT-5.6 Luna are now available as premium models across supported Assistant and Agent surfaces. The model hub gives admins control over which models are enabled, while users can choose from the models made available to them when model selection is supported. Luna is initially focused on eligible agent workflows, while Sol and Terra are available in supported model-choice surfaces. Premium models may affect usage-based consumption, so administrators can manage availability according to their organization’s needs and billing policy.

**How to access:** In **Admin Console → Platform → LLMs**, enable the GPT-5.6 models in the Model Hub. Users can then select supported models from the Assistant model picker or Agent model settings.

[Learn more](https://docs.glean.com/administration/llms)

Models

#### Configure AI action models by deployment and workflow[​](#configure-ai-action-models-by-deployment-and-workflow "Direct link to Configure AI action models by deployment and workflow")

Admins can now configure the model used for AI-powered actions with clearer deployment-aware controls. The configuration supports choosing an eligible model, setting visibility for the people who can use the action, and keeping the action aligned with the model availability of the deployment. This helps platform owners balance response quality, cost, and access while giving users a predictable experience when they invoke actions such as summarization, drafting, or other AI-assisted workflows.

**How to access:** Open the relevant action in **Admin Console → Platform → Actions**, select its configuration, and review the available model and visibility settings. The choices shown depend on your deployment and enabled models.

AI Actions

#### Use Claude 4.1 in Assistant[​](#use-claude-41-in-assistant "Direct link to Use Claude 4.1 in Assistant")

Claude 4.1 is now available for supported Assistant experiences, giving users another model option for tasks that benefit from Anthropic’s latest available capabilities. Administrators retain control over whether the model is enabled and which users or workflows can access it. The model appears alongside other configured models rather than changing every user’s existing selection automatically, so teams can evaluate it within their current model governance and usage-management practices.

**How to access:** An admin must enable Claude 4.1 in **Admin Console → Platform → LLMs**. Once enabled for your deployment, select it from the Assistant model picker where model choice is available.

[Learn more](https://docs.glean.com/administration/llms)

Assistant Models

#### Select models separately for individual applications[​](#select-models-separately-for-individual-applications "Direct link to Select models separately for individual applications")

Model selection can now be configured at the application level instead of relying only on one broad deployment setting. This gives administrators more control over which applications can use particular models and helps align model access with the needs, risk profile, and cost expectations of each workflow. Users see only the models made available to the application and audience they are using, so the experience remains governed without requiring every application to expose the full model catalog.

**How to access:** Open **Admin Console → Platform → LLMs** or the relevant application’s model configuration and review the enabled models and visibility settings. Exact options depend on your deployment.

[Learn more](https://docs.glean.com/administration/llms)

Model Administration

#### New Glean Key autonomous agents start with GPT-5.6 Luna[​](#new-glean-key-autonomous-agents-start-with-gpt-56-luna "Direct link to New Glean Key autonomous agents start with GPT-5.6 Luna")

New autonomous agents on Glean Key now use GPT-5.6 Luna as their default model, giving new agents a more capable starting point without requiring you to choose a model during setup. Existing autonomous agents keep their current model settings, so this change does not silently alter agents already in use. Workflow-agent defaults are also unchanged. For administrators, the Glean Key model controls now make the transition clearer: Luna can be enabled while it is off, and GPT-5.4 can be disabled after Luna is enabled. Legacy large and small workflow defaults are no longer presented as default choices for Glean Key.

**How to access:** Create a new autonomous agent to use the new default automatically. To review Glean Key model settings, open **Admin Console → Models** and select the Glean Key model configuration.

[Learn more](https://docs.glean.com/administration/llms)

Agents and Model Administration

## ⚠️ Critical Updates[​](#️-critical-updates "Direct link to ⚠️ Critical Updates")

#### Knowledge Profile searches now surface only company-wide pinned results[​](#knowledge-profile-searches-now-surface-only-company-wide-pinned-results "Direct link to Knowledge Profile searches now surface only company-wide pinned results")

For searches performed with a Knowledge Profile, private and department-scoped pinned results are no longer shown as suggested results; only company-wide pins appear. This keeps pinned suggestions aligned with content that is broadly visible across your organization.

**How to access:** No action needed — this applies automatically. If you previously relied on private or department-scoped pins appearing under a Knowledge Profile, note that only company-wide pins will now surface.

Search

#### Restrict public links to people who already have access[​](#restrict-public-links-to-people-who-already-have-access "Direct link to Restrict public links to people who already have access")

Public-link settings now make it easier to prevent accidental broad sharing. Administrators can choose whether users may create public links and can restrict link creation to specific groups. When restricted sharing is selected, only people who already have access to the underlying content can open the link. This gives organizations a clearer control point for balancing collaboration with information protection and helps prevent a link from becoming an unintended access path to a chat, artifact, or other user-generated content.

**How to access:** Admins can review public-link controls in the organization’s sharing and access settings. End users will see the permitted sharing options when they open a chat or artifact’s share dialog.

Sharing and Permissions

#### Connect MCP hosts with a simpler OAuth consent experience[​](#connect-mcp-hosts-with-a-simpler-oauth-consent-experience "Direct link to Connect MCP hosts with a simpler OAuth consent experience")

Connecting a third-party MCP host to Glean now uses a single, clearer user-facing permission instead of exposing a long technical list of OAuth scopes. The consent screen explains that MCP access operates within your existing permissions and the settings approved by your admin, while Glean narrows the underlying scopes to the resources the host needs. This makes the first connection easier to understand without removing the admin and per-tool controls that govern what the MCP host can access.

**How to access:** Admins who already use the Glean OAuth Authorization Server do not need to change anything. To enable it for a new deployment, open **Admin Console → Settings → Third-party access (OAuth)** and enable **Glean OAuth Server**. Users then connect their MCP host and approve the simplified consent screen.

[Learn more](https://docs.glean.com/administration/oauth/authorization-server)

Glean MCP OAuth

#### Plan for the retirement of Claude Opus 4.1[​](#plan-for-the-retirement-of-claude-opus-41 "Direct link to Plan for the retirement of Claude Opus 4.1")

Claude Opus 4.1 is being retired from Glean model availability. Administrators should review agents, actions, and other workflows that explicitly select this model and move them to a supported replacement before the retirement date. Existing workflows may continue to run during the transition window, but they will need a supported model after the model is removed. Reviewing model usage now helps you avoid unexpected changes to production agents and gives you time to test a replacement under your organization’s access and usage policies.

**How to access:** Open **Admin Console → Platform → LLMs** and review configurations that use Claude Opus 4.1. Choose a supported replacement and save the updated configuration before the retirement deadline shown in your deployment.

[Learn more](https://docs.glean.com/administration/llms)

Model Administration

#### Move workflows off GPT-5.1 before it is retired[​](#move-workflows-off-gpt-51-before-it-is-retired "Direct link to Move workflows off GPT-5.1 before it is retired")

GPT-5.1 is being removed from supported model choices. If an agent, action, or application explicitly depends on GPT-5.1, update that configuration to a supported model before the retirement date. The change is intended to reduce reliance on an older model version while preserving a clear migration path through the Model Hub. Administrators should also review any model-specific prompts, output expectations, or cost assumptions before switching production workflows to a replacement.

**How to access:** Open **Admin Console → Platform → LLMs**, search for GPT-5.1 in your enabled-model and workflow configurations, and select a supported replacement before the retirement deadline shown for your deployment.

[Learn more](https://docs.glean.com/administration/llms)

Model Administration

#### Control application and tool access with clearer admin settings[​](#control-application-and-tool-access-with-clearer-admin-settings "Direct link to Control application and tool access with clearer admin settings")

Administrators now have more consistent controls for managing who can use connected applications, tools, and agent capabilities. Access settings can be applied to users or groups, and the admin experience includes clearer guidance about where a setting takes effect and how it affects end-user visibility. These controls help teams roll out integrations safely, limit sensitive actions to the right audiences, and troubleshoot access without requiring users to guess whether a feature is unavailable or simply restricted by policy.

**How to access:** Open the relevant application, tool, or agent configuration in the Admin Console and review its **Visibility**, **Access**, or **Configuration** settings. Use the available user or group controls to define the intended audience.

Admin Access Controls

#### Admins can control who receives audio artifacts during rollout[​](#admins-can-control-who-receives-audio-artifacts-during-rollout "Direct link to Admins can control who receives audio artifacts during rollout")

Glean Key administrators now have explicit controls for audio artifacts. You can let Glean manage the rollout, enable audio artifacts for everyone, limit them to admins, or turn them off. These controls help you introduce podcast-style audio artifacts at a pace that matches your organization’s privacy, compliance, and adoption requirements. The setting applies to new audio generation; an audio artifact that has already finished generating remains playable even if the setting later changes. If access is revoked while generation is in progress, the generation is stopped cleanly rather than remaining stuck.

**How to access:** Open **Admin Console → Glean Assistant → Settings → Audio artifacts** on a Glean Key deployment, choose the audience setting, and save. Customer Key deployments do not show this setting.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)

Audio Artifacts

#### Delegate MCP administration without granting full admin access[​](#delegate-mcp-administration-without-granting-full-admin-access "Direct link to Delegate MCP administration without granting full admin access")

The MCP Server Moderator role is now enabled by default in deployments that do not provide an explicit override. Administrators can use this role to delegate Glean MCP server management and MCP Insights access without granting broader administrator permissions. The role remains governed by the deployment-level feature setting, so organizations that need a stricter permission model can disable it. This change makes it easier to separate day-to-day MCP administration from organization-wide administrative authority while keeping access controlled through existing role management.

**How to access:** Assign the **MCP Server Moderator** role through your deployment’s Admin Console role and permissions controls. If your deployment explicitly disables the role, it will remain unavailable.

MCP Server Administration

#### Departmental moderators now see the publish action they can actually use[​](#departmental-moderators-now-see-the-publish-action-they-can-actually-use "Direct link to Departmental moderators now see the publish action they can actually use")

Departmental agent moderators now receive an action that matches their publishing scope. When an agent was created outside the departments a moderator oversees, the builder previously displayed **Publish**, even though the publish request would be rejected. The action now appears as **Request to publish**, making the next step clear and avoiding a failed publish attempt. Moderators can still publish agents created within their departments, and organization-wide agent admins are unaffected. This change makes agent governance more predictable for teams that use department-scoped moderation.

**How to access:** Open an agent in the builder as a departmental moderator. The available action is shown in the agent’s publishing controls and reflects the creator’s department and your assigned scope.

Agent Permissions

#### Notifications work without customer-specific enablement[​](#notifications-work-without-customer-specific-enablement "Direct link to Notifications work without customer-specific enablement")

Notifications delivered through Glean’s Notify platform now work by default, removing the need for customer-specific enablement before supported notification workflows can operate. This reduces setup friction for organizations using notification delivery and makes behavior more consistent across deployments. There is no change required for customers who already use the platform. Existing notification configuration and delivery paths continue to apply; the improvement is that the underlying delivery capability is available by default instead of requiring an additional customer-level activation step.

**How to access:** No action is required. Use supported notification workflows as usual; delivery is available automatically through the Notify platform.

Notifications

#### Tableau connections work with older supported REST API versions[​](#tableau-connections-work-with-older-supported-rest-api-versions "Direct link to Tableau connections work with older supported REST API versions")

The Tableau connector now starts with REST API version 3.23 instead of 3.27. This improves compatibility for Tableau Server and Tableau Cloud environments whose maximum supported API version is below 3.27, reducing setup and crawl failures caused by a version mismatch. The change is backward-compatible for environments that support newer Tableau APIs, and it does not require you to change your existing Tableau configuration. Glean continues to use the connector’s supported setup and authentication flow while requesting an API version that works across a broader range of Tableau deployments.

**How to access:** No action is required. Use the Tableau connector setup and crawl workflows normally. Existing configurations continue to use the compatible default.

Tableau Connector

## 🌅 Deprecations & Sunsets[​](#-deprecations--sunsets "Direct link to 🌅 Deprecations & Sunsets")

#### Gemini 3 Pro has been removed[​](#gemini-3-pro-has-been-removed "Direct link to Gemini 3 Pro has been removed")

Gemini 3 Pro has been removed following its March 25, 2026 deprecation date and is no longer available for selection in Assistant or Agents.

**How to access:** If your organization used Gemini 3 Pro, switch any affected Assistant or agent configurations to another available model in the Admin Console.

Models

## 🎨 Enhancements[​](#-enhancements "Direct link to 🎨 Enhancements")

#### Consistent meeting titles across chat, transcripts, Notes, and Summaries[​](#consistent-meeting-titles-across-chat-transcripts-notes-and-summaries "Direct link to Consistent meeting titles across chat, transcripts, Notes, and Summaries")

Meeting titles now stay in sync across chat, transcripts, Notes, and Summaries after you rename a meeting or generate a Summary, so you see the same title everywhere.

**How to access:** No action needed — titles stay consistent automatically.

Meetings

#### Faster data refresh in Canvas artifacts[​](#faster-data-refresh-in-canvas-artifacts "Direct link to Faster data refresh in Canvas artifacts")

Refreshing data in a Canvas artifact is now faster and skips an unnecessary agent interaction when the artifact supports deterministic refresh.

**How to access:** No action needed — refresh is faster automatically for supported artifacts.

Artifacts

#### Spot chats that ran into an error from the left navigation[​](#spot-chats-that-ran-into-an-error-from-the-left-navigation "Direct link to Spot chats that ran into an error from the left navigation")

Conversations that hit an error before finishing now show an error indicator in the left navigation, making it easier to find chats that may need to be retried or reviewed.

**How to access:** No action needed — the indicator appears automatically next to affected chats.

Assistant

#### See read and write tool counts for external MCP servers at a glance[​](#see-read-and-write-tool-counts-for-external-mcp-servers-at-a-glance "Direct link to See read and write tool counts for external MCP servers at a glance")

When choosing external MCP tools in the Admin Console, each server now shows how many read and write tools it provides before you expand it, and servers that provide no tools are no longer listed.

**How to access:** In the Admin Console, open external MCP tool selection to see per-server read and write tool counts.

MCP

#### Choose whether to notify teammates when sharing an agent[​](#choose-whether-to-notify-teammates-when-sharing-an-agent "Direct link to Choose whether to notify teammates when sharing an agent")

When you share an agent with new teammates, you can now decide whether to notify them. A "Notify teammates" checkbox appears whenever you add teammates, so you can alert them to their new access or share quietly.

**How to access:** When sharing an agent, use the "Notify teammates" checkbox to control whether new teammates receive a notification.

Agents

#### LumApps connector now captures deleted and archived content[​](#lumapps-connector-now-captures-deleted-and-archived-content "Direct link to LumApps connector now captures deleted and archived content")

The LumApps connector now supports webhooks for deleted and archived content, keeping search results more accurate as content changes in LumApps.

**How to access:** Available automatically on the LumApps connector; no additional setup is required.

Connectors

#### Clearer GitLab Cloud connector setup guidance[​](#clearer-gitlab-cloud-connector-setup-guidance "Direct link to Clearer GitLab Cloud connector setup guidance")

GitLab Cloud setup now guides admins to use either a Group Access Token or a Service Account token scoped to a single top-level group, with links to official GitLab documentation and clearer notes on when webhooks are created automatically versus configured manually.

**How to access:** In the Admin Console, follow the updated GitLab Cloud connector setup flow.

Connectors

#### Export historical user spend, including zero-usage and deleted users[​](#export-historical-user-spend-including-zero-usage-and-deleted-users "Direct link to Export historical user spend, including zero-usage and deleted users")

Billing moderators can now export historical user spend, including users with zero usage and deleted users, for more complete cost reporting.

**How to access:** In the Admin Console billing area, billing moderators can export historical user spend.

Billing

#### Per-app and per-user spend limits with the AI gateway[​](#per-app-and-per-user-spend-limits-with-the-ai-gateway "Direct link to Per-app and per-user spend limits with the AI gateway")

When the AI gateway is enabled, monthly spend limits are now enforced per connected app and per user within each app, so a budget set on one app is evaluated independently of others. Deployments that do not use the AI gateway are unaffected and continue to enforce workspace-wide, per-user, and per-agent limits.

**How to access:** With the AI gateway enabled, set per-app and per-user monthly spend limits in the Admin Console.

Billing

#### Splunk MCP server is now connection-verified with a setup guide[​](#splunk-mcp-server-is-now-connection-verified-with-a-setup-guide "Direct link to Splunk MCP server is now connection-verified with a setup guide")

The Splunk MCP server template now appears as "Connection verified" in the MCP catalog and ships with step-by-step instructions for connecting Splunk using a dedicated service account, a least-privilege role, and an encrypted MCP token.

**How to access:** In the MCP catalog, select the Splunk template and use "Show setup instructions" to complete service-account setup.

MCP

#### Support for the latest Model Context Protocol revision[​](#support-for-the-latest-model-context-protocol-revision "Direct link to Support for the latest Model Context Protocol revision")

Glean's MCP servers now support the 2026-07-28 revision of the Model Context Protocol specification. Clients that speak the newer revision negotiate it automatically, and clients on earlier revisions continue to work unchanged.

**How to access:** No action needed — supported clients negotiate the new revision automatically.

MCP

#### More resilient Slack tools under heavy concurrent use[​](#more-resilient-slack-tools-under-heavy-concurrent-use "Direct link to More resilient Slack tools under heavy concurrent use")

Slack tools used by Assistant, voice, and agents are now more resilient when many requests run at once. Glean no longer opens a new Slack connection for every skill lookup and tool dispatch, so Slack per-account connection rate limits no longer reject requests mid-turn and cause an assistant or scheduled agent to abandon its remaining steps.

**How to access:** No action needed — this reliability improvement applies automatically.

Slack

#### Zendesk Extension Tools action pack is now available to set up[​](#zendesk-extension-tools-action-pack-is-now-available-to-set-up "Direct link to Zendesk Extension Tools action pack is now available to set up")

Resolved an issue where the Zendesk Extension Tools action pack did not appear in the list of supported action packs and therefore could not be configured. It is now available to set up.

**How to access:** In the Admin Console under Actions, add the Zendesk Extension Tools action pack.

Actions

#### Filter Glean Home suggestions by assistant capability[​](#filter-glean-home-suggestions-by-assistant-capability "Direct link to Filter Glean Home suggestions by assistant capability")

Glean Home suggestions can now be filtered by the assistant capabilities they use. This gives admins and product teams a more focused way to evaluate or manage suggestion experiences when a deployment exposes only selected workflows. The filter separates suggestions based on the underlying capability rather than requiring you to inspect each card individually, making it easier to understand what types of actions are being promoted and to keep the Home experience aligned with the workflows available to your organization.

**How to access:** Open the Glean Home suggestion management or configuration view and use the assistant-capability filter when reviewing available suggestions. The filter appears automatically where suggestion controls are enabled.

Glean Home

#### Upload more text-based file formats safely[​](#upload-more-text-based-file-formats-safely "Direct link to Upload more text-based file formats safely")

File uploads now support more than 50 additional text-based formats, including TSV, TOML, RST, and Markdown. Glean continues to block unsafe or unsupported files such as executables, archives, scripts, and audio or video formats where applicable. This makes it easier to bring structured text and configuration files into Assistant for analysis, summarization, and content generation without weakening the existing security checks that validate file types before processing.

**How to access:** In Assistant, choose the file-upload control and select a supported text file. If your organization has file upload disabled, an admin can enable it from the Glean section of workspace Settings.

[Learn more](https://docs.glean.com/administration/assistant/features/file-upload#supported-file-formats)

File Upload

#### Read Assistant more comfortably with updated typography[​](#read-assistant-more-comfortably-with-updated-typography "Direct link to Read Assistant more comfortably with updated typography")

Assistant now uses Inter typography with updated spacing and visual hierarchy across the core chat experience. Responses, controls, and structured content have a more consistent appearance across operating systems, making dense workflows easier to scan and giving the product a more predictable visual rhythm. The update does not change how you start chats, use tools, or access existing content; it improves the readability and polish of the surfaces you already use.

**How to access:** No action is required. The updated typography and spacing appear automatically in Assistant.

Assistant

#### Open Assistant with the new application URL[​](#open-assistant-with-the-new-application-url "Direct link to Open Assistant with the new application URL")

Assistant now has a dedicated application URL, making it easier to bookmark, link to, and open the Assistant experience directly. The new URL supports a clearer entry point for users who want to move straight into chat rather than starting from a general Glean surface. Existing navigation continues to work, so teams can adopt the direct URL gradually without changing links or workflows immediately.

**How to access:** Open the Assistant application from your existing Glean navigation or use the direct Assistant URL provided for your deployment.

Assistant

#### Use more skills and configure their visibility[​](#use-more-skills-and-configure-their-visibility "Direct link to Use more skills and configure their visibility")

Skills now support additional setup and access controls so organizations can make reusable agent capabilities available to the right audiences. Admins and builders can configure skills as part of their agent workflows, while visibility settings help prevent a skill from appearing to users who should not use it. This supports more consistent reuse of approved instructions and capabilities across agents without requiring each builder to recreate the same behavior.

**How to access:** Open the Skills area in Glean or the relevant agent builder, then review the skill’s setup and access controls. Your admin may need to enable or grant access to the skill.

Skills

#### Show more connected sources and actions in the Assistant app[​](#show-more-connected-sources-and-actions-in-the-assistant-app "Direct link to Show more connected sources and actions in the Assistant app")

The Assistant app now exposes additional connected sources and actions from the application experience, making it easier to discover what Glean can use to answer questions or complete work. The expanded surface helps users find supported integrations without memorizing connector names or navigating through separate configuration pages. Availability still depends on the connectors and actions enabled for your organization, so users see a governed set of options aligned with their deployment.

**How to access:** Open the Assistant app and use its sources or actions controls to review what is available. If an option is missing, ask an admin to verify connector and action visibility settings.

Assistant App

#### Export and review uploaded files with clearer format support[​](#export-and-review-uploaded-files-with-clearer-format-support "Direct link to Export and review uploaded files with clearer format support")

The file-upload experience now better communicates which text-based formats can be selected and processed. This complements the expanded format support by reducing confusion when a valid file does not use one of the most common extensions. Glean validates files after selection and continues to apply server-side security checks, so the broader format support improves compatibility without treating every file type as acceptable. You can upload supported files to analyze them, ask questions, or create content from their contents.

**How to access:** In Assistant, select the upload control and choose a supported file. If a file is rejected, check its format against the supported file types in the public file-upload guidance.

[Learn more](https://docs.glean.com/administration/assistant/features/file-upload#supported-file-formats)

File Upload

#### See generated image batches more naturally on native mobile[​](#see-generated-image-batches-more-naturally-on-native-mobile "Direct link to See generated image batches more naturally on native mobile")

When Glean generates several images in native mobile chat, the preview now uses one large hero image with supporting thumbnails instead of desktop-style artifact framing. The whole preview is a single accessible tap target, so you can open the full image canvas without hunting for a small control. The layout is designed for mobile screens and keeps the available images visible at a glance. Desktop and mobile web previews are unchanged, so this improvement is focused on making generated image results easier to scan and open in the native mobile experience.

**How to access:** In the Glean mobile app, generate or open a chat response containing multiple images. Tap the hero image or thumbnail area to open the full image canvas.

Mobile Chat

#### Find artifact types faster with clearer filter names and icons[​](#find-artifact-types-faster-with-clearer-filter-names-and-icons "Direct link to Find artifact types faster with clearer filter names and icons")

Search filters now use friendlier names and an icon that matches each artifact type. In artifact-focused searches, documents, interactive artifacts, meeting notes, images, and other supported types are easier to distinguish than when every row used the same generic artifact icon. The **With artifact** filter also uses clearer wording in Assistant search. These changes reduce the time needed to understand what a filter represents and make it easier to narrow results when you are looking for a specific kind of artifact.

**How to access:** Open Search, optionally scope to Assistant or Artifacts, and open the **With artifact** or **Type** filter. The updated labels and icons appear in the filter list automatically.

Search and Artifacts

#### Review all agent versions in one timeline[​](#review-all-agent-versions-in-one-timeline "Direct link to Review all agent versions in one timeline")

The agent builder’s version picker now presents drafts, saved versions, staged changes, and published versions in one time-ordered timeline instead of splitting them between Drafts and Published tabs. This gives you a single view of an agent’s history and makes it easier to understand which version is current, which changes are ready to publish, and what was saved previously. Existing version actions remain available, including selecting a version and managing staged or saved versions where those actions apply.

**How to access:** Open an agent in the builder and open the version picker. Review the timeline from the current version through earlier drafts, saved versions, and published checkpoints.

Agent Builder

#### Search, sort, and evaluate agents more easily when configuring an MCP server[​](#search-sort-and-evaluate-agents-more-easily-when-configuring-an-mcp-server "Direct link to Search, sort, and evaluate agents more easily when configuring an MCP server")

Admins configuring a Glean MCP server can now use a more capable agent picker. Search and familiar filters help you find the right agents, sorting and usage metadata provide more context, and descriptions are available without leaving the picker. Agents that cannot be selected, including disabled human-in-the-loop agents, remain visible with an explanation rather than disappearing and leaving you unsure why they are unavailable. The staged selection model remains in place, so your changes are applied when you save the MCP server configuration.

**How to access:** Open **Admin Console → Glean MCP servers**, edit an MCP server, and open its **Agents** section. Use the search, filters, sorting controls, and agent details in the picker before selecting **Save**.

Glean MCP Server

#### Review every configured GitHub extension in one place[​](#review-every-configured-github-extension-in-one-place "Direct link to Review every configured GitHub extension in one place")

The GitHub connector setup page now shows all configured file extensions used for indexing instead of limiting the visible list to a small fixed number. When many extensions are configured, they appear in a scrollable area so you can review the full configuration without losing access to the search and add controls. This makes it easier to verify that the connector covers the file types your engineering and documentation teams rely on and reduces the risk of overlooking an extension that was configured earlier.

**How to access:** Open the GitHub connector’s setup page in the Admin Console and review the configured file extensions. Scroll within the extension list to see entries beyond the initially visible rows.

GitHub Connector

#### Usage tables now label model spend by the selected period[​](#usage-tables-now-label-model-spend-by-the-selected-period "Direct link to Usage tables now label model spend by the selected period")

The Models tables in the Admin Console now use the same period-aware labels as the users and departments tables. For the current month, the column is labeled **MTD usage**; for a previous month or all-time view, it is labeled **Usage**. The same wording is used in relevant application breakdowns and CSV exports. This makes it easier to interpret the numbers you are reviewing and avoids confusing a month-to-date value with a historical or all-time total.

**How to access:** Open **Admin Console → Usage → By models** and choose the current month, a previous month, or **All time**. The table and CSV export header update to match the selected period.

Usage and Billing

#### Open directory details without leaving AI Security Insights[​](#open-directory-details-without-leaving-ai-security-insights "Direct link to Open directory details without leaving AI Security Insights")

The AI Security Insights user list now supports directory person cards. When you need more context about a high-risk user, you can hover over the user in the list and view the available directory details without navigating away from the insights dashboard. The existing user, department, pagination, and risk information remain in place, so the person card adds context without disrupting the review workflow.

**How to access:** Open **/admin/agent-guardrails/insights** and hover over a user in the user issues panel to open their directory person card.

AI Security Insights

#### MCP server lists now count inherited managed tools correctly[​](#mcp-server-lists-now-count-inherited-managed-tools-correctly "Direct link to MCP server lists now count inherited managed tools correctly")

MCP server lists now include tools inherited from Glean-managed toolsets when showing the enabled tool count. Previously, a server could show zero tools in the list even though its detail page contained inherited tools. The count now reflects the union of enabled built-in tools and available managed-toolset members without double-counting overlaps or including unavailable tools. This gives admins a more accurate at-a-glance view when comparing servers and deciding which configuration to open.

**How to access:** Open the MCP server list in the Admin Console. The corrected tool count appears automatically for servers that use Glean-managed toolsets.

MCP Server Administration

#### Sharing language now makes restricted access explicit[​](#sharing-language-now-makes-restricted-access-explicit "Direct link to Sharing language now makes restricted access explicit")

The restricted-access option in sharing dialogs now says **Restricted to only people with access**. The wording clarifies that choosing this option does not grant access to new people; it limits access to people who already have it. Sharing behavior and the dialog layout are unchanged. The clearer label helps you choose the right sharing scope, especially when you are sharing a chat or artifact with a group and need to understand whether recipients must already be permitted to view it.

**How to access:** Open a chat or artifact sharing dialog and select the restricted-access option. The updated explanation appears in the sharing controls.

Sharing and Permissions

#### Assistant Replies preferences stay with each chat[​](#assistant-replies-preferences-stay-with-each-chat "Direct link to Assistant Replies preferences stay with each chat")

Your Assistant Replies preference is now saved separately for each chat. If you turn Assistant Replies off in one conversation, leave it, and reopen it later, that chat remembers your choice. A different chat can keep a different setting, so changing the preference in one conversation does not change it elsewhere. The preference is stored locally in the web experience and does not modify the backend chat data, preserving the existing chat history and collaboration behavior.

**How to access:** Open any chat, change the **Assistant Replies** preference, and return to the conversation later. The setting is restored for that chat automatically.

Assistant Chat

#### Customer log streams include LLM response latency metrics[​](#customer-log-streams-include-llm-response-latency-metrics "Direct link to Customer log streams include LLM response latency metrics")

Customer event streams now include per-call time-to-first-token and total latency for LLM calls. Time-to-first-token measures how long it takes before the model begins responding, while total latency captures the full duration of the call. These fields give administrators and platform teams more context when monitoring AI responsiveness, investigating slow experiences, or comparing performance across usage patterns. The change adds observability to customer-visible LLM call events without requiring application changes or changes to the way users submit Assistant or agent requests.

**How to access:** No action is required. Review LLM call events in your existing customer log stream; the latency fields are included automatically for new events.

Customer Event Logs

## 🐛 Fixes[​](#-fixes "Direct link to 🐛 Fixes")

#### Reliable indexing of OneDrive and SharePoint updates[​](#reliable-indexing-of-onedrive-and-sharepoint-updates "Direct link to Reliable indexing of OneDrive and SharePoint updates")

Fixed a rare crawling issue in OneDrive and SharePoint where a failure between fetching an update and storing it could result in a permanently missed update. Updates are now stored before the crawl position advances, so changes are no longer lost.

**How to access:** No action needed — the fix applies automatically.

Connectors

#### OneDrive documents that previously failed to index are now processed correctly[​](#onedrive-documents-that-previously-failed-to-index-are-now-processed-correctly "Direct link to OneDrive documents that previously failed to index are now processed correctly")

Fixed an issue that prevented some OneDrive documents from being indexed. OneDrive documents are now processed correctly, with SharePoint handling unchanged.

**How to access:** No action needed — the fix applies automatically.

Connectors

#### Glean Chat recovers from errors on follow-up turns[​](#glean-chat-recovers-from-errors-on-follow-up-turns "Direct link to Glean Chat recovers from errors on follow-up turns")

Fixed an issue where Glean Chat could fail with a "Something went wrong" error on follow-up turns when the underlying AI provider could not decrypt a prior reasoning context. Glean now clears the invalid context and recovers the conversation turn.

**How to access:** No action needed — the fix applies automatically.

Assistant

#### Zoom recordings open directly from search results[​](#zoom-recordings-open-directly-from-search-results "Direct link to Zoom recordings open directly from search results")

Zoom meeting recording search results now link directly to the recording's share URL with the play passcode included, so the recording opens without a separate passcode prompt. Links to the older recording details page continue to resolve to the same result.

**How to access:** No action needed — recording links open directly.

Zoom

#### Slack direct messages reliably appear in federated search[​](#slack-direct-messages-reliably-appear-in-federated-search "Direct link to Slack direct messages reliably appear in federated search")

Fixed an issue where Slack direct messages found through federated search could be missing from results on deployments that index Slack but exclude private messages from native search.

**How to access:** No action needed — the fix applies automatically.

Slack

#### Prevent connector reindexing from leaving stale or broken results[​](#prevent-connector-reindexing-from-leaving-stale-or-broken-results "Direct link to Prevent connector reindexing from leaving stale or broken results")

Connector reindexing could leave affected customer content in an inconsistent state after source changes, including results that pointed to missing pages or returned 404 errors. The reindexing flow now handles those changes more safely so refreshed content is available from the connector without leaving stale references behind. This improves trust in search results after large updates, deletions, or connector maintenance and reduces the need for customers to retry indexing or investigate broken links manually.

Connectors and Search

#### Avoid request failures after a usage limit is reached[​](#avoid-request-failures-after-a-usage-limit-is-reached "Direct link to Avoid request failures after a usage limit is reached")

Some customers could receive HTTP 429 errors on every response after reaching a configured usage limit, even when the request should have returned a clear limit message or allowed a non-billable experience to continue. The usage-limit handling path now returns the correct response behavior instead of repeatedly surfacing a generic rate-limit failure. This makes limits easier to understand for end users and gives administrators a more predictable control mechanism when a user, agent, or organization reaches its configured threshold.

Usage Limits

#### Keep Deep Research jobs from running out of memory[​](#keep-deep-research-jobs-from-running-out-of-memory "Direct link to Keep Deep Research jobs from running out of memory")

Large or complex Deep Research jobs could consume too much memory and fail before producing results. The workflow now handles the research execution more efficiently so longer investigations are less likely to terminate because of an out-of-memory condition. This helps users continue using Deep Research for substantial questions while preserving the context and intermediate work needed to produce a useful response instead of forcing them to restart with a smaller request.

Deep Research

#### Keep AWS connector links working after deployment changes[​](#keep-aws-connector-links-working-after-deployment-changes "Direct link to Keep AWS connector links working after deployment changes")

Some AWS-hosted connector experiences could generate links that pointed to an unavailable endpoint, resulting in 404 errors when users opened a connector result or management path. The URL handling now uses the correct AWS deployment context, so connector links resolve to the expected destination. This restores normal navigation for affected AWS-hosted customers and reduces the need to repair links or retry connector actions manually.

AWS Connectors

#### Apply connector permissions consistently through hierarchy changes[​](#apply-connector-permissions-consistently-through-hierarchy-changes "Direct link to Apply connector permissions consistently through hierarchy changes")

Connector permissions could be applied incorrectly when access was inherited through parent and child connector relationships. The permission evaluation path now preserves the intended hierarchy so users receive the correct access to indexed content, including after connector configuration changes. This reduces the risk of users seeing content they should not access or losing access that an administrator intended to grant, and it makes connector governance more predictable for organizations with layered source configurations.

Connector Permissions

#### Long Deep Research chats are less likely to fail before answering[​](#long-deep-research-chats-are-less-likely-to-fail-before-answering "Direct link to Long Deep Research chats are less likely to fail before answering")

Deep Research sessions with very long histories could fail with an error instead of returning an answer. The route now handles large conversation histories without sending the entire history inline in the request, allowing the session to continue while preserving earlier context. This is especially helpful when you return to an extended research thread and need to build on prior findings rather than start over.

Deep Research

#### GitHub code search results now open the correct file[​](#github-code-search-results-now-open-the-correct-file "Direct link to GitHub code search results now open the correct file")

GitHub federated code search results could lead to 404 pages when the result URL used an invalid reference. Results now resolve through the repository’s default branch, so selecting a file opens the expected GitHub page instead of an error. This restores the basic workflow of searching code in Glean and jumping directly to the matching file for inspection.

GitHub Search

#### New Slack Real Time Search connections can complete authorization[​](#new-slack-real-time-search-connections-can-complete-authorization "Direct link to New Slack Real Time Search connections can complete authorization")

New Slack Real Time Search connector setups could fail before OAuth began because the authorization URL was not generated. The setup flow now handles newly created instances correctly, allowing the authorization URL to be created and the OAuth process to start. Existing Slack Real Time Search instances continue to use their saved MCP scope settings.

Slack Real Time Search

#### Long-running Spaces chats can continue past large-history limits[​](#long-running-spaces-chats-can-continue-past-large-history-limits "Direct link to Long-running Spaces chats can continue past large-history limits")

Long-running Spaces conversations could fail when their history became too large for the request sent to the AI workflow. The conversation history is now read directly from stored chat events for this route, avoiding the request-size limit while preserving the context needed for follow-up turns. This helps you continue an established Spaces discussion instead of losing the thread when the conversation grows.

Spaces

#### Tools work correctly across multiple Microsoft 365 instances[​](#tools-work-correctly-across-multiple-microsoft-365-instances "Direct link to Tools work correctly across multiple Microsoft 365 instances")

When multiple Microsoft 365 instances were connected, tool selection could use the wrong identity mapping, causing tools to be missing or unavailable in some contexts. Tool selection now respects the identity mapping for additional Microsoft 365 instances, so the tools exposed to an agent match the configured connection. This improves reliability for organizations that separate Microsoft 365 environments or maintain more than one connected instance.

Microsoft 365 Tools
