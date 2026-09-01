---
url: "https://docs.glean.com/user-guide/apps/glean-for-desktop"
canonical: "https://docs.glean.com/user-guide/apps/glean-for-desktop"
title: "Use Glean for Desktop"
description: "Search and chat from a desktop app on macOS and Windows using quick entry from any application."
fetched_at: "2026-09-01T13:30:37.940Z"
---
On this page

Glean for Desktop puts search and chat on your Mac or Windows machine. Invoke quick entry from any application to run a search or start a chat without switching to a browser tab.

Mac App Store version deprecated

The macOS version of Glean for Desktop distributed through the Mac App Store is deprecated and is no longer available for new installations. Existing App Store users should migrate to the supported direct-download build. [Learn more about the deprecation and installation options](#mac-app-store-version-deprecation).

### About the desktop app[​](#about-the-desktop-app "Direct link to About the desktop app")

### Mac App Store version deprecation[​](#mac-app-store-version-deprecation "Direct link to Mac App Store version deprecation")

Glean is retiring the Mac App Store distribution path for the macOS desktop app. This does not retire Glean for Desktop. The supported direct-download build provides the complete desktop feature set.

To install the supported build:

-   **Individual installation:** Download the [DMG](https://storage.googleapis.com/glean-downloads/glean-desktop-app/Glean.dmg) or use **Glean Settings → Install**.
-   **Managed deployment:** Ask your administrator to [deploy Glean for Desktop for macOS](/administration/management/features/desktop/macos-deployment).

### Setting up the app[​](#setting-up-the-app "Direct link to Setting up the app")

You can download the desktop app from your [Glean install settings](https://app.glean.com/settings/install), or use the following links. After you install the app, sign in to Glean.

For macOS:

-   [DMG](https://storage.googleapis.com/glean-downloads/glean-desktop-app/Glean.dmg) (recommended)
-   [PKG](https://storage.googleapis.com/glean-downloads/glean-desktop-app/Glean.pkg)

For Windows:

-   [x64](https://storage.googleapis.com/glean-downloads/glean-desktop-app/win/Glean-x64.exe)
-   [ARM64](https://storage.googleapis.com/glean-downloads/glean-desktop-app/win/Glean-arm64.exe)

In the app's settings, you can make the following adjustments to your experience:

-   **Quick entry shortcut** controls the keyboard shortcut that opens quick entry anywhere on your machine. It is **Cmd+Shift+J** on macOS and **Ctrl+Shift+J** on Windows by default, and can be changed to any key combination.
-   **Hide menu bar icon** hides the Glean menu bar icon on macOS when turned on.
-   **Hide from dock** hides the Glean icon from the macOS Dock. If the app is pinned to the Dock, its icon will not be hidden, even when this setting is turned on.
-   **Open quick entry results in browser** causes search and chat queries from quick entry to open in your default browser, rather than the Glean app window, similar to the default Spotlight behavior on macOS.

### Important notes[​](#important-notes "Direct link to Important notes")

-   Glean will not search local files, such as content on your desktop.
-   On macOS, the app requires macOS 12 ("Monterey") or later.
-   On Windows, the app requires Windows 10 or later, on 64-bit (x64) or ARM64.

### Controlling automatic updates[​](#controlling-automatic-updates "Direct link to Controlling automatic updates")

We provide system preferences to control automatic updates. You can disable automatic updates on a per-user basis. This may be helpful for testing new versions of the app before releasing them, or for gradually rolling out app updates. To maintain app reliability and security, we recommend updating Glean whenever a new app version is released.

To prevent Glean from automatically checking for updates, run the following terminal command as each user who will be running the Glean desktop app:

```
defaults write /Users/$USER/Library/Preferences/com.glean.desktop GleanNoAutoUpdates -bool YES
```

Use the following command to re-enable automatic updates:

```
defaults write /Users/$USER/Library/Preferences/com.glean.desktop GleanNoAutoUpdates -bool NO
```

By default, automatic updates will be enabled.
