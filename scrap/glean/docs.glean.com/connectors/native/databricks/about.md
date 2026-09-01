---
url: "https://docs.glean.com/connectors/native/databricks/about"
canonical: "https://docs.glean.com/connectors/native/databricks/about"
title: "Databricks overview"
description: "Learn what the Glean Databricks connector indexes, how it enforces Databricks permissions, and which objects are out of scope."
fetched_at: "2026-09-01T13:29:25.218Z"
---
On this page

The Glean Databricks connector indexes Databricks AI/BI Dashboards (formerly Lakeview Dashboards) and Databricks Genie spaces, including their metadata. This integration adds Databricks content to Glean’s search while enforcing existing permissions. The connector supports Databricks deployments on AWS, GCP, and Azure.

To connect Databricks to Glean, see [Setup](/connectors/native/databricks/setup).

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The Databricks connector indexes the following entities:

-   **Dashboard**: All dashboards, including content and permissions.
-   **Genie space**: Genie space documents, including title, description, and workspace metadata. When serialized space data is available, the connector appends serialized Genie space content to the document body and adds table metadata as facets.
-   **Workspace**: Workspace metadata (except for Azure).
-   **User and groups**: All users, account groups, and system groups.

## Key features[​](#key-features "Direct link to Key features")

-   **Comprehensive Indexing:** The connector crawls dashboard content and metadata, including creation/update timestamps, title, and datasets. It also crawls Genie spaces and their metadata, including title, description, workspace information, and serialized Genie space data when available.
-   **Permission Enforcement:** It strictly enforces Databricks permissions for both dashboards and Genie spaces, including explicit and inherited access, at query time.
-   **Unified Identity:** It fetches user and group identities and memberships to accurately map permissions in Glean.

## Limitations[​](#limitations "Direct link to Limitations")

-   **Crawling:** The connector relies on full content crawls; it does not support incremental crawls or webhooks, so deletions are detected only during full crawls.
-   **API Scope:** The connector's indexing is limited to static objects and does not support audit activity or user actions due to API limitations. Some fields, such as dashboard author/updater, are not available for indexing.
-   **No Granular Permissions:** Only admin-level assignment and access are supported for crawling.
-   **Azure Configuration:** Azure Databricks does not support the "list all workspaces" API; you must provide explicit workspace URLs during setup.

## See also[​](#see-also "Direct link to See also")

-   [Databricks setup](/connectors/native/databricks/setup)
-   [Databricks FAQs](/connectors/native/databricks/faqs)
