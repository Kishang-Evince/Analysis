---
url: "https://docs.glean.com/connectors/native/klue/mcp"
canonical: "https://docs.glean.com/connectors/native/klue/mcp"
title: "Klue MCP"
description: "Set up Klue MCP to give users live access to Klue competitive intelligence from Glean."
fetched_at: "2026-09-01T13:29:33.385Z"
---
On this page

Klue MCP connects Glean to Klue's MCP server, giving users live access to Klue competitive intelligence tools. Unlike [Klue indexing](/connectors/native/klue/indexing), which indexes cards and battlecards into Glean search, Klue MCP provides real-time access at request time using each user's own Klue credentials.

Use Klue MCP when:

-   You want users to query Klue competitive intelligence in real time from Glean Assistant or Agents.
-   You want live, real-time access to Klue at request time, using each user's own Klue credentials rather than an indexed snapshot.
-   You want to use Klue tools alongside other MCP-backed tools in agent workflows.

info

Need searchable Klue cards and battlecards in Glean? Set up [Klue indexing](/connectors/native/klue/indexing) too. We recommend enabling both integrations.

## How it works[​](#how-it-works "Direct link to How it works")

Klue MCP is a vendor-hosted remote MCP server. When a user runs a Klue tool from Glean, the request goes directly to Klue's MCP server using the user's own OAuth token. Results reflect the user's individual Klue permissions.

The MCP server uses per-user OAuth via Dynamic Client Registration (DCR). Each user authorizes individually with Klue, and Glean stores the resulting OAuth token for subsequent MCP calls until it expires or is revoked.

## Indexing vs. MCP[​](#indexing-vs-mcp "Direct link to Indexing vs. MCP")

|  | Indexing | Klue MCP |
| --- | --- | --- |
| **Purpose** | Index Klue cards and battlecards into Glean search | Live access to Klue tools from Glean Assistant and Agents |
| **Data model** | Crawled and indexed | Live access at request time |
| **Authentication** | Admin API key | Per-user OAuth via DCR |
| **End-user experience** | Search and open indexed Klue results | Run Klue tools from Glean Assistant |

## Requirements[​](#requirements "Direct link to Requirements")

-   The Klue MCP server template is available as a vendor-provided MCP tool template in the Glean Admin Console.
-   A Glean administrator with permission to configure MCP connections.

## Setup[​](#setup "Direct link to Setup")

1.  In the Glean Admin Console, go to **Platform** > **Tools**.
2.  Click **Add**, then open the **Vendor provided tools (via MCP)** tab.
3.  Select the **Klue MCP** template. Its configuration opens with the MCP server name, description, and server URL already filled in. Klue MCP uses Streaming HTTP transport and per-user OAuth via Dynamic Client Registration, so you don't need to change these fields.
4.  Under **Connect to server**, click **Initiate connection** and complete the OAuth sign-in with Klue. Glean uses this connection to authenticate and discover the available Klue tools.
5.  Under **Enable tools**, click **Edit settings** to make the tools visible to all or selected teammates and to set who can access them.
6.  Click **Save**.

## Per-user authentication[​](#per-user-authentication "Direct link to Per-user authentication")

After setup, each user is prompted to authenticate with Klue the first time they use a Klue MCP tool. The user authorizes individually via Dynamic Client Registration (DCR), and Glean stores the resulting OAuth token for subsequent MCP calls until it expires or is revoked. Because access is per user, each user's results reflect their own Klue permissions.

## Verify the connection[​](#verify-the-connection "Direct link to Verify the connection")

After setup, confirm that Klue MCP is working:

1.  As an end user, open Glean Assistant and ask a competitive intelligence question.
2.  Confirm that a Klue tool fires and returns results with citations, reflecting the user's Klue permissions.
