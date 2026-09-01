---
url: "https://developers.glean.com/api/platform-api/platform-trigger-presets-input-values-list"
canonical: "https://developers.glean.com/api/platform-api/platform-trigger-presets-input-values-list"
title: "Search trigger preset input values | Glean Developer"
description: "Return up to 300 selectable values for a single picklist input on a preset. Results are intended for typeahead selection and are not cursor-paginated. When `is_truncated` is true, refine `query` to narrow the result set."
fetched_at: "2026-09-01T13:22:58.952Z"
---
# Search trigger preset input values

GET 

## /api/trigger-presets/:preset\_id/input-values

experimental

Expect changes and instability. Introduced on August 6, 2026. [Learn how experimental APIs work](/experimental/overview).

Return up to 300 selectable values for a single picklist input on a preset. Results are intended for typeahead selection and are not cursor-paginated. When `is_truncated` is true, refine `query` to narrow the result set.

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
