---
url: "https://docs.glean.com/connectors/connectors-health-index"
canonical: "https://docs.glean.com/connectors/connectors-health-index"
title: "Monitor connector health and alerts"
description: "Monitor connector health and configure alerts for connector failures and credential issues."
fetched_at: "2026-09-01T13:29:18.017Z"
---
On this page

You can assess connector health through sync status, metrics on the **Connectors** page, **Admin console** notifications, and email alerts. Use this page for alerting and health signals. For the full **Admin console** setup flow, sync phases, and metrics definitions, see [Monitoring connectors](/connectors/monitoring).

## Monitor connector health[​](#monitor-connector-health "Direct link to Monitor connector health")

Track connector health through sync status and metrics on the **Connectors** page. For metrics definitions, sync phases, and troubleshooting guidance, see [Sync progress](/connectors/connectors-monitoring).

## Alerts[​](#alerts "Direct link to Alerts")

Glean sends email alerts when connector issues require admin action. Glean enables alerts by default and repeats them daily until you resolve the issue.

### Connector failure alerts[​](#connector-failure-alerts "Direct link to Connector failure alerts")

Glean monitors connectors for failures such as expired credentials, failed plugin installations, or invalid domains. These alerts are mandatory and cannot be disabled - delayed fixes risk stale content, outdated search results, and permission gaps that could expose users to content they should not access.

For full details, see [Connector failure alerts](/administration/management/alerts/connector-failure-alerts).

### Admin alerts[​](#admin-alerts "Direct link to Admin alerts")

Glean also provides broader admin alerts for platform health issues such as failing credentials and setup errors. For full details, see [Admin alerts](/administration/management/alerts/admin-alerts).

## Best practices[​](#best-practices "Direct link to Best practices")

-   **Act on alerts promptly:** Stale credentials can lead to stale permissions, which pose security risks.
-   **Review alert recipients:** Ensure the right admins receive alerts by checking **Admin console → Settings → Alerts**.

## When to investigate[​](#when-to-investigate "Direct link to When to investigate")

Investigate when any of the following occur:

-   Sync status stalls or a connector stays in **Indexing** with no progress
-   **Items synced** stops growing unexpectedly during initial sync
-   **Change rate** stays at zero when you expect activity
-   You receive a connector failure or credential-related alert

Use connector-specific documentation and [Crawling FAQ](/connectors/crawling-faq) for common causes. Escalate to [Glean Support](https://support.glean.com) for sustained failures.

## Self-service troubleshooting checklist[​](#self-service-troubleshooting-checklist "Direct link to Self-service troubleshooting checklist")

If a connector looks healthy in the Admin console but specific content is missing, or if a connector reports an `insufficient permissions` error, work through the steps below before contacting Glean Support. Most connector indexing issues are caused by source-side permission gaps, not by Glean.

### Confirm sync status and metrics

In **Admin console → Platform → Connectors**, check the connector's:

-   **Status** - `Active` means the connector is enabled, not that the most recent crawl succeeded. Look for `Attention required` or any connector failure alert.
-   **Items synced** - should grow steadily during initial sync. If it stops growing for 24 hours or more, treat it as a stall.
-   **Crawl rate** (during initial sync) and **Change rate** (after initial sync) - a sustained value of zero when activity is expected indicates that webhooks or incremental crawls are not flowing.

For metric definitions and sync phases, see [Sync progress](/connectors/connectors-monitoring).

### Verify required permissions and scopes

Most `data not ingested` and `insufficient permissions` tickets are caused by a service account or app registration that is missing one or more required scopes, or that has had a scope downgraded on the source side. Confirm the service account, app, or integration user has the scopes documented for the connector before re-authorizing or escalating.

For the authoritative scope list and required source-side permissions, see the connector page for your connector-for example:

-   [SharePoint](/connectors/native/sharepoint/about) and [OneDrive](/connectors/native/onedrive/)
-   [Microsoft 365](/connectors/native/microsoft365/)
-   [GitHub](/connectors/native/github/) and [GitHub Enterprise Server](/connectors/native/github-enterprise-server/)
-   [Salesforce](/connectors/native/salesforce/setup)
-   [Slack](/connectors/native/slack)
-   [Google Drive](/connectors/native/gdrive/about)

If your security team has scoped the source-side credential narrowly (for example, IP allowlists on a GitHub Enterprise plan, `Sites.Selected` instead of `Sites.FullControl.All` on SharePoint, or restricted field-level read on Salesforce), confirm the trade-offs documented on the connector page before reporting a freshness or permissions issue.

### Check expected indexing latency

Newly created or edited content only appears in Glean Search, Glean Assistant, and Glean Agents after the connector has crawled and indexed it. Latency depends on the connector's webhook coverage, incremental crawl interval, and full crawl cadence.

Before reporting missing content, compare the time the content was created or modified in the source to the connector's expected refresh pattern in [Crawling strategy](/connectors/crawling-frequency). For common questions about how soon edits, deletes, and permission changes propagate, see the [Crawling FAQ](/connectors/crawling-faq).

### Verify a specific document or user with Access Verification

To distinguish between `not crawled yet`, `crawled but not yet indexed`, `indexed but the user does not have permission`, and `excluded by configuration`, use **Protect → Access Verification** in the Admin console. For a given URL, Access Verification shows:

-   The last crawled timestamp
-   The last indexed timestamp
-   The document's visibility in Glean
-   Whether a specific user has access to the document

If the document shows as indexed and visible but a user cannot find it, the issue is almost always a permission mismatch in the source system or in the user's connector authorization. If the document is not indexed, recheck steps 1–3.

### Contact Glean Support

Open a ticket with Glean Support when any of the following are true after completing the steps above:

-   Sync status is stalled for 24 hours or more, or `Items synced` does not grow during initial sync.
-   A connector failure or admin alert persists after credentials have been re-authorized and required scopes have been granted.
-   Access Verification confirms the document is not indexed but the source-side permissions and scope are correct.
-   `Change rate` stays at zero for a connector with active source-side activity.

When you open a ticket, include:

-   Include the connector name and instance ID.
-   Include 1 to 3 example source URLs that should be indexed but are not, with the time they were created or last edited.
-   Include the affected user emails and the time you reproduced the issue.
-   Include a screenshot of Access Verification for one of the example URLs.
-   Include any recent changes to the connector configuration, source-side credentials, or scopes.
