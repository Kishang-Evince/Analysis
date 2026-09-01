---
url: "https://docs.glean.com/connectors/crawling-refresh-rates"
canonical: "https://docs.glean.com/connectors/crawling-refresh-rates"
title: "Connector refresh rates"
description: "Default crawl frequencies by connector, organized by category. Includes full crawl, incremental, people data, activity, update rate, and webhook support."
fetched_at: "2026-09-01T13:29:18.215Z"
---
On this page

The refresh patterns on this page are defaults based on typical deployments. Actual crawl timing in your environment depends on corpus size, API rate limits, webhook coverage, connector configuration, and overall crawl health.

warning

The values in the tables below are default refresh patterns, not deployment-specific guarantees. To monitor your deployment's actual crawl health, go to **Admin console → Platform → Connectors** and review **Status**, **Items synced**, **Crawl rate**, and **Change rate**. See [Managing connectors](/connectors/monitoring) for guidance on interpreting these metrics.

## Real-time updates[​](#real-time-updates "Direct link to Real-time updates")

Many modern platforms support webhook-based updates, enabling near real-time content synchronization. For example:

-   **GitHub/GitLab**: Updates within 5 minutes of changes
-   **Slack**: Near-immediate updates via webhook
-   **Confluence**: 5-minute update window for newer versions

note

For connectors that don't support webhooks, Glean implements regular polling with optimized intervals to maintain data freshness while respecting API limits.

## Default refresh patterns by connector[​](#default-refresh-patterns-by-connector "Direct link to Default refresh patterns by connector")

Time periods are denoted as **d** (days), **h** (hours), and **m** (minutes).

The tables below list default refresh rates, grouped by connector category.

How quickly do changes appear?

To gauge how quickly changes appear, check **Update path** and **Update rate**: webhook and API connectors reflect changes in near real-time, while others pick them up on their **Incremental** crawl interval.

Newly created or approved documents

After a document is created, approved, or has its permissions changed in the source application, it appears in Glean after the next applicable update or crawl completes. Depending on the connector, permission changes may be applied during the regular content crawl or may rely on separate group and identity refreshes to resolve access correctly. If a document does not appear after the connector's next two expected updates or crawls, use [Access verification](/administration/search/access-verification) to check its status, or contact [Glean Support](https://support.glean.com) to request a recrawl.

### Additional services[​](#additional-services "Direct link to Additional services")

| Connector | Update path | Update rate | Incremental | Full crawl | People data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Docebo | Scheduled | N/A | N/A | 1h | 1h | N/A |  |
| Egnyte | Scheduled | N/A | 10m | 28d | 1h | 1d |  |
| Fifteen Five | Scheduled | N/A | N/A | 1h | 1h | N/A |  |
| Figma | Scheduled | N/A | N/A | 30m | 30m | 10m |  |
| Gmail | Scheduled | 0m | Continuous, activity-based | Monthly (~28-30 days) | N/A | Continuous | Activity-based updates via the Gmail History API. Glean polls for changes every few minutes and batches updates to refresh modified threads efficiently. |
| Gong | Scheduled | 5m | 5m | 12h | 1h | N/A | Calls, transcripts, and call contents are picked up by 5m incremental crawls. |
| Google Groups | Scheduled | N/A | 1d | 7d | N/A | N/A |  |
| Highspot | Scheduled | N/A | N/A | 1d | 1h | N/A |  |
| Looker | Scheduled | N/A | N/A | 1h | 1h | N/A | External connector. |
| LumApps | Scheduled | 10m | N/A | 1h | 10m | 10m | Hourly document fetch with corpus size-dependent processing. |
| Okta | Scheduled | N/A | N/A | 3h | 3h | 1h | Additional hour for people data indexing. |
| Seismic | API | N/A | 1d | 28d | 10m | 1d |  |
| Simpplr | Scheduled | N/A | 1h | 28d | 1h | N/A |  |
| Stack Overflow | Scheduled | 3h | N/A | 3h | 1h | N/A |  |
| Tableau | Scheduled | N/A | 45m | 1d | 45m | N/A |  |

### API services[​](#api-services "Direct link to API services")

| Connector | Update path | Update rate | Incremental | Full crawl | People data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Push API for Content | API | N/A | N/A | N/A | N/A | N/A | Customer controls update frequency via bulk upload APIs and real-time CRUD operations. |

### Business applications[​](#business-applications "Direct link to Business applications")

| Connector | Update path | Update rate | Incremental | Full crawl | People data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Affinity | Scheduled | 1h | N/A | 1h | 1h | N/A | Full crawls only for People, Companies, Lists, Opportunities, and schemas. Changes can take up to about one hour to appear; cadence is configurable. |
| Freshservice | Scheduled | N/A | 10m | 1h | 10m | N/A |  |
| Monday.com | Scheduled | N/A | N/A | 1h | 10m | N/A |  |
| Pager Duty | API | N/A | 10m | 1h | 10m | 10m |  |
| Salesforce | Scheduled | 10m | 10m | 28d | 1h | N/A |  |
| ServiceNow | Scheduled | 3d | 1h | 3d/30m\* | 1h | 30m | 3d for Knowledge Articles, 30m for Catalog Items. |
| Zendesk | Scheduled | 1h | 1h | 28d | 1h | N/A |  |

### Communication and collaboration[​](#communication-and-collaboration "Direct link to Communication and collaboration")

| Connector | Update path | Update rate | Incremental | Full crawl | People data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GChat | Scheduled | N/A | 5m | 28d | 30m | N/A |  |
| Microsoft Teams | Scheduled | N/A | 1h | 30d | 1h | N/A |  |
| Slack | Webhook | <5m | 3h | 28d | 1h | N/A | Incremental crawl addresses cases where webhook wasn't delivered. |
| Slack Enterprise | Scheduled | 5m | 3h | 28d | 1h | 10m | Slack Enterprise Grid (SEG) uses activity crawl to find channels with recent activity, then queues incremental crawls. |
| Yammer | Scheduled | N/A | N/A | 1h | 1h | N/A |  |
| Zoom | Scheduled | 6h | 6h | 7d | 1h | N/A | Indexes transcripts of Zoom cloud recordings and play URLs. Identity and recordings refresh hourly via API polling, so new transcripts typically appear in Glean within about six hours after Zoom generates them. |

### Development and project management[​](#development-and-project-management "Direct link to Development and project management")

| Connector | Update path | Update rate | Incremental | Full crawl | People data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Asana | Webhook | 10m | 10m | 7d | 1h | 10m |  |
| Bitbucket | Scheduled | N/A | 1h | 28d | 1h | N/A |  |
| GitHub | Webhook | N/A | 1h | 28d | 1h | N/A |  |
| GitLab | Webhook | <5m | 1h | 28d | 1h | N/A | PR/issue/comment updates trigger immediate crawls; hourly incremental crawls. |
| Jira | Webhook | <5m | 6h | 28d | 3h | 30m | Webhooks for issue/comment modifications. |
| Trello | Webhook | N/A | N/A | 1d | 30m | N/A | Requires Jira or Confluence setup. |

### Document management and storage[​](#document-management-and-storage "Direct link to Document management and storage")

| Connector | Update path | Update rate | Incremental | Full crawl | People data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Box | API | 10m | 10m | 28d | 1h | 1m | Uses Events API to identify new/modified/deleted docs. |
| Google Drive | API | 10m | 3h | 28d | 1h | 1m | Uses Reports API for 10-minute updates. Activity reports every 10m, with 12h recrawl for missed events. |
| Notion | Scheduled | N/A | N/A | 6h | 1h | N/A |  |
| OneDrive | API | 10m | 1h | 28d | 10m | 10m | Uses User Insights API for 10-minute updates with hourly incremental fetch. |
| SharePoint | API | 10m | 1h | 28d | 10m | 10m | Uses User Insights API for 10-minute updates with hourly incremental fetch. |
| Quip | API | N/A | 10m | 28d | 10m | 10m |  |

### HR and people management[​](#hr-and-people-management "Direct link to HR and people management")

| Connector | Update path | Update rate | Incremental | Full crawl | People data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Azure | Scheduled | N/A | N/A | N/A | 1h | N/A | Hourly people data crawl with additional hour for indexing. |
| BambooHR | Scheduled | N/A | N/A | N/A | 1h | N/A | Hourly people data crawl with additional hour for indexing. |
| Greenhouse | Scheduled | N/A | 1h | 28d | 10m | N/A |  |
| Lattice | Scheduled | N/A | N/A | 1d | 1h | N/A | Hourly people data crawl with additional hour for indexing. |
| Lever | Scheduled | N/A | 1h | 1h | 10m | N/A |  |
| People Data API | API | 1h | N/A | N/A | 1h | N/A | Real-time updates via push API. |
| Pingboard | Scheduled | N/A | N/A | N/A | 1h | N/A |  |

### Productivity and knowledge management[​](#productivity-and-knowledge-management "Direct link to Productivity and knowledge management")

| Connector | Update path | Update rate | Incremental | Full crawl | People data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aha | Scheduled | N/A | 1h | 1d | 1h | N/A |  |
| Airtable | Scheduled | N/A | 1h | 1d | 1h | N/A |  |
| Coda | Scheduled | N/A | N/A | 7d | 1h | N/A |  |
| Confluence | Webhook | 5m | 1h | 7d (server) / 30d (cloud) | 4h (server) / 8h (cloud) | N/A | New DC versions use webhooks for 5m updates; hourly fetch for older versions. |
| Guru | Scheduled | 1h | 10m | 1d | 1h | 10m |  |
| Miro | Scheduled | 1m | 1h | 1d | 30m | 10m |  |
| SmartSheet | Scheduled | N/A | 10m | 1h | 10m | N/A |  |

### Web and content management[​](#web-and-content-management "Direct link to Web and content management")

| Connector | Update path | Update rate | Incremental | Full crawl | People data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Brightspot | Scheduled | N/A | N/A | 1h | 10m | N/A |  |
| Google Sites | Scheduled | N/A | 4h | 1d | N/A | N/A |  |
| Website | Scheduled | 28d | N/A | 28d | N/A | N/A | Default 28-day crawl; configurable by Glean support. |
| WordPress | Scheduled | N/A | 10m | 12h | N/A | N/A |  |
