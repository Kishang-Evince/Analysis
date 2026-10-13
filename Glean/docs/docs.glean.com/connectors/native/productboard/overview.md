---
url: "https://docs.glean.com/connectors/native/productboard/overview"
canonical: "https://docs.glean.com/connectors/native/productboard/overview"
title: "Productboard overview"
description: "Learn what the Productboard connector indexes and how it handles content, metadata, and updates"
fetched_at: "2026-10-13T08:50:12.146Z"
---
On this page

The Productboard connector makes roadmap content and customer notes searchable in Glean. It uses the Productboard API V2 with read-only OAuth scopes.

## What Glean indexes[​](#what-glean-indexes "Direct link to What Glean indexes")

Glean indexes five Productboard content types:

| Content type | Indexed content and metadata |
| --- | --- |
| Product | Name, description, status, owner, teams, tags, custom fields, archive state, and timestamps |
| Component | Name, description, status, owner, teams, tags, custom fields, archive state, parent context, and timestamps |
| Feature | Name, description, status, health, timeframe, owner, teams, tags, custom fields, archive state, parent context, and timestamps |
| Subfeature | Name, description, status, health, timeframe, owner, teams, tags, custom fields, archive state, parent context, and timestamps |
| Note | Name, note type, textual content, source, customer identifier, processed state, owner, tags, custom fields, archive state, linked features, and timestamps |

Products, components, features, and subfeatures form the Productboard roadmap hierarchy. Glean uses parent relationships to preserve container context in search results.

Glean also crawls Productboard members and field schemas. Glean uses Productboard member IDs to match document owners and member email addresses to create identity records. Field schemas map workspace-specific custom fields to searchable content or facets. Glean does not publish members or field schemas as searchable documents.

## Custom fields and facets[​](#custom-fields-and-facets "Direct link to Custom fields and facets")

Glean makes standard Productboard fields searchable and adds facets for supported metadata:

-   Features and subfeatures: status, health, timeframe, teams, tags, and archive state
-   Products: no standard facets
-   Components: archive state
-   Notes: note type, source, customer identifier, processed state, tags, and archive state

For workspace-specific custom fields, Glean adds select fields as facets. It adds other supported custom fields as searchable content. Glean omits fields without a usable schema name or value.

## Crawling and updates[​](#crawling-and-updates "Direct link to Crawling and updates")

The connector defines separate crawl scopes for members, entity schemas, note schemas, products, components, features, subfeatures, and notes.

-   Member and schema crawls run in full mode
-   Product, component, feature, subfeature, and note crawls support full and incremental modes
-   Incremental crawls request items updated since the prior crawl watermark
-   Full content crawls depend on a successful full member crawl so Glean can resolve document owners
-   The connector does not use webhooks

Your Glean deployment controls the crawl schedule.

## Result links[​](#result-links "Direct link to Result links")

Glean uses the Productboard web address returned for each item. When Productboard does not return a web address, the connector uses the canonical Productboard API address.

The connector also recognizes equivalent Productboard routes for roadmap items and notes. This helps associate browser activity with the indexed document when users open the same item through different Productboard views.

## Limitations[​](#limitations "Direct link to Limitations")

-   Productboard does not provide per-object access control lists through this connector. See [Productboard permissions and security](/connectors/native/productboard/permissions)
-   Glean excludes archived notes. Roadmap entities can remain searchable with their archive state available as metadata
-   Text notes can include their body content. Conversation notes and opportunity notes use structured content that the connector does not currently add to the document body
-   A note's customer facet can contain the Productboard customer identifier because the API response does not include the customer name
-   The connector does not support real-time updates through webhooks
