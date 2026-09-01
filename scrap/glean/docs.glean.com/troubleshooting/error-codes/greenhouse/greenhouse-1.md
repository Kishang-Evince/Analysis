---
url: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-1"
title: "GREENHOUSE-1"
description: "GREENHOUSE-1 Error Code"
fetched_at: "2026-09-01T13:30:21.940Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean could not obtain a Harvest v3 access token with the Client ID and Client Secret you provided. When Glean exchanges these credentials at `https://auth.greenhouse.io/token`, Greenhouse rejected the request (HTTP 401/4xx) or returned no access token. This usually means the Client ID or Client Secret is blank, mistyped, or no longer valid (for example, the credential was deleted or its secret was rotated in Greenhouse).

## Resolution[​](#resolution "Direct link to Resolution")

1.  In Greenhouse, go to **Dev Center → API Credential Management** and open the Harvest v3 OAuth credential used for Glean (or create a new one).
2.  Copy the credential's **Client ID** and **Client Secret** exactly. Greenhouse shows the Client Secret only once, when the credential is created — if you did not save it, **rotate the Client Secret** to generate a new one. Rotating immediately invalidates the previous secret, so update it anywhere else it is used.
3.  In the Glean admin console, open the Greenhouse setup form and re-enter the **Client ID** and **Client Secret**, making sure there are no extra spaces or truncated characters.
4.  Save and re-run validation.

For additional assistance, contact [Glean Support](https://support.glean.com).
