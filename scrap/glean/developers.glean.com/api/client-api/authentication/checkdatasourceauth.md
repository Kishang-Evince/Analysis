---
url: "https://developers.glean.com/api/client-api/authentication/checkdatasourceauth"
canonical: "https://developers.glean.com/api/client-api/authentication/checkdatasourceauth"
title: "Check datasource authorization | Glean Developer"
description: "Returns all datasource instances that require per-user OAuth authorization"
fetched_at: "2026-09-01T13:22:52.201Z"
---
# Check datasource authorization

POST 

## /rest/api/v1/checkdatasourceauth

Returns all datasource instances that require per-user OAuth authorization for the authenticated user, along with a transient auth token that can be appended to auth URLs to complete OAuth flows.

Clients construct the full OAuth URL by combining the backend base URL, the `authUrlRelativePath` from each instance, and the transient auth token: `<backend>/<authUrlRelativePath>?transient_auth_token=<token>`.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   401
-   429

OK

Not Authorized

Too Many Requests
