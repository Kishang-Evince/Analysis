---
url: "https://docs.glean.com/administration/agent-identity/grafana"
canonical: "https://docs.glean.com/administration/agent-identity/grafana"
title: "Set up Grafana service credential"
description: "Configure a Grafana Cloud service account API key so Glean agents can query dashboards, alerts, traces, and metrics through Grafana's MCP server under a non-human identity."
fetched_at: "2026-09-01T13:28:58.981Z"
---
On this page

A Grafana service credential connects Glean to Grafana's MCP server with a service account API key instead of per-user OAuth. Use it when an agent should act under a shared, non-human identity rather than an individual person's login. By default, only agent builders can attach it.

Glean adds the API key to outbound requests to the Grafana MCP server, so the agent never sees the raw key.

-   Authentication: Grafana Cloud service account API key (Bearer)
-   Scope: The Grafana dashboards, data sources, and traces the service account can access
-   Access: Read and write (governed by the service account's Grafana role)

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A Grafana Cloud account with admin access.
-   A Grafana Cloud service account with an API key.
-   Your Grafana Cloud stack ID (the subdomain of your Grafana Cloud URL, for example, `mycompany` from `mycompany.grafana.net`).
-   A Glean administrator who can create service credentials.
-   The Grafana MCP template enabled for your deployment. If you don't see it in the MCP server catalog, contact your Glean representative.

## Step 1: Create a service account and generate an API key in Grafana Cloud[​](#step-1-create-a-service-account-and-generate-an-api-key-in-grafana-cloud "Direct link to Step 1: Create a service account and generate an API key in Grafana Cloud")

Refer to the Grafana documentation for creating service account credentials:

-   [Grafana Cloud MCP server setup](https://grafana.com/docs/grafana-cloud/send-data/traces/mcp-server/)
-   [Service accounts](https://grafana.com/docs/grafana-cloud/security-and-account-management/authentication-and-permissions/service-accounts/)

To create the service account and token:

1.  Log in to Grafana Cloud as an administrator.
2.  Go to **Administration → Service accounts**.
3.  Click **Add service account**.
4.  Fill in the details:
    -   **Display name**: A descriptive name, for example, "Glean Agent."
    -   **Role**: Select the minimum role the agent needs. **Viewer** is recommended for read-only access. Use **Editor** only if the agent must create or modify dashboards.
5.  Click **Create**.
6.  On the service account's detail page, click **Add service account token**.
7.  Give the token a descriptive name, for example, "Glean Agent Token."
8.  Set an expiration if your organization requires it, or leave it as "No expiration" if permitted.
9.  Click **Generate token**.
10.  Copy the token value — you'll need it when creating the service credential in Glean.

caution

Store the token securely. You won't be able to view it again after leaving the page.

## Step 2: Create the service credential in Glean[​](#step-2-create-the-service-credential-in-glean "Direct link to Step 2: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Tools → Add → Vendor Provided Tools (via MCP)**.
2.  Search for **Grafana MCP**.
3.  Fill in these fields:
    -   **MCP server URL**: Construct the URL from your Grafana Cloud stack ID:
        
        ```
        https://<stack_id>.grafana.net/api/datasources/proxy/uid/grafanacloud-traces/api/mcp
        ```
        
        Replace `<stack_id>` with your Grafana Cloud subdomain. For example, if your Grafana Cloud URL is `mycompany.grafana.net`, the MCP server URL is:
        
        ```
        https://mycompany.grafana.net/api/datasources/proxy/uid/grafanacloud-traces/api/mcp
        ```
        
    -   **Transport type**: Select **Streaming HTTP**.
        
    -   **Authentication method**: Select **Your own API Key (you will be responsible for managing usage capacity)**.
        
    -   **API key**: The service account token you generated in Step 1.
        
4.  Select **Save**.

After the tools sync, enable the Grafana actions for the intended agents.

## Step 3: Attach the credential to an agent[​](#step-3-attach-the-credential-to-an-agent "Direct link to Step 3: Attach the credential to an agent")

1.  Go to **Agents** in Glean.
    
2.  Select the agent to which you want to add the service credentials.
    
3.  In the **Tools** tab, select **Service credentials** and select the Grafana service credential you created.
    
    ![Add service credentials to an agent](/img/service-creds-agent.png)
    

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to list dashboards, for example, "Show me the dashboards in the Production folder." If it returns results, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

With a Grafana credential attached, the agent can query Grafana:

-   Search and list dashboards by folder or tag
-   View dashboard panels and annotations
-   Check alert rule statuses and notification states
-   Query traces and connector health

The agent operates under a non-human identity scoped to the service account's role.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Token-based auth: Glean stores the service account token in the credential broker and injects it as a Bearer header into outbound requests. The agent runtime never receives the raw token.
-   Least privilege: create the service account with the **Viewer** role unless the agent must modify dashboards or alerts. Grant only the minimum role the agent needs.
-   Revocation: to cut off access, delete the service account token in Grafana or remove the Grafana service credential in Glean.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### The agent gets a 401 Unauthorized error

The service account token may be invalid, expired, or revoked. Generate a new token in Grafana and update the service credential in Glean.

### The agent can't access certain dashboards

The service account's role may be too restrictive. Check the folder permissions and the service account role. Dashboards in restricted folders require Editor or Admin access.

### The MCP server URL returns connection errors

Verify the stack ID in your MCP server URL matches your Grafana Cloud subdomain. The URL must follow the format `https://<stack_id>.grafana.net/api/datasources/proxy/uid/grafanacloud-traces/api/mcp`.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
