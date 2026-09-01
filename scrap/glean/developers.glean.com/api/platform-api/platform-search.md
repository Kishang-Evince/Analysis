---
url: "https://developers.glean.com/api/platform-api/platform-search"
canonical: "https://developers.glean.com/api/platform-api/platform-search"
title: "Search | Glean Developer"
description: "Search your organization's connected content and return ranked document results with cursor pagination. Use `GET /api/search/filters` to discover datasource identifiers and common filter fields. Built-in filter names are validated; other field names are accepted as custom filters and behavior depends on your Glean configuration and connected sources."
fetched_at: "2026-09-01T13:22:58.102Z"
---
# Search

POST 

## /api/search

experimental

Expect changes and instability. Introduced on April 8, 2026. [Learn how experimental APIs work](/experimental/overview).

Search your organization's connected content and return ranked document results with cursor pagination. Use `GET /api/search/filters` to discover datasource identifiers and common filter fields. Built-in filter names are validated; other field names are accepted as custom filters and behavior depends on your Glean configuration and connected sources. Errors: HTTP 422 `unprocessable_query` returns no `results` or `next_cursor`. See `warnings` on the response for non-blocking issues such as partially available results. Not every query issue produces a warning or error.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   404
-   408
-   413
-   422
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

Syntactically valid but semantically incorrect request.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
