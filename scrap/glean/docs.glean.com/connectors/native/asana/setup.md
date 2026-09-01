---
url: "https://docs.glean.com/connectors/native/asana/setup"
canonical: "https://docs.glean.com/connectors/native/asana/setup"
title: "Asana setup"
description: "Generate an Asana access token, determine your workspace domain name, and add the Asana connector in the Glean Admin Console."
fetched_at: "2026-09-01T13:29:22.309Z"
---
On this page

This page describes how to install and configure the Asana connector. Setup takes place in both Asana and the Glean Admin Console.

To set up the Asana connector:

-   Confirm the [requirements](#requirements) and [prerequisites](#prerequisites).
-   Generate an [access token](#step-1-generate-an-access-token) in Asana.
-   Determine your Asana [domain name](#step-2-determine-your-domain-name).
-   Add the [connector in Glean](#step-3-add-the-asana-connector-in-glean) and start the first crawl.

## Requirements[​](#requirements "Direct link to Requirements")

To set up and operate the Asana connector, ensure that both technical and credentials requirements are met.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   Glean platform instance.
-   Access to your company’s Cloud Provider account.
-   Supported Asana plan. Enterprise edition is required for certain features and administrators must enable service accounts.
-   Web connectivity between Glean and Asana’s API endpoints.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   For Asana Enterprise accounts: You must generate a service account and provide full permissions, then obtain the associated access token.
-   For other Asana account types: Create a dedicated Asana administrator user, the recommended name is *Glean*, then generate a personal access token for this user.
-   The Asana domain is case-sensitive and must match your workspace configuration.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   Service accounts or admin tokens require full access permissions. Glean uses these to ensure comprehensive crawl and prevent interruptions due to future Asana product changes.
-   The required scopes for API tokens are those that permit read access to projects, tasks, users, teams, organizations, workspaces, and activity/events.
-   For successful incremental crawling, the token must have permission to receive webhook events.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Confirm you have Glean workspace admin rights.
-   Confirm you have Asana admin or service account credentials with required scopes.
-   Determine Asana workspace domain name (case-sensitive).
-   Optionally, prepare a list of projects to redlist.

Configuring the Asana connector is typically performed within the Admin Console. Many setup fields are pre-populated, with step-by-step validation on save.

## Step 1: Generate an access token[​](#step-1-generate-an-access-token "Direct link to Step 1: Generate an access token")

**For Asana Enterprise accounts:**

1.  Create a new service account and name it *Glean Service Account* or something similar using the instructions given in the [Asana service account documentation](https://help.asana.com/s/article/service-accounts?language=en_US).
2.  Make sure to select *Full permissions* when creating the service account to allow access to all data.
3.  Copy the access token listed.

**For other Asana account types:**

1.  Create a new Asana administrator account called *Glean* or something similar.
2.  Create a new personal access token for the *Glean* administrator using the instructions at this [Personal access tokens documentation](https://developers.asana.com/docs/personal-access-token).
3.  Copy the personal access token listed.

## Step 2: Determine your domain name[​](#step-2-determine-your-domain-name "Direct link to Step 2: Determine your domain name")

1.  While logged in to the admin account, visit this [URL](https://app.asana.com/api/1.0/workspaces?opt_pretty) to find out the workspace name.
2.  Copy the domain name. Note that the domain name is case sensitive.

## Step 3: Add the Asana connector in Glean[​](#step-3-add-the-asana-connector-in-glean "Direct link to Step 3: Add the Asana connector in Glean")

1.  In the Glean, go to the **Admin Console**, navigate to **Connectors** and select **Add Connector**.
2.  Choose **Asana** from the available connectors. If you cannot see this option, contact Glean support to enable it.
3.  Enter the Name, Access token and Asana Domain Name (Workspace Name).
4.  Click **Save**.

## Step 4: Schedule the first crawl[​](#step-4-schedule-the-first-crawl "Direct link to Step 4: Schedule the first crawl")

1.  Start the integration and monitor the initial crawl and webhook configuration.

## Step 5: Validate the crawl and permissions[​](#step-5-validate-the-crawl-and-permissions "Direct link to Step 5: Validate the crawl and permissions")

1.  After the crawl completes, verify that Asana documents and tasks appear in Glean search.

## See also[​](#see-also "Direct link to See also")

-   [Asana overview](/connectors/native/asana/about)
