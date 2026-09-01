---
url: "https://docs.glean.com/administration/agent-identity/linear"
canonical: "https://docs.glean.com/administration/agent-identity/linear"
title: "Set up Linear service credential"
description: "Configure Linear OAuth app client credentials so Glean agents can use Linear under a non-human identity."
fetched_at: "2026-09-01T13:28:59.002Z"
---
On this page

A Linear service credential connects Glean to Linear's hosted MCP server with a Linear OAuth application's client credentials instead of per-user OAuth. Use it when an agent should act under a shared, non-human identity rather than an individual person's login. By default, only agent builders can attach it, and it isn't available as an end-user tool in Glean Assistant or Chat.

Linear doesn't provide a separate service-account user for this flow. Instead, you create a Linear OAuth application and give Glean its client ID and client secret. Glean exchanges those credentials for an app-actor access token using Linear's `client_credentials` grant and refreshes the token automatically before it expires. The agent's actions are attributed to the OAuth application rather than to an individual user.

-   Authentication: OAuth 2.0 client credentials (Linear OAuth application)
-   Scope: Public teams in the Linear workspace, limited by the scopes you configure
-   Access: Read and write by default (`read,write`), governed by the configured scopes

note

The credential can't access private teams. To work with a private team, make the team public or use the per-user OAuth Linear template instead.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A Linear workspace owner who can create OAuth applications.
-   Permission to manage API keys and OAuth applications in Linear.
-   A Glean administrator who can create service credentials.

## Step 1: Create an OAuth application in Linear[​](#step-1-create-an-oauth-application-in-linear "Direct link to Step 1: Create an OAuth application in Linear")

1.  Sign in to Linear as a workspace owner and go to **Settings → API → OAuth applications → Create new**.
2.  Enter a name for the application, such as `Glean`, and complete the required fields.
3.  For **Redirect URIs**, enter any valid URL, such as `https://app.glean.com`. The form requires this field, but the client-credentials flow doesn't use browser redirects.
4.  Enter the developer name and URL. You can use your name and company URL.
5.  Select **Create**, then copy the **Client ID** and **Client secret**. You'll enter both values in Glean.

## Step 2: Enable client credentials in Linear[​](#step-2-enable-client-credentials-in-linear "Direct link to Step 2: Enable client credentials in Linear")

1.  Open the OAuth application's settings.
2.  Turn on **Client credentials** or **Support generating OAuth access tokens using the `client_credentials` grant type**.
3.  Don't generate an access token manually. Glean requests and refreshes the token after you add the credentials.

## Step 3: Create the service credential in Glean[​](#step-3-create-the-service-credential-in-glean "Direct link to Step 3: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Tools → Add → Vendor Provided Tools (via MCP)**.
    
2.  Search for **Linear (Service Account)**.
    
3.  Enter a short **Label**, such as `engineering`, `staging`, or `production`, to distinguish this server if you add multiple Linear service accounts.
    
4.  In the **API key** field, enter the client ID and client secret in this exact format:
    
    ```
    client_id=<your client id>;client_secret=<your client secret>
    ```
    
5.  To request specific scopes, append `;scope=` followed by a comma-separated list. For example, for read-only access:
    
    ```
    client_id=<your client id>;client_secret=<your client secret>;scope=read
    ```
    
    The default is `read,write`. Supported scopes include:
    
    -   `read`
    -   `write`
    -   `issues:create`
    -   `app:assignable`
    -   `app:mentionable`
6.  Select **Save**.
    

After the tools sync, enable the Linear actions for the intended agents. Keep the tools enabled for **Agents** only unless your deployment has a different approved use case.

## Step 4: Attach the credential to an agent[​](#step-4-attach-the-credential-to-an-agent "Direct link to Step 4: Attach the credential to an agent")

1.  Go to **Agents** in Glean.
    
2.  Select the agent to which you want to add the service credentials.
    
3.  In the **Tools** tab, select **Service credentials** and select the Linear service credential you created.
    
    ![Add service credentials to an agent](/img/service-creds-agent.png)
    

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to list issues or fetch a known issue, for example, "Show me the details of `ENG-123`." If it returns data, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

With a Linear credential attached, the agent can work with Linear:

-   Search and list issues across public teams
-   Fetch a specific issue by its identifier, for example, `ENG-123`
-   Create and update issues, when the `write` or `issues:create` scope is granted
-   Look up projects and teams that are public in the workspace

The agent operates under a non-human identity scoped to the OAuth application's granted scopes, and its actions are attributed to the application rather than to an individual user.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   App-actor identity: Glean exchanges the client ID and client secret for an app-actor token and refreshes it automatically before it expires. Actions are attributed to the OAuth application, not to an individual user.
-   Public teams only: the credential can't reach private teams. To work with a private team, make the team public or use the per-user OAuth Linear template.
-   Least privilege: the default scope is `read,write`. Grant only the scopes the agent needs: use `read` for read-only access, or the narrower `issues:create` instead of full `write`.
-   Secret rotation: rotating the OAuth application's client secret invalidates existing tokens. Update the credential in Glean with the new secret and save the tool again.
-   Revocation: to cut off access, delete the OAuth application in Linear or remove the Linear service credential in Glean.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Every call returns 401 Unauthorized

Verify that:

-   The client ID and client secret are correct.
-   **Client credentials** is enabled for the OAuth application in Linear.
-   The value in Glean uses the required `client_id=...;client_secret=...` format.

### Reads work, but the agent can't create or update issues

Add the `write` scope or the narrower `issues:create` scope to the `;scope=` suffix in the Glean configuration.

### An issue or project can't be found

The object may belong to a private team. The service-account MCP credential can access public teams only. Make the team public or use the per-user OAuth Linear template.

### Created issues show the wrong author

This template authenticates as the OAuth application. Confirm that you entered the client ID and client secret, not a personal access token.

### Authentication stops working after a secret change

Rotating the OAuth application's client secret invalidates existing tokens. Paste the new client secret into the Glean configuration and save the tool again.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
-   [Connect remote MCP servers to Glean](/administration/tools/connect-remote-mcp-servers-to-glean)
