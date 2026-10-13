---
url: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-3"
title: "CONFLUENCE_3"
description: "CONFLUENCE_3 Error Code"
fetched_at: "2026-10-13T08:50:56.397Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We are unable to fetch space permissions from your Confluence instance.

## Resolution:[​](#resolution "Direct link to Resolution:")

For Confluence Datacenter, please ensure the service account provided has the required permissions to view space and the [Glean Activity Plugin](https://marketplace.atlassian.com/apps/1228567/glean-activity-extension-for-confluence-data-center-server?tab=installation&hosting=datacenter) is installed. The service account should have VIEW access to spaces that needs to be indexed (official documentation).

If you are using Confluence Cloud or still having difficulty, please reach out to us: [https://support.glean.com](https://support.glean.com)
