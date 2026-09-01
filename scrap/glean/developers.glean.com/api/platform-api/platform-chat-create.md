---
url: "https://developers.glean.com/api/platform-api/platform-chat-create"
canonical: "https://developers.glean.com/api/platform-api/platform-chat-create"
title: "Create a chat response | Glean Developer"
description: "Run an assistant turn. Set `stream` to true to receive server-sent events; otherwise the response is a typed JSON response object."
fetched_at: "2026-09-01T13:22:58.091Z"
---
# Create a chat response

POST 

## /api/chat

experimental

Expect changes and instability. Introduced on July 14, 2026. [Learn how experimental APIs work](/experimental/overview).

Run an assistant turn. Set `stream` to true to receive server-sent events; otherwise the response is a typed JSON response object.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   403
-   404
-   408
-   413
-   422
-   429
-   500
-   503

Successful response.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Request body exceeds the maximum allowed size.

Syntactically valid but semantically incorrect request.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.
