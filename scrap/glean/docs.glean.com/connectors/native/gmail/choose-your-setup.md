---
url: "https://docs.glean.com/connectors/native/gmail/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/gmail/choose-your-setup"
title: "Choose your Gmail setup"
description: "Work out which of the two Gmail setups is yours, the new setup or the previous setup, and how indexed search and read and write tools fit together in each."
fetched_at: "2026-09-01T13:29:30.628Z"
---
On this page

Glean connects to Gmail in two ways. Which one is yours depends on your Glean deployment, not on when you personally connect Gmail.

-   **New setup** applies to new Glean deployments. Deployments created on or after August 14, 2026 use the new setup by default.
-   **Previous setup** applies to existing Glean deployments. Even if you are connecting Gmail for the first time, your deployment keeps its current setup unless Glean enables the new flow for you.

Both paths use the same Gmail indexing and permission model. The unified setup also includes Google Tools and Gmail MCP tools, which are not available through the previous setup flow.

## Gmail setup comparison: new versus previous[​](#gmail-setup-comparison-new-versus-previous "Direct link to Gmail setup comparison: new versus previous")

Both setups give you the same two connector modes. They differ in the onboarding and in how much you configure up front.

-   **New setup** uses a guided flow. The flow authorizes Google Tools so read and write tools work right away, and you set up indexing in the same flow.
-   **Previous setup** is the current connector setup. You configure domain-wide delegation, indexing scope, and the crawl yourself.

The two connector modes are the same in both paths.

-   **Data crawling and indexing** builds a search index of your email that respects Gmail's permission model, so each person searches their own mailbox content. By default, indexing covers approximately 6 months of history and up to 5,000 Inbox threads per user. Limits can vary by deployment.
-   **Gmail MCP** provides read and write tools. Each tool runs at query time using the user's own Google authorization, so it respects that user's Gmail permissions.

|  | New setup | Previous setup |
| --- | --- | --- |
| **What you prepare in Google** | You choose an authorization method (central or custom) and authorize Google Tools. For indexing, you set up domain-wide delegation and scopes | You set up domain-wide delegation and scopes and configure indexing scope before you begin |
| **What you configure in Glean** | You authorize the MCP connection for tools, then optionally set up indexing | Retrieval methods, indexing scope, inclusion and exclusion rules, and the crawl |
| **Who needs to be involved** | A Glean admin, and a Google admin who can authorize the connection | The same two roles |
| **How indexing runs** | In the background once you begin it | On the crawl schedule you configure |
| **Whose permissions apply** | Respects Gmail permissions on both paths. Per-mailbox indexed search, and each user's own Google permissions on the tools | The same |
| **What changes for your current setup** | Not applicable. You are connecting Gmail for the first time | Nothing. Your connector, its configuration, and its crawl continue to run unchanged |
| **Where to start** | [Set up Gmail](/connectors/native/gmail/new-setup) | [Connect Gmail with Glean](/connectors/native/gmail/setup) |

## See also[​](#see-also "Direct link to See also")

-   [Set up Gmail](/connectors/native/gmail/new-setup) is the new-setup flow.
-   [Connect Gmail with Glean](/connectors/native/gmail/setup) is the previous connector setup reference.
