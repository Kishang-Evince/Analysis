---
url: "https://developers.glean.com/api/client-api/documents/getdocuments"
canonical: "https://developers.glean.com/api/client-api/documents/getdocuments"
title: "Read documents | Glean Developer"
description: "Read the documents including metadata (does not include enhanced metadata via `/documentmetadata`) for the given list of Glean Document IDs or URLs specified in the request."
fetched_at: "2026-09-01T13:22:53.241Z"
---
# Read documents

POST 

## /rest/api/v1/getdocuments

Read the documents including metadata (does not include enhanced metadata via `/documentmetadata`) for the given list of Glean Document IDs or URLs specified in the request.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   429

OK

Invalid request

Not Authorized

Documents does not exist, or user cannot access documents.

Too Many Requests
