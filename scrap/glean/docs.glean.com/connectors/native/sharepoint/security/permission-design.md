---
url: "https://docs.glean.com/connectors/native/sharepoint/security/permission-design"
canonical: "https://docs.glean.com/connectors/native/sharepoint/security/permission-design"
title: "SharePoint permissions design and management"
description: "Maintaining Least Privilege in Microsoft Integrations"
fetched_at: "2026-09-01T13:29:41.348Z"
---
On this page

At Glean, we are committed to maintaining the highest standards of data security and privacy in all our integrations. A cornerstone of our security philosophy is strict adherence to the principle of least privilege—requesting only the minimum permission scopes absolutely necessary to perform required data retrieval functions from our integration partners.

This datasheet outlines our approach to permission management across our various integrations, with special attention to certain Microsoft services where we face unique challenges due to the design choices of the Graph API and SharePoint REST API.

## Philosophy[​](#philosophy "Direct link to Philosophy")

Glean's integration architecture is designed with security-first principles. For all API integrations, we:

-   Request only read-oriented permission scopes whenever possible
-   Maintain a continuous review process to identify opportunities to reduce required permissions
-   Implement comprehensive audit logging of all data access activities
-   Never perform write operations when only read permissions are needed for functionality

## Microsoft SharePoint integration[​](#microsoft-sharepoint-integration "Direct link to Microsoft SharePoint integration")

While Glean maintains the principle of least privilege across all integrations, certain Microsoft API endpoints present unique challenges. When integrating with Microsoft SharePoint Online (M365), Glean makes use of both the Microsoft Graph API and SharePoint REST API.

**Glean only ever asks for the minimum permission scopes as defined by Microsoft to read data from these APIs.**

Unfortunately, certain Graph API and SharePoint REST API endpoints require minimum permission scopes of either `Sites.FullControl.All` or `Files.ReadWrite.All`; which is excessive for simply reading data.

Read more at [SharePoint connector permissions](/connectors/native/sharepoint/security/permissions).

This API design choice creates a situation where:

-   Glean must request permissions that appear excessive compared to our actual needs
-   Our permission requests may raise unnecessary security concerns during approval processes
-   The disconnect between requested permissions and actual usage can create confusion

In order to read data from the SharePoint environment, Glean has no choice but to ask for these broad permissions. However, even though these broad permission scopes are requested, **Glean's actual operations remain strictly limited to read-only activities**:

-   Our systems are designed with internal safeguards to ensure we NEVER perform write operations on these endpoints, regardless of the permissions technically granted.
-   Comprehensive audit logging is in place for all data access activities performed by our crawlers. These logs are able to be exported to a customer SIEM on request.

We continuously monitor for API updates from all our integration partners and will promptly adjust our permission requests downward whenever more appropriately scoped options become available.

## Alternatives[​](#alternatives "Direct link to Alternatives")

Glean has several options available to assist our customers in restricting either the scope of data that is accessible via the Microsoft APIs with these permissions.

Options are available to restrict data on both the Glean side and Entra ID side (depending on your security requirements); though these options are not without significant drawbacks that need to be carefully considered.

Read more at [Permissions and security controls for SharePoint](/connectors/native/sharepoint/security/controls).

## Advocating for industry standards[​](#advocating-for-industry-standards "Direct link to Advocating for industry standards")

If your security team has concerns about the broad permissions required for Microsoft integrations, we encourage you to raise these concerns directly with your Microsoft representative. Customer feedback is a powerful driver for positive change in API design and security practices.

Specific points worth discussing with your Microsoft representative include:

-   The importance of granular permission scopes that align with the principle of least privilege
-   How overly broad permission requirements create challenges for your security approval processes
-   The business impact of permission models that don't distinguish between read and write operations
-   Your organization's preference for working with vendors whose APIs follow security best practices

By voicing these concerns, your organization can help influence future API improvements that benefit the entire ecosystem. Glean is committed to working with you and all our integration partners to advance security standards across the industry.
