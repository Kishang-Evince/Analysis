---
url: "https://docs.glean.com/administration/management/models/provider-setup/azure-openai-setup"
canonical: "https://docs.glean.com/administration/management/models/provider-setup/azure-openai-setup"
title: "Use GPT models on Azure OpenAI"
description: "Learn how to configure Glean to use GPT models on Azure OpenAI for direct billing of LLM usage through your Azure account."
fetched_at: "2026-09-01T13:29:09.298Z"
---
On this page

This article provides instructions for configuring Glean to use GPT models on Azure OpenAI, allowing direct billing of LLM usage through your Azure account. This document applies to customers hosted on GCP or AWS who want to directly bill their LLM usage via Azure.

warning

Do not use this document if you are leveraging the Glean Universal Model Key. For the Glean Universal Model Key, Glean manages the configuration and provisioning of LLM resources transparently.

## Enable access to models[​](#enable-access-to-models "Direct link to Enable access to models")

info

Glean requires the [Azure OpenAI Responses API](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses?tabs=python-secure#responses-api). This API is not available in all Azure regions. When provisioning your Azure OpenAI resource, choose a region that supports the Responses API. See [Microsoft's documentation](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses?tabs=python-secure#responses-api) for the full list of supported regions.

Fill out the Azure OpenAI Service form and request access to the following models:

| Model name | How Glean uses the model |
| --- | --- |
| GPT-5.1 (Preferred) | Agentic Reasoning model used in fast and thinking modes in chat. This is the primary model for Glean chat. |
| GPT-5 | Agentic Reasoning model used in fast and thinking modes in chat. This is the primary model for Glean chat. |
| GPT-5.1 | Agentic model used for other, more complex tasks in Glean |
| GPT-5.1 | Fast agentic model used for simpler tasks such as follow-up question generation |

## Request additional capacity from Azure[​](#request-additional-capacity-from-azure "Direct link to Request additional capacity from Azure")

Please see Azure OpenAI Service quotas and limits for the default quotas and instructions for requesting additional quota.

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

## Select the model in Glean[​](#select-the-model-in-glean "Direct link to Select the model in Glean")

1.  Go to **Admin console → Platform → LLMs**.
2.  Click **Add LLM**.
3.  Select **Azure OpenAI**.
4.  Select:
    -   **GPT-5.1** (Preferred) or **GPT-5** for the agentic engine model
    -   **GPT-5.1** for the agentic model
    -   **GPT-5.1** for the fast agentic model
5.  Click **Validate** to ensure Glean can use the model.
6.  Once validated, click **Save**.

## Verify the model used by Glean[​](#verify-the-model-used-by-glean "Direct link to Verify the model used by Glean")

1.  Go to Glean and select the public knowledge assistant.
2.  Ask the question: "Who created you?"

You should get a response similar to: I was created by OpenAI.

## FAQ[​](#faq "Direct link to FAQ")

### How do you ensure data security and handle potentially harmful content?

All data is encrypted in transit between your Glean instance and the Azure OpenAI service.

Please review the Data, privacy, and security for Azure OpenAI Service guide. We have highlighted some relevant excerpts (as of June 4, 2024) below:

Your prompts (inputs) and completions (outputs), your embeddings, and your training data:

-   are NOT available to other customers.
-   are NOT available to OpenAI.
-   are NOT used to improve OpenAI models.
-   are NOT used to improve any Microsoft or 3rd party products or services.

To reduce the risk of harmful use of the Azure OpenAI Service, the Azure OpenAI Service includes both content filtering and abuse monitoring features. To learn more about content filtering, see Azure OpenAI Service content filtering. To learn more about abuse monitoring, see abuse monitoring.

Content filtering occurs synchronously as the service processes prompts to generate content as described above and here. No prompts or generated results are stored in the content classifier models, and prompts and results are not used to train, retrain, or improve the classifier models.

Azure OpenAI abuse monitoring detects and mitigates instances of recurring content and/or behaviors that suggest use of the service in a manner that may violate the code of conduct or other applicable product terms. To detect and mitigate abuse, Azure OpenAI stores all prompts and generated content securely for up to thirty (30) days.

The data store where prompts and completions are stored is logically separated by customer resource (each request includes the resource ID of the customer's Azure OpenAI resource). A separate data store is located in each region in which the Azure OpenAI Service is available, and a customer's prompts and generated content are stored in the Azure region where the customer's Azure OpenAI service resource is deployed, within the Azure OpenAI service boundary. Human reviewers assessing potential abuse can access prompts and completions data only when that data has been flagged by the abuse monitoring system. The human reviewers are authorized Microsoft employees who access the data via point wise queries using request IDs, Secure Access Workstations (SAWs), and Just-In-Time (JIT) request approval granted by team managers. For Azure OpenAI Service deployed in the European Economic Area, the authorized Microsoft employees are located in the European Economic Area.

**We strongly recommend that you request an exemption from Azure abuse monitoring so that your prompts and generated content are not stored on Azure servers or subject to human review by Microsoft employees.**

(Azure abuse monitoring is disabled for all customers on the Glean key.)

## Troubleshoot setup errors[​](#troubleshoot-setup-errors "Direct link to Troubleshoot setup errors")

If validation fails or Glean can't connect to your Azure OpenAI resource, check the following:

-   **Deployment name mismatch (404 error):** The deployment name you enter in Glean must match the deployment name in your Azure Portal exactly. Go to your Azure OpenAI resource, select **Model deployments > Manage Deployments**, and copy the deployment name. The deployment name is not the same as the model name — for example, you might deploy `gpt-5.1` with a deployment name like `gpt-51-prod`.
-   **Invalid API key (401 error):** Confirm your Azure OpenAI key is still active in the Azure Portal under **Keys and Endpoints**. If the key was rotated, update it in Glean.
-   **Rate limit exceeded (429 error):** Compare your Azure OpenAI quota against the [capacity requirements](#request-additional-capacity-from-azure) above for your number of users. Request a quota increase in the Azure Portal if needed.
-   **Region doesn't support the Responses API:** The [Azure OpenAI Responses API](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses?tabs=python-secure#responses-api) isn't available in all regions. If you see validation errors, confirm your Azure OpenAI resource is in a supported region.

For a full list of error codes and resolution steps, see [Troubleshoot LLM provider errors](/administration/management/models/provider-setup/troubleshoot-llm-provider-errors).

## Architecture diagram[​](#architecture-diagram "Direct link to Architecture diagram")

![A system architecture diagram illustrating a user query being processed through a series of modules within the Customer Glean Project VPC, including Tool Selection & Query Planning, Glean Planner, Glean Index & Knowledge Graph, Query Execution, Governance Engine & Doc Redlisting, Intelligent Data Selector, and Answer Generation, utilizing Azure OpenAI for GPT model inference.](/img/azure-openai-setup-arch.png)
