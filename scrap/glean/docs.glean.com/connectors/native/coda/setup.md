---
url: "https://docs.glean.com/connectors/native/coda/setup"
canonical: "https://docs.glean.com/connectors/native/coda/setup"
title: "Coda setup"
description: "Configure the Glean Coda connector, including requirements, organization ID lookup, Admin API token creation, and connector setup in the Glean Admin console."
fetched_at: "2026-09-01T13:29:24.613Z"
---
On this page

You'll do the setup in two places: Coda to gather the required values and the **Glean Admin console** to save them.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   A Coda Enterprise subscription with Admin API access.
-   Network access from Glean to the Coda APIs.
-   Access to the **Glean Admin console**.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   Your Coda **Organization ID**.
-   A Coda **Admin API token** created by an Organization Admin.
-   The token should be scoped for organization-level access.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The account that creates the token must have the **Organization Admin** role in Coda.
-   The token must be able to read the docs, pages, tables, users, and permissions you want Glean to crawl.
-   Organization-level access is required for complete permission mapping.

## Step 1: Find your Coda Organization ID[​](#step-1-find-your-coda-organization-id "Direct link to Step 1: Find your Coda Organization ID")

1.  Sign in to Coda with an Organization Admin account.
2.  Open your organization settings.
3.  Find the **Organization ID** for your Enterprise tenant.
4.  Copy the value — you will paste it into Glean later.

## Step 2: Generate an Admin API token[​](#step-2-generate-an-admin-api-token "Direct link to Step 2: Generate an Admin API token")

1.  Open [Coda account settings](https://coda.io/account) while signed in as an [Organization Admin](https://help.coda.io/hc/en-us/articles/39555906605965-Enterprise-org-admins).
2.  Create a new API token for Glean.
3.  Grant the token organization-level access.
4.  Copy the token value — you will paste it into Glean later.

## Step 3: Enter the values in Glean[​](#step-3-enter-the-values-in-glean "Direct link to Step 3: Enter the values in Glean")

1.  In the **Glean Admin console**, go to **Connectors** and select **Add connector**.
2.  Select **Coda**.
3.  Enter a connector name.
4.  Paste the Organization ID from step 1 into the **Coda Organization ID** field.
5.  Paste the Admin API token from step 2 into the **Admin API token** field.
6.  Select **Save**.

## What happens next[​](#what-happens-next "Direct link to What happens next")

After you save the connector, Glean begins crawling the Coda content and permission metadata that the connector can access. Because this connector relies on scheduled crawls rather than webhooks, recent updates may take time to appear.

## See also[​](#see-also "Direct link to See also")

-   [Coda overview](/connectors/native/coda/about)
