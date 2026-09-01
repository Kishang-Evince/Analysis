---
url: "https://developers.glean.com/errors/insufficient-permissions"
canonical: "https://developers.glean.com/errors/insufficient-permissions"
title: "Insufficient Permissions | Glean Developer"
description: "insufficient_permissions ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.738Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `insufficient_permissions`
-   `status`: `403`
-   `url`: `https://developers.glean.com/errors/insufficient-permissions`

## What It Means[​](#what-it-means "Direct link to What It Means")

The caller is authenticated but is not allowed to perform the requested operation.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The token lacks the required scopes or permissions.
-   The authenticated user or app cannot access the requested resource.
-   The resource is intentionally hidden from callers without access.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Check that the integration is using the intended token and scopes.
-   Use the response `detail` and endpoint documentation to identify required access.

### Admin Actions[​](#admin-actions "Direct link to Admin Actions")

-   Grant the needed permissions or use a token associated with an authorized principal.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry only after permissions or scopes have been corrected.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/insufficient-permissions",  "title": "Insufficient Permissions",  "status": 403,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "insufficient_permissions",  "documentation_url": "https://developers.glean.com/errors/insufficient-permissions",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Authentication Overview](/get-started/authentication)
