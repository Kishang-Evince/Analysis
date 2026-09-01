---
url: "https://developers.glean.com/api/indexing-api/schedules-the-processing-of-uploaded-documents"
canonical: "https://developers.glean.com/api/indexing-api/schedules-the-processing-of-uploaded-documents"
title: "Schedules the processing of uploaded documents | Glean Developer"
description: "Schedules the immediate processing of documents uploaded through the indexing API. By default the uploaded documents will be processed asynchronously but this API can be used to schedule processing of all documents on demand."
fetched_at: "2026-09-01T13:22:57.476Z"
---
# Schedules the processing of uploaded documents

POST 

## /api/index/v1/processalldocuments

Schedules the immediate processing of documents uploaded through the indexing API. By default the uploaded documents will be processed asynchronously but this API can be used to schedule processing of all documents on demand.

If a `datasource` parameter is specified, processing is limited to that custom datasource. Without it, processing applies to all documents across all custom datasources.

#### Rate Limits[​](#rate-limits "Direct link to Rate Limits")

This endpoint is rate-limited to one usage every 3 hours. Exceeding this limit results in a 429 response code. Here's how the rate limit works:

1.  Calling `/processalldocuments` for datasource `foo` prevents another call for `foo` for 3 hours.
2.  Calling `/processalldocuments` for datasource `foo` doesn't affect immediate calls for `bar`.
3.  Calling `/processalldocuments` for all datasources prevents any datasource calls for 3 hours.
4.  Calling `/processalldocuments` for datasource `foo` doesn't affect immediate calls for all datasources.

For more frequent document processing, contact Glean support.

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
