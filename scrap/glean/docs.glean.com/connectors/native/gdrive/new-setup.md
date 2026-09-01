---
url: "https://docs.glean.com/connectors/native/gdrive/new-setup"
canonical: "https://docs.glean.com/connectors/native/gdrive/new-setup"
title: "Google Drive setup"
description: "Connect Google Drive to enable read and write tools right away, then set up permission-aware data indexing."
fetched_at: "2026-09-01T13:29:27.727Z"
---
On this page

You're reading the **new setup**[Already have Google Drive connected? →](/connectors/native/gdrive/setup)

Connecting Google Drive requires one authorization step. Completing setup allows the following functionality.

-   **Read and write tools.** Glean and Glean agents can search Drive, read and download files, and create files, docs, and sheets. Every tool runs with a user's Google authorization and Drive permissions.
-   **Permission-aware search.** Turn on data indexing and Glean builds a search index of your Drive content. Glean mirrors Drive access controls through domain-wide delegation and enforces them at query time. Each user sees only the files they can open in Drive.

1.  Connect and authorizetoday — current step
2.  Use read and write toolstoday — current step
3.  Indexing runs in the backgroundtoday — happens automatically
4.  Permission-aware search switches ontomorrow — happens automatically

## Feature availability after setup[​](#feature-availability-after-setup "Direct link to Feature availability after setup")

Read and write tools are available upon connecting. Search switches on once you begin indexing and the first crawl completes.

| Capability | When it becomes available | Whose permissions apply |
| --- | --- | --- |
| **Read and write tools** | Immediately after you connect | Each user's own Google permissions, through their own Google authorization |
| **Permission-aware search** | Once you begin indexing and the first crawl completes | Drive access controls, mirrored through domain-wide delegation and enforced at query time |

Indexing is optional at setup. You can begin it right away or skip it and start later from the connector page.

## Connector setup[​](#connector-setup "Direct link to Connector setup")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm the following before you begin.

| Requirement | Why it is needed |
| --- | --- |
| A Glean admin who can add and configure connectors | Adds the Google Drive connector and authorizes it in the Admin console |
| A Google Super Admin, or a user with the required custom admin role | Authorizes the MCP connection and, for indexing, sets up domain-wide delegation |

### Step 1. Connect[​](#step-1-connect "Direct link to Step 1. Connect")

In the Glean **Admin console**, go to **Connectors** and add the **Google Drive** connector. This step authorizes Google Drive's tools.

1.  Enter a **Name** for the connector. This is the name your organization members see.
    
2.  Under **Select an authorization method**, pick one option.
    
    -   **Central** (recommended). Use Glean's managed OAuth app, which needs no configuration.
    -   **Custom**. Use your own Google OAuth app. You provide a **Client ID** and **Client secret**.
    
    See [Google tools setup](https://docs.glean.com/administration/tools/setup-tools/google-tools-setup) for the full instructions.
    
3.  Select **Continue**. You return to Glean to set up indexing.
    

### Step 2. Set up indexing[​](#step-2-set-up-indexing "Direct link to Step 2. Set up indexing")

To add permission-aware search, set up data indexing.

-   **Directory admin email.** Enter a Google Super Admin, or a user with a custom admin role that has the required privileges. Glean impersonates this identity through domain-wide delegation.
-   **Domain-wide delegation and scopes.** Add Glean's client ID and the required OAuth scopes in the Google Admin console.
-   **Additional domains.** Retrieve domains from your Google Workspace account, or enter them manually.
-   **Google Group mappings.** Upload a CSV that maps target audience IDs to Google Groups.
-   **Drive labels.** Leave this on to crawl Drive labels for filters and facets, or turn it off.

### Step 3. Review access and begin indexing[​](#step-3-review-access-and-begin-indexing "Direct link to Step 3. Review access and begin indexing")

Review who can use the connector and any data access rules, then finish setup.

-   **User access.** Make the connector available to all users, or to a test group only.
-   **Data access.** Set inclusion, exclusion, and additional rules for what Glean indexes.
-   Select **Begin indexing** to start the crawl, or **Skip for now** to defer it and start later from the connector page.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

Connecting Google Drive makes its tools available. You can see all available tools on the **Tools** tab of your connector and edit permissions through **Advanced settings**.

### Tool settings you can change afterwards[​](#tool-settings-you-can-change-afterwards "Direct link to Tool settings you can change afterwards")

-   **Which tools are on.** Keep read tools enabled and leave write tools off until you are ready for agents to act in Drive. See [Enabling or disabling individual tools](/administration/tools/managing-tools/per-tool-enable-disable).
-   **Where they appear.** Across Glean Assistant, Agents, and the Glean MCP server. See [Enabling tools for Chat and Agents](/administration/tools/managing-tools/tools-chat-vs-agents).
-   **Who can use them.** Scope each tool to specific users or groups. See [Tool visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping) and [role-based access to tools](/administration/tools/managing-tools/managing-role-based-access-tools).
-   **How write tools run.** Control whether a tool runs without user confirmation. See [Run tools without user confirmation](/administration/tools/managing-tools/run-without-user-confirmation) and [Allowing in-line execution of write tools](/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools).

For the full guide, see [Tools overview](/administration/tools/).

## Per-user authorization[​](#per-user-authorization "Direct link to Per-user authorization")

Setup authorizes Glean to Google Drive at the connector level. From there, two identities decide what each person sees.

| Capability | Runs as | What it enforces |
| --- | --- | --- |
| **Indexed search** | The Glean service account, through domain-wide delegation | Drive access controls, mirrored into the index and enforced at query time |
| **Read and write tools** | Each user's own Google account | That user's own Drive permissions, checked by Google on every call |

Each teammate authorizes their own Google account over OAuth the first time they use a tool. Indexed search needs no action from end users once the crawl completes.

## After setup[​](#after-setup "Direct link to After setup")

-   **Broaden coverage** by adding Google Workspace domains.
-   **Refine what is indexed** with inclusion, exclusion, and restriction rules, and Drive labels.
-   **Check progress** any time from the Google Drive connector page in the Admin console.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Google Drive setup](/connectors/native/gdrive/choose-your-setup) shows which setup is yours and how tools and indexed search fit into each.
-   [Google Drive overview](/connectors/native/gdrive/about) covers objects, crawling, permissions, and limitations.
-   [Connect Google Drive with Glean](/connectors/native/gdrive/setup) is the previous connector setup reference.
