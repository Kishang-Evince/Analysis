---
url: "https://docs.glean.com/connectors/native/egnyte/overview"
canonical: "https://docs.glean.com/connectors/native/egnyte/overview"
title: "Egnyte overview"
description: "Egnyte is a cloud-based content platform that helps organizations manage, secure, and govern their cloud files. The Egnyte connector enables Glean to index files and folders from a customer’s Egnyte instance, enforcing Egnyte's native user permissions so content remains discoverable only by authorized users. The integration uses Egnyte’s REST APIs and is configured and managed from within Glean's deployment console."
fetched_at: "2026-09-01T13:29:26.218Z"
---
On this page

Egnyte is a cloud-based content platform that helps organizations manage, secure, and govern their cloud files. The Egnyte connector enables Glean to index files and folders from a customer’s Egnyte instance, enforcing Egnyte's native user permissions so content remains discoverable only by authorized users. The integration uses Egnyte’s REST APIs and is configured and managed from within Glean's deployment console.

## Supported features[​](#supported-features "Direct link to Supported features")

Glean’s Egnyte connector is designed to index, enforce permissions for, and provide search experiences over core Egnyte content. The following sections outline the connector’s capabilities and current constraints.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

-   Files
-   Folders

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   File System API: Used for initial and periodic crawling of file and folder content.
-   User Management API: Pulls the list of users with access to the Egnyte environment.
-   Group Management API: Retrieves user groups for accurate permission enforcement.
-   Audit Reporting API: Optionally ingests document access audit data.

## Limitations[​](#limitations "Direct link to Limitations")

-   Descriptions and comments added to files within the Egnyte web UI are not indexed; these are unavailable through Egnyte’s API.
-   Link sharing is unsupported. Due to Egnyte’s complex sharing models, content shared via links is excluded from Glean search for those with access only by link.
-   Only a single Egnyte domain/instance can be connected per Glean environment at this time.
-   Webhook registration may require manual intervention in some environments.
-   Crawling speed is impacted by Egnyte API rate limits. For large document sets, initial or full recrawls may take a substantial amount of time. To improve throughput, you can authorize multiple admin accounts so Glean distributes crawl traffic across tokens. See [Authorize additional admin accounts](/connectors/native/egnyte/setup#authorize-additional-admin-accounts).

## Requirements[​](#requirements "Direct link to Requirements")

Several prerequisites and configuration steps must be completed prior to using the connector. These ensure secure connectivity and accurate permission enforcement.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   Access to Glean’s deployment console within the customer’s GCP project.
-   An active Egnyte enterprise account with administrative privileges.
-   Sufficient API quota on Egnyte for expected crawl volume and frequency (roughly 2 QPS by default, can be increased by requesting with Egnyte support).

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   At least one Egnyte administrator account is needed to authorize the connector. You can authorize additional admin accounts to increase crawl throughput.
-   OAuth 2.0 is used for secure authentication between Glean and Egnyte.
-   During setup, admins must initiate an OAuth authorization flow from Glean's deployment console.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The Egnyte admin role is required for initial setup to grant connector permissions and obtain OAuth tokens.
-   Glean enforces Egnyte user and group-level access controls at query time, ensuring users see only what they are permitted to see in Egnyte.
