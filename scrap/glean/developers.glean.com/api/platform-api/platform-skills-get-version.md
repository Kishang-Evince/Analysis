---
url: "https://developers.glean.com/api/platform-api/platform-skills-get-version"
canonical: "https://developers.glean.com/api/platform-api/platform-skills-get-version"
title: "Retrieve skill version | Glean Developer"
description: "Retrieve metadata for a skill version available to the authenticated user."
fetched_at: "2026-09-01T13:22:58.274Z"
---
# Retrieve skill version

GET 

## /api/skills/:skill\_id/versions/:version

experimental

Expect changes and instability. Introduced on June 24, 2026. [Learn how experimental APIs work](/experimental/overview).

Retrieve metadata for a skill version available to the authenticated user.

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
