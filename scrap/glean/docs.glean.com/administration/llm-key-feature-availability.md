---
url: "https://docs.glean.com/administration/llm-key-feature-availability"
canonical: "https://docs.glean.com/administration/llm-key-feature-availability"
title: "Feature availability by LLM key, provider, and cloud"
description: "Reference matrices showing which Glean Assistant features and model providers are available across the Glean Universal Model Key and Customer Key (BYOK), by cloud environment."
fetched_at: "2026-09-01T13:29:08.294Z"
---
On this page

This page documents which model providers and which Glean Assistant features are available depending on:

-   **Key type** — the **Glean Universal Model Key** (Glean-managed) or **Customer Key (BYOK)**, where you bring your own provider key.
-   **Cloud environment** — Glean Hosted or Customer Hosted on **GCP** or **AWS**.
-   **LLM provider** — OpenAI, Azure OpenAI, Google Vertex AI (Gemini and Claude), Amazon Bedrock (Claude and Amazon Nova), or Anthropic (Claude, with Customer Key only).

Use these matrices to understand what changes when you move from the Glean Universal Model Key to your own key, and to plan which models you need to enable for a given feature.

note

With the **Glean Universal Model Key**, Glean manages connectivity to all supported providers regardless of your cloud environment. With **Customer Key (BYOK)**, access to cloud-hosted providers is limited to your own (Customer Hosted) cloud because cross-cloud access is not supported. Anthropic is the exception: you connect to it directly with your own API key, so it works from either cloud environment.

* * *

## 1\. Provider availability by key type and cloud[​](#1-provider-availability-by-key-type-and-cloud "Direct link to 1. Provider availability by key type and cloud")

Which LLM hosting providers you can configure depends on your deployment mode and key type.

| Hosting provider | Glean Universal Model Key | Customer Key — GCP-based deployment | Customer Key — AWS-based deployment |
| --- | --- | --- | --- |
| OpenAI | ✅ | ✅ | ✅ |
| Azure OpenAI | ✅ | ✅ | ✅ |
| Google Vertex AI | ✅ | ✅ | ❌ |
| Amazon Bedrock | ✅ | ❌ | ✅ |
| Anthropic | ❌ | ✅ | ✅ |

note

-   **GCP-based deployment** includes Glean Hosted and Customer Hosted on GCP. **AWS-based deployment** refers to Customer Hosted on AWS.
-   **Anthropic (Claude)** models are accessible through Google Vertex AI or Amazon Bedrock. With Customer Key, you can also connect directly to Anthropic using your own Anthropic API key.
-   With Customer Key (BYOK), access to cloud-hosted providers is limited to your own cloud because cross-cloud access is not supported. GCP-based deployments cannot use AWS-hosted models (for example, Amazon Bedrock), and AWS-based deployments cannot use Vertex AI. Direct Anthropic access does not depend on a cloud provider, so it is available from both GCP-based and AWS-based deployments.
-   For Customer Key deployments, the **large, small, agentic, and fast agentic** model defaults must come from the **same provider**. **Image generation** models may use a different provider.

* * *

## 2\. Feature availability by key type[​](#2-feature-availability-by-key-type "Direct link to 2. Feature availability by key type")

This table displays Glean AI features whose availability or required models differ by key type or cloud. Select a feature name to learn more about the feature and any limitations.

This table does not display features that are available on both key types and all providers.

Glean auto model selection

On the Glean Universal Model Key, Glean automatically picks best-in-class default models for you; on Customer Key, admins choose their own. See [Model choice](/get-started/golive/model-choice#recommended-use-auto).

| Feature | Glean Universal Model Key | Customer Key (BYOK) | Required model(s) | Provider |
| --- | --- | --- | --- | --- |
| [**Real-time voice**](/user-guide/assistant/real-time-voice) | GA | GA | GPT Realtime 2.1 / GPT-4o Transcribe | OpenAI, Azure OpenAI |
| [**Podcast artifacts**](/user-guide/assistant/podcast-artifacts) | Beta | Not supported | Standard Assistant models + GPT TTS | Any for script; OpenAI for TTS |
| [**Meeting Notes**](/user-guide/assistant/meeting-notes) | GA | Not supported | Standard Assistant models | Any |
| [**Deep Research**](/user-guide/assistant/deep-research) | GA | GA | GPT-5.1 (reasoning) | OpenAI; Brave Web Search (web content) |
| [**Image generation**](/user-guide/assistant/image-generation) | GA | GA | Image-capable models (GPT Image, Gemini image models) | OpenAI or Google (image-capable) |
| [**Code generation (Code Writer)**](/user-guide/assistant/code-generation) | GA | Conditional | Claude | Amazon Bedrock, same project (BYOK) |
| [**Memory & personalization**](/user-guide/assistant/memory-personalization) | GA (GCP only) | Not supported | Standard Assistant models | Any |
| [**Contextual images in responses**](/user-guide/assistant/contextual-images) | GA (GCP and AWS) | GA (GCP and AWS) | Standard Assistant models | Any |
| [**Agent Sandbox & Programmatic Tool Calling (PTC)**](/security/agent-sandbox-ptc) | GA | GA | GPT-5.4+, Claude Sonnet 4.6, Claude Opus 4.6+, or Gemini Pro 3.1 | Any |
| [**Agentic Search Model**](/administration/assistant/features/adaptive-reasoning) | GA | GA | NVIDIA Nemotron-3 Nano (30B-A3B) | Glean-managed (Vertex AI / SageMaker) |
| [**LLM / Model Insights (BYOK)**](/administration/insights/llm-insights) | Not supported | GA | N/A | N/A |
| [**Best-fit default model selection**](/get-started/golive/model-choice) | GA | Not supported | Glean auto model selection | Any |

* * *

## 3\. Agentic engine mapping to keys and providers[​](#3-agentic-engine-mapping-to-keys-and-providers "Direct link to 3. Agentic engine mapping to keys and providers")

The agentic engine that powers Glean Assistant runs on **GPT-5** or **Claude Sonnet** models that are supported by your deployment:

-   **GPT-5** is available via Glean Key or Customer Key through **OpenAI Direct** or **Azure OpenAI**.
-   **Claude Sonnet 5** is available in Glean Assistant and Agents when enabled in the Model Hub.
-   Glean Key customers are automatically migrated to GPT-5. **Customer Key customers must manually migrate** their configured models to supported GPT-5 or Claude Sonnet models to see a performance difference.

note

For Glean Assistant on Customer Key, **Gemini Pro 3.1 is not available** — use **Gemini Pro Custom Tools 3.1** instead. Gemini Pro 3.1 remains available for Glean Assistant through the Glean Universal Model Key.

* * *

## 4\. Model upgrades, failover, and deprecation[​](#4-model-upgrades-failover-and-deprecation "Direct link to 4. Model upgrades, failover, and deprecation")

-   **Glean Universal Model Key:** Glean manages model configuration, provisioning, upgrades, and provider failover.
-   **Customer Key (BYOK):** Your team provisions capacity and manages model upgrades and provider failover. Quota is not a guarantee of capacity; for guaranteed capacity, contact your provider about provisioned throughput.
-   When a model is deprecated, existing deployments are automatically migrated to the listed replacement. Review the Model Hub deprecation table to confirm your configured models are current.

* * *

## See also[​](#see-also "Direct link to See also")

-   [Supported LLMs](/administration/llms) — supported models, availability, and pricing.
-   [Configure LLMs in the Model Hub](/administration/configure-llms) — provider and model configuration.
-   [Real-time voice](/user-guide/assistant/real-time-voice) — setup and limitations.
-   [Image generation in Glean](/user-guide/assistant/image-generation) — supported image models and setup.
-   [Memory and personalization](/user-guide/assistant/memory-personalization) — admin configuration and known limitations.
-   [Agent Sandbox and Programmatic Tool Calling](/security/agent-sandbox-ptc) — setup and supported models.
-   [LLM Insights](/administration/insights/llm-insights) — monitoring for Customer Key (BYOK) deployments.
