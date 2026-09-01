---
url: "https://docs.glean.com/connectors/native/15five/about"
canonical: "https://docs.glean.com/connectors/native/15five/about"
title: "15Five overview"
description: "Learn what the Glean 15Five connector indexes, how it enforces 15Five permissions, and which objects are out of scope."
fetched_at: "2026-09-01T13:29:21.068Z"
---
On this page

Glean’s 15Five connector allows organizations to integrate data from the 15Five performance management platform into Glean’s search experience. The connector ingests publicly available content from 15Five, including employee recognitions and weekly priorities, and strictly enforces data security and permissions according to the user’s access in 15Five itself. Only data authorized by the connected system and based on 15Five’s provided API is available to users during search.

To connect 15Five to Glean, see [Setup](/connectors/native/15five/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The 15Five connector is designed to bring core collaborative content from 15Five to Glean’s unified search. It makes 15Five’s public recognitions and weekly priorities discoverable, while preserving access controls. The connector indexes public collaborative content available through the 15Five Public API.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description | Notes |
| --- | --- | --- |
| Priorities | Weekly goals tracked in 15Five | Indexed as user documents; visible to self/manager only |
| High Fives | Public recognitions among employees | Only public “High Fives” and comments supported |

## Key API endpoints[​](#key-api-endpoints "Direct link to Key API endpoints")

-   Fetches via 15Five Public API:
    -   `/api/public/priority`
    -   `/api/public/high-five`
    -   `/api/public/group` (for membership/permissions)
-   Indexes metadata to enforce permissions at search-time

## Limitations[​](#limitations "Direct link to Limitations")

-   Only public High Fives and public comments are indexed (as permitted by 15Five’s API).
-   Private High Fives and private comments are not indexed.
-   Only priorities marked as “complete” are surfaced (API limitation).
-   No indexing for 15Five “Objectives,” “1-on-1s,” or “Best-Self Review” at this time.
-   Multi-instance setup is supported; each requires unique credentials.

## See also[​](#see-also "Direct link to See also")

-   [15Five setup](/connectors/native/15five/setup)
