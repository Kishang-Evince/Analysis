---
url: "https://docs.glean.com/connectors/native/looker/overview"
canonical: "https://docs.glean.com/connectors/native/looker/overview"
title: "Looker overview"
description: "Learn how Looker indexing, semantic routing, and live Assistant queries work in Glean."
fetched_at: "2026-10-13T08:50:02.651Z"
---
On this page

Looker in Glean combines permission-aware saved-content discovery, optional semantic routing, and live Assistant queries. Use the connector to find governed Looks and dashboards, enable semantic indexing when available to improve Model and Explore routing, and use Assistant for current Looker data.

## At a glance[​](#at-a-glance "Direct link to At a glance")

Glean provides three connected layers for Looker:

| Capability | What it does | Data available to Glean |
| --- | --- | --- |
| [**Saved-content indexing**](/connectors/native/looker/connector) | Makes Looks and dashboards discoverable in Glean Search | Metadata, descriptions, dashboard text, links, identities, and permissions |
| [**Semantic indexing**](/connectors/native/looker/connector#optional-semantic-metadata) | Adds routing metadata for governed LookML Models and selected Explores | Model and Explore names, labels, descriptions, group labels, identifiers, and permissions |
| [**Looker in Assistant**](/connectors/native/looker/assistant) | Answers questions using saved Looks, dashboards, or live Explore queries | Live schema and query results returned by Looker at request time |

Semantic indexing is optional and rollout-controlled. It requires ModelSet-aware identity crawling and publishes only the semantic documents that pass the connector’s visibility and access checks.

## How Looker works in Glean[​](#how-looker-works-in-glean "Direct link to How Looker works in Glean")

The connector and the managed Looker MCP integration handle different parts of the same workflow:

-   **Saved-content indexing** uses the Looker API to index Looks, user dashboards, and LookML dashboards. It also crawls Looker users and roles so Glean can apply permission-aware visibility.
-   **Semantic indexing** uses Looker Model and Explore navigation metadata and transient LookML source loading to identify Models and Explores that are safe to publish for routing. It does not index raw LookML, SQL, field definitions, or query results.
-   **Routing** uses indexed metadata to identify a saved asset or semantic target. An indexed hit is routing evidence within its permissions and crawl-freshness window; it does not replace a live Looker authorization check.
-   **Live querying** uses the managed Looker MCP server. Looker remains authoritative for the authenticated user’s field visibility, access grants, row restrictions, query authorization, and live values.

## What Glean indexes[​](#what-glean-indexes "Direct link to What Glean indexes")

### Saved-content metadata[​](#saved-content-metadata "Direct link to Saved-content metadata")

For Looks and dashboards, Glean indexes metadata such as:

-   Titles, descriptions, folders, creators, and last-updater information
-   Look and dashboard identifiers and links back to the Looker instance
-   Dashboard element text, including titles, subtitles, body text, notes, and linked Look titles or descriptions
-   Favorites and view counts when provided by Looker

The connector supports both user dashboards and LookML dashboards. Public Looks are handled separately from permissioned Looks because Looker exposes them as public content.

### Semantic metadata[​](#semantic-metadata "Direct link to Semantic metadata")

When semantic indexing is enabled, Glean can publish:

-   **Models:** Model name and label, with a link to the corresponding LookML model source in Looker
-   **Explores:** Model name and label, Explore name and label, description, group label, and a direct Explore link

Hidden Explores and Explores that are gated by effective `required_access_grants` are not published. If Glean cannot safely classify an Explore’s access requirements, it omits that Explore rather than publishing it with uncertain visibility.

## What Glean does not index[​](#what-glean-does-not-index "Direct link to What Glean does not index")

Glean does not publish the following as connector-indexed content:

-   Raw warehouse rows or numeric query results
-   Raw LookML source, SQL, connection names, or access-grant definitions
-   Explore fields, measures, dimensions, filters, or parameters as indexed documents
-   User-attribute-derived access-grant groups
-   Looker content changes through write operations

The managed MCP server can retrieve live schema and query results when a user is authorized and the relevant read-only tools are available.
