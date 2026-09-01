---
url: "https://docs.glean.com/connectors/native/affinity/about"
canonical: "https://docs.glean.com/connectors/native/affinity/about"
title: "Affinity overview"
description: "Learn what the Glean Affinity connector indexes, how it enforces Affinity workspace and list permissions, and how often it crawls."
fetched_at: "2026-09-01T13:29:21.386Z"
---
On this page

The Affinity native connector allows relationship‑driven organizations—especially private equity, venture capital, and investment banking firms—to bring Affinity’s relationship intelligence data into Glean. With this integration, teams can search, analyze, and use their Affinity people, company, and opportunity data alongside the rest of their enterprise knowledge.

Glean honors Affinity’s workspace‑level visibility for people and organizations, and list‑based permissions for opportunities and lists, so users only see what they can access in Affinity itself.

To connect Affinity to Glean, see [Setup](/connectors/native/affinity/setup).

## Use case examples[​](#use-case-examples "Direct link to Use case examples")

-   **Relationship and company research:** Combine Affinity data with other systems in your stack (email, calendar, CRM, deal room, etc.).
    -   *Example:* "Who is the main contact for Acme Corp and have we had any meetings with them recently?"
-   **Opportunity and list workflows:** Research about lists and opportunities assigned to you and find out additional information.
    -   *Example:* "All open opportunities where the close date is next month and amount > 100K US Dollars, assigned to me."

## Objects and data indexed[​](#objects-and-data-indexed "Direct link to Objects and data indexed")

### Objects crawled[​](#objects-crawled "Direct link to Objects crawled")

The Affinity connector crawls the following object types:

-   People
-   Organizations (Companies)
-   Opportunities
-   Lists

The connector also crawls the Affinity schema for each object, making field metadata available to Glean.

By default, the connector runs a full crawl of all supported object types and schemas approximately once per hour. Glean can adjust this frequency.

### Default fields indexed[​](#default-fields-indexed "Direct link to Default fields indexed")

By default, Glean indexes the following attributes for each Affinity object type. You can work with Glean to add additional custom fields on a per‑customer basis.

**People**

-   First name
-   Last name
-   Primary email address
-   All email addresses
-   Current job title
-   Current organization
-   Phone number
-   Industry
-   Location
-   Last email

**Organizations (Companies)**

-   Name
-   Domain
-   All domains
-   Description
-   Industry
-   Location
-   Investment stage
-   Total funding amount (USD)
-   Year founded
-   Investors
-   Last funding date
-   Number of employees
-   Last email

**Opportunities**

-   Name
-   People (associated contacts)
-   Status
-   Owners
-   Organizations (associated companies)
-   Amount
-   Close date
-   Last email
-   Created by
-   Created at

**Lists**

-   Name
-   Type
-   Visibility / Is public
-   Owner
-   Created by

Custom properties can be indexed on request. Glean can be configured to fetch both additional **basic** fields and **additional** custom fields for supported Affinity objects, using the exact Affinity field names from your workspace (including case and spacing). This configuration is currently performed by Glean Solutions Engineering or Support teams.

> List‑specific properties for People and Companies are not currently supported as indexed fields in Glean.

## Permissions and visibility[​](#permissions-and-visibility "Direct link to Permissions and visibility")

Affinity enforces access through a combination of workspace‑wide visibility and list‑level sharing. The connector mirrors these rules in Glean.

| Authorization layer | Required action | Indexed scope | Permissions |
| --- | --- | --- | --- |
| **Workspace authorization** (Admin-level) | A Glean administrator connects the company’s Affinity workspace via OAuth. | Enables Glean to crawl People and Organizations (workspace-wide data). | Affinity treats these as workspace‑wide relationship data. By default they are visible to all users in the Affinity workspace, and Glean exposes them consistently in search. |
| **End-user authorization** (Per-user OAuth) | Each Affinity user must complete their own separate OAuth flow with Affinity through Glean. | Enables Glean to crawl and expose that user’s specific Opportunities and Lists. | Access is controlled primarily at the **List** level in Affinity. Users can only see opportunities and lists that they have access to in Affinity and for which they have completed OAuth in Glean. |

## Authentication and authorization mechanism[​](#authentication-and-authorization-mechanism "Direct link to Authentication and authorization mechanism")

### OAuth model[​](#oauth-model "Direct link to OAuth model")

Glean integrates with Affinity using **[OAuth 2.0 Authorization Code Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1)** as a confidential client.

-   Affinity has created and registered a central **Glean OAuth app** that is reused for all customers. Affinity does not currently support per‑customer apps for this integration.
-   The Glean app must be **greenlisted** for each customer’s Affinity workspace before OAuth will succeed. Customers must work with **Affinity Support** to get the central Glean client approved for their workspace; otherwise OAuth attempts are likely to fail.

## API endpoints used[​](#api-endpoints-used "Direct link to API endpoints used")

The connector uses the following Affinity v2 API endpoints to fetch data:

| Object | API endpoint |
| --- | --- |
| Contacts | `GET /v2/persons` |
| Companies | `GET /v2/companies` |
| Opportunities | `GET /v2/lists/<list-id>/list-entries` |
| Lists | `GET /v2/lists` |

## Crawling strategy and update frequency[​](#crawling-strategy-and-update-frequency "Direct link to Crawling strategy and update frequency")

### Full crawl[​](#full-crawl "Direct link to Full crawl")

-   For each supported Affinity object type—People, Organizations, Opportunities, Lists, and their associated schemas—the connector currently performs full crawls only (no incremental crawls).
-   By default, a full crawl for each object type and its schema runs approximately once per hour, although this cadence can be adjusted via configuration by Glean.
-   Because the connector relies solely on full crawls, changes made in Affinity can take up to about one hour (or your customized full‑crawl interval) to appear in Glean search and Glean responses.

### Identity and schema crawling[​](#identity-and-schema-crawling "Direct link to Identity and schema crawling")

In addition to object records, the connector:

-   Crawls **schemas** for People, Organizations, Opportunities, and Lists to keep field definitions in sync.
-   Performs **access token refresh** operations as a separate object crawl, ensuring OAuth tokens remain valid without admin intervention.

## Limitations[​](#limitations "Direct link to Limitations")

-   Notes and reminders in Affinity are not crawled or indexed.
-   All supported objects use full crawls only; there is no incremental crawl yet. Changes may take up to about one hour (or your configured full‑crawl interval) to appear in Glean search.
-   Additional fields beyond the default set must be configured by Glean; there is no self-serve UI for admins to add or change Affinity fields.

## See also[​](#see-also "Direct link to See also")

-   [Affinity setup](/connectors/native/affinity/setup)
