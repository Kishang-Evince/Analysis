---
url: "https://developers.glean.com/api-info/indexing/getting-started/overview"
canonical: "https://developers.glean.com/api-info/indexing/getting-started/overview"
title: "Indexing API Quickstart | Glean Developer"
description: "Create a datasource and index your first document with the Indexing API."
fetched_at: "2026-09-01T13:22:51.243Z"
---
On this page

Create a datasource and index one document. This is the shortest end-to-end path to making custom content available to Glean; use the [Indexing API overview](/api/indexing-api) to explore other content types and workflows.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

1

Find your API URL

If automatic discovery is unavailable, ask a Glean admin for the complete **Server instance (QE)** value. Glean admins can copy it from the [About Glean page](https://app.glean.com/admin/about-glean).

2

Create an API token

Create an Indexing API token by following the [Indexing API authentication guide](/api-info/indexing/authentication/overview).

3

Plan your datasource

Choose a stable datasource name and a URL pattern that matches the documents you plan to index.

## 1\. Create a datasource[​](#1-create-a-datasource "Direct link to 1. Create a datasource")

Replace the token, any placeholder API URL, and the example datasource values, then run the request:

```
curl -X POST https://customer-be.glean.com/api/index/v1/adddatasource \  -H 'Authorization: Bearer <your_indexing_token>' \  -d '{    "name": "internal-docs",    "displayName": "Internal Documentation",    "datasourceCategory": "PUBLISHED_CONTENT",    "urlRegex": "^https://internal.company.com/docs.*",    "isUserReferencedByEmail": true  }'
```

For field selection, admin-console setup, and an API-client example, see [Set Up a Datasource](/api-info/indexing/getting-started/setup-datasource).

## 2\. Index a document[​](#2-index-a-document "Direct link to 2. Index a document")

Use the same datasource name in your first document request:

```
curl -X POST https://customer-be.glean.com/api/index/v1/indexdocument \  -H 'Authorization: Bearer <your_indexing_token>' \  -d '{    "document": {      "datasource": "internal-docs",      "objectType": "Document",      "id": "getting-started-guide",      "title": "Getting Started Guide",      "body": {        "mimeType": "text/plain",        "textContent": "This guide helps new employees get up to speed quickly..."      },      "permissions": {        "allowAnonymousAccess": false,        "allowedUsers": [{ "email": "employee@company.com" }]      },      "viewURL": "https://internal.company.com/docs/getting-started"    }  }'
```

For document fields, permissions, bulk indexing, and API-client examples, see [Index Documents](/api-info/indexing/getting-started/index-documents).

## 3\. Enable and verify the datasource[​](#3-enable-and-verify-the-datasource "Direct link to 3. Enable and verify the datasource")

In the Glean Admin Console, open the custom datasource and enable its content for a test group or all teammates. Indexing is asynchronous, so the document can take a few minutes to appear in search. Verify it as a user allowed by the document permissions.

## Next steps[​](#next-steps "Direct link to Next steps")

[

### Authentication

Review Indexing API token permissions and datasource access.







](/api-info/indexing/authentication/overview)[

### Troubleshooting

Diagnose datasource configuration and document visibility.







](/api-info/indexing/debugging/datasource-config)[

### API Reference

Browse Indexing API endpoints by capability.







](/api/indexing-api#indexing-api-reference)
