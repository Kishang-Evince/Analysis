---
url: "https://docs.glean.com/administration/tools/setup-tools/workday-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/workday-tools-setup"
title: "Workday tools setup"
description: "Enable Workday tools and configure OAuth authentication in Glean."
fetched_at: "2026-10-13T08:49:33.560Z"
---
On this page

Use Workday tools to let Glean Assistant and agents retrieve supported Workday information and submit time-off requests without leaving Glean.

With this setup, you can:

-   Enable Workday tools for a Workday connector instance
-   Configure OAuth authentication and the required Workday permissions
-   Decide which agents and Glean surfaces can use the tools

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before enabling Workday tools:

-   Configure the [Workday connector](/connectors/native/workday/) and verify that its people sync completes successfully.
-   Verify that each teammate who will use Workday tools resolves to an active Workday identity in Glean with a Workday worker ID. For instructions, see [Sync people data from Workday](/administration/identity/people-data/configuration/people-data-workday).
-   Make sure you can access the Glean **Admin console** and configure tools.
-   Ask a Workday administrator to register an OAuth application and configure the required permissions for your Workday tenant.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

1.  In Glean, go to **Admin console → Platform → Tools**.
2.  Click **Add**.
3.  From **Add pre-set tools**, select **Workday Tools** under **Tool templates**.
4.  In the **Configuration** tab, select the Workday connector instance to associate with the tools.
5.  Configure authentication using the steps below.

### Configure authentication[​](#configure-authentication "Direct link to Configure authentication")

Workday tools use **OAuth User** authentication. Each teammate must authorize Workday using their own Workday account before first use. Workday evaluates requests using the security context of the account used during authorization.

#### Step 1: Configure permissions for time-off tools[​](#step-1-configure-permissions-for-time-off-tools "Direct link to Step 1: Configure permissions for time-off tools")

Complete this step if you plan to enable **List Time Off Types** or **Request Time Off**.

Ask a Workday administrator to:

1.  Open **Edit Business Process Security Policy** for **Request Time Off**.
2.  Add **Employee as Self** to:
    -   the initiating-action permissions;
    -   the **Request Time Off (REST Service)** permissions.
3.  Confirm the other domain and business-process permissions Workday lists for the enabled time-off operations. Workday documents the eligible-absence-types operation under the **Request Leave of Absence** and **Request Time Off** business processes.
4.  Run **Activate Pending Security Policy Changes** and confirm the changes.

#### Step 2: Register an OAuth client in Workday[​](#step-2-register-an-oauth-client-in-workday "Direct link to Step 2: Register an OAuth client in Workday")

1.  In Glean, select **OAuth User** and copy the **Callback URL** displayed in the authentication section.
2.  Ask a Workday administrator to open **Register API Client** and create a client with:
    -   **Client Grant Type**: Authorization Code Grant
    -   **Access Token Type**: Bearer
    -   **Redirection URI**: The callback URL displayed in Glean
    -   **Scope (Functional Areas)**: The functional areas corresponding to the scope values displayed in Glean
3.  After creating the client, copy the client ID, client secret, Authorization Endpoint, and Token Endpoint exactly as Workday displays them. Paste those values into Glean; do not construct the endpoint URLs manually.

Glean currently requests the following Workday OAuth scopes. In **Register API Client**, Workday presents these scopes as functional areas:

| Tools | Corresponding Workday functional areas | OAuth scope values currently requested by Glean |
| --- | --- | --- |
| List Time Off Types and Request Time Off | Staffing; Time Off and Leave | `Staffing`, `Time_Off_and_Leave` |
| Goals, review, and feedback tools | Staffing; Performance Enablement | `Staffing`, `Performance_Enablement` |

These OAuth scopes do not establish the complete Workday permission set. The enabled operations can also depend on endpoint-specific domain security, business-process security, SOAP Integration Permissions, and contextual security.

Glean requests the OAuth scopes shown for the enabled tools. Those scopes do not by themselves grant access to each Workday operation. Workday also applies the tenant security of the account used during authorization. For each REST operation, confirm the domain Report/Task permissions, business-process permissions, or both that Workday lists. For Performance Management SOAP operations, confirm the applicable web-service Integration Permissions and contextual security. Validate the final permission set with the employee and manager accounts that will use the tools.

The callback URL is shared by tool configurations in the same Glean deployment. Do not reuse a URL from a different Glean deployment.

#### Step 3: Enter the OAuth configuration in Glean[​](#step-3-enter-the-oauth-configuration-in-glean "Direct link to Step 3: Enter the OAuth configuration in Glean")

Return to Glean and enter these values under **Authentication** for **OAuth User**:

-   **Client ID**: The client ID from Workday
-   **Client secret**: The client secret from Workday
-   **Authorization URL**: The Authorization Endpoint from Workday
-   **Token URL**: The Token Endpoint from Workday
-   **Scopes**: The scope values displayed in Glean for the tools you plan to enable

Use the exact endpoint values that Workday displays. Do not construct the endpoint URLs manually.

important

Use the scopes displayed in the Workday Tools configuration form as the source of truth when you register the Workday OAuth application. The scopes used by the native Workday connector are not sufficient for tools.

Click **Save**.

#### Step 4: Enable the tools[​](#step-4-enable-the-tools "Direct link to Step 4: Enable the tools")

Click **Edit settings** under **Enable tools** to make the tools available in **Chat**, **Agents**, or both. You can also restrict access to specific teammates, departments, or groups.

You can turn individual Workday tools on or off after setup. For more information, see [Per-tool controls](/administration/tools/managing-tools/per-tool-enable-disable), [Enable tools for Glean Assistant and agents](/administration/tools/managing-tools/tools-chat-vs-agents), and [Manage tool access](/administration/tools/managing-tools/tool-visibility-scoping).

## Configuration ownership[​](#configuration-ownership "Direct link to Configuration ownership")

| Configuration | Owner |
| --- | --- |
| OAuth application, Workday scopes, and Workday business-process permissions | Workday administrator |
| Workday connector and people-data setup in Glean | Glean administrator |
| Workday-side connector credentials, reports, and source permissions | Workday administrator or data owner |
| Workday tool configuration and access settings | Glean administrator |
| Direct-report mapping enablement in Glean | Glean Support |
| Manager relationship data in Workday | Workday administrator or data owner |
| OAuth authorization on first tool use | Each teammate |

Workday may display different task names or fields for your tenant. Confirm the values with your Workday administrator before saving the configuration.

## See also[​](#see-also "Direct link to See also")

-   Full list of available Workday tools and their references: [Workday tools](/tools/connector/workday)
-   [Workday connector setup](/connectors/native/workday/)
-   [Tools OAuth reference](/administration/tools/tools-oauth-reference)
-   [Troubleshooting tools authentication](/troubleshooting/tools-authentication)
