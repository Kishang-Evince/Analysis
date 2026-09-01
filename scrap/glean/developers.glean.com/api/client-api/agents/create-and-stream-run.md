---
url: "https://developers.glean.com/api/client-api/agents/create-and-stream-run"
canonical: "https://developers.glean.com/api/client-api/agents/create-and-stream-run"
title: "Create an agent run and stream the response | Glean Developer"
description: "Executes an [agent](https://developers.glean.com/agents/agents-api) run and returns the result as a stream of server-sent events (SSE). **Note**: If the agent uses an input form trigger, all form fields (including optional fields) must be included in the `input` object."
fetched_at: "2026-09-01T13:22:51.397Z"
---
# Create an agent run and stream the response

POST 

## /rest/api/v1/agents/runs/stream

beta

This endpoint is in Beta. Expect changes and instability.

Executes an [agent](https://developers.glean.com/agents/agents-api) run and returns the result as a stream of server-sent events (SSE). **Note**: If the agent uses an input form trigger, all form fields (including optional fields) must be included in the `input` object.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   403
-   404
-   409
-   422
-   500

Success

Bad request

Forbidden

Not Found

Conflict

Returned when the agent has tools the caller has not authorized. The response body enumerates the tools that need connecting.

Internal server error
