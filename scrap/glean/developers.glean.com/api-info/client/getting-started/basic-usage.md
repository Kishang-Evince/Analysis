---
url: "https://developers.glean.com/api-info/client/getting-started/basic-usage"
canonical: "https://developers.glean.com/api-info/client/getting-started/basic-usage"
title: "Client API Usage Guide | Glean Developer"
description: "Learn the core concepts and patterns for building applications with Glean's Client API. This guide focuses on understanding what you can build and how the API works, rather than language-specific implementation details."
fetched_at: "2026-09-01T13:22:50.083Z"
---
On this page

Learn the core concepts and patterns for building applications with Glean's Client API. This guide focuses on understanding what you can build and how the API works, rather than language-specific implementation details.

**Choose Your SDK**

Ready to start coding? Check out our [official API clients](/libraries/api-clients) for Python, TypeScript, Go, and Java with complete examples and installation instructions.

## Core APIs[​](#core-apis "Direct link to Core APIs")

### Chat API - Conversational AI[​](#chat-api---conversational-ai "Direct link to Chat API - Conversational AI")

Ask questions and get AI-powered answers grounded in your organization's knowledge.

**Request Format:**

```
curl -X POST https://your-instance-be.glean.com/rest/api/v1/chat \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "messages": [      {        "author": "USER",        "fragments": [          { "text": "What is our vacation policy?" }        ]      }    ]  }'
```

**Response Structure:**

```
{  "messages": [    {      "messageType": "CONTENT",       "author": "GLEAN_AI",      "fragments": [        {          "text": "Based on our employee handbook, the vacation policy allows..."        },        {          "citation": {            "sourceDocument": {              "title": "Employee Handbook 2024",              "url": "https://company.com/handbook",              "snippet": "Employees accrue 15 days of PTO annually..."            }          }        }      ]    }  ],  "chatId": "chat_abc123",  "followUpPrompts": [    "What are the paid time off policies?",    "How do I request vacation time?"  ],  "backendTimeMillis": 1200,  "chatSessionTrackingToken": "session_xyz789"}
```

**Key Concepts:**

-   **Fragments**: Mix of text content and citations in responses
-   **Chat ID**: Use `chatId` for follow-up messages in the same conversation
-   **Citations**: Source documents that informed the AI's response (inline in fragments)
-   **Follow-up Prompts**: Suggested questions based on the response context
-   **Tracking Tokens**: For analytics and feedback reporting
-   **Streaming**: Set `"stream": true` for real-time response chunks
-   **Multi-turn**: Include previous messages for conversational context

### Search API - Enterprise Search[​](#search-api---enterprise-search "Direct link to Search API - Enterprise Search")

Find documents, people, and information across all connected systems.

**Request Format:**

```
curl -X POST https://your-instance-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "query": "quarterly planning",    "pageSize": 10,    "requestOptions": {      "datasourcesFilter": ["confluence", "gdrive"],      "facetBucketSize": 100    }  }'
```

**Response Structure:**

```
{  "results": [    {      "title": "Q4 Planning Document",      "url": "https://company.com/q4-plan",      "snippets": [        { "snippet": "Our Q4 objectives focus on...", "mimeType": "text/plain" }      ],      "metadata": {        "datasource": "confluence",        "documentId": "doc_123",        "createTime": "2024-01-15T10:30:00Z",        "updateTime": "2024-01-15T10:30:00Z",        "author": {          "name": "Jane Smith"        }      }    }  ],  "facetResults": [    {      "sourceName": "datasource",      "operatorName": "SelectMultiple",      "buckets": [        { "value": { "stringValue": "confluence" }, "count": 15 },        { "value": { "stringValue": "gdrive" }, "count": 8 }      ]    }  ],  "trackingToken": "...",  "requestID": "req_abc123"}
```

**Key Concepts:**

-   **Results**: Array of documents with rich metadata
-   **Facets**: Aggregations for filtering and navigation, returned as a `facetResults` array (e.g., by datasource, author)
-   **Filters**: Narrow results by datasource, author, date, etc.
-   **Ranking**: Results ordered by relevance scoring

### Agents API - Pre-built Workflows[​](#agents-api---pre-built-workflows "Direct link to Agents API - Pre-built Workflows")

Execute specialized AI agents built in Glean's Agent Builder for complex workflows.

**Required Scopes:** `agents`, `chat`

**Request Format:**

```
curl -X POST https://your-instance-be.glean.com/rest/api/v1/agents/runs/wait \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "agent_id": "your-agent-id",    "input": {      "query": "Analyze our Q4 sales performance",      "region": "North America",      "timeframe": "Q4 2023"    }  }'
```

**Response Structure:**

```
{  "run": {    "agent_id": "your-agent-id",    "input": {      "query": "Analyze our Q4 sales performance",      "region": "North America",      "timeframe": "Q4 2023"    },    "status": "success"  },  "messages": [    {      "role": "GLEAN_AI",      "content": [        {          "text": "Based on the Q4 sales data, I found that sales increased 15% compared to Q3...",          "type": "text"        }      ]    }  ]}
```

**Key Concepts:**

-   **Agent ID**: Unique identifier for pre-built agents in Agent Builder
-   **Input vs Messages**: Use `input` object for data OR `messages` array for conversation
-   **Run Status**: "success" or "error" indicating execution result
-   **Response Messages**: Agent responses in message format with role and content
-   **Wait vs Stream**: Use `/runs/wait` for complete response or `/runs/stream` for real-time

## Common Integration Patterns[​](#common-integration-patterns "Direct link to Common Integration Patterns")

### Pattern 1: Content Discovery[​](#pattern-1-content-discovery "Direct link to Pattern 1: Content Discovery")

Use search to help users discover and navigate to specific documents:

1

Initial Discovery Search

Start with a broad search to find relevant content:

```
curl -X POST https://your-instance-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "query": "employee onboarding",    "pageSize": 10,    "requestOptions": {      "facetBucketSize": 100    }  }'
```

2

Present Results with Navigation

Show users the search results with links to actual documents, plus facets for further filtering:

-   Display document titles, snippets, and direct links
-   Show facet counts (e.g., "Confluence (15)", "Google Drive (8)")
-   Allow users to click through to read full documents

3

Follow-up Questions

Once users have context from reading documents, they can ask specific questions via chat:

```
curl -X POST https://your-instance-be.glean.com/rest/api/v1/chat \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "messages": [      {        "author": "USER",        "fragments": [          { "text": "What are the steps for setting up a new employee'\''s laptop?" }        ]      }    ]  }'
```

### Pattern 2: Progressive Conversations[​](#pattern-2-progressive-conversations "Direct link to Pattern 2: Progressive Conversations")

Build multi-turn conversations that maintain context:

```
# First messagecurl -X POST https://your-instance-be.glean.com/rest/api/v1/chat \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "messages": [      {        "author": "USER",        "fragments": [{ "text": "What are our company'\''s main products?" }]      }    ]  }'# Follow-up using chatIdcurl -X POST https://your-instance-be.glean.com/rest/api/v1/chat \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "chatId": "chat_abc123",    "messages": [      {        "author": "USER",         "fragments": [{ "text": "What are our company'\''s main products?" }]      },      {        "author": "GLEAN_AI",        "fragments": [{ "text": "Our main products include..." }]      },      {        "author": "USER",        "fragments": [{ "text": "Which one generates the most revenue?" }]      }    ]  }'
```

### Pattern 3: Faceted Search Navigation[​](#pattern-3-faceted-search-navigation "Direct link to Pattern 3: Faceted Search Navigation")

Use facets to help users navigate and filter results:

1

Initial Search

Start with a broad search to understand available content:

```
curl -X POST https://your-instance-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "query": "project planning",    "pageSize": 10,    "requestOptions": {      "facetBucketSize": 100    }  }'
```

2

Show Facets

Display facet counts to users (e.g., "Confluence (15)", "Google Drive (8)")

3

Filtered Search

Let users click facets to refine results:

```
curl -X POST https://your-instance-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "query": "project planning",    "pageSize": 10,    "requestOptions": {      "datasourcesFilter": ["confluence"],      "facetFilters": [        {          "fieldName": "author",          "values": ["Jane Smith"]        }      ],      "facetBucketSize": 100    }  }'
```

### Pattern 4: Streaming for Real-time UX[​](#pattern-4-streaming-for-real-time-ux "Direct link to Pattern 4: Streaming for Real-time UX")

Use streaming for interactive chat experiences:

```
curl -X POST https://your-instance-be.glean.com/rest/api/v1/chat \  -H 'Authorization: Bearer <your_token>' \  -H 'Content-Type: application/json' \  -d '{    "stream": true,    "messages": [      {        "author": "USER",        "fragments": [{ "text": "Explain our Q4 strategy" }]      }    ]  }'
```

Handle the streaming response to show text as it arrives, creating a more engaging user experience.

## What You Can Build[​](#what-you-can-build "Direct link to What You Can Build")

### Knowledge Chatbots

Build conversational interfaces that answer questions using your organization's content

### Search Applications

Create custom search experiences with filtering, faceting, and result customization

### Content Discovery

Help users find relevant documents and experts across your organization

### Workflow Automation

Use agents to automate complex business processes and analysis

## Implementation Resources[​](#implementation-resources "Direct link to Implementation Resources")

[

### Official API Clients

Python, TypeScript, Go, and Java SDKs with complete examples







](/libraries/api-clients)[

### Complete Examples

Step-by-step tutorials for building real applications







](/guides/chat/chatbot-example)[

### Authentication Setup

How to get and manage API tokens







](/api-info/client/authentication/overview)[

### Advanced Search

Master filtering, faceting, and result customization







](/guides/search/filtering-results)

**Ready to Start Coding?**

Check out our [API clients documentation](/libraries/api-clients) for your preferred programming language, complete with installation instructions and working examples.
