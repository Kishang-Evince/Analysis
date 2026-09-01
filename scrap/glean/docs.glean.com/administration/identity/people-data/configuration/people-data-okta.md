---
url: "https://docs.glean.com/administration/identity/people-data/configuration/people-data-okta"
canonical: "https://docs.glean.com/administration/identity/people-data/configuration/people-data-okta"
title: "Sync people data from Okta"
description: "Configure Okta as your people connector for Glean"
fetched_at: "2026-09-01T13:29:07.073Z"
---
On this page

Use this workflow to sync people data from Okta.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, make sure you have the following:

-   Super Admin access in Okta
-   Admin or Setup Admin access in Glean
-   The following user fields populated in Okta:
    -   First name
    -   Last name
    -   Email
    -   Title
    -   Department
    -   Manager (optional, but recommended if you want to build org charts and improve people data quality)

## Configure Okta as the people connector in Glean[​](#configure-okta-as-the-people-connector-in-glean "Direct link to Configure Okta as the people connector in Glean")

Complete the following steps to configure Okta as the people connector in Glean:

1.  [Add your Okta domain to Glean](#1-add-your-okta-domain-to-glean)
2.  [Create an API token in Okta](#2-create-an-api-token-in-okta)
3.  [Revoke the API token](#3-revoke-the-api-token)

### 1\. Add your Okta domain to Glean[​](#1-add-your-okta-domain-to-glean "Direct link to 1. Add your Okta domain to Glean")

1.  In Glean, navigate to **Admin console → Users & permissions → People data**.
2.  Select **Okta** as the people connector.
3.  Copy your Okta domain URL and paste it into the **Okta domain URL** field in Glean. For example, copy and paste `https://your-okta-domain.okta.com`.

See [Find your Okta domain](https://developer.okta.com/docs/guides/find-your-domain/main/) in the Okta documentation to learn how to find your domain.

### 2\. Create an API token in Okta[​](#2-create-an-api-token-in-okta "Direct link to 2. Create an API token in Okta")

1.  In Okta, navigate to **Security → API**.
2.  Click the **Tokens** tab.
3.  Click **Create token**.
4.  Enter a name for the token, such as `Glean People Data`.
5.  Click **Create token**.
6.  Copy the token value.
7.  In the Glean people data setup page for Okta, paste the Okta API token into the **API Token** field.
8.  Click **Create Connector App**.

Glean uses the API token to create a connector application in Okta and to grant the application the following required scopes:

-   `okta.users.read`
-   `okta.apps.read`
-   `okta.logs.read`
-   `okta.groups.read`

note

Glean requires the `okta.groups.read` scope to crawl groups and group memberships. This scope isn't required unless you use Okta group-based role mapping.

For more information on how to create an API token, see [Create an API token](https://help.okta.com/en-us/content/topics/security/api.htm?cshid=ext-create-api-token#create-okta-api-token) in the Okta documentation.

To learn about these scopes, see [OAuth 2.0 Scopes](https://developer.okta.com/docs/api/oauth2) in the Okta documentation.

### 3\. Revoke the API token[​](#3-revoke-the-api-token "Direct link to 3. Revoke the API token")

Glean only uses the API token to create a Glean application in Okta and to grant the application the required scopes. Revoke the token after you complete people data setup. The token is not required to crawl data.

For information on how to revoke an API token, see [Revoke a token](https://help.okta.com/en-us/content/topics/security/api.htm?cshid=ext-revoke-api-token#Revoke) in the Okta documentation.

### 4\. Schedule a crawl[​](#4-schedule-a-crawl "Direct link to 4. Schedule a crawl")

1.  After you create the connector app, select **Schedule a crawl**.
2.  Select **Enable crawl** and click **Save**.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If you encounter issues, see the following troubleshooting steps.

### Invalid API token error[​](#invalid-api-token-error "Direct link to Invalid API token error")

If you encounter an "Invalid API token" error, check that:

-   You copied the API token correctly without any extra spaces
-   The API token has not expired or been revoked before you created the people connector in Glean
-   You have the correct permissions in Okta to create API tokens

### Users are missing from Glean[​](#users-are-missing-from-glean "Direct link to Users are missing from Glean")

If you notice that users are missing from Glean, check that:

-   The required user fields are populated in Okta
-   The API token has the correct permissions
-   Your Okta domain is entered correctly in Glean
-   Users are active in Okta (inactive or suspended users are not synced)

### People data looks incomplete[​](#people-data-looks-incomplete "Direct link to People data looks incomplete")

If names, titles, departments, or managers are missing, review the corresponding fields in Okta and confirm they're populated for affected users. You may also need to adjust the field mappings in Glean.

## See also[​](#see-also "Direct link to See also")

-   [Sync people data](/get-started/setup/sync-people-data)
-   [Attribute mapping](/administration/identity/people-data/attribute-mapping)
-   [User aliases and identity stitching](/administration/identity/people-data/user-aliases)
-   [Difference between SSO and people data](/administration/identity/people-data/troubleshooting/sso-vs-people-data)
-   [Set up tokenless Okta people data sync](/administration/identity/people-data/configuration/okta-tokenless)
