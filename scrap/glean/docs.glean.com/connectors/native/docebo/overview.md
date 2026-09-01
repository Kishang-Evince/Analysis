---
url: "https://docs.glean.com/connectors/native/docebo/overview"
canonical: "https://docs.glean.com/connectors/native/docebo/overview"
title: "Docebo overview"
description: "The Docebo connector indexes courses and learning objects managed in your Docebo Learning Management System (LMS), integrating them directly into Glean Search."
fetched_at: "2026-09-01T13:29:25.446Z"
---
On this page

The Docebo connector indexes courses and learning objects managed in your Docebo Learning Management System (LMS), integrating them directly into Glean Search. This connection respects Docebo permissions at query time, ensuring that search results are restricted to the visibility allowed by your source system. No data indexed by Glean leaves your cloud environment; all documents and metadata remain within your designated cloud environment.

## Key features[​](#key-features "Direct link to Key features")

-   **Comprehensive indexing:** This connector recursively enumerates all learning objects and their content, providing a deep and thorough index of your course material (Sharable Content Object Reference Model (SCORM), Aviation Industry Computer-Based Training Committee (AICC), slides, files, Learning Tools Interoperability (LTI), HTML pages, video metadata).
-   **Permissions enforcement:** Mapped permissions from Docebo are always enforced in Glean at query time.
-   **Authentication:** Supports two authentication methods: OAuth 2.0 Authorization Code and JSON Web Token (JWT) Bearer.
-   **API:** Uses Docebo's Representational State Transfer (REST) API v1.
-   **Container hierarchy:** Courses contain learning objects as children.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The Docebo connector indexes the following entities:

-   Courses, and course descriptions
-   Learning objects (SCORM, AICC, slides/authoring, files, LTI, HTML pages, video metadata)

| Type | Key | Content Indexed |
| --- | --- | --- |
| SCORM | `scormorg` | Downloadable content |
| AICC | `aicc` | Downloadable content |
| Slides Converter | `authoring` | Downloadable content |
| File | `file` | Downloadable content |
| LTI | `lti` | Downloadable content |
| HTML Page | `htmlpage` | Downloadable content |
| Video | `video` | Metadata only |
| Tests | `test` | Metadata only |
| Google Docs | `googledocs` | Metadata only |
| YouTube | `youtube` | Metadata only |

## Limitations[​](#limitations "Direct link to Limitations")

-   **Authentication scope:** The connector is limited to the **`api`** scope as offered by Docebo's API; more granular scopes are not available.
-   **Webhook support:** The connector relies on full API crawls to capture changes. It doesn't currently support native Docebo webhooks for real-time updates.
-   **Admin enrollment:** The connector respects course enrollments, requiring the authorizing admin to be enrolled in all courses for them to be fully indexed.
-   **Configuration:** The connector indexes all accessible courses and learning objects; it doesn't support crawl lookback periods or red/green lists.
