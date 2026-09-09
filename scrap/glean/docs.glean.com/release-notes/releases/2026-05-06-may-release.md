---
url: "https://docs.glean.com/release-notes/releases/2026-05-06-may-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-05-06-may-release"
title: "May 06, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.735Z"
---
On this page

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Add Glean usage logging across GCE and Insights[​](#add-glean-usage-logging-across-gce-and-insights "Direct link to Add Glean usage logging across GCE and Insights")

Admins can now track Glean usage more consistently across Glean Customer Event Logs and Insights, making it easier to audit activity, analyze adoption, and answer questions about who used Glean, when, and where. Glean Customer Event Logs are designed to capture key user actions for analytics and reporting, including searches, chats, feedback, and workflow activity. This improves visibility for reporting, debugging, and downstream analysis across Glean surfaces.

**How to access:** Admins can use Glean Customer Event Logs to analyze usage activity and build custom reporting workflows. By default, these logs are written as a unified glean-customer-event stream to storage in your Glean project, and are typically loaded into a data warehouse such as BigQuery or Athena for analysis. Admins can also use Insights in the Admin console to review adoption and usage trends, including the Overview tab and Insights chat for natural-language analysis of platform usage.

[Learn more](https://docs.glean.com/administration/gce-logs/data-dictionary)

Admin Capabilities *\[ROAD-1281\]*

* * *

#### Add IdP-level permissions for Agent Scheduling[​](#add-idp-level-permissions-for-agent-scheduling "Direct link to Add IdP-level permissions for Agent Scheduling")

Admins can now control access to Agent Scheduling with identity provider groups, not just individual users. In **Admin console → Platform → Agents → Scheduled triggers**, you can add Google Groups or Azure AD / Entra ID groups alongside individual users, so the right teams can schedule agents without manual user-by-user setup.

**How to access:** To use this feature, go to **Admin console → Platform → Agents → Scheduled triggers** and turn scheduled triggers on for everyone or some users. If you choose a limited rollout, add individual users or supported IdP groups from Google Groups or Azure AD / Entra ID to the access list; members of those groups will inherit scheduling access automatically.

If your scheduled agents need to send outputs automatically, also configure the relevant action packs to allow Run without user confirmation for agents; otherwise, background runs can't use those actions.

[Learn more](https://docs.glean.com/agents/concepts/schedule-triggers#add-users-or-groups)

Admin Capabilities *\[ROAD-1219\]*

* * *

#### Model Insights for Customer Key Admins (BYOK)[​](#model-insights-for-customer-key-admins-byok "Direct link to Model Insights for Customer Key Admins (BYOK)")

Customer Key admins can now use **LLM Insights** in Glean to monitor Glean-attributed LLM usage and reliability, helping them provision capacity and troubleshoot issues with more confidence. The dashboard shows key metrics like peak and average TPM, peak RPM, 429 rate, and 5xx rate, with model-level breakdowns so admins can distinguish quota pressure from provider instability faster.

This release is available **only for Customer Key (BYOK) deployments** in v1, and it is **not available for Glean Key deployments**. Data updates once daily, may be delayed by up to 24 hours, and is intended for trend analysis and capacity planning rather than real-time monitoring or billing reconciliation.

[Learn more](https://docs.glean.com/administration/insights/overview)

Assistant *\[ROAD-1280\]*

* * *

#### Glean Agentic Search Model \[Glean Key, Glean Hosted Only\][​](#glean-agentic-search-model-glean-key-glean-hosted-only "Direct link to Glean Agentic Search Model [Glean Key, Glean Hosted Only]")

Glean's Agentic Search Model is a retrieval-optimized model that runs before the frontier model on eligible Assistant queries. It first gathers the most relevant enterprise context, then passes that evidence to the frontier model so responses are faster, better grounded, and more efficient.

In testing, this architecture delivered roughly 50% lower latency with no regression in answer quality or satisfaction.

Available for customers hosted by Glean on GCP using the Glean Universal Model Key. Not applicable to AWS, Azure, customer-managed key deployments, or EU customers.

[Learn more](https://docs.glean.com/administration/assistant/features/adaptive-reasoning)

Assistant *\[ROAD-1250\]*

* * *

#### Agent alignment check for write actions[​](#agent-alignment-check-for-write-actions "Direct link to Agent alignment check for write actions")

Glean Protect now has an agent alignment check before agent write actions run, helping detect unsafe or misaligned actions before they can make changes in connected systems. This strengthens protection for higher-risk agent workflows, especially background and automatically triggered agents, where write actions can run without per-run approval. When configured in flag-for-review mode, potential violations are logged in the Findings dashboard so admins can investigate without interrupting the run.

**How to access:** Admins can manage AI security policies in the Admin console under Glean Protect → AI security → Policies. From there, they can choose which agent types a policy applies to, including Automatically triggered agents, and set the enforcement action to Flag for review so issues appear in the Findings tab for triage.

[Learn more](https://docs.glean.com/administration/protect/ai-security/configuring-policies)

Protect *\[ROAD-811\]*

## User Features[​](#user-features "Direct link to User Features")

#### In-line previews for write actions in Assistant[​](#in-line-previews-for-write-actions-in-assistant "Direct link to In-line previews for write actions in Assistant")

Assistant now shows a richer in-line preview before a write action runs, so users can quickly understand what will happen before they create, update, or post anything. The preview surfaces key parameters in a compact, human-readable card and uses a clearer action button such as Create, Update, or Post, which makes actions feel more transparent, predictable, and safer to use without breaking conversation flow.

**How to access:** Write actions in Glean let users complete tasks like creating tickets, updating records, sending messages, or exporting content directly from a conversation. In the Glean web app, write actions can pause for review before they run, and for supported actions users can review and edit fields or content inline before saving the change. Access depends on your organization having the relevant actions enabled and authenticated in the Glean Admin console, and actions always respect the user's existing permissions in the connected application.

[Learn more](https://docs.glean.com/actions/human-in-the-loop-experience-for-actions)

Actions *\[ROAD-1193\]*

* * *

#### Glean agents support Snowflake Cortex Agents API[​](#glean-agents-support-snowflake-cortex-agents-api "Direct link to Glean agents support Snowflake Cortex Agents API")

Glean is introducing new functionality enabling Glean agents to call Snowflake Cortex agents to answer natural language questions over Snowflake‑governed data. The integration is powered by Snowflake's Cortex Agents REST API, so customers can reuse their existing agent orchestration, tools, and semantic models directly inside Glean.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/actions/datasource/snowflake/snowflake-index)

Actions *\[ROAD-1056\]*

* * *

#### See contextual images in Glean Assistant responses (AWS customers)[​](#see-contextual-images-in-glean-assistant-responses-aws-customers "Direct link to See contextual images in Glean Assistant responses (AWS customers)")

Glean Assistant now displays relevant images from Google Drive and SharePoint documents alongside text responses when appropriate. This enhancement helps users better understand complex information by providing visual context directly in chat answers-no extra steps required. Images are shown only when relevant to the user's query, with full permissions enforced for every user.

This was previously released for GCP customers.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/administration/assistant/features/contextual-images)

Agents *\[ROAD-916\]*

* * *

#### GPT 5.5 in Assistant and Agents[​](#gpt-55-in-assistant-and-agents "Direct link to GPT 5.5 in Assistant and Agents")

Glean now supports OpenAI GPT-5.5 in Assistant and Agents as a premium model. In Assistant, users can select GPT-5.5 from model choice. In Agents, builders can use GPT-5.5 in the Model Hub for supported agents and steps. GPT-5.5 is available for Glean Universal Model Key deployments and for Customer Key deployments through OpenAI, and premium model usage may consume FlexCredits or other usage-based charges based on your plan.

**How to access:** Administrators must enable for your organization. In the Admin console, go to Platform → LLMs and make sure GPT-5.5 is enabled in the Model Hub. For Assistant, users can then select GPT-5.5 from the model picker when model choice is available. For Agents, builders can choose GPT-5.5 as the default model in agent settings or for individual eligible steps in the canvas.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/llms)

Agents *\[ROAD-1316\]*

* * *

#### Write tool previews, batch writes, and simplified auth in Assistant[​](#write-tool-previews-batch-writes-and-simplified-auth-in-assistant "Direct link to Write tool previews, batch writes, and simplified auth in Assistant")

Write tools in Glean now show a clear preview before they run, so users can review and approve changes before execution. This applies to both single-item and batch write flows. We also simplified tool auth to reduce setup friction for admins and end users.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/actions/actions-overview)

Agents *\[ROAD-1299\]*

* * *

#### Additional SharePoint List support[​](#additional-sharepoint-list-support "Direct link to Additional SharePoint List support")

Glean now supports indexing four additional types of SharePoint Lists: Discussion Board, Custom List in Datasheet View, Tasks, and Issue Tracking. This expands search coverage for content teams commonly use to manage discussions, track work, and organize operational data, making it easier for users to find more of their SharePoint knowledge in Glean.

**How to access:** Administrators must enable for your organization.

[Learn more](https://docs.glean.com/connectors/native/sharepoint/about)

Connectors *\[ROAD-1211\]*

* * *

#### Switch models within an existing Assistant chat session[​](#switch-models-within-an-existing-assistant-chat-session "Direct link to Switch models within an existing Assistant chat session")

You can now switch models mid-conversation in Glean Assistant without losing your thread. Previously, changing models would drop you into a new chat - losing your context, canvas, and conversation history. Now your session stays intact, so you can start with a faster model and upgrade to a stronger one when you need it, or experiment across models without starting over.

[Learn more](https://docs.glean.com/get-started/golive/model-choice)

Assistant *\[ROAD-1315\]*

* * *

#### Updated navigation, chat bar, and personalized activity cards in Assistant[​](#updated-navigation-chat-bar-and-personalized-activity-cards-in-assistant "Direct link to Updated navigation, chat bar, and personalized activity cards in Assistant")

Glean has been updated with a more streamlined layout, including a refreshed chat bar and new proactive cards that surface relevant next steps based on the context of your work. The updated navigation introduces a dedicated Search entry point along with a new content library. Together, these updates create a more unified way to search, chat, and work within Glean. Most users will see the change on April 29, 2026.

Customers who were part of the earlier gradual rollout of the new layout (ROAD-1040) will now be moved to 100% rollout on April 29, 2026.

[Learn more](https://docs.glean.com/release-notes/coming-soon/new-homepage)

Assistant *\[ROAD-1318\]-MR*

* * *

#### Experience real-time, hands-free voice conversation support with Glean on web, desktop, and mobile[​](#experience-real-time-hands-free-voice-conversation-support-with-glean-on-web-desktop-and-mobile "Direct link to Experience real-time, hands-free voice conversation support with Glean on web, desktop, and mobile")

Experience natural, hands-free real-time voice conversations with Glean Assistant on web, desktop, and mobile. Talk to Assistant and hear it respond immediately and naturally, with low-latency, back-and-forth dialogue-just speak, and Glean responds out loud, allowing you to interrupt or steer the conversation at any time. Real-time voice unlocks new ways to brainstorm, prepare for your day, and get work done wherever you are, making Glean more accessible and productive for users on the go or at their desk.

This feature is available for Glean Key customers. Admins can control the rollout of this feature to their end users from Admin console → Assistant → Realtime Voice. The default setting lets Glean manage the rollout: voice is off by default and will be turned on for users no earlier than mid-April 2026. We recommend starting with "On only for admins"; if you like it, you can turn it on for everyone in your organization at any time, or select "Off" to opt out. Your choice can be changed at any time and will not be overwritten. This feature may use credits. Learn more in Glean's Help Center.

**How to access:** Administrators must enable for your organization.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)

Assistant *\[ROAD-911\]*

* * *

#### Deprecation of Claude Sonnet 4, Sonnet 4.5 and Opus 4.5[​](#deprecation-of-claude-sonnet-4-sonnet-45-and-opus-45 "Direct link to Deprecation of Claude Sonnet 4, Sonnet 4.5 and Opus 4.5")

Anthropic is retiring the 1M token context window beta for Claude Sonnet 4.5 and Claude Sonnet 4 on April 30, 2026. After this date, the context-1m-2025-08-07 beta header will have no effect and requests exceeding the standard 200k-token context window will return an error.

Users should migrate to Claude Sonnet 4.6 or Claude Opus 4.6, which support 1M context at standard pricing with no beta header required.

Ref: [Anthropic release notes](https://platform.claude.com/docs/en/release-notes/overview#march-30-2026)

[Learn more](https://docs.glean.com/administration/llms)

Agents *\[ROAD-1271\]*

* * *

#### See live task progress in Assistant plans[​](#see-live-task-progress-in-assistant-plans "Direct link to See live task progress in Assistant plans")

Glean Assistant now shows a live task list for complex, multi-step requests, so you can see the plan it creates and track progress as work happens. Each step updates in real time as Pending, In Progress, or Done, which makes longer-running research, analysis, and workflow tasks easier to follow and less opaque. You can also stop Assistant and redirect it if you want to change course mid-task. This is available in Thinking mode for all users on Glean Universal Key and Glean Hosted.

**How to access:** Open Glean Assistant and submit a complex request in Thinking mode, such as a multi-step research or analysis task. If Assistant decides the request needs planning, it will show a task list card in chat with live step-by-step progress. No admin setup is required.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/plan)

Assistant *\[ROAD-1332\]*

* * *

#### Create images with Open AI's Image 2 model in Assistant and Agents[​](#create-images-with-open-ais-image-2-model-in-assistant-and-agents "Direct link to Create images with Open AI's Image 2 model in Assistant and Agents")

Glean now supports OpenAI Image 2, giving users access to a new, high-quality image generation capability from OpenAI that was not previously available. Users can generate richer visuals directly from Glean Assistant and Agents, with images embedded into artifacts like slides and docs where supported. Agent builders also now have a dedicated Image Creation node, and Plan & Execute plus autonomous agents can explicitly incorporate image generation into multi-step workflows. Usage continues to follow your organization's existing safety, quota, and eligibility settings, with graceful fallbacks to text-only responses when requests are blocked or exceed limits.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/image-generation#image-generation-in-glean-assistant)

Assistant *\[ROAD-1324\]*

* * *

#### See file pills for Memory and Skills in intermediate steps[​](#see-file-pills-for-memory-and-skills-in-intermediate-steps "Direct link to See file pills for Memory and Skills in intermediate steps")

Glean Assistant now shows file pills for triggered skills in intermediate steps, so users can more easily see which skill influenced a response and open it in the side panel for more context. This makes Assistant less opaque during longer-running tasks and gives users a clearer view into how responses are being shaped. No admin setup is required.

**How to access:** When Assistant shows intermediate steps during a query, look for the skill pill in the progress area and click it to open the skill in the side panel.

[Learn more](https://docs.glean.com/user-guide/assistant/skills)

Assistant *\[ROAD-1323\]*

* * *

#### Import Memory to Glean from other AI Providers[​](#import-memory-to-glean-from-other-ai-providers "Direct link to Import Memory to Glean from other AI Providers")

You can now bring work-related preferences, role context, active projects, and communication habits from other AI assistants into Glean, so Assistant can personalize responses faster without making you start from scratch. Users can open Settings, go to Personalization, copy Glean's import prompt, paste it into another AI assistant, then paste the response back into Glean to save imported memories. Imported memories are reviewed and written into Glean's memory system, where users can later view or delete them from Personalization. Fast mode is not supported for this flow.

**How to access:** Open Glean, go to Settings, and select Personalization. Use the import option to copy Glean's prompt into another AI assistant, then paste that assistant's response back into Glean to add work-related memories. No admin setup is required beyond having memory enabled for your organization.

[Learn more](https://docs.glean.com/user-guide/assistant/memory-personalization)

Assistant *\[ROAD-1304\]*

* * *

#### Agent Sandbox & Programmatic Tool Calling \[Customer-Hosted on GCP, AWS\][​](#agent-sandbox--programmatic-tool-calling-customer-hosted-on-gcp-aws "Direct link to Agent Sandbox & Programmatic Tool Calling [Customer-Hosted on GCP, AWS]")

Agent sandbox and programmatic tool calling are now available for customer-hosted deployments in AWS and GCP. In Thinking mode, Glean Assistant can perform secure code-backed analysis, large result retrieval, and multi-step reasoning while keeping execution and data inside the customer's cloud environment. Programmatic tool calling lets Glean orchestrate large numbers of tools for parallel research tasks by writing and executing code in a sandbox.

**How to access:** After setup, Glean Assistant Thinking mode automatically activates sandbox when a query benefits from code execution, exhaustive retrieval, or structured analysis. For best results, use a supported frontier model such as GPT 5.4 or later, Claude Sonnet 4.6, Claude Opus 4.6 or later, or Gemini 3.1 Pro.

[Learn more](/security/agent-sandbox-ptc)

Assistant *\[ROAD-1285\]*

* * *

#### Add, find, and revisit content in the library[​](#add-find-and-revisit-content-in-the-library "Direct link to Add, find, and revisit content in the library")

The library is a new dedicated tab for everything you've created and saved in Glean. It replaces the Content section in the left navigation with a single, searchable surface for all your documents, slides, images, emails, interactive pages, Collections, Pins, and Go Links. You can also discover content that teammates have shared with you or your organization.

How it works: Open the library from the left navigation to browse everything in one place. Filter by type to narrow results, or search to find a specific item. Clicking any item opens it in context with its original conversation.

Content created with Assistant is retained indefinitely, until a user deletes it from the library. This content includes artifacts such as documents, slides, emails, and images.

This does not apply to standard chat responses, where your organization's chat retention period still applies. The library help page on docs.glean.com will include a full description of content types when the library reaches GA.

[Learn more](https://docs.glean.com/user-guide/assistant/assistant-library)

Assistant *\[ROAD-1278\]*

* * *

#### Allow users to manually rename chat conversations[​](#allow-users-to-manually-rename-chat-conversations "Direct link to Allow users to manually rename chat conversations")

Users can now manually rename their chat conversations in Glean Assistant by clicking on any chat title and editing it inline. Custom titles persist across sessions, making it easy to organize and revisit past conversations. Chats you don't rename will continue to use automatically generated titles, so no action is required.

[Learn more](https://docs.glean.com/user-guide/about/end-user-quick-start-guide)

Assistant *\[ROAD-1210\]*
