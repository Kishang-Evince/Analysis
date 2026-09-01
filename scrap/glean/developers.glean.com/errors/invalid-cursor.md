---
url: "https://developers.glean.com/errors/invalid-cursor"
canonical: "https://developers.glean.com/errors/invalid-cursor"
title: "Invalid Pagination Cursor | Glean Developer"
description: "invalid_cursor ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.680Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `invalid_cursor`
-   `status`: `400`
-   `url`: `https://developers.glean.com/errors/invalid-cursor`

## What It Means[​](#what-it-means "Direct link to What It Means")

The pagination cursor cannot be used for this request.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The cursor is malformed, truncated, or copied incorrectly.
-   The cursor came from a different endpoint, query, or request shape.
-   The client changed pagination-related inputs between requests.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Use cursors only with the same endpoint and request shape that returned them.
-   Start a new request and use the fresh cursor returned in that response.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Do not retry with the same cursor. Start pagination again.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/invalid-cursor",  "title": "Invalid Pagination Cursor",  "status": 400,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "invalid_cursor",  "documentation_url": "https://developers.glean.com/errors/invalid-cursor",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Platform Search API](/api/platform-api/search-overview)
