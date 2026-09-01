---
url: "https://docs.glean.com/troubleshooting/error-codes/github/github-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/github/github-1"
title: "GITHUB_1"
description: "GITHUB_1 Error Code"
fetched_at: "2026-09-01T13:30:19.089Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   Glean is unable to:
    -   **Validate** that the Glean GitHub app is installed in the expected GitHub organization
    -   **Verify** that ownership of the GitHub organization belongs with the customer

## Resolution[​](#resolution "Direct link to Resolution")

### The Glean GitHub app isn't installed[​](#the-glean-github-app-isnt-installed "Direct link to The Glean GitHub app isn't installed")

The Glean GitHub app hasn't been installed in the target GitHub organization, or the installation was removed. This can also happen if Glean didn't receive the installation webhook from GitHub.

-   Follow the [Install the Glean App for GitHub](/connectors/native/github/#install-the-glean-app-for-github) instructions to install the Glean GitHub app in the correct organization.
-   If you recently installed or updated the app, wait up to 10 minutes for changes to propagate and try again.
-   If the app is already installed, try uninstalling and reinstalling it to trigger a new installation webhook.

### The installing user has no verified email[​](#the-installing-user-has-no-verified-email "Direct link to The installing user has no verified email")

Glean requires the installing user to have at least one verified email address on their GitHub account. If no verified email is available, the validation fails.

This is common with GitHub Enterprise Managed Users (EMU) accounts, where email addresses are [no longer automatically verified](https://github.blog/changelog/2024-08-01-enterprise-managed-user-accounts-now-require-email-verification/).

-   Go to **GitHub Settings → Emails** and confirm that at least one email address is verified.
-   If the email isn't verified, follow [GitHub's email verification steps](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/verifying-your-email-address) to verify it.

### The installing user's email domain doesn't match[​](#the-installing-users-email-domain-doesnt-match "Direct link to The installing user's email domain doesn't match")

Glean verifies that the installing user's email domain matches the expected company domain for the deployment. For example, if your company domain is `example.com`, the installer must have a verified `@example.com` email.

-   Ensure the installing user has a verified email address with your company domain on their GitHub account.
-   If needed, have a different user with a matching company email reinstall the Glean GitHub app.
-   If your organization uses additional email domains, contact [Glean Support](https://support.glean.com) to add them to your deployment's domain configuration.

If you aren't able to verify the email of the account being used for installation, contact [Glean Support](https://support.glean.com) to create the mapping.

### The organization is already connected to another deployment[​](#the-organization-is-already-connected-to-another-deployment "Direct link to The organization is already connected to another deployment")

The GitHub organization is already mapped to a different Glean deployment. Each organization can only be connected to one deployment at a time. This is common when migrating between dev and production deployments.

To move the organization to a different deployment:

1.  Uninstall the Glean GitHub app from the GitHub organization to remove the existing mapping.
2.  Delete the previously existing GitHub connector from the old deployment.
3.  Reinstall the Glean GitHub app on the GitHub organization.
4.  Create a new GitHub connector in the correct deployment. Glean will set up the mapping correctly.

If you don't have access to the other deployment, contact [Glean Support](https://support.glean.com) to resolve the mapping conflict.

For additional assistance, contact [Glean Support](https://support.glean.com).
