---
url: "https://docs.glean.com/connectors/native/sigma/connector"
canonical: "https://docs.glean.com/connectors/native/sigma/connector"
title: "Sigma search integration"
description: "Set up the Sigma connector to index workbooks, pages, and elements into Glean search."
fetched_at: "2026-09-01T13:29:42.475Z"
---
On this page

The Sigma search integration indexes your Sigma workbooks, pages, and elements into Glean so users can find dashboards and charts through search. Results respect Sigma permissions and link directly back to Sigma.

info

Want natural-language data questions too? After setting up the connector, [enable Sigma in Assistant](/connectors/native/sigma/assistant) to let users ask natural-language questions about Sigma data.

## What the connector indexes[​](#what-the-connector-indexes "Direct link to What the connector indexes")

The Sigma connector indexes the following content types:

-   **Workbooks**
-   **Pages**
-   **Elements** such as charts, tables, text blocks, and controls
-   **Workspaces**

## Requirements[​](#requirements "Direct link to Requirements")

To set up the Sigma connector, you need:

-   A **Sigma admin** account
-   Access to the **Glean admin console** to add the connector

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Required configuration values[​](#required-configuration-values "Direct link to Required configuration values")

| Field in Glean | What to enter |
| --- | --- |
| **Client ID** | The Sigma API client ID |
| **Client Secret** | The Sigma API client secret |
| **API Base URL** | The API base URL shown in Sigma Admin > Developer Access |
| **Organization Name** | The organization name from your Sigma URL |

### Step 1: Generate API credentials in Sigma[​](#step-1-generate-api-credentials-in-sigma "Direct link to Step 1: Generate API credentials in Sigma")

1.  Sign in to your Sigma instance as an admin at `https://app.sigmacomputing.com/`.
    
2.  Enter your **company-login-url** on the Sigma login page (if prompted). This can be found in the URL after the domain, e.g., `https://app.sigmacomputing.com/<company-login-url>/...`.
    
3.  Click your profile icon in the top-right corner and click **Administration**.
    
4.  From the left sidebar, select **Developer Access**.
    
5.  Click **Create new** to generate a new client credential pair.
    
6.  Under **Select scopes**, select **REST API**.
    
7.  Enter a descriptive name for the credential, for example, `Glean Integration`.
    
8.  Select an **Owner** for the credential. The owner must be a user with admin permissions.
    
9.  Click **Create**.
    
10.  From the **Access Credentials** window, copy the **Client ID** and **Secret**, then click **Close**.
     
     note
     
     The **Secret** is only displayed once. Ensure you copy and store it securely before closing the window.
     

### Step 2: Copy your API base URL[​](#step-2-copy-your-api-base-url "Direct link to Step 2: Copy your API base URL")

1.  In the **Developer Access** section, locate the API base URL.
2.  Copy the **API base URL**.

### Step 3: Identify your organization name[​](#step-3-identify-your-organization-name "Direct link to Step 3: Identify your organization name")

1.  In your Sigma browser URL, locate and copy the organization name immediately following the domain. For example, in `https://app.sigmacomputing.com/<your-org-name>/...`, `<your-org-name>` is your organization name.

### Step 4: Configure in Glean[​](#step-4-configure-in-glean "Direct link to Step 4: Configure in Glean")

1.  In Glean, go to **Admin console** > **Connectors** > **Add connector** and select **Sigma**.
2.  Enter a name for your Sigma connector.
3.  Enter the following details:
    -   **Client ID**: The Client ID generated in [Step 1](#step-1-generate-api-credentials-in-sigma).
    -   **Client Secret**: The Secret generated in [Step 1](#step-1-generate-api-credentials-in-sigma).
    -   **API Base URL**: The URL copied in [Step 2](#step-2-copy-your-api-base-url).
    -   **Organization Name**: The name identified in [Step 3](#step-3-identify-your-organization-name).
4.  Click **Save**.

After saving, the connector begins indexing.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

The connector respects Sigma permissions in Glean search results.

Sigma uses grants to determine access in Glean. A grant can apply to either a user or a team.

In the current implementation:

-   Workspace results use grants defined on the workspace
-   Workbook results use grants defined on the workbook
-   Page and element results use grants defined on the parent workbook

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

The connector uses **full crawls** to keep content and permissions up to date. Sigma does not support incremental crawls or webhook-based updates for this integration.

Content and permissions are synced multiple times each day after initial indexing.

## Limitations[​](#limitations "Direct link to Limitations")

-   Creating or editing Sigma content from Glean is not supported
-   Natural-language querying of Sigma data is not part of the connector - see [Sigma in Assistant](/connectors/native/sigma/assistant) for natural-language data access
-   Dataset crawling is not included in this release
-   Webhook-based freshness updates are not available

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### OAuth or credential validation fails

Confirm that:

-   The credential was created in **Administration > Developer Access** in Sigma
-   The **REST API** scope is enabled
-   You copied the correct **Client ID** and **Client Secret**
-   The **API Base URL** in Glean matches the one shown in Sigma
-   The **Organization Name** is entered exactly as it appears in your Sigma URL

### Users cannot find expected Sigma content

Check that:

-   The content exists as a **workbook**, **page**, or **element** supported by the connector
-   The user has access to that content in Sigma
-   The connector has had time to complete a full crawl

### Recent changes are not showing yet

The Sigma connector relies on **full crawls** rather than timestamp-based incremental updates or webhooks. Recent updates may not appear until the next crawl completes.
