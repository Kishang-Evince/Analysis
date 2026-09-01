---
url: "https://docs.glean.com/connectors/native/microsoft365/about"
canonical: "https://docs.glean.com/connectors/native/microsoft365/about"
title: "Microsoft 365 overview"
description: "How the Microsoft 365 parent connector works and which child connectors it covers."
fetched_at: "2026-09-01T13:29:34.837Z"
---
On this page

The Microsoft 365 connector provides shared authentication and identity crawling for SharePoint and OneDrive. Set up Microsoft 365 first, then configure SharePoint and OneDrive as child connectors that inherit the parent credentials.

Scope

This page describes the current Microsoft 365 setup, where SharePoint and OneDrive are child connectors and Outlook continues to be configured separately. The new guided setup also links Outlook to the suite. See [Choose your Microsoft 365 setup](/connectors/native/microsoft365/choose-your-setup) for how the two compare.

## How it works[​](#how-it-works "Direct link to How it works")

You register one app in Microsoft Entra ID. This app handles identity crawling for your Microsoft 365 tenant and provides credentials that SharePoint and OneDrive inherit automatically — there is no separate app registration for each child connector.

After saving the Microsoft 365 suite, configure SharePoint and OneDrive as child connectors. Each inherits the parent credentials and only requires child-specific configuration.

## Child connectors[​](#child-connectors "Direct link to Child connectors")

| Connector | What it indexes | Setup |
| --- | --- | --- |
| [SharePoint](/connectors/native/sharepoint/) | Sites, pages, document libraries, files, and lists | [SharePoint setup](/connectors/native/sharepoint/choose-your-setup) |
| [OneDrive](/connectors/native/onedrive/) | Personal drives and shared files | [OneDrive setup](/connectors/native/onedrive/choose-your-setup) |

## Permissions[​](#permissions "Direct link to Permissions")

One Glean application in Microsoft Entra ID serves the whole suite. The parent connector handles identity permissions. Child connectors add their content permissions to the same app. See [Request all suite permissions upfront](/connectors/native/microsoft365/setup#request-all-suite-permissions-upfront) for the complete list, and [Set up Microsoft 365](/connectors/native/microsoft365/setup) for the full setup walkthrough.
