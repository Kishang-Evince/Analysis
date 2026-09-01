---
url: "https://developers.glean.com/api/client-api/search/recommendations"
canonical: "https://developers.glean.com/api/client-api/search/recommendations"
title: "Recommend documents | Glean Developer"
description: "Retrieve recommended documents for the given URL or Glean Document ID."
fetched_at: "2026-09-01T13:22:54.664Z"
---
# Recommend documents

POST 

## /rest/api/v1/recommendations

beta

This endpoint is in Beta. Expect changes and instability.

Retrieve recommended documents for the given URL or Glean Document ID.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   202
-   204
-   400
-   401
-   403
-   429

OK

Accepted. The Retry-After header has a hint about when the response will be available

There are no recommendations for this URL

Invalid request

Not Authorized

Document does not exist or user cannot access document

Too Many Requests
