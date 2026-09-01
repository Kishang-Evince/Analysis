---
url: "https://docs.glean.com/connectors/native/ggroups/setup"
canonical: "https://docs.glean.com/connectors/native/ggroups/setup"
title: "Google Groups setup"
description: "Review the requirements and configure the Google Groups connector with Google Vault, Google Drive, and Glean."
fetched_at: "2026-09-01T13:29:28.999Z"
---
On this page

This page describes how to install and configure the Google Groups connector. Setup takes place in Google Workspace, Google Cloud, Google Vault, and the Glean Admin Console.

To set up the Google Groups connector:

-   Confirm the [requirements](#requirements) and [prerequisites](#prerequisites).
-   Confirm that [Google Drive is connected](#connect-google-drive-to-glean).
-   Configure the [APIs and OAuth scopes](#enable-the-vault-api-and-groups-settings-api).
-   Create and share a [Google Vault Matter](#create-a-vault-matter-instance-and-share-it).
-   [Provide the client information in Glean](#provide-client-information).

## Requirements[​](#requirements "Direct link to Requirements")

To set up and operate the Google Groups connector, ensure that the following requirements are met.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   A Google Workspace edition with Google Vault licensed and enabled.
-   Access to create and manage service accounts in the GCP project where your Glean instance is hosted.
-   A Glean instance with administrator access.
-   The Google Vault API, Google Cloud Storage API, and Groups Settings API enabled as required.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   A Google Cloud service account with Google Apps domain-wide delegation enabled.
-   Preferably, the same service account used for the Google Drive integration.
-   The following OAuth scopes granted to the service account:
    -   `https://www.googleapis.com/auth/ediscovery` for the Vault API.
    -   `https://www.googleapis.com/auth/devstorage.read_only` for Cloud Storage access.
    -   `https://www.googleapis.com/auth/apps.groups.settings` for the Groups Settings API.
-   Google Workspace administrator access to manage OAuth scopes and client delegation.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The service account must have the following Google Vault roles:
    -   Manage Searches
    -   Manage Matters
    -   Manage Exports
-   These roles let the service account create export requests, manage Matter containers, and download exported data for indexing in Glean.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Connect the [Google Drive connector](/connectors/native/gdrive/setup) before setting up Google Groups.
-   Confirm that Google Vault is licensed and enabled for your Workspace domain.
-   Confirm that you have GCP service account credentials with domain-wide delegation.
-   Identify the Directory Admin Email used for the Google Drive setup.

## Configuration and setup instructions[​](#configuration-and-setup-instructions "Direct link to Configuration and setup instructions")

### Authentication and credentials[​](#authentication-and-credentials "Direct link to Authentication and credentials")

1.  In GCP, create or select the service account used for Glean.
2.  In the Google Admin Console, open [Manage OAuth clients](https://admin.google.com/u/1/ac/owl/domainwidedelegation).
3.  Select the client ID used for the Google Drive setup.
4.  Add the following scopes:

[https://www.googleapis.com/auth/ediscovery,https://www.googleapis.com/auth/devstorage.read\_only,https://www.googleapis.com/auth/apps.groups.settings](https://www.googleapis.com/auth/ediscovery,https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/apps.groups.settings)

5.  Confirm that the service account can access the Vault APIs, create and search Matters, and manage exports.

### Setup[​](#setup "Direct link to Setup")

#### Connect to Google Groups[​](#connect-to-google-groups "Direct link to Connect to Google Groups")

Your company must use a Google Workspace plan that includes Google Vault. Google Drive must already be connected to Glean.

#### Connect Google Drive to Glean[​](#connect-google-drive-to-glean "Direct link to Connect Google Drive to Glean")

For Glean to search Google Groups content, Google Drive must be a connected app in Glean. For more information, see [Google Drive setup](/connectors/native/gdrive/setup).

#### Enable the Vault API and Groups Settings API[​](#enable-the-vault-api-and-groups-settings-api "Direct link to Enable the Vault API and Groups Settings API")

As an administrator, enable the APIs needed to export conversations and retrieve group settings:

1.  [Google Vault API](https://console.cloud.google.com/marketplace/product/google/vault.googleapis.com)
2.  [Groups Settings API](https://console.cloud.google.com/marketplace/product/google/groupssettings.googleapis.com)

#### Add API scopes[​](#add-api-scopes "Direct link to Add API scopes")

1.  Sign in as an administrator and open [Manage OAuth clients](https://admin.google.com/u/1/ac/owl/domainwidedelegation).
2.  Select the client ID used for the Google Drive setup.
3.  Select **Edit** and add these scopes:

[https://www.googleapis.com/auth/ediscovery,https://www.googleapis.com/auth/devstorage.read\_only,https://www.googleapis.com/auth/apps.groups.settings](https://www.googleapis.com/auth/ediscovery,https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/apps.groups.settings)

4.  Verify that the client has all three scopes:
    -   `https://www.googleapis.com/auth/ediscovery` lets the client use Google Vault.
    -   `https://www.googleapis.com/auth/devstorage.read_only` lets the client read Google Groups content from generated Vault exports.
    -   `https://www.googleapis.com/auth/apps.groups.settings` lets the client read Google Group settings.

#### Grant Vault roles[​](#grant-vault-roles "Direct link to Grant Vault roles")

1.  Open the [Admin roles page](https://admin.google.com/ac/roles).
2.  Create or modify a role for the Directory Admin Email.
3.  Grant the role these privileges:
    -   Manage Matters
    -   Manage Searches
    -   Manage Exports

#### Create a Vault Matter instance and share it[​](#create-a-vault-matter-instance-and-share-it "Direct link to Create a Vault Matter instance and share it")

1.  Open [Google Vault](https://vault.google.com/) and go to the **Matters** page.
2.  Create a Matter, such as **Glean Matter**.
3.  Copy the Matter ID from the URL.
4.  Share the Matter with the Directory Admin Email used for the Google Drive setup:
    -   Open the Matter page.
    -   Select **Share this matter** near the pencil icon.
    -   Under **Invite people**, add the Directory Admin Email.

#### Provide client information[​](#provide-client-information "Direct link to Provide client information")

1.  In the Google Groups connector setup in Glean, enter the Matter ID in **Google Vault Matter ID**.
2.  Enter the domain of the connected Google Drive instance in **Google Domain**.
3.  Confirm that the domain exactly matches the domain configured for Google Drive. If you have multiple Google Drive instances, use the domain for the instance whose Google Groups conversations you want to index.
4.  Select **Save**.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   The connector indexes messages and metadata such as senders, subjects, timestamps, and permissions.
-   Original system permissions are maintained through group membership and Google Groups sharing settings.
-   Service accounts use tightly scoped permissions, and operations run within the customer's GCP project.
-   Google Vault availability, licensing, and organization-wide export quotas can affect export frequency.
-   Users only see Google Groups conversations they are authorized to access.

## See also[​](#see-also "Direct link to See also")

-   [Google Groups overview](/connectors/native/ggroups/about)
