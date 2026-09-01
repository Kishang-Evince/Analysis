---
url: "https://docs.glean.com/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-1"
title: "OUTLOOK-CALENDAR_1"
description: "OUTLOOK-CALENDAR_1 Error Code"
fetched_at: "2026-09-01T13:30:28.057Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

-   Certain Graph API permissions for the given application are missing.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   The Client secret, Application (client) ID, or Directory (tenant) ID entered in the console are incorrect.
-   The app does not have the permissions shown in the error message.
-   Admin consent is not granted for the required permissions.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

To resolve this error, try one or more of the following resolutions:

### Verify Azure app credentials[​](#verify-azure-app-credentials "Direct link to Verify Azure app credentials")

1.  Navigate to the [Azure portal](https://azure.microsoft.com/en-us/get-started/azure-portal).
2.  Select **Azure Active Directory** -> **Enterprise applications** and find the app you set up for Glean.
3.  Verify the Client secret, Application (client) ID, and Directory (tenant) ID in the console. Ensure these details are correct.

### Grant required permissions and admin consent[​](#grant-required-permissions-and-admin-consent "Direct link to Grant required permissions and admin consent")

Ensure the app has the required permissions and the admin consent is granted.

**To grant admin consent:**

1.  Sign in to Azure as a Global, Application, or Cloud Application Administrator.
2.  Use the search box to go to **Enterprise applications**.
3.  Select the Glean app you created from the list.
4.  Click **Permissions** under **Security**. Review the permissions and click **Grant admin consent**.

If you continue to see this error, contact [Glean Support](https://support.glean.com).
