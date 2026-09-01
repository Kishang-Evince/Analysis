---
url: "https://developers.glean.com/api/platform-api/platform-triggers-list"
canonical: "https://developers.glean.com/api/platform-api/platform-triggers-list"
title: "List triggers | Glean Developer"
description: "List triggers owned by the authenticated caller."
fetched_at: "2026-09-01T13:22:59.089Z"
---
# List triggers

GET 

## /api/triggers

experimental

Expect changes and instability. Introduced on July 6, 2026. [Learn how experimental APIs work](/experimental/overview).

List triggers owned by the authenticated caller.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   408
-   429
-   500
-   503

Successful response.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Backend did not respond within the timeout window.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
