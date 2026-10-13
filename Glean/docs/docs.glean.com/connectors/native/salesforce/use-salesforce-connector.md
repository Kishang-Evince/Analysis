---
url: "https://docs.glean.com/connectors/native/salesforce/use-salesforce-connector"
canonical: "https://docs.glean.com/connectors/native/salesforce/use-salesforce-connector"
title: "Use the Salesforce Connector"
description: "This topic describes the most common usage scenarios for the Salesforce connector."
fetched_at: "2026-10-13T08:50:13.613Z"
---
On this page

This topic describes the most common usage scenarios for the Salesforce connector.

## Search experience (Sales Cloud and Service Cloud)[​](#search-experience-sales-cloud-and-service-cloud "Direct link to Search experience (Sales Cloud and Service Cloud)")

Once configured, Salesforce content appears in **Glean Search** alongside results from your other connectors.

Key behaviors:

-   Users can filter by the Salesforce app (e.g., `app:salescloud` or `app:servicecloud`) to focus on Salesforce results.
    
-   Within Salesforce, results can reflect different objects and experiences (e.g., Accounts, Opportunities, Cases, Knowledge); Glean may label some results as **Sales Cloud** or **Service Cloud**, based on the underlying object and configuration.
    
-   For Salesforce Knowledge articles with multiple language versions, Glean shows the article's master-language version in search so results are consistent and deterministic.
    
-   Fields configured as **facets** (e.g., status, stage, region) can be used as filters in the search UI, enabling queries like “open cases for Acme in the last 30 days” or “opportunities in stage Negotiation closing this quarter.”
    
-   When Live Mode is enabled, Glean can supplement indexed results with current Salesforce federated-search results. Coverage depends on the configured and searchable Salesforce objects and Salesforce retrieval limits.
    

## How to search Salesforce[​](#how-to-search-salesforce "Direct link to How to search Salesforce")

Glean provides two ways to find Salesforce data. Use Glean Search for broad search across indexed Salesforce content, and use **Search Salesforce with SOQL** for live, structured queries. Live Salesforce retrieval requires the tool to be enabled and your Salesforce authorization.

| What you want to do | What Glean uses | Where the data comes from |
| --- | --- | --- |
| Search Salesforce content alongside other company content | **Glean Search** | Primarily the Salesforce content that has been crawled and indexed. Eligible experiences may also blend in live data when data fetching is enabled and you have authorized Salesforce. |
| Run a live query against Salesforce records | **Search Salesforce with SOQL** | Glean runs a live SOQL query against Salesforce at request time using your Salesforce authorization. It does not wait for the next crawl. |
| Let an Agent retrieve Salesforce records as part of a workflow | An Agent with **Salesforce Tools** enabled | The specific Salesforce tool configured in the Agent. Use **Search Salesforce with SOQL** when the Agent needs current structured data or a multi-record query. |

### How Glean uses indexed and live Salesforce data[​](#how-glean-uses-indexed-and-live-salesforce-data "Direct link to How Glean uses indexed and live Salesforce data")

-   Glean uses indexed Salesforce data for broad discovery, relevance-ranked search, and content that has already completed a crawl.
-   When Live Mode is enabled, Glean can supplement indexed results with current Salesforce federated-search results. Coverage depends on the configured and searchable Salesforce objects and Salesforce retrieval limits.
-   A Salesforce admin must configure the Salesforce data model, and you must authorize Salesforce for the tool before Glean can use live SOQL. If the tool is not enabled or you have not authorized Salesforce, Glean cannot use live SOQL for that request.
-   Live and indexed retrieval are complementary. A live query does not replace crawling: crawls provide broad searchable coverage and permission metadata, while live SOQL provides current, structured Salesforce records.

## Glean and Salesforce tools[​](#glean-and-salesforce-tools "Direct link to Glean and Salesforce tools")

**Glean** can answer natural‑language questions grounded in Salesforce data, for example:

-   “Show the top 10 opportunities closing this quarter by amount, with owner and stage.”
-   “List escalated cases for Contoso created this week, with subject, status, and owner.”

To support these, Glean provides **Salesforce Tools**, including:

-   **Search Salesforce with SOQL** – translate natural‑language questions into SOQL, execute queries, and use results as grounding for answers.

This tool:

-   Is configured by admins in **Admin console** → **Platform** → **Tools** (or the **Tools** step in the Salesforce connector setup flow).
    
-   Typically requires users to **authorize Salesforce** via OAuth, which is separate from the connector’s service account authorization.
    

Live retrieval uses the requesting user’s Salesforce OAuth authorization. Indexed search uses crawled Salesforce content and Glean’s **connector‑mirrored permissions**. Both paths are record-level permission-aware, but the Salesforce connector does not enforce field-level security at query time; configure sensitive fields appropriately in the connector.

For multi-record, filtered, or aggregated queries in agents, use [Search Salesforce with SOQL](/tools/connector/salesforce/search-salesforce-with-soql). See [Limits and retrieval best practices](/agents/concepts/limits-and-best-practices) for guidance on choosing the right retrieval approach.

## Glean Agents and workflows[​](#glean-agents-and-workflows "Direct link to Glean Agents and workflows")

**Glean Agents** can orchestrate Salesforce tools as part of multi‑step workflows, for example:

-   **Pipeline hygiene agents** that:
    
    -   Fetch opportunities meeting certain conditions (e.g., stale, high‑value).
    -   Propose updates (e.g., stages, forecast categories) based on activity across tools.
    -   Optionally **update Salesforce Opportunities** via write tools after human review.
-   **Support triage agents** that:
    
    -   Take a case description as input.
    -   Retrieve similar historical cases and relevant Knowledge articles from Salesforce.
    -   Combine them with context from other systems (Slack, Confluence) to suggest next steps.

Admins can control which tools are available to which agents and who can configure or invoke write tools via **tool‑level RBAC** in Glean.

## Embedded in Salesforce[​](#embedded-in-salesforce "Direct link to Embedded in Salesforce")

Glean can be **embedded inside Salesforce Service Cloud** so that when agents open a Case, they see a Glean panel suggesting relevant Knowledge articles, similar historical cases, and cross‑tool context (e.g., Slack threads, internal docs) without leaving Salesforce.
