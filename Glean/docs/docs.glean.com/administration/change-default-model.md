---
url: "https://docs.glean.com/administration/change-default-model"
canonical: "https://docs.glean.com/administration/change-default-model"
title: "Change your default model on Customer Key"
description: "Size provider capacity, add a model to your Customer Key LLM configuration, set the model as your default, and monitor the change."
fetched_at: "2026-10-13T08:49:07.992Z"
---
On this page

On Customer Key (BYOK), you choose which models Glean uses by default. To change a default model:

1.  Confirm you have enough provider capacity
2.  Add the model to your LLM configuration
3.  Set the model as your default
4.  Monitor after the change

This page uses the GPT-5.6 Luna model as the example. The same steps apply to any model you make a default.

note

This page applies to Customer Key (BYOK) deployments. On the Glean Universal Model Key, Glean selects default models for you and there's no org-wide default for admins to set. See [Model choice](/get-started/golive/model-choice#recommended-use-auto).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm each of the following. Each one prevents a common failure.

-   **Your hosting provider serves the model.** GPT-5.6 Luna is available in Glean through OpenAI and Azure OpenAI. Check [Supported LLMs](/administration/llms#availability-by-hosting-environment-and-provider) before you plan a migration.
-   **Your text defaults sit with one provider.** The large, small, agentic, and fast agentic defaults must all come from the same hosting provider. Image generation and realtime voice models are the exception and can use a different one. See [Feature availability by LLM key, provider, and cloud](/administration/llm-key-feature-availability#1-provider-availability-by-key-type-and-cloud).
-   **You can open the LLM insights dashboard.** You need the Insights Moderator role. The capacity check depends on the usage numbers it reports.

## Confirm you have enough provider capacity[​](#confirm-you-have-enough-provider-capacity "Direct link to Confirm you have enough provider capacity")

A token-per-minute limit set below your real peak is the most common cause of HTTP 429 errors after a model change, and the errors start as soon as production traffic reaches the new model. To confirm your provider capacity, follow these steps:

1.  In the **Insights** dashboard, open **LLM**.
2.  Read **Peak TPM** and **Peak RPM** across a window wide enough to include your real spikes, not just the past week. Rate limits bind at the peak, so the average will mislead you.
3.  Compare those numbers against the tokens-per-minute and requests-per-minute limits configured in your OpenAI or Azure OpenAI account for the model you plan to make a default.
4.  Check the limits on every other model still carrying traffic. They draw on the same account-level quota.
5.  If your configured limits don't sit above your observed peak with headroom, raise them in your provider account before you continue.

Glean publishes baseline capacity requirements by user count for [OpenAI](/administration/management/models/provider-setup/open-ai-setup#capacity-for-openai-models) and [Azure OpenAI](/administration/management/models/provider-setup/azure-openai-setup#request-additional-capacity-from-azure). Treat those as a floor and size above your own observed usage.

note

TPM and RPM values in the dashboard are estimates from Glean's internal instrumentation, intended for capacity planning rather than billing reconciliation. Quota also isn't a guarantee of throughput. If your workload is latency-sensitive or spiky, ask your provider about provisioned capacity.

## Add the model to your LLM configuration[​](#add-the-model-to-your-llm-configuration "Direct link to Add the model to your LLM configuration")

You must configure a model before it appears anywhere in Glean, including as a default.

1

Open your LLM configuration

Go to **Admin console → Models**.

2

Add the provider

Click **Add LLM**, then select **OpenAI** or **Azure OpenAI**.

3

Enter your credentials

For OpenAI, enter the API key from the OpenAI platform. For Azure OpenAI, enter the key and endpoint from **Keys and Endpoints** in the Azure portal.

4

Select the model

Select **GPT-5.6 Luna**.

On Azure OpenAI, also enter the deployment name you configured for the model. Glean needs the deployment name, not the model name, and it has to match your Azure resource exactly.

5

Validate and save

Click **Validate**, then **Save**.

For the full provider configuration reference, see [OpenAI setup](/administration/management/models/provider-setup/open-ai-setup) or [Azure OpenAI setup](/administration/management/models/provider-setup/azure-openai-setup).

## Set the model as your default[​](#set-the-model-as-your-default "Direct link to Set the model as your default")

After you confirm your capacity and add the model, select it as one of your default models.

1.  Go to **Admin console → Models**.
2.  Select the provider you added when you configured the model.
3.  Select **GPT-5.6 Luna** for each default you want it to serve, such as the agentic model or the fast agentic model.
4.  Click **Validate**, then **Save**.

Move your other text defaults to the same provider at the same time.

If you set a realtime voice default, Glean pairs it with a transcription model. Changing your other defaults doesn't affect that transcription model. Glean keeps it only while the realtime voice model and its provider stay the same. When you change the realtime voice model or its provider, or remove the realtime voice default, Glean clears the paired transcription model and stops showing it with your default models. For more about voice in Glean Assistant, see [Real-time voice](/user-guide/assistant/real-time-voice).

note

GPT Live 1 doesn't use a paired transcription model, because it transcribes speech itself. GPT Live 1 is available only on the Glean Universal Model Key, so it isn't a realtime voice option on Customer Key.

## Monitor after the change[​](#monitor-after-the-change "Direct link to Monitor after the change")

In the **Insights** dashboard, watch three signals over the first day or two:

-   **429 rate.** A sustained increase means your provider limit is too low. Raise the limit in your provider account.
-   **5xx rate.** This separates provider-side instability from quota pressure. Check your provider's status page when it climbs.
-   **Response quality.** Spot-check the query types your teams run most often.

The **Usage breakdown** table attributes 429 and 5xx rates per model, which tells you whether the new default is the model under pressure or something else is.

important

The LLM insights dashboard updates once daily and can lag by up to 24 hours. It won't confirm a healthy switch in real time, so don't read an empty chart as a clean result. For faster signal, watch user-reported errors and your provider's own metrics.

## Roll back[​](#roll-back "Direct link to Roll back")

To revert the default model setting, go to **Admin console → Models**, select your previous model for each default you changed, then validate and save. Keep the earlier model configured until you're confident in the new default, so a rollback doesn't require re-entering credentials.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

| What you see | Likely cause | What to do |
| --- | --- | --- |
| The model isn't in the **Add LLM** model list | Your configured provider doesn't serve it. GPT-5.6 Luna is offered through OpenAI and Azure OpenAI only. | Add OpenAI or Azure OpenAI. On Customer Key you can't reach a provider outside your own cloud. |
| The model isn't available as a default | The model was never added to your LLM configuration, or validation failed | Confirm the model is saved under OpenAI or Azure OpenAI and that validation succeeded. |
| Validation fails on Azure OpenAI | Deployment name mismatch | Enter the deployment name from your Azure OpenAI resource, not the model name. See [Troubleshoot LLM provider errors](/administration/management/models/provider-setup/troubleshoot-llm-provider-errors). |
| HTTP 429 errors after the switch | Your provider limit is below peak demand | Pull **Peak TPM** and **Peak RPM** from LLM insights, then raise the limit in the Azure portal under **Quotas**, or in the OpenAI dashboard under **Settings → Organization → Limits**. |
| Higher cost than expected | Text defaults split across providers, or older models still carrying traffic | Confirm your large, small, agentic, and fast agentic defaults share one provider, then review per-model usage in the **Usage breakdown** table. |

If you encounter an issue that's not covered here, contact your Glean account team with your deployment name and the timestamps of the behavior.

## See also[​](#see-also "Direct link to See also")

-   [Supported LLMs](/administration/llms)
-   [Configure LLMs in the Model Hub](/administration/configure-llms)
-   [LLM insights](/administration/insights/llm-insights)
-   [Model deprecation](/administration/model-deprecation)
-   [Troubleshoot LLM provider errors](/administration/management/models/provider-setup/troubleshoot-llm-provider-errors)
