---
url: "https://developers.glean.com/errors/request-timeout"
canonical: "https://developers.glean.com/errors/request-timeout"
title: "Request Timeout | Glean Developer"
description: "request_timeout ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:01.121Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `request_timeout`
-   `status`: `408`
-   `url`: `https://developers.glean.com/errors/request-timeout`

## What It Means[​](#what-it-means "Direct link to What It Means")

The server timed out while processing the request.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The request is too broad or expensive to complete within the timeout window.
-   A transient service or network delay occurred.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Narrow the request when possible.
-   Use pagination or smaller batches for large operations.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

A retry may succeed if the timeout was transient. Use bounded retries with backoff.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/request-timeout",  "title": "Request Timeout",  "status": 408,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "request_timeout",  "documentation_url": "https://developers.glean.com/errors/request-timeout",  "request_id": "req_7f8a9b0c1d2e"}
```
