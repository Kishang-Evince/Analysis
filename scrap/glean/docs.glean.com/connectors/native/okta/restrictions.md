---
url: "https://docs.glean.com/connectors/native/okta/restrictions"
canonical: "https://docs.glean.com/connectors/native/okta/restrictions"
title: "Crawl"
description: "<CrawlingRestrictionsOverview"
fetched_at: "2026-09-01T13:29:36.545Z"
---
On this page

-   Use **Greenlist** restrictions to allow crawling only for content that you specify.
-   Use **Redlist** restrictions to prevent Glean from crawling content that you specify.

| Restriction Type | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Time-based Restrictions | ❌ | ❌ | Restrict crawling to include/exclude content created/modified/viewed after a certain date. |
| Identity-based Restrictions | ❌ | ✅ | Restrict crawling to include/exclude content created/modified/viewed by specific users or a specific group (plus public content). |
| Content-based Restrictions | ❌ | ❌ | Restrict crawling to include/exclude specific content, documents, messages, or objects. |

## Crawl strategy[​](#crawl-strategy "Direct link to Crawl strategy")

The connector uses scheduled full crawls to keep Glean in sync with Okta. Users, native groups, and apps are crawled on separate schedules.

-   Runs full crawls of user profiles every 3 hours to keep people data current.
-   Runs full crawls of apps and their user assignments daily (requires the `okta.apps.read` scope).
-   Crawls native groups and memberships as part of the identity crawl when enabled. The period is configured with `crawl.identity.nativeGroupsFullCrawlPeriodSecs`. For example, `3600` runs the crawl hourly.
-   Polls system logs using time-windowed queries to capture authentication and session activity.
-   Uses Okta's Link header pagination to handle large datasets efficiently.

The following table summarizes the crawl behavior:

| Crawl type | Full crawl | Incremental crawl | People data | Activity | Update rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Users | Crawls all user profiles from the `/api/v1/users` endpoint with configurable batch sizes. | No incremental crawl. Full crawl refreshes all user data. | Yes. User profiles power people cards, directory, and org chart. | No | Every 3 hours (configurable) | No | Default active statuses: `ACTIVE`, `PASSWORD_EXPIRED`, `RECOVERY`, `LOCKED_OUT`. |
| Native groups | Crawls enabled native groups and their memberships. | No incremental crawl. Full crawl refreshes native group data. | Yes. Group memberships can be used for Glean role mappings. | No | Configured with `crawl.identity.nativeGroupsFullCrawlPeriodSecs` | No | Disabled unless native groups are enabled and the crawl period is positive. Requires `okta.groups.read`. |
| Apps | Crawls all Okta-managed apps and their user assignments. | No incremental crawl. Full crawl refreshes all app data. | No | No | Daily (configurable) | No | Requires the `okta.apps.read` scope. Apps are mapped to groups for Glean access control. |
| Activity logs | Polls system logs within a configured time window. | No | No | Yes. Captures single sign-on, session start, and sign-on policy events. | Configurable | No | Requires the `okta.logs.read` scope. Used for app usage analytics and search personalization. |

## Supported restrictions[​](#supported-restrictions "Direct link to Supported restrictions")

| Restriction | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| User Type | ❌ | ✅ | Exclude users from crawling based on their Okta userType field value, e.g. Contractor, ServiceAccount. |

note

User type values are matched case-insensitively. Use the special value `empty` to exclude users whose Okta profile has no `userType` set.

When contacting Glean Support to apply this restriction, reference the config key `userTypesRedlist`.

## Limitations[​](#limitations "Direct link to Limitations")

### User Type

-   This restriction cannot currently be applied in the Admin UI.
-   Only the Okta `userType` profile field is evaluated - other custom profile fields are not supported for restriction filtering.

## Apply restrictions[​](#apply-restrictions "Direct link to Apply restrictions")

| Method | Supported | Details |
| --- | --- | --- |
| Admin UI | ❌ | Restrictions can be applied in the Admin UI under the connector settings. |
| Glean Support | ✅ | Restrictions can be applied by Glean support on request. |
