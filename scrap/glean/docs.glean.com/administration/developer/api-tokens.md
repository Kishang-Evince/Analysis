---
url: "https://docs.glean.com/administration/developer/api-tokens"
canonical: "https://docs.glean.com/administration/developer/api-tokens"
title: "API Tokens"
description: "API tokens authorize programmatic access to Glean's REST APIs:"
fetched_at: "2026-09-01T13:29:00.632Z"
---
On this page

API tokens authorize programmatic access to Glean's REST APIs:

-   [Indexing API](https://developers.glean.com/api-info/indexing/getting-started/overview): For pushing content into Glean
-   [Client API](https://developers.glean.com/api-info/client/getting-started/overview): For search, chat, agents, and other user-facing functionality

Admins create and manage these tokens in the [Admin Console](https://app.glean.com/admin/) under **Platform** → [API tokens](https://app.glean.com/admin/platform/tokenManagement). This page covers managing tokens in the Admin Console. For how to authenticate and call the APIs, see the [Glean developer documentation](https://developers.glean.com/get-started/authentication).

## Add an API token[​](#add-an-api-token "Direct link to Add an API token")

To get started with a token, click **Add token** in the top right corner of the page. Name the token, specify whether it has global permissions or scoped permissions to specific apps, and set an expiration date. Tokens can be revoked from the dashboard as well.

important

Indexing API tokens require an expiration date.

For the full token creation reference — including IP restrictions, token rotation, and the roles required to create each token type — see [Indexing API authentication](https://developers.glean.com/api-info/indexing/authentication/overview) and [Client API authentication](https://developers.glean.com/api-info/client/authentication/overview) in the developer documentation.

## Client API tokens for specific agents[​](#client-api-tokens-for-specific-agents "Direct link to Client API tokens for specific agents")

When you create a Client API token, you can restrict its access to one or more specific agents instead of granting access to all agents available to your account.

### Creation methods[​](#creation-methods "Direct link to Creation methods")

You can generate scoped tokens from two locations in the platform:

-   Admin console: Go to the **API tokens** page to scope a token to one or more selected agents.
-   Agent share panel: Open a specific agent, click **Share** → **API**, and generate a token dedicated exclusively to that agent.

### Key considerations and limitations[​](#key-considerations-and-limitations "Direct link to Key considerations and limitations")

-   Security requirement: The token secret is displayed only once during creation. Copy and store it securely in a password manager or vault before closing the window; it cannot be recovered.
-   Scope restriction: A scoped token only authorizes requests for its explicitly assigned agents.
-   Expiration: Scoped agent tokens automatically expire one year after their creation date.
-   Uniqueness constraint: Only one token can exist per user and agent combination.
-   Token rotation: The system does not support automated rotation or multiple concurrent tokens for the same agent. To rotate a token, you must delete the existing token and create a new one.

## See also[​](#see-also "Direct link to See also")

[

### Authentication overview

Server URLs, OAuth, and Glean-issued tokens for the Client and Indexing APIs.







](https://developers.glean.com/get-started/authentication)[

### Developer guides

Step-by-step guides for building agents and tools, and for the search, chat, and MCP APIs.







](https://developers.glean.com/guides/agents/overview)[

### Web SDK

Embed Glean search, chat, and recommendations directly into your web applications.







](https://developers.glean.com/libraries/web-sdk/overview)[

### All developer docs

Browse the full developer documentation, including the complete API reference and changelog.







](https://developers.glean.com/)
