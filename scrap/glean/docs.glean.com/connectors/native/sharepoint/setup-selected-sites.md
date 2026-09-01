---
url: "https://docs.glean.com/connectors/native/sharepoint/setup-selected-sites"
canonical: "https://docs.glean.com/connectors/native/sharepoint/setup-selected-sites"
title: "Setup (Selected sites)"
description: "Learn about configuring and managing the SharePoint connector in Glean with selected sites."
fetched_at: "2026-09-01T13:29:41.539Z"
---
On this page

Prerequisite

Set up the [Microsoft 365 parent connector](/connectors/native/microsoft365/) before configuring SharePoint with `Sites.Selected`. The `Sites.Selected` flow uses the app created during Microsoft 365 suite setup.

Contact your Deployment Engineer first

Before you begin the selected-sites setup, contact your Glean Deployment Engineer. Your deployment configuration must be updated before `Sites.Selected` permissions will work. Starting setup without this step may result in errors.

## Sites.Selected compared to Sites.FullControl.All[​](#sitesselected-compared-to-sitesfullcontrolall "Direct link to Sites.Selected compared to Sites.FullControl.All")

Before choosing `Sites.Selected`, consider that Glean respects the permissions set in your source applications — users only see content in Glean that they can access in SharePoint.

Glean's [Sensitive findings](/administration/protect/sensitive-findings/about) dashboard helps you manage and protect sensitive data across all connected applications. Use Sensitive findings to detect broadly shared, externally exposed, or overshared sensitive data and maintain compliance with data protection regulations.

The key difference between the two options: `Sites.FullControl.All` provides broad, automatic access to new sites and delivers better search ranking, while `Sites.Selected` offers granular control at the cost of significant operational effort and major feature limitations.

### Sites.FullControl.All[​](#sitesfullcontrolall "Direct link to Sites.FullControl.All")

-   Grants full control over all SharePoint sites in the tenant with no need to manually add sites.
-   Requires one-time setup — the admin grants permissions once, and Glean includes new sites automatically.
-   Collects activity data across all sites to improve search ranking and personalization.
-   Supports webhook updates, so Glean refreshes content and permissions hourly.
-   Allows admins to use greenlists and redlists to control which sites Glean crawls.
-   Reduces management overhead and produces fewer errors.

### Sites.Selected[​](#sitesselected "Direct link to Sites.Selected")

-   Limits access to specific SharePoint sites that the admin explicitly grants.
-   Requires manual configuration for each site through PowerShell — the admin must notify Glean of any changes.
-   Does not automatically include new sites — admins must update the list and inform Glean for each addition.
-   Prevents Glean from collecting activity data (document views, modifications, shares), which degrades search ranking and personalization.
-   Increases management overhead and the risk of errors or mismatches.
-   Has led some customers to report user confusion and a degraded search experience due to missing content.

### Comparison[​](#comparison "Direct link to Comparison")

| Feature | `Sites.FullControl.All` | `Sites.Selected` |
| --- | --- | --- |
| Scope | All sites | Only specified sites |
| Setup | One-time | Manual per site |
| Automatic site detection | Yes | No |
| Activity data for ranking | Yes | No |
| Management overhead | Low | High |
| Security risk (if not mitigated) | Higher | Lower |
| Supported by Glean | Yes | Yes |

### Security mitigations for FullControl[​](#security-mitigations-for-fullcontrol "Direct link to Security mitigations for FullControl")

-   Use greenlists/redlists to restrict crawl scope.
-   Apply IP restrictions to limit API calls to Glean infrastructure.
-   Monitor and audit all access.
-   Store credentials securely and rotate keys regularly.

## Connect to SharePoint[​](#connect-to-sharepoint "Direct link to Connect to SharePoint")

These instructions leverage a limited Graph API permission scope via Sites.Selected, to explicitly grant access only to a particular SharePoint site collection.

### Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

-   The user setting up this connector must be the [**Global Admin**](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles).

### Register a new app[​](#register-a-new-app "Direct link to Register a new app")

1.  Sign into the [Azure portal](https://portal.azure.com/). Select **Microsoft Entra ID**, then **Manage → App registrations → New registration**.
    
2.  On the **Register an application page**, register an app with the following:
    
    | Field | Value |
    | --- | --- |
    | Name | Glean |
    | Supported account types | Accounts in this organizational directory only (Single tenant) |
    | Redirect URI | (Leave this field blank) |
    
3.  Click **Register**. ![](/assets/images/onedrive-sharepoint-register-app-glean-d00bd0096090bba4ff16e0f935f36b1e.svg)
    

### Configure permissions[​](#configure-permissions "Direct link to Configure permissions")

1.  On the left side navigation on the overview page, click on **Manage → API Permissions**.
2.  Click **Add a permission** and select **Microsoft Graph**. Choose **Application permissions** and add the following:
    -   User.Read.All
    -   GroupMember.Read.All
    -   Sites.Selected
    -   Reports.Read.All
    -   Member.Read.Hidden
3.  Click **Add a permission** and select **SharePoint**. Then choose **Application permissions** and add the following:

-   Sites.Selected ![](/assets/images/azure-2-configure-permissions-1ab10e1b262889cca903fc0aba835ecf.png)

### Grant admin consent[​](#grant-admin-consent "Direct link to Grant admin consent")

1.  Ensure you are signed into Azure as a Global, Application or Cloud Application Administrator.
2.  Use the search box to navigate to **Enterprise applications**. Select the **Glean** app you just created from the list of applications.
3.  Click on **Permissions** under **Security**. Review the permissions shown, and then click **Grant admin consent**. ![](/assets/images/onedrive-sharepoint-grant-admin-consent-glean-16df95d9d2b43415100c0eae97a31dac.svg) By this step, you should have the following permissions provisioned on the **API Permissions** page ![](/assets/images/sharepoint-selected-api-permissions-bb44e1243b6fbb0c2ce9bde31af891d0.png)

### Install openssl[​](#install-openssl "Direct link to Install openssl")

Openssl is installed by default on OS X terminals. If you are using Windows, follow these instructions to download openssl to use with PowerShell.

1.  Download the relevant openssl installation manager for your version of Windows. Openssl offers a list of [third-party binary distributions](https://wiki.openssl.org/index.php/Binaries), with [Shining Light Productions](https://slproweb.com/products/Win32OpenSSL.html) as an option.
    
2.  During the installation process, select the option to copy the OpenSSL binaries into the `/bin` directory.
    
3.  Open a new PowerShell instance. In PowerShell, you can run the following command to make use of openssl binaries.
    

`$env:Path += ";C:\Program Files\OpenSSL-Win64\bin"`

### Generate Certificate and Private Key[​](#generate-certificate-and-private-key "Direct link to Generate Certificate and Private Key")

1.  Run the following commands line by line. Microsoft SDK requires the certificate to be verified with a private key in *PKCS#8* syntax.

`openssl genrsa -out tempprivatekey.key 2048` `openssl pkcs8 -topk8 -inform PEM -outform PEM -in tempprivatekey.key -out privatekey.key -nocrypt` `openssl req -new -key privatekey.key -out request.csr` `openssl x509 -req -days 365 -in request.csr -signkey privatekey.key -out certificate.crt`

2.  Verify that both `certificate.crt` and `privatekey.key` exist. Open each file, and ensure the files conform to the following formats:
    
    -   The certificate file must start with `-----BEGIN CERTIFICATE-----` and end with `-----END CERTIFICATE-----`
    -   The private key should begin with `-----BEGIN PRIVATE KEY-----` and end with `-----END PRIVATE KEY-----`. It must not include `RSA` in the headers, nor be encrypted.
3.  Upload the `certificate.crt` in Glean under **Client Certificate**.
    
4.  Upload the `privatekey.key` in Glean under **Private Key**.
    

### Upload Certificate to Azure[​](#upload-certificate-to-azure "Direct link to Upload Certificate to Azure")

1.  Navigate back to **Microsoft Entra ID → Manage → App registrations** and click on the app you created earlier.
2.  Click **Manage → Certificates & secrets**.
3.  Click the **Certificates** Section and **Upload certificate**.
4.  Upload the `certificate.crt` file that you generated. After uploading, the application must now list the new certificate.

### Fill out keys[​](#fill-out-keys "Direct link to Fill out keys")

1.  Scroll to the top of the left sidebar and click **Overview**.
2.  Copy the following content from the center Essentials panel and enter it in Glean:

-   Application (client) ID
-   Directory (tenant) ID

3.  Enter your SharePoint domain in Glean. Your SharePoint domain should end with "sharepoint.com".
4.  Glean recommends five additional applications with the same permission settings as the initial app created to maximize crawl speeds. Repeat the setup steps from "Register a new app" until this step, saving the client ID and uploading the certificate to Azure in the process. Paste the client ID into the Glean web app, and upload the certificate and private key. ![](/assets/images/onedrive-sharepoint-upload-keys-glean-ed28925e8c856a1d59af8cf876a3f04f.svg)
5.  Ensure you complete the PnP PowerShell site permission grant steps below before clicking **Save** in Glean.

### Grant REST API permissions to individual apps[​](#grant-rest-api-permissions-to-individual-apps "Direct link to Grant REST API permissions to individual apps")

Please complete these steps for each application created. This will require using [PnP PowerShell](https://pnp.github.io/powershell/). If you have already installed PnP PowerShell, you can skip the installation step.

#### Install PnP PowerShell[​](#install-pnp-powershell "Direct link to Install PnP PowerShell")

1.  You will need to use Windows PowerShell 7 to use PnP PowerShell. PowerShell 7 is a side-by-side version with PowerShell 5.1 ([reference](https://learn.microsoft.com/en-us/shows/it-ops-talk/how-to-install-powershell-7)). If you have not installed PowerShell 7, in your normal PowerShell, follow the installation instructions [here](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4&WT.mc_id=THOMASMAURER-blog-thmaure#install-powershell-using-winget-recommended).
2.  Run the following commands in PowerShell 7 to install PnP PowerShell. `Install-Module -Name PnP.PowerShell` `Import-Module PnP.PowerShell`

#### Provision REST API permissions[​](#provision-rest-api-permissions "Direct link to Provision REST API permissions")

In this section, you will grant the site collection permissions to the app created in Step 1 using PowerShell. You will first connect to PowerShell using an app that has sufficient permissions to grant site collection permissions to other apps. You could use the same app you just created in step 1 by granting it with extra permissions which you can later revoke after the setup. Within that session, you will then grant site collection permissions to the app created in Step 1.

1.  Upload the same certificate (`certificate.crt`) that you generated previously to **all applications**. See the ***Upload Certificate to Azure*** step. Ensure that you have SharePoint PowerShell installed. If any of the following commands do not work, you may need to [install the module](https://pnp.github.io/powershell/articles/installation.html) first before running the commands again within PowerShell.
    
2.  To allow a connection in PowerShell with the individual application, navigate to **Authentication**, click **Settings** and enable **Allow public client flows** section. This is temporary for step 3; you may toggle this back to **Disabled** after provisioning the service principal permission. Failure to do this may result in the following error message: The request body must contain the following parameter: 'client\_assertion' or 'client\_secret' ([documentation](https://learn.microsoft.com/en-us/answers/questions/1377450/how-to-fix-the-issue-im-getting-this-error-a-confi)). ![](/assets/images/public-client-flows-f615b76153def7aa89d4f83dca58dfb6.png)
    
3.  Connect to PnPOnline with the app that has sufficient permissions to grant site collection permissions to other apps.
    
    This can be any app (ClientId) that has the below-mentioned permission scope applied to it.The client ID must have the **Sites.FullControl.All (delegated permissions)** permission scope applied to it. The **Sites.FullControl.All (delegated permissions)** permission is only required when granting the **Full Control** permission scope to the site collection in the next step.
    
    You can choose either option and see which one works: `Connect-PnPOnline -Url $SITE_COLLECTION_URL -DeviceLogin -ClientId <clientId> -Tenant <tenantId>` `Connect-PnPOnline -Url $SITE_COLLECTION_URL -Interactive -ClientId <clientId>` (See section *Interactive Connection Troubleshoot* if not working)
    
4.  Grant **Full Control** for the site collection to the app created in step 1:
    
    This App ID must be the same app ID you entered in step 1.
    
    `Grant-PnpAzureADAppSitePermission -AppId $CLIENT_ID -Site $SITE_COLLECTION_URL -Permissions FullControl`
5.  Now, click **Save** in Glean to save the uploaded certificate files and configuration. If all permissions have been provisioned appropriately, Glean should show a green dialogue indicating changes saved.
    

### Provide the list of all sites to be crawled[​](#provide-the-list-of-all-sites-to-be-crawled "Direct link to Provide the list of all sites to be crawled")

Glean cannot automatically determine the sites with Sites.Selected permissions applied ahead of time. This requires configuration via the Manage Data tab.

1.  Navigate to the *Manage Data* → *Inclusion Rules* tab. Provide the list of urls (can be just the subsites of the site collections with permissions) for the explicit sites to be crawled. If a site collection and all associated subsites should be crawled, provide all the urls explicitly in the greenlist.

### Interactive Connection Troubleshoot[​](#interactive-connection-troubleshoot "Direct link to Interactive Connection Troubleshoot")

1.  On the azure portal, find the app you just created. In the menu, look for **Manage** and click on **Authentication** ![](/assets/images/onedrive-sharepoint-interactive-1-cff89029d2c85879aee2037e23d7b08b.png)
2.  Under **Platform configurations** on the page, click on **Add a platform** ![](/assets/images/onedrive-sharepoint-interactive-2-ae93e8775a482dede727b60bcea22f42.png)
3.  In the panel that shows up on the right, click on **Mobile and desktop applications** ![](/assets/images/onedrive-sharepoint-interactive-3-d6282c39f778220b815290b880d7fa64.png)
4.  Leave the three boxes shown in the panel on the right unchecked and in the Custom **Redirect URIs** field, enter: `http://localhost`. Note that this should really be **http** and not **https**
5.  Click on Configure at the bottom ![](/assets/images/onedrive-sharepoint-interactive-4-eb9f91684433e7e3ee2cfc1449a5410f.png)
6.  Retry the command `Connect-PnPOnline -Url $SITE_COLLECTION_URL -Interactive -ClientId <clientId>`
