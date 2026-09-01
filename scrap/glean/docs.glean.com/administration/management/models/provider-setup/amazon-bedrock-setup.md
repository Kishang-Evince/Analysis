---
url: "https://docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup"
canonical: "https://docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup"
title: "Use Anthropic Claude models on Amazon Bedrock"
description: "Configure Glean to use Anthropic Claude models through Amazon Bedrock for direct billing on AWS."
fetched_at: "2026-09-01T13:29:09.188Z"
---
On this page

This article provides instructions for configuring Glean to use Anthropic Claude models on Amazon Bedrock, allowing direct billing of LLM usage through your Amazon Bedrock account.

warning

This document should not be used if you are utilizing the Glean Universal Model Key. With the Glean Universal Model Key, Glean transparently manages the configuration and provisioning of LLM resources.

## Enable access to foundation models in Bedrock[​](#enable-access-to-foundation-models-in-bedrock "Direct link to Enable access to foundation models in Bedrock")

1.  Sign in to the AWS Management Console with a user account that has permissions to subscribe to Bedrock models.
2.  Navigate to **Amazon Bedrock → Model access**.
3.  Choose the same region as your Glean AWS instance (or the nearest supported one).
4.  Request access to Claude Sonnet 4.6. Claude Sonnet 4.6 is the agentic model for complex tasks, and is also the fast agentic model for simpler tasks.

note

If prompted for a use case for the models, you can state: "Generate answers to questions about internal company documents."

## Ensure you have enough quota from Bedrock[​](#ensure-you-have-enough-quota-from-bedrock "Direct link to Ensure you have enough quota from Bedrock")

For default quotas on these models for pay-as-you-go, please refer to the Amazon Bedrock quotas. If you need more quota, you must contact your AWS account manager, as Bedrock does not currently offer a self-service method for increasing quota.

## Capacity requirements[​](#capacity-requirements "Direct link to Capacity requirements")

Glean token consumption varies based on query complexity and document size. To estimate your weekly LLM costs, calculate your expected weekly query volume and multiply by the per-query cost based on current Claude API pricing. Actual token usage will vary by customer depending on query complexity and document size.

To estimate throughput requirements in tokens per minute (TPM), you should identify your deployment's query per minute (QPM) rate at a desired percentile (for example, p90) and multiply it by the average tokens per query. The table below shows example TPM conversions assuming a rate of 0.004 QPM per Daily Active User (DAU).

**TPM per Glean DAU**

| Users | TPM |
| --- | --- |
| 500 | 125,000 |
| 1000 | 245,000 |
| 2500 | 615,000 |
| 5000 | 1,225,000 |
| 10000 | 2,450,000 |
| 20000 | 4,895,000 |

note

It is highly recommended to use your deployment's actual QPM for estimating capacity, as QPM per DAU can vary significantly across customers.

## Select the models in Glean[​](#select-the-models-in-glean "Direct link to Select the models in Glean")

1.  Navigate to **Admin console → Platform → LLMs**.
2.  Click on **Add LLM**.
3.  Choose **Bedrock**.
4.  Select the models:
    -   **Claude Sonnet 4.6** for the large model.
    -   **Claude Haiku 4.5** for the small model.
    -   **Claude Sonnet 4.6** for the agentic reasoning models.
5.  Click **Validate** to confirm that Glean can use the models.
6.  After validation, click **Save**.

note

-   To use Claude Sonnet 4.6 with Glean, the agentic engine features must be enabled. Until then, the Assistant will use the agentic and fast agentic models you have configured.
-   Glean will automatically apply an IAM policy to grant its servers access to Bedrock, so no extra authentication is needed.

## Verify model used in Glean[​](#verify-model-used-in-glean "Direct link to Verify model used in Glean")

1.  Go to Glean and choose the **Public Knowledge Assistant**.
2.  Ask the question: "Who created you?"
3.  You should receive a response like: "I was created by the artificial intelligence company Anthropic."

## FAQ[​](#faq "Direct link to FAQ")

### How do you ensure data security?

All data is encrypted in transit between your Glean instance and the Amazon Bedrock service, which operate in the same AWS region. Amazon Bedrock does not use customer prompts and completions to train AWS models or share them with third parties. Model providers do not have access to Amazon Bedrock logs or customer data.

### How do you handle potentially harmful content?

Please refer to the Amazon Bedrock abuse detection guide.

## Architecture diagram[​](#architecture-diagram "Direct link to Architecture diagram")

The diagram below illustrates how a user query is processed. It flows through modules for tool selection, query planning, and execution, interacts with Glean Index and Knowledge Graph, and uses Amazon Bedrock for Claude model inference to generate an answer.
