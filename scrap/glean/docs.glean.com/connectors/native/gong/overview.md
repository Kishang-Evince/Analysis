---
url: "https://docs.glean.com/connectors/native/gong/overview"
canonical: "https://docs.glean.com/connectors/native/gong/overview"
title: "Gong overview"
description: "Learn how the Gong connector works with Glean."
fetched_at: "2026-09-01T13:29:31.022Z"
---
On this page

The Gong connector enables Glean to index and search call data, transcripts, metadata, and library folders from Gong, enforcing all relevant user permissions. Glean’s connector uses OAuth 2.0 authentication, integrates with Gong via its API, and ensures that no data leaves the customer’s cloud environment.

## Supported features[​](#supported-features "Direct link to Supported features")

Glean’s Gong connector is designed to work with Gong’s cloud service for enterprise search, enforcing access permissions strictly at the time of search to ensure compliance with Gong’s data visibility policies.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

-   Calls (including recordings)
-   Call metadata (such as participants, duration, and topics)
-   Call transcripts (full text of conversations)
-   Library folders (structure and permissions for organization of call recordings)

### Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   **User identity and membership data**: Used to map users, permission profiles, and workspace assignments.
-   **Folder (Library) crawling**: Hierarchical crawling of public and private library folders for permissions inheritance.
-   **Calls API**: Crawls all call records, their participants, metadata, and transcripts, both at the workspace level and within library folders.
-   **Permissions mapping**: Reconstructs Gong’s permission model in Glean using information from call participation and permission profiles.

## Crawling frequency and freshness[​](#crawling-frequency-and-freshness "Direct link to Crawling frequency and freshness")

Glean crawls Gong content using both incremental and full crawls to ensure freshness and completeness.

-   **Incremental crawl:** Runs every 5 minutes, indexing new and updated calls within minutes of their availability via the Gong API.
-   **Full crawl:** Runs periodically to ensure completeness and accurately handle deletions. The exact frequency is subject to change as we optimize the integration.

Gong typically takes 10–60 minutes to process call recordings and transcripts after a call ends. The total time from call end to searchability in Glean depends on this Gong-side processing delay plus Glean’s crawl timing.

### Limitations[​](#limitations "Direct link to Limitations")

-   Permissions for shared calls, managed directly within Gong’s UI, are not accessible via the Gong API and thus are not enforced in Glean.
    
-   Users mentioned in comments on a call do not have permissions mapped for those calls within Glean.
    
-   All data is supported for cloud (SaaS) Gong instances only; on-prem variants or distinct Gong environments are not currently supported.
    
-   Content modification permissions in Gong are not relevant, as Glean connectors are read-only.
    
-   Gong's API filters calls based on the meeting start time, not the time the call was processed or uploaded. This time-based filtering results in the following indexing behavior:
    
    -   **Late-uploaded calls:** Calls uploaded retroactively with past meeting times may experience longer indexing delays because the initial incremental crawl may have already passed their `start time`.
    -   **Long and in-progress calls:** Calls still in progress during an incremental crawl will not appear in Glean until the call ends and Gong finishes processing the recording. Very long calls (>2 hours) will be indexed during the next full crawl.
