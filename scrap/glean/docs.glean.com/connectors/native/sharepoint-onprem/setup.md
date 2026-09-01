---
url: "https://docs.glean.com/connectors/native/sharepoint-onprem/setup"
canonical: "https://docs.glean.com/connectors/native/sharepoint-onprem/setup"
title: "setup"
fetched_at: "2026-09-01T13:29:40.802Z"
---
On this page

## Connect to your SharePoint On-Premise instance[​](#connect-to-your-sharepoint-on-premise-instance "Direct link to Connect to your SharePoint On-Premise instance")

### Required for setup[​](#required-for-setup "Direct link to Required for setup")

-   An Entra (Azure AD) Premium P1 or P2 license.
-   An on-premises server where you can install the Entra Application Proxy connector
-   The user setting up this connector must be the [**Global Admin**](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles).
-   A service user account with Admin access to all Sharepoint Sites being added
-   Use Entra Application Proxy to sync on-premise Active Directory users and groups to O365 users and groups via User Principal Name

### Gather Setup Info[​](#gather-setup-info "Direct link to Gather Setup Info")

1.  The **Sharepoint On-Premise App URL** ([http://your-onprem-app/](http://your-onprem-app/))
    -   This is the base url which you access sites from your internal network
2.  The list of **Site Collection names**. The full list of site collections can be found at [https://your-onprem-app/\_admin/SiteCollections.aspx](https://your-onprem-app/_admin/SiteCollections.aspx). These are often prefixed with */sites/*.
3.  The **NTLM** credentials of the service account you will use to authenticate with
    1.  username
    2.  password
4.  The **User Principal Name (UPN) Suffix**
    1.  This can be found within your on-premise Active Directory by going to a user and selecting the Account tab
    2.  Look for the field **User logon name:**
    3.  The portion following the **@** separator (@**some-domain.com**) will be the UPN Suffix ![](/assets/images/upn-suffix-e0035e1d9273728bb532860733faadf0.png)

### Register O365 Sharepoint or OneDrive app for Glean[​](#register-o365-sharepoint-or-onedrive-app-for-glean "Direct link to Register O365 Sharepoint or OneDrive app for Glean")

-   You can register your O365 app [here](https://app.glean.com/admin/setup/apps/o365sharepoint/)
-   Glean can enable **user and groups only syncs** by:
    1.  Permissions required for the app would be `User.Read.All` and `GroupMember.Read.All`
    2.  Save these credentials and ignore/skip any validation errors
-   Users and Groups synced from your on-premise Active Directory will be accessed here

### Register a new app for you On-Premise instance[​](#register-a-new-app-for-you-on-premise-instance "Direct link to Register a new app for you On-Premise instance")

1.  Sign into the [Azure portal](https://portal.azure.com/). Select **Azure Active Directory**, then **App registrations → New registration**.
2.  On the **Register an application page**, register an app with the following: | Field | Value | |---|---| | Name | Glean for Sharepoint On-Premise | | Supported account types | Accounts in this organizational directory only (Single tenant) | | Redirect URI | (Leave this field blank) |
3.  Click **Register**. ![](/assets/images/register-app-glean-2ad3d47aa4ff37a88c792c31a99e568a.png)

### Setup Microsoft Entra Application Proxy Connector[​](#setup-microsoft-entra-application-proxy-connector "Direct link to Setup Microsoft Entra Application Proxy Connector")

This sets up secure remote access to your Sharepoint environment without exposing it directly to the internet, leveraging the capabilities and security of [Microsoft Entra Application Proxy](https://learn.microsoft.com/en-us/entra/identity/app-proxy/application-proxy-add-on-premises-application) (formerly known as Azure AD Application Proxy).

#### Step 1: Install and Configure the Entra Application Proxy Connector[​](#step-1-install-and-configure-the-entra-application-proxy-connector "Direct link to Step 1: Install and Configure the Entra Application Proxy Connector")

1.  Download the Connector:
    1.  Sign in to the Microsoft Entra admin center.
    2.  Navigate to **Identity** → **Applications** → **Enterprise applications** → **Private Network connectors**.
    3.  Click Download connector service to get the Application Proxy connector installer. ![](/assets/images/download-application-proxy-a1e94028ac989891f8121625fe554a0d.png)
2.  Install the Connector:
    1.  Execute the downloaded installer on your on-premises server that has network access to the SharePoint site.
    2.  During installation, sign in with your Microsoft Entra global administrator account.
    3.  After installation, the connector will automatically register with Entra, appearing in the Application Proxy section of the Entra admin center.
    4.  Verify Connector Status: Check under Application proxy in the Entra admin center to ensure your connector is listed and its status is Active. ![](/assets/images/proxy-connector-registration-a15d20aa55138fabfe0a50db0e75980f.png)

#### Step 2: Configure the Enterprise Application[​](#step-2-configure-the-enterprise-application "Direct link to Step 2: Configure the Enterprise Application")

App registration should have created an enterprise application

1.  Sign in to the Microsoft Entra admin center.
2.  Navigate to **Identity** → **Applications** → **Enterprise applications**
3.  Search for "Glean for Sharepoint On-Premise" and click on the application
4.  Setup the Application Proxy
    1.  Navigate to **Application proxy** tab
    2.  Internal URL: Enter the URL used within your network to access SharePoint (this should be **Sharepoint On-Premise App URL**).
    3.  External URL: Entra generates an external URL. You can customize this URL to match your organization's domain if you've added a custom domain to Entra.
        -   Note this domain down as it will be used in Glean setup to **Azure Application Domain (Application ID URI domain)**
    4.  Pre Authentication: Passthrough
    5.  Connector Group: Set the connector group to the same group the Entra Application Proxy was added to (should be Default)
    6.  Save the configuration to publish your application ![](/assets/images/application-proxy-setup-14bafef80e25c72f3fa37400df1398fb.png)

#### Step 3: Fill out the Glean Sharepoint On-Premise App settings[​](#step-3-fill-out-the-glean-sharepoint-on-premise-app-settings "Direct link to Step 3: Fill out the Glean Sharepoint On-Premise App settings")

1.  Fill out the matching fields from the Info you gathered for setup.
2.  Make sure to set **Azure Application Domain** with only the domain value (Application Proxy External Url Domain), not the full URL
3.  Make sure to include the full relative path to the site (e.g. *sites/MySiteCollection*)
4.  Make sure the UPN Suffix from the "Gather Setup Info" section (2.4.3) does not include "@" and only includes the user's domain
    1.  If the UPN is *anne@**company-domain.com***, then the UPN Suffix is **company-domain.com**
5.  In the future, if you need to add a new site collection, then:
    1.  Add the service account to the site collection to ensure the Glean app has permissions to crawl it
    2.  Add the site collection name to `siteList`
