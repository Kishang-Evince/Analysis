---
url: "https://docs.glean.com/connectors/key-terms"
canonical: "https://docs.glean.com/connectors/key-terms"
title: "Key terms"
description: "Definitions for connector types, data access, crawling, monitoring, authentication, permissions, and indexing"
fetched_at: "2026-10-13T08:49:43.567Z"
---
On this page

Use these definitions to interpret connector setup, crawl behavior, monitoring metrics, and access controls. Connector behavior varies by source, but these terms have the same meaning throughout the connector documentation.

## Understand connector types[​](#understand-connector-types "Direct link to Understand connector types")

Connector types describe who builds an integration and how data reaches Glean.

-   **Connector**: An integration that connects Glean to a source application. Depending on the source, a connector retrieves or receives content, permissions, identities, metadata, and activity signals.
-   **Native connector**: A Glean-built integration that uses a source's APIs to retrieve supported content, permissions, identities, metadata, or activity signals.
-   **Custom connector**: A custom connector uses Glean's Indexing API to send data from a source that does not have a suitable native connector.
-   **Push API connector**: An external process sends content, identities, and permissions to Glean through the Indexing API instead of Glean retrieving them from the source.
-   **Partner connector**: A Glean technology partner builds and maintains this integration and sends source data to Glean through the Indexing API.
-   **Web history connector**: The Glean browser extension makes visited page titles searchable only to the user who visited them. It does not index page content.
-   **Connector instance**: One configured connection between Glean and a source account, site, workspace, or tenant.
-   **Corpus**: The collection of source content within a connector's configured scope.

## Understand data access and Glean data[​](#understand-data-access-and-glean-data "Direct link to Understand data access and Glean data")

A connector can index source data, retrieve it when a user makes a request, or combine both methods. Retrieval-augmented generation (RAG) can use context from either method.

-   **Search index**: Glean stores searchable documents, metadata, and permission information in a tenant-scoped index for retrieval, filtering, and ranking.
-   **Knowledge Graph**: Glean's Knowledge Graph represents entities and relationships across indexed enterprise content, people, and activity.
-   **Enterprise Graph**: Glean's Enterprise Graph combines its Knowledge Graph with personal graphs to represent relationships among people, content, projects, workflows, and applications.
-   **Retrieval-augmented generation (RAG)**: Glean retrieves permission-aware context from indexed or live sources and provides it to a language model to ground an answer.
-   **Indexed access**: Glean retrieves content and permissions that a connector previously crawled or pushed into the search index.
-   **Live retrieval**: Glean queries a source when a user makes a request instead of relying only on previously indexed content. Connector documentation might also call this a query-time fetch.
-   **Real-time access**: A connector uses live retrieval to fetch current source content when a user makes a request, often with that user's authorization. Some sources call this Live Mode.
-   **Federated access**: Glean sends a query to the source at request time and returns permissioned results without first adding that content to the search index.
-   **Hybrid access**: Glean combines indexed content with targeted live retrieval in the same search or request.
-   **Data fetching**: Glean calls a source API to retrieve current data and permissions, often when a user makes a request.

## Understand crawling and freshness[​](#understand-crawling-and-freshness "Direct link to Understand crawling and freshness")

Crawl types separate content retrieval from identity and activity processing. Their schedules vary by connector and deployment.

-   **Crawling**: A connector crawls a source to retrieve data for indexing. The data can include content, permissions, identities, metadata, or activity signals.
-   **Content crawl**: Glean retrieves supported source objects and related metadata or permissions for indexing during a content crawl.
-   **Attachment crawling**: Glean retrieves supported files attached to source objects and indexes their content, subject to connector permissions and processing limits.
-   **Full crawl**: Glean scans all eligible content in a connector's configured scope. A successful full crawl can also reconcile content that changed or disappeared since the previous scan.
-   **Incremental crawl**: Glean retrieves changes since a previous crawl or source cursor instead of scanning the connector's full scope.
-   **Identity crawl**: Glean retrieves users, groups, and memberships from a source to map identities and support permission enforcement.
-   **Activity crawl**: Glean retrieves source activity events. Depending on the connector, these events add ranking signals or trigger content or permission refreshes.
-   **Initial sync**: Glean crawls and indexes a connector for the first time during initial sync. The connector moves to ongoing updates after both phases finish.
-   **Steady state**: A connector enters steady state after initial sync and processes ongoing changes through scheduled crawls, webhooks, or both.
-   **Indexing**: Glean processes retrieved or pushed content and adds searchable documents, metadata, and permission information to the search index.
-   **Webhook**: A source sends Glean an event when supported data changes, so the connector can process the change without waiting for a scheduled crawl.
-   **Crawl frequency**: How often Glean schedules a crawl. Completion and search freshness also depend on source limits, corpus size, connector configuration, and crawl health.
-   **Update rate**: How often a connector usually processes supported source changes through crawls, webhooks, or other events. Actual rates vary by deployment. Connector documentation might also call this the refresh rate or update cadence.
-   **Content freshness**: Whether indexed content reflects its current state in the source.
-   **Permission freshness**: Whether Glean's indexed access rules reflect current source permissions. The update path depends on the connector.
-   **Identity freshness**: Whether Glean's users, groups, and memberships reflect their current state in the source.
-   **Indexing latency**: The time from a source change until Glean makes the corresponding indexed change searchable.
-   **On-demand recrawl**: An admin or Glean Support starts a crawl outside its regular schedule. The connector determines the crawl type and scope.
-   **Deletion event**: A source notification identifies removed content so Glean can remove the corresponding indexed data.
-   **Full-crawl cleanup**: After a successful full crawl, Glean removes indexed content that the source no longer returns within the crawled scope.
-   **API rate limit**: A source limits how many API requests a connector can make during a given period.
-   **API throttling**: A source slows or rejects connector requests when request volume reaches a limit or the source reduces available capacity.

## Interpret connector metrics[​](#interpret-connector-metrics "Direct link to Interpret connector metrics")

The **Admin console** shows different metrics during initial sync and ongoing operation. These metrics indicate processing activity, not complete connector health.

-   **Connector status**: For an enabled connector that supports crawling, **Active** means no health check has failed, and **Attention required** means one has. **Active** does not guarantee that the latest crawl succeeded.
-   **Items synced**: Content that Glean has crawled, processed, and made searchable for a connector. The count excludes identity data.
-   **Document part**: One unit of crawl work for an aspect of an item, such as its content, metadata, or permissions. It is not a distinct source item.
-   **Crawl rate**: During initial sync, **Crawl rate** reports tasks per hour. It combines document crawl tasks for content, metadata, and permissions with identity records processed.
-   **Change rate**: After initial sync, **Change rate** counts additions, edits, permission or metadata changes, and deletions Glean processed during the past day. Some full-crawl-only connectors count indexed documents instead. One item can count more than once.

## Understand connector access[​](#understand-connector-access "Direct link to Understand connector access")

Scope determines what a connector can retrieve. Authentication and source permissions determine which data the connector can access and who can see each result. Some setup guides use personal access token (PAT) credentials and access control list (ACL) permission models.

-   **Crawl scope**: The configured set of source content that a connector is eligible to retrieve. Source permissions still control who can see each indexed item.
-   **Connector visibility**: An **Admin console** setting controls which Glean users can see results from a connector. Source permissions still apply within that audience.
-   **Admin-level authentication**: An administrator provides an app, account, or credential that Glean uses to configure organization-level connector access.
-   **Individual user authentication**: A user connects their own source account to Glean. Depending on the connector, this can map identity or enable private, restricted, or live content.
-   **Reauthorization**: A user or admin repeats an authorization flow to restore access or grant newly required scopes.
-   **OAuth scope**: A source-defined permission limits what an OAuth access token lets Glean read or do.
-   **Service account**: A connector uses this non-human account to call source APIs. The account's source roles and permissions limit what Glean can retrieve.
-   **Integration user**: A dedicated source account authorizes or runs an integration. Its source roles and permissions determine the connector's access.
-   **API token**: A secret credential authenticates connector requests to a source API. Its scopes or owner's privileges determine access.
-   **Personal access token (PAT)**: A source issues this API token to a specific user account. The connector inherits that account's privileges and limits.
-   **Identity mapping**: Glean matches a source account to a Glean user so source permissions apply to the correct person.
-   **Access control list (ACL)**: An access control list names the users, groups, or other principals that can access a source object.
-   **Object-level permission**: A source attaches this access rule to an individual object instead of applying one rule to the entire connector.
-   **Permission mirroring**: Glean syncs source access rules and associates them with indexed content so search can enforce source visibility.
-   **Permission enforcement**: Glean checks source-derived permissions when it serves a result and shows the result only to authorized users.
-   **Content inclusion rule**: A content inclusion rule tells Glean to crawl only specified source content. Connector documentation might also call this an allowlist.
-   **Content exclusion rule**: A content exclusion rule tells Glean not to crawl or index specified source content. Connector documentation might also call this a denylist.

## Understand people data and activity signals[​](#understand-people-data-and-activity-signals "Direct link to Understand people data and activity signals")

Connectors can supply identity and activity data alongside searchable content.

-   **People data**: Users, groups, memberships, and organizational attributes that Glean uses for profiles, identity resolution, and permission enforcement.
-   **Activity signal**: Glean can use a source interaction, such as a view, edit, or share, as an activity signal to rank relevant content. Available signals vary by connector.

## See also[​](#see-also "Direct link to See also")

-   [About connectors](/connectors/about) — compare connector types and access modes
-   [Crawl types](/connectors/crawling-types) — understand full, incremental, activity, and identity crawls
-   [Monitor connector sync progress](/connectors/connectors-monitoring) — interpret sync phases and metrics
-   [Connector authentication requirements](/connectors/connector-auth-requirements) — compare admin and individual user authentication
-   [How connectors power the Glean experience](/connectors/connectors-power-glean) — understand the search index, Enterprise Graph, RAG, and access modes
