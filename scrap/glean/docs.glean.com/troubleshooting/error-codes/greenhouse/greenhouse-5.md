---
url: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-5"
canonical: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-5"
title: "GREENHOUSE-5"
description: "GREENHOUSE-5 Error Code"
fetched_at: "2026-09-01T13:30:22.362Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean could not authenticate to the Greenhouse Harvest (v1) API with the API key you provided, or the key is missing one or more permissions Glean requires. When Glean calls the Harvest v1 API, Greenhouse rejected the request (HTTP 401/403). This usually means the Harvest API key is blank, mistyped, or no longer valid (for example, it was deleted or rotated in Greenhouse), or the key was created without all of the permissions Glean needs to crawl all relevant Greenhouse content and identity objects.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In Greenhouse, go to **Dev Center → API Credential Management** and open the **Harvest API** key used for Glean (or create a new one).
2.  Confirm the key is **enabled/active** and has not been revoked. If the key was rotated, or you no longer have its value, create a new Harvest API key - Greenhouse shows the key only once, when it is created, so save it securely.
3.  Under **Manage Permissions** for the key, grant all permissions so Glean can read every job, candidate, and permission it needs for indexing. Then click **Save**.
4.  In the Glean Admin Console, open the Greenhouse setup form and re-enter the **API key** exactly, making sure there are no extra spaces or truncated characters. Then click **Save**.

For additional assistance, contact [Glean Support](https://support.glean.com).
