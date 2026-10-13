---
url: "https://docs.glean.com/release-notes/releases/2026-09-29-september-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-09-29-september-release"
title: "September 29, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:33.248Z"
---
On this page

**Release version:** `558`

This release turns on usage limits for identity provider (IdP) groups by default, adds PowerPoint export for HTML slide decks, brings Claude Sonnet 5.5 to Assistant and Agents, and expands the Model Context Protocol (MCP) server library with 67 new templates. It also delivers new connector betas, stronger permissions enforcement, durable agent-run APIs, and a set of reliability fixes.

## Major launches[​](#major-launches "Direct link to Major launches")

#### Set usage limits for identity provider (IdP) groups from the billing dashboard[​](#set-usage-limits-for-identity-provider-idp-groups-from-the-billing-dashboard "Direct link to Set usage limits for identity provider (IdP) groups from the billing dashboard")

Admins can now set usage limits for identity provider (IdP) groups directly from the billing dashboard. Many enterprises already manage access through IdP groups, so this brings spend control to the same groups your organization uses everywhere else. Group-mode spend limits are on by default, giving finance and platform owners finer-grained control over consumption without extra setup, and they can still be turned off for your deployment if you prefer a different model.

**How to access:** Admins set group limits from the billing dashboard in the Admin console. Group mode is on by default and can be turned off per deployment.

[Learn more](https://docs.glean.com/administration/management/usage/set-usage-limits-and-alerts)

Admin Capabilities *\[ROAD-1629\]*

* * *

#### Export HTML slide decks as PowerPoint presentations[​](#export-html-slide-decks-as-powerpoint-presentations "Direct link to Export HTML slide decks as PowerPoint presentations")

You can now export eligible HTML slide decks as editable PowerPoint (.pptx) presentations directly from the artifact export menu. Instead of rebuilding Glean-generated decks by hand, download a fully editable file and polish it in the tool your team already uses for presentations — speaker-ready formatting included. This closes the loop between generating a deck in Glean and delivering it in your organization's standard format. Access is admin gated, so your admin controls who can use the export.

**How to access:** Open an eligible HTML slide deck and choose PowerPoint from the artifact export menu. Access is admin gated.

[Learn more](https://docs.glean.com/user-guide/assistant/slide-generation)

Assistant *\[ROAD-898\]*

* * *

#### Productboard connector now in public beta[​](#productboard-connector-now-in-public-beta "Direct link to Productboard connector now in public beta")

The Productboard connector is now available in public beta. Connect Productboard to Glean to make your product management content searchable alongside the rest of your company knowledge, so product teams can find notes, features, and feedback without switching tools. As a beta release, the connector is still evolving — your feedback helps shape what ships at general availability.

**How to access:** Admins can add Productboard as a data source from the Admin console.

Connectors

* * *

#### Authorize GitLab with your own account (private beta)[​](#authorize-gitlab-with-your-own-account-private-beta "Direct link to Authorize GitLab with your own account (private beta)")

GitLab connector setup now supports user OAuth, so teammates can authorize GitLab with their own accounts and search private groups and projects according to the access they already have. This keeps GitLab results permissions-aware without requiring identity uploads, and it gives each person results that match exactly what they can see in GitLab. The capability is in private beta.

**How to access:** Private beta — reach out to your Glean account team to participate. Admins then configure user OAuth in the GitLab connector setup.

[Learn more](https://docs.glean.com/connectors/native/gitlab/about)

Connectors *\[ROAD-1658\]*

* * *

#### Manage your notifications in one place[​](#manage-your-notifications-in-one-place "Direct link to Manage your notifications in one place")

A new Notifications page in Settings brings your notification preferences together, including email categories and browser notifications. Instead of hunting through Preferences for scattered email options, you get one dedicated place to decide what Glean tells you about and how. This makes it easier to tune notifications to your workflow — keep the alerts that matter and quiet the rest.

**How to access:** Go to Settings → Notifications in Glean.

Platform *\[ROAD-1654\]*

* * *

#### 67 new MCP server templates[​](#67-new-mcp-server-templates "Direct link to 67 new MCP server templates")

The Model Context Protocol (MCP) server library keeps growing. This release adds 67 new remote server templates: Acquirepad Commercial Real Estate Activity Intelligence, Highspot, CE Cosmos Deep Dive, SNOMED CT terminology, Orca Security, Jiminny, Fingerprint, Stocklake, Upfluence, Aiven, Windsor.ai for Social Media, Socialinsider, Agility Media Intelligence, Token Terminal, Windsor.ai for Web Analytics, Felt Maps, LunarCrush, Maze, NeetoDesk, QuickFile, FlowGuideAI, Vitally, MyGeotab, Adzviser Google Analytics, Glow for WordPress, Wiv, SaaSify, Sabre Developer Hub, DocketBird, Apaleo, CISO360AI, taskPilot, CometChat, Aphex, CaDoMi.ai, Brainfish, Evarist, eino, GoodDay, Hiveflow, Hgraph, Instrumentl, iSpv, Juicy Profit Analytics, FlowAccount, HelpDocs, Introw Partner Connect, Inbox Monster, iubenda, Fuse Inventory, Jurnie, freee, Horizon, FreightPOP, Lyssna, Hiver Omni, Attribution, Ubersuggest, Cayra, DiligenceSquared, Dataslayer, CreatorDB, Granted, Grid Control, Flockjay, Interfy, and Hardline. Most templates authenticate with per-user OAuth, and several belong to the unverified tier, so admins should review them before enabling them for their organization.

**How to access:** Admins enable the templates they want from the MCP server library.

Actions *\[ROAD-1441\]*

## AI & model updates[​](#ai--model-updates "Direct link to AI & model updates")

#### Claude Sonnet 5.5 in Assistant and Agents[​](#claude-sonnet-55-in-assistant-and-agents "Direct link to Claude Sonnet 5.5 in Assistant and Agents")

Claude Sonnet 5.5 is now available as a distinct selectable model in Glean Assistant and Agents, giving you another premium Anthropic model option for coding, agentic workflows, research, and long-horizon knowledge work. Sonnet 5.5 does not replace Claude Sonnet 5 and is not part of automatic model routing, so existing model selections stay unchanged. Admins manage model availability and eligible provider routes. This feature may be subject to usage-based pricing.

**How to access:** Select Claude Sonnet 5.5 from the model picker in Assistant or on supported Agent steps. Admins control model availability in the Admin console.

[Learn more](https://docs.glean.com/release-notes)

Assistant *\[ROAD-1754\]*

* * *

## Critical updates[​](#critical-updates "Direct link to Critical updates")

#### Evaluation runs no longer execute write actions[​](#evaluation-runs-no-longer-execute-write-actions "Direct link to Evaluation runs no longer execute write actions")

Fixed an issue where internal quality-evaluation runs could execute write actions — for example, sending an email or editing a spreadsheet — through connected third-party tools. Evaluation runs, including voice evaluation runs, now simulate write actions by default and never execute them against connected accounts.

**How to access:** No action needed. The safeguard applies automatically.

Platform

* * *

#### Externally organized calendar events no longer crawled by default[​](#externally-organized-calendar-events-no-longer-crawled-by-default "Direct link to Externally organized calendar events no longer crawled by default")

Outlook Calendar and Teams now crawl organizer-owned calendar events by default, which reduces processing delays for large meetings. Meetings organized outside your crawled user population may no longer be included unless external-event crawling is explicitly enabled for your deployment.

**How to access:** No action needed for the performance improvement. External-event crawling can still be explicitly enabled for your deployment if you need coverage of externally organized meetings.

Connectors

* * *

#### More accurate Azure Files permissions[​](#more-accurate-azure-files-permissions "Direct link to More accurate Azure Files permissions")

Azure Files permission enforcement is now more precise. Glean honors root-scoped and inherited role assignments, matches wildcard permission patterns, and unions compatible share-read and file-read grants across each user or group principal while preserving deny precedence. Glean also honors the storage account's default share-level permission when determining document access, while continuing to enforce Azure deny assignments and New Technology File System (NTFS) permissions.

**How to access:** No action needed. The improvements apply automatically to Azure Files connectors.

Connectors

* * *

#### Egnyte path restrictions now apply to queued work[​](#egnyte-path-restrictions-now-apply-to-queued-work "Direct link to Egnyte path restrictions now apply to queued work")

Egnyte file tasks now recheck configured path restrictions before processing, so newly excluded files are skipped even if their tasks were queued earlier. This means restriction changes take effect promptly instead of waiting for queued work to drain.

**How to access:** No action needed. Existing path restrictions are enforced automatically.

Connectors

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Control MCP write-action approvals per server[​](#control-mcp-write-action-approvals-per-server "Direct link to Control MCP write-action approvals per server")

Glean MCP servers gain an `enableElicitations` setting, on by default. Glean asks the user before write actions using MCP elicitation, since not all hosts provide human-in-the-loop controls. Admins can switch it off for a server to rely on the MCP host's own approval prompts instead. The setting is also available in the Glean MCP server create and update APIs.

**How to access:** Admins configure the setting per MCP server, or set `enableElicitations` through the MCP server APIs.

Glean MCP

* * *

#### Durable agent runs through the Agents API[​](#durable-agent-runs-through-the-agents-api "Direct link to Durable agent runs through the Agents API")

The Agents API now supports durable runs end to end. Runs can continue after the initiating HTTP request disconnects and expose a persisted run ID for polling. The APIs accept tool-approval decisions and resume the same durable run, with idempotent replay of accepted decisions, and support cooperative cancellation of a run — including while it waits for tool approval.

**How to access:** Available through the Platform Agents API.

Platform

* * *

#### Faster Assistant responses with more precise skill use[​](#faster-assistant-responses-with-more-precise-skill-use "Direct link to Faster Assistant responses with more precise skill use")

Glean Assistant now responds faster and uses skills more precisely, because it no longer loads skill suggestions before every answer.

**How to access:** No action needed. The improvement applies automatically.

[Learn more](https://docs.glean.com/administration/assistant/features/agentic-engine/agent-sandbox-ptc)

Assistant *\[ROAD-1490\]*

* * *

#### Advance notice before agent ownership consolidation[​](#advance-notice-before-agent-ownership-consolidation "Direct link to Advance notice before agent ownership consolidation")

Advance notice emails are now on by default for the upcoming single-owner agent migration, so co-owners are informed before ownership is consolidated.

**How to access:** No action needed. Affected co-owners receive the notice emails automatically.

Agents *\[ROAD-1558\]*

* * *

#### Creator logos for open models[​](#creator-logos-for-open-models "Direct link to Creator logos for open models")

Assistant chats now show creator logos for open models, matching the model picker in the composer, so it's easier to see which model produced a response.

**How to access:** No action needed. Logos appear automatically in chats.

Assistant

* * *

#### Refresh A2A agent cards in place[​](#refresh-a2a-agent-cards-in-place "Direct link to Refresh A2A agent cards in place")

Admins can refresh an Agent2Agent (A2A) server's agent card directly from the edit drawer, without leaving the form.

**How to access:** Open the A2A server's edit drawer and select refresh.

Agents

* * *

#### Select all matching departments at once[​](#select-all-matching-departments-at-once "Direct link to Select all matching departments at once")

Admins can select all matching departments in one step when assigning the Departmental Agent Moderator role, instead of picking departments one by one.

**How to access:** Use the select-all option in the department picker when assigning the role.

Admin Capabilities

* * *

#### Clearer Ironclad connector errors[​](#clearer-ironclad-connector-errors "Direct link to Clearer Ironclad connector errors")

Ironclad connector validation now reports a clear, actionable `IRONCLAD3` error when the admin OAuth token is missing, instead of failing with a generic error. The message tells admins to reconnect Ironclad as an administrator.

**How to access:** No action needed. The clearer error appears automatically during Ironclad validation.

[Learn more](https://docs.glean.com/troubleshooting/error-codes/ironclad/ironclad-3)

Connectors

* * *

#### Authorize Glean after Slack migrations[​](#authorize-glean-after-slack-migrations "Direct link to Authorize Glean after Slack migrations")

Users can now authorize migrated Slack instances after an administrator completes the Slack migration setup, so access recovers smoothly after a workspace migration.

**How to access:** After your admin completes the Slack migration setup, authorize Slack again when prompted.

Connectors

* * *

#### Find Team chat in Feature rollouts[​](#find-team-chat-in-feature-rollouts "Direct link to Find Team chat in Feature rollouts")

Admins can now find Team chat in Feature rollouts and follow a link to manage its audience in Assistant settings, making it easier to control who can use the open beta.

**How to access:** Admin console → Feature rollouts → Team chat, then manage the audience in Assistant settings.

Admin Capabilities *\[ROAD-1346\]*

* * *

#### Separate view and edit permissions for model settings[​](#separate-view-and-edit-permissions-for-model-settings "Direct link to Separate view and edit permissions for model settings")

Large language model (LLM) pages in the Admin console now check separate permissions for viewing and updating configuration, so access maps more precisely to each admin role.

**How to access:** No action needed. The permission checks apply automatically.

Admin Capabilities

* * *

#### More reliable Microsoft 365 crawler authentication[​](#more-reliable-microsoft-365-crawler-authentication "Direct link to More reliable Microsoft 365 crawler authentication")

SharePoint and OneDrive crawler operations now use their configured crawler apps, while identity operations continue to use identity credentials, preventing authentication routing issues.

**How to access:** No action needed. The fix applies automatically.

Connectors

* * *

#### Fresher Intercom indexing[​](#fresher-intercom-indexing "Direct link to Fresher Intercom indexing")

Intercom incremental crawl work is now prioritized over background full-refresh work, improving indexing freshness when both crawl modes overlap.

**How to access:** No action needed. The prioritization applies automatically.

Connectors

## Fixes[​](#fixes "Direct link to Fixes")

#### Yammer crawls recover[​](#yammer-crawls-recover "Direct link to Yammer crawls recover")

Fixed token refresh for Yammer connectors, which was causing crawls to fail.

Connectors

* * *

#### Date-filtered Outlook searches return results[​](#date-filtered-outlook-searches-return-results "Direct link to Date-filtered Outlook searches return results")

The MCP `outlooksearch` tool now documents valid date-filter syntax, so date-filtered email searches return matching results instead of nothing.

Glean MCP

* * *

#### Code Writer on AWS stays available[​](#code-writer-on-aws-stays-available "Direct link to Code Writer on AWS stays available")

Internal image cleanup no longer deletes an image still named in a running service's environment, preventing recurring Code Writer failures on AWS.

Platform

* * *

#### People profile photos work in document tools[​](#people-profile-photos-work-in-document-tools "Direct link to People profile photos work in document tools")

Glean Document Reader can now open People profile photos hosted on your deployment, so tools such as Create presentation can use them.

Assistant

* * *

#### Reliable Slack workspace metadata crawls[​](#reliable-slack-workspace-metadata-crawls "Direct link to Reliable Slack workspace metadata crawls")

Slack workspace metadata crawls now use a workspace-capable token with the required read permission, including setups that use Gleanbot for private-channel crawling.

Connectors
