---
url: "https://developers.glean.com/errors/tools-unauthorized"
canonical: "https://developers.glean.com/errors/tools-unauthorized"
title: "Tools Unauthorized | Glean Developer"
description: "tools_unauthorized ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:01.311Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `tools_unauthorized`
-   `status`: `422`
-   `url`: `https://developers.glean.com/errors/tools-unauthorized`

## What It Means[​](#what-it-means "Direct link to What It Means")

The request targets an agent that uses tools the end user has not authorized, so the run cannot start.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The agent uses a tool server the end user has never connected.
-   The end user previously revoked access to a connected tool.
-   The agent was built by someone else and depends on tools the current user has not authorized.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Read `authentication_suggestions` in the response to see which tools require authorization.
-   POST each `server_id` to the Client API `/tool-servers/{serverId}/auth` with a `returnUrl` to obtain an `authorizationUrl`.
-   Redirect the end user to that `authorizationUrl`, then start the run again once OAuth completes.

### Admin Actions[​](#admin-actions "Direct link to Admin Actions")

-   Confirm the required tool servers are enabled for the deployment and available to the user.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retrying before the user authorizes the tools will continue to fail. Retry once authorization completes.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/tools-unauthorized",  "title": "Tools Unauthorized",  "status": 422,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "tools_unauthorized",  "documentation_url": "https://developers.glean.com/errors/tools-unauthorized",  "request_id": "req_7f8a9b0c1d2e"}
```

## Related Docs[​](#related-docs "Direct link to Related Docs")

-   [Agents API Overview](/api/platform-api/agents-overview)
