---
url: "https://docs.glean.com/connectors/native/looker/"
canonical: "https://docs.glean.com/connectors/native/looker/"
title: "Looker"
description: "This article provides comprehensive documentation for the Looker connector, detailing its supported features, requirements, configuration steps, and data handling. Use this guide to integrate Glean with Looker and understand the connector's capabilities and limitations."
fetched_at: "2026-09-01T13:29:34.388Z"
---
On this page

The Looker connector enables you to integrate Glean with your Looker instance, allowing you to search and discover metadata from Looks and Dashboards within your organization. The connector indexes Looker content metadata such as titles, descriptions, and folder names but does not ingest or expose the underlying data or models used in visualizations. All data is stored within your own Google Cloud Platform (GCP) project, ensuring that you retain full control and ownership over your Looker content.

## Supported Features and Limitations[​](#supported-features-and-limitations "Direct link to Supported Features and Limitations")

The Looker connector is designed to index and make searchable the metadata of Looks and Dashboards from your Looker environment. It enforces Looker’s native permissions, ensuring that users only see content they are authorized to access.

### Supported Objects/Entities[​](#supported-objectsentities "Direct link to Supported Objects/Entities")

| Object Type | Description |
| --- | --- |
| Looks | Metadata including title, description, and folder name |
| Dashboards | Metadata including title, description, folder name, and dashboard elements (title, description, notes, subtitles) |

### Supported API Endpoints/Features[​](#supported-api-endpointsfeatures "Direct link to Supported API Endpoints/Features")

-   /looks/search: Used to enumerate and fetch Looks metadata.
-   /dashboards/search: Used to enumerate and fetch Dashboards metadata.
-   /users: Used to fetch user identities for permission mapping.
-   Permissions endpoints: Used to determine access control for each content item.

### Limitations[​](#limitations "Direct link to Limitations")

-   Only Looker cloud (API v4.0) is supported and on-premises Looker is not currently supported.
-   The connector does not index or expose the underlying data or models used in Looks or Dashboards, only metadata is indexed.
-   Incremental and activity crawls are not supported and only full crawls are available due to API limitations.
-   No webhook support and Looker webhooks are not used by this connector.
-   Redlist/greenlist (content filtering) functionality is not available.
-   No support for custom objects or lookback period configuration.

### Crawling Strategy[​](#crawling-strategy "Direct link to Crawling Strategy")

| Crawl type | Full Crawl | Incremental Crawl | People Data | Activity | Update Rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Looks | Yes | No | Yes | No | On demand | No | Only metadata indexed |
| Dashboards | Yes | No | Yes | No | On demand | No | Only metadata indexed |

-   Full crawls are performed to index all Looks and Dashboards.
-   No incremental or activity crawls are available due to API constraints.
-   Permissions are fetched and enforced for each content item.

### Results Display[​](#results-display "Direct link to Results Display")

After connecting Looker, you can search for Looks and Dashboards by their metadata like title, description, folder name within Glean. Only content you have access to in Looker is visible in search results.

## Requirements[​](#requirements "Direct link to Requirements")

To use the Looker connector, you must meet certain technical, credential, and permission requirements. Setup must be performed by a Looker admin or a user with sufficient privileges.

### Technical Requirements[​](#technical-requirements "Direct link to Technical Requirements")

-   Looker cloud instance with API v4.0 enabled.
-   Google Cloud Platform (GCP) project for data storage.

### Credential Requirements[​](#credential-requirements "Direct link to Credential Requirements")

Looker API3 key (client ID and client secret) generated from a Looker admin account. The API3 key is used to authenticate and generate short-lived bearer tokens for API access.

### Permission Requirements[​](#permission-requirements "Direct link to Permission Requirements")

-   The connector requires a Looker admin account or a service account with permissions to generate API keys and access Looks and Dashboards.
-   The API key must have access to all content you wish to index.
-   Permissions are enforced at both the content (folder-level ACLs) and role (permission set/model set) levels.
-   Required Looker API scopes: `see_looks`, `see_user_dashboards`, `see_lookml_dashboards` as applicable.
-   The connector intersects content ACLs and role permissions to determine access for each user.

### Preliminary Source/System Setup[​](#preliminary-sourcesystem-setup "Direct link to Preliminary Source/System Setup")

-   A Looker admin must generate API3 credentials in the Looker admin console.
-   No additional app registration or API enablement is required beyond standard Looker API setup.

## Configuration and Setup Instructions[​](#configuration-and-setup-instructions "Direct link to Configuration and Setup Instructions")

You configure and manage the Looker connector primarily through the Glean Admin console. The following steps outline the process for connecting your Looker instance to Glean.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Access to a Looker admin account.
-   API3 credentials (client ID and client secret) generated in Looker.
-   Access to your organization’s GCP project for data storage.

### Step-by-Step Setup[​](#step-by-step-setup "Direct link to Step-by-Step Setup")

### Determining Looker instance name[​](#determining-looker-instance-name "Direct link to Determining Looker instance name")

The instance name is of the format `<instance-name>.looker.com`. Copy the entire `<instance-name>` including hyphens and other URL components like periods.

For example, if you access Looker at `acme.cloud.looker.com`, the instance name is `acme.cloud`.

### Generating Looker admin API credentials[​](#generating-looker-admin-api-credentials "Direct link to Generating Looker admin API credentials")

1.  As an admin, navigate to the **/admin/users** page on your Looker instance.
    
2.  Click **Edit** on the admin user for which you want to cerate or use the API key.
    
    ![](/img/admins-edit.png)
3.  Click **API Keys** → **Edit Keys**.
    
    ![](/img/api-key-edit.png)
4.  Click **Save**.
    

### Connecting Looker and Glean[​](#connecting-looker-and-glean "Direct link to Connecting Looker and Glean")

To connect the Looker connector and Glean, perform the following steps:

1.  As an admin, navigate to the Glean **Admin console**.
2.  Click **Add connector** and select Looker.
3.  In the **Setup** tab, add the required information gathered from the previous sections:

-   Connector name: keep the name so that the users understand that this connector is used for Glean.
-   Instance name
-   API Client ID
-   API Client Secret

4.  Click **Save**.

### Crawl Configuration Options[​](#crawl-configuration-options "Direct link to Crawl Configuration Options")

-   No support for redlist/greenlist or custom object selection.
-   No lookback period configuration; all available Looks and Dashboards are indexed.
-   No crawl frequency customization; full crawls are performed on demand or as scheduled by Glean.

### Permissions & Security[​](#permissions--security "Direct link to Permissions & Security")

**Data and Metadata Ingested:**

-   Only metadata from Looks and Dashboards (titles, descriptions, folder names, dashboard element text) is indexed.
-   No underlying data or models are ingested or exposed.

**Permission Propagation Logic:**

-   The connector enforces Looker’s native permissions by intersecting content ACLs and role permissions for each user.
-   Only content a user is authorized to access in Looker will be visible in Glean search.

**Security & Compliance Notes:**

-   All data is stored in your organization’s GCP project; Glean does not have access to your Looker data.
-   Authentication uses Looker API3 credentials and short-lived bearer tokens.
-   No data leaves your cloud environment.

**Known Security Restrictions:**

-   On-premises Looker is not supported.
-   All indexed content is subject to Looker’s permission model; unsupported configurations (such as multi-instance scenarios) are not available.

**Data Privacy Implications:**

-   The connector does not ingest or expose any sensitive data from Looker visualizations or models.
-   All indexed data remains within your organization’s GCP environment.

If you have issues or concerns, reach out to the [Glean support team](https://support.glean.com/hc/en-us/requests/new).
