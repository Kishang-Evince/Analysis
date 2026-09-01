---
url: "https://docs.glean.com/troubleshooting/error-codes/microsoft/office365/o365-livemode"
canonical: "https://docs.glean.com/troubleshooting/error-codes/microsoft/office365/o365-livemode"
title: "O365_LIVEMODE"
description: "O365_LIVEMODE Error Code"
fetched_at: "2026-09-01T13:30:27.783Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Either your redirect url is not set correctly, or you are missing delegated permissions. Note that you may need to provide admin consent to enable delegated permissions for all principals.

## Resolution[​](#resolution "Direct link to Resolution")

Find your Glean application in the [Azure portal](https://portal.azure.com/). The error message should provide the application ID (client ID) used for live mode.

-   Navigate to **Authentication → Platform configurations**. Check that you have a web redirect URL for the app you just created. It will be of the form `https://tenant_id-be.glean.com/instance/o365/oauth/verify_code`. Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it. ![](/assets/images/o365-redirect-url-d8c375add59b19a1ea8c7e78a48daa88.png)
-   Navigate to **API Permissions → Delegated Permissions**. Check that you have the following delegated permissions:
    -   `offline_access`
    -   `User.Read`
    -   `Files.ReadWrite.All` ![](/assets/images/o365-delegated-live-fetch-4c04e3647f6172b1c54d8f16587fce20.png)

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
