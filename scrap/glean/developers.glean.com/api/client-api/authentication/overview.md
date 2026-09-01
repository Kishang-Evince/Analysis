---
url: "https://developers.glean.com/api/client-api/authentication/overview"
canonical: "https://developers.glean.com/api/client-api/authentication/overview"
title: "Authentication API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:52.227Z"
---
The Authentication API provides secure token-based authentication for accessing Glean's APIs. It enables you to create and manage authentication tokens that authorize your applications to interact with Glean services on behalf of users.

## Use Cases

### API Access Control

Generate secure authentication tokens to authorize your applications and services to access Glean APIs with proper user permissions.

### Service Integration

Enable third-party applications and internal services to securely integrate with Glean using token-based authentication.

### User Authorization

Create user-specific tokens that respect individual permissions and access controls within your organization.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/checkdatasourceauth`](/api/client-api/authentication/checkdatasourceauth) | [Check datasource authorization](/api/client-api/authentication/checkdatasourceauth)
Returns all datasource instances that require per-user OAuth authorization for the authenticated user, along with a transient auth token that can be appended to auth URLs to complete OAuth flows. Clients construct the full OAuth URL by combining the backend base URL, the \`authUrlRelativePath\` from each instance, and the transient auth token: \`<backend>/<authUrlRelativePath>?transient\_auth\_token=<token>\`.

 |
| POST | [`/rest/api/v1/createauthtoken`](/api/client-api/authentication/createauthtoken) | [Create authentication token](/api/client-api/authentication/createauthtoken)

Creates an authentication token for the authenticated user. These are specifically intended to be used with the \[Web SDK\](https://developers.glean.com/web). Note: The tokens generated from this endpoint are \*\*not\*\* valid tokens for use with the Client API (e.g. \`/rest/api/v1/\*\`).

 |
