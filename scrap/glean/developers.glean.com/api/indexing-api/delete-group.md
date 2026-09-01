---
url: "https://developers.glean.com/api/indexing-api/delete-group"
canonical: "https://developers.glean.com/api/indexing-api/delete-group"
title: "Delete group | Glean Developer"
description: "Delete group from the datasource. Silently succeeds if group is not present."
fetched_at: "2026-09-01T13:22:56.507Z"
---
# Delete group

POST 

## /api/index/v1/deletegroup

Delete group from the datasource. Silently succeeds if group is not present. Note: All memberships associated with the deleted group will also be deleted.

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
