---
url: "https://docs.glean.com/release-notes/releases/2026-03-11-march-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-03-11-march-release"
title: "March 11, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.595Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Agent Library Enhancements: Manage categories + Verification[​](#agent-library-enhancements-manage-categories--verification "Direct link to Agent Library Enhancements: Manage categories + Verification")

Agent Library now scales for organizations with hundreds or thousands of agents by turning the Agents page into a single, discovery-focused library with richer curation tools. Admins and agent moderators can create and reorder company-owned categories, add agents to multiple categories, and brand or verify “official” agents so users see a trusted, tailored catalog instead of a noisy list. End users can quickly filter by company-curated agents or Glean-provided agents and find high-quality workflows that match their role and team

**How to access:** Administrators must enable for your organization.

[Learn more](/administration/managing-agents/managing-agent-library)

Agents *ROAD-1091-MR*

* * *

#### Sunsetting speech to text dictation[​](#sunsetting-speech-to-text-dictation "Direct link to Sunsetting speech to text dictation")

We’re retiring the dictation (“Speak to Type”) button across Glean web, desktop, and mobile composers. This includes the mic icon in the home page, chat, and Conversational Agent creators. As part of this change, the dictation mic button will be removed from supported composers and users will no longer be able to start new dictation (voice‑to‑text) sessions. Existing chat and authoring flows will continue to work as normal with typed input.

We’re making this change because dictation is used by only a small fraction of Assistant users, and keeping the control adds unnecessary clutter. Removing it simplifies the experience while we focus our investment on supporting real-time voice as the primary, interactive voice experience, rather than one‑off voice‑to‑text dictation.

**How to access:** Administrators must enable for your organization.

[Learn more](/user-guide/about/end-user-quick-start-guide)

Agents *ROAD-1017-MR*

* * *

#### Agent Notifications[​](#agent-notifications "Direct link to Agent Notifications")

Glean now sends notifications when an agent needs your input or when long‑running work like Deep Research finishes, so you can act without constantly checking chats or the Agent Library. You’ll see browser notifications (if enabled) and, for agent approval steps, email alerts that deep link you back to the right chat or run to review, approve, or provide missing information. This helps you unblock background agents faster, complete tasks on time, and reliably find results from async work instead of hunting through multiple screens.

**How to access:** For end users, notifications work automatically. You’ll see a Notifications entry in the Glean UI and will start receiving alerts for agent HITL steps and completed Deep Research runs. To turn browser/desktop notifications on or off, update notification permissions for your Glean URL in your browser settings and, if needed, in your operating system’s notification preferences. You can manage whether you get email and browser notifications for assistant and agents from Your settings → Notifications in the Glean app. If you don’t see Notifications in the left navigation, your organization may not have enabled this feature yet in the Admin Console.

[Learn more](/user-guide/glean-notification/notification)

Agents *ROAD-894-MR*

* * *

#### Connect Glean Agents to Remote MCP Servers (MCP Host)[​](#connect-glean-agents-to-remote-mcp-servers-mcp-host "Direct link to Connect Glean Agents to Remote MCP Servers (MCP Host)")

Glean Agents can now call tools hosted on remote Model Context Protocol (MCP) servers, so your agents can take actions in systems like Notion, Asana, GitHub, ServiceNow, Snowflake, and more—all from within Glean. Admins and builders can plug approved third-party or internal MCP servers into agent workflows. This helps teams automate more of their workflows without rebuilding custom integrations for every system.

**How to access:** To use MCP servers in Glean Agents, first have a Glean admin configure the MCP servers in the Admin console under Platform → Actions, where MCP-powered integrations and templates are listed. Admins can either import an MCP server by providing its URL and metadata or use pre-set templates from the MCP registry, then connect and discover available tools and choose which tools are available to which users or groups.

Once servers and tools are configured, agent builders can open Agent Builder, create or edit an agent, and add an MCP server as part of a Plan and execute or autonomous agent step, choosing which tools from that server the agent is allowed to use. When users run the agent, it will automatically route to the configured MCP tools as needed to read data or perform write actions in connected systems.

[Learn more](/administration/tools/connect-remote-mcp-servers-to-glean)

Actions *ROAD-1033*

* * *

#### Support GPT 5.4 on Glean Assistant and Agents[​](#support-gpt-54-on-glean-assistant-and-agents "Direct link to Support GPT 5.4 on Glean Assistant and Agents")

GPT-5.4 is now available in Glean Assistant model choice and Agents for customers using the Glean Universal Model Key, and the Agents model hub for all customers. GPT-5.4 delivers significantly improved citation quality, instruction following, and tool usage compared to prior OpenAI standard models.

This feature may use credits. Learn more in Glean's Help Center.

**How to access:** Glean Universal Model Key: GPT-5.4 appears automatically in the Assistant model choice dropdown and Agents model hub. Admins can exclude it via Admin Console → Platform → LLM.

Customer Key: GPT-5.4 is available for Agents via Admin Console → Platform → LLM. It is not yet available for Assistant model choice on Customer Key.

[Learn more](/administration/configure-llms#configure-models-in-the-model-hub)

Agents *ROAD-1189*

* * *

#### Create Images with Glean Agents in both Workflow and Auto mode[​](#create-images-with-glean-agents-in-both-workflow-and-auto-mode "Direct link to Create Images with Glean Agents in both Workflow and Auto mode")

We are releasing dedicated, governed image creation capabilities in our Agents platform across three surfaces: a dedicated node in the Agent Builder, an explicit “Generate Image” action within Plan & Execute, and native support in autonomous agents. In the Agent Builder, a configurable “Generate Image” node enables builders to define prompts, styles, aspect ratios, and image counts, draw on relevant context, and return structured outputs (image URLs plus metadata) for downstream nodes, while in Plan & Execute a dedicated action lets the planner reason explicitly about visual steps—when to generate images, how many, and which parts of the plan they support—using the same backend with quotas and fallbacks so plans can still succeed in text-only mode if image creation fails. Autonomous agents determine when visuals materially improve a task, derive prompts from artifact content, generate and embed images in the final output, and operate under clear safety, cost, and performance guardrails.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/agents/create-agents/create-your-first-agent)

Agents *ROAD-1113*

* * *

#### Deep Research is now supported for Customer Key[​](#deep-research-is-now-supported-for-customer-key "Direct link to Deep Research is now supported for Customer Key")

Deep Research now supports all models on Customer Key (GPT5, GPT 5.1, Claude Sonnet 4.5, and Gemini Pro 3) and model providers (Azure OpenAI, AWS Bedrock, and Google Vertex AI).

Admins have full control over which users have access to Deep Research and their usage quotas. Admins can set monthly query limits per user, restrict usage to specific users or departments, or turn off the feature entirely in Admin Console → Assistant → Deep Research. This feature is subject to usage-based pricing; for details, contact [pricing@glean.com](mailto:pricing@glean.com) or view our Flex pricing documentation.

This feature may use credits. Learn more in Glean's Help Center.

**How to access:** This feature is default on. Admin can control the feature via the Admin Console -> Assistant.

[Learn more](https://www.glean.com/product/deep-research)

Assistant *ROAD-1020*

* * *

#### Customer Key customers can now access image generation in Glean Assistant[​](#customer-key-customers-can-now-access-image-generation-in-glean-assistant "Direct link to Customer Key customers can now access image generation in Glean Assistant")

Bring your ideas to life directly in Glean Assistant with Image Generation models from Gemini & Open AI, now available for Customer Key customers on all clouds (and previously for Glean Key customers). If you’re already using image generation elsewhere, you can now do the same right inside Assistant: ask for visuals from natural language prompts, and see images show up in your chat response and artifacts.

This accelerates creative cycles and keeps iteration for drafts, diagrams, social posts, and more in one place, with prompts that can incorporate design direction from your internal documents instead of forcing you to switch tools.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/user-guide/about/end-user-quick-start-guide)

Assistant *ROAD-1114*

* * *

#### Desktop App Refresh and improvements to Spotlight[​](#desktop-app-refresh-and-improvements-to-spotlight "Direct link to Desktop App Refresh and improvements to Spotlight")

The Glean desktop app now has a refreshed, modern look with a dedicated app shell that makes it easier to move and resize the window. We’ve also upgraded the desktop Spotlight (the Cmd‑Shift‑J quick entry bar) so it’s no longer just a simple input field—it now supports the full Glean Assistant chat experience, including switching between Fast and Thinking modes, choosing custom models, and generating images, all without opening the main app. This makes Spotlight a more powerful, always-available way to start or continue chats, run searches, and get work done directly from your desktop.

Note: Mac desktop refresh now available. Windows desktop app refresh will launch by March 26, 2026.

**How to access:** To use the updated desktop experience, download or update the Glean desktop app for macOS or Windows from your Glean settings under the desktop app installation page, then sign in with your Glean account.

[Learn more](/user-guide/apps/glean-for-desktop)

Desktop App *ROAD-1152*

* * *

#### Salesforce Support for permissions via Territory[​](#salesforce-support-for-permissions-via-territory "Direct link to Salesforce Support for permissions via Territory")

Glean’s Salesforce connector now supports territory-based record access. With this enhancement, users can see Salesforce records assigned to them through territories, in addition to existing access rules. This ensures that Salesforce data indexed in Glean fully respects Salesforce sharing and visibility settings.

[Learn more](/connectors/native/salesforce/about)

Connectors *ROAD-1144*

* * *

#### Freshdesk Connector[​](#freshdesk-connector "Direct link to Freshdesk Connector")

The Freshdesk Connector enables organizations to connect their Freshdesk instance to Glean, making support tickets, conversations, solutions articles (knowledge base), contacts, and companies fully searchable within Glean. By integrating Freshdesk, support teams can quickly find and manage customer inquiries, leverage Glean’s powerful search and knowledge management capabilities, and streamline workflows. This integration helps improve response times, ensures consistent and accurate information delivery, and elevates the overall customer support experience.

**How to access:** To connect Freshdesk to Glean, an admin must add Freshdesk as a data source in the Glean Admin Console. Additionally, each user who wishes to access Freshdesk data in Glean must authenticate with their own Freshdesk API key. After setup, Glean will index tickets, conversations, solutions articles, contacts, and companies according to the user’s permissions in Freshdesk.

[Learn more](/connectors/native/freshdesk/)

Connectors *ROAD-956*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Improving Calendar Events for Microsoft Outlook and Teams[​](#improving-calendar-events-for-microsoft-outlook-and-teams "Direct link to Improving Calendar Events for Microsoft Outlook and Teams")

Glean has improved calendar event accuracy and freshness for organizations using Microsoft Calendar. By enabling a federated retrieval for the meeting lookup tool, users now see up-to-date, comprehensive calendar data directly in Glean Assistant and Agents.

**How to access:** This improvement is automatically applied for organizations with the Microsoft Calendar connectors configured in Glean, no additional setup is required for the calendar improvements to take effect.

Admins can verify their Microsoft Teams connector is active and properly configured by navigating to Admin Console → Data Sources → Microsoft Teams.

For full calendar and transcript support, ensure the connector has the required Microsoft Graph API permissions, including Calendars.Read, OnlineMeetings.Read.All, and OnlineMeetingTranscript.Read.All.

[Learn more](/tools/glean/calendar-search)

Assistant *ROAD-1187*

* * *

#### Ironclad connector[​](#ironclad-connector "Direct link to Ironclad connector")

The Ironclad connector for Glean enables organizations to seamlessly search contract records, workflows, and related legal documents managed in Ironclad.

[Learn more](/connectors/native/ironclad/)

Connectors *ROAD-823*

* * *

#### Canva connector[​](#canva-connector "Direct link to Canva connector")

The Canva Connector enables Glean users to search documents and designs from Canva directly within their workspace. With this integration, teams can discover, search, and collaborate on Canva design docs in Glean alongside all enterprise data.

[Learn more](/connectors/native/canva/)

Connectors *ROAD-820*

* * *

#### Affinity connector[​](#affinity-connector "Direct link to Affinity connector")

The Affinity Connector lets teams—especially those in private equity, venture capital, and investment banking—bring Affinity’s relationship intelligence into Glean. With this integration, users can search for contacts, companies, opportunities, and lists from Affinity alongside other sources in Glean.

[Learn more](/connectors/native/affinity/)

Connectors *ROAD-737*

* * *

#### Service restoration access for customer deployments[​](#service-restoration-access-for-customer-deployments "Direct link to Service restoration access for customer deployments")

We’re introducing service restoration access to provide secure, audited, and time‑bound infrastructure-only access during rare, high‑severity incidents when normal administrative paths are unavailable for cloud-prem customers. As part of this change, we’re also moving from broad “project admin/owner” access to more granular, least‑privilege roles.

In addition, we’re deploying an isolated backend service that automatically executes pre‑approved infrastructure commands using these least‑privilege credentials—no human ever authenticates directly with this account.

In cases of service account restoration, you may see cloud audit logs labeled service restoration access. Learn more about Glean's access to customer cloud-prem deployments on the Trust Center ([https://trust.glean.com/resources?s=xeeowws1dsh9xnx0n33ij\\&name=glean-access-to-customer-deployments](https://trust.glean.com/resources?s=xeeowws1dsh9xnx0n33ij%5C&name=glean-access-to-customer-deployments))

[Learn more](/security/architecture/service-restoration-access)

Platform Capabilities *ROAD-985*
