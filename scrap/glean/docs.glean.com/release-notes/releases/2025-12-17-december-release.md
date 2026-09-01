---
url: "https://docs.glean.com/release-notes/releases/2025-12-17-december-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-12-17-december-release"
title: "December 17, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.187Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Company search improvements in Agents[​](#company-search-improvements-in-agents "Direct link to Company search improvements in Agents")

Company Search is now easier to configure and debug in Agents. Glean now surfaces a clearer view of the underlying query and highlights key operators (such as app and date filters) so you can quickly verify the scope and behavior. You can inspect what actually ran during a preview, copy the query, and adjust it if needed—reducing guesswork and making it faster to tune agents that depend on company-wide search.

**How to access:** Available to all Agent Builders.

[Learn more](/tools/glean/company-search)

Actions *ROAD-1045-MR*

* * *

#### Changes to Glean Assistant: Retiring datasource filtering and source removal[​](#changes-to-glean-assistant-retiring-datasource-filtering-and-source-removal "Direct link to Changes to Glean Assistant: Retiring datasource filtering and source removal")

Glean Assistant will retire two features: the ability to filter specific sources in chat and the option to remove sources from existing Assistant responses. These features are being removed to streamline the user experience and because the latest generation of Glean Assistant, powered by advanced LLMs like GPT-5 and Claude Sonnet 4.5, now provides more accurate, context-aware answers without requiring manual source selection.

With improvements in Assistant, users can simply describe what they need in natural language—including whether it should focus on or exclude a specific data source—and Assistant will automatically execute. Users can continue to filter specific sources in search.

Change date: December 4, 2025 Learn more @ /release-notes/sunset/assistant

**How to access:** Customers in our Managed Feature Beta may have additional controls.

[Learn more](/release-notes/sunset/assistant)

Assistant *ROAD-938-MR*

* * *

#### GPT 5.2 in Agents[​](#gpt-52-in-agents "Direct link to GPT 5.2 in Agents")

GPT‑5.2 is available in the model hub for Glean Agents. It's a supported model for both the Glean universal model key and customer keys on OpenAI and Azure OpenAI.

GPT‑5.2 delivers stronger long‑horizon reasoning, tool calling, and complex quantitative analysis, making it especially well‑suited for agentic data analysis, operational investigations, and complex document/knowledge‑work agents.

**How to access:** Admins can enable GPT‑5.2 via Admin Console → Platform → LLM, and creators can select it per‑agent or per‑step in the Agent Builder.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/administration/llms)

Assistant *ROAD-1060*

* * *

#### Support GPT 5.1 on Glean Assistant[​](#support-gpt-51-on-glean-assistant "Direct link to Support GPT 5.1 on Glean Assistant")

We're launching GPT 5.1 as Glean Assistant's primary model for the Glean key on Dec 12, 2025 for both Thinking and Fast Modes. GPT 5.1 delivers nearly 50% faster responses in Thinking Mode (~14 seconds saved per query). This model delivers significant quality improvements, with 52% more upvotes and 30% fewer downvotes. We fine-tuned GPT 5.1's system prompts to be more proactive and autonomous, eliminating unnecessary clarifications while improving parallel tool execution. GPT 5.1 will also be available on Customer Key (Azure OpenAI and Direct OpenAI). GPT 5.1 is the same average cost per query as GPT 5.

[Learn more](/administration/llms)

Assistant *ROAD-1028*

* * *

#### Image generation in Glean Assistant with Nano Banana Pro (Glean Key)[​](#image-generation-in-glean-assistant-with-nano-banana-pro-glean-key "Direct link to Image generation in Glean Assistant with Nano Banana Pro (Glean Key)")

Bring your ideas to life directly in Glean Assistant with Nano Banana Pro. You can now ask Assistant to create images from natural language prompts and it will respond with visuals in your chat response. This accelerates creative cycles and unlocks fast iteration for drafts, diagrams, social posts, and more. Image generation in Assistant allows you to include design direction in prompts based on internal documents and avoid switching tools.

Note: This feature will consume Flex Credits and will be turned on by default for all Glean Key customers on GCP for all users. Admins will have the ability to limit access to the feature from within the console.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/user-guide/about/end-user-quick-start-guide)

Assistant *ROAD-834*

* * *

#### Deep linked citations - Claude and OpenAI Models on Agentic Engine V2[​](#deep-linked-citations---claude-and-openai-models-on-agentic-engine-v2 "Direct link to Deep linked citations - Claude and OpenAI Models on Agentic Engine V2")

Deep linked citations instill trust and improve the usability of Glean Assistant. When Glean Assistant cites a source, users can now verify and explore the exact relevant excerpt in the original document, making it easier to validate claims and gain immediate context. This update provides more transparent, verifiable, and actionable information within AI-powered conversations.

**How to access:** This feature automatically turned on.

[Learn more](/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations)

Assistant *ROAD-757*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Reduced latency in the data analysis tool for customers on the universal model key[​](#reduced-latency-in-the-data-analysis-tool-for-customers-on-the-universal-model-key "Direct link to Reduced latency in the data analysis tool for customers on the universal model key")

Glean's data analysis tool in thinking mode is 40% faster while staying consistent on accuracy and completeness. The data analysis tool is invoked when a structured file is uploaded or a link is tagged. This latency improvement impacts customers on the universal model key or using OpenAI customer keys.

**How to access:** You can turn the feature on or off via the admin console by going to Settings -> Assistant -> Data Analysis.

[Learn more](/administration/assistant/data-analysis/about-data-analysis)

Assistant *ROAD-979*

* * *

#### Support Gemini on Customer Key for Agentic Engine 2[​](#support-gemini-on-customer-key-for-agentic-engine-2 "Direct link to Support Gemini on Customer Key for Agentic Engine 2")

Glean Assistant now supports the Agentic Engine 2 on Gemini for customers using their own key. Thinking mode will use Gemini Pro Preview 3.0, while Fast Mode will use Gemini Flash 2.5. This update enables advanced multi-step reasoning and adaptive planning in Glean Assistant, powered by Google’s most advanced Gemini model. With Gemini 3.0, users benefit from improved answer quality, greater completeness, and more relevant responses, as the Assistant can continuously re-plan and adapt until your query is fully addressed. Organizations can now select Gemini as their LLM provider for agentic reasoning, broadening model choice and optimizing performance for diverse workflows.

[Learn more](/administration/llms)

Assistant *ROAD-915*

* * *

#### Increasing Chat History Retention Period Options[​](#increasing-chat-history-retention-period-options "Direct link to Increasing Chat History Retention Period Options")

We are introducing a unified, admin-controlled chat history policy with retention options of Off, 30 days, 90 days, six months, or one year. One year is the new default for all new deployments. The updated interface clearly displays what data is retained. Policy changes are applied retroactively: reducing the retention period will permanently delete older conversations (with confirmation), while increasing it will extend retention for existing and future chats. All assistant and agent conversations, as well as features like conversation search and personalization, will adhere to this unified retention window, providing teams with improved continuity and streamlined governance. Existing configurations will remain unchanged unless customers choose to upgrade.

[Learn more](/get-started/golive/setup-glean-assistant)

Assistant *ROAD-772*

* * *

#### Improved freshness for Gong calls[​](#improved-freshness-for-gong-calls "Direct link to Improved freshness for Gong calls")

Glean now uses incremental crawls for the Gong connector so new calls become searchable in Glean within minutes after Gong finishes processing them, instead of hours or even days on large deployments. This greatly improves workflows that depend on recent calls—like post‑call follow‑ups or content‑triggered agents—so teams can act on the latest conversations much sooner. End‑to‑end freshness still depends on Gong’s own processing time (typically 10–60 minutes after a call ends). Manually uploaded, very long, or deleted calls may still take longer because they rely on periodic full crawls.

**How to access:** No action needed

[Learn more](/connectors/native/gong/)

Connectors *ROAD-1065*

* * *

#### GitHub Enterprise - multiple GitHub Enterprise Server instances[​](#github-enterprise---multiple-github-enterprise-server-instances "Direct link to GitHub Enterprise - multiple GitHub Enterprise Server instances")

Organizations can now connect and manage multiple GitHub Enterprise Server instances within Glean. This enhancement allows teams with separate production, development, or geographically distributed GitHub Enterprise environments to index, search, and enforce permissions across all their instances—without workarounds or manual configuration. The update streamlines onboarding for complex organizations and supports more flexible, scalable GitHub integrations.

[Learn more](/connectors/native/github-enterprise-server/)

Connectors *ROAD-913*

* * *

#### New Docusign connector[​](#new-docusign-connector "Direct link to New Docusign connector")

The Docusign connector enables Glean to fetch and summarize DocuSign documents, envelopes and templates when a user shares a URL, so teams can quickly review agreements and ask follow‑up questions without leaving Glean.

[Learn more](/connectors/native/docusign/)

Connectors *ROAD-747*

* * *

#### Support groups in shared with and support exclusion filter as not shared with users and groups[​](#support-groups-in-shared-with-and-support-exclusion-filter-as-not-shared-with-users-and-groups "Direct link to Support groups in shared with and support exclusion filter as not shared with users and groups")

Sensitive findings policies and reports now support a new exclusion filter for “not shared with” users or groups. This enhancement allows organizations to flag documents that are shared outside a designated set of users or groups (such as HR or Finance). By adding users or groups to the exclusion list, admins can ensure that only documents shared beyond the specified audience are scanned for sensitive content, improving compliance and reducing unnecessary findings.

**How to access:** Configure in the Glean Admin Console: Glean Protect → Sensitive findings

[Learn more](/administration/protect/sensitive-findings/manage-reports)

Protect *ROAD-949*
