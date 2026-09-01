---
url: "https://developers.glean.com/api/platform-api/platform-skills-delete"
canonical: "https://developers.glean.com/api/platform-api/platform-skills-delete"
title: "Delete skill | Glean Developer"
description: "Delete a skill the authenticated caller is allowed to manage. This operation permanently removes all versions of the skill."
fetched_at: "2026-09-01T13:22:58.285Z"
---
# Delete skill

DELETE 

## /api/skills/:skill\_id

experimental

Expect changes and instability. Introduced on July 31, 2026. [Learn how experimental APIs work](/experimental/overview).

Delete a skill the authenticated caller is allowed to manage. This operation permanently removes all versions of the skill.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   204
-   400
-   401
-   403
-   404
-   408
-   429
-   500
-   503

Skill deleted. No content.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
