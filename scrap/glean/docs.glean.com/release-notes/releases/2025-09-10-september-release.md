---
url: "https://docs.glean.com/release-notes/releases/2025-09-10-september-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-09-10-september-release"
title: "September 10, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:52.342Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Search BigQuery with SQL action[​](#search-bigquery-with-sql-action "Direct link to Search BigQuery with SQL action")

In Agents, users will be able to query BigQuery data using SQL. These queries will be powered by the BigQuery API.

**How to access:** Administrators must enable this for your organization.

[Learn more](/tools/connector/googlecloud)

Actions *FR-2360*

* * *

#### Support for autosaving drafts and versioning agents[​](#support-for-autosaving-drafts-and-versioning-agents "Direct link to Support for autosaving drafts and versioning agents")

Agent Builder will autosave drafts while you edit, let you update drafts without changing your published agent, and will keep the last 30 published versions so you can restore them as new drafts.

[Learn more](/agents/concepts/agents-draft-version)

Agents *FR-3553*

* * *

#### Edit queries and regenerate responses in Assistant[​](#edit-queries-and-regenerate-responses-in-assistant "Direct link to Edit queries and regenerate responses in Assistant")

We are adding the ability for users to edit their chat queries and regenerate the response. This will be accessible via a pencil icon shown below the user's chat bubble.

[Learn more](/user-guide/assistant/glean-chat)

Assistant *FR-867*

* * *

#### Interrupt ongoing chat queries[​](#interrupt-ongoing-chat-queries "Direct link to Interrupt ongoing chat queries")

You can now interrupt an in-progress Glean chat response and immediately start a new message. This lets you seamlessly pivot conversations and issue new instructions without waiting for the previous query to finish. The experience is more fluid, giving you greater control and flexibility during multi-step research and troubleshooting in Glean Chat.

[Learn more](/user-guide/assistant/glean-chat)

Assistant *FR-4018*

* * *

#### Access Glean from within Miro workspaces[​](#access-glean-from-within-miro-workspaces "Direct link to Access Glean from within Miro workspaces")

Glean in Miro allows users to query Glean search results directly into Miro boards and workspaces. It helps in summarizing information, generating insights, and creating action items, thereby enhancing the productivity and efficiency of collaborative sessions.

**How to access:** Administrators must enable for your organization.

[Learn more](/administration/platform/embedded-integrations/glean-in-miro)

Embedded Integrations *FR-2283*

* * *

#### Enable Glean Search and Assistant tabs in Support embedded integrations (opt-out)[​](#enable-glean-search-and-assistant-tabs-in-support-embedded-integrations-opt-out "Direct link to Enable Glean Search and Assistant tabs in Support embedded integrations (opt-out)")

We've added "Search" and "Chat" tabs directly inside your Support workspace so support representatives can search on Glean or get help from Assistant without switching tools, speeding up case resolution. This is enabled by default; if you'd prefer not to use these tabs, please reach out to your Glean contact to opt-out or turn it off in your Embedded Integrations setting.

**How to access:** Administrators must enable this for your organization.

[Learn more](/administration/platform/embedded-integrations/)

Embedded Integrations *FR-4005*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Improvements to answer quality for documents uploaded in Assistant[​](#improvements-to-answer-quality-for-documents-uploaded-in-assistant "Direct link to Improvements to answer quality for documents uploaded in Assistant")

Glean improves the quality of answers for document uploads, @ mentions, and URLs in Assistant by leveraging the OpenAI file upload API. Customers using Glean Key for OpenAI and customers using their own customer key for OpenAI will benefit from these quality improvements.

Note: For this feature, we will be accessing OpenAI file API directly. OpenAI does not use any data for training its models.

[Learn more](/user-guide/about/end-user-quick-start-guide)

Assistant *FR-3652*

* * *

#### New Microsoft Dynamics 365 connector[​](#new-microsoft-dynamics-365-connector "Direct link to New Microsoft Dynamics 365 connector")

Glean supports Microsoft Dynamics 365, Microsoft's unified platform that delivers both customer relationship management (CRM) and enterprise resource planning (ERP) capabilities. Glean's connector is designed to crawl and index key CRM entities, specifically accounts, contacts, opportunities, and leads within Dynamics 365.

[Learn more](/connectors/native/microsoft/microsoft-dynamics-365-connector)

Connectors *FR-1733*

* * *

#### Integration with Palo Alto Networks Prisma AIRS Runtime Security[​](#integration-with-palo-alto-networks-prisma-airs-runtime-security "Direct link to Integration with Palo Alto Networks Prisma AIRS Runtime Security")

As part of our Protect+ offering, Glean can now secure Chat and AI agents against prompt injection attacks or jailbreak attempts. Runtime security protects subscribed agents, agents that are scheduled or triggered automatically to run, from indirect prompts or file uploads with malicious instructions.

**How to access:** Protect+ customers should reach out to their account team to enable this feature.

[Learn more](/administration/protect/ai-security/configuring-panw)

Protect *FR-3421*

* * *

#### AI Security for prompt injection, malicious code, and toxic content detection[​](#ai-security-for-prompt-injection-malicious-code-and-toxic-content-detection "Direct link to AI Security for prompt injection, malicious code, and toxic content detection")

AI security models that support real-time blocking of prompt injection attacks, toxic content, and malicious code. Glean achieves 97.8% accuracy on prompt injection detection, 93.5% accuracy on toxic content detection, and 94.3% accuracy on malicious code detection on leading benchmarks. AI security is managed in a centralized dashboard complete with the surrounding context, the prompt, source file, agent identifier, user information, and chat session. This feature set is part of Glean Protect+.

[Learn more](/administration/protect/ai-security/introduction#threat-types)

Protect *FR-3518*

* * *

#### Improve latency and quality of AI Answers in Search[​](#improve-latency-and-quality-of-ai-answers-in-search "Direct link to Improve latency and quality of AI Answers in Search")

AI answers are an AI-generated, permission-aware answer shown directly on the Glean Search results page, synthesizing top relevant documents to see a fully written response. We decreased the latency by 52% at p99 and improved the quality of AI answers, helping more users discover and use Glean Assistant.

[Learn more](/user-guide/assistant/ai-answers)

Search *FR-3944*
