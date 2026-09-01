---
url: "https://developers.glean.com/api-info/client/getting-started/overview"
canonical: "https://developers.glean.com/api-info/client/getting-started/overview"
title: "Client API Quickstart | Glean Developer"
description: "Make your first permission-aware Client API request."
fetched_at: "2026-09-01T13:22:50.199Z"
---
On this page

Make a permission-aware search request with the Client API. This is the shortest path from a credential to a successful response; use the [Client API overview](/api/client-api) to choose other capabilities.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

1

Find your API URL

If automatic discovery is unavailable, ask a Glean admin for the complete **Server instance (QE)** value. Glean admins can copy it from the [About Glean page](https://app.glean.com/admin/about-glean).

2

Configure authentication

Configure OAuth or a user-scoped Glean-issued token with the [Client API authentication guide](/api-info/client/authentication/overview).

3

Choose a test query

Use a query that should return content the authenticated user can access.

## Make your first request[​](#make-your-first-request "Direct link to Make your first request")

Replace `<your_token>` and any placeholder API URL, then run the request:

```
curl -X POST https://your-instance-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "query": "quarterly planning",    "pageSize": 10,    "requestOptions": {      "datasourcesFilter": ["confluence", "gdrive"],      "facetBucketSize": 100    }  }'
```

A successful response contains a `results` array with documents the authenticated user is allowed to see. An empty `results` array is still a successful request; try a broader query or confirm that the user can access matching content.

See the [Search API reference](/api/client-api/search/overview) for request parameters and the complete response model.

## Next steps[​](#next-steps "Direct link to Next steps")

[

### Authentication

Review Client API credential types and user context.







](/api-info/client/authentication/overview)[

### Usage Guide

Explore Chat, Search, Agents, and common integration patterns.







](/api-info/client/getting-started/basic-usage)[

### API Reference

Browse Client API endpoints by capability.







](/api/client-api#client-api-reference)
