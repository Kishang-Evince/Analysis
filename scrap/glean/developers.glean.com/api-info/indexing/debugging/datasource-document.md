---
url: "https://developers.glean.com/api-info/indexing/debugging/datasource-document"
canonical: "https://developers.glean.com/api-info/indexing/debugging/datasource-document"
title: "Datasource Document | Glean Developer"
description: "Gives various information that would help in debugging issues related to a particular document. For example, it gives information about the document's upload and indexing status, the document's permissions, etc."
fetched_at: "2026-09-01T13:22:50.791Z"
---
On this page

Gives various information that would help in debugging issues related to a particular document. For example, it gives information about the document's upload and indexing status, the document's permissions, etc.

### Sample Request[​](#sample-request "Direct link to Sample Request")

-   cURL
-   Python

```
curl -X POST https://customer-be.glean.com/api/index/v1/debug/{datasource}/document  -H 'Authorization : Bearer <token>' \  -H 'Content-Type : application/json' \  -d '{        "objectType": "Article",        "docId": "art123"      }'
```

```
from glean.api_client import Gleanimport oswith Glean(    api_token=os.getenv("GLEAN_INDEXING_API_TOKEN", ""),    server_url=os.getenv("GLEAN_SERVER_URL", ""),) as client:    try:        res = client.indexing.documents.debug(            datasource="gleantest",            object_type="Article",            doc_id="art123",        )        print(res)    except Exception as e:        print(f"Exception when debugging document: {e}")
```

### Sample Response[​](#sample-response "Direct link to Sample Response")

```
{  "status": {    "uploadStatus": "UPLOADED",    "lastUploadedAt": "2024-02-08T12:00:00.000Z",    "indexingStatus": "INDEXED",    "lastIndexedAt": "2024-02-08T12:05:00.000Z",    "permissionIdentityStatus": "UPLOADED"  },  "uploadedPermissions": {    "allowAnonymousAccess": false,    "allowedUsers": [      {        "email": "user1@example.com"      },      {        "email": "user2@example.com"      }    ],    "allowedGroups": [      "group1"    ]  }}
```
