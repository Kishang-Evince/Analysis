---
url: "https://developers.glean.com/errors/token-expired"
canonical: "https://developers.glean.com/errors/token-expired"
title: "Token Expired | Glean Developer"
description: "token_expired ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:01.396Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `token_expired`
-   `status`: `401`
-   `url`: `https://developers.glean.com/errors/token-expired`

## What It Means[​](#what-it-means "Direct link to What It Means")

The authentication token was valid but has expired.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   An OAuth access token exceeded its lifetime.
-   A cached token was reused instead of refreshed.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Refresh the token through the configured authentication flow.
-   Update token caching so expired tokens are not reused.

### Admin Actions[​](#admin-actions "Direct link to Admin Actions")

-   Confirm the integration has an active credential configuration.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry after obtaining a fresh token.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/token-expired",  "title": "Token Expired",  "status": 401,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "token_expired",  "documentation_url": "https://developers.glean.com/errors/token-expired",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Authentication Overview](/get-started/authentication)
