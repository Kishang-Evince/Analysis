---
url: "https://developers.glean.com/api/indexing-api/troubleshooting-overview"
canonical: "https://developers.glean.com/api/indexing-api/troubleshooting-overview"
title: "Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:57.493Z"
---
Debug and monitor your indexing operations with diagnostic endpoints. These tools help identify issues, verify data integrity, and ensure successful content indexing.

## Use Cases

### Indexing Status Monitoring

Monitor the status of document uploads and indexing operations to ensure content is being processed successfully.

### Data Integrity Verification

Verify that documents and user information have been indexed correctly and are accessible through search.

### Access Control Testing

Test document access permissions to ensure users can see the content they should have access to.

### Performance Diagnostics

Analyze indexing performance and identify bottlenecks in your content processing pipeline.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/api/index/v1/getdatasourcestatus`](/api/indexing-api/beta-get-datasource-status) | [Beta: Get datasource status](/api/indexing-api/beta-get-datasource-status) |
| POST | [`/api/index/v1/getdocumentinfo`](/api/indexing-api/beta-get-document-information) | [Beta: Get document information](/api/indexing-api/beta-get-document-information) |
| POST | [`/api/index/v1/getdocumentsinfo`](/api/indexing-api/beta-get-information-of-a-batch-of-documents) | [Beta: Get information of a batch of documents](/api/indexing-api/beta-get-information-of-a-batch-of-documents) |
| POST | [`/api/index/v1/getuserinfo`](/api/indexing-api/beta-get-user-information) | [Beta: Get user information](/api/indexing-api/beta-get-user-information) |
| POST | [`/api/index/v1/checkdocumentaccess`](/api/indexing-api/check-document-access) | [Check document access](/api/indexing-api/check-document-access) |
| POST | [`/api/index/v1/getdocumentuploadstatus`](/api/indexing-api/get-document-upload-and-indexing-status) | [Get document upload and indexing status](/api/indexing-api/get-document-upload-and-indexing-status) |
| POST | [`/api/index/v1/getdocumentcount`](/api/indexing-api/get-document-count) | [Get document count](/api/indexing-api/get-document-count) |
| POST | [`/api/index/v1/getusercount`](/api/indexing-api/get-user-count) | [Get user count](/api/indexing-api/get-user-count) |
