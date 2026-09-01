---
url: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/greenhouse/greenhouse-4"
title: "GREENHOUSE-4"
description: "GREENHOUSE-4 Error Code"
fetched_at: "2026-09-01T13:30:22.376Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean could not complete the Harvest v3 token introspection request to `https://auth.greenhouse.io/introspect`. The request to verify the access token failed before a result could be read. This is typically transient (a network issue or temporary Greenhouse auth-service unavailability) rather than a problem with your credentials.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Re-run validation from the Glean admin console after a short wait.
2.  Check the [Greenhouse status page](https://status.greenhouse.io) for any ongoing incidents with the authentication or Harvest API services.
3.  Confirm your base URL is correct (it should be your Greenhouse domain, for example `https://yourdomain.greenhouse.io`) and that no firewall or network policy blocks outbound access to `auth.greenhouse.io`.
4.  If the error persists after retrying, note the timestamp and contact [Glean Support](https://support.glean.com).

For additional assistance, contact [Glean Support](https://support.glean.com).
