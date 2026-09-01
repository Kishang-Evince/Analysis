---
url: "https://docs.glean.com/release-notes/releases/2026-07-29-july-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-07-29-july-release"
title: "July 29, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:54.441Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Model Selector in Builder Assistant[​](#model-selector-in-builder-assistant "Direct link to Model Selector in Builder Assistant")

Builder Assistant now includes a model selector so agent builders can choose which large language model powers each compiler chat. The chat bar shows the current model, and every response clearly indicates which model was used, matching the Assistant experience. This gives admins more control over cost and quality when Builder Assistant usage is billed, while keeping the default "Auto" model for new sessions.

**How to access:** Administrators must enable for your organization. Builder Assistant with model selection is available to all customers who can access the Agent Builder and use Builder Assistant. Admins should ensure that any premium models they want builders to use are enabled in their model settings. No additional configuration is required beyond existing model and billing setup. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/get-started/golive/model-choice)

Agents *\[ROAD-1566\]*

* * *

#### Call Third-Party Agents from Glean Agents via A2A[​](#call-third-party-agents-from-glean-agents-via-a2a "Direct link to Call Third-Party Agents from Glean Agents via A2A")

Glean agents can now call external third-party agents that support the A2A (Agent-to-Agent) protocol, so complex workflows can seamlessly span Glean and other agent platforms. Admins register external A2A agent servers in the Admin Console with OAuth credentials, and agent builders can add those external agents as sub-agents in Plan & Execute and Auto Mode workflows. This lets Glean agents delegate specialized tasks to domain-specific agents built on any A2A-compliant platform, while preserving per-user authentication, permissions, and governance across systems. This feature is available for all customers using Glean Agents and may be subject to usage-based pricing.

**How to access:** Administrators must enable for your organization. To enable this capability, a Glean admin must go to the Admin Console and register one or more external A2A agent servers, including their A2A agent card URL and OAuth client credentials, under Settings → Third-party agents. Admins should then configure which external agents are available to use in agent workflows via Settings → Assistant → Agent orchestrator. Once configured, agent builders can select and add these third-party agents as sub-agents in the agent builder; no additional setup is required for end users beyond any standard sign-in or consent flow enforced by the external platform. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/platform/expose-agents-over-a2a)

Agents *\[ROAD-1560\]*

* * *

#### Adaptive Reasoning \[Customer key\][​](#adaptive-reasoning-customer-key "Direct link to Adaptive Reasoning [Customer key]")

Adaptive reasoning dynamically decides how long to reason based on the user's query. This makes Glean Assistant feel faster for easy queries while preserving its quality for more difficult ones.

[Learn more](https://docs.glean.com/administration/assistant/features/adaptive-reasoning)

Assistant *\[ROAD-1376\]*

* * *

#### Glean Assistant can now query BigQuery with natural language or SQL[​](#glean-assistant-can-now-query-bigquery-with-natural-language-or-sql "Direct link to Glean Assistant can now query BigQuery with natural language or SQL")

Glean Assistant can now query BigQuery directly through BigQuery MCP, Google's official MCP server for BigQuery, so users can ask questions in natural language or run SQL against approved projects and datasets without leaving Assistant. This makes Glean a front door to your warehouse so business users get governed, self-serve access to live data while data teams stay in control of what is exposed and how it is queried.

[Learn more](https://docs.glean.com/tools/connector/googlecloud)

Connectors *\[ROAD-1165\]*

* * *

#### Claude Opus 5 in Assistant and Agents[​](#claude-opus-5-in-assistant-and-agents "Direct link to Claude Opus 5 in Assistant and Agents")

Claude Opus 5, Anthropic's latest premium Opus-class model, is now available in Glean Assistant model choice and in Agents. It delivers Anthropic's highest-quality performance for coding, agentic workflows, and long-horizon enterprise tasks, giving teams a powerful new option when they need stronger reasoning than standard models can provide. Customers already using Opus-class models can adopt Opus 5 as their new Anthropic premium choice without changing how they work in Assistant or the agent builder. This feature may be subject to usage-based pricing; see your plan details for how premium models are billed.

**How to access:** Administrators must enable Claude Opus 5 for your organization before users and agent builders can select it. In the Admin Console, go to Platform → LLMs (Model Hub), make sure your Anthropic provider configuration is set up, and turn on the Claude Opus 5 model for Assistant and Agents. If you want to limit access, you can hide premium models from model pickers or restrict Claude Opus 5 to specific departments using the existing model governance controls. Once enabled, end users can pick Claude Opus 5 from the model picker in Assistant, and builders can select it in the agent builder for eligible agents and steps. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/llms)

Agents *\[ROAD-1592\]*

* * *

#### Gemini 3.6 Flash in Assistant and Agents[​](#gemini-36-flash-in-assistant-and-agents "Direct link to Gemini 3.6 Flash in Assistant and Agents")

Gemini 3.6 Flash is now available in Glean Assistant model choice and in the Agents model hub. Gemini 3.6 Flash offers significantly better cost efficiency than larger frontier models while maintaining strong reasoning for well-scoped agent tasks.

**How to access:** Glean Universal Model Key: Gemini 3.6 Flash appears automatically in the Assistant model choice dropdown and Agents model hub. Admins can exclude it via Admin Console → Platform → Models.

Customer Key: Gemini 3.6 Flash is available via Admin Console → Platform → Models. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/llms)

Agents *\[ROAD-1584\]*

* * *

#### A simpler setup flow for end users connecting to Glean MCP[​](#a-simpler-setup-flow-for-end-users-connecting-to-glean-mcp "Direct link to A simpler setup flow for end users connecting to Glean MCP")

We've refined the end-user setup experience so the default Glean MCP server is the clearest path for most users, while still preserving access to additional servers for advanced use cases. The updated flow also makes connected apps and authorization wording easier to understand, and gives users clearer setup options depending on the host.

**How to access:** End users can go to Settings → Third party apps and MCP and use the Glean MCP setup flow to pick a host and connect to Glean. The default server is highlighted as the recommended path, while additional servers remain available for advanced use cases.

[Learn more](https://docs.glean.com/administration/platform/mcp/host-guides/end-user-configuration)

Assistant *\[PACT-331\]*

* * *

#### Assistant typography refresh and visual polish[​](#assistant-typography-refresh-and-visual-polish "Direct link to Assistant typography refresh and visual polish")

Assistant now uses Inter typography with updated spacing and visual hierarchy for a consistent, easier-to-read experience across all devices.

[Learn more](https://docs.glean.com/administration/management/customization/home-page)

Assistant *\[ROAD-1526\]*

* * *

#### Glean Assistant on external AI platforms via A2A (Cross-platform)[​](#glean-assistant-on-external-ai-platforms-via-a2a-cross-platform "Direct link to Glean Assistant on external AI platforms via A2A (Cross-platform)")

Introduces a cross-platform A2A foundation that lets Glean Assistant run as a governed, first-class agent inside external AI platforms and agent runtimes, starting with Gemini and expanding to other ecosystems over time. The shared protocol and packaging model reuse Glean's enterprise context, permissions, and guardrails so users can ask Glean from their preferred AI surface without duplicating configuration or exposing extra data. Admins get a consistent way to authorize external platforms, manage which Glean capabilities are available where, and monitor usage across environments.

**How to access:** From the Glean admin console, enable external AI platform access/A2A and connect each supported platform using its service account or OAuth configuration. Use the A2A settings to choose which Glean agents (including Glean Assistant) can be invoked from each external platform and which user groups are allowed to use them. Refer to the Help Center setup guide for per-platform steps (for example, registering Glean Assistant in Gemini or other A2A-capable marketplaces). This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/platform/a2a-server)

Connectors *\[ROAD-1463\]*

* * *

#### Simplified MCP OAuth consent and scope surface[​](#simplified-mcp-oauth-consent-and-scope-surface "Direct link to Simplified MCP OAuth consent and scope surface")

Connecting third-party MCP hosts to Glean now uses a single, clear consent screen instead of a long list of technical OAuth scopes. The new experience groups MCP access into one user-facing permission, aligns that approval with each person's existing permissions and admin-approved settings, and narrows the underlying scopes to only the resources the host needs. Additional instrumentation on consent approvals and declines helps admins monitor rollout safety and refine their MCP strategy over time.

**How to access:** Admins already using the Glean OAuth Authorization Server for remote MCP servers do not need to take any action; users will automatically see the updated consent screen the next time they connect a host. To start using OAuth with remote MCP servers, open the Admin Console, go to Settings → Third-party access (OAuth), and enable the Glean OAuth Server. Then configure the MCP hosts you want to allow, and users can initiate the connection from their host and complete the simplified consent flow in their browser.

[Learn more](https://docs.glean.com/administration/oauth/authorization-server)

Connectors *\[ROAD-1448\]*

* * *

#### NetSuite MCP support[​](#netsuite-mcp-support "Direct link to NetSuite MCP support")

NetSuite MCP support lets teams use Glean Assistant and agents to run live, permission-aware workflows against NetSuite on top of the existing indexed NetSuite connector. Users can ask Glean to look up customers, invoices, purchase orders, and other NetSuite records in natural language and pull the latest data into their conversations without switching tools. This capability is initially available to a small set of customers while we validate quality and coverage across common NetSuite use cases.

**How to access:** Admins can configure NetSuite MCP from the Glean Admin Console under Platform → Actions by adding the NetSuite MCP server as an action pack. During setup, provide the NetSuite MCP server URL and OAuth details so Glean can connect as an MCP host. Once the action pack is connected and its tools are enabled, eligible users can invoke NetSuite MCP actions from Glean Assistant and agents, with access governed by their NetSuite permissions.

[Learn more](https://docs.glean.com/connectors/native/netsuite/)

Connectors *\[ROAD-1336\]*

* * *

#### Get trusted Glean answers directly in Slack channels[​](#get-trusted-glean-answers-directly-in-slack-channels "Direct link to Get trusted Glean answers directly in Slack channels")

Glean can now share trusted answers directly in Slack channels.

Glean can now post high-quality answers directly into Slack channel threads, so everyone can see them immediately without first clicking "view response." These public replies are generated only from content that's broadly visible in your company (such as public Slack channels and org-wide documents), so they're safe to share and easy to trust. Teammates can still personalize the answer with their own private context when they need a more tailored response.

**How to access:** To use public answers in Slack, first set up the Slack Real Time Search connector from the Glean Admin Console and install the Glean app in your Slack workspace or Enterprise Grid. If you have already done this, you can jump to the 'Embedded Integrations' tab to view the Glean in Slack setup page.

On this setup page, enable Gleanbot to respond in channels publicly and/or proactively. You can enable it for all public channels by default, or choose specific channels where you want Glean to participate.

Once enabled, channel members can ask questions in Slack and Glean will search across your company's public corpus (including public Slack channels) to generate shared responses, while still respecting each user's permissions for any follow-up personalization.

[Learn more](https://docs.glean.com/administration/platform/embedded-integrations/slackbot/public-mode-glean-slack-channel)

Embedded Integrations *\[ROAD-908\]*

* * *

#### Persistent extension install button on Glean Home[​](#persistent-extension-install-button-on-glean-home "Direct link to Persistent extension install button on Glean Home")

Users who are actively using Glean but have not yet installed the browser extension will now see a persistent "Finish setup" style button on Glean Home that guides them to install the extension. This makes it clear that setup is incomplete and gives people a simple, always-available way to add the extension and unlock features like sidebar search, new tab page, and integrated search in apps like Google Drive and Box. The prompt appears only for eligible users and does not affect usage or billing.

[Learn more](https://docs.glean.com/user-guide/apps/installing-the-browser-extension)

Glean Extension *\[ROAD-1581\]*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Admin dashboard now offers personalized recommendations of connectors, tools, and features to enable[​](#admin-dashboard-now-offers-personalized-recommendations-of-connectors-tools-and-features-to-enable "Direct link to Admin dashboard now offers personalized recommendations of connectors, tools, and features to enable")

The admin dashboard has been updated to include recommended connectors, tools, and features, alongside the existing notifications widget. The goal is to help admins discover the features that will open up new use cases for their users.

[Learn more](https://docs.glean.com/administration/management/notifications/admin-notifications-dashboard)

Admin Capabilities *\[ROAD-1549\]*

* * *

#### Greenhouse connector migration to Harvest v3 APIs[​](#greenhouse-connector-migration-to-harvest-v3-apis "Direct link to Greenhouse connector migration to Harvest v3 APIs")

Greenhouse connector Harvest v3 migration lets admins update their existing Greenhouse connector from legacy Harvest API credentials to Harvest v3 (OAuth) ahead of Greenhouse's August 31, 2026 deprecation deadline. Admins can add the new client ID and client secret in the Glean admin console without re-indexing or downtime, preserving existing search results and permissions. In beta: opt in from the admin console.

**How to access:** In the Glean admin console, open Connectors > Greenhouse > Setup and add Harvest v3 (OAuth) credentials (client ID and client secret). Keep the existing Harvest API Key and Webhook Secret in place, then save and wait for validation to complete.

[Learn more](https://docs.glean.com/connectors/native/greenhouse/harvest-v3-migration)

Connectors *\[ROAD-1393\]*

* * *

#### Granular controls for who can manage MCP servers[​](#granular-controls-for-who-can-manage-mcp-servers "Direct link to Granular controls for who can manage MCP servers")

Admins can now delegate MCP server administration without giving full admin access. The new MCP Server Moderator role lets designated users create and manage MCP servers and view MCP Insights, making it easier to put ownership closer to the teams actually running AI workflows.

**How to access:** A Glean administrator can assign the MCP Server Moderator role to designated users so they can manage MCP servers and view MCP Insights without receiving broader admin permissions. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/tools/managing-tools/managing-role-based-access-tools)

Assistant *\[PACT-345\]*

* * *

#### More precise access control for MCP tools[​](#more-precise-access-control-for-mcp-tools "Direct link to More precise access control for MCP tools")

Admins can now configure tool-level access controls directly from the Glean MCP server experience. This makes it easier to control which tools different users can access, while keeping permissions aligned across the broader tools and admin surfaces.

**How to access:** In the Glean Admin Console, open a Glean MCP server, click Add tools, go to External Tools, and open Tool advanced settings for a tool pack. From there, admins can set access for individual read and write tools, and those changes stay synchronized with the Tools admin experience. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/tools/managing-tools/managing-role-based-access-tools)

Assistant *\[PACT-344\]*

* * *

#### Glean is now available through the ChatGPT app marketplace[​](#glean-is-now-available-through-the-chatgpt-app-marketplace "Direct link to Glean is now available through the ChatGPT app marketplace")

Glean's remote MCP server can now be enabled through the ChatGPT app marketplace, making it easier for admins to roll out Glean in ChatGPT and connect users to enterprise search and other Glean-powered workflows from that surface.

**How to access:** ChatGPT workspace admins can add the Glean MCP server from the ChatGPT admin connector experience and authenticate it with Glean OAuth. Once configured, users can enable Glean in individual ChatGPT conversations from the tools menu when they want to use it. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/platform/mcp/host-guides/chatgpt)

Assistant *\[PACT-14\]*
