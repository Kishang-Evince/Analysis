---
url: "https://docs.glean.com/connectors/native/salesforce/use-salesforce-connector"
canonical: "https://docs.glean.com/connectors/native/salesforce/use-salesforce-connector"
title: "Use the Salesforce Connector"
description: "This topic describes the most common usage scenarios for the Salesforce connector."
fetched_at: "2026-09-01T13:29:39.902Z"
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
    
-   When data fetching is enabled and users have connected their salesforce accounts, Glean blends live data with the indexed corpus. For example:
    
    -   **Recent opportunities**: A sales representative creates a new opportunity for *Acme – Q3 expansion* and immediately searches for it in Glean. Even if an incremental crawl has not yet occurred, Glean uses data fetching to query salesforce at search time and return the new record.
    -   **Real-time case lists**: A support lead searches for `open P1 cases for Contoso created today`. Glean combines indexed cases with a live call to salesforce to ensure the result set includes cases created only minutes prior.

## Glean and Salesforce tools[​](#glean-and-salesforce-tools "Direct link to Glean and Salesforce tools")

**Glean** can answer natural‑language questions grounded in Salesforce data, for example:

-   “Show the top 10 opportunities closing this quarter by amount, with owner and stage.”
-   “List escalated cases for Contoso created this week, with subject, status, and owner.”

To support these, Glean provides **Salesforce Tools**, including:

-   **Search Salesforce** – query Salesforce using user‑level OAuth context.
-   **Search Salesforce with SOQL** – translate natural‑language questions into SOQL, execute queries, and use results as grounding for answers.

These tools:

-   Are configured by admins in **Admin Console** → **Platform** → Tools (or the Tools step in the Salesforce connector setup flow).
    
-   Typically require users to **authorize Salesforce** for tools via OAuth, which is separate from the connector’s service account authorization.
    

Because Glean uses both Glean’s **connector‑mirrored permissions** and per‑user OAuth where applicable, answers are **record‑level permission‑aware**—users do not see records they cannot see in Salesforce.

For exhaustive enumeration in agents — for example, listing every opportunity closing this quarter — use [Search Salesforce with SOQL](/tools/connector/salesforce/search-salesforce-with-soql) rather than company search. See [Limits and exhaustive retrieval best practices](/agents/concepts/limits-and-best-practices) for guidance on choosing the right retrieval approach.

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
