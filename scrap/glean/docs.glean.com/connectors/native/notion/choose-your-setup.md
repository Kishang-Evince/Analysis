---
url: "https://docs.glean.com/connectors/native/notion/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/notion/choose-your-setup"
title: "Choose your Notion setup"
description: "Work out which of the two Notion setups is yours, the new setup or the existing setup, and how indexed search and read and write tools fit together in each."
fetched_at: "2026-09-01T13:29:35.902Z"
---
On this page

Glean connects to Notion in two ways. Which one is yours depends on your Glean deployment, not on when you personally connect Notion.

-   **New setup** applies to new Glean deployments. Deployments created on or after August 14th, 2026 use the new setup by default.
-   **Previous setup** applies to existing Glean deployments. Even if you are connecting Notion for the first time, your deployment keeps its current setup unless Glean enables the new flow for you.

Both paths use the same connector modes, the same Notion MCP tools, and the same permission model.

## Notion setup comparison: New versus previous[​](#notion-setup-comparison-new-versus-previous "Direct link to Notion setup comparison: New versus previous")

Both setups give you the same two retrieval modes, and those modes work the same way in each path. What differs is the onboarding experience and how much you configure up front.

-   **New setup** uses a guided flow. One pass authorizes Notion's MCP server, so read and write tools work right away, and collects your indexing credentials, so org-wide search turns on in the background once the first crawl completes.
-   **Existing setup** is the current connector setup page. You enter credentials, choose connector modes, share pages, and manage the crawl yourself.

The two connector modes are the same in both paths.

-   **Data crawling and indexing** builds an org-wide search index from the pages, databases, and blocks you share with the integration. This index is not permission-aware, so any shared content is visible to every Glean user who can access the connector. Share only content that is appropriate for org-wide visibility.
-   **Notion MCP** provides read and write tools. Each tool runs at query time using the user's own Notion authorization, so it respects that user's Notion permissions.

|  | New setup | Previous setup |
| --- | --- | --- |
| **What you prepare in Notion** | You authorize Notion's MCP server and share the pages Glean should index | You create the Glean integration, generate its internal token, and share pages, then enter the details on the connector setup page |
| **What you configure in Glean** | One guided flow: you authorize the MCP connection for tools and provide indexing credentials | You choose connector modes, enter credentials, and manage sharing and the crawl |
| **Who needs to be involved** | A Glean admin, and a Notion workspace admin | The same two roles |
| **How indexing runs** | In the background, on scheduled full crawls every 6 hours, with no webhooks | On the same schedule, which you monitor from the connector setup page |
| **Whose permissions apply** | MCP tools run as each user, and indexed content is visible org-wide | The same, in both modes |
| **What changes for your current setup** | Not applicable. You are connecting Notion for the first time | Nothing. Your connector, its credentials, and its crawl continue to run unchanged |
| **Where to start** | [Set up Notion](/connectors/native/notion/new-setup) | [Connect Notion with Glean](/connectors/native/notion/setup) |

For how each retrieval mode works, whose permissions it enforces, and its limitations, see the [Notion overview](/connectors/native/notion/about).

## See also[​](#see-also "Direct link to See also")

-   [Notion overview](/connectors/native/notion/about) covers objects, crawling, permissions, and limitations.
-   [Set up Notion](/connectors/native/notion/new-setup) is the new-setup flow.
-   [Connect Notion with Glean](/connectors/native/notion/setup) is the existing connector setup reference.
