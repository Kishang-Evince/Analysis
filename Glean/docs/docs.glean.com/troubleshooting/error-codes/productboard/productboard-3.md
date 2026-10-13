---
url: "https://docs.glean.com/troubleshooting/error-codes/productboard/productboard-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/productboard/productboard-3"
title: "PRODUCTBOARD_3"
description: "PRODUCTBOARD_3 Error Code"
fetched_at: "2026-10-13T08:51:13.951Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean couldn't read the Productboard notes during setup validation. The connection's OAuth application is most likely missing the `notes:read` scope.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In the Productboard OAuth application, grant the `notes:read` scope. For the full scope list, see [Productboard connector setup](/connectors/native/productboard/setup#required-oauth-scopes).
2.  In the Glean **Admin console**, open the Productboard connector and complete authorization again.

For additional assistance, contact [Glean Support](https://support.glean.com).
