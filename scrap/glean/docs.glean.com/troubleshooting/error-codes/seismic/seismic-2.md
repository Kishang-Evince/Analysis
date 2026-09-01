---
url: "https://docs.glean.com/troubleshooting/error-codes/seismic/seismic-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/seismic/seismic-2"
title: "SEISMIC_2"
description: "SEISMIC_2 Error Code"
fetched_at: "2026-09-01T13:30:29.481Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

This error occurs when the OAuth token is missing the required scopes needed to access Seismic data.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Check the missing scopes in the Seismic setup page in the Glean Admin Console.
2.  Go to your Seismic app registration at [https://apps.seismic.com/](https://apps.seismic.com/).
3.  Navigate to the **Scopes** section and verify that all required scopes are selected.
4.  Regenerate your access and refresh tokens by following the [Get access and refresh tokens](/connectors/native/seismic#get-access-and-refresh-tokens) instructions. Ensure you include all required scopes in the authorization request.

If you are still having difficulty, please reach out to us: [https://support.glean.com](https://support.glean.com)
