---
url: "https://docs.glean.com/release-notes/releases/2026-03-25-march-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-03-25-march-release"
title: "March 25, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.616Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### New actions added in agents will not support customization of parameters[​](#new-actions-added-in-agents-will-not-support-customization-of-parameters "Direct link to New actions added in agents will not support customization of parameters")

Glean is simplifying how new actions are introduced and maintained in Assistant and Agents. Going forward, agents will no longer support per-action parameter customization for any newly added action. Instead, these actions have use a clean, standard configuration so Glean can safely improve parameters and behavior over time without breaking existing workflows. If you need consistent parameter values (for example, always using a 30-minute meeting duration), you can still enforce this via agent-level action instructions rather than low-level parameter overrides.

**How to access:** To standardize how parameters are filled (for example, default durations or statuses), agent builders should use the agent's action instructions to tell Assistant how to populate those fields instead of relying on per-action parameter customization.

[Learn more](https://docs.glean.com/actions/actions-overview)

Actions *ROAD-1207*

* * *

#### Agent delete flow changes[​](#agent-delete-flow-changes "Direct link to Agent delete flow changes")

The agent deletion flow now explicitly warns that removals are permanent and non-recoverable, reducing the risk of accidental loss. To streamline management, the Delete button has been removed from the Template Library. Use the Agent Builder as the single hub for sharing and deletion.

**How to access:** Administrators must enable for your organization. Admins can recover deleted agents by navigating to the Admin Console, clicking "Agents", and selecting the "Recover deleted agents" section.

[Learn more](https://docs.glean.com/administration/managing-agents/deleting-and-restoring-agents)

Agents *ROAD-1008*

* * *

#### Share agents with permissions groups[​](#share-agents-with-permissions-groups "Direct link to Share agents with permissions groups")

Share Glean agents with user groups from your connected identity provider (Azure Active Directory via O365 or Google Groups), not just with individuals or departments. This makes it easier for organizations-especially at enterprise scale-to manage who can access specific agents, speed up agent rollout, and give the right teams or communities instant access. Admins and Agent Moderators can share agents with any group from the configured IdP system. Default Members-if group sharing is enabled-can share with groups they're part of. When an agent is shared with a group, all group members get the assigned permissions (view, edit, or owner) for that agent, and group membership changes are automatically reflected in agent access.

**How to access:** Administrators must enable for your organization. Admins can enable sharing agents with IdP groups by navigating to the Admin Console, clicking the "Agents" tab, and configuring the data source to be used for sharing agents with groups.

[Learn more](https://docs.glean.com/administration/managing-agents/agent-group-sharing)

Agents *ROAD-763*

* * *

#### Agents in Slack now respond more intelligently[​](#agents-in-slack-now-respond-more-intelligently "Direct link to Agents in Slack now respond more intelligently")

Agents deployed to Slack channels now use smarter question detection to determine when to respond. Instead of relying on generic question detection, the system considers the agent's configured capabilities, conversation starters, and any user-provided instructions to decide whether to proactively respond to a message. This ensures agents trigger appropriately based on what they are designed to do, reducing false triggers and missed responses. Admins can further refine behavior by providing custom instructions for each agent's Slack deployment.

**How to access:** This behavior applies to agents that are published to Slack channels using a chat trigger and the standard "Publishing to Slack" flow in the Agent Builder.

To use it, publish your agent to the appropriate Slack channels from the Share dialog, ensuring the agent has clear conversation starters and scoped instructions that describe what it should handle in that channel.

Admins can continue to control where Glean responds in Slack using the existing "Enable Gleanbot to respond in channels" settings and per-channel /glean configure controls.

If your deployment uses feature flags, the new detection logic can be rolled out via the documented flags for agent question detection in Slack; once enabled, no additional per-user setup is required.

[Learn more](/administration/platform/embedded-integrations/slackbot/admin-guide/customize-question-detection)

Agents *ROAD-1200*

* * *

#### Use of Nano Banana 2 in Assistant and Agents[​](#use-of-nano-banana-2-in-assistant-and-agents "Direct link to Use of Nano Banana 2 in Assistant and Agents")

Glean now uses Nano Banana 2 as the default image generation model in Assistant and Agents, delivering faster image generation with comparable or improved visual quality over Nano Banana Pro. The upgraded model offers significantly better capacity and throughput, reducing rate-limiting errors during peak usage. All existing image generation workflows-including inline images in Assistant, the Image Creation node in Agent Builder, and image actions in Plan & Execute agents-work seamlessly with the new model.

This feature may use credits. Learn more in Glean's Help Center.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/user-guide/about/end-user-quick-start-guide)

Assistant *ROAD-1209*

* * *

#### Claude Opus 4.6 in Assistant and Agents[​](#claude-opus-46-in-assistant-and-agents "Direct link to Claude Opus 4.6 in Assistant and Agents")

Glean supports Claude Opus 4.6 for Glean universal model key customers on Assistant and Agents. We also offer Opus 4.6 for customer keys deployments for Glean agents (agent builder) via Vertex AI and AWS Bedrock.

Claude Opus 4.6 delivers state-of-the-art performance for agentic coding, search, and knowledge work, enabling higher-quality, longer-horizon reasoning in chat and autonomous workflows. With support for 1M-token context and improved long-context retrieval, users can tackle more complex, multi-document tasks and reduce context-rot failures in long conversations. This reinforces Glean's position as best-in-class for long-context, agentic knowledge work.

This feature may use credits. Learn more in Glean's Help Center.

**How to access:** Administrators must enable for your organization. Glean universal model key customers can turn on model choice in Assistant and configure their models in the model hub. Customer key customers can configure models directly in model hub.

[Learn more](https://docs.glean.com/administration/llms)

Assistant *ROAD-1138*

* * *

#### Expand list of supported doc types in file upload[​](#expand-list-of-supported-doc-types-in-file-upload "Direct link to Expand list of supported doc types in file upload")

Going forward, file uploads will support 50+ additional text-based formats (e.g., TSV, TOML, RST, MD) that were previously restricted. Security safeguards remain in place to continue blocking unsafe file types while improving compatibility for valid text files.

[Learn more](/user-guide/assistant/file-upload#supported-file-formats)

Assistant *ROAD-1186*

* * *

#### Search now can filter by Google Drive labels[​](#search-now-can-filter-by-google-drive-labels "Direct link to Search now can filter by Google Drive labels")

Users can now filter and refine search results in Glean based on Google Drive document labels. When this feature is enabled, a "Labels" filter appears in the search experience-making it easier to find specific documents by their assigned Google Drive labels. This enhancement helps users quickly identify and differentiate internal, client-shareable, or otherwise labeled documents, streamlining information access and supporting better information governance. Search by label improves accuracy and efficiency for teams who use Google Drive labels for classification and visibility.

**How to access:** Administrators must enable for your organization. Admins must enable via Admin Console → Data sources → Google Drive → Setup and turn on Drive labels / Enable Google Drive labels.

[Learn more](https://docs.glean.com/connectors/native/gdrive/restrict-drive-sensitivity-labels)

Connectors *ROAD-756*

* * *

#### Docs.glean.com update[​](#docsgleancom-update "Direct link to Docs.glean.com update")

You may notice minor visual differences as we update our docs site to allow for future enhancements.

[Learn more](https://docs.glean.com/)

Platform Capabilities *ROAD-1150*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Admin Left Nav Enhancement[​](#admin-left-nav-enhancement "Direct link to Admin Left Nav Enhancement")

We've made some updates to Admin settings to make navigation clearer and help you get to the right controls faster. As Glean has grown, there's simply more to manage in admin. This update is designed to better organize settings so it's easier to find what you need and understand where different controls live.

We've introduced a few new categories in Admin that replace Settings including:

User and permissions - includes User management (formerly Teammates), Networking, Single sign-on, Third-party access, and Audit logs Customization - includes Appearance Notifications- includes alerts and email settings What's new - includes Feature rollouts and Admin updates We hope this update makes Admin feel more intuitive and easier to navigate as your use of Glean grows.

**How to access:** This update applies automatically in the Glean Admin Console - no additional setup is required. Admins will see the new left nav structure the next time they sign in and can continue using all existing settings and controls as before. If you need help locating a specific page, use the Admin Console search or refer to the Admin Guide in the Help Center.

[Learn more](https://docs.glean.com/administration/about)

Admin Capabilities *ROAD-1196*

* * *

#### Manager-level view on Insights[​](#manager-level-view-on-insights "Direct link to Manager-level view on Insights")

The Insights page will now include a new "Manager" tab that will provide a table view of the usage of Glean within teams under different managers, enabling you to understand the managers who are able to drive adoption and those that need assistance.

[Learn more](https://docs.glean.com/administration/insights/departments-and-managers/)

Admin Capabilities *ROAD-1175*

* * *

#### \[Action Required\] Sunsetting Gemini Pro Preview 3.0[​](#action-required-sunsetting-gemini-pro-preview-30 "Direct link to [Action Required] Sunsetting Gemini Pro Preview 3.0")

Google is retiring Gemini Pro 3.0 on March 26, 2026, so Glean will stop supporting Gemini Pro 3.0 models in Assistant and Agents and migrate configurations to supported successors such as Gemini Pro 3.1 or Gemini Flash 3. If you're using Gemini 3.0 on your own key, please ensure a supported Gemini model is available in your GCP project and update your model selection in the LLM configuration page before the deprecation date to avoid disruption; Glean-key deployments will be migrated automatically, and Agent Builders have been notified if their agents selected this model.

[Learn more](https://docs.glean.com/administration/llms)

Agents *ROAD-1223*

* * *

#### Restrict Google Drive content based on sensitivity labels[​](#restrict-google-drive-content-based-on-sensitivity-labels "Direct link to Restrict Google Drive content based on sensitivity labels")

Admins can configure a label-based redlists (Option List/Badge List selection IDs) to exclude sensitive Google Drive data from being visible within Glean.

[Learn more](https://docs.glean.com/connectors/native/gdrive/restrict-drive-sensitivity-labels)

Connectors *ROAD-760*

* * *

#### Create static OAuth clients to connect apps to Glean[​](#create-static-oauth-clients-to-connect-apps-to-glean "Direct link to Create static OAuth clients to connect apps to Glean")

Glean now lets admins create static OAuth clients in the Admin Console, making it easier to connect trusted applications-like internal tools or third-party apps such as Zoom-to Glean on behalf of users. By using Glean as the OAuth authorization server instead of relying on your identity provider for every integration, you can reduce setup friction between IdP and Glean admins and prepare for finer-grained, Glean-defined scopes in future Client API integrations. This update is especially valuable for organizations and partners that want a standard, secure way to obtain Glean access tokens for MCP hosts and other OAuth-capable apps.

**How to access:** To use static OAuth clients, first enable the Glean OAuth Authorization Server by going to the Admin Console and navigating to Settings → Third-party access (OAuth), then turning on the Glean OAuth Authorization Server. Once enabled, you can create and manage OAuth clients from this area, configuring redirect URIs and scopes according to the requirements of your internal or third-party applications. For MCP remote servers and other OAuth-enabled apps, point the client to Glean's Authorization and Token endpoints and complete a standard Authorization Code with PKCE flow to obtain access tokens.

[Learn more](https://docs.glean.com/administration/oauth/authorization-server)

Developer Experience *ROAD-1195*
