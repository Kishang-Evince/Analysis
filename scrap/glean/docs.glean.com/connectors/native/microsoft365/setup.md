---
url: "https://docs.glean.com/connectors/native/microsoft365/setup"
canonical: "https://docs.glean.com/connectors/native/microsoft365/setup"
title: "Microsoft 365 setup"
description: "Register the Azure app, configure permissions, and set up certificate authentication for the Microsoft 365 suite connector."
fetched_at: "2026-09-01T13:29:34.870Z"
---
On this page

You're reading the **previous setup**[Connecting Microsoft 365 for the first time? →](/connectors/native/microsoft365/new-setup)

Which setup is this?

These instructions apply to existing Glean deployments that use the previous Microsoft 365 setup flow. The setup path depends on your deployment's unified setup eligibility, not on when Microsoft 365 was connected. Connectors configured this way keep working, and there is no migration to run. If you are on a new Glean deployment, see [Choose your setup](/connectors/native/microsoft365/choose-your-setup).

This section covers setup for the Microsoft 365 parent connector. Complete this before configuring SharePoint or OneDrive.

## Request all suite permissions upfront[​](#request-all-suite-permissions-upfront "Direct link to Request all suite permissions upfront")

One Glean application in Microsoft Entra ID serves the whole Microsoft 365 suite. The parent connector needs only identity permissions. The SharePoint and OneDrive child connectors layer their content permissions onto **the same app**. Rather than discovering these scopes one connector at a time and raising a separate IT ticket for each, gather the complete set from the table below and submit it as a single request, finalized with one admin-consent step.

Every scope is an **application** permission. Use the **Required by** column to scope your request to the connectors you'll actually run, and the **API** column to grant each one in the right place. (Outlook and Teams are separate app registrations with their own permissions. See the [Outlook](/connectors/native/outlook/about) and [Teams](/connectors/native/teams/about) pages.)

Toggle the child connectors you plan to configure so your security team can approve all scopes in a single request.

Scope

This setup flow currently applies to **SharePoint** and **OneDrive** only. Outlook and Teams are not part of this setup and continue to be configured separately.

**Tell us what you need, and we’ll build the request.**

The baseline permissions are always included. Select any extras below and the permission set updates instantly. Then copy it to hand to your IT or security team, so every scope is requested in one pass.

Microsoft 365 parent connector (identity)Always includedReads tenant users, group membership, and usage reports. Required for all child connectors.SharePoint and/or OneDrive child connectorsRequired to index SharePoint sites and OneDrive content. Sites.FullControl.All is needed on both Graph and SharePoint REST to read permission hierarchies. Files.ReadWrite.All is required to create webhook subscriptions (no files are written).Purview sensitivity labelsRequired only if you enable hiding content with Microsoft Purview sensitivity labels. Off by default.OneNote page indexingRequired for OneNote page-body content indexing (beta). Each user must individually connect their M365 account in Glean. Handled separately during OneNote setup.

Permissions to request from ITCopy request

Microsoft Graph API Application

-   `User.Read.All`Enumerates tenant users to map Microsoft 365 identities to Glean and enforce document-level permissions.
-   `GroupMember.Read.All`Resolves group membership so group-based permissions are applied correctly.
-   `Member.Read.Hidden`Resolves hidden-visibility group membership, used when confidential groups share content.
-   `Reports.Read.All`Reads Microsoft 365 usage reports across your tenant.

## Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

The user setting up this connector must be a [Global Administrator](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles).

## Register a new app[​](#register-a-new-app "Direct link to Register a new app")

1.  Sign in to the [Azure portal](https://portal.azure.com/).
    
2.  Select **Microsoft Entra ID** → **Manage** → **App registrations** → **New registration**.
    
3.  On the **Register an application** page, register an app with the following:
    
    | Field | Value |
    | --- | --- |
    | Name | `Glean` |
    | Supported account types | Accounts in this organizational directory only (Single tenant) |
    | Redirect URI | Leave this field blank |
    
4.  Select **Register**.
    

## Configure permissions[​](#configure-permissions "Direct link to Configure permissions")

1.  On the overview page, select **Manage** → **API Permissions**.
2.  Select **Add a permission**, then choose **Microsoft Graph**.
3.  Choose **Application permissions** and add the following:
    -   `User.Read.All`
    -   `GroupMember.Read.All`
    -   `Reports.Read.All`
    -   `Member.Read.Hidden`

note

These four identity permissions cover the parent connector. SharePoint and OneDrive add content permissions to this same app — see [Request all suite permissions upfront](#request-all-suite-permissions-upfront) for the complete list, and add them all now if you already know you'll configure those child connectors.

## Grant admin consent[​](#grant-admin-consent "Direct link to Grant admin consent")

1.  Ensure you are signed in to Azure as a Global, Application, or Cloud Application Administrator.
2.  Use the search box to navigate to **Enterprise applications**.
3.  Select the **Glean** app you created.
4.  Select **Permissions** under **Security**.
5.  Review the permissions shown, then select **Grant admin consent**.

## Set up certificate authentication[​](#set-up-certificate-authentication "Direct link to Set up certificate authentication")

Glean uses app-only credentials to authenticate to Microsoft Graph and SharePoint APIs for Microsoft 365 connectors.

For SharePoint and OneDrive, use certificate-based authentication. The steps below show how to generate a certificate and private key with OpenSSL. Before uploading the files, make sure the private key is PEM-encoded PKCS#8, unencrypted, and uses `BEGIN PRIVATE KEY` / `END PRIVATE KEY` headers.

### Generate with OpenSSL[​](#generate-with-openssl "Direct link to Generate with OpenSSL")

#### Install OpenSSL[​](#install-openssl "Direct link to Install OpenSSL")

macOS includes OpenSSL by default. On Windows, set up OpenSSL for PowerShell:

1.  Download the relevant OpenSSL installation manager for your version of Windows. OpenSSL offers a list of [third-party binary distributions](https://wiki.openssl.org/index.php/Binaries).
2.  During the installation process, select the option to copy the OpenSSL binaries into the `/bin` directory.
3.  Open a new PowerShell instance and run the following command to make OpenSSL binaries available:

```
$env:Path += ";C:\\Program Files\\OpenSSL-Win64\\bin"
```

#### Generate certificate and private key[​](#generate-certificate-and-private-key "Direct link to Generate certificate and private key")

Run the following commands line by line. Microsoft SDK requires the certificate to be verified with a private key in PKCS#8 syntax.

```
openssl genrsa -out tempprivatekey.key 2048openssl pkcs8 -topk8 -inform PEM -outform PEM -in tempprivatekey.key -out privatekey.key -nocryptopenssl req -new -key privatekey.key -out request.csropenssl x509 -req -days 365 -in request.csr -signkey privatekey.key -out certificate.crt
```

Verify that both `certificate.crt` and `privatekey.key` exist. Open each file and confirm the formats:

-   The certificate file should start with `BEGIN CERTIFICATE` and end with `END CERTIFICATE`.
-   The private key should begin with `BEGIN PRIVATE KEY` and end with `END PRIVATE KEY`. It should not include `RSA` in the headers, nor be encrypted.

### Upload certificate to Azure[​](#upload-certificate-to-azure "Direct link to Upload certificate to Azure")

1.  Navigate back to **Microsoft Entra ID** → **Manage** → **App registrations** and select the app you created.
2.  Select **Manage** → **Certificates & secrets**.
3.  Select the **Certificates** tab and then **Upload certificate**.
4.  Upload the `certificate.crt` file you generated.

## Fill out keys in Glean[​](#fill-out-keys-in-glean "Direct link to Fill out keys in Glean")

1.  In Azure, select **Overview**.
2.  Copy the following values from the Essentials panel and enter them in Glean:
    -   Application (client) ID
    -   Directory (tenant) ID
3.  Upload `certificate.crt` in Glean under **Client Certificate**.
4.  Upload `privatekey.key` in Glean under **Private Key**.
5.  Select your **tenant size** in Glean.
6.  Select **Save** to create the Microsoft 365 suite.

Additional apps for faster indexing

If your tenant size is greater than 1,000, add one or more additional applications (Glean recommends 1–10) to improve full crawl speed. Use the same permission settings as the initial app.

For each additional app, repeat the steps from **Register a new app** through **Upload certificate to Azure**, then paste the additional **Application (client) ID** into Glean. You only need to upload the certificate once in Glean.

## Next steps[​](#next-steps "Direct link to Next steps")

After saving the Microsoft 365 suite, continue setting up the child connectors. They inherit the parent credentials and only require child-specific configuration.

-   [SharePoint setup](/connectors/native/sharepoint/choose-your-setup)
-   [OneDrive setup](/connectors/native/onedrive/choose-your-setup)
-   [Real-time access for OneDrive](/connectors/native/onedrive/real-time-access)
-   [Real-time access for SharePoint](/connectors/native/sharepoint/real-time-access)

## See also[​](#see-also "Direct link to See also")

-   [Choose your Microsoft 365 setup](/connectors/native/microsoft365/choose-your-setup) shows which setup is yours and how the suite fits together.
-   [Microsoft 365 overview](/connectors/native/microsoft365/about) explains how the suite works and which child connectors it covers.
