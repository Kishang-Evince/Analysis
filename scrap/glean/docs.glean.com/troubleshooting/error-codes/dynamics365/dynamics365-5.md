---
url: "https://docs.glean.com/troubleshooting/error-codes/dynamics365/dynamics365-5"
canonical: "https://docs.glean.com/troubleshooting/error-codes/dynamics365/dynamics365-5"
title: "DYNAMICS365_5"
description: "DYNAMICS365_5 Error Code"
fetched_at: "2026-09-01T13:30:13.039Z"
---
On this page

## Possible errors[​](#possible-errors "Direct link to Possible errors")

-   Access denied to Dynamics 365 APIs.
-   Insufficient permissions to access required Dynamics 365 endpoints.
-   Application user not properly configured in Dynamics 365.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   Missing admin consent for Azure app permissions.
-   Application user not created in Dynamics 365 environment.
-   Insufficient security roles assigned to the application user.
-   Organization has API access restrictions.
-   Conditional access policies blocking the application.
-   Network connectivity issues with Dynamics 365 endpoints.

## Possible resolution[​](#possible-resolution "Direct link to Possible resolution")

1.  Verify admin consent is granted for all Azure app permissions.
2.  Confirm application user exists in Dynamics 365 with appropriate roles.
3.  Test API connectivity to your Dynamics 365 organization URL.
4.  Check for any conditional access policies affecting the application.
5.  Ensure firewall or proxy allows connections to `*.dynamics.com`.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
