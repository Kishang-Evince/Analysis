---
url: "https://docs.glean.com/connectors/native/bamboohr/about"
canonical: "https://docs.glean.com/connectors/native/bamboohr/about"
title: "BambooHR overview"
description: "Learn which BambooHR employee fields the Glean BambooHR connector ingests, how it enforces API token permissions, and which data is excluded."
fetched_at: "2026-09-01T13:29:23.008Z"
---
On this page

BambooHR is an HR management platform for employee data. The BambooHR connector allows you to ingest people information from your BambooHR instance into Glean using the BambooHR API. Data integration is authenticated through an API token, and all information is stored in any platform where the project is hosted, ensuring no data leaves your environment. Sensitive data such as salary information is not ingested by the connector.

To connect BambooHR to Glean, see [Setup](/connectors/native/bamboohr/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The BambooHR connector is designed to ingest essential employee directory fields from BambooHR, while explicitly excluding sensitive or unnecessary data.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The connector ingests the following employee fields from BambooHR:

-   Employee name (first name, last name, and preferred name)
-   Email address
-   Status (active or inactive)
-   Job title
-   Department
-   Photo
-   Location
-   Hire date
-   Phone number
-   Supervisor/manager email

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   `/employees/directory`: Used to collect all user IDs.
-   `/employees/{id}`: Used to fetch full details for each employee.
-   Only the fields listed above are used to populate profile information in Glean.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Crawl type | Full Crawl | Incremental Crawl | People Data | Activity | Update Rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Employee Data | Yes | No | Yes | No | On demand | No | Uses `/employees/directory` and `/employees/{id}` endpoints |

The connector performs a full crawl of the employee directory using the BambooHR API. Incremental crawls and webhooks are not supported.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

### Data and metadata ingested[​](#data-and-metadata-ingested "Direct link to Data and metadata ingested")

-   Employee directory fields as listed above (name, email, status, job title, department, etc.)
-   No sensitive data (e.g., salary) is ingested

### Permission propagation logic[​](#permission-propagation-logic "Direct link to Permission propagation logic")

-   The connector enforces the permissions of the API token’s creating user. Only data accessible to that user is ingested.

### Security and compliance notes[​](#security-and-compliance-notes "Direct link to Security and compliance notes")

-   Authentication is through the API token and no OAuth or explicit scopes are supported.
-   The service account used for the API token can be restricted to only the necessary fields.

## See also[​](#see-also "Direct link to See also")

-   [BambooHR setup](/connectors/native/bamboohr/setup)
