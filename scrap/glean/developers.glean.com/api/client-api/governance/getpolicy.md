---
url: "https://developers.glean.com/api/client-api/governance/getpolicy"
canonical: "https://developers.glean.com/api/client-api/governance/getpolicy"
title: "Gets specified policy | Glean Developer"
description: "Fetches the specified policy version, or the latest if no version is provided."
fetched_at: "2026-09-01T13:22:53.842Z"
---
# Gets specified policy

GET 

## /rest/api/v1/governance/data/policies/:id

⚠10 active deprecations

`sensitiveInfoTypes`

Use sensitiveContentOptions instead

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

`likelihoodThreshold`

Field is deprecated

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

`urlGreenlist`

Field is deprecated

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

`datasources`

Use datasourceInstances instead

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

`externalSharingOptions`

Use broadSharingOptions instead

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

`enabled`

Field is deprecated

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

`anyoneWithLinkEnabled`

Field is deprecated

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

`sensitiveInfoTypes`

Use customSensitiveExpressions instead

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

`sensitiveTerms`

Use customSensitiveExpressions instead

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

`sensitiveRegexes`

Use customSensitiveExpressions instead

Deprecation introduced on 2026-02-05|Will be removed after 2026-10-15

[View All Deprecations](/deprecations)

Fetches the specified policy version, or the latest if no version is provided.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   403
-   500

OK

Permissions error

Internal error
