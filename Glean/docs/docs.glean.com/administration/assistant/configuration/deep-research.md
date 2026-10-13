---
url: "https://docs.glean.com/administration/assistant/configuration/deep-research"
canonical: "https://docs.glean.com/administration/assistant/configuration/deep-research"
title: "Deep Research"
description: "Enable Deep Research and review quota and billing by key type"
fetched_at: "2026-10-13T08:49:06.237Z"
---
On this page

Turn Deep Research on or off, and check how a run is billed on each key. Users run Deep Research for multi-source reports such as planning briefs and competitive reviews. For the steps they follow, see [Use Deep Research](/user-guide/assistant/deep-research).

## Check availability[​](#check-availability "Direct link to Check availability")

Availability follows the key on the deployment:

-   **Glean Universal Key** — Deep Research is a skill in chat. The per-user monthly quota does not block a skill run.
-   **Customer Key** — Deep Research stays a chat mode, and the monthly quota stays in place. The skill itself has no separate quota.

You turn Deep Research on or off on both keys. On a Customer Key, Assistant uses the model you set in the **Model Hub**. After that organization moves to the skill, Deep Research uses that same model. See [Configure LLMs in the Model Hub](/administration/configure-llms).

## Enable or disable Deep Research[​](#enable-or-disable-deep-research "Direct link to Enable or disable Deep Research")

You can enable or disable Deep Research for your organization or for specific users in the **Admin console**:

1.  Navigate to [**Admin console → Platform → Assistant → Settings**](https://app.glean.com/admin/setup/gleanassistant?tab=settings).
2.  Expand the **Deep Research** section.
3.  Select one of the following:
    -   **On for everyone**
    -   **On for some users** (a test group via allowlist)
    -   **Off**
4.  Select **Save**.

On the Glean Universal Key, users start a report from the skill picker or by typing `/deep-research`. On a Customer Key, **Deep research** still appears in the chat mode picker until the organization moves to the skill. The skill is available in the web app.

The monthly quota does not apply for Glean Universal Key organizations. It remains for Customer Key organizations that are still on the chat mode.

## Understand a Deep Research run[​](#understand-a-deep-research-run "Direct link to Understand a Deep Research run")

-   **Sources** — searches connected enterprise systems and the web, then writes a report with linked citations. Web content comes from Brave Web Search.
-   **Model** — a skill run uses the model selected for that chat. On the Glean Universal Key, that is the model Glean routes to.
-   **Permissions** — each user only sees documents they can already open.
-   **Read-only** — Deep Research does not run tools that change connected apps. Ask in chat when the task has to write back to an app.
-   **Length and time** — a typical report is 5–10 pages and takes 5–30 minutes, depending on the question and the number of sources.

## Review key support[​](#review-key-support "Direct link to Review key support")

Deep Research supports the Glean Universal Key and Customer Key (BYOK). A skill run uses the Assistant models already configured for chat, on the providers those models use: Azure OpenAI, Amazon Bedrock, and Google Vertex AI. See [Bring Your Own Key (BYOK)](/administration/assistant/configuration/byok). See [Feature availability by LLM key, provider, and cloud](/administration/llm-key-feature-availability).

## Review usage and billing[​](#review-usage-and-billing "Direct link to Review usage and billing")

On the Glean Universal Key, a Deep Research run is billed as a normal Assistant query. On Glean Enterprise Flex, standard models follow your Assistant terms, and premium models consume FlexCredits. The separate monthly quota does not apply.

On a Customer Key, until the move to the skill, each report still consumes FlexCredits at the Deep Research run rate, and the monthly quota still applies.

See [Glean Enterprise Flex](/glean-enterprise-flex-pricing).
