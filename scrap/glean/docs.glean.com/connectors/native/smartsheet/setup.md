---
url: "https://docs.glean.com/connectors/native/smartsheet/setup"
canonical: "https://docs.glean.com/connectors/native/smartsheet/setup"
title: "Smartsheet setup"
description: "Review the requirements and configure the Smartsheet connector in the Glean Admin Console."
fetched_at: "2026-09-01T13:29:44.284Z"
---
On this page

This page describes how to install and configure the Smartsheet connector. Setup uses OAuth 2.0 and takes place in Smartsheet and the Glean Admin Console.

To set up the Smartsheet connector:

-   Confirm the [requirements](#requirements) and [prerequisites](#prerequisites).
-   Review [authentication and credentials](#authentication-and-credentials).
-   [Authorize the Glean app in Smartsheet](#setup-in-glean).
-   Configure the [crawl options](/connectors/native/smartsheet/about#crawl-configuration-options).

## Requirements[​](#requirements "Direct link to Requirements")

To set up and operate the Smartsheet connector, ensure that the following requirements are met.

-   Smartsheet Business plan or higher with API access.
-   Glean platform access with administrator privileges for connector setup.
-   A Smartsheet system administrator account to authorize the Glean app through OAuth.
-   OAuth 2.0 access for secure, scoped authentication.
-   Individual user authentication, when needed, to index private Smartsheet documents.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Confirm that you have Glean workspace administrator rights.
-   Confirm that you have Smartsheet system administrator credentials.
-   Identify the Smartsheet users who need to authenticate to enable indexing of their private documents.
-   Review which sheets, dashboards, reports, and workspaces the system administrator can access.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Authentication and credentials[​](#authentication-and-credentials "Direct link to Authentication and credentials")

-   Setup uses OAuth 2.0. You are prompted to authorize the Glean app with your Smartsheet administrator credentials.
-   After the initial setup, individual users can authenticate to enable indexing of their private Smartsheet documents.

### Setup in Glean[​](#setup-in-glean "Direct link to Setup in Glean")

1.  In Glean, navigate to the **Admin console**.
2.  Go to **Connectors** -> **Add connector**, and search for Smartsheet. You can also use the [Smartsheet setup page](https://app.glean.com/admin/setup/apps/smartsheet/).
3.  Select **Authorize** to complete the setup. This authorizes Glean to access your Smartsheet instance.
4.  In the popup, **Allow** Glean to access your Smartsheet instance.
5.  Complete the OAuth flow in Smartsheet. You are redirected back to Glean.
6.  After authorization, Glean begins the initial crawl of all Smartsheet content accessible to the system administrator.

## See also[​](#see-also "Direct link to See also")

-   [Smartsheet overview](/connectors/native/smartsheet/about)
