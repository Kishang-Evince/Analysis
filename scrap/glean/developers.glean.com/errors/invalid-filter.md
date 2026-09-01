---
url: "https://developers.glean.com/errors/invalid-filter"
canonical: "https://developers.glean.com/errors/invalid-filter"
title: "Invalid Filter | Glean Developer"
description: "invalid_filter ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.696Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `invalid_filter`
-   `status`: `400`
-   `url`: `https://developers.glean.com/errors/invalid-filter`

## What It Means[​](#what-it-means "Direct link to What It Means")

A filter in the request is not valid for the endpoint or datasource scope.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The filter field name is misspelled.
-   The field is not supported for the requested datasource or endpoint.
-   The filter value does not match the expected type or format.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Check the endpoint documentation for supported filters.
-   Validate field names and values before sending the request.
-   Use response `detail` or field-level `errors` to identify the offending filter.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry only after correcting or removing the invalid filter.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/invalid-filter",  "title": "Invalid Filter",  "status": 400,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "invalid_filter",  "documentation_url": "https://developers.glean.com/errors/invalid-filter",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Platform Search API](/api/platform-api/search-overview)
