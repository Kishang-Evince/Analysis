---
url: "https://developers.glean.com/api/platform-api/platform-trigger-presets-list"
canonical: "https://developers.glean.com/api/platform-api/platform-trigger-presets-list"
title: "List trigger presets | Glean Developer"
description: "List the trigger presets available to the caller. A preset is a curated content-trigger template (e.g. a new Jira ticket) which is passed when creating a trigger."
fetched_at: "2026-09-01T13:22:58.900Z"
---
# List trigger presets

GET 

## /api/trigger-presets

experimental

Expect changes and instability. Introduced on July 22, 2026. [Learn how experimental APIs work](/experimental/overview).

List the trigger presets available to the caller. A preset is a curated content-trigger template (e.g. a new Jira ticket) which is passed when creating a trigger.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   408
-   429
-   500
-   503

Successful response.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Backend did not respond within the timeout window.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
