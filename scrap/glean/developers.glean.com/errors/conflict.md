---
url: "https://developers.glean.com/errors/conflict"
canonical: "https://developers.glean.com/errors/conflict"
title: "Conflict | Glean Developer"
description: "conflict ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.495Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `conflict`
-   `status`: `409`
-   `url`: `https://developers.glean.com/errors/conflict`

## What It Means[​](#what-it-means "Direct link to What It Means")

The request conflicts with the current state of the resource.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The resource already exists.
-   The requested update is stale or conflicts with another change.
-   The operation cannot be completed while the resource is in its current state.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Fetch the latest resource state before retrying the change.
-   Adjust the request so it no longer conflicts with existing data.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retrying unchanged may continue to fail. Retry after reconciling state.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/conflict",  "title": "Conflict",  "status": 409,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "conflict",  "documentation_url": "https://developers.glean.com/errors/conflict",  "request_id": "req_7f8a9b0c1d2e"}
```
