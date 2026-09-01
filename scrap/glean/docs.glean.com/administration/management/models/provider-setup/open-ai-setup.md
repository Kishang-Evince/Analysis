---
url: "https://docs.glean.com/administration/management/models/provider-setup/open-ai-setup"
canonical: "https://docs.glean.com/administration/management/models/provider-setup/open-ai-setup"
title: "Use GPT models on OpenAI"
description: "Configure Glean to use OpenAI GPT models through your own OpenAI account for direct billing and capacity management on GCP or AWS."
fetched_at: "2026-09-01T13:29:09.390Z"
---
On this page

This article provides instructions for customers hosted on GCP or AWS to configure Glean to use GPT models directly through their own OpenAI account for billing and capacity management.

warning

Do not use this document if you are leveraging the Glean Universal Model Key. For the Glean Universal Model Key, Glean manages the configuration and provisioning of LLM resources transparently.

## Enable access to models[​](#enable-access-to-models "Direct link to Enable access to models")

Request access to the following models from the OpenAI Library:

| Model name | How Glean uses the model |
| --- | --- |
| GPT-5.1 (Preferred) | Agentic Reasoning model used in Fast and Thinking Modes in Chat. This is the primary model for Glean. |
| GPT-5 | Agentic Reasoning model used in Fast and Thinking Modes in Chat. This is the primary model for Glean. |
| GPT-5.1 | Agentic model used for other, more complex tasks in Glean |
| GPT-5.1 | Fast agentic model used for simpler tasks such as follow-up question generation |

## Capacity for OpenAI models[​](#capacity-for-openai-models "Direct link to Capacity for OpenAI models")

We highly recommend that you use priority processing from OpenAI. Priority processing will grant you faster, more consistent performance while getting the flexibility of a pay-as-you-go model. Here is the FAQ for priority processing.

Please check the OpenAI rate and usage limits for your organization. This can be found under `Settings` -> `organization` -> `limits`. Please ensure that you have the minimum capacity listed below, based on the number of users in your organization. Read more about the OpenAI tiers here.

### Capacity requirements for the latest assistant architecture on Agentic Engine 2 using GPT-5[​](#capacity-requirements-for-the-latest-assistant-architecture-on-agentic-engine-2-using-gpt-5 "Direct link to Capacity requirements for the latest assistant architecture on Agentic Engine 2 using GPT-5")

| Users | High capacity model | Low capacity model |
| --- | --- | --- |
| TPM | RPM | TPM | RPM |
| --- | --- | --- | --- |
| 500 | 125000 | 10 | 5000 | 5 |
| 1000 | 250000 | 15 | 5000 | 5 |
| 2500 | 625000 | 35 | 10000 | 10 |
| 5000 | 1245000 | 65 | 15000 | 15 |
| 10000 | 2490000 | 130 | 30000 | 30 |

### Select the model in Glean[​](#select-the-model-in-glean "Direct link to Select the model in Glean")

1.  Go to **Admin console → Platform → LLMs**
2.  Click on **Add LLM**
3.  Select **OpenAI**
4.  Select:
    -   **GPT-5.1** (Preferred) or **GPT-5** for the agentic engine model
    -   **GPT-5.1** for the agentic model
    -   **GPT-5.1** for the fast agentic model
5.  Click **Validate** to ensure Glean can leverage the model
6.  Once validated, click **Save**

### Verify the model used by Glean[​](#verify-the-model-used-by-glean "Direct link to Verify the model used by Glean")

1.  Go to Glean and select the Public Knowledge Assistant.
2.  Ask the question: `Who created you?`

You should get a response similar to: `I was created by OpenAI`

### FAQ[​](#faq "Direct link to FAQ")

### How do you ensure data security and handle potentially harmful content?

All data is encrypted in transit between your Glean instance and your OpenAI service. Please review the Data controls in the OpenAI Platform guide.

You can choose to request Zero Data Retention and opt-out of modified abuse monitoring so that your prompts and generated content are not stored on OpenAI servers or subject to human review by OpenAI employees. Note that modified abuse monitoring is required for some OpenAI features, such as data analysis.

### How can we estimate LLM costs?

The number of tokens we use will vary depending on the type of request (for example, summarizing a long document will use many tokens). For requests that are retrieving an answer from Glean search engine, the current token usage is:

-   **Agentic model**: 19,000 input tokens + 450 output tokens
-   **Fast agentic model**: 5,300 input tokens + 150 output tokens

### Architecture diagram[​](#architecture-diagram "Direct link to Architecture diagram")
