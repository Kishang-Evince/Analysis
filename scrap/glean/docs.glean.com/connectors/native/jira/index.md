---
url: "https://docs.glean.com/connectors/native/jira/"
canonical: "https://docs.glean.com/connectors/native/jira/"
title: "Jira Cloud"
description: "An overview of the Jira connector for Glean."
fetched_at: "2026-09-01T13:29:33.521Z"
---
On this page

note

This page is for the Jira Cloud connector. For the Jira Data Center (Jira On-Prem) connector, see the [Jira Data Center Connector page](/connectors/native/jira-onprem).

## Introduction[​](#introduction "Direct link to Introduction")

The Jira connector for Glean allows Glean to fetch and index content from Jira, ensuring users can search and access documents with authorized permissions.

-   **Authentication**: Glean requires the Jira admin to authenticate to Glean when setting up the Glean crawler app in the Atlassian marketplace.
    
-   **Data storage**: All data is stored in the cloud project within the customer's cloud account, ensuring no data leaves the customer's environment
    

**API usage**

-   **Standard API**: Glean uses Atlassian's standard API for Jira to ingest all data

**Integration features**

-   **Content captured**: Glean captures Jira projects, service management, dashboards, and more.
    
-   **Permissions enforcement**: Glean respects all user access permissions, ensuring users only see search results for documents they can access. When a user clicks on a search result, they are taken to the Jira web application, which enforces the permission.
    

## Versions supported[​](#versions-supported "Direct link to Versions supported")

The Jira Cloud connector has no specific version limitations. Jira Cloud is Atlassian's SaaS offering. Glean also supports Jira Data Center, a customer-managed deployment with a different connector and separate documentation.

## Objects supported[​](#objects-supported "Direct link to Objects supported")

The Jira connector supports the following objects:

-   Projects
-   Issues
-   Comments
-   Dashboards
-   Filters

## Authentication mechanism[​](#authentication-mechanism "Direct link to Authentication mechanism")

The Jira/Confluence admin will install an app whose installation URL will be present on the Glean setup page. That will be used for indexing the content, and for webhooks.

## Connector credentials requirements[​](#connector-credentials-requirements "Direct link to Connector credentials requirements")

The Jira connector for Glean requires specific permissions to function correctly.

-   Glean requires authentication to the Jira instance to fetch relevant information.
    
-   Glean understands all user access permissions and strictly enforces them at the time of the query, ensuring that users cannot see results to which they do not have access.
    
-   It's important to note that all data is stored in the cloud project in the customer's cloud account and no data leaves the customer's environment.
    
-   Glean only requires READ-level permissions. Application vendors may not provide granularity in their permission schemes for read-only access as observed by Atlassian for the listing group permissions and issue security.
    

## Connect to Jira Cloud[​](#connect-to-jira-cloud "Direct link to Connect to Jira Cloud")

### 1\. Set up the basics[​](#1-set-up-the-basics "Direct link to 1. Set up the basics")

1.  Sign in to Jira as an admin. Copy your Atlassian domain from the URL bar and paste into Glean:  
    [https://YourAtlassianDomain.atlassian.net](https://YourAtlassianDomain.atlassian.net)
    
2.  Go to [https://admin.atlassian.com/](https://admin.atlassian.com/)
    
3.  Click the 3 dots belonging to the organization matching your Atlassian domain from step 1, then click on Manage product access
    
4.  Click on Manage access for the Jira Software Product
    
5.  Enter the default groups (there might be only one) as a comma-separated list in Glean. Only users in the provided product access groups will be able to see results in Glean.
    
6.  Click Create Forge Crawler App in Glean. This should create an installation link for the Glean crawler app.
    

### 2\. Connect the Forge Crawler app[​](#2-connect-the-forge-crawler-app "Direct link to 2. Connect the Forge Crawler app")

1.  As a Jira admin, open the Forge Crawler app installation link from the Glean setup page.
    
2.  Click on Get app and install the app in the correct Jira instance.
    
3.  After the app installation is successful, click Save in Glean. You're all set!
    

## Authentication scope requirements[​](#authentication-scope-requirements "Direct link to Authentication scope requirements")

Glean requires read-only scope.

## Items crawled[​](#items-crawled "Direct link to Items crawled")

### Content indexed[​](#content-indexed "Direct link to Content indexed")

-   Projects
-   Issues
-   Comments
-   Dashboards
-   Filters

### Custom fields[​](#custom-fields "Direct link to Custom fields")

Glean handles Jira custom fields in three separate ways. Knowing which one you need makes it easier to get a field into the right place:

-   **Keyword search**: the field's text becomes part of what Search matches on.
-   **Facets and filters**: the field becomes a filter in Search.
-   **Glean Assistant and agents**: the field's value is passed to Assistant and agents.

Supported field types can be indexed automatically for search and/or facets, depending on the field type. Passing a value to Assistant and agents requires greenlisting.

| Field | Keyword search | Facets / filters | Assistant & agents |
| --- | --- | --- | --- |
| Text (string) | Automatic | Automatic | When greenlisted |
| Single-select (option) | No | Automatic | When greenlisted |
| User | No | Automatic | When greenlisted |
| Date | No | Automatic | When greenlisted |
| Date-time | No | Automatic | When greenlisted |
| Number | No | Automatic | When greenlisted |
| Array of text (labels, multi-select) | Automatic | Automatic | When greenlisted |
| Array of objects (Assets or CMDB) | No | No | When greenlisted (raw value only) |
| JSON | No | No | When greenlisted (raw value only) |

Array-of-text and array-of-object fields share the same underlying `array` type in Jira; Glean distinguishes them by whether the values are plain text, so an array of objects is not faceted even though it is technically an array.

**Greenlisting (for Glean Assistant and agents).** Faceting makes a field filterable, but it does not pass the field's value to Assistant and agents. To do that, greenlist the field:

1.  Go to **Admin console → Connectors → Jira → Manage data**.
2.  Under **Inclusion rules**, add the field ID to **Custom fields to be included** (numeric IDs, comma-separated, for example `12345,67890`).
3.  Save and trigger a re-crawl.

To greenlist every custom field at once, turn on **Index Jira issue custom fields for assistant** under **Additional rules** (off by default). To exclude specific fields, add their IDs under **Exclusion rules**.

**Finding a field's ID and type.** To find the field ID, check **Jira Project Settings → Fields**, or read it from the `customfield_<ID>` key in the issue REST response. To find the type, call the Jira REST API for an issue with `?expand=schema` and read `schema.customfield_<ID>.type` (for example `string`, `option`, `array`). The `type` value tells you which row of the table above applies.

note

Object fields and arrays of objects, such as Assets or CMDB fields and the Sprint field, have limited support. Glean does not add them as facets. If you greenlist one, Glean stores its raw value only, so it will not appear as a clean filter. For these fields, greenlist the field ID to make the value available, and contact [Glean Support](https://support.glean.com) with the field IDs and types if you need more than the raw value.

### Identity[​](#identity "Direct link to Identity")

-   **Users**: Information about users in Jira
    
-   **Groups**: Details about groups in Jira at the global, project, and issue level
    
-   **Memberships**: Information about group memberships at global and project level, indicating which users belong to which groups.
    

The identity crawl operates with the following configurations:

-   **Incremental identity crawls**: These are performed to capture changes since the last crawl.
    
-   **Full identity crawls**: These are conducted periodically to ensure all identity data is up-to-date.
    

### Activity[​](#activity "Direct link to Activity")

-   **Adds**: New issues, projects, files, or folders added
    
-   **Updates**: Modifications made to existing issues, projects, files, or folders.
    
-   **Permissions changes**: Changes in issues, projects, files, or folders sharing permissions.
    
-   **Deletions**: Issues, projects, files, or folders that have been deleted.
    
-   **View activity**: Events indicating when issues, projects, files, or folders have been viewed.
    

The Glean Activity plugin for Jira helps Glean to provide highly personalized search results for the users. By sending webhook events to Glean each time a user views an issue in Jira, the plugin enables the Glean instance to gather valuable information that is crucial to delivering an outstanding search experience. This information is stored securely in your dedicated cloud project, ensuring complete privacy and protection of your data.

### Rate limits[​](#rate-limits "Direct link to Rate limits")

-   **Queries per second (QPS)**: The default rate limit is set to 12 queries.

### Update frequency[​](#update-frequency "Direct link to Update frequency")

Content updates for the Jira connector in Glean can happen quite rapidly, depending on the type of update and the configuration settings. Here are the key areas:

-   **Activity reports**: Adds, updates, and permissions changes are crawled every 10 minutes. This means that any new files, modifications to existing files, or changes in sharing permissions are detected and processed quickly.
    
-   **People / identity crawls**: Changes to group memberships are picked up by the identity crawl, which runs every hour. This ensures that updates to user groups and their permissions are reflected promptly.
    
-   **Incremental crawls** occur every 3 hours to provide additional reliability beyond the minute-by-minute activity reports.
    
-   **Full crawls**: The frequency of full crawls can be configured, but they are generally less frequent than incremental crawls at 28 days
    

Changes in data must be crawled, processed, and indexed before the data is reflected in the UI. Actual time may vary depending on the number of changes and corpus size. For the most up-to-date crawler refresh information, please refer to [Crawling frequency](/connectors/crawling-refresh-rates)

### How the crawl works[​](#how-the-crawl-works "Direct link to How the crawl works")

The Jira crawler follows the traditional crawler strategy, including utilizing the Jira API and the following ways to get and update data:

-   **Identity crawl:** updating and adding of People data, including users, groups, and other information
    
-   **Activity crawl:** Adds, updates, and permissions changes to content
    
-   **Webhooks:** are messages sent by the application to notify Glean of changes in real-time, and then Glean either initiates a crawl or picks up the change on the next crawl
    
-   **Content crawls:** Full crawls capture the entire defined scope of the application, whereas incremental crawls only capture the changes from the previous full or incremental crawl
    

### Known limitations in crawl[​](#known-limitations-in-crawl "Direct link to Known limitations in crawl")

-   The crawl speed can be affected by the rate limits imposed by the Jira API
    
-   The Glean Jira connector cannot read restricted pages unless the admin grants access to the Glean app for those pages. This means that restricted pages will not be indexed or searchable by default.
    

## API endpoints[​](#api-endpoints "Direct link to API endpoints")

| Purpose | Cloud Endpoint | Cloud level Permission | OAuth 2.0 scopes required & recommended | Connect app scope required | Description |
| --- | --- | --- | --- | --- | --- |
| Get all dashboards | [dashboard](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-dashboards/#api-rest-api-2-dashboard-get) | None | Classic: read:jira-work | READ | Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or owned dashboards |
| Get dashboard | [dashboard/%s](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-dashboards/#api-rest-api-2-dashboard-id-get) | None | Classic: read:jira-work | READ | Returns a dashboard for the user |
| Get users from group | [group/member](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-groups/#api-rest-api-2-group-member-get) | Browse users and groups [global permission](https://confluence.atlassian.com/x/x4dKLg) or Administer Jira [global permission](https://confluence.atlassian.com/x/x4dKLg) | Classic: manage:jira-configuration | ADMIN | Returns a paginated list of all users in a group |
| Find groups | [groups/picker](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-groups/#api-rest-api-2-groups-picker-get) | Browse projects [project permission](https://confluence.atlassian.com/x/yodKLg) | Classic: read:jira-user | READ | Returns a list of groups whose names contain a query string |
| Get issue | [issue/%s](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-rest-api-2-issue-issueidorkey-get) | Browse projects [project permission](https://confluence.atlassian.com/x/yodKLg) | Classic: read:jira-work | READ | Returns the details for an issue |
| Get issue security level members | [issue security schemes/%s/members](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-security-level/#api-rest-api-2-issuesecurityschemes-issuesecurityschemeid-members-get) | Administer Jira [global permission](https://confluence.atlassian.com/x/x4dKLg). | Classic: manage:jira-configuration | ADMIN | Returns issue security level members: identifying which users, groups, or roles have access to issues under specific security levels within classic projects |
| Get project | [project/%s](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-projects/#api-rest-api-2-project-projectidorkey-get) | Browse projects [project permission](https://confluence.atlassian.com/x/yodKLg) | Classic: read:jira-work | READ | Returns the project details for a project. |
| Get project issue security scheme | [project/%s/issuesecuritylevelscheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-permission-schemes/#api-rest-api-3-project-projectkeyorid-issuesecuritylevelscheme-get) | Administer Jira [global permission](https://confluence.atlassian.com/x/x4dKLg) or the Administer Projects [project permission](https://confluence.atlassian.com/x/yodKLg). | Classic: manage:jira-configuration | READ | allows you to understand the security configurations governing issue visibility within that project |
| Get assigned permission scheme | [project/%s/permissionscheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-permission-schemes/#api-rest-api-3-project-projectkeyorid-permissionscheme-get) | Administer Jira [global permission](https://confluence.atlassian.com/x/x4dKLg) or Administer projects [project permission](https://confluence.atlassian.com/x/yodKLg). | Classic: read:jira-work | READ | permissions granted to users and groups within a project, determining their capabilities such as issue creation, editing, or project administration |
| Get project role for project | [project/%s/role/%s](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-roles/#api-rest-api-3-project-projectidorkey-role-id-get) | Administer Projects [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or Administer Jira [global permission](https://confluence.atlassian.com/x/x4dKLg). | Classic: read:jira-work | READ | retrieves detailed information about a particular project role within a specified project. This includes the role's description and the list of users and groups assigned to that role, known as "actors." |
| Search for issues using JQL | [search](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search#api-rest-api-3-search-get) | Browse projects [project permission](https://confluence.atlassian.com/x/yodKLg) | Classic: read:jira-work | READ | Searches for issues using JQL |
| Get request types | [servicedesk/projectKey:%s/requesttype](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-requesttype-get) | Permission to access the service desk | Classic: read:servicedesk-request | READ | Returns all customer request types from a service desk |
| Get request type fields | [servicedesk/projectKey:%s/requesttype/field](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-requesttype-requesttypeid-field-get) | Permission to access the service desk | Classic: read:servicedesk-request | READ | returns the fields for a service desk's customer request type |
| Get project form index | [/project/projectKey:%s/form](https://developer.atlassian.com/cloud/forms/rest/api-group-forms-on-project/#api-project-projectidorkey-form-get) | Permission to access the project | Classic: read:jira-work | READ | Returns all the forms associated with the project |
| Get form template | [/project/projectKey:%s/form/formId%s](https://developer.atlassian.com/cloud/forms/rest/api-group-forms-on-project/#api-project-projectidorkey-form-formid-get) | Permission to access the project | Classic: read:jira-work | READ | Returns the template aka schema of the form |
| Search for filters | [filter/search](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-filters/#api-rest-api-2-filter-search-get) | None | Classic: read:jira-work | READ | Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of filters |
| Get filter | [filter/%s](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-filters/#api-rest-api-2-filter-id-get) | None | Classic: read:jira-work | READ | Returns a filter |
| List projects | [project/search](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-projects/#api-rest-api-2-project-search-get) | Browse Projects [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. Administer Projects [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. Administer Jira [global permission](https://confluence.atlassian.com/x/x4dKLg). | Classic: read:jira-work | READ | Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of projects visible to the user |
| Access email addresses | [user/email/bulk](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-users/#api-rest-api-2-user-email-bulk-get) | N/A | read:email-address:jira | ACCESS\_EMAIL\_ADDRESSES | Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is only available to apps approved by Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603). For Forge apps, this API only supports access via asApp() requests. |
| Get user groups | [user/groups](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-users/#api-rest-api-2-user-groups-get) | N/A | Classic: read:jira-user | READ | Returns the groups to which a user belongs |
| Register a webhook | [Register Dynamic webhooks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-post) | Only [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation | Classic: read:jira-work, manage:jira-webhook | READ | Registers webhooks |

## Content configuration[​](#content-configuration "Direct link to Content configuration")

note

If inclusion (greenlisting) options are enabled, only content from the inclusion category will be indexed. If exclusion (redlisting) options are enabled, all content in the exclusion category will be removed. If both rules are applied to the same content, then the content will **not** be indexed (exclusion rules take priority).

The rules below should be used MINIMALLY to preserve the enterprise search experience, as most end-users expect to find all content. Most customers do not apply any rules or apply exclusion rules sparingly for sensitive folders.

There may be a delay before the system fully reflects these changes. Furthermore, customers can hide the relevant documents if access has been inadvertently granted to an individual. For detailed guidance on using the "Hide" functionality via CSV upload, please refer to [How to Hide Documents via CSV Upload](/administration/search/hiding-content) article.

### Exclusion (redlisting) options[​](#exclusion-redlisting-options "Direct link to Exclusion (redlisting) options")

By entering specific project keys in the box within the UI, the specified projects will be excluded from being crawled and indexed by Glean.

note

When you redlist a project, Glean hides that project's content immediately. The connector will also stop crawling the project and remove already indexed content as crawls run.

### Inclusion (greenlisting) options[​](#inclusion-greenlisting-options "Direct link to Inclusion (greenlisting) options")

By entering specific project keys in the box within the UI, only the specified projects will be crawled and indexed by Glean.

note

When you greenlist a project, Glean starts a point crawl for that project to index it as soon as possible.
