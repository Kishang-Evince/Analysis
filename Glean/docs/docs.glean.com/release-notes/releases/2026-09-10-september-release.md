---
url: "https://docs.glean.com/release-notes/releases/2026-09-10-september-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-09-10-september-release"
title: "September 10, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-10-13T08:50:33.017Z"
---
On this page

**Release version:** `release-2026-09-10`

This release adds 64 new vendor MCP server templates to the MCP server directory, turns on audio artifacts by default for eligible deployments, brings the Coda (Service Account) MCP template to public beta, and delivers enhancements and fixes across the Admin Console, connectors, platform, and developer surfaces.

## Major Launches[​](#major-launches "Direct link to Major Launches")

#### Connect 64 new vendor tools through the MCP server directory[​](#connect-64-new-vendor-tools-through-the-mcp-server-directory "Direct link to Connect 64 new vendor tools through the MCP server directory")

The MCP server directory now includes 64 new vendor MCP server templates, so your teams can bring trusted third-party data and tools directly into Glean conversations. New options span sales, finance, legal, healthcare, security, engineering, and marketing vendors, including Salesloft, CircleCI, MongoDB Atlas, BigID, Fitch Solutions, S&P Global Adaptive Retrieval, Oxford Economics, D&B Finance Analytics, LawVu, Canny, Funnel, Boomerang, AlphaSights, Staircase AI by Gainsight, and many more. Most templates connect through per-user OAuth, so each person accesses only the vendor data they are already permitted to see. For setup instructions, see [Connect remote MCP servers to Glean](https://docs.glean.com/administration/tools/connect-remote-mcp-servers-to-glean).

**How to access:** Admins can add these servers from the MCP server directory in the Admin Console. Most templates use per-user OAuth sign-in.

[Learn more](https://docs.glean.com/administration/tools/supported-mcp-servers)

Glean MCP *ROAD-1441*

#### Audio artifacts enabled by default[​](#audio-artifacts-enabled-by-default "Direct link to Audio artifacts enabled by default")

Audio artifacts are now enabled by default for eligible Glean Key deployments. You can turn chats, documents, and research into playable audio briefings and podcasts without waiting for your admin to switch the feature on, making it easier to catch up on work while commuting or between meetings. Explicit workspace access restrictions are still honored, so organizations that have limited who can use artifacts keep their existing controls.

**How to access:** On by default for eligible Glean Key deployments; ask Glean to create a podcast or audio version of your content. Admins can opt out in the Admin Console.

[Learn more](https://docs.glean.com/user-guide/assistant/podcast-artifacts)

Assistant *ROAD-1373*

#### Coda (Service Account) MCP template in public beta[​](#coda-service-account-mcp-template-in-public-beta "Direct link to Coda (Service Account) MCP template in public beta")

The Coda (Service Account) MCP server template is now in public beta. Admins can add it for service-identity agents without requiring an allowlist, letting agents act with their own scoped Coda credentials instead of borrowing an individual user's access. This gives teams a governed way to build agents that read and update Coda content as part of automated workflows, while keeping credentials centrally managed.

**How to access:** Admins can add the Coda (Service Account) credential template from the Admin Console; no allowlist is required.

[Learn more](https://docs.glean.com/administration/agent-identity)

Agents *ROAD-1542*

## Critical Updates[​](#critical-updates "Direct link to Critical Updates")

#### Memory for more personalized responses[​](#memory-for-more-personalized-responses "Direct link to Memory for more personalized responses")

Glean now uses memory to provide more relevant, personalized responses over time.

Learned memories use permitted workplace activity to personalize responses in the background. On Glean Core Suite plans, that usage is billed as Model Hub Usage on supported models. For Enterprise Flex plans, learned memories remain free through November 6, 2026, and begin consuming FlexCredits on November 7, 2026.

Saved memories and preferences are explicitly provided by users, included with every seat, and do not consume Model Hub Usage or FlexCredits.

The same experience is planned for self-hosted deployments by the end of September 2026.

**How to access:** No action is required. Admins can turn off learned memories in **Admin console → Advanced Features** and review plan and usage reporting before the Enterprise Flex billing date.

Assistant Memory

## Deprecations & Sunsets[​](#deprecations--sunsets "Direct link to Deprecations & Sunsets")

#### Deep Research follow-up query suggestions removed[​](#deep-research-follow-up-query-suggestions-removed "Direct link to Deep Research follow-up query suggestions removed")

Follow-up query suggestions no longer appear after Deep Research responses in Chat.

**How to access:** No action is required; the suggestions no longer appear.

Assistant

#### Bulk employee indexing endpoint removal extended to January 15, 2027[​](#bulk-employee-indexing-endpoint-removal-extended-to-january-15-2027 "Direct link to Bulk employee indexing endpoint removal extended to January 15, 2027")

The removal date for the `POST /api/index/v1/bulkindexemployees` endpoint has been extended from October 15, 2026 to January 15, 2027, giving integrators more time to migrate.

**How to access:** No immediate action is required; migrate any integrations off this endpoint before January 15, 2027.

Developer Platform

#### Agent sharing defaults return to legacy audience permissions[​](#agent-sharing-defaults-return-to-legacy-audience-permissions "Direct link to Agent sharing defaults return to legacy audience permissions")

Agent sharing now uses legacy audience permissions by default. Granular sharing controls remain in beta, and workspaces that explicitly enabled them keep their configured controls.

**How to access:** No action is required. Workspaces with granular sharing controls enabled are unaffected.

Agents *ROAD-1557*

## Enhancements[​](#enhancements "Direct link to Enhancements")

#### Clearer usage-limit alert thresholds[​](#clearer-usage-limit-alert-thresholds "Direct link to Clearer usage-limit alert thresholds")

Usage-limit controls in the Admin Console now make selected alert thresholds clearer, so billing admins can see at a glance which thresholds will trigger notifications.

**How to access:** Available automatically in the Admin Console usage-limit settings.

Admin Console

#### Coda Docs connector renamed to Superhuman Docs[​](#coda-docs-connector-renamed-to-superhuman-docs "Direct link to Coda Docs connector renamed to Superhuman Docs")

The Coda Docs connector is now named Superhuman Docs throughout the connector catalog, admin setup experience, and related UI surfaces, reflecting the vendor's product rename. The underlying connector key, API terminology, and setup field requirements are unchanged, so existing configurations continue to work without any changes.

**How to access:** No action is required; the new name appears automatically in the connector catalog and connector setup.

Connectors

#### Profile custom fields displayed for all users[​](#profile-custom-fields-displayed-for-all-users "Direct link to Profile custom fields displayed for all users")

Custom fields configured on people profiles now display below the About section for all users, making it easier to find team-specific profile details.

**How to access:** No action is required; custom fields appear automatically on people profiles below the About section.

Search

#### Add artifacts to projects from the Library[​](#add-artifacts-to-projects-from-the-library "Direct link to Add artifacts to projects from the Library")

You can now add artifacts to projects directly from the Library, where they appear under Sources. The Artifacts tab in projects is now named Outputs, making it clearer which items are project inputs and which are generated results.

**How to access:** Open the Library, select an artifact, and add it to a project. It appears under the project's Sources.

Assistant

#### O365 people-profile URL templates support metadata field paths[​](#o365-people-profile-url-templates-support-metadata-field-paths "Direct link to O365 people-profile URL templates support metadata field paths")

The O365 connector's `userProfileBaseUrl` setting now supports arbitrary metadata field paths in the form `%{field.path}`, so admins can build people-profile links from nested metadata fields rather than a single substitution value.

**How to access:** Configure `userProfileBaseUrl` with `%{field.path}` placeholders in the O365 connector setup.

Connectors

#### Web SDK controls for agents, projects, and skills in the embedded widget[​](#web-sdk-controls-for-agents-projects-and-skills-in-the-embedded-widget "Direct link to Web SDK controls for agents, projects, and skills in the embedded widget")

The Glean Web SDK now supports turning off agents, projects, and skills in the embedded chat widget through `customizations.features`. Unlike existing options that hide individual UI elements, these remove the feature as a whole concept, including navigation, chat bar controls, and direct routes. All three default to enabled, so existing embeds are unaffected.

**How to access:** Set the corresponding flags in `customizations.features` in your Web SDK configuration.

Developer Platform

#### Private Service Connect support for Secure Web Proxy integrations on GCP[​](#private-service-connect-support-for-secure-web-proxy-integrations-on-gcp "Direct link to Private Service Connect support for Secure Web Proxy integrations on GCP")

GCP deployments using dedicated custom IAM roles can now provision and manage Private Service Connect forwarding rules for Secure Web Proxy integrations, expanding supported network configurations for security-conscious deployments.

**How to access:** Available for GCP deployments using dedicated custom IAM roles; no additional configuration is needed beyond your existing deployment setup.

Platform

#### Audience selectors included in action product-snapshot log events[​](#audience-selectors-included-in-action-product-snapshot-log-events "Direct link to Audience selectors included in action product-snapshot log events")

Action product-snapshot log events now include the user, department, and external-group audience selectors configured for Chat, Agents, and Platform, giving audit teams a fuller picture of how action visibility is configured. This is a logging-only change and does not alter action visibility or runtime access control.

**How to access:** Included automatically in exported product-snapshot log events.

Platform

#### Assistant activity events scrubbed in customer event logs[​](#assistant-activity-events-scrubbed-in-customer-event-logs "Direct link to Assistant activity events scrubbed in customer event logs")

Assistant activity events (GLEANBOTACTIVITY) exported to customer event logs are now scrubbed when raw event logging is disabled for the deployment. Previously these events were always emitted in raw form, so user email addresses and department names could appear in logs that were expected to contain only obfuscated identifiers.

**How to access:** Applied automatically when raw event logging is disabled for your deployment.

Platform

#### Generated answer links open the correct file[​](#generated-answer-links-open-the-correct-file "Direct link to Generated answer links open the correct file")

Generated answer links to downloadable files and artifacts now preserve the file or artifact link instead of opening an unrelated Knowledge Graph entity panel.

**How to access:** No action is required; the corrected link behavior applies automatically.

Search

## Fixes[​](#fixes "Direct link to Fixes")

#### Chat-history privacy opt-outs apply across all identities[​](#chat-history-privacy-opt-outs-apply-across-all-identities "Direct link to Chat-history privacy opt-outs apply across all identities")

Fixed an issue where users with multiple email identities could not re-enable chat history. Privacy settings now apply across all of a user's identities, and the settings page reflects an opt-out from any identity.

Assistant

#### Project access preserved after identity changes[​](#project-access-preserved-after-identity-changes "Direct link to Project access preserved after identity changes")

Project permission checks now match alias-backed user roles against both stored and current canonical identities, preventing authorized owners, editors, and viewers from losing access after an identity change.

Assistant

#### Agent share lists no longer show duplicates[​](#agent-share-lists-no-longer-show-duplicates "Direct link to Agent share lists no longer show duplicates")

Agent share access lists now use consistent person identifiers, preventing duplicate entries when searching for teammates. Sharing and unsharing agents also works correctly when legacy stored identifiers differ from the canonical person ID.

Agents

#### Slack private channels discovered in custom no-bot setups[​](#slack-private-channels-discovered-in-custom-no-bot-setups "Direct link to Slack private channels discovered in custom no-bot setups")

Fixed an issue that prevented Slack private channels invited to the Glean bot from being discovered in custom no-bot Slack setups.

Connectors

#### LumApps deep links resolve to the indexed document[​](#lumapps-deep-links-resolve-to-the-indexed-document "Direct link to LumApps deep links resolve to the indexed document")

LumApps deep links pasted from the browser now resolve to the indexed document in Glean Assistant, Agents, and Doc Reader.

Connectors
