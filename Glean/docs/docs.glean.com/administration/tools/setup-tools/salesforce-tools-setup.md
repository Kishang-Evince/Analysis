---
url: "https://docs.glean.com/administration/tools/setup-tools/salesforce-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/salesforce-tools-setup"
title: "Salesforce Tools and Extension Tools setup"
description: "Enable Salesforce Tools and Extension Tools, and configure OAuth authentication in Glean."
fetched_at: "2026-10-13T08:49:33.033Z"
---
On this page

Use Salesforce tools to let Glean Assistant and Agents search and update Salesforce data without leaving Glean.

**Salesforce tool setup depends on how and when your connector was deployed**

-   **A [Salesforce](https://docs.glean.com/connectors/native/salesforce/new-setup) connector deployed using the new setup flow on or after August 14, 2026:** Associated tools are enabled automatically during connector setup. No separate manual tool setup is required.
-   **A Salesforce connector deployed before August 14, 2026, or using the previous setup flow:** Follow the instructions below to deploy Salesforce tools manually.

With this setup, you can:

-   Enable the Salesforce Tools or Salesforce Extension Tools for a connector instance.
-   Configure the supported authentication method for the tool you are using.
-   Decide which agents and surfaces can use these tools.

important

Ensure that your Salesforce user permissions grant appropriate API access for the tools you intend to expose to Glean users. Glean tools strictly respect native Salesforce ACLs and data sharing rules.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before enabling Salesforce tools:

-   The Salesforce connector must be configured and successfully crawling content.
-   You must be able to access the Glean **Admin console**.

note

You do not need to create a Salesforce connected app if you use Central authentication. A Salesforce connected app is required only when you set up the **Salesforce Extension Tools** with **Custom authentication**.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

1.  In Glean, go to **Admin console → Platform → Tools**.
2.  Click **Add**.
3.  From **Add pre‑set tools**, select the Salesforce tool you want to configure under **Tool templates**.
4.  In the **Configuration** tab:
    -   Add the **Instance Name**.
    -   Select the connected **Connector Instance** to link this tool to your Salesforce instance.
    -   Configure authentication using the tabs below, based on your requirements.

### Configure authentication[​](#setting-up-the-salesforce-oauth-app "Direct link to Configure authentication")

Your authentication options depend on which tool you select:

-   Salesforce Tools: Supports **Central authentication** only.
-   Salesforce Extension Tools: Supports both **Central** and **Custom authentication**.

-   Central authentication (Recommended)
-   Custom authentication (Extension Tools only)

Use this option if central apps are available for Salesforce in your Glean environment.

1.  Select **Central** under the **Authenticate** section.
2.  Click **Save**.
3.  Click **Edit settings** under the **Enable Tools** section to make tools visible for all or some users within Glean Chat and Agents.

note

End users are prompted to connect their Salesforce account the first time they use a Salesforce tool, and tokens are managed centrally thereafter. When a user opens a chat-triggered agent with tools they haven't authorized, Glean shows a **Connect the following actions to run this agent** screen. They can authorize tools there. **Run agent** stays disabled until the user authorizes every tool listed on the screen.

Use this option only if you are using the **Salesforce Extension Tools** and are either *self‑hosted* or require a *customer‑owned* Salesforce OAuth app.

#### Create a new external client app[​](#create-a-new-external-client-app "Direct link to Create a new external client app")

1.  Navigate to [Salesforce](https://login.salesforce.com/) and sign in using your credentials.
2.  Click **Setup** (top right icon).
3.  Go to **App Manager** (search via Quick Find).
4.  Click **New External Client App**. The *External Client App Manager* page opens.
5.  Under **Basic information**, add the following mandatory details:
    -   **External Client App Name**: Name your app appropriately to indicate Glean access (for example, *Glean sales app*).
    -   **API Name**.
    -   **Contact Email**.
    -   **Distribution State**: Based on your requirements, select either **Local** or **Packaged**.
        -   **Local**: Use this if the app will only be used in the current Salesforce org. Local apps cannot be packaged or distributed to other orgs.
        -   **Packaged**: Use this if you plan to include the app in a second-generation (2GP) managed package and distribute it to other Salesforce orgs.

#### Enable OAuth settings[​](#enable-oauth-settings "Direct link to Enable OAuth settings")

1.  Select **Enable OAuth**.
2.  In the Glean **Admin console**, navigate to the Salesforce tools configuration page.
3.  Select **Custom** under the **Authenticate** section.
4.  Copy the generated **Callback URL**.
5.  In Salesforce, under **App Settings**, add the copied value as the **Callback URL**.
6.  Add the following **OAuth scopes**:
    -   `Manage user data via APIs (api)`
    -   `Perform requests at anytime (refresh_token, offline_access)`
    -   `Full access (full)` — required when setting up Custom authentication for the Salesforce Extension Tools.
7.  Based on your requirement, you can either enable or disable the following options:
    -   **Introspect all Tokens**: Allows the app to use the token introspection endpoint of Salesforce to validate and inspect access/refresh tokens across the org. Enable this if you plan to check token status through `/services/oauth2/introspect`.
    -   **Configure ID token**: Controls how Salesforce issues OpenID Connect ID tokens. If your integration uses the `openid` scope, enable this to configure ID token behavior; otherwise, leave it disabled.

#### Configure security settings[​](#configure-security-settings "Direct link to Configure security settings")

-   Uncheck **Require Proof Key for Code Exchange (PKCE) extension for Supported Authorization Flows** under **Security**.

#### Create the app[​](#create-the-app "Direct link to Create the app")

-   Click **Create** to instantiate the external client app.

#### Copy the Consumer Key and Consumer Secret[​](#copy-the-consumer-key-and-consumer-secret "Direct link to Copy the Consumer Key and Consumer Secret")

After creating the app, extract your credentials from the app details page:

1.  Under the **Settings** tab, navigate to **OAuth Settings**.
2.  Under **App Settings**, click **Consumer Key and Secret**.
3.  Verify your identity when prompted. Once verified, you will be redirected to the credentials page.
4.  Copy the **Consumer Key** and **Consumer Secret** and store them securely.

#### Add OAuth Policies[​](#add-oauth-policies "Direct link to Add OAuth Policies")

1.  Under **Apps**, go to **External Client Apps → External Client Apps Manager**.
2.  Locate your newly created app and click on it.
3.  Under **Policies**, click **Edit**.
4.  Go to **OAuth Policies** and set **Permitted Users** to **All users may self-authorize**.
5.  Click **Save**.

#### Input credentials in Glean Console[​](#input-credentials-in-glean-console "Direct link to Input credentials in Glean Console")

1.  Navigate back to the Salesforce tools configuration page on the Glean **Admin console**.
2.  Select **Custom** under the **Authenticate** section.
3.  Paste your copied **Client ID** (Consumer Key) and **Client secret** (Consumer Secret).
4.  Click **Save**.

#### Configure surface visibility[​](#configure-surface-visibility "Direct link to Configure surface visibility")

Click **Edit settings** under the **Enable Tools** section to make tools visible for all or some users within Glean Chat and Agents.

info

Write tools such as Update Opportunity use a review flow by default. Users must confirm proposed changes before Salesforce applies them. To allow specific write tools to run without confirmation, see [Inline execution of write tools](/tools/inline-execution-of-write-tools).

info

Salesforce tools use OAuth for each teammate, and are independent from the Salesforce connector used for search indexing. Connecting or disconnecting one does not affect the other. If a teammate revokes the Glean connected app in Salesforce, they need to re-authorize. When they open an agent, they can select **Connect** for Salesforce on the launch screen. **Run agent** stays disabled until they authorize every tool listed for that agent. For more information, see [Troubleshooting tools authentication](/troubleshooting/tools-authentication#salesforce).

## See also[​](#see-also "Direct link to See also")

-   [Set up Salesforce](https://docs.glean.com/connectors/native/salesforce/new-setup)
-   [Choose your Salesforce setup](https://docs.glean.com/connectors/native/salesforce/choose-your-setup)
-   End-user guide for updating opportunities using natural language: [Update Salesforce opportunities in Glean](/user-guide/assistant/update-salesforce-opportunities)
-   Full list of available Salesforce tools and their references: [Salesforce tools](/tools/connector/salesforce/sf-index)
-   How the review flow works for write tools: [Human-in-the-loop experience for tools](/tools/human-in-the-loop-experience-for-tools)
