---
url: "https://developers.glean.com/api/platform-api/platform-skills-update"
canonical: "https://developers.glean.com/api/platform-api/platform-skills-update"
title: "Update skill | Glean Developer"
description: "Update mutable metadata for a skill. V1 supports enabling or disabling a skill without changing its content."
fetched_at: "2026-09-01T13:22:58.716Z"
---
# Update skill

PATCH 

## /api/skills/:skill\_id

experimental

Expect changes and instability. Introduced on July 20, 2026. [Learn how experimental APIs work](/experimental/overview).

Update mutable metadata for a skill. V1 supports enabling or disabling a skill without changing its content.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   404
-   408
-   409
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

Request conflicts with current state of the resource.

Request body exceeds the maximum allowed size.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
