---
url: "https://docs.glean.com/connectors/native/box/setup"
canonical: "https://docs.glean.com/connectors/native/box/setup"
title: "Set up Box with the previous setup flow"
description: "Connect Box to Glean with central OAuth and monitor progress during the connector's first sync"
fetched_at: "2026-10-13T08:49:47.344Z"
---
On this page

You're reading the **previous setup**[Connecting Box for the first time? →](/connectors/native/box/new-setup)

Use this page for a Box connector created with the previous setup flow. If your Box setup page shows **Connect**, **Set up indexing**, and **Review setup**, use [New setup](/connectors/native/box/new-setup) for a new connector instance.

Complete the setup in the Glean **Admin console**.

## Requirements[​](#requirements "Direct link to Requirements")

### Permissions[​](#permissions "Direct link to Permissions")

-   The user setting up the connector must be a [**Box Admin**](https://support.box.com/hc/en-us/articles/360043694174-Understanding-Administrator-and-Co-Administrator-Permissions).
-   Box co-admin accounts are not supported. Use a Box Admin account so Glean can crawl all expected content.
-   Glean uses a managed Central OAuth app for Box setup.

### Optional: Suppress notification emails[​](#optional-suppress-notification-emails "Direct link to Optional: Suppress notification emails")

Glean uses the Box download files endpoint during crawling. If your Box instance sends email notifications for suspicious download activity, we recommend asking Box to [suppress notifications](https://developer.box.com/guides/api-calls/suppress-notifications/) for the client ID used by the integration.

Contact Glean Support to get the client ID.

> If you do not suppress these notifications, Box may send download notifications across your organization.

## Set up the connector[​](#set-up-the-connector "Direct link to Set up the connector")

1.  Sign in to the Glean **Admin console**.
2.  Under the **Setup** tab, enter a **Name**, and optional **Icon** for the connector.
3.  Select **Authorize** and follow the prompts to grant Glean access to your Box instance.

## Monitor the first sync[​](#monitor-the-first-sync "Direct link to Monitor the first sync")

After you start indexing, open the Box connector's **Overview** tab in the **Admin console**. If initial sync progress is enabled for the connector, **Index readiness** shows the percentage of sampled priority content indexed after discovery finishes. This isn't a percentage of all Box content. See [Monitor initial sync readiness](/connectors/connectors-monitoring#monitor-initial-sync-readiness).
