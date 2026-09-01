---
url: "https://docs.glean.com/connectors/native/windchill/"
canonical: "https://docs.glean.com/connectors/native/windchill/"
title: "Windchill"
description: "Learn how the PTC Windchill connector works and how to configure it for Glean."
fetched_at: "2026-09-01T13:29:48.281Z"
---
On this page

PTC Windchill is a Product Lifecycle Management (PLM) platform used by engineering and manufacturing organizations to manage product data and processes across the full lifecycle, from design through manufacturing and beyond. The Glean connector indexes Windchill document objects so engineers can search and ask questions over engineering specifications, practices, and technical reports directly in Glean.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

### Objects crawled[​](#objects-crawled "Direct link to Objects crawled")

The PTC Windchill connector currently indexes Windchill document objects:

-   Object type: `WT.Document`
-   Primary content types:
    -   PDF documents
    -   DOCX documents

These documents are stored in Windchill as `WT.Document` objects and fetched via Windchill’s OData APIs.

For each `WT.Document`, Glean indexes:

-   Document metadata from the `DocMgmt/Documents` OData API, including for example:
    -   Document identity string (includes number and version)
    -   Name and number
    -   Object type (Document)
    -   Revision and version
    -   Lifecycle state (for example, In Work, Released)
    -   Created by / created on
    -   Modified by / last modified at
    -   Folder location and container/context (site/product/library)
-   Primary content metadata via the `PrimaryContent` block:
    -   File name
    -   MIME type (for example, `application/pdf`)
    -   File size
    -   Download URL used by the connector to fetch the body

The connector uses Windchill’s `RedirectDownload` endpoint to fetch the actual document body and stores it for indexing in Glean.

### Scope[​](#scope "Direct link to Scope")

The connector is scoped to specific instances, contexts, and classifications of `WT.Document` as defined in your deployment’s product requirements. Typical deployments include:

-   Documents with status = Released within those contexts
-   Only primary content is indexed where needed to stay within volume limits

## Use cases and example queries[​](#use-cases-and-example-queries "Direct link to Use cases and example queries")

Once Windchill is connected and full crawls have completed, engineers can use Glean Search and Glean to ask natural‑language questions or run keyword searches across released engineering practices, specifications, and technical reports stored as `WT.Document` objects. Results are permission‑aware and ranked alongside the rest of your enterprise content (for example, Drive, Confluence, Jira, Slack), subject to each user’s Windchill access.

Example use cases include:

-   **Find the “gold standard” specification for a component**
    
    Surface the authoritative, released engineering specification or practice that governs how a component should be designed, analyzed, or validated.
    
    Example queries:
    
    -   “Released engineering practice for gear train design torque limits”
    -   “Engineering specification for piston cooling for X‑series engines”
    -   “Design standard for gear material”
-   **Use Glean to navigate long engineering PDFs**
    
    Open a Windchill PDF or DOCX from Glean and use Glean (DocQA) to summarize and extract key details instead of manually scanning dozens of pages.
    
    Example prompts:
    
    -   “Summarize the key design constraints in this gear train specification.”
    -   “What failure modes are identified in this *test* technical report?”
    -   “Where in this document are test conditions and acceptance criteria described?”
-   **Research prior work and technical reports for a part or subsystem**
    
    Combine part numbers, component names, and keywords to find historical analysis, test reports, and related documentation for a given part or subsystem.
    
    Example queries:
    
    -   “Technical reports related to gear failures”
    -   “Technical reports mentioning part number 123456”
    -   “Engineering practices and reports for oil pan design”
-   **Support troubleshooting and field issues with authoritative docs**
    
    When investigating field problems, start from the relevant engineering practice or specification and related technical reports to understand known issues and recommended mitigations.
    
    Example queries:
    
    -   “Recommended mitigation steps for piston ring scuffing”
    -   “Engineering practice for diagnosing vibration issues in gear trains”
    -   “Reports discussing durability issues for \[engine family\] fuel system”
-   **Cross‑instance knowledge discovery (when multiple instances are in scope)**
    
    In deployments that index multiple Windchill instances or contexts, users can issue a single query in Glean and retrieve relevant documents across those sources, subject to their Windchill permissions.
    
    Example queries:
    
    -   “Global engineering standards for gears”
    -   “Engineering practices and technical reports related to cooling system cavitation”
    -   “Released specifications and reports for hospital‑generator gear train design”

## Limitations[​](#limitations "Direct link to Limitations")

-   Only `WT.Document` objects are crawled; Windchill parts, products, CAD models, and other object types are not indexed.
-   Windchill Notebook (personal files) is not indexed.
-   There is no Windchill REST API for document ACLs or incremental permission changes.
-   Deletions and permission removals are not processed immediately; they are only identified during full content crawls.
-   Webhooks are not supported.
-   Any objects or content not exposed via the `DocMgmt/Documents` OData API are not indexed.
-   No activity data is currently indexed; the connector only processes document metadata and content.

## Permissions and visibility[​](#permissions-and-visibility "Direct link to Permissions and visibility")

### Permission modeling[​](#permission-modeling "Direct link to Permission modeling")

Windchill’s REST/OData APIs do not expose document access control lists (ACLs) in a single, incremental feed that can be used directly for “admin‑only” crawling. Instead, the connector:

-   Authenticates to Windchill using the configured **service account**.
-   Uses Windchill’s OData and REST APIs to:
    -   Enumerate `WT.Document` objects in the configured scope (instances, containers, document type groups, lifecycle states, and classifications).
    -   Fetch identity and container information (for example, principals, groups, containers, and access‑control rules) where configured.
-   Uses this information as inputs for Glean’s own permission modeling so that document visibility in Glean reflects Windchill’s access controls as observed by the service account.

At query time, Glean enforces these permissions:

-   Users only see Windchill documents in Glean if they would be allowed to access those documents in Windchill, based on the ACLs modeled from the service account’s view of the system.
-   Documents that are out of scope for the connector (wrong instance/container, document type group, lifecycle state, or classification) are never indexed and therefore never shown.

### Permission changes and deletions[​](#permission-changes-and-deletions "Direct link to Permission changes and deletions")

Because Windchill’s APIs do not provide a reliable, incremental feed for permission removals or document deletions:

-   **Permission additions and new documents**
    
    -   When new documents are created or access is granted in Windchill, those changes are picked up when the connector next crawls the updated `WT.Document` items during a full content crawl.
-   **Permission removals and document deletions**
    
    -   There is no direct “this document was deleted” or “this user/group lost access” feed in the Windchill REST/OData APIs.
    -   The connector therefore relies on **periodic full content crawls** to reconcile:
        -   Documents that have been deleted.
        -   Documents that have become inaccessible under the current access‑control rules.

The effective freshness for permission and deletion changes is therefore tied to the **full‑crawl cadence** configured by Glean (for example, daily). This cadence can be tuned per customer to balance index freshness with load on the Windchill environment.

## Authentication and identity[​](#authentication-and-identity "Direct link to Authentication and identity")

### Service account Basic Authentication[​](#service-account-basic-authentication "Direct link to Service account Basic Authentication")

The PTC Windchill connector uses a **single service account** for all API calls:

-   In the Glean Admin Console, an admin enters a **Windchill service account username and password** during connector setup.
-   These credentials are stored securely in Glean’s secret store and are used for:
    -   Listing `WT.Document` objects and metadata via the `DocMgmt/Documents` OData API.
    -   Fetching primary content via the `wt.fv.master.RedirectDownload/redirectDownload` endpoint.
    -   Calling identity and access‑control related APIs where configured (for example, principals, groups, containers, and access control rules).

The service account must have sufficient privileges in Windchill to:

-   Reach the configured API base URL.
-   Read the `WT.Document` objects you intend to index (within the agreed‑upon scope: instances, containers, document type groups, lifecycle states, and security labels/classifications).

End users **do not** enter their own Windchill credentials into Glean for this connector; all Windchill traffic uses the configured service account.

### Identity data[​](#identity-data "Direct link to Identity data")

Windchill exposes identity and permissions‑related information via OData APIs such as:

-   `PrincipalMgmt/Principals` – principals (users and groups).
-   `PrincipalMgmt/Groups('<Id>')/Users` – group membership.
-   `DataAdmin/Containers` – container and context metadata.

Where enabled, the connector uses these APIs to:

-   Keep basic identity and container metadata in sync with Windchill.
-   Provide inputs to Glean’s permission modeling so that document visibility reflects Windchill’s access controls as seen by the service account.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

To use the PTC Windchill connector, you need:

-   A Windchill deployment (for example, Windchill PDMLink) with REST/OData services enabled for:
    -   `DocMgmt/Documents` (for `WT.Document` objects and metadata)
    -   `wt.fv.master.RedirectDownload/redirectDownload` for document content
    -   `PrincipalMgmt` endpoints if identity APIs are needed
-   Network connectivity from Glean to the Windchill instance:
    -   Customer Windchill environments are typically deployed in the customer’s VPC or on‑prem.
    -   A proxy or VPN tunnel between your environment and Glean is needed, using the same on‑prem networking pattern as other on‑prem connectors (Jira, GitHub, etc.).

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   A Windchill **service account** with:
    -   Permission to access the Windchill OData and REST APIs at the configured base URL.
    -   Read/download access to the `WT.Document` objects you intend to index (within the agreed‑upon scope: instances, containers, document type groups, lifecycle states, and security labels/classifications).

End users authenticate to Glean as usual; they do not enter Windchill passwords in Glean for this connector. A user will only see a Windchill document in Glean if Windchill’s access controls (as observed via the service account) allow that user to access it.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   In Windchill, user accounts must have at least read/download access to the `WT.Document` objects you intend to expose via Glean.
-   In typical deployments, Glean can further filter documents by:
    -   Context / Document Type Group (for example, engineering practices, technical reports, standards)
    -   Lifecycle state (for example, Released)
    -   Security labels and classifications (for example, excluding Restricted Confidential and specific government/security groups)

These filters are configured by Glean during implementation and are not currently self‑serve in the Admin console.

For on‑prem networking, your infrastructure or IT team must be able to:

-   Establish the VPN or proxy link between GCP (Glean) and your Windchill environment.
-   Whitelist relevant IPs and ports as part of the on‑prem networking setup.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

Setup typically involves coordination between your Glean representative, your IT/networking team, and your Windchill administrators.

1.  **Add the PTC Windchill connector in Glean**
    
    -   In the Glean Admin Console, go to **Connectors** and click **Add connector**.
    -   Select **Windchill**.
    -   Provide the Windchill base URL used for OData calls (for example, `https://<domain>/Windchill/servlet/odata/v6`).
2.  **Add service account credentials**
    
    -   In the Windchill connector setup screen, enter the **service account username** and **password**.
    -   This service account should have sufficient privileges to access the Windchill instance and all `WT.Document` objects in the scope you intend to crawl.
    -   Click **Save** to store these credentials in Glean.
3.  **Define scope and filters**  
    Work with your Glean representative to configure:
    
    -   Which instances and containers (sites, products, libraries) to include
    -   Which document type groups and security labels/classifications should be in scope
4.  **Save configuration**
    
    -   Click **Save** to persist the connector configuration.
    -   Once saved, Glean can start initial content crawls using the configured service account.

## Crawling strategy and update frequency[​](#crawling-strategy-and-update-frequency "Direct link to Crawling strategy and update frequency")

### Full content crawls[​](#full-content-crawls "Direct link to Full content crawls")

-   Discover all `WT.Document` items in scope for the configured service account.
-   Populate document metadata, permissions, and body content.

The full crawl cadence (for example, daily) is configured by Glean and can be tuned per customer to balance freshness and load.

### Paging and API efficiency[​](#paging-and-api-efficiency "Direct link to Paging and API efficiency")

To optimize the retrieval of large Windchill document sets, the connector utilizes the OData header for pagination.

-   Each request returns a maximum of 2,000 documents.
-   This 2,000-document limit is enforced by Windchill; the API will not exceed this threshold even if a higher limit is requested.

## FAQs[​](#faqs "Direct link to FAQs")

### Does the Windchill connector respect Windchill permissions?

Yes, within the constraints of Windchill’s APIs:

-   The connector authenticates to Windchill using a dedicated service account and uses Windchill’s OData and REST APIs to enumerate documents, principals, groups, containers, and access‑control rules.
-   Glean uses this information to model document‑level permissions so that users only see Windchill documents in Glean if Windchill’s access controls (as observed through the service account) allow them to access those documents.
-   Because there is no REST API for ACL removals or deletions, removals and deletions are reconciled during full content crawls, not instantly.

### What content types does the connector index?

The connector indexes:

-   Windchill document objects (`WT.Document`)
-   Primary content where the document is a PDF or DOCX, plus its metadata (number, name, revision, state, context, creator/modifier, etc.)

It does not index parts, product objects, CAD models, or personal Notebook files.

### How fresh is the data?

-   The connector currently relies on full content crawls rather than incremental content crawls for document bodies.
-   Updates (new documents, edits, permission changes, deletions) appear in Glean after the next full content crawl completes.
-   The full‑crawl cadence is controlled via internal configuration (crawl period in seconds) and can be tuned by Glean per customer.
