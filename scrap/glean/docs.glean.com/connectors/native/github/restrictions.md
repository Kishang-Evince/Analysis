---
url: "https://docs.glean.com/connectors/native/github/restrictions"
canonical: "https://docs.glean.com/connectors/native/github/restrictions"
title: "Crawl restrictions"
description: "Control which GitHub content Glean crawls using repository inclusion and exclusion lists and"
fetched_at: "2026-09-01T13:29:29.142Z"
---
On this page

Control which GitHub content Glean crawls using repository inclusion and exclusion lists and content-type toggles. Use these rules minimally to preserve the search experience: most end users expect to find all content, and most customers apply no rules or use exclusions sparingly for sensitive repositories.

-   Use **Greenlist** restrictions to allow crawling only for content that you specify.
-   Use **Redlist** restrictions to prevent Glean from crawling content that you specify.

| Restriction Type | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Time-based Restrictions | ❌ | ❌ | Restrict crawling to include/exclude content created/modified/viewed after a certain date. |
| Identity-based Restrictions | ❌ | ❌ | Restrict crawling to include/exclude content created/modified/viewed by specific users or a specific group (plus public content). |
| Content-based Restrictions | ✅ | ✅ | Restrict crawling to include/exclude specific content, documents, messages, or objects. |

## Supported restrictions[​](#supported-restrictions "Direct link to Supported restrictions")

| Restriction | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Repository | ✅ | ✅ | Restrict crawling to include or exclude specific repositories by name. |
| GitHub Pages repository | ✅ | ✅ | Restrict GitHub Pages crawling to include or exclude specific repositories by name. |

### How repository lists work[​](#how-repository-lists-work "Direct link to How repository lists work")

-   **Inclusion (greenlist):** Enter specific repository names and Glean crawls only those repositories. Any repository not listed is skipped.
-   **Exclusion (redlist):** Enter specific repository names and Glean skips those repositories. All other repositories are crawled.

If both rules apply to the same repository, the content is **not** indexed: the exclusion rule takes priority.

Glean indexes only the repositories granted to the GitHub App installation. If you installed the app on a subset of repositories, only those repositories are eligible for crawling. Repository inclusion and exclusion lists further refine what gets indexed within that granted set.

## Content-type controls[​](#content-type-controls "Direct link to Content-type controls")

In addition to repository-level restrictions, you can toggle crawling for the following content types from the **Manage Data** tab in the admin console:

| Content type | Default | Description |
| --- | --- | --- |
| **GitHub Pages** | Off | Crawl HTML and Markdown files from repositories that use the legacy `gh-pages` branch. If you do not add repository names, Glean crawls legacy Pages for all repositories by default. |
| **Wikis** | Off | Crawl wiki pages attached to repositories. |
| **Issues** | On | Crawl issues and issue comments. |
| **Pull request diffs** | On | Crawl diff content from pull requests. |
| **Code file extensions** | Varies | Control which code file extensions have their full file body indexed. Existing connectors may show a different set of configured extensions. Admins can update this list as needed. |

## Apply restrictions[​](#apply-restrictions "Direct link to Apply restrictions")

| Method | Supported | Details |
| --- | --- | --- |
| Admin UI | ✅ | Restrictions can be applied in the Admin UI under the connector settings. |
| Glean Support | ✅ | Restrictions can be applied by Glean support on request. |

Navigate to **Admin console → Connectors → GitHub** and select the **Manage Data** tab to configure repository lists and content-type toggles.

### Changes take effect on the next discovery crawl

After repository lists are adjusted, wait for the next repository discovery crawl for the change to be reflected in the index.
