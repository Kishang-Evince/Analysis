---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/cost-usage-monitoring"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/cost-usage-monitoring"
title: "Cost and usage monitoring"
description: "Understand costs and monitor usage of Glean in Slack."
fetched_at: "2026-09-01T13:29:11.541Z"
---
On this page

This page covers cost considerations and usage monitoring for Glean in Slack.

## LLM cost considerations[​](#llm-cost-considerations "Direct link to LLM cost considerations")

Glean in Slack uses the Glean Assistant and generative AI to answer questions, summarize content, and generate responses in channels.

-   **Glean's Azure OpenAI key:** If you are using [Glean's Azure OpenAI key](/administration/llms), there is no additional cost for Glean in Slack.
-   **Bring your own key (BYOK):** If you are using your own key, turning on automatic answers in channels incurs cost. Work with Glean sales or customer success to get an estimated range of the cost, depending on the number of channels you enable.

## Usage monitoring[​](#usage-monitoring "Direct link to Usage monitoring")

Monitor how your organization uses Glean in Slack through Glean Insights:

-   Click your profile in the lower-left corner and select **Insights** to view usage metrics for Glean Assistant, which includes Slack interactions.
-   Track the number of queries answered, channels active, and user engagement to understand adoption trends.
-   Use these insights to identify which channels benefit most from Glean and where to expand or adjust coverage.

## Best practices for cost management[​](#best-practices-for-cost-management "Direct link to Best practices for cost management")

-   **Start with targeted channels:** Enable Glean in a limited set of high-value channels first, then expand as you assess cost and value.
-   **Use confidence thresholds:** By default, Glean responds only when it has a confident answer. Keeping this default reduces unnecessary LLM calls and associated costs.
-   **Monitor response frequency:** Use `/glean configure` in specific channels to tune how often Glean responds. Reducing response frequency in low-value channels helps manage costs.
-   **Review usage regularly:** Check Insights periodically to identify channels with high usage and low engagement, and adjust settings accordingly.
