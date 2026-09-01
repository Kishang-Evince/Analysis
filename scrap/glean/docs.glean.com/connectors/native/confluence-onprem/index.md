---
url: "https://docs.glean.com/connectors/native/confluence-onprem/"
canonical: "https://docs.glean.com/connectors/native/confluence-onprem/"
title: "Confluence Data Center"
description: "An overview of the Confluence Data Center (Confluence On-Prem) connector for Glean."
fetched_at: "2026-09-01T13:29:24.308Z"
---
On this page

The Glean connector for Confluence Data Center indexes Confluence pages, blog posts, attachments (metadata), footer comments, spaces, and related metadata from customer‑managed deployments, while mirroring source permissions.

## Key features[​](#key-features "Direct link to Key features")

-   Glean captures Confluence pages (including their hierarchical parent/child structure), blog posts, metadata attachments, comments, and more.
-   Glean respects all user access permissions, ensuring users only see search results for documents they can access. When a user clicks on a search result, they are taken to the Confluence web application, which enforces the permission.
-   The connector ensures comprehensive data coverage, including metadata, identity data, permissions data, and activity data. It provides near real-time synchronization for most content and permission changes, with the exception of comment additions or edits (see [Limitations](#limitations)), which are primarily indexed during full crawls.
-   All data is stored in the cloud project within the customer’s cloud account (Glean or customer hosted), ensuring no data leaves the customer’s environment.
-   Glean uses Atlassian's standard [REST API](https://developer.atlassian.com/server/confluence/rest/v900/intro/#confluence-server-rest-api) for Confluence to ingest all data.
-   **Near** realtime freshness via webhooks; the Glean plugin provides view activity signals that improve ranking.

## Versions supported[​](#versions-supported "Direct link to Versions supported")

-   Supports Confluence Data Center/Server versions 7.4 and above. You can use Applinks manifest `/rest/applinks/1.0/manifest` endpoint to get the version and other information related to the instance.
-   Glean also supports Confluence Cloud. For more information, see the [Confluence Cloud Connector](/connectors/native/confluence).

## Indexed content and data[​](#indexed-content-and-data "Direct link to Indexed content and data")

The Glean Confluence connector crawls three distinct types of data—Content, Identity, and Activity—to ensure a fast, comprehensive, and securely managed index.

### Content[​](#content "Direct link to Content")

-   Pages, blog posts, spaces, attachments (metadata), footer comments.
-   Blog posts have no hierarchy; crawled via standard content listing APIs.
-   Restricted pages can be indexed if the connector is granted access; permissions remain enforced in results.
-   Archived pages are not applicable for Confluence Data Center; archived spaces are crawled by default and are configurable.

### Activity data and webhooks[​](#activity-data-and-webhooks "Direct link to Activity data and webhooks")

-   Processes create, update, delete, move/restore, and permission change events for fast updates.
-   Plugin surfaces view activity to improve ranking signals.
-   Webhook for permission/restriction changes trickle down to sub documents of the document tree with a minimum delay of 20mins (our cache frequency).

### Identity data[​](#identity-data "Direct link to Identity data")

-   Crawls users, emails, groups, and memberships; visibility is limited to configured product access groups.
-   Known DC issue: group members API is unstable in some versions; plugin can serve group memberships as a workaround.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only footer comments are indexed (not inline). If indexing of inline comments is critical to your workflow, consider copying the content of important inline comments into a page comment to ensure it is indexed by Glean.
-   Confluence mutator crawls do not work.
-   Image attachment content isn’t indexed; attachment metadata is captured.
-   Blog posts have no hierarchy.
-   Content restrictions read API in Server/DC returns all restrictions in one response (no pagination).
-   Users listing API on Server can 5xx with invalid users; fix product access groups to resolve.
-   New or updated comments are primarily indexed during full crawls. They are not processed via webhooks or incremental crawls unless a change to the page content or permissions triggers a re-index of the entire page.

## Rate limits[​](#rate-limits "Direct link to Rate limits")

**Queries per Second (QPS)**: QPS depends on customer server capacity and is configurable; a common default is ~16 aggregate QPS (admin: 3, content: 7, identity: 6).

## Update frequency[​](#update-frequency "Direct link to Update frequency")

-   Identity: full every 10 minutes; no incremental.
-   Content (pages/blog posts): full every 7 days; incremental hourly (updates since start of day).
-   Space permissions: full every 3 hours.
-   Webhooks apply changes in near real time between scheduled crawls.

## How the crawl works[​](#how-the-crawl-works "Direct link to How the crawl works")

The crawler follows the traditional crawler strategy, including utilizing the API and the following ways to get and update data:

-   **Identity Crawl:** updating and adding of People data, including users, groups, and other information
-   **Webhooks:** are messages sent by the application to notify Glean of changes in real-time, and then Glean either initiates a crawl or picks up the change on the next crawl.
-   **Content Crawls:** Full crawls the entire defined scope of the application whereas incremental crawls only capture the changes from the previous full or incremental crawl.

## Required permissions[​](#required-permissions "Direct link to Required permissions")

The user setting up this connector must have administrator permissions. You can reach out to Glean Support for any network configuration requirements.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Perform the following steps to connect Confluence Dataa Center with Glean.

### 1\. Create a service account for Glean[​](#1-create-a-service-account-for-glean "Direct link to 1. Create a service account for Glean")

1.  Sign into Confluence as an admin.
2.  Go to **User Management**.
3.  Create a user with any name, email, and password.
4.  Click **Edit Groups**.
5.  Add the service account to **confluence-administrators**. Alternatively, ensure the user is a space administrator for all spaces that should be crawled.

### 2\. Provide basic information about your Confluence instance[​](#2-provide-basic-information-about-your-confluence-instance "Direct link to 2. Provide basic information about your Confluence instance")

1.  Enter the server's base URL in Glean setup page. For example, **[https://confluence.mydomain.com](https://confluence.mydomain.com)**.
2.  If a network proxy is used to route requests (contact Glean support to confirm if you are not sure about this), enter the Confluence Server Host or IP in the Server Host or Server IP input fields.
3.  In case there are multiple domains in your Confluence instance, enter all the URLs except the base URL in the Additional domains field. For multiple URLs use commas and no spaces to separate the URLs.
4.  Enter the product access group(s). This should be the group(s) containing all Confluence users. Often, this is **confluence-users**. For multiple groups use commas and no spaces to separate the group names.
5.  Enter the service account details created earlier into Glean.
6.  Enter the number of API calls per second supported by your Confluence instance.

### 3\. Configure Webhook / Plugin activity[​](#3-configure-webhook--plugin-activity "Direct link to 3. Configure Webhook / Plugin activity")

-   **Check** the *Admin-privileged service account* checkbox if the service account is a part of the **confluence-adminstrators** product access group. This will automate setting up the webhook and configuring the Glean plugin after installation.
-   **Install** the Glean activity plugin which is available on the [Atlassian Marketplace](https://marketplace.atlassian.com/apps/1228567/glean-activity-plugin-for-confluence-data-center-server?tab=installation&hosting=datacenter). The marketplace page will provide the installation instructions.

* * *

**Note:** The following sections can be skipped if the service account has admin privileges. If your service account does not have admin privileges, please navigate to your newly created instance in Admin Apps Setup page and follow the rest of the instructions from there.

* * *

#### 3a. Configuring the Glean activity plugin[​](#3a-configuring-the-glean-activity-plugin "Direct link to 3a. Configuring the Glean activity plugin")

1.  We need to configure the Glean activity plugin to send the events to the correct endpoint.
2.  Go to **Manage Apps** in Confluence Admin UI.
3.  Open the **glean\_search** app and click on Configure. ![Glean Search Configuration](/assets/images/confluence-data-center-connector-1-09923493ee300cd3014f3c4c485ec884.png)
4.  Copy the target URL from *Plugin Target URL* box shown on Glean UI. The URL must be a valid URL in the format: `https://tenant_id-be.glean.com/instance/CONFLUENCE_ABC1234/scio_event`. Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.
5.  Fill the Glean service account username in the *Service Account Username* field.
6.  Click Submit.
7.  The activity plugin should now be configured successfully.

#### 3b. Connect the webhook[​](#3b-connect-the-webhook "Direct link to 3b. Connect the webhook")

1.  Go to **General Configuration** in Confluence Admin UI.
2.  Click **Create webhook**.
3.  Configure as follows:

| Config | Value |
| --- | --- |
| **Name** | Glean Search |
| **URL** | Copy the URL from *Webhook URL* box |
| **Webhook Shared Secret** | Use any value. Enter it in Glean setup page and click Save! |
| **Events** | Select all |
| **Status** | active |

## API Endpoints[​](#api-endpoints "Direct link to API Endpoints")

| Purpose | DC Endpoint | DC Method | DC Permission |
| --- | --- | --- | --- |
| **List users** | search/user | GET | READ |
| **List groups** | group | GET | READ |
| **List group members** | group/%s/member | GET | READ |
| **List groups of user** | user/memberof | GET | READ |
| **Get current user** | N/A |  |  |
| **Get email of users** | user/non-system | GET | ADMIN |
| **List spaces** | space | GET | SPACE\_ADMIN |
| **CQL based list spaces** | search | GET | READ |
| **List pages in space** | space/%s/content/page | GET | READ |
| **List blogposts in space** | space/%s/content/blogpost | GET | READ |
| **Get space permissions** | spaces/spacepermissions.action | GET | Confluence Administrator |
| **List content** | content | GET | READ |
| **Get content** | content/%s | GET | READ |
| **CQL based list content** | content/search | GET | READ |
| **List children of page** | pages/%s/children | GET | READ |
| **Fetch applinks** | rest/applinks/1.0/listApplicationlinks | GET | Confluence Administrator |
| **Create webhook** | rest/api/webhooks | POST | Confluence Administrator |
| **Get content restrictions** | content/%s/restriction/byOperation/read | GET | READ |
| **Update content restriction** | N/A |  |  |
| **Configure plugin** | scio\_search/1.0/configure | POST |  |
| **Get installed plugin version** | scio\_search/1.0/version | GET |  |
| **Get space permissions via plugin** | scio\_search/1.0/space\_permissions | GET |  |

## Content configuration[​](#content-configuration "Direct link to Content configuration")

**Note:** If Inclusion (Green-Listing) options are enabled, only content from the Inclusion category will be indexed. If Exclusion (Red-Listing) options are enabled, all content in the exclusion category will be removed. If both rules are applied to the same content, then the content will NOT be indexed, as exclusion rules take priority.

The rules below should be used MINIMALLY to preserve the enterprise search experience, as most end-users expect to find all content. Most customers do not apply any rules or apply exclusion rules sparingly for sensitive folders. Exclusion rules are applied automatically after the next full crawl, which can vary by corpus size. If a recrawl is needed, please reach out to your Glean representative.

### Exclusion (Red-listing) options[​](#exclusion-red-listing-options "Direct link to Exclusion (Red-listing) options")

Glean provides several options for excluding content from the data crawl, which excludes data from search and chat results.

-   **Space:** Exclude certain Confluence spaces from being crawled by Glean by specifying space keys
-   **Pages with specific labels:** Exclude pages and blog posts with specific labels from being crawled by Glean
-   **Pages with content matching specific regex:** Exclude pages and blog posts with content matching specific regex from being crawled by Glean
-   **Creators:** Exclude content created by certain creators from being crawled by Glean.

### Inclusion (Green-listing) options[​](#inclusion-green-listing-options "Direct link to Inclusion (Green-listing) options")

Glean provides several options for including content from the data crawl, which includes data from search and chat results.

-   **Spaces:** Only allow Glean to crawl certain Confluence spaces. Glean will crawl all spaces except those in the Exclusion rules if no spaces are specified.

**Note:** Only content specified to be included items will show in search results, chat, or any other Glean applications. Unspecified content will not be included in search results, chat, or other Glean applications.
