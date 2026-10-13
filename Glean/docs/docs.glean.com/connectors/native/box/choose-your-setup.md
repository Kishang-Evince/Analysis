---
url: "https://docs.glean.com/connectors/native/box/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/box/choose-your-setup"
title: "Choose your Box setup"
description: "Find the right Box setup instructions for your Glean deployment and connector instance."
fetched_at: "2026-10-13T08:49:47.100Z"
---
On this page

Glean offers two Box setup flows. Choose the flow that matches the setup page and connector instance in your workspace.

-   **New setup** uses a guided flow with **Connect**, **Set up indexing**, and **Review setup** steps. Use it for a new Box connector when your workspace shows this flow.
-   **Previous setup** uses one connector form and the managed Central OAuth flow. Use it for an instance created through the previous setup flow, or when your workspace does not show the guided flow.

You can also start from the [Box home page](/connectors/native/box/).

## Box setup comparison[​](#box-setup-comparison "Direct link to Box setup comparison")

Both flows use the same Box crawler requirements. New setup also connects Box tools during setup, using an OAuth grant that is separate from the indexing authorization.

|  | New setup | Previous setup |
| --- | --- | --- |
| **Connect** | Authorize Box tools during the **Connect** step | Authorize Glean from the existing connector setup page |
| **Indexing** | Complete a separate indexing authorization during **Set up indexing** | Complete indexing authorization from the existing setup page |
| **Tools** | Review and manage tools from the connector's **Tools** tab after setup | Continue using the separate tools configuration for the existing instance |
| **Where to start** | [New setup](/connectors/native/box/new-setup) | [Previous setup](/connectors/native/box/setup) |

## What you need[​](#what-you-need "Direct link to What you need")

Prepare the following before you begin:

-   A Glean admin who can add and configure connectors
-   A Box Enterprise account
-   A Box Admin account that can authorize the Glean application

Glean does not support Box co-admin accounts. Use a Box Admin account so Glean can crawl all expected content.

For details about content, permissions, crawling, and limitations, see the [Box overview](/connectors/native/box/overview).

## See also[​](#see-also "Direct link to See also")

-   [Set up Box](/connectors/native/box/new-setup) for the new guided setup flow
-   [Previous setup](/connectors/native/box/setup) for the previous setup flow
-   [Box overview](/connectors/native/box/overview) for connector behavior and requirements
