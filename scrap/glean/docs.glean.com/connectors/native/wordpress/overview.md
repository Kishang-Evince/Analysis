---
url: "https://docs.glean.com/connectors/native/wordpress/overview"
canonical: "https://docs.glean.com/connectors/native/wordpress/overview"
title: "WordPress overview"
description: "Learn how the WordPress connector works with Glean."
fetched_at: "2026-09-01T13:29:48.153Z"
---
On this page

WordPress is a widely used content management system for publishing and managing web content such as pages, posts, and knowledge base articles. The Glean WordPress connector brings this content into Glean for search and AI assistance, so teams can find published pages, posts, and related discussions without leaving Glean.

## Supported features[​](#supported-features "Direct link to Supported features")

The WordPress connector enables central ingestion and search across your WordPress site content.

-   **Page indexing:** Crawls published WordPress pages with title, body content, tags, categories, and comments.
-   **Post indexing:** Crawls published WordPress posts with title, body content, tags, categories, and comments.
-   **Custom post types:** Supports crawling custom post type endpoints registered in WordPress, configurable via the `customPostEndpoints` setting.
-   **Comments:** Indexes approved comments on posts and pages, including comment text and creation timestamp.
-   **Tags and categories:** Extracts tags and categories as searchable facets for filtering in Glean.
-   **Incremental crawls:** Supports incremental crawls using the WordPress API `after` filter, fetching only content modified since the last crawl cycle. Runs approximately every **10 minutes** by default.
-   **Full crawls:** Periodic full crawls detect deletions and state changes not visible to incremental crawls. Runs approximately every **12 hours** by default.
-   **Multiple instances:** Supports connecting multiple WordPress sites to a single Glean deployment. Each data source instance indexes one site; connect additional sites by configuring additional instances.
-   **API usage:** Glean uses the standard [WordPress API](https://developer.wordpress.org/rest-api/) (`/wp-json/wp/v2/`) to ingest all data.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

-   **Pages:** Published WordPress pages with title, body (HTML), tags, categories, comments, and update metadata.
-   **Posts:** Published WordPress posts with title, body (HTML), tags, categories, comments, and update metadata.
-   **Custom posts:** Content from custom post type endpoints that follow the WordPress API format. Tags and categories are included only if the custom post type has registered them as taxonomies.
-   **Comments:** Approved comments on posts and pages, stored as children of their parent document.
-   **Tags:** Tag names associated with posts and pages, indexed as keyword facets.
-   **Categories:** Category names associated with posts and pages, indexed as keyword facets.

Each content type is crawled automatically when the connector is configured. Posts, pages, and custom post types cannot be independently toggled on or off.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only content with `publish` status is indexed. Draft, pending, private, and trashed content is not crawled.
-   Password-protected posts and pages are excluded from indexing.
-   Only approved comments are indexed. Pending, spam, and trashed comments are excluded.
-   The connector does not crawl WordPress users, roles, or groups. No identity data is synchronized to Glean.
-   All indexed content is treated as publicly visible within Glean: WordPress does not provide per-user document-level permissions via its API, so all Glean users can see all indexed WordPress content.
-   Webhooks are not supported. Content freshness relies on periodic polling via full and incremental crawls.
-   Federated search is not supported. All content is natively indexed in Glean.
-   Custom post types are limited to endpoints that return responses in the standard WordPress API format.
-   The tags endpoint may return `403 Forbidden` on some WordPress configurations; this is handled gracefully and does not fail the crawl.
-   Media files (images, videos, PDFs) are not independently crawled. Only the HTML body content of posts and pages is indexed.

## Content configuration[​](#content-configuration "Direct link to Content configuration")

The WordPress connector currently has no greenlist (inclusion) or redlist (exclusion) rules. All published, non-password-protected content available with the configured credentials is indexed.

Content scope is controlled by:

-   **Published status only:** Only posts and pages with `status = "publish"` are indexed.
-   **Password protection:** Password-protected content is automatically excluded.
-   **Custom post endpoints:** You can optionally configure additional custom post type endpoints via the `customPostEndpoints` setting to expand the crawl scope beyond standard posts and pages.

note

There are no per-post, per-page, per-category, or per-tag inclusion/exclusion filters available for the WordPress connector. To exclude specific content, ensure it is set to a non-published status (for example, draft or private) in WordPress, or restrict the API credentials' access accordingly.

## API endpoints[​](#api-endpoints "Direct link to API endpoints")

| Endpoint | Description |
| --- | --- |
| `GET /wp-json/wp/v2/pages` | List all published pages |
| `GET /wp-json/wp/v2/posts` | List all published posts |
| `GET /wp-json/wp/v2/{custom_endpoint}` | List custom post type content (configurable via `customPostEndpoints`) |
| `GET /wp-json/wp/v2/comments?post={id}` | List approved comments for a specific post or page |
| `GET /wp-json/wp/v2/tags?post={id}` | List tags associated with a specific post or page |
| `GET /wp-json/wp/v2/categories?post={id}` | List categories associated with a specific post or page |

**Common query parameters**:

-   `page`: pagination page number
-   `per_page`: results per page (default: 10)
-   `after`: `ISO-8601` datetime filter for incremental crawls

**Response header used**:

-   `X-WP-TotalPages`: total page count for pagination
