---
url: "https://docs.glean.com/administration/assistant/features/engine-pricing"
canonical: "https://docs.glean.com/administration/assistant/features/engine-pricing"
title: "Agentic Engine V2 Token Consumption"
description: "Learn about Agentic Engine V2's impact on token consumption and pricing"
fetched_at: "2026-09-01T13:29:00.188Z"
---
On this page

Upgrading to Agentic Engine V2 changes both the underlying model (from GPT-4.1 to GPT-5) and token consumption patterns. This document presents testing data that estimates the pricing implications of this upgrade.

Among our beta customers, we saw a reduction in token usage equivalent to a $0.05 reduction (-39%) in cost per query after upgrading to Agentic Engine V2. This was driven by reduced token costs for GPT-5 as well as the use of cached input tokens.

### Methodology and Considerations[​](#methodology-and-considerations "Direct link to Methodology and Considerations")

We estimate Agentic Engine V2's impact on token consumption by comparing the per query token usage for our beta customers before and after upgrading from Agentic Engine v1.

Comparisons on token impact are done at the median and average. When considering these estimates, note token consumption is dependent on the complexity of user queries as well as the company corpus of documents as well as the split between fast and thinking mode. In testing we saw usage of GleanChat heavily skewed toward Thinking Mode.

Assumptions:

-   Cost is determined strictly by token count.
-   Cached prompts are cheaper than full prompts.
-   Baseline estimates given by Agentic Engine v1 using GPT 4.1

### Input and Cached Token Usage[​](#input-and-cached-token-usage "Direct link to Input and Cached Token Usage")

The tables below show per query median and average input, cached input, and net input token usage on Agentic Engine V2's fast and thinking modes, compared to Agentic Engine v1. Net input token counts are calculated by subtracting $0.9\*cached$ input tokens from the full input + cached tokens to reflect the effective cost basis, assuming a 90% discount.

-   Full input + cached token use
-   Cached input token use
-   Net input token use
-   Net input token delta

| Metric | Fast | Thinking | Agentic Engine v1 |
| --- | --- | --- | --- |
| Median | 10.3k | 34.9k | 16.7k |
| Average | 18.9k | 70.7k | 58.6k |

| Metric | Fast | Thinking | Agentic Engine v1 |
| --- | --- | --- | --- |
| Median | 6.0k | 11.3k | N/A |
| Average | 7.3k | 28.0k | N/A |

note

Agentic Engine v1 does not support cached input tokens.

| Metric | Fast | Thinking | Agentic Engine v1 |
| --- | --- | --- | --- |
| Median | 4.9k | 24.8k | 16.7k |
| Average | 12.3k | 45.5k | 58.6k |

Delta in net input tokens between Agentic Engine V2's fast and thinking modes and Agentic Engine v1.

| Metric | Fast | Thinking |
| --- | --- | --- |
| Median | \-11.8k | +8.1k |
| Average | \-46.3k | \-13.1k |

### Output token use[​](#output-token-use "Direct link to Output token use")

The tables below show per query median and average output token usage on Agentic Engine V2's fast and thinking modes, compared to Agentic Engine v1.

-   Output token use
-   Output token delta

| Metric | Fast | Thinking | Agentic Engine v1 |
| --- | --- | --- | --- |
| Median | 0.5k | 3.6k | 1.1k |
| Average | 0.7k | 2.9k | 0.9k |

| Metric | Fast | Thinking |
| --- | --- | --- |
| Median | \-100 | +2.5k |
| Average | \-250 | +1.9k |

### Per query cost implications[​](#per-query-cost-implications "Direct link to Per query cost implications")

This table shows per query deltas between Agentic Engine V2's fast and thinking modes and Agentic Engine v1. To compute a one number query cost estimate between fast and thinking mode we take a weighted average, assuming 95% of query traffic go to thinking mode. On net we see a $0.05 per query cost reduction after upgrading to Agentic Engine V2, benefitting from cached input tokens and overall cheaper per token costs for GPT-5 v. GPT 4.1.

| Metric | Input token delta | Output token delta | Total cost delta |
| --- | --- | --- | --- |
| Median | 7.1k | 1.9k | +$0.01 |
| Average | \-13.1k | +1.8k | \-$0.05 |
