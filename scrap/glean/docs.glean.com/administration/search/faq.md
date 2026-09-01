---
url: "https://docs.glean.com/administration/search/faq"
canonical: "https://docs.glean.com/administration/search/faq"
title: "Search FAQ"
description: "Answers to common questions about Glean Search, Knowledge Graph, and Connectors"
fetched_at: "2026-09-01T13:29:14.429Z"
---
On this page

## Enterprise Search Fundamentals[​](#enterprise-search-fundamentals "Direct link to Enterprise Search Fundamentals")

### What is Enterprise Search and how is it different from normal search?

Enterprise Search is a specialized tool designed to help users quickly and effectively access information needed for their jobs. Unlike regular internet search engines, Enterprise Search specifically focuses on your organization's internal systems:

-   Internal documents
-   Emails
-   Reports
-   Customer records
-   Product data

[

### Learn More About Enterprise Search

Discover how enterprise search can transform your organization's information access







](https://www.glean.com/blog/what-is-enterprise-search)

### Can Glean search the internet?

No, Glean is specifically designed to search through your organization's internal systems, databases, and repositories. It is not intended to provide internet search functionality.

## Security and Permissions[​](#security-and-permissions "Direct link to Security and Permissions")

### Can users see content they don't have permission to access?

No, users cannot see content they don't have permission to access. Glean strictly respects all permissions and access controls set within your organization's systems.

### How does Glean ensure users can't see content they shouldn't?

Glean implements comprehensive security measures by respecting your organization's existing permissions and access controls. When crawling a connected connector, Glean fetches three essential types of information:

1

Content

The actual content of documents and resources

2

Activity Information

-   Creation date
-   Edit history
-   View history
-   Comment history
-   Share history

3

Identity Information

-   Content creator identification
-   Edit history contributors
-   Document viewers and their department/team affiliations
-   User/group access permissions

The identity information forms part of the Glean Knowledge Graph, which is used to determine search result visibility.

### Learn More About Knowledge Graph

Understand how Glean's Knowledge Graph ensures secure and relevant search results

## Connectivity and Integration[​](#connectivity-and-integration "Direct link to Connectivity and Integration")

### What apps does Glean support?

Glean provides native integration with over 80 different connectors out of the box.

[

### View Supported Connectors

See the complete list of supported applications and services







](https://www.glean.com/connectors)

### What if Glean doesn't support an app I use?

If Glean doesn't currently support your application, you have several options:

1.  Contact your Glean account team or Glean support - the app might be on our development roadmap
2.  Use Glean's Indexing API and SDK to create your own connectors

info

The Indexing API allows you to push data to Glean from within your environment, rather than requiring Glean to connect directly to your systems.

[

### Explore the Indexing API

Learn how to create custom connectors for your applications







](https://developers.glean.com/api-info/indexing/getting-started/overview)

### Can I connect a database (e.g., MySQL) to Glean?

Yes, though you'll need to use the [Indexing API](https://developers.glean.com/api-info/indexing/getting-started/overview) as Glean doesn't provide native database connectors.

warning

Direct database connections can generate significant noise and may impact search result quality. We recommend connecting to the applications that query your databases rather than connecting directly to the databases themselves.

### Can Glean connect to my on-premise Jira/Confluence server?

Yes, on-premise connections are supported through either:

-   Shared VPC
-   Site-to-Site VPN

note

Contact Glean support for detailed connectivity requirements and setup instructions.

### Can Glean connect to my emails?

Yes, Glean provides out-of-the-box support for:

-   Exchange Online (Outlook)
-   Google Workplace (Gmail)

For other email systems, you can utilize the [Indexing API](https://developers.glean.com/api-info/indexing/getting-started/overview).

### Can Glean connect to on-premise SharePoint?

While technically possible, on-premise SharePoint connection is not supported directly out-of-the-box.

note

Please contact Glean support for additional information about on-premise SharePoint integration options.
