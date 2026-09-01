---
url: "https://docs.glean.com/connectors/native/ironclad/about"
canonical: "https://docs.glean.com/connectors/native/ironclad/about"
title: "Ironclad overview"
description: "Learn what the Glean Ironclad connector indexes, how it supports contract search, and how permissions and crawling work."
fetched_at: "2026-09-01T13:29:33.108Z"
---
On this page

The Glean Ironclad connector indexes and searches core Ironclad CLM data directly within Glean, unifying workflows, executed contracts, and entities into a single, permission-aware experience for teams across legal, sales, finance, and compliance.

The connector indexes the following data and enforces Ironclad's permission model:

-   **Indexed objects:** Indexes Workflows, Records, and Entities from Ironclad, including core contract metadata (dates, counterparties, governing law, termination terms, status) and full document contents.
-   **Permission enforcement:** Enforces Ironclad’s own permissions model via OAuth, ensuring users only see contracts and workflows they can already access in Ironclad.
-   **Rich search scenarios:** Supports advanced contract Q&A and search scenarios, such as:
    -   "Do we have an NDA with Company X?"
    -   "Show all active agreements with termination for convenience and notice periods."
-   **Unified knowledge:** Indexes Ironclad CLM data into Glean so that teams can search and ask questions across contracts, workflows, and related business entities alongside the rest of their enterprise knowledge (docs, tickets, CRM, etc.).

For an overview of the Ironclad connector and its benefits, see the [Ironclad integration page](https://www.glean.com/connectors/ironclad).

To connect Ironclad to Glean, see [Setup](/connectors/native/ironclad/setup).

## Use cases[​](#use-cases "Direct link to Use cases")

Typical high-value use cases include:

-   **Targeted search:** Find specific contracts or workflows by name, counterparty, or metadata (e.g., "Master Services Agreement Acme 2023").
-   **Contextual Q&A:** Answer questions such as:
    -   "What are the key terms in the contract \[Contract Name\]?"
    -   "What is \[Company\] permitted or prohibited from doing under our contract?"
-   **Workflow integration:** Because results are permission-aware and deep link back to Ironclad, users can both understand contract context in Glean and quickly jump into Ironclad to review or take action.

## Supported objects and metadata[​](#supported-objects-and-metadata "Direct link to Supported objects and metadata")

### Workflows[​](#workflows "Direct link to Workflows")

A contract plus the approvals/signature process.

-   Owned by
-   Created on
-   Document
    -   Content
    -   Title
-   Counterparty Name
-   Counterparty Signer Name
-   Counterparty Signer Email
-   Stage
    -   Review
    -   Sign
    -   Completed
    -   Imported
-   Participants
-   Launch type
-   Participants
-   Additional information/notes
-   Additional documents

### Records[​](#records "Direct link to Records")

Completed/imported contracts (digital file + metadata)

-   Record type
-   Agreement date
-   Expiration date
-   Counterparty Name
-   Counterparty Signer Name
-   Counterparty Signer Email
-   Effective date
-   Status
    -   Active
    -   Inactive
-   Governing law
-   Termination for convenience
-   Termination Notice period
-   Prediction date
-   Document
    -   Content
    -   Title

### Entities[​](#entities "Direct link to Entities")

Business entities you work with (customers, partners, vendors)

-   Name
-   Relationship
-   Status = Active
-   Business type
-   Country

## Crawling strategy and update frequency[​](#crawling-strategy-and-update-frequency "Direct link to Crawling strategy and update frequency")

The Ironclad connector uses Glean’s standard crawl framework for the content crawls (workflows, records, entities). Currently, Ironclad only supports full crawls, which run once per day.

> The crawl frequency may change in future updates.

## Limitations[​](#limitations "Direct link to Limitations")

Incremental crawl is not supported.

## Permissions and scopes[​](#permissions-and-scopes "Direct link to Permissions and scopes")

The Ironclad connector utilizes a robust, two-layer OAuth strategy to ensure that Glean search results and AI answers accurately reflect the user's current permissions within Ironclad.

1.  **Admin OAuth configuration** (Ironclad OAuth app + client credentials).
2.  **Per‑user OAuth authorization** (each user grants Glean access to their Ironclad data).

**Important**: Permissions are persisted efficiently and enforced on every result. Users must complete the per-user OAuth authorization to view any Ironclad content (workflows, records, or entities) within Glean.

### Admin OAuth: connector‑level access[​](#admin-oauth-connectorlevel-access "Direct link to Admin OAuth: connector‑level access")

As an admin, you create a first-party OAuth client in Ironclad. You then configure the Ironclad connector in Glean by providing the following credentials:

-   Client ID
-   Client Secret

Additionally, specify the Ironclad Environment where your data is hosted (e.g., `na1`, `eu1`, or `demo`). This Environment is predetermined by your Ironclad setup and directs Glean to the correct API domain.

Glean uses this access to:

-   Discover schemas (record types, entity schemas, workflow fields, etc.).
-   Crawl content and metadata across:
    -   Records
    -   Workflows
    -   Entities
-   Read user and schema information via SCIM for permission mapping and identity resolution.

#### Required scopes[​](#required-scopes "Direct link to Required scopes")

When registering the OAuth app in Ironclad, you must grant read‑only scopes that let Glean read the objects it indexes while avoiding overly broad privileges. The required scopes are:

-   `public.records.readRecords`: read contract records and their metadata.
-   `public.records.readSchemas`: read schemas for records so Glean understands available fields and types.
-   `public.records.readAttachments`: read the actual contract documents attached to records.
-   `public.workflows.readWorkflows`: read workflows (in‑flight and completed), including metadata.
-   `public.workflows.readDocuments`: read documents attached to workflows.
-   `public.entities.readEntities`: read entities (customers, vendors, etc.).
-   `public.entities.readRelationshipTypes`: understand entity relationship types for better search/filtering.
-   `scim.users.readUsers`: read user information to map identities and enforce permissions.
-   `scim.schemas.readSchemas`: read SCIM schemas to interpret user data correctly.

All of these are read‑only and scoped to the Ironclad tenant where you register the OAuth app, minimizing risk while enabling accurate indexing and permission mapping.

### Per‑user OAuth: user‑level access[​](#peruser-oauth-userlevel-access "Direct link to Per‑user OAuth: user‑level access")

On top of admin configuration, each Ironclad user authorizes Glean via OAuth:

-   Glean prompts relevant users (based on your rollout plan) to connect their Ironclad account.
-   Once connected, search results and AI answers in Glean mirror that user’s Ironclad access, ensuring proper permission fidelity.

This model guarantees:

-   Users see only the workflows, records, and entities they could already see in Ironclad.
-   If access changes in Ironclad (e.g., a user loses access to a record), Glean’s enforcement ensures they no longer see that content in Glean after the relevant refresh.

## See also[​](#see-also "Direct link to See also")

-   [Ironclad setup](/connectors/native/ironclad/setup)
-   [Ironclad troubleshooting](/connectors/native/ironclad/troubleshooting)
