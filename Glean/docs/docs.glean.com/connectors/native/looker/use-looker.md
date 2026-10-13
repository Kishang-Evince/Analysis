---
url: "https://docs.glean.com/connectors/native/looker/use-looker"
canonical: "https://docs.glean.com/connectors/native/looker/use-looker"
title: "Use Looker in Glean"
description: "Learn how to find Looker assets and ask effective questions about governed Looker data in Glean Assistant."
fetched_at: "2026-10-13T08:50:02.942Z"
---
On this page

Glean combines permission-aware Looker discovery with live data questions. Use Search to find a saved asset or its definition. Use Assistant when you need a current answer from a governed Looker Model and Explore.

## Choose the right workflow[​](#choose-the-right-workflow "Direct link to Choose the right workflow")

| If you want to... | Use... | Why |
| --- | --- | --- |
| Find a saved Look or dashboard | Glean Search | Search uses indexed titles, descriptions, folders, dashboard text, and permissions. |
| Find a semantic domain or query target | Glean Search, when semantic indexing is enabled | Indexed Models and Explores provide routing context without storing raw LookML or data. |
| Re-run an existing saved report | Assistant with the saved Look or dashboard | Assistant can use the saved asset when its measure, grain, filters, and time range match the question. |
| Ask for a calculation that is not saved | Assistant with a Model and Explore | Assistant can inspect live schema and query the governed semantic layer. |
| Verify the definition or result | Open the linked Looker asset | Looker remains the source of truth for definitions, permissions, and current values. |

## Find Looker content[​](#find-looker-content "Direct link to Find Looker content")

Search for distinctive terms from the asset you need, such as:

-   The business metric or subject area
-   The Look or dashboard title
-   A folder name
-   Text from a dashboard tile, note, or description
-   A Model or Explore name, when semantic indexing is enabled

Open the result to verify the asset in Looker. A search result indicates that the content passed Glean’s indexed permission checks; it does not guarantee that the user can run every live query against the asset.

## Ask effective questions in Assistant[​](#ask-effective-questions-in-assistant "Direct link to Ask effective questions in Assistant")

State the metric, grain, filters, and time range explicitly. For example:

-   “What was gross margin for Europe, the Middle East, and Africa (EMEA) in the previous quarter? Use the Finance Explore.”
-   “How many accounts had more than 5M in annual recurring revenue in January, broken down by industry?”
-   “Compare new-logo pipeline by region for the last two completed quarters.”
-   “Run the weekly bookings Look and summarize the result.”

When several Models or Explores could answer the question, include the business domain or the exact Looker link. Assistant may use indexed routing, saved-asset metadata, or live discovery to resolve the target. Do not treat dashboard labels as metric definitions when the governed Model or Explore is available.

## Understand the answer path[​](#understand-the-answer-path "Direct link to Understand the answer path")

Assistant can use one of two paths:

1.  **Saved-asset path:** Assistant runs a Look or dashboard when the saved query matches the requested measure, grouping, filters, and time range.
2.  **Derived-query path:** Assistant selects a Model and Explore, retrieves the live schema it needs, and runs a read-only query through the managed Looker MCP server.

The semantic index provides routing context, not live results. It can help Assistant choose the right target, but Looker supplies the live schema and values at answer time. Do not use indexed documents as a substitute for live Looker values. If a saved Look or dashboard does not clearly cover a new measure, grouping, filter, or time range, verify the saved query definition or use the appropriate Model and Explore.

## Interpret permissions and results[​](#interpret-permissions-and-results "Direct link to Interpret permissions and results")

Two users can receive different results for the same question because Looker evaluates each user’s roles, content access, access grants, field visibility, and row restrictions. A user can find an indexed asset but receive an authorization error when trying to run it or query its Explore. The authenticated Looker user must have access to the Explore used by the live query.

If a question is ambiguous, Assistant should identify the unresolved Model, Explore, metric, or filter rather than silently calculate from dashboard labels. Ask the user to provide the exact Looker asset, semantic target, or business definition.

## What is not supported[​](#what-is-not-supported "Direct link to What is not supported")

Looker in Glean is read-only. Editing or publishing Looks, dashboards, Models, Explores, or LookML from Glean is not supported; make those changes in Looker.
