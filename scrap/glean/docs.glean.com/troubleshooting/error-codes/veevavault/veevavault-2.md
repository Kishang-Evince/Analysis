---
url: "https://docs.glean.com/troubleshooting/error-codes/veevavault/veevavault-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/veevavault/veevavault-2"
title: "VEEVAVAULT_2"
description: "VEEVAVAULT_2 Error Code"
fetched_at: "2026-09-01T13:30:32.897Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean successfully authenticated with Veeva Vault but was unable to access the Vault API during connector setup validation. This error occurs when Glean attempts to list Vault users to confirm that the authenticated account has sufficient API permissions. Possible causes include:

-   The user's security profile does not include API access permissions.
-   The user's security profile does not grant read access to all documents, users, or groups in the Vault.

## Resolution[​](#resolution "Direct link to Resolution")

To fix this issue:

1.  Log in to Veeva Vault as an administrator and navigate to **Admin** > **Users & Groups** > **Vault Users**.
2.  Find the account used during Glean connector setup and open its profile.
3.  Check the **Security Profile** field in the **Details** section. The assigned profile must include:
    -   **API Access** enabled.
    -   Read permissions for **all Documents** in the Vault.
    -   Read permissions for **Users** and **Groups**.
4.  If the current profile does not meet these requirements, assign a profile that does, or ask your Vault administrator to update the profile's permissions accordingly.
5.  Save any profile changes and retry the connector setup validation in the Glean Admin UI.

For more information, see [Veeva Vault connector](/connectors/native/veeva-vault/).

For additional assistance, contact Glean Support at [https://support.glean.com](https://support.glean.com).
