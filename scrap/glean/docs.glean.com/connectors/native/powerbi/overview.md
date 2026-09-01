---
url: "https://docs.glean.com/connectors/native/powerbi/overview"
canonical: "https://docs.glean.com/connectors/native/powerbi/overview"
title: "Power BI overview"
description: "Learn how Power BI indexing and live Assistant queries work in Glean."
fetched_at: "2026-09-01T13:29:38.757Z"
---
On this page

Power BI in Glean combines [permission-aware indexing](/connectors/native/powerbi/connector) with [live Assistant queries](/connectors/native/powerbi/assistant). Use indexing to discover governed workspaces, reports, semantic models, and dashboards, then use Assistant to retrieve current schema and data through the Microsoft Fabric Power BI MCP server.

## At a glance[​](#at-a-glance "Direct link to At a glance")

Glean provides two connected Power BI experiences:

|  | [Indexing](/connectors/native/powerbi/connector) | [Assistant](/connectors/native/powerbi/assistant) |
| --- | --- | --- |
| **Purpose** | Find Power BI assets and definitions in Glean | Ask natural-language questions about current Power BI data |
| **Data** | Indexed metadata and definitions | Live schema and query results retrieved at answer time |
| **Authentication** | Connector service principal with app-only client credentials | Delegated Microsoft Entra OAuth for each user |
| **Permissions** | Crawled workspace and item permissions control visibility | Power BI evaluates the user’s current access, including row-level security |
| **Setup owner** | Power BI and Glean administrators | Glean administrator, followed by end-user authorization |

## How Power BI works in Glean[​](#how-power-bi-works-in-glean "Direct link to How Power BI works in Glean")

The connector and the live MCP integration handle different parts of the same workflow:

-   **Indexing** makes workspaces, reports, semantic models, dashboards, and their available definitions discoverable in Glean.
-   **Routing** uses indexed names, relationships, page and visual metadata, tables, measures, and links to identify the relevant Power BI asset.
-   **Live querying** uses the linked semantic model to retrieve its current schema, generate a DAX query, and execute that query through the Microsoft Fabric Power BI MCP server to retrieve live data.
-   **Security** has two stages. Glean controls indexed discovery, and Power BI evaluates the user’s delegated access at query time.

Glean indexes metadata and definitions, not Power BI table rows or live query results.
