---
url: "https://docs.glean.com/release-notes/releases/2026-07-01-july-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-07-01-july-release"
title: "July 1, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:54.237Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### JSM request routing and field mapping in tools[​](#jsm-request-routing-and-field-mapping-in-tools "Direct link to JSM request routing and field mapping in tools")

Glean tools now support end-to-end Jira Service Management request flows, routing users to the right request type based on their intent and collecting required application, environment, and role details in the same experience. For IT and access requests, Glean first attempts to resolve issues with knowledge, and when a ticket is still needed it creates a JSM request pre-filled with the correct fields so requests are triaged and routed correctly. This update is designed for organizations with complex, asset-backed JSM forms so agents and field teams can rely on Glean to submit tickets that match their real service desk process.

**How to access:** Administrators must enable for your organization. To use this capability, connect Jira Service Management to Glean and enable the Jira tools in the admin console under Platform and then Actions. Configure the Create Jira Service Management request tool with your service desk, request types, and required application, environment, and role fields. Update existing IT or access agents to call this action so that user requests are routed through the configured JSM workflow.

[Set up Jira Service Management request routing](https://docs.glean.com/administration/tools/setup-tools/jira-tools-setup)

Actions *\[ROAD-1492\]*

* * *

#### GitHub sync and import for Skills[​](#github-sync-and-import-for-skills "Direct link to GitHub sync and import for Skills")

Admins can now import and sync Skills from public and private GitHub repositories into Glean. This makes it easier to manage shared Skill libraries in Git and keep Glean up to date with community, open-source, and internal Skills that follow the open Agent Skills standard.

Users can paste a GitHub repo URL, and Glean will fetch compatible `.skill` and `.md` files for import. Imported repositories stay up to date through a daily refresh, and users can refresh a GitHub-imported Skill before the next automatic refresh from the Skill's three-dot menu.

**How to access:** Administrators must enable for your organization.

[Explore Skills in Glean Assistant](https://docs.glean.com/user-guide/assistant/skills)

Assistant *\[ROAD-1407\]*

* * *

#### Skills for Glean Assistant: personal (public beta), governance and sharing[​](#skills-for-glean-assistant-personal-public-beta-governance-and-sharing "Direct link to Skills for Glean Assistant: personal (public beta), governance and sharing")

Glean Skills lets teams package domain-specific expertise into reusable instructions that Assistant applies automatically to tasks like account planning, meeting prep, and knowledge base creation. Skills support the open Agent Skills standard, so you can import compatible Skills from any public or private repository that follows the standard and tailor them to how your organization works. Admins can manage Skills rollout, sharing, and organization-wide governance with role-based controls, while personal Skills remain private unless users choose to share them.

**How to access:** Administrators must enable for your organization. Admins can manage shared and organization-wide Skills from the **Admin console**. End users can create personal Skills and use shared or admin-published Skills directly in Glean Assistant. Private Skills remain invisible to admins unless users choose to share them.

[Explore Skills in Glean Assistant](https://docs.glean.com/user-guide/assistant/skills)

Assistant *\[ROAD-1149\]*

* * *

#### Autodesk Construction Cloud (ACC) connector[​](#autodesk-construction-cloud-acc-connector "Direct link to Autodesk Construction Cloud (ACC) connector")

Glean now includes a native Autodesk Construction Cloud connector, so users can search and discover ACC project files, RFIs, submittals, drawings, issues, assets, and related project content directly in Glean while respecting source permissions. This helps construction, architecture, engineering, and owner teams find project knowledge faster, discover related work across projects, and support compliance, audit, and onboarding workflows from one place. This is an admin-gated connector for end users.

**How to access:** Administrators must enable for your organization. In the Glean admin console, go to Data sources and add the Autodesk Construction Cloud connector. Follow the setup flow in the connector configuration page to authenticate Autodesk Construction Cloud and complete the required admin configuration. After setup is complete, run the initial crawl so ACC content becomes available to users with the appropriate source permissions.

[Set up the Autodesk Construction Cloud connector](https://docs.glean.com/connectors/native/autodesk-construction-cloud/)

Connectors *\[ROAD-1326\]*

* * *

#### Panopto connector[​](#panopto-connector "Direct link to Panopto connector")

The Panopto connector enables organizations to seamlessly integrate Panopto video content into Glean, making it easy to search, discover, and reuse knowledge stored in training videos, recorded meetings, and other video assets.

**How to access:** Administrators must enable for your organization. A Glean admin must add Panopto as a connector in the Glean admin console.

[Set up the Panopto connector](https://docs.glean.com/connectors/native/panopto/)

Connectors *\[ROAD-1002\]*

* * *

#### Brave web search: freshness support for time-sensitive queries[​](#brave-web-search-freshness-support-for-time-sensitive-queries "Direct link to Brave web search: freshness support for time-sensitive queries")

Brave web search now scopes time-sensitive queries to fresher results, so questions about what is happening today, this week, or this month return up-to-date web pages instead of stale content. For customers using the Brave web search provider, Assistant only applies a recency window when the query clearly asks for current or recent information, improving relevance while keeping timeless facts unchanged. There are no new toggles or admin controls for this behavior; once Brave web search is enabled, freshness is on by default.

[Configure Brave web search in Glean](https://docs.glean.com/administration/tools/setup-tools/web-search-tools-setup#prerequisites)

Actions *\[ROAD-1514\]*

* * *

#### Claude Sonnet 5 in Assistant and agents[​](#claude-sonnet-5-in-assistant-and-agents "Direct link to Claude Sonnet 5 in Assistant and agents")

Claude Sonnet 5 is now available in Glean Assistant and agents.

**How to access:** Glean admins can enable Claude Sonnet 5 in the model hub.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

Agents *\[ROAD-1546\]*

* * *

#### Autonomous agent compiler: persistent chat sessions across page refreshes[​](#autonomous-agent-compiler-persistent-chat-sessions-across-page-refreshes "Direct link to Autonomous agent compiler: persistent chat sessions across page refreshes")

Compiler chat persistence in the autonomous agent builder keeps your conversation history when you refresh the page or reopen an agent, so you don't need to re-explain context or repeat earlier steps. When you return to an agent, Glean automatically restores your latest compiler chat for that agent, and a Reset chat control lets you start a fresh conversation while previous sessions stay available in history. This improvement is available to all agent builders.

[Learn about compiler chat persistence](https://docs.glean.com/administration/assistant/configuration/chat-history)

Agents *\[ROAD-1513\]*

* * *

#### Artifacts support in agents[​](#artifacts-support-in-agents "Direct link to Artifacts support in agents")

Enables artifacts in agents so they can generate rich outputs instead of only plain chat responses. Supports all artifact types that are enabled in Assistant.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Work with artifacts in Assistant](https://docs.glean.com/user-guide/assistant/glean-chat/canvas)

Agents *\[ROAD-1458\]*

* * *

#### Navigate admin features more efficiently with a new streamlined left navigation and user menu[​](#navigate-admin-features-more-efficiently-with-a-new-streamlined-left-navigation-and-user-menu "Direct link to Navigate admin features more efficiently with a new streamlined left navigation and user menu")

Updates to the left navigation and user menu now make it easier for admins to find valuable insights. The admin console now lives in the user menu, Insights has its own navigation path, and the updated user section improves admin accessibility.

[Explore admin navigation and chat history](https://docs.glean.com/administration/assistant/configuration/chat-history)

Assistant *\[ROAD-1467\]*

* * *

#### Take actions through real-time voice — send emails, post messages, create events, and more[​](#take-actions-through-real-time-voice--send-emails-post-messages-create-events-and-more "Direct link to Take actions through real-time voice — send emails, post messages, create events, and more")

You can now take actions directly through real-time voice — send emails, post Slack messages, create calendar events, file Jira tickets, and more, all by speaking. Say what you want to do, confirm with your voice, and Glean handles the rest. Voice actions work with all the same tools and integrations you already use in chat, so there's nothing new to set up.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Explore real-time voice in Glean](https://docs.glean.com/user-guide/assistant/real-time-voice)

Assistant *\[ROAD-1370\]*

* * *

#### O365 federated search: container filter facets and GST facet parity[​](#o365-federated-search-container-filter-facets-and-gst-facet-parity "Direct link to O365 federated search: container filter facets and GST facet parity")

O365 federated search now supports container filters for SharePoint and OneDrive, so users can scope queries to specific sites, libraries, lists, or folders and get precise, bounded live results. This closes a parity gap with indexed search and keeps behavior fail-closed instead of broadening the search when a container cannot be resolved. The feature applies to tenants using O365 SharePoint and OneDrive connectors with federated search enabled and requires admins to enable the container filter setting on those connectors and ensure live mode is turned on.

**How to access:** In the admin console, open each O365 SharePoint and OneDrive connector and enable the container filter option for federated search. Ensure O365 live mode is enabled for those connectors. After saving these changes, container-scoped queries from the Glean Search Tool and agents will automatically use O365 container filters.

[Enable O365 federated search container filters](https://docs.glean.com/connectors/native/sharepoint/real-time-access)

Connectors *\[ROAD-1459\]*

* * *

#### Enable Glean-managed MCP servers by default for customers[​](#enable-glean-managed-mcp-servers-by-default-for-customers "Direct link to Enable Glean-managed MCP servers by default for customers")

Glean Remote MCP Server is becoming much easier for admins to roll out and manage. Glean is enabling the Glean Remote MCP Server for customers by default with OAuth. This makes it easier for users to access Glean in supported AI tools without requiring admins to enable the remote MCP server manually.

**How to access:** The Glean Remote MCP Server is now enabled by default with OAuth for all customers. No manual admin setup is required. Users can connect to the remote MCP server from any supported AI tool using their existing Glean credentials.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Enable the Glean Remote MCP Server](https://docs.glean.com/administration/platform/mcp/enable-mcp-servers)

Connectors *\[ROAD-1397\]*

* * *

#### Choose search as your default setting in Assistant[​](#choose-search-as-your-default-setting-in-assistant "Direct link to Choose search as your default setting in Assistant")

You can now choose what happens when you press Enter in the Assistant chat bar. By default, pressing Enter still starts a new chat and Option/Alt+Enter starts a search. Users now have the option to change their personal settings so Enter starts a search and Option/Alt+Enter starts a new chat.

[Customize your Assistant chat settings](https://docs.glean.com/user-guide/assistant/glean-chat)

Assistant *\[ROAD-1479\]*

* * *

#### Projects: organize chats and content in one place[​](#projects-organize-chats-and-content-in-one-place "Direct link to Projects: organize chats and content in one place")

Projects help you organize chats and content in Glean so related work is easier to group, revisit, and share. Create a project to keep relevant chats and artifacts together in one place. Projects are private by default and can be shared when needed. Existing Collections automatically migrate to Projects, with existing permissions preserved.

[How projects work](/user-guide/knowledge/projects/how-projects-work)

Platform *\[ROAD-909\]*

* * *

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Bulk agent cleanup: admin-driven inactive-agent identification and bulk delete (and Lifecycle API)[​](#bulk-agent-cleanup-admin-driven-inactive-agent-identification-and-bulk-delete-and-lifecycle-api "Direct link to Bulk agent cleanup: admin-driven inactive-agent identification and bulk delete (and Lifecycle API)")

Admins can now clean up inactive agents at scale with a self-serve bulk deletion flow. From the admin console, go to Agents → Manage, where they can export an inactive-agents CSV, review which agents are unused, and soft-delete them in bulk from the admin console while preserving a 60-day restore window.

[Delete and restore agents as an admin](https://docs.glean.com/administration/managing-agents/deleting-and-restoring-agents)

Agents *\[ROAD-1453\]*
