---
url: "https://developers.glean.com/errors/internal-error"
canonical: "https://developers.glean.com/errors/internal-error"
title: "Internal Error | Glean Developer"
description: "internal_error ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.718Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `internal_error`
-   `status`: `500`
-   `url`: `https://developers.glean.com/errors/internal-error`

## What It Means[​](#what-it-means "Direct link to What It Means")

The API encountered an unexpected error while processing the request.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   A transient server-side problem occurred.
-   The request triggered a condition the API could not complete.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Retry once or twice with backoff if the operation is safe to retry.
-   Record the `request_id` for support if the error persists.

### Admin Actions[​](#admin-actions "Direct link to Admin Actions")

-   Share the `request_id`, timestamp, endpoint, and high-level request context with support.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry cautiously with backoff. Do not retry indefinitely.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/internal-error",  "title": "Internal Error",  "status": 500,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "internal_error",  "documentation_url": "https://developers.glean.com/errors/internal-error",  "request_id": "req_7f8a9b0c1d2e"}
```
