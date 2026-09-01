---
url: "https://docs.glean.com/connectors/native/microsoft365/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/microsoft365/choose-your-setup"
title: "Choose your Microsoft 365 setup"
description: "Work out which Microsoft 365 setup is yours, the new guided suite setup or the existing configuration reference, and how the one parent app and its child connectors fit together."
fetched_at: "2026-09-01T13:29:34.817Z"
---
On this page

Glean connects to Microsoft 365 as a suite. You register one Glean app in Microsoft Entra ID, and the SharePoint and OneDrive child connectors inherit its credentials. Which setup is yours depends on your Glean deployment, not on when you personally connect Microsoft 365.

-   **New setup** applies to new Glean deployments. Deployments created on or after August 14th, 2026 use a guided walkthrough that takes you from app registration to a saved suite.
-   **Previous setup** applies to existing Glean deployments. Even if you are connecting Microsoft 365 for the first time, your deployment keeps its current setup, the full configuration reference, unless Glean enables the new flow for you.

Both paths set up the same one-app suite, with certificate-based authentication and SharePoint and OneDrive inheriting the suite credentials. The new setup also links Outlook to the suite as a child connector, though Outlook still sets up its own client ID and certificate.

## How the suite works[​](#how-the-suite-works "Direct link to How the suite works")

You register a single Glean app in Microsoft Entra ID. That app handles identity crawling for your Microsoft 365 tenant and holds the certificate-based credentials. When you set up SharePoint and OneDrive afterward, each child connector inherits the parent app's client ID, tenant ID, and certificate, and adds only its own content permissions to the same app. There is no separate app registration for each child connector.

Authentication is certificate-based throughout. Glean uses app-only application permissions on the Microsoft Entra app, authenticated with a certificate you generate and upload, to reach Microsoft Graph and the SharePoint APIs.

## Microsoft 365 setup comparison: New versus previous[​](#microsoft-365-setup-comparison-new-versus-previous "Direct link to Microsoft 365 setup comparison: New versus previous")

Both paths set up the same one-app suite. What differs is how much the flow guides you and how much you configure directly.

|  | New setup | Previous setup |
| --- | --- | --- |
| **Who it is for** | Teams on a new Glean deployment | Teams on an existing Glean deployment, or who want the full reference |
| **What you prepare in Microsoft** | Register one Glean app, add identity permissions, grant admin consent, and generate a certificate | The same, described in full configuration detail |
| **What you configure in Glean** | Enter the application and directory IDs, upload the certificate and private key, select your tenant size, and save the suite | The same, plus additional apps for faster crawling on large tenants |
| **Certificate authentication** | Guided, with the detailed certificate steps linked from the reference | Full step-by-step, including generating the certificate and private key |
| **Child connectors** | Set up SharePoint, OneDrive, and Outlook afterward. SharePoint and OneDrive inherit the parent app. Outlook inherits the tenant ID and adds its own client ID and certificate | Set up SharePoint and OneDrive afterward. Each inherits the parent app. Outlook is a separate connector, configured on its own |
| **Required role** | Microsoft 365 Global Administrator | Microsoft 365 Global Administrator |
| **Where to start** | [Set up Microsoft 365](/connectors/native/microsoft365/new-setup) | [Set up Microsoft 365](/connectors/native/microsoft365/setup) |

For how the suite works and which child connectors it covers, see the [Microsoft 365 overview](/connectors/native/microsoft365/about).

## See also[​](#see-also "Direct link to See also")

-   [Microsoft 365 overview](/connectors/native/microsoft365/about) explains how the suite works and which child connectors it covers.
-   [Set up Microsoft 365](/connectors/native/microsoft365/new-setup) is the new guided suite setup.
-   [Set up Microsoft 365](/connectors/native/microsoft365/setup) is the full configuration reference.
