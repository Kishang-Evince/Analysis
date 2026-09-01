---
url: "https://developers.glean.com/libraries/api-clients"
canonical: "https://developers.glean.com/libraries/api-clients"
title: "API Clients | Glean Developer"
description: "Official API clients for integrating Glean's search and AI capabilities into your applications"
fetched_at: "2026-09-01T13:23:03.747Z"
---
On this page

Glean offers official API clients for several popular programming languages to help developers integrate Glean's powerful search and knowledge capabilities into their applications. These clients provide language-specific interfaces to Glean's APIs, making it easier to build custom solutions without having to handle the low-level HTTP requests.

info

**Authentication Required**: For per-user Client API features such as search and chat, prefer an OAuth access token; the SDKs accept it through the same credential field as a Glean-issued token. Use [Client API authentication](/api-info/client/authentication/overview) to choose the access model. Indexing API document-management operations require [Glean-issued tokens](/api-info/indexing/authentication/overview).

tip

**Unified Libraries**: These API clients support **both Client API and Indexing API** functionality. Use the same library with different tokens depending on whether you're building user-facing features (Client API) or managing document indexing (Indexing API).

## Choose Your Language[​](#choose-your-language "Direct link to Choose Your Language")

Select your preferred programming language to get started with the official Glean API client:

[

### Python

Full-featured Python client with framework integrations for FastAPI, Django, and Streamlit







](/libraries/api-clients/python)[

### TypeScript

Type-safe client for Node.js and browser applications with React, Next.js, and Express examples







](/libraries/api-clients/typescript)[

### Go

Idiomatic Go client with concurrency patterns and framework integrations for Gin and Echo







](/libraries/api-clients/go)[

### Java

Enterprise-ready Java client with Spring Boot integration and reactive programming support







](/libraries/api-clients/java)

## What's Included[​](#whats-included "Direct link to What's Included")

All official API clients provide:

### **Client API Features**[​](#client-api-features "Direct link to client-api-features")

-   **Chat API**: Build conversational AI applications
-   **Search API**: Integrate enterprise search capabilities
-   **Agents API**: Execute pre-built agents from Agent Builder
-   **Collections API**: Manage and search document collections

### **Indexing API Features**[​](#indexing-api-features "Direct link to indexing-api-features")

-   **Document Management**: Index, update, and delete documents
-   **User Management**: Manage users, groups, and permissions
-   **Datasource Configuration**: Set up and configure data sources
-   **Bulk Operations**: Efficient batch processing for large datasets

### **Developer Experience**[​](#developer-experience "Direct link to developer-experience")

-   **Type Safety**: Full type definitions and IntelliSense support
-   **Error Handling**: Structured error responses and retry mechanisms
-   **Framework Integration**: Examples for popular web frameworks
-   **Testing Support**: Mock examples and integration test patterns
-   **Documentation**: Comprehensive guides with real-world examples

### **Production Ready**[​](#production-ready "Direct link to production-ready")

-   **Rate Limiting**: Automatic handling with exponential backoff
-   **Timeout Control**: Configurable request timeouts
-   **Connection Pooling**: Efficient HTTP connection management
-   **Security**: Best practices for token management

## Getting Started[​](#getting-started "Direct link to Getting Started")

1.  **Choose your language** from the cards above
2.  **Follow the installation** instructions for your package manager
3.  **Get your credentials**:
    -   [Client API authentication](/api-info/client/authentication/overview) for search and chat features; OAuth is preferred for per-user integrations
    -   [Indexing API Glean-issued tokens](/api-info/indexing/authentication/overview) for document management
4.  **Start building** with the provided examples

## Alternative Integration Options[​](#alternative-integration-options "Direct link to Alternative Integration Options")

If you prefer not to use an API client library:

[

### Direct HTTP Requests

Use Glean's REST APIs directly with your preferred HTTP library







](/api/client-api)[

### Web SDK

Frontend JavaScript components for search and chat interfaces







](/libraries/web-sdk/overview)

## Need Help?[​](#need-help "Direct link to Need Help?")

[

### Client API Auth

Authentication for search and chat







](/api-info/client/authentication/overview)[

### Indexing API Auth

Authentication for document management







](/api-info/indexing/authentication/overview)[

### Agent Building

Learn about building AI agents







](/guides/agents/overview)
