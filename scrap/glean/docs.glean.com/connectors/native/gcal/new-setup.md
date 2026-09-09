---
url: "https://docs.glean.com/connectors/native/gcal/new-setup"
canonical: "https://docs.glean.com/connectors/native/gcal/new-setup"
title: "Google Calendar setup"
description: "Connect Google Calendar and authorize its MCP server to enable read and write calendar tools right away, then set up permission-aware data crawling and indexing."
fetched_at: "2026-09-01T13:29:27.318Z"
---
On this page

You're reading the **new setup**[Already have Google Calendar connected? →](/connectors/native/gcal/setup)

Connecting Google Calendar takes one authorization. Authorize Google Calendar's MCP server and your setup gives you two things.

-   **Read and write calendar tools** work right away. Glean and Glean agents can find, create, update, and respond to meetings, list calendars, and suggest times. Every tool runs as the person asking, using their own Google authorization, so it respects that user's Calendar permissions.
-   **Permission-aware search** is available when you turn on data crawling and indexing. Glean indexes your Google Calendar events so meetings appear in search and power calendar agents. Glean enforces Calendar permissions at query time, and private events surface as free or busy only.

1.  Connect and authorizetoday - current step
2.  Use read and write toolstoday - current step
3.  Indexing runs in the backgroundtoday - happens automatically
4.  Permission-aware search switches ontomorrow - happens automatically

## Feature availability after setup[​](#feature-availability-after-setup "Direct link to Feature availability after setup")

Read and write calendar tools work as soon as you authorize the MCP connection. Search switches on once you begin indexing and the first crawl completes.

| Capability | When it becomes available | Whose permissions apply |
| --- | --- | --- |
| **Read and write calendar tools** | Immediately after you authorize the MCP connection | Each user's own Google permissions, through their own Google authorization |
| **Permission-aware search** | Once you begin indexing and the first crawl completes | Calendar permissions enforced at query time. Private events show as free or busy |

## Connector setup[​](#connector-setup "Direct link to Connector setup")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm the following before you begin.

| Requirement | Why it is needed |
| --- | --- |
| A Glean admin who can add and configure connectors | Adds the Google Calendar connector and authorizes it in the Admin console |
| A Google Workspace admin | Authorizes the MCP connection and manages the shared Google Drive delegation for indexing |
| The Google Drive connector, set up and healthy | Google Calendar indexing reuses the Google Drive service account and domain-wide delegation |

### Step 1. Connect[​](#step-1-connect "Direct link to Step 1. Connect")

In the Glean **Admin console**, go to **Connectors** and add the **Google Calendar** connector. This step authorizes Google Calendar's tools.

1.  Enter a **Name** for the connector. This is the name your organization members see.
    
2.  Under **Select an authorization method**, pick one option.
    
    -   **Central** (recommended). Use Glean's managed OAuth app, which needs no configuration.
    -   **Custom**. Use your own Google OAuth app. You provide a **Client ID** and **Client secret**.
    
    See [Google tools setup](https://docs.glean.com/administration/tools/setup-tools/google-tools-setup) for the full instructions.
    
3.  Select **Continue**. You return to Glean to set up indexing.
    

### Step 2. Set up indexing[​](#step-2-set-up-indexing "Direct link to Step 2. Set up indexing")

To add permission-aware search, set up data crawling and indexing. Google Calendar reuses the Google Drive connector's service account and delegation.

-   **Confirm the Google Drive connector** is set up and healthy.
-   **Add the Calendar scope** (`https://www.googleapis.com/auth/calendar.readonly`) to the domain-wide delegation client that Google Drive already uses, and enable the Google Calendar API in the same Google Cloud project.
-   **Confirm the directory admin email** from the Google Drive connector is a valid Google Workspace user with Calendar enabled.

### Step 3. Review and begin[​](#step-3-review-and-begin "Direct link to Step 3. Review and begin")

Review who can use the connector and any data access rules, then finish setup. Select **Begin indexing** to start the crawl, or defer it and start later from the connector page.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

Connecting Google Calendar makes its tools available. You can see all available tools on the **Tools** tab of your connector and edit permissions through **Advanced settings**.

### Tool settings you can change afterwards[​](#tool-settings-you-can-change-afterwards "Direct link to Tool settings you can change afterwards")

-   **Which tools are on.** Keep read tools enabled and leave write tools off until you are ready for agents to act on calendars. See [Enabling or disabling individual tools](/administration/tools/managing-tools/per-tool-enable-disable).
-   **Where they appear.** Across Glean Assistant, Agents, and the Glean MCP server. See [Enabling tools for Chat and Agents](/administration/tools/managing-tools/tools-chat-vs-agents).
-   **Who can use them.** Scope each tool to specific users or groups. See [Tool visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping) and [role-based access to tools](/administration/tools/managing-tools/managing-role-based-access-tools).
-   **How write tools run.** Control whether a tool runs without user confirmation. See [Run tools without user confirmation](/administration/tools/managing-tools/run-without-user-confirmation) and [Allowing in-line execution of write tools](/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools).

For the full guide, see [Tools overview](/administration/tools/).

## Per-user authorization[​](#per-user-authorization "Direct link to Per-user authorization")

Setup authorizes Glean to Google Calendar at the connector level. From there, two identities decide what each person sees.

| Capability | Runs as | What it enforces |
| --- | --- | --- |
| **Indexed search** | The shared Google Drive service account, through domain-wide delegation | Calendar permissions enforced at query time. Private events show as free or busy |
| **Read and write tools** | Each user's own Google account | That user's own Calendar permissions, checked by Google on every call |

Each teammate authorizes their own Google account over OAuth the first time they use a tool. Indexed search needs no action from end users once the crawl completes.

## After setup[​](#after-setup "Direct link to After setup")

-   **Tune what is indexed** with inclusion and exclusion rules for calendars.
-   **Check progress** any time from the Google Calendar connector page in the Admin console.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Google Calendar setup](/connectors/native/gcal/choose-your-setup) shows which setup is yours and how tools and indexed search fit into each.
-   [Google Calendar overview](/connectors/native/gcal/) covers capabilities, indexing scope, permissions, and limitations.
-   [Connect Google Calendar with Glean](/connectors/native/gcal/setup) is the existing connector setup reference.
