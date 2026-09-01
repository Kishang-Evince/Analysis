---
url: "https://developers.glean.com/errors/resource-not-found"
canonical: "https://developers.glean.com/errors/resource-not-found"
title: "Resource Not Found | Glean Developer"
description: "resource_not_found ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:01.166Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `resource_not_found`
-   `status`: `404`
-   `url`: `https://developers.glean.com/errors/resource-not-found`

## What It Means[​](#what-it-means "Direct link to What It Means")

The requested resource or endpoint could not be found or is not visible to the caller.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The resource identifier is incorrect.
-   The resource exists but the caller does not have access.
-   The endpoint path or HTTP method does not match a supported API operation.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Verify the endpoint path, resource ID, and HTTP method.
-   Treat hidden or unauthorized resources as indistinguishable from missing resources unless the endpoint documentation says otherwise.

### Admin Actions[​](#admin-actions "Direct link to Admin Actions")

-   Confirm the resource exists and that the caller should have access to it.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry only after correcting the resource identifier, endpoint path, or permissions.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/resource-not-found",  "title": "Resource Not Found",  "status": 404,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "resource_not_found",  "documentation_url": "https://developers.glean.com/errors/resource-not-found",  "request_id": "req_7f8a9b0c1d2e"}
```
