---
url: "https://developers.glean.com/api/indexing-api/create-or-update-metadata-schema"
canonical: "https://developers.glean.com/api/indexing-api/create-or-update-metadata-schema"
title: "Create or update metadata schema | Glean Developer"
description: "Defines or updates the schema for a metadata group. Schemas should be defined before indexing metadata."
fetched_at: "2026-09-01T13:22:56.267Z"
---
# Create or update metadata schema

PUT 

## /rest/api/index/custom-metadata/schema/:groupName

Defines or updates the schema for a metadata group. Schemas should be defined before indexing metadata.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   409
-   429
-   500

OK

Bad Request

Not Authorized

Conflict - Schema already exists with incompatible changes

Too Many Requests

Internal Server Error
