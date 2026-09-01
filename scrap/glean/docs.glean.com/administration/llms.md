---
url: "https://docs.glean.com/administration/llms"
canonical: "https://docs.glean.com/administration/llms"
title: "Supported LLMs"
description: "Models supported in Glean's Model Hub, availability by hosting environment, and pricing."
fetched_at: "2026-09-01T13:29:08.519Z"
---
On this page

Use the Model Hub to securely configure and manage access to commercial and open-source LLMs for Glean Assistant and Agents.

The Model Hub offers a curated set of leading models from providers like OpenAI, Google, Anthropic, and Amazon. You can bring your own keys for providers or use Glean’s Universal Model Key to access pre‑procured models with guardrails.

To configure which models are available and choose models for workflows, see [Configure LLMs in the Model Hub](/administration/configure-llms).

For details on each deployment model, see [Glean deployment models](/get-started/prepare/about-deployment).

note

GCP hosted customers cannot use AWS hosted models, for example, Amazon Bedrock. This change expands model choice on AWS while keeping cross‑cloud data-path restrictions in place.

## Model pricing information[​](#model-pricing-information "Direct link to Model pricing information")

For model pricing and tier details, see [Glean Core Suite pricing](https://docs.glean.com/glean-core-suite-pricing) and [Glean Enterprise Flex pricing](https://docs.glean.com/glean-enterprise-flex-pricing).

## Supported models[​](#supported-models "Direct link to Supported models")

Model availability depends on your hosting environment and provider access. See [Availability by hosting environment and provider](#availability-by-hosting-environment-and-provider).

If your organization uses the Glean Universal Model Key, Glean optimizes your experience by automatically selecting high-performance models by default. You can also choose a model in the Model Hub.

### Text models[​](#text-models "Direct link to Text models")

The following table lists available text models in Glean:

| Provider | Models |
| --- | --- |
| **OpenAI (via Azure or OpenAI)** | 
-   GPT-4.1 mini
-   GPT-4.1 nano
-   GPT-5.4 Mini
-   GPT Realtime (2025-08-28)
-   GPT Realtime 1.5
-   GPT Realtime 2
-   GPT Realtime 2.1
-   GPT-4.1
-   GPT-4o Transcribe
-   GPT-5.1
-   GPT-5.2
-   GPT-5.6 Luna
-   GPT-5.4
-   GPT-5.5
-   GPT-5.6 Sol
-   GPT-5.6 Terra

 |
| **Google Gemini (via Google Vertex AI)** | 

-   Gemini 3 Flash
-   Gemini 3.1 Flash Lite
-   Gemini 3.5 Flash Lite
-   Gemini 3.1 Pro
-   Gemini 3.1 Pro Custom Tools
-   Gemini 3.5 Flash
-   Gemini 3.6 Flash
-   Gemini 3.7 Flash

 |
| **Anthropic (via Google Vertex AI or Amazon Bedrock)** | 

-   Claude Haiku 4.5
-   Claude Fable 5
-   Claude Opus 4.6
-   Claude Opus 4.7
-   Claude Opus 4.8
-   Claude Opus 5
-   Claude Sonnet 4.6
-   Claude Sonnet 5

 |
| **Amazon** | 

-   Amazon Nova Pro 1.0

 |
| **Glean** | 

-   Waldo

 |
| **Fireworks/Baseten** | 

-   GLM 5.2

 |
| **Baseten** | 

-   Nemotron 3 Ultra

 |

### Image models[​](#image-models "Direct link to Image models")

The following table lists supported image models:

| Provider | Models |
| --- | --- |
| **OpenAI (via Azure or OpenAI)** | 
-   GPT Image 2

 |
| **Google Gemini (via Google Vertex AI)** | 

-   Nano Banana 2
-   Nano Banana Pro

 |

### Availability and key-mode notes[​](#availability-and-key-mode-notes "Direct link to Availability and key-mode notes")

Unless noted below, a model is available for both Glean Assistant and Glean Agents.

-   **Waldo** (Glean Assistant) is available with both the Glean Universal Model Key and a Customer Key.
-   **Gemini 3.1 Pro Custom Tools** is the Customer Key variant of Gemini 3.1 Pro for Glean Assistant; Gemini 3.1 Pro is available through the Glean Universal Model Key.
-   **Nemotron 3 Ultra** is available only through the Glean Universal Model Key.

note

Waldo doesn't currently run with Gemini models.

note

If you set one of the following models for Glean Assistant, Glean uses it for both regular and advanced requests: GPT-5.4, Claude Sonnet 4.6, and Claude Opus 4.6.

## Availability by hosting environment and provider[​](#availability-by-hosting-environment-and-provider "Direct link to Availability by hosting environment and provider")

Which LLM hosting providers you can configure depends on your deployment mode and key type:

-   **Glean Universal Model Key**: Glean manages connectivity to all supported providers regardless of your deployment's cloud environment.
-   **Customer Key** (BYOK): Access to cloud-hosted providers is limited to your own cloud because cross-cloud access is not supported. Anthropic is the exception: you connect to it directly with your own API key, so it works from either cloud.

| Hosting provider | Glean Universal Model Key | Customer Key — GCP-based deployment | Customer Key — AWS-based deployment |
| --- | --- | --- | --- |
| OpenAI | ✅ | ✅ | ✅ |
| Azure OpenAI | ✅ | ✅ | ✅ |
| Google Vertex AI | ✅ | ✅ | ❌ |
| Amazon Bedrock | ✅ | ❌ | ✅ |
| Anthropic | ❌ | ✅ | ✅ |

-   **GCP-based deployment** includes Glean Hosted and Customer Hosted on GCP.
-   **AWS-based deployment** refers to Customer Hosted on AWS.
-   Anthropic (Claude) models are accessible through Google Vertex AI or Amazon Bedrock. With Customer Key, you can also connect directly to Anthropic using your own Anthropic API key, from either a GCP-based or AWS-based deployment.
-   For model-level differences between key modes, see the notes under [Availability and key-mode notes](#availability-and-key-mode-notes).

## Pricing[​](#pricing "Direct link to Pricing")

With Enterprise Flex pricing, each agent run uses an amount of FlexCredits determined by the complexity of an agent. This complexity includes how many connectors the agent searches, how many steps it takes, how much memory it maintains, how many tools it executes, and the model used for each step. Agents that use higher-tier models consume more credits than agents that use lower-tier models.

note

With Enterprise Flex pricing, everyday Glean Assistant queries that leverage basic and standard models don't use credits. If you enable premium models for advanced queries, the advanced queries consume credits.

See the following documentation to learn about pricing dashboards:

-   [Glean Core Suite & Model Hub dashboard](/administration/management/usage/gleancoresuite-dashboard)
-   [Enterprise Flex dashboard](/administration/management/usage/flexcredits-dashboard)

## See also[​](#see-also "Direct link to See also")

-   To configure which models are available and choose models for workflows, see [Configure LLMs in the Model Hub](/administration/configure-llms).
-   To learn how Glean handles model deprecation, including notification timelines, migration paths, and actions needed for assistants and agents, see [Model deprecation](/administration/model-deprecation).
-   To monitor LLM usage and reliability for Customer Key deployments, see [LLM Insights](/administration/insights/llm-insights).
