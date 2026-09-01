---
url: "https://developers.glean.com/api/client-api/agents/import-agent"
canonical: "https://developers.glean.com/api/client-api/agents/import-agent"
title: "Import an agent | Glean Developer"
description: "Imports an [agent](https://developers.glean.com/agents/agents-api) from its on-disk folder representation (spec.yaml, instructions.md, skills/, subagents/) packaged as a zip, and creates or updates the agent. Inverse of the export flow: the folder-to-schema conversion runs server-side. The bundle must contain only regular files; symlinks are resolved by the caller at packaging time."
fetched_at: "2026-09-01T13:22:51.604Z"
---
# Import an agent

POST 

## /rest/api/v1/agents/:agent\_id/import

beta

This endpoint is in Beta. Expect changes and instability.

Imports an [agent](https://developers.glean.com/agents/agents-api) from its on-disk folder representation (spec.yaml, instructions.md, skills/, subagents/) packaged as a zip, and creates or updates the agent. Inverse of the export flow: the folder-to-schema conversion runs server-side. The bundle must contain only regular files; symlinks are resolved by the caller at packaging time.

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
