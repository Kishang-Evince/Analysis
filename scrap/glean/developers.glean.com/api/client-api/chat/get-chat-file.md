---
url: "https://developers.glean.com/api/client-api/chat/get-chat-file"
canonical: "https://developers.glean.com/api/client-api/chat/get-chat-file"
title: "Download a chat file | Glean Developer"
description: "Download the raw content of a file generated or uploaded during a chat session (for example, an image produced by the assistant). Returns the file bytes with a Content-Type header matching the file's MIME type."
fetched_at: "2026-09-01T13:22:52.638Z"
---
# Download a chat file

GET 

## /rest/api/v1/chat-files/:fileId

Download the raw content of a file generated or uploaded during a chat session (for example, an image produced by the assistant). Returns the file bytes with a Content-Type header matching the file's MIME type.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   404
-   500

File content.

File ID missing from path.

Missing or invalid API token.

Caller does not have access to the file.

File not found.

Internal server error.
