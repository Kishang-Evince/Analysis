---
url: "https://developers.glean.com/api/platform-api/platform-skills-import"
canonical: "https://developers.glean.com/api/platform-api/platform-skills-import"
title: "Import skills from GitHub | Glean Developer"
description: "Import one or more skills selected from a GitHub source preview. Each source URL is fetched and persisted as an independent skill with source provenance. This operation does not create a durable source resource. The import is atomic: if any source cannot be fetched, validated, or persisted, no skills are created."
fetched_at: "2026-09-01T13:22:58.475Z"
---
# Import skills from GitHub

POST 

## /api/skills/import

experimental

Expect changes and instability. Introduced on July 28, 2026. [Learn how experimental APIs work](/experimental/overview).

Import one or more skills selected from a GitHub source preview. Each source URL is fetched and persisted as an independent skill with source provenance. This operation does not create a durable source resource. The import is atomic: if any source cannot be fetched, validated, or persisted, no skills are created.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   408
-   409
-   413
-   429
-   500
-   503

Skills imported successfully.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Backend did not respond within the timeout window.

Request conflicts with current state of the resource.

Request body exceeds the maximum allowed size.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
