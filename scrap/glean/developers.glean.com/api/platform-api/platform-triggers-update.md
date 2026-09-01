---
url: "https://developers.glean.com/api/platform-api/platform-triggers-update"
canonical: "https://developers.glean.com/api/platform-api/platform-triggers-update"
title: "Update trigger | Glean Developer"
description: "Update a trigger."
fetched_at: "2026-09-01T13:22:59.105Z"
---
# Update trigger

PATCH 

## /api/triggers/:trigger\_id

experimental

Expect changes and instability. Introduced on July 6, 2026. [Learn how experimental APIs work](/experimental/overview).

Update a trigger.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   404
-   408
-   413
-   429
-   500
-   503

Trigger updated.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Request body exceeds the maximum allowed size.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
