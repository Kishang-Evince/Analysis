---
url: "https://developers.glean.com/experimental/overview"
canonical: "https://developers.glean.com/experimental/overview"
title: "Experimental APIs | Glean Developer"
description: "How Glean ships experimental REST API features and how to opt in to preview them"
fetched_at: "2026-09-01T13:23:01.377Z"
---
On this page

Glean ships some capabilities as **experimental** so you can preview and give feedback on new functionality before it becomes generally available (GA). Experimental features are opt-in, and they may change - or be removed - without the notice period that applies to stable APIs.

warning

Experimental features may change in backwards-incompatible ways, or be removed entirely, **without notice**. They are not covered by our [deprecation policy](/deprecations/overview). Don't depend on them in production.

* * *

## What "Experimental" Means[​](#what-experimental-means "Direct link to What \"Experimental\" Means")

### Experimental

Preview functionality that is still evolving:

-   Not yet generally available
-   May change or be removed without notice
-   Not covered by the deprecation policy
-   Opt-in only - hidden unless you ask for it

### Generally Available

Stable, production-ready functionality:

-   Available by default
-   Backwards-compatible changes only
-   Covered by our [deprecation policy](/deprecations/overview)
-   Predictable, announced removals

* * *

## Opting In[​](#opting-in "Direct link to Opting In")

Experimental endpoints and fields are hidden by default. To use them, send the `X-Glean-Include-Experimental` request header set to `true`:

```
X-Glean-Include-Experimental: true
```

| Header | Value | Description |
| --- | --- | --- |
| `X-Glean-Include-Experimental` | `true` | Enables experimental API features that are not yet generally available. |

tip

Only send this header in development or testing environments while you evaluate experimental features. Leaving it off in production keeps your integration on stable, GA behavior.

### Example Request[​](#example-request "Direct link to Example Request")

```
curl -X POST https://your-instance-be.glean.com/api/agents/search \  -H "Authorization: Bearer <token>" \  -H "Content-Type: application/json" \  -H "X-Glean-Include-Experimental: true" \  -d '{ "name": "HR Policy Agent" }'
```

Without the `X-Glean-Include-Experimental` header, experimental endpoints and fields are not exposed, and your requests continue to run against stable API behavior only.

* * *

## Using the SDKs[​](#using-the-sdks "Direct link to Using the SDKs")

Glean's official SDKs can set this header for you through a constructor option or an environment variable - no need to manage the raw header yourself.

#### Using an Environment Variable[​](#using-an-environment-variable "Direct link to Using an Environment Variable")

```
// Set before initializing the SDKprocess.env.X_GLEAN_INCLUDE_EXPERIMENTAL = 'true';import { Glean } from '@gleanwork/api-client';const glean = new Glean({  apiToken: process.env['GLEAN_API_TOKEN'] ?? '',  serverURL: 'https://your-instance-be.glean.com',});
```

#### Using a Constructor Option[​](#using-a-constructor-option "Direct link to Using a Constructor Option")

```
import { Glean } from '@gleanwork/api-client';const glean = new Glean({  apiToken: process.env['GLEAN_API_TOKEN'] ?? '',  serverURL: 'https://your-instance-be.glean.com',  includeExperimental: true,});
```

### Option Reference[​](#option-reference "Direct link to Option Reference")

| Option | Environment Variable | Type | Description |
| --- | --- | --- | --- |
| `includeExperimental` | `X_GLEAN_INCLUDE_EXPERIMENTAL` | `boolean` | When `true`, sends `X-Glean-Include-Experimental: true` to enable experimental features. |

note

Environment variables take precedence over SDK constructor options when both are set.

For language-specific details, see the "Experimental Features and Deprecation Testing" section in your SDK's documentation:

-   [TypeScript](https://github.com/gleanwork/api-client-typescript#experimental-features-and-deprecation-testing)
-   [Python](https://github.com/gleanwork/api-client-python#experimental-features-and-deprecation-testing)
-   [Go](https://github.com/gleanwork/api-client-go#experimental-features-and-deprecation-testing)
-   [Java](https://github.com/gleanwork/api-client-java#experimental-features-and-deprecation-testing)

* * *

## From Experimental to Generally Available[​](#from-experimental-to-generally-available "Direct link to From Experimental to Generally Available")

Experimental features follow a simple lifecycle:

1

### Experimental

The feature is available behind the `X-Glean-Include-Experimental` opt-in. It may change or be removed at any time as we iterate.

2

### Feedback & Iteration

We refine the feature based on real usage and your feedback. Shapes, fields, and behavior may still change during this phase.

3

### Generally Available

The feature graduates to GA: it becomes available by default (no header required), the **Experimental** tag is removed, and it is covered by our [deprecation policy](/deprecations/overview) going forward.

Give Feedback

Experimental features are the best time to influence a feature's final shape. Share feedback with your Glean contact so we can incorporate it before general availability.
