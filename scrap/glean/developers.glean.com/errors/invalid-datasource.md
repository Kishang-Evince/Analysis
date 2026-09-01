---
url: "https://developers.glean.com/errors/invalid-datasource"
canonical: "https://developers.glean.com/errors/invalid-datasource"
title: "Invalid Datasource | Glean Developer"
description: "invalid_datasource ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.760Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `invalid_datasource`
-   `status`: `400`
-   `url`: `https://developers.glean.com/errors/invalid-datasource`

## What It Means[​](#what-it-means "Direct link to What It Means")

The requested datasource scope is unknown, inaccessible, or not valid for the operation.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The datasource type or instance name is misspelled.
-   The caller does not have access to the datasource.
-   The request combines datasource scopes that the endpoint cannot process together.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Verify datasource identifiers against the integration configuration.
-   Remove inaccessible or unsupported datasource scopes.

### Admin Actions[​](#admin-actions "Direct link to Admin Actions")

-   Confirm the datasource is connected and visible to the integration.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry only after correcting the datasource scope or access.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/invalid-datasource",  "title": "Invalid Datasource",  "status": 400,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "invalid_datasource",  "documentation_url": "https://developers.glean.com/errors/invalid-datasource",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Platform Search API](/api/platform-api/search-overview)
