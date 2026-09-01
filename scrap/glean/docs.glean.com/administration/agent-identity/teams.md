---
url: "https://docs.glean.com/administration/agent-identity/teams"
canonical: "https://docs.glean.com/administration/agent-identity/teams"
title: "Set up Microsoft Teams service credential"
description: "Let Glean agents access Microsoft Teams data using an application identity."
fetched_at: "2026-09-01T13:28:59.449Z"
---
On this page

A Microsoft Teams service credential lets a Glean agent access Microsoft Teams through a shared application identity and not as any individual user. You register an app in Microsoft Entra ID, grant Microsoft Graph application permissions for reads, configure a Teams bot for sends and replies, and store the connection details in Glean.

Glean handles authentication automatically. The credential is stored encrypted, and the agent never sees the raw client secret.

-   Authentication: Microsoft Entra application identity (OAuth 2.0 client credentials)
-   Scope:
    -   Reads: Determined by the Microsoft Graph application permissions granted to the app
    -   Sends and replies: Handled through the configured Teams bot and Bot Framework, not through Microsoft Graph application permissions
-   Access: For reads, access is determined by the Microsoft Graph application permissions granted to the app. For sends and replies, access depends on the Teams bot configuration and whether the bot is installed in the target Teams context.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Permission to create or manage an app registration in Microsoft Entra ID.
-   Permission to grant Microsoft Graph application permissions and admin consent.
-   Access to the Azure portal, Teams Developer Portal, and Teams Admin Center if the agent needs to send messages or replies.
-   A Glean administrator who can create service credentials.
-   The **Microsoft Teams** template enabled for your deployment. If you don't see it in the list of templates, contact your Glean representative to turn it on.

## Step 1: Create an app registration in Microsoft Entra ID[​](#step-1-create-an-app-registration-in-microsoft-entra-id "Direct link to Step 1: Create an app registration in Microsoft Entra ID")

1.  In the Azure portal, go to **Microsoft Entra ID → App registrations** and create a new app registration for Glean.
    
2.  Under **Certificates & secrets**, create a new client secret.
    
    Important
    
    The client secret value is shown only once. Copy it and store it somewhere safe. If you lose it, you will have to create a new secret.
    
3.  From the app's **Overview** page, copy the **Application (client) ID** and **Directory (tenant) ID**.
    
4.  Under **API permissions**, add only the Microsoft Graph **Application** permissions the agent needs for reads. Common permissions include:
    
    | Permission | Use when the agent needs to |
    | --- | --- |
    | `User.Read.All` | Find users in the directory |
    | `Team.ReadBasic.All` | Discover teams |
    | `GroupMember.Read.All` | Read Microsoft 365 group membership |
    | `ChannelMember.Read.All` | Read channel membership |
    | `ChannelSettings.Read.All` | Read channel settings |
    | `ChannelMessage.Read.All` | Read channel messages across the tenant |
    | `Chat.Read.All` | Read chats across the tenant |
    
5.  Select **Grant admin consent** and confirm that each permission shows a granted status.
    

These permissions apply only to Microsoft Graph reads. They don't enable the agent to send messages or replies.

## Step 2: Set up the Teams bot for sends and replies[​](#step-2-set-up-the-teams-bot-for-sends-and-replies "Direct link to Step 2: Set up the Teams bot for sends and replies")

Skip this step if the agent only needs to read Microsoft Teams data.

To let the agent send messages or replies, complete Phase 1 and Phase 2 in [Glean in Microsoft Teams: Admin guide](/administration/platform/embedded-integrations/glean-in-teams/glean-in-microsoft-teams--admin-guide#phase-1-set-up-azure-bot-and-glean-app). These phases configure the Azure Bot, create the Teams app, and publish the app through Teams Admin Center.

Use one Microsoft app registration consistently across the bot, Teams app, and service credential. When you configure the Azure Bot, use the app registration from Step 1. If you create a new Microsoft App ID during bot setup, use the new app registration's client ID, tenant ID, and client secret when you create the service credential.

After publishing the Teams app, copy its **App ID** from Teams Admin Center. You need this value when you create the service credential.

## Step 3: Create the service credential in Glean[​](#step-3-create-the-service-credential-in-glean "Direct link to Step 3: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
    
    ![Create service credentials](/img/independent-agent-create-service-creds.png)
    
2.  Click **Add**.
3.  Select **Microsoft Teams App** under **Service credentials**.
4.  Fill in these fields:
    -   **Credential name**: A human-readable name for the credential.
    -   **Description**: A brief description of what this credential is used for.
    -   **Application (Client) ID**: The application (client) ID from your app registration's **Overview** page.
    -   **Client Secret**: The client secret you created under **Certificates & secrets** (stored encrypted). Used to mint Microsoft Graph tokens via the OAuth 2.0 client-credentials flow.
    -   **Directory (Tenant) ID**: The directory (tenant) ID of the Microsoft Entra tenant where the app is registered, from the **Overview** page.
    -   **Teams App ID**: The Microsoft Teams app ID from Teams Admin Center in Step 2, used to link this credential to an agent.
    -   **Audience**: Which users or groups can attach this credential to agents.
5.  Select **Save**. Glean stores the client secret as an encrypted secret and doesn't display it again.

## Step 4: Link the service credential to your agent[​](#step-4-link-the-service-credential-to-your-agent "Direct link to Step 4: Link the service credential to your agent")

After creating a service credential, attach it to your agent as a tool. For dedicated Microsoft Teams apps that support direct messages, you also connect the credential through the Teams publishing flow.

### Attach the credential as a tool[​](#attach-the-credential-as-a-tool "Direct link to Attach the credential as a tool")

1.  In Glean, go to **Agents** and select your agent.
2.  Open the **Tools** tab.
3.  Under **Service credentials**, select the Microsoft Teams service credential you created.

### Publish a dedicated Teams app[​](#publish-a-dedicated-teams-app "Direct link to Publish a dedicated Teams app")

If your agent uses a dedicated Microsoft Teams app that supports direct messages, complete the publishing flow as well:

1.  From the same agent, click **Share**.
2.  Under **Publishing**, select **Microsoft Teams**.
3.  From the credential dropdown, select the Microsoft Teams service credential you created.
4.  Click **Publish** and complete the publishing flow.

Glean uses the selected credential to authenticate the agent's Microsoft Teams application connection. When the agent requests data from the Microsoft Graph API, Glean automatically attaches the appropriate authentication token.

note

Prior to the Agent Identity beta, dedicated Microsoft Teams apps were configured under **Admin console** → **Connectors** → **Microsoft Teams** → **Glean in Microsoft Teams** by selecting **Add Agent**.

With the Agent Identity beta enabled:

-   New agent setups: The **Add Agent** option is hidden. Configure new dedicated agent apps by creating a Microsoft Teams App service credential under **Admin console** → **Tools** → **Service credentials**, then connect it in **Agent builder** → **Share** → **Publishing** → **Microsoft Teams**.
-   Existing agent apps: Existing configurations continue to work. They aren't migrated automatically when the beta is enabled. Migration is rolled out on a per-deployment basis.
-   Post-migration: After migration completes for your deployment, existing configurations automatically appear under **Tools** → **Service credentials** and within the Microsoft Teams publishing flow. You don't need to re-enter secrets on the Microsoft Teams connector page.

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent something that requires Teams data, for example, "list my recent Teams channels." If it returns data, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

Depending on the permissions you grant, the agent may be able to read Teams data such as:

-   Team and channel metadata
-   Messages or threads
-   Meeting metadata or transcripts

If the Teams bot is configured and installed in the target Teams context, the agent can also send messages and reply in threads.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Dedicated app registration: use a dedicated app registration for Glean, separate from other integrations.
-   Least privilege: grant only the Microsoft Graph application permissions the agent needs.
-   Admin consent: review admin consent carefully before saving the credential.
-   Rotation: rotate the client secret regularly. Create a new secret, update the credential in Glean, then delete the old secret in Entra ID.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### 401 Unauthorized

The client ID, tenant ID, or client secret is wrong. Re-check and re-enter the credential values.

### 403 Forbidden on reads

The app lacks the required Graph permissions or admin consent. Add the required permissions and grant admin consent.

### The agent connects but cannot read the expected Teams data

The app has fewer permissions than the use case requires. Review the app's Graph permissions.

### Reads work, but sends or replies fail

Sends and replies use Bot Framework, not Microsoft Graph. Confirm that the Azure Bot has the correct messaging endpoint and Microsoft Teams channel, the Teams app is published, and the bot is installed in the target Teams context.

### The Microsoft Teams template isn't available

The template isn't enabled for your deployment. Contact your Glean representative to turn it on.

### I don't see the Service credentials tab

Agent Identity beta may not be enabled for your deployment, or your admin role may not have access to create service credentials.

### Microsoft Teams doesn't appear in Share → Publishing

Confirm that Agent Identity beta is enabled for your deployment. If your workspace uses eligibility requirements for Microsoft Teams publishing, make sure the agent meets them before publishing.

### The application dropdown is empty

Create the **Microsoft Teams App** service credential first in **Admin console → Tools → Service credentials**.

### The application appears unavailable or greyed out

The selected credential may already be linked to another agent, or it may not be available to your audience scope. Review the credential configuration and its audience settings.

### Agent Identity beta is enabled, but my older dedicated apps don't appear yet

This usually means automated migration has not run for your deployment yet. Your existing dedicated apps should continue to work. Wait for migration to complete before expecting them to appear in **Tools → Service credentials** or the Microsoft Teams publishing flow.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
-   [Glean in Microsoft Teams: Admin guide](/administration/platform/embedded-integrations/glean-in-teams/glean-in-microsoft-teams--admin-guide)
