---
url: "https://developers.glean.com/api/platform-api/platform-skills-create-version"
canonical: "https://developers.glean.com/api/platform-api/platform-skills-create-version"
title: "Create skill version | Glean Developer"
description: "Create a new immutable version for an existing caller-managed skill from an uploaded SKILL.md, .zip, or .skill bundle."
fetched_at: "2026-09-01T13:22:58.258Z"
---
# Create skill version

POST 

## /api/skills/:skill\_id/versions

experimental

Expect changes and instability. Introduced on June 24, 2026. [Learn how experimental APIs work](/experimental/overview).

Create a new immutable version for an existing caller-managed skill from an uploaded SKILL.md, .zip, or .skill bundle.

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
