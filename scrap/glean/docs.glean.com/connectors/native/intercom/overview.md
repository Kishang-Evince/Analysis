---
url: "https://docs.glean.com/connectors/native/intercom/overview"
canonical: "https://docs.glean.com/connectors/native/intercom/overview"
title: "Intercom overview"
description: "Learn how the Intercom connector works with Glean."
fetched_at: "2026-09-01T13:29:32.646Z"
---
On this page

The Glean Intercom connector integrates with Intercom's customer communications and ticketing platform, allowing support, customer success, and sales teams to search and ask questions across conversations, tickets, and Help Center articles alongside their other enterprise knowledge. The connector uses per-user OAuth tokens to crawl content and enforce Intercom's admin-based permissions so users only see content they can access in Intercom.

note

Connector field labels, redirect URLs, and required OAuth scopes are shown in the **Glean Admin console** for your deployment. Use those values as the source of truth; this page summarizes the overall flow and links to Intercom's developer documentation.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The connector uses Intercom's Representational State Transfer (REST) API v2. The following table summarizes the objects Glean indexes.

| Object | Description |
| --- | --- |
| **Conversations** | Customer support conversations from the Intercom inbox. |
| **Tickets** | Structured support requests managed through Intercom's ticketing system. |
| **Help Center articles** | Knowledge base articles published through Intercom's Help Center. |

Glean also crawls the following objects for context and identity. These are not indexed as standalone searchable documents:

-   **Contact references** are embedded in conversation and ticket API responses as lightweight references (IDs and types). These are not independently crawled but are included in the indexed conversation and ticket data.
-   **Teammates (admins)** are Intercom teammate profiles including name, email, and team membership. Glean uses these for ownership display, assignment resolution, and identity mapping.

## Supported features[​](#supported-features "Direct link to Supported features")

The Intercom connector supports the following capabilities:

-   **Per-user permission enforcement.** The connector uses per-user OAuth tokens to crawl content. Glean makes each item visible only to users whose tokens were able to discover that content during a crawl. Users who have not connected Intercom will not see Intercom results.
-   **Published article access for all users.** Published Help Center articles are accessible to all Glean users, including those who have not connected their Intercom account. Draft articles are visible only to users whose tokens can access them.
-   **Full and incremental crawls.** The connector supports full crawls for all content types. Conversations and tickets also support incremental crawls, which use the `updated_at` timestamp to fetch only items modified since the last crawl. Articles are crawled in full each cycle. Full crawls also handle deletion detection by marking content that is no longer discoverable as deleted.
-   **Two-phase crawl strategy.** The connector runs a discovery phase that iterates through each authorized user's token to identify accessible conversations, articles, and ticket IDs. A subsequent fetch phase retrieves full content and metadata for each discovered item, including conversation parts, ticket parts, and article body content.
-   **Deep links.** Each search result links back to the corresponding item in the Intercom UI so users can view the full conversation, ticket, or article in context.
-   **Regional API support.** The connector supports Intercom's region-specific API endpoints for US, EU, and AU data residency.
-   **Token revocation handling.** If a user's OAuth token is revoked in Intercom, the next full crawl will stop associating that user with previously discovered content. Content that is no longer discoverable by any connected user's token is removed from the index.

## Content configuration[​](#content-configuration "Direct link to Content configuration")

The Intercom connector does not support inclusion or exclusion rules (greenlisting or redlisting) for filtering which content is crawled. Glean indexes all conversations, tickets, and Help Center articles that are discoverable by the connected users' tokens.

Content scope is controlled entirely by which users have connected their Intercom accounts to Glean and what those users can access within Intercom. To limit the content that Glean indexes, adjust user permissions in Intercom.

## Limitations[​](#limitations "Direct link to Limitations")

-   **Per-user connection required.** Each user must complete Intercom authorization in Glean to see Intercom results. Users without a connected Intercom account will not see Intercom content.
-   **Webhook processing is disabled by default.** Enable it through the applicable connector settings to publish document-change events.
-   **API rate limits.** Intercom enforces API rate limits that may affect crawl throughput for large workspaces. See [Intercom's rate limiting documentation](https://developers.intercom.com/docs/references/rest-api/errors/rate-limiting) for details.
-   **Regional configuration required.** Intercom supports region-specific API endpoints (US, EU, or AU). You must select the correct region during setup to match your Intercom workspace location. Using the wrong region will cause crawl failures.
