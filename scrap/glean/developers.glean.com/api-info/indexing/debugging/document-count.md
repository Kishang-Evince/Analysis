---
url: "https://developers.glean.com/api-info/indexing/debugging/document-count"
canonical: "https://developers.glean.com/api-info/indexing/debugging/document-count"
title: "Document Count | Glean Developer"
description: "Get the count of documents in a datasource."
fetched_at: "2026-09-01T13:22:50.843Z"
---
On this page

Get the count of documents in a datasource.

Deprecated

The `/getdocumentcount` endpoint is deprecated (deprecated on 2026-02-03, with removal scheduled for 2026-10-15). Use [Datasource Status](/api-info/indexing/debugging/datasource-status) (`/debug/{datasource}/status`) instead, which returns richer document counts and status information.

### Sample Request[​](#sample-request "Direct link to Sample Request")

-   cURL
-   Python

```
curl -X POST https://customer-be.glean.com/api/index/v1/getdocumentcount  -H 'Authorization : Bearer <token>'  -H 'Content-Type : application/json' \  -d '{        "datasource": "gleantest"      }'
```

```
from glean.api_client import Gleanimport oswith Glean(    api_token=os.getenv("GLEAN_INDEXING_API_TOKEN", ""),    server_url=os.getenv("GLEAN_SERVER_URL", ""),) as client:    try:        res = client.indexing.documents.count(datasource="gleantest")        print(res)    except Exception as e:        print(f"Exception when getting document count: {e}")
```

### Sample Response[​](#sample-response "Direct link to Sample Response")

```
{  "documentCount": 15}
```
