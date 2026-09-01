---
url: "https://developers.glean.com/get-started/key-terms"
canonical: "https://developers.glean.com/get-started/key-terms"
title: "Key Terms | Glean Developer"
description: "As you read our documentation, you may encounter terminology that is specific to Glean or has a particular meaning within the platform. Below are key definitions."
fetched_at: "2026-09-01T13:23:01.506Z"
---
On this page

As you read our documentation, you may encounter terminology that is specific to Glean or has a particular meaning within the platform. Below are key definitions.

[

### Core Concepts

Essential Glean platform concepts







](#core-concepts)[

### Authentication & Tokens

API authentication and token types







](#authentication--tokens)[

### Data & Content

Content sources and organization







](#data--content)[

### AI & Search Features

AI-powered capabilities







](#ai--search-features)[

### Platform Features

Built-in platform functionality







](#platform-features)[

### Development Tools

APIs, SDKs, and integrations







](#development-tools)

* * *

## Core Concepts[​](#core-concepts "Direct link to Core Concepts")

**Agent** – A Glean Agent is an AI program that performs tasks on behalf of users. Built using a visual interface or natural language prompts, agents require no coding. They can be conversational (e.g., chatbots answering questions) or task-based (e.g., automating workflows like IT ticket resolution or customer responses).

**Client API** – A RESTful API that enables developers to interact with Glean programmatically. It's used to build custom search and chat interfaces, integrate Glean into other tools, and let AI apps query enterprise knowledge using Glean's graph.

**Connector** – A connector links Glean to enterprise data sources (e.g., Slack, Google Drive, Outlook). It ingests content and permissions so information can be indexed, searched, and surfaced through Glean's AI-powered tools.

**Indexing API** – A RESTful API that allows organizations to push custom content into Glean's search index, making it accessible for search and generative AI applications.

**Web SDK** – A set of JavaScript libraries and UI components for embedding Glean's search and chat directly into websites or internal tools. It allows fast, customizable integration of core Glean functionality.

**MCP Server** – An implementation of the Model Context Protocol that provides tools and resources to MCP hosts. Can be local (STDIO) or remote (Streamable HTTP).

**Local MCP Server** – An MCP server that runs locally using STDIO communication, typically self-hosted on your own infrastructure.

**Remote MCP Server** – An MCP server that runs remotely and communicates via Streamable HTTP, often cloud-hosted.

**MCP Host** – An application that connects to and manages MCP servers, coordinating tool execution and resource access.

**MCP Client** – The component within an MCP host that handles the actual communication protocol with MCP servers.

* * *

## Authentication & Tokens[​](#authentication--tokens "Direct link to Authentication & Tokens")

**API Token** – Credentials for authenticating API requests. Glean provides Client API tokens (for user-facing APIs) and Indexing API tokens (for content management).

**User-Scoped Token** – A token tied to a specific user's permissions and data access.

**Global Token** – An administrative token that can impersonate any user (Super Admin only).

* * *

## Data & Content[​](#data--content "Direct link to Data & Content")

**Datasource** – A configured content source in Glean (e.g., Confluence, Slack, custom integrations).

**Index** – Glean's searchable content repository where all data must be added before search/AI can access it.

**Collection** – A curated group of documents organized around specific topics or purposes.

* * *

## AI & Search Features[​](#ai--search-features "Direct link to AI & Search Features")

**Chat** – Conversational AI interface for asking questions and getting insights from your enterprise data.

**Summarization** – AI-powered feature that creates concise summaries of documents or search results.

**Answer** – Structured Q&A entries that provide authoritative responses to common questions.

* * *

## Platform Features[​](#platform-features "Direct link to Platform Features")

**Announcement** – Company-wide communications distributed through Glean.

**Shortcut (GoLinks)** – Short, memorable links that redirect to frequently accessed resources.

**Pin** – Featured content that appears prominently in search results and recommendations.

**Verification** – Process to ensure content accuracy and relevance over time.

**Insight** – Analytics and metrics about content usage and search patterns.

* * *

## Development Tools[​](#development-tools "Direct link to Development Tools")

**API Client** – Auto-generated libraries available in Python, TypeScript, Go, and Java that provide language-specific interfaces for making HTTP requests to Glean's APIs.

**SDK** – Higher-level libraries that provide components, UI elements, and abstractions for building applications, beyond basic API request functionality.

**MCP Tool** – In the context of Model Context Protocol, a specific function or capability that can be invoked by MCP hosts (e.g., search, chat, document retrieval).

* * *

## Getting Help[​](#getting-help "Direct link to Getting Help")

[

### Documentation

Browse our complete documentation







](/)[

### API Reference

Detailed API specifications







](/api)[

### Support

Get help from our support team







](https://support.glean.com)
