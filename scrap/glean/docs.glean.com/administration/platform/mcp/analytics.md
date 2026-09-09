---
url: "https://docs.glean.com/administration/platform/mcp/analytics"
canonical: "https://docs.glean.com/administration/platform/mcp/analytics"
title: "MCP usage tracking and analytics"
description: "How to monitor and measure MCP server usage, current tracking capabilities, and limitations"
fetched_at: "2026-09-01T13:29:12.357Z"
---
On this page

This page describes how MCP server usage is tracked, what analytics are available today, and how to access usage data using alternative methods. For the interactive adoption dashboard, see [MCP insights](/administration/insights/mcp-insights). This page covers the measurement methods that live outside that dashboard-audit logs, activity logs, and event-log queries.

## MCP usage tracking[​](#mcp-usage-tracking "Direct link to MCP usage tracking")

### Admin audit logs[​](#admin-audit-logs "Direct link to Admin audit logs")

All administrative configuration changes to MCP servers and OAuth settings are captured in Glean's admin audit logs. These include:

-   Enable or disable MCP servers
-   Modify redirect URI restrictions
-   Create or revoke OAuth clients

See [Admin Audit Logs](/administration/management/audit-logs/admin-audit-logs) for details on how to search, filter, and export these logs.

### MCP activity logs[​](#mcp-activity-logs "Direct link to MCP activity logs")

MCP activity logs capture tool usage events for each MCP server. These logs include OAuth client metadata (such as client name and registration type), providing visibility into which applications are accessing MCP and how they are being used. Logs can be filtered by:

-   MCP server
-   Tool name
-   User
-   Date range

For confidential applications that use static client IDs and secrets, host attribution is reliable. For other client types, host attribution is best-effort and depends on the metadata the client provides.

### Anonymized adoption metrics[​](#anonymized-adoption-metrics "Direct link to Anonymized adoption metrics")

Glean tracks anonymized adoption metrics including active user counts (daily, weekly, monthly), host application breakdown, and tool usage frequency. Admins can review these metrics in the [MCP insights](/administration/insights/mcp-insights) dashboard.

* * *

## Limitations[​](#limitations "Direct link to Limitations")

### MCP usage appears in a dedicated MCP Insights section[​](#mcp-usage-appears-in-a-dedicated-mcp-insights-section "Direct link to MCP usage appears in a dedicated MCP Insights section")

Insights includes a dedicated MCP section that reports MCP calls and MCP active users, with breakdowns by host application, tool, and server. However, MCP activity is tracked separately from the Search and Assistant sections, so MCP usage does not roll up into Search volume or Assistant engagement metrics.

note

This separation applies to MCP-originated Search and Assistant activity only. It does not mean MCP usage is absent from Insights.

### What this means for administrators[​](#what-this-means-for-administrators "Direct link to What this means for administrators")

If your organization uses MCP as a primary access method for Glean, review both the MCP section and the Search or Assistant sections in Insights. Users who access Glean exclusively through MCP hosts appear in MCP metrics, but their usage does not increase Search volume or Assistant engagement metrics.

* * *

## Alternative tracking methods[​](#alternative-tracking-methods "Direct link to Alternative tracking methods")

In addition to the MCP section in Insights, you can use the following methods to measure MCP-originated activity.

### Glean Customer Event (GCE) logs[​](#glean-customer-event-gce-logs "Direct link to Glean Customer Event (GCE) logs")

MCP-originated search and chat events appear in [Glean Customer Event logs](/administration/gce-logs/data-dictionary) alongside events from other Glean surfaces. To isolate MCP traffic, filter on the following fields:

| Field | Description |
| --- | --- |
| `IsRestClientApi` | Set to `true` for API-originated requests, including MCP |
| `Initiator` | Identifies the originating service or integration |
| `Platform` | Identifies the MCP host application |

These logs can be analyzed in your data warehouse (BigQuery, Athena, or equivalent). See [GCE Log Examples](/administration/gce-logs/data-dictionary-examples) for sample queries.

tip

GCE logs provide the most complete self-serve view of MCP usage today. If you are not sure where your GCE logs are stored or how to query them, contact your Glean account team.

### Account team reports[​](#account-team-reports "Direct link to Account team reports")

Your Glean account team can provide custom aggregated MCP usage reports including:

-   Daily, weekly, and monthly active user counts
-   Host application breakdown (which MCP hosts are being used)
-   Tool usage frequency (which MCP tools are most popular)

Contact your account team to request these reports.

* * *

## See also[​](#see-also "Direct link to See also")

-   [MCP Security, Data Flow, and Permissions](/administration/platform/mcp/security) - Monitoring and audit section
-   [MCP insights](/administration/insights/mcp-insights) - Interactive MCP adoption dashboard
-   [Glean Customer Event Logs](/administration/gce-logs/data-dictionary) - Full event log reference
-   [Insights Overview](/administration/insights/overview) - Admin Insights dashboard
