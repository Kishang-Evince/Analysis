---
url: "https://developers.glean.com/api/indexing-api/datasources-overview"
canonical: "https://developers.glean.com/api/indexing-api/datasources-overview"
title: "Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:56.232Z"
---
Configure and manage datasources for indexing content. Datasources define the origin and configuration settings for content that will be indexed into Glean.

## Use Cases

### Custom Datasource Setup

Create and configure custom datasources for proprietary systems, internal tools, or specialized content repositories that need to be searchable in Glean.

### Configuration Management

Update datasource configurations to modify indexing behavior, content processing rules, and metadata extraction settings.

### Integration Monitoring

Retrieve datasource configuration details to troubleshoot indexing issues and verify integration settings.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/api/index/v1/adddatasource`](/api/indexing-api/add-or-update-datasource) | [Add or update datasource](/api/indexing-api/add-or-update-datasource) |
| POST | [`/api/index/v1/getdatasourceconfig`](/api/indexing-api/get-datasource-config) | [Get datasource config](/api/indexing-api/get-datasource-config) |
