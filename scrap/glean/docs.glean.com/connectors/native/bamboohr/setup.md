---
url: "https://docs.glean.com/connectors/native/bamboohr/setup"
canonical: "https://docs.glean.com/connectors/native/bamboohr/setup"
title: "BambooHR setup"
description: "Configure the Glean BambooHR connector, including requirements, generating a BambooHR API token, and adding the connector configuration in the Glean admin console."
fetched_at: "2026-09-01T13:29:22.893Z"
---
On this page

Follow these steps to configure and set up the BambooHR connector in Glean. Most setup occurs in the Glean admin console and your BambooHR instance.

## Requirements[​](#requirements "Direct link to Requirements")

To use the BambooHR connector, you must meet the following requirements.

-   Access to the Glean admin console.
-   A BambooHR instance with the *Company Directory* feature enabled. This feature can be managed or disabled in BambooHR account settings. It must be turned on for Glean to crawl `/employees/directory`.
-   An API token generated in BambooHR is required for authentication. The API token must be created by a service account admin with access to the employee directory and basic employee fields.
-   The API token inherits all permissions from the user who creates it.

## Generate the API token[​](#generate-the-api-token "Direct link to Generate the API token")

Follow these steps to generate the API token:

1.  Log into BambooHR, and click your name in the upper right-hand corner to open the user context menu.
2.  Select **API Keys** and create a new API key.
3.  Copy the API key.

## Connect BambooHR connector to Glean[​](#connect-bamboohr-connector-to-glean "Direct link to Connect BambooHR connector to Glean")

1.  In the Glean **Admin console**, navigate to the [Advanced connector setup](https://app.glean.com/admin/setup/apps?advanced).
2.  Toggle to **Config** and add `bamboohr.domain` as the **Key name**.
3.  Add the domain of your BambooHR project into the **Key value** field and click **Submit**.
4.  Toggle to **Secret**.
5.  Add the `BAMBOOHR_ACCESS_TOKEN` as the **Key name**.
6.  Add the BambooHR API key into the **Key value** field and click **Submit**. 7.Save all configurations.

For any issues or questions, contact the [Glean support team](http://gleanwork.zendesk.com/).

## See also[​](#see-also "Direct link to See also")

-   [BambooHR overview](/connectors/native/bamboohr/about)
