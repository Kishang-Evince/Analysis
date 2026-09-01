---
url: "https://developers.glean.com/api/client-api/agents/edit-agent"
canonical: "https://developers.glean.com/api/client-api/agents/edit-agent"
title: "Edit an agent | Glean Developer"
description: "Creates a draft or publishes an [agent](https://developers.glean.com/agents/agents-api). Use `isDraft=true` to save a draft, or `isDraft=false` (or omit) to publish immediately. Only draft and publish modes are supported."
fetched_at: "2026-09-01T13:22:51.589Z"
---
# Edit an agent

POST 

## /rest/api/v1/agents/:agent\_id

beta

This endpoint is in Beta. Expect changes and instability.

Creates a draft or publishes an [agent](https://developers.glean.com/agents/agents-api). Use `isDraft=true` to save a draft, or `isDraft=false` (or omit) to publish immediately. Only draft and publish modes are supported.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   404
-   500

Success

Bad request

Not Authorized

Forbidden

Not Found

Internal server error
