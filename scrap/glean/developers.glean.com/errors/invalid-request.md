---
url: "https://developers.glean.com/errors/invalid-request"
canonical: "https://developers.glean.com/errors/invalid-request"
title: "Invalid Request | Glean Developer"
description: "invalid_request ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.901Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `invalid_request`
-   `status`: `400`
-   `url`: `https://developers.glean.com/errors/invalid-request`

## What It Means[​](#what-it-means "Direct link to What It Means")

The request could not be processed because the payload, parameters, or request structure is invalid.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The JSON body is malformed or does not match the endpoint schema.
-   Query parameters or request headers use unsupported values.
-   The request combines fields that cannot be used together.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Compare the request against the endpoint documentation and schema.
-   Check the response `detail` field for request-specific guidance.
-   Remove unsupported fields or combinations before retrying.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retrying the same request will not help. Retry only after changing the request.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/invalid-request",  "title": "Invalid Request",  "status": 400,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "invalid_request",  "documentation_url": "https://developers.glean.com/errors/invalid-request",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Platform Search API](/api/platform-api/search-overview)
