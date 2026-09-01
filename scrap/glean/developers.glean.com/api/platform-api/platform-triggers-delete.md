---
url: "https://developers.glean.com/api/platform-api/platform-triggers-delete"
canonical: "https://developers.glean.com/api/platform-api/platform-triggers-delete"
title: "Delete trigger | Glean Developer"
description: "Delete a trigger."
fetched_at: "2026-09-01T13:22:58.939Z"
---
# Delete trigger

DELETE 

## /api/triggers/:trigger\_id

experimental

Expect changes and instability. Introduced on July 6, 2026. [Learn how experimental APIs work](/experimental/overview).

Delete a trigger.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   204
-   400
-   401
-   403
-   404
-   408
-   429
-   500
-   503

Trigger deleted. No content.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
