---
url: "https://developers.glean.com/errors/authentication-required"
canonical: "https://developers.glean.com/errors/authentication-required"
title: "Authentication Required | Glean Developer"
description: "authentication_required ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.480Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `authentication_required`
-   `status`: `401`
-   `url`: `https://developers.glean.com/errors/authentication-required`

## What It Means[​](#what-it-means "Direct link to What It Means")

The API request did not include valid authentication credentials.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The `Authorization` header is missing.
-   The token is malformed or not recognized.
-   The request is being sent to the wrong backend domain for the token.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Include a valid bearer token in the `Authorization` header.
-   Confirm the token belongs to the Glean instance receiving the request.

### Admin Actions[​](#admin-actions "Direct link to Admin Actions")

-   Create or rotate API tokens from the appropriate admin console workflow.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry after supplying valid credentials.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/authentication-required",  "title": "Authentication Required",  "status": 401,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "authentication_required",  "documentation_url": "https://developers.glean.com/errors/authentication-required",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Authentication Overview](/get-started/authentication)
