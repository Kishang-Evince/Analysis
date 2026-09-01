---
url: "https://developers.glean.com/api/platform-api/platform-agents-search"
canonical: "https://developers.glean.com/api/platform-api/platform-agents-search"
title: "Search agents | Glean Developer"
description: "Search agents available to the authenticated user by agent name."
fetched_at: "2026-09-01T13:22:58.071Z"
---
# Search agents

POST 

## /api/agents/search

Search agents available to the authenticated user by agent name.

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

Successful response.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Request body exceeds the maximum allowed size.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
