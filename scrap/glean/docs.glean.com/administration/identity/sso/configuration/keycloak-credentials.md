---
url: "https://docs.glean.com/administration/identity/sso/configuration/keycloak-credentials"
canonical: "https://docs.glean.com/administration/identity/sso/configuration/keycloak-credentials"
title: "Rotate Keycloak credentials"
description: "Keycloak is an identity provider (IdP) used for single sign-on (SSO). This page explains how to update or rotate the credentials of an existing Keycloak SSO integration. Once Keycloak authentication is configured during initial setup, it can't be edited from the standard UI, so credential changes are made from the advanced apps settings page."
fetched_at: "2026-09-01T13:29:07.734Z"
---
On this page

Keycloak is an identity provider (IdP) used for single sign-on (SSO). This page explains how to update or rotate the credentials of an existing Keycloak SSO integration. Once Keycloak authentication is configured during initial setup, it can't be edited from the standard UI, so credential changes are made from the advanced apps settings page.

note

For setting up or troubleshooting SSO, see [About Glean SSO](/administration/identity/sso/about).

Only admins can rotate existing Keycloak credentials. Consider performing these steps during non-working hours to avoid downtime for users.

To rotate the credentials:

1.  Go to the [advanced apps settings page](https://app.glean.com/admin/setup/apps?advanced).
2.  Toggle the setting to **Secret**.
3.  Update each Keycloak value in turn. For each key, enter the key in the **Key name** field, enter the new value in the **Key value** field, and click **Submit**:
    -   `KEYCLOAK_ISSUER`
    -   `KEYCLOAK_CLIENT_ID`
    -   `KEYCLOAK_CLIENT_SECRET`
4.  Confirm that a **Written** message appears after each submission.

This overwrites your existing Keycloak authentication values with the new ones.

## See also[​](#see-also "Direct link to See also")

-   [Confidential client credentials](https://www.keycloak.org/docs/latest/server_admin/#_client-credentials): find the client ID and regenerate the client secret in the Keycloak Server Administration Guide.
