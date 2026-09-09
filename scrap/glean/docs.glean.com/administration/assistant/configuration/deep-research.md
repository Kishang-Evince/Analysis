---
url: "https://docs.glean.com/administration/assistant/configuration/deep-research"
canonical: "https://docs.glean.com/administration/assistant/configuration/deep-research"
title: "Deep Research"
description: "Learn how to enable and disable Deep Research in Glean."
fetched_at: "2026-09-01T13:28:59.641Z"
---
On this page

Deep Research is an AI agent that generates detailed, citation-rich reports by synthesizing information from your internal enterprise systems and the web. It's built for complex, multi-source questions-such as strategic planning, competitive analysis, and research-rather than quick fact lookups. This page covers how to turn Deep Research on or off and the key details admins should know. For end-user instructions, see [Deep Research](/user-guide/assistant/deep-research).

## Enable or disable Deep Research[​](#enable-or-disable-deep-research "Direct link to Enable or disable Deep Research")

You can enable or disable Deep Research for your organization or specific users in the Admin Console:

1.  Navigate to [**Admin Console → Platform → Assistant → Settings**](https://app.glean.com/admin/setup/gleanassistant?tab=settings).
2.  Expand the **Deep Research** section.
3.  Select one of the following:
    -   **On for everyone** (recommended if Glean is enabled)
    -   **On for some users** (test group via allowlist)
    -   **Off** (disable for everyone)
4.  Select **Save**.

Once enabled, Deep Research appears as a reasoning mode in the chat input. It is currently available on the Glean web application only.

## How Deep Research works[​](#how-deep-research-works "Direct link to How Deep Research works")

-   **Sources:** Deep Research searches your connected enterprise systems and the web, then synthesizes the results into a structured report with fully linked citations. Web content is retrieved through Brave Web Search.
-   **Model:** Reports are generated using GPT-5.1 as the reasoning model.
-   **Permissions:** Deep Research respects each user's existing document permissions and only retrieves content the user is already allowed to see.
-   **Read-only:** Deep Research does not run actions or MCP tools in connected apps. Users who need actions should use Thinking mode in [standard chat](/user-guide/assistant/glean-chat) instead.
-   **Report length and time:** A typical report spans 5–10 pages and takes 5–30 minutes to generate, depending on query complexity and the number of sources.

## LLM key support[​](#llm-key-support "Direct link to LLM key support")

Deep Research supports the **Glean Universal Key** and **Customer Key (BYOK)**. With a Customer Key, Deep Research supports all available models (GPT-5, GPT-5.1, Claude Sonnet 4.5, and Gemini Pro 3) across all supported providers (Azure OpenAI, AWS Bedrock, and Google Vertex AI). See [Bring Your Own Key (BYOK)](/administration/assistant/configuration/byok) and [Feature availability by LLM key, provider, and cloud](/administration/llm-key-feature-availability).

## Usage and billing[​](#usage-and-billing "Direct link to Usage and billing")

On Glean Enterprise Flex, each Deep Research report generation consumes FlexCredits at the current rate card. Because reports are more compute-intensive than standard chat, consider starting with an allowlist before enabling Deep Research for everyone. See [Glean Enterprise Flex](/glean-enterprise-flex-pricing) for details.

## See also[​](#see-also "Direct link to See also")

-   [Deep Research](/user-guide/assistant/deep-research) - End-user guide for using Deep Research in Glean Assistant
-   [Feature availability by LLM key, provider, and cloud](/administration/llm-key-feature-availability) - Model and provider support by LLM key
-   [Glean Enterprise Flex](/glean-enterprise-flex-pricing) - FlexCredits and usage-based pricing
