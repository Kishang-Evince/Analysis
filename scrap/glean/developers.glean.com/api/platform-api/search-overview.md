---
url: "https://developers.glean.com/api/platform-api/search-overview"
canonical: "https://developers.glean.com/api/platform-api/search-overview"
title: "Search API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:59.132Z"
---
The Platform Search API returns relevant results from across your organization's connected content, with support for filters and time ranges. Use it to power search experiences built on Glean's unified index.

## Use Cases

### Enterprise Search

Query across all connected datasources to surface the most relevant documents, messages, and records for a user.

### Filtered Retrieval

Apply filters and time ranges to scope results to specific datasources, owners, or recency windows.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/api/search`](/api/platform-api/platform-search) | [Search](/api/platform-api/platform-search) |
| GET | [`/api/search/filters`](/api/platform-api/platform-search-filters) | [List search filters](/api/platform-api/platform-search-filters) |

For error responses, see [Platform API Errors](/errors) for the shared ProblemDetail code reference and remediation guidance.
