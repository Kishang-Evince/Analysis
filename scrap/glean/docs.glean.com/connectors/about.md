---
url: "https://docs.glean.com/connectors/about"
canonical: "https://docs.glean.com/connectors/about"
title: "About connectors"
description: "What Glean connectors are, connector types, data access modes (indexed, live, hybrid), and why connectors matter."
fetched_at: "2026-09-01T13:29:17.515Z"
---
On this page

A Glean connector integrates Glean with a platform, service, or application where your content lives (such as Slack, Gmail, or Salesforce). Connectors are built for each source’s APIs and data model. They let Glean index content, mirror permissions from the source, and keep that data current in your isolated tenant. For a list of supported sources and specific setup guides, visit the [Connectors hub](/connectors/).

Glean connectors perform two primary functions:

-   **Data fetching**: Connectors fetch data from connected applications and store the information in Glean's system. They also fetch the permissions map from each source, ensuring search results strictly adhere to the access permissions set in the source application.
-   **Content parsing**: Connectors parse item content (for example, title, body, comments, media) and permissions (for example, who is allowed to view the item). This includes both native app content and all common file types (for example, pdf, doc, ppt, xls, vsd).

## Types of connectors[​](#types-of-connectors "Direct link to Types of connectors")

The method used to connect a system depends on the source's capabilities and the desired depth of integration.

### Native connectors[​](#native-connectors "Direct link to Native connectors")

Purpose-built for specific applications (for example, Slack, Salesforce, Google Drive). They call source APIs directly to support:

-   Extensive data crawling
-   Attachment crawling
-   Threaded results parsing
-   Thread mentions
-   Additional source-specific capabilities

The connector API must support reading the data Glean needs to build the Knowledge Graph and deliver quality search results, including:

### Content Data

Documents, messages, tickets, images, entities, and other content types

### People data

Identities, roles, permissions, groups, and access control information

### Activity data

Creation, modification, editing, viewing, and sharing timestamps and user information

### Web history connectors[​](#web-history-connectors "Direct link to Web history connectors")

Used when a native connector is unavailable. The Glean browser extension makes page titles from users’ browsing histories searchable for specific apps. These results are private to the individual user and cannot be accessed by the organization.

Consider using web history connectors in the following scenarios:

-   A native connector is not available yet
-   The connector lacks the API capabilities you need
-   Crawling the service would violate its terms of service

### Push API connectors[​](#push-api-connectors "Direct link to Push API connectors")

Ideal for custom applications, self-hosted environments, or systems behind firewalls. Data is "pushed" into Glean via the [Indexing API](https://developers.glean.com/api-info/indexing/getting-started/overview) when standard "pull-based" access is restricted.

### Limited interface access

Data must be pushed into Glean because pull-based access is limited by interfaces, APIs, or authentication.

### Self-hosted environments

Applications run on your infrastructure and are not reachable from the internet for a standard native connector.

note

Push API connector code may be shared between customers or Glean partners; support for such code may be limited.

### Partner connectors[​](#partner-connectors "Direct link to Partner connectors")

Built and maintained by Glean technology partners. These connectors use the Indexing API to push data into Glean, but the integration is developed and supported by the partner organization. Partner connectors typically provide:

-   Vendor-managed setup and configuration
-   Data synced through the Indexing API
-   Support coordinated with the technology partner

For available partner connectors and setup guides, see the [Connectors hub](/connectors/).

## Configure tools and MCP[​](#configure-tools-and-mcp "Direct link to Configure tools and MCP")

You can configure tools from **Connector** setup so Assistant and agents can take action in those apps in a controlled way. The same flow lets administrators manage native tools and Model Context Protocol (MCP) tools while they configure the connector. See [Configure tools in connector setup](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector).

### Manage tool permissions[​](#manage-tool-permissions "Direct link to Manage tool permissions")

Individual users can manage connected apps and individual tool permissions from **Your settings → Connectors**. Depending on the tool, users choose **Always allow**, **Needs approval** for each tool. If a tool is blocked by an admin, users cannot enable it at the user level. For more details, see [Manage tool permissions](/tools/tools-overview#manage-tool-permissions).

## How native connectors work[​](#how-native-connectors-work "Direct link to How native connectors work")

### Fetch data and mirror permissions[​](#fetch-data-and-mirror-permissions "Direct link to Fetch data and mirror permissions")

Connectors fetch data from connected applications and store the information in Glean’s systems. They retrieve the permissions map from each source so Glean can mirror access controls: search results follow the permissions set in the connected application.

### Parse content[​](#parse-content "Direct link to Parse content")

Connectors parse item content (for example title, body, comments, and media) and permissions (who is allowed to view the item). That includes native application content and common file types (for example PDF, Word, PowerPoint, Excel, and Visio).

### Keep data updated[​](#keep-data-updated "Direct link to Keep data updated")

Connectors capture changes as quickly as the source and connector allow, often through webhooks or incremental crawling. Glean works with technology partners to keep connectors aligned with API and product changes. For cadence and crawl behavior, see [Crawling strategy](/connectors/crawling-frequency) and [Crawling FAQ](/connectors/crawling-faq).

## Data flow (simple)[​](#data-flow-simple "Direct link to Data flow (simple)")

At a high level, Glean retrieves content and permissions from the source, processes that data through crawling and indexing, and uses the indexed data for permission-aware search and related experiences.

note

Exact behavior varies by connector and source. For how retrieved data is used at query time, see [Connector data access modes](#connector-data-access-modes).

## Connector data access modes[​](#connector-data-access-modes "Direct link to Connector data access modes")

Glean can use connector data in more than one way — indexed (crawled ahead of time), live (fetched at query time), or hybrid (a mix of both). The mode used depends on the connector, the feature, and your configuration. For a full breakdown with examples, see [How connectors power the Glean experience](/connectors/connectors-power-glean#connector-data-access-modes).

### Indexed access[​](#indexed-access "Direct link to Indexed access")

Indexed access means content and permissions were crawled earlier, stored in your Glean tenant, and read from that corpus at query time. Latency is typically low, and Glean applies the permission snapshot that was mirrored during crawling and incremental updates. This is the default pattern for most native connectors and most search results.

### Live access[​](#live-access "Direct link to Live access")

Live access means Glean (or a specific feature) calls the source system during the user request to fetch current records or fields. That can improve freshness or recall for data that is not fully represented in the index, but behavior, rate limits, and how tenant controls apply differ from indexed-only paths.

Some connectors require individual end users to authenticate before live access works for them. To see which connectors require authentication and what features they enable, review [Connector authentication requirements](/connectors/connector-auth-requirements).

### Hybrid access[​](#hybrid-access "Direct link to Hybrid access")

Hybrid access combines indexed data with one or more live calls—for example using the index for broad recall and the API for recent rows, long-tail objects, or attributes that are not stored in the index. Connectors that support hybrid behavior document when each path is used and any security or compliance caveats.

note

Exact behavior varies by connector. Some connectors rely mainly on scheduled crawling and indexing, while others may use additional retrieval patterns based on the source system and product experience.

## Why Glean connectors matter[​](#why-glean-connectors-matter "Direct link to Why Glean connectors matter")

-   **Broad connectivity**: Glean offers a broad catalog of native connectors, plus support for custom connectors, so most of the applications your company already uses become searchable.
-   **Permission enforcement**: Glean connectors fetch each source's permissions map, so search results only show a user what they're already allowed to see in the source application.
-   **Data security**: Connectors route all fetched data to your isolated Glean tenant. Data is end-to-end encrypted in transit and only written to disk once it reaches your tenant. Within your tenant, indexed data is encrypted at rest and remains within your tenant boundaries.
-   **Real-time updates**: Connectors capture changes to your data as quickly as possible, either via webhooks or incremental crawling. The Glean team continuously works with technology partners to keep connectors updated with feature enhancements and API changes.
-   **Flexible configuration**: Each connector supports a range of configuration options — including content inclusion and exclusion filters, authentication modes, and crawl scope settings — so you can tailor what Glean indexes to your organization's needs.
-   **Relevance ranking**: Connectors collect activity signals — such as views, edits, and shares — that Glean uses to rank search results by relevance, surfacing the most useful content for each user.

You can configure tools directly from the connector setup, allowing Glean Assistant and Glean Agents to securely take action in those applications. This enhancement introduces a faster, single point of setup, allowing administrators to manage native tools and Model Context Protocol (MCP) tools while they are already configuring the connector.
