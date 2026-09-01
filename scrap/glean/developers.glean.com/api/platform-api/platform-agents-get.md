---
url: "https://developers.glean.com/api/platform-api/platform-agents-get"
canonical: "https://developers.glean.com/api/platform-api/platform-agents-get"
title: "Get agent | Glean Developer"
description: "Retrieve details for an agent available to the authenticated user."
fetched_at: "2026-09-01T13:22:57.865Z"
---
# Get agent

GET 

## /api/agents/:agent\_id

Retrieve details for an agent available to the authenticated user.

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
