---
url: "https://docs.glean.com/security/knowledge-graph"
canonical: "https://docs.glean.com/security/knowledge-graph"
title: "Knowledge Graph"
description: "Learn how Glean's Knowledge Graph connects enterprise content, people, and activity to personalize search results."
fetched_at: "2026-09-01T13:29:58.160Z"
---
On this page

The Glean Knowledge Graph organizes your enterprise's indexed information in real time. It connects your organization's content, people, and activity to help Glean return relevant and personalized results.

## Core architecture[​](#core-architecture "Direct link to Core architecture")

The Knowledge Graph is built on three fundamental pillars that work together to create a comprehensive understanding of your enterprise data:

-   **Content:** Documents, messages, tickets, and other content types across your organization.
-   **People:** User identities, roles, teams, and organizational relationships.
-   **Activity:** User interactions, document history, and engagement patterns.

These pillars combine in the Knowledge Graph to connect content, people, and activity signals.

## Content integration[​](#content-integration "Direct link to Content integration")

info

Glean provides over 100 connectors, each designed for a specific application's data model and API endpoints.

The content crawler performs comprehensive indexing that includes:

-   Full content analysis (titles, body copy, comments, media)
-   Metadata extraction (creator, creation time, update history, file type, folder structure)
-   Permissions management
-   Faceted search capabilities

These sources connect to Glean through connector\-specific crawling and indexing.

### Crawl configuration[​](#crawl-configuration "Direct link to Crawl configuration")

-   **Permissions control:** Configure access at the individual item level and specify inclusion and exclusion rules by asset IDs or item containers.
-   **Crawl strategy:** Adjust crawl parameters to match your organization's needs, including crawl frequency, blackout periods, and crawl methodology options.

## People intelligence[​](#people-intelligence "Direct link to People intelligence")

info

One in ten enterprise searches are people-related, making comprehensive people data crucial for effective enterprise search.

![Knowledge Graph people view](/img/search/knowledge-graph.20240129215322546.webp)

Glean's Knowledge Graph provides rich people insights

The People pillar of the Knowledge Graph provides:

1

Unified identity

Creates a consolidated view of each person across all connected applications.

2

Organizational context

Maps relationships between roles, teams, tenure, and location.

3

Collaboration insights

Identifies close collaborators and recent project involvement.

4

Customizable profiles

Flexible data model that can be tailored to your organization's needs.

## Activity tracking[​](#activity-tracking "Direct link to Activity tracking")

info

Activity data is collected securely from connected applications to enhance search personalization and relevance.

Activity data is collected from multiple sources:

-   Teams
-   Slack
-   Email
-   Plugins
-   Chrome extension

### Data usage and privacy[​](#data-usage-and-privacy "Direct link to Data usage and privacy")

The activity information serves two primary purposes:

-   **Individual personalization:** Activity and Knowledge Graph signals customize outputs and improve search while maintaining strict user privacy. Individual data remains isolated to each user.
-   **Collective intelligence:** Aggregated insights enhance results for user groups, with privacy thresholds ensuring that data collection occurs only across multiple users.

note

Activity data never leaves your exclusive GCP project and is subject to strict data protection rules to ensure privacy.

## See also[​](#see-also "Direct link to See also")

-   [Data Flow](/security/architecture/data-flow): See how Glean ingests, processes, and queries data within the platform.
-   [Shared and Centralized Services](/security/architecture/shared-centralized-services): How Glean's central infrastructure securely supports and manages all customer instances.
