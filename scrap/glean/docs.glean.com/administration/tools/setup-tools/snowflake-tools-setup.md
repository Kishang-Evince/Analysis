---
url: "https://docs.glean.com/administration/tools/setup-tools/snowflake-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/snowflake-tools-setup"
title: "Snowflake tools setup"
description: "The Snowflake tools contain the following tools:"
fetched_at: "2026-09-01T13:29:15.439Z"
---
On this page

The Snowflake tools contain the following tools:

-   Search Snowflake with SQL
-   Search Snowflake with Cortex
-   Snowflake Cortex agent

note

Snowflake can be configured for both Glean Agents and Glean Assistant. For Assistant-specific setup and usage, see:

-   [Connect Snowflake to Glean](/administration/assistant/warehouse-data/connect-snowflake-to-glean-assistant)
-   [Query Snowflake data in Glean](/user-guide/assistant/query-snowflake-data-in-glean-assistant)

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Use the following instructions for Snowflake tools setup, including OAuth configuration and permissions.

### Update Snowflake network policy[​](#update-snowflake-network-policy "Direct link to Update Snowflake network policy")

If your Snowflake instance has [network policies](https://docs.snowflake.com/en/user-guide/network-policies) configured, you will need to update them to allow connections from Glean. Without this configuration, the tools will not work.

note

If your Snowflake instance uses [network policies](https://docs.snowflake.com/en/user-guide/network-policies), you must add Glean to your allowlist to prevent connection failures. Contact your Glean representative to get the required IP addresses.

### Set up a role to use[​](#set-up-a-role-to-use "Direct link to Set up a role to use")

note

Use least-privilege access when you configure the role.

You can restrict Glean to specific datasets, semantic views, or Cortex Agents by granting access only to those resources and the underlying objects they require.

Use the Snowflake role that matches your rollout. You can restrict Glean to specific datasets, semantic views, or Cortex Agents by granting access only to those resources. If a Cortex Agent depends on additional semantic views, tables, stored procedures, or UDFs, grant only the minimum supporting access that agent needs.

You have three configuration options:

#### Option 1: Create a new Snowflake role with read-only access[​](#option-1-create-a-new-snowflake-role-with-read-only-access "Direct link to Option 1: Create a new Snowflake role with read-only access")

A role is basically a group that grants specific permissions on certain resources. You may grant a role to a user or to another role (nested roles).

First, we will create a new role called ***GLEAN\_QUERY\_SNOWFLAKE\_ROLE***. To do this, run the following queries with the ACCOUNTADMIN role or any role that can create roles and grant access to resources such as tables and Cortex:

```
CREATE ROLE IF NOT EXISTS GLEAN_QUERY_SNOWFLAKE_ROLE;
```

Then, Glean will grant permissions to the required tables and access to Cortex. Here are some templated commands that you can use:

```
-- Grant usage to a databaseGRANT USAGE ON DATABASE <SET_DATABASE_NAME> TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;-- Grant usage to a schemaGRANT USAGE ON SCHEMA <SET_DATABASE_NAME>.<SET_SCHEMA_NAME> TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;-- Grant read access for a tableGRANT SELECT ON TABLE <SET_DATABASE_NAME>.<SET_SCHEMA_NAME>.<SET_TABLE_NAME> to ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;-- Grant read access for all tables in a schemaGRANT SELECT ON ALL TABLES IN SCHEMA <SET_DATABASE_NAME>.<SET_SCHEMA_NAME> TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;-- Grant access to Cortex.GRANT DATABASE ROLE SNOWFLAKE.CORTEX_USER TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;-- (Cortex Agent only) Grant the Cortex Agent user role.GRANT DATABASE ROLE SNOWFLAKE.CORTEX_AGENT_USER TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;-- (Cortex Agent only) Grant usage on the database, schema, and agent object.GRANT USAGE ON DATABASE <AGENT_DATABASE> TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;GRANT USAGE ON SCHEMA <AGENT_DATABASE>.<AGENT_SCHEMA> TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;GRANT USAGE ON CORTEX AGENT <AGENT_DATABASE>.<AGENT_SCHEMA>.<AGENT_NAME> TO ROLE GLEAN_QUERY_SNOWFLAKE_ROLE;
```

Grant the role to specific users or roles:

```
-- Grant role access to a user.GRANT ROLE GLEAN_QUERY_SNOWFLAKE_ROLE TO USER <SET_USER_NAME>;-- Grant role access to another role. This will apply to all users who have the role.GRANT ROLE GLEAN_QUERY_SNOWFLAKE_ROLE TO ROLE <SET_ROLE_NAME>;
```

You should also be able to revoke the roles you just granted. See [Snowflake documentation](https://docs.snowflake.com/en/sql-reference/sql/revoke-role).

#### Option 2: Use an existing Snowflake role with read-only access[​](#option-2-use-an-existing-snowflake-role-with-read-only-access "Direct link to Option 2: Use an existing Snowflake role with read-only access")

You can also use an existing role in the Scopes field when setting up your Tools. The tool would use the access that the specified role has on your Snowflake instance. For example, your Scopes field could look like:

```
refresh_token,session:role:GLEAN_YOUR_EXISTING_ROLE
```

#### Option 3: Use default user primary role[​](#option-3-use-default-user-primary-role "Direct link to Option 3: Use default user primary role")

To use the default primary Snowflake role assigned to the authenticated user, set the Scopes field to just `refresh_token`.

### Create a Snowflake OAuth application[​](#create-a-snowflake-oauth-application "Direct link to Create a Snowflake OAuth application")

Use the [CREATE SECURITY INTEGRATION](https://docs.snowflake.com/en/sql-reference/sql/create-security-integration-oauth-snowflake) command to create the OAuth application. Use the ACCOUNTADMIN or any role that has permission to create a security integration:

```
-- Create the OAuth applicationCREATE SECURITY INTEGRATION GLEAN_QUERY_SNOWFLAKE_INTEGRATION  TYPE = OAUTH  ENABLED = TRUE  OAUTH_CLIENT = CUSTOM  OAUTH_CLIENT_TYPE = CONFIDENTIAL  OAUTH_REDIRECT_URI = '<copy from Glean Snowflake tools setup page>' -- Copy the callback/redirect URL from the Glean Snowflake tools setup page  OAUTH_ISSUE_REFRESH_TOKENS = TRUE;-- Retrieve the client credentials and secret, use this to create the tools in the next step.SELECT SYSTEM$SHOW_OAUTH_CLIENT_SECRETS('GLEAN_QUERY_SNOWFLAKE_INTEGRATION');
```

note

**Using secondary roles**: If you want users to also leverage their default secondary roles, you can configure the security integration with `OAUTH_USE_SECONDARY_ROLES = IMPLICIT` during setup. This allows the tool to utilize multiple roles that have been granted to the user.

### Create Snowflake tools[​](#create-snowflake-tools "Direct link to Create Snowflake tools")

We will now set up the Snowflake tools:

1.  Open Glean Settings page
2.  Go to Platforms > Tools
3.  Click on Add button for creating a new tool
4.  Click on the Snowflake Tools box
5.  Populate the Configuration section
    1.  Set the [account identifier](https://docs.snowflake.com/en/user-guide/admin-account-identifier) field in the configuration. You may set it to the account identifier or account locator. This information can be found by navigating to the account details: ![](/assets/images/image3-06af28f52165baf4bc736f2b19af873d.png) ![](/assets/images/image2-36a98f371b91bb1866be0068b16a824b.png)
        
        The **accountIdentifier** is the part before `.snowflakecomputing.com` in your Snowflake URL. For example, if your URL is `https://abc12345.us-east-1.snowflakecomputing.com`, the account identifier is `abc12345.us-east-1`.
        
    2.  For the **Authorization url** and **Token url**, run the following command in Snowflake to retrieve these values:
        
        ```
        DESC SECURITY INTEGRATION REPLACE_WITH_YOUR_OAUTH_SECURITY_INTEGRATION_NAME;
        ```
        
        Look for the `OAUTH_AUTHORIZATION_ENDPOINT` and `OAUTH_TOKEN_ENDPOINT` fields in the response: ![](/assets/images/image5-18523318deaab8abf0f2a242dcd6e641.png)
        
    3.  Set the OAuth client id and client secret obtained from the previous step.
        
6.  Save the tool. ![](/assets/images/image6-bf17c32d76e8c7d5133dbf13f8a69a15.png)

Setup is now complete. Refer to the [end user documentation](/tools/connector/snowflake/snowflake-index) on how to test this tools in the agent builder.
