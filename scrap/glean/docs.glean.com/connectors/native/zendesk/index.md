---
url: "https://docs.glean.com/connectors/native/zendesk/"
canonical: "https://docs.glean.com/connectors/native/zendesk/"
title: "Zendesk"
description: "Index Zendesk tickets, knowledge base articles, and community posts in Glean using an API token, with permissions enforced from Zendesk."
fetched_at: "2026-09-01T13:29:48.621Z"
---
On this page

The Zendesk connector lets Glean fetch and index Zendesk content so people can search what they are allowed to access in the source system.

-   **Authentication**: A Zendesk admin signs in during Glean connector setup and provides an API token.
-   **Data storage**: Data stays in the cloud project within your organization's cloud account; it does not leave your environment.

**API usage**

-   **Standard API**: Glean uses Zendesk's [Apps REST API introduction](https://developer.zendesk.com/api-reference/apps/apps-support-api/introduction/) to ingest data.

**Integration features**

-   **Content captured**: Posts, knowledge base articles, and tickets, including comments.
-   **Permissions**: Glean respects Zendesk access controls, so search results only include content the user can access. Opening a result goes to Zendesk, which enforces permissions again.

## Objects supported[​](#objects-supported "Direct link to Objects supported")

The Zendesk connector supports the following objects:

-   Knowledge base articles (including comments)
-   Tickets (including comments)
-   Posts and comments

## Authentication[​](#authentication "Direct link to Authentication")

A Zendesk administrator creates an [API token](https://developer.zendesk.com/api-reference/introduction/security-and-auth/#api-token) for the connector. Use a **service account** to create the token so Glean does not lose access if the person who set up authentication leaves the organization.

## Connection instructions[​](#connection-instructions "Direct link to Connection instructions")

info

Glean updates this customer-facing documentation on a schedule. For the latest steps, use the instructions shown in the Glean Admin console for your connector.

## Create a Zendesk API token[​](#create-a-zendesk-api-token "Direct link to Create a Zendesk API token")

1.  Sign in to Zendesk, copy your URL from the browser address bar, and enter it in Glean (for example, `https://yourzendeskdomain.zendesk.com`).
2.  Go to **Admin** (gear icon) → **Go to Admin Center** → **Apps and integrations** → **Zendesk API**.
3.  Enable **Token Access**.
4.  Click **Add API token**. Set the description to **Glean Access Token**, then save the token value for Glean setup.

## Set up the connector in Glean[​](#set-up-the-connector-in-glean "Direct link to Set up the connector in Glean")

1.  Enter the connector **Name** and choose an icon.
2.  Complete any remaining steps in **Show setup instructions**.
3.  Enter the following:
    -   **Zendesk domain** (for example, `https://yourzendeskdomain.zendesk.com`)
    -   **API Token** from the service account
    -   **Email** for the service account that created the token
    -   Select the content types to crawl:
        -   Crawl articles
        -   Crawl posts
        -   Crawl tickets
4.  Click **Save**.

## Items crawled[​](#items-crawled "Direct link to Items crawled")

### Content indexed[​](#content-indexed "Direct link to Content indexed")

-   Knowledge base articles (including comments)
-   Tickets (including comments)
-   Posts and comments

### Identity[​](#identity "Direct link to Identity")

-   **Users**: User information from Zendesk
-   **Groups**: Groups in Zendesk, including organizations, user segments, and `permission_groups`

The identity crawl uses the following modes:

-   **Incremental identity crawls**: Capture changes since the last crawl.
-   **Full identity crawls**: Run periodically so identity data stays current.

### Webhook events[​](#webhook-events "Direct link to Webhook events")

The Glean Zendesk connector uses webhooks for ticket creation, ticket updates, and comment creation.

### Rate limits[​](#rate-limits "Direct link to Rate limits")

-   **Queries per second (QPS)**: The default limit is 12 queries per second; it can be adjusted. Contact your Glean representative for details.
-   For Zendesk's own rate limits, see [Zendesk API rate limits](https://developer.zendesk.com/api-reference/introduction/rate-limits/).

### Update frequency[​](#update-frequency "Direct link to Update frequency")

Content updates can be quite fast, depending on the update type and your configuration:

-   **People / identity crawls**: Run about every hour to pick up group membership and permission changes.
-   **Incremental crawls**: Run about every hour and capture changes since the previous incremental or full crawl.
-   **Full crawls**: Frequency is configurable; full crawls are typically less frequent than incremental crawls (often about every 28 days).

Data must be crawled, processed, and indexed before it appears in the product UI. Timing varies with change volume and corpus size. For more on refresh behavior, see [Crawling frequency](/connectors/crawling-refresh-rates).

### How the crawl works[​](#how-the-crawl-works "Direct link to How the crawl works")

The Zendesk crawler uses the Zendesk API and standard crawl patterns:

-   **Identity crawl**: Updates people data, including users, groups, and related information.
-   **Content crawls**: Full crawls cover the full configured scope; incremental crawls capture changes since the last full or incremental crawl.

### Known crawl limitations[​](#known-crawl-limitations "Direct link to Known crawl limitations")

-   Glean does not support Departmental Spaces or Team Brand membership.

## API endpoints[​](#api-endpoints "Direct link to API endpoints")

The connector uses REST paths such as:

-   `api/v2/users.json`
-   `api/v2/groups.json`
-   `api/v2/groups/%s/memberships.json`
-   `api/v2/guide/permission_groups.json`
-   `api/v2/help_center/user_segments.json`
-   `api/v2/organizations.json`
-   `api/v2/organizations/%s/organization_memberships.json`
-   `api/v2/brands`
-   `api/v2/community/topics.json`
-   `api/v2/help_center/incremental/articles.json`
-   `api/v2/help_center/articles/%s/comments.json`
-   `api/v2/community/posts.json`
-   `api/v2/community/posts/%s/comments.json`
-   `api/v2/ticket_fields.json`
-   `api/v2/incremental/tickets/cursor.json`
-   `api/v2/tickets/%s/comments.json`
-   `api/v2/custom_roles.json`
-   `api/v2/triggers`
-   `api/v2/webhooks`
-   `api/v2/apps/installations.json`

## Content configuration[​](#content-configuration "Direct link to Content configuration")

note

If **inclusion (allowlist)** rules are enabled, only content in the inclusion set is indexed. If **exclusion (denylist)** rules are enabled, matching content is removed from the index. If both apply to the same item, the item is **not** indexed, because exclusion wins.

Use inclusion and exclusion rules sparingly so search stays useful: most people expect broad coverage. Many organizations use no rules, or only exclusion rules for sensitive content.

### Exclusion (denylist) options[​](#exclusion-denylist-options "Direct link to Exclusion (denylist) options")

You can exclude the following from the Zendesk crawl:

-   Posts
-   Articles
-   Brand ID

Excluded content does not appear in search, chat, or other Glean experiences.

Contact your Glean representative to configure exclusion rules.

### Inclusion (allowlist) options[​](#inclusion-allowlist-options "Direct link to Inclusion (allowlist) options")

You can limit the crawl to the following:

-   Posts
-   Articles
-   Brand ID

Only included content appears in search, chat, and other Glean experiences. Content you do not include is not indexed.

Contact your Glean representative to configure inclusion rules.
