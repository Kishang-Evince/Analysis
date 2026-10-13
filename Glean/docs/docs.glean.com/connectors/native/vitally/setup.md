---
url: "https://docs.glean.com/connectors/native/vitally/setup"
canonical: "https://docs.glean.com/connectors/native/vitally/setup"
title: "Vitally setup"
description: "Configure the Glean Vitally connector with a workspace-level Secret Token and API base URL."
fetched_at: "2026-10-13T08:50:22.710Z"
---
On this page

Connect a Vitally workspace to Glean with a workspace-level Secret Token and the regional Representational State Transfer (REST) API base URL.

## Requirements[​](#requirements "Direct link to Requirements")

Before you begin, make sure you have:

-   Access to **Settings** in Vitally
-   Permission to enable the **Vitally REST API** integration and create a workspace-level **Secret Token**
-   A Glean **Admin** account that can add and configure connectors
-   Your Vitally REST API base URL

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Create a secret token in Vitally[​](#create-a-secret-token-in-vitally "Direct link to Create a secret token in Vitally")

1.  In Vitally, select your account logo in the top-left, then select **Settings**.
2.  Navigate to **Connectors → Integrations → Vitally REST API**.
3.  Turn on the **Vitally REST API** integration.
4.  Select **Create API Key** to create a workspace-level Secret Token.
5.  Copy the Secret Token. You'll enter it in Glean in the next section.

caution

Store the Secret Token securely and don't include it in support requests or screenshots.

### Add the connector in Glean[​](#add-the-connector-in-glean "Direct link to Add the connector in Glean")

1.  In Glean, navigate to **Admin console → Connectors → Add connector**.
    
2.  Select **Vitally** and enter a name for the connector.
    
3.  Enter the Secret Token you copied from Vitally in the **Secret Token** field.
    
4.  Enter the REST API base URL of your Vitally workspace in the **API base URL** field:
    
    | Workspace region | API base URL |
    | --- | --- |
    | US | `https://<subdomain>.rest.vitally.io` |
    | EU | `https://rest.vitally-eu.io` |
    
5.  Click **Save**.
    

Authentication

The connector uses the Secret Token as the username in HTTP Basic authentication and sends an empty password. You don't need to configure OAuth authorization.

important

Enter the API base URL with `https://`, but don't append a path such as `/resources`. Glean adds the `/resources` path when it calls the Vitally API.

The connector checks that the API base URL is present but does not validate its scheme, hostname, or region during setup. Enter the exact regional API base URL that applies to your Vitally workspace.

### Exclude users (optional)[​](#exclude-users-optional "Direct link to Exclude users (optional)")

Configure user redlisting to prevent selected non-admin Vitally users from accessing this connector's content in Glean.

1.  After saving the connector credentials, go to **Review setup**. For an existing connector, open its **Overview** tab.
2.  Under **Data access (optional)**, click **Excluded users**.
3.  In **Redlisted user emails**, select the users you want to exclude.
4.  Click **Save**.

Users with the Admin role in Vitally are not available for selection. Leave the selection empty if you don't want to exclude anyone.

To remove an exclusion, deselect the user and click **Save**. After the identity crawl processes the change, the user's normal ownership-based permissions apply.

For details about permission updates, see [User exclusions (redlisting)](/connectors/native/vitally/about#user-exclusions-redlisting).

## Verify the connection[​](#verify-the-connection "Direct link to Verify the connection")

After you click **Save**:

1.  Monitor the connector status in the Glean Admin console and confirm that the configuration and crawl are successful.
2.  After the initial crawl completes, search for a known Vitally account, organization, note, task, project, or conversation.
3.  Open a result and confirm that its link takes you to the corresponding record in Vitally.

If Glean can't find a record, confirm that it is a supported object and review [Vitally troubleshooting](/connectors/native/vitally/troubleshooting).

## Rotate the secret token[​](#rotate-the-secret-token "Direct link to Rotate the secret token")

If you need to replace the Secret Token:

1.  Create a replacement workspace-level Secret Token in Vitally.
2.  Update the connector's **Secret Token** field in Glean and click **Save**.
3.  Confirm that the connector continues to authenticate and crawl successfully.
4.  Revoke the old Secret Token in Vitally after the replacement token is working.

## See also[​](#see-also "Direct link to See also")

-   [Vitally overview](/connectors/native/vitally/about)
-   [Vitally troubleshooting](/connectors/native/vitally/troubleshooting)
-   [Vitally REST API Overview](https://docs.vitally.io/en/articles/9880649-rest-api-overview)
