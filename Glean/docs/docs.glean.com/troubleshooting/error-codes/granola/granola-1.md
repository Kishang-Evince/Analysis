---
url: "https://docs.glean.com/troubleshooting/error-codes/granola/granola-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/granola/granola-1"
title: "GRANOLA_1"
description: "GRANOLA_1 Error Code"
fetched_at: "2026-10-13T08:51:06.917Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   The API key provided for the Granola connector is invalid, expired, or missing.
-   This error occurs when Glean attempts to verify the API key by calling the Granola API and receives an authentication failure or connection error.

## Resolution[​](#resolution "Direct link to Resolution")

### Enterprise API key[​](#enterprise-api-key "Direct link to Enterprise API key")

-   Check the Enterprise API key’s status in Granola. Confirm that it remains active and that no administrator has revoked it.
-   Ask your workspace administrator to generate a new Enterprise API key in Granola.
-   In the Glean **Admin console**, go to **Connectors** > **Granola**, replace the existing key with the new key, and save the connection.

### Personal API key[​](#personal-api-key "Direct link to Personal API key")

-   On Enterprise plans, a workspace administrator must first enable **Allow personal API keys** in Granola under **Settings** > **Workspace**. On Business plans, workspace members can generate personal API keys directly. Once enabled, you can replace your personal key from Glean user settings.
-   Generate a new Personal API key in Granola.
-   Open your Glean user settings and go to **Settings** > **Connectors**, then open **Granola**.
-   Select **Remove Credentials** to remove the existing Granola personal key.
-   Add the new key and reconnect Granola.
-   Wait for the next personal-notes crawl.

For additional help, contact [Glean Support](https://support.glean.com).
