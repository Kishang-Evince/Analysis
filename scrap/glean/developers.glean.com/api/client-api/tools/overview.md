---
url: "https://developers.glean.com/api/client-api/tools/overview"
canonical: "https://developers.glean.com/api/client-api/tools/overview"
title: "Tools API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:55.472Z"
---
The Tools API enables you to discover and execute various tools and integrations available within your Glean instance. Access external services, run automated workflows, and integrate with third-party applications to extend Glean's capabilities.

## Use Cases

### Tool Discovery

Discover available tools and integrations within your Glean instance to understand what capabilities are accessible through the API.

### Workflow Automation

Execute tools programmatically to automate workflows, data processing, and integration tasks with external systems.

### Third-party Integration

Integrate with external services and applications through Glean's tool ecosystem to create comprehensive business solutions.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | [`/rest/api/v1/actions/actionpack/{actionPackId}/auth`](/api/client-api/tools/get-action-pack-auth-status) | [Get end-user authentication status for an action pack.](/api/client-api/tools/get-action-pack-auth-status)
Reports whether the calling user is already authenticated against the third-party tool backing the specified action pack. Intended for headless / server-driven clients that render an "Authorize" prompt when the user has not yet consented to the tool.

 |
| POST | [`/rest/api/v1/actions/actionpack/{actionPackId}/auth`](/api/client-api/tools/authorize-action-pack) | [Start the OAuth authorization flow for an action pack.](/api/client-api/tools/authorize-action-pack)

Starts the third-party OAuth flow for the specified action pack and returns the redirect URL that the client should navigate the end user to. After the OAuth callback completes, the user's browser is redirected back to \`returnUrl\` with a status query parameter (\`?glean\_action\_auth=success|error&actionPackId=...\`). \`returnUrl\` must match the tenant's configured return URL allowlist; otherwise the request is rejected with 400.

 |
| GET | [`/rest/api/v1/tool-servers/{serverId}/auth`](/api/client-api/tools/get-tool-server-auth-status) | [Get end-user authentication status for a tool server.](/api/client-api/tools/get-tool-server-auth-status)

Returns display information and the calling user's current authentication status for the specified tool server.

 |
| POST | [`/rest/api/v1/tool-servers/{serverId}/auth`](/api/client-api/tools/authorize-tool-server) | [Start the OAuth authorization flow for a tool server.](/api/client-api/tools/authorize-tool-server)

Initiates the third-party OAuth flow for the specified tool server and returns the authorization URL that the client should navigate the end user to. After the OAuth callback completes, the user's browser is redirected back to \`returnUrl\` with query parameters indicating the result. \`returnUrl\` must match the tenant's configured return URL allowlist; otherwise the request is rejected with 400.

 |
| GET | [`/rest/api/v1/tool-servers/{serverId}/tools`](/api/client-api/tools/get-tool-server-tools) | [Get tool definitions from a tool server.](/api/client-api/tools/get-tool-server-tools)

Returns the name, description and JSON input schema for the named tools on the specified tool server. Works for Glean's built-in tools, tool packs and MCP servers. \`toolNames\` is required. Names that do not exist on the server are returned in \`notFound\` rather than failing the request, so a single bad name does not force callers into one-at-a-time retries. Matching is case-insensitive and treats \`-\` and \`\_\` as equivalent. Use \`serverId=native\` for Glean's built-in tools.

 |
| POST | [`/rest/api/v1/tools/call`](/api/client-api/tools/execute-the-specified-tool) | [Execute the specified tool](/api/client-api/tools/execute-the-specified-tool)

Execute the specified tool with provided parameters

 |
| GET | [`/rest/api/v1/tools/list`](/api/client-api/tools/list-available-tools) | [List available tools](/api/client-api/tools/list-available-tools)

Returns a filtered set of available tools based on optional tool name parameters. If no filters are provided, all available tools are returned.

 |
