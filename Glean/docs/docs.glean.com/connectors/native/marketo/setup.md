---
url: "https://docs.glean.com/connectors/native/marketo/setup"
canonical: "https://docs.glean.com/connectors/native/marketo/setup"
title: "Set up Marketo"
description: "Create a Marketo API-only user and LaunchPoint custom service, then connect Marketo to Glean"
fetched_at: "2026-10-13T08:50:04.213Z"
---
On this page

Set up a dedicated Marketo API-only user and LaunchPoint custom service. You must also provide the Marketo Representational State Transfer (REST) API endpoint and upload an unchanged Marketo roles and permissions workbook so Glean can reconstruct source access.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, confirm that you have:

-   Access to the **Admin console**
-   Marketo administrator access to the subscription you want to connect
-   Permission to create a Marketo role, API-only user, and LaunchPoint custom service
-   Access to export the subscription's roles and permissions workbook

The Marketo connector uses one API-only user for the connected subscription. It does not ask individual users to authorize Glean.

Complete the setup sections in order.

## Create the API-only role and user[​](#create-the-api-only-role-and-user "Direct link to Create the API-only role and user")

1.  Open the [Marketo Engage admin console](https://experience.adobe.com/marketo-engage) and select the subscription to connect.
2.  Go to **Admin → Users & Roles → Roles**.
3.  Create a role for Glean.
4.  Grant the role only these permissions:
    -   Under **Access API**:
        -   **Read-Only Asset**
        -   **Read-Only Campaigns**
        -   **Access User Management Api**
    -   Under **Access Admin**:
        -   **Access Users**
5.  Go to **Admin → Users & Roles → Users**.
6.  Create a user for Glean, select **API Only**, and assign the role you created.

Confirm that the role and API-only user can access every Marketo workspace and asset that you want Glean to index.

## Create a LaunchPoint custom service[​](#create-a-launchpoint-custom-service "Direct link to Create a LaunchPoint custom service")

1.  In Marketo, go to **Admin → Integration → LaunchPoint**.
2.  Select **New → New Service**.
3.  Enter a descriptive display name and description.
4.  Select **Custom** as the service type.
5.  Select the Glean API-only user.
6.  Select **Create**.

## Get the client credentials[​](#get-the-client-credentials "Direct link to Get the client credentials")

1.  In **LaunchPoint**, find the custom service you created.
2.  Select **View Details**.
3.  Copy the generated **Client ID** and **Client Secret**.
4.  Store the client secret securely until you enter it in Glean.

Glean uses these client credentials to mint and refresh short-lived access tokens. Marketo does not issue a refresh token for this client-credentials flow.

## Find the REST API endpoint[​](#find-the-rest-api-endpoint "Direct link to Find the REST API endpoint")

1.  In Marketo, go to **Admin → Integration → Web Services**.
    
2.  Copy the **Endpoint** under **REST API**.
    
3.  Record only the instance host with the `https://` scheme and no path. For example:
    
    ```
    https://123-ABC-456.mktorest.com
    ```
    

Do not include `/rest`, `/identity`, a port, a query string, or a fragment. The setup form accepts only a bare HTTPS `mktorest.com` instance host. It removes a pasted `/rest` or `/identity` suffix and trailing slashes.

## Export roles and permissions[​](#export-roles-and-permissions "Direct link to Export roles and permissions")

1.  Go to **Admin → Users & Roles → Roles**.
2.  Scroll to the bottom of the page and select **Export**.
3.  Save the roles and permissions `.xlsx` workbook.
4.  Do not rename columns, delete rows, or otherwise modify the workbook.

The workbook must come from the same Marketo subscription as the REST API endpoint and client credentials. Glean uses it with the live Marketo role, workspace, and user data to reconstruct permissions.

## Configure Marketo in Glean[​](#configure-marketo-in-glean "Direct link to Configure Marketo in Glean")

1.  In Glean, go to **Admin console → Connectors → Add connector**.
2.  Select **Marketo**.
3.  Enter an organization-visible connector name.
4.  In **REST API endpoint**, enter the HTTPS instance host without a path.
5.  In **Client ID**, enter the client ID from the LaunchPoint custom service.
6.  In **Client Secret**, enter the client secret from the same service.
7.  Upload the unchanged roles and permissions `.xlsx` workbook.
8.  Select **Save**.
9.  Select **Authorize** to verify the client credentials and store the Marketo access token.

## Verify the connection[​](#verify-the-connection "Direct link to Verify the connection")

After authorization succeeds:

1.  Run or wait for the initial identity, folder, and content full crawls.
2.  Confirm that all expected crawl scopes complete successfully.
3.  Search for a known program, email, landing page, campaign, or form.
4.  Open a result and confirm that its link opens the expected Marketo asset.
5.  Test with users who have different Marketo workspaces and roles to confirm permission behavior.

## Update credentials or permissions[​](#update-credentials-or-permissions "Direct link to Update credentials or permissions")

-   To rotate the Marketo credentials, create or update the LaunchPoint custom service, replace **Client ID** and **Client Secret**, save, and authorize again.
-   After any Marketo role or permission change, export a new roles and permissions workbook, upload it unchanged, and run or wait for a full identity crawl.
-   After workspace assignments or user status changes, run or wait for a full identity crawl so Glean can refresh group membership.
