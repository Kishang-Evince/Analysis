---
url: "https://developers.glean.com/api/platform-api/platform-skills-list-versions"
canonical: "https://developers.glean.com/api/platform-api/platform-skills-list-versions"
title: "List skill versions | Glean Developer"
description: "List versions for a skill available to the authenticated user."
fetched_at: "2026-09-01T13:22:58.499Z"
---
# List skill versions

GET 

## /api/skills/:skill\_id/versions

experimental

Expect changes and instability. Introduced on June 24, 2026. [Learn how experimental APIs work](/experimental/overview).

List versions for a skill available to the authenticated user.

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
