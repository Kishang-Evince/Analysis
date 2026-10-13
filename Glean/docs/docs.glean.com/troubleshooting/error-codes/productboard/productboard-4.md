---
url: "https://docs.glean.com/troubleshooting/error-codes/productboard/productboard-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/productboard/productboard-4"
title: "PRODUCTBOARD_4"
description: "PRODUCTBOARD_4 Error Code"
fetched_at: "2026-10-13T08:51:14.223Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Productboard returned member email addresses as `[redacted]`, which means the connection's OAuth application is missing the `members:pii:read` scope. Without member emails, Glean can't create member identity records, so it can't match document owners to the people who own them.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In the Productboard OAuth application, grant the `members:pii:read` scope. For the full scope list, see [Productboard connector setup](/connectors/native/productboard/setup#required-oauth-scopes).
2.  In the Glean **Admin console**, open the Productboard connector and complete authorization again.

For additional assistance, contact [Glean Support](https://support.glean.com).
