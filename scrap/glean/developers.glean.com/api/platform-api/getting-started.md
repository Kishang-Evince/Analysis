---
url: "https://developers.glean.com/api/platform-api/getting-started"
canonical: "https://developers.glean.com/api/platform-api/getting-started"
title: "Platform API Quickstart | Glean Developer"
description: "Start building a modern Glean integration with the Platform API."
fetched_at: "2026-09-01T13:22:57.850Z"
---
On this page

The Platform API is Glean's recommended API for new application integrations when the capability and stability level fit the use case. It provides modern endpoints under the `/api` path. Review the applicable stability notices before adopting a capability or endpoint.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

1

Find your API URL

If automatic discovery is unavailable, ask a Glean admin for the complete **Server instance (QE)** value. Glean admins can copy it from the [About Glean page](https://app.glean.com/admin/about-glean).

2

Configure authentication

Review the [Platform API authentication guide](/api/platform-api/authentication) and choose the credentials for your integration.

3

Choose a capability

Start with the capability that matches your application: [Search](/api/platform-api/search-overview), [Agents](/api/platform-api/agents-overview), [Skills](/api/platform-api/skills-overview), or [Chat](/api/platform-api/chat-overview).

## Choose Platform API over Client API[​](#choose-platform-api-over-client-api "Direct link to Choose Platform API over Client API")

Use Platform API for new integrations whenever the capability you need is available. Use [Client API](/api/client-api) when you need an existing Client API capability that has not yet moved to Platform API or when maintaining an existing integration.

## Make your first request[​](#make-your-first-request "Direct link to Make your first request")

The example below uses the Search API. Review the endpoint's stability notice before using it in production.

The Platform API uses a bearer credential and JSON requests. A typical request looks like this:

```
curl -X POST 'https://<instance>-be.glean.com/api/search' \  -H 'Authorization: Bearer <platform_token>' \  -H 'Content-Type: application/json' \  -d '{    "query": "quarterly planning"  }'
```

See the [Search API reference](/api/platform-api/platform-search) for the complete request and response model.

## Next steps[​](#next-steps "Direct link to Next steps")

[

### Authenticate

Configure one of the supported Platform API bearer-token methods.







](/api/platform-api/authentication)[

### Search

Build permission-aware search experiences over connected content.







](/api/platform-api/search-overview)[

### Run agents

Discover agents and create agent runs.







](/api/platform-api/agents-overview)
