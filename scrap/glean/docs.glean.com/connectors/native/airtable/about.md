---
url: "https://docs.glean.com/connectors/native/airtable/about"
canonical: "https://docs.glean.com/connectors/native/airtable/about"
title: "Airtable overview"
description: "Learn what the Glean Airtable connector indexes, how it enforces Airtable permissions, and which objects are out of scope."
fetched_at: "2026-09-01T13:29:21.961Z"
---
On this page

Airtable is a cloud-based platform that supports flexible project and data organization. The Glean Airtable connector allows you to index and search text records and comments from your Airtable Enterprise instance in real time, while strictly enforcing your existing Airtable permissions. This connector is available for Airtable Enterprise customers and provides secure, permission-based search experiences with near real-time updates through webhooks.

To connect Airtable to Glean, see [Setup](/connectors/native/airtable/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

This section details what you can index, how the connector interacts with Airtable, and the current limitations that may apply.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object type | Indexed |
| --- | --- |
| Bases | Yes |
| Tables (within bases) | Yes |
| Records (rows) | Yes (Text fields of types `singleLineText`, `multilineText`, and `richText` are indexed.) |
| Record Comments | Yes |
| Users & Groups | Yes (for permissions) |

## Supported Airtable field types[​](#supported-airtable-field-types "Direct link to Supported Airtable field types")

The connector indexes text content from these Airtable field types:

-   `singleLineText`
-   `multilineText`
-   `richText`: Airtable **Long text** fields with rich-text formatting enabled

Glean indexes the rich-text value as plain text. Markdown-like formatting markers are preserved as text; Airtable formatting is not rendered.

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   **Standard API**: Glean uses Airtable's standard [API](https://airtable.com/developers/web/api/introduction/) to ingest all data

## Limitations[​](#limitations "Direct link to Limitations")

-   Your Airtable instance must be on the Enterprise plan, as necessary API endpoints are only available for enterprise users.
-   The connector can only index bases accessible to the admin user who generates the access token.
-   Interfaces in Airtable are not currently indexed. Content and access controls that exist solely within Interfaces are excluded.
-   If the access token is scoped to a workspace instead of "all bases in the organization", access is restricted to those bases.
-   Only text field data is indexed; non-text fields are not indexed.
-   Rate-limited to 5 requests per second per base by Airtable's API.
-   OAuth2 tokens are not supported; only personal access tokens (PATs) are currently used.
-   Non-text fields and attachments are not indexed in the current version.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Crawl Type | Full Crawl | Incremental Crawl | People Data | Activity | Update Rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Content | Yes | Yes | N/A | N/A | Hourly (incremental), daily (full) | Yes | Incremental and full refresh of bases, tables, and new comments |
| Identity/Permissions | Yes | Yes | Yes | N/A | Hourly | No | Updates user and permission information for accurate access enforcement |
| Webhook | N/A | Yes | N/A | Yes | Real-time | Yes | Webhooks keep content up to date after the initial full crawl |

-   Webhooks are automatically registered for all accessible bases and are required for real-time indexing after initial ingestion.
-   Identity/permission refreshes are scheduled to accurately reflect group and user access.

## Results display[​](#results-display "Direct link to Results display")

The connector displays indexed Airtable bases and their tables as search results in Glean, showing the base name, table names, and content from text fields and comments.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

**Data and metadata ingested**

-   Base names, descriptions, tables, record (row) data from text fields, comments, user and group identities for permission mapping.

**Permission propagation logic**

-   All permissions (base, workspace, user, group) are fetched from Airtable and respected within Glean’s search and access model. This means users cannot view any content in Glean unless they already have access to it directly in Airtable.
-   Airtable Interfaces and their associated permissions are not indexed by Glean. This means any content or permission settings defined specifically within an Interface are not integrated or enforced in Glean.

**Security and compliance notes**

-   All data is retrieved via secure APIs and stored within a GCP project under customer ownership and control.
-   The administration of PATs and scope allows granular limitation of what Glean can access.
-   Webhooks are managed programmatically; only required content is kept up to date.

**Known security restrictions**

-   The connector cannot access bases outside of those directly exposed to the PAT (no universal or cross-enterprise coverage).
-   Multi-instance or multiple-token scenarios are not currently supported.

**Data privacy implications**

-   Only data directly accessible in Airtable through the specified PAT and user memberships will be indexed; customer data is retained within the Glean cloud deployment and cannot be accessed by third parties, including Glean employees, except as required for support or troubleshooting.
-   Review and restrict PAT and user access in Airtable as needed for privacy compliance.

## See also[​](#see-also "Direct link to See also")

-   [Airtable setup](/connectors/native/airtable/setup)
