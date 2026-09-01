---
url: "https://docs.glean.com/troubleshooting/error-codes/klue/klue-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/klue/klue-1"
title: "KLUE_1"
description: "KLUE_1 Error Code"
fetched_at: "2026-09-01T13:30:25.043Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean could not validate the Klue API key. The Klue connector requires an API key with both the `content:read` scope (to crawl cards and battlecards) and the `scim:read` scope (to enforce document permissions). This error occurs when:

-   The API key is invalid or has been revoked
-   The API key is missing the `content:read` scope
-   The API key is missing the `scim:read` scope
-   Glean was temporarily unable to reach Klue while validating the key

## Resolution[​](#resolution "Direct link to Resolution")

Klue admin users generate Klue API keys under **Settings → Apps & Integrations → Manage API Keys**. Based on the cause, take the matching action, then re-enter the key in the Glean admin console:

-   **Invalid or revoked API key**: Confirm the API key is correct and has not been revoked. If needed, generate a new key in Klue.
-   **Missing `content:read` scope**: Regenerate the Klue API key with the `content:read` scope enabled.
-   **Missing `scim:read` scope**: Regenerate the Klue API key with the `scim:read` scope enabled. Glean cannot enforce document permissions without SCIM access.
-   **Failed to connect to Klue**: This is typically a temporary connectivity issue. Confirm that your Klue instance is reachable and try again in a few minutes.

For additional assistance, contact [Glean Support](https://support.glean.com).
