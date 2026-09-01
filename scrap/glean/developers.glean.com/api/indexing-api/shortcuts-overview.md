---
url: "https://developers.glean.com/api/indexing-api/shortcuts-overview"
canonical: "https://developers.glean.com/api/indexing-api/shortcuts-overview"
title: "Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:57.444Z"
---
Create and manage search shortcuts that provide quick access to frequently used queries, tools, and external resources. Shortcuts enhance user productivity by reducing search friction.

## Use Cases

### Quick Access Tools

Create shortcuts to commonly used internal tools, dashboards, and applications so users can access them directly from search.

### External Resource Integration

Index shortcuts to external resources, documentation sites, and third-party tools that are relevant to your organization.

### Workflow Optimization

Bulk upload shortcuts that streamline common workflows and help users discover relevant tools and resources more efficiently.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/api/index/v1/bulkindexshortcuts`](/api/indexing-api/bulk-index-external-shortcuts) | [Bulk index external shortcuts](/api/indexing-api/bulk-index-external-shortcuts) |
| POST | [`/api/index/v1/uploadshortcuts`](/api/indexing-api/upload-shortcuts) | [Upload shortcuts](/api/indexing-api/upload-shortcuts) |
