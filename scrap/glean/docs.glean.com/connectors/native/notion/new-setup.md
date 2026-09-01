---
url: "https://docs.glean.com/connectors/native/notion/new-setup"
canonical: "https://docs.glean.com/connectors/native/notion/new-setup"
title: "Notion setup"
description: "Connect Notion to Glean in two phases: authorize Notion's MCP server for immediate tools access, then collect indexing credentials and complete a crawl to turn on org-wide search"
fetched_at: "2026-09-01T13:29:36.149Z"
---
On this page

You're reading the **new setup**[Already have Notion connected? →](/connectors/native/notion/setup)

Connecting Notion takes one guided setup. It authorizes Notion's MCP server and collects your indexing credentials, so it gives you two things.

-   **Read and write tools** work right away, as soon as you authorize the MCP connection. Glean and Glean agents can search Notion, fetch pages and comments, and create or update pages, databases, and comments. Every tool runs as the person asking, using their own Notion authorization, so it respects that user's Notion permissions.
-   **Org-wide search** is part of the same setup. You provide the indexing credentials during setup, and Glean builds a search index from the pages, databases, and blocks you share with it. This index is not permission-aware, so any shared content is visible to every Glean user who can access the connector.

1.  Connect, authorize, and provide indexing credentialstoday — current step
2.  Use read and write toolstoday — current step
3.  Indexing runs in the backgroundtoday — happens automatically
4.  Org-wide search switches ontomorrow — happens automatically

## Feature availability after setup[​](#feature-availability-after-setup "Direct link to Feature availability after setup")

Read and write tools work as soon as you authorize the MCP connection. Indexing is part of the same setup, so org-wide search switches on automatically once the first crawl completes.

| Capability | When it becomes available | Whose permissions apply |
| --- | --- | --- |
| **Read and write tools** | After you authorize the connection | Each user's own Notion permissions, through their own Notion authorization |
| **Org-wide indexed search** | Once the first crawl completes | None at the document level. All content shared with the integration is visible to every Glean user who can access the connector. |

Because the indexed corpus is not permission-aware, share only content that is appropriate for org-wide visibility. The tools stay scoped to each user's own Notion permissions on every call.

## Connector setup[​](#connector-setup "Direct link to Connector setup")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm the following before you begin.

| Requirement | Why it is needed |
| --- | --- |
| A Glean admin who can add and configure connectors | Adds the Notion connector and completes setup in the Admin console |
| A Notion workspace admin | Authorizes Notion's MCP server, creates the Glean integration, and shares the pages and databases to index |

### Step 1. Connect and authorize[​](#step-1-connect-and-authorize "Direct link to Step 1. Connect and authorize")

1.  Sign in to Glean and go to **Connectors** in the Admin console.
2.  Add the **Notion** connector and enter a display **Name** for it. This is the name your organization members see.
3.  Select **Connect**. Glean redirects you to Notion to authorize the connection. Grant the requested permissions.
4.  After you connect, the setup flow advances automatically to the next step.

Completing this step enables read and write tools. Once your teammates authorize their own Notion accounts, they can use Notion's tools in Glean. See [Manage tools](#manage-tools) for how to change which ones are on, where they appear, and who can use them.

### Step 2. Set up indexing[​](#step-2-set-up-indexing "Direct link to Step 2. Set up indexing")

Provide the credentials Glean needs to index your Notion workspace.

1.  Create the Glean integration in Notion at [Notion my-integrations](https://www.notion.com/my-integrations), associate it with your workspace, give it read capabilities, and copy its internal integration token.
2.  Enter your Notion workspace in the **Name** field and paste the token into **Integration Token**.
3.  Share the pages and databases you want indexed with the Glean integration. Child pages of a shared page are shared automatically.
4.  Select **Save** to advance to the next step.

Share only content that is appropriate for org-wide visibility, because the indexed corpus is visible to everyone who can access the connector.

### Step 3. Review setup[​](#step-3-review-setup "Direct link to Step 3. Review setup")

Review your setup, then select **Begin indexing**. Glean runs the initial crawl in the background and then crawls on a schedule to keep content fresh. Notion has no webhooks, so Glean uses full crawls every 6 hours. Finishing this step returns you to the connector's Overview page.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

Authorizing the MCP connection makes Notion's tools available. You can see all available tools on the **Tools** tab of your connector and edit permissions through **Advanced settings**.

### Tool settings you can change afterwards[​](#tool-settings-you-can-change-afterwards "Direct link to Tool settings you can change afterwards")

-   **Which tools are on.** Keep read tools enabled and leave write tools off until you are ready for agents to act in Notion. See [Enabling or disabling individual tools](/administration/tools/managing-tools/per-tool-enable-disable).
-   **Where they appear.** Across Glean Assistant, Agents, and the Glean MCP server. See [Enabling tools for Chat and Agents](/administration/tools/managing-tools/tools-chat-vs-agents).
-   **Who can use them.** Scope each tool to specific users or groups. See [Tool visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping) and [role-based access to tools](/administration/tools/managing-tools/managing-role-based-access-tools).
-   **How write tools run.** Control whether a tool runs without user confirmation. See [Run tools without user confirmation](/administration/tools/managing-tools/run-without-user-confirmation) and [Allowing in-line execution of write tools](/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools).

For the full guide, see [Tools overview](/administration/tools/).

## Per-user authorization[​](#per-user-authorization "Direct link to Per-user authorization")

Setup authorizes Glean to Notion at the connector level and allows user-specific capabilities:

| Capability | Runs as | What it enforces |
| --- | --- | --- |
| **Read and write tools** | Each user's own Notion account | That user's own Notion permissions, checked by Notion on every call |
| **Indexed search** | The Glean integration | No per-user permissions. All content shared with the integration is visible to every Glean user who can access the connector. |

Each teammate authorizes their own Notion account over OAuth the first time they use a tool. Until they do, Glean answers their Notion questions from indexed content only.

## After setup[​](#after-setup "Direct link to After setup")

-   **Broaden coverage** by sharing more pages and databases with the integration.
-   **Segment content by team** by configuring multiple Notion connector instances, sharing a different subset with each, and restricting each connector's visibility to the right teammates. This separates content at the group level. The tools stay per-user permission-aware on their own.
-   **Check progress** any time from the Notion connector page in the Admin console.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Notion setup](/connectors/native/notion/choose-your-setup) shows which setup is yours and how tools and indexed search fit into each.
-   [Notion overview](/connectors/native/notion/about) covers objects, crawling, permissions, and limitations.
-   [Connect Notion with Glean](/connectors/native/notion/setup) is the existing connector setup reference.
