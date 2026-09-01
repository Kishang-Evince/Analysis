---
url: "https://developers.glean.com/errors/rate-limit-exceeded"
canonical: "https://developers.glean.com/errors/rate-limit-exceeded"
title: "Rate Limit Exceeded | Glean Developer"
description: "rate_limit_exceeded ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.912Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `rate_limit_exceeded`
-   `status`: `429`
-   `url`: `https://developers.glean.com/errors/rate-limit-exceeded`

## What It Means[​](#what-it-means "Direct link to What It Means")

The caller has sent too many requests in a time window.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The integration is sending bursts without throttling.
-   Multiple workers are sharing the same token or tenant limit.
-   Automatic retries are amplifying traffic.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Back off before retrying.
-   Add client-side throttling and jitter.
-   Avoid retry loops that ignore rate-limit responses.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry after waiting. Use exponential backoff with jitter.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/rate-limit-exceeded",  "title": "Rate Limit Exceeded",  "status": 429,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "rate_limit_exceeded",  "documentation_url": "https://developers.glean.com/errors/rate-limit-exceeded",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Rate Limits](/get-started/rate-limits)
