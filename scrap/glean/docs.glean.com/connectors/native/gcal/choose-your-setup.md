---
url: "https://docs.glean.com/connectors/native/gcal/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/gcal/choose-your-setup"
title: "Choose your Google Calendar setup"
description: "Work out which of the two Google Calendar setups is yours, the new setup or the existing setup, and how indexed search and read and write tools fit together in each."
fetched_at: "2026-09-01T13:29:27.212Z"
---
On this page

Glean connects to Google Calendar in two ways. Which one is yours depends on your Glean deployment, not on when you personally connect Google Calendar.

-   **New setup** applies to new Glean deployments. Deployments created on or after August 14, 2026 use the new setup by default.
-   **Previous setup** applies to existing Glean deployments. Even if you are connecting Google Calendar for the first time, your deployment keeps its current setup unless Glean enables the new flow for you.

Both paths support Google Calendar indexing and federated retrieval. The New setup also configures Google Calendar MCP read and write tools. The Previous setup does not register MCP tools automatically; configure MCP tools or action packs separately if you need them.

## Google Calendar setup comparison: new versus previous[​](#google-calendar-setup-comparison-new-versus-previous "Direct link to Google Calendar setup comparison: new versus previous")

Both setups give you the same two connector modes, and both are permission-aware. They differ in the onboarding and in how much you configure up front.

-   **New setup** uses a guided flow. The flow authorizes Google Calendar's MCP server so read and write calendar tools work right away, and you set up indexing in the same flow.
-   **Previous setup** is the current connector setup. You add the Calendar scope to the shared Google Drive delegation and configure the crawl yourself.

The two connector modes are the same in both paths.

-   **Data crawling and indexing** builds a permission-aware search index of your Google Calendar events. Glean enforces Calendar permissions at query time. Each user sees only the meetings they can see in Calendar, and private events surface as free or busy only.
-   **Google Calendar MCP** is configured in the New setup and provides read and write calendar tools. The Previous setup does not register these tools automatically. Each configured tool runs at query time using the user's own Google authorization, so it respects that user's Calendar permissions.

Google Calendar indexing reuses the Google Drive connector's service account and domain-wide delegation. You must set up the Google Drive connector first in both paths.

|  | New setup | Previous setup |
| --- | --- | --- |
| **What you prepare in Google** | You choose an authorization method (central or custom) and authorize the MCP server. For indexing, you add a Calendar scope to the shared Google Drive delegation | You add the Calendar API and scope to the existing Google Drive service account and delegation before you begin |
| **What you configure in Glean** | You authorize the MCP connection for tools, then optionally set up indexing (which reuses the Google Drive directory admin and delegation) | Retrieval methods, inclusion and exclusion rules, and the crawl |
| **Who needs to be involved** | A Glean admin, and a Google Workspace admin who manages the Google Drive delegation | The same two roles |
| **How indexing runs** | In the background once you begin it | On the crawl schedule you configure |
| **Whose permissions apply** | Permission-aware on both paths. Calendar permissions apply to indexed search, and each user's own Google permissions apply to the tools | The same |
| **What changes for your current setup** | Not applicable. You are connecting Google Calendar for the first time | Nothing. Your connector, its configuration, and its crawl continue to run unchanged |
| **Where to start** | [Set up Google Calendar](/connectors/native/gcal/new-setup) | [Connect Google Calendar with Glean](/connectors/native/gcal/setup) |

To see what each mode retrieves, whose permissions it enforces, and its limitations, read the [Google Calendar overview](/connectors/native/gcal/).

## See also[​](#see-also "Direct link to See also")

-   [Google Calendar overview](/connectors/native/gcal/) covers capabilities, indexing scope, permissions, and limitations.
-   [Set up Google Calendar](/connectors/native/gcal/new-setup) is the new-setup flow.
-   [Connect Google Calendar with Glean](/connectors/native/gcal/setup) is the existing connector setup reference.
