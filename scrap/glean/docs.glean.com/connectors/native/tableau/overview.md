---
url: "https://docs.glean.com/connectors/native/tableau/overview"
canonical: "https://docs.glean.com/connectors/native/tableau/overview"
title: "Tableau overview"
description: "Learn how Tableau indexing and live Assistant queries work in Glean."
fetched_at: "2026-09-01T13:29:44.897Z"
---
On this page

Tableau in Glean combines permission-aware indexing with live Assistant queries. Use the connector to discover Tableau workbooks and data source metadata in Glean Search, then use Tableau in Assistant to ask natural-language questions about live Tableau data when the Connected App setup is enabled. View metadata may appear within the parent workbook when view folding is enabled.

## At a glance[​](#at-a-glance "Direct link to At a glance")

Glean offers two ways to integrate with Tableau. Each serves a different purpose, and together they give your organization both searchable Tableau content and live data access in one place.

|  | [Indexing](/connectors/native/tableau/connector) | [Assistant](/connectors/native/tableau/assistant) |
| --- | --- | --- |
| **Purpose** | Index [Tableau workbooks and data source metadata](/connectors/native/tableau/connector#content-scope-and-supported-objects) into Glean Search | Let users ask natural-language questions about Tableau data in [Glean Assistant](/connectors/native/tableau/assistant) |
| **Data model** | Crawled and indexed metadata | Live access at request time |
| **Authentication** | [Connected App setup](/connectors/native/tableau/setup-connected-app) or [PAT setup](/connectors/native/tableau/setup-personal-access-token) | Connected App with per-user impersonation |
| **Setup owner** | Tableau admin and Glean admin | Tableau admin and Glean admin |
| **End-user experience** | Search and open [indexed Tableau results](/connectors/native/tableau/connector#content-visibility) | Ask natural-language questions and get live Tableau answers in [Glean Assistant](/connectors/native/tableau/assistant) |

For a detailed breakdown of who completes each setup, see [Who completes each setup?](/connectors/native/tableau/connector#who-completes-each-setup) in the Indexing topic.

## How Tableau works in Glean[​](#how-tableau-works-in-glean "Direct link to How Tableau works in Glean")

The Tableau connector and the Glean-hosted Tableau MCP integration handle different parts of the same workflow:

-   **Indexing** indexes Tableau workbook and data source metadata for permission-aware discovery. When view folding is enabled, view metadata is added to the parent workbook. The Connected App setup uses Connected App credentials; the PAT-based setup uses an admin Personal Access Token and per-user Tableau credentials.
-   **Assistant integration** uses the Connected App to impersonate each user and retrieve live, read-only results through the Glean-hosted Tableau MCP server.
-   **Permissions** remain enforced by Tableau. Glean applies indexed permissions for search, while live Assistant requests use the authenticated user’s Tableau access.
-   **Data freshness** differs by integration. Search results depend on crawl and webhook updates; Assistant retrieves current data at request time.

## Which one should you start with?[​](#which-one-should-you-start-with "Direct link to Which one should you start with?")

For the current Assistant-capable setup, start with [Connected App setup](/connectors/native/tableau/setup-connected-app) and configure the Tableau connector with Connected App credentials. After you select **Continue**, complete the **Connect** step in the same connector setup to enable Tableau tools.

For a PAT-based indexing setup, use [Personal Access Token setup](/connectors/native/tableau/setup-personal-access-token). Indexing handles discovery and navigation, while Assistant handles natural-language questions about live Tableau data.

info

To use Tableau in Assistant, configure the Tableau connector with Connected App credentials and complete the connector's **Connect** step in Glean.
