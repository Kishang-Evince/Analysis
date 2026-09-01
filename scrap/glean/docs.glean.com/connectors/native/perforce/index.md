---
url: "https://docs.glean.com/connectors/native/perforce/"
canonical: "https://docs.glean.com/connectors/native/perforce/"
title: "Perforce MCP connector for Glean Assistant"
description: "Learn what the Perforce MCP connector brings to Glean Assistant and how it works."
fetched_at: "2026-09-01T13:29:38.215Z"
---
On this page

The Perforce MCP connector lets [Glean Assistant](/user-guide/assistant/glean-chat/) access live [Perforce](https://www.perforce.com/) data at query time through an MCP server. It is currently an MCP-based integration for Glean Assistant, not a native indexed Perforce connector in Glean Search.

Users can ask natural-language questions about depot contents, changelists, and related metadata, and Glean Assistant retrieves the Perforce context needed to answer those questions.

## What you can do with it[​](#what-you-can-do-with-it "Direct link to What you can do with it")

Glean Assistant uses the connector to reason over your Perforce code and history. You can:

-   **Find and understand code:** Locate where a feature or function lives across a large depot, then get a plain-language explanation of how that module works.
-   **Trace history and changelists:** Ask why a piece of code changed, find the changelist that introduced it, and review the description, author, and timestamp behind the change.
-   **Investigate regressions and build breaks:** Compare the codebase between two changepoints to see what changed, and identify who made each change.
-   **See recent contributors:** Identify who most recently changed a given area of the code, and review the changelists behind those changes.

Because the connector works through Glean Assistant, Perforce is available alongside your other [connected sources](/connectors) in Glean.

## Example questions[​](#example-questions "Direct link to Example questions")

The following prompts show the kinds of questions Glean Assistant can answer once the connector is enabled:

> -   "Where in the depot is the payment retry logic implemented, and how does it work?"
> -   "Which changelist changed the login flow, and what problem was it fixing?"
> -   "What changed in the checkout service between last week's build and today, and who made those changes?"
> -   "Who has modified the search indexing module most in the last six months?"

## How it works[​](#how-it-works "Direct link to How it works")

Glean operates a Perforce MCP connector that exposes a set of tools and skills for Perforce operations, such as reading changelists and diffs. When you ask a question, Glean Assistant calls the appropriate tools at query time and retrieves only the code and history needed to answer it.

The integration is designed to respect the access controls and configuration of the deployed MCP setup. The MCP component runs in your own environment, alongside your Perforce server.

## Availability and setup[​](#availability-and-setup "Direct link to Availability and setup")

Perforce is in beta and available to a limited set of customers. There is no self-serve setup. To enable it, work with your Glean account team, solutions architect, or designated support contact. Setup is handled jointly with Glean and includes deploying [Glean's Perforce MCP server](https://github.com/askscio/p4mcp-server/tree/king-11/search-tools) in your environment.

## Current scope and limitations[​](#current-scope-and-limitations "Direct link to Current scope and limitations")

-   **Glean Assistant only.** The connector answers natural-language questions in Glean Assistant. It does not index Perforce content into Glean Search as a standalone connector.
-   **No native indexed connector yet.** A general-purpose indexing connector for Perforce depends on upcoming Perforce APIs and is not available today. Broader indexing support is under consideration for a future release.
