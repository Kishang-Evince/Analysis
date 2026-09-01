---
url: "https://docs.glean.com/connectors/key-terms"
canonical: "https://docs.glean.com/connectors/key-terms"
title: "Key terms"
description: "Glossary of connector-related terms used across this documentation."
fetched_at: "2026-09-01T13:29:20.859Z"
---
Use these definitions consistently when reading the rest of this page and [About connectors](/connectors/about).

-   **Connector**: A Glean integration for a specific product (for example, Jira, Slack, Google Drive). Connectors understand that product’s APIs and data model. They fetch content and permissions into Glean and, where the source API supports it, may also sync metadata, people or groups, and activity signals.
-   **Search index**: The tenant-scoped store of crawled (or pushed) documents and messages, plus metadata and permission information, used for fast retrieval and ranking. It is not merely a list of files; it stores the information Glean uses to filter, rank, and retrieve results.
-   **Enterprise Graph**: The layer that represents relationships and context across your organization (for example, people, content, projects, and how they connect), informed by indexed content, metadata, permissions, identity resolution, and related signals. Connectors supply the underlying data.
-   **Permission mirroring**: Connectors sync who can see what from each source so that Glean does not expose content a user could not access in that source (subject to connector correctness and product configuration).
-   **Retrieval-augmented generation (RAG)**: For Chat (and similar surfaces), Glean retrieves relevant, permission-aware snippets from the index and/or live queries, then passes them to a language model to generate an answer. Answers are intended to be grounded in that retrieved context.
-   **Indexed access**: Content (and usually permissions and activity) is crawled or pushed into the Glean index on a schedule or via events (for example, incremental crawls or webhooks, depending on connector).
-   **Live retrieval (query-time fetch)**: Glean fetches current source data when needed to complement asynchronous indexing.
-   **Hybrid access**: Combines indexed breadth with live-retrieval top-ups for specific slices (for example, very recent changes or areas where broad indexing is limited).
