---
url: "https://docs.glean.com/release-notes/releases/2026-05-20-may-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-05-20-may-release"
title: "May 20, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:54.047Z"
---
On this page

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Merge Microsoft 365 connector set up[​](#merge-microsoft-365-connector-set-up "Direct link to Merge Microsoft 365 connector set up")

Admins can now set up Microsoft 365 connectors for SharePoint and OneDrive through a shared Microsoft 365 setup flow, which reduces duplicate configuration and makes setup easier to manage.

This change is for admins only and currently applies to SharePoint and OneDrive only — Outlook and Teams are not included in this launch.

The new flow introduces shared/common settings at the Microsoft 365 level, while SharePoint- and OneDrive-specific configuration remains in their respective child setup flows.

Admins should be prepared to complete the Microsoft 365 parent setup first, then finish any SharePoint- or OneDrive-specific permissions and settings needed for each connector.

**How to access:** In the Admin Console, start with the new Microsoft 365 connector setup, which now acts as the shared parent setup for SharePoint and OneDrive.

After completing the Microsoft 365 setup, finish configuration for SharePoint and/or OneDrive in their child setup flows, including any connector-specific permissions, domains, certificates, or REST API setup required for your environment.

If you already use SharePoint or OneDrive, review the updated setup documentation because credentials and shared authentication are now handled through the Microsoft 365 parent flow rather than as fully separate standalone setups.

[Learn more](https://docs.glean.com/connectors/native/microsoft365)

Admin Capabilities *\[ROAD-997\]*

* * *

#### Sensitive content models: Find the signal in the noise[​](#sensitive-content-models-find-the-signal-in-the-noise "Direct link to Sensitive content models: Find the signal in the noise")

Glean’s sensitive content models separate the signal from the noise by pairing traditional infotype detection with AI models trained on your full enterprise context, such as document content and permissions, to surface true exposure. Each finding receives a low/medium/high severity label with plain-language explanations. Our sensitive content models reduce false positives and achieve about 80% accuracy rate on unstructured data. Both GCP and AWS are supported.

**How to access:** Available in Glean Protect+. Super admins or Sensitive Content Moderators can go to Admin Console → Glean Protect → Sensitive findings → Policies, then create or edit a policy and select Enable document analysis.

[Learn more](https://docs.glean.com/administration/protect/sensitive-findings/manage-policies)

Protect *\[ROAD-753\]*

## User Features[​](#user-features "Direct link to User Features")

#### Auto mode agents powered by natural language[​](#auto-mode-agents-powered-by-natural-language "Direct link to Auto mode agents powered by natural language")

Auto Mode agents are now generally available, featuring a redesigned natural language agent builder where you simply describe what you want, answer a few guided questions, and reach a testable first draft faster than ever — with full control to refine as you iterate. This release also introduces debug and trace views for step-by-step visibility into agent behavior, and an agent sandbox for dynamic context management and code execution on complex tasks. From idea to production-ready agent, faster — with more power, transparency, and flexibility built in from the start.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/agents/auto-mode-agent)

Agents *\[ROAD-730\]*

* * *

#### Nested Container Search in Chat/Agents[​](#nested-container-search-in-chatagents "Direct link to Nested Container Search in Chat/Agents")

Chat and Agents can now search within tagged folders, spaces, sites, and other containers more effectively, including content nested inside subfolders. This helps users get more complete, relevant answers from large containers without having to sift through top-level contents first, and improves performance by focusing only on matching documents. This applies to Assistant (Chat with AL), Agents Plan and Execute, Agents Autonomous mode, and the Agents Company Search step. It does not change Chat V2 or workflow agents.

**How to access:** Once this feature is available in your environment, users can start tagging supported container URLs in Chat or using supported container sources in eligible Agent steps. If your team manages custom search configuration, make sure co.gsto.enable\_container\_filter is enabled. No other admin setup is required.

[Learn more](/user-guide/search/how-to-search-in-glean)

Agents *\[ROAD-1362\]*

* * *

#### View images in Assistant and Agents for custom datasources[​](#view-images-in-assistant-and-agents-for-custom-datasources "Direct link to View images in Assistant and Agents for custom datasources")

Assistant and Agents can now caption, index, and render images from content ingested through custom data sources, not just native connectors. This helps people get more complete answers from proprietary document repositories when diagrams, charts, screenshots, or other visuals are important to understanding the source content.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/)

Agents *\[ROAD-1314\]*

* * *

#### Model Choice in Assistant for Customer Key[​](#model-choice-in-assistant-for-customer-key "Direct link to Model Choice in Assistant for Customer Key")

Customers on their own LLM key now have access to model choice drop down in Glean Assistant where they can select from a variety of models their organization has enabled.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/get-started/golive/model-choice)

Assistant *\[ROAD-1288\]*

* * *

#### Blocked Chat Status Indicator[​](#blocked-chat-status-indicator "Direct link to Blocked Chat Status Indicator")

Chat status indicators make it easier to keep work moving in Glean by showing which conversations need your attention, including chats with new updates, chats that are ready for review, and chats where an agent is waiting on your confirmation or additional input. This helps users quickly return to long-running or asynchronous work when results are ready.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat)

Assistant *\[ROAD-1367\]*

* * *

#### See step-by-step elapsed time in Assistant plans[​](#see-step-by-step-elapsed-time-in-assistant-plans "Direct link to See step-by-step elapsed time in Assistant plans")

Glean Assistant now shows the elapsed time for each step while it works through a multi-step plan, so you can better understand progress and how long each part of a task takes. This makes longer-running work more transparent and helps you decide whether to wait, redirect, or refine the request. This is available to all end users in Assistant when a plan is shown for complex, multi-step queries in Thinking mode.

**How to access:** No setup is required. The elapsed time appears automatically in Glean Assistant when a complex query triggers a plan in Thinking mode.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/plan)

Assistant *\[ROAD-1327\]*

* * *

#### Sigma connector[​](#sigma-connector "Direct link to Sigma connector")

Connect Sigma to Glean so users can search and discover Sigma dashboards, workbook pages, and chart elements directly in Glean. This helps teams get to the right BI content faster, brings more analytics context into Glean, and respects Sigma permissions.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/connectors/native/sigma/)

Connectors *\[ROAD-1192\]*

* * *

#### Addition of boards and work items to Azure Devops connector[​](#addition-of-boards-and-work-items-to-azure-devops-connector "Direct link to Addition of boards and work items to Azure Devops connector")

Glean now supports indexing for Azure DevOps boards and work items, including Epics, Features, Stories, Tasks, and Bugs. This enhancement enables users to search for project status and work items from Azure DevOps directly within Glean, streamlining project tracking.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/connectors/native/azure-devops/)

Connectors *\[ROAD-914\]*

* * *

#### Glean app in ChatGPT[​](#glean-app-in-chatgpt "Direct link to Glean app in ChatGPT")

Automatically connect to Glean within ChatGPT apps with a single click of a button. You can get full enterprise context in OpenAI ChatGPT.

**How to access:** Admins must first configure the Glean MCP connector in ChatGPT and enable both Glean OAuth and Glean MCP servers in the Glean Admin Console. After setup, end users can open a ChatGPT conversation, click the plus icon, open More, and select Glean to activate it for that conversation.

[Learn more](https://docs.glean.com/administration/platform/mcp/host-guides/chatgpt)

Embedded Integrations *\[ROAD-1111\]*
