---
url: "https://developers.glean.com/api/indexing-api/beta-get-document-lifecycle-events"
canonical: "https://developers.glean.com/api/indexing-api/beta-get-document-lifecycle-events"
title: "Beta: Get document lifecycle events | Glean Developer"
description: "Retrieves lifecycle events for a specific document including upload time, index times and deletions. Rate limited to 1 request per minute per datasource. Currently in beta, might undergo breaking changes without prior notice."
fetched_at: "2026-09-01T13:22:55.876Z"
---
# Beta: Get document lifecycle events

POST 

## /api/index/v1/debug/:datasource/document/events

beta

This endpoint is in Beta. Expect changes and instability.

Retrieves lifecycle events for a specific document including upload time, index times and deletions. Rate limited to 1 request per minute per datasource. Currently in beta, might undergo breaking changes without prior notice.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   429

OK

Bad Request

Not Authorized

Too Many Requests
