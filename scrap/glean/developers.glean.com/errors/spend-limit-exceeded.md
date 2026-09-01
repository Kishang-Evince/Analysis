---
url: "https://developers.glean.com/errors/spend-limit-exceeded"
canonical: "https://developers.glean.com/errors/spend-limit-exceeded"
title: "Spend Limit Exceeded | Glean Developer"
description: "spend_limit_exceeded ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:01.152Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `spend_limit_exceeded`
-   `status`: `403`
-   `url`: `https://developers.glean.com/errors/spend-limit-exceeded`

## What It Means[​](#what-it-means "Direct link to What It Means")

The request was rejected because a configured spend limit for the deployment has been reached.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The deployment has consumed its allotted spend for the current billing period.
-   High-volume or automated traffic exhausted the budget faster than expected.
-   The configured limit is lower than the workload requires.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Stop retrying and reduce request volume until the limit is raised or the period resets.
-   Check the response `detail` for which limit was reached.
-   Contact a Glean administrator for your deployment to review the limit.

### Admin Actions[​](#admin-actions "Direct link to Admin Actions")

-   Review and adjust the spend limit in the Admin Console.
-   Investigate which integrations or workloads consumed the budget before raising the limit.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retrying will continue to fail until the limit is raised or the spend period resets.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/spend-limit-exceeded",  "title": "Spend Limit Exceeded",  "status": 403,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "spend_limit_exceeded",  "documentation_url": "https://developers.glean.com/errors/spend-limit-exceeded",  "request_id": "req_7f8a9b0c1d2e"}
```
