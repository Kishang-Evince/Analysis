---
url: "https://docs.glean.com/administration/tools/setup-tools/jira-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/jira-tools-setup"
title: "Jira tools and extension tools setup"
description: "Enable Jira Tools and Jira Extension Tools and configure OAuth authentication in Glean."
fetched_at: "2026-09-01T13:29:15.526Z"
---
On this page

Use Jira tools to let Glean Assistant and agents create, search, and update Jira and Jira Service Management items without leaving Glean.

With this setup, you can:

-   Enable the Jira Tools or Jira Extension Tools for a connector instance.
-   Configure the supported authentication method for the tool you are using.
-   Decide which agents and surfaces can use these tools.

important

Glean tools respect native Jira permissions. Ensure each teammate's Jira account grants the API access required for the tools you expose.

Glean offers two Jira tool sets. Enable the one that matches your deployment and formatting needs:

-   Jira Tools: core tools for Jira and Jira Service Management, including Create Jira Service Management Request, Jira Search, Create Jira Comment, and Create Jira Issue. These tools use plain text.
-   Jira Extension Tools (Beta): a broader set of tools, including Get issue, Edit issue, Get transitions, Get project, Get fields, and Add comment. These tools use rich text in Atlassian Document Format and support native `@mention` functionality.

Limitation

Both tool sets support standard Jira Cloud instances only. Jira Server, Jira Data Center, and Atlassian Government Cloud connectors can index content for search, but they don't appear as connector options when you configure Jira tools.

tip

For the most consistent user experience, use only one Jira tool set per Jira Cloud connector. Only enable both if you are actively migrating or require capabilities from each tool set. For more information, see [Jira tools: Extension or legacy?](/administration/tools/managing-tools/jira-extension-tools-adf).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before enabling Jira tools:

-   Configure a standard Jira Cloud connector and confirm that it is successfully crawling content.
-   You must be able to access the Glean **Admin console**.
-   A Jira (Atlassian) site admin can authorize the OAuth app for your Atlassian site.

note

You do not need to create a custom Atlassian OAuth app if you use Central authentication. A custom app is required only when you set up **Custom authentication**.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

1.  In Glean, go to **Admin Console → Platform → Tools**.
2.  Click **Add**.
3.  From **Add pre-set tools**, select **Jira Tools** or **Jira Extension Tools** under **Tool templates**.
4.  In the **Configuration** tab:
    1.  Add the **Instance Name**.
    2.  Select the connected **Connector Instance** to link this tool to your Jira instance. If you manage multiple Jira sites, create a separate tool instance per site and name them clearly, for example, *Jira Tools — Engineering*, *Jira Tools — Support* so each binds to its own connector instance.
    3.  Configure authentication using the tabs below, based on your requirements.

### Configure authentication[​](#configure-authentication "Direct link to Configure authentication")

Both Jira Tools and Jira Extension Tools support **Central** and **Custom** authentication.

-   Central authentication (Recommended)
-   Custom authentication

Use this option if central apps are available for Jira in your Glean environment.

1.  Select **Central** under the **Authenticate** section.
2.  Click **Save**.
3.  Click **Edit settings** under the **Enable Tools** section to make tools visible for all or some users within Glean and agents.

note

End users are prompted to connect their Jira account the first time they run a tool, and tokens are managed centrally afterward.

Use this option if you require a customer-owned Atlassian OAuth app.

#### Step 1: Create a new OAuth 2.0 app[​](#step-1-create-a-new-oauth-20-app "Direct link to Step 1: Create a new OAuth 2.0 app")

1.  Go to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps) and create a new app of type **OAuth 2.0 integration**.
2.  Follow the prompts to name the app and add a description and logo. Indicate that Glean will access this data, for example, *Glean Jira app*.

#### Step 2: Set permissions[​](#step-2-set-permissions "Direct link to Step 2: Set permissions")

1.  Go to the **Permissions** tab and click **Add** next to **Jira API**.
2.  Add the scopes that Glean lists in the **Scopes** field on the tool's **Configuration** page. Glean pre-fills the required scopes for the tool set you selected, and shows a reminder to *add the highlighted scopes to the OAuth app to enable all the actions*.
    -   **Jira Tools** use Jira platform and Jira Service Management scopes, for example, `read:jira-user`, `write:jira-work`, `read:servicedesk-request`, `write:servicedesk-request`.
    -   **Jira Extension Tools** use a broader set of granular Jira scopes, for example, `read:jira-user`, `read:user:jira`, `read:group:jira`, `read:application-role:jira`.

#### Step 3: Update distribution settings[​](#step-3-update-distribution-settings "Direct link to Step 3: Update distribution settings")

1.  Go to the **Distribution** tab and click **Edit**.
2.  Set the **Distribution Status** to **Sharing**.
3.  Add a privacy policy URL. You can use [https://www.glean.com/privacy-policy](https://www.glean.com/privacy-policy).
4.  Click **Save changes**.

#### Step 4: Enter credentials in Glean and generate the callback URL[​](#step-4-enter-credentials-in-glean-and-generate-the-callback-url "Direct link to Step 4: Enter credentials in Glean and generate the callback URL")

1.  In Glean, on the tool's **Configuration** page, select **Custom** under the **Authenticate** section.
2.  Glean pre-fills the **Authorization URL** (`https://auth.atlassian.com/authorize?audience=api.atlassian.net&prompt=consent`) and **Token URL** (`https://auth.atlassian.com/oauth/token`). Leave these as the defaults.
3.  From the **Settings** tab of your Atlassian app, copy the **Client ID** and **Client Secret** into the matching fields in Glean.
4.  Click **Save**. Glean generates a **Callback URL** at the bottom of the **Authenticate** section. Copy it.

#### Step 5: Add the callback URL to your OAuth app[​](#step-5-add-the-callback-url-to-your-oauth-app "Direct link to Step 5: Add the callback URL to your OAuth app")

1.  In the Atlassian Developer Console, go to the **Authorization** tab of your app.
2.  Paste the **Callback URL** from Glean.
3.  Save your OAuth app.

#### Step 6: Enable the tools[​](#step-6-enable-the-tools "Direct link to Step 6: Enable the tools")

Click **Edit settings** under the **Enable Tools** section to make tools visible for all or some users within Glean Chat and Agents.

Important

The first time Jira tools are used at your organization, a Jira site admin must authorize the OAuth app for your Atlassian site. Until this is done, other teammates see authorization errors when they click **Connect**. For more details, see [Troubleshooting tools authentication](/troubleshooting/tools-authentication#jira).

note

The **Create Jira Service Management Request** tool auto-populates only the Service Desk, Request Type, Summary, and Description fields. The fields an LLM can reliably fill from the query of a user. Users complete any other required fields before submitting. Glean selects the Service Desk and Request Type by matching the query of the user against the request type descriptions in Jira Service Management, so clear descriptions in JSM improve mapping accuracy. This tool creates tickets in Jira Service Management on Jira Cloud only.

## See also[​](#see-also "Direct link to See also")

-   Compare the available Jira tool sets: [Jira tools: Extension or legacy?](/administration/tools/managing-tools/jira-extension-tools-adf)
-   Full list of available Jira tools and their references: [Jira tools](/tools/connector/jira)
-   Publish an agent that uses Jira tools to Slack: [Publishing to Slack](/agents/concepts/publish-slack)
-   Troubleshoot authentication: [Troubleshooting tools authentication](/troubleshooting/tools-authentication#jira)
-   How the review flow works for write tools: [Human-in-the-loop experience for tools](/tools/human-in-the-loop-experience-for-tools)
