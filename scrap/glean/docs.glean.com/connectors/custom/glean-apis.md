---
url: "https://docs.glean.com/connectors/custom/glean-apis"
canonical: "https://docs.glean.com/connectors/custom/glean-apis"
title: "Glean REST APIs"
description: "Overview of Glean's REST APIs, including Client and Indexing APIs, along with token types and their features"
fetched_at: "2026-09-01T13:29:20.213Z"
---
On this page

Glean provides two REST APIs for interacting with the platform. Our [developer documentation](https://developers.glean.com/) provides detailed implementation instructions. This guide offers an introduction to Glean's REST APIs and serves as a general reference.

## API Types[​](#api-types "Direct link to API Types")

[

### Client API

The Client API enables implementation of a custom client interface to interact with the Glean system. This API allows you to build custom interfaces and integrate Glean's functionality into your applications.







](https://developers.glean.com/api-info/client/getting-started/overview)[

### Indexing API

The Indexing API (also known as the Push API) pushes documents, users, permissions, and metadata to Glean. This API enables you to programmatically manage indexing and content integration with the Glean platform.







](https://developers.glean.com/api-info/indexing/getting-started/overview)

## API Tokens[​](#api-tokens "Direct link to API Tokens")

Different types of tokens are available depending on your integration needs:

Indexing Tokenobject\*

These tokens are used to index data from internal tools or apps that Glean does not natively support, including documents, users, permissions, and related metadata. Use them with the Indexing REST API to send that data to Glean through HTTP requests.

**Features:**

-   Configurable token rotation period in minutes
-   IP range restrictions for requests
-   Connector\-specific or global permissions
-   Required expiration date

Client Tokenobject\*

These tokens are utilized for making API calls to Glean's Client API. They can be scoped either to a single user or globally, allowing the caller to act as multiple users.

**Features:**

-   Configurable scopes for specific request types (e.g., Chat, Answers, Search)
-   Permissions can be set to self, another user, or global (if Super Admin)
-   Configurable expiry date

Authentication Token API Keyobject\*

These tokens are used to create authentication tokens on behalf of any user.

**Features:**

-   Only one authentication key can be active at a time

## See also[​](#see-also "Direct link to See also")

[

### API Troubleshooting Guide

Access our comprehensive guide for troubleshooting common REST API issues and solutions.







](https://developers.glean.com/api/indexing-api/troubleshooting-overview)
