---
url: "https://developers.glean.com/api-info/indexing/debugging/document-access"
canonical: "https://developers.glean.com/api-info/indexing/debugging/document-access"
title: "Document Access | Glean Developer"
description: "Check if a user has access to a document."
fetched_at: "2026-09-01T13:22:50.826Z"
---
On this page

Check if a user has access to a document.

### Sample Request[​](#sample-request "Direct link to Sample Request")

-   cURL
-   Python

```
curl -X POST https://customer-be.glean.com/api/index/v1/checkdocumentaccess  -H 'Authorization : Bearer <token>' \  -H 'Content-Type : application/json' \  -d '{        "datasource": "gleantest",        "objectType": "Article",        "docId": "art123",        "userEmail": "user1@example.com"      }'
```

```
from glean.api_client import Gleanimport oswith Glean(    api_token=os.getenv("GLEAN_INDEXING_API_TOKEN", ""),    server_url=os.getenv("GLEAN_SERVER_URL", ""),) as client:    try:        res = client.indexing.documents.check_access(            datasource="gleantest",            object_type="Article",            doc_id="art123",            user_email="user1@example.com",        )        print(res)    except Exception as e:        print(f"Exception when checking document access: {e}")
```

### Sample Response[​](#sample-response "Direct link to Sample Response")

```
{  "hasAccess": true}
```
