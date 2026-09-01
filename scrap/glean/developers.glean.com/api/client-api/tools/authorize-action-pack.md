---
url: "https://developers.glean.com/api/client-api/tools/authorize-action-pack"
canonical: "https://developers.glean.com/api/client-api/tools/authorize-action-pack"
title: "Start the OAuth authorization flow for an action pack. | Glean Developer"
description: "Starts the third-party OAuth flow for the specified action pack and returns the"
fetched_at: "2026-09-01T13:22:55.057Z"
---
# Start the OAuth authorization flow for an action pack.

POST 

## /rest/api/v1/actions/actionpack/:actionPackId/auth

beta

This endpoint is in Beta. Expect changes and instability.

Starts the third-party OAuth flow for the specified action pack and returns the redirect URL that the client should navigate the end user to. After the OAuth callback completes, the user's browser is redirected back to `returnUrl` with a status query parameter (`?glean_action_auth=success|error&actionPackId=...`).

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

User not entitled to the action pack

Action pack not found

Too Many Requests
