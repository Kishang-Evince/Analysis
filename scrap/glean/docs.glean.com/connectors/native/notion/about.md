---
url: "https://docs.glean.com/connectors/native/notion/about"
canonical: "https://docs.glean.com/connectors/native/notion/about"
title: "Notion overview"
description: "How the Notion connector works - supported features, objects, crawling strategy, permissions, limitations, and requirements."
fetched_at: "2026-09-01T13:29:35.951Z"
---
On this page

Notion is a knowledge management platform supporting documents, wikis, tables, calendars, and databases. The Glean Notion connector allows organizations to search and analyze Notion content through two complementary paths:

-   **Data Crawling and Indexing:** A workspace-level integration that builds a shared index of content explicitly shared with Glean.
-   **Live Mode (MCP-based):** A real-time data fetcher that retrieves fresh, permission-aware content at query time via per-user OAuth.

## Supported features[​](#supported-features "Direct link to Supported features")

The connector enables central ingestion and search for shared organizational content.

-   **Comprehensive Retrieval:** Ingests Notion pages and databases, including full recursive crawling of nested “block” content such as toggles, tables, and task trackers.
-   **Metadata Support:** Indexes page/database titles, owner/author information, and last-modified timestamps.
-   **Flexible Data Modes:**
    -   **Data Crawling:** Uses an internal integration token to index content on a regular schedule.
    -   **Live Mode:** Uses the Model Context Protocol (MCP) to provide real-time retrieval, ensuring Glean answers include private or recently updated content without waiting for a crawl.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

-   [Pages](https://developers.notion.com/reference/page)
-   [Databases](https://developers.notion.com/reference/database)
-   [Blocks](https://developers.notion.com/reference/block) (toggle blocks and sub-blocks) within pages and databases are indexed recursively to a configurable depth, allowing search over deep Notion structures.

### Supported blocks[​](#supported-blocks "Direct link to Supported blocks")

-   paragraph
-   heading\_1
-   heading\_2
-   heading\_3
-   bulleted\_list\_item
-   numbered\_list\_item
-   to\_do
-   toggle
-   child\_page
-   child\_database
-   image
-   embed
-   video
-   file
-   pdf
-   bookmark
-   text
-   unsupported
-   code
-   callout
-   quote
-   divider
-   equation
-   table\_of\_contents
-   column\_list
-   breadcrumb
-   synced\_block
-   link\_to\_page
-   link\_preview
-   template
-   table\_row

### Supported page properties[​](#supported-page-properties "Direct link to Supported page properties")

[Notion page properties](https://developers.notion.com/reference/page-property-values) are automatically indexed and searchable in Glean, allowing you to search and filter documents based on custom page properties.

**Supported Properties:** title, rich text, people, email, status, number, date, select, checkbox, multi-select

**How to Search:**

-   **Direct search:** Type any property value in the search box to find pages containing that value
-   **Filtered search:** Type the property name, colon, and value (for example, `assignee:"Steve Smith"` or `status:Done`) to filter by specific properties

**Note:** Multi-word property names become single words for filtering (for example, "start date" becomes `startdate:2024-01-01`, "due\_date" becomes `duedate:2024-12-31`)

**Database query limitations:** Glean indexes Notion database page properties, but Glean processes approximately 500 search results maximum when answering questions. This means questions that require scanning an entire database (for example, "list every task with status Done") may not return exhaustive results. For best results, use specific search queries or property filters to narrow the result set.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

Notion uses scheduled full crawls (no webhooks today) and a separate identity crawl.

| Crawl type | Scope | Frequency | Notes |
| --- | --- | --- | --- |
| Full content crawl | Pages, databases, blocks shared with the integration | Every 6 hours | No webhooks. Used to pick up new/updated content and structural changes. |
| Identity crawl | Users/workspaces relevant to Notion | Every hour | Keeps user/identity maps fresh for permissions modeling outside Notion. |
| Deletion safety | Previously indexed docs | 10‑day delay | Docs are only hard-deleted from the index if they remain missing for >10 days. |

### How it works[​](#how-it-works "Direct link to How it works")

1

Notion workspaces are installed

You install the Glean notion connector individually for each Notion workspace. You share each page with the integration that you wish to index. Child pages of shared pages will automatically be shared with the integration.

2

Glean crawls the Notion workspace

Glean will crawl the Notion workspace and index all pages and their child pages that you've shared with the integration.

3

Crawled content is made searchable

Glean indexes the crawled content and makes it searchable for all Glean users who can access the Notion connector. Because Notion’s crawl APIs do not expose document‑level permission lists in a way Glean can project into its index, this indexed corpus is not permission‑aware-any content shared with the integration is visible in Glean to all such users.

4

(Optional) Live Mode fetches permission‑aware content at query time

When Live Mode is enabled and a user has connected their Notion account via OAuth, Glean can call Notion via MCP at query time to retrieve fresh, permission‑aware content on behalf of that user. Live Mode can surface:

-   Private pages and databases that the user can access in Notion.
-   Newly created or recently updated content that has not yet been picked up by the scheduled crawl.

Notion enforces its own permission model on these Live Mode calls, so each user only sees Notion content they are allowed to access.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

The security behavior and data handling differ significantly between the two retrieval modes:

### Indexed content (data crawling)[​](#indexed-content-data-crawling "Direct link to Indexed content (data crawling)")

-   **Permission Propagation:** Notion’s crawl APIs do not expose full user/group-level sharing lists. Consequently, Glean cannot project document ACLs into its index or enforce fine-grained permissions.
-   **Visibility:** All indexed content shared with the integration is visible to all Glean users who can access the Notion connector.
-   **Compliance Recommendation:** Glean recommends sharing only Notion content that is appropriate for organization-wide visibility.

### Live Mode (MCP-based fetching)[​](#live-mode-mcp-based-fetching "Direct link to Live Mode (MCP-based fetching)")

note

**Beta:** Live Mode (Data fetching) is in beta and may change.

-   **Permission Behavior:** Uses per-user OAuth tokens to call Notion’s MCP interface at query time. Notion enforces its own permission model, ensuring users only see content they can access directly in Notion.
-   **Data Handling:** Queries fetch content on demand. Glean does not replace the indexed corpus with Live Mode responses or expand visibility beyond a user's native access.
-   **Security Standards:** Standard Glean security practices for data in transit and at rest apply, consistent with other connectors using activity-based updates.

## Limitations[​](#limitations "Direct link to Limitations")

-   **Access Control List (ACL) and group visibility:** Notion’s API doesn’t provide visibility into group membership or document-level access lists. It doesn’t expose document-level permission lists in a way Glean can use to project per-user ACLs.
-   **Permission model scope:** Glean doesn’t support indexing documents not explicitly shared with the integration or those residing outside the permissions model allowed by the Notion API.
-   **Object-level propagation:** There’s no support for Notion object-level user permissions propagation for the indexed corpus.
-   **Content exclusion:** There’s no mechanism to exclude specific child page content from the integration once a parent is shared.
-   **Database query completeness:** Glean indexes Notion database page properties (such as status, date, and select fields), but Assistant processes approximately 500 search results maximum. Whole-database questions may return incomplete results. Use specific queries or property filters to narrow results.
-   **Multi-source databases:** Notion’s multi-source databases (introduced in the Notion API version 2025-09-03) aren’t yet supported by the Glean connector. If your workspace uses multi-source databases, crawls may encounter errors. Continue using single-source databases until connector support is available.
-   **Search enumeration gaps:** Notion’s `/search` API can occasionally omit pages from its results even when those pages are shared with the integration. This means some shared pages may not be discovered during a crawl cycle. See [Troubleshooting](/connectors/native/notion/troubleshooting) for workarounds.
-   **No incremental crawl or webhooks:** Notion doesn’t offer webhooks, so Glean relies on scheduled full crawls (every 6 hours). New or updated content won’t appear in search results until the next crawl completes. Larger workspaces take longer per crawl.
-   **Trashed content visibility:** Notion’s API doesn’t signal when a page is moved to Trash in a way Glean can act on immediately. Previously indexed pages are only removed from Glean’s index if they remain missing from Notion’s API for more than 10 days. During that window, trashed content may still appear in search results.
-   **Linked database views:** Database view pages that aren’t directly shared with the integration, or whose underlying database isn’t shared, won’t be returned by Notion’s API and therefore won’t be indexed. Share the underlying database with the Glean integration, not the view alone.

## Requirements[​](#requirements "Direct link to Requirements")

This connector has specific technical and operational requirements that must be met before it can be configured.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   You must have Glean Admin access to install and configure the connector.
-   You must have Notion Workspace Admin privileges to create and manage integrations.
-   A supported Notion Enterprise or Business plan with API access enabled.
-   Use a dedicated admin or service account to create the integration. This prevents service disruption if an individual admin leaves the organization.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   A Bearer token generated via [Notion My-Integrations](https://www.notion.com/my-integrations). This token is required for all API calls related to data crawling and indexing.
-   Required specifically for Live Mode. These tokens are issued to individual users when they connect their Notion accounts within Glean. They are managed separately from the workspace-level integration token.

### Permission and content scope[​](#permission-and-content-scope "Direct link to Permission and content scope")

-   The Notion API requires that pages and databases be explicitly shared with Glean integration app to be indexed.
-   Because the indexing API does not support per-user ACLs, all shared content is visible to all Glean users with access to the connector.
-   Admins must ensure that only content appropriate for organization-wide visibility is shared with the integration.

#### Segmenting Notion content by team[​](#segmenting-notion-content-by-team "Direct link to Segmenting Notion content by team")

Because indexed Notion content isn't permission-aware, you can segment content at the group level by configuring multiple Notion connector instances. Share a different subset of Notion pages and databases with each instance's integration, then restrict each connector's visibility to the appropriate teammates using [connector visibility](/administration/search/hiding-content) controls or [test groups](/administration/feature-rollouts) in the Admin console.

This approach separates content at the group level only, not per individual teammate. For per-user permission-aware retrieval, use Live Mode instead.

### Live Mode requirements[​](#live-mode-requirements "Direct link to Live Mode requirements")

To enable real-time, permission-aware data fetching via Live Mode, the following additional conditions must be met:

-   A Glean admin must toggle the "Live Mode" (data fetching) option in the Glean Admin Console. If this option is not visible, contact your Glean representative to confirm eligibility.
-   Individual users must complete the OAuth flow to link their Notion accounts to Glean.
-   Live Mode may be restricted for environments with strict connector-level crawl restrictions or Data Loss Prevention (DLP) policies that conflict with real-time fetching behavior.
