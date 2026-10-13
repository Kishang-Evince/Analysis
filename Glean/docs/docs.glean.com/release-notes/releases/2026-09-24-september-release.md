---
url: "https://docs.glean.com/release-notes/releases/2026-09-24-september-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-09-24-september-release"
title: "September 24, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:33.241Z"
---
On this page

**Release version:** 557

This release makes it faster to find your past chats and artifacts, brings a new browser extension side panel, adds scheduling for manually run agents, and expands the Model Context Protocol (MCP) server library with 25 new templates. It also delivers usage limits for identity provider groups, stronger permissions enforcement across connectors and agents, and a set of reliability fixes.

## Major launches[​](#major-launches "Direct link to Major launches")

#### Find past chats and artifacts faster[​](#find-past-chats-and-artifacts-faster "Direct link to Find past chats and artifacts faster")

The redesigned chat search experience organizes everything you've created in Glean into clear categories — Chats, Artifacts, and Meeting Notes — so you can jump straight to the right kind of result. A new sort dropdown lets you order results by relevance or recency, making it easy to pick up where you left off or track down an artifact from weeks ago. Search across your history is now faster and more predictable, whether you remember an exact phrase or only an approximate timeframe.

**How to access:** Open search from your chat history, then filter by Chats, Artifacts, or Meeting Notes and sort by relevance or recency. No admin action needed.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/search-past-chats)

Glean Home *\[ROAD-1684\]*

#### A new native side panel for the browser extension[​](#a-new-native-side-panel-for-the-browser-extension "Direct link to A new native side panel for the browser extension")

The Glean browser extension is moving to a native side panel experience that keeps Assistant alongside whatever page you're working on. The side panel also reads page content more accurately — including supported embedded frames and live form and rich-text values — so answers reflect what's actually on your screen. The side panel reaches general availability for standard deployments on October 1, 2026. Deployments using managed rollouts keep admin control — admins can enable it from the Feature rollouts page starting October 1, 2026 — until it reaches general availability for all deployments on October 15, 2026.

**How to access:** Standard deployments receive the side panel automatically on October 1, 2026. Admins on managed rollouts can enable it from Admin console → Feature rollouts until general availability on October 15, 2026.

[Learn more](https://docs.glean.com/user-guide/apps/extension-sidebar)

Glean Extension *\[ROAD-1693\]*

#### Schedule agents configured for manual runs[​](#schedule-agents-configured-for-manual-runs "Direct link to Schedule agents configured for manual runs")

You can now add schedules to agents configured to run manually. Instead of remembering to trigger a recurring task yourself, set the agent to run on the cadence you need and let it handle the rest — daily digests, weekly reports, or periodic checks all run automatically while the agent keeps its manual-run configuration. This closes the gap between one-off agent runs and fully autonomous agents, giving you a lightweight way to put routine work on autopilot.

**How to access:** Open an agent set to "Manually run" and add a schedule. No admin action needed.

Agents *\[ROAD-1709\]*

#### Set usage limits for identity provider (IdP) groups[​](#set-usage-limits-for-identity-provider-idp-groups "Direct link to Set usage limits for identity provider (IdP) groups")

Usage limits at the IdP group level are now available to all Enterprise Flex and Glean Core Suite customers. Many enterprises already use their identity provider as the source of truth for access across tools. Admins can now use those existing IdP groups and group-management workflows to set Glean spend limits for specific teams or groups, giving finance and platform owners finer-grained control over consumption and clearer accountability than a single org-wide cap.

**How to access:** Admins on Enterprise Flex and Glean Core Suite can configure group limits in Admin console → Usage.

[Learn more](https://docs.glean.com/administration/management/usage/set-usage-limits-and-alerts)

Admin Capabilities *\[ROAD-1629\]*

#### Query Databricks with natural language or SQL (Beta)[​](#query-databricks-with-natural-language-or-sql-beta "Direct link to Query Databricks with natural language or SQL (Beta)")

A new Databricks Genie server template is available in the MCP library, in Beta. Once an admin connects it, Assistant can answer questions about your Databricks data in plain language or run SQL queries directly — bringing warehouse data into the same conversational experience you use for the rest of your company knowledge. Access is admin gated, so your team controls exactly who can query which data.

**How to access:** Admins connect the Databricks Genie MCP server from the MCP library. Access is admin gated.

[Learn more](https://docs.glean.com/administration/assistant/warehouse-data/connect-databricks-genie-to-glean-assistant)

Connectors & MCP *\[ROAD-1167\]*

#### 25 new MCP server templates[​](#25-new-mcp-server-templates "Direct link to 25 new MCP server templates")

The MCP server library keeps growing. This release adds 25 new remote server templates: UserTesting, Kayse, Impala, RankSpot, Loam, exascale.build, Lili, Hologrow, JP Bids, Soracom Knowledge, Paddock Finance, Pagent, RED Atlas, PopHIVE, Tsuga, Speko, Adzviser Matomo, Valency Bond, Docebo, NuMetric, Kernel, Stealthium, Seltz, ProductNow, and RDash. Most templates authenticate with per-user OAuth, and several belong to the unverified tier, so admins should review them before enabling them for their organization.

**How to access:** Admins enable the templates they want from the MCP server library.

Actions *\[ROAD-1441\]*

#### Model announcement emails for billing admins[​](#model-announcement-emails-for-billing-admins "Direct link to Model announcement emails for billing admins")

Billing admins now receive email announcements when new models become available in Glean, so you can evaluate and plan for new model options without watching release notes or the model picker. Glean sends the announcements automatically, with nothing to configure, helping admins stay ahead of model changes that may affect cost, performance, or governance decisions. Admins can opt out through the "Product news and updates" email preference.

**How to access:** No action needed. Billing admins receive the announcement emails automatically. Opt out via the "Product news and updates" email preference.

Admin Capabilities *\[ROAD-1714\]*

#### Usage stats on user profiles[​](#usage-stats-on-user-profiles "Direct link to Usage stats on user profiles")

Usage stats are now enabled on user profiles, adding activity insights to the profile experience in Glean.

**How to access:** Open a user profile to see the available stats. No admin action needed.

Glean Home *\[ROAD-1668\]*

#### Assistant suggests your next step[​](#assistant-suggests-your-next-step "Direct link to Assistant suggests your next step")

Assistant can now suggest a helpful next step after it responds, so you can keep momentum without figuring out what to ask next. The next-step suggestion engine runs in Glean Key deployments.

**How to access:** Available automatically in Glean Key deployments. No action needed.

Assistant *\[ROAD-1722\]*

## AI & model updates[​](#ai--model-updates "Direct link to AI & model updates")

#### Upgraded model for personalized Cowork suggestions[​](#upgraded-model-for-personalized-cowork-suggestions "Direct link to Upgraded model for personalized Cowork suggestions")

Personalized Cowork suggestions on Glean Home are now powered by Qwen3.6 for all Glean Key customers, continuing the rollout on AWS. You'll see the improvement automatically — suggestions keep appearing in the same place on Glean Home, backed by the upgraded model.

**How to access:** Available automatically on Glean Home in Glean Key deployments.

Glean Home *\[ROAD-1444\]*

## Critical updates[​](#critical-updates "Direct link to Critical updates")

#### Salesforce redlisted fields enforced across live search and document reads[​](#salesforce-redlisted-fields-enforced-across-live-search-and-document-reads "Direct link to Salesforce redlisted fields enforced across live search and document reads")

Redlisted-field enforcement for Salesforce is now on by default for federated (live) search, federated fetch, and rich document reads. If your organization has configured redlisted Salesforce fields, that configuration is now consistently applied across these read paths, so sensitive field values stay excluded everywhere Glean produces results.

**How to access:** No action needed. Glean enforces your existing redlisted-fields configuration automatically.

Connectors

#### Agent tool approvals enforced for all tool types[​](#agent-tool-approvals-enforced-for-all-tool-types "Direct link to Agent tool approvals enforced for all tool types")

Agent safety checks now honor per-tool approval settings for non-MCP tool packs, such as OneDrive, and MCP tools. Agents that require approval are also correctly greyed out where approval is pending, so approval policies apply uniformly across every kind of tool an agent can use.

**How to access:** No action needed. Existing per-tool approval settings now apply to all tool packs.

Agents

#### More accurate Azure Files permissions[​](#more-accurate-azure-files-permissions "Direct link to More accurate Azure Files permissions")

Two improvements make Azure Files permission handling more precise. Permission crawling now preserves scoped role-definition IDs, uses stable crawl-node identities, keeps account and share assignments distinct, and re-dirties permissions consistently across pagination. Permission evaluation now unions all role assignments that apply to a user or group, matches action patterns with anchored wildcards, and ensures deny patterns override grants. Together these changes mean search results respect your Azure Files access rules more accurately.

**How to access:** No action needed. The improvements apply automatically to Azure Files connectors.

Connectors

#### A more secure file processing sandbox[​](#a-more-secure-file-processing-sandbox "Direct link to A more secure file processing sandbox")

The file processing sandbox images now run digest-pinned Ubuntu 24.04 with Python 3.12, strengthening the security posture of the environment that handles documents. Document, PDF, optical character recognition, and font processing capabilities are fully preserved.

**How to access:** No action needed. The hardened images are in use automatically.

Platform

## Deprecations & sunsets[​](#deprecations--sunsets "Direct link to Deprecations & sunsets")

#### Google Sheets write skill turned off[​](#google-sheets-write-skill-turned-off "Direct link to Google Sheets write skill turned off")

The Google Sheets write skill is now off, after evaluation showed it did not reliably improve output quality. Existing Google Sheets write requests use the remaining supported behavior instead of this skill.

**How to access:** No action needed.

Assistant

#### Composio Google Docs copy action turned off[​](#composio-google-docs-copy-action-turned-off "Direct link to Composio Google Docs copy action turned off")

The Composio Google Docs copy action is now off because it exposed no destination parameter, so copies could not reach the intended destination. Use the native Google Drive MCP copy tool instead.

**How to access:** No action needed. Switch workflows to the native Google Drive MCP copy tool.

Actions

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Control who can create and use Skills[​](#control-who-can-create-and-use-skills "Direct link to Control who can create and use Skills")

Admins get comprehensive governance controls for Skills. A creation selector determines who can create skills — everyone with Skills access, selected users and groups, or admins and skill moderators only. A usage selector controls who can use skills — everyone, selected users and groups, or no one — with existing settings migrated automatically. A single toggle now governs GitHub imports, and the server enforces every audience setting, hiding creation options like file upload, GitHub import, and chat preview from users without permission.

**How to access:** Admins configure creation and usage audiences in the Skills admin settings.

Admin Capabilities

#### Rate controls for Git server connectors[​](#rate-controls-for-git-server-connectors "Direct link to Rate controls for Git server connectors")

The Bitbucket Server, GitLab Server, GitHub Server, and GitHub Enterprise Server connectors now support an aggregate limit on crawl queries per second, letting admins cap Glean's total crawl traffic to protect self-hosted Git servers from load spikes.

**How to access:** Admins set the aggregate rate limit in each connector's setup form.

Connectors

#### Keep sensitive query data out[​](#keep-sensitive-query-data-out "Direct link to Keep sensitive query data out")

Redlisting for the BigQuery MCP server is now available to all customers, so admins can keep sensitive data out of natural-language and SQL queries on BigQuery.

**How to access:** Admin gated. Configure redlisting for the BigQuery MCP server.

[Learn more](https://docs.glean.com/connectors/native/bigquery)

Connectors & MCP *\[ROAD-1165\]*

#### Now on by default[​](#now-on-by-default "Direct link to Now on by default")

Four previously announced experiences are now on by default for everyone: the updated left navigation, the redesigned model picker, the collapsed Show work summary, and the new homepage.

**How to access:** No action needed. All four turn on automatically.

Glean Home

#### Export agent traces to your observability stack[​](#export-agent-traces-to-your-observability-stack "Direct link to Export agent traces to your observability stack")

The configuration view for exporting agent traces to external OpenTelemetry Protocol (OTLP) endpoints is now available by default, so admins can send agent traces to their own observability tooling without a support request. Existing permission checks stay the same.

**How to access:** Admins configure OTLP trace export in the Admin console.

[Learn more](https://docs.glean.com/administration/agent-trace-export)

Admin Capabilities *\[ROAD-1559\]*

#### Clearer control over agent publishing approvals[​](#clearer-control-over-agent-publishing-approvals "Direct link to Clearer control over agent publishing approvals")

The "Publishing an agent requires approval" setting now stays visible whenever default members can create or publish agents, independent of sharing toggles, so admins can always find and manage the approval requirement.

**How to access:** Admin console → User roles → Default member permissions.

[Learn more](https://docs.glean.com/administration/managing-agents/review-and-publish-agents)

Agents *\[ROAD-1191\]*

#### Use IdP groups as audiences for tools and MCP servers[​](#use-idp-groups-as-audiences-for-tools-and-mcp-servers "Direct link to Use IdP groups as audiences for tools and MCP servers")

You can now use IdP groups as audiences for Tools and MCP servers, and principals with global Tools write access can browse groups org wide, making it easier to scope tool access to the teams that need it.

**How to access:** Select IdP groups when configuring tool and MCP server audiences in the Admin console.

Admin Capabilities

#### Platform API improvements for agent runs[​](#platform-api-improvements-for-agent-runs "Direct link to Platform API improvements for agent runs")

The Platform API adds owner-scoped agent-run retrieval with durable human-in-the-loop flows — start a run, poll for pending approvals, submit decisions, and continue or cancel. Agent Run API responses (public and experimental) now also return citations end to end for both buffered and streamed responses.

**How to access:** Available through the Platform Agent Run APIs.

Platform

#### Upload Glean artifacts to OneDrive and SharePoint[​](#upload-glean-artifacts-to-onedrive-and-sharepoint "Direct link to Upload Glean artifacts to OneDrive and SharePoint")

The Microsoft 365 upload-file action can now upload Glean-generated PowerPoint (`.pptx`) and Excel (`.xlsx`) artifacts to a OneDrive or SharePoint folder you specify, so finished work lands directly where your team keeps it. Uploads to your own OneDrive root continue to work as before.

**How to access:** Use the upload-file action with a destination folder in agents or Assistant.

Actions

#### Send Slack DMs and email from Assistant[​](#send-slack-dms-and-email-from-assistant "Direct link to Send Slack DMs and email from Assistant")

The Slack direct message and Glean email actions are now enabled on the Assistant surface, so agents running in Assistant can deliver their output to you directly in Slack or by email.

**How to access:** Use the Slack DM and email actions directly in Assistant.

Actions

#### Clearer search results for Glean content[​](#clearer-search-results-for-glean-content "Direct link to Clearer search results for Glean content")

Search results now use Library-style gradient icons for artifacts, skills, agents, chats, meeting notes, and projects, and show localized type labels — Document, Interactive, Spreadsheet, Agent, Chat — before metadata, so you can identify result types at a glance.

**How to access:** No action needed. The updated results appear automatically.

Search

#### Interface refinements[​](#interface-refinements "Direct link to Interface refinements")

Paper artifacts are now labeled "Document" instead of "Canvas" to match Library terminology. Additional-tools authorization banners show the connector instance name with a readable fallback. The redesigned composer moves the session-only note into the model tooltip. The Assistant memory attribution indicator now uses a book icon.

**How to access:** No action needed. The refinements appear automatically.

Assistant

#### Clearer admin workflows[​](#clearer-admin-workflows "Direct link to Clearer admin workflows")

Billing group-mode switching now shows a deduplicated list of impacted groups and asks for a final confirmation before switching between department and IdP-group usage modes. The inactive-agent bulk-delete report copy now clarifies that it lists agents with zero runs in the selected timeframe and needs manual review. The LLM gateway host selection layout in mobile device management (MDM) settings now matches the latest designs.

**How to access:** Available automatically in the relevant Admin console and MDM settings.

Admin Capabilities

#### Validated Google Drive label redlists[​](#validated-google-drive-label-redlists "Direct link to Validated Google Drive label redlists")

Google Drive label redlist setup now verifies that configured choice IDs exist in published label schemas, catching configuration errors before they affect results.

**How to access:** Validation runs automatically during label redlist setup.

Connectors

#### Keep embedded chat names in sync[​](#keep-embedded-chat-names-in-sync "Direct link to Keep embedded chat names in sync")

The Web SDK adds a new `chat:name_update` event, so apps that embed Glean chat can keep custom chat menus in sync as names change.

**How to access:** Subscribe to `chat:name_update` in the Web SDK.

Platform

## Fixes[​](#fixes "Direct link to Fixes")

#### More reliable GitHub identity crawls[​](#more-reliable-github-identity-crawls "Direct link to More reliable GitHub identity crawls")

Identity crawls no longer fail when enterprise-managed-user members have no linked user account, and installation-token validation now uses the same endpoint as crawling, preventing repeated token-refresh fallbacks.

Connectors

#### Faster file processing under load[​](#faster-file-processing-under-load "Direct link to Faster file processing under load")

Pause activity probes now run off the orchestrator event loop, improving file processing reliability during high load.

Platform

#### Salesforce crawl resilience[​](#salesforce-crawl-resilience "Direct link to Salesforce crawl resilience")

Folder-share not-found errors are no longer retried, so Salesforce crawls don't stall for hours on missing folders.

Connectors

#### Filter agents by creator[​](#filter-agents-by-creator "Direct link to Filter agents by creator")

The "By you" and drafts filters now match agents by creator ID or case-insensitive email, fixing empty tabs.

Agents

#### Audio transcription spend tracking[​](#audio-transcription-spend-tracking "Direct link to Audio transcription spend tracking")

Audio transcription usage is now recorded in current-month usage totals and counts toward spend limits.

Billing
