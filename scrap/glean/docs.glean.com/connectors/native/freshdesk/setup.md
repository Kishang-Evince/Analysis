---
url: "https://docs.glean.com/connectors/native/freshdesk/setup"
canonical: "https://docs.glean.com/connectors/native/freshdesk/setup"
title: "Freshdesk setup"
description: "Connect Freshdesk to Glean by determining your Freshdesk domain, generating an API key, and configuring credentials in the Glean Admin Console."
fetched_at: "2026-09-01T13:29:26.623Z"
---
On this page

Connect Freshdesk to Glean by determining your Freshdesk domain, generating an API key, and configuring credentials in the Glean Admin Console.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you start, ensure you have:

-   A Freshdesk cloud instance.
-   A Freshdesk user with Global ticket scope (`ticket_scope: 1`) so Glean can crawl all tickets.
-   Access to Glean Admin console with permission to add and configure connectors.

### Required permissions[​](#required-permissions "Direct link to Required permissions")

Glean requires an API key from a Freshdesk agent with specific permissions to crawl your data. There are two configuration options:

#### Option 1: Use a default admin role (recommended)[​](#option-1-use-a-default-admin-role-recommended "Direct link to Option 1: Use a default admin role (recommended)")

Assign the agent one of these built-in roles, which include all necessary permissions:

-   Account Administrator
-   Administrator

#### Option 2: Create a custom role with specific permissions[​](#option-2-create-a-custom-role-with-specific-permissions "Direct link to Option 2: Create a custom role with specific permissions")

If you prefer a least-privilege custom role, ensure it includes the following permissions:

-   **View solutions tab**: Required for crawling solution articles.
-   **View customers tab**: Required for crawling contacts and companies.
-   **Admin (Play God with Super Admin controls)**: Required to crawl Freshdesk agents for permission mapping.

## Step 1: Determine your Freshdesk domain[​](#step-1-determine-your-freshdesk-domain "Direct link to Step 1: Determine your Freshdesk domain")

1.  Open your Freshdesk instance in a web browser.
2.  Locate the URL in the address bar, which follows this format: `https://<instance-domain>.freshdesk.com`. For example, if you access Freshdesk at `https://glean.freshdesk.com`, the domain is `glean`.

## Step 2: Generate a Freshdesk API key[​](#step-2-generate-a-freshdesk-api-key "Direct link to Step 2: Generate a Freshdesk API key")

1.  Log in to Freshdesk as the admin user you will use for Glean.
2.  Click your **profile picture** in the top‑right corner.
3.  Select **Profile Settings**.
4.  Click **View API Key** on the right side of the page.
5.  Copy the displayed API key. Treat this key as a secret.

## Step 3: Configure credentials in Glean[​](#step-3-configure-credentials-in-glean "Direct link to Step 3: Configure credentials in Glean")

1.  In the **Glean Admin Console**, go to **Connectors** and select **Add connector**.
    
2.  Choose **Freshdesk** from the list of native connectors.
    
3.  Enter a **Name** and icon for your connector.
    
4.  Select data retrieval methods. Enable both methods for optimal results (recommended):
    
    -   **Data crawling and indexing**: Uses scheduled full and incremental crawls to sync content and permissions into the Glean index.
    -   **Data fetching**: Retrieves live data at query time via the Freshdesk Search API.
5.  In the Freshdesk connector setup screen:
    
    -   Enter the **Freshdesk domain** (for example, `glean`).
    -   Paste the **API key** you generated in Freshdesk.
6.  Click **Save** to complete the configuration.
    

## Crawling strategy and update behavior[​](#crawling-strategy-and-update-behavior "Direct link to Crawling strategy and update behavior")

The Freshdesk connector uses a combination of full and incremental crawls to index and update data. It performs frequent incremental updates for active tickets and periodic full crawls to capture long-tail changes and ensure data consistency.

### Crawl types[​](#crawl-types "Direct link to Crawl types")

**Full crawls:** Enumerate all in-scope objects for a specific type, such as all solution articles, contacts, companies, and tickets within the configured lookback window. Glean uses full crawls during initial setup and periodically thereafter to reconcile the index.

**Incremental crawls:** Fetch records modified since the previous crawl based on Freshdesk timestamps or pagination cursors. These crawls ensure that frequently updated objects remain current between full crawls.

**Identity and permission crawls:** Retrieve agents, roles, groups, and associated metadata. Glean uses this data to compute and enforce Access Control Lists (ACLs).

### Crawling strategy table[​](#crawling-strategy-table "Direct link to Crawling strategy table")

This table summarizes how the connector treats different categories of data. Exact intervals are tuned per deployment and may change over time; treat these as **behavioral patterns** rather than precise SLAs.

| Data category | Initial indexing | Ongoing updates | Notes |
| --- | --- | --- | --- |
| **Tickets** | Full crawl of in‑scope tickets (within a configured lookback period, typically 365 days) when the connector is first enabled or when a full recrawl is triggered. | Incremental crawls fetch tickets created or updated since the last run, so new and recently updated tickets appear in Glean shortly after they change in Freshdesk. Periodic full crawls refresh long‑tail tickets. | Designed to keep active queues fresh while controlling API usage. Older tickets are revisited less frequently. |
| **Solution articles** | Full crawl of all published solution categories, folders, and articles. | Category and folder metadata is refreshed during periodic full recrawls. | Only published articles are indexed. Draft or unpublished articles are skipped. |
| **Contacts and companies** | Full crawl of all contacts and companies visible to the integration user. | Incremental crawls fetch newly created or updated contacts and companies. | Ensures contact/company context is available for ticket‑level and account‑level reports. |
| **Identity and permissions (agents, roles, groups)** | Full crawl of agents, roles, and groups to build initial identity and group membership maps. | Periodic recrawls refresh membership, group definitions, and role metadata. | Used to compute permission groups such as "global ticket access" and role‑based visibility for solution articles, contacts, and companies. |

Freshdesk does not currently use webhooks. All freshness is driven by scheduled API calls and the configuration managed by Glean. For large or API‑sensitive deployments, work with your Glean representative to tune crawl frequencies and API usage.

## API usage[​](#api-usage "Direct link to API usage")

The connector uses the Freshdesk Representational State Transfer (REST) API to ingest content and permissions. Representative endpoints include (non‑exhaustive):

-   **Tickets**
    
    -   `GET /api/v2/tickets`—list tickets (paged, filtered by updated time / lookback).
    -   `GET /api/v2/tickets/{id}`—fetch ticket details.
    -   `GET /api/v2/tickets/{id}/conversations`—fetch conversation threads and replies.
-   **Solutions (knowledge base)**
    
    -   `GET /api/v2/solutions/categories`—list solution categories.
    -   `GET /api/v2/solutions/folders`—list folders within categories.
    -   `GET /api/v2/solutions/folders/{folder_id}/articles`—list articles.
-   **Contacts and companies**
    
    -   `GET /api/v2/contacts`—list contacts.
    -   `GET /api/v2/companies`—list companies.
-   **Identity and validation**
    
    -   `GET /api/v2/agents/me`—validate global ticket scope for the integration user.
    -   `GET /api/v2/groups`—validate group access and admin permissions.
    -   `GET /api/v2/contacts` and `GET /api/v2/solutions/categories`—validate access to Customers and Solutions tabs.

Glean uses paginated requests (with `per_page` limits) and standard backoff on errors to respect Freshdesk rate limits. The connector is read‑only: it does not modify Freshdesk data.
