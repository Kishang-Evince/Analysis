---
url: "https://developers.glean.com/api/client-api/tools/get-tool-server-auth-status"
canonical: "https://developers.glean.com/api/client-api/tools/get-tool-server-auth-status"
title: "Get end-user authentication status for a tool server. | Glean Developer"
description: "Returns display information and the calling user's current authentication status"
fetched_at: "2026-09-01T13:22:55.262Z"
---
# Get end-user authentication status for a tool server.

GET 

## /rest/api/v1/tool-servers/:serverId/auth

experimental

Expect changes and instability. Introduced on July 2, 2026. [Learn how experimental APIs work](/experimental/overview).

Returns display information and the calling user's current authentication status for the specified tool server.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   404
-   429

Successful operation

Bad Request

Unauthorized

Tool server not found

Too Many Requests
