---
url: "https://docs.glean.com/connectors/native/website/setup"
canonical: "https://docs.glean.com/connectors/native/website/setup"
title: "setup"
fetched_at: "2026-09-01T13:29:47.594Z"
---
On this page

## Adding a website[​](#adding-a-website "Direct link to Adding a website")

### Providing the URL to the sitemap[​](#providing-the-url-to-the-sitemap "Direct link to Providing the URL to the sitemap")

#### Why do I need a sitemap?[​](#why-do-i-need-a-sitemap "Direct link to Why do I need a sitemap?")

A sitemap is an XML data file on your website that lists all of your website's pages that are available for crawling with other useful information like last update times and crawling priority. A sitemap helps Glean quickly set up your new website and crawl the right pages.

#### Finding the sitemap[​](#finding-the-sitemap "Direct link to Finding the sitemap")

1.  You can typically find the sitemap in a website's root directory: [www.yoursite.com/sitemap.xml](http://www.yoursite.com/sitemap.xml).
2.  Your website's '/robots.txt' file may contain the location of the sitemap: [www.yoursite.com/robots.txt](http://www.yoursite.com/robots.txt).
3.  If these methods are unsuccessful, consider using an online XML sitemap checker.
4.  If you still cannot locate it, contact the website administrator. Once you’ve located the sitemap, **copy the URL and paste it into Glean.** For websites with multiple sitemaps, select the most appropriate one.
