---
url: "https://docs.glean.com/administration/agent-identity/ironclad"
canonical: "https://docs.glean.com/administration/agent-identity/ironclad"
title: "Set up an Ironclad service credential"
description: "Configure an Ironclad OAuth service account so Glean agents can access the records, workflows, and entities allowed by your scopes and account permissions."
fetched_at: "2026-10-13T08:49:04.283Z"
---
On this page

An Ironclad service credential lets a Glean agent call the Ironclad public API as a dedicated Ironclad account. You register an OAuth application, authorize it as the service account, and store the refresh token in Glean.

-   Authentication: OAuth 2.0 authorization code grant with a refresh token
-   Scope: The Ironclad resource scopes granted during consent
-   Access: Read and write, limited by the granted scopes and the service account's Ironclad permissions

Ironclad replaces the refresh token after each successful refresh. Glean stores the replacement, so you don't need to rotate the refresh token manually.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   An Ironclad instance where you have admin access
-   The Ironclad API add-on enabled. Without it, the **API** tab in **Company Settings** isn't available
-   Permission to create users and register OAuth applications in Ironclad
-   A Glean administrator who can create service credentials
-   The **Ironclad** service credential template enabled for your deployment. If it isn't listed under **Service credentials**, contact your Glean representative

## Identify your Ironclad environment[​](#identify-your-ironclad-environment "Direct link to Identify your Ironclad environment")

Check the hostname that you use to sign in to Ironclad. Enter only its prefix in the **Server domain** field in Glean.

| Ironclad hostname | Server domain in Glean |
| --- | --- |
| `ironcladapp.com` | Leave blank |
| `na1.ironcladapp.com` | `na1` |
| `eu1.ironcladapp.com` | `eu1` |
| `demo.ironcladapp.com` | `demo` |

Ironclad environments are independent. Register the OAuth application in the environment that the agent will use. An application registered in one environment can't authorize users in another.

## Create a dedicated service account[​](#create-a-dedicated-service-account "Direct link to Create a dedicated service account")

Create an Ironclad account for Glean agent access. Grant it access only to the record types, workflows, and entities that the agent needs.

Use a dedicated account instead of a person's account. Ironclad applies the account's permissions to every API request, so those permissions limit what the agent can read or change.

## Register an OAuth client[​](#register-an-oauth-client "Direct link to Register an OAuth client")

Follow Ironclad's [Register an OAuth Client](https://developer.ironcladapp.com/reference/register-oauth-client) instructions:

1.  Sign in to Ironclad as an admin in the environment you identified.
2.  Open the profile menu and select **Company Settings**.
3.  Select **API**, then select **Create new app**.
4.  Enter an app name, such as `Glean Agent`, and create the app.
5.  Copy the **Client ID** and **Client secret**. Ironclad shows the secret only once. Store it securely. If you lose it, reset it on the application page.
6.  Add `http://localhost` as a **Redirect URI**.
7.  Grant only the scopes the agent needs, then select **Save Changes**.

Use the smallest scope set that supports the agent's tasks. This table lists the scopes from the Ironclad setup guide:

| Agent task | Scopes |
| --- | --- |
| List, filter, and read records | `public.records.readRecords` |
| Create a record | `public.records.createRecords`, `public.records.readSchemas` |
| Update a record | `public.records.updateRecords`, `public.records.readSchemas`, `public.records.readRecords` |
| List and read workflows | `public.workflows.readWorkflows` |
| Launch a workflow | `public.workflows.createWorkflows`, `public.workflows.readSchemas` |
| Update workflow fields in a Review step | `public.workflows.updateWorkflows`, `public.workflows.readWorkflows` |
| Comment on a workflow | `public.workflows.createComments` |
| Approve a workflow step | `public.workflows.updateApprovals`, `public.workflows.readApprovals` |
| Create an entity | `public.entities.createEntities`, `public.entities.readRelationshipTypes` |
| Update an entity | `public.entities.updateEntities`, `public.entities.readEntities` |
| Create an obligation | `public.obligations.createObligations`, `public.obligations.readObligations`, `public.records.readRecords` |
| Update an obligation | `public.obligations.updateObligations`, `public.obligations.readObligations` |
| Search contracts | `public.search.conversational` |

Grant read scopes only if the agent doesn't need to make changes. Each Ironclad endpoint lists its required resource scope. Check the [Ironclad API reference](https://developer.ironcladapp.com/reference/getting-started-api) if the agent needs a scope that isn't in this table.

## Authorize the service account[​](#authorize-the-service-account "Direct link to Authorize the service account")

Complete the OAuth flow while signed in to Ironclad as the dedicated service account:

### 1\. Set the OAuth variables[​](#1-set-the-oauth-variables "Direct link to 1. Set the OAuth variables")

In a local terminal, set the Ironclad hostname, OAuth client ID, redirect URI, and space-separated scopes. Replace the example hostname, client ID, and scopes with values for your environment and OAuth app. The scopes must match those registered on the app.

```
export IRONCLAD_HOST="na1.ironcladapp.com"export CLIENT_ID="YOUR_CLIENT_ID"export REDIRECT_URI="http://localhost"export SCOPE="public.records.readRecords public.records.readSchemas"printf 'Client secret: 'read -r -s CLIENT_SECRETprintf '\n'export CLIENT_SECRET
```

The `read` command hides the client secret as you type, so the value does not appear in your shell history.

### 2\. Generate the authorization URL[​](#2-generate-the-authorization-url "Direct link to 2. Generate the authorization URL")

Run this command to create and print the authorization URL:

```
export AUTH_URL="https://$IRONCLAD_HOST/oauth/authorize?$(python3 -c 'import os, urllib.parse; print(urllib.parse.urlencode({"response_type": "code", "client_id": os.environ["CLIENT_ID"], "redirect_uri": os.environ["REDIRECT_URI"], "scope": os.environ["SCOPE"]}))')"printf '%s\n' "$AUTH_URL"
```

### 3\. Authorize the service account[​](#3-authorize-the-service-account "Direct link to 3. Authorize the service account")

Open the printed URL in a browser, sign in as the dedicated service account, select the correct company if prompted, and approve the requested scopes. On macOS, you can open the URL from the terminal with:

```
open "$AUTH_URL"
```

Ironclad redirects to `http://localhost/?code=XXXXXXXX` with a short-lived authorization code. The page won't load. Copy the code from the address bar.

### 4\. Exchange the code for a refresh token[​](#4-exchange-the-code-for-a-refresh-token "Direct link to 4. Exchange the code for a refresh token")

Enter the authorization code without adding it to shell history:

```
printf 'Authorization code: 'read -r -s CODEprintf '\n'export CODE
```

Then exchange the code for a refresh token. Ironclad accepts a JSON request body for this endpoint, not form-encoded data:

```
curl --fail -sS -X POST "https://$IRONCLAD_HOST/oauth/token" \\  -H "Content-Type: application/json" \\  --data @- <<JSON | python3 -c 'import json, sys; print(json.load(sys.stdin)["refresh_token"])'{  "grant_type": "authorization_code",  "code": "$CODE",  "redirect_uri": "$REDIRECT_URI",  "client_id": "$CLIENT_ID",  "client_secret": "$CLIENT_SECRET"}JSON
```

Copy the refresh token printed by the command and store it securely until you enter it in Glean. The command prints only the refresh token, not the access token. Do not put client secrets, authorization codes, or refresh tokens in source files, URLs, shell history, or logs.

## Create the service credential in Glean[​](#create-the-service-credential-in-glean "Direct link to Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
2.  Select **Add**, then select **Ironclad**.
3.  Fill in the credential fields:
    -   **Credential name**: A name that identifies the credential
    -   **Description**: What the credential is used for
    -   **Server domain**: The environment prefix from the table above, or blank for `ironcladapp.com`
    -   **Client ID**: The ID from the Ironclad OAuth application
    -   **Client Secret**: The secret from the OAuth application
    -   **OAuth refresh token**: The token from the authorization flow
    -   **Audience**: The users or groups who can attach this credential to agents
4.  Select **Save**.

Glean stores the secret and tokens encrypted. It adds authentication to requests sent to Ironclad. The agent doesn't receive the secret or tokens.

## Attach the credential to an agent[​](#attach-the-credential-to-an-agent "Direct link to Attach the credential to an agent")

1.  Go to **Agents** and select the agent.
2.  Open the **Tools** tab.
3.  Under **Service credentials**, select the Ironclad credential.

## Verify access[​](#verify-access "Direct link to Verify access")

Ask the agent to perform a read action, such as, "List the five most recent Ironclad records." The agent should return only records that its scopes and service account can access.

## Understand access[​](#understand-access "Direct link to Understand access")

With an Ironclad credential attached, the agent can call the Ironclad public API as the service account. Depending on the granted scopes and account permissions, it can:

-   List and read contract records
-   Read record property schemas before creating or updating records
-   Create and update records
-   List and read workflows, and launch workflows
-   Read entities such as counterparties

The agent can access only the actions permitted by both its OAuth scopes and the service account's Ironclad permissions. Ironclad attributes API activity to the service account.

## Secure and maintain the credential[​](#secure-and-maintain-the-credential "Direct link to Secure and maintain the credential")

-   Use a dedicated service account and grant it access only to the required records, workflows, and entities.
-   Grant the narrowest OAuth scopes the agent needs. If the agent needs a new scope, update the OAuth application, repeat the authorization flow, and enter the new refresh token in Glean.
-   To rotate the client secret, reset it in Ironclad and update **Client Secret** in Glean.
-   To revoke access, deactivate the service account, delete the OAuth application, or remove the credential in Glean.

If you update the scopes on an existing credential, an agent might keep using its current access token until it expires. Create a new credential if the agent must use the new scopes immediately.

## Troubleshoot Ironclad service credentials[​](#troubleshoot-ironclad-service-credentials "Direct link to Troubleshoot Ironclad service credentials")

### The API tab isn't available

The Ironclad API add-on isn't enabled for the instance. Contact your Ironclad representative. You need the add-on to register an OAuth application.

### Authorization fails with \`invalid\_scope\`

A requested scope isn't registered on the OAuth application. Compare the authorization request with the app's **Scopes** and repeat the flow with a matching set.

### Authorization fails with a redirect URI error

The redirect URI must match `http://localhost` in the OAuth application and in the token request. Check both values.

### The agent gets 401 Unauthorized

Confirm that the client ID, client secret, refresh token, and **Server domain** belong to the same Ironclad environment. Reauthorize the service account if the refresh token is invalid.

### The agent gets 403 Forbidden

The service account might lack permission in Ironclad, or the OAuth app might not have the required scope. Grant only the required account permissions and scopes, then repeat authorization to issue a refresh token with the updated scopes.

### Requests fail in one environment but work in another

OAuth applications belong to one Ironclad environment. Confirm that **Server domain** matches the environment where the app was registered. Register a separate application for each environment the agent needs to use.

### The Ironclad template isn't available

The template isn't enabled for your deployment. Contact your Glean representative.

### The Service credentials tab isn't available

Agent Identity might not be enabled for your deployment, or your admin role might not have permission to create service credentials.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview) — Learn how service credentials control agent access
-   [Ironclad: Register an OAuth Client](https://developer.ironcladapp.com/reference/register-oauth-client) — Create an OAuth application
-   [Ironclad: Authorization Code Grant](https://developer.ironcladapp.com/reference/authorization-code-grant) — Authorize the service account
-   [Ironclad API reference](https://developer.ironcladapp.com/reference/getting-started-api) — Find the scopes required by each endpoint
