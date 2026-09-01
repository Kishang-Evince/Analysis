---
url: "https://developers.glean.com/api/platform-api/platform-agents-create-run"
canonical: "https://developers.glean.com/api/platform-api/platform-agents-create-run"
title: "Create agent run | Glean Developer"
description: "Execute an agent run. Set `stream` to true to receive server-sent events; otherwise the response contains the final agent messages."
fetched_at: "2026-09-01T13:22:57.894Z"
---
# Create agent run

POST 

## /api/agents/:agent\_id/runs

Execute an agent run. Set `stream` to true to receive server-sent events; otherwise the response contains the final agent messages.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   404
-   408
-   409
-   413
-   422
-   429
-   500
-   503

Successful response.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Request conflicts with current state of the resource.

Request body exceeds the maximum allowed size.

Returned when the agent has tools the caller must authorize before the run can start. `authentication_suggestions` names each such tool; POST its `server_id` to the Client API's `/tool-servers/{serverId}/auth` with `returnUrl` in the request body to obtain an `authorizationUrl` to redirect the end user to, then retry the run once OAuth completes.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
