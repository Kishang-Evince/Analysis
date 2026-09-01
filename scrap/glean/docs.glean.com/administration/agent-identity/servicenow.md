---
url: "https://docs.glean.com/administration/agent-identity/servicenow"
canonical: "https://docs.glean.com/administration/agent-identity/servicenow"
title: "Set up ServiceNow service credential"
description: "Let Glean agents call the ServiceNow REST API using a shared service account with the OAuth 2.0 password grant."
fetched_at: "2026-09-01T13:28:59.212Z"
---
On this page

A ServiceNow service credential lets a Glean agent call the ServiceNow REST API using a shared service account instead of the identity of the user who runs the agent. You create a service account user in ServiceNow, assign it the roles the agent needs, register an OAuth application, and store the connection details in Glean. The agent then authenticates automatically, with no per-user sign-in.

-   Authentication: OAuth 2.0 password grant with a ServiceNow service account
-   Scope: The ServiceNow tables and records the service account's roles allow
-   Access: Read and write, determined by the roles you assign to the service account

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A ServiceNow instance where you have admin access.
-   Permission to create users, assign roles, and register OAuth applications in ServiceNow.
-   A Glean administrator who can create service credentials.
-   The **ServiceNow** template enabled for your deployment. If you don't see it in the list of templates, contact your Glean representative to turn it on.

## Step 1: Create a service account user[​](#step-1-create-a-service-account-user "Direct link to Step 1: Create a service account user")

Follow the ServiceNow instructions for [creating a user](https://docs.servicenow.com/bundle/latest-platform-security/page/administer/users-and-groups/task/t_CreateAUser.html), with these changes from the defaults:

-   Leave **Email** blank, so the account doesn't appear in people search.
-   Clear **Password needs reset**.
-   Set **Identity type** to **Machine Identity**, which restricts the account to API-only access.

Note the user ID and password. You'll enter both in Glean.

## Step 2: Assign roles[​](#step-2-assign-roles "Direct link to Step 2: Assign roles")

Follow the ServiceNow instructions for [assigning a role to a user](https://docs.servicenow.com/bundle/latest-platform-security/page/administer/users-and-groups/task/t_AssignARoleToAUser.html), and grant the roles the agent needs:

| Role | Purpose |
| --- | --- |
| `snc_platform_rest_api_access` | REST API (Table API) access |
| `itil` | Read and write incidents and requests |
| `catalog` | Submit service catalog requests |
| `knowledge` | Read and create knowledge base articles |

`snc_platform_rest_api_access` is required for any REST access. Add the others only for the areas the agent actually works in.

## Step 3: Create an OAuth application[​](#step-3-create-an-oauth-application "Direct link to Step 3: Create an OAuth application")

Follow the ServiceNow instructions for [creating an OAuth endpoint for external clients](https://docs.servicenow.com/bundle/latest-platform-security/page/administer/security/task/t_CreateEndpointforExternalClients.html), with these changes from the defaults:

-   **Client type**: select **Integration as a Service**.
-   **Scope restriction**: select **Broad scoped**. If this is set to **Securely scoped**, API calls fail with `Access to unscoped api is not allowed`.
-   **Redirect URL**: leave blank. The password grant doesn't use browser redirects.

After you submit the form, copy the **Client ID** and **Client secret**. You'll enter both in Glean.

## Step 4: Create the service credential in Glean[​](#step-4-create-the-service-credential-in-glean "Direct link to Step 4: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
    
    ![Create service credentials](/img/independent-agent-create-service-creds.png)
    
2.  Click **Add**.
3.  Select **ServiceNow** under **Service credentials**.
4.  Fill in these fields:
    -   **Credential name**: A human-readable name for the credential, for example, "ServiceNow Agent Identity".
    -   **Description**: A brief description of what this credential is used for.
    -   **Instance name**: Your ServiceNow subdomain, for example, `mycompany` for `mycompany.service-now.com`.
    -   **Client ID**: The client ID from Step 3.
    -   **Client secret**: The client secret from Step 3.
    -   **Service account username**: The user ID from Step 1.
    -   **Service account password**: The password from Step 1.
    -   **Audience**: Which users or groups can attach this credential to agents.
5.  Select **Save**.

## Step 5: Attach the credential to an agent[​](#step-5-attach-the-credential-to-an-agent "Direct link to Step 5: Attach the credential to an agent")

1.  Go to **Agents** in Glean.
    
2.  Select the agent to which you want to add the service credentials.
    
3.  In the **Tools** tab, select **Service credentials** and select the ServiceNow service credential you created.
    
    ![Add service credentials to an agent](/img/service-creds-agent.png)
    

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent something that requires ServiceNow data, for example, "list the five most recent incidents." If it returns data, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

With a ServiceNow credential attached, the agent can call the ServiceNow REST API under the service account's identity:

-   Query ServiceNow tables through the Table API
-   Read and update incidents and requests
-   Submit service catalog requests
-   Read and create knowledge base articles

What the agent can reach depends on the roles you assigned in Step 2, so its access is exactly what those roles allow.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Dedicated service account: use an account created only for Glean, separate from human users and other integrations.
-   Machine identity: setting **Identity type** to **Machine Identity** and leaving **Email** blank keeps the account out of people search and limits it to API access.
-   Least privilege: assign only the roles the agent needs. `snc_platform_rest_api_access` is required for REST access; add `itil`, `catalog`, or `knowledge` only for the areas the agent works in.
-   Rotation: rotate the client secret and the service account password on your normal schedule, and update the credential in Glean after each rotation.
-   Injected server-side: the agent runtime never receives the raw client secret or password. Glean manages the OAuth token lifecycle.
-   Revocation: to cut off access, deactivate the service account user or delete the OAuth application in ServiceNow, or remove the ServiceNow service credential in Glean.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### 401 Unauthorized

One of the four credential values is wrong. Re-check the client ID and client secret from Step 3 and the service account username and password from Step 1, then update the credential. Also confirm that **Password needs reset** is cleared on the service account, since a pending reset blocks the password grant.

### Calls fail with 'Access to unscoped api is not allowed'

The OAuth application's **Scope restriction** is set to **Securely scoped**. Change it to **Broad scoped**.

### 403 Forbidden

The service account is missing a required role. Confirm that `snc_platform_rest_api_access` is assigned, plus `itil`, `catalog`, or `knowledge` for the area the request touches.

### Requests succeed for one instance but fail for another

The credential points at the wrong instance. Verify that **Instance name** is the subdomain only, for example, `mycompany` rather than `mycompany.service-now.com`.

### The ServiceNow template isn't available

The template isn't enabled for your deployment. Contact your Glean representative to turn it on.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
