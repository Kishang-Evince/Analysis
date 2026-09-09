---
url: "https://docs.glean.com/connectors/native/servicenow/about"
canonical: "https://docs.glean.com/connectors/native/servicenow/about"
title: "ServiceNow Connector Overview"
description: "Introduction"
fetched_at: "2026-09-01T13:29:40.107Z"
---
On this page

## Introduction[​](#introduction "Direct link to Introduction")

The ServiceNow connector for Glean allows Glean to fetch and index content from Knowledge Articles, Service Catalog items, News Articles (Content Publishing), ITSM incidents, Customer Service Cases, APM Business Applications, and SPM demands, Epics and Projects, ensuring that users can search for and access documents for which they have authorized permissions.

-   **Authentication**: is done by creating a dedicated user account with specified permissions and profiles
-   **API Usage**: Glean will use the [Table API](https://developer.servicenow.com/dev.do#!/reference/api/orlando/rest/c_TableAPI) and then [Scripted REST API](https://docs.servicenow.com/en-US/bundle/tokyo-application-development/page/integrate/custom-web-services/concept/c_CustomWebServices.html) for advanced user criteria
-   **Permissions Enforcement**: Glean respects all user access permissions, ensuring users only see search results for documents they have access to. When a user clicks on a search result, they are taken to the ServiceNow web application, which enforces the permission
-   **Data Storage**: All data is stored in the customer's project within the customer's cloud account, ensuring no data leaves the customer's environment

### Content Captured:[​](#content-captured "Direct link to Content Captured:")

For ServiceNow, Glean will capture the following content:

-   Knowledge Articles
-   Service Catalog (including Record Producers)

With additional permissions and configuration, Glean will capture the following content:

-   ITSM
-   CSM (Customer Service Cases)
-   APM
-   SPM
-   News Articles (Content Publishing)

### ServiceNow Permissions[​](#servicenow-permissions "Direct link to ServiceNow Permissions")

-   Admin access to setup the connector
-   Admin access for the Service Account is preferred (Custom role can be defined)

**Disclaimer:** Please be advised that Glean does not recommend utilizing a ServiceNow account associated with an employee. If the employee departs from the company or if the account becomes disabled, it will adversely affect access to connectors.

### Versions Supported[​](#versions-supported "Direct link to Versions Supported")

There are no specific version limitations of the ServiceNow connector.

### Objects Supported[​](#objects-supported "Direct link to Objects Supported")

#### Knowledge articles:[​](#knowledge-articles "Direct link to Knowledge articles:")

-   knowledge base
-   short description
-   workflow state
-   created by
-   description
-   knowledge base category
-   view count
-   custom fields (for knowledge articles created from custom templates)

#### Catalog items:[​](#catalog-items "Direct link to Catalog items:")

-   title
-   created by
-   short description
-   description
-   catalog category
-   sc\_catalogs

#### News Articles (Content Publishing):[​](#news-articles-content-publishing "Direct link to News Articles (Content Publishing):")

-   title
-   headline
-   subheadline
-   content
-   author
-   publish date
-   update date
-   category

#### Customer Service Cases (CSM):[​](#customer-service-cases-csm "Direct link to Customer Service Cases (CSM):")

-   case title (falls back to short description, then case number)
-   short description
-   description
-   comments and work notes
-   state
-   assigned to
-   opened by
-   closed by

#### ITSM:[​](#itsm "Direct link to ITSM:")

-   number
-   short description
-   description
-   comments and work notes
-   state
-   priority
-   impact
-   urgency
-   category
-   assigned to
-   opened by

#### Limitations:[​](#limitations "Direct link to Limitations:")

-   Glean does not index draft ServiceNow articles.
-   Glean does not index submitted Service Catalog variable answers from Request Items (RITMs) or Catalog Tasks (SCTASKs). Standard request and task fields such as number, short description, description, comments, and work notes are indexed, but answers users submit in the Variables section of the catalog form are not.

##### Permissions for ITSM, CSM, SPM, and APM Record Types[​](#permissions-for-itsm-csm-spm-and-apm-record-types "Direct link to Permissions for ITSM, CSM, SPM, and APM Record Types")

Glean uses a role-based permission model to control who can see the following ServiceNow record types in search results:

-   **ITSM**: Incidents, Requests, Request Items, Interactions
-   **CSM**: Customer Service Cases
-   **SPM**: Demands, Projects, Epics
-   **APM**: Business Applications

Access to these records is controlled in two ways:

1.  **By ServiceNow role** - Administrators configure which ServiceNow roles grant access to each record type. Each record type has its own role configuration. For example, users with the `itil` role can be granted access to all Incidents, while a different set of roles can be configured for Requests or Customer Service Cases. All users with a configured role will see all records of that type - access is not filtered per record.
    
2.  **By record assignment (ITSM only)** - For Incidents, Requests, Request Items, and Interactions, access can also be granted based on user fields on the record, such as the assigned user, the person who opened it, or the caller. This ensures that individuals directly involved with a record can always find it in Glean, even if they don't hold one of the configured roles.
    

###### Why this approach?[​](#why-this-approach "Direct link to Why this approach?")

ServiceNow does not expose per-record access control lists (ACLs) for these record types through its APIs. Knowledge Articles have explicit permission structures that Glean can replicate, but record types like Incidents rely on a combination of roles, assignment rules, business rules, and client-side scripting that cannot be fully queried externally. Glean uses the role and assignment-based model as a reliable way to approximate the access your users have in ServiceNow without risking over- or under-sharing.

Important

Because access is managed at the role level, a user with an allowed role will see all records of that type in Glean, not just records they can access in ServiceNow. Administrators should carefully select which roles to configure to align with their organization's access policies.

## Authentication Mechanism[​](#authentication-mechanism "Direct link to Authentication Mechanism")

### Connector credentials requirements[​](#connector-credentials-requirements "Direct link to Connector credentials requirements")

The Service connector for Glean requires specific permissions to function correctly.

-   Glean requires authentication by utilizing a dedicated Service Account and OAuth Application
-   Glean understands all user access permissions and strictly enforces them at the time of the query, ensuring that users cannot see results to which they do not have access.
-   It's important to note that all data is stored in the customer's project in the customer's cloud account, and no data leaves the customer's environment.
-   Glean only requires READ-level permissions.

| Role | Use Case |
| --- | --- |
| knowledge\_admin | Required to fetch Knowledge Articles. This role allows us to view all Knowledge Articles and Knowledge Bases in the global instance. |
| user\_criteria\_admin | Required to fetch user criteria. |
| user\_admin | Required to fetch ServiceNow users |
| catalog\_admin | Required to fetch Catalog items |
| web\_service\_admin | Required in advanced setup so that we can access the scripted API |
| snc\_read\_only | Effectively restricts the service account user to [readonly](https://www.servicenow.com/docs/bundle/zurich-platform-administration/page/administer/user-administration/concept/c_ReadOnlyRole.html) |
| snc\_internal | [Required to allow access to internal resources](https://www.servicenow.com/docs/bundle/zurich-platform-security/page/administer/contextual-security/concept/explicit-roles.html) |
| itil | Required to fetch ITSM Incidents |
| sn\_customerservice.customer\_service\_case | Required to fetch Customer Service Cases |
| sn\_apm.apm\_user | Required to fetch APM Business Applications |
| it\_project\_user | Required for SPM Projects |
| it\_demand\_user | Required for SPM Demands |
| scrum\_user | Required for SPM Epics |
| safe\_scrum\_user | Required for SPM Epics |
