---
url: "https://docs.glean.com/connectors/native/pagerduty/"
canonical: "https://docs.glean.com/connectors/native/pagerduty/"
title: "PagerDuty"
description: "Learn how to integrate your PagerDuty connector with Glean."
fetched_at: "2026-09-01T13:29:38.348Z"
---
On this page

This article provides instructions for configuring and using the Glean PagerDuty connector. This integration allows Glean to ingest and index PagerDuty data, helping users search for and reference on-call information and escalation paths directly from Glean's enterprise search.

## Supported Features and Limitations[​](#supported-features-and-limitations "Direct link to Supported Features and Limitations")

The PagerDuty connector is designed to bring core on-call and escalation workflow data into Glean, focusing on supported use cases and documenting its current boundaries.

### Supported Objects[​](#supported-objects "Direct link to Supported Objects")

-   Escalation Policies
-   Schedules
-   Incidents (Requires additional configuration; contact Glean support to enable indexing.)

### Key Features[​](#key-features "Direct link to Key Features")

-   **On-Call Data Indexing:** Indexes key PagerDuty objects, including escalation policies and schedules.
-   **Access Management:** Uses PagerDuty's API to fetch user and team data for access management, ensuring search results respect PagerDuty's access models.
-   **Read-Only Access:** Operates with a Read Only API Access Key, adhering to the principle of least privilege.

-   **Incident Indexing**: Indexes PagerDuty incidents when incident support is enabled for your organization.

### Supported API Endpoints[​](#supported-api-endpoints "Direct link to Supported API Endpoints")

-   `/escalation_policies`: Crawls escalation policy definitions if enabled in the configuration
-   `/schedules`: Crawls schedule configurations if enabled in the configuration
-   `/users`: Fetches user information for access management
-   `/teams`: Retrieves team information for access management
-   `/audit/records`: Obtains audit logs detailing user interactions with PagerDuty entities
-   `/incidents`: Crawls incidents when incident support is enabled for your organization

### Limitations[​](#limitations "Direct link to Limitations")

-   **Deployment**: This connector is limited to PagerDuty cloud accounts via API access and does not support on-premise or self-hosted deployments.
-   **Alerta**: Alerts are not crawled.
-   **Data Access**: The connector does not support write or administrative actions.
-   **Incident Crawl Cap**: Only the latest 10,000 incidents are crawled. Larger historical incident sets are not currently supported, but support for larger volumes is planned in a future enhancement.
-   **Stakeholder User Role**: Users assigned this role cannot view incident reports or linked escalation policies for private teams, even if they are members of those teams. For more information on PagerDuty user role permissions, see [User Role Permissions](https://support.pagerduty.com/main/docs/user-roles#user-role-permissions) and [Advanced Permissions](https://support.pagerduty.com/main/docs/advanced-permissions).

## Requirements[​](#requirements "Direct link to Requirements")

To set up the PagerDuty connector, you must have the following:

-   **PagerDuty Access:** An active PagerDuty subscription with an account owner or administrator role.
-   **Glean Access:** Administrative permissions within the Glean Admin Console.
-   **API Access Key:** A PagerDuty **Read Only API Access Key** generated from the PagerDuty web interface.

## How to Set Up the Connector[​](#how-to-set-up-the-connector "Direct link to How to Set Up the Connector")

Follow these steps to configure the PagerDuty connector within the Glean Admin Console.

### Step 1: Obtain the API Key[​](#step-1-obtain-the-api-key "Direct link to Step 1: Obtain the API Key")

1.  Log in to your PagerDuty account as an administrator.
2.  Create a **Read Only REST API Access Key** in your PagerDuty web app:
    1.  In the web app, navigate to **Integrations** > **Developer Tools** > **API Access Keys**.
    2.  Click **Create New API Key**.
    3.  Enter a **Description** to identify the key (for example, "Glean Connector").
    4.  Select the **Read-only API Key** checkbox.
    5.  Click **Create Key**.

For more information, see [Generate a General Access REST API Key](https://support.pagerduty.com/main/docs/api-access-keys#generate-a-general-access-rest-api-key).

### Step 2: Configure in Glean[​](#step-2-configure-in-glean "Direct link to Step 2: Configure in Glean")

1.  In the Glean Admin Console, navigate to **Connectors** and select **Add Connector**, and select **PagerDuty**.
2.  Provide a **Name** for the connector.
3.  Enter the **API Access Key** you just obtained from PagerDuty into the designated field.
4.  Click **Save**.

The connector will automatically test the connectivity and begin the initial crawl.

## Permissions & Security[​](#permissions--security "Direct link to Permissions & Security")

-   **Permission Propagation:** The connector uses PagerDuty's API to enforce access controls. This ensures that Glean search results are limited to only those objects users have permission to view in PagerDuty.
-   **Least Privilege:** The connector uses a Read Only API Access Key, ensuring it can only ingest data and cannot perform any administrative or write tools.
-   **Data Ingestion:** Only escalation policies, schedules, and associated user, team, and audit metadata are ingested, minimizing exposure of sensitive details.
