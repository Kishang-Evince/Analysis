---
url: "https://docs.glean.com/connectors/native/sharepoint/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/sharepoint/choose-your-setup"
title: "Choose your SharePoint setup"
description: "Compare Glean's new SharePoint setup with the previous indexing connector setup, and find out which one applies to your deployment."
fetched_at: "2026-09-01T13:29:40.749Z"
---
On this page

Glean offers two ways to set up the SharePoint connector. Which one applies to you depends on your Glean deployment, not on when you connect SharePoint.

-   **New setup** applies to Glean deployments created on or after **August 14, 2026**. You connect SharePoint through the Microsoft 365 setup flow in the **Admin console**.
-   **Previous setup** applies to Glean deployments created before that date, including when you are connecting SharePoint to Glean for the first time. You configure the Microsoft 365 parent app registration and the SharePoint indexing connector.

Both setups produce a permission-aware SharePoint connector. The difference is how much you prepare in Microsoft beforehand, and how many places you configure.

## SharePoint setup comparison: New versus previous[​](#sharepoint-setup-comparison-new-versus-previous "Direct link to SharePoint setup comparison: New versus previous")

|  | New setup | Previous setup |
| --- | --- | --- |
| **What you prepare in Microsoft** | The [Microsoft 365 parent app registration](/connectors/native/microsoft365/setup), which SharePoint inherits its credentials from. Nothing separate for SharePoint. | An app registration in Microsoft Entra ID, SharePoint application permissions on both Microsoft Graph and SharePoint, a certificate for authentication, and admin consent granted in the Azure portal. |
| **What you configure in Glean** | **Connect**, **Set up indexing**, then **Review setup**, all in the **Admin console**. | Credentials on the Microsoft 365 parent connector, then the SharePoint domain and any additional application client IDs on the SharePoint child connector. |
| **Who needs to be involved** | A Glean administrator, working with a Microsoft 365 [Global Administrator](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles) who can consent for the tenant. | The same administrators, plus whoever manages app registrations and certificates in Microsoft Entra ID. The work is usually split across teams and sessions. |
| **How indexing runs** | Indexing is part of connecting SharePoint. The first crawl starts when you finish the final step, **Review setup**. | Indexing is configured as a separate step once credentials and permissions are in place. |
| **Whose permissions apply** | Glean reads SharePoint permissions and enforces them for every query, so each user sees only the content they can already open in SharePoint. | The same enforcement applies. Permissions are read using the application permissions granted to your own app registration. |
| **What changes for your current setup** | Nothing. The new setup applies to Glean deployments created from the cutover date onward. | Nothing. Connectors configured with the previous setup continue to crawl and serve results, and there is no migration to run. These instructions remain available under [Previous setup](/connectors/native/sharepoint/setup). |
| **Where to start** | [Set up SharePoint](/connectors/native/sharepoint/new-setup) | [Previous setup](/connectors/native/sharepoint/setup) |

## See also[​](#see-also "Direct link to See also")

-   [SharePoint overview](/connectors/native/sharepoint/about): What the SharePoint connector indexes, and how it fits into the Microsoft 365 suite.
-   [Set up the indexing connector](/connectors/native/sharepoint/set-up-indexing-connector): Indexing configuration, including what Glean crawls and the permissions each scope covers.
-   [Microsoft 365 connector](/connectors/native/microsoft365/): The parent connector that SharePoint inherits authentication and identity crawling from.
