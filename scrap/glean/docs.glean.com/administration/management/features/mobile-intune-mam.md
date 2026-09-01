---
url: "https://docs.glean.com/administration/management/features/mobile-intune-mam"
canonical: "https://docs.glean.com/administration/management/features/mobile-intune-mam"
title: "Configure Microsoft Intune MAM for the Glean mobile app"
description: "Set up Microsoft Intune Mobile Application Management (MAM) for the Glean mobile app, including App Protection Policies, Microsoft Edge sign-in, and Conditional Access."
fetched_at: "2026-09-01T13:29:09.157Z"
---
On this page

This article is for Microsoft Intune administrators and Glean administrators who want to apply **Mobile Application Management (MAM)** controls — also called App Protection Policies — to the Glean mobile app without requiring full device enrollment (MDM). It also covers the optional Microsoft Edge sign-in path, which is required for deployments that use Microsoft Entra ID Conditional Access with the **Require app protection policy** grant.

It applies to the official Glean mobile app from the App Store and Google Play. White-labeled Glean builds follow the same model but use different identifiers — contact your Glean account team to confirm details before applying these steps.

## Overview[​](#overview "Direct link to Overview")

The Glean mobile app for iOS and Android integrates with the [Microsoft Intune App SDK](https://learn.microsoft.com/en-us/intune/developer/app-sdk/) on both platforms. You can enable two related but independent capabilities on a Glean deployment:

-   **Intune MAM enrollment.** When this is enabled, the Glean app enrolls each user's app instance with your Intune tenant on first launch, after which the platform's Intune App SDK enforces whatever App Protection Policy you have assigned to the Glean app.
-   **Microsoft Edge sign-in.** When this is enabled, the Glean app routes the SSO sign-in flow through the Intune-managed Microsoft Edge browser instead of the default in-app browser. This is what enables compatibility with Conditional Access policies that require the **Require app protection policy** grant.

You can enable these two capabilities together or independently. Most customers that use the **Require app protection policy** Conditional Access grant enable both.

### What Glean configures vs. what you configure[​](#what-glean-configures-vs-what-you-configure "Direct link to What Glean configures vs. what you configure")

| Configured by Glean | Configured by your IT team |
| --- | --- |
| Enabling Intune MAM enrollment on your Glean deployment | Adding the Glean app (`com.glean.app`) to your Intune tenant |
| Enabling Microsoft Edge sign-in on your Glean deployment | Creating or attaching an App Protection Policy to the Glean app and assigning it to your users |
| Maintaining the Intune App SDK integration in the Glean mobile app | Assigning the App Protection Policy to the user groups that should be governed by it |
| Publishing Glean app updates to the App Store and Google Play | Configuring Microsoft Edge in Intune so it can return to the Glean app after authentication |
|  | Maintaining your tenant's Conditional Access policies |

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, make sure you have the following:

| Requirement | Notes |
| --- | --- |
| Glean mobile app version | **2.0.4** is the minimum supported version on both iOS and Android. We recommend running the latest published version from the official [Glean Work on the App Store](https://apps.apple.com/us/app/glean-work/id1582892407) or [Glean on Google Play](https://play.google.com/store/apps/details?id=com.glean.app) listing. |
| Microsoft Intune tenant | An active tenant where you can publish managed apps and assign App Protection Policies. |
| Glean deployment configuration | Intune MAM mode must be enabled on your Glean deployment. Contact Glean Support to enable it. See [Enable Intune MAM mode on your Glean deployment](#enable-intune-mam-mode-on-your-glean-deployment). |
| Microsoft Edge (optional) | Required on user devices only if your tenant uses a Conditional Access policy with the **Require app protection policy** grant, or if you require all SSO sign-in to happen in Edge. See [Microsoft Edge sign-in (optional)](#microsoft-edge-sign-in-optional). |
| Bundle identifier | The Glean app's bundle and package ID is `com.glean.app` on both platforms. Use this identifier when adding the app to Intune. |

note

White-labeled deployments use a different bundle and package identifier and may require separate validation. Contact your Glean account team for the exact identifier for your build before applying the steps below.

## Set up Intune MAM[​](#set-up-intune-mam "Direct link to Set up Intune MAM")

### Add Glean as a managed app in Intune[​](#add-glean-as-a-managed-app-in-intune "Direct link to Add Glean as a managed app in Intune")

1.  Sign in to the [Microsoft Intune admin center](https://intune.microsoft.com).
2.  Go to **Apps → All apps → Add**.
3.  Add the Glean app for each platform you support:
    -   **iOS/iPadOS**: app type **iOS store app**, then search for **Glean Work** (publisher: Glean Technologies). Bundle ID: `com.glean.app`.
    -   **Android**: app type **Managed Google Play app** or **Android store app**, then search for **Glean** (publisher: Glean Technologies). Package name: `com.glean.app`.
4.  Assign the Glean app to the user groups that should have it.

### Create or attach an App Protection Policy[​](#create-or-attach-an-app-protection-policy "Direct link to Create or attach an App Protection Policy")

1.  In the Intune admin center, go to **Apps → App protection policies**.
2.  Either create a new App Protection Policy or edit an existing one that should also apply to Glean.
3.  Under **Apps**, add the Glean app you registered above (target it by **Public app** or by bundle and package ID `com.glean.app`).
4.  Configure the **Data protection**, **Access requirements**, and **Conditional launch** settings that match your organization's standards. The Glean mobile app integrates with the Intune App SDK and doesn't override or filter the SDK's policy enforcement. See [Supported Intune controls](#supported-intune-controls) for the per-control status.
5.  Assign the policy to the same user groups that have the Glean app.

tip

If you require the **Require app protection policy** grant in a Conditional Access policy, also enable Microsoft Edge sign-in for Glean (next section).

### Enable Intune MAM mode on your Glean deployment[​](#enable-intune-mam-mode-on-your-glean-deployment "Direct link to Enable Intune MAM mode on your Glean deployment")

To activate the in-app enrollment flow, Intune MAM mode must be enabled on your Glean deployment. File a request with [Glean Support](https://support.glean.com) and include the following:

-   Your Glean tenant URL (for example, `acme.glean.com`).
-   Whether you also require sign-in to happen in Microsoft Edge (see the next section). This is needed if your tenant's Conditional Access policy uses the **Require app protection policy** grant.

Glean Support enables Intune MAM mode (and optionally Edge sign-in) and confirms back to you. After this is enabled, the next time a user opens the Glean mobile app and enters their work email, the app triggers Intune enrollment before sign-in completes.

### Microsoft Edge sign-in (optional)[​](#microsoft-edge-sign-in-optional "Direct link to Microsoft Edge sign-in (optional)")

Enable this step if your organization requires all SSO sign-in to happen inside the Intune-managed Microsoft Edge browser — for example, when a Conditional Access policy uses the **Require app protection policy** grant on the identity provider. Microsoft Edge sign-in is independent of Intune MAM enrollment — you can enable either, both, or neither.

This section has the following prerequisites:

1.  Microsoft Edge is deployed to your users' devices through Intune and is itself enrolled as a managed app.
2.  Microsoft Edge on the device is configured to permit redirection back to the Glean app callback URL `com.glean.app:/auth-callback`. The exact setting depends on your Microsoft Edge management configuration — consult Microsoft's Edge for Intune documentation.

Important

If Microsoft Edge isn't configured to redirect back to `com.glean.app:/auth-callback`, Edge completes the Microsoft sign-in but can't hand the result back to the Glean app, and sign-in appears to hang.

When you ask Glean Support to enable Microsoft Edge sign-in for your deployment, the Glean app behaves as follows:

-   **iOS**: The Glean app opens the OAuth authorization URL using the `microsoft-edge-https://` URL scheme, which launches Microsoft Edge if it's installed. If Edge isn't installed, the app links the user to the App Store to install it.
-   **Android**: The Glean app restricts the OAuth flow to Microsoft Edge (package `com.microsoft.emmx`) through Chrome Custom Tabs. If Edge isn't installed, the user is sent to Google Play to install it.

### Restrictive "Receive data from other apps" policies[​](#restrictive-receive-data-from-other-apps-policies "Direct link to Restrictive \"Receive data from other apps\" policies")

If your App Protection Policy sets **Receive data from other apps** to **Policy managed apps** instead of **All apps**, users can only complete the Glean sign-in flow in an Intune-managed browser. The sign-in flow requires the following:

-   **Intune administrators** must add Microsoft Edge as a managed app in Intune and assign it an App Protection Policy, so Edge itself is policy managed.
-   **Users** must install the Intune Company Portal app.
-   **Users** must install Microsoft Edge. Edge doesn't need to be the device's default browser.
-   **Users** must sign in to Microsoft Edge with their work account.

## Validate the setup[​](#validate-the-setup "Direct link to Validate the setup")

After completing the steps above, confirm the setup on a test device before rolling out to your user base:

1.  Install the Glean mobile app on a test device from the App Store or Google Play.
2.  On a user account that's in the Intune assignment group, open the Glean app and enter the user's work email.
3.  Confirm that a Microsoft sign-in prompt for Intune enrollment appears.
4.  Complete the Microsoft sign-in. On iOS, the app may restart automatically — this is expected.
5.  After the app reopens (or after enrollment completes on Android), confirm the Glean SSO sign-in step runs. If Microsoft Edge sign-in is enabled, confirm that this step opens inside Microsoft Edge.
6.  Confirm that the App Protection Policy controls you configured (for example, app PIN on launch, or copy and paste restrictions) take effect inside the Glean app.

If any of these steps fails, see [Troubleshooting](#troubleshooting) before contacting Glean Support.

## End-user experience[​](#end-user-experience "Direct link to End-user experience")

The first time a user opens the Glean mobile app on a deployment with Intune MAM mode enabled, they see two sequential sign-in steps:

1.  **Microsoft sign-in for Intune enrollment.** The user enters their work account credentials so that the Glean app instance can register with the Intune tenant. On iOS, after enrollment completes, the Glean app may restart automatically — this is expected.
2.  **Glean sign-in.** After the app reopens (or after enrollment completes on Android), the user signs in to Glean through your normal SSO provider. If Edge sign-in is enabled, this step opens inside Microsoft Edge instead of the default in-app browser.

On subsequent launches, the Glean app remains enrolled and only the Glean sign-in step is required (and only when the user is signed out).

Once enrolled and signed in, the App Protection Policy controls that you assigned to the Glean app take effect — for example, app PIN, copy and paste restrictions, save-as restrictions, jailbreak and root detection, and offline grace period. See [Supported Intune controls](#supported-intune-controls) for the full list and for platform-specific behavior, especially around screen capture on iOS versus Android.

## Conditional Access[​](#conditional-access "Direct link to Conditional Access")

The Glean mobile app works with Microsoft Entra ID Conditional Access policies, including the **Require app protection policy** grant.

To use this grant with Glean:

1.  Confirm with Glean Support that Microsoft Edge sign-in is enabled for your deployment (see [Microsoft Edge sign-in (optional)](#microsoft-edge-sign-in-optional)).
2.  Ensure the Glean app and an App Protection Policy targeting `com.glean.app` are assigned to your users.
3.  Verify that Microsoft Edge is installed and Intune-managed on your users' devices, and that Microsoft Edge is configured to permit redirection back to `com.glean.app:/auth-callback`.

You don't need to exclude Glean from the Conditional Access policy.

## Supported Intune controls[​](#supported-intune-controls "Direct link to Supported Intune controls")

The Glean mobile app integrates with the official Microsoft Intune App SDK — [IntuneMAMSwift](https://github.com/microsoftconnect/ms-intune-app-sdk-ios) on iOS and the [Microsoft Intune App SDK for Android](https://github.com/msintuneappsdk/ms-intune-app-sdk-android) on Android — using the standard enrollment and policy-evaluation APIs. Glean doesn't override or filter App Protection Policy decisions made by the SDK.

### App Protection Policy controls[​](#app-protection-policy-controls "Direct link to App Protection Policy controls")

The following App Protection Policy controls are expected to apply to the Glean mobile app through the Intune App SDK on the platforms indicated. "Supported" here means the Glean app integrates with the Intune App SDK such that the SDK's standard enforcement of the policy applies to Glean, subject to Microsoft platform behavior. It doesn't mean Glean implements an additional, app-side enforcement of that control.

| Category | Control | iOS | Android | Notes |
| --- | --- | --- | --- | --- |
| Access requirements | App PIN | Supported | Supported | Enforced by the Intune App SDK. |
| Access requirements | Biometric unlock (Face ID, Touch ID, fingerprint) | Supported | Supported | Enforced by the Intune App SDK. |
| Access requirements | Work or school account credentials | Supported | Supported | Enforced by the Intune App SDK. |
| Access requirements | Recheck access requirements after N minutes | Supported | Supported | Enforced by the Intune App SDK. |
| Conditional launch | Maximum PIN attempts (block or wipe) | Supported | Supported | Enforced by the Intune App SDK. |
| Conditional launch | Offline grace period (block or wipe) | Supported | Supported | Enforced by the Intune App SDK. |
| Conditional launch | Jailbroken or rooted device detection | Supported | Supported | Enforced by the Intune App SDK. |
| Conditional launch | Minimum OS version | Supported | Supported | Enforced by the Intune App SDK. |
| Conditional launch | Minimum app version | Supported | Supported | Enforced by the Intune App SDK. |
| Data protection | Restrict cut, copy, and paste between managed and unmanaged apps | Supported | Supported | Enforced by the Intune App SDK. |
| Data protection | Restrict "Save copies of org data" and "Save as" to managed locations | Supported | Supported | Enforced by the Intune App SDK. |
| Data protection | Restrict "Send org data to other apps" | Supported | Supported | Enforced by the Intune App SDK. |
| Data protection | Restrict "Receive data from other apps" | Supported | Supported | Enforced by the Intune App SDK. |
| Data protection | Restrict third-party keyboards | Supported | Supported | Enforced by the Intune App SDK. |
| Data protection | Encrypt org data | Supported | Supported | Enforced by the Intune App SDK. |
| Data protection | Block screen capture | Not enforceable by third-party apps on iOS — see the platform note below | Supported | See the platform note below. |
| Data protection | Obscure app contents in the app switcher or task preview | Supported (when "Block screen capture" is enabled) | Supported | iOS uses task-switcher obfuscation in place of screenshot blocking. |

**Platform note on screen capture.** Android allows the Intune App SDK to actively block screenshots of managed content when the corresponding policy setting is enabled, and Glean inherits this behavior. iOS doesn't allow third-party apps to fully block screenshots. When the corresponding policy setting is enabled, the SDK on iOS obscures Glean's screen in the app switcher and task preview, but can't block an active screenshot at the OS level. This is a platform limitation that applies to every third-party MAM-enabled iOS app, not a Glean limitation.

For App Protection Policy controls not listed in the table above — including newer controls Microsoft releases over time and controls that require app-side custom integration — contact [Glean Support](https://support.glean.com) for the current support status before relying on them in a deployment plan.

For Microsoft's full list of settings, see [iOS and iPadOS App protection policy settings](https://learn.microsoft.com/en-us/mem/intune/apps/app-protection-policy-settings-ios) and [Android App protection policy settings](https://learn.microsoft.com/en-us/mem/intune/apps/app-protection-policy-settings-android).

### App Configuration[​](#app-configuration "Direct link to App Configuration")

The Glean mobile app doesn't require Intune-managed App Configuration values for normal operation. The settings most commonly distributed through App Configuration in other apps — tenant URL and login hint — are handled by the Glean app itself (the user enters their work email at the sign-in screen).

If your deployment plan depends on pushing specific App Configuration values to the Glean app from Intune, contact [Glean Support](https://support.glean.com) to discuss the use case before you configure them. The app may not read them today.

### Microsoft Validated Apps for Intune list[​](#microsoft-validated-apps-for-intune-list "Direct link to Microsoft Validated Apps for Intune list")

The Glean mobile app integrates with the official Microsoft Intune App SDK on both platforms but isn't currently listed on Microsoft's [Validated Apps for Intune](https://learn.microsoft.com/en-us/mem/intune/apps/apps-supported-intune-apps) directory. The Validated Apps directory is a Microsoft-published catalog of partner apps. Inclusion is an additional Microsoft-managed validation step beyond the SDK integration itself. Absence from the directory doesn't change which Intune App SDK controls apply to a managed Glean app.

For the current status, contact your Glean account team.

## Data protection and local storage[​](#data-protection-and-local-storage "Direct link to Data protection and local storage")

When the Glean mobile app is enrolled with Intune, it operates as a managed app on the device:

-   **App data on the device is governed by the assigned App Protection Policy.** This includes the data protection, access requirements, and conditional launch settings the administrator configured (see [Supported Intune controls](#supported-intune-controls)).
-   **Glean doesn't retain a local copy of org content beyond what's needed for the app to function.** Search results, chat responses, and documents are fetched from Glean's servers on demand and rendered in the app. The app doesn't maintain an offline content store of organizational documents.
-   **Authentication tokens are stored in the platform's secure storage** — the iOS Keychain on iOS, and the equivalent secure storage on Android. They aren't written to general app storage.
-   **Communication with Glean's servers uses HTTPS.** All requests to your Glean tenant are made over TLS.
-   **Uninstalling the Glean app removes the app's sandbox data** (cached UI data and app preferences) and unenrolls the app instance from Intune. On iOS, certain platform-managed credential stores (for example, the iOS Keychain) may retain entries across reinstall, per Apple's platform behavior. On Android, app uninstall clears the Glean app's data.

For full details on Glean's data handling, certifications, and infrastructure security, see the [Glean Trust Portal](https://trust.glean.com).

## Limitations[​](#limitations "Direct link to Limitations")

Be aware of the following limitations:

-   **Unenrollment requires uninstall.** Once a Glean app instance is enrolled with Intune, there's no in-app option to unenroll. To remove enrollment, the user uninstalls the Glean app. Reinstalling and signing in re-runs the enrollment flow.
-   **Two sign-in steps on first launch.** Users see a Microsoft sign-in for enrollment and then a Glean SSO sign-in. On iOS, the app may restart between the two steps. Subsequent launches don't repeat enrollment.
-   **Foreground enrollment only.** Enrollment runs when the user opens the Glean app and enters their email. It doesn't happen silently in the background.
-   **Microsoft Edge is required for the Conditional Access "Require app protection policy" grant.** If your Conditional Access policy uses this grant and Edge isn't installed (or isn't the configured browser for Glean), sign-in fails.
-   **White-labeled builds use a different bundle identifier** and require their own entry in the Intune portal.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

| Symptom | Likely cause | Resolution |
| --- | --- | --- |
| Sign-in opens Safari (iOS) or the default browser (Android) instead of Edge, then fails with a Conditional Access error such as "You can't get there from here". | Edge sign-in isn't enabled on the Glean deployment. | Ask Glean Support to enable Edge sign-in for your deployment. |
| User taps **Sign in with Edge**, Edge opens, then sign-in fails with "Unexpected error. Please try logging in again. \[Error Code 2\]" or hangs after Microsoft sign-in. | Edge isn't Intune-managed on the device, or Microsoft Edge isn't configured to redirect back to `com.glean.app:/auth-callback`. | Confirm Microsoft Edge is enrolled in Intune and configured to permit redirection back to the Glean app's URL scheme. The exact setting depends on your Microsoft Edge management configuration. |
| Enrollment screen never appears even though Intune MAM mode is enabled. | The user's email doesn't match an Intune-assigned account, or the Glean app version is older than 2.0.4. | Verify the user is in a group assigned to the Glean app in the Intune portal. Update Glean to the latest version from the App Store or Google Play. |
| Enrollment fails immediately or with a Microsoft error code. | The Glean app isn't yet published to the user's Intune tenant, or an App Protection Policy isn't assigned to them. | In the Intune admin center, confirm both the Glean app assignment and the App Protection Policy assignment include the user. |
| App keeps prompting for enrollment on every launch. | The Intune-enrolled account on the device was removed or signed out from another Microsoft app. | Have the user reinstall the Glean app and complete enrollment again. |
| iOS app appears to crash or restart after the Microsoft sign-in step. | Expected behavior. The Intune SDK restarts the app after successful enrollment. | Reopen Glean. The second sign-in step (Glean SSO) should run normally. |

If a symptom persists, contact [Glean Support](https://support.glean.com) and include your deployment URL, Glean app version, device platform and OS version, whether Microsoft Edge sign-in is enabled, and the exact error message or screenshot.

### What Glean Support can and can't help with[​](#what-glean-support-can-and-cant-help-with "Direct link to What Glean Support can and can't help with")

Glean Support can:

-   Confirm and change whether Intune MAM enrollment and Microsoft Edge sign-in are enabled on your Glean deployment.
-   Investigate Glean app behavior during enrollment and sign-in.
-   Verify the Glean app version, bundle identifier, and OAuth callback URL.

Glean Support can't:

-   Modify your Intune tenant, App Protection Policies, Conditional Access policies, or app assignments.
-   Debug Microsoft sign-in, Microsoft Entra ID, or Microsoft Edge issues that occur before the Glean app is reached.
-   Provide root-cause analysis for behavior that's governed by the Intune App SDK or by Microsoft's platform — for example, why a specific App Protection Policy setting takes effect a certain way at the OS level. Glean Support can confirm whether the Glean app is enrolled, which Glean app version is running, and where the boundary lies between Glean and Microsoft. Microsoft Support owns the underlying platform behavior.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Does Glean require full Intune MDM enrollment of the device?

No. Glean supports MAM (App Protection Policies) without MDM. Devices don't have to be enrolled in Intune for App Protection Policies to apply to the Glean app.

### Does Glean store organizational data outside the policy-managed container?

No. While enrolled, Glean's app data is governed by the App Protection Policy's data protection and encryption settings, the same as any other Intune-managed app on the device. See [Data protection and local storage](#data-protection-and-local-storage) for more detail.

### Is Glean on Microsoft's Validated Apps for Intune list?

Not at this time. The Glean mobile app uses the official Microsoft Intune App SDK integration on both iOS and Android, which is what governs how App Protection Policies are enforced. Listing in Microsoft's Validated Apps directory is a separate Microsoft-managed step that doesn't change SDK enforcement. Contact your Glean account team for the current status.

### Does Glean read Intune App Configuration values from the Intune portal?

The Glean mobile app doesn't require App Configuration values for normal operation. If your deployment has a specific App Configuration use case, contact Glean Support to confirm whether the value you want to push is read by the app.

### Which Glean app versions support Intune MAM?

Version 2.0.4 and later on both iOS and Android. Always recommend the latest version from the App Store or Google Play to your users.

### Can users opt out of enrollment?

No. When Intune MAM mode is enabled on the deployment, every user who signs in to the Glean mobile app on that deployment goes through Intune enrollment. To exclude specific users, assign the Glean app and the App Protection Policy to a narrower group in Intune.

### Can a user unenroll the Glean app from Intune without uninstalling it?

Not today. To unenroll, the user uninstalls the Glean app from the device.

### Does Glean support the "Require app protection policy" Conditional Access grant?

Yes, when Microsoft Edge sign-in is also enabled on the Glean deployment and Microsoft Edge is installed and Intune-managed on the device, configured to permit redirection back to `com.glean.app:/auth-callback`.

### Do white-labeled Glean builds support Intune MAM?

The Intune App SDK integration may be present in a white-labeled build, but support isn't automatic. White-labeled builds use a different bundle and package identifier, are produced on a separate build pipeline, and require per-build verification. Contact your Glean account team to confirm Intune MAM support and the correct identifiers for your white-labeled build before deploying.

### Where do I file a question or issue that isn't covered here?

Open a ticket at [Glean Support](https://support.glean.com).

## See also[​](#see-also "Direct link to See also")

-   [iOS and Android](/administration/management/features/mobile) — deploy and manage the Glean mobile apps
-   [Glean Trust Portal](https://trust.glean.com) — Glean's data handling, certifications, and security posture
