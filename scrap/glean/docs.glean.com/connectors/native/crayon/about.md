---
url: "https://docs.glean.com/connectors/native/crayon/about"
canonical: "https://docs.glean.com/connectors/native/crayon/about"
title: "Crayon overview"
description: "Learn what the Glean Crayon connector indexes, how often it crawls Battlecards and Sparks, and who can see Crayon content in Glean."
fetched_at: "2026-09-01T13:29:24.704Z"
---
On this page

Crayon is a competitive intelligence platform that tracks, analyzes, and translates market insights into action. The Glean Crayon connector indexes your Battlecards and Sparks, surfacing competitive positioning, objection handling, pricing data, and AI-generated analyses directly within Glean.

To connect Crayon to Glean, see [Setup](/connectors/native/crayon/setup).

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Battlecard | Structured sales enablement document for a specific competitor, composed of content sections called Tiles. Tiles cover topics like "Why We Win", "Objection Handling", and "Pricing Comparison". |
| Spark | AI-generated competitive analysis produced from a user prompt or automated schedule. Only the last 30 days of Sparks are available via the API. |

## Supported features[​](#supported-features "Direct link to Supported features")

-   Indexes all published Battlecards and associated Tiles from the authorized Crayon dashboard.
-   Indexes Sparks created within the last 30 days.
-   Performs incremental crawls for Battlecards using the `published_after` filter.
-   Executes full crawl reconciliation to remove deleted or unpublished content.
-   Surfaces competitor names as searchable facets.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only the last 30 days of Sparks are available for indexing. Older Sparks are removed from Glean automatically.
-   Crayon Answers (real-time Q&A) is not indexed.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Content type | Full crawl | Incremental crawl | Notes |
| --- | --- | --- | --- |
| Battlecards | Daily | Every 5 minutes | Incremental crawls use the `published_after` filter. Full crawls reconcile deleted or unpublished content. |
| Sparks | Daily | No | The Crayon API only returns Sparks from the last 30 days. Older Sparks are removed from Glean during the next full crawl. |

## Permissions[​](#permissions "Direct link to Permissions")

All indexed content is company-wide readable. There are no per-user or per-group content restrictions in Crayon. Every Glean user in the domain can see all indexed Crayon content.

## See also[​](#see-also "Direct link to See also")

-   [Crayon setup](/connectors/native/crayon/setup)
-   [Crayon troubleshooting and FAQs](/connectors/native/crayon/troubleshooting)
