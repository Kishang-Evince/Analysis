---
url: "https://docs.glean.com/administration/search/troubleshooting"
canonical: "https://docs.glean.com/administration/search/troubleshooting"
title: "Troubleshooting Search"
description: "A comprehensive guide to understanding and resolving search-related issues in Glean's enterprise search functionality"
fetched_at: "2026-09-01T13:29:14.605Z"
---
On this page

Glean provides enterprise search capabilities that enable users to search across multiple applications through a unified interface. This guide outlines effective search practices and troubleshooting steps to help you maximize your search experience.

## Effective Search Techniques[​](#effective-search-techniques "Direct link to Effective Search Techniques")

### Global Search[​](#global-search "Direct link to Global Search")

The most comprehensive way to search across all accessible content is to use the asterisk (\*) operator in the search bar. This approach retrieves results from all Glean instances you have permission to access, organized by connector type.

### Connector-Specific Search[​](#connector-specific-search "Direct link to Connector-Specific Search")

To narrow your search to a specific connector, use the syntax `app:<connector>` in the search bar. For example, entering `app:jira` or `app:salesforce` will limit results to only that specific system.

Glean enhances this targeted search approach with connector-specific filters. For instance, when searching Jira content, you can filter by attributes such as Last Updated, From, and Type to refine your results further.

### Advanced Search Features[​](#advanced-search-features "Direct link to Advanced Search Features")

Glean offers advanced filtering capabilities to help you obtain more precise results. You can access these features through the Advanced Filters option, which provides additional search parameters and combinations.

To view detailed information about advanced search options, click the information (i) button in the interface:

## Troubleshooting Common Issues[​](#troubleshooting-common-issues "Direct link to Troubleshooting Common Issues")

When encountering search-related issues, consider the following factors and solutions:

### Access and Visibility Settings[​](#access-and-visibility-settings "Direct link to Access and Visibility Settings")

Connector visibility settings play a crucial role in search results. If a connector is configured for a specific test group, only members of that group will be able to view and access documents from that source. To ensure proper access:

1.  Verify that you are a member of the appropriate groups specified in the connector configuration page
2.  Confirm that you have the necessary permissions in the original source system
3.  Request your administrator to review your access permissions if needed

### Administrative Verification[​](#administrative-verification "Direct link to Administrative Verification")

Administrators can verify user access permissions through the following steps:

1.  Navigate to the Workspace section
2.  Select "Manage Search"
3.  Use the "Verify Access" feature to check specific user permissions

### Permission Troubleshooting[​](#permission-troubleshooting "Direct link to Permission Troubleshooting")

If you're unable to find expected content, ensure that:

1.  You belong to the user groups specified in the connector configuration
2.  Your permissions are properly synchronized between the source system and Glean
3.  The connector visibility settings align with your access requirements

note

If you continue to experience issues after following these troubleshooting steps, contact your Glean administrator for additional assistance. They can help verify your permissions and resolve any access-related concerns.
