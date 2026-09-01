---
url: "https://developers.glean.com/api/client-api/entities/listentities"
canonical: "https://developers.glean.com/api/client-api/entities/listentities"
title: "List entities | Glean Developer"
description: "List some set of details for all entities that fit the given criteria and return in the requested order. Does not support negation in filters, assumes relation type EQUALS. There is a limit of 10000 entities that can be retrieved via this endpoint, except when using FULL_DIRECTORY request type for people entities."
fetched_at: "2026-09-01T13:22:53.416Z"
---
# List entities

POST 

## /rest/api/v1/listentities

List some set of details for all entities that fit the given criteria and return in the requested order. Does not support negation in filters, assumes relation type EQUALS. There is a limit of 10000 entities that can be retrieved via this endpoint, except when using FULL\_DIRECTORY request type for people entities.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   429

OK

Invalid request

Not Authorized

Too Many Requests
