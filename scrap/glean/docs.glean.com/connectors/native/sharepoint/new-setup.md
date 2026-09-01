---
url: "https://docs.glean.com/connectors/native/sharepoint/new-setup"
canonical: "https://docs.glean.com/connectors/native/sharepoint/new-setup"
title: "SharePoint setup"
description: "Connect SharePoint to Glean with the new Microsoft 365 setup, then set up indexing for permission-aware search across sites, pages, files, and lists."
fetched_at: "2026-09-01T13:29:40.783Z"
---
On this page

You're reading the **new setup**[Already have SharePoint connected? →](/connectors/native/sharepoint/setup)

The new setup connects SharePoint in the **Admin console**: you connect SharePoint to Glean, you set up indexing, then you review the setup. Credentials come from the [Microsoft 365 parent connector](/connectors/native/microsoft365/), so there is nothing to register in Microsoft for SharePoint itself.

-   **Time required.** Roughly 15 minutes of administrator work. The first crawl then runs in the background, and takes anywhere from a few hours to a few days depending on how much content your SharePoint tenant holds.
-   **Who does it.** A Glean administrator, working with a Microsoft 365 [Global Administrator](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles) who can grant consent on behalf of the tenant.
-   **What you get.** Permission-aware search across your SharePoint sites, pages, files, and lists, plus read and write tools that are available upon connecting.

## How features become available after setup[​](#how-features-become-available-after-setup "Direct link to How features become available after setup")

Tools work as soon as you connect. Permission-aware search follows once the first crawl has indexed your content, and results appear progressively as the crawl works through your sites rather than all at once.

| Capability | When it becomes available |
| --- | --- |
| Read and write tools | Upon connecting SharePoint. |
| Permission-aware search over SharePoint content | After the first crawl indexes your content. Results appear progressively as the crawl works through your sites. |
| Activity signals used for ranking | After the first crawl, once Glean has SharePoint usage history to rank results with. |
| Real-time search | Enabled by this setup. Each user authorizes their own account before real-time results reach them. See [Real-time search](#real-time-search). |
| Crawling restrictions | Any time after setup. See [Crawling restrictions](/connectors/native/sharepoint/restrictions) to control which sites and content Glean crawls. |

## Set up the connector[​](#set-up-the-connector "Direct link to Set up the connector")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   **SharePoint Online.** The connector supports SharePoint Online. Have your SharePoint domain to hand, for example `glean.sharepoint.com`.
-   **A Microsoft 365 Global Administrator.** Consent must be granted for the whole tenant, which only a Global Administrator can do.
-   **Glean administrator access.** You need permission to add and configure connectors in the **Admin console**.
-   **A custom OAuth application, only if your organization requires one.** Most deployments use Glean's managed application and need nothing here. If you must use your own registration, have the client ID and client secret ready, along with the ability to add a redirect URI to that registration in Microsoft Entra ID.

### Step 1: Open the SharePoint setup page[​](#step-1-open-the-sharepoint-setup-page "Direct link to Step 1: Open the SharePoint setup page")

Sign in to the Glean **Admin console** as an administrator, then open the SharePoint setup page. SharePoint is set up as part of the [Microsoft 365](/connectors/native/microsoft365/) suite, so it shares authentication and identity crawling with the other Microsoft 365 connectors.

### Step 2: Connect SharePoint[​](#step-2-connect-sharepoint "Direct link to Step 2: Connect SharePoint")

1.  In **Name**, keep the default connector name or enter one of your own. This is the name your organization's members see for this connector.
    
2.  Under **Select an authorization method**, choose how Glean authorizes tools. This choice applies to tools only. Indexing credentials are inherited from the Microsoft 365 suite and are not configured here. **Central** is preselected and is the only option shown until you select **Set up a custom app instead**.
    
3.  Select **Connect**, then complete the Microsoft sign-in and grant consent when prompted. Sign in with an account that holds the Global Administrator role, so that consent covers the whole tenant rather than your own account.
    

#### Authorization methods[​](#authorization-methods "Direct link to Authorization methods")

-   Central (recommended)
-   Custom OAuth app

Central uses Glean's managed OAuth application. There is nothing to register in Microsoft: Glean's application is already configured, and you grant it access to your tenant during this step. Most deployments use this option and need no further configuration.

Use this option only if your organization requires its own application registration in Microsoft Entra ID. Select **Set up a custom app instead** to reveal it, then provide the following:

-   **Client ID** and **Client secret** of your application registration.
-   The **Callback URL** that Glean displays. Add it as a redirect URI on your registration before you continue, otherwise Microsoft rejects the authorization request.
-   The delegated Microsoft Graph and SharePoint permissions that Glean lists. The list shown in the **Admin console** is already scoped to your deployment, so grant exactly those permissions rather than substituting values of your own.

For the full walkthrough, including how to create the registration and where each value comes from, see [Microsoft 365 tools setup](/administration/tools/setup-tools/m365-tools-setup#setup-instructions).

A custom application still relies on your Microsoft 365 connection for the Azure tenant ID. Connect Microsoft 365 first, or Glean cannot complete the setup.

Read and write tools are available upon connecting. Nothing is indexed yet at this point: indexing begins in the next step.

### Step 3: Set up indexing[​](#step-3-set-up-indexing "Direct link to Step 3: Set up indexing")

Glean advances to the **Set up indexing** step once SharePoint is connected.

1.  Under **Set up indexing for SharePoint**, select **View instructions**, then add the redirect URI shown there to the application registration used for indexing. This URI is different from the callback URL in the previous step, and the two are not interchangeable. It follows this pattern:
    
    ```
    https://<your-company-be.glean.com>/instance/o365/oauth/verify_code
    ```
    
2.  Enter your **SharePoint domain**, for example `glean.sharepoint.com`.
    
3.  Select **Continue**.
    

Two different URLs

If you set up a custom application for tools, Glean shows two similar-looking URLs during setup, and they serve different purposes. The path ending in `/tools/oauth/verify_code` is the callback URL for read and write tools. The path ending in `/instance/o365/oauth/verify_code` is the redirect URI used for indexing and real-time search. Add each one where Glean asks for it, and do not substitute one for the other.

Because SharePoint is set up as part of the Microsoft 365 suite, you do not create a certificate or upload keys here. Those credentials are inherited from the [Microsoft 365 parent connector](/connectors/native/microsoft365/) and are shared across its child connectors. To change them, edit them on the parent connector rather than on this page.

Glean then advances to the final step.

### Step 4: Review setup[​](#step-4-review-setup "Direct link to Step 4: Review setup")

Under **What to expect**, Glean summarizes what happens once SharePoint is live: read and write tools become available to your team, indexing runs continuously, and Glean uses the data to power search. Under **Manage test groups**, you can limit the connector to a test group before opening it to everyone.

Select **Begin indexing** to finish.

The first crawl runs in the background, and search results appear progressively as sites finish indexing.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

Tools require no separate enablement step. Connecting SharePoint makes them available, and you configure them on the **Tools** tab of the SharePoint connector page in the **Admin console**. Tools appear on that tab once Glean has finished syncing them from SharePoint, and new tools are enabled by default as Glean adds them.

Glean groups the tools into read tools and write tools, and shows how many of each are available.

### Read tools[​](#read-tools "Direct link to Read tools")

Read tools only retrieve. Every call runs as the person asking, scoped to their own SharePoint permissions, so a read tool cannot surface content that person could not already open in SharePoint. Examples include the following:

| Tool | What it does |
| --- | --- |
| Get SharePoint site page content | Returns the content of a SharePoint site page |
| List SharePoint folder contents | Lists the items in a SharePoint folder |
| Get SharePoint item by sharing URL | Resolves a SharePoint sharing link to the item it points at |

### Write tools[​](#write-tools "Direct link to Write tools")

Write tools change SharePoint content or permissions. They also run as the person asking, so a write tool can never do something that person could not do themselves. Examples include the following:

| Tool | What it does |
| --- | --- |
| Move SharePoint item | Moves a file or folder to a different location |
| Update SharePoint file content | Replaces the contents of an existing file |
| Share SharePoint item with user | Grants another user access to a file or folder |

Several SharePoint tools are still in beta, and availability varies by deployment. For the current inventory and each tool's status, see [Microsoft 365 tools](/tools/connector/microsoft-365#sharepoint).

### Tool settings you can change afterwards[​](#tool-settings-you-can-change-afterwards "Direct link to Tool settings you can change afterwards")

-   **Which tools are on.** Turn individual read and write tools on or off. Leave write tools off until you are ready for Glean to act on SharePoint content on a user's behalf.
-   **Where the tools appear.** Select **Advanced settings** to enable tools per surface, across **Chat** and **Agents**. Changes there apply immediately.
-   **Who can invoke them.** Set department access per surface, so that only the teams that need SharePoint tools get them.

For the full guide, see [Tools overview](/administration/tools/).

## Real-time search[​](#real-time-search "Direct link to Real-time search")

Real-time search is part of this setup rather than something you add later. Glean fetches content live from SharePoint at query time and stores nothing in the index, which keeps results current for content that changes constantly, and covers content that has not been crawled yet.

Real-time search runs as the person asking, so each user authorizes their own SharePoint account once before they see real-time results. Until they do, Glean answers their SharePoint questions from indexed content only. Users can authorize in either of two ways:

-   **Proactively:** A user goes to **Your Settings → Connectors** and selects **SharePoint**.
-   **On demand:** Glean prompts the user to authenticate when a query includes a link to a document that Glean has not indexed yet.

For the delegated permissions involved and how Glean handles live requests, see [Real-time access](/connectors/native/sharepoint/real-time-access).

## Optional configuration[​](#optional-configuration "Direct link to Optional configuration")

You can add the following at any point after setup. Neither is required for search to work.

-   **[Selected sites](/connectors/native/sharepoint/setup-selected-sites):** Narrows the connector to a specific set of sites instead of your whole tenant.
-   **[Crawling restrictions](/connectors/native/sharepoint/restrictions):** Controls which content Glean crawls using greenlists, redlists, and draft exclusions.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Glean reads all user access permissions from SharePoint and enforces them for every query, so users only see results they can already open in SharePoint.

Two different permission types are involved, and they cover different capabilities:

| Permission type | What it covers | How it is granted |
| --- | --- | --- |
| Application permissions in Microsoft Entra ID | Crawling and identity syncing | Once, by a Global Administrator granting admin consent during setup |
| Delegated permissions in Microsoft Entra ID | Tools and real-time search | Per user, when that user authorizes their own SharePoint account |

Client secrets are not supported for SharePoint indexing. Microsoft retired Azure ACS on April 2, 2026, so certificate authentication is the only supported method for the underlying Microsoft 365 credentials.

For the full picture, see [permission enforcement](/connectors/native/sharepoint/security/permissions), the [permission design](/connectors/native/sharepoint/security/permission-design), and the [API endpoints](/connectors/native/sharepoint/security/api) the connector calls.

## After setup[​](#after-setup "Direct link to After setup")

-   **Watch the first crawl.** Coverage builds up over hours rather than minutes. Search for content you know is in SharePoint to confirm results are appearing and that permissions look right.
-   **Check what is being crawled.** If some sites should stay out of Glean, set up [crawling restrictions](/connectors/native/sharepoint/restrictions) before the crawl completes.
-   **Look up any errors.** If setup or crawling reports a problem, see [error codes](/troubleshooting/error-codes/) for what each one means and how to resolve it.

## See also[​](#see-also "Direct link to See also")

-   [Choose your setup](/connectors/native/sharepoint/choose-your-setup): How this setup differs from the previous one, and which applies to your deployment.
-   [SharePoint overview](/connectors/native/sharepoint/about): What the SharePoint connector indexes and how it fits into the Microsoft 365 suite.
-   [Set up the indexing connector](/connectors/native/sharepoint/set-up-indexing-connector): Indexing configuration in detail, including what Glean crawls and which permissions each capability needs.
-   [Microsoft 365 connector](/connectors/native/microsoft365/): The parent connector that SharePoint inherits authentication and identity crawling from.
-   [Microsoft 365 tools setup](/administration/tools/setup-tools/m365-tools-setup): Authentication options for Microsoft 365 tools, including how to register a custom OAuth application.
