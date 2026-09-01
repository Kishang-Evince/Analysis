---
url: "https://docs.glean.com/user-guide/mcp/overview"
canonical: "https://docs.glean.com/user-guide/mcp/overview"
title: "MCP examples by role"
description: "Real-world examples of using Glean's MCP server across different job functions"
fetched_at: "2026-09-01T13:30:42.471Z"
---
On this page

This guide provides practical, tested examples of using Glean's MCP server in tools like Cursor, Claude Desktop, VS Code, and other MCP hosts. These examples come from real usage patterns and have been validated in production environments.

## Examples by role[​](#examples-by-role "Direct link to Examples by role")

The role-specific examples in this guide are organized by job function. Each example includes:

-   **Common use cases**: What teams actually accomplish with MCP
-   **Real prompts**: Copy-paste examples you can try immediately
-   **Prerequisites**: Required connectors and setup
-   **Best practices**: Tips for getting better results

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before using these examples, make sure you have:

1.  **MCP server configured**: Navigate to **Settings** → **Install** → **MCP Configurator** to install the MCP server in your MCP host
2.  **Relevant connectors**: Connect the connectors your team uses
3.  **Appropriate permissions**: Verify you can access the connectors you need

tip

The effectiveness of these examples depends on having the right connectors connected. Each role section lists recommended connectors.

## Examples by Role[​](#examples-by-role-1 "Direct link to Examples by Role")

[

### Engineering

Debug errors, review PRs, understand code history, generate documentation







](/user-guide/mcp/engineering)[

### Product Management

Draft PRDs, track projects, analyze feedback, research competitors







](/user-guide/mcp/product-management)[

### Support

Triage tickets, find solutions, draft responses, identify knowledge gaps







](/user-guide/mcp/support)[

### Sales

Research accounts, prepare for calls, track deals, draft outreach







](/user-guide/mcp/sales)[

### Data Analytics

Query databases, identify trends, generate reports, detect anomalies







](/user-guide/mcp/data-analytics)[

### Operations

IT troubleshooting, HR policies, meeting prep, incident response







](/user-guide/mcp/operations)

## How MCP Tools Work[​](#how-mcp-tools-work "Direct link to How MCP Tools Work")

When you use Glean's MCP server, your AI assistant can:

-   **Search Glean**: Find relevant documents, conversations, and code across your company
-   **Read documents**: Retrieve full content from specific URLs or IDs
-   **Query structured data**: Access databases, spreadsheets, and data warehouses
-   **Find people**: Look up employees and their areas of expertise
-   **Access email**: Search Gmail or Outlook for relevant messages
-   **Chat with Glean**: Ask Glean questions about your data

info

All MCP queries respect your existing permissions. You'll only see data you already have access to in Glean.

## Prompting Tips[​](#prompting-tips "Direct link to Prompting Tips")

To get the most from Glean's MCP server:

### Be Explicit About Tools[​](#be-explicit-about-tools "Direct link to Be Explicit About Tools")

Tell your AI assistant to use Glean:

-   ✅ "Search Glean for recent PRs related to authentication"
-   ✅ "Use Glean to find the design doc for feature X"
-   ❌ "Tell me about authentication" (may not use MCP)

### Specify Connectors[​](#specify-connectors "Direct link to Specify Connectors")

Mention specific connectors when relevant:

-   ✅ "Search Glean for Zendesk tickets about login errors"
-   ✅ "Find Slack conversations in #engineering about this bug"
-   ❌ "Find tickets about login errors" (less specific)

### Provide Context[​](#provide-context "Direct link to Provide Context")

Include relevant identifiers, dates, or keywords:

-   ✅ "Given Jira ticket EN-12345, find similar past issues"
-   ✅ "Search for discussions about the Q3 roadmap in the last 30 days"
-   ❌ "Find similar issues" (too vague)

### Iterate and Refine[​](#iterate-and-refine "Direct link to Iterate and Refine")

Start broad, then narrow based on results:

1.  "Search Glean for information about our deployment process"
2.  Review what comes back
3.  "Now focus on the Kubernetes deployment docs from the last quarter"
