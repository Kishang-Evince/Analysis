---
url: "https://docs.glean.com/release-notes/releases/2026-06-17-june-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-06-17-june-release"
title: "June 17, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:54.032Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Turn your ideas into documents, slides, diagrams, or infographics in one click[​](#turn-your-ideas-into-documents-slides-diagrams-or-infographics-in-one-click "Direct link to Turn your ideas into documents, slides, diagrams, or infographics in one click")

Turn a single idea into anything you need: a document, slide, infographic, image, web page, or diagram. With the **Convert** button, you can capture your thinking once, then instantly transform it into lightweight, interactive experiences that live right alongside your work in Glean. Your content becomes the single source of truth, while Glean dynamically generates rich, visually engaging views. You can find the **Convert** button on the bottom of any chat message or at the top right of any artifact, allowing you to seamlessly switch between whatever artifact you need to get the job done.

**How to access:** Administrators must enable for your organization. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/canvas)

Assistant *\[ROAD-962\]*

* * *

#### Interactive artifact editing with component selection[​](#interactive-artifact-editing-with-component-selection "Direct link to Interactive artifact editing with component selection")

You can now edit individual components within HTML artifacts directly in Canvas. Click **Edit** in the top-right navigation, select any element in an artifact, and describe what you want changed. Assistant regenerates the component while keeping the rest of the artifact intact.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/canvas)

Assistant *\[ROAD-1457\]*

* * *

#### Full-screen artifact composer for iterating with Glean[​](#full-screen-artifact-composer-for-iterating-with-glean "Direct link to Full-screen artifact composer for iterating with Glean")

You can now keep working with AI when viewing artifacts in full screen. A chat composer appears directly in the full-screen view so you can request edits, ask questions, and iterate without switching back to the side-by-side layout. If you prefer a clean view, minimize the composer and it stays out of the way for that session.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/canvas)

Assistant *\[ROAD-1439\]*

* * *

#### Queued edits for documents in Canvas[​](#queued-edits-for-documents-in-canvas "Direct link to Queued edits for documents in Canvas")

You can now leave comments throughout a document in Canvas, just like you would in Google Docs or Word, and have Glean resolve them all in one go. Read through the draft, drop feedback on each section that needs work, and when you are ready, click **Apply All**. Glean revises the entire document in a single pass, addressing every comment together instead of making you issue follow-up edits one at a time.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/canvas)

Assistant *\[ROAD-1438\]*

* * *

#### Create documents via real-time voice[​](#create-documents-via-real-time-voice "Direct link to Create documents via real-time voice")

You can now create documents entirely through voice. Just speak your request and Glean builds the document in real time, the same way it does in text chat. Whether you are drafting a project brief hands-free or working while multitasking, voice document creation lets you produce polished content without typing a single word.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/user-guide/assistant/real-time-voice)

Assistant *\[ROAD-1372\]*

* * *

#### Try agents in Auto Mode: one-click workflow-to-Auto-Mode conversion for agent builders[​](#try-agents-in-auto-mode-one-click-workflow-to-auto-mode-conversion-for-agent-builders "Direct link to Try agents in Auto Mode: one-click workflow-to-Auto-Mode conversion for agent builders")

Agent builders can now use **Try in Auto Mode** to convert an existing workflow agent into a new Auto Mode draft in a single click, without changing the original agent. The conversion uses the latest agent compiler to translate tools, triggers, knowledge sources, sub-agents, and permissions so you can compare behavior side by side and migrate when you're ready. This makes it easier to move production workflows onto Auto Mode for stronger reasoning, less brittle orchestration, and lower maintenance over time.

**How to access:** Administrators must enable for your organization. To use this feature, your organization must have Agents and Auto Mode agents enabled in Glean. Once enabled, open any existing workflow agent in the **Agent library** and choose **Try in Auto Mode** from the **More actions** menu to generate a new Auto Mode draft. Review and save the converted agent when you're ready to share it.

[Learn more](https://docs.glean.com/agents/auto-mode-agent)

Agents *\[ROAD-1497\]*

* * *

#### Revamped Agent Insights for admins and agent builders[​](#revamped-agent-insights-for-admins-and-agent-builders "Direct link to Revamped Agent Insights for admins and agent builders")

Glean has revamped Agent Insights to make it easier to understand agent adoption, quality, and usage across your organization and for individual agents. The updated experience adds new views for time saved by agents, runs by outcome, top use cases, and voting feedback drill-down, while also replacing the older single-scroll page with a clearer shared dashboard and per-agent insights experience for builders. This helps admins spot adoption and quality trends faster, and helps agent builders diagnose issues and improve their agents with more actionable insight.

[Learn more](https://docs.glean.com/administration/insights/agents)

Admin Capabilities *\[ROAD-1320\]*

* * *

#### GPT-5.4 as default for new autonomous agents[​](#gpt-54-as-default-for-new-autonomous-agents "Direct link to GPT-5.4 as default for new autonomous agents")

New Auto Mode agents are now created with GPT-5.4 as the default model for Glean Key customers. Existing autonomous agents will continue to use GPT-5.1 as their default model.

This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/agents/auto-mode-agent#model)

Agents *\[ROAD-1330\]*

* * *

#### Rename all actions to tools in Glean[​](#rename-all-actions-to-tools-in-glean "Direct link to Rename all actions to tools in Glean")

Glean is evolving its connector terminology to reflect that connectors can both read from and write to enterprise applications. As part of this update, we are replacing the term "action" with "tool." A tool represents a discrete capability, whether that's querying data, invoking an API, updating a system, or running a computation. This change better reflects the expanded role of connectors and aligns with industry terminology, including MCP, which uses tools as the standard abstraction for capabilities exposed to AI systems.

[Learn more](https://docs.glean.com/administration/actions/)

Actions *\[ROAD-1460\]*

* * *

#### MCP Gateway: invoke all 2,000+ tools externally via Claude Code, Cursor, ChatGPT, and other MCP hosts[​](#mcp-gateway-invoke-all-2000-tools-externally-via-claude-code-cursor-chatgpt-and-other-mcp-hosts "Direct link to MCP Gateway: invoke all 2,000+ tools externally via Claude Code, Cursor, ChatGPT, and other MCP hosts")

Glean will expose all supported read tools through MCP so users can access fresh data from connected apps in tools like Claude Code, Cursor, ChatGPT, and other MCP hosts. This gives users a more consistent way to retrieve live information across MCP-connected sources without leaving their preferred AI tool. This feature is admin gated and may be subject to usage-based pricing.

**How to access:** Administrators must enable for your organization. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/platform/mcp/mcp-gateway)

Tools *\[ROAD-1282\]*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### LLM admin refresh for Customer Key customers[​](#llm-admin-refresh-for-customer-key-customers "Direct link to LLM admin refresh for Customer Key customers")

Customer Key admins now get a refreshed LLM Admin experience that groups models by hosting provider and adds clear capability indicators across Assistant and Agents. You can configure provider-hosted LLMs through the updated Add LLM flow, manage which models are enabled, and block models separately for Assistant or Agents without disabling them globally. Default text models (large, small, agentic, fast agentic) must stay on a single provider, while image generation can use a different provider to match your contracts and architecture. This update brings Customer Key deployments closer to parity with the Glean Key model-management refresh while preserving CK-specific provider controls.

**How to access:** When the feature is available in your deployment, go to **Admin console → Platform → LLMs**. On Customer Key deployments, admins can use the refreshed LLM page to add providers, manage model availability, configure default models, filter by capability, and manage surface-level blocked models from **Assistant → Settings** and **Agents → Setup**.

[Learn more](https://docs.glean.com/administration/llms)

Admin Capabilities *\[ROAD-1475\]*

* * *

#### Turn slide generation on by default for all users[​](#turn-slide-generation-on-by-default-for-all-users "Direct link to Turn slide generation on by default for all users")

Slide generation in Assistant will be enabled by default for all customers no earlier than June 8, 2026. To keep it off or limit access, select **Off** or **On only for admins**. Your choice will be respected, and you can change it anytime. If you have already enabled slide generation **On**, no action is needed.

If your company has a slide template configured, Glean will use it automatically. If not, Glean will take styling inspiration from your company's existing visual assets so decks still feel on-brand.

**How to access:** Admins can access this toggle by navigating to **Admin console → Assistant → Settings → Slide deck generation**. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/assistant/features/slide-deck-generation)

Assistant *\[ROAD-1377\]*

* * *

#### Web Crawler configurable OAuth token injection into non-standard auth headers[​](#web-crawler-configurable-oauth-token-injection-into-non-standard-auth-headers "Direct link to Web Crawler configurable OAuth token injection into non-standard auth headers")

Adds configurable OAuth token header injection for the Web Crawler connector, so admins can route refreshed OAuth access tokens into a customer-defined HTTP header instead of only `Authorization: Bearer <token>`. This removes brittle manual token minting workflows and makes it easier to support sites that expect non-standard auth headers, starting with MongoDB and similar integrations. Available for admins configuring Web Crawler connectors that use OAuth-based authentication.

**How to access:** From the Admin console, open your existing Website data source or create a new one. Under **Advanced → OAuth**, set the OAuth header name and, optionally, OAuth token prefix fields to match the header your downstream system expects. Save your changes and run a test crawl to confirm the header is being applied. No additional configuration is required outside the Web Crawler connector.

[Learn more](https://docs.glean.com/administration/oauth/oauth-overview)

Connectors *\[ROAD-1399\]*

* * *

#### Veeva Vault connector[​](#veeva-vault-connector "Direct link to Veeva Vault connector")

Glean now includes a native Veeva Vault connector, so admins can make Veeva Vault quality documents searchable in Glean while preserving Veeva permissions. The connector indexes documents and associated permissions, stores searchable metadata like document type, subtype, classification, and status, and can surface additional Vault fields as searchable custom fields when available. This helps teams find regulated quality content faster in search while keeping access aligned with what users can see in Veeva Vault.

**How to access:** Admins can enable the connector by going to **Admin console → Data sources → Add data source → Veeva Vault**, then entering the Vault URL, integration username, and password. In Veeva, the setup requires either Vault Owner/System Administrator access or a dedicated Glean Integration profile, plus Dynamic Access Control so the Glean integration user can access only the allowed document types and steady-state lifecycle states.

[Learn more](https://docs.glean.com/connectors/native/veeva-vault/)

Connectors *\[ROAD-1042\]*
