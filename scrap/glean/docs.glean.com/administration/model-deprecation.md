---
url: "https://docs.glean.com/administration/model-deprecation"
canonical: "https://docs.glean.com/administration/model-deprecation"
title: "Model deprecation"
description: "Learn how Glean handles model deprecation, including notification timelines, migration paths, and actions needed for assistants and agents"
fetched_at: "2026-09-01T13:29:10.161Z"
---
On this page

Glean periodically deprecates older models as newer, more capable versions become available. This section explains how deprecation works and what tools you may need to take.

## Assistant using a deprecated model[​](#assistant-using-a-deprecated-model "Direct link to Assistant using a deprecated model")

### Glean Universal Model Key[​](#glean-universal-model-key "Direct link to Glean Universal Model Key")

If you are using Glean Universal Model Key, your Assistant model is managed and configured by Glean. Glean ensures your Assistant continues to use the latest models available in the market.

### Customer Key[​](#customer-key "Direct link to Customer Key")

Glean will send you advance notifications when your configured Assistant model is going to be deprecated.

| Timeline | Email notifications |
| --- | --- |
| **60 days before deprecation** | Glean will send an email notification to all the administrators regarding the upcoming deprecation of their Assistant model. |
| **15 days before deprecation** | In case the admins have not yet migrated to a supported model, Glean sends a reminder email to all admins. |
| **After deprecation** | The model is no longer available for use. If the Assistant model is not updated by this time, Assistant requests will fail with an error and users will not be able to use the Assistant until the model is updated to a supported model. |

In addition to email notifications, you will see a banner in the **Admin console** informing you that your Assistant model is being deprecated along with the deprecation date.

## Agents using a deprecated model[​](#agents-using-a-deprecated-model "Direct link to Agents using a deprecated model")

-   If any of your agents (or any of the steps within an agent) are using a model that is scheduled for deprecation, you will receive an email notification informing about which agents or steps of the agents are using the deprecated model along with the date of deprecation.
-   Glean will also recommend suitable migration models for your agents, based on the models currently enabled within your deployment.
-   Apart from the email notifications, you will also see a banner in the **Admin console** informing you about the agents using a deprecated model and the date of deprecation.
-   After the deprecation date, if any agents or any steps of the agents are still using the deprecated model, Glean will automatically switch these to the recommended fallback model. This ensures seamless usage of the agents by the users without any disruption.

## What needs your attention[​](#what-needs-your-attention "Direct link to What needs your attention")

-   **Admins:** If you receive an email notification about your Assistant model being deprecated or see a banner in the **Admin console**, you must update your Assistant model to any newer model as soon as possible to avoid any disruption.
-   **Agent builders:** If you receive an email notification about your agents using a deprecated model or see a banner in the **Admin console**, Glean recommends that you proactively update your agents to a newer model of your choice. If you are unable to do so before the deprecation date, Glean will automatically move affected agents to a suitable fallback model so they continue to run.

## Deprecated models[​](#deprecated-models "Direct link to Deprecated models")

The following models have been deprecated or are scheduled for deprecation. After the deprecation date, a model is no longer available for new configurations, and existing deployments are automatically migrated to the listed replacement.

### Text models[​](#text-models "Direct link to Text models")

| Deprecated model | Replacement | Deprecation date |
| --- | --- | --- |
| GPT 4 Preview | GPT-4.1 | May 8, 2025 |
| GPT 4 Preview V2 | GPT-4.1 | May 8, 2025 |
| GPT 4 Turbo | GPT-4.1 | May 8, 2025 |
| GPT 4 | GPT-4.1 | May 8, 2025 |
| GPT 3.5 Turbo | GPT-4.1 | May 8, 2025 |
| Gemini 1.5 Pro | Gemini 3.1 Pro | September 26, 2025 |
| Gemini 1.5 Flash | Gemini 3.7 Flash | September 26, 2025 |
| Claude 3 Sonnet | Claude Sonnet 4.6 | October 28, 2025 |
| Claude 3.5 Sonnet | Claude Sonnet 4.6 | October 28, 2025 |
| Claude 3.5 Sonnet V2 | Claude Sonnet 4.6 | October 28, 2025 |
| Claude 3.7 Sonnet | Claude Sonnet 4.6 | January 28, 2026 |
| Claude 3.5 Haiku | Claude Haiku 4.5 | February 5, 2026 |
| GPT 4o | GPT-5.1 | February 5, 2026 |
| Gemini 2.0 Flash | Gemini 3 Flash | March 3, 2026 |
| Gemini 2.0 Flash Lite | Gemini 3.5 Flash Lite | March 3, 2026 |
| Gemini 3 Pro Preview | Gemini 3.1 Pro | March 25, 2026 |
| GPT 4o | GPT-5.1 | March 27, 2026 |
| Claude Sonnet 4 | Claude Sonnet 4.6 | April 29, 2026 |
| Claude 4.5 Sonnet | Claude Sonnet 4.6 | April 29, 2026 |
| Claude Opus 4.5 | Claude Opus 4.6 | April 29, 2026 |
| o1 | GPT-5.1 | June 30, 2026 |
| o3 | GPT-5.1 | June 30, 2026 |
| o4-mini | GPT-5.1 | June 30, 2026 |
| o3-mini | GPT-5.1 | June 30, 2026 |
| GPT-4o (2024-05-13) | GPT-5.1 | September 30, 2026 |
| GPT-4o mini | GPT-4.1 mini | September 30, 2026 |
| Gemini 2.5 Pro | Gemini 3.1 Pro | October 6, 2026 |
| Gemini 2.5 Flash | Gemini 3.7 Flash | October 6, 2026 |
| Gemini 2.5 Flash Lite | Gemini 3.5 Flash Lite | October 6, 2026 |
| GPT-5 | GPT-5.6 Sol | December 9, 2026 |
| GPT-5 Mini | GPT-5.6 Terra | December 9, 2026 |
| GPT-5 Nano | GPT-5.6 Luna | December 9, 2026 |

### Image models[​](#image-models "Direct link to Image models")

| Deprecated model | Replacement | Deprecation date |
| --- | --- | --- |
| Nano Banana 🍌 | Nano Banana 2 🍌 | September 30, 2026 |
| GPT Image 1.5 | GPT Image 2 | November 30, 2026 |
