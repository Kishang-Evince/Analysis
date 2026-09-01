---
url: "https://developers.glean.com/api/indexing-api/rotate-token"
canonical: "https://developers.glean.com/api/indexing-api/rotate-token"
title: "Rotate token | Glean Developer"
description: "Rotates the secret value inside the Indexing API token and returns the new raw secret. All other properties of the token are unchanged. In order to rotate the secret value, include the token as the bearer token in the `/rotatetoken` request. Please refer to [Token rotation](https://developers.glean.com/indexing/authentication/token-rotation) documentation for more information."
fetched_at: "2026-09-01T13:22:57.237Z"
---
# Rotate token

POST 

## /api/index/v1/rotatetoken

Rotates the secret value inside the Indexing API token and returns the new raw secret. All other properties of the token are unchanged. In order to rotate the secret value, include the token as the bearer token in the `/rotatetoken` request. Please refer to [Token rotation](https://developers.glean.com/indexing/authentication/token-rotation) documentation for more information.

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401

OK

Bad Request

Not Authorized
