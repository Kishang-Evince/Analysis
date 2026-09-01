---
url: "https://developers.glean.com/api/client-api/authentication/createauthtoken"
canonical: "https://developers.glean.com/api/client-api/authentication/createauthtoken"
title: "Create authentication token | Glean Developer"
description: "Creates an authentication token for the authenticated user. These are"
fetched_at: "2026-09-01T13:22:52.245Z"
---
# Create authentication token

POST 

## /rest/api/v1/createauthtoken

Creates an authentication token for the authenticated user. These are specifically intended to be used with the [Web SDK](https://developers.glean.com/web).

Note: The tokens generated from this endpoint are **not** valid tokens for use with the Client API (e.g. `/rest/api/v1/*`).

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   429

OK

Invalid Request

Not Authorized

Too Many Requests
