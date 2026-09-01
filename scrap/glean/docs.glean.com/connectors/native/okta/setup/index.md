---
url: "https://docs.glean.com/connectors/native/okta/setup/"
canonical: "https://docs.glean.com/connectors/native/okta/setup/"
title: "Set up Okta people connector"
description: "Set up the Okta people connector using a temporary super admin API token. Glean creates the connector app automatically."
fetched_at: "2026-09-01T13:29:36.583Z"
---
On this page

The Okta people data connector crawls user profiles, apps, and activity from Okta into Glean. This setup uses a temporary super admin API token to let Glean automatically create the connector app in your Okta instance.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   An active Glean workspace with access to the connectors gallery.
-   Network access from Glean's infrastructure to the Okta APIs over HTTPS.
-   An Okta environment with user profiles already populated and in active use.
-   You are a Glean admin for your workspace and can access the Glean admin console.
-   You are an Okta super admin (or have equivalent privileges) to create applications and manage API scopes during initial setup.
-   SSO must be configured before setting up the people data connector.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

The connector uses a temporary super admin API token during initial setup. Glean uses the token to create the connector app and grant it the required scopes. The token should be deleted immediately after setup is complete.

### API scopes[​](#api-scopes "Direct link to API scopes")

The Glean Connector app requires the following Okta API scopes:

| Scope | Required | Description |
| --- | --- | --- |
| `okta.users.read` | Yes | Reads user profile information to create people data for Glean. |
| `okta.apps.read` | No | Reads Okta-managed apps to surface app search results and app-based permissions. |
| `okta.logs.read` | No | Reads system logs for user activity analytics and search personalization. |
| `okta.groups.read` | No | Reads native Okta groups and memberships for group-based role mapping. |

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Set up Okta app[​](#set-up-okta-app "Direct link to Set up Okta app")

1.  Sign in to Okta as a **super admin**. Note your Okta domain URL from the address bar (for example, `https://YourOktaSubdomain-admin.okta.com`). You will enter this in Glean in a later step.
    
2.  On the left nav panel, go to **Security** > **API** > **Tokens** and click **Create token**.
    
3.  Name the token **Glean**.
    
4.  Under **API calls made with this token must originate from**, select **Any IP**.
    
5.  Click **Create token**.
    
    note
    
    The API token is only used to create the connector app and grant it scopes. Delete the token after setup is complete.
    

### Set up Glean admin console[​](#set-up-glean-admin-console "Direct link to Set up Glean admin console")

1.  In the Glean admin console, go to **Settings** > **Connectors** > **Add connector**. Search for Okta in the search bar and choose **Okta**.
    
2.  Copy and paste the domain URL from Okta in the **Okta domain URL** field.
    
3.  Copy and paste the API token from Okta into the **API token** field.
    
4.  Click on **Create Connector App** to create the connector app.
    
5.  Once you have confirmed the app is created successfully, delete the API token created in the previous steps.
    

## Enable native groups for group-based role mapping[​](#enable-native-groups-for-group-based-role-mapping "Direct link to Enable native groups for group-based role mapping")

To use Okta groups as principals for Glean role mappings, enable native groups for the Okta connector and configure the native-groups identity crawl:

1.  Set `crawl.identity.enableNativeGroups` to lowercase `true`.
2.  Set `crawl.identity.nativeGroupsFullCrawlPeriodSecs` to a positive value in seconds, such as `3600` for an hourly crawl.
3.  Validate the connector, then run or wait for an identity crawl to complete. Native groups and memberships are crawled as part of the identity crawl.

These are connector configuration settings. If you don't see them in your environment, contact [Glean support](https://support.glean.com/hc/en-us/requests/new).

After the crawl completes, select **Okta** in **User group permissions**, and add a group-to-role mapping. The picker includes native `OktaGroup_*` groups. Legacy `App_*` pseudo-groups and other Okta group types aren't included.

If you encounter any configuration issues or require further assistance, contact [Glean support](https://support.glean.com/hc/en-us/requests/new).
