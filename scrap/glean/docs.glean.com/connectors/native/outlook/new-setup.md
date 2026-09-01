---
url: "https://docs.glean.com/connectors/native/outlook/new-setup"
canonical: "https://docs.glean.com/connectors/native/outlook/new-setup"
title: "Set up Outlook"
description: "Connect Outlook through the guided Admin console flow. Connect, set up indexing, review and begin, and build a permission-aware index of your email."
fetched_at: "2026-09-01T13:29:37.726Z"
---
On this page

You're reading the **new setup**[Already have Outlook connected? →](/connectors/native/outlook/setup)

Connecting Outlook runs a multi-step flow in the Glean Admin console. You **connect**, **set up indexing**, then **review and begin**. Glean then builds a permission-aware index of your organization's email, scoped to what each user can already open in Outlook.

-   **Permission-aware search.** Glean indexes email and mirrors Outlook access controls, enforced at query time, so each user sees only the messages they can open in Outlook. Outlook uses `Calendars.Read` to surface calendar events in the Glean Today card. For calendar search and meeting transcripts, use the [Microsoft Teams connector](/connectors/native/teams/).
-   **Two read-only modes.** Data crawling and indexing (native) is the default path for search, and data fetching (federated) is also available for live results. Both are read-only.
-   **Read-only indexing.** The certificate-based Microsoft Graph app that powers indexing uses only read-only permissions (`Mail.Read`, `Calendars.Read`, `User.Read.All`, and `GroupMember.Read.All`). Glean never writes to, sends, or modifies anything in Outlook through this app.

1.  Connect and set up indexingtoday — current step
2.  Review and begintoday — current step
3.  Permission-aware search switches ona few days — happens automatically

## Feature availability after setup[​](#feature-availability-after-setup "Direct link to Feature availability after setup")

Search switches on once you begin indexing and the first crawl completes. How long the first crawl takes depends on the size of your corpus. Glean indexes email messages and threads. Attachment indexing is disabled by default; when enabled in the connector configuration, Glean indexes eligible attachment content and metadata.

| Capability | When it becomes available | Whose permissions apply |
| --- | --- | --- |
| **Permission-aware search (native indexing)** | Once you begin indexing and the first crawl completes | Outlook access controls, mirrored into the index and enforced at query time |
| **Real-time fetch (federated)** | Once the connector is connected | Outlook access controls, checked at query time |

## Connector setup[​](#connector-setup "Direct link to Connector setup")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm the following before you begin.

| Requirement | Why it is needed |
| --- | --- |
| A Microsoft Global Admin | Registers the Azure app, grants admin consent for the Microsoft Graph permissions, and uploads the certificate |
| A Glean admin who can add and configure connectors | Completes the two-step Outlook flow in the Admin console |
| Microsoft 365 or Exchange Online | The connector supports Exchange Online only, not on-premises or legacy Exchange |

### Step 1. Connect[​](#step-1-connect "Direct link to Step 1. Connect")

In the Glean **Admin console**, go to **Connectors** and add the **Outlook** connector. This step authorizes Outlook's tools.

1.  Enter a **Name** for the connector. This is the name your organization members see.
    
2.  Under **Select an authorization method**, pick one option.
    
    -   **Central** (recommended). Use Glean's managed OAuth app, which needs no configuration.
    -   **Custom**. Use your own Azure OAuth app. You provide a **Client ID** and **Client secret**.
    
    See [Central and custom authentication for Microsoft 365 tools](https://docs.glean.com/administration/tools/setup-tools/m365-tools-setup#setup-instructions) for the full instructions. The same steps apply to OneDrive, SharePoint, and Outlook.
    
3.  Select **Continue**. You return to Glean to set up indexing.
    

### Step 2. Set up indexing[​](#step-2-set-up-indexing "Direct link to Step 2. Set up indexing")

Provide the Azure app credentials Glean needs to build a permission-aware index of email. This is a separate Azure app from the one you authorized in Step 1. If you already set up the Microsoft 365 parent connector, Outlook can share its tenant, but you still register Outlook's own client ID and certificate here. There is no tenant ID field on this step, because the tenant ID is inherited from the Microsoft 365 suite.

1.  Sign in to the Azure portal. Select **Microsoft Entra ID**, then **Manage → App registrations → New registration**. Register the app with these values.
    
    -   Set **Name** to Glean.
    -   Set **Supported account types** to Accounts in this organizational directory only (single tenant).
    -   Leave **Redirect URI** blank.
    
    Select **Register**.
    
2.  In the app, add the Microsoft Graph Application permissions. Select **Manage → API Permissions → Add a permission**, choose **Microsoft Graph**, then **Application permissions**, and add the following (all read-only).
    
    -   `Mail.Read` grants read access to email messages.
    -   `Calendars.Read` surfaces calendar events in the Glean Today card.
    -   `User.Read.All` grants user identities for permission mapping.
    -   `GroupMember.Read.All` grants group memberships for the product access group.
3.  Grant admin consent. Signed in as a Global, Application, or Cloud Application Administrator, use the search box to open **Enterprise applications**, select the **Glean** app, open **Permissions** under **Security**, and select **Grant admin consent**.
    
4.  Generate a certificate. Follow [Generate a certificate and private key](/connectors/native/outlook/native#generate-a-certificate-and-private-key).
    
5.  [Upload the certificate to Azure](/connectors/native/outlook/native#upload-the-certificate-to-azure). Save the **Application (client) ID** from the app **Overview** page.
    
6.  Back in Glean, enter the **Application (client) ID**, upload the certificate (`.crt`) and private key (`.key`) files, and select **Continue**.
    
7.  Set the crawl scope. See [Outlook crawl restrictions](/connectors/native/outlook/restrictions) for mailbox, domain, and message-history limits.
    

### Step 3. Review and begin[​](#step-3-review-and-begin "Direct link to Step 3. Review and begin")

Review the connector, then start it.

-   **User access.** Make the connector available to all users, or to a test group only.
-   **Data access.** Confirm the mailbox, domain, and message-history scope.
-   Begin indexing to start the first crawl. Indexing runs in the background, and permission-aware search switches on once the first crawl completes.

### Manage users (optional)[​](#manage-users-optional "Direct link to Manage users (optional)")

To limit who Glean can index, restrict the app to specific users or groups in Azure. See [Manage users](/connectors/native/outlook/certificate-native-federated#manage-users-optional) for the steps.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

Connecting Outlook makes its tools available. You can see all available tools on the **Tools** tab of your connector and edit permissions through **Advanced settings**.

### Tool settings you can change afterwards[​](#tool-settings-you-can-change-afterwards "Direct link to Tool settings you can change afterwards")

-   **Which tools are on.** Keep read tools enabled and leave write tools off until you are ready for agents to act in Outlook. See [Enabling or disabling individual tools](/administration/tools/managing-tools/per-tool-enable-disable).
-   **Where they appear.** Across Glean Assistant, Agents, and the Glean MCP server. See [Enabling tools for Chat and Agents](/administration/tools/managing-tools/tools-chat-vs-agents).
-   **Who can use them.** Scope each tool to specific users or groups. See [Tool visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping) and [role-based access to tools](/administration/tools/managing-tools/managing-role-based-access-tools).
-   **How write tools run.** Control whether a tool runs without user confirmation. See [Run tools without user confirmation](/administration/tools/managing-tools/run-without-user-confirmation) and [Allowing in-line execution of write tools](/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools).

For the full guide, see [Tools overview](/administration/tools/).

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   **Permission propagation.** Glean maps document-level permissions from Outlook and enforces search-result visibility from those mappings at query time.
-   **Read-only access.** The Microsoft Graph app uses only read-only application permissions (`Mail.Read`, `Calendars.Read`, `User.Read.All`, and `GroupMember.Read.All`), with admin consent and no delegated user privileges. Glean never writes to, sends, or modifies Outlook data. The connector supports Exchange Online only.

## After setup[​](#after-setup "Direct link to After setup")

-   **Refine what is indexed** with mailbox, domain, and message-history restrictions. See [Outlook crawl restrictions](/connectors/native/outlook/restrictions).
-   **Check progress** any time from the Outlook connector page in the Admin console.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Outlook setup](/connectors/native/outlook/choose-your-setup) shows which setup is yours and how permission-aware indexing fits into each.
-   [Outlook overview](/connectors/native/outlook/about) covers what gets indexed, permissions, and limitations.
-   [Existing setup](/connectors/native/outlook/setup) is the existing connector setup reference.
