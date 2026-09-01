---
url: "https://docs.glean.com/connectors/native/website/sitemap-redlisting"
canonical: "https://docs.glean.com/connectors/native/website/sitemap-redlisting"
title: "Sitemap Redlisting"
description: "Learn how to use regex-based sitemap redlisting to exclude unwanted URLs from Glean's web connector indexing."
fetched_at: "2026-09-01T13:29:47.073Z"
---
On this page

In Glean, **redlisting sitemap URLs** means configuring patterns so that **Glean does not index any URLs that match those patterns** when it reads a sitemap for a **web connector**.

You do this by adding a **regular expression (regex)** in the **Sitemap red list** field of that web connector. Any URL from the sitemap that matches the regex is **skipped** and will **not appear in Glean search results**.

Common use cases:

-   Exclude non-English pages so only one language is searchable
-   Exclude legacy, beta, or internal sections of a site
-   Exclude specific hosts, subdomains, or paths

## How to add a sitemap redlist regex in Glean[​](#how-to-add-a-sitemap-redlist-regex-in-glean "Direct link to How to add a sitemap redlist regex in Glean")

1.  In the Glean admin dashboard, click the **wrench (settings)** icon.
2.  Go to **Connectors**.
3.  Find and select your **web connector** (for example, *Example Web*).
4.  Click **Setup**.
5.  Scroll down to **Advanced settings**.
6.  In **Sitemap red list**, paste your regex pattern.
7.  Click **Save**.

After saving, any sitemap URL that matches the regex is excluded from indexing and will no longer show up in Glean search results **after the next crawl of that web connector**. If you trigger a manual crawl or sync, the updated redlist will be applied during that run.

## Example regex patterns for language URLs[​](#example-regex-patterns-for-language-urls "Direct link to Example regex patterns for language URLs")

The exact regex you use depends on **how your site encodes languages in the URL**. Below are two common patterns and sample redlists for excluding non-English pages.

### Example 1: Locale code after `/docs/` on `www`[​](#example-1-locale-code-after-docs-on-www "Direct link to example-1-locale-code-after-docs-on-www")

Some sites include a full locale code (language + region) right after `/docs/`, for example:

-   `https://www.example.com/docs/en-us/...`
-   `https://www.example.com/docs/es-es/...`
-   `https://www.example.com/docs/fr-fr/...`

To exclude non-English locales (and keep only `en-us`), you could redlist:

```
^https?://www\.example\.com/docs/(es-es|fr-fr|de-de|pt-br|ja-jp|ko-kr|it-it|zh-cn|tr-tr|vi-vn)(/.*)?$
```

### Example 2: Short language code directly under `www`[​](#example-2-short-language-code-directly-under-www "Direct link to example-2-short-language-code-directly-under-www")

Other sites use a short language code right after the domain, for example:

-   `https://www.example.com/es/...`
-   `https://www.example.com/fr/...`
-   `https://www.example.com/it/...`

To exclude those non-English language paths, you might use:

```
^https?://www\.example\.com/(es|fr|de|pt|ja|ko|nl|it|sv|pl|ru|ar|id|th|zh|he|hi|tr|vi)(/.*)?$
```

* * *

In all cases:

-   URLs that match the regex are **redlisted** and will be ignored by Glean once the connector is crawled again.
-   URLs that don't match (for example, English paths) remain eligible for indexing.
