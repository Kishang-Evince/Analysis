---
url: "https://docs.glean.com/security/architecture/data-flow/ingestion"
canonical: "https://docs.glean.com/security/architecture/data-flow/ingestion"
title: "Data ingestion flow"
description: "How Glean's connectors retrieve, track, and map data from connected enterprise sources."
fetched_at: "2026-09-01T13:29:54.963Z"
---
On this page

Glean's data ingestion process is built around specialized connectors deployed within your tenant's dedicated cloud project. These connectors serve multiple purposes:

-   **Content retrieval**: Fetches content from connected enterprise sources. See [About connectors](/connectors/about).
-   **Activity tracking**: Monitors user interaction data.
-   **Permission mapping**: Maps and maintains access controls.

## Connection methods[​](#connection-methods "Direct link to Connection methods")

info

Data retrieval occurs over HTTPS, with two primary connection patterns depending on the connector location.

-   **SaaS applications**: For services like Google Drive, connections occur over the public internet using HTTPS.
-   **On-premises systems**: For internal systems like on-premises Jira, secure private connections are established through a VPN or Shared VPC. See [GCP on-premises connectivity](/security/cloud-prem/gcp/connecting-to-onprem-connectors).

## Ingestion paths[​](#ingestion-paths "Direct link to Ingestion paths")

Glean has three primary data ingestion paths.

### Indexing[​](#indexing "Direct link to Indexing")

Glean's standard approach to ingesting unstructured and semi-structured data, such as documents, wikis, emails, and files. Supported sources include Google Drive and Confluence.

### Tools[​](#tools "Direct link to Tools")

Integration of business logic and workflows through tools. Tools enable direct communication between Glean and third-party systems to trigger or retrieve information as needed. Typical use cases include ticket lookup, status update, quick access to app-level data, and dynamic retrieval from data warehouse platforms like Snowflake and Databricks.

### Context provisioning (MCP, Model Context Provisioning) \[upcoming\][​](#context-provisioning-mcp-model-context-provisioning-upcoming "Direct link to Context provisioning (MCP, Model Context Provisioning) [upcoming]")

The ability to programmatically provide context or signals to Glean without indexing content. This path highlights dynamic context injection, such as relevant metadata or recent activity, to improve search and responses.

## Glean's approach to structured data[​](#gleans-approach-to-structured-data "Direct link to Glean's approach to structured data")

-   Glean does not need to ingest or index structured data from systems like Snowflake, Databricks, or other data warehouses.
-   Glean focuses on knowledge work, which is unstructured and conversational data, rather than analytics or raw data processing.
-   Customers' structured data in these platforms remains untouched. Glean relies on metadata and context, not direct access.

## Key takeaways[​](#key-takeaways "Direct link to Key takeaways")

-   Glean ingests only what is necessary, respecting security and privacy boundaries.
-   Glean does not index structured datasets from data warehouse and business intelligence tools like Snowflake and Databricks.
-   Data ingestion is efficient, secure, and focused, which empowers end users without unnecessary data movement.

## See also[​](#see-also "Direct link to See also")

-   [Data flow](/security/architecture/data-flow/)
-   [Query flow](/security/architecture/data-flow/query)
-   [Data processing flow](/security/architecture/data-flow/processing)
