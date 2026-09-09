---
url: "https://docs.glean.com/release-notes/releases/2026-02-25-february-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-02-25-february-release"
title: "February 25, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.635Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Glean homepage now defaults to the Chat tab[​](#glean-homepage-now-defaults-to-the-chat-tab "Direct link to Glean homepage now defaults to the Chat tab")

We’re updating Glean to make Chat the primary way you start working, while keeping all of your existing Search functionality available when you need it. This change is designed to reduce tab switching, keep you in one flow, and help you get more value out of a single workspace since Search results are also available in Chat conversations.

The Glean homepage now defaults to the Chat tab, and users can choose to change their default back to the Search tab if desired. This has been the experience for all new deployments since Nov 2025 and a percentage of users on all other deployments since Jan 2026, where it has led to a 29% increase in Chat queries.

[Learn more](/user-guide/advanced/customizing-home-page)

Assistant *ROAD-1151-MR*

* * *

#### Connect Glean Assistant to Remote MCP Servers (MCP Host)[​](#connect-glean-assistant-to-remote-mcp-servers-mcp-host "Direct link to Connect Glean Assistant to Remote MCP Servers (MCP Host)")

Glean Assistant now supports integration with remote Model Context Protocol (MCP) servers, enabling secure connections to third-party tools like Notion, Jira, and Salesforce. Admins can centrally approve and manage which MCP servers are available, ensuring secure, controlled access to enterprise systems. This update delivers seamless, permission-aware integration that empowers users to automate workflows and fetch live data directly within Assistant.

Customers and users with Gemini LLM model as their Assistant or chosen default are not yet able to use this functionality. We aim to remove this limitation within the next few weeks.

**How to access:** Administrators must enable for your organization.

[Learn more](/administration/tools/connect-remote-mcp-servers-to-glean)

Assistant *ROAD-867*

* * *

#### Bringing Email & Message Canvases into chat[​](#bringing-email--message-canvases-into-chat "Direct link to Bringing Email & Message Canvases into chat")

The dedicated Canvas experiences for composing emails and messages are now integrated directly into the chat thread. Users no longer need to switch to a side-by-side view for quick messages or small edits; everything can be viewed, drafted, and refined right within the chat. The Canvas adapts to the medium (email or chat), providing the right fields and structure, and you can export your finished message to your preferred client in one click, with all formatting and details preserved.

[Learn more](/user-guide/assistant/glean-chat/canvas)

Assistant *ROAD-1131*

* * *

#### Model retirement of Claude 3.7 Sonnet[​](#model-retirement-of-claude-37-sonnet "Direct link to Model retirement of Claude 3.7 Sonnet")

Support for the Claude 3.7 Sonnet model will end on January 28, 2026. After this date, Claude 3.7 Sonnet will no longer be available for use in Glean Assistant or Agents. Any agents or workflows currently using this model will be automatically migrated to a supported fallback model to ensure continued service. Administrators should review their model selections and update to a supported model before the deprecation date to avoid disruption.

[Learn more](/administration/llms)

Assistant *ROAD-1071*

* * *

#### Gemini Pro 3.1 in Assistant and Agents[​](#gemini-pro-31-in-assistant-and-agents "Direct link to Gemini Pro 3.1 in Assistant and Agents")

Glean supports Gemini Pro 3.1 for Glean universal model key customers on Assistant and Agents. We also offer Gemini Pro 3.1 for customer key deployments for Glean Agents (agent builder) via Vertex AI.

Gemini Pro 3.1 is Google's latest frontier model, delivering improved performance in coding, reasoning, and agentic workflows over Gemini Pro 3 - at the same price point. Customers can select Gemini Pro 3.1 via model choice in Assistant or configure it for Agent steps in the model hub.

**How to access:** Admins can configure the model by going to Admin Console -> Platform -> LLM.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/get-started/golive/model-choice)

Agents *ROAD-1171*

* * *

#### Claude Sonnet 4.6 in Assistant and Agents[​](#claude-sonnet-46-in-assistant-and-agents "Direct link to Claude Sonnet 4.6 in Assistant and Agents")

Glean supports Claude Sonnet 4.6 for Glean universal model key customers on Assistant and Agents. We also offer Sonnet 4.6 for customer key deployments for Glean Agents (agent builder) via Vertex AI and AWS Bedrock.

Claude Sonnet 4.6 is Anthropic's latest mid-tier model, delivering improved performance in coding, reasoning, and agentic workflows over Sonnet 4.5 - at the same price point. Customers can select Sonnet 4.6 via model choice in Assistant or configure it for Agent steps in the model hub.

**How to access:** Admins can configure the model by going to Admin Console -> Platform -> LLM.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/get-started/golive/model-choice)

Agents *ROAD-1162*

* * *

#### New Personal Productivity Agent Templates[​](#new-personal-productivity-agent-templates "Direct link to New Personal Productivity Agent Templates")

Glean now offers new task management agent templates for common productivity tasks like “Plan my Day” and “Daily action items”. By removing the need to build or configure, every user can immediately experience the value of automation, boosting productivity and AI adoption across the organization.

**How to access:** Any user who has permissions to create agents can access these templates by navigating to [https://app.glean.com/chat/agents](https://app.glean.com/chat/agents) and clicking "Create agent", which will display Glean's library of agent templates. Personal productivity templates will display under the "General" tab.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/agents/templates)

Agents *ROAD-1134*

* * *

#### Agent Builder Header Update: Save, Enable/Disable and Delete[​](#agent-builder-header-update-save-enabledisable-and-delete "Direct link to Agent Builder Header Update: Save, Enable/Disable and Delete")

The Agent Builder and Autonomous Agent Builder headers now use clearer labels and a simpler layout, making it easier to manage your agents. The primary button in the top‑right is now labeled Save instead of Publish, and all related messages have been updated (for example, “Draft saved” and “Agent saved”). Disable / Enable and Delete are now grouped in the More actions (⋮) menu alongside Settings, View insights, Duplicate, and Import/Export. Your agents’ behavior, routing, permissions, and versioning are unchanged-only the labels and menu locations have been updated.

[Learn more](/agents/concepts/agent-builder)

Agents *ROAD-1094*

* * *

#### Merge Agent Branches into a Single Node[​](#merge-agent-branches-into-a-single-node "Direct link to Merge Agent Branches into a Single Node")

You can now merge multiple branches into one downstream node in the Agent Builder canvas. The shared node will run regardless of which branch was taken, so you can keep one source of truth for your final response or action. Existing agents can be refactored to converge branches, reducing visual clutter and duplicated configuration.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/agents/create-agents/merge-branches)

Agents *ROAD-1093*

* * *

#### Support for additional Salesforce Objects[​](#support-for-additional-salesforce-objects "Direct link to Support for additional Salesforce Objects")

Glean now natively supports a broader set of standard Salesforce objects, including Contract, SBQQ\_Quote\_c, Product2, SBQQ\_QuoteLine\_c, SBQQ\_Subscription\_c, Order, Quote, OrderItem, VoiceCall, and Conversation. This enhancement enables organizations to index, search, and leverage these additional Salesforce records in Glean, making it easier for teams to find and use critical CRM data across sales, support, and operational workflows. With expanded object coverage, users benefit from more comprehensive search results and improved context in Glean Assistant and Agents.

**How to access:** Administrators must enable for your organization. Enable the desired standard object, ensure the Salesforce integration user has the necessary object-level permissions (read and view all) for each object you wish to index, then save your configuration and start a crawl to index the newly added objects.

[Learn more](/connectors/native/salesforce/about#supported-objects-and-content-types)

Connectors *ROAD-1082*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Gemini: Additional web search provider added in Agentic Looping[​](#gemini-additional-web-search-provider-added-in-agentic-looping "Direct link to Gemini: Additional web search provider added in Agentic Looping")

Glean now offers Gemini web search as a fully supported provider in the agentic engine, alongside Brave and OpenAI. Customers using Gemini with Agentic Looping can take advantage of Google’s search results while Glean automatically chooses the right web provider per query, improving flexibility and aligning with multi-provider strategies. This makes it easier for organizations standardized on Gemini to power real‑time web lookups in Assistant and agents without custom setup.

**How to access:** To enable web search with Gemini, an admin should configure a Gemini web search action from the Actions section of the Admin Console.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/administration/tools/setup-tools/web-search-tools-setup)

Actions *ROAD-1146*

* * *

#### Analyze Glean usage and adoption with Insights chat[​](#analyze-glean-usage-and-adoption-with-insights-chat "Direct link to Analyze Glean usage and adoption with Insights chat")

The insights chat allows you to analyze Glean usage across Assistant, Search and Agents to identify trends in usage, find power users by department, understand connector usage, analyze user feedback metrics, and highlight top agents. With insights chat, you can run complex analytics, with Python and SQL tools working under the hood, and also see results displayed in charts or via downloadable reports.

**How to access:** Insights chat is now GA for admin and insights moderator, so you can ask plain‑English questions about Glean usage and get data-backed answers as summary, tables, charts and downloadable reports

You’ll find it in the Insights chat under Insights page; Ask things like “Compare search vs assistant usage trends over 90 days?” and any follow-up questions to drill down into the specifics. Please try your real questions and log any issues or thumbs feedback so we can keep improving coverage and quality.

[Learn more](/administration/insights/insights-chat)

Actions *ROAD-795*

* * *

#### Get granular insights into your FlexCredits usage with Billing Credits Dashboard[​](#get-granular-insights-into-your-flexcredits-usage-with-billing-credits-dashboard "Direct link to Get granular insights into your FlexCredits usage with Billing Credits Dashboard")

The Billing credits dashboard in the Admin Console now gives admins a much more detailed view of how FlexCredits are being used across Glean. You can see feature‑level spend for Assistant and Agents (including items like Code Writer and Image Generation), view static system workflows such as Deep Research and Chat as individual line items, and understand which agents are driving the most consumption. Deleted and unsaved agents are now clearly bucketed so previously “invisible” credit usage is accounted for, and a new Credit usage overview with segmented progress bars and overage warnings helps you stay ahead of your credit limits.

**How to access:** Access to the Billing/Credits dashboard is limited to Admins and Billing Moderators; if you do not see this page, your Glean role may not include billing permissions.

[Learn more](/administration/management/credits)

Admin Capabilities *ROAD-1159*

* * *

#### Self-serve VPN setup for on-premises data sources[​](#self-serve-vpn-setup-for-on-premises-data-sources "Direct link to Self-serve VPN setup for on-premises data sources")

Glean now enables workspace administrators to self-serve the initial VPN networking setup directly from the admin console. This enhancement streamlines the process for connecting Glean to on-premises or private data sources, eliminating the need for manual coordination with Glean support or Solutions Engineering. Customers can quickly configure VPN connectivity themselves, reducing setup time and accelerating access to internal resources.

**How to access:** To set up VPN networking for on-premises or private data sources: Sign in to the Glean Admin Console with an Admin or Setup Admin role. Navigate to the networking or data source setup section and select the VPN setup option. Enter the required VPN parameters, such as peer IP, transit/local CIDR range, IKE version, and pre-shared key (PSK). Follow the on-screen prompts to complete and validate the configuration.

[Learn more](/security/networking/admin-vpn-setup)

Platform Capabilities *ROAD-989*

* * *

#### Get real-time alerts for data source health issues[​](#get-real-time-alerts-for-data-source-health-issues "Direct link to Get real-time alerts for data source health issues")

Admins will now receive proactive alerts within the Admin console UI when connected data sources experience health or credential issues, such as failed syncs or expired credentials. These alerts help ensure that admins are immediately notified of problems that could impact search completeness or data freshness, enabling faster self-service troubleshooting and reducing downtime. Alerts include details about the affected data source, the specific error, and direct links to relevant documentation for resolution. This enhancement improves visibility and control over data source health, supporting a more reliable and up-to-date Glean experience.

**How to access:** To view issues requiring attention: Go to the Glean Admin Console and navigate to Dashboard.

[Learn more](/administration/management/notifications/admin-notifications-dashboard)

Admin Capabilities *ROAD-871*

* * *

#### \[Action Required\] End of Support for Gemini Models on Agentic Engine V1[​](#action-required-end-of-support-for-gemini-models-on-agentic-engine-v1 "Direct link to [Action Required] End of Support for Gemini Models on Agentic Engine V1")

Glean is ending support for Agentic Engine V1, and customers on Customer Key Gemini must migrate to Agentic Engine V2 by February 15, 2026. After this date, all new Assistant and Agent capabilities will be built on Agentic Engine 2 and Assistant and Agent experiences will no longer be supported for customers who do not migrate.

Agentic Engine V2 represents a significant upgrade over V1, delivering statistically significant improvements in enterprise use cases. The new engine features adaptive planning for more intelligent task handling, iterative reasoning for better problem-solving, and multi-step task execution for complex workflows. The vast majority of customers have already migrated and are benefiting from these enhancements.

No action is required for customers already on Agentic Engine V2, including all Glean universal key customers.

**How to access:**

Step 1: Configure the LLM Model

1.  Navigate to Admin Console → Platform → LLM
    
2.  Under "Select models for assistant," choose your provider and set Gemini Pro Preview 3.0 as your thinking mode agentic reasoning model and Gemini Flash 2.5 as your fast mode agentic reasoning model.
    

Step 2: Enable the Features

1.  Navigate to Admin Console → Platform → Assistant → Settings
    
2.  Under "New agentic engine features," enable Fast and Thinking modes
    
3.  Enable for everyone
    

[Learn more](/user-guide/assistant/glean-chat/)

Assistant *ROAD-1070*

* * *

#### Procore connector[​](#procore-connector "Direct link to Procore connector")

Users can now securely search and access construction project data from Procore directly within Glean. This integration enables project teams, field staff, and back-office teams to find the latest status, review submittals and RFIs, and streamline decision-making across distributed construction projects-helping contractors standardize workflows, save time, and increase adoption.

[Learn more](/connectors/native/procore/)

Connectors *ROAD-812*

* * *

#### Billing Moderator role for credits dashboard access[​](#billing-moderator-role-for-credits-dashboard-access "Direct link to Billing Moderator role for credits dashboard access")

Organizations can now assign a dedicated Billing Moderator role that grants read-only access to the workspace billing and credits dashboard without making someone a full Glean Admin. This lets finance teams, budget owners, and billing contacts monitor credits usage and spending while preserving least‑privilege access and keeping core admin controls limited to your IT and admin teams.

**How to access:** Administrators must enable for your organization. To grant someone access to the billing and credits dashboard, a Glean Admin should assign them the Billing Moderator role, either directly on their account or via an identity provider group using group-based permissions. Once assigned, users with the Billing Moderator role can sign in to Glean and view workspace billing and credits information, but they will not have broader admin access to workspace settings.

[Learn more](/administration/identity/roles/user-roles)

Admin Capabilities *ROAD-1142*

* * *

#### Sensitive content policies templates[​](#sensitive-content-policies-templates "Direct link to Sensitive content policies templates")

Glean provides a set of categorized templates for creating new sensitive content policies, helping eliminate the cold start around what to include and how to structure a policy.

[Learn more](/administration/protect/sensitive-findings/manage-policies#create-a-policy)

Protect *ROAD-964*
