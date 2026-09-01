---
url: "https://developers.glean.com/api/client-api/tools/authorize-tool-server"
canonical: "https://developers.glean.com/api/client-api/tools/authorize-tool-server"
title: "Start the OAuth authorization flow for a tool server. | Glean Developer"
description: "Initiates the third-party OAuth flow for the specified tool server and returns the"
fetched_at: "2026-09-01T13:22:55.031Z"
---
# Start the OAuth authorization flow for a tool server.

POST 

## /rest/api/v1/tool-servers/:serverId/auth

experimental

Expect changes and instability. Introduced on July 2, 2026. [Learn how experimental APIs work](/experimental/overview).

Initiates the third-party OAuth flow for the specified tool server and returns the authorization URL that the client should navigate the end user to. After the OAuth callback completes, the user's browser is redirected back to `returnUrl` with query parameters indicating the result.

`returnUrl` must match the tenant's configured return URL allowlist; otherwise the request is rejected with 400.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   404
-   429

Successful operation

Invalid request (e.g. returnUrl not in allowlist, unsupported auth type)

Unauthorized

User not entitled to the tool server

Tool server not found

Too Many Requests
