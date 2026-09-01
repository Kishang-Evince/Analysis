---
url: "https://developers.glean.com/api/indexing-api/delete-user"
canonical: "https://developers.glean.com/api/indexing-api/delete-user"
title: "Delete user | Glean Developer"
description: "Delete the user from the datasource. Silently succeeds if user is not present."
fetched_at: "2026-09-01T13:22:56.692Z"
---
# Delete user

POST 

## /api/index/v1/deleteuser

Delete the user from the datasource. Silently succeeds if user is not present. Note: All memberships associated with the deleted user will also be deleted.

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
