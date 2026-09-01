---
url: "https://docs.glean.com/troubleshooting/error-codes/dynamics365/dynamics365-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/dynamics365/dynamics365-1"
title: "DYNAMICS365_1"
description: "DYNAMICS365_1 Error Code"
fetched_at: "2026-09-01T13:30:12.940Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

-   Dynamics 365 configuration parameters are missing or invalid.

## Possible resolution[​](#possible-resolution "Direct link to Possible resolution")

To resolve this error, try the following resolution:

### Ensure all required Dynamics 365 configuration parameters are provided during connector setup:[​](#ensure-all-required-dynamics-365-configuration-parameters-are-provided-during-connector-setup "Direct link to Ensure all required Dynamics 365 configuration parameters are provided during connector setup:")

-   *Tenant ID (Directory ID)*: You can find the **Tenant ID** on the Azure portal by navigating to **Microsoft Entra ID** → **Overview**.
-   *Client ID (Application ID)*: You can find *Client ID* on Azure portal by navigating to **Microsoft Entra ID** → **App registrations** → **Your Glean App** → **Overview**.
-   *Client secret*: The *Client secret* is generated in **Microsoft Entra ID** → **App registrations** → **Your Glean App** → **Certificates & secrets** on the Azure portal.
-   *Org ID*: You can retrieve the *Org ID* from your Dynamics 365 URL. For example, in the URL: `https://org810c0cef.crm.dynamics.com/`, the org ID is `org810c0cef`.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
