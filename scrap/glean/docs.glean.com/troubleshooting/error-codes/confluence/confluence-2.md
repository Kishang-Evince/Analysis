---
url: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-2"
title: "CONFLUENCE_2"
description: "CONFLUENCE_2 Error Code"
fetched_at: "2026-09-01T13:30:11.592Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We are unable to fetch spaces from your Confluence instance.

## Resolution[​](#resolution "Direct link to Resolution")

For Confluence Cloud, make sure that **Glean Crawler App** is installed and has access to at least one space.

For Confluence Datacenter, please ensure that the service account provided has the required permissions to fetch spaces. The service account should have VIEW access to spaces and pages within it [official documentation](https://support.atlassian.com/confluence/kb/understanding-permission-in-confluence/).

If you are still having difficulty, please reach out to us: [https://support.glean.com](https://support.glean.com)
