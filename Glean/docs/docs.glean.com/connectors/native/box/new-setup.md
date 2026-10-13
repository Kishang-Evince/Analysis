---
url: "https://docs.glean.com/connectors/native/box/new-setup"
canonical: "https://docs.glean.com/connectors/native/box/new-setup"
title: "Set up Box"
description: "Connect Box tools and indexing to Glean in one guided setup flow."
fetched_at: "2026-10-13T08:49:47.111Z"
---
On this page

You're reading the **new setup**[Already have Box connected? →](/connectors/native/box/setup)

Use New setup when your Box setup page shows **Connect**, **Set up indexing**, and **Review setup**. Complete all three steps to make Box content searchable and make Box tools available according to their configured access.

1.  Connect Box toolsfirst — current step
2.  Set up indexingsecond — current step
3.  Review setupfinal — current step
4.  Search reflects indexed content after the initial crawl — happens automatically

## Feature availability after setup[​](#feature-availability-after-setup "Direct link to Feature availability after setup")

| Capability | When it becomes available | Permissions |
| --- | --- | --- |
| **Box tools** | After you complete the setup flow | The Box tools OAuth grant and configured tool access apply |
| **Indexed search** | After the initial crawl completes | The separate indexing OAuth grant and Box content permissions apply |

Initial crawl duration depends on your Box corpus and the crawl rate. You can monitor progress in the connector settings. See [Frequently asked questions (FAQ)](/connectors/crawling-faq) for more information about initial crawls.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, confirm that you have:

-   A Glean admin who can add and configure connectors
-   A Box Enterprise account
-   A Box Admin account that can authorize the Glean application

Glean does not support Box co-admin accounts. Use a Box Admin account so Glean can crawl all expected content.

## Step 1: Connect Box[​](#step-1-connect-box "Direct link to Step 1: Connect Box")

1.  Sign in to Glean and go to **Connectors** in the **Admin console**.
2.  Add the **Box** connector and enter the display **Name** that your users will see.
3.  Select **Connect** and follow the prompts to authorize Box tools.
4.  Grant the requested permissions in Box, then return to Glean.

The **Connect** step authorizes Box tools. Complete the separate **Set up indexing** step to make Box content searchable.

## Step 2: Set up indexing[​](#step-2-set-up-indexing "Direct link to Step 2: Set up indexing")

1.  In the guided setup, select **Set up indexing**.
2.  Follow the instructions to grant Glean access to your Box account.
3.  Use a Box Admin account and grant the permissions that the managed Central OAuth app requests.
4.  Select **Authorize**, complete the Box authorization, and continue to **Review setup**.

Glean uses the indexing authorization to crawl Box folders, files, Box Notes, comments, users, groups, and associated permissions. The initial crawl starts after you finish the setup flow.

Use a Box Admin account

Glean does not support Box co-admin accounts. A co-admin may not have enough access to crawl all expected content.

### (Optional) Suppress notification emails[​](#optional-suppress-notification-emails "Direct link to (Optional) Suppress notification emails")

Glean uses the Box download files endpoint during crawling. If your Box organization sends email notifications for suspicious download activity, ask Box Support to suppress notifications for the client ID used by the integration.

To get the client ID, contact [Glean Support](https://support.glean.com/). Notification suppression is optional, but without it Box may send download notifications across your organization.

## Step 3: Review setup[​](#step-3-review-setup "Direct link to Step 3: Review setup")

Review the Box tools connection, indexing authorization, and data-access settings. Complete the final setup step to start the initial crawl and return to the connector's **Overview** tab.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

After you finish setup, open the Box connector's **Tools** tab to review and manage your Box tools. New setup syncs the available tools to this tab.

You can manage:

-   Which Box tools to enable
-   Which users or groups can use each tool
-   Where the tools are available in Glean
-   Whether a tool requires confirmation before it runs

See the following guides for configuration details:

-   [Managing individual tools](/administration/tools/managing-tools/per-tool-enable-disable)
-   [Enabling tools for Chat and Agents](/administration/tools/managing-tools/tools-chat-vs-agents)
-   [Tool visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping)

## After setup[​](#after-setup "Direct link to After setup")

-   Monitor the initial crawl from the Box connector page in the **Admin console**. Glean starts the crawl after you finish setup.
-   Review the **Tools** tab when you need to change tool availability or permissions.
-   Use [Crawl restrictions](/connectors/native/box/restrictions) to control what Glean crawls.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Box setup](/connectors/native/box/choose-your-setup) to compare the two setup paths
-   [Box overview](/connectors/native/box/overview) for supported content, permissions, and crawl behavior
-   [Previous setup](/connectors/native/box/setup) for the previous setup flow
