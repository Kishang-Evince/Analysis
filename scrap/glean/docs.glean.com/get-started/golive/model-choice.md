---
url: "https://docs.glean.com/get-started/golive/model-choice"
canonical: "https://docs.glean.com/get-started/golive/model-choice"
title: "Model choice"
description: "Choose which AI model powers Glean Chat or Builder Assistant. In Glean Chat, use Auto to let Glean select a model automatically."
fetched_at: "2026-09-01T13:29:49.495Z"
---
On this page

You can choose which AI model powers a Glean Assistant conversation or Builder Assistant chat. Model choice is available for Glean Universal Model Key and Customer Key (BYOK) deployments, subject to the models and features enabled by your admin.

If your organization uses Glean Universal Model Key, you can set a default model that Glean manages for you based on evaluations and real‑world usage data.

Model choice lets you:

-   Select a specific model for a given Glean Assistant conversation.
-   Use **Auto** (the default) — Glean selects the best model for each chat on your behalf.
-   Experiment with multiple leading models on your own company data, within Glean's governed enterprise environment.

## (Recommended) Use Auto[​](#recommended-use-auto "Direct link to (Recommended) Use Auto")

If your organization uses Glean Universal Model Key, **Auto** is the default option in Glean Chat. Its subtitle in the UI is "Selects the best model".

When you use **Auto**:

-   Glean automatically selects the model for each chat based on internal evaluations and live usage data.
-   Glean continuously monitors quality, latency, cost, and reliability in production and adjusts the recommendations over time.
-   You get a strong default experience without tracking the rapidly changing model landscape yourself.

Glean recommends using **Auto** for most conversations, especially when you are not sure which specific model to select.

## Select a model in Glean Chat[​](#select-a-model-in-glean-chat "Direct link to Select a model in Glean Chat")

Here's how to select a model in Glean Chat:

1.  Navigate to **New Chat**, or start a new chat from the Glean URL for your organization.
2.  In the chat interface, select the adjustment icon. Glean uses **Auto** by default.
3.  Pick a specific model (for example, **GPT-5.5**, **Claude Sonnet 4.6**, or **Gemini Pro 3.1**) from the list your admin enabled.
4.  Enter your question or task as usual. Glean uses the selected model to respond to that conversation.

If you don't see the model choice feature or a specific model you expect, contact your Glean admin. They may have limited which models are available for your organization.

note

-   The selection applies to a particular **chat session**. You can pick a model for a conversation, but you cannot change the global default models used by Assistant for your organization.
-   If you do nothing, Glean keeps using **Auto** as the default for a seamless experience.

## Select a model in Builder Assistant[​](#select-a-model-in-builder-assistant "Direct link to Select a model in Builder Assistant")

Builder Assistant includes a model picker in its chat bar. Use it to choose the model that powers Builder Assistant interactions while you build an agent. This selection affects Builder Assistant chat only. It does not change the models configured for the agent or its individual steps.

To select a model:

1.  In Glean, go to **Agents**.
2.  Click **Create**. Builder Assistant opens.
3.  In the Builder Assistant chat bar, click the current model name.
4.  Select a model from the list.

![Model picker in the Builder Assistant chat bar](/img/agent-builder-model-choice.png)

Builder Assistant initially uses the same default model configured for Agents. It does not provide the **Auto** option available in Glean Assistant. After you select a model, your selection persists across Builder Assistant sessions and agents. Each response identifies the model that generated it.

## Available models[​](#available-models "Direct link to Available models")

The exact list of models shown in Glean Chat and Builder Assistant depends on what Glean has enabled globally and what your admin has allowed for your deployment. Builder Assistant shows named models enabled for Agents. Examples of models that may be available include:

-   GPT family, for example, GPT 5.2
-   Claude family, for example, Claude Sonnet 4.6
-   Gemini family, for example, Gemini Pro 3.1

The **Model Hub** of Glean and Universal Model Key allows admins to quickly onboard new frontier models from providers such as OpenAI, Anthropic, Google, and Amazon as soon as they launch, which is often under a beta flag.

For more information about the models available in Glean, see [Supported models](/administration/llms#supported-models).

note

Model names and availability can change over time as providers release new versions or retire older ones.

## Admin controls[​](#admin-controls "Direct link to Admin controls")

Glean Admins can:

-   Decide which models are available for users in Glean Chat and Builder Assistant.
-   If using Glean Universal Model Key, keep some models in beta or limited rollout, and set **Auto** for everyone else.

This lets admins control cost, compliance, and change management, and allows users to experiment with different models when appropriate.

Model availability in Builder Assistant follows your organization's existing model controls. To make a model available to builders, an admin must enable it for the deployment and for Agents where applicable. Premium models can also be hidden from model pickers or restricted by department. For more information, see [Exclude or restrict models](/administration/model-exclusion).

note

The model management experience differs between Glean Universal Model Key and Customer Key deployments. Glean Universal Model Key customers see models grouped by creator (OpenAI, Anthropic, Google) with per-model, per-surface controls. Customer Key deployments configure models through hosting provider setup.

## Security, privacy, and pricing[​](#security-privacy-and-pricing "Direct link to Security, privacy, and pricing")

Model choice follows the existing enterprise model for Glean integrations:

-   Glean manages contracts, capacity, and upgrades with providers such as OpenAI, Azure OpenAI, Vertex AI, and Amazon Bedrock, helping customer avoid vendor lock‑in.
-   Providers are configured with zero‑retention commitments, so customer data is not stored or used for training by the model vendors.
-   Model choice does not introduce additional consumption pricing today. Glean will alert admins if this changes in the future.

## Limitations[​](#limitations "Direct link to Limitations")

-   **Surface-specific selection:** Model choice applies to the Glean Assistant conversation or Builder Assistant session where you select it. It does not change your organization's default model.
-   **Chat-only for Builder Assistant:** Builder Assistant model selection controls the model used for chat interactions. It does not change the models configured for the agent or individual agent steps.
-   **Persists across sessions:** Your selected Builder Assistant model persists across sessions and agents.
-   **Admin-controlled availability:** You can select only models that are available for your deployment and enabled by your admin. If a model is missing, ask your admin to check model availability, deployment compatibility, premium-model visibility, and department restrictions.
-   **Usage-based pricing:** Builder Assistant usage may be subject to usage-based pricing. See your plan details for applicable charges.

## See also[​](#see-also "Direct link to See also")

-   To learn which models and providers are available in your deployment, see [Set up LLMs using the Model Hub](/administration/llms).
-   To understand how availability varies by deployment and key mode, see [Availability by hosting environment and provider](/administration/llms#availability-by-hosting-environment-and-provider).
-   To learn how to use Builder Assistant while creating an agent, see [Agent Builder](/agents/concepts/agent-builder).
