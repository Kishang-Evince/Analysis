---
url: "https://developers.glean.com/errors/unprocessable-query"
canonical: "https://developers.glean.com/errors/unprocessable-query"
title: "Unprocessable Query | Glean Developer"
description: "unprocessable_query ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:01.329Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `unprocessable_query`
-   `status`: `422`
-   `url`: `https://developers.glean.com/errors/unprocessable-query`

## What It Means[​](#what-it-means "Direct link to What It Means")

The API understood the request shape but could not process the query semantics.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The query is unsupported, ambiguous, or cannot be translated for the endpoint.
-   Query-related options conflict with each other.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Simplify or rewrite the query.
-   Check endpoint documentation for supported query features.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry only after changing the query.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/unprocessable-query",  "title": "Unprocessable Query",  "status": 422,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "unprocessable_query",  "documentation_url": "https://developers.glean.com/errors/unprocessable-query",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Platform Search API](/api/platform-api/search-overview)
