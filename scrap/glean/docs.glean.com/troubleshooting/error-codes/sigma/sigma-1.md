---
url: "https://docs.glean.com/troubleshooting/error-codes/sigma/sigma-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/sigma/sigma-1"
title: "SIGMA_1"
description: "SIGMA_1 Error Code"
fetched_at: "2026-09-01T13:30:30.532Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

Glean is unable to validate API access to your Sigma instance.

This error can occur for the following reasons:

-   The provided Client ID or Client Secret is incorrect.
-   Glean cannot authenticate with Sigma using the provided credentials.
-   The acquired token does not have permission to access the Sigma API.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

1.  Verify that your **Client ID** and **Client Secret** are correct. These credentials can be found in Sigma under **Administration** > **Developer Access** > **OAuth Clients**.
2.  Ensure the OAuth client has the **REST API** scope enabled.
3.  Confirm the **API Base URL** is correct for your Sigma cloud (e.g., `https://aws-api.sigmacomputing.com` for AWS or `https://api.sigmacomputing.com` for GCP).
4.  Check that the OAuth client has not been revoked or disabled in your Sigma organization.

If you continue to see this error, contact [Glean Support](https://support.glean.com/hc/en-us).
