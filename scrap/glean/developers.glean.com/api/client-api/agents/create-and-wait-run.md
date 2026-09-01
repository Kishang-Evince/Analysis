---
url: "https://developers.glean.com/api/client-api/agents/create-and-wait-run"
canonical: "https://developers.glean.com/api/client-api/agents/create-and-wait-run"
title: "Create an agent run and wait for the response | Glean Developer"
description: "Executes an [agent](https://developers.glean.com/agents/agents-api) run and returns the final response. **Note**: If the agent uses an input form trigger, all form fields (including optional fields) must be included in the `input` object."
fetched_at: "2026-09-01T13:22:51.631Z"
---
# Create an agent run and wait for the response

POST 

## /rest/api/v1/agents/runs/wait

beta

This endpoint is in Beta. Expect changes and instability.

Executes an [agent](https://developers.glean.com/agents/agents-api) run and returns the final response. **Note**: If the agent uses an input form trigger, all form fields (including optional fields) must be included in the `input` object.

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
