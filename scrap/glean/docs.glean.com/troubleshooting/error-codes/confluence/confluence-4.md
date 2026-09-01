---
url: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-4"
title: "CONFLUENCE_4"
description: "CONFLUENCE_4 Error Code"
fetched_at: "2026-09-01T13:30:11.917Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We are unable to validate Glean Activity plugin installation in your Confluence Datacenter instance.

## Resolution:[​](#resolution "Direct link to Resolution:")

For Confluence Datacenter, please ensure you have installed the [latest version](https://marketplace.atlassian.com/apps/1228567/glean-activity-extension-for-confluence-data-center-server/version-history?versionHistoryHosting=dataCenter) of the Glean Activity plugin from [here](https://marketplace.atlassian.com/apps/1228567/glean-activity-extension-for-confluence-data-center-server?tab=installation&hosting=datacenter) which is supported for your Confluence Datacenter version.

After installing the plugin, ensure the plugin is properly configured with the correct target URL. See [Configuring the Glean activity plugin](/connectors/native/confluence-onprem/#3a-configuring-the-glean-activity-plugin) for detailed instructions. The plugin target URL must be a valid URL in the format: `https://tenant_id-be.glean.com/instance/CONFLUENCE_ABC1234/scio_event`.

Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

If you are still having difficulty, please reach out to us: [https://support.glean.com](https://support.glean.com)
