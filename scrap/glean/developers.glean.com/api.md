---
url: "https://developers.glean.com/api"
canonical: "https://developers.glean.com/api"
title: "Glean APIs | Glean Developer"
description: "Choose the right Glean API for your integration."
fetched_at: "2026-09-01T13:22:49.632Z"
---
On this page

Glean provides three REST API families for building on top of your organization's knowledge and content. **For new integrations, start with the Platform API when the capability and stability level fit your use case.**

[

### Platform API

**Recommended for new integrations.** Build modern application experiences with search, agents, skills, and chat. Review each endpoint's stability notice.







](/api/platform-api)[

### Client API

Build user-facing experiences with existing search, chat, content, and specialized REST capabilities.







](/api/client-api)[

### Indexing API

Create datasources and put documents, people, permissions, and other content into Glean.







](/api/indexing-api)

## Choose an API[​](#choose-an-api "Direct link to Choose an API")

| If you need to... | Start with | Base path |
| --- | --- | --- |
| Build a new search, agent, skills, or chat application | [Platform API](/api/platform-api) (check endpoint stability) | `/api/...` |
| Use existing user-facing search, chat, or content operations | [Client API](/api/client-api) | `/rest/api/v1/...` |
| Create datasources or index and manage content | [Indexing API](/api/indexing-api) | `/api/index/v1/...` |

Start with Platform API

Platform API is the preferred starting point for new application integrations. Stability varies by capability and endpoint, so review the applicable stability notices before adopting it. Use Client API when you need a capability that is not yet available in Platform API or when maintaining an existing integration.

## Common API setup[​](#common-api-setup "Direct link to Common API setup")

[

### Authentication

Compare authentication options and find the API-specific implementation guide.







](/get-started/authentication)[

### Find your server URL

Identify the backend URL for your Glean deployment.







](/get-started/authentication#finding-your-server-url)[

### Rate limits and retries

Review shared guidance for rate limits, retries, and safe API usage.







](/get-started/rate-limits)[

### Platform API errors

Browse stable Platform API error codes and ProblemDetail responses.







](/errors)[

### Deprecations

Review the API deprecation policy and current endpoint deprecations.







](/deprecations/overview)

## Explore the references[​](#explore-the-references "Direct link to Explore the references")

Choose an API above to find its getting-started guidance, authentication details, capability overviews, and complete endpoint reference.
