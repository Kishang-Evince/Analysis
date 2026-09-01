---
url: "https://docs.glean.com/connectors/native/onedrive/new-setup"
canonical: "https://docs.glean.com/connectors/native/onedrive/new-setup"
title: "OneDrive setup"
description: "Connect OneDrive through the guided Microsoft 365 flow. Authorize OneDrive's tools, set up the shared Azure app and certificate, grant permissions, and build a permission-aware search index of your files."
fetched_at: "2026-09-01T13:29:37.154Z"
---
On this page

You're reading the **new setup**[Already have OneDrive connected? →](/connectors/native/onedrive/setup)

Connecting OneDrive runs a guided flow in the Microsoft 365 suite. You authorize OneDrive's tools, set up the shared Azure app and certificate once, then Glean builds a permission-aware search index of your organization's files. Because OneDrive is part of the [Microsoft 365](/connectors/native/microsoft365/) suite, the same app and certificate cover every Microsoft 365 child connector you add.

-   **Tools work once you connect.** Authorizing OneDrive enables its read and write tools right away. Every tool runs as the person asking, using their own OneDrive permissions.
-   **Permission-aware search.** Glean crawls your OneDrive files and folders into its index and mirrors OneDrive access controls, enforced at query time, so each user sees only the files they can open in OneDrive.
-   **Real-time access.** OneDrive also supports fetching always-live results at query time, alongside the indexed search. See [Real-time access](/connectors/native/onedrive/real-time-access) for details.

1.  Connect and authorize toolstoday — current step
2.  Set up indexingtoday — current step
3.  Crawl runs in the backgroundtoday — happens automatically
4.  Permission-aware search switches ona few days — happens automatically

## Feature availability after setup[​](#feature-availability-after-setup "Direct link to Feature availability after setup")

Read and write tools work as soon as you authorize the Connect step. Search switches on once you begin indexing and the first crawl completes. How long the first crawl takes depends on the size of your corpus.

| Capability | When it becomes available | Whose permissions apply |
| --- | --- | --- |
| **Read and write tools** | Immediately after you complete the Connect step | Each user's own OneDrive permissions, through their own authorization |
| **Permission-aware search** | Once you begin indexing and the first crawl completes | OneDrive access controls, mirrored into the index and enforced at query time |
| **Real-time access** | Once the connector is connected and each user authenticates | Each user's own OneDrive permissions, checked at query time |

## Connector setup[​](#connector-setup "Direct link to Connector setup")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm the following before you begin.

| Requirement | Why it is needed |
| --- | --- |
| A Glean admin who can add and configure connectors | Adds the OneDrive connector and completes setup in the Admin console |
| A Microsoft 365 Global Admin | Registers the shared app, uploads the certificate, and grants admin consent for the API permissions |

### Step 1. Log in to the Admin console[​](#step-1-log-in-to-the-admin-console "Direct link to Step 1. Log in to the Admin console")

Sign in to Glean and go to **Connectors** in the Admin console. Add the **OneDrive** connector under Microsoft 365.

### Step 2. Connect[​](#step-2-connect "Direct link to Step 2. Connect")

This step authorizes OneDrive's tools.

1.  Under **Select an authorization method**, pick one option.
    
    -   **Central** (recommended). Use Glean's managed OAuth app, which needs no configuration.
    -   **Custom**. Use your own Azure OAuth app. You provide a client ID and client secret.
    
    See [Central and custom authentication for Microsoft 365 tools](https://docs.glean.com/administration/tools/setup-tools/m365-tools-setup#setup-instructions) for the full instructions. The same steps apply to OneDrive, SharePoint, and Outlook.
    
2.  Select **Continue**. You return to Glean to set up indexing.
    

### Step 3. Set up indexing[​](#step-3-set-up-indexing "Direct link to Step 3. Set up indexing")

This step establishes the shared Microsoft 365 app that OneDrive authenticates through, and starts the first crawl. OneDrive does not support client secrets for this app, so certificate authentication is the only method.

1.  If you already set up the [Microsoft 365 parent connector](/connectors/native/microsoft365/), OneDrive inherits its app registration, client ID, tenant ID, and certificate. Continue to sub-step 6.
    
2.  Sign in to the [Azure portal](https://portal.azure.com/). Select **Microsoft Entra ID**, then **Manage → App registrations → New registration**.
    
3.  Register the app with these values.
    
    -   Set **Name** to `Glean`.
    -   Set **Supported account types** to Accounts in this organizational directory only (single tenant).
    -   Leave **Redirect URI** blank.
    
    Select **Register**.
    
4.  Generate a certificate, then upload its public key to the app under **Manage → Certificates and secrets → Certificates**. The [Microsoft 365 setup guide](https://docs.glean.com/connectors/native/microsoft365/setup#set-up-certificate-authentication) covers generating the certificate and uploading the matching value in Glean. Never paste certificate contents into a documentation page or a support ticket.
    
5.  From the app **Overview** page, copy the **Application (client) ID** and the **Directory (tenant) ID** and enter them in Glean.
    
6.  In the app, select **Manage → API Permissions → Add a permission**, choose **Microsoft Graph**, then **Application permissions**, and add:
    
    -   `Files.ReadWrite.All`. This scope is used only to create webhook subscriptions over drives. Glean never writes to your files.
    -   `Sites.FullControl.All`. This scope lets Glean read SharePoint permission changes and keep document access current.
7.  Select **Add a permission**, choose **SharePoint**, then **Application permissions**, and add `Sites.FullControl.All`. Glean uses this SharePoint API permission to read site, page, and list permissions. Microsoft does not provide a more granular read-only scope for these endpoints.
    
8.  Sign in to Azure as a Global, Application, or Cloud Application Administrator. Use the search box to open **Enterprise applications**, select the **Glean** app, open **Security** then **Permissions**, and select **Grant admin consent** for the Graph and SharePoint permissions.
    
9.  Set the crawl scope. By default Glean crawls all personal drives. You can scope indexing to a specific Microsoft Entra ID group. See [OneDrive crawl restrictions](/connectors/native/onedrive/restrictions).
    
10.  Select **Save**. When the credentials save, the connector begins its first crawl, and search switches on for your organization once the crawl completes.
     

The identity permissions that OneDrive shares with the suite, such as `User.Read.All` and `GroupMember.Read.All`, are granted once on the Microsoft 365 parent app and do not need to be re-added here. For the full, authoritative list of permissions, see [Required permissions](/connectors/native/onedrive/setup#required-permissions).

To increase full crawl indexing speed, Glean recommends between 1 and 10 additional applications with the same permission settings as the first app. Repeat sub-steps 2 through 5 for each additional app, saving each **Application (client) ID** into Glean. You only need to upload the certificate in Glean once.

## Add-ons[​](#add-ons "Direct link to Add-ons")

Enable these once the base connector is running.

-   **[Real-time access](/connectors/native/onedrive/real-time-access)** fetches results live from OneDrive at query time for content that must always be current, with nothing stored in Glean's index. It requires additional delegated permissions and per-user authentication.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

Connecting OneDrive makes its tools available. You can see all available tools on the **Tools** tab of your connector and edit permissions through **Advanced settings**.

### Tool settings you can change afterwards[​](#tool-settings-you-can-change-afterwards "Direct link to Tool settings you can change afterwards")

-   **Which tools are on.** Keep read tools enabled and leave write tools off until you are ready for agents to act in OneDrive. See [Enabling or disabling individual tools](/administration/tools/managing-tools/per-tool-enable-disable).
-   **Where they appear.** Across Glean Assistant, Agents, and the Glean MCP server. See [Enabling tools for Chat and Agents](/administration/tools/managing-tools/tools-chat-vs-agents).
-   **Who can use them.** Scope each tool to specific users or groups. See [Tool visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping) and [role-based access to tools](/administration/tools/managing-tools/managing-role-based-access-tools).
-   **How write tools run.** Control whether a tool runs without user confirmation. See [Run tools without user confirmation](/administration/tools/managing-tools/run-without-user-confirmation) and [Allowing in-line execution of write tools](/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools).

For the full guide, see [Tools overview](/administration/tools/).

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   **Permission propagation.** Glean maps document-level permissions from OneDrive one-to-one and enforces search-result visibility from those mappings at query time.
-   **Certificate authentication.** All indexing uses certificate-based application permissions with admin consent, and no delegated user privileges. Consumer OneDrive on personal Microsoft accounts is not supported. Glean supports OneDrive for Business only.

## After setup[​](#after-setup "Direct link to After setup")

-   **Refine what is indexed** with crawl restrictions and Microsoft Purview sensitivity labels. See [OneDrive crawl restrictions](/connectors/native/onedrive/restrictions).
-   **Add always-live results** by enabling [real-time access](/connectors/native/onedrive/real-time-access).
-   **Check progress** any time from the OneDrive connector page in the Admin console.

## See also[​](#see-also "Direct link to See also")

-   [Choose your OneDrive setup](/connectors/native/onedrive/choose-your-setup) shows which setup is yours and how tools, indexed search, and add-ons fit into each.
-   [OneDrive overview](/connectors/native/onedrive/about) covers connection methods, what gets indexed, permissions, and limitations.
-   [Set up the indexing connector](/connectors/native/onedrive/setup) is the previous connector setup reference.
