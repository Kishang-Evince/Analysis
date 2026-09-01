---
url: "https://developers.glean.com/api/platform-api/platform-skills-sync"
canonical: "https://developers.glean.com/api/platform-api/platform-skills-sync"
title: "Sync a GitHub-imported skill | Glean Developer"
description: "Refresh one GitHub-imported skill from its stored source URL. If the skill content has changed, this operation creates a new skill version. If the skill is no longer present upstream, the stored skill is left unchanged and must be deleted explicitly."
fetched_at: "2026-09-01T13:22:58.676Z"
---
# Sync a GitHub-imported skill

POST 

## /api/skills/:skill\_id/sync

experimental

Expect changes and instability. Introduced on August 3, 2026. [Learn how experimental APIs work](/experimental/overview).

Refresh one GitHub-imported skill from its stored source URL. If the skill content has changed, this operation creates a new skill version. If the skill is no longer present upstream, the stored skill is left unchanged and must be deleted explicitly.

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
-   429
-   500
-   503

Skill sync completed successfully.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Request conflicts with current state of the resource.

Request body exceeds the maximum allowed size.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
