---
url: "https://developers.glean.com/errors/service-unavailable"
canonical: "https://developers.glean.com/errors/service-unavailable"
title: "Service Unavailable | Glean Developer"
description: "service_unavailable ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:01.101Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `service_unavailable`
-   `status`: `503`
-   `url`: `https://developers.glean.com/errors/service-unavailable`

## What It Means[​](#what-it-means "Direct link to What It Means")

The API is temporarily unable to serve the request.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   A transient availability issue is affecting the request.
-   The service is overloaded or temporarily unavailable.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Retry with backoff.
-   Keep retries bounded so clients do not amplify service load.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry with exponential backoff and jitter. Escalate if the issue persists.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/service-unavailable",  "title": "Service Unavailable",  "status": 503,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "service_unavailable",  "documentation_url": "https://developers.glean.com/errors/service-unavailable",  "request_id": "req_7f8a9b0c1d2e"}
```
