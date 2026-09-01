---
url: "https://docs.glean.com/connectors/native/powerbi/use-powerbi"
canonical: "https://docs.glean.com/connectors/native/powerbi/use-powerbi"
title: "Use Power BI in Glean"
description: "Find Power BI assets in Glean and ask natural-language questions about current Power BI data in Assistant."
fetched_at: "2026-09-01T13:29:38.732Z"
---
On this page

Power BI in Glean combines permission-aware discovery with questions about live data:

-   Use **Search** to find a report, dashboard, semantic model, or workspace.
-   Use **Assistant** to ask a question that requires current values from a Power BI semantic model.

## Choose the right experience[​](#choose-the-right-experience "Direct link to Choose the right experience")

| If you want to… | Use | What happens |
| --- | --- | --- |
| Find a report or dashboard | Glean Search | Glean searches indexed Power BI metadata and links to the asset in Power BI. |
| Understand what a report contains | Search or Assistant | Glean uses indexed report pages and visual metadata. Assistant can retrieve additional live report context when needed. |
| Ask for current numbers | Glean Assistant | Assistant uses the relevant semantic model and runs a live query through the Power BI MCP server. |
| Ask a follow-up about a known report | Glean Assistant | Assistant uses the report context and linked semantic model to answer the follow-up. |
| Check whether a user can see or query data | Power BI permissions | Glean controls indexed discovery, while Power BI evaluates live access and row-level security. |

## Find Power BI content in search[​](#find-power-bi-content-in-search "Direct link to Find Power BI content in search")

Search for the asset using its name, workspace, page, visual, table, measure, or business term. You can search for:

-   A report or dashboard name
-   A workspace name
-   A report page or visual title
-   A semantic-model table, column, or measure
-   A business metric or description used in the Power BI definition

Search results link to the corresponding Power BI asset. Glean indexes metadata and definitions, not the underlying table rows.

## Ask a live data question in Assistant[​](#ask-a-live-data-question-in-assistant "Direct link to Ask a live data question in Assistant")

Ask a specific question that identifies the business metric, time, and any filters you need. For example:

-   “In the **Revenue by Region** Power BI report, what was revenue by region last quarter?”
-   “Using the **Customer Health** semantic model, show the number of at-risk customers by segment this month.”
-   “From the **Vendor Risk Dashboard**, break down open high-risk issues by business unit.”
-   “Use the Power BI report I shared to compare this quarter’s pipeline with the same quarter last year.”

Assistant can retrieve report metadata or semantic-model schema before generating and executing a query. Power BI supplies current data for the answer. Glean does not rely on a cached table of Power BI values.

## Improve routing and answer quality[​](#improve-routing-and-answer-quality "Direct link to Improve routing and answer quality")

For the most reliable results:

1.  Name Power BI when the question could match multiple analytics sources.
2.  Include the report, dashboard, workspace, or semantic-model name when you know it.
3.  State the metric and the time.
4.  Include filters such as region, segment, product, or business unit.
5.  Ask for the level of detail you need, such as a total, trend, ranking, or breakdown.
6.  Use the existing measure name when you know it.

If you paste a Power BI link, Assistant can use the asset identifiers in supported workspace, report, semantic-model, and dashboard links. If it does not identify the asset, search for the asset in Glean first and ask the question from that result.

## Understand answer permissions[​](#understand-answer-permissions "Direct link to Understand answer permissions")

Live Power BI queries use the asking user’s delegated Power BI identity. Power BI evaluates that identity’s current access and applies row-level security at query time.

As a result:

-   Two users may receive different answers to the same question.
-   Finding a report in Glean does not guarantee that the user has Build permission on the report’s semantic model.
-   A user may be able to discover an asset but be unable to run a live query for its model.
-   Changes to Power BI access can affect live answers before the next Glean index refresh.

## Understand the data boundary[​](#understand-the-data-boundary "Direct link to Understand the data boundary")

Glean indexes Power BI metadata and definitions for discovery and routing. It does not index Power BI table rows, fact data, or exported report files. Live query results are returned at answer time and are not part of connector indexing.

For setup and permission requirements, see [Power BI indexing](/connectors/native/powerbi/connector) and [Power BI in Assistant](/connectors/native/powerbi/assistant).
