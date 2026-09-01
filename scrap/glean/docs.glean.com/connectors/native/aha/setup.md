---
url: "https://docs.glean.com/connectors/native/aha/setup"
canonical: "https://docs.glean.com/connectors/native/aha/setup"
title: "Aha! setup"
description: "Configure the Glean Aha! connector, including requirements, API key generation, optional activity webhooks, and connector configuration in the Glean admin console."
fetched_at: "2026-09-01T13:29:21.688Z"
---
On this page

This page describes how to install and configure the Aha! connector. Setup takes place in both Aha! and the Glean admin console.

To set up the Aha! connector:

-   Confirm the [requirements](#requirements).
-   [Determine your Aha! instance name](#step-1-determine-your-aha-instance-name).
-   [Generate an Aha! API key](#step-2-generate-an-aha-api-key).
-   Optionally, [configure activity webhooks](#step-3-configure-activity-webhooks-optional).
-   [Add the connector in Glean](#step-4-add-the-connector-in-glean).

## Requirements[​](#requirements "Direct link to Requirements")

The Aha! connector is designed for Aha! cloud deployments and relies on the Aha! REST API and webhooks. Confirm the following before you begin so that content retrieval and permission mapping work correctly.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   An active Aha! cloud instance, for example `yourdomain.aha.io`.
-   Your instance **subdomain**, which is the hostname before `.aha.io`, and confirmation that your organization's **Aha! plan** includes **REST API** access. If you plan to use **activity webhooks**, confirm that your plan supports webhooks for your edition.
-   An Aha! user account with at least Viewer roles in all workspaces relevant for crawling.
-   Network access to the Aha! REST API endpoints.
-   A supported integration platform version within Glean.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   An Aha! API key (personal access token) tied to a user account with the required permissions.
-   The API key is generated in the Aha! web interface and entered during Glean connector setup. Store it securely.
-   For webhook functionality, Glean recommends an Aha! user with [Administrator and customization privileges](https://www.aha.io/support/roadmaps/account/billing-and-users/user-permissions#administrator-roles), though these privileges are not strictly required for basic content indexing. For more information, see [Enable the integration](https://support.aha.io/aha-roadmaps/integrations/aha-api/activity-webhooks-integration~7444657945207407505#enable-the-integration) in the Aha! documentation.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   Crawling and indexing require at minimum a Viewer role for all relevant workspaces or workspace lines.
-   Administrator rights are needed to set up activity webhooks covering all workspaces.
-   Only users with a Viewer or higher role have their associated content indexed and made accessible in Glean.
-   Permission propagation relies on the Aha! workspace (product) and product line hierarchy. Users may inherit access to descendant workspaces.

## Step 1: Determine your Aha! instance name[​](#step-1-determine-your-aha-instance-name "Direct link to Step 1: Determine your Aha! instance name")

Identify your instance name from your organization's Aha! URL. For example, if your URL is `https://glean.aha.io/`, your instance name is `glean`. You provide this value in the Glean admin console in step 4.

## Step 2: Generate an Aha! API key[​](#step-2-generate-an-aha-api-key "Direct link to Step 2: Generate an Aha! API key")

Glean uses personal API keys to authenticate with your Aha! instance.

1.  Generate an API key in the Aha! user interface.
2.  Copy the generated API token. You provide this value in the Glean admin console in step 4.

## Step 3: Configure activity webhooks (optional)[​](#step-3-configure-activity-webhooks-optional "Direct link to Step 3: Configure activity webhooks (optional)")

Activity webhooks allow Glean to capture updates in Aha! shortly after they happen.

Required privileges

Creating an activity webhook integration requires elevated administrative permissions in Aha!. Verify your access level before continuing.

1.  Follow the [Aha! documentation](https://www.aha.io/support/roadmaps/integrations/aha-api/activity-webhooks-integration#enable-the-integration) to enable the activity webhook integration.
    
2.  Copy the unique webhook URL generated for you in the Glean setup screen. It follows this format:
    
    `https://<your-domain>.glean.com/instance/AHA/events`
    
3.  Paste this value into the **Hook URL** field during the webhook configuration step in Aha!.
    

## Step 4: Add the connector in Glean[​](#step-4-add-the-connector-in-glean "Direct link to Step 4: Add the connector in Glean")

1.  In the **Glean admin console**, go to **Connectors** and select **Add connector**.
2.  Select **Aha!**.
3.  Enter a name for the connector.
4.  Paste the API key from step 2 into the **API token** field.
5.  Paste the instance name from step 1 into the **Aha instance name** field.
6.  Select **Save**.

## What happens next[​](#what-happens-next "Direct link to What happens next")

Glean begins an initial crawl and indexes all accessible ideas and features according to the permissions of the API key holder. Subsequent crawls fetch only content that changed. If you configured activity webhooks, webhook events keep the index up to date as content changes in Aha!.

Aha! API rate limits apply during crawls: up to 300 requests per minute and up to 20 requests per second per source IP address.

## See also[​](#see-also "Direct link to See also")

-   [Aha! overview](/connectors/native/aha/about)
