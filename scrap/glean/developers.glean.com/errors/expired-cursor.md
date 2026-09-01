---
url: "https://developers.glean.com/errors/expired-cursor"
canonical: "https://developers.glean.com/errors/expired-cursor"
title: "Expired Pagination Cursor | Glean Developer"
description: "expired_cursor ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.515Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `expired_cursor`
-   `status`: `400`
-   `url`: `https://developers.glean.com/errors/expired-cursor`

## What It Means[​](#what-it-means "Direct link to What It Means")

The pagination cursor was valid previously but is no longer usable.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The cursor was stored and reused after its validity window ended.
-   The underlying result set changed enough that the cursor can no longer continue.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Start a new search or list request and continue from the new cursor.
-   Avoid persisting cursors as long-lived bookmarks.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retrying with the expired cursor will fail. Retry from a fresh first page.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/expired-cursor",  "title": "Expired Pagination Cursor",  "status": 400,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "expired_cursor",  "documentation_url": "https://developers.glean.com/errors/expired-cursor",  "request_id": "req_7f8a9b0c1d2e"}
```
