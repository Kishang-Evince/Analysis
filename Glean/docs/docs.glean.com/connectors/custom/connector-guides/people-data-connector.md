---
url: "https://docs.glean.com/connectors/custom/connector-guides/people-data-connector"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/people-data-connector"
title: "People Data Connector"
description: "How the People Data Connector combines Workday and Rippling employee records in Glean People."
fetched_at: "2026-10-13T08:49:42.071Z"
---
On this page

The People Data Connector is a Glean-managed custom integration for organizations that store employee data in Workday, Rippling, or both. It combines records from either or both systems and sends the resulting employee directory to Glean People.

This integration is separate from the native people connectors available during standard workspace setup.

note

The Glean team sets up the People Data Connector. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

You must enable at least one supported source. Before contacting Glean Support, prepare the requirements for each source you want to use:

-   **Rippling**: an API key with the `workers.read` scope and HTTPS access to the Rippling API.
-   **Workday**: an OAuth 2.0 application with worker read access, a client ID, client secret, refresh token, and the address of your Workday workers API.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes employee records from Rippling, Workday, or both. Supported employee information includes names, email addresses, titles, departments, managers, employment status, start and end dates, teams, and business units when the source provides these fields.

The connector uses email addresses to identify and merge employees. It does not index records without an email address.

The connector does not index documents, connector-specific users, or groups.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

This connector does not index documents or document permissions and does not set `allow_anonymous_access`. It sends employee records to Glean People rather than creating searchable documents in a custom connector.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

On each crawl, the connector retrieves the full employee list from every enabled source. When both sources contain the same email address, a configured primary source provides the base record and the other source fills fields that are empty.

A full sync replaces the employee data from the connector and removes records that the enabled sources no longer return. An incremental sync adds or updates employee records without removing missing records.

The Glean team configures the crawl schedule and source priority for your deployment.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with these prerequisites to begin setting up the People Data Connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Select a people connector](/get-started/setup/sync-people-data): how people data supports profiles, permissions, and personalization.
-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
