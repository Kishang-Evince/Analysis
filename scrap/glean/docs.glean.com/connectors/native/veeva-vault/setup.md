---
url: "https://docs.glean.com/connectors/native/veeva-vault/setup"
canonical: "https://docs.glean.com/connectors/native/veeva-vault/setup"
title: "Veeva Vault setup"
description: "Learn how the Veeva Vault connector works and how to configure it for Glean."
fetched_at: "2026-09-01T13:29:46.151Z"
---
On this page

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   The person setting up this connector must have either the Vault Owner or System Administrator security profile in Veeva Vault.
-   For security best practices, create a dedicated integration user for Glean.

-   If you do not want to grant full **System Administrator** access, create a custom permission set and security profile for the connector as described in **Step 1: Create a permission set for Glean** and **Step 2: Create a security profile for Glean**. The integration user should use the **Glean Integration Profile** instead of the standard **System Administrator** profile.
-   Gather these values before you start:
    -   **Vault URL**, for example `company.veevavault.com`
    -   For **username and password** authentication: the integration user's **username** (for example `glean-integration@example.com`) and **password**
    -   For **OAuth 2.0 Client Credentials** authentication: **Token Endpoint URL**, **Client ID**, **Client Secret**, **Vault OIDC Profile ID**, and optionally **Scopes**, **Session Exchange Base URL**, and **Custom Headers**

### Step 1: Create a permission set for Glean[​](#step-1-create-a-permission-set-for-glean "Direct link to Step 1: Create a permission set for Glean")

Create a custom permission set with the minimum permissions required for the Glean connector.

1.  Log in to your Veeva Vault instance as an administrator.
    
2.  Navigate to **Admin** > **Users & Groups** > **Permission Sets**.
    
3.  Click **Create** and name the permission set `Glean Integration`.
    
4.  **Save** the permission set.
    
5.  Open the newly created Permission Set and click **Edit**.
    
6.  Configure Glean integration permissions in the following tabs:
    
    #### Admin tab[​](#admin-tab "Direct link to Admin tab")
    
    On the **Admin** tab, click **Edit** to enable the permissions below.
    
    | Permission | Access |
    | --- | --- |
    | Document Types | Read |
    | Document Fields | Read |
    | Document Lifecycles | Read |
    | Business Admin Objects | Read |
    | Users | Read |
    | Groups | Read |
    | Security Profiles | Read |
    
    Leave all other **Admin** permissions unchecked.
    
    #### Application tab[​](#application-tab "Direct link to Application tab")
    
    On the **Application** tab, click **Edit** to enable the permissions below.
    
    | Permission | Access |
    | --- | --- |
    | API | Access API, Metadata API |
    | Document | Download Document, Download Rendition |
    | Object | Bulk Tool |
    | User | View User Information, View User Profile |
    | File Staging | Access |
    
    **Important:** Do **not** enable **All Documents: All Document Read**. Document visibility is controlled through Dynamic Access Control (see [Step 5](#step-5-configure-dynamic-access-control-for-glean-access)).
    
    Leave all other **Application** permissions unchecked, including **Workflow**, **Workflow Administration**, and **Events API**.
    
    #### Objects tab[​](#objects-tab "Direct link to Objects tab")
    
    On the **Objects** tab, click **Edit** to enable the permissions below.
    
    | Permission | Access |
    | --- | --- |
    | All Objects | Read |
    

#### Tabs[​](#tabs "Direct link to Tabs")

No specific tab permissions are required for the Glean connector. You can leave this tab at its defaults.

#### Pages, Mobile and API tabs[​](#pages-mobile-and-api-tabs "Direct link to Pages, Mobile and API tabs")

These tabs do not require any specific permissions for the Glean connector. You can leave them at their defaults.

7.  Click **Save** after adding permissions on each tab to create the permission set.

### Step 2: Create a security profile for Glean[​](#step-2-create-a-security-profile-for-glean "Direct link to Step 2: Create a security profile for Glean")

1.  Navigate to **Admin** > **Users & Groups** > **Security Profiles**.
2.  Click **Create** and name the security profile `Glean Integration Profile`.
3.  **Save** the Security Profile.
4.  Open the newly created Security Profile and click **Edit**.
5.  Under **Permission set**, click **Add** > **Existing Permission set** and select the **Glean Integration** permission set you created in Step 1.
6.  Click **Save**.

### Step 3: Create an integration user for Glean[​](#step-3-create-an-integration-user-for-glean "Direct link to Step 3: Create an integration user for Glean")

1.  Navigate to **Admin** > **Users & Groups** > **Vault Users**.
    
2.  Click **Create** to open the Create User form.
    
3.  In the **Domain User** section, click the **Domain User** dropdown and select **\+ Create Domain User** to set up a new domain-level user for Glean. If a dedicated user already exists, select it from the list.
    
4.  In the **Create Domain User** section, fill in the following required fields, then click **Save** to create the Domain User.
    
    | Field | Value |
    | --- | --- |
    | First Name | `Glean` |
    | Last Name | `Integration User` |
    | User Name | `glean-integration` (the domain suffix is added automatically) |
    | Email | A valid email address for receiving notifications |
    | Language | (Your preferred language) |
    | Locale | (Your preferred locale) |
    | Timezone | (Your preferred timezone) |
    
5.  Scroll down to the **Details** section and fill in the following:
    
    | Field | Value |
    | --- | --- |
    | Security Profile | **Glean Integration Profile** (the custom profile created in Step 2) |
    | Activation Date | Click **Today** to activate the user immediately |
    | Security Policy | Your organization’s default policy (or as required by your IT team) |
    
6.  Click **Save** to create the user.
    
7.  The new user will receive a welcome email with instructions to set their password. You can also reset the password from the user’s profile page via **Tools > Reset Password**.
    

### Step 4: Choose your authentication method[​](#step-4-choose-your-authentication-method "Direct link to Step 4: Choose your authentication method")

Glean supports two authentication methods for connecting to Veeva Vault. Choose the method that matches your organization’s requirements.

-   Option A: Username and Password
-   Option B: OAuth 2.0 Client Credentials

Gather the following values:

1.  **Vault URL**: Your Veeva Vault instance URL (for example, `company.veevavault.com`)
2.  **Username**: The integration user’s full username (for example, `glean-integration@example.com`)
3.  **Password**: The integration user’s password (set via the welcome email or password reset)

Use this method if your organization requires OAuth 2.0 for system-level integrations or uses an API gateway such as Kong.

#### IdP prerequisites[​](#idp-prerequisites "Direct link to IdP prerequisites")

Before you begin, make sure your identity provider (IdP) is configured to support the `client_credentials` grant type and that an OAuth client has been created for the Glean integration.

#### Configure the Veeva Vault OIDC profile[​](#configure-the-veeva-vault-oidc-profile "Direct link to Configure the Veeva Vault OIDC profile")

1.  In Veeva Vault, go to **Admin** > **Settings** > **OAuth 2.0 / OpenID Connect Profiles**.
2.  Create or select an OIDC profile for the Glean integration.
3.  Note the **OIDC Profile ID** - you will need it when entering connection details in Glean.

#### Gather OAuth credentials[​](#gather-oauth-credentials "Direct link to Gather OAuth credentials")

Collect the following values from your IdP and Veeva Vault configuration:

| Field | Required | Description |
| --- | --- | --- |
| **Token Endpoint URL** | Yes | The IdP token endpoint used to obtain an access token. |
| **Client ID** | Yes | The OAuth client ID from your IdP. |
| **Client Secret** | Yes | The OAuth client secret from your IdP. |
| **Scopes** | No | Space-separated list of scopes to request. If left blank, no scope is sent and the IdP uses its default. |
| **Vault OIDC Profile ID** | Yes | The OIDC profile ID configured in Veeva Vault. |
| **Session Exchange Base URL** | No | Required if your Veeva Vault API is accessed through an API gateway. Enter the gateway’s base URL. |
| **Custom Headers** | No | JSON object of additional HTTP headers to include in all Veeva API requests. Required for API gateway environments that need custom routing or authentication headers (for example, `{"x-api-key": "your-key"}`). |

### Step 5: Configure Dynamic Access Control for Glean access[​](#step-5-configure-dynamic-access-control-for-glean-access "Direct link to Step 5: Configure Dynamic Access Control for Glean access")

This section explains how to configure Dynamic Access Control in Veeva Vault so the Glean integration user can access and index only the documents you explicitly allow.

Veeva recommends the following procedure to give the Glean integration user access to the content Glean can index.

The setup uses:

-   A dedicated **Document Type Group**
-   A dedicated **Application Role**
-   A dedicated **Lifecycle Role**
-   A **Sharing Rule** based on **Document Type Group**
-   A **User Role Setup** for the Glean integration user

This approach gives you granular control over which documents Glean can index.

#### Before you begin[​](#before-you-begin "Direct link to Before you begin")

Before starting, make sure you have:

-   Admin access to Veeva Vault
-   The Glean integration user available in Vault
-   A list of the document types, sub-types, and document lifecycles that should be accessible to Glean

#### Step 5a: Create a document type group for Glean-accessible documents[​](#step-5a-create-a-document-type-group-for-glean-accessible-documents "Direct link to Step 5a: Create a document type group for Glean-accessible documents")

1.  In Veeva Vault, go to **Business Admin** > **Objects**.
2.  Search for **Document Type Group** and select the object.
3.  Click **Create** and name it **Glean Accessible Documents**.
4.  Click **Save**.

Use this document type group to mark all document types and sub-types that Glean should be allowed to index.

#### Step 5b: Add the document type group to the document types and sub-types you want Glean to index[​](#step-5b-add-the-document-type-group-to-the-document-types-and-sub-types-you-want-glean-to-index "Direct link to Step 5b: Add the document type group to the document types and sub-types you want Glean to index")

For each document type that should be accessible to Glean:

1.  Go to **Admin** > **Configuration** > **Document Types** > double-click *your document type*.
2.  Under **Document Type Groups**, add **Glean Accessible Documents**.
3.  Click **Save**.

#### Important[​](#important "Direct link to Important")

Sub-types may not inherit document type groups from their parent type.  
Make sure you explicitly add **Glean Accessible Documents** to every sub-type you want Glean to index.

#### Step 5c: Create an application role for Glean[​](#step-5c-create-an-application-role-for-glean "Direct link to Step 5c: Create an application role for Glean")

1.  Go to **Admin** > **Users & Groups** > **Application Roles**.
2.  Create a new **Application Role** with:
    -   **Label:** `Glean Integration Access`
    -   **Name:** `glean_integration_access__c`

This role will be used in the affected document lifecycles.

#### Step 5d: Add the Glean role to each affected document lifecycle[​](#step-5d-add-the-glean-role-to-each-affected-document-lifecycle "Direct link to Step 5d: Add the Glean role to each affected document lifecycle")

For each document lifecycle that contains documents Glean should index:

1.  Go to **Admin** > **Configuration** > **Document Lifecycles**.
2.  Open the lifecycle.
3.  Go to the **Roles** tab.
4.  Click **Create Role**.
5.  Select the application role **Glean Integration Access**.
6.  Set **Label**: `Glean Integration Access`.
7.  Under **Options**:
    -   Enable **Dynamic Access Control**
    -   Clear the **Allowed Group** dropdown
8.  **Save** the role.

At this point, the lifecycle role exists, but you still need to define how users are assigned to it.

#### Step 5e: Create a sharing rule for the lifecycle role[​](#step-5e-create-a-sharing-rule-for-the-lifecycle-role "Direct link to Step 5e: Create a sharing rule for the lifecycle role")

For each lifecycle where you added the **Glean Integration Access** role:

1.  In the lifecycle **Roles** tab, click **Glean Integration Access**.
2.  Open **Sharing Rules**.
3.  Click **Create**.
4.  Set:
    -   **Label:** `Glean Access Rule`
    -   **Name:** `glean_access_rule`
5.  Set the rule criteria to **Document Type Group**.
6.  **Save** the rule.

#### How this works[​](#how-this-works "Direct link to How this works")

With this rule in place, when a **User Role Setup** is created for:

-   the role **Glean Integration Access**, and
-   the document type group **Glean Accessible Documents**

The selected user is added to that lifecycle role for all matching documents.

This is the mechanism that controls which documents Glean can access and index.

#### Step 5f: Add the Glean integration user to the role setup[​](#step-5f-add-the-glean-integration-user-to-the-role-setup "Direct link to Step 5f: Add the Glean integration user to the role setup")

1.  Go to **Admin** > **Users & Groups**.
2.  Go to **Vault Users** and open the **Glean Integration User**.
3.  Go to **User Role Setup**.
4.  Click **Create**.
5.  Set:
    -   **Role:** `Glean Integration Access`
    -   **Document Type Group:** `Glean Accessible Documents`
6.  **Save** the setup.

After this is configured, any document that:

-   belongs to a lifecycle with the configured **Glean Integration Access** role and sharing rule, and
-   matches the **Glean Accessible Documents** document type group

will grant access to the **Glean Integration User** through that lifecycle role.

#### Step 5g: Grant the required permissions in the steady-state lifecycle state[​](#step-5g-grant-the-required-permissions-in-the-steady-state-lifecycle-state "Direct link to Step 5g: Grant the required permissions in the steady-state lifecycle state")

For each affected document lifecycle:

1.  Go to **Admin** > **Configuration** > **Document Lifecycles**.
2.  Open the lifecycle.
3.  Click **States**.
4.  Select the steady-state (for example, Approved, Effective).
5.  Open **Security Settings**.
6.  For **Glean Integration Access**, grant:
    -   **View Content**
    -   **View Document**
    -   **Download Source**

These permissions are required for Glean to access and index the document.

#### Validation checklist[​](#validation-checklist "Direct link to Validation checklist")

Use this checklist to confirm the setup is complete:

-   A **Document Type Group** named **Glean Accessible Documents** exists
-   All required document types and sub-types are added to that group
-   An **Application Role** named **Glean Integration Access** exists
-   The role is added to each affected document lifecycle
-   **Dynamic Access Control** is enabled for the lifecycle role
-   A **Sharing Rule** exists with criteria **Document Type Group**
-   The **Glean Integration User** has a **User Role Setup** for:
    -   role **Glean Integration Access**
    -   document type group **Glean Accessible Documents**
-   The steady-state lifecycle state grants:
    -   **View Content**
    -   **View Document**
    -   **Download Source**

#### Notes[​](#notes "Direct link to Notes")

-   This configuration is intentionally restrictive and is recommended when you want Glean to index only a controlled subset of documents.
-   If a document subtype is missing the **Glean Accessible Documents** group, Glean will not receive access through this configuration.
-   You must repeat the lifecycle configuration for each affected document lifecycle.

### Step 6: Test API connectivity (optional)[​](#step-6-test-api-connectivity-optional "Direct link to Step 6: Test API connectivity (optional)")

You can verify API access by making a test authentication request.

-   Username and Password
-   OAuth 2.0 Client Credentials

```
curl -X POST "https://YOUR-VAULT.veevavault.com/api/v25.2/auth" \  -H "Content-Type: application/x-www-form-urlencoded" \  -d "username=${VEEVA_USERNAME}&password=${VEEVA_PASSWORD}"
```

A successful response includes a `sessionId` and `responseStatus` of `SUCCESS` in the JSON response.

1.  Request an access token from your IdP:

```
curl -X POST "${TOKEN_ENDPOINT_URL}" \  -H "Content-Type: application/x-www-form-urlencoded" \  -d "grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}"
```

2.  Use the access token to perform a session exchange with Veeva Vault:

```
curl -X POST "https://YOUR-VAULT.veevavault.com/api/v25.2/auth/oauth/session/${OIDC_PROFILE_ID}" \  -H "Authorization: Bearer ${ACCESS_TOKEN}" \  -H "Content-Type: application/x-www-form-urlencoded"
```

A successful response includes a `sessionId` and `responseStatus` of `SUCCESS` in the JSON response.

### Step 7: Enter the connection details in Glean[​](#step-7-enter-the-connection-details-in-glean "Direct link to Step 7: Enter the connection details in Glean")

On the Veeva Vault setup page in Glean:

1.  Go to **Admin console** > **Connectors** > **Add connector** and select **Veeva Vault**.
2.  Enter a display name for the connector.
3.  Enter your `Vault URL` in the format `company.veevavault.com` without `http://` or `https://`.

-   Username and Password
-   OAuth 2.0 Client Credentials

4.  Enter the integration user’s **username**.
5.  Enter the integration user’s **password**.

4.  Enter the **Token Endpoint URL** from your IdP.
5.  Enter the **Client ID** and **Client Secret**.
6.  Optionally enter **Scopes**. If left blank, no scope is sent and the IdP uses its default.
7.  Enter the **Vault OIDC Profile ID** configured in Veeva Vault.
8.  If you access Veeva Vault through an API gateway, enter the **Session Exchange Base URL**.
9.  If your API gateway requires additional headers, enter them in **Custom Headers** as a JSON object (for example, `{"x-api-key": "your-key"}`).

6.  Save the configuration so Glean can validate the credentials and API access permissions.
