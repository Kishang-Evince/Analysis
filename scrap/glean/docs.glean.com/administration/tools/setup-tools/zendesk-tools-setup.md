---
url: "https://docs.glean.com/administration/tools/setup-tools/zendesk-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/zendesk-tools-setup"
title: "Zendesk tools setup"
description: "Enable Zendesk tools and configure OAuth authentication in Glean."
fetched_at: "2026-09-01T13:29:15.613Z"
---
On this page

Use Zendesk tools to let Glean Assistant and agents add comments to Zendesk tickets without leaving Glean. Users can post public replies or internal notes on existing tickets directly from Glean, keeping support conversations and context in one place.

info

To connect the Zendesk MCP server to an agent using a shared service identity, see [Set up Zendesk MCP service credential](/administration/agent-identity/zendesk). This page documents the per-user OAuth setup for Zendesk Tools.

With this setup, you can:

-   Enable the Zendesk tools for a connector instance
-   Configure the supported authentication method for the tool you are using
-   Decide which agents and surfaces can use these tools

important

Glean tools respect native Zendesk permissions. Users can only add comments to tickets they are authorized to view in Zendesk.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before enabling Zendesk tools:

-   The Zendesk connector must be configured and successfully crawling content
-   You must be able to access the Glean **Admin console**
-   A Zendesk admin can create and authorize an OAuth client for your Zendesk instance

note

You do not need to create a custom OAuth client if you use Central authentication. A custom OAuth client is required only when you set up **Custom authentication**.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

1.  In Glean, go to **Admin console → Platform → Tools**.
2.  Click **Add**.
3.  From **Add pre-set tools**, select **Zendesk tools** under **Tool templates**.
4.  In the **Configuration** tab:
    1.  Add the **Instance Name**.
    2.  Select the connected **Connector Instance** to link this tool to your Zendesk instance.
    3.  Configure authentication using the tabs below, based on your requirements.

### Configure authentication[​](#configure-authentication "Direct link to Configure authentication")

Zendesk tools support **Central** and **Custom** authentication.

-   Central authentication (Recommended)
-   Custom authentication

Use this option to use the default OAuth app already configured for you. This is the quickest way to start using Zendesk tools.

1.  Select **Central** under the **Authenticate** section.
2.  Click **Save**.
3.  Click **Edit settings** under the **Enable Tools** section to make tools visible for all or some users within Glean and agents.

note

End users are prompted to connect their Zendesk account the first time they run a tool, and tokens are managed centrally afterward.

Use this option if you require a customer-owned Zendesk OAuth client.

#### Step 1: Create a new OAuth client in Zendesk[​](#step-1-create-a-new-oauth-client-in-zendesk "Direct link to Step 1: Create a new OAuth client in Zendesk")

1.  Navigate to your Zendesk Admin Center.
2.  Go to **Apps and integrations → APIs → Zendesk API**.
3.  Click the **OAuth Clients** tab, then click **Add OAuth Client**.
4.  Fill in the following details:
    -   **Client Name**: A descriptive name, for example, *Glean Tools*
    -   **Description**: For example, *OAuth client for Glean integration*
    -   **Company**: Your company name
    -   **Logo URL**: Optional
5.  Click **Save** to create the OAuth client.

#### Step 2: Copy the client credentials[​](#step-2-copy-the-client-credentials "Direct link to Step 2: Copy the client credentials")

1.  Copy the **Client ID** (also called Unique Identifier).
2.  Copy the **Client Secret**. Store it securely — Zendesk shows it only once.

#### Step 3: Enter credentials in Glean and generate the callback URL[​](#step-3-enter-credentials-in-glean-and-generate-the-callback-url "Direct link to Step 3: Enter credentials in Glean and generate the callback URL")

1.  In Glean, on the tool's **Configuration** page, select **Custom** under the **Authenticate** section.
2.  Paste the **Client ID** and **Client Secret** into the matching fields.
3.  Click **Save**. Glean generates a **Callback URL** at the bottom of the **Authenticate** section. Copy it.

#### Step 4: Add the callback URL to your OAuth client[​](#step-4-add-the-callback-url-to-your-oauth-client "Direct link to Step 4: Add the callback URL to your OAuth client")

1.  Return to your Zendesk OAuth client settings and edit the client you created.
2.  Paste the **Callback URL** from Glean into the **Redirect URLs** field.
3.  Save your changes.

#### Step 5: Enable the tools[​](#step-5-enable-the-tools "Direct link to Step 5: Enable the tools")

Click **Edit settings** under the **Enable Tools** section to make tools visible for all or some users within Glean and agents.

info

Zendesk access tokens are long-lived, so teammates do not need to reconnect Zendesk tools daily. If you see repeated re-authentication prompts, see [Troubleshooting tools authentication](/troubleshooting/tools-authentication#zendesk).

## See also[​](#see-also "Direct link to See also")

-   Full list of available Zendesk tools and their references: [Zendesk tools](/tools/connector/zendesk)
-   Troubleshoot authentication: [Troubleshooting tools authentication](/troubleshooting/tools-authentication#zendesk)
-   How the review flow works for write tools: [Human-in-the-loop experience for tools](/tools/human-in-the-loop-experience-for-tools)
