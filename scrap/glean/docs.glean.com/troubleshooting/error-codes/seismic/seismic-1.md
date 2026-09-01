---
url: "https://docs.glean.com/troubleshooting/error-codes/seismic/seismic-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/seismic/seismic-1"
title: "SEISMIC_1"
description: "SEISMIC_1 Error Code"
fetched_at: "2026-09-01T13:30:29.547Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The OAuth credentials provided for the Seismic connector are invalid. This error occurs when Glean is unable to authenticate with Seismic using the provided Client ID, Client Secret, or Refresh Token.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Verify that your **Client ID** and **Client Secret** are correct. These can be found in the Seismic app registration at [https://apps.seismic.com/](https://apps.seismic.com/).
2.  Ensure your **Refresh Token** is valid and has not expired. If necessary, regenerate the token by following the [Get access and refresh tokens](/connectors/native/seismic#get-access-and-refresh-tokens) instructions.
3.  Confirm that the OAuth2 app is correctly configured with the **Authorization Code Flow** in Seismic.
4.  Verify that the **redirect URL** in your Seismic app matches your tenant URL (e.g., `https://yourtenant.seismic.com/`).

If you are still having difficulty, please reach out to us: [https://support.glean.com](https://support.glean.com)
