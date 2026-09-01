---
url: "https://docs.glean.com/administration/agent-identity/coda"
canonical: "https://docs.glean.com/administration/agent-identity/coda"
title: "Set up Coda service credential"
description: "Configure a dedicated Coda identity and MCP-restricted API token so Glean agents can work with approved Coda content."
fetched_at: "2026-09-01T13:28:58.672Z"
---
On this page

A Coda service credential lets a Glean agent work with Coda docs, pages, tables, and rows through Coda's MCP server under a shared integration identity. You create a dedicated Coda user, grant it access to the required content, generate an MCP-restricted Personal API token, and store the token in Glean.

Glean adds the token to outbound requests to the Coda MCP server. The agent never sees the raw token.

-   Authentication: Coda MCP-restricted Personal API token (Bearer)
-   Scope: The docs, folders, and workspaces the dedicated account can access, plus the token's access level
-   Access: Read and write access determined by Coda sharing, the account's role, and the token's access level

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A dedicated organizational email account for the integration.
-   Membership for that account in the required Coda workspaces.
-   Permission to share the required Coda docs or folders with the integration account.
-   A Glean administrator who can create service credentials.
-   The **Coda MCP (Service Account)** template enabled for your deployment. If you don't see it under **Service credentials**, contact your Glean representative.

## Step 1: Create a dedicated Coda user[​](#step-1-create-a-dedicated-coda-user "Direct link to Step 1: Create a dedicated Coda user")

1.  Create or provision an organizational email identity for the integration, such as `automation@company.com`.
2.  Sign in to [Coda](https://coda.io) with that account.
3.  Join the Coda workspaces that contain the content the agent needs.

Use an account created for this integration instead of a person's account. This keeps agent activity separate from human activity and prevents changes to a person's access from interrupting the agent.

## Step 2: Grant access to Coda content[​](#step-2-grant-access-to-coda-content "Direct link to Step 2: Grant access to Coda content")

1.  Open each required doc, select **Share**, and add the integration account.
    
2.  Choose the minimum access the agent needs:
    
    | Access level | Use when the agent needs to |
    | --- | --- |
    | **Can view** | Read docs, pages, tables, and rows |
    | **Can comment** | Read and comment on content |
    | **Can edit** | Create or update pages, tables, and rows |
    
3.  If the agent must create docs, confirm that the account has the **Doc Maker** role in the relevant workspace.
    
4.  If the content is organized in folders, review the folder permissions that apply to the docs.
    

## Step 3: Generate an MCP API token[​](#step-3-generate-an-mcp-api-token "Direct link to Step 3: Generate an MCP API token")

While signed in as the integration user, create a token for Coda's MCP server:

1.  Go to [Coda account settings](https://coda.io/account) and find **API settings**.
    
2.  Select **Generate API token**.
    
3.  Enter a descriptive name, such as `Glean Agent Production`.
    
4.  Set the restriction type to **MCP**.
    
5.  Choose the least-privileged access level:
    
    | Access level | Use when the agent needs to |
    | --- | --- |
    | **Read only** | View accessible docs, pages, tables, and rows |
    | **Write only** | Create or modify content without reading existing content |
    | **Read and write** | Read and modify accessible content |
    
6.  Select **Generate API token**, copy the token, and store it in your secret manager.
    

Important

Use a token with the **MCP** restriction type. A standard Coda API token can't authenticate to the Coda MCP server.

For more information about token access levels, see [Coda's MCP connection guidance](https://help.coda.io/hc/en-us/articles/44722661982989-Connect-to-the-Coda-MCP).

## Step 4: Create the service credential in Glean[​](#step-4-create-the-service-credential-in-glean "Direct link to Step 4: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
2.  Select **Add**, then select **Coda MCP (Service Account)**.
3.  Fill in these fields:
    -   **Label**: A short identifier, such as `engineering`, `staging`, or `production`.
    -   **API key**: The MCP-restricted token you created in Coda.
4.  Select **Save**.
5.  After the tools sync, set the server's audience to the people or groups who can use it. This template has no audience by default.

## Step 5: Attach the credential to an agent[​](#step-5-attach-the-credential-to-an-agent "Direct link to Step 5: Attach the credential to an agent")

1.  Go to **Agents** in Glean and select the agent.
2.  Open the **Tools** tab.
3.  Add the **Coda MCP (Service Account)** credential.

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to perform a read action, such as, "List the Coda docs available to you." If it returns the expected docs, the credential is working.

For a credential with write access, perform a non-destructive test in a dedicated test doc, such as adding a row to a test table.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

Depending on the account permissions and token access level, the agent can:

-   List and read docs, pages, tables, and rows
-   Search across content that the integration user can access
-   Create or update pages, tables, and rows

All activity is attributed to the dedicated Coda user. The agent can't reach content that isn't shared with that user, and it doesn't receive organization-admin access unless you grant that access to the account.

Glean instructs the agent not to perform destructive operations, such as deleting docs, pages, tables, or rows. The Coda token itself might permit these operations, so keep the account and token scopes as narrow as possible.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Dedicated integration user: use an account created only for this integration, separate from human users and other integrations.
-   Least privilege: share only the required content and choose the lowest token access level the agent needs.
-   Injected server-side: Glean stores the token encrypted and adds it only to outbound requests to the Coda MCP server.
-   Rotation: generate a new MCP-restricted token in Coda, update the **API key** in Glean, test the connection, and then revoke the old token.
-   Revocation: revoke the token in Coda or remove the service credential in Glean to cut off access.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Coda returns 401 Unauthorized

The token is invalid or doesn't have the **MCP** restriction type. Create a new MCP-restricted token in Coda and update the **API key** in Glean.

### A doc isn't found, results are empty, or Coda returns 403

Authentication is working, but the integration user might not have access to the content. Confirm the doc or its folder is shared with the integration user at the required access level.

### The Coda MCP service-account template isn't available

The template isn't enabled for your deployment. Contact your Glean representative to turn it on.

### The credential isn't available to an agent

Confirm that the credential has an audience and that the agent builder belongs to that audience. Also confirm that the credential is attached to the agent in the **Tools** tab under **Service credentials**.

### Read operations work, but write operations fail

Confirm that the token has **Write only** or **Read and write** access. Also confirm that the integration user can edit the target content and has the **Doc Maker** role when creating docs.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
-   [Coda MCP security recommendations](https://help.coda.io/hc/en-us/articles/44722769665549-Security-recommendations-for-the-Coda-MCP)
