---
url: "https://docs.glean.com/connectors/native/freshservice/overview"
canonical: "https://docs.glean.com/connectors/native/freshservice/overview"
title: "Freshservice overview"
description: "Freshservice is a cloud-based IT help desk and service management platform."
fetched_at: "2026-09-01T13:29:26.860Z"
---
On this page

Freshservice is a cloud-based IT help desk and service management platform. The Glean Freshservice connector enables organizations to index and search solutions articles, tickets, and releases from Freshservice, with permissions and access aligned to the native platform. Associated permissions, group memberships, and user identities are crawled from corresponding endpoints, for example, agents, requesters, departments and groups.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

-   Solutions articles (knowledge base)
-   Solution categories and folders
-   Tickets
-   Releases

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   Solutions categories: /solutions/categories
-   Solutions folders: /solutions/folders
-   Solutions articles: /solutions/articles
-   Tickets: /tickets
-   Releases: /releases

## Limitations[​](#limitations "Direct link to Limitations")

-   Multi-workspace instances are not currently supported, even with multiple connector instances.
-   The connector currently does not implement the *managed by* permission, as the Freshservice API does not expose granular role-level permissions.
-   Private or restricted tickets assigned to restricted groups are not accessible unless an API key is provided from a relevant group member.
-   Custom roles with non-standard permissions are not fully supported if role permissions are unavailable from the API.
