---
url: "https://docs.glean.com/connectors/native/netsuite/"
canonical: "https://docs.glean.com/connectors/native/netsuite/"
title: "NetSuite"
description: "Learn how to integrate NetSuite with Glean using the NetSuite search integration or NetSuite MCP."
fetched_at: "2026-09-01T13:29:35.726Z"
---
On this page

Glean offers two ways to integrate with NetSuite. Each serves a different purpose, uses a different authentication model, and delivers a different experience for admins and end users.

[

### NetSuite search integration

Index NetSuite records into Glean search using machine‑to‑machine OAuth with certificates and a scheduled crawl.







](/connectors/native/netsuite/connector)[

### NetSuite MCP

Give users live access to NetSuite tools from Glean using per‑user OAuth authorization and a non‑admin NetSuite role.







](/connectors/native/netsuite/mcp)

## At a glance[​](#at-a-glance "Direct link to At a glance")

|  | NetSuite search integration | NetSuite MCP |
| --- | --- | --- |
| **Purpose** | Index NetSuite records into Glean search | Connect Glean to NetSuite's MCP server for live tool access |
| **Data model** | Crawled and indexed | Live access at request time |
| **Authentication** | Machine‑to‑machine OAuth with certificates | Per‑user OAuth authorization |
| **Setup owner** | NetSuite admin and Glean admin | NetSuite admin and Glean admin |
| **End-user experience** | Search and open indexed NetSuite results | Run NetSuite tools from Glean |

## Which one should you start with?[​](#which-one-should-you-start-with "Direct link to Which one should you start with?")

We strongly recommend enabling both integrations for the best NetSuite experience in Glean. NetSuite MCP depends on the native NetSuite connector being set up.

Start with the **NetSuite search integration** to make NetSuite content broadly searchable in Glean. Then add **NetSuite MCP** to give users live access to NetSuite tools.

The search integration handles indexing and search, while MCP handles live tool-based workflows. Using both gives your organization searchable NetSuite records and live tool access in one place.

For an overview of NetSuite in Glean, see the [NetSuite integration page](https://www.glean.com/connectors/netsuite).
