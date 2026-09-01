---
url: "https://docs.glean.com/release-notes/releases/2026-01-28-january-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-01-28-january-release"
title: "January 28, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.209Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### New user confirmation experience for write actions in Agents[​](#new-user-confirmation-experience-for-write-actions-in-agents "Direct link to New user confirmation experience for write actions in Agents")

Agents now by default pauses before making changes, summarizing planned updates so users can quickly review, adjust, and approve high-impact write actions. Users can chain outputs from earlier write steps as inputs to later ones which will help your agents deliver faster end-to-end workflows across your systems while keeping humans in control.

[Learn more](/tools/human-in-the-loop-experience-for-tools)

Actions *ROAD-1103-MR*

* * *

#### Search results in Chat for keyword-focused queries[​](#search-results-in-chat-for-keyword-focused-queries "Direct link to Search results in Chat for keyword-focused queries")

Chat in Assistant now surfaces a short set of top search results within your conversation for keyword and search-like queries. This enables you to navigate to relevant documents directly in chat conversations quickly, so you don’t have to switch to the search setting or wait for a full chat response. You’ll get to the information you need faster, improving productivity and reducing context switching.

**How to access:** No setup is required—this feature is available to all users in Assistant. When you enter a keyword or search-like query in a chat conversation, you’ll see top search results appear directly in the chat window. Click any result to open the document, or continue your conversation as usual. For more details on using chat and search, visit the Glean Help Center.

Release plan:

-   Dec 2 for customers with chat-first deployments
    
-   Jan 15 for other customers
    

[Learn more](/user-guide/assistant/glean-chat/)

Assistant *ROAD-1025-MR*

* * *

#### Custom actions defaulted to run in scheduled and interactive agents without user confirmation[​](#custom-actions-defaulted-to-run-in-scheduled-and-interactive-agents-without-user-confirmation "Direct link to Custom actions defaulted to run in scheduled and interactive agents without user confirmation")

Configure custom actions to run automatically—without user confirmation—in both interactive and scheduled agents, while giving admins full control over which actions are allowed to run this way. This lets teams safely automate more work while maintaining admin control.

**How to access:** Administrators must enable for your organization. In the Admin Console, go to Actions, select the relevant custom action, and enable the option to run without user confirmation for agents. This setting determines which actions are eligible to run automatically in both interactive and scheduled agents. In Agent workflow builder, when creating or editing an agent, add the custom action as a step and ensure the “run without confirmation” option is enabled for that step. For scheduled agents, only actions configured for auto-run will be available.

[Learn more](/tools/inline-execution-of-write-tools)

Actions *ROAD-1087*

* * *

#### View all agent runs in chat history[​](#view-all-agent-runs-in-chat-history "Direct link to View all agent runs in chat history")

Background agents (e.g. scheduled agents) now also appear directly in Chat History alongside your conversations with Assistant and manual agent runs, under the Chats on your left navigation bar. You can quickly scan results, open full run details in one click, and use filters to see only Assistant chats or runs from a specific agent.

**How to access:** Administrators must enable for your organization. Chat history must be enabled by admins for users to use this functionality.

[Learn more](/user-guide/assistant/glean-chat/search-past-chats)

Agents *ROAD-1063*

* * *

#### Updated preview experience for agents[​](#updated-preview-experience-for-agents "Direct link to Updated preview experience for agents")

The Agent Builder now features a flexible, dockable preview panel you can move and resize to view results alongside step configuration for faster iteration. This combined with real-time indicators showing which node is running, paused for input, or completed to make debugging simpler and more transparent.

**How to access:** Administrators must enable for your organization.

[Learn more](/agents/concepts/agent-builder)

Agents *ROAD-1009*

* * *

#### 85 new actions available in Glean Assistant & Agents[​](#85-new-actions-available-in-glean-assistant--agents "Direct link to 85 new actions available in Glean Assistant & Agents")

Glean has expanded its agent actions library, delivering over 85 ready-to-use actions across GitHub, Google Calendar, Jira, Confluence and Salesforce. The actions are currently supported in Glean Agents and Glean Assistant.

**How to access:** Administrators must enable for your organization from within the Admin console.

[Learn more](/tools/tools-overview)

Agents *ROAD-761*

* * *

#### Enhancements to reports and dashboards in the Salesforce connector[​](#enhancements-to-reports-and-dashboards-in-the-salesforce-connector "Direct link to Enhancements to reports and dashboards in the Salesforce connector")

Glean uses hybrid search for Salesforce dashboards and reports. It indexes dashboard metadata to understand how metrics are defined, then performs a real-time fetch at query time to pull the latest chart and table values. Users can ask questions like “Read the GTM dashboard and tell me our current ARR” and get real-time answers.

**How to access:** Administrators must enable for your organization. To use federated fetch for Salesforce Reports and Dashboards in Glean Chat: Ensure admin has connected Salesforce data source in Glean with the required permissions, including access to Reports and Dashboards objects. Each user must individually authenticate their Salesforce account in Glean to enable live data access for reports and dashboards. When a user asks a question in Glean Chat that references a Salesforce report or dashboard, Glean will automatically fetch the latest data directly from Salesforce, provided you have the necessary permissions. If users are not authenticated, Glean will prompt them to connect their Salesforce account. Then they can interact with live Salesforce data in chat.

[Learn more](/connectors/native/salesforce/about)

Assistant *ROAD-1081*

* * *

#### Personalization and memory in Glean Assistant (GCP)[​](#personalization-and-memory-in-glean-assistant-gcp "Direct link to Personalization and memory in Glean Assistant (GCP)")

Glean is adding personalization functionality to Assistant so it can remember details from your conversations and work history to tailor future interactions, making it feel like an intelligent coworker that retains the context that matters most to you. Personalization combines implicit and mined memories from chat sessions and past work activity (within retention guardrails) with explicit, user‑controlled saved memories.

[Learn more](/administration/assistant/configuration/memory-personalization)

Assistant *ROAD-828*

* * *

#### New experience for user confirmation for actions in Assistant[​](#new-experience-for-user-confirmation-for-actions-in-assistant "Direct link to New experience for user confirmation for actions in Assistant")

Glean Assistant can now execute multiple actions, taking the input from a previous action and applying it to the next action in a single run. Users can chain outputs from earlier write steps as inputs to later ones, supporting more complex Assistant queries while keeping users in control.

[Learn more](/tools/tools-overview)

Actions *ROAD-1095*

* * *

#### Update to admins on Adaptive Planning in Agents[​](#update-to-admins-on-adaptive-planning-in-agents "Direct link to Update to admins on Adaptive Planning in Agents")

Adaptive Planning is now available for Glean Agents, enhancing agent workflows with improved reasoning and flexibility. Starting with the January 20, 2026 release, all agents using the Plan & Execute step were automatically upgraded from Basic to Thinking mode, enabling deeper, more iterative problem-solving. Agents will continue to use the best available model within their configured model family, and those previously set to "Same as Assistant" will now use "Best," ensuring optimal performance for each request. No customer action is required—this upgrade ensures agents benefit from the latest planning and reasoning capabilities while preserving existing model preferences.

This feature may use credits. Learn more in Glean's Help Center.

**How to access:** No customer action is required for this upgrade. The transition will occur automatically for all deployments with Agentic Engine enabled.

[Learn more](/tools/glean/plan-execute)

Agents *ROAD-1098*

* * *

#### Image generation in Glean Assistant with Nano Banana Pro now supported for AWS and Azure (Glean Key)[​](#image-generation-in-glean-assistant-with-nano-banana-pro-now-supported-for-aws-and-azure-glean-key "Direct link to Image generation in Glean Assistant with Nano Banana Pro now supported for AWS and Azure (Glean Key)")

Bring your ideas to life directly in Glean Assistant with Nano Banana Pro. You can now ask Assistant to create images from natural language prompts and it will respond with visuals in your chat response. This accelerates creative cycles and unlocks fast iteration for drafts, diagrams, social posts, and more. Image generation in Assistant allows you to include design direction in prompts based on internal documents and avoid switching tools. Now available for customer key on Azure and AWS.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/user-guide/about/end-user-quick-start-guide)

Assistant *ROAD-1102*

* * *

#### Make your writing shine with Editing Shortcuts within Canvas[​](#make-your-writing-shine-with-editing-shortcuts-within-canvas "Direct link to Make your writing shine with Editing Shortcuts within Canvas")

The Editing Shortcuts feature in Glean Canvas lets you apply common rewrites—like fix grammar, make concise, or change tone—with a single click instead of re-prompting in chat. When you highlight text and hit the shortcut button, a small menu of actions (Polish, Length, Tone) appears; choosing one sends a hidden, tuned prompt to the model and replaces just that selection with the improved version. This turns repetitive editing prompts into fast, in‑place adjustments so you can quickly polish, resize, and retune your writing without leaving the document.

[Learn more](/user-guide/assistant/glean-chat/canvas)

Assistant *ROAD-902*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Admin chat for help setting up and configuring Glean[​](#admin-chat-for-help-setting-up-and-configuring-glean "Direct link to Admin chat for help setting up and configuring Glean")

Glean offers admin chat, a natural language chat for help setting up and configuring the admin console, using data from Glean documentation, website, developer docs, and the Gleaniverse. If self-serve support isn’t enough, the admin chat can escalate to Glean's support team.

**How to access:** From the Admin Console, open the Help menu and select *Admin chat* to start a conversation.

[Learn more](/administration/about)

Admin Capabilities *ROAD-829*

* * *

#### Turn Deep Research Default On for Glean Key customers[​](#turn-deep-research-default-on-for-glean-key-customers "Direct link to Turn Deep Research Default On for Glean Key customers")

Deep Research was enabled by default for all customers on Glean Key for OpenAI and Glean Key for Azure OpenAI on January 15th, 2026. As previously shared in Coming Soon notes, Admins could pre-opt out by contacting their Account Manager and going forward, Admins have full control over which users have access to Deep Research and their usage quotas. Admins can set monthly query limits per user, restrict usage to specific users or departments, or turn off the feature entirely in Admin Console → Assistant → Deep Research.

This feature may use credits. Learn more in Glean's Help Center.

**How to access:** Administrators can access deep research in the Admin Console (Assistant → Deep Research).

[Learn more](/user-guide/assistant/deep-research)

Assistant *ROAD-1023*

* * *

#### Crawl JavaScript websites (AWS)[​](#crawl-javascript-websites-aws "Direct link to Crawl JavaScript websites (AWS)")

You can now use the Glean Website connector to crawl and index JavaScript-enabled websites in AWS deployments. This update brings feature parity with GCP deployments, allowing organizations on AWS to make dynamic, JavaScript-rendered web content discoverable in Glean search. Teams can now access more complete and up-to-date website content, improving search coverage and knowledge discovery for sites that rely on client-side rendering.

**How to access:** To connect a JavaScript-enabled website as a data source in an AWS deployment: In the Glean Admin Console, go to the Data Sources tab and select “Add Data Source,” then choose “Website.” Enter the display name and provide either a sitemap URL or seed URLs for the site you want to index. For JavaScript-heavy sites, enable Client-Side Rendering (CSR) in the advanced settings. CSR should only be used for public pages that do not require authentication, as it cannot be combined with cookies, authentication headers, or Single Sign-On (SSO). Save the configuration and trigger the initial crawl. Review the results and adjust settings as needed to ensure all desired content is indexed.

[Learn more](/connectors/native/website/#supported-features)

Connectors *ROAD-1086*

* * *

#### Crawl preview during web data source setup[​](#crawl-preview-during-web-data-source-setup "Direct link to Crawl preview during web data source setup")

The web crawl preview allows admins to preview the content and child links of web pages(configs determining crawl logic)-such as authentication, site fetch, and advanced settings-before running a full crawl. By surfacing potential misconfigurations and showing a sample of indexed pages in real time, admins can verify and correct their setup immediately, reducing delays and improving the onboarding experience for web data sources.

[Learn more](/connectors/native/website/validate-crawl)

Connectors *ROAD-1038*

* * *

#### Faster indexing for newly greenlisted Jira projects[​](#faster-indexing-for-newly-greenlisted-jira-projects "Direct link to Faster indexing for newly greenlisted Jira projects")

When a Jira project is added to the greenlist, Glean now triggers a targeted crawl for that project instead of requiring a full content crawl. This enhancement reduces load on Jira servers and ensures that newly greenlisted projects are indexed and searchable more quickly. The update is especially valuable for large enterprises using project-level greenlisting, improving both efficiency and data freshness.

[Learn more](/connectors/native/jira/#exclusion-redlisting-options)

Connectors *ROAD-880*

* * *

#### Redlist content in Microsoft O365 SharePoint and OneDrive with sensitivity labels[​](#redlist-content-in-microsoft-o365-sharepoint-and-onedrive-with-sensitivity-labels "Direct link to Redlist content in Microsoft O365 SharePoint and OneDrive with sensitivity labels")

Glean now supports redlisting content using Microsoft Purview sensitivity labels for SharePoint and OneDrive. This ensures that items tagged with selected labels are not surfaced in search, chat, and agent experiences. Admins can configure which sensitivity labels to redlist, and updates to these labels are propagated rapidly—typically within a few hours.

**How to access:** This feature is not currently self-service and cannot be configured directly from the Glean Admin Console. Configuration must be completed with assistance from Glean. To enable redlisting of content via Microsoft Purview sensitivity labels for SharePoint and OneDrive, an admin must: In Azure, locate the app registration connected to your SharePoint/OneDrive instance. Add the SensitivityLabels.Read.All Graph API application permissions and grant admin consent. Provide your Glean representative with the list of sensitivity label priority numbers, specifying which labels should be redlisted for SharePoint and OneDrive.

[Learn more](/administration/protect/sensitive-findings/restrict-content-via-sensitivity-labels)

Connectors *ROAD-746*

* * *

#### Details on sensitive and non-sensitive logs for AWS Customers[​](#details-on-sensitive-and-non-sensitive-logs-for-aws-customers "Direct link to Details on sensitive and non-sensitive logs for AWS Customers")

Glean now tags all AWS CloudWatch log groups and S3 buckets created by Glean as either sensitive or non-sensitive using the glean-sensitive: true|false tag. Additionally, an object in an S3 bucket within the Glean AWS account provides a comprehensive list of these resources. This enhancement makes it easy for customers to identify where sensitive data resides, improving transparency and supporting security and compliance needs. Sensitive data refers to data that can contain raw indexed document details or user queries. This data can contain any data that is stored or entered in, such as PII if present.

[Learn more](/security/cloud-prem/aws/log-monitoring)

Platform Capabilities *ROAD-1019*

* * *

#### Export sensitive findings via UI and API[​](#export-sensitive-findings-via-ui-and-api "Direct link to Export sensitive findings via UI and API")

Glean Protect administrators and developers can now download sensitive findings from weekly and continuous scans, filtered by data source or policy, directly from the Glean Protect user interface or programmatically via the Governance API. This enhancement streamlines remediation workflows by making it easy to share, triage, and automate actions with source system owners. With flexible export options, security teams can quickly access, filter, and distribute sensitive data findings for compliance, incident response, or integration with external tools.

**How to access:** To export sensitive findings:

-   In the Glean Admin Console, navigate to Glean Protect → Sensitive findings.
    
-   Use dashboard filters to select findings by datasource, policy, or other criteria.
    
-   Click the export button to download filtered findings as a CSV file. Only one export can be in progress per user at a time; completed exports are available for download in the export drawer.
    
-   For programmatic access, use the Governance API to export findings for integration with SIEM, SOAR, or other security tools. Refer to the Glean developer documentation for API usage and authentication details.
    

[Learn more](/administration/protect/sensitive-findings/view-policy-findings)

Protect *ROAD-948*
