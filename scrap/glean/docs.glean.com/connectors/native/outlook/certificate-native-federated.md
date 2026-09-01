---
url: "https://docs.glean.com/connectors/native/outlook/certificate-native-federated"
canonical: "https://docs.glean.com/connectors/native/outlook/certificate-native-federated"
title: "Set up certificates for indexing and real-time access"
description: "Learn how to perform the complete certificate-based setup for the Outlook connector to enable both indexing and real-time access."
fetched_at: "2026-09-01T13:29:37.500Z"
---
On this page

### Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

The user setting up this connector must be the [**Global Admin**](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles).

### Register a new app[​](#register-a-new-app "Direct link to Register a new app")

1.  Sign into the [Azure portal](https://portal.azure.com/). Select **Microsoft Entra ID**, then **Manage → App registrations → New registration**.
    
2.  On the **Register an application** page, register an app with the following:
    
    | Field | Value |
    | --- | --- |
    | Name | `Glean for Outlook Domain-Delegated` |
    | Supported account types | Accounts in this organizational directory only (Single tenant) |
    | Redirect URI | (Leave this field blank) |
    
3.  Click **Register**.
    

### Configure permissions[​](#configure-permissions "Direct link to Configure permissions")

1.  In the left sidebar of the app **Overview** page, click on **Manage → API Permissions**.
    
2.  Under **Add a permission → Microsoft Graph → Application permissions**, add the following permissions:
    
    -   `Mail.Read`
    -   `Calendars.Read`
3.  To allow Glean to index Outlook emails, add the following permissions:
    
    -   `GroupMember.Read.All`
    -   `User.Read.All`

### Grant admin consent[​](#grant-admin-consent "Direct link to Grant admin consent")

1.  Ensure you are signed into Azure as a Global, Application or Cloud Application Administrator.
2.  Use the search box to navigate to **Enterprise applications**. Select the **Glean** app you just created from the list of applications.
3.  Click on **Security → Permissions**. Review the permissions shown, and then click **Grant admin consent**.

### Install openssl[​](#install-openssl "Direct link to Install openssl")

Openssl is installed by default on OS X terminals. If you are using Windows, follow these instructions to download openssl for use with PowerShell.

1.  Download the relevant openssl installation manager for your version of Windows. Openssl offers a list of [third-party binary distributions](https://wiki.openssl.org/index.php/Binaries), with [Shining Light Productions](https://slproweb.com/products/Win32OpenSSL.html) as an option.
    
2.  During the installation process, select the option to copy the OpenSSL binaries into the /bin directory.
    
3.  Open a new PowerShell instance. In PowerShell, you can run the following command to make use of openssl binaries.
    
    `$env:Path += ";C:\\Program Files\\OpenSSL-Win64\\bin"`
    

### Generate a certificate and private key[​](#generate-a-certificate-and-private-key "Direct link to Generate a certificate and private key")

1.  Run the following command line by line. Microsoft SDK requires the certificate to be verified with a private key in PKCS#8 syntax.
    
    -   `openssl genrsa -out tempprivatekey.key 2048`
    -   `openssl pkcs8 -topk8 -inform PEM -outform PEM -in tempprivatekey.key -out privatekey.key -nocrypt`
    -   `openssl req -new -key privatekey.key -out request.csr`
    -   `openssl x509 -req -days 365 -in request.csr -signkey privatekey.key -out certificate.crt`
2.  Verify that both `certificate.crt` and `privatekey.key` exist. Open each file, and ensure the files conform to the following formats:
    
    -   The certificate file should start with `-----BEGIN CERTIFICATE-----` and end with `-----END CERTIFICATE-----`
    -   The private key should begin with `-----BEGIN PRIVATE KEY-----` and end with `-----END PRIVATE KEY-----`. It should not include `RSA` in the headers, nor be encrypted.
3.  Upload the `certificate.crt` in Glean under **Client Certificate**.
    
4.  Upload the `privateKey.key` in Glean under **Private Key**.
    

### Upload the certificate to Azure[​](#upload-the-certificate-to-azure "Direct link to Upload the certificate to Azure")

1.  Navigate back to **Microsoft Entra ID → Manage → App registrations** and click on the app you created earlier. Then click on **Manage → Certificates & secrets** in the left sidebar.
2.  Click the **Certificates** Section and **Upload certificate**.
3.  Upload the `certificate.crt` file that you just generated. After uploading, the application should now list the new certificate.

### Upload keys[​](#upload-keys "Direct link to Upload keys")

1.  Scroll to the top of the left sidebar and click **Overview**.
    
2.  Copy the following content from the center Essentials panel and enter it in Glean:
    
    -   Application (client) ID
    -   Directory (tenant) ID

### Additional steps[​](#additional-steps "Direct link to Additional steps")

1.  Fill out the email used for setting up the application, which will only be used to validate the setup. By default, this email may end with onmicrosoft.com, as Microsoft generates a default domain of onmicrosoft.com. Any user email with Outlook enabled will work to validate the configuration.

### Manage users (optional)[​](#manage-users-optional "Direct link to Manage users (optional)")

1.  To limit who can connect to Outlook, use the search box to navigate to **Enterprise Applications**.
2.  Select the **Glean for Outlook Domain-Delegated** app you just created, then in the left navigation click on **Properties** under **Manage**.
3.  Toggle **User assignment required?** to **Yes**.
4.  Go to **Users and groups** in the left navigation and add whichever users and groups you’d like to access Outlook.
