---
url: "https://docs.glean.com/connectors/native/gmail/new-setup"
canonical: "https://docs.glean.com/connectors/native/gmail/new-setup"
title: "Gmail setup"
description: "Connect Gmail and authorize Google Tools to enable read and write tools right away, then set up permission-aware data crawling and indexing."
fetched_at: "2026-09-01T13:29:30.346Z"
---
On this page

You're reading the **new setup**[Already have Gmail connected? →](/connectors/native/gmail/setup)

Connecting Gmail takes one authorization. Authorize Google Tools and your setup gives you two things.

-   **Read and write tools** work right away. Glean and Glean agents can search email threads, read messages, and draft emails and manage labels. Every tool runs as the person asking, using their own Google authorization, so it respects that user's Gmail permissions.
-   **Permission-aware search** is available when you turn on data crawling and indexing. Glean builds a search index of your email that respects Gmail's permission model, so each person searches their own mailbox content.

1.  Connect and authorizetoday - current step
2.  Use read and write toolstoday - current step
3.  Indexing runs in the backgroundtoday - happens automatically
4.  Permission-aware search switches ontomorrow - happens automatically

## Feature availability after setup[​](#feature-availability-after-setup "Direct link to Feature availability after setup")

Read and write tools work as soon as you authorize the MCP connection. Search switches on once you begin indexing and the first crawl completes.

| Capability | When it becomes available | Whose permissions apply |
| --- | --- | --- |
| **Read and write tools** | Immediately after you authorize the MCP connection | Each user's own Google permissions, through their own Google authorization |
| **Permission-aware search** | Once you begin indexing and the first crawl completes | Gmail's permission model, so each person searches their own mailbox content |

## Connector setup[​](#connector-setup "Direct link to Connector setup")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm the following before you begin.

| Requirement | Why it is needed |
| --- | --- |
| A Glean admin who can add and configure connectors | Adds the Gmail connector and authorizes it in the Admin console |
| A Google admin who can authorize the connection | Authorizes the MCP connection and, for indexing, sets up domain-wide delegation |

### Step 1. Connect[​](#step-1-connect "Direct link to Step 1. Connect")

In the Glean **Admin console**, go to **Connectors** and add the **Gmail** connector. This step authorizes Gmail's tools.

1.  Enter a **Name** for the connector. This is the name your organization members see.
    
2.  Under **Select an authorization method**, pick one option.
    
    -   **Central** (recommended). Use Glean's managed OAuth app, which needs no configuration.
    -   **Custom**. Use your own Google OAuth app. You provide a **Client ID** and **Client secret**.
    
    See [Google tools setup](https://docs.glean.com/administration/tools/setup-tools/google-tools-setup) for the full instructions.
    
3.  Select **Continue**. You return to Glean to set up indexing.
    

### Step 2. Set up indexing[​](#step-2-set-up-indexing "Direct link to Step 2. Set up indexing")

To add permission-aware search, set up data crawling and indexing. Set up domain-wide delegation and the required scopes. Choose the indexing scope, which is the users, groups, or domains whose email you want indexed. By default, indexing covers approximately 6 months of history and up to 5,000 Inbox threads per user. Limits can vary by deployment, and the full content crawl runs about monthly.

### Step 3. Review and begin[​](#step-3-review-and-begin "Direct link to Step 3. Review and begin")

Review who can use the connector and any data access rules, then finish setup. Choose whether the connector is available to all users or a test group, set inclusion and exclusion rules, and begin indexing or skip it for later.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

Connecting Gmail makes its tools available. You can see all available tools on the **Tools** tab of your connector and edit permissions through **Advanced settings**. Gmail's write tools create drafts and manage labels - there is no tool that sends email on a user's behalf.

### Tool settings you can change afterwards[​](#tool-settings-you-can-change-afterwards "Direct link to Tool settings you can change afterwards")

-   **Which tools are on.** Keep read tools enabled and leave write tools off until you are ready for agents to act in Gmail. See [Enabling or disabling individual tools](/administration/tools/managing-tools/per-tool-enable-disable).
-   **Where they appear.** Across Glean Assistant, Agents, and the Glean MCP server. See [Enabling tools for Chat and Agents](/administration/tools/managing-tools/tools-chat-vs-agents).
-   **Who can use them.** Scope each tool to specific users or groups. See [Tool visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping) and [role-based access to tools](/administration/tools/managing-tools/managing-role-based-access-tools).
-   **How write tools run.** Control whether a tool runs without user confirmation. See [Run tools without user confirmation](/administration/tools/managing-tools/run-without-user-confirmation) and [Allowing in-line execution of write tools](/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools).

For the full guide, see [Tools overview](/administration/tools/).

## Per-user authorization[​](#per-user-authorization "Direct link to Per-user authorization")

Setup authorizes Glean to Gmail at the connector level. From there, two identities decide what each person sees.

| Capability | Runs as | What it enforces |
| --- | --- | --- |
| **Indexed search** | The connector's indexing identity, through domain-wide delegation | Gmail's permission model, so each person searches their own mailbox content |
| **Read and write tools** | Each user's own Google account | That user's own Gmail permissions, checked by Google on every call |

Each teammate authorizes their own Google account over OAuth the first time they use a tool.

## After setup[​](#after-setup "Direct link to After setup")

-   **Refine what is indexed** with indexing scope and inclusion and exclusion rules.
-   **Check progress** any time from the Gmail connector page in the Admin console.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Gmail setup](/connectors/native/gmail/choose-your-setup) shows which setup is yours and how tools and indexed search fit into each.
-   [Connect Gmail with Glean](/connectors/native/gmail/setup) is the existing connector setup reference.
