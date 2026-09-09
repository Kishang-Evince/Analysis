---
url: "https://developers.glean.com/deprecations/overview"
canonical: "https://developers.glean.com/deprecations/overview"
title: "API Evolution & Deprecations | Glean Developer"
description: "How Glean evolves its REST API through additive changes and predictable deprecations"
fetched_at: "2026-09-01T13:23:00.328Z"
---
On this page

We evolve our API through additive changes and predictable deprecations - not versioned URLs. This ensures your integrations remain stable while allowing us to improve the API.

* * *

## What's a Breaking Change?[​](#whats-a-breaking-change "Direct link to What's a Breaking Change?")

### Breaking Changes

Require your code to be updated:

-   Removing or renaming endpoints, fields, or parameters
-   Changing data types or formats
-   Making optional fields required
-   Tightening validation rules

### Non-Breaking Changes

Work with your existing code:

-   Adding new endpoints or fields
-   Adding optional parameters
-   Loosening validation
-   Performance improvements

* * *

## The Deprecation Timeline[​](#the-deprecation-timeline "Direct link to The Deprecation Timeline")

When we need to make a breaking change, we follow a predictable process:

1

### Announce Deprecation

We mark the feature as deprecated in our API responses and in our documentation. Your code continues to work normally.

2

### Migration Period (6+ months)

Both old and new approaches work side-by-side. We provide migration guides and send email notifications.

3

### Removal at Fixed Date

The deprecated feature is removed only on a fixed date: **Jan 15**, **Apr 15**, **Jul 15**, or **Oct 15** (23:59:59 UTC). This gives you a predictable timeline to plan for a migration.

#### Example:[​](#example "Direct link to Example:")

Consider a field deprecated on **2026-01-01**. The field will be removed on **2026-07-15** (a minimum of 6 months after deprecation, plus a short buffer, rounded up to the next quarterly removal date - removals only happen on **Jan 15, Apr 15, Jul 15, or Oct 15**)

```
        2026-01-01                                                    2026-07-15            │                                                              │            ▼                                                              ▼────────────●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●────────────            │                                                              │ Deprecation Introduced                                         Deprecation Removed            ├──────────────────── Migration Period ────────────────────────┤
```

* * *

## How You'll Know About Changes[​](#how-youll-know-about-changes "Direct link to How You'll Know About Changes")

### API Headers

Every response using deprecated features includes an `X-Glean-Deprecated` header with full details.

### Documentation

Inline warnings on API pages, migration guides, and a complete [deprecation schedule](/deprecations).

When you use a deprecated feature, the API response includes an `X-Glean-Deprecated` header:

```
X-Glean-Deprecated: name=snippetText;kind=property;context=response;schema=SearchResultSnippet;removal=2026-07-15;docs=https://developers.glean.com/deprecations
```

Each deprecated item you use produces its own `X-Glean-Deprecated` header instance. The header value is a semicolon-separated list of `key=value` pairs:

| Field | Description |
| --- | --- |
| `name` | Name of the deprecated item |
| `kind` | Type of deprecation: `endpoint`, `property`, `parameter`, or `enum-value` |
| `context` | Where the deprecation applies: `request`, `response`, or `endpoint` |
| `schema` | The schema containing the deprecated property (when applicable) |
| `removal` | Date the item will be removed (ISO-8601) |
| `docs` | Link to migration documentation (when available) |
| `value` | The deprecated enum value (only for `enum-value` deprecations) |

Automated Monitoring

Parse this header in your integration tests or monitoring to catch deprecations early.

* * *

## Testing Future Changes[​](#testing-future-changes "Direct link to Testing Future Changes")

Validate your integration before deprecated features are removed by including the `X-Glean-Exclude-Deprecated-After` header:

```
X-Glean-Exclude-Deprecated-After: 2027-01-15
```

This header simulates how the API will behave after the deprecation date, helping you verify your code handles the changes correctly.

### Using the SDKs[​](#using-the-sdks "Direct link to Using the SDKs")

Glean's official SDKs can be configured to automatically include this header on all requests through constructor options or environment variables. See the documentation for your SDK:

-   [TypeScript](https://github.com/gleanwork/api-client-typescript#experimental-features-and-deprecation-testing)
-   [Python](https://github.com/gleanwork/api-client-python#experimental-features-and-deprecation-testing)
-   [Go](https://github.com/gleanwork/api-client-go#experimental-features-and-deprecation-testing)
-   [Java](https://github.com/gleanwork/api-client-java#experimental-features-and-deprecation-testing)

* * *

## After Removal[​](#after-removal "Direct link to After Removal")

When deprecated items are removed, the API provides clear error responses:

| Item Type | Response |
| --- | --- |
| **Endpoints** | `410 Gone` with migration instructions |
| **Request fields** | `400 Bad Request` with details |
| **Response fields** | Simply omitted from the response |

Example error response

```
{  "error": {    "code": "deprecated_field_removed",    "message": "Field 'userId' was removed on 2027-01-15. Use 'userIdentifier' instead.",    "docs": "https://developers.glean.com/docs/migrations/2027-01-15"  }}
```
