---
url: "https://docs.glean.com/administration/insights/llm-insights"
canonical: "https://docs.glean.com/administration/insights/llm-insights"
title: "LLM insights"
description: "Monitor LLM usage and reliability metrics for your customer key deployment."
fetched_at: "2026-09-01T13:29:08.341Z"
---
On this page

Admins can monitor Glean-attributed LLM usage and reliability for customer key (BYOK) deployments using the **Insights → LLM** dashboard. This dashboard displays token throughput, request rates, and error patterns to help you provision capacity and troubleshoot issues.

Use the **LLM** insights dashboard to provision and troubleshoot your LLM setup more confidently with Glean-specific traffic knowledge to avoid under or over-provisioning.

Prerequisite

You must have the Insights Moderator role to access this feature. To learn more about user roles in Glean, see [User roles](/administration/identity/roles/user-roles).

To open the **LLM insights** dashboard, click your profile in the lower-left corner, then select **Insights → LLM**.

note

The LLM insights dashboard is available only for **Customer Key** (BYOK) deployments. If your deployment uses a Glean Universal Model Key, this dashboard is not available. For details on key modes and provider availability, see [Availability by hosting environment and provider](/administration/llms#availability-by-hosting-environment-and-provider).

## Data retention[​](#data-retention "Direct link to Data retention")

The Insights dashboard guarantees data availability for the last 270 days. While historical data beyond this period may be available, Glean cannot guarantee its persistence. Future updates to the Insights dashboard may result in removing data from the dashboard that comes from before the 270-day retention period.

This retention policy applies to all metrics and data displayed in the Insights dashboard.

## Filters and controls[​](#filters-and-controls "Direct link to Filters and controls")

The **LLM** dashboard provides the following filters and controls:

-   **Time period filter** to change the analysis window across all charts and metrics. You can select predefined ranges (**Past week**, **Past month**) or custom date ranges.
-   **Model filter** to focus on specific models or view the top 5 models by usage. You can select up to 5 models at once. Deselect one to choose another.

important

The dashboard updates once daily and reflects the data as of the previous day. Data might be delayed by up to 24 hours. Values reflect estimated Glean-attributed usage only.

## Overview metrics[​](#overview-metrics "Direct link to Overview metrics")

These cards provide a high-level snapshot of LLM usage and reliability in the selected time window.

note

The TPM and RPM values are estimates based on Glean's internal instrumentation. They should be used for trend analysis and capacity planning rather than precise billing calculations. For exact billing data, refer to your provider's invoice.

### Peak TPM[​](#peak-tpm "Direct link to Peak TPM")

**Peak TPM** (Tokens Per Minute) shows the highest token throughput observed in any single minute during the selected window. This metric helps you understand your maximum capacity requirements.

Use this to:

-   Identify peak load periods
-   Make sure your provider quota can handle traffic spikes
-   Plan capacity increases based on actual usage patterns

### Avg TPM[​](#avg-tpm "Direct link to Avg TPM")

**Avg TPM** (Average Tokens Per Minute) shows the average estimated Glean-attributed tokens per minute across the selected window.

Use this to:

-   Understand typical baseline token consumption
-   Compare against your provisioned capacity
-   Estimate ongoing costs based on average load

### Peak RPM[​](#peak-rpm "Direct link to Peak RPM")

**Peak RPM** (Requests Per Minute) shows the highest request rate observed in any single minute during the selected window.

Use this to:

-   Identify maximum request load
-   Make sure your provider quota can handle request spikes
-   Understand request patterns independent of token volume

### 429 rate[​](#429-rate "Direct link to 429 rate")

**429 rate** shows the percentage of requests that returned a 429 error (quota/capacity pressure) in the selected window.

A high 429 rate indicates:

-   Your provisioned TPM or RPM quota is being exceeded
-   Glean is experiencing throttling from your provider
-   Users may see degraded performance or errors

If your 429 rate is elevated, consider increasing your provider quota or reviewing which models are experiencing the most pressure.

### 5xx rate[​](#5xx-rate "Direct link to 5xx rate")

**5xx rate** shows the percentage of requests that returned a 5xx error (provider-side error) in the selected window.

A high 5xx rate indicates:

-   Provider instability or outages
-   Infrastructure issues on the provider side
-   Errors not related to your quota limits

If your 5xx rate is elevated, check your provider status page or contact your provider support.

* * *

## Usage over time[​](#usage-over-time "Direct link to Usage over time")

The **Usage over time** chart visualizes token and request throughput over the selected time period to help you identify trends and spikes.

-   **Avg TPM** toggle shows average estimated Glean-attributed tokens per minute over time, broken down by model
-   **Avg RPM** toggle shows average requests per minute over time, broken down by model
-   Each model displays as a separate colored line in the chart
-   Hover over the chart to see exact values for each model at any point in time

Use this chart to:

-   Spot usage trends and growth patterns
-   Identify specific dates or times with unusual activity
-   Understand which models drive the most traffic
-   Correlate usage spikes with business events or rollouts

* * *

## Error rate monitoring[​](#error-rate-monitoring "Direct link to Error rate monitoring")

### 429 Total count[​](#429-total-count "Direct link to 429 Total count")

**429 Total count** shows the total number of requests that received a 429 error (quota pressure) in the selected window, and the percentage of all requests.

Use this to:

-   Quantify the scale of quota-related throttling
-   Understand how many requests were affected
-   Track improvements after increasing capacity

### 429 error rate chart[​](#429-error-rate-chart "Direct link to 429 error rate chart")

**429 error rate chart** visualizes the percentage of requests returning 429 errors over time, broken down by model.

-   Each model displays as a separate colored line
-   Hover to see exact 429 rate for each model at any point in time
-   Helps identify which models are experiencing the most quota pressure and when

### 5xx Total count[​](#5xx-total-count "Direct link to 5xx Total count")

**5xx Total count** shows the total number of requests that received a 5xx error (provider-side error) in the selected window, and the percentage of all requests.

Use this to:

-   Quantify the scale of provider-related errors
-   Distinguish between quota issues (429s) and provider instability (5xxs)
-   Track provider reliability over time

### 5xx error rate chart[​](#5xx-error-rate-chart "Direct link to 5xx error rate chart")

**5xx error rate chart** visualizes the percentage of requests returning 5xx errors over time, broken down by model.

-   Each model displays as a separate colored line
-   Hover to see exact 5xx rate for each model at any point in time
-   Helps identify provider instability patterns

If no 5xx errors occurred in the selected period, the chart shows "No insights for this time period."

* * *

## Usage breakdown[​](#usage-breakdown "Direct link to Usage breakdown")

The **Usage breakdown** table shows where traffic concentrates across your enabled models. Each row represents a model and includes the following information:

-   **Model name**: The LLM model identifier (for example, CLAUDE\_4\_6\_OPUS\_20260205, GPT5\_4, GEMINI\_3\_1\_PRO)
-   **Peak TPM**: The highest token throughput observed for this model in any single minute
-   **Avg TPM**: Average tokens per minute for this model across the selected window
-   **Avg 429 Rate**: Average percentage of requests for this model that received a 429 error
-   **Avg 5xx Rate**: Average percentage of requests for this model that received a 5xx error
-   **Health status**: Visual indicator showing whether the model is experiencing issues
    -   **Healthy**: Low error rates, performing normally
    -   **High pressure**: Elevated 429 rate, indicating quota pressure

Use this table to:

-   Identify which models are consuming the most capacity
-   Spot models experiencing quota pressure or reliability issues
-   Prioritize capacity increases for high-usage or high-error models
-   Compare performance across different model types or providers

## See also[​](#see-also "Direct link to See also")

-   [Insights overview](/administration/insights/overview)
-   [LLMs](/administration/llms)
