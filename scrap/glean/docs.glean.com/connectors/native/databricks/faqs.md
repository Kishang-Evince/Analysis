---
url: "https://docs.glean.com/connectors/native/databricks/faqs"
canonical: "https://docs.glean.com/connectors/native/databricks/faqs"
title: "Databricks FAQs"
description: "Answers to frequently asked questions about the Glean Databricks connector, including required Databricks roles, missing content, and Azure configuration."
fetched_at: "2026-09-01T13:29:25.261Z"
---
On this page

### Why are account\_admin and workspace\_admin required?

Both roles are required to ensure the connector performs a complete and accurate crawl of your Databricks environment.

-   The connector needs **Account Admin** privileges to list all users and groups at the account level. This is essential because dashboards can have permissions assigned to users outside of their specific workspace. Without this global view, the connector cannot fully enforce permissions.
-   The **Workspace Admin** role is required to access the dashboard data and its permissions within each workspace.

No workaround is available at present until Databricks supports more granular permissions.

### Why is my new workspace, dashboard, or Genie space missing?

If the workspace, dashboard, or Genie space was added recently, it may not appear immediately. It will be picked up in the next full crawl.

### Do I need to configure anything special for Azure?

Yes, since Azure does not have a list-workspaces API, you must provide an array of workspace URLs.

### Can I crawl Databricks on GCP/AWS/Azure?

Yes, supported across all three. Only Azure requires special configuration and may have partial API support.

## See also[​](#see-also "Direct link to See also")

-   [Databricks overview](/connectors/native/databricks/about)
-   [Databricks setup](/connectors/native/databricks/setup)
