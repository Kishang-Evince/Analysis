---
url: "https://docs.glean.com/troubleshooting/error-codes/microsoft/teams/teams-livemode"
canonical: "https://docs.glean.com/troubleshooting/error-codes/microsoft/teams/teams-livemode"
title: "TEAMS_LIVEMODE"
description: "TEAMS_LIVEMODE Error Code"
fetched_at: "2026-10-13T08:51:13.216Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

When federated search for Teams messages is turned on, Glean runs two extra validation steps on the Microsoft Teams app registration: `Validating Teams delegated scopes for app <client ID>` and `Validating Teams OAuth callback for app <client ID>`. This error means one of those steps failed for one of these reasons:

-   The app is missing one or more of the delegated Microsoft Graph permissions `offline_access`, `User.Read`, `Chat.Read`, and `ChannelMessage.Read.All`, or individual users consented to them instead of an admin consenting for all users. The message starts with "Missing Teams delegated scopes for all users" and lists the missing permissions.
-   The app's redirect URIs don't include the exact Glean OAuth callback URL of this connector. The message starts with `Missing Teams OAuth redirect URL for the default app` and ends with the expected URL. If the app has no redirect URIs at all, the message is `No service principal or redirect URLs found for the application`.
-   Glean can't build a valid callback URL from your deployment configuration. The message is `Invalid Teams OAuth callback URL for this deployment`.
-   Glean can't get a token for the app. The message starts with "Check that the client secret value is set correctly for the Azure application".
-   Microsoft Graph didn't return the app's details. The message is "Failed to fetch delegated permission grants from Microsoft Graph API." or "Failed to fetch service principal for redirect URL validation."

## Resolution[​](#resolution "Direct link to Resolution")

Read the message on the failed validation step, then fix the app registration whose client ID appears in the step name.

To add missing delegated permissions:

1.  In the [Azure portal](https://portal.azure.com/), go to **Microsoft Entra ID → Manage → App registrations** and select the app.
2.  Click **Manage → API permissions**, click **Add a permission**, and select **Microsoft Graph**.
3.  Add the missing delegated permissions from the message. Glean requires `offline_access`, `User.Read`, `Chat.Read`, and `ChannelMessage.Read.All`.
4.  Click **Grant admin consent for tenant**. Consent from individual users doesn't pass this check.

To add the missing redirect URL:

1.  Copy the expected URL from the error message. It has the form `https://<your Glean URL>/instance/<connector instance name>/oauth/verify_code`.
2.  Add that URL as a redirect URI on the same app registration. The URL must match exactly, including letter case.

If Glean can't get a token for the app, check that the credentials in the connector match the app registration. See [Set up the Teams connector](/connectors/native/teams/setup).

If the message says your deployment has an invalid callback URL, or Microsoft Graph keeps failing to return the app's details, contact Glean Support.

For additional assistance, contact [Glean Support](https://support.glean.com).
