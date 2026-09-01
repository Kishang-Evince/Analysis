---
url: "https://docs.glean.com/connectors/native/shortcut/"
canonical: "https://docs.glean.com/connectors/native/shortcut/"
title: "Shortcut  (Formerly Clubhouse)"
description: "This article provides comprehensive documentation for the Glean Shortcut connector, detailing its features, requirements, and setup instructions for integrating Shortcut with Glean enterprise search."
fetched_at: "2026-09-01T13:29:41.898Z"
---
On this page

The Shortcut connector enables secure, unified search of Shortcut stories and epics from within Glean's enterprise search platform. It is designed to work with **Shortcut (formerly Clubhouse)** to centralize project management knowledge alongside content from all your other applications.

This integration allows users to quickly find relevant project information and a complete view of their work. Most importantly, it enforces user-level permissions from Shortcut at the time of the query, ensuring every user only sees content they are authorized to access. All indexed Shortcut data is securely stored within your own cloud environment, ensuring your organizational data never leaves your infrastructure.

### Features and Limitations[​](#features-and-limitations "Direct link to Features and Limitations")

#### Supported Objects[​](#supported-objects "Direct link to Supported Objects")

The Shortcut connector indexes the following entities:

-   Stories
-   Epics

#### Key Features[​](#key-features "Direct link to Key Features")

-   **Comprehensive Indexing:** Indexes Shortcut stories and epics, including key metadata such as status, type, assignees, and a custom popularity metric.
-   **Native Permissions:** Inherits and strictly enforces user-level access permissions from Shortcut at the time of the query.

#### Limitations[​](#limitations "Direct link to Limitations")

-   **Cloud-Only:** This connector is designed exclusively for native integration with the cloud version of Shortcut. It does not support on-premises or self-hosted deployments.
-   **Entity Scope:** The connector's scope is currently limited to core entities. It indexes stories and epics, but does not support additional entities such as comments, attachments, or workflows.
-   **Custom Field Support:** The connector does not support the indexing of custom objects or advanced field mapping.

### Requirements[​](#requirements "Direct link to Requirements")

To set up the Shortcut connector, you must have the following administrative access and credentials.

-   **Shortcut Workspace:** An active Shortcut (Clubhouse) workspace using the standard cloud-based service.
-   **Glean Access:** Administrative permission to configure connectors within your Glean deployment.
-   **API Token:** A Shortcut API token with workspace-level read access to all relevant stories and epics.
-   **Permissions:** The user account providing the API token must have an admin role or a dedicated integration account with sufficient permissions to access all data intended for indexing.

### How to Set up the Connector[​](#how-to-set-up-the-connector "Direct link to How to Set up the Connector")

The setup process involves obtaining credentials from Shortcut and then configuring the connector in Glean. The process requires a **Shortcut API token** and a **Webhook secret**.

#### Step 1: Obtain the API Token from Shortcut[​](#step-1-obtain-the-api-token-from-shortcut "Direct link to Step 1: Obtain the API Token from Shortcut")

1.  Log in to your Shortcut workspace.
2.  Navigate to profile or organization settings and find the **API Tokens** section.
3.  Generate a new API token, ensuring it has workspace-level read access to stories and epics. For more information, see [Shortcut API documentation](https://help.shortcut.com/hc/en-us/articles/205701199-Shortcut-API-Tokens).

#### Step 2: Set up a Webhook in Shortcut[​](#step-2-set-up-a-webhook-in-shortcut "Direct link to Step 2: Set up a Webhook in Shortcut")

This step is required to generate the Webhook Secret needed for the Glean setup.

1.  Log in as an Administrator in your Shortcut instance.
2.  Go to the **Webhooks** section in your admin settings.
3.  Create a new webhook and configure it with the following:
    -   **Payload URL:** `https://tenant_id-be.glean.com/instance/SHORTCUT/events`
    -   **Secret:** Choose and enter a unique secret. **This is the Webhook Secret you will need for Glean.**
    -   **Scope:** Select **All workspaces** to ensure timely notifications for all changes.
4.  Save the webhook configuration. For more information, see [Setting up Outgoing Webhooks](https://help.shortcut.com/hc/en-us/articles/115005093963-Setting-up-Outgoing-Webhooks).

Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

#### Step 3: Configure the Connector in Glean[​](#step-3-configure-the-connector-in-glean "Direct link to Step 3: Configure the Connector in Glean")

1.  In the Glean Admin Console, navigate to **Connectors** and select **Add Connector**, and select **Shortcut**.
2.  Enter the **API Token** you obtained in Step 1.
3.  Enter the **Webhook Secret** you created in Step 2.
4.  Click **Save**. Glean will automatically validate the credentials and begin the initial crawl.

### Permissions & Security[​](#permissions--security "Direct link to Permissions & Security")

-   **Permission Enforcement:** The connector relies entirely on the permissions defined in Shortcut. Glean does not override these permissions, ensuring that users can only access content for which they are authorized.
-   **Data Storage:** All Shortcut data ingested by Glean is stored securely in your designated cloud environment. No content is stored outside of your infrastructure.
