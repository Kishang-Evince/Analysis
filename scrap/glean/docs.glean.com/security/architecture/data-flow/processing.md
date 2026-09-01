---
url: "https://docs.glean.com/security/architecture/data-flow/processing"
canonical: "https://docs.glean.com/security/architecture/data-flow/processing"
title: "Data processing flow"
description: "How Glean combines connector content, permissions, and activity data into a secure tenant index."
fetched_at: "2026-09-01T13:29:55.203Z"
---
On this page

The data processing pipeline combines content from connected sources with permission mappings and user data, then indexes the result to create a secure, searchable knowledge base within your tenant.

## Data processing pipeline[​](#data-processing-pipeline "Direct link to Data processing pipeline")

note

All data storage occurs within your tenant's project. Your data is never stored outside your tenant's environment.

The processing pipeline combines:

-   Content from connected sources
-   Permission mappings
-   User data
-   Activity metrics such as creation, edits, and views

This combined data is then indexed to create a secure, searchable knowledge base within your tenant.

## See also[​](#see-also "Direct link to See also")

-   [Data flow](/security/architecture/data-flow/)
-   [Query flow](/security/architecture/data-flow/query)
-   [Data ingestion flow](/security/architecture/data-flow/ingestion)
