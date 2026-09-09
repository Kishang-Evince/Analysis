---
url: "https://docs.glean.com/release-notes/releases/2026-04-08-april-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-04-08-april-release"
title: "April 8, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.649Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Agents now support adding apps instead of individual actions for Auto mode and Plan and Execute agents[​](#agents-now-support-adding-apps-instead-of-individual-actions-for-auto-mode-and-plan-and-execute-agents "Direct link to Agents now support adding apps instead of individual actions for Auto mode and Plan and Execute agents")

Builders can now give Auto mode and Plan and Execute agents access to whole apps like Jira, Slack, Gmail, and Google Docs instead of adding individual actions one by one. This makes agent setup faster, easier to understand, and less cluttered.

Existing agents will transition to this new experience automatically, with no breaking changes. If an agent already uses multiple actions from the same app, those actions will continue to work after migration. For user confirmation settings, we take the more conservative approach: if any one of those actions requires user confirmation, then all actions from that app in that agent will require user confirmation.

**How to access:** No rebuild is required for existing Auto mode or Plan and Execute agents. Existing agent configurations that already use individual actions will continue to work as-is, and builders can now add supported apps directly when creating or editing Auto mode and Plan and Execute agents. Static workflow agents are unchanged in this release and still use individual actions.

[Learn more](https://docs.glean.com/actions/actions-overview)

Actions *ROAD-1236*

* * *

#### Memory usage in agent debug traces[​](#memory-usage-in-agent-debug-traces "Direct link to Memory usage in agent debug traces")

Debug mode now shows how much of each LLM call's context window is used, with separate input and output percentages for workflow and auto mode agents. This helps builders spot steps nearing context limits, diagnose truncation-related quality issues, and tune memory and model settings. For workflow agents, the memory setting is also now more prominently displayed beneath Instructions in each step.

[Learn more](https://docs.glean.com/agents/create-agents/debug-agent)

Agents *ROAD-1215-MR*

* * *

#### Share content with your teammates[​](#share-content-with-your-teammates "Direct link to Share content with your teammates")

Sharing enables Glean users to publish dashboards, infographics, visualizations, and other content to a stable, shareable link that teammates can open directly in Glean, resulting in seamless distribution of created work without leaving the platform.

How it works: Click Share on any artifact, set audience and permissions (private, team, or org-wide).

[Learn more](https://docs.glean.com/user-guide/assistant/html-artifacts)

Assistant *ROAD-1153-MR*

* * *

#### Viewing generated visual media within Glean Canvas[​](#viewing-generated-visual-media-within-glean-canvas "Direct link to Viewing generated visual media within Glean Canvas")

Users can now view AI-generated slides and images inline in Canvas, staying in flow as they scroll through decks, zoom into visuals, and quickly sanity-check content without downloading files or opening other apps. When they're ready to share or polish, they can still export to PowerPoint, Google Slides, PDF, or image files - making fast in-product review the default and export an explicit follow-up step.

[Learn more](https://docs.glean.com/user-guide/assistant/image-generation#image-generation-in-glean-assistant)

Assistant *ROAD-1108*

* * *

#### Glean Assistant can create PowerPoint presentations[​](#glean-assistant-can-create-powerpoint-presentations "Direct link to Glean Assistant can create PowerPoint presentations")

Glean Assistant can now generate full slide decks with day zero support for Microsoft PowerPoint (Google Slides support coming soon) presentations directly from prompts. Ask Assistant to create a slide deck on any topic, and it will automatically use your company's approved template to maintain consistent branding and formatting across all presentations. Available for Glean Key and Customer Key. Admins must add their company slide template to the admin console via Console > Assistant > Settings > Slide deck generation > upload template.

See Coming Soon release notes for upcoming Google Slides support.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

**How to access:** Admins must enable PowerPoint slide generation via the Admin console for admins or all users, and upload a company template.

[Learn more](https://docs.glean.com/user-guide/assistant/slide-generation)

Assistant *ROAD-898*

* * *

#### Create and execute structured plans in Glean Assistant[​](#create-and-execute-structured-plans-in-glean-assistant "Direct link to Create and execute structured plans in Glean Assistant")

Glean Assistant generates an interactive plan displayed directly in chat, breaking the task into clear, numbered steps. Each step updates live with its status (Pending, In Progress, or Done) along with an overall progress bar and elapsed time, so you can follow along as work gets done.

Stay in control: Stop Assistant at any time and redirect it. Assistant can regenerate a new plan or update its existing one based on your feedback.

Adaptive execution: If new information emerges mid-task, Assistant revises its plan in real-time, adjusting steps rather than following a rigid sequence.

**How to access:** This feature automatically gets enabled in Thinking Mode.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/plan)

Assistant *ROAD-1248*

* * *

#### Download Canvas content as Markdown[​](#download-canvas-content-as-markdown "Direct link to Download Canvas content as Markdown")

Canvas documents now include a Download Markdown option in the export menu, letting you save your content as a clean .md file with a single click. Any Glean-hosted images are preserved as clickable links so nothing is lost in translation. Whether you're moving content to GitHub, a README, or another markdown-friendly tool, it just works.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/canvas)

Assistant *ROAD-1244*

* * *

#### Bring your Glean memory to any AI tool with MCP (GCP)[​](#bring-your-glean-memory-to-any-ai-tool-with-mcp-gcp "Direct link to Bring your Glean memory to any AI tool with MCP (GCP)")

Bring your Glean memory to any AI tool with MCP, enabling employees to use their existing Glean memory in third-party AI assistants and IDEs. This allows them to receive personalized, context-aware responses without repeatedly restating their role, projects, preferences, or writing style. Tools like ChatGPT, Claude, Cursor, VS Code, and Copilot can retrieve this context through the MCP memory tool. Memory remains read-only and fully governed within Glean. This is available by default for existing Glean MCP server deployments on GCP. We are working on this for our AWS customers. Admins can disable the memory tool for a deployment at any time.

**How to access:** The `read_memory` tool is included in Glean's MCP server and enabled by default for deployments on GCP. No additional integration is necessary. We are working on this for our AWS customers.

Admin controls: Administrators can enable or disable the read\_memory tool for a deployment in MCP Hub or the Glean Admin Console.

End-user context: End users manage the information used by this tool through their memory profile in Glean under Settings > Personalization. Connected AI tools (e.g., ChatGPT, Claude, Cursor, VS Code, Copilot) can call read\_memory via MCP to retrieve this governed, read-only context.

[Learn more](https://docs.glean.com/administration/platform/mcp/create-mcp-servers#built-in-tools)

Assistant *ROAD-1203*

* * *

#### Agent sandbox and programmatic tool calling in Assistant \[Glean Key and Glean Hosted Only\][​](#agent-sandbox-and-programmatic-tool-calling-in-assistant-glean-key-and-glean-hosted-only "Direct link to Agent sandbox and programmatic tool calling in Assistant [Glean Key and Glean Hosted Only]")

Glean Assistant can now use a secure sandboxed environment in Thinking mode to handle more complex analysis and research tasks. This helps Assistant work through large result sets across connected systems, run code to analyze data, and return richer outputs like summaries, charts, and CSVs - without requiring any extra setup from end users. It's especially useful for multi-step analytical questions that would otherwise exceed a model's context window and executing skills (currently in beta).

**How to access:** Available for Glean Key and Glean-hosted customers in Assistant Thinking mode. Agent Sandbox activates automatically when a query benefits from code execution, exhaustive retrieval, or cross-system analytics, so users don't need to enable or configure anything. Customer-hosted deployments are not included in this launch.

[Learn more](/security/agent-sandbox-ptc)

Assistant *ROAD-1160*

* * *

#### Create dynamic, interactive pages with Glean Assistant[​](#create-dynamic-interactive-pages-with-glean-assistant "Direct link to Create dynamic, interactive pages with Glean Assistant")

Glean Assistant can create interactive pages that run safely inside Glean, no separate tools or coding required. Describe what you want (an interactive dashboard, infographic, or simple calculator, for example) and Assistant will generate HTML you can preview, click through, and refine directly in Canvas.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/html-artifacts)

Assistant *ROAD-1136*

* * *

#### Edit images in Glean Assistant[​](#edit-images-in-glean-assistant "Direct link to Edit images in Glean Assistant")

You can now edit Assistant-generated images right inside Glean. Open any image in the viewer, draw annotations on the areas you want changed, describe the edit in plain language, and click Apply to get an updated version. Compare versions as you iterate with version history.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/image-generation)

Assistant *ROAD-1117*

* * *

#### Create images with OpenAI's Image 1.5 model in Assistant and Agents[​](#create-images-with-openais-image-15-model-in-assistant-and-agents "Direct link to Create images with OpenAI's Image 1.5 model in Assistant and Agents")

Glean now supports OpenAI Image 1.5, giving users access to a new, high-quality image generation capability from OpenAI that was not previously available. Users can generate richer visuals directly from Glean Assistant and Agents, with images embedded into artifacts like slides and docs where supported. Agent builders also now have a dedicated Image Creation node, and Plan & Execute plus autonomous agents can explicitly incorporate image generation into multi-step workflows. Usage continues to follow your organization's existing safety, quota, and eligibility settings, with graceful fallbacks to text-only responses when requests are blocked or exceed limits.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/image-generation#image-generation-in-glean-assistant)

Assistant *ROAD-1115*

* * *

#### Gainsight connector[​](#gainsight-connector "Direct link to Gainsight connector")

The Gainsight connector gives go-to-market and customer success teams a complete 360-degree view of their customers by supporting core Gainsight Customer Success objects.

**How to access:** Admins will need to enable the connector in data sources.

[Learn more](https://docs.glean.com/connectors/native/gainsight/home)

Connectors *ROAD-930*

* * *

#### Glean in Slack - UI refresh and interaction design improvements[​](#glean-in-slack--ui-refresh-and-interaction-design-improvements "Direct link to Glean in Slack - UI refresh and interaction design improvements")

Glean has refreshed the visual design and interaction flows for Glean in Slack. Updates include redesigned feedback buttons, improved loading/latency indicators, cleaner citation and source attribution, proper table rendering in DMs, and streamlined button layouts. These improvements make the Slack experience more polished, intuitive, and consistent for end users.

[Learn more](/administration/platform/embedded-integrations/slackbot/getting-started/installation-guide)

Embedded Integrations *ROAD-1233*

* * *

#### Gradual rollout of new Glean homepage to select customers[​](#gradual-rollout-of-new-glean-homepage-to-select-customers "Direct link to Gradual rollout of new Glean homepage to select customers")

Beginning March 26, Glean will start a gradual rollout of a new homepage to customers that were previously contacted via email. The updated experience streamlines where users start their work in Glean without taking away any core functionality. The new homepage proactively recommends personalized next steps to move work forward, includes a dedicated company tab, and brings search and chat into a single entry point. The experience will roll out gradually to all users in the notified customer base. During this period, users within the same organization may temporarily see different homepage experiences.

Note: All Glean customers will receive these updates later this month (see Coming Soon ROAD-1043).

**How to access:** Admins can opt out of the early rollout in Admin Console > Appearance using the homepage experience toggle, if the homepage rollout is available in their environment. If you have questions or feedback, join the conversation in the Gleaniverse.

[Learn more](https://docs.glean.com/release-notes/coming-soon/new-homepage)

Glean Home *ROAD-1040*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Introduce billing alerts and monthly budgets[​](#introduce-billing-alerts-and-monthly-budgets "Direct link to Introduce billing alerts and monthly budgets")

Admins can now set billing alerts and monthly budgets to proactively stay ahead of FlexCredits usage. They can configure alerts when total credit consumption reaches 50%, 75%, 90%, or 100% of available credits, and set a monthly soft budget with alerts at the same thresholds. By default, admins receive alerts at 75%, 90%, and 100% of total available credits, and those alert settings are editable.

**How to access:** Open the Admin console and select FlexCredits to access the billing dashboard. To use the dashboard, you must have either the Super admin role, Admin, or the Billing Moderator role. From there, review your current FlexCredits balance and usage, then configure billing alerts or monthly budget thresholds when those controls are available in the dashboard.

[Learn more](https://docs.glean.com/administration/management/flexcredits-dashboard)

Admin Capabilities *ROAD-1251*

* * *

#### \[Action Required\] Update your Linear Connector Authentication tokens before April 1[​](#action-required-update-your-linear-connector-authentication-tokens-before-april-1 "Direct link to [Action Required] Update your Linear Connector Authentication tokens before April 1")

Linear is moving from long-lived access tokens to short-lived access tokens with refresh token support. This is a security improvement on Linear's side, and requires a quick update before April 1, 2026 to ensure your Glean-Linear connector continues to work properly.

**How to access:** The process should only take a few minutes. If you'd like any guidance or run into issues, don't hesitate to reach out to your Glean support team - we're here to help.

1.  In your Linear OAuth2 application settings, modify specifically the OAuth application you have used to authenticate in Glean (most likely with the application name being "Glean Application") to enable refresh token support.
2.  Once that's done, re-authenticate the Linear connector in your Glean admin console.

[Learn more](https://docs.glean.com/connectors/native/linear/)

Admin Capabilities *ROAD-1225*

* * *

#### Custom actions no longer send user email by default[​](#custom-actions-no-longer-send-user-email-by-default "Direct link to Custom actions no longer send user email by default")

Custom actions no longer send the authenticated user's email address to third-party endpoints by default. This reduces exposure of user identity data while preserving support for organizations that rely on it for authorization, routing, or workflow logic. If your workflows depend on this behavior, contact Glean Support to keep it enabled before April 1st.

[Learn more](https://docs.glean.com/security/architecture/data-flow)

Actions *ROAD-1208*

* * *

#### GPT 5.4, Claude Sonnet 4.6, and Claude Opus 4.6 for Customer Key in Assistant and Agents[​](#gpt-54-claude-sonnet-46-and-claude-opus-46-for-customer-key-in-assistant-and-agents "Direct link to GPT 5.4, Claude Sonnet 4.6, and Claude Opus 4.6 for Customer Key in Assistant and Agents")

Customer Key admins can now configure GPT 5.4, Claude Sonnet 4.6, and Claude Opus 4.6 for Glean Assistant and Agents, expanding access to newer premium models for stronger reasoning and long-context tasks. This gives Customer Key deployments more model choice across OpenAI, Azure OpenAI, Vertex AI, and Amazon Bedrock, helping teams use the latest frontier models in the surfaces they rely on most. These premium models may increase usage costs compared with existing defaults.

**How to access:** In the Admin Console, go to Platform > LLMs, click Add LLM, choose your hosting provider, select the models you want to use for Assistant and Agents, validate the connection, and save. For Customer Key deployments, GPT 5.4 is supported via OpenAI or Azure OpenAI, and Claude Sonnet 4.6 and Claude Opus 4.6 are supported via Google Vertex AI or Amazon Bedrock. If you want to use a supported model in an agent, you can then select it as the default model in agent settings or for an individual step in the canvas.

[Learn more](https://docs.glean.com/administration/llms)

Agents *ROAD-1262*

* * *

#### Databricks connector: Index Genie spaces for Search and Assistant[​](#databricks-connector-index-genie-spaces-for-search-and-assistant "Direct link to Databricks connector: Index Genie spaces for Search and Assistant")

Glean's Databricks connector now indexes Databricks Genie spaces as searchable content, bringing Genie space metadata into Search and Assistant. This helps users find relevant Genie spaces more easily and improves Assistant routing for Databricks natural language questions. Indexed metadata includes details such as sample questions, example SQL, tables, metric views, and permissions-aware access controls.

**How to access:** Admins can enable this by setting up the native Databricks connector in the Glean Admin Console and connecting their Databricks account with the required OAuth credentials and workspace configuration. Once configured, the connector crawls Databricks content and validates permissions automatically during setup.

[Learn more](https://docs.glean.com/connectors/native/databricks/)

Connectors *ROAD-1230*

* * *

#### \[Action Required by April 2\] SharePoint Connector to switch from secret-based to certificate-based authentication[​](#action-required-by-april-2-sharepoint-connector-to-switch-from-secret-based-to-certificate-based-authentication "Direct link to [Action Required by April 2] SharePoint Connector to switch from secret-based to certificate-based authentication")

Customers using SharePoint Online with Azure ACS secrets authentication must update your authentication to Microsoft Entra ID by April 2 to continue accessing the latest data in Glean.

Microsoft is retiring the legacy Azure ACS secrets-based method for SharePoint Online authentication, which will stop updating SharePoint permissions in Glean after April 2, 2026 if not changed. Glean now supports an in-place switch for the SharePoint connector from client secret to certificate-based authentication, helping you stay compliant with Microsoft's change while keeping SharePoint permissions and content in Glean fresh and accurate. With certificate-based authentication using Microsoft Entra ID, your organization benefits from stronger, standards-based identity security and more reliable permission updates for SharePoint data in Glean.

[Learn more](https://docs.glean.com/connectors/native/sharepoint/secrets-to-certificate-migration)

Connectors *ROAD-1227*

* * *

#### Mobile app access now requires Chat to be enabled[​](#mobile-app-access-now-requires-chat-to-be-enabled "Direct link to Mobile app access now requires Chat to be enabled")

On March 31, 2026, Glean is retiring the native mobile app experience for deployments that do not have Assistant enabled. When users from these organizations open the Glean mobile app, they'll see a message explaining that mobile app access is no longer available, but can continue to access Glean from their mobile browser for search and other supported functionality, or the admin can contact their account team to enable the chat experience for the organization.

[Learn more](https://docs.glean.com/administration/management/features/mobile)

Mobile App *ROAD-1198*

* * *

#### Quickly triage AI security violations with richer context and workflows, while reducing false positives[​](#quickly-triage-ai-security-violations-with-richer-context-and-workflows-while-reducing-false-positives "Direct link to Quickly triage AI security violations with richer context and workflows, while reducing false positives")

AI security findings are now easier to review and more accurate. Security teams can quickly triage AI security violations with richer context and workflows, while backend improvements reduce noisy false positives so they can focus on real risks. This helps you focus on true AI security prompt injection, harmful content, and malicious code without drowning in unnecessary alerts.

**How to access:** AI security violations triage are part of Glean Protect+ AI security guardrails. To use them, ensure Protect+ is enabled for your organization, then have a Super Admin or Sensitive Content Moderator open the Protect+ or AI security area in the admin experience to review violations and configure guardrail policies. From there, they can use the violations dashboard and related filters to prioritize issues, tune policies, and refine guardrail behavior based on feedback, improving precision over time.

[Learn more](https://docs.glean.com/administration/protect/ai-security/)

Protect *ROAD-1105*
