---
url: "https://developers.glean.com/api/client-api/governance/downloadpolicycsv"
canonical: "https://developers.glean.com/api/client-api/governance/downloadpolicycsv"
title: "Downloads violations CSV for policy | Glean Developer"
description: "Downloads CSV violations report for a specific policy id. This does not support continuous policies."
fetched_at: "2026-09-01T13:22:53.662Z"
---
# Downloads violations CSV for policy

GET 

## /rest/api/v1/governance/data/policies/:id/download

Downloads CSV violations report for a specific policy id. This does not support continuous policies.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   403
-   500

Downloads csv of batch policy violations.

Bad request error (e.g., continuous policies are not supported).

Permissions error

Internal error
