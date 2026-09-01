---
url: "https://docs.glean.com/administration/management/audit-logs/admin-audit-logs"
canonical: "https://docs.glean.com/administration/management/audit-logs/admin-audit-logs"
title: "Audit Logs"
description: "Track configuration changes by Admins and Internal Support, troubleshoot issues, and maintain accountability with Glean's audit logging system"
fetched_at: "2026-09-01T13:29:08.682Z"
---
On this page

Glean's Admin Audit Logs provide comprehensive visibility into administrative actions performed within your Glean instance. These logs serve as a critical tool for troubleshooting configuration issues, maintaining security compliance, and tracking changes made by both internal admins and Glean support staff.

## Troubleshoot Configuration Issues[​](#troubleshoot-configuration-issues "Direct link to Troubleshoot Configuration Issues")

Admin audit logs are essential for diagnosing and resolving configuration problems in your Glean deployment:

### Change History Tracking

Review chronological changes to identify when and what modifications were made to your configuration

### Root Cause Analysis

Quickly identify the source of issues by correlating problems with recent configuration changes

### Compliance Reporting

Generate reports for security audits, compliance reviews, and regulatory requirements

### External Analysis

Import data into business intelligence tools or custom analytics platforms

## Audit Log Features[​](#audit-log-features "Direct link to Audit Log Features")

### Coverage[​](#coverage "Direct link to Coverage")

Admin audit logs track administrative and configuration actions. They do not include end-user activity, connector crawl telemetry, API rate-limit metrics, or usage analytics. For usage analytics, see [Insights](/administration/insights/overview).

### Connector Configuration

-   Connector setup and modifications
-   Failures during connector setup
-   Connector creation and deletion
-   Crawl schedule changes

### System Configuration

-   Feature enablement and disablement
-   Global configuration changes
-   Branding and customization changes

### Advanced Search and Filtering[​](#advanced-search-and-filtering "Direct link to Advanced Search and Filtering")

Efficiently locate specific audit entries using powerful search capabilities:

-   **Time Range Filtering**: Narrow down logs to specific dates or time periods
-   **User-Based Filtering**: View tools by specific admins
-   **Tool Type Filtering**: Focus on particular types of changes (e.g., connector changes, global configuration changes)
-   **Keyword Search**: Find logs containing specific configuration names or values

tip

Use a combination of filters to quickly identify patterns or investigate specific incidents. For example, filter by "Past week" + "Admin" + "Failures" to review recent failures to setup triggered by an admin.

### Export and Reporting[​](#export-and-reporting "Direct link to Export and Reporting")

The Admin console provides on-demand CSV export of audit log data for external analysis, compliance reporting, and long-term record keeping.

1

Access Export Feature

In the [Admin Console](https://app.glean.com/admin/), go to **Users & permissions** → **Audit logs**

2

Apply Filters

Use the filtering options to select the specific logs you want to export

3

Export to CSV

Click the "Export to CSV" button to download your filtered audit log data

info

CSV exports include all available log fields including timestamps, user identities, tool descriptions, affected resources, and change details.

CSV export vs. ongoing log delivery

CSV export is the built-in, self-serve way to pull audit log data from the Admin console. It captures administrative and configuration changes, and is separate from [Glean Customer Event logs](/administration/gce-logs/data-dictionary), which record end-user usage events such as searches, clicks, and chats.

For Glean-hosted deployments, Glean can also configure ongoing delivery of your logs to a destination you manage. This is available for both audit logs and Customer Event logs, though it isn't enabled by default and isn't self-serve. Customer Event logs are typically delivered to object storage (Google Cloud Storage or Amazon S3) or loaded into a data warehouse such as BigQuery or Athena. The right destination for audit logs depends on your environment. To set it up, contact your Glean account team.

## Audit Log Retention[​](#audit-log-retention "Direct link to Audit Log Retention")

### Default Retention Period[​](#default-retention-period "Direct link to Default Retention Period")

Glean maintains audit logs for a standard retention period to balance storage efficiency with administrative needs. The default retention period of **30 days** ensures you have sufficient historical data for typical troubleshooting and compliance requirements.

### Custom Retention Periods[​](#custom-retention-periods "Direct link to Custom Retention Periods")

warning

If your organization requires a longer audit log retention period for compliance, security, or operational reasons, contact your Glean representative to discuss custom retention options.

#### When to Consider Extended Retention[​](#when-to-consider-extended-retention "Direct link to When to Consider Extended Retention")

-   **Compliance Requirements**: Regulatory or industry standards requiring longer data retention
-   **Security Investigations**: Need for extended historical analysis capabilities
-   **Organizational Policies**: Internal governance requiring longer audit trails
-   **Change Management**: Extended rollback and analysis capabilities

#### How to Request Retention Changes[​](#how-to-request-retention-changes "Direct link to How to Request Retention Changes")

1

Assess Requirements

Determine your specific retention needs based on compliance, security, and operational requirements

2

Contact Glean

Reach out to your Glean Account Manager or [file a ticket](https://support.glean.com/hc/en-us) with Glean Support

3

Provide Details

Share your retention requirements, justification, and any compliance standards that apply

4

Implementation

Glean will work with you to implement the appropriate retention period for your needs

## Security Considerations[​](#security-considerations "Direct link to Security Considerations")

tip

-   Restrict audit log access to appropriate admins only
-   Regularly export logs for backup and compliance purposes
-   Monitor for suspicious administrative activity patterns
-   Maintain separate secure storage for exported audit data

## Accessing Audit Logs[​](#accessing-audit-logs "Direct link to Accessing Audit Logs")

In the [Admin Console](https://app.glean.com/admin/), go to **Users & permissions** → [Audit logs](https://app.glean.com/admin/setup/auditlogs) to view, search, and export your audit log data.

info

Access to audit logs requires appropriate administrative privileges. Contact your Glean admin if you need access to review audit log data.

* * *

note

For questions about audit log retention, custom compliance requirements, or advanced audit capabilities, contact your Glean Account Manager or [file a ticket](https://support.glean.com/hc/en-us) with Glean Support.
