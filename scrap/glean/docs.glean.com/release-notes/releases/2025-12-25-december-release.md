---
url: "https://docs.glean.com/release-notes/releases/2025-12-25-december-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-12-25-december-release"
title: "December 25, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.270Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Company search improvements in Agents[​](#company-search-improvements-in-agents "Direct link to Company search improvements in Agents")

Santa release FOO BAR BAZ

**How to access:** Available to all Agent Builders.

[Learn more](/tools/glean/company-search)

Actions *ROAD-1045-MR*

* * *

#### Changes to Glean Assistant: Retiring datasource filtering and source removal[​](#changes-to-glean-assistant-retiring-datasource-filtering-and-source-removal "Direct link to Changes to Glean Assistant: Retiring datasource filtering and source removal")

Glean Assistant will retire two features: the ability to filter specific sources in chat and the option to remove sources from existing Assistant responses. These features are being removed to streamline the user experience and because the latest generation of Glean Assistant, powered by advanced LLMs like GPT-5 and Claude Sonnet 4.5, now provides more accurate, context-aware answers without requiring manual source selection.

With improvements in Assistant, users can simply describe what they need in natural language—including whether it should focus on or exclude a specific data source—and Assistant will automatically execute. Users can continue to filter specific sources in search.

Change date: December 4, 2025

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

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Detect and prevent sensitive data exposure from screenshots[​](#detect-and-prevent-sensitive-data-exposure-from-screenshots "Direct link to Detect and prevent sensitive data exposure from screenshots")

Glean Protect now detects and prevents sensitive data exposure from screenshots when agents or Assistant use the vision API. Glean Protect triggers real-time blocking and alerting through continuous scanning, ensuring that screenshots and images attached to prompts are checked for sensitive data before being processed or sent to the model provider. As an admin, you can configure where images are sent and which policies are enforced based on your organization's security requirements. Admins can configure policies and exemption lists based on apps or connectors. This functionality is turned off by default.

**How to access:** Configure via Admin Console → Glean Protect → Continuous scanning.

[Learn more](/administration/protect/sensitive-findings/about)

Governance & Compliance *ROAD-1012*
