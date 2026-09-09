---
url: "https://docs.glean.com/administration/model-exclusion"
canonical: "https://docs.glean.com/administration/model-exclusion"
title: "Exclude or restrict models"
description: "Exclude or restrict specific models for Glean Assistant and Agents"
fetched_at: "2026-09-01T13:29:10.205Z"
---
On this page

You can exclude or restrict large language models (LLMs) to determine which models are available for Glean Assistant and Glean Agents, and who can use them.

When you exclude a model:

-   The model becomes unavailable for selection in the agent builder, Glean Assistant, or both, depending on your configuration.
-   Any agents or steps within an agent that were using the excluded model automatically switch to the default model.

## Exclude models based on your organization's key type[​](#exclude-models-based-on-your-organizations-key-type "Direct link to Exclude models based on your organization's key type")

Glean supports two types of keys: Glean Universal Model Key and Customer Key (BYOK). Depending on the type of key your organization uses, the steps to exclude models and what you can exclude are different.

For both key types, you can exclude individual models with separate controls for Assistant and Agents.

### Glean Universal Model Key[​](#glean-universal-model-key "Direct link to Glean Universal Model Key")

You can turn off individual models and control whether they're available for Assistant, Agents, or across Glean.

To block a model across Glean:

1.  Go to **Admin console → Models**.
2.  On the **Models** page, use the search bar, capability filter, or scroll to find the model you want to block.
3.  For the model you want to block, toggle the model off.
4.  Click **Save** to apply your changes. This blocks the model across Glean.

### Customer Key (BYOK)[​](#customer-key-byok "Direct link to Customer Key (BYOK)")

If your organization uses a Customer Key (BYOK), here's how to block models so that your Glean doesn't use them:

1.  Go to **Admin console → Models**.
2.  Click **Add LLM**.
3.  Select a LLM hosting provider.
4.  In the **Select all models that can be used in agents** section, clear the checkbox next to the model you want to exclude.
5.  Validate the connection.
6.  Click **Save**. This blocks the model across Glean.

### Block a model for Assistant or agents only[​](#block-a-model-for-assistant-or-agents-only "Direct link to Block a model for Assistant or agents only")

These blocklists work the same way for both key types. Blocking a model here affects only the surface you choose and is independent of whether the model is available across Glean.

To block a model for Assistant only:

1.  Go to **Admin console → Assistant → Settings**.
2.  Navigate to the **Blocked models in assistant** section, then click **Manage the blocklist**.
3.  Search for models to add or remove from the blocklist.
4.  Click **Save** to apply your changes. This blocks the model for Assistant only.

To block a model for Agents only:

1.  Go to **Admin console → Agents → Setup**.
2.  Navigate to the **Blocked models in agents** section, then click **Manage the blocklist**.
3.  Search for models to add or remove from the blocklist.
4.  Click **Save** to apply your changes. This blocks the model for Agents only.

## Hide all premium models from model pickers[​](#hide-all-premium-models-from-model-pickers "Direct link to Hide all premium models from model pickers")

If your organization uses a Glean Universal Model Key, you can remove all premium models from the model pickers in Glean Assistant and the agent builder. This may help your organization save costs related to using premium models.

To view a list of premium models, see the **Premium** tier under [Supported models](/administration/llms#supported-models) in LLMs.

tip

Premium models have a **$ Premium** tag next to their names. This tag helps you identify premium models that incur higher costs so you can be mindful about which models you exclude.

Here are the steps to hide all premium models from the model pickers:

1.  Go to **Admin console → Models**.
2.  Click **Advanced settings**.
3.  Toggle off the **Show premium models in model pickers** switch.

This immediately hides premium models from **Assistant model choice** and the **agent builder**. Users can no longer manually select a premium model in those model pickers, and any premium models Glean launches in the future are hidden from the pickers as well.

Toggle on the **Show premium models in model pickers** switch to show premium models in the pickers again.

important

This toggle only controls the model pickers in **Assistant model choice** and the **agent builder**. It does **not** block premium models everywhere in Glean. Automatic model selection (auto mode) can still choose a premium model for certain use cases, such as artifact generation.

To turn off a premium model completely across Glean, go to the **Models** page and exclude that specific model by toggling off its status. See [Glean Universal Model Key](#glean-universal-model-key) for the steps.

## Restrict model access by department[​](#restrict-model-access-by-department "Direct link to Restrict model access by department")

You can restrict any model to one or more departments so that only members of those departments can use it. This works for both Glean Universal Model Key and Customer Key deployments and applies wherever the model is used, including Glean Assistant and Glean Agents.

By default, Glean doesn't restrict models by department. If you don't select any departments for a model, everyone can use it. Department restrictions layer on top of the existing model controls - you still have to turn the model on (Glean Universal Model Key) or configure it (Customer Key) before the restriction takes effect.

Glean determines department membership from your synced people data. To learn how to populate the **Department** field for your users, see [Sync people data](/get-started/setup/sync-people-data).

To restrict a model to specific departments:

-   Glean Universal Model Key
-   Customer Key (BYOK)

1.  Go to **Admin console → Models**.
2.  Make sure the model is turned on.
3.  In the **Departments** column for that model, open the selector and choose one or more departments. Leave the selector empty to keep the model available to everyone.
4.  Click **Save** to apply your changes.

1.  Go to **Admin console → Models**.
2.  Click **Add LLM**, select the hosting provider, and continue to the model selection step.
3.  Make sure the model is selected.
4.  In the **Departments** column for that model, open the selector and choose one or more departments. Leave the selector empty to keep the model available to everyone.
5.  Click **Save** to apply your changes.

The **Departments** column shows **All departments** when a model isn't restricted, or a count of allowed departments otherwise. Hover the count to see the full list.
