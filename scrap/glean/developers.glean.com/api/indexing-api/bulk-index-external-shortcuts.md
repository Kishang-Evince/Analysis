---
url: "https://developers.glean.com/api/indexing-api/bulk-index-external-shortcuts"
canonical: "https://developers.glean.com/api/indexing-api/bulk-index-external-shortcuts"
title: "Bulk index external shortcuts | Glean Developer"
description: "Replaces all the currently indexed shortcuts using paginated batch API calls. Note that this endpoint is used for indexing shortcuts not hosted by Glean. If you want to upload shortcuts that would be hosted by Glean, please use the `/uploadshortcuts` endpoint. For information on what you can do with Golinks, which are Glean-hosted shortcuts, please refer to [this](https://docs.glean.com/user-guide/knowledge/go-links/how-go-links-work) page."
fetched_at: "2026-09-01T13:22:56.044Z"
---
# Bulk index external shortcuts

POST 

## /api/index/v1/bulkindexshortcuts

Replaces all the currently indexed shortcuts using paginated batch API calls. Note that this endpoint is used for indexing shortcuts not hosted by Glean. If you want to upload shortcuts that would be hosted by Glean, please use the `/uploadshortcuts` endpoint. For information on what you can do with Golinks, which are Glean-hosted shortcuts, please refer to [this](https://docs.glean.com/user-guide/knowledge/go-links/how-go-links-work) page.

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
