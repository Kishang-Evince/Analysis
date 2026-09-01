---
url: "https://docs.glean.com/connectors/native/box/setup"
canonical: "https://docs.glean.com/connectors/native/box/setup"
title: "Box setup"
fetched_at: "2026-09-01T13:29:23.757Z"
---
On this page

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
