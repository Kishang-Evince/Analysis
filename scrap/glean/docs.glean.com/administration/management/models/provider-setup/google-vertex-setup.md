---
url: "https://docs.glean.com/administration/management/models/provider-setup/google-vertex-setup"
canonical: "https://docs.glean.com/administration/management/models/provider-setup/google-vertex-setup"
title: "Use Anthropic Claude models on Google Vertex AI"
description: "Configure Glean to use Anthropic Claude models through Google Vertex AI."
fetched_at: "2026-09-01T13:29:09.327Z"
---
On this page

This article provides instructions for configuring Glean to use Anthropic Claude models on Google Vertex AI, allowing direct billing of LLM usage through your Google Vertex AI account using the customer key option.

warning

Do not use this document if you are leveraging the Glean Universal Model Key. For the Glean Universal Model Key, Glean manages the configuration and provisioning of LLM resources transparently.

## Enable access to models in Vertex AI[​](#enable-access-to-models-in-vertex-ai "Direct link to Enable access to models in Vertex AI")

Go to the [Vertex AI Model Garden](https://console.cloud.google.com/vertex-ai/model-garden) and make sure you have enabled access to the following foundation models from the GCP project that Glean is running in:

| Model name | How Glean uses the model |
| --- | --- |
| Claude Sonnet 4.6 `claude-sonnet-4-6-20260217` | **Agentic reasoning model** used for assistant and autonomous agents |
| Claude Sonnet 4.6 `claude-sonnet-4-6-20260217` | **Agentic model** used for other, more complex tasks in Glean |
| Claude Sonnet 4.6 `claude-sonnet-4-6-20260217` | **Fast agentic model** used for simpler tasks such as follow-up question generation |

## Request additional quota from Vertex AI[​](#request-additional-quota-from-vertex-ai "Direct link to Request additional quota from Vertex AI")

You will need to file a standard GCP quota request, which is expressed in Requests Per Minute (RPM) and Tokens Per Minute (TPM). Filter for `base_model:` on the model names in the table below and `region:` for the region that your GCP project is running in.

Please note that the quota is not a guarantee of capacity, but is intended by Google to ensure fair use of the shared capacity, and your requests may not be served during peak periods. To obtain guaranteed capacity, please speak with your Google account team about purchasing [Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput).

## Capacity requirements[​](#capacity-requirements "Direct link to Capacity requirements")

Glean token consumption varies based on query complexity and document size. To estimate your weekly LLM costs, calculate your expected weekly query volume and multiply by the per-query cost based on current [Claude API pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing#claude-models). Actual token usage will vary by customer depending on query complexity and document size.

To estimate throughput requirements (TPM), identify your deployment's query-per-minute (QPM) rate at the desired percentile (typically p90), then multiply by the average tokens per query.

The table below illustrates example TPM conversions assuming 0.004 QPM per DAU, based on historical customer data.

| Users | TPM |
| --- | --- |
| 500 | 125,000 |
| 1000 | 245,000 |
| 2500 | 615,000 |
| 5000 | 1,225,000 |
| 10000 | 2,450,000 |
| 20000 | 4,895,000 |

note

Glean highly recommends estimating capacity using your deployment's actual QPM to produce capacity estimates as QPM per DAU varies widely across customers.

## Select the model in Glean[​](#select-the-model-in-glean "Direct link to Select the model in Glean")

1.  Go to **Admin console → Platform → LLMs**.
2.  Click on **Add LLM**.
3.  Select **Vertex AI**.
4.  Select **Claude Sonnet 4.6** for the agentic model.
5.  Click **Validate** to ensure Glean can leverage the model.
6.  Once validated, click **Save**.

note

-   In order to use Claude Sonnet 4.6 with Glean, agentic engine features should be turned on. For more information, see [Agentic engine in the Chat API](/administration/assistant/features/chat-api-agentic-engine). Until these features are turned on, Glean will continue to use agentic and fast agentic models you previously configured. You do not need to change your agentic and fast agentic model at this time.
-   We will use [Application Default Credentials](https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance) to call the models, so no additional authentication is required.

## FAQ[​](#faq "Direct link to FAQ")

### How do you ensure data security?

All data is encrypted in transit between your Glean instance and the Vertex AI service which runs in the same GCP region as your Glean instance.

Please review the [Vertex AI Generative AI and Data Governance guide](https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance). We have highlighted some relevant excerpts below (as of June 4, 2024):

-   **Foundation Model Training**: By default, Google Cloud doesn't use Customer Data to train its Foundation Models. Customers can use Google Cloud's Foundation Models knowing that their prompts, responses, and any Adapter Model training data aren't used for the training of Foundation Models.
-   **Prediction**: Inputs and outputs processed by Foundation Models, Adapter Models, and Safety Classifiers during Prediction are Customer Data. Customer Data is never logged by Google, without explicit permission from the customer by opting in to allow it to cache inputs and outputs.

## Architecture diagram[​](#architecture-diagram "Direct link to Architecture diagram")
