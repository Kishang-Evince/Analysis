---
url: "https://developers.glean.com/api/platform-api/platform-skills-validate"
canonical: "https://developers.glean.com/api/platform-api/platform-skills-validate"
title: "Validate skill bundle | Glean Developer"
description: "Validate a skill bundle without persisting it. Accepts a SKILL.md, .zip, or .skill upload and returns parsed metadata plus the normalized file layout."
fetched_at: "2026-09-01T13:22:58.692Z"
---
# Validate skill bundle

POST 

## /api/skills/validation

experimental

Expect changes and instability. Introduced on June 24, 2026. [Learn how experimental APIs work](/experimental/overview).

Validate a skill bundle without persisting it. Accepts a SKILL.md, .zip, or .skill upload and returns parsed metadata plus the normalized file layout.

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
