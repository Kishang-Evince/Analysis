---
url: "https://docs.glean.com/connectors/native/gdrive/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/gdrive/choose-your-setup"
title: "Choose your Google Drive setup"
description: "Work out which of the two Google Drive setups is yours, the new setup or the previous setup, and how indexed search and read and write tools fit together in each."
fetched_at: "2026-09-01T13:29:27.781Z"
---
On this page

Glean connects to Google Drive in two ways. Which one is yours depends on your Glean deployment, not on when you personally connect Google Drive.

-   **New setup** applies to new Glean deployments. Deployments created on or after August 14th, 2026 use the new setup by default.
-   **Previous setup** applies to existing Glean deployments. Even if you are connecting Google Drive for the first time, your deployment keeps its current setup unless Glean enables the new flow for you.

Both paths use the same connector modes, the same Google Drive tools, and the same permission model.

## Google Drive setup comparison: New versus previous[​](#google-drive-setup-comparison-new-versus-previous "Direct link to Google Drive setup comparison: New versus previous")

Both setups give you the same two connector modes. Both are permission-aware. What differs is the onboarding and how much you configure up front.

-   **New setup.** A guided flow connects Google Drive Tools, so read and write tools are enabled by default, with the option to configure further after setup. You set up indexing in the same flow. You can begin it or skip it for later.
-   **Previous setup.** The current connector setup. You configure domain-wide delegation, domains, restrictions, and the crawl yourself.

The two connector modes are the same in both paths.

-   **Data indexing** builds a permission-aware search index of your Drive content. Glean mirrors Google Drive access controls through domain-wide delegation and enforces them at query time. Each user sees only the files they can open in Drive.
-   **Google Drive MCP** provides read and write tools. Each tool runs at query time using the user's own Google authorization, so it respects that user's Drive permissions.

|  | New setup | Previous setup |
| --- | --- | --- |
| **What you prepare in Google** | You choose an authorization method (central or custom) and authorize the MCP server. For indexing, you set up domain-wide delegation and scopes | You create a service account, set up domain-wide delegation and scopes, and configure domains before you begin |
| **What you configure in Glean** | You connect Google Drive Tools, then set up indexing (directory admin email, domains, Google Group mappings, Drive labels) | Retrieval methods, domains, restrictions, custom properties, and inclusion and exclusion rules |
| **Who needs to be involved** | A Glean admin, and a Google Super Admin (or a user with the required custom admin role) | The same two roles |
| **How indexing runs** | Ready to use once you connect. Indexing continues in the background and enriches search results over time; you can skip it and start later | On the crawl schedule you configure |
| **Whose permissions apply** | Permission-aware on both paths. Drive ACLs on indexed search, and each user's own Google permissions on the tools | The same |
| **What changes for your current setup** | Not applicable. You are connecting Google Drive for the first time | Nothing. Your connector, its configuration, and its crawl continue to run unchanged |
| **Where to start** | [Set up Google Drive](/connectors/native/gdrive/new-setup) | [Connect Google Drive with Glean](/connectors/native/gdrive/setup) |

For what each mode retrieves, whose permissions it enforces, and its limitations, see the [Google Drive overview](/connectors/native/gdrive/about).

## See also[​](#see-also "Direct link to See also")

-   [Google Drive overview](/connectors/native/gdrive/about) covers objects, crawling, permissions, and limitations.
-   [Set up Google Drive](/connectors/native/gdrive/new-setup) is the new-setup flow.
-   [Connect Google Drive with Glean](/connectors/native/gdrive/setup) is the previous connector setup reference.
