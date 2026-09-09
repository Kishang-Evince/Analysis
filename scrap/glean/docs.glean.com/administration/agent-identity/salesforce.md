---
url: "https://docs.glean.com/administration/agent-identity/salesforce"
canonical: "https://docs.glean.com/administration/agent-identity/salesforce"
title: "Set up Salesforce service credential"
description: "Let Glean agents call the Salesforce REST API using a connected App."
fetched_at: "2026-09-01T13:28:59.256Z"
---
On this page

A Salesforce service credential lets a Glean agent call the Salesforce REST API using a service identity not as any individual user. You create a Salesforce connected App with the OAuth 2.0 client credentials flow enabled, store the connection details in Glean, and the agent can then authenticate automatically to call the Salesforce REST API.

Glean handles authentication automatically. The credential is stored encrypted, and the agent never sees the raw client secret.

-   Authentication: OAuth 2.0 Client Credentials
-   Scope: Whatever the connected App and Salesforce service identity are allowed to access
-   Access: Determined by the permissions granted to the connected App

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A Salesforce org with admin access (Developer Edition, Sandbox, or Enterprise).
-   A user with the **System Administrator** profile for the initial setup.
-   Support for the Client Credentials flow, which is generally available since Spring '23 and requires API version 54.0 or later.
-   A Glean administrator who can create service credentials.
-   The **Salesforce** template enabled for your deployment. If you do not see it in the list of templates, contact your Glean representative to turn it on.

## Step 1: Create a run-as user[​](#step-1-create-a-run-as-user "Direct link to Step 1: Create a run-as user")

The client credentials flow needs a run-as user, the identity the agent assumes when it calls Salesforce APIs.

1.  In Salesforce, go to **Setup → Users → New User**.
2.  Fill in the user details:
    -   **First/Last Name**: for example, "Integration Bot".
    -   **Email**: your admin email.
    -   **Username**: a globally unique username in email format, for example, `bot-service-credential@yourcompany.com`.
    -   **Role**: None specified.
    -   **User License**: Salesforce Platform.
    -   **Profile**: any profile with the **API Enabled** permission, for example, a custom *API Only* profile or *Standard Platform User*.
3.  Select **Save**.

tip

Create a dedicated integration user rather than using a personal admin account. This gives you a clear audit trail and avoids disruption if someone leaves the org.

## Step 2: Create a connected app[​](#step-2-create-a-connected-app "Direct link to Step 2: Create a connected app")

1.  In Salesforce, go to **Setup → App Manager**.
2.  Select **New Connected App**.
3.  Enter the basic information:
    -   **Connected App Name**: for example, *Glean Agent*.
    -   **Contact Email**: your admin email.
4.  Under **API (Enable OAuth Settings)**, select **Enable OAuth Settings** and configure:
    -   **Callback URL**: `https://localhost/callback` (a dummy value - it isn't used for the Client Credentials flow, but Salesforce requires it).
    -   **OAuth Scopes**: add **Manage user data via APIs (api)** and **Perform requests at any time (refresh\_token, offline\_access)**.
5.  Under **Flow Enablement**, select **Enable Client Credentials Flow**.
6.  Select **Save**.

note

A newly created connected app can take sometime to propagate before you can use it.

### Alternative: use an External Client App[​](#alternative-use-an-external-client-app "Direct link to Alternative: use an External Client App")

If your org uses the newer Lightning UI, you may see **External Client App Manager** instead of **App Manager**. The setup is equivalent:

1.  Go to **Setup → External Client App Manager → New External Client App** and choose **Local** distribution.
2.  Enter the basic information like name and contact email.
3.  Under **OAuth Settings**, set the same **Callback URL** and **OAuth Scopes**.
4.  Under **Flow Enablement**, select **Enable Client Credentials Flow**.
5.  Select **Save**.

The remaining steps are the same for both connected app and an external client app.

## Step 3: Set the run-as user[​](#step-3-set-the-run-as-user "Direct link to Step 3: Set the run-as user")

1.  Open the management page of the connected app and go to the **Policies** tab.
2.  Under **OAuth Flows and External Client App Enhancements**, select **Enable Client Credentials Flow**.
3.  In the **Run As** field that appears, select the integration user you created in Step 1.
4.  Select **Save**.

## Step 4: Get the consumer key and secret[​](#step-4-get-the-consumer-key-and-secret "Direct link to Step 4: Get the consumer key and secret")

1.  On the Connected App page, go to the **Settings** tab → **OAuth Settings**.
2.  Select **Consumer Key and Secret**.
3.  Copy both values:
    -   **Consumer Key**: this is your client ID.
    -   **Consumer Secret**: this is your client secret.

Important

Treat the consumer secret as a sensitive value. Store it securely until you enter it in Glean.

## Step 5: Find your instance name[​](#step-5-find-your-instance-name "Direct link to Step 5: Find your instance name")

Your Salesforce instance URL has the form `https://<your-domain>.my.salesforce.com`. Find your domain in **Setup → My Domain**, or read it from the address bar of your browser while signed in. The instance name is the subdomain, for example, `mycompany` for `mycompany.my.salesforce.com`.

## Step 6: Create the service credential in Glean[​](#step-6-create-the-service-credential-in-glean "Direct link to Step 6: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
    
    ![Create service credentials](/img/independent-agent-create-service-creds.png)
    
2.  Click **Add**.
3.  Select **Salesforce** under **Service credentials**.
4.  Fill in these fields:
    -   **Credential name**: A human-readable name for the credential, for example, "Salesforce - Production org".
    -   **Description**: A brief description of what this credential is used for.
    -   **Instance name**: Your Salesforce My Domain name, for example, `mycompany`.
    -   **Client ID**: The consumer key from Step 4.
    -   **Client secret**: The consumer secret from Step 4.
    -   **Audience**: Which users or groups can attach this credential to agents.
5.  Select **Save**.

## Step 7: Attach the credential to an agent[​](#step-7-attach-the-credential-to-an-agent "Direct link to Step 7: Attach the credential to an agent")

Agent builders can attach the credential from the **Service credentials** tab in the agent builder. After you attach it, the agent can call the Salesforce REST API and Glean obtains an access token using the Client Credentials flow and attaches it to each request automatically. The agent also gains a Salesforce skill that explains how to call the Salesforce REST API.

1.  Go to **Agents** in Glean.
    
2.  Select the agent to which you want to add the service credentials.
    
3.  In the **Tools** tab, select **Service credentials** and select the Salesforce service credential you created.
    
    ![Add service credentials to an agent](/img/service-creds-agent.png)
    

## Step 8 (optional): Restrict connected app permissions[​](#step-8-optional-restrict-connected-app-permissions "Direct link to Step 8 (optional): Restrict connected app permissions")

It is recommended to restrict connected app permissions to limit what the agent can do in your Salesforce org:

-   Restrict permitted users: under **App Manager → your app → Manage**, set **Permitted Users** to **Admin approved users are pre-authorized**, then assign only the integration profile of the user or a dedicated permission set.
-   Set field-level security: use the integration profile of the user to control which objects and fields it can read or write.
-   Restrict IP ranges: in the Connected App settings, limit allowed IP ranges to Glean's egress IPs where available.

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent something that requires Salesforce data, for example, "list the 5 most recent opportunities." If it returns data, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

With a Salesforce credential attached, the agent can call the Salesforce REST API using the Connected App identity:

-   Query Salesforce objects with SOQL
-   Read specific records
-   Run SOSL searches
-   Describe object schemas

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Dedicated Connected App: use a dedicated Connected App for Glean, separate from other integrations.
-   Least privilege: grant only the minimum scopes and Salesforce permissions the agent needs.
-   Rotation: rotate the client secret regularly. Create a new secret in Salesforce, update the credential in Glean, then revoke the old secret.
-   Injected server-side: the agent runtime never receives the raw client secret. Glean manages the OAuth token lifecycle automatically.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### 401 Unauthorized

The client ID or client secret is incorrect. Re-check the Connected App values and update the credential.

### 403 Forbidden

The Connected App or service identity lacks required Salesforce access. Review Connected App permissions and the assigned Salesforce permissions.

### Requests succeed for one org but fail for another

The credential is pointed at the wrong org domain or login domain. Verify the instance name used in the credential.

### The Salesforce template isn't available

The template isn't enabled for your deployment. Contact your Glean representative to turn it on.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
