---
url: "https://docs.glean.com/troubleshooting/error-codes/productboard/productboard-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/productboard/productboard-1"
title: "PRODUCTBOARD_1"
description: "PRODUCTBOARD_1 Error Code"
fetched_at: "2026-10-13T08:51:14.024Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean couldn't verify that the Productboard connection can read workspace members. This first setup-validation check fails when the request to list members errors out (for example, the OAuth token is invalid or lacks the `members:read` scope), or when Productboard returns an empty members list. Glean treats an empty list as a permission problem, because a connected workspace always includes at least the authorizing admin. The connector also reads members during crawling, so crawling stops until an admin re-authorizes the connection.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In the Productboard OAuth application, confirm the `members:read` scope is granted. For the full scope list, see [Productboard connector setup](/connectors/native/productboard/setup#required-oauth-scopes).
2.  In the Glean **Admin console**, open the Productboard connector and complete authorization again.
3.  If the scope is already granted and the error persists, confirm the authorizing user is still an active Productboard maker with admin access, then re-authorize.

For additional assistance, contact [Glean Support](https://support.glean.com).
