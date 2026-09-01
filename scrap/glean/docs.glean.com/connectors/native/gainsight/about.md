---
url: "https://docs.glean.com/connectors/native/gainsight/about"
canonical: "https://docs.glean.com/connectors/native/gainsight/about"
title: "Gainsight overview"
description: "Learn what the Glean Gainsight connector indexes, how Gainsight content appears in Glean, and how crawling and permissions work."
fetched_at: "2026-09-01T13:29:26.754Z"
---
On this page

The Gainsight connector integrates Gainsight CS with Glean so customer‑facing teams can search Gainsight Company (Customer 360) data and use it as context in Glean Search and Glean. Glean indexes Gainsight Company records and related objects so you can use Gainsight data alongside information from other systems.

To connect Gainsight to Glean, see [Setup](/connectors/native/gainsight/setup).

## Overview[​](#overview "Direct link to Overview")

Gainsight CS helps teams manage the full customer lifecycle by centralizing:

-   Customer 360 data such as ARR, renewal dates, industry, lifecycle stages, and customer health‑related labels.
-   Success workflows and customer interactions (for example, CTAs, tasks, and timeline activities) managed inside Gainsight itself.

The Gainsight connector for Glean focuses on making Customer 360 account data easily searchable and usable in AI workflows. Connecting Gainsight to Glean helps CSMs, account teams, and leadership:

-   Get a single place to look up key account‑level metrics (ARR, employees, renewal dates, lifecycle status, parent accounts, and more).
-   Prepare for QBRs, renewals, and escalations with up‑to‑date Company context.
-   Build AI experiences and workflows that leverage Gainsight’s structured Company data alongside information from other systems.

## Usage in Glean[​](#usage-in-glean "Direct link to Usage in Glean")

### Glean Search[​](#glean-search "Direct link to Glean Search")

Gainsight Company records appear in Glean Search alongside content from other tools. Typical queries include:

**Customer 360 lookups**

-   “Show the Gainsight company record for Acme Corp.”
-   “What is the ARR, renewal date, and industry for Customer X?”

**Renewal and risk‑oriented views**

-   “Show customers with high ARR and upcoming renewals.”
-   “Which customers look at risk based on their lifecycle stage or status and renewal timing?”

**Portfolio and hierarchy views**

-   “Show companies associated with Parent Company Contoso Holdings and their key metrics.”
-   “Give an overview of child companies under Parent Company X, including ARR and renewal dates.”

### Glean[​](#glean "Direct link to Glean")

Glean can use indexed Gainsight Company data as context to answer questions such as:

-   “Summarize ARR, renewal date, industry, stage, status, and key details for Customer X.”
-   “Which customers appear risky based on their lifecycle stage or status and upcoming renewals?”
-   “Which of my key accounts renew in the next 60 days, and what is their ARR?”

Glean responses are grounded in the Company fields that Glean has indexed from Gainsight.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The current Gainsight connector supports the following from Gainsight:

| Object | Description | Indexed as documents? |
| --- | --- | --- |
| **Company** | Customer 360 account records with key business attributes and metrics | Yes |
| **CTA** | Call‑to‑tool records associated with customers and workflows | Yes |
| **Task** | Tasks associated with CTAs or accounts | Yes |
| **Relationship** | Relationship‑level records (for example, Relationship 360 entities) | Yes |
| **Activity (Timeline)** | Timeline activities and interactions linked to customers | Yes |

## What Glean indexes from Gainsight[​](#what-glean-indexes-from-gainsight "Direct link to What Glean indexes from Gainsight")

### Company[​](#company "Direct link to Company")

For each Gainsight Company, Glean fetches structured fields that support search, ranking, faceting, and display. The exact field set may evolve, but representative examples (drawn directly from the connector implementation) include:

-   **Identifiers and naming**
    -   Company ID (Gainsight `Gsid`)
    -   Company name
    -   Parent company name (if any)
-   **Business attributes**
    -   Industry
    -   ARR (annual recurring revenue)
    -   Employee count
-   **Lifecycle and status**
    -   Original contract date
    -   Renewal date
    -   Stage
    -   Status
-   **Timestamps**
    -   Created time
    -   Last modified time

### CTA[​](#cta "Direct link to CTA")

Glean indexes CTA records as standalone documents, including:

-   Identifiers and title
-   Associated company
-   Status and priority
-   Owner
-   Due date and other scheduling fields
-   Created and last modified time

### Task[​](#task "Direct link to Task")

Glean indexes Task records associated with CTAs or accounts, including:

-   Identifiers and title
-   Linked CTA
-   Status and type
-   Owner
-   Due date and completion timestamps
-   Created and last modified time

### Relationship[​](#relationship "Direct link to Relationship")

Glean indexes Relationship‑level records (Relationship 360 entities), including:

-   Identifiers and name
-   Associated company
-   Relationship type
-   Key business attributes (such as ARR, employees, industry)
-   Lifecycle fields (such as stage, status, renewal date)
-   Created and last modified time

### Activity (Timeline)[​](#activity-timeline "Direct link to Activity (Timeline)")

Glean indexes Timeline activities as documents, including:

-   Identifiers and title
-   Activity description
-   Associated company
-   Activity type (for example, meeting, call, update)
-   Activity date

## Permissions and visibility[​](#permissions-and-visibility "Direct link to Permissions and visibility")

-   The Gainsight connector uses a single machine‑to‑machine OAuth client and does not mirror Gainsight’s record‑level permission model.
    
-   All Gainsight documents indexed by this connector are visible to any Glean user who has access to the Gainsight connector in Glean.
    

## Crawling strategy and update behavior[​](#crawling-strategy-and-update-behavior "Direct link to Crawling strategy and update behavior")

The Gainsight connector runs scheduled full crawls to keep data in Glean up to date.

## API usage[​](#api-usage "Direct link to API usage")

| **Purpose** | **Endpoint** | **Method** | **Permission/Scope** |
| --- | --- | --- | --- |
| Company data | `/v1/data/objects/query/Company` | POST | Read Company data |
| CTA data | `/v2/cockpit/cta/list` | POST | Read CTA data |
| Task data | `/v2/cockpit/task/list/{CTA}` | GET | Read Task data |
| Relationship data | `/v1/data/objects/query/Relationship` | POST | Read Relationship data |
| Activity (Timeline) data | `/v1/data/objects/query/activity_timeline` | POST | Read Activity (Timeline) data |

## See also[​](#see-also "Direct link to See also")

-   [Gainsight setup](/connectors/native/gainsight/setup)
