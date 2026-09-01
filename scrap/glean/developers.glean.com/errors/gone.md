---
url: "https://developers.glean.com/errors/gone"
canonical: "https://developers.glean.com/errors/gone"
title: "Gone | Glean Developer"
description: "gone ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.537Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `gone`
-   `status`: `410`
-   `url`: `https://developers.glean.com/errors/gone`

## What It Means[​](#what-it-means "Direct link to What It Means")

The resource or operation is no longer available.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The resource was deleted.
-   The operation targets an expired or retired object.
-   The endpoint no longer supports the requested workflow.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Stop using the stale resource or workflow.
-   Create a new resource or switch to the replacement documented by the endpoint.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Do not retry the same request unless the resource is recreated or the workflow changes.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/gone",  "title": "Gone",  "status": 410,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "gone",  "documentation_url": "https://developers.glean.com/errors/gone",  "request_id": "req_7f8a9b0c1d2e"}
```
