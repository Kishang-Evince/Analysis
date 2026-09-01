---
url: "https://developers.glean.com/api/platform-api/platform-skills-preview-source"
canonical: "https://developers.glean.com/api/platform-api/platform-skills-preview-source"
title: "Preview a GitHub skill source | Glean Developer"
description: "Inspect a GitHub URL without persisting a source or any discovered skills. Set stream to true to receive repository scan progress as server-sent events; otherwise the response contains the completed preview."
fetched_at: "2026-09-01T13:22:58.518Z"
---
# Preview a GitHub skill source

POST 

## /api/skills/sources/preview

experimental

Expect changes and instability. Introduced on July 23, 2026. [Learn how experimental APIs work](/experimental/overview).

Inspect a GitHub URL without persisting a source or any discovered skills. Set stream to true to receive repository scan progress as server-sent events; otherwise the response contains the completed preview.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   408
-   413
-   429
-   500
-   503

Successful response.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Backend did not respond within the timeout window.

Request body exceeds the maximum allowed size.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
