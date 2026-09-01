---
url: "https://docs.glean.com/connectors/native/sharepoint/secrets-to-certificate-migration"
canonical: "https://docs.glean.com/connectors/native/sharepoint/secrets-to-certificate-migration"
title: "Switch from secret to certificate authentication"
description: "How to switch your SharePoint connector from client secret authentication to certificate-based authentication after the Azure ACS retirement."
fetched_at: "2026-09-01T13:29:41.189Z"
---
On this page

warning

Microsoft retired Azure ACS REST API client-secret authentication on **April 2, 2026**. SharePoint and OneDrive connector instances that previously used client-secret authentication must switch to certificate-based authentication. Instances still configured with a client secret can no longer update Site Groups, so SharePoint permissions in Glean become stale until you switch.

## Step 1. Open your SharePoint connector in Glean[​](#step-1-open-your-sharepoint-connector-in-glean "Direct link to Step 1. Open your SharePoint connector in Glean")

1.  Sign in to the [Glean admin console](https://app.glean.com/admin/setup/apps).
2.  Navigate to **Admin console** → **Connectors** → **SharePoint** → **Setup**.

## Step 2. Certificate-based authentication[​](#step-2-certificate-based-authentication "Direct link to Step 2. Certificate-based authentication")

1.  Generate a certificate and private key file pair, and upload the certificate to your Azure App registration:

-   Sites.FullControl.All
-   Sites.Selected

If your instance uses **`Sites.FullControl.All`**, complete the steps to **Generate a Certificate and Private Key**, **Upload Certificate to Azure**, and **Fill out keys** in the [Microsoft 365 setup guide](/connectors/native/microsoft365/setup#generate-certificate-and-private-key).

If your instance uses **`Sites.Selected`**, complete these steps to **Generate a Certificate and Private Key**, **Upload Certificate to Azure**, **Fill out keys**, **Grant REST API permissions to individual apps**, **Install PnP PowerShell**, **Provision REST API permissions**, and **Provide the list of all sites to be crawled** in the [Sites.Selected setup guide](/connectors/native/sharepoint/setup-selected-sites#generate-certificate-and-private-key).

3.  Upload your `certificate.crt` file under **Replace Certificate File**.
4.  Upload your `privatekey.key` file under **Replace Private Key File**.
5.  Enter your **Application (client) ID** and **Directory (tenant) ID** from the Azure App registration if they are not already populated.

You can reuse your existing SharePoint app to complete this step. If you have multiple apps, please reuse the same certificate you generated for each app.

## Step 3. Save and validate the connector[​](#step-3-save-and-validate-the-connector "Direct link to Step 3. Save and validate the connector")

1.  Click **Save** to apply the new authentication configuration.
2.  After saving, monitor the connector status to confirm that crawling resumes successfully with certificate-based authentication.
3.  Verify that your SharePoint content continues to appear in Glean search results as expected.

If the connector fails to connect after switching, double-check the following:

-   The `certificate.crt` file has been uploaded to your Azure App registration under **Certificates & secrets**.
-   The certificate and private key files are correctly formatted. See the [Microsoft 365 setup guide](/connectors/native/microsoft365/setup#generate-certificate-and-private-key) for the expected file formats.
-   The Application (client) ID and Directory (tenant) ID match the Azure App registration where the certificate was uploaded.

If issues persist, contact [Glean Support](https://support.glean.com) for assistance.

note

SharePoint and OneDrive share the same underlying Azure App Registration and authentication configuration. Once you switch one connector, the other reflects the updated authentication method as well. Verify both connectors after switching.
