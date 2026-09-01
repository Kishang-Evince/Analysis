---
url: "https://developers.glean.com/api/client-api/tools/get-tool-server-tools"
canonical: "https://developers.glean.com/api/client-api/tools/get-tool-server-tools"
title: "Get tool definitions from a tool server. | Glean Developer"
description: "Returns the name, description and JSON input schema for the named tools on the"
fetched_at: "2026-09-01T13:22:55.271Z"
---
# Get tool definitions from a tool server.

GET 

## /rest/api/v1/tool-servers/:serverId/tools

experimental

Expect changes and instability. Introduced on July 30, 2026. [Learn how experimental APIs work](/experimental/overview).

Returns the name, description and JSON input schema for the named tools on the specified tool server. Works for Glean's built-in tools, tool packs and MCP servers.

`toolNames` is required. Names that do not exist on the server are returned in `notFound` rather than failing the request, so a single bad name does not force callers into one-at-a-time retries. Matching is case-insensitive and treats `-` and `_` as equivalent.

Use `serverId=native` for Glean's built-in tools.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   400
-   401
-   404
-   429
-   503

Successful operation

Invalid request (e.g. missing toolNames, or more than 100 names)

Unauthorized

Tool server not found

Too Many Requests

Tool schemas could not be resolved from the server
