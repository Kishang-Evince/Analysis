---
url: "https://docs.glean.com/connectors/native/gong/setup"
canonical: "https://docs.glean.com/connectors/native/gong/setup"
title: "Gong setup"
description: "Set up the Gong connector in Glean."
fetched_at: "2026-09-01T13:29:31.052Z"
---
On this page

Configuration and setup for the Gong connector are performed in the Glean Admin/Connectors console. Most steps are automated with onscreen instructions.

## Requirements[​](#requirements "Direct link to Requirements")

The following requirements must be met for successful deployment and operation of the Gong connector.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   Customer must use Gong’s cloud service.
-   Glean must have access to the customer’s Gong instance over the internet (no firewall restrictions blocking the Gong API).

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   OAuth 2.0 credentials are required for authentication. An admin user in Gong must perform the authentication flow to authorize data access.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The authenticating Gong user must be an admin in Gong
-   Access must be sufficient to read: users, permission profiles, workspaces, folders (library), calls, call transcripts, and metadata
-   The connector implements Gong’s permission model; only users with access to data in Gong will have access to corresponding items in Glean

## Authentication and credentials[​](#authentication-and-credentials "Direct link to Authentication and credentials")

-   In the deployment console, navigate to the Gong connector setup page.
-   Click the provided link to start the OAuth 2.0 authorization process with the Glean-Gong integration app.
-   Authenticate with Gong using the admin account credentials.
-   Upon successful authorization, required credentials are securely stored and Glean is authorized to access the Gong API for crawling.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

1.  Log in to the Glean **Admin console** as an administrator.
2.  Open **Connectors**.
3.  In **Add connector**, search for Gong.
4.  Select **Authorize**.
5.  In Gong, select **Allow**.

After setup, Glean crawls Gong content and permissions. If needed, configure access to Gong search results for the users and groups in your organization. Glean processes and ingests data and permissions according to Gong’s model and reflects permissions changes promptly-if a user's access changes in Gong, this is updated in Glean during the next crawl cycle.
