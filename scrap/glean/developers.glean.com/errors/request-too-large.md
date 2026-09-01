---
url: "https://developers.glean.com/errors/request-too-large"
canonical: "https://developers.glean.com/errors/request-too-large"
title: "Request Too Large | Glean Developer"
description: "request_too_large ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:01.138Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `request_too_large`
-   `status`: `413`
-   `url`: `https://developers.glean.com/errors/request-too-large`

## What It Means[​](#what-it-means "Direct link to What It Means")

The request body is larger than the API accepts.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   A batch contains too many items.
-   A field contains unexpectedly large text or metadata.
-   The client is sending unnecessary data.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Reduce the payload size.
-   Split large batches into smaller requests.
-   Remove fields the endpoint does not require.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry only after reducing the request size.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/request-too-large",  "title": "Request Too Large",  "status": 413,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "request_too_large",  "documentation_url": "https://developers.glean.com/errors/request-too-large",  "request_id": "req_7f8a9b0c1d2e"}
```
