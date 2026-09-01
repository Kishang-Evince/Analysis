---
url: "https://docs.glean.com/connectors/native/canva/about"
canonical: "https://docs.glean.com/connectors/native/canva/about"
title: "Canva overview"
description: "Learn what the Glean Canva connector indexes, its key features, and how it handles Canva permissions."
fetched_at: "2026-09-01T13:29:23.832Z"
---
On this page

note

**Beta:** This page contains beta features and may change.

The Canva connector enables Glean to fetch and index Canva designs and documents, making them searchable alongside your organization’s tickets, wikis, and other work artifacts. Users can discover Canva content via global search or reference it directly within Glean’s conversational Glean.

Glean mirrors Canva’s native permission model to ensure users only see content they are authorized to access.

To connect Canva to Glean, see [Setup](/connectors/native/canva/setup).

## Key features[​](#key-features "Direct link to Key features")

-   **Unified discovery:** Search for Canva designs and documents alongside content from other enterprise tools.
-   **AI-powered insights:** Reference Canva content in Glean’s conversational Glean to help draft or review work.
-   **Permission mirroring:** Automatically maintains Canva access controls for all search and chat results.
-   **Secure data handling:** All fetched content is encrypted in transit and at rest within your Glean tenant, protected by audited, role-based access.

## Indexed content and data[​](#indexed-content-and-data "Direct link to Indexed content and data")

The connector focuses on making Canva design work discoverable and referenceable.

-   **Content types:** Ingests Canva designs and documents, including basic metadata such as titles and access relationships.
-   **Identity & permissions:** Glean determines visibility based on the authorization granted during setup. The connector relies on Canva’s access model to ensure search results are consistent with what the user sees directly in Canva.

## See also[​](#see-also "Direct link to See also")

-   [Canva setup](/connectors/native/canva/setup)
