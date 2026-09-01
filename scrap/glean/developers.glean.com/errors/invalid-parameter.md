---
url: "https://developers.glean.com/errors/invalid-parameter"
canonical: "https://developers.glean.com/errors/invalid-parameter"
title: "Invalid Parameter | Glean Developer"
description: "invalid_parameter ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:00.881Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `invalid_parameter`
-   `status`: `400`
-   `url`: `https://developers.glean.com/errors/invalid-parameter`

## What It Means[​](#what-it-means "Direct link to What It Means")

A request parameter or field is present but has an invalid value.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   A field has the wrong type, format, or enum value.
-   A string, list, or number is outside the allowed range.
-   A field-level validation error is included in the `errors` array.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Use the response `detail` and any field-level `errors` to identify the invalid value.
-   Validate request values before sending them to the API.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retry only after correcting the invalid value.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/invalid-parameter",  "title": "Invalid Parameter",  "status": 400,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "invalid_parameter",  "documentation_url": "https://developers.glean.com/errors/invalid-parameter",  "request_id": "req_7f8a9b0c1d2e"}
```
