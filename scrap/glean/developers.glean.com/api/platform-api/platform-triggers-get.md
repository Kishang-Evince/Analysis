---
url: "https://developers.glean.com/api/platform-api/platform-triggers-get"
canonical: "https://developers.glean.com/api/platform-api/platform-triggers-get"
title: "Get trigger | Glean Developer"
description: "Retrieve a trigger owned by the authenticated caller."
fetched_at: "2026-09-01T13:22:59.120Z"
---
# Get trigger

GET 

## /api/triggers/:trigger\_id

experimental

Expect changes and instability. Introduced on July 6, 2026. [Learn how experimental APIs work](/experimental/overview).

Retrieve a trigger owned by the authenticated caller.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   404
-   408
-   429
-   500
-   503

Successful response.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
