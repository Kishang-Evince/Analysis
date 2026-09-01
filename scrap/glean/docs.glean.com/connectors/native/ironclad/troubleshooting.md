---
url: "https://docs.glean.com/connectors/native/ironclad/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/ironclad/troubleshooting"
title: "Ironclad troubleshooting"
description: "Troubleshoot Ironclad SSO redirection issues during connector setup and user authorization."
fetched_at: "2026-09-01T13:29:33.091Z"
---
On this page

Use this page to resolve known issues with the Ironclad connector, including SSO redirection issues during setup and user authorization.

## Troubleshooting Ironclad SSO redirection[​](#troubleshooting-ironclad-sso-redirection "Direct link to Troubleshooting Ironclad SSO redirection")

tip

If the **Redirect URL** field is missing from your Ironclad OAuth app settings, verify that the **Authorization Code** grant type is enabled. See [Step 3](/connectors/native/ironclad/setup#step-3-create-an-oauth-app-in-ironclad) for details.

In certain SSO configurations, Ironclad fails to redirect you to Glean after you sign in. This happens when the sign-in process begins on a regional subdomain (such as `na1`.), which breaks the return path to Glean. This can occur during the initial admin setup or when individual users authenticate their accounts.

### Resolution[​](#resolution "Direct link to Resolution")

If you have signed in to Ironclad but the page does not automatically redirect back to Glean, you can manually trigger the redirect by following these steps:

1.  Complete your sign-in to Ironclad as prompted.
2.  In your browser’s address bar, remove the regional subdomain prefix (e.g., `na1.`) from the URL.
    -   **Example:** Change `https://na1.ironcladapp.com/...` to `https://ironcladapp.com/...`
3.  Press **Enter** to reload the page.

After reload, it should redirect to Glean if already signed in. This applies to both initial administrator setup and individual user authentication.

## See also[​](#see-also "Direct link to See also")

-   [Ironclad setup](/connectors/native/ironclad/setup)
-   [Ironclad overview](/connectors/native/ironclad/about)
