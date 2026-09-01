---
url: "https://developers.glean.com/api/platform-api/platform-search-filters"
canonical: "https://developers.glean.com/api/platform-api/platform-search-filters"
title: "List search filters | Glean Developer"
description: "List datasources and common built-in filter fields visible to the authenticated user. This is a best-effort catalog, not an exhaustive list of every filter search accepts."
fetched_at: "2026-09-01T13:22:58.056Z"
---
# List search filters

GET 

## /api/search/filters

experimental

Expect changes and instability. Introduced on May 12, 2026. [Learn how experimental APIs work](/experimental/overview).

List datasources and common built-in filter fields visible to the authenticated user. This is a best-effort catalog, not an exhaustive list of every filter search accepts. Without `query`, returns field metadata only and does not run a search. With a nonblank `query`, provide exactly one `datasources` value to request suggested filter values for that query; no documents are returned and this endpoint does not include warning objects. See `FilterFieldInfo.values` for limitations on suggested values. Rate-limited requests return HTTP 429 with `Retry-After`; temporary backend unavailability returns HTTP 503.

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

**Response Headers**

**Cache-Control**

Present as `no-store` for query-backed discovery responses. Catalog-only responses omit this endpoint-specific override.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
