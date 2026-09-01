---
url: "https://docs.glean.com/connectors/native/highspot/setup"
canonical: "https://docs.glean.com/connectors/native/highspot/setup"
title: "Highspot setup"
description: "This article provides comprehensive documentation for configuring, setting up, and using the Highspot connector with Glean. It covers supported features, requirements, setup instructions, and known limitations."
fetched_at: "2026-09-01T13:29:32.476Z"
---
On this page

This page explains how to prepare Highspot, gather API credentials, and add the connector in Glean.

## Requirements[​](#requirements "Direct link to Requirements")

To use the Highspot connector, you must meet certain technical, credential, and permission requirements, as well as perform some preliminary setup in Highspot.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   You must have a Highspot instance with API access enabled.
-   Glean must be deployed in your environment with access to the Glean admin console.
-   All data is stored in your GCP project and no data leaves your environment.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   API credentials like the client key and client secret are required. These are provided by Highspot after API access is enabled for your instance.
-   A dedicated API user is created in Highspot for integration purposes.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The API user’s access in Highspot determines what content is crawled and indexed.
-   To enforce spot-level permissions in Glean, you must enable **Impersonation in Highspot REST API** for the API client used by Glean.

## Configuration and setup instructions[​](#configuration-and-setup-instructions "Direct link to Configuration and setup instructions")

This section guides you through configuring and setting up the Highspot connector in Glean. Most setup steps are performed in the Glean admin console.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Highspot instance with API access enabled.
-   API credentials (client key and secret) from Highspot.
-   To enforce spot-level permissions, enable impersonation in the Highspot API for the API client used by Glean.

### Enable API functionality[​](#enable-api-functionality "Direct link to Enable API functionality")

Glean requires API functionality to search Highspot content. Contact the Highspot support team to enable API functionality for your instance and share the credentials with Glean.

### Determine the subdomain of your Highspot instance[​](#determine-the-subdomain-of-your-highspot-instance "Direct link to Determine the subdomain of your Highspot instance")

You can determine the subdomain of your Highspot instance by checking the URL you use to access the instance. For example, if you access Highspot at *acme.highspot.com*, the subdomain is *acme*.

### Determine client information[​](#determine-client-information "Direct link to Determine client information")

For Glean to access your Highspot instance API, provide the **API URL**, **API client key**, and **API client secret**.

To get the API URL, client key, and client secret:

1.  Sign in to Highspot. Open your **User Profile** in the top-right corner and navigate to **Settings**.
2.  In the left navigation bar, under **Developer**, select **Basic**.
3.  Copy the **API URL** and enter it in the **API URL** field in the Glean Highspot connector. Example format: `https://api.highspot.com/v0.5`.
4.  Under **API Credentials**, click **Generate API Key and Secret**.
5.  Copy **Key** and enter it in the **API client key** field in Glean.
6.  Copy **Secret** and enter it in the **API client secret** field in Glean.

### Connect Highspot and Glean[​](#connect-highspot-and-glean "Direct link to Connect Highspot and Glean")

To validate the credentials and connect the Highspot connector to Glean:

1.  In the Glean **Admin console**, navigate to **Connectors**.
2.  Click **Add connector** and add a new Highspot connector.
3.  Enter the required information:
    -   Highspot subdomain
    -   **API URL** (for example, `https://api-su2.highspot.com/v1.0`)
    -   API client key
    -   API client secret
4.  Click **Save**.

### Crawl configuration options[​](#crawl-configuration-options "Direct link to Crawl configuration options")

-   You can control which Spots or Items are indexed by modifying the API user’s access in Highspot. By default, only official Spots are indexed. To include unofficial and personal Spots, contact Glean support.
-   There are no explicit allowlist/denylist or lookback period options; access is managed through the API user’s permissions.
-   The connector runs scheduled full crawls (not incremental crawls for Spots, Items, or users). Typical update rates are between 1 and 4 hours depending on the object type.
