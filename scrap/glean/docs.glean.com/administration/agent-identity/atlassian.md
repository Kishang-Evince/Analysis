---
url: "https://docs.glean.com/administration/agent-identity/atlassian"
canonical: "https://docs.glean.com/administration/agent-identity/atlassian"
title: "Set up Atlassian service credential"
description: "Configure an Atlassian service-account API key so Glean agents can interact with Jira and Confluence through Atlassian's hosted MCP server under a non-human identity."
fetched_at: "2026-09-01T13:28:58.266Z"
---
On this page

An Atlassian service credential connects Glean to Atlassian's hosted Rovo MCP server (Jira, Confluence, and more) with a single service-account API key, sent as a Bearer token instead of per-user OAuth. Use it when an agent should act under a shared, non-human identity rather than an individual person's login. By default, only agent builders can attach it.

Glean adds the API key to outbound requests to the Atlassian MCP server, so the agent never sees the raw key.

-   Authentication: Atlassian service-account API key (Bearer)
-   Scope: The Jira projects and Confluence spaces the service account can access
-   Access: Read and write (governed by the service account's Atlassian permissions and token scopes)

note

Only standard Atlassian Cloud is supported. Atlassian Government Cloud (AGC) and Data Center / Server are not supported. This template requires a service-account API key - personal API tokens (the `email:token` Basic-auth kind) are not supported.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   An Atlassian Cloud organization with Organization Admin access.
-   Permission to create service accounts and manage Rovo MCP server settings.
-   A Glean administrator who can create service credentials.
-   The Atlassian MCP (Service Account) template enabled for your deployment. If you don't see it in the MCP server catalog, contact your Glean representative.

## Step 1: Enable API token authentication for your Atlassian org[​](#step-1-enable-api-token-authentication-for-your-atlassian-org "Direct link to Step 1: Enable API token authentication for your Atlassian org")

API token authentication is off by default (OAuth is the default), so an org admin must turn it on first.

1.  Go to Atlassian Administration and select your organization.
2.  Navigate to **Rovo → Rovo MCP server**.
3.  In the **Authentication** section, toggle **API token** on.

For API-token access, the domain allowlist doesn't apply - access is governed by your org's IP allowlist and the token's scopes.

## Step 2: Create the service account[​](#step-2-create-the-service-account "Direct link to Step 2: Create the service account")

A service account is a non-human, admin-managed Atlassian account - the right identity for a shared MCP connection. Creating one requires Organization Admin privileges.

1.  In Atlassian Administration, go to **Directory → Service accounts → Create a service account**.
2.  Name it something clearly identifiable, for example, "Glean Agent."
3.  Under roles, assign the **User** role for the products it needs - **Jira → User** and/or **Confluence → User**. Use the User role, not an admin role.
4.  Select **Create**.

Service accounts with product access don't count toward your user license.

## Step 3: Grant product and in-app access[​](#step-3-grant-product-and-in-app-access "Direct link to Step 3: Grant product and in-app access")

A service account works like a regular user: its access is the intersection of product access, project/space permissions, and token scopes - all three must allow an action.

1.  Add to groups - open the service account and add it to the `jira-users` and `confluence-users` groups.
2.  Double-check access - confirm these groups grant the Jira/Confluence product role and also grant read + write to projects/spaces through the default permission scheme (the case on most sites):
    -   Jira - the account can browse, create, and edit issues in the target projects.
    -   Confluence - the account can view, and add/edit pages and comments in the target spaces.
3.  If a project or space is restricted (not covered by the default groups), grant access explicitly:
    -   Jira - in the project's **Project settings → Access**, add the account (or its group) with a role that allows creating and editing issues.
    -   Confluence - in the space's **Space settings → Space permissions**, add the account (or its group) and grant **View** (read) plus **Add** for pages, blog posts, comments, and attachments (write). View is required for any write to work.

Keep it to content read/write - no site-, org-, or space-admin roles.

## Step 4: Generate the API key[​](#step-4-generate-the-api-key "Direct link to Step 4: Generate the API key")

1.  In **Directory → Service accounts**, select the account, then **Actions → Create credentials**.
    
2.  Grant these scopes (they can't be edited after creation, so add everything you need up front). Omit a product's scopes if you aren't connecting it.
    
    **Jira:**
    
    -   `read:jira-work`
    -   `write:jira-work`
    -   `read:jira-user`
    
    **Confluence:**
    
    -   `read:confluence-content.all`
    -   `write:confluence-content`
    -   `read:confluence-user`
    -   `search:confluence`
3.  The key is shown only once - copy and store it securely. Keys expire after at most 365 days, so set a reminder to rotate it.
    

## Step 5: Create the service credential in Glean[​](#step-5-create-the-service-credential-in-glean "Direct link to Step 5: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Tools → Add → Vendor Provided Tools (via MCP)**.
2.  Search for **Atlassian MCP (Service Account)**.
3.  Enter a short **Label**, such as `engineering`, `staging`, or `production`, to distinguish this server if you add multiple Atlassian service accounts.
4.  Paste the service-account API key into the **API key** field.
5.  Select **Save**.

After the tools sync, enable the Atlassian actions for the intended agents.

## Step 6: Attach the credential to an agent[​](#step-6-attach-the-credential-to-an-agent "Direct link to Step 6: Attach the credential to an agent")

1.  Go to **Agents** in Glean.
    
2.  Select the agent to which you want to add the service credentials.
    
3.  In the **Tools** tab, select **Service credentials** and select the Atlassian service credential you created.
    
    ![Add service credentials to an agent](/img/service-creds-agent.png)
    

Cloud ID

Agents must pass a `cloudId` identifying the Atlassian site when calling the tools. You can pass the site URL (for example, `your-site.atlassian.net`) directly as the `cloudId` - no need to pre-resolve it. To make this clear to agent builders, you can rename the MCP server to include that site URL.

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to perform a simple Jira action, for example, "List the open issues in the PROJ project." If it returns results, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

With an Atlassian credential attached, the agent can interact with Jira and Confluence as the service account:

-   Create, update, and comment on Jira issues
-   Search and read Jira issues and projects
-   Read and search Confluence pages and spaces
-   Add comments to Confluence pages

All actions are attributed to the service account, not the user who invoked the agent.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Token-based auth: Glean stores the API key in the credential broker and injects it as a Bearer header into outbound requests. The agent runtime never receives the raw key.
-   Least privilege: grant the service account only the Jira project roles and Confluence space permissions the agent needs. Keep it to content read/write - no admin roles.
-   Key rotation: API keys expire after at most 365 days. Set a reminder to rotate before expiry.
-   Attributed actions: all Jira and Confluence activity appears under the service account's name, making it easy to audit agent behavior.
-   Revocation: to cut off access, delete the API key in Atlassian or remove the Atlassian service credential in Glean.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Every tool call fails to authenticate

Confirm you're using a **service-account API key**, not a personal API token. Personal API tokens (Basic `email:token` auth) are not supported by this integration.

### Tools list, but data calls return 'You don't have permission to connect via API token...'

The org's API token toggle is off. Have an admin enable it in **Atlassian Administration → Rovo → Rovo MCP server → Authentication** (Step 1). It can take a few minutes to propagate.

### Calls return empty results or 403

Auth works but the account lacks access. Recheck product access, project/space membership (Step 3), and token scopes (Step 4).

### Requests blocked despite a valid key

Check your org's IP allowlist, which governs API-token access for the Rovo MCP server.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
