---
url: "https://docs.glean.com/connectors/native/netsuite/mcp"
canonical: "https://docs.glean.com/connectors/native/netsuite/mcp"
title: "NetSuite MCP"
description: "Set up NetSuite MCP to give users live access to NetSuite tools from Glean."
fetched_at: "2026-09-01T13:29:35.442Z"
---
On this page

NetSuite MCP connects Glean to NetSuite's MCP server, giving users live access to NetSuite tools. Unlike the [NetSuite search integration](/connectors/native/netsuite/connector), which indexes records into Glean search, NetSuite MCP provides real-time access at request time using each user's own NetSuite credentials and role.

Use NetSuite MCP when:

-   You want live NetSuite tool access from Glean. MCP-backed tools let users invoke NetSuite operations directly from Glean instead of relying only on indexed content.
-   You want per-user authorization. Each user authorizes with their own NetSuite credentials and role, so access reflects individual permissions.
-   You want users to access current NetSuite data in real time through Glean.
-   You want to reuse NetSuite tools inside Glean Assistant and Agents as MCP-backed tools, with centralized admin control over which tools are available.

info

Need searchable NetSuite records in Glean? Set up [NetSuite search integration](/connectors/native/netsuite/connector) too. We strongly recommend enabling both integrations.

## How it works[​](#how-it-works "Direct link to How it works")

NetSuite MCP uses the NetSuite AI Connector Service with a streamable HTTP transport. When a user runs a NetSuite tool from Glean, the request goes directly to NetSuite's MCP server and returns live data. Results reflect the current state of your NetSuite environment and are scoped to the permissions of the user's assigned NetSuite role.

## Requirements[​](#requirements "Direct link to Requirements")

### NetSuite requirements[​](#netsuite-requirements "Direct link to NetSuite requirements")

-   An active NetSuite account with the following features enabled:
    -   Server SuiteScript
    -   OAuth 2.0
    -   REST Web Services
-   Access to the SuiteApp Marketplace to install the MCP Standard Tools SuiteApp.
-   A NetSuite administrator to complete the setup steps below.

### Glean requirements[​](#glean-requirements "Direct link to Glean requirements")

-   Access to the Glean admin console with permission to configure MCP connections.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

A NetSuite administrator completes steps 1 through 5 in NetSuite. A Glean administrator completes steps 6 and 7 in Glean.

### Step 1: Enable required NetSuite features[​](#step-1-enable-required-netsuite-features "Direct link to Step 1: Enable required NetSuite features")

1.  In NetSuite, go to **Setup > Company > Enable Features**.
2.  On the **SuiteCloud** tab, confirm the following features are enabled:
    -   **Server SuiteScript**
    -   **OAuth 2.0**
    -   **REST Web Services**

See [Required Features and Permissions](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714080625.html) in the NetSuite documentation.

### Step 2: Install the MCP Standard Tools SuiteApp[​](#step-2-install-the-mcp-standard-tools-suiteapp "Direct link to Step 2: Install the MCP Standard Tools SuiteApp")

1.  Go to **Customization > SuiteCloud Development > SuiteApp Marketplace** (or search for **SuiteApp Marketplace** in the global search).
2.  Search for **MCP Standard Tools**.
3.  Install the SuiteApp and wait for the installation to complete.

See [Installing the MCP Standard Tools SuiteApp](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_0902023450.html) in the NetSuite documentation.

### Step 3: Create or update a non-admin role for MCP[​](#step-3-create-or-update-a-non-admin-role-for-mcp "Direct link to Step 3: Create or update a non-admin role for MCP")

Create a new role or add the required MCP permissions to an existing non-admin role. Oracle requires that the role is not the Administrator role or any role with full permissions to access NetSuite features.

1.  Go to **Setup > Users/Roles > Manage Roles**.
2.  Create a new role or edit an existing non-admin role.
3.  Under **Permissions > Setup**, add the following permissions:
    -   **MCP Server Connection** (required for MCP access)
    -   **Log in using OAuth 2.0 Access Tokens** (required for user authorization)
    -   **REST Web Services** (required only if MCP tools will create or update records)
4.  Save the role.
5.  If you created a new role, assign it to the NetSuite users who will authorize the connection. Skip this step if you added MCP permissions to a role those users already have.

See [Required Features and Permissions](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714080625.html) and [Assign Users to OAuth 2.0 Roles](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_157771650112.html) in the NetSuite documentation.

info

Use a **non-admin** role for MCP. Admin roles have broader access than most users need for tool-based workflows. A dedicated non-admin role lets you control exactly which permissions MCP users have.

warning

The role configured here is the role used by the admin who authorizes the MCP connection during setup. If this role has only the minimum MCP permissions and no access to the NetSuite data or actions that the admin needs, the admin will be able to connect but will not be able to use the NetSuite MCP server meaningfully. Grant this role access to the NetSuite records and actions that the admin is expected to use through MCP.

### Step 4: Create the OAuth 2.0 integration record[​](#step-4-create-the-oauth-20-integration-record "Direct link to Step 4: Create the OAuth 2.0 integration record")

1.  Go to **Setup > Integration > Manage Integrations > New**.
2.  Configure the integration with the following settings:
    -   **Name:** a descriptive name (for example, `Glean MCP Integration`)
    -   **Authorization Code Grant:** enabled
    -   **Public Client:** enabled
    -   **Scope:** select **NetSuite AI Connector Service OAuth 2.0**
    -   **Callback URL:** paste the redirect URI from the Glean admin console (you will find this in the MCP connection setup screen in Glean). The redirect URI must start with `https://`.
    -   **Token-based Authentication:** leave disabled
    -   **Client Credentials Grant:** leave disabled
    -   Do not enable other scopes (RESTlets, REST Web Services, SuiteAnalytics Connect) on this record
3.  Save the integration.
4.  Copy the **Client ID** and **Client Secret** immediately. These credentials are only displayed once upon saving.

See [Create Integration Records for Applications to Use OAuth 2.0](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_157771733782.html) in the NetSuite documentation.

warning

The **Callback URL** must exactly match the redirect URI shown in Glean — including scheme, host, path, and trailing slash. Even a trailing-slash mismatch causes an `Invalid login attempt` error when users try to authorize.

### Step 5: Confirm the integration record is enabled[​](#step-5-confirm-the-integration-record-is-enabled "Direct link to Step 5: Confirm the integration record is enabled")

1.  Go to **Setup > Integration > Manage Integrations**.
2.  Open the integration record you just created.
3.  If the record was auto-created and shows a pending state, enable it manually.

See [Connect to the NetSuite AI Connector Service](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714082142.html) in the NetSuite documentation.

### Step 6: Complete the connection in Glean[​](#step-6-complete-the-connection-in-glean "Direct link to Step 6: Complete the connection in Glean")

1.  In the **Glean admin console**, go to the MCP connection setup for NetSuite.
2.  Enter the following:
    -   **Account ID:** Your NetSuite account ID (for example, `12345` for production or `12345-sb1` for sandbox — retrieve this from your NetSuite URL)
    -   **Client ID:** From [step 4](#step-4-create-the-oauth-20-integration-record)
    -   **Client Secret:** From [step 4](#step-4-create-the-oauth-20-integration-record)
3.  Before initiating, verify that the redirect URI saved on the NetSuite integration record matches the callback URL shown in Glean exactly.
4.  Initiate the connection.

### Step 7: Enable MCP tools for users[​](#step-7-enable-mcp-tools-for-users "Direct link to Step 7: Enable MCP tools for users")

After the connection is established, publish and enable the NetSuite tools that users or groups need to access from Glean. NetSuite MCP tools are NetSuite operations exposed through NetSuite's MCP server and made available in Glean for approved users or groups.

To enable access:

1.  Under **Enable tools**, click **Edit settings**.
2.  In the **Enable tools** screen, make the synced NetSuite tools visible for all or some teammates.
3.  In the **Chat** section, review the synced NetSuite tools.
4.  For each tool, use the **Access** field to add the departments or teammates who should be able to use it. For example, you can add an individual teammate by name, a department such as Product, or choose All teammates.
5.  If multiple tools should use the same access setting, click **Copy to all tools**.
6.  Click **Save**.

After tools are enabled, each user is prompted to authenticate the first time they use a NetSuite MCP tool.

Any NetSuite role that users authorize with must include the same settings as in [Step 3](#step-3-create-or-update-a-non-admin-role-for-mcp). These are **MCP Server Connection**, **Log in using OAuth 2.0 Access Tokens**, and **REST Web Services** if the role needs to create or update records through the SuiteApp tools.

See [Write tools](#write-tools) for how the create and update tools behave and how to keep NetSuite access read-only.

## Verify the connection[​](#verify-the-connection "Direct link to Verify the connection")

After setup, confirm that NetSuite MCP is working:

1.  As an end user with the MCP role assigned, connect to NetSuite MCP from Glean.
2.  Run a NetSuite tool from Glean and confirm that results reflect the user's NetSuite permissions.

## Write tools[​](#write-tools "Direct link to Write tools")

Most NetSuite MCP tools are read-only. Only **Create Record** and **Update Record** can write to NetSuite. To keep access read-only, leave both tools turned off.

-   **Admin-controlled**: You enable Create Record and Update Record in [Step 7](#step-7-enable-mcp-tools-for-users), alongside the other synced tools. To keep NetSuite access read-only, leave both off and enable only the read tools.
-   **Review before writing**: In interactive Glean web app sessions, the agent pauses at each write step and shows the planned change for approval before it writes anything to NetSuite. For how this behaves in background runs and Slack, see [Human-in-the-loop confirmations for write tools](/tools/human-in-the-loop-experience-for-tools).
-   **Permissions still apply**: A write succeeds only if the user's NetSuite role grants the matching record-type permission (Create or higher for that record type) plus REST Web Services. Each write runs under the user's own role, exactly as in NetSuite.

## Quick checklist[​](#quick-checklist "Direct link to Quick checklist")

-   [ ]  Enable Server SuiteScript, OAuth 2.0, and REST Web Services in NetSuite
-   [ ]  Install the MCP Standard Tools SuiteApp
-   [ ]  On a non-admin role (new or existing), grant MCP Server Connection and Log in using OAuth 2.0 Access Tokens permissions
-   [ ]  If you created a new role, assign it to the MCP users
-   [ ]  Create an OAuth 2.0 integration record with Authorization Code Grant, Public Client, and the AI Connector Service scope only
-   [ ]  Confirm the integration record is enabled
-   [ ]  Verify the redirect URI on NetSuite matches the callback URL in Glean exactly
-   [ ]  Enter account ID, client ID, and client secret in Glean and initiate connection
-   [ ]  Enable MCP tools for users

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Users see an 'Invalid login attempt' error

**Symptom:** Users see an `Invalid login attempt` error when trying to authorize.

**Cause:** The callback URL in the NetSuite integration record does not match the redirect URI in Glean.

**Fix:** In NetSuite, go to **Setup > Integration > Manage Integrations**, open the integration record, and verify that the **Callback URL** exactly matches the redirect URI shown in the Glean admin console — including scheme, host, path, and trailing slash. Update it if needed, then save and retry.

### Users get 'Access denied' when connecting

**Symptom:** Users receive an access denied error or cannot use MCP tools after authorizing.

**Cause:** The user's NetSuite role is missing required permissions, or the MCP Standard Tools SuiteApp is not installed, or the role does not have access to the SuiteApp folder in the NetSuite File Cabinet.

**Fix:**

1.  Confirm the MCP Standard Tools SuiteApp is installed (**Customization > SuiteCloud Development > Installed SuiteApps**).
2.  Confirm the user's role has access to the SuiteApp folder in the NetSuite File Cabinet.
3.  Verify the user's role includes **MCP Server Connection** and **Log in using OAuth 2.0 Access Tokens** permissions.
4.  If tools need to create or update records, confirm the role also includes **REST Web Services** permission.

See [Installing the MCP Standard Tools SuiteApp](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_0902023450.html) in the NetSuite documentation.

### MCP tool calls fail or return errors

To troubleshoot individual MCP tool calls, check the **Execution Log** on the NetSuite integration record:

1.  Go to **Setup > Integration > Manage Integrations**.
2.  Open the integration record created for Glean MCP.
3.  Review the **Execution Log** tab for error details on specific tool calls.
