---
url: "https://docs.glean.com/administration/management/features/desktop/windows-deployment"
canonical: "https://docs.glean.com/administration/management/features/desktop/windows-deployment"
title: "Deploy Glean for Desktop for Windows"
description: "Deploy Glean for Desktop to managed Windows devices with Microsoft Intune or another software-management solution."
fetched_at: "2026-09-01T13:29:08.915Z"
---
On this page

Use this guide to deploy Glean for Desktop to managed Windows devices. The procedure uses Microsoft Intune, but you can distribute the same installers with another software-management solution.

For individual installation, users can download the app from their [Glean install settings](https://app.glean.com/settings/install).

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

Make sure you have:

-   Windows 10 or later
-   A 64-bit x64 or ARM64 device
-   A device-management solution that supports EXE or Win32 app deployment

Glean provides a separate installer for each architecture.

## Download the installer[​](#download-the-installer "Direct link to Download the installer")

Choose the installer that matches the target device:

-   [Windows x64 installer](https://storage.googleapis.com/glean-downloads/glean-desktop-app/win/Glean-x64.exe)
-   [Windows ARM64 installer](https://storage.googleapis.com/glean-downloads/glean-desktop-app/win/Glean-arm64.exe)

These stable URLs point to the latest production version. Create separate packages and assignments for x64 and ARM64 devices to prevent the wrong installer from being deployed.

## Deploy with Microsoft Intune[​](#deploy-with-microsoft-intune "Direct link to Deploy with Microsoft Intune")

Glean for Desktop uses a per-user installer. Configure the app to install in the user context. If the installer runs in the system context, Glean is installed under the system profile instead of the target user's profile.

1

Package the installer

Use the [Microsoft Win32 Content Prep Tool](https://learn.microsoft.com/intune/intune-service/apps/apps-win32-prepare) to package the x64 or ARM64 installer as an `.intunewin` file.

2

Add the Win32 app

In the Microsoft Intune admin center, create a **Windows app (Win32)** and upload the `.intunewin` package.

3

Configure the install and uninstall commands

For x64, use:

```
Glean-x64.exe /S
```

For ARM64, use:

```
Glean-arm64.exe /S
```

The uppercase `/S` argument runs the NSIS installer silently. The argument is case-sensitive.

Use the following silent uninstall command for both architectures:

```
"%LOCALAPPDATA%\Programs\Glean\Uninstall Glean.exe" /S
```

4

Set the install behavior and requirements

Set **Install behavior** to **User**. Configure the architecture requirement to match the package: x64 for `Glean-x64.exe` or ARM64 for `Glean-arm64.exe`.

5

Configure detection

Add a detection rule that checks for `Glean.exe` in the target user's profile. See [Configure Intune detection](#configure-intune-detection) for an example.

6

Assign and test the app

Assign the app to the appropriate group. Test the deployment with a small group before expanding it across your organization.

## Configure Intune detection[​](#configure-intune-detection "Direct link to Configure Intune detection")

Glean is installed at the following path for each user:

```
%LOCALAPPDATA%\Programs\Glean\Glean.exe
```

Don't require a specific file version in the detection rule. Glean updates automatically while keeping the installation path stable.

Intune detection can run in the Microsoft Intune Management Extension's system context. As a result, using `%LOCALAPPDATA%` directly in a manual file rule can check the system profile instead of the signed-in user's profile.

For Intune, use a custom PowerShell detection script that resolves the signed-in user's profile:

```
try {  $userName = (Get-CimInstance -ClassName Win32_ComputerSystem).UserName  if ([string]::IsNullOrWhiteSpace($userName)) {    exit 1  }  $account = New-Object System.Security.Principal.NTAccount($userName)  $sid = $account.Translate([System.Security.Principal.SecurityIdentifier]).Value  $profileKey = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList\$sid"  $profilePath = (Get-ItemProperty -Path $profileKey -Name ProfileImagePath -ErrorAction Stop).ProfileImagePath  $profilePath = [Environment]::ExpandEnvironmentVariables($profilePath)  $gleanPath = Join-Path $profilePath "AppData\Local\Programs\Glean\Glean.exe"  if (Test-Path -LiteralPath $gleanPath) {    Write-Output "Glean installed"    exit 0  }} catch {  exit 1}exit 1
```

Intune considers the app detected when the script exits with code `0` and writes output to standard output. Validate the script against a test installation before deploying the app broadly.

## Configure Windows permissions[​](#configure-windows-permissions "Direct link to Configure Windows permissions")

Windows doesn't require a macOS-style PPPC profile. Glean for Desktop may request microphone access when a user first enables meeting notes or voice chat.

If your organization manages Windows privacy policies, allow desktop applications to access the microphone. Windows doesn't expose separate macOS-style Screen Recording or Accessibility controls for Glean.

## Manage automatic updates[​](#manage-automatic-updates "Direct link to Manage automatic updates")

Glean checks for updates and downloads them automatically. Glean installs a downloaded update when the user quits the app. Glean recommends keeping automatic updates turned on so users receive reliability and security improvements.

To turn off automatic updates for all users on a device, deploy the following registry value:

```
reg add "HKLM\Software\Glean\Desktop" /v GleanNoAutoUpdates /t REG_DWORD /d 1 /f
```

To turn automatic updates back on, set the value to `0`:

```
reg add "HKLM\Software\Glean\Desktop" /v GleanNoAutoUpdates /t REG_DWORD /d 0 /f
```

If you turn off Glean's automatic updates, keep both architecture-specific packages current and deploy new versions in the user context.

## Validate the deployment[​](#validate-the-deployment "Direct link to Validate the deployment")

Confirm that:

-   The installer architecture matches the target device
-   Glean installs without displaying the installer interface
-   Glean is installed at `%LOCALAPPDATA%\Programs\Glean\Glean.exe` for the target user
-   Intune detects the app after installation
-   The user can open Glean and sign in
-   **Ctrl+Shift+J** opens Glean
-   Glean can install an update after the user quits and reopens the app

## Troubleshoot the deployment[​](#troubleshoot-the-deployment "Direct link to Troubleshoot the deployment")

### Glean is installed under the system profile[​](#glean-is-installed-under-the-system-profile "Direct link to Glean is installed under the system profile")

Set **Install behavior** to **User**, then reinstall the app. Running the installer in the system context places the per-user installation under the system profile.

### Intune doesn't detect Glean[​](#intune-doesnt-detect-glean "Direct link to Intune doesn't detect Glean")

Confirm that the detection script resolves the signed-in user's profile and checks for `%LOCALAPPDATA%\Programs\Glean\Glean.exe`. Don't use a detection rule that requires one specific version.

### The installer displays an interface[​](#the-installer-displays-an-interface "Direct link to The installer displays an interface")

Confirm that the install command includes the uppercase, case-sensitive `/S` argument.

## See also[​](#see-also "Direct link to See also")

-   [Glean for Desktop](/administration/management/features/glean-for-desktop)
-   [Deploy Glean for Desktop for macOS](/administration/management/features/desktop/macos-deployment)
