---
url: "https://developers.glean.com/api/client-api/tools/get-action-pack-auth-status"
canonical: "https://developers.glean.com/api/client-api/tools/get-action-pack-auth-status"
title: "Get end-user authentication status for an action pack. | Glean Developer"
description: "Reports whether the calling user is already authenticated against the third-party"
fetched_at: "2026-09-01T13:22:55.234Z"
---
# Get end-user authentication status for an action pack.

GET 

## /rest/api/v1/actions/actionpack/:actionPackId/auth

beta

This endpoint is in Beta. Expect changes and instability.

Reports whether the calling user is already authenticated against the third-party tool backing the specified action pack. Intended for headless / server-driven clients that render an "Authorize" prompt when the user has not yet consented to the tool.

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   404
-   429

Successful operation

Bad Request

Unauthorized

Action pack not found

Too Many Requests
