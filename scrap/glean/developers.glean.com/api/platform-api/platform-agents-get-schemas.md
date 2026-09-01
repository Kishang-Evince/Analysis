---
url: "https://developers.glean.com/api/platform-api/platform-agents-get-schemas"
canonical: "https://developers.glean.com/api/platform-api/platform-agents-get-schemas"
title: "Get agent schemas | Glean Developer"
description: "Retrieve an agent's input and output JSON schemas."
fetched_at: "2026-09-01T13:22:57.881Z"
---
# Get agent schemas

GET 

## /api/agents/:agent\_id/schemas

Retrieve an agent's input and output JSON schemas.

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
