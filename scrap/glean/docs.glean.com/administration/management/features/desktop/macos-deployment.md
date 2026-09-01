---
url: "https://docs.glean.com/administration/management/features/desktop/macos-deployment"
canonical: "https://docs.glean.com/administration/management/features/desktop/macos-deployment"
title: "Deploy Glean for Desktop for macOS"
description: "Deploy Glean for Desktop to managed Mac computers with a mobile device management solution."
fetched_at: "2026-09-01T13:29:08.994Z"
---
On this page

Use this guide to deploy Glean for Desktop to managed Mac computers with a mobile device management (MDM) solution such as Jamf Pro or Iru (formerly Kandji).

For individual installation, users can download the app from their [Glean install settings](https://app.glean.com/settings/install).

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

Make sure you have:

-   macOS 12 or later
-   An MDM solution that supports package deployment and system-scoped configuration profiles
-   The latest [Glean PKG installer](https://storage.googleapis.com/glean-downloads/glean-desktop-app/Glean.pkg)

Use the PKG installer for managed deployments. The DMG installer is intended for users who install the app manually.

Meeting notes requirement

Glean for Desktop requires macOS 14.4 or later to capture system audio for meeting notes. Other desktop features support macOS 12 or later.

## Deploy the app[​](#deploy-the-app "Direct link to Deploy the app")

1

Download the installer

Download the latest [Glean PKG installer](https://storage.googleapis.com/glean-downloads/glean-desktop-app/Glean.pkg). Glean maintains this URL as a stable link to the latest production version.

2

Configure the required permissions

Determine which features your organization enables, then [create a PPPC profile](#create-a-pppc-profile) for the permissions that can be managed through MDM.

3

Upload and assign the package

Upload the PKG and PPPC profile to your MDM solution. Assign them to the appropriate devices or device groups. Deploy the PPPC profile before or alongside the app, and install the PKG in the system context.

The PKG installs noninteractively when deployed through an MDM solution. Unlike the Windows installer, it doesn't require `/S`, `-S`, or another silent-install argument.

To test a system-scoped command-line installation, run:

```
sudo /usr/sbin/installer -pkg /path/to/Glean.pkg -target /
```

4

Complete user setup

Ask users to open Glean and sign in. macOS prompts users to approve permissions that can't be granted through MDM.

## Configure macOS permissions[​](#configure-macos-permissions "Direct link to Configure macOS permissions")

Glean requests permissions only when a user enables a feature that needs them. Configure the permissions that apply to the features enabled for your organization.

| Feature | Required macOS permission | MDM behavior |
| --- | --- | --- |
| Search and chat | None | No additional macOS permission is required |
| Attach screenshots to quick chat | **Screen & System Audio Recording** | A PPPC profile can let a standard user approve access without administrator credentials |
| Meeting notes | **Microphone**, **Screen & System Audio Recording**, and **System Audio Recording Only** | Users must approve microphone and capture access in macOS |
| Voice chat | **Microphone** | Users must approve access in macOS |
| Dictate Anywhere (upcoming) | **Accessibility** | A PPPC profile can grant access on supported macOS versions |

Meeting notes doesn't record the user's screen. Glean establishes a display-capture connection to access system audio, then immediately stops and removes the video track. On macOS 14.4 or later, users may need to enable Glean under both **Screen & System Audio Recording** and **System Audio Recording Only**, then restart the app.

note

Apple has deprecated granting Accessibility access through PPPC profiles beginning with macOS 26.2. Review Apple's [Privacy Preferences Policy Control device management payload settings](https://support.apple.com/guide/deployment/privacy-preferences-policy-control-payload-dep38df53c2a/web) for the macOS versions in your fleet.

## Create a PPPC profile[​](#create-a-pppc-profile "Direct link to Create a PPPC profile")

Deploy a system-scoped Privacy Preferences Policy Control (PPPC) profile before or alongside Glean for Desktop.

Use the following application identity for the direct-download version of Glean:

-   **Bundle identifier:** `com.glean.desktop`
    
-   **Identifier type:** `bundleID`
    
-   **Developer Team ID:** `877XN49FUQ`
    
-   **Code requirement:**
    
    ```
    identifier "com.glean.desktop" and anchor apple generic and certificate 1[field.1.2.840.113635.100.6.2.6] /* exists */ and certificate leaf[field.1.2.840.113635.100.6.1.13] /* exists */ and certificate leaf[subject.OU] = "877XN49FUQ"
    ```
    

Configure the following services for the features your organization enables:

-   **Accessibility:** Set `Allowed` to `true` if you're preparing for Dictate Anywhere (upcoming) and the macOS versions in your fleet support MDM-granted Accessibility access.
-   **ScreenCapture:** Set `Authorization` to `AllowStandardUserToSetSystemService` when you enable screenshot attachments or meeting notes. This setting lets a standard user approve Glean without administrator credentials, but it doesn't approve access automatically.

Apple doesn't allow an MDM profile to silently grant microphone, screen-capture, or system-audio access. Users must still approve the applicable capture permissions in macOS.

### Sample PPPC profile

The following profile includes Accessibility for Dictate Anywhere (upcoming) and ScreenCapture for screenshot attachments and meeting notes. Remove any service your organization doesn't need.

Before deployment, replace:

-   Both `com.example` payload identifiers with unique reverse-DNS identifiers for your organization
-   `Example organization` with your organization name
-   Both `REPLACE-WITH-UNIQUE-...-UUID` values with different UUIDs

Don't change Glean's bundle identifier, code requirement, or Team ID.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict>  <key>PayloadContent</key>  <array>    <dict>      <key>PayloadDisplayName</key>      <string>Glean Desktop PPPC</string>      <!-- REPLACE: Use a unique reverse-DNS identifier for your organization. -->      <key>PayloadIdentifier</key>      <string>com.example.pppc.glean-desktop</string>      <key>PayloadType</key>      <string>com.apple.TCC.configuration-profile-policy</string>      <!-- REPLACE: Generate a unique UUID for this PPPC payload. -->      <key>PayloadUUID</key>      <string>REPLACE-WITH-UNIQUE-PPPC-PAYLOAD-UUID</string>      <key>PayloadVersion</key>      <integer>1</integer>      <key>Services</key>      <dict>        <key>Accessibility</key>        <array>          <dict>            <key>Allowed</key>            <true/>            <key>CodeRequirement</key>            <string>identifier "com.glean.desktop" and anchor apple generic and certificate 1[field.1.2.840.113635.100.6.2.6] /* exists */ and certificate leaf[field.1.2.840.113635.100.6.1.13] /* exists */ and certificate leaf[subject.OU] = "877XN49FUQ"</string>            <key>Comment</key>            <string>Allow Glean Desktop Accessibility access.</string>            <key>Identifier</key>            <string>com.glean.desktop</string>            <key>IdentifierType</key>            <string>bundleID</string>          </dict>        </array>        <key>ScreenCapture</key>        <array>          <dict>            <key>Authorization</key>            <string>AllowStandardUserToSetSystemService</string>            <key>CodeRequirement</key>            <string>identifier "com.glean.desktop" and anchor apple generic and certificate 1[field.1.2.840.113635.100.6.2.6] /* exists */ and certificate leaf[field.1.2.840.113635.100.6.1.13] /* exists */ and certificate leaf[subject.OU] = "877XN49FUQ"</string>            <key>Comment</key>            <string>Allow standard users to approve Screen &amp; System Audio Recording for Glean Desktop.</string>            <key>Identifier</key>            <string>com.glean.desktop</string>            <key>IdentifierType</key>            <string>bundleID</string>          </dict>        </array>      </dict>    </dict>  </array>  <key>PayloadDescription</key>  <string>Privacy Preferences Policy Control profile for Glean Desktop.</string>  <key>PayloadDisplayName</key>  <string>Glean Desktop PPPC</string>  <!-- REPLACE: Use a unique reverse-DNS identifier for your organization. -->  <key>PayloadIdentifier</key>  <string>com.example.profile.glean-desktop-pppc</string>  <!-- REPLACE: Enter your organization name. -->  <key>PayloadOrganization</key>  <string>Example organization</string>  <key>PayloadRemovalDisallowed</key>  <false/>  <key>PayloadScope</key>  <string>System</string>  <key>PayloadType</key>  <string>Configuration</string>  <!-- REPLACE: Generate a unique UUID different from the PPPC payload UUID. -->  <key>PayloadUUID</key>  <string>REPLACE-WITH-UNIQUE-PROFILE-UUID</string>  <key>PayloadVersion</key>  <integer>1</integer></dict></plist>
```

The code requirement above matches the current direct-download PKG. To verify the installed app's designated requirement, run:

```
codesign -dr - /Applications/Glean.app
```

Use everything after `designated =>` as the `CodeRequirement` value.

## Manage automatic updates[​](#manage-automatic-updates "Direct link to Manage automatic updates")

The direct-download version of Glean checks for and downloads updates automatically. It installs a downloaded update when the app quits. Glean recommends keeping automatic updates turned on so users receive reliability and security improvements.

To turn off automatic updates, run the following command in each user's context:

```
defaults write com.glean.desktop GleanNoAutoUpdates -bool true
```

To turn automatic updates back on, run:

```
defaults write com.glean.desktop GleanNoAutoUpdates -bool false
```

This preference is stored per user. If your MDM runs scripts in the system context, run the command separately in the context of each user who runs Glean.

## Validate the deployment[​](#validate-the-deployment "Direct link to Validate the deployment")

Test the deployment with a small device group before expanding it across your organization. Confirm that:

-   Glean is installed at `/Applications/Glean.app`
-   A user can open Glean and sign in
-   **Cmd+Shift+J** opens Glean
-   The PPPC profile appears in the device's management profiles
-   A standard user can approve screen-capture access without administrator credentials
-   Quick chat can attach a screenshot, if enabled
-   Meeting notes can capture microphone and system audio, if enabled

## Troubleshoot PPPC deployment[​](#troubleshoot-pppc-deployment "Direct link to Troubleshoot PPPC deployment")

If the PPPC profile doesn't apply, verify that:

-   The profile uses `com.glean.desktop` as the bundle identifier
-   The profile contains the complete code requirement shown above
-   The profile is deployed with system scope
-   The profile payload identifiers and UUIDs are unique
-   You're deploying the direct-download version rather than a version signed for another distribution channel
-   Your MDM supports the PPPC service and authorization values used in the profile

## See also[​](#see-also "Direct link to See also")

-   [Glean for Desktop](/administration/management/features/glean-for-desktop)
-   [Deploy Glean for Desktop for Windows](/administration/management/features/desktop/windows-deployment)
