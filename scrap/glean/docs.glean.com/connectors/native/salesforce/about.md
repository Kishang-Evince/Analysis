---
url: "https://docs.glean.com/connectors/native/salesforce/about"
canonical: "https://docs.glean.com/connectors/native/salesforce/about"
title: "Salesforce overview"
description: "What the Salesforce connector indexes, how it authenticates, and how Salesforce permissions are enforced in Glean."
fetched_at: "2026-09-01T13:29:39.516Z"
---
On this page

The Salesforce connector indexes Salesforce CRM and Knowledge data into Glean so that users can search across Accounts, Opportunities, Cases, Knowledge articles, Contacts, and other Salesforce records alongside the rest of their enterprise content (Drive, Confluence, Slack, etc.). In addition to scheduled crawling and indexing, Salesforce also supports data fetching to retrieve fresh, permission‑aware Salesforce data at query time for eligible experiences in Glean Search and Glean.

Glean mirrors Salesforce record‑level permissions so users only see Salesforce data they are entitled to in Salesforce itself.

Typical deployments connect **Sales Cloud** and **Service Cloud** organizations to support sales, customer success, and support workflows, including AI-powered experiences in **Glean Search**, **Glean**, **Glean Agents**, and [embedded Glean experiences inside Salesforce](/administration/platform/embedded-integrations/glean-in-service-cloud) (Service Cloud workspaces).

## Key features[​](#key-features "Direct link to Key features")

-   Indexes core **Sales Cloud and Service Cloud** CRM objects, including Accounts, Contacts, Leads, Opportunities, Cases, Case Comments, Tasks, Campaigns, and others you select in the Glean Admin console.
-   Indexes **Salesforce Knowledge** articles (Lightning and/or Classic, depending on your org), including support for indexing draft articles when explicitly enabled by Glean.
-   Indexes **Salesforce Files** (ContentDocument/ContentVersion) with content extraction for common document types (e.g., PDF, DOCX, TXT, HTML), subject to global crawler size and file‑type limits.
-   Supports **custom objects** and fields as long as they are SOQL‑queryable. You can configure object‑specific field mappings, owner and custom properties/facets in Glean Admin console.
-   Mirrors **Salesforce record-level permissions**, respecting all Salesforce sharing constructs (profiles, permission sets, role hierarchy, share records, org-wide defaults, and Enterprise Territory Management), ensuring users only see records they’re authorized to access in Salesforce.
-   Supports multiple **Salesforce orgs** (e.g., production and sandbox, or multiple production orgs) by configuring each as a separate Salesforce connector in Glean.
-   Uses the Salesforce standard [REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm) through [SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm) queries (v62.00 by default) to ingest all data.
-   Makes Salesforce data available to **Glean** and **Glean Agents**, including through Salesforce‑specific tools like **Search Salesforce with SOQL** and **Update Salesforce Opportunity** for live, permission‑aware reads and writes.

-   For select experiences, the Salesforce connector uses data fetching to call Salesforce APIs at query time via per-user OAuth, retrieving fresh CRM data like reports and dashboards to blend with the indexed corpus while respecting Salesforce permissions.

## How Glean retrieves Salesforce data[​](#data-crawling-and-indexing-and-data-fetching "Direct link to How Glean retrieves Salesforce data")

The Salesforce connector supports two retrieval methods: **data crawling and indexing**, and **data fetching**. Most deployments enable both, so that Glean has broad indexed coverage of Salesforce and can also return the current state of a record at query time.

|  | Data crawling and indexing | Data fetching |
| --- | --- | --- |
| **How it retrieves data** | Runs scheduled full and incremental crawls that copy content and permissions into the Glean index. | Calls Salesforce APIs in real time at query time, using each user's own OAuth authorization. |
| **Whose permissions apply** | Salesforce record-level permissions, mirrored into the index as Glean crawls and enforced at query time. | The Salesforce permissions of the user asking, enforced by Salesforce on every call. |
| **When it becomes available** | After the initial crawl completes. | As soon as the connector is connected and the user has authorized their own Salesforce account. |
| **What it powers** | Permission-aware search over Salesforce records, and Glean answers grounded in the indexed corpus. | Live record, report, and dashboard values in answers, and the Salesforce tools that Glean and Glean Agents use to read and act on records. |
| **Best suited to** | Broad coverage, fast global search, and ranking across large organizations. | Very recent changes, and interactive analysis of reports or dashboards. |
| **Constraints** | Subject to crawl frequency and indexing windows. | Subject to Salesforce API limits and network latency. |

What these methods are called in the Admin console

Both methods appear on the connector's **Overview** tab under **Data retrieval methods**, but the labels depend on which setup you're on. A [previous setup](/connectors/native/salesforce/setup) shows **Data crawling and indexing** and **Data fetching**. A [new setup](/connectors/native/salesforce/new-setup) shows **Live connection** alongside its sync status. The underlying behavior is the same in both cases.

## Limitations and special cases[​](#limitations-and-special-cases "Direct link to Limitations and special cases")

-   Field‑level security (FLS) is not enforced by the connector today. If a user can see a record in Glean, indexed fields from that record may appear in search snippets and AI answers, even if those fields are FLS‑restricted in Salesforce. Use field exclusion/red‑listing and object scoping to mitigate this for sensitive fields and objects.
    
-   Glean infers permissions for custom objects; however, the system does not automatically infer permissions for additional native Salesforce objects. Instead, you must explicitly specify the implemented permission model for the object in Glean, selecting from options such as Default (share records), Inherited, All users in org, or Anonymous access.
    
-   Tasks have a partial permission model. Task visibility in Glean currently reflects:
    
    -   The **Task owner (Assigned To)**.
    -   Users **above the owner in the Salesforce role hierarchy**.
    -   Users with **“View All Data”**.  
        Other sharing configurations for Tasks are not fully modeled.
-   Large files and documents are subject to global indexing limits. Items larger than 64 MB are indexed by metadata only (no content extraction).
    
-   Metadata indexing: Encrypted or compressed files, and most rich media (images, video) are not content-indexed by default. The connector can be configured to index their associated metadata (e.g., filename, title); contact Glean Support to enable metadata-only indexing for specific file types.
    

-   Data fetching calls are subject to Salesforce API limits and network conditions. For large organizations or high usage, admins should monitor API consumption alongside crawl usage.
-   Tenant‑level content restriction and DLP tooling in Glean may not apply to live‑fetched Salesforce content in the same way as indexed content. Review your security policies before enabling data fetching if you rely on these controls.

## Supported Salesforce products and editions[​](#supported-salesforce-products-and-editions "Direct link to Supported Salesforce products and editions")

-   The connector uses the Salesforce REST API and SOQL (`/services/data/vXX.X/queryAll`), so the primary requirement is that your org supports API access (e.g., Enterprise Edition or other editions with API access enabled).
-   The connector is designed for Salesforce’s standard multi‑tenant cloud offerings (Sales Cloud, Service Cloud, etc.).
-   Production and sandbox orgs can be connected as separate **Salesforce** connectors in Glean (for example, `Salesforce – Production` and `Salesforce – Sandbox`).

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

Connector supports indexing a broad set of **standard objects**, including:

-   Accounts
-   Contacts
-   Leads
-   Opportunities
-   Cases
-   Case Comments
-   Tasks
-   Campaigns
-   Discussion Forums
-   Product
-   Orders and Order items
-   Quote
-   Voice Call
-   Knowledge articles (including drafts): To index a draft version, it must be enabled by Glean. Glean indexes the latest draft version available, even if an article has multiple versions at different stages. For articles with multiple language versions, Glean surfaces the article's master-language version in search.
-   Chatter feed items (optional; must be enabled by Glean)

You select which objects to crawl in the **Salesforce connector → Objects** tab in the Glean Admin console, and you can add additional objects over time.

### Salesforce CPQ (SBQQ) objects[​](#salesforce-cpq-sbqq-objects "Direct link to Salesforce CPQ (SBQQ) objects")

When Salesforce CPQ is installed and the integration user has the required permissions, the connector indexes the following Salesforce CPQ objects (identified by the `SBQQ` namespace):

-   Quote: `SBQQ__Quote__c`
-   Quote line: `SBQQ__QuoteLine__c`
-   Subscription: `SBQQ__Subscription__c`

For more information, see [CPQ Quote Fields](https://help.salesforce.com/s/articleView?id=sales.cpq_quote_fields.htm&type=5).

### Custom objects[​](#custom-objects "Direct link to Custom objects")

Any object that is SOQL‑queryable and visible to the integration user can be configured as an additional object in Glean:

-   You provide the **object API name** (e.g., `Project__c`).
-   You configure mappings for the `owner`.
-   You can also configure **custom properties** (fields) that should be indexed and/or made available as facets and filters.

### Files and attachments[​](#files-and-attachments "Direct link to Files and attachments")

Salesforce Files are indexed via the Salesforce Attachments Indexing flow:

-   The connector crawls **ContentDocument** records and fetches file bytes via related **ContentVersion** records.
-   By default, Glean indexes content for common document file types such as PDF, DOCX, TXT, and HTML, subject to the global 64 MB per‑item limit and 16.875 MB text limit.  
    Additional file extensions (like JSON) can be enabled and are treated as plain text.
-   Encrypted or compressed files, and most rich media (images, video) are not indexed by default. These files can be configured for metadata-only indexing (e.g., title and filename); contact Glean Support to enable this configuration.
-   Glean can index the content of the Salesforce Attachment object, provided the administrator explicitly enables this object in the configuration.

To index files, you must explicitly add **ContentDocument** as an object in the Salesforce connector configuration (do not add ContentDocumentLink directly; Glean uses it internally).

File permissions are derived from the permissions of all linked Salesforce records (via ContentDocumentLink). Glean ignores links to records that it does not currently index.

### Identity and permissions data[​](#identity-and-permissions-data "Direct link to Identity and permissions data")

To enforce permission‑respecting search, the connector also ingests identity and sharing metadata, including:

-   Users, groups, roles, and profiles.
-   Permission sets and other role/permission structures.
-   Share records for objects (e.g., `AccountShare`, `CaseShare`, and share records for additional objects).

This data is crawled on its own schedule and used to compute access control lists (ACLs) stored in Glean’s index.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

### Record‑level security[​](#recordlevel-security "Direct link to Record‑level security")

By default, Glean mirrors Salesforce record‑level access so that users see only the records they can access in Salesforce:

-   Glean crawls identity data (users, groups, roles, profiles, permission sets) and share records for your configured objects.
-   Glean computes allowed viewers for each record based on the Salesforce sharing model. This model includes org‑wide defaults, role hierarchy, sharing rules, manual shares, and Enterprise Territory Management (Territory2) assignments.
-   At query time, Glean uses these ACLs plus the signed‑in user’s identity to filter out records they should not see.

Share records are crawled with a full scan on a regular schedule (by default, hourly) because Salesforce’s APIs do not expose deleted share records incrementally.

### Object and field‑level access[​](#object-and-fieldlevel-access "Direct link to Object and field‑level access")

The integration user must be able to read any object and field you want Glean to index:

-   If the integration user lacks **Read** (and typically **View All**) on an object, Glean cannot retrieve its records.
-   If the integration user lacks a field‑level **read** on a required field, Glean logs an error and may skip that field or object, depending on configuration; this is a common cause for missing fields.

#### Field‑level security (FLS) enforcement[​](#fieldlevel-security-fls-enforcement "Direct link to Field‑level security (FLS) enforcement")

-   Today, FLS is not enforced at query time. Once a field has been indexed for a record, if a user has access to that record through Salesforce sharing, that field’s content may appear in search snippets or AI‑generated responses in Glean.
    
-   To mitigate this for highly sensitive fields and objects, Glean recommends:
    
    -   Excluding entire objects from indexing where FLS is used as a primary protection mechanism.
    -   Red‑listing or excluding sensitive fields from indexing even when the record itself is indexed.

### Inherited and advanced permissions[​](#inherited-and-advanced-permissions "Direct link to Inherited and advanced permissions")

For **additional/custom objects** configured via the advanced “Additional Objects” mechanism:

-   Glean infers permissions from parent objects, provided the permission model for the object is set to Inherited and the parent object (e.g., Case or Account) is also enabled for the crawl.
    
-   Advanced, object‑specific permission models (complex org‑wide defaults or unusual sharing constructs) may not be fully modeled and should be validated in a representative pilot.
    

For **Tasks**, Glean currently models a restricted permission pattern:

-   The Task owner and users above that owner in the Salesforce role hierarchy, plus users with “View All Data”, can see Tasks in Glean.
-   Other Task permission configurations may not be fully represented.

### Files permissions[​](#files-permissions "Direct link to Files permissions")

Salesforce Files are permissioned in Glean using the union of permissions across all linked records that Glean indexes, via ContentDocumentLink:

-   If a file is linked to a Case and an Opportunity, any user with access to either of those records will be able to see the file in Glean.
-   Links to records that Glean does not index (for example, unsupported objects or records excluded by configuration) do not contribute permissions in Glean.

## Sync behavior, performance, and limits[​](#sync-behavior-performance-and-limits "Direct link to Sync behavior, performance, and limits")

### Crawl types and default schedules[​](#crawl-types-and-default-schedules "Direct link to Crawl types and default schedules")

The Salesforce connector uses a mix of full and incremental crawls, with different schedules for content, permissions, and identity.

-   **Initial full content crawl**
    
    -   Runs when you first enable the connector and click **Crawl now**.
    -   Fetches all records for the configured objects using paginated SOQL queries (`queryAll`) with up to ~2,000 records per call.
-   **Ongoing content crawls**
    
    -   Incremental content crawls run on a frequent schedule (on the order of minutes) to fetch records changed since the last crawl (for example, using `SystemModstamp` as a watermark).
        
    -   Periodic full content crawls run less frequently (e.g., approximately every 28 days) to pick up long‑tail changes and reconcile any missed updates.
        
-   **Share records and permissions**
    
    -   Share records are crawled via regular full scans (default hourly), because the Salesforce APIs do not expose deleted share records incrementally.
        
    -   A configuration flag (such as `crawl.shareRecordsCrawlFrequencySecs`) can be tuned in some deployments. For example, increasing the interval reduces API load, at the cost of slower permission revocation propagation.
        
-   **Identity**
    
    -   Users, groups, roles, and permission sets are crawled periodically (e.g., roughly hourly) with full identity crawls occurring on a longer schedule to ensure correctness.

Actual intervals may vary by deployment and tuning; use this description as a conceptual model and refer to the latest connector release notes if you require exact numbers.

### Freshness expectations[​](#freshness-expectations "Direct link to Freshness expectations")

Changes in Salesforce (record updates, new records, deletions, and permission changes) appear in Glean after they have been:

1.  Picked up by the appropriate incremental or full crawl.
2.  Processed by Glean ingestion pipeline.
3.  Indexed and made available for search and AI experiences.

Under typical settings:

-   **Content changes** (e.g., Case updates) propagate on the order of minutes.
-   **Permission changes** (via share records and identity) can take up to the share/identity crawl interval plus indexing time.

For very large orgs or aggressively tuned crawl intervals, these windows may be longer.

### API usage and performance[​](#api-usage-and-performance "Direct link to API usage and performance")

Crawl performance and Salesforce API consumption depend on:

-   The number of objects you index.
-   The number of records per object.
-   The number of fields included in each query (wide objects increase payload sizes).
-   The complexity of your permission model (share record volume).

Some key points:

-   Glean uses paginated SOQL queries capped at a reasonable number of records per call; internally, query field lists are trimmed if needed to keep total SOQL query length under ~10,000 characters and avoid URI‑Too‑Large errors.
    
-   Share‑record crawls can be particularly API‑intensive in large orgs with complex sharing; you may reduce their frequency (for example, hourly → every 3 hours) if you need to reduce API usage, understanding that permission revocations may take longer to fully reflect in Glean.
    
-   For very large deployments, Glean recommends:
    
    -   Starting with a smaller set of core objects (Accounts, Contacts, Opportunities, Cases, Knowledge).
    -   Monitoring crawl durations and Salesforce API usage.
    -   Gradually enabling additional or custom objects and files once you’ve validated performance.

### Global crawler and indexing limits[​](#global-crawler-and-indexing-limits "Direct link to Global crawler and indexing limits")

The Salesforce connector is subject to Glean’s global crawler and indexing limits for all connectors:

-   **Per‑item size:** items larger than 64 MB are indexed by metadata only (no content extraction).
-   **Text extraction limit:** only the first ~16.875 MB of extracted text from an item is indexed; additional text is truncated.
-   OCR and some advanced extraction capabilities may be available for certain sources but do not change these limits.

These limits apply to Salesforce Files as well as extremely large text/json fields in records.

## API endpoints[​](#api-endpoints "Direct link to API endpoints")

| Purpose | Cloud Endpoint | HTTP Method | Authentication | Description |
| --- | --- | --- | --- | --- |
| /queryAll endpoint to get objects in a paginated manner | [/services/data/v62.0/queryAll](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_queryall.htm) | GET | Authorization: Bearer token | Glean uses the maximum allowed **page size 2k**. **Note:** Number of objects fetched in an API call may be lower than 2k depending on other parameters like request size |
| /sobjects to crawl all valid salesforce objects within salesforce instance | [/services/data/v62.0/sobjects](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_basic_info.htm) | GET | Authorization: Bearer token |  |
| fetch object descriptions for a given object | [/services/data/v62.0/sobjects/<objectName>/describe](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_describe.htm) | GET | Authorization: Bearer token | Object description consists of object metadata like fields, field labels, field types, etc |
| fetch the authorization\_code during integration user account authentication | [/services/oauth2/authorize](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_endpoints.htm&type=5) | GET |  | The authorization\_code is used to fetch the OAuth access token. **Note:** Only used during the setup of a new salesforce instance |
| fetch user metadata for the authenticated user | [/services/oauth2/userinfo](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_endpoints.htm&type=5) | GET |  | **Note:** Only used during the setup of a new salesforce instance |
| fetch the OAuth access token in exchange for authorization\_code fetched using the /services/oauth2/authorize endpoint | [/services/oauth2/token](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_endpoints.htm&type=5) | GET |  | **Note:** Only used during the setup of a new salesforce instance |

## Security, privacy, and data handling[​](#security-privacy-and-data-handling "Direct link to Security, privacy, and data handling")

### Data residency and storage[​](#data-residency-and-storage "Direct link to Data residency and storage")

Connector data, including Salesforce content and identity/permissions metadata, is stored in your Glean tenant, encrypted in transit and at rest.

Data does not leave your tenant environment for other customers; Glean’s multi‑tenant control plane handles orchestration and configuration metadata but not long‑term storage of your content.

### Handling sensitive Salesforce data[​](#handling-sensitive-salesforce-data "Direct link to Handling sensitive Salesforce data")

For customers with strict data‑governance requirements, recommended practices include:

-   Restricting indexing to a carefully chosen subset of objects and fields.
-   Excluding or red‑listing fields that contain highly sensitive information (e.g., PII, financial details) rather than relying solely on FLS.
-   Using Glean’s broader security & compliance and sensitive data tooling (e.g., Glean Protect) to monitor and manage risk across connectors, where applicable.
