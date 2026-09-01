---
url: "https://developers.glean.com/api/indexing-api/bulk-index-groups"
canonical: "https://developers.glean.com/api/indexing-api/bulk-index-groups"
title: "Bulk index groups | Glean Developer"
description: "Replaces the groups in a datasource using paginated batch API calls. Please refer to the [bulk indexing](https://developers.glean.com/indexing/documents/bulk-upload-model) documentation for an explanation of how to use bulk endpoints."
fetched_at: "2026-09-01T13:22:56.057Z"
---
# Bulk index groups

POST 

## /api/index/v1/bulkindexgroups

Replaces the groups in a datasource using paginated batch API calls. Please refer to the [bulk indexing](https://developers.glean.com/indexing/documents/bulk-upload-model) documentation for an explanation of how to use bulk endpoints. Note: Any groups deleted from the existing set will have their associated memberships deleted as well.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   409

OK

Bad Request

Not Authorized

Conflict
