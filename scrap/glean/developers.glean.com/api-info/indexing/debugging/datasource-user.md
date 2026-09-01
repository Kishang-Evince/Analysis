---
url: "https://developers.glean.com/api-info/indexing/debugging/datasource-user"
canonical: "https://developers.glean.com/api-info/indexing/debugging/datasource-user"
title: "Datasource User | Glean Developer"
description: "Gives various information that would help in debugging issues related to a particular user. For example, it gives information about the user's permissions, groups, memberships, etc."
fetched_at: "2026-09-01T13:22:50.809Z"
---
On this page

Gives various information that would help in debugging issues related to a particular user. For example, it gives information about the user's permissions, groups, memberships, etc.

### Sample Request[​](#sample-request "Direct link to Sample Request")

-   cURL
-   Python

```
curl -X POST https://customer-be.glean.com/api/index/v1/debug/gleantest/user  -H 'Authorization : Bearer <token>' \  -H 'Content-Type : application/json' \  -d '{        "email": "user1@example.com"      }'
```

```
from glean.api_client import Gleanimport oswith Glean(    api_token=os.getenv("GLEAN_INDEXING_API_TOKEN", ""),    server_url=os.getenv("GLEAN_SERVER_URL", ""),) as client:    try:        res = client.indexing.people.debug(            datasource="gleantest",            email="user1@example.com",        )        print(res)    except Exception as e:        print(f"Exception when debugging user: {e}")
```

### Sample Response[​](#sample-response "Direct link to Sample Response")

```
{  "status": {    "isActiveUser": true,    "uploadStatus": "UPLOADED",    "lastUploadedAt": "2024-02-08T12:00:00.000Z"  },  "uploadedGroups": [    {      "name": "Engineering"    }  ]}
```
