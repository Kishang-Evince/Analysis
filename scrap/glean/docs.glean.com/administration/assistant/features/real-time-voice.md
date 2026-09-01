---
url: "https://docs.glean.com/administration/assistant/features/real-time-voice"
canonical: "https://docs.glean.com/administration/assistant/features/real-time-voice"
title: "Real-time voice"
description: "Configure real-time voice conversations for your organization"
fetched_at: "2026-09-01T13:29:00.396Z"
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

On **Customer Key**, an admin must set real-time voice up separately. Choose a realtime model in the [Model Hub](/administration/configure-llms) first. Until one is configured, the setting stays off and can't be changed. Real-time voice needs GPT Realtime 2, paired with GPT-4o Transcribe for transcription.

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

-   Only document artifacts can be created from voice at this time. Slides, HTML, and other visual artifact types must be created from text chat.

## See also[​](#see-also "Direct link to See also")

-   [Real-time voice user guide](/user-guide/assistant/real-time-voice) - End-user documentation for using real-time voice
-   [Feature availability by LLM key](/administration/llm-key-feature-availability) - Supported keys, providers, and required models
-   [Usage-based pricing](/glean-enterprise-flex-pricing) - Information about FlexCredits and pricing
