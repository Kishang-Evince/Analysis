---
url: "https://developers.glean.com/api-info/indexing/documents/bulk-indexing"
canonical: "https://developers.glean.com/api-info/indexing/documents/bulk-indexing"
title: "Bulk Indexing | Glean Developer"
description: "Bulk index documents endpoint is used to index all the documents of a custom"
fetched_at: "2026-09-01T13:22:51.037Z"
---
On this page

Bulk index documents endpoint is used to index all the documents of a custom datasource using a series of `/bulkindexdocuments` requests with a common `uploadId`. Bulk indexing fully replaces the entire list of documents stored in Glean. After a successful bulk upload, all documents that were not a part of the most recent upload are deleted asynchronously.

There are similar bulk indexing endpoints for other objects like users, groups, employees, and teams as well.

## Choosing `/indexdocuments` vs `/bulkindexdocuments`[​](#choosing-indexdocuments-vs-bulkindexdocuments "Direct link to choosing-indexdocuments-vs-bulkindexdocuments")

When deciding between `/indexdocuments` and `/bulkindexdocuments`, it's important to understand their primary functions and use cases:

-   `/bulkindexdocuments`: This endpoint is designed for completely refreshing the datasource. It deletes all existing documents and replaces them with the new ones provided. Use this endpoint when you need to replace the existing corpus and upload all documents anew.
-   `/indexdocuments`: This endpoint is intended for incremental updates. It allows you to add a batch of new documents or update existing ones without affecting the other documents in the index. Choose this option when you want to keep the existing documents intact while adding or updating specific documents.

When to use each endpoint:

-   Use `/bulkindexdocuments`:
    -   When you need to perform a full refresh of the datasource.
    -   When all existing documents need to be replaced with a new set of documents.
-   Use `/indexdocuments`:
    -   When you need to add new documents to the existing index.
    -   When you need to update specific documents while keeping the rest of the index unchanged.

By selecting the appropriate endpoint based on your needs, you can efficiently manage your document indexing process.

## Making your first successful request to `/bulkindexdocuments`[​](#making-your-first-successful-request-to-bulkindexdocuments "Direct link to making-your-first-successful-request-to-bulkindexdocuments")

Here is a sample request to the `/bulkindexdocuments` endpoint.

-   cURL
-   Python

```
curl -X POST  https://customer-be.glean.com/api/index/v1/bulkindexdocuments \  -H 'Authorization: Bearer <token>' \  -H 'Content-Type : application/json' \  -d '{  "uploadId": "test-upload-id",  "isFirstPage": true,  "isLastPage": true,  "forceRestartUpload": true,  "datasource": "gleantest",  "documents": [    {      "datasource": "gleantest",      "objectType": "EngineeringDoc",      "id": "test-doc-1",      "title": "How to bulk index documents",      "body": {        "mimeType": "text/plain",        "textContent": "This doc will help you make your first successful bulk index document request"      },      "permissions": {        "allowedUsers": [          {            "email": "myuser@bluesky.test",            "datasourceUserId": "myuser-datasource-id",            "name": "My User"          }        ],        "allowAllDatasourceUsersAccess": true      },      "viewURL": "https://www.glean.engineering.co.in/test-doc-1",      "customProperties": [        {          "name": "Org",          "value": "Infrastructure"        }      ]    }  ]}'
```

```
from glean.api_client import Gleanimport oswith Glean(    api_token=os.getenv("GLEAN_INDEXING_API_TOKEN", ""),    server_url=os.getenv("GLEAN_SERVER_URL", ""),) as client:    # Bulk index documents    try:        client.indexing.documents.bulk_index(request={            "uploadId": "test-upload-id",            "datasource": "gleantest",            "documents": [{                "datasource": "gleantest",                "objectType": "EngineeringDoc",                "id": "test-doc-1",                "title": "How to bulk index documents",                "body": {                    "mimeType": "text/plain",                    "textContent": "This doc will help you make your first successful bulk index document request"                },                "permissions": {                    "allowAnonymousAccess": True                },                "viewURL": "https://www.glean.engineering.co.in/test-doc-1",                "customProperties": [                    {                        "name": "Org",                        "value": "Infrastructure"                    }                ]            }],            "isFirstPage": True,            "isLastPage": True,            "forceRestartUpload": True        })    except Exception as e:        print(f"Exception when bulk indexing documents: {e}")
```

Let's look at the different fields you need to successfully index documents to Glean. Note that this is just a sample request with minimal fields required to index content. For exhaustive list of fields, please refer [here](/api/indexing-api/bulk-index-documents).

## Next steps[​](#next-steps "Direct link to Next steps")

-   You can check the status of your document using our debugging/troubleshooting APIs. Please refer [here](/api/indexing-api/troubleshooting-overview) for documentation on how to use these APIs.
-   For the indexed document to show up in Glean UI, the datasource must be enabled for search. Glean admins can enable it from the 'Overview' tab on the setup page for the custom app in the [admin console](https://app.glean.com/admin/setup/apps/), where visibility can be configured for all teammates or a configured test group. Once these steps are done, you should be able to search for the indexed document in Glean when logged in as the user having permissions to view the documents.
-   Note that it takes around 15-20 minutes for the documents to be indexed and appear on your Glean UI.
