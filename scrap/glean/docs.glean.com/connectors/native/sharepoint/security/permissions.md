---
url: "https://docs.glean.com/connectors/native/sharepoint/security/permissions"
canonical: "https://docs.glean.com/connectors/native/sharepoint/security/permissions"
title: "Connector permissions"
description: "This document details the permission scopes required to fetch content from your company's SharePoint environment using the Microsoft Graph and SharePoint REST APIs"
fetched_at: "2026-09-01T13:29:41.437Z"
---
On this page

Glean leverages both the Microsoft Graph API and the SharePoint REST API to fetch content from your company's SharePoint instance.

Read more at [SharePoint and OneDrive API endpoints](/connectors/native/sharepoint/security/api).

Both the Microsoft Graph API and the SharePoint REST API have separate permission sets that need to be managed independently. For each API, this document will cover:

-   Each permission that Glean requests, why it is required, and how it is used.
-   Typical objections encountered when requesting the specified permission.
-   Alternatives for permissions that are not permitted as part of your organization's Standard Operating Procedure (SOP).

* * *

## Graph API permissions[​](#graph-api-permissions "Direct link to Graph API permissions")

### Overview[​](#overview "Direct link to Overview")

Glean adheres to the principles of least privilege and only requests the minimum permission scopes required to read data from the Graph API. The following permission scopes are required when integrating with SharePoint:

| Permission | Usage |
| --- | --- |
| `User.Read.All` | Used to list all the users within the directory. Used for mapping content permissions. |
| `GroupMember.Read.All` | Used to expand the members of a group. Used for mapping content permissions. |
| `Member.Read.Hidden` | Allows the app to read the memberships of any groups that are marked as "hidden" in Entra ID. Used for mapping content permissions. |
| `Sites.Read.All` | Retrieve sites, site content, and site metadata in order to map and index content. This is covered by `Sites.FullControl.All`, so is not explicitly needed. |
| `Sites.FullControl.All` | Retrieve details regarding permission update events (i.e. when site/content permissions change). |
| `Files.Read.All` | Retrieve items, metadata, and associated content for an item so it can be indexed. It is also used to create webhook subscriptions so that Glean can be alerted to and process changes as they occur. This is covered by `Files.ReadWrite.All`, so is not explicitly needed. |
| `Files.ReadWrite.All` | Webhooks [expire](https://learn.microsoft.com/en-us/graph/change-notifications-overview#subscription-lifetime) periodically and require re-authorization. This permission is required by Microsoft to reauthorize a webhook subscription. |
| `Reports.Read.All` | Used to report on crawler progress and to ensure your infrastructure is scaled correctly based on the volume of content expected. |

### Deprecated Permissions

These permissions were used in previous versions of the Glean SharePoint/OneDrive connector and are no longer required. They can be safely removed provided the permissions above are present:

-   `Group.Read.All`
-   `Directory.Read.All`

All permissions must be granted as **Application** permissions. **Delegated** permissions cannot be used.

Read more at [Permission models](/connectors/native/sharepoint/security/app-vs-delegated).

### Permissions explained[​](#permissions-explained "Direct link to Permissions explained")

### Sites.Read.All

#### Sites.Read.All[​](#sitesreadall "Direct link to Sites.Read.All")

note

Although `Sites.FullControl.All` (discussed below) encompasses the permissions granted by `Sites.Read.All`, we are outlining `Sites.Read.All` here to explicitly define the minimum permissions required for specific connector operations.

**Purpose** `Sites.Read.All` allows Glean to crawl each of your SharePoint sites to provide search capability for them.

Specifically, this permission is used to fetch site collections, sub-sites, site lists, site columns (attributes), and site metadata. Site metadata is a dependency in order for files from associated document libraries to be crawled (see `Files.Read.All` below).

**Common Concerns** Concerns often arise regarding the potential for Glean to access sensitive information within SharePoint sites that are subject to stringent access controls.

It is crucial to understand that Glean respects the existing permissions and access controls of each piece of content it crawls. This means that search results will only display content to users who have the appropriate permissions to view it in SharePoint. Glean's ability to map a piece of content to the users who are permitted to access it is tied to the `User.Read.All` permission (detailed below).

The SharePoint sites that are crawled by Glean can be restricted by Site URL in the Glean UI.

For more information on setting these restrictions, refer to:

-   [Supported Crawling Restrictions for SharePoint](/connectors/native/sharepoint/restrictions)

### Sites.FullControl.All

#### Sites.FullControl.All[​](#sitesfullcontrolall "Direct link to Sites.FullControl.All")

**Purpose** `Sites.FullControl.All` is required for Glean to be able to process permission-only changes to documents as they occur. E.g. If access to a SharePoint document or site is changed, this needs to be reflected in Glean as quickly as possible.

Microsoft **requires** the elevated `Sites.FullControl.All` permission in order for permission-only change events to be **read** by an integrating service (i.e. Glean).

Glean relies on these events to process changes in real time. Without this permission scope, permission-only changes are not returned by the Graph API, hence Glean will only be able to process them in non-real time (once every 24 hours during an incremental API crawl).

**Common Concerns** Concerns arise regarding the potential for Glean to perform write tools (altering data) using the permission scope.

As per [Microsoft's documentation](https://learn.microsoft.com/en-us/graph/api/driveitem-delta?view=graph-rest-1.0&tabs=http#scanning-permissions-hierarchies), `Sites.FullControl.All` is required in order to process changes to permissions.

Glean's crawlers have no capability to perform actions that would write/alter/modify data in a customer environment. They are only able to request and read data from a vendor's API.

Any code changes to our crawlers require an extensive code review process with engineering management, alongside a security review. We also have comprehensive audit logging in place for all data access activities performed by our crawlers, and these logs are able to be exported to a customer SIEM on request.

Glean supports applying restrictions to the sites/data crawled within the configuration of the SharePoint connector.

Should Microsoft reduce the scope required to read permission change events, Glean will follow suit.

### Users.Read.All

#### Users.Read.All[​](#usersreadall "Direct link to Users.Read.All")

**Purpose** The `User.Read.All` permission is essential for Glean to accurately map and enforce the permissions of every site and content piece that is indexed.

This permission enables Glean to identify and respect the access controls set for your SharePoint content, ensuring that search results are appropriately restricted. Without it, Glean would be unable to apply any access controls, potentially exposing sensitive content.

**Common Concerns** Concerns regarding this permission often revolve around the privacy and security of accessing user/employee information. There's also a question of necessity, particularly if Glean as a tool is only accessible to a subset of users within the organization.

Glean uses this permission to verify the access permissions of content it crawls, obtaining a list of User and Group IDs with authorized access. It is crucial for Glean to recognize the user identities linked to these IDs in SharePoint/OneDrive, aligning them with user profiles in Glean. This ensures that search results are only shown to users with the right permissions. The \[List users\]([https://learn.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0\\&tabs=http](https://learn.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0%5C&tabs=http)) endpoint of the Graph API, which requires `User.Read.All`, facilitates this process.

Additionally, understanding user identities helps Glean enhance the metadata of indexed content, improving search result relevance. For example, displaying the document owner's name alongside search results enriches the user's search experience, even if the document owner doesn't use Glean.

### Files.Read.All

#### Files.Read.All[​](#filesreadall "Direct link to Files.Read.All")

note

Although `Files.ReadWrite.All` (discussed below) encompasses the permissions granted by `Files.Read.All`, we are outlining `Files.Read.All` here to explicitly define the minimum permissions required for specific connector operations.

**Purpose** The `Files.Read.All` permission is crucial for Glean to access and index files from SharePoint and OneDrive. It enables Glean to retrieve metadata, permissions, and content from user drives in OneDrive, and document libraries on SharePoint sites.

This permission is also used to create webhook subscriptions that play a pivotal role in enabling Glean to immediately reflect changes; such as the creation, modification, or deletion of documents and site content.

**Common Concerns** Concerns about this permission often focus on the potential for Glean to access sensitive or restricted company documents.

It is important to understand that Glean respects the existing permissions and access controls for each document it indexes. This means that only users with the appropriate permissions in the source application will see the content in search results.

This careful mapping of permissions ensures that even the most sensitive documents are only visible to authorized employees. Glean's ability to map a piece of content to the users who are permitted to access it is tied to the `User.Read.All` permission (detailed above).

Additionally, Glean offers options to restrict crawling to specific SharePoint sites and user drives by specifying URLs or usernames associated with the drives. It is also possible to exclude specific individual content from search results.

For details on how to apply these restrictions, refer to:

-   [Supported Crawling Restrictions for SharePoint](/connectors/native/sharepoint/restrictions)

### Files.ReadWrite.All

#### Files.ReadWrite.All[​](#filesreadwriteall "Direct link to Files.ReadWrite.All")

**Purpose** The `Files.ReadWrite.All` permission is crucial for Glean to manage webhook subscriptions for SharePoint and OneDrive content updates. Webhooks play a pivotal role in enabling Glean to immediately reflect changes, such as the creation, modification, or deletion of documents and site content.

This real-time update capability is essential not only for keeping the search index current, but also for accurately maintaining the map of permission and access controls. For example, if a user's access to specific content is revoked, Glean leverages webhooks to swiftly update its records, thereby preventing unauthorized access to sensitive data.

Webhook subscriptions frequently require re-authorization for security purposes. The minimum permission scope to be able to re-authorize an existing webhook is `Files.ReadWrite.All`. Should Microsoft reduce the minimum permission scope required to perform this action, Glean will align with the change and remove the requirement for `Files.ReadWrite.All`

**Common Concerns** Concerns about this permission often stem from its capability to write back to the Graph API, potentially altering data. As per [Microsoft's documentation](https://learn.microsoft.com/en-us/graph/api/subscription-reauthorize?view=graph-rest-1.0&tabs=http), `Files.ReadWrite.All` is the permission of least privilege to be able to reauthorize subscriptions to the `driveItem` resource that is required by Glean.

Glean is committed to adopting less permissive options should they become available. To mitigate concerns, Glean advises implementing restrictions on the data it can access by specifying Site URLs or usernames in the Glean UI.

Monitoring audit logs for both Glean and the Microsoft Graph API, with configured alerts for unexpected API usage, is also recommended.

### GroupMember.Read.All

#### GroupMember.Read.All[​](#groupmemberreadall "Direct link to GroupMember.Read.All")

**Purpose**

The `GroupMember.Read.All` permission is essential for Glean to accurately map user access to content. It works in tandem with `User.Read.All` to identify which users are allowed access to each piece of content Glean indexes.

Specifically, when permissions for a site or file are associated with a Group email/ID, Glean uses the [List group members](https://learn.microsoft.com/en-us/graph/api/group-list-members?view=graph-rest-1.0&tabs=http) endpoint of the Graph API to determine the user IDs within that group. This endpoint necessitates the `GroupMember.Read.All` permission, which is the least privileged permission required for this operation.

**Common Concerns** Concerns about this permission often mirror those for `User.Read.All`, focusing on its scope. Given that groups assigned to specific sites or files could span across the entire organization, it's crucial for Glean to understand the membership of these groups comprehensively. This understanding allows Glean to accurately enforce permissions, ensuring that only authorized users can access specific content.

The necessity of mapping group memberships across all groups is fundamental to maintaining the integrity and security of data access within the organization.

### Member.Read.Hidden

#### Member.Read.Hidden[​](#memberreadhidden "Direct link to Member.Read.Hidden")

**Purpose** Entra ID allows some group memberships to be marked as "hidden" so that they are not exposed to users within the organization.

To correctly map permissions from a piece of content to a user, Glean needs to be aware of ALL group memberships, hidden or otherwise. The standard `GroupMember.Read.All` permission does not list any group member that has been marked as hidden, hence the `Member.Read.Hidden` permission is required.

**Common Concerns** A common objection to this scope is that it exposes hidden memberships to Glean which might be private in nature.

Glean does not expose the memberships it reads to end users: We only leverage the group memberships to accurately map access permissions from a piece of content to a user.

Failing to provide this permission to Glean will mean that permissions will not be able to be mapped to any 'hidden' group member, resulting in these users missing search results in Glean.

### Reports.Read.All

#### Reports.Read.All[​](#reportsreadall "Direct link to Reports.Read.All")

**Purpose** The `Reports.Read.All` permission enables Glean to access SharePoint & OneDrive usage data for sites, pages, users, and files within a specified time period. This is crucial for:

1.  Monitoring and reporting on the status of the OneDrive and SharePoint crawl (estimated time, time remaining, etc).
2.  Allowing the Glean infrastructure to appropriately and accurately scale to manage the vast content volume in SharePoint & OneDrive.

**Common Concerns** Concerns about this permission often center on the potential access to sensitive activity and usage data via other accessible reports.

Glean strictly accesses data from four reporting endpoints:

-   [File Count (OneDrive)](https://learn.microsoft.com/en-us/graph/api/reportroot-getonedriveusagefilecounts?view=graph-rest-1.0&tabs=http)
-   [Site Count (SharePoint)](https://learn.microsoft.com/en-us/graph/api/reportroot-getsharepointsiteusagesitecounts?view=graph-rest-1.0&tabs=http)
-   [User Count (SharePoint)](https://learn.microsoft.com/en-us/graph/api/reportroot-getsharepointactivityusercounts?view=graph-rest-1.0&tabs=http)
-   [Page Usage (SharePoint)](https://learn.microsoft.com/en-us/graph/api/reportroot-getsharepointsiteusagepages?view=graph-rest-1.0&tabs=http)

These endpoints are essential for Glean's functionality and require `Reports.Read.All`, the least privileged permission necessary, for access.

* * *

## SharePoint REST API permissions[​](#sharepoint-rest-api-permissions "Direct link to SharePoint REST API permissions")

Glean adheres to the principles of least privilege and only requests the minimum permission scopes required to read data from the Graph API. The following permission scopes are required when integrating with SharePoint:

| Permission | Usage |
| --- | --- |
| `Sites.FullControl.All` | Retrieve site metadata, SharePoint user groups and role assignments, and contents within web components (including classic components). |

### Deprecated Permissions

These permissions were used in previous versions of the Glean SharePoint/OneDrive connector and are no longer required. They can be safely removed provided the permissions above are present:

-   `Tenant.FullControl` + `SiteCollections.FullControl` (previously granted via the `appinv.aspx` XML method, now retired)

### Permissions explained[​](#permissions-explained-1 "Direct link to Permissions explained")

There are four (4) SharePoint REST API endpoints that Glean leverages:

-   [Get site groups](/connectors/native/sharepoint/security/api#identity-endpoints)
-   [Get site list items](/connectors/native/sharepoint/security/api#sites)
-   [Get site item permissions](/connectors/native/sharepoint/security/api#sites)
-   [Get page content](/connectors/native/sharepoint/security/api#sites)

The minimum permission to be able to read data from these endpoints is `Sites.FullControl.All`. At no point is data ever written by Glean's crawlers using the API.

Should Microsoft adjust the minimum API scope required to read from these endpoints, Glean will follow suit and adjust our guidance on requiring `Sites.FullControl.All`

### Why is a broad permission required to read data?

If these API endpoints are queried with a permission scope other than `Sites.FullControl.All`, e.g. `Sites.Read.All`, the SharePoint REST API returns a HTTP 403 error.

-   For more information, [see this StackOverflow post](https://stackoverflow.com/questions/66324448/unexpected-403-in-sharepoint-rest-api-list-items-roleassignments-call#comment125858296_66324448).

Should Microsoft adjust the minimum API scope required to read from these endpoints, Glean will follow suit and adjust our guidance on requiring `Sites.FullControl.All`.

### Why does Glean need access to the SharePoint REST API in addition to the Graph API?

Not all required information from SharePoint can be accessed from the Graph API (some data endpoints have yet to be migrated).

-   For more information, refer to [this answer in the FAQ.](/connectors/native/sharepoint/security/faq)

* * *

## Search visibility and shared links[​](#search-visibility-and-shared-links "Direct link to Search visibility and shared links")

Glean enforces the same access controls as SharePoint and OneDrive: a document appears in a user's search results only if that user can access it in the source.

In addition to direct user and group permissions, content can be shared by using sharing links. Glean treats these links based on their scope:

| Sharing link (as shown in Microsoft 365) | Link scope | Who can find it in Glean |
| --- | --- | --- |
| Anyone with the link | `anonymous` | Users in your organization |
| People in `<org>` with the link | `organization` | Users in your organization who have the link |
| Specific people | `users` | Only the named users or groups |
| People with existing access | - | Existing permissions apply |

-   Inherited links from a parent folder or site are not separately applied to child items. Glean uses the child item's own permissions.

Content becomes organization-wide searchable when it is shared with identities such as Everyone or Everyone except external users, not simply because it has a sharing link.

* * *

## Constraining access and scope[​](#constraining-access-and-scope "Direct link to Constraining access and scope")

To constrain the scope of data that the SharePoint crawler has access to (and the tools it can subsequently perform via the Graph and SharePoint REST APIs), there are multiple methods of control that can be leveraged.

These can be divided into two categories:

-   Controls configured on the Glean side.
-   Controls configured on the Microsoft side.

### Crawling restrictions[​](#crawling-restrictions "Direct link to Crawling restrictions")

note

This control is configured on the Glean side.

For SharePoint and OneDrive, Glean can constrain the SharePoint crawler in your deployment to only target *specific* Sites or User drives as defined by you. Conversely, specific Sites or User drives can also be *excluded* from crawling.

This involves providing Glean with:

-   The SharePoint Site URL(s) to explicitly include (or exclude) when crawling; and/or
-   The Azure AD/Entra ID Group ID containing the users to explicitly include (or exclude) when crawling; and/or
-   The usernames of the users to explicitly include (or exclude) when crawling.

For more information, refer to [Supported Crawling Restrictions for SharePoint](/connectors/native/sharepoint/restrictions).

### IP restrictions (Conditional access)[​](#ip-restrictions-conditional-access "Direct link to IP restrictions (Conditional access)")

note

This control is configured on the Microsoft side.

note

This feature requires a license for Microsoft Entra Workload ID. Please contact your Microsoft representative for more information.

Using Entra ID Conditional Access, you can restrict usage of the App Registration (and associated certificate) created for the Glean SharePoint crawler to only be permitted from the IP range of your Glean tenant.

This involves:

-   Adding the static IP address of NAT gateway used by the crawlers in your Glean tenant as a location within Entra ID.
-   Adding a new Conditional Access policy targeting specific source workload identities corresponding to the Service Principal(s) created for the Glean SharePoint crawler.
-   Excluding the location created in step 1 from the Conditional Access policy.
-   Setting the policy to **block** as a tool.

For more information, refer to [Permission & Security Controls for SharePoint - IP Restrictions](/connectors/native/sharepoint/security/controls#ip-restrictions-conditional-access).

### Audit logs[​](#audit-logs "Direct link to Audit logs")

note

This control is configured on the Microsoft side.

Microsoft Purview can be used to monitor the Glean SharePoint crawler and alert on any attempts to misuse granted permissions to write data back to SharePoint.

For more information, refer to [Permission & Security Controls for SharePoint - Monitoring with Purview](/connectors/native/sharepoint/security/controls#monitoring-with-microsoft-purview).

### Sites.Selected[​](#sitesselected "Direct link to Sites.Selected")

note

This control is configured on the Microsoft side.

warning

Leveraging `Sites.Selected` comes with significant drawbacks that should be understood before being used.

The `Sites.Selected` permission can be used to provide the required Graph & SharePoint REST API permissions at a **site-level** instead of at a global-level. Use of `Sites.Selected` has significant trade-offs however, including:

-   Severely degrading the search result quality for SharePoint.
-   Limiting Glean's ability to synchronize content updates (including permissions) to only once every 24 hours.
-   Requiring your company to manually authorize every site AND sub-site that you want to be available in Glean (`Sites.Selected` does not allow for automatic site and sub-site discovery)

Glean does **not** recommend this approach.

For more information, refer to:

-   [Permission & Security Controls for SharePoint - `Sites.Selected` (Graph API)](/connectors/native/sharepoint/security/controls#sites-selected-graph-api).
-   [Permission & Security Controls for SharePoint - `Sites.Selected` (SharePoint REST API)](/connectors/native/sharepoint/security/controls#sites-selected-sharepoint-rest-api).
