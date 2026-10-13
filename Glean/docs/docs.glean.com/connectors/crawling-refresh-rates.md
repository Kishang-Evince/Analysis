---
url: "https://docs.glean.com/connectors/crawling-refresh-rates"
canonical: "https://docs.glean.com/connectors/crawling-refresh-rates"
title: "Connector refresh rates"
description: "Default crawl frequencies by connector, organized by category. Includes full crawl, incremental, people data, activity, update rate, and webhook support."
fetched_at: "2026-10-13T08:49:39.516Z"
---
On this page

The refresh patterns on this page are defaults based on typical deployments. Actual crawl timing in your environment depends on corpus size, API rate limits, webhook coverage, connector configuration, and overall crawl health. Content schedules apply to the indexed modes and scopes described in each row, not live retrieval or tools\-only connections.

warning

The values in the tables below are default refresh patterns, not deployment-specific guarantees. To monitor your deployment's actual crawl health, go to **Admin console → Platform → Connectors** and review **Status**, **Items synced**, **Crawl rate**, and **Change rate**. See [Managing connectors](/connectors/monitoring) for guidance on interpreting these metrics.

## Real-time updates[​](#real-time-updates "Direct link to Real-time updates")

Many platforms support webhook-based updates that trigger processing for supported events. For example:

-   **GitHub/GitLab**: Webhooks for supported repository, issue, and pull-request changes
-   **Slack**: Event-triggered updates for supported events
-   **Confluence**: Webhook behavior depends on version and mode

Event notifications don't guarantee immediate search visibility. Glean still needs to retrieve the applicable content and update the index.

note

Connectors can also use scheduled crawls or activity polling to detect changes, including changes missed by webhooks.

## Default refresh patterns by connector[​](#default-refresh-patterns-by-connector "Direct link to Default refresh patterns by connector")

Time periods are denoted as **d** (days), **h** (hours), and **m** (minutes).

The tables below list default refresh rates, grouped by connector category.

-   `None` means no periodic crawl of that type for the stated scope. `Off by default` means the path exists but isn't scheduled by default. A dash means not specified here, not unsupported.
-   `Discovery-based` means Glean discovers containers or items and schedules their content work separately, rather than running one full-content sweep.
-   `Identity / people data` lists identity refreshes for users, groups, and access information unless labeled as a people-source fetch for employee profiles. These periods don't include profile indexing time.
-   `Activity` lists polling periods for source events or usage data. Activity polling isn't necessarily a content refresh.

How quickly do changes appear?

Check **Update path** for the update mechanism and the crawl columns for scheduling defaults. An incremental crawl can take longer than its configured interval, so changes may take longer than the listed period to appear in search. **Update rate** identifies event-triggered paths, not a time-to-search guarantee. API paths can use polling or sender-controlled submissions.

Newly created or approved documents

After a document is created, approved, or has its permissions changed in the source application, Glean must complete the applicable retrieval and indexing work before the change appears in search. Depending on the connector, permission changes may be applied during the regular content crawl or may rely on separate group and identity refreshes to resolve access correctly. If a document does not appear, check crawl health and use [Access verification](/administration/search/access-verification) to check its status, or contact [Glean Support](https://support.glean.com) to request a recrawl.

### Additional services[​](#additional-services "Direct link to Additional services")

| Connector | Update path | Update rate | Incremental | Full crawl | Identity / people data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Databricks | Scheduled | – | None | 12h | 1h | – | Dashboards and Genie Spaces. Identity covers configured account and workspace scopes. |
| Docebo | Scheduled | – | None | 1h | 1h | – |  |
| Egnyte | Scheduled, webhook | Event-triggered | 10m | 28d | 1h | 1d | Webhooks cover supported file and permission events when configured. Activity crawls fetch audit reports, not content. |
| Fifteen Five | Scheduled | – | None | 1h | 1h | – |  |
| Figma | Scheduled | – | None | 30m | 30m | Off by default | Activity polling uses a 10m period when enabled. |
| Gmail | Scheduled | – | 1h | 28d | – | 1m | Indexed threads. Activity polling uses the Gmail History API. |
| Gong | Scheduled | – | 5m (calls, transcripts, and call contents) | 12h | 1h | – | Folders use full crawling only. |
| Google Groups | Scheduled | – | 1d | 7d | – | – | Group exports and settings. Settings are reread during incremental processing. |
| Highspot | Scheduled, optional webhook | Event-triggered | None | 1d | 1h | – | Supported item and spot webhooks are off by default. |
| Lessonly | Scheduled | – | 1h | 1d | 1h | – |  |
| Looker | Scheduled | – | None | 1h | 1h | – | External connector. Looks and dashboards. |
| LumApps | Scheduled, webhook | Event-triggered | None | 1h | 10m | – | Webhooks cover supported post, community, and content events when configured. |
| Okta | Scheduled | – | None | None | Varies by scope (includes people-source fetch) | 1h when enabled | Activity fetching is disabled by default. People-source user and profile fetch: 3h. Groups: 23h. No document-content crawl. |
| Power BI | Scheduled | – | None | 1d | – | – | Indexed catalog metadata. Workspace-group identity refresh is hosted on the associated Microsoft 365 connection. |
| Seismic | API | – | 1d | 28d | Varies by scope | 1d | Normal identity fetch: 10m. Custom permission checks: 1h, separate from the source's permission-export schedule. |
| Sigma | Scheduled | – | None | 1d | 1d | – | Workbooks and workspaces. Identity covers users and teams. |
| Simpplr | Scheduled | – | Varies by scope | 28d | Varies by scope | – | Content incremental: 10m for the newer connector, 1h for the legacy connector. Identity also varies by variant and scope. See the [Simpplr connector guide](/connectors/native/simpplr/). |
| Stack Overflow | Scheduled | – | None | 3h | – | – |  |
| Tableau | Scheduled, webhook | Event-triggered | About 45m | About 1d | 45m | – | Webhooks cover supported workbook and data-source changes. |

### API services[​](#api-services "Direct link to API services")

| Connector | Update path | Update rate | Incremental | Full crawl | Identity / people data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Push API for Content | API | – | – | – | – | – | The sender controls when content and permission updates are submitted. Processing and indexing follow separately. See [Content indexing APIs](/connectors/custom/glean-apis). |

### Business applications[​](#business-applications "Direct link to Business applications")

| Connector | Update path | Update rate | Incremental | Full crawl | Identity / people data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Affinity | Scheduled | – | None | 1h | 1h | – | People, companies, lists, opportunities, and schemas. People records are CRM content, not employee profiles. |
| Crayon | Scheduled | – | 5m (battlecards) | 1d | – | – | Sparks use full crawling only. |
| Freshdesk | Scheduled | – | Varies by scope | Varies by scope | Varies by scope | – | Tickets: 7d full, 30m incremental. Contacts and companies: 1d full, 2h incremental. Articles: 12h full only. Agents and groups: 4h. Roles: 1d. |
| Freshservice | Scheduled | – | 10m (tickets) | 1h | Varies by scope | – | Solutions and releases use full crawling. Normal identity fetch: 10m. Roles: 1h. |
| Gainsight | Scheduled | – | 1h (calls to action) | 1d | 1h | – | Other indexed content scopes use full crawling. Identity covers users. |
| HubSpot | Scheduled | – | 1h (standard CRM objects) | 1d (standard CRM objects) | 1h (users and owners) | – | Contacts, companies, deals, and tickets. Reference scopes use separate full crawls. |
| Intercom | Scheduled | – | 30m (conversations and tickets) | 1d | 1d | – | Articles use full crawling only. Identity covers users and teams. |
| Klue | Scheduled | – | 1h | 4d | 1h | – | Cards and battlecards. Identity covers users. |
| Loopio | Scheduled | – | 1d | 7d | Varies by scope | – | Project summaries. Identity users and teams: 1d. Roles: 7d. |
| Marketo | Scheduled | – | 1h | 7d | 6h | – |  |
| Microsoft Dynamics 365 | Scheduled | – | 1h (standard CRM objects) | 7d (standard CRM objects) | Varies by scope | – | Custom entities, sharing permissions, and reference data can use different schedules. Identity has separate scopes. See the [Dynamics 365 connector guide](/connectors/native/microsoft/microsoft-dynamics-365-connector). |
| Monday.com | Scheduled | – | None | 1h | 1h | – |  |
| NetSuite | Scheduled | – | 1h (supported objects, when enabled) | 1d | – | – | Customers, customer activity, transactions, and line items support incremental crawling. Vendors use full crawling. |
| Pager Duty | API | – | Off by default | 1h | 10m | 10m | When enabled, the 10m incremental path discovers newly created incidents. Separate Audit API activity polling includes deletion handling. |
| Salesforce | Scheduled | – | Varies by scope | 28d base period | 1h (regular scopes) | – | Content incremental base: 10m, with 2m for Cases and Opportunities. Object-specific schedules can override base content periods. Regular identity and object-permission tasks use 1h. |
| Salesloft | Scheduled | – | 5m | 7d | 1h | – | Core CRM content, separate from Salesloft Conversation Intelligence. |
| ServiceNow | Scheduled | – | 1h (supported scopes) | Varies by scope | Varies by scope | 30m | Full content base: 1d, with 12h for enabled Content Publishing. Content Publishing, catalog variables, and attachments use full crawls only. Custom objects need a supported last-updated field for incremental crawling. Users and other identity scopes refresh separately. |
| Vitally | Scheduled | – | Varies by scope | 7d | 1d (admins) | – | Incremental: 15m for accounts, notes, and tasks, 1h for organizations, projects, and conversations. Reference data uses separate full crawls. |
| Zendesk | Scheduled, webhook | Event-triggered | 1h (articles and tickets) | 28d | Varies by scope | – | Community posts have no periodic incremental crawl. Ticket-activity webhooks apply when configured. Regular identity: 1h. Optional end-user fetch: 1d. |

### Communication and collaboration[​](#communication-and-collaboration "Direct link to Communication and collaboration")

| Connector | Update path | Update rate | Incremental | Full crawl | Identity / people data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fathom | Scheduled | – | 10m | 1d | 1h | – | Meeting discovery and content. Content must first be available from Fathom. Identity covers users. |
| GChat | Scheduled | – | Off by default | Off by default | Off by default | – | When space crawling is enabled, content uses 28d full and 5m incremental periods. Space identity uses 30m on the associated Google Drive connector. See the [Google Chat connector guide](/connectors/native/gchat/). |
| Google Calendar | Scheduled | – | 1h | 28d | – | 1m | Indexed events. Identity depends on the associated Google Drive connector. |
| Granola | Scheduled | – | Varies by scope | 1d | – | – | Team space notes: 10m incremental. Personal notes and their separate discovery scope: 30m incremental. See the [Granola connector guide](/connectors/native/granola/). |
| Microsoft Teams | Scheduled, change notifications | Event-triggered | Varies by scope | Varies by scope | 1h (users, teams, and chats) | – | Channel messages: 30d full, 1h incremental. Enabled private-chat content: 14d full, 10m incremental. Chat discovery uses separate schedules. Microsoft Graph notifications apply where configured. |
| Outlook | Scheduled | – | 30m | 7d | 2h (users) | – | Indexed email. Mailbox-wide and per-user container modes use these periods, with separate discovery. |
| Outlook Calendar | Scheduled | – | 1h | 30d | 1h (users) | – | Indexed events and supported meeting transcripts. |
| Panopto | Scheduled | – | 15m (sessions) | 1d | 1d | – | Users, groups, and folders use separate full crawls. |
| Salesloft Conversation Intelligence | Scheduled | – | 1h | 5d | 1h | – | Calls. Formerly Clari Copilot, separate from the Salesloft CRM connector. Identity covers users. |
| Slack | Webhook | Event-triggered | 3h (periodic API-crawl mode) | 28d (periodic API-crawl mode) | Varies by scope | – | Connection mode determines which crawls run. User, channel, and membership identity scopes refresh separately. See the [Slack connector guide](/connectors/native/slack/). |
| Slack Enterprise | Scheduled, webhook | Event-triggered | None (legacy Enterprise Grid) | 28d (legacy Enterprise Grid) | Varies by scope | 10m | Legacy Enterprise Grid content mode. Common identity scopes: 1h. External-user scopes: 3d. Event-triggered updates apply where configured. See the [Slack connector guide](/connectors/native/slack/). |
| Yammer | Scheduled | – | None | 1h | 1h | – | Messages and communities. |
| Zoom | Scheduled, webhook | Event-triggered | 1h | 7d | Varies by scope | – | Indexes transcripts of Zoom cloud recordings and play URLs. The hourly incremental schedule applies to meeting-instance crawls. Recording-completed webhooks apply where configured. Zoom must generate the source content before Glean can retrieve it. Users and groups: 1h. Account information: 1d. |

### Development and project management[​](#development-and-project-management "Direct link to Development and project management")

| Connector | Update path | Update rate | Incremental | Full crawl | Identity / people data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Adobe Workfront | Scheduled, optional webhook | Event-triggered | 1h (most content) | 1d (most content) | Varies by scope | – | Notes use full crawling only. Journal entries use incremental crawling only. Identity and permissions use separate scopes. Webhooks apply when enabled. |
| Asana | Webhook | Event-triggered | 10m | 7d | 1h | 10m | Webhooks cover supported events. Separate Events API activity polling includes deletions. |
| Autodesk Construction Cloud | Scheduled | – | 1h (RFIs, issues, and submittals) | Varies by scope | 1h (users) | – | Full: 1d for RFIs, issues, and submittals, 3h for sheets, 1h for project metadata. |
| Azure DevOps | Scheduled | – | 1h (work items, pull requests, and Git content) | Varies by scope | Varies by scope | – | Full content: 7d for work items, 3d for pull requests, 30d for Git content. Associated Microsoft 365 identity: 1d for users and groups, 1h for repository permission scopes. See the [Azure DevOps connector guide](/connectors/native/azure-devops/#crawling-strategy). |
| Bitbucket | Scheduled, webhook | Event-triggered | 1h (content) | 28d (content) | 1h | – | Repository discovery runs separately. Webhooks cover supported events where configured. |
| Git Forge | Scheduled | – | 1h | 28d | – | – | Git repository content. |
| GitHub | Webhook | Event-triggered | 1d (pull requests and issues) | 28d (pull requests and issues) | Varies by scope | – | Cloud schedules. Repository discovery, Git content, comments, and identity have separate schedules. See the [GitHub connector guide](/connectors/native/github/). |
| GitHub Enterprise Server | Scheduled | – | 1h (pull requests and issues) | 28d (pull requests and issues) | 1h | – | Repository, Git content, and comment schedules differ. See the [GitHub Enterprise Server connector guide](/connectors/native/github-enterprise-server/). |
| GitLab | Webhook | Event-triggered | 1h (main content and enabled epics) | Varies by scope | 1d | – | Full: 28d for main content, 4h for projects, 1d for enabled epics. Projects have no periodic incremental crawl. Webhooks cover supported events where configured. |
| Jira | Webhook | Event-triggered | 6h (API issue crawl) | 28d (API issue crawl) | Varies by scope | 30m (when enabled) | Webhooks cover supported issue and comment events. Audit-log activity polling doesn't run during export-active mode. Base identity: 3h. Separate group-membership crawl scopes are off by default. |
| Linear | Scheduled | – | 10m (issues) | 1d | 1h | – | Project documents use full crawling only. |
| Procore | Scheduled, webhook | Event-triggered | 6h (core project and document scopes) | 7d (core project and document scopes) | 6h | – | Some object types use different schedules. Webhooks apply where configured. See the [Procore connector guide](/connectors/native/procore/). |
| Productboard | Scheduled | – | 2h | 7d | 6h (members) | – | Products, components, features, subfeatures, and notes. |
| Shortcut | Scheduled, webhook | Event-triggered | None | 7d | 10m | – | Webhooks process supported changes. |
| Trello | Webhook | Event-triggered | None | 1d | 30m | – | Requires Jira or Confluence setup. Webhooks process supported events. |
| Windchill | Scheduled | – | 1h (documents) | 1d (documents) | Varies by scope | – | Principals: 1d full, 1h incremental. Context metadata: 1h full only. |

### Document management and storage[​](#document-management-and-storage "Direct link to Document management and storage")

| Connector | Update path | Update rate | Incremental | Full crawl | Identity / people data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Amazon S3 | Scheduled | – | 1h | 1d | – | – | Bucket content. |
| Box | API | – | 10m | Discovery-based | 1h | 1m | Discovery runs on a 14d period. Legacy full-content scheduling uses 28d instead when configured. Activity polling uses the Events API. |
| Dropbox | Scheduled | – | Varies by scope | 28d | 1h | 10m | Namespace content has no periodic incremental crawl. Enabled legacy Paper uses a 1h incremental period. |
| Google Drive | API | – | 3h | Discovery-based | Varies by scope | 1m | Discovery runs on a 14d period, not a full-content sweep. Activity polling uses the Reports API. Standard users, groups, and memberships: 1h. User details refresh separately. |
| Ironclad | Scheduled | – | None | 1d | 1d | – | Workflows and records. Identity covers users and permissions. |
| Notion | Scheduled | – | None | 6h | 1h | – | Indexed mode. |
| OneDrive | API, change notifications | Event-triggered | Varies by scope | 28d (drive items) | Varies by scope | Varies by scope | Incremental: 1h in legacy drive-item mode, 3d scheduled fallback in per-drive mode. Microsoft Graph notifications and delta processing apply where configured. Associated Microsoft 365 users: 1h, groups and memberships: 3h. Associated Insights activity: 10m for eligible SharePoint connections, not a content refresh interval. |
| OneNote page-content indexing | – | – | Configuration-dependent | Configuration-dependent | – | – | A capability of OneDrive and SharePoint, not a standalone connector. Don't assume the file-crawl intervals apply. See [OneNote page-content indexing](/connectors/native/onedrive/onenote). |
| Quip | API | – | 10m | 28d | 10m | 10m | Events API activity polling includes deletion handling. |
| SharePoint | API, change notifications | Event-triggered | Varies by scope | 28d (drive items and site pages) | Varies by scope | Varies by scope | Incremental: 1h for site pages, 3d per-drive scheduled fallback. Notifications and delta processing run separately. Identity scopes have separate schedules. Associated Microsoft 365 Insights activity: 10m for eligible connections, not a content refresh interval. See the [SharePoint connector guide](/connectors/native/sharepoint/). |
| SharePoint on-premises | Scheduled | – | None (document libraries) | 1d (document libraries) | Varies by scope | – | Site users and groups: 1h. Active Directory groups: 10m. Don't apply SharePoint Online schedules to this connector. |
| Veeva Vault | Scheduled | – | 15m (documents) | 1h (documents) | 1h (full and incremental) | – | Document types use a daily full crawl. Deletion polling is a separate incremental scope. Identity covers users and groups. |

### HR and people management[​](#hr-and-people-management "Direct link to HR and people management")

| Connector | Update path | Update rate | Incremental | Full crawl | Identity / people data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Azure | Scheduled | – | – | – | Configuration-dependent (people-source fetch) | – | Microsoft Entra ID people and identity ingestion. See [Microsoft Entra ID people data](/administration/identity/people-data/configuration/people-data-entra-id). |
| BambooHR | Scheduled | – | – | – | 1h (people-source fetch) | – | Employee profiles. Indexing follows the source fetch. |
| Greenhouse | Scheduled | – | 1h | 28d | 10m (identity scopes) | – | Recruiting content, not an employee-profile refresh schedule. |
| Lattice | Scheduled | – | None (optional content) | Off by default | 1h (people-source fetch) | – | Optional indexed content uses a 1d full crawl. |
| Lever | Scheduled | – | Configuration-dependent | Configuration-dependent | 10m | – | Opportunities and postings have different content schedules. Identity covers users. Check the effective content schedule with Glean Support. |
| People Data API | API | – | – | – | Sender-controlled (people data) | – | The sender submits people records. Profile processing and indexing follow separately. See the [People Data API guide](/connectors/custom/connector-guides/people-data-connector). |
| Pingboard | Scheduled | – | – | – | 1h (people-source fetch) | – | Employee profiles. Indexing follows the source fetch. |
| Workday | Scheduled | – | Off by default (people) | Off by default (articles) | Varies by scope (includes people-source fetch) | – | People-source full fetch: 2h. Identity groups: 1h. Periodic incremental people crawling is off by default. Optional knowledge articles use a 1d full crawl when enabled. |

### Productivity and knowledge management[​](#productivity-and-knowledge-management "Direct link to Productivity and knowledge management")

| Connector | Update path | Update rate | Incremental | Full crawl | Identity / people data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aha | Scheduled | – | 1h | 1d | 1h | – | Ideas and features. |
| Airtable | Scheduled, webhook | Event-triggered | None | 1d | 1h | – | Webhooks process supported changes. |
| Confluence | Webhook | Event-triggered | 1h (main content) | Varies by scope | Varies by scope | – | Full main content: 7d for server, 30d for cloud. Webhook behavior depends on version and mode. Cloud content updates can be buffered. User, group, and membership identity scopes refresh separately. |
| Google Tasks | Scheduled | – | None | 28d per user (when per-container crawling is enabled) | – | 1m | Indexed task lists and tasks. Per-container crawling is on by default. User discovery depends on the associated Google Drive connector. |
| Guru | Scheduled | – | 10m | 1d | 1h | 10m | Activity polling is separate from content incremental crawling. |
| Miro | Scheduled | – | 1h | 1d | 30m | – |  |
| SmartSheet | Scheduled | – | 10m | 1h | 10m | – | Workspaces, sheets, reports, and dashboards. |
| Superhuman Docs | Scheduled, webhook | Event-triggered | None | 7d | 1h | – | Webhooks cover supported document, folder, and permission events. |

### Web and content management[​](#web-and-content-management "Direct link to Web and content management")

| Connector | Update path | Update rate | Incremental | Full crawl | Identity / people data | Activity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Brightspot | Scheduled | – | None | 1h | 10m | – |  |
| Google Sites | Scheduled | – | 4h | 1d | – | – |  |
| Website | Scheduled | – | None | 28d | – | – | Default 28-day crawl; configurable by Glean support. |
| WordPress | Scheduled | – | 10m | 12h | – | – | Pages and posts. |
