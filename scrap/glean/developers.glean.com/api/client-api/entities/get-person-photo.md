---
url: "https://developers.glean.com/api/client-api/entities/get-person-photo"
canonical: "https://developers.glean.com/api/client-api/entities/get-person-photo"
title: "Get person photo | Glean Developer"
description: "Returns the profile photo bytes for a person whose photo is stored in Glean (crawled from an identity source or user-uploaded via admin console). Photos hosted externally (e.g. Slack CDN) are not served by this endpoint; callers should follow the photoUrl from /people or /listentities directly. Responses include a Cache-Control header (max-age=3600) to reduce redundant fetches."
fetched_at: "2026-09-01T13:22:53.391Z"
---
# Get person photo

GET 

## /rest/api/v1/people/:person\_id/photo

Returns the profile photo bytes for a person whose photo is stored in Glean (crawled from an identity source or user-uploaded via admin console). Photos hosted externally (e.g. Slack CDN) are not served by this endpoint; callers should follow the photoUrl from /people or /listentities directly. Responses include a Cache-Control header (max-age=3600) to reduce redundant fetches.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   404
-   429

Photo bytes returned successfully.

**Response Headers**

**Cache-Control**

Caching directive for the photo response.

Missing person\_id parameter.

Not Authorized.

Person not found, person has no photo, or photo is not hosted by Glean (follow photoUrl from /people or /listentities directly).

Too Many Requests.
