---
url: "https://docs.glean.com/administration/management/features/mobile"
canonical: "https://docs.glean.com/administration/management/features/mobile"
title: "iOS and Android"
description: "Deploy and configure the Glean mobile apps for iOS and Android, including Microsoft Intune App Protection and Conditional Access setup."
fetched_at: "2026-09-01T13:29:09.095Z"
---
On this page

The Glean mobile apps give your teammates access to Glean Search and Glean Assistant from their iOS and Android devices. You can deploy the apps to managed devices and configure app protection policies to meet your organization's security requirements.

-   [iOS App Store](https://apps.apple.com/app/id1582892407)
-   [Google Play Store](https://play.google.com/store/apps/details?id=com.glean.app)

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before deploying the Glean mobile apps, make sure you have:

-   An active Glean tenant with SSO configured through your identity provider (for example, Okta or Microsoft Entra ID)
-   For Intune App Protection: a Microsoft Intune environment with app protection policies configured
-   The Glean app bundle ID: `com.glean.app`

## Microsoft Intune App Protection (MAM)[​](#microsoft-intune-app-protection-mam "Direct link to Microsoft Intune App Protection (MAM)")

The Glean mobile apps for iOS and Android integrate with the Microsoft Intune App SDK, so you can apply Microsoft Intune App Protection Policies (MAM) to the Glean app without requiring full device enrollment (MDM). The integration also supports signing in through the Intune-managed Microsoft Edge browser, which is required for Conditional Access policies that use the **Require app protection policy** grant.

For the complete setup guide - including prerequisites, App Protection Policy support, Microsoft Edge sign-in, Conditional Access, data protection, and troubleshooting - see [Configure Microsoft Intune MAM for the Glean mobile app](/administration/management/features/mobile-intune-mam).

## Control mobile access[​](#control-mobile-access "Direct link to Control mobile access")

Glean doesn't currently offer an org-level toggle in the **Admin console** to turn off mobile app access. To manage mobile access:

-   **Block mobile sign-in:** Configure your identity provider (for example, Okta or Microsoft Entra ID) or MDM solution to restrict access from mobile devices.
-   **Enforce data protection controls:** Use Microsoft Intune App Protection Policies to manage restrictions such as copy and paste prevention or screenshot prevention on mobile devices.

For Intune sign-in errors (for example, "Error Code 2" or a failed redirect back to the Glean app), see the troubleshooting section in [Configure Microsoft Intune MAM for the Glean mobile app](/administration/management/features/mobile-intune-mam#troubleshooting).
