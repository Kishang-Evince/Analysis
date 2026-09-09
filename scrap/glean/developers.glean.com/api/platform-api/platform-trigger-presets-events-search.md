---
url: "https://developers.glean.com/api/platform-api/platform-trigger-presets-events-search"
canonical: "https://developers.glean.com/api/platform-api/platform-trigger-presets-events-search"
title: "Search events for a trigger preset | Glean Developer"
description: "Search recent content events an unsaved trigger built from this preset would match, to preview it before creating the trigger. Read-only - no trigger is created and no webhook delivery is made. Covers the last seven days."
fetched_at: "2026-09-01T13:22:58.659Z"
---
# Search events for a trigger preset

POST 

## /api/trigger-presets/:preset\_id/events/search

experimental

Expect changes and instability. Introduced on August 12, 2026. [Learn how experimental APIs work](/experimental/overview).

Search recent content events an unsaved trigger built from this preset would match, to preview it before creating the trigger. Read-only - no trigger is created and no webhook delivery is made. Covers the last seven days.

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
