---
url: "https://docs.glean.com/connectors/native/hubspot/about"
canonical: "https://docs.glean.com/connectors/native/hubspot/about"
title: "HubSpot overview"
description: "Learn what the Glean HubSpot connector indexes, how it enforces HubSpot permissions, and its current limitations."
fetched_at: "2026-09-01T13:29:32.531Z"
---
On this page

With the HubSpot Connector, Glean integrates with HubSpot CRM, allowing organizations to ingest, index, and search critical CRM data across multiple objects. The connector enhances enterprise productivity by making HubSpot CRM data accessible within Glean’s unified search environment, supporting both sales prospecting and customer service resolution use cases. All content permissions, identities, and metadata are included in the crawl, preserving data privacy and adhering to HubSpot's API security model.

To connect HubSpot to Glean, see [Setup](/connectors/native/hubspot/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The Glean HubSpot Connector is designed for comprehensive CRM data integration but is currently focused on core, standard objects. The connector fetches and maintains up-to-date CRM data using HubSpot’s REST API, supporting incremental updates and webhooks for real-time changes.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The connector indexes these standard HubSpot CRM objects:

-   Contacts
-   Companies
-   Deals
-   Tickets

### Indexed properties[​](#indexed-properties "Direct link to Indexed properties")

For each object, key standard properties are indexed. Examples:

| Object | Properties Indexed (Excerpt) |
| --- | --- |
| Contacts | Contact owner, Created by user ID, Updated by user ID, First/Last name, Email, Company, Status, Revenue, LinkedIn URL |
| Companies | Company owner, Name, Industry, Website, Last activity, Number of deals, Money raised, LinkedIn handle |
| Deals | Deal owner, Name, Stage, Pipeline, Amount, Priority, Reason (win/loss), Close date |
| Tickets | Ticket owner, Name, Status, Priority, Pipeline, Source, Resolution, Close date, Description |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   REST API ingestion for the four main objects (Contacts, Companies, Deals, Tickets)
-   Support for full and incremental crawls
-   Webhooks for create/update/delete/restore/association-changed events for real-time data sync
-   Schema crawl to dynamically handle custom and relabeled fields

## Limitations[​](#limitations "Direct link to Limitations")

-   The connector supports only standard objects and predefined properties initially.
-   Custom objects and Marketing Hub entities (e.g., Leads, Blogs, Emails) are not supported in the current release.
-   Fine-grained ticket read scopes and role-level permission syncs may have limitations due to HubSpot API constraints.
-   Associations are crawled, but not all are surfaced directly in search at this time.
-   The connector does not support embedding Glean inside the HubSpot UI.
-   Some API features (e.g., for advanced auditing or custom roles) may require future updates.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

### Data and metadata ingested[​](#data-and-metadata-ingested "Direct link to Data and metadata ingested")

-   The connector collects and indexes object data (Contacts, Companies, Deals, Tickets), identities (users), and selected properties/fields per object.
-   Metadata such as creation/update timestamps and object associations are included.

### Permission propagation logic[​](#permission-propagation-logic "Direct link to Permission propagation logic")

-   The connector uses HubSpot’s permissions API to fetch and enforce allowed users for each object at crawl time.
-   Original content- and object-level permissions are mapped into Glean’s permission model.

### Security and compliance notes[​](#security-and-compliance-notes "Direct link to Security and compliance notes")

-   Authentication relies on private app tokens, using required scopes for minimum access.
-   Webhook payloads are validated using the app’s Client Secret.
-   Only objects for which valid access is configured are indexed.
-   Sensitive credentials (Access Token, Client Secret) should be rotated according to organizational policy.

### Known security restrictions[​](#known-security-restrictions "Direct link to Known security restrictions")

-   Webhook setup is required to maintain real-time data sync; if webhooks are missing, changes may only sync on the next crawl.
-   All indexed content from HubSpot will be available according to permission mappings in Glean; ensure appropriate scoping in both platforms.

### Data privacy implications[​](#data-privacy-implications "Direct link to Data privacy implications")

-   Indexed CRM data becomes discoverable according to organizational and user-level permission boundaries configured during setup.

## See also[​](#see-also "Direct link to See also")

-   [HubSpot setup](/connectors/native/hubspot/setup)
