---
url: "https://docs.glean.com/troubleshooting/error-codes/ironclad/ironclad-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/ironclad/ironclad-3"
title: "IRONCLAD_3"
description: "IRONCLAD_3 Error Code"
fetched_at: "2026-10-13T08:51:07.907Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean cannot find a valid OAuth access token for the Ironclad administrator account. This issue can occur if:

-   The administrator did not complete the OAuth authorization flow.
-   An administrator or system process removed the token after setup. For example, the administrator disconnected Ironclad or an admin revoked the token.

## Resolution[​](#resolution "Direct link to Resolution")

To resolve this issue:

1.  In Glean **Admin console**, navigate to **Setup** > **Connectors** > **Ironclad**.
2.  Re-authenticate the connector using an Ironclad account that is a member of the **Administrators** group.
3.  Complete the OAuth authorization flow when prompted.

**Note:** The Ironclad connector crawls with the administrator's token. If that administrator disconnects Ironclad or their access is revoked, crawls stop until an administrator re-authenticates. For more information, see the [Ironclad connector setup](/connectors/native/ironclad/setup) page.

For additional assistance, contact [Glean Support](https://support.glean.com).
