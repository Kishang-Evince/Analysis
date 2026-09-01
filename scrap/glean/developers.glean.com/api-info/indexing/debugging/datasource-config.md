---
url: "https://developers.glean.com/api-info/indexing/debugging/datasource-config"
canonical: "https://developers.glean.com/api-info/indexing/debugging/datasource-config"
title: "Datasource Config | Glean Developer"
description: "Gather information about the datasource's config."
fetched_at: "2026-09-01T13:22:50.609Z"
---
On this page

Gather information about the datasource's config.

### Sample Request[​](#sample-request "Direct link to Sample Request")

-   cURL
-   Python

```
curl -X POST https://customer-be.glean.com/api/index/v1/getdatasourceconfig \  -H 'Authorization: Bearer <token>' \  -H 'Content-Type : application/json' \  -d '{        "datasource": "gleantest"      }'
```

```
from glean.api_client import Gleanimport oswith Glean(    api_token=os.getenv("GLEAN_INDEXING_API_TOKEN", ""),    server_url=os.getenv("GLEAN_SERVER_URL", ""),) as client:    try:        res = client.indexing.datasources.retrieve_config(datasource="gleantest")        print(res)    except Exception as e:        print(f"Exception when getting datasource config: {e}")
```

### Sample Response[​](#sample-response "Direct link to Sample Response")

```
{  "name": "CUSTOM_GLEANTEST",  "displayName": "Glean Test Datasource",  "homeUrl": "https://www.gleantest.com",  "objectDefinitions": [    {      "name": "EngineeringDoc",      "propertyDefinitions": [        {          "name": "Org",          "displayLabel": "Organization",          "propertyType": "TEXT",          "uiOptions": "SEARCH_RESULT",          "hideUiFacet": false        }      ]    }  ],  "urlRegex": "https://www.gleantest.com/.*",  "datasourceCategory": "PUBLISHED_CONTENT",  "isOnPrem": false,  "isUserReferencedByEmail": true,  "isEntityDatasource": false,  "isTestDatasource": false}
```

-   `/getdatasourceconfig` endpoint returns the current state of the datasource config.
-   This can be used to double-check if the config is correct. If you need to make any changes to the config, you can use the `/adddatasource` endpoint again to override the previous config.
