---
url: "https://docs.glean.com/administration/assistant/features/real-time-voice"
canonical: "https://docs.glean.com/administration/assistant/features/real-time-voice"
title: "Real-time voice"
description: "Configure real-time voice conversations for your organization"
fetched_at: "2026-10-13T08:49:07.460Z"
---
On this page

Real-time voice lets users have natural, hands-free voice conversations with Glean Assistant instead of typing. This page covers how to enable and roll out real-time voice for your organization. For end-user instructions, see the [real-time voice user guide](/user-guide/assistant/real-time-voice).

note

Real-time voice is available on the **Glean Universal Model Key** and **Customer Key**, with OpenAI or Azure OpenAI as the model provider. See [Feature availability by LLM key](/administration/llm-key-feature-availability) for the full matrix.

## Configure real-time voice[​](#configure-real-time-voice "Direct link to Configure real-time voice")

Admins control real-time voice rollout from **Admin console → Assistant → Real-time voice**.

Three rollout options are available:

| Option | Description |
| --- | --- |
| **Off** | Real-time voice is turned off for all users. |
| **On only for admins** | Only admins can access real-time voice. This is the recommended starting point for evaluation. |
| **On for everyone** | All users in your organization can access real-time voice. |

Your selection can be changed at any time.

note

On the **Glean Universal Model Key**, real-time voice uses **GPT Live 1** by default on version 561.0 and later, with OpenAI or Azure OpenAI. GPT Live 1 transcribes speech itself, so it doesn't use a paired transcription model. Earlier versions use GPT Realtime 2.1 with a paired transcription model.

note

On **Customer Key**, an admin must set real-time voice up separately. Choose a realtime model in the [Model Hub](/administration/configure-llms) first. Until one is configured, the setting stays off and can't be changed.

For the supported voice and transcription model pairs for each key type, see [Feature availability by LLM key](/administration/llm-key-feature-availability#2-feature-availability-by-key-type). On Azure OpenAI, the transcription model you select must be deployed in your Azure OpenAI resource.

GPT Live 1 isn't available on Customer Key.

warning

Azure OpenAI is retiring GPT-4o Transcribe on October 15, 2026. If you use Azure OpenAI, switch to GPT Realtime 2.1 with GPT Transcribe before that date. GPT Transcribe needs version 559.0 or later.

## Recommended rollout approach[​](#recommended-rollout-approach "Direct link to Recommended rollout approach")

1.  **Start with admin-only access**: Set the feature to **On only for admins** to evaluate the experience.
2.  **Test use cases**: Have admins test real-time voice in various scenarios to understand value and behavior.
3.  **Expand gradually**: Once comfortable, enable for all users or specific groups.
4.  **Monitor feedback**: Collect user feedback through standard channels to inform adjustments.

## Privacy and data handling[​](#privacy-and-data-handling "Direct link to Privacy and data handling")

-   **No raw audio is stored.** Audio streams are routed from the user's browser to your configured model provider (OpenAI or Azure OpenAI) and back. No audio recordings are retained.
-   **Transcriptions are stored like text chats.** Voice transcriptions follow the same storage and retention policies as standard chat messages.
-   **Permissions are enforced.** Glean's existing security model and document-level permissions apply to all voice interactions, the same as text-based chats.

## Usage and pricing[​](#usage-and-pricing "Direct link to Usage and pricing")

Real-time voice usage may be subject to [usage-based pricing](/glean-enterprise-flex-pricing).

## Limitations[​](#limitations "Direct link to Limitations")

-   Real-time voice currently works with the general Glean Assistant. It doesn't automatically route voice requests to published agents, and users can't start a voice session with a specific published agent. To use an agent or automatic agent routing, users must switch to **Chat**. For more information, see [Route requests to agents](/administration/managing-agents/agent-routing).
-   Only document artifacts can be created from voice at this time. Slides, HTML, and other visual artifact types must be created from text chat.

## See also[​](#see-also "Direct link to See also")

-   [Real-time voice user guide](/user-guide/assistant/real-time-voice) - End-user documentation for using real-time voice
-   [Feature availability by LLM key](/administration/llm-key-feature-availability) - Supported keys, providers, and required models
-   [Usage-based pricing](/glean-enterprise-flex-pricing) - Information about FlexCredits and pricing
