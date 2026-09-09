---
url: "https://docs.glean.com/connectors/crawling-frequency"
canonical: "https://docs.glean.com/connectors/crawling-frequency"
title: "Crawl strategy"
description: "A comprehensive guide to Glean's crawling system, detailing how it optimizes data retrieval while respecting API limits and source application performance."
fetched_at: "2026-09-01T13:29:18.242Z"
---
The Glean crawling system retrieves and indexes content from source applications. It balances two goals: minimizing the time between a change in the source and its appearance in Glean, and keeping API call volumes within limits that prevent source application overload.

[

### Crawl types

Full, incremental, activity, identity, and people data crawls - what each does and when Glean runs it.







](/connectors/crawling-types)[

### Refresh rates

Default crawl frequencies by connector, organized by category.







](/connectors/crawling-refresh-rates)[

### Deletion handling

How Glean detects and removes deleted content, including webhook-based and full-crawl cleanup.







](/connectors/crawling-deletion)
