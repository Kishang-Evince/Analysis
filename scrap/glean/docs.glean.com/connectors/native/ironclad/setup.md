---
url: "https://docs.glean.com/connectors/native/ironclad/setup"
canonical: "https://docs.glean.com/connectors/native/ironclad/setup"
title: "Ironclad setup"
description: "Configure the Glean Ironclad connector, including OAuth app setup, connector credentials, admin authorization, and per-user OAuth."
fetched_at: "2026-09-01T13:29:33.074Z"
---
On this page

Use this page to set up the Ironclad connector in Glean, including prerequisites and the step-by-step configuration process for Glean admins and Ironclad admins.

## Configuration and setup instructions[​](#configuration-and-setup-instructions "Direct link to Configuration and setup instructions")

This section walks through the end‑to‑end setup for Glean admins and Ironclad admins.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A **Glean admin** account with access to the Admin console.
-   An **Ironclad admin** account with permission to:
    -   Register OAuth clients.
    -   Confirm instance details and regional domain.

### Step 1: Add the Ironclad connector in Glean[​](#step-1-add-the-ironclad-connector-in-glean "Direct link to Step 1: Add the Ironclad connector in Glean")

1.  In Glean, go to **Admin console** > **Connectors**.
2.  Search for **“Ironclad”** and select the Ironclad connector.

### Step 2: Determine your Ironclad server domain[​](#step-2-determine-your-ironclad-server-domain "Direct link to Step 2: Determine your Ironclad server domain")

1.  Identify the regional **domain prefix** for your Ironclad instance, usually one of:
    -   `na1` – `na1.ironcladapp.com`
    -   `eu1` – `eu1.ironcladapp.com`
    -   `demo` – `demo.ironcladapp.com`
2.  In the Glean Ironclad connector configuration, enter only the **prefix** (for example, `na1`) into the **Server domain** field. Glean constructs the appropriate API base URL from this value.

If you’re unsure which domain your instance uses, contact your Ironclad account representative.

### Step 3: Create an OAuth app in Ironclad[​](#step-3-create-an-oauth-app-in-ironclad "Direct link to Step 3: Create an OAuth app in Ironclad")

1.  Sign in to Ironclad as an **admin**.
    
2.  Navigate to the OAuth client registration area:
    
    1.  Click your **profile icon** in the top-right corner.
        
    2.  Select **Company Settings**.
        
    3.  On the left sidebar, select the **API** tab (requires the Ironclad API add-on).
        
        note
        
        Ironclad requires the API add-on for your instance to make the **API** tab visible. For more information, see [Register an OAuth Client](https://developer.ironcladapp.com/reference/register-oauth-client).
        
    4.  Click **Create new app**.
        
    5.  When the pop-up appears, enter a name for the OAuth application and click **Create app**. This generates a new client application and provides client ID and secret. Save this secret, as you will not be able to access it again.
        
    6.  After closing the modal, complete the required application details, including the Title, Description, and setting the appropriate Grant Types and Requested Resource Scopes (as specified in the prerequisites).
        
        important
        
        You must enable the **Authorization Code** grant type. Ironclad only displays the **Redirect URL** field when this grant type is enabled. If you skip this, you will not be able to enter the redirect URI required for Glean's OAuth flow.
        
    7.  Click **Save Changes**.
        
3.  When prompted for a **redirect URI**, copy the URI shown in Glean’s setup instructions. It will have the form:
    
    `https://tenant_id-be.glean.com/instance/ironclad/oauth/verify_code` (exact value provided in Glean UI).
    
    Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.
    
4.  Add the following **OAuth scopes** to the app:
    
    -   `public.records.readRecords`
    -   `public.records.readSchemas`
    -   `public.records.readAttachments`
    -   `public.workflows.readWorkflows`
    -   `public.workflows.readDocuments`
    -   `public.entities.readEntities`
    -   `public.entities.readRelationshipTypes`
    -   `scim.users.readUsers`
    -   `scim.schemas.readSchemas`
5.  Complete creation of the OAuth client. **Save the client credentials (Client ID and Client Secret)**-they may only be shown once.
    

These client credentials are used by Glean’s connector to make authenticated, read‑only API calls to Ironclad.

### Step 4: Configure the connector in Glean[​](#step-4-configure-the-connector-in-glean "Direct link to Step 4: Configure the connector in Glean")

Back in the Glean Admin console, in the Ironclad connector configuration:

1.  Enter:
    -   **Server domain** (e.g., `na1`, `eu1`, `demo`).
    -   **Client ID** from the Ironclad OAuth app.
    -   **Client Secret** from the Ironclad OAuth app.
2.  Save the configuration.

Glean can now call Ironclad’s APIs with service‑level read access, within the scopes you granted.

### Step 5: Initiate the admin OAuth authorization flow[​](#step-5-initiate-the-admin-oauth-authorization-flow "Direct link to Step 5: Initiate the admin OAuth authorization flow")

In the Ironclad connector settings in Glean:

1.  Click **Authorize** to initiate an OAuth 2.0 authorization flow between Glean and Ironclad.
2.  You’ll be redirected to Ironclad to log in (if not already) and **consent** on behalf of the organization.
3.  Ensure the user authorizing the connection is an **Ironclad admin** so that the granted scopes cover the tenant as configured.

Once complete, Glean verifies the credentials and the connector is ready to begin crawling.

### Step 6: Enable per‑user OAuth for end users[​](#step-6-enable-peruser-oauth-for-end-users "Direct link to Step 6: Enable per‑user OAuth for end users")

To ensure permissions mirror Ironclad accurately:

Communicate to relevant users (e.g., legal/sales/finance teams) that they should:

1.  Visit Glean.
2.  Complete the **Ironclad OAuth connection** when prompted, or via their account’s “Connected apps” settings.

-   Only users who complete this step will see Ironclad content; users without Ironclad accounts or OAuth connections will not see any Ironclad results.
    
-   Once authorized, content will only become visible after the next full crawl. This process typically takes up to 24 hours to complete.
    

## See also[​](#see-also "Direct link to See also")

-   [Ironclad overview](/connectors/native/ironclad/about)
-   [Ironclad troubleshooting](/connectors/native/ironclad/troubleshooting)
