---
url: "https://developers.glean.com/guides/chat/overview"
canonical: "https://developers.glean.com/guides/chat/overview"
title: "Building Chat Applications | Glean Developer"
description: "Create conversational AI applications using Glean's Chat API and client libraries"
fetched_at: "2026-09-01T13:23:02.459Z"
---
On this page

Glean's Chat API enables you to build powerful conversational AI applications that can access your organization's knowledge. Whether you're creating a simple chatbot or a complex conversational interface, Glean provides the tools you need.

## Key Features[​](#key-features "Direct link to Key Features")

-   **Conversational AI**: Natural language conversations with context awareness
-   **Enterprise Knowledge**: Access to your organization's indexed content
-   **Streaming Responses**: Real-time response streaming for better user experience
-   **Citation Support**: Automatic source citations for transparency
-   **Multi-turn Conversations**: Maintain context across conversation turns

## Getting Started[​](#getting-started "Direct link to Getting Started")

[

### Chat API Overview

Learn about the Chat API endpoints and capabilities







](/api/client-api/chat/overview)[

### Chatbot Example

Build a complete chatbot using Glean's client libraries







](/guides/chat/chatbot-example)[

### Authentication

Set up authentication for your chat application







](/api-info/client/authentication/overview)[

### Client Libraries

Use our official SDKs for Python, TypeScript, Go, and Java







](/libraries/api-clients)

## Common Use Cases[​](#common-use-cases "Direct link to Common Use Cases")

### Customer Support Chatbot[​](#customer-support-chatbot "Direct link to Customer Support Chatbot")

Build a chatbot that can answer customer questions using your help documentation, FAQs, and knowledge base.

### Internal Knowledge Assistant[​](#internal-knowledge-assistant "Direct link to Internal Knowledge Assistant")

Create an internal tool that helps employees find company policies, procedures, and documentation.

### Developer Assistant[​](#developer-assistant "Direct link to Developer Assistant")

Build a coding assistant that can search through your codebase, documentation, and best practices.

### Sales Enablement Tool[​](#sales-enablement-tool "Direct link to Sales Enablement Tool")

Develop a tool that helps sales teams find relevant case studies, product information, and competitive intelligence.

## Architecture Patterns[​](#architecture-patterns "Direct link to Architecture Patterns")

### Simple Request-Response[​](#simple-request-response "Direct link to Simple Request-Response")

For basic Q&A scenarios where each query is independent.

### Conversational with Memory[​](#conversational-with-memory "Direct link to Conversational with Memory")

For multi-turn conversations that maintain context.

### RAG Pattern[​](#rag-pattern "Direct link to RAG Pattern")

For responses that need specific document context.

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Message Structure[​](#message-structure "Direct link to Message Structure")

-   Use clear, specific queries for better results
-   Include relevant context in system messages
-   Structure conversations with proper message types

### Error Handling[​](#error-handling "Direct link to Error Handling")

-   Implement retry logic for transient failures
-   Handle rate limiting gracefully
-   Provide fallback responses for API errors

### Performance Optimization[​](#performance-optimization "Direct link to Performance Optimization")

-   Use streaming for real-time responses
-   Implement caching for frequently asked questions
-   Optimize message history length

### Security Considerations[​](#security-considerations "Direct link to Security Considerations")

-   Validate and sanitize user inputs
-   Implement proper authentication
-   Respect user permissions and data access

## Next Steps[​](#next-steps "Direct link to Next Steps")

1.  **Start Simple**: Begin with the [Chatbot Example](/guides/chat/chatbot-example)
2.  **Explore APIs**: Review the [Chat API Reference](/api/client-api/chat/overview)
3.  **Choose Your Stack**: Select a [Client Library](/libraries/api-clients)
4.  **Deploy**: Consider hosting and scaling requirements

## Related Guides[​](#related-guides "Direct link to Related Guides")

-   [Agents Guide](/guides/agents/overview) - For more complex AI workflows
-   [Search Guide](/guides/search/overview) - For document retrieval patterns
-   [Authentication Guide](/api-info/client/authentication/overview) - For secure API access
