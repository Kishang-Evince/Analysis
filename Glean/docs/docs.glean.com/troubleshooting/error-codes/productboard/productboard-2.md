---
url: "https://docs.glean.com/troubleshooting/error-codes/productboard/productboard-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/productboard/productboard-2"
title: "PRODUCTBOARD_2"
description: "PRODUCTBOARD_2 Error Code"
fetched_at: "2026-10-13T08:51:13.936Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean couldn't read the Productboard roadmap entities (products, components, features, and subfeatures) during setup validation. The connection's OAuth application is most likely missing the `entities:read` scope.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In the Productboard OAuth application, grant the `entities:read` scope. For the full scope list, see [Productboard connector setup](/connectors/native/productboard/setup#required-oauth-scopes).
2.  In the Glean **Admin console**, open the Productboard connector and complete authorization again.

For additional assistance, contact [Glean Support](https://support.glean.com).
