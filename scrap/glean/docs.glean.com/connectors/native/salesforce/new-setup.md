---
url: "https://docs.glean.com/connectors/native/salesforce/new-setup"
canonical: "https://docs.glean.com/connectors/native/salesforce/new-setup"
title: "Set up Salesforce"
description: "Connect Salesforce with one authorization. Live data and tools come online immediately, and permission-aware search builds in the background."
fetched_at: "2026-09-01T13:29:39.763Z"
---
On this page

You're reading the **new setup**[Already have Salesforce connected? →](/connectors/native/salesforce/setup)

Connecting Salesforce requires a single authorization step. Once connected, your setup provides:

-   **Live connection:** Glean queries Salesforce in real time to return up-to-the-minute record details.
-   **Actionable tools:** Glean and Glean agents can search Salesforce, run SOQL queries, and execute actions directly on records.
-   **Permission-aware search:** Glean automatically builds a background search index that respects your Salesforce access controls.

## How features become available after setup[​](#how-features-become-available-after-setup "Direct link to How features become available after setup")

Live queries and agent tools work immediately after authorization. Permission-aware search activates automatically as soon as the initial crawl completes, which allows Glean to answer questions grounded in Salesforce before full indexing has finished.

| Capability | When it becomes available | Example |
| --- | --- | --- |
| **Live connection** | Immediately after authorization | A representative creates the opportunity *Acme Q3 expansion* and finds it in Glean seconds later, before any incremental crawl has run. |
| **Tools** | Immediately after authorization | A support lead asks Glean for escalated Contoso cases created this week, and receives each case with its subject, status, and owner. |
| **Permission-aware search** | Automatically, once the initial crawl completes | Salesforce records rank alongside content from every other connected source in Glean search results. |

You can confirm both capabilities on the connector's **Overview** tab, under **Data retrieval methods**, which shows **Live connection** and the sync status of the background index.

Every live query and every tool invocation uses the requesting user's own Salesforce credentials, so results and actions remain scoped to that user's permissions. For details, see [Per-user authorization](#per-user-authorization) and [Use the Salesforce connector](/connectors/native/salesforce/use-salesforce-connector).

## Set up the connector[​](#set-up-the-connector "Direct link to Set up the connector")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm the following before you begin. Setup requires both roles, because the connector is created in Glean and authorized in Salesforce.

| Requirement | Why it is needed |
| --- | --- |
| A Glean org admin, or an equivalent role authorized to manage connectors and tools | Creates the Salesforce connector and configures its objects and tools in the Admin console |
| A Salesforce administrator who can authorize the Glean connected app for your org | Grants Glean access to Salesforce over OAuth during the authorization step |

### Step 1: Log in to the Admin console[​](#step-1-log-in-to-the-admin-console "Direct link to Step 1: Log in to the Admin console")

Sign in to Glean and go to **Admin console → Platform → Connectors**, select **Add connector**, and choose **Salesforce**.

### Step 2: Authorize Salesforce[​](#step-2-authorize-salesforce "Direct link to Step 2: Authorize Salesforce")

Sign in to Salesforce and authorize Glean through the connected app over OAuth.

Glean mirrors Salesforce record-level permissions as it indexes. Live data and tools enforce each user's own Salesforce permissions at query time: see [Per-user authorization](#per-user-authorization).

### Step 3: Add objects[​](#step-3-add-objects "Direct link to Step 3: Add objects")

Glean covers the standard CRM objects by default: Accounts, Contacts, Leads, Opportunities, Cases, Case Comments, Tasks, Campaigns, Knowledge, and Chatter. Add custom or managed-package objects to broaden coverage during setup or any time afterward.

See [Additional objects](/connectors/native/salesforce/additional-objects) for how custom-object coverage and permissions work.

### Step 4: Begin sync[​](#step-4-begin-sync "Direct link to Step 4: Begin sync")

Start the initial crawl. The crawl runs in the background, and Glean then runs scheduled full and incremental crawls of the objects you selected to keep content fresh.

Once indexing and ranking complete, permission-aware search over Salesforce is enabled automatically, with no further action required from you. Indexing does not block the rest of your rollout, so you can continue onboarding your other sources while the initial crawl runs.

## Per-user authorization[​](#per-user-authorization "Direct link to Per-user authorization")

Setup connects Glean to Salesforce at the organization level. From there, two different identities decide what any one person sees:

| Capability | Runs as | What it enforces |
| --- | --- | --- |
| **Indexed search** | The connector's integration user | Salesforce record-level permissions, mirrored into the index as Glean crawls |
| **Live data and tools** | Each end user's own Salesforce account | That user's own Salesforce permissions, checked at query time |

Indexed search requires no action from your end users. Once the initial crawl completes, each person sees exactly the Salesforce records their Salesforce permissions entitle them to.

The live connection and tools require one action from each end user. Each person authorizes their own Salesforce account over OAuth the first time they use a live capability, which is a one-time step separate from the connector authorization you completed during setup. Until a user completes that authorization, Glean answers their Salesforce questions from indexed content only. Afterward, every live query and every tool invocation is scoped to that user's own Salesforce permissions.

Answers therefore remain record-level permission-aware on both paths: the index mirrors Salesforce permissions, and every live capability runs as the person asking.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

Tools require no separate enablement step. Authorizing Salesforce makes them available, and you configure them as part of connector setup.

### Read tools[​](#read-tools "Direct link to Read tools")

Read tools only retrieve. Every call runs as the person asking, scoped to their own Salesforce permissions, so a read tool cannot surface a record that person could not already open in Salesforce. Examples include the following:

| Tool | What it does |
| --- | --- |
| [Salesforce search](/tools/connector/salesforce/salesforce-search) | Searches Salesforce with the asking user's own OAuth context |
| [Search Salesforce with SOQL](/tools/connector/salesforce/search-salesforce-with-soql) | Turns a question into SOQL, runs it, and grounds the answer in the results |
| [Get account](/tools/connector/salesforce/get-account) | Returns a single account record and its fields |

### Write tools[​](#write-tools "Direct link to Write tools")

Write tools change Salesforce records. They also run as the person asking, so a write tool can never do something that person could not do themselves. Enable them when you are ready for Glean agents to act on your CRM, and pair them with human review. Examples include the following:

| Tool | What it does |
| --- | --- |
| [Update Salesforce opportunity](/tools/connector/salesforce/update-salesforce-opportunity) | Changes fields on an existing opportunity, such as stage or amount |
| [Create contact](/tools/connector/salesforce/create-contact) | Creates a new contact, optionally linked to an account |
| [Log email activity](/tools/connector/salesforce/log-email-activity) | Records an email against a Salesforce record as activity history |

For the complete inventory, including each tool's parameters and troubleshooting guidance, see [Salesforce tools](/tools/connector/salesforce/sf-index).

### Tool settings you can change after setup[​](#tool-settings-you-can-change-after-setup "Direct link to Tool settings you can change after setup")

-   **Which tools are on.** Keep the read tools enabled and leave write tools disabled until you are ready for agents to act on your CRM. See [Enabling or disabling individual tools](/administration/tools/managing-tools/per-tool-enable-disable).
-   **Where the tools appear.** Across **Assistant**, **Agents**, and **Glean MCP Server**. See [Enabling tools for Chat vs Agents](/administration/tools/managing-tools/tools-chat-vs-agents).
-   **Who can invoke them.** Scope access to specific users or groups so only the teams that need Salesforce tools get them. See [Tool visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping).
-   **Who can configure or invoke write tools.** Tool-level role-based access. See [Managing tool access](/administration/tools/managing-tools/managing-role-based-access-tools).

For the full guide, see [Tools overview](/administration/tools/).

## After setup[​](#after-setup "Direct link to After setup")

Once the initial crawl is healthy, refine coverage:

-   **Broaden coverage** with additional and custom objects: see [Additional objects](/connectors/native/salesforce/additional-objects).
-   **Index files and attachments** on Salesforce records: see [Attachments indexing](/connectors/native/salesforce/salesforce-index-attachment).
-   **Check progress** any time from **Admin console → Platform → Connectors → Salesforce**.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Salesforce setup](/connectors/native/salesforce/choose-your-setup): which setup is yours, and how indexed search, live data, and tools fit into each
-   [Use the Salesforce connector](/connectors/native/salesforce/use-salesforce-connector): live data, tools, and the Service Cloud integration
-   [Salesforce overview](/connectors/native/salesforce/about): data, permissions, and sync behavior
-   [Troubleshooting](/connectors/native/salesforce/troubleshooting) and [FAQs](/connectors/native/salesforce/faq)
