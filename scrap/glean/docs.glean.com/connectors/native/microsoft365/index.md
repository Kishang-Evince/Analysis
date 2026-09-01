---
url: "https://docs.glean.com/connectors/native/microsoft365/"
canonical: "https://docs.glean.com/connectors/native/microsoft365/"
title: "Microsoft 365"
description: "Connect the Microsoft 365 suite to Glean. Register one Glean app in Microsoft Entra ID, and SharePoint and OneDrive inherit its certificate-based credentials."
fetched_at: "2026-09-01T13:29:34.628Z"
---
On this page

![Microsoft 365 logo](/img/connectors/icons/microsoft365.svg)Microsoft 365

# Connect the Microsoft 365 suite to Glean

Register one Glean app in Microsoft Entra ID and set up certificate authentication. SharePoint and OneDrive inherit the same credentials, so you configure the suite once before either child connector.

Suite connectorSharePointOneDriveCertificate authIdentity crawling

[Choose your Microsoft 365 setup](/connectors/native/microsoft365/choose-your-setup)[Microsoft 365 overview](/connectors/native/microsoft365/about)

## Choose your path[​](#choose-your-path "Direct link to Choose your path")

Both paths set up the same one-app Microsoft 365 suite. Which one is yours depends on your Glean deployment, not on when you personally connect Microsoft 365.

[

Onboarding

### New setup

You're on a new Glean deployment, created on or after August 14th, 2026. This guided walkthrough registers one Glean app in Microsoft Entra ID, adds certificate authentication, and connects the suite so SharePoint, OneDrive, and Outlook can join it.







](/connectors/native/microsoft365/new-setup)[

### Previous setup

You're on an existing Glean deployment. Even if you're connecting Microsoft 365 for the first time, use the full configuration reference. It covers app registration, identity permissions, certificate authentication, tenant size, and additional apps for faster crawling.







](/connectors/native/microsoft365/setup)

Not sure which is yours? [Choose your Microsoft 365 setup](/connectors/native/microsoft365/choose-your-setup).

## Child connectors[​](#child-connectors "Direct link to Child connectors")

After you save the suite, set up SharePoint and OneDrive. Each inherits the parent app credentials and asks only for child-specific configuration.

[

### SharePoint

Index SharePoint sites, pages, document libraries, files, and lists.







](/connectors/native/sharepoint/)[

### OneDrive

Index personal drives and shared files from OneDrive.







](/connectors/native/onedrive/)

## Support[​](#support "Direct link to Support")

[

### Error codes

Look up Microsoft 365 connector error codes and what they mean.







](/troubleshooting/error-codes/microsoft/office365/o365-1)
