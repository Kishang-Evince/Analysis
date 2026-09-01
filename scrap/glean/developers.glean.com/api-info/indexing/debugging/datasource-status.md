---
url: "https://developers.glean.com/api-info/indexing/debugging/datasource-status"
canonical: "https://developers.glean.com/api-info/indexing/debugging/datasource-status"
title: "Datasource Status | Glean Developer"
description: "Gather information about the datasource's overall status."
fetched_at: "2026-09-01T13:22:50.882Z"
---
On this page

Gather information about the datasource's overall status.

### Sample Request[​](#sample-request "Direct link to Sample Request")

-   cURL
-   Python

```
curl -X POST https://customer-be.glean.com/api/index/v1/debug/gleantest/status \  -H 'Authorization: Bearer <token>'
```

```
from glean.api_client import Gleanimport oswith Glean(    api_token=os.getenv("GLEAN_INDEXING_API_TOKEN", ""),    server_url=os.getenv("GLEAN_SERVER_URL", ""),) as client:    # Get datasource status    try:        res = client.indexing.datasource.status(datasource="gleantest")        print(res)    except Exception as e:        print(f"Exception when getting datasource status: {e}")
```

### Sample Response[​](#sample-response "Direct link to Sample Response")

```
{  "documents": {    "bulkUploadHistory": [      {        "uploadId": "upload-id-1234567890",        "startTime": "2024-02-08T12:00:00.000Z",        "endTime": "2024-02-08T12:05:00.000Z",        "status": "SUCCESSFUL"      }    ],    "counts": {      "uploaded": [        {          "objectType": "Article",          "count": 15        }      ],      "indexed": [        {          "objectType": "Article",          "count": 15        }      ]    },    "processingHistory": [      {        "startTime": "2024-02-08T12:00:00.000Z",        "endTime": "2024-02-08T12:00:05.000Z"      }    ]  },  "identity": {    "processingHistory": [      {        "startTime": "2024-02-08T12:00:00.000Z",        "endTime": "2024-02-08T12:05:00.000Z"      }    ],    "users": {      "bulkUploadHistory": [        {          "uploadId": "upload-users-1234567890",          "startTime": "2024-02-08T12:00:00.000Z",          "endTime": "2024-02-08T12:05:00.000Z",          "status": "SUCCESSFUL"        }      ],      "counts": {        "uploaded": 5      }    },    "groups": {      "bulkUploadHistory": [],      "counts": {        "uploaded": 3      }    },    "memberships": {      "bulkUploadHistory": [],      "counts": {        "uploaded": 2      }    }  }}
```
