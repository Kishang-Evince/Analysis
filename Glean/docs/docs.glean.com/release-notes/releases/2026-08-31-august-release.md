---
url: "https://docs.glean.com/release-notes/releases/2026-08-31-august-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-08-31-august-release"
title: "August 31, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:32.728Z"
---
On this page

This release lets you build Glean agents directly from coding tools like Cursor and Codex, brings the Fathom connector to public beta, introduces Manager Insights, updates Gemini and GPT model options, and delivers a broad set of enhancements and fixes across chat, connectors, security, and administration.

* * *

## Major Launches[​](#major-launches "Direct link to Major Launches")

* * *

#### Build and run Glean agents from your coding tools[​](#build-and-run-glean-agents-from-your-coding-tools "Direct link to Build and run Glean agents from your coding tools")

You can now build, test, and run Glean agents directly from coding assistants such as Cursor, Claude, or Codex, without leaving your development environment. This lets developers create agents that draw on company knowledge using the tools they already work in every day, while the Agents library provides step-by-step guidance for creating agents this way. The result is a faster path from an idea to a working agent for technical teams, with the same agents available afterward in Glean for the rest of the organization to use and share.

**How to access:** Open the Agents library in Glean to find agent-creation guidance, then follow the headless builder documentation to create and run agents from Cursor, Claude, or Codex. Available automatically to users who can build agents.

[Learn more](https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder) Agents *\[ROAD-1451\]*

* * *

#### Edit, save, and download embedded skills in Auto Mode Agent Builder[​](#edit-save-and-download-embedded-skills-in-auto-mode-agent-builder "Direct link to Edit, save, and download embedded skills in Auto Mode Agent Builder")

Auto Mode Agent Builder now gives you direct control over the skills embedded in your agents. You can open an embedded skill, review and edit its instructions, save your changes, and download the updated skill file. Downloaded skills can be reused in other agents, shared with teammates, or checked into version control so your team can track how agent behavior evolves over time. This makes Auto Mode agents easier to refine and standardize, especially for teams that maintain a shared library of skills across many agents.

**How to access:** Open an agent in Auto Mode Agent Builder, select an embedded skill to view or edit its instructions, then save or download it. No admin action is needed.

[Learn more](https://docs.glean.com/agents/auto-mode-agent) Agent Builder *\[ROAD-1626\]*

* * *

#### Fathom connector available in public beta[​](#fathom-connector-available-in-public-beta "Direct link to Fathom connector available in public beta")

You can now connect Fathom, the AI meeting assistant, to Glean. The new connector indexes meeting recordings, transcripts, summaries, action items, and related metadata, making the outcomes of your meetings searchable alongside the rest of your company knowledge. Glean respects each user's authorized Fathom access, so people only see the meeting content they are already permitted to view in Fathom. This helps teams find decisions, follow-ups, and discussion details from past meetings without switching tools or scrubbing through recordings.

**How to access:** In the Admin Console, go to Add data source and select Fathom, shown with a Beta badge, to configure the connector. Admin configuration is required.

Connectors *\[ROAD-1664\]*

* * *

#### Manager Insights: See Glean adoption across your team[​](#manager-insights-see-glean-adoption-across-your-team "Direct link to Manager Insights: See Glean adoption across your team")

Managers can now understand how their own organization is adopting Glean. Manager Insights gives eligible managers a scoped view of Glean adoption and usage across their reporting organization and direct reports, helping them spot where Glean is delivering value and where their teams may need enablement. The view is limited to each manager's own reporting line, while company-wide views and administrative controls remain available only to authorized Insights admins, so existing governance over usage data is preserved.

**How to access:** Eligible managers can open Insights in Glean to see adoption and usage for their reporting organization. No admin action is needed; company-wide views remain limited to authorized Insights admins.

Insights *\[ROAD-1609\]*

* * *

#### Agents tab in the browser extension[​](#agents-tab-in-the-browser-extension "Direct link to Agents tab in the browser extension")

The Glean browser extension now includes an Agents tab, so you can run your agents from the extension side panel while browsing, without opening the Glean app. The Agents tab and its default-tab controls appear when browser-extension configuration is enabled for your deployment, and supported Glean Assist workflows include guidance to help teams migrate. This brings agents to the place many people already use Glean throughout the day, making it easier to trigger the right agent in the context of your current work.

**How to access:** Open the Glean browser extension side panel and select the Agents tab. Availability depends on browser-extension configuration, which is enabled automatically for eligible deployments; admins can manage rollout in extension settings.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar#agents) Browser Extension *\[ROAD-1461\]*

* * *

## AI & Model Updates[​](#ai--model-updates "Direct link to AI & Model Updates")

* * *

#### Gemini 3.1 Pro Custom Tools available for Vertex AI[​](#gemini-31-pro-custom-tools-available-for-vertex-ai "Direct link to Gemini 3.1 Pro Custom Tools available for Vertex AI")

Admins using Vertex AI can now select Gemini 3.1 Pro Custom Tools as the large assistant model, paired with Gemini 3.7 Flash or Gemini 3.5 Flash as the small model. These options replace Gemini 2.5 Pro and Flash ahead of the October 6, 2026 routing change, giving Vertex AI deployments a supported upgrade path to the newer Gemini generation. The existing Gemini 2.5 and Claude pairings remain available until then, so you can plan the switch on your own schedule before the deadline.

**How to access:** Admins can select the new model pairing in Glean's model configuration settings.

[Learn more](https://docs.glean.com/get-started/golive/model-choice) AI Models

* * *

#### Open model availability now managed by creator region[​](#open-model-availability-now-managed-by-creator-region "Direct link to Open model availability now managed by creator region")

For deployments using Glean-managed keys, the availability of open models is now controlled by the creator's region rather than configured for each individual model. This simplifies model governance: instead of tracking many per-model choices, availability follows a single regional setting. Existing per-model choices migrate automatically, so nothing changes for your users and no admin action is required.

**How to access:** No action is needed; existing model settings migrate automatically for deployments using Glean-managed keys.

[Learn more](https://docs.glean.com/get-started/golive/model-choice) AI Models

* * *

#### Agents move to the GPT-5.6 Luna model set[​](#agents-move-to-the-gpt-56-luna-model-set "Direct link to Agents move to the GPT-5.6 Luna model set")

Agents on Glean-key migration plans now automatically move to the GPT-5.6 Luna model set where needed. This applies to published agents as well as unpublished drafts and staged edits, which receive the same migration without creating a new agent version. Explicit model selections revert to Glean's best-available choice, while all other agent behavior and configuration remain unchanged. This keeps agents on current, supported models without requiring builders to update each agent by hand.

**How to access:** No action is needed; the migration is applied automatically for agents on Glean-key migration plans.

Agents

* * *

## Critical Updates[​](#critical-updates "Direct link to Critical Updates")

* * *

#### Review Gemini 2.5 model selections before October 6, 2026[​](#review-gemini-25-model-selections-before-october-6-2026 "Direct link to Review Gemini 2.5 model selections before October 6, 2026")

Google is retiring Gemini 2.5 Pro, Gemini 2.5 Flash, and Gemini 2.5 Flash Lite on October 20, 2026. Glean stops routing to these models on October 6, 2026; after that, traffic moves to Gemini 3.1 Pro, Gemini 3.7 Flash with Gemini 3.5 Flash fallback where needed, or Gemini 3.5 Flash Lite. If your deployment currently uses any Gemini 2.5 model, review and update your model selections before October 6 to choose your preferred replacement rather than relying on automatic rerouting.

**How to access:** Admins should review model selections in Glean's model configuration settings before October 6, 2026.

[Learn more](https://docs.glean.com/get-started/golive/model-choice) AI Models

* * *

## Deprecations & Sunsets[​](#deprecations--sunsets "Direct link to Deprecations & Sunsets")

* * *

#### Export to SharePoint artifact action retired[​](#export-to-sharepoint-artifact-action-retired "Direct link to Export to SharePoint artifact action retired")

The Export to SharePoint artifact action has been retired because its underlying upload-from-URL capability is no longer available. You can still move artifacts into SharePoint: download the artifact from Glean, then upload it through the supported SharePoint workflow. No other artifact actions are affected.

**How to access:** Download artifacts from Glean and upload them to SharePoint using SharePoint's standard upload workflow.

Artifacts

* * *

#### Web SDK no longer supports the `renderChat` `defaultSource` option[​](#web-sdk-no-longer-supports-the-renderchat-defaultsource-option "Direct link to web-sdk-no-longer-supports-the-renderchat-defaultsource-option")

The Glean Web SDK no longer supports the `defaultSource` option on `renderChat`. Embedded chat continues to work and uses your deployment-configured source defaults instead. If your integration passes this option, remove it from your SDK configuration; no other embedded chat behavior changes.

**How to access:** SDK integrators should remove the `defaultSource` option from `renderChat` calls; embedded chat otherwise continues to work unchanged.

Web SDK

* * *

## Enhancements[​](#enhancements "Direct link to Enhancements")

* * *

#### Retry content-trigger activation after transient failures[​](#retry-content-trigger-activation-after-transient-failures "Direct link to Retry content-trigger activation after transient failures")

When a temporary service issue prevents a content trigger from registering, activation now shows an actionable error and clears the failed registration behind the scenes. This means you can simply retry activation and succeed once the issue passes, instead of getting stuck with a trigger that will not activate.

**How to access:** No action is needed; if activation fails, retry it from the trigger setup flow.

[Learn more](https://docs.glean.com/agents/concepts/content-trigger) Agents

* * *

#### More reliable chat rendering while streaming[​](#more-reliable-chat-rendering-while-streaming "Direct link to More reliable chat rendering while streaming")

Chat messages now render reliably while responses are streaming. Previously, messages could briefly disappear or the layout could shift as content arrived. Conversations now stay stable and readable from the first token to the last.

**How to access:** No action is needed; the improvement applies automatically in Glean Chat.

Chat

* * *

#### Clearer audio cues in real-time voice sessions[​](#clearer-audio-cues-in-real-time-voice-sessions "Direct link to Clearer audio cues in real-time voice sessions")

Real-time voice sessions now use dedicated sounds for connecting, disconnecting, and tool activity, making it easier to understand what the assistant is doing at each moment. The tool-activity cue is quieter and no longer overlaps the assistant's voice, so responses stay easy to hear.

**How to access:** No action is needed; the new sounds apply automatically in real-time voice sessions.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice) Assistant

* * *

#### Fewer blocked OAuth and MCP authentication flows[​](#fewer-blocked-oauth-and-mcp-authentication-flows "Direct link to Fewer blocked OAuth and MCP authentication flows")

OAuth and MCP authentication and token-refresh requests now use a dedicated User-Agent. This reduces the chance that bot-based traffic filtering on external services blocks these flows, making connected tools and integrations more reliable to authenticate.

**How to access:** No action is needed; the change applies automatically.

Platform

* * *

#### Search and paginate static OAuth clients[​](#search-and-paginate-static-oauth-clients "Direct link to Search and paginate static OAuth clients")

Admins can now search and page through static OAuth clients directly from the OAuth settings page, making it much easier to find a specific client in deployments with many of them. Existing create, manage, and view-user actions are unchanged.

**How to access:** Open the OAuth settings page in the Admin Console and use the new search and pagination controls.

Admin Console

* * *

#### Dropdowns stay visible on smaller screens[​](#dropdowns-stay-visible-on-smaller-screens "Direct link to Dropdowns stay visible on smaller screens")

Composer and model-picker dropdowns now shrink or flip direction to remain fully visible on screen. This improves usability on smaller windows and screens, where menus could previously extend out of view.

**How to access:** No action is needed; the improvement applies automatically.

Chat

* * *

#### MCP-created artifacts now appear only in Library[​](#mcp-created-artifacts-now-appear-only-in-library "Direct link to MCP-created artifacts now appear only in Library")

Artifacts created through Glean MCP, including from tools like Cursor, now appear only in your Library instead of also creating a Chat thread. This keeps your chat history focused on real conversations while artifacts created inside Glean Chat behave exactly as before.

**How to access:** No action is needed; find MCP-created artifacts in your Library.

Glean MCP

* * *

#### Authored request examples in Platform API documentation[​](#authored-request-examples-in-platform-api-documentation "Direct link to Authored request examples in Platform API documentation")

Platform API documentation now provides authored, schema-valid request examples for the Agents, Chat, Skills, and Search APIs instead of generated placeholder payloads. Developers can copy realistic examples that work, shortening the path from reading the docs to a successful API call.

**How to access:** No action is needed; the improved examples appear in the Platform API documentation.

Developer Platform

* * *

#### Haptic feedback in the Glean mobile app[​](#haptic-feedback-in-the-glean-mobile-app "Direct link to Haptic feedback in the Glean mobile app")

The Glean mobile app now provides subtle haptic feedback across key interactions: voice and dictation, chat and search, results, save, bookmark, pin and delete actions, filters, refresh, and failures. These small physical cues confirm your actions and make the app feel more responsive.

**How to access:** No action is needed; haptic feedback applies automatically in the Glean mobile app.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice) Mobile App

* * *

#### Email trigger examples now match only your own mail[​](#email-trigger-examples-now-match-only-your-own-mail "Direct link to Email trigger examples now match only your own mail")

Gmail and Outlook trigger examples for labels, categories, and external senders now restrict matches to mail received by the trigger creator. This prevents triggers built from these examples from firing on coworkers' mail, keeping automations scoped to your own inbox.

**How to access:** No action is needed; the updated examples apply when you build new triggers from them.

Agents

* * *

#### Clearer tool deletion dialogs[​](#clearer-tool-deletion-dialogs "Direct link to Clearer tool deletion dialogs")

Tool and tool-pack deletion dialogs now hide identifiers for agents you cannot access, keep links for agents you can see, and show an exact count of affected agents with guidance to contact an admin when needed. Deletion terminology is now consistent throughout.

**How to access:** No action is needed; the improved dialogs appear when deleting tools or tool packs.

Admin Console

* * *

#### Outdated onboarding promos removed from the extension[​](#outdated-onboarding-promos-removed-from-the-extension "Direct link to Outdated onboarding promos removed from the extension")

Outdated chat and search onboarding promos have been removed from the browser extension side panel, reducing clutter and keeping the panel focused on your work.

**How to access:** No action is needed; the change applies automatically in the browser extension.

Browser Extension

* * *

#### Refreshed indexed-items chart in data source setup[​](#refreshed-indexed-items-chart-in-data-source-setup "Direct link to Refreshed indexed-items chart in data source setup")

The indexed-items bar chart in data source setup now uses current design-system colors while preserving its existing labels and hover text, making the setup experience more consistent with the rest of the Admin Console.

**How to access:** No action is needed; the updated chart appears in data source setup.

Admin Console

* * *

#### Content-trigger filters recognize user fields[​](#content-trigger-filters-recognize-user-fields "Direct link to Content-trigger filters recognize user fields")

Content-trigger facet pickers now recognize user fields from data source schemas, including a current-user option and people icons. This makes it easier to build triggers that react to documents based on the people associated with them.

**How to access:** No action is needed; the options appear automatically when configuring content-trigger filters.

[Learn more](https://docs.glean.com/agents/concepts/content-trigger) Agents

* * *

#### Search skills by name when adding to an agent[​](#search-skills-by-name-when-adding-to-an-agent "Direct link to Search skills by name when adding to an agent")

The Add existing skill dialog in Agent Builder now lets you search personal, shared, and platform skills by name, so you can quickly find the right skill instead of scrolling through the full list.

**How to access:** In Agent Builder, open the Add existing skill dialog and type a skill name to search.

Agent Builder

* * *

#### Corrected French label for Chat settings[​](#corrected-french-label-for-chat-settings "Direct link to Corrected French label for Chat settings")

The French label for Chat settings now displays as `Paramètres du chat` instead of falling back to English, improving the experience for French-language users.

**How to access:** No action is needed; the corrected label appears automatically for users with French language settings.

Chat

* * *

#### Full web crawls cover every configured sitemap and seed URL[​](#full-web-crawls-cover-every-configured-sitemap-and-seed-url "Direct link to Full web crawls cover every configured sitemap and seed URL")

Web crawler full crawls now enqueue every configured sitemap and seed URL, ensuring complete coverage of the web content you have configured. Incremental crawl behavior is unchanged.

**How to access:** No action is needed; the improvement applies automatically on the next full crawl.

Connectors

* * *

#### Clearer guidance for Slack send-message actions[​](#clearer-guidance-for-slack-send-message-actions "Direct link to Clearer guidance for Slack send-message actions")

Slack send-message actions now validate channel IDs and provide clearer guidance when a channel is archived, inaccessible, externally shared, or an unavailable private channel. This helps agents and users understand why a message could not be sent and what to do about it.

**How to access:** No action is needed; the improved validation applies automatically to Slack send-message actions.

Actions

* * *

#### Restrict LLM models by department and IdP group together[​](#restrict-llm-models-by-department-and-idp-group-together "Direct link to Restrict LLM models by department and IdP group together")

Admins can now restrict access to LLM models by department and IdP group at the same time, enabling more precise model governance. For example, you can make a specific model available only to certain departments within a particular identity-provider group.

**How to access:** Configure the combined restrictions in the model access settings of the Admin Console.

[Learn more](https://docs.glean.com/get-started/golive/model-choice) Admin Console

* * *

#### Bring your own Deepgram API key for Meeting Notes[​](#bring-your-own-deepgram-api-key-for-meeting-notes "Direct link to Bring your own Deepgram API key for Meeting Notes")

Customer administrators can now configure a customer-owned Deepgram API key for Meeting Notes transcription on supported deployments. This gives organizations direct control over their transcription provider relationship, billing, and usage.

**How to access:** In the Admin Console, go to Assistant → Settings → Meeting Notes and enter your Deepgram API key. Available on supported deployments.

Admin Console

* * *

#### Failed connector configurations retained for 14 days[​](#failed-connector-configurations-retained-for-14-days "Direct link to Failed connector configurations retained for 14 days")

Failed connector configuration attempts are now retained for 14 days instead of 3. This gives admins more time to troubleshoot and retry a failed setup without re-entering credentials and secrets. No customer action is required.

**How to access:** No action is needed; the longer retention applies automatically.

Connectors

* * *

#### Strengthened workload isolation with non-root containers[​](#strengthened-workload-isolation-with-non-root-containers "Direct link to Strengthened workload isolation with non-root containers")

Many Kubernetes workloads that power Glean now run as non-root users, strengthening workload isolation and reducing the potential impact of any single compromised component. This security hardening happens entirely behind the scenes.

**How to access:** No action is needed; the hardening applies automatically.

Platform

* * *

#### Safer Azure Files permission enforcement[​](#safer-azure-files-permission-enforcement "Direct link to Safer Azure Files permission enforcement")

Azure Files permission enforcement now reconciles shared New Technology File System (NTFS) permissions safely, handles custom access-control entries, and rejects malformed security descriptors. This keeps search results for Azure Files content accurately aligned with your file-system permissions.

**How to access:** No action is needed; the improvements apply automatically to the Azure Files connector.

Connectors

* * *

#### Action usage metadata respects agent and workflow permissions[​](#action-usage-metadata-respects-agent-and-workflow-permissions "Direct link to Action usage metadata respects agent and workflow permissions")

Action usage metadata now follows agent and workflow permissions: details you can access remain visible, metadata for inaccessible items stays hidden, and unlisted workflows are omitted. Deletion behavior is unchanged. This ensures usage views never reveal information about agents or workflows you are not permitted to see.

**How to access:** No action is needed; the permission enforcement applies automatically.

Actions

* * *

#### Consistent permission enforcement for MCP servers using Glean Skill tools[​](#consistent-permission-enforcement-for-mcp-servers-using-glean-skill-tools "Direct link to Consistent permission enforcement for MCP servers using Glean Skill tools")

Customer-created MCP servers that use Glean Skill tools now consistently enforce platform audience permissions across skill discovery, skill-file disclosure, and tool execution. Restricted tools can no longer be exposed or invoked through lazy disclosure, keeping your skill permissions airtight when accessed through MCP.

**How to access:** No action is needed; the enforcement applies automatically to customer-created MCP servers.

Glean MCP

* * *

#### Updated permissions for Dataproc Serverless 3.0[​](#updated-permissions-for-dataproc-serverless-30 "Direct link to Updated permissions for Dataproc Serverless 3.0")

The Dataproc runtime custom role now includes the permissions required for Spark jobs on Dataproc Serverless 3.0. Managed deployments require no admin action.

**How to access:** No action is needed for managed deployments; the updated role applies automatically.

Platform

* * *

#### Better retry behavior under rate limiting[​](#better-retry-behavior-under-rate-limiting "Direct link to Better retry behavior under rate limiting")

Rate-limit responses now preserve Retry-After information and propagate it when a request is ultimately denied. API clients and integrations can use this to back off intelligently and retry at the right time instead of guessing.

**How to access:** No action is needed; clients should honor the Retry-After header when retrying throttled requests.

Developer Platform

* * *

#### More reliable Ironclad syncing under rate limits[​](#more-reliable-ironclad-syncing-under-rate-limits "Direct link to More reliable Ironclad syncing under rate limits")

Ironclad admin and user-token listings, attachment downloads, and permission dispatch now use endpoint-scoped queues aligned with Ironclad's organization rate limits. This makes Ironclad crawling and permission syncing more reliable for deployments with heavy Ironclad usage.

**How to access:** No action is needed; the improvement applies automatically to the Ironclad connector.

Connectors

* * *

#### Faster, more reliable document processing scheduling[​](#faster-more-reliable-document-processing-scheduling "Direct link to Faster, more reliable document processing scheduling")

Parsing-service replicas now fit standard node sizes, improving scheduling and avoiding pending pods during document processing. This keeps indexing pipelines moving smoothly during heavy processing periods.

**How to access:** No action is needed; the improvement applies automatically.

Platform

* * *

#### Cleaner AI-security log exports[​](#cleaner-ai-security-log-exports "Direct link to Cleaner AI-security log exports")

AI-security log exports no longer include the internal GUARDRAIL\_CONTEXT payload, producing cleaner exports for downstream analysis. Guardrail detection and enforcement behavior are unchanged.

**How to access:** No action is needed; the change applies automatically to AI-security log exports.

Protect

* * *

## Fixes[​](#fixes "Direct link to Fixes")

* * *

#### Content-trigger people filters return resolvable users[​](#content-trigger-people-filters-return-resolvable-users "Direct link to Content-trigger people filters return resolvable users")

Content-trigger people filters now return resolvable user values, so the users you select produce firing conditions reliably instead of silently failing to match.

Agents

* * *

#### Memory and personalization available for more users[​](#memory-and-personalization-available-for-more-users "Direct link to Memory and personalization available for more users")

Memory and personalization are now available for users whose account details previously could not be resolved, using an additional account source to identify them correctly.

Assistant

* * *

#### Retired ServiceNow news articles removed from search[​](#retired-servicenow-news-articles-removed-from-search "Direct link to Retired ServiceNow news articles removed from search")

Retired ServiceNow news articles no longer appear in Glean search results because inactive records are filtered out.

Connectors

* * *

#### Deactivated ServiceNow knowledge articles removed from search[​](#deactivated-servicenow-knowledge-articles-removed-from-search "Direct link to Deactivated ServiceNow knowledge articles removed from search")

Deactivated ServiceNow knowledge articles no longer appear in Glean search results.

Connectors

* * *

#### Prompt cleanup of deactivated ServiceNow articles[​](#prompt-cleanup-of-deactivated-servicenow-articles "Direct link to Prompt cleanup of deactivated ServiceNow articles")

Deactivated ServiceNow knowledge articles are now removed promptly during incremental crawls instead of waiting for a full crawl, so stale content disappears from search much sooner.

Connectors
