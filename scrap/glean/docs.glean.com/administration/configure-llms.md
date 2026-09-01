---
url: "https://docs.glean.com/administration/configure-llms"
canonical: "https://docs.glean.com/administration/configure-llms"
title: "Configure LLMs in the Model Hub"
description: "Configure model access and select models for workflows in the Model Hub."
fetched_at: "2026-09-01T13:29:00.602Z"
---
On this page

Configure which models are available in your Glean deployment and choose the models used in Glean Agents and Glean Assistant workflows.

To exclude models or restrict them to specific departments, see [Exclude or restrict models](/administration/model-exclusion).

For the list of supported models, availability by hosting environment, and pricing, see [Supported LLMs](/administration/llms).

## Configure models in the Model Hub[​](#configure-models-in-the-model-hub "Direct link to Configure models in the Model Hub")

You can configure models using either Glean Universal Model Key or Customer Key (BYOK).

note

Self‑hosted AWS deployments can use Gemini through Vertex AI. Self‑hosted GCP deployments cannot use models hosted on AWS, for example, Bedrock.

### Glean Universal Model Key[​](#glean-universal-model-key "Direct link to Glean Universal Model Key")

With Glean Universal Model Key, Glean manages model configuration and provisioning for you. However, you can still configure which models are available in your deployment:

1.  Go to **Admin console → Models**.
2.  On the **Models** page, use the search bar, capability filter, or scroll to find the model you want to include.
3.  For the model you want to include, toggle the model on.
4.  Click **Save** to apply your changes. This includes the model across Glean, including Assistant and Agents.

The **Models** page for Glean Universal Model Key shows per-model toggles grouped by creator. This differs from the Customer Key experience, which uses hosting provider-based configuration.

### Customer Key[​](#customer-key "Direct link to Customer Key")

With Customer Key, you can configure which models are available in your deployment. The **Models** page for Customer Key shows per-model toggles grouped by hosting provider.

note

For Customer Key deployments, model defaults for image generation models can use a different provider. All other models must use defaults from the same provider.

To configure which models are available in your deployment:

1.  Go to **Admin console → Models**.
2.  Click **Add LLM**.
3.  Select a hosting provider and follow the configuration steps:

### Azure OpenAI

1.  Ensure that the Assistant is configured.
2.  In your Azure Portal, go to **Keys and Endpoints**, add the Key and Endpoint you want to use with Glean.
3.  (Optional) If you have not configured the Assistant, select models for Assistant.
    -   For each selected model, add the deployment name configured on Azure.
4.  Select models for use in Glean.
    -   For each selected model, add the deployment name configured on Azure.
5.  Validate the connection.
6.  Click **Save**.
7.  To remove a model, uncheck it, validate, and save.

### Amazon Bedrock (self-hosted on AWS only)

1.  Enter your preferred region.
2.  (Optional) If you have not configured the Assistant, select models for Assistant.
3.  Select models for Agents.
4.  Validate the connection.
5.  Click **Save**.
6.  To remove a model, uncheck it, validate, and save.

### Google Vertex AI (self-hosted on GCP only)

1.  (Optional) If you have not configured the Assistant, select models for Assistant.
2.  Select models for Agents.
3.  Ensure selected models are enabled in Google Model Garden.
4.  Validate the connection.
5.  Click **Save**.
6.  To remove a model, uncheck it, validate, and save.

### OpenAI

1.  Enter your API key to be used with Glean from the OpenAI Portal.
2.  (Optional) If you have not configured the Assistant, select models for Assistant.
3.  Select models for Agents.
4.  Validate the connection.
5.  Click **Save**.
6.  To remove a model, uncheck it, validate, and save.

### Anthropic

1.  Enter your Anthropic API key from the Anthropic Console.
2.  Optional: Enter a custom endpoint in **Base URL**.
3.  (Optional) If you have not configured the Assistant, select models for Assistant.
4.  Select models for Agents.
5.  Validate the connection.
6.  Click **Save**.
7.  To remove a model, uncheck it, validate, and save.

## Select models for workflows[​](#select-models-for-workflows "Direct link to Select models for workflows")

Only models enabled for the Agents appear in the agent builder. Similarly, only models enabled for the Assistant are available when users select models in Glean.

See [Exclude or restrict models](/administration/model-exclusion) for more information on how to exclude or restrict models.

#### Set default model for an agent[​](#set-default-model-for-an-agent "Direct link to Set default model for an agent")

In the agent builder, open **Settings** (gear icon) → **Select Model**.  
![](/assets/images/image-1-cc04db32556905ccc77035a4ec8bdfd6.png)

#### Set per‑step model[​](#set-perstep-model "Direct link to Set per‑step model")

In the canvas, select a step and choose a model for that step. ![](/assets/images/image-2-2c7aaa0216e53e246560519b7355d422.png)

### Best practices[​](#best-practices "Direct link to Best practices")

-   Start with a balanced default model for most tasks and upgrade select workflows to higher‑tier models when you need stronger reasoning.
-   Where possible, keep model families consistent across multi‑step workflows for predictable quality and cost.
-   **For Customer Keys**: Align with your enterprise provider contracts and control data routing with cloud restrictions.

## See also[​](#see-also "Direct link to See also")

-   For the list of supported models, availability, and pricing, see [Supported LLMs](/administration/llms).
-   To exclude models or restrict them to specific departments, see [Exclude or restrict models](/administration/model-exclusion).
-   To learn how Glean handles model deprecation, including notification timelines, migration paths, and actions needed for assistants and agents, see [Model deprecation](/administration/model-deprecation).
-   To learn how users can select a model in Glean Assistant, see [Model choice](/get-started/golive/model-choice).
-   To resolve errors when connecting to your LLM provider, see [Troubleshoot LLM provider errors](/administration/management/models/provider-setup/troubleshoot-llm-provider-errors).
