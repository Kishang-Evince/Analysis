---
url: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-1"
title: "CONFLUENCE_1"
description: "CONFLUENCE_1 Error Code"
fetched_at: "2026-09-01T13:30:11.626Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We are unable to fetch content from your Confluence instance.

## Resolution[​](#resolution "Direct link to Resolution")

For Confluence Cloud, make sure that the **Glean Crawler App** is installed in your Confluence instance.

For Confluence Datacenter, please ensure the service account provided has the required permissions to fetch content. The service account should have VIEW access to spaces and pages within it [official documentation](https://support.atlassian.com/confluence/kb/understanding-permission-in-confluence/).

If you are still having difficulty, please reach out to us: [https://support.glean.com](https://support.glean.com)
