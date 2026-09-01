---
url: "https://developers.glean.com/api/indexing-api/documents-overview"
canonical: "https://developers.glean.com/api/indexing-api/documents-overview"
title: "Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:56.672Z"
---
Index, update, and manage documents in your Glean instance. These endpoints handle the core document indexing workflow, from individual documents to bulk operations.

## Use Cases

### Real-time Content Indexing

Index documents immediately as they are created or updated in your systems to ensure search results are always current.

### Bulk Content Migration

Efficiently index large volumes of existing content when migrating to Glean or performing initial data loads.

### Permission Management

Update document permissions to ensure proper access control and security compliance as organizational structures change.

### Content Lifecycle Management

Remove outdated or deleted documents from the search index to maintain result quality and data accuracy.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/api/index/v1/indexdocument`](/api/indexing-api/index-document) | [Index document](/api/indexing-api/index-document) |
| POST | [`/api/index/v1/indexdocuments`](/api/indexing-api/index-documents) | [Index documents](/api/indexing-api/index-documents) |
| POST | [`/api/index/v1/bulkindexdocuments`](/api/indexing-api/bulk-index-documents) | [Bulk index documents](/api/indexing-api/bulk-index-documents) |
| POST | [`/api/index/v1/updatedocumentpermissions`](/api/indexing-api/update-document-permissions) | [Update document permissions](/api/indexing-api/update-document-permissions) |
| POST | [`/api/index/v1/uploaddocuments`](/api/indexing-api/schedules-the-processing-of-uploaded-documents) | [Schedules the processing of uploaded documents](/api/indexing-api/schedules-the-processing-of-uploaded-documents) |
| POST | [`/api/index/v1/deletedocument`](/api/indexing-api/delete-document) | [Delete document](/api/indexing-api/delete-document) |
