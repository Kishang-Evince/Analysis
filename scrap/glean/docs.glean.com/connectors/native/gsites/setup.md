---
url: "https://docs.glean.com/connectors/native/gsites/setup"
canonical: "https://docs.glean.com/connectors/native/gsites/setup"
title: "Google Sites setup"
description: "Review the requirements and configure the Google Sites connector with Google Vault, Google Drive, and Glean."
fetched_at: "2026-09-01T13:29:31.563Z"
---
On this page

This page describes how to install and configure the Google Sites connector. Setup takes place in Google Workspace, Google Cloud, Google Vault, and the Glean Admin Console.

To set up the Google Sites connector:

-   Confirm the [requirements](#requirements) and [prerequisites](#prerequisites).
-   Confirm that [Google Drive is connected](#check-prerequisites).
-   Configure the [APIs and OAuth scopes](#enable-apis-and-scopes).
-   Create and share a [Google Vault Matter](#create-and-share-a-matter-in-google-vault).
-   [Connect the source in Glean](#connect-in-glean).

## Requirements[​](#requirements "Direct link to Requirements")

To set up and operate the Google Sites connector, ensure that the following requirements are met.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   A Google Workspace edition that includes a Google Vault license, such as Business Plus, Enterprise, or Education.
-   All sites to index must use New Google Sites and be stored in Google Drive.
-   Access to the GCP project where your Glean instance is hosted.
-   The Google Vault API and Google Cloud Storage API enabled in the GCP project.
-   A connected Google Drive connector.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   A Google Cloud service account with Google Apps domain-wide delegation enabled.
-   The service account used for the Google Drive setup, when applicable.
-   Google Workspace administrator access to manage OAuth scopes and client delegation.
-   A Directory Admin Email account with the required Google Vault roles.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The Directory Admin Email must have these Google Vault privileges:
    -   Manage Matters
    -   Manage Searches
    -   Manage Exports
-   The service account must have these OAuth scopes:
    -   `https://www.googleapis.com/auth/ediscovery` for Google Vault.
    -   `https://www.googleapis.com/auth/devstorage.read_only` for Cloud Storage access.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Connect the [Google Drive connector](/connectors/native/gdrive/setup) before setting up Google Sites.
-   Confirm that Google Vault is licensed and enabled for your Workspace domain.
-   Confirm that the Google Vault API and Google Cloud Storage API are enabled.
-   Identify the Directory Admin Email used for the Google Drive setup.
-   Confirm that the Sites to index use New Google Sites and are stored in Google Drive.

## Preliminary source and system setup[​](#preliminary-source-and-system-setup "Direct link to Preliminary source and system setup")

-   Create or select a GCP service account with domain-wide delegation.
-   Enable the Google Vault API and Google Cloud Storage API in the GCP project.
-   Create or select a Google Vault Matter for the Sites export.
-   Share the Matter with the Directory Admin Email.
-   Include the users and shared drives whose Sites you want to crawl in the Vault export search parameters.

## Configuration and setup instructions[​](#configuration-and-setup-instructions "Direct link to Configuration and setup instructions")

### Authentication and credentials[​](#authentication-and-credentials "Direct link to Authentication and credentials")

1.  In GCP, create or select the service account used for the Google Drive setup.
2.  In the Google Admin Console, open [Manage OAuth clients](https://admin.google.com/u/1/ac/owl/domainwidedelegation).
3.  Select the client ID used for the Google Drive setup.
4.  Add these OAuth scopes:
    -   `https://www.googleapis.com/auth/ediscovery`
    -   `https://www.googleapis.com/auth/devstorage.read_only`
5.  Confirm that the service account can access Google Vault and Cloud Storage exports.

### Setup[​](#setup "Direct link to Setup")

#### Check prerequisites[​](#check-prerequisites "Direct link to Check prerequisites")

Before you begin, complete the [Google Drive connector setup](/connectors/native/gdrive/about). Google Sites relies on the credentials and permissions established during that process.

#### Grant Vault roles to the admin user[​](#grant-vault-roles-to-the-admin-user "Direct link to Grant Vault roles to the admin user")

1.  Open the [Admin roles page](https://admin.google.com/ac/roles) in the Google Admin Console.
2.  Create or modify a role for the Directory Admin Email.
3.  Grant the role these privileges:
    -   Manage Matters
    -   Manage Searches
    -   Manage Exports

#### Enable APIs and scopes[​](#enable-apis-and-scopes "Direct link to Enable APIs and scopes")

1.  In your GCP project, verify that the [Google Vault API](https://console.cloud.google.com/marketplace/product/google/vault.googleapis.com) and Google Cloud Storage API are enabled.
2.  Open [Manage OAuth clients](https://admin.google.com/u/1/ac/owl/domainwidedelegation) in the Google Admin Console.
3.  Select the client ID used for the Google Drive setup.
4.  Add these scopes:
    -   `https://www.googleapis.com/auth/ediscovery` lets the client use Google Vault.
    -   `https://www.googleapis.com/auth/devstorage.read_only` lets the client read content from Vault exports.

#### Create and share a Matter in Google Vault[​](#create-and-share-a-matter-in-google-vault "Direct link to Create and share a Matter in Google Vault")

1.  Open [Google Vault](https://vault.google.com/) and go to the **Matters** page.
2.  Select **Create Matter** and give it a name such as **Glean Matter**.
3.  Share the Matter with the Directory Admin Email:
    -   Open the new Matter.
    -   Select **Share** near the pencil icon.
    -   Under **Invite people**, add the user account used for the Google Drive setup.
4.  Include the users and shared drives whose Sites you want to crawl in the Vault export search parameters.

#### Connect in Glean[​](#connect-in-glean "Direct link to Connect in Glean")

1.  In Glean, go to the **Connectors** section and select **Google Sites**.
2.  Enter the following values:
    -   **Google Vault Matter ID:** The Matter ID from the previous step.
    -   **Google Workspace Domain:** Your organization's Google Workspace domain, such as `glean.com`. This value must match the domain configured for Google Drive.
3.  Select **Save**.

The connector begins indexing Google Sites pages after the configuration is saved.

## See also[​](#see-also "Direct link to See also")

-   [Google Sites overview](/connectors/native/gsites/about)
