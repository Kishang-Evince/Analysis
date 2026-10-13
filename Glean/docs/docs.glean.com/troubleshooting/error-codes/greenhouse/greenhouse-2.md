---
url: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-2"
title: "GREENHOUSE-2"
description: "GREENHOUSE-2 Error Code"
fetched_at: "2026-10-13T08:51:06.894Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean obtained a Harvest v3 access token, but the credential is missing one or more of the scopes Glean requires. Glean needs the credential to have all scopes granted so it can crawl all Greenhouse content and identity types. The validation error lists the specific missing scopes.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In Greenhouse, go to **Dev Center → API Credential Management** and open the Harvest v3 OAuth credential used for Glean (or create a new one).
2.  Under **Manage Scopes**, check **Select All** to grant all scopes. Then click **Save**.
3.  Return to the Glean **Admin console** and re-run validation.

For additional assistance, contact [Glean Support](https://support.glean.com).
