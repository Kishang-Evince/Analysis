---
url: "https://developers.glean.com/api-info/indexing/getting-started/setup-datasource"
canonical: "https://developers.glean.com/api-info/indexing/getting-started/setup-datasource"
title: "Setup Datasource | Glean Developer"
description: "To get started with the Indexing API, you first need to create a datasource that will store all the data you will be indexing. A datasource provides organizational structure and defines how your content appears in search results."
fetched_at: "2026-09-01T13:22:51.227Z"
---
On this page

To get started with the Indexing API, you first need to create a datasource that will store all the data you will be indexing. A datasource provides organizational structure and defines how your content appears in search results.

## Using the Glean Custom App Setup Page[​](#using-the-glean-custom-app-setup-page "Direct link to Using the Glean Custom App Setup Page")

info

Only Glean admins can set up custom apps using Glean's admin console.  
If you are not a Glean admin, you can work with your Glean admin to set up a custom app or  
follow Option 2 to set up a datasource using the `/adddatasource` API endpoint.

To set up a custom app, admins can navigate to the admin console, then click on the [Data sources section](https://app.glean.com/admin/setup/apps).

Click on the "Add data source" button in the top right corner. In the modal that appears, click on "Custom" at the bottom of the list.

The key fields to quickly set up a datasource are listed under the "Data source basics" section. Some example values are shown in the screenshot below.

Once the values are set, click on the "Publish" button to create the custom app.

## Using the `/adddatasource` API Endpoint[​](#using-the-adddatasource-api-endpoint "Direct link to using-the-adddatasource-api-endpoint")

When creating a datasource, the key fields you need to set are the following:

| Field | Description |
| --- | --- |
| `name` | A unique identifier used to refer to the datasource. |
| `displayName` | The datasource name shown in search results in the UI. |
| `datasourceCategory` | The type of this datasource. This affects how results are ranked. More details on how to select a category can be inferred from [Datasource Categories](/api-info/indexing/datasource/category) documentation. |
| `urlRegex` | A regex that captures the view URLs of documents in the datasource as accurately as possible. Avoid regexes that are too broad, and will capture URLs from other datasources, or regexes that are too narrow, and will not capture documents from this datasource. |
| `isUserReferencedByEmail` | This should be set to true if you want to refer to user identities using emails directly. If you have your own notion of user ids, this can be set to false. This affects how Glean interprets permissions attached to documents. |

-   cURL
-   Python

```
curl -X POST https://customer-be.glean.com/api/index/v1/adddatasource \  -H 'Authorization: Bearer <token>' \  -d '    {      "name": "gleantest",      "displayName": "Glean Test",      "datasourceCategory": "PUBLISHED_CONTENT",      "urlRegex": "^https://bluesky.test.*",      "objectDefinitions": [        {          "name": "EngineeringDoc",          "docCategory": "PUBLISHED_CONTENT"        }      ],      "isUserReferencedByEmail": true    }'
```

```
from glean.api_client import Gleanimport oswith Glean(    api_token=os.getenv("GLEAN_INDEXING_API_TOKEN", ""),    server_url=os.getenv("GLEAN_SERVER_URL", ""),) as client:    # Create a datasource    try:        client.indexing.datasources.add(request={            "name": "gleantest",            "displayName": "Glean Test",            "datasourceCategory": "PUBLISHED_CONTENT",            "urlRegex": "^http://bluesky.test.*",            "objectDefinitions": [                {                    "name": "EngineeringDoc",                    "docCategory": "PUBLISHED_CONTENT"                }            ],            "isUserReferencedByEmail": True        })    except Exception as e:        print(f"Exception when creating datasource: {e}")
```

You can learn about more datasource customization options at [here](/api/indexing-api/add-or-update-datasource)

For more information about datasource categories, see [Datasource Categories](/api-info/indexing/datasource/category).
