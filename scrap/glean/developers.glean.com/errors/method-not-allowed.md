---
url: "https://developers.glean.com/errors/method-not-allowed"
canonical: "https://developers.glean.com/errors/method-not-allowed"
title: "Method Not Allowed | Glean Developer"
description: "method_not_allowed ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.925Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `method_not_allowed`
-   `status`: `405`
-   `url`: `https://developers.glean.com/errors/method-not-allowed`

## What It Means[​](#what-it-means "Direct link to What It Means")

The endpoint exists but does not support the HTTP method used by the request.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The request uses `GET`, `POST`, `PUT`, `PATCH`, or `DELETE` incorrectly for the endpoint.
-   A client or proxy rewrote the method before forwarding the request.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Use the HTTP method documented for the endpoint.
-   Confirm any proxy or API client preserves the intended method.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry with the supported method.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/method-not-allowed",  "title": "Method Not Allowed",  "status": 405,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "method_not_allowed",  "documentation_url": "https://developers.glean.com/errors/method-not-allowed",  "request_id": "req_7f8a9b0c1d2e"}
```
