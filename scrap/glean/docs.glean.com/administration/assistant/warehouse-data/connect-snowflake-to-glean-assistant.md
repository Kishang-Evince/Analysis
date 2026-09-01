---
url: "https://docs.glean.com/administration/assistant/warehouse-data/connect-snowflake-to-glean-assistant"
canonical: "https://docs.glean.com/administration/assistant/warehouse-data/connect-snowflake-to-glean-assistant"
title: "Connect Snowflake to Glean"
description: "Set up Snowflake OAuth, roles, and the Snowflake tools so Glean can run read-only queries against your warehouse."
fetched_at: "2026-09-01T13:29:00.673Z"
---
On this page

Glean can query Snowflake in Glean using natural language, direct SQL, supported semantic views, and supported Cortex Agent workflows.

This integration gives users governed access to approved Snowflake resources in Glean while letting data teams control which datasets, semantic views, and Cortex Agents are available. Depending on the question and the resource used, results may appear as tables or as interactive charts and dashboards when supported.

After you enable Snowflake for Assistant, users can:

-   Query approved datasets with natural language.
-   Run read-only SQL queries when SQL tools are enabled.
-   Use approved semantic views and Cortex Agents that are available through the configured Snowflake role.
-   View results as tables or, when supported, interactive charts and dashboards.
-   Review citations that show which Snowflake resource the response used.

note

This setup uses Snowflake OAuth, so each user queries with their own Snowflake account and permissions. If not everyone in your organization has a Snowflake account, you can instead let agents query Snowflake through a shared [service credential](/administration/agent-identity/snowflake), which runs on an admin-scoped service identity rather than each user's account.

## Integrate Snowflake in Glean[​](#integrate-snowflake-in-glean "Direct link to Integrate Snowflake in Glean")

To securely integrate Snowflake with Glean, you must establish a connection using Snowflake OAuth and a least-privilege role. This ensures Glean can only access the specific data you authorize.

The setup is divided into three main phases:

1.  Configure Snowflake: Define the appropriate user roles, permissions, and network access within Snowflake.
2.  Set up authentication: Create the Snowflake OAuth security integration to handle the secure handshake.
3.  Activate Glean: Enable the Snowflake tools for Assistant and register your credentials in the **Admin console**.

### Before you begin[​](#before-you-begin "Direct link to Before you begin")

Ensure you have the following ready before starting the configuration:

-   You must have administrative privileges in both Glean and Snowflake.
-   If your Snowflake instance uses network policies, you must allowlist Glean's IP addresses. Contact your Glean account team to retrieve the specific IPs for your deployment.
-   Identify the specific databases, schemas, tables, semantic views, and Cortex Agents you want to make available in Glean agents and assistant.
-   Use least-privilege access when you configure Snowflake for Glean. Glean can only access the Snowflake resources granted to the configured role.

### Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

#### Step 1: Update your Snowflake network policy[​](#step-1-update-your-snowflake-network-policy "Direct link to Step 1: Update your Snowflake network policy")

If your Snowflake instance uses network policies, you must update them to allow connections from Glean. Without this, the integration will fail to handshake.

note

You must add IP addresses of Glean to your Snowflake allowlist. If you do not have these IPs, contact your Glean representative.

#### Step 2: Set up a Snowflake role[​](#step-2-set-up-a-snowflake-role "Direct link to Step 2: Set up a Snowflake role")

Glean requires a role to execute queries. You have three configuration options:

Use the Snowflake role that matches your rollout. You can restrict Glean to specific datasets, semantic views, or Cortex Agents by granting access only to those resources. If a Cortex Agent depends on additional semantic views, tables, stored procedures, or UDFs, grant only the minimum supporting access that agent needs.

##### Option 1: Create a new read-only role (Recommended)[​](#option-1-create-a-new-read-only-role-recommended "Direct link to Option 1: Create a new read-only role (Recommended)")

Create a dedicated role with granular permissions.

SQL

```
CREATE ROLE IF NOT EXISTS GLEAN_QUERY_SNOWFLAKE_ROLE;GRANT USAGE ON DATABASE <SET_DATABASE_NAME> TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;GRANT USAGE ON SCHEMA <SET_DATABASE_NAME>.<SET_SCHEMA_NAME> TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;GRANT SELECT ON ALL TABLES IN SCHEMA <SET_DATABASE_NAME>.<SET_SCHEMA_NAME> TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;-- Optional: Grant access to Snowflake CortexGRANT DATABASE ROLE SNOWFLAKE.CORTEX_USER TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;-- Assign the role to usersGRANT ROLE GLEAN_QUERY_SNOWFLAKE_ROLE TO USER <SET_USER_NAME>;
```

##### Option 2: Use an existing role[​](#option-2-use-an-existing-role "Direct link to Option 2: Use an existing role")

Pass your existing read-only role in the **Scopes** field during Step 4.

**Scope:** `refresh_token,session:role:YOUR_EXISTING_ROLE`

##### Option 3: Use the default primary role of the user[​](#option-3-use-the-default-primary-role-of-the-user "Direct link to Option 3: Use the default primary role of the user")

To use the own default Snowflake permissions of the user, use the following scope in Step 4.

**Scope:** `refresh_token`

#### Step 3: Create a Snowflake OAuth application[​](#step-3-create-a-snowflake-oauth-application "Direct link to Step 3: Create a Snowflake OAuth application")

Run the following in Snowflake to create the security integration:

SQL

```
CREATE SECURITY INTEGRATION GLEAN_QUERY_SNOWFLAKE_INTEGRATION  TYPE = OAUTH  ENABLED = TRUE  OAUTH_CLIENT = CUSTOM  OAUTH_CLIENT_TYPE = CONFIDENTIAL  OAUTH_REDIRECT_URI = '<Copy from Glean Snowflake setup page>'  OAUTH_ISSUE_REFRESH_TOKENS = TRUE;
```

note

To allow secondary roles, add `OAUTH_USE_SECONDARY_ROLES = IMPLICIT` to the command above.

**Retrieve credentials:**

SQL

```
SELECT SYSTEM$SHOW_OAUTH_CLIENT_SECRETS('GLEAN_QUERY_SNOWFLAKE_INTEGRATION');
```

#### Step 4: Create the Snowflake tools in Glean[​](#step-4-create-the-snowflake-tools-in-glean "Direct link to Step 4: Create the Snowflake tools in Glean")

1.  In Glean, go to **Settings → Platforms → Tools**.
2.  Click **Add** and select **Snowflake Tools**.
3.  Enter your **Account Identifier**, for example, `abc12345.us-east-1`.
4.  Enter the **Client ID** and **Secret** from Step 3.
5.  Provide the **Authorization** and **Token URLs** which you can find by running `DESC SECURITY INTEGRATION GLEAN_QUERY_SNOWFLAKE_INTEGRATION;` in Snowflake.
6.  (Optional) Set a **Default warehouse** for SQL and Cortex Analyst tools. Glean uses this warehouse when no warehouse is specified in a workflow step and the user has no default warehouse in Snowflake. The Snowflake role must have `USAGE` on the configured warehouse.

For detailed steps, see [Set up Snowflake tools](/administration/tools/setup-tools/snowflake-tools-setup).

#### Step 5: Enable Snowflake in Glean Assistant[​](#step-5-enable-snowflake-in-glean-assistant "Direct link to Step 5: Enable Snowflake in Glean Assistant")

After the tools are configured, you must enable the feature:

1.  Navigate to the **Admin console**.
2.  Under **Platform**, click **Tools** and search for *Snowflake*.
3.  Under **Configuration**, go to the **Enable tools** section.
4.  Click **Edit settings**.
5.  Click **Chat** and define visibility settings to choose who can use it in Glean Assistant and Glean Agents.

note

To use Snowflake resources in Assistant, enable tools to discover and run the relevant Snowflake datasets, semantic views, and Cortex Agents that are available through the configured Snowflake role.

#### Step 6: Test the integration[​](#step-6-test-the-integration "Direct link to Step 6: Test the integration")

Verify the setup by asking Glean questions about your data.

*Example prompts:*

-   Natural Language: "What was our pipeline by region last quarter?"
-   Direct SQL: "Run this SQL: `SELECT region, SUM(arr) FROM sales_summary GROUP BY region;`"

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Glean cannot reach Snowflake

Verify that Glean's IP addresses are added to your Snowflake Network Policy.

### Permission denied errors

Ensure the Snowflake role has USAGE rights on the Database/Schema and SELECT rights on the Tables.

### Invalid OAuth client

Double-check that the `OAUTH_REDIRECT_URI` in Snowflake exactly matches the URI provided in the Glean setup page.

### Feature not visible

Confirm that Snowflake is enabled for Assistant in the **Admin console** and that the required Snowflake connection, role permissions, and visibility settings are configured for the people who should use it.

## See also[​](#see-also "Direct link to See also")

-   [Snowflake data in Assistant](/user-guide/assistant/query-snowflake-data-in-glean-assistant)
-   [Snowflake tools](/tools/connector/snowflake/snowflake-index)
-   [Set up a Snowflake service credential](/administration/agent-identity/snowflake)
