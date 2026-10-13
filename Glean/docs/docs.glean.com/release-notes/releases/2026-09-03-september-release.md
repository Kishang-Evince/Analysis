---
url: "https://docs.glean.com/release-notes/releases/2026-09-03-september-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-09-03-september-release"
title: "September 03, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:32.751Z"
---
On this page

This release brings Bitbucket Code Writer to general availability, introduces the Adobe Workfront connector in public beta, adds Claude Fable 5.1 and Gemini 3.8 Flash model options, and delivers a broad set of enhancements and fixes across agents, connectors, insights, and administration.

* * *

## Major Launches[​](#major-launches "Direct link to Major Launches")

* * *

#### Bitbucket Code Writer is now generally available[​](#bitbucket-code-writer-is-now-generally-available "Direct link to Bitbucket Code Writer is now generally available")

Code Writer support for Bitbucket is now generally available for eligible Glean Key deployments. Code Writer lets Glean make AI-powered code changes directly in your Bitbucket repositories, so engineering teams can turn requests into reviewable code changes without leaving the tools they already use. With this launch, teams working in Bitbucket get the same AI-assisted development workflow previously available for other source-control platforms, helping developers move from an idea to a proposed change faster while keeping review and approval in your existing repository workflow.

**How to access:** Admins must configure Bitbucket for Code Writer by following the Code Writer setup instructions. Available for eligible Glean Key deployments.

[Learn more](https://docs.glean.com/administration/tools/setup-tools/code-writer-tools-setup) Code Writer *\[ROAD-1589\]*

* * *

#### Adobe Workfront connector available in public beta[​](#adobe-workfront-connector-available-in-public-beta "Direct link to Adobe Workfront connector available in public beta")

You can now connect Adobe Workfront to Glean. The new connector, available in public beta, indexes Workfront projects, tasks, issues, documents, and updates, making your work-management content searchable alongside the rest of your company knowledge. Glean respects each user's Workfront access permissions, so people only see the content they are already permitted to view in Workfront. This helps teams find project status, task details, and discussion updates without switching tools or digging through Workfront manually.

**How to access:** In the Admin Console, go to Add data source and select Adobe Workfront, then configure the connector with OAuth2 credentials. Admin configuration is required.

[Learn more](https://docs.glean.com/connectors/native/workfront/setup) Connectors *\[ROAD-1553\]*

* * *

## AI & Model Updates[​](#ai--model-updates "Direct link to AI & Model Updates")

* * *

#### Claude Fable 5.1 available for Fable 5 customers[​](#claude-fable-51-available-for-fable-5-customers "Direct link to Claude Fable 5.1 available for Fable 5 customers")

Claude Fable 5.1 is now available in Assistant and Agents for customers already enabled for Fable 5. Fable 5.1 takes the primary position in the model picker, while Fable 5 remains available under More models, so you can keep using the previous model if you prefer. This gives eligible teams access to the newest Fable model generation for everyday assistant conversations and agent runs without any configuration changes.

**How to access:** No admin action is needed. Customers enabled for Fable 5 can select Claude Fable 5.1 from the model picker in Assistant and Agents.

[Learn more](https://docs.glean.com/administration/llms) AI Models *\[ROAD-1672\]*

* * *

#### Gemini 3.8 Flash available in Assistant and Agents[​](#gemini-38-flash-available-in-assistant-and-agents "Direct link to Gemini 3.8 Flash available in Assistant and Agents")

Gemini 3.8 Flash is now available in Assistant and Agents for both Glean Key and Customer Key deployments. Gemini 3.8 Flash is a fast, premium model option, giving you quicker responses for everyday questions and agent runs while keeping access to higher-capability models for more complex work.

**How to access:** No admin action is needed. Users in eligible deployments can select Gemini 3.8 Flash from the model picker in Assistant and Agents.

[Learn more](https://docs.glean.com/administration/llms) AI Models *\[ROAD-1676\]*

* * *

## Critical Updates[​](#critical-updates "Direct link to Critical Updates")

* * *

#### Update generated Platform Chat SDK integrations[​](#update-generated-platform-chat-sdk-integrations "Direct link to Update generated Platform Chat SDK integrations")

Generated Platform Chat SDKs now separate non-streaming and streaming operations and expose typed server-sent events without buffering the response body. This is a breaking change for generated clients: developers should regenerate their SDK clients and update streaming integrations to use the separated operations and typed event handling.

**How to access:** SDK developers should regenerate Platform Chat SDK clients and update code that calls chat operations or consumes streaming responses.

[Learn more](https://developers.glean.com/api/client-api/chat/overview) Developer Platform

* * *

## Deprecations & Sunsets[​](#deprecations--sunsets "Direct link to Deprecations & Sunsets")

* * *

#### Client API agents endpoints deprecated[​](#client-api-agents-endpoints-deprecated "Direct link to Client API agents endpoints deprecated")

The agents search, get, schemas, and run endpoints under `/rest/api/v1/agents` are deprecated. Use the Platform Agents API at `/api/agents` instead; the create, edit, and import endpoints remain supported. Removal of the deprecated endpoints is scheduled for April 15, 2027, so integrators have time to migrate.

**How to access:** API integrators should migrate affected integrations to the Platform Agents API at `/api/agents` before April 15, 2027.

[Learn more](https://developers.glean.com/api/platform-api/agents-overview) Developer Platform

* * *

## Enhancements[​](#enhancements "Direct link to Enhancements")

* * *

#### Search API errors clarify pagination limits[​](#search-api-errors-clarify-pagination-limits "Direct link to Search API errors clarify pagination limits")

Search API errors now distinguish between an invalidly large page size and pagination that is too deep, making invalid pagination requests easier to diagnose and correct.

**How to access:** No action is needed; the clearer error responses apply automatically to Search API requests.

Developer Platform

* * *

#### Issue titles have more room in the Issues table[​](#issue-titles-have-more-room-in-the-issues-table "Direct link to Issue titles have more room in the Issues table")

The Issues table now gives issue titles more horizontal space while remaining usable across supported screen sizes, making issues easier to scan.

**How to access:** No action is needed; the improved layout appears automatically in the Issues table.

Admin Console

* * *

#### Scheduled agent subscriptions stay active through edits[​](#scheduled-agent-subscriptions-stay-active-through-edits "Direct link to Scheduled agent subscriptions stay active through edits")

Scheduled agents no longer pause active subscriptions when their owner edits input fields or switches between chat and form triggers. Subscribers are still notified of changes and asked to confirm saved inputs when they resume the agent.

**How to access:** No action is needed; subscriptions remain active automatically when owners edit agent inputs.

Agents

* * *

#### View usage for published agents before setting a limit[​](#view-usage-for-published-agents-before-setting-a-limit "Direct link to View usage for published agents before setting a limit")

The View usage action is now available for published agents with the feature enabled and the required edit permissions, even before a usage limit is configured.

**How to access:** Open a published agent and select View usage; requires the feature to be enabled and edit permissions on the agent.

Agents

* * *

#### Platform API examples use named placeholders[​](#platform-api-examples-use-named-placeholders "Direct link to Platform API examples use named placeholders")

Platform API reference examples now show named placeholders, such as `{agent_id}`, for caller-supplied values, making it clear which request fields must be replaced with values from your own instance.

**How to access:** No action is needed; the updated examples appear in the Platform API reference documentation.

Developer Platform

* * *

#### People suggestions reflect organizational proximity[​](#people-suggestions-reflect-organizational-proximity "Direct link to People suggestions reflect organizational proximity")

Personalized people ranking now considers organizational-chart distance, improving the relevance of people suggestions in autocomplete.

**How to access:** No action is needed; the improvement applies automatically to people suggestions in autocomplete.

Search

* * *

#### Host app usage links open filtered MCP Insights[​](#host-app-usage-links-open-filtered-mcp-insights "Direct link to Host app usage links open filtered MCP Insights")

Host app usage links now open MCP Insights at the usage breakdown with the selected host application filter already applied, so you land directly on the relevant view.

**How to access:** Select a host app usage link; MCP Insights opens with the host application filter already applied.

Glean MCP

* * *

#### Glean Protect navigation scales beyond the Admin Console[​](#glean-protect-navigation-scales-beyond-the-admin-console "Direct link to Glean Protect navigation scales beyond the Admin Console")

Glean Protect now has a scalable navigation area outside the Admin Console for SCMs and super admins, with sectioned menus that make security capabilities easier to find as they grow.

**How to access:** SCMs and super admins can use the new Glean Protect navigation area; sections appear as they are enabled for your deployment.

Glean Protect

* * *

#### Claude usage labeled correctly in Host apps[​](#claude-usage-labeled-correctly-in-host-apps "Direct link to Claude usage labeled correctly in Host apps")

The Host apps tab now correctly recognizes Claude for Teams and Enterprise usage as Claude, so active Claude usage no longer appears as Connect.

**How to access:** No action is needed; the corrected labeling appears automatically in the Host apps tab.

Admin Console

* * *

#### GitLab token check labeled as format validation[​](#gitlab-token-check-labeled-as-format-validation "Direct link to GitLab token check labeled as format validation")

GitLab connector setup now labels the access-token check as format validation, clarifying that a passing check confirms the token format but does not authenticate the token.

**How to access:** No action is needed; the clarified label appears in GitLab connector setup.

Connectors

* * *

#### MCP Insights estimates token and cost savings[​](#mcp-insights-estimates-token-and-cost-savings "Direct link to MCP Insights estimates token and cost savings")

Insights → MCP Servers now shows estimated token and cost savings from Glean Search for deployments with at least 1,000 weekly Glean Search MCP queries, helping you quantify the value of Glean Search in MCP workflows.

**How to access:** Open Insights → MCP Servers; estimates appear for deployments with at least 1,000 weekly Glean Search MCP queries.

Glean MCP

* * *

#### Index code files that have no extension in Git connectors[​](#index-code-files-that-have-no-extension-in-git-connectors "Direct link to Index code files that have no extension in Git connectors")

Git setup pages now let admins list code filenames that have no extension, such as `Dockerfile` and `Makefile`, for body indexing, so these common files become searchable.

**How to access:** In Git connector setup, list the filenames without extensions that you want included for body indexing.

Connectors

* * *

#### Clearer Marketo connector setup instructions[​](#clearer-marketo-connector-setup-instructions "Direct link to Clearer Marketo connector setup instructions")

Marketo connector setup instructions now identify the admin entry point, explain the least-privilege permission hierarchy, and show how to generate and retrieve the Client ID and Client Secret.

**How to access:** Follow the updated instructions in Marketo connector setup.

Connectors

* * *

#### Marketo setup requires completed authorization[​](#marketo-setup-requires-completed-authorization "Direct link to Marketo setup requires completed authorization")

Marketo setup now remains incomplete after credentials and the roles workbook are saved until the administrator successfully completes authorization, preventing an unverified setup from appearing complete.

**How to access:** Complete the authorization step in Marketo connector setup to finish configuration.

Connectors

* * *

#### Configure Box Inclusion Rules in Manage Data[​](#configure-box-inclusion-rules-in-manage-data "Direct link to Configure Box Inclusion Rules in Manage Data")

Box administrators can now configure Inclusion Rules directly in Manage Data. Full crawls can start from configured folders and reuse discovered folder owners for more efficient nested-folder crawling.

**How to access:** In the Admin Console, open Manage Data for Box to configure Inclusion Rules.

Connectors

* * *

## Fixes[​](#fixes "Direct link to Fixes")

* * *

#### Data source token refresh capacity is better isolated[​](#data-source-token-refresh-capacity-is-better-isolated "Direct link to Data source token refresh capacity is better isolated")

Data source instance token refreshes now use their dedicated queue range instead of sharing the action-pack queue range, improving refresh capacity isolation.

Platform

* * *

#### Custom action OAuth tokens renew more reliably[​](#custom-action-oauth-tokens-renew-more-reliably "Direct link to Custom action OAuth tokens renew more reliably")

Custom actions using OAuth Admin with the client-credentials grant can now renew expired access tokens even when an existing token record has no refresh token, preventing repeated prompts to authenticate again and permanent unauthorized states.

Actions

* * *

#### Agent Insights validates time-saved feedback[​](#agent-insights-validates-time-saved-feedback "Direct link to Agent Insights validates time-saved feedback")

Agent Insights now rejects time-saved feedback that is zero, negative, non-numeric, or over seven days, preventing invalid submissions from producing extremely large metrics.

Insights

* * *

#### Agent Insights excludes extreme time-saved outliers[​](#agent-insights-excludes-extreme-time-saved-outliers "Direct link to Agent Insights excludes extreme time-saved outliers")

Agent Insights now excludes time-saved outliers over seven days from precomputed totals, keeping time-saved metrics accurate for reporting.

Insights

* * *

#### Typeform MCP uses OAuth sign-in[​](#typeform-mcp-uses-oauth-sign-in "Direct link to Typeform MCP uses OAuth sign-in")

The Typeform MCP server now uses OAuth sign-in with Dynamic Client Registration. Production deployments must allowlist Glean's OAuth callback domain.

Glean MCP

* * *

#### Oversized click-boost entries no longer block indexing[​](#oversized-click-boost-entries-no-longer-block-indexing "Direct link to Oversized click-boost entries no longer block indexing")

Glean now limits click-boost metadata payloads and drops only oversized click-boost entries, preventing large payloads from blocking otherwise valid documents from indexing.

Search

* * *

#### Deletion tasks handle non-ASCII document IDs[​](#deletion-tasks-handle-non-ascii-document-ids "Direct link to Deletion tasks handle non-ASCII document IDs")

Asynchronous deletion tasks now preserve non-ASCII document IDs, and URL-data cleanup skips IDs that exceed the database column limit instead of failing the cleanup operation.

Platform

* * *

#### Auto Mode supports multi-word MCP tool names[​](#auto-mode-supports-multi-word-mcp-tool-names "Direct link to Auto Mode supports multi-word MCP tool names")

Auto Mode agents can now invoke selected multi-word MCP tools when the tool name is already formatted with spaces.

Agents

* * *

#### SharePoint agent knowledge sources appear correctly[​](#sharepoint-agent-knowledge-sources-appear-correctly "Direct link to SharePoint agent knowledge sources appear correctly")

SharePoint sites added as agent knowledge sources now appear as valid entries in the agent builder instead of being incorrectly marked invalid.

Agent Builder

* * *

#### Smoother caret navigation around pasted links[​](#smoother-caret-navigation-around-pasted-links "Direct link to Smoother caret navigation around pasted links")

Chat composer caret navigation around pasted document links now works naturally, allowing you to place the cursor before or after a document link and continue editing.

Chat

* * *

#### New Google Calendar connectors pass credential checks[​](#new-google-calendar-connectors-pass-credential-checks "Direct link to New Google Calendar connectors pass credential checks")

New Glean-hosted Google Cloud projects now enable the Google Calendar API during setup, preventing credentials health-check failures for newly configured Google Calendar connectors.

Connectors

* * *

#### More Confluence link types recognized as readable[​](#more-confluence-link-types-recognized-as-readable "Direct link to More Confluence link types recognized as readable")

Confluence folder, database, and whiteboard links that include a page-title slug are now recognized as readable document links.

Connectors

* * *

#### Veeva Vault ownership resolved more accurately[​](#veeva-vault-ownership-resolved-more-accurately "Direct link to Veeva Vault ownership resolved more accurately")

Veeva Vault document ownership now recognizes both supported owner roles, so documents use the Vault owner instead of the version author when that owner is available.

Connectors

* * *

#### Custom providers support more model pairings[​](#custom-providers-support-more-model-pairings "Direct link to Custom providers support more model pairings")

Custom-provider configurations now support additional GPT, Claude, and Gemini large/small model pair combinations, including GPT-5.6 Luna, Claude Sonnet 4.6 with Haiku 4.5, and Gemini 3.1 Pro with Gemini 3.6 Flash.

AI Models

* * *

#### GCP Spark batch jobs start successfully[​](#gcp-spark-batch-jobs-start-successfully "Direct link to GCP Spark batch jobs start successfully")

GCP Spark batch jobs using Dataproc Serverless 3.0 now have the required runtime IAM permissions and can start successfully.

Platform
