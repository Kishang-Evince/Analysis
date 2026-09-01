---
url: "https://developers.glean.com/api/platform-api/platform-trigger-presets-get"
canonical: "https://developers.glean.com/api/platform-api/platform-trigger-presets-get"
title: "Get trigger preset | Glean Developer"
description: "Retrieve a single trigger preset by id."
fetched_at: "2026-09-01T13:22:58.702Z"
---
# Get trigger preset

GET 

## /api/trigger-presets/:preset\_id

experimental

Expect changes and instability. Introduced on July 22, 2026. [Learn how experimental APIs work](/experimental/overview).

Retrieve a single trigger preset by id.

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
