---
url: "https://docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup"
canonical: "https://docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup"
title: "Use Anthropic Claude models on Amazon Bedrock"
description: "Configure Glean to use Anthropic Claude models through Amazon Bedrock for direct billing on AWS."
fetched_at: "2026-10-13T08:49:17.241Z"
---
On this page

This article provides instructions for configuring Glean to use Anthropic Claude models on Amazon Bedrock, allowing direct billing of LLM usage through your Amazon Bedrock account.

warning

If you use the Glean Universal Model Key, Glean configures and provisions LLM resources for you, so you don't need to set up Bedrock quota or select models in Glean. If your Glean deployment runs on AWS, you still need to enable Anthropic model access in your AWS account for Memory. See [Bedrock access for Memory on AWS](#bedrock-access-for-memory-on-aws).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following prerequisites:

-   Use a Customer Key (BYOK) deployment. If you use the Glean Universal Model Key, this page only applies to the Bedrock access steps for Memory on AWS.
-   Have an AWS user account with permissions to subscribe to Amazon Bedrock models.

## Enable access to foundation models in Bedrock[​](#enable-access-to-foundation-models-in-bedrock "Direct link to Enable access to foundation models in Bedrock")

1.  Sign in to the AWS Management Console with a user account that has permissions to subscribe to Bedrock models.
2.  Choose the same region as your Glean AWS instance (or the nearest supported one).
3.  Navigate to **Amazon Bedrock → Model catalog**.
4.  Select **Claude Sonnet 4.6**. Claude Sonnet 4.6 is the agentic model for complex tasks, and is also the fast agentic model for simpler tasks.
5.  If AWS prompts you to submit use case details for Anthropic, complete and submit the form. For the use case, you can state: "Generate answers to questions about internal company documents."

note

-   Amazon Bedrock enables access to many foundation models by default for accounts with the required AWS Marketplace permissions. Anthropic requires first-time customers to submit use case details once per AWS account, or once in your organization's management account.
-   Access is usually granted right after you submit the form, but it can stay pending for a short time. During that time, requests to the model can fail with an access error.
-   For more information, see [Request access to models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) in the Amazon Bedrock User Guide.

## Bedrock access for Memory on AWS[​](#bedrock-access-for-memory-on-aws "Direct link to Bedrock access for Memory on AWS")

On AWS deployments, [Memory](/administration/assistant/configuration/memory-personalization) uses Claude Sonnet 4.6 on Amazon Bedrock in your deployment's AWS account for background processing. This applies whether you use Customer Key or the Glean Universal Model Key.

To prepare your AWS account for Memory:

1.  Submit Anthropic's use case details for the AWS account, as described in [Enable access to foundation models in Bedrock](#enable-access-to-foundation-models-in-bedrock).
2.  Make sure Claude Sonnet 4.6 is available in the same region as your Glean deployment.

If you use the Glean Universal Model Key, you only need to complete these Bedrock access steps. Don't change your LLM settings in Glean.

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
