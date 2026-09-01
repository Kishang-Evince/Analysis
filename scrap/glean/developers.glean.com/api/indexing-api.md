---
url: "https://developers.glean.com/api/indexing-api"
canonical: "https://developers.glean.com/api/indexing-api"
title: "Indexing API | Glean Developer"
description: "Put and manage content in Glean with the Indexing API."
fetched_at: "2026-09-01T13:22:55.663Z"
---
On this page

The Indexing API makes content from internal tools, on-premises systems, and custom applications searchable in Glean. Use it to manage datasources, index content, apply permissions, and keep search results current.

## Start here[​](#start-here "Direct link to Start here")

[

### Quickstart

Create a datasource and index your first document.







](/api-info/indexing/getting-started/overview)[

### Authentication

Create and configure an Indexing API token.







](/api-info/indexing/authentication/overview)[

### API Reference

Browse Indexing API endpoints by capability.







](#indexing-api-reference)

## Indexing workflow[​](#indexing-workflow "Direct link to Indexing workflow")

1

Create a datasource

Set up a datasource to organize the content you want Glean to discover. Follow the [datasource setup guide](/api-info/indexing/getting-started/setup-datasource).

2

Index content

Index content with the [Documents](/api/indexing-api/documents-overview), [People](/api/indexing-api/people-overview), and [Permissions](/api/indexing-api/permissions-overview) references.

3

Apply permissions

Index permissions and validate document access so users only see content they are authorized to view.

4

Validate and troubleshoot

Use the [Indexing API Quickstart](/api-info/indexing/getting-started/overview) and the troubleshooting guides in the sidebar to verify your datasource and indexed content.

## Indexing API reference[​](#indexing-api-reference "Direct link to Indexing API reference")

## Cross-datasource enrichment[​](#cross-datasource-enrichment "Direct link to Cross-datasource enrichment")

[Custom Metadata](/api-info/indexing/custom-metadata/overview) is grouped with Indexing API guidance because it enriches indexed content and uses Glean-issued credentials, but it uses the distinct `/rest/api/index/custom-metadata/...` base path. It can attach metadata to documents from any datasource, including native connectors, without re-indexing the source document.
