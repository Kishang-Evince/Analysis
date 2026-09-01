---
url: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-3"
title: "GREENHOUSE-3"
description: "GREENHOUSE-3 Error Code"
fetched_at: "2026-09-01T13:30:22.215Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean obtained and introspected a Harvest v3 access token, but the token is either **not active** or does not belong to a **Site Admin**. Greenhouse requires the integration user to hold the Site Admin role so Glean can read every job, candidate, and permission needed for complete, permission-aware search.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In Greenhouse, confirm the Harvest v3 OAuth credential is **enabled/active** (not revoked, disabled, or expired). Regenerate it if necessary.
2.  Verify that the user who owns the credential has the **Site Admin** level (Greenhouse: **Configure → Users**, check the user's level).
3.  If the user is not a Site Admin, either grant Site Admin to that user or create the credential under a Site Admin user.
4.  Re-enter the credential in the Glean admin console if it changed, then re-run validation.

For additional assistance, contact [Glean Support](https://support.glean.com).
