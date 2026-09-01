---
url: "https://docs.glean.com/connectors/native/sharepoint/api"
canonical: "https://docs.glean.com/connectors/native/sharepoint/api"
title: "SharePoint Connector API Endpoints"
description: "Overview of the SharePoint API endpoints used by the Glean SharePoint connector"
fetched_at: "2026-09-01T13:29:40.956Z"
---
On this page

## Usage Methodology[​](#usage-methodology "Direct link to Usage Methodology")

Glean uses the Microsoft Graph API and the [SharePoint REST API](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=csom) to crawl your SharePoint and OneDrive environments.

Glean uses the recommended [best practices](https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/scan-guidance?view=odsp-graph-online) strategy provided by Microsoft to both crawl and record incremental changes for all documents.

* * *

## Authentication Endpoints[​](#authentication-endpoints "Direct link to Authentication Endpoints")

| Endpoint | Permissions | URL |
| --- | --- | --- |
| [Token request (Graph API)](https://learn.microsoft.com/en-us/graph/auth-v2-service?tabs=http#token-request)  
  
Obtain and refresh an access token to interact with the Graph API using OAuth 2.0. | \- | `https://login.microsoftonline.com/<tenant>/oauth2/v2.0/token` |
| [Token request (SharePoint REST API)](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=csom)  
  
Obtain and refresh an access token to interact with the SharePoint REST API using OAuth 2.0. | \- | `https://accounts.accesscontrol.windows.net/<tenant_id>/tokens/OAuth/2` |

## Identity Endpoints[​](#identity-endpoints "Direct link to Identity Endpoints")

| Endpoint | Permissions | URL |
| --- | --- | --- |
| [List users](https://learn.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0&tabs=http)  
  
List all the users within the tenant. | User.Read.All | `https://graph.microsoft.com/v1.0/users` |
| [List groups](https://learn.microsoft.com/en-us/graph/api/group-list?view=graph-rest-1.0&tabs=http)  
  
List all the groups within the tenant. | GroupMember.Read.All  
Member.Read.Hidden | `https://graph.microsoft.com/v1.0/groups` |
| [List group members](https://learn.microsoft.com/en-us/graph/api/group-list-members?view=graph-rest-1.0&tabs=http)  
  
List all the groups within the tenant. | GroupMember.Read.All  
Member.Read.Hidden | `https://graph.microsoft.com/v1.0/groups/<group_id>/members` |
| [Get profilePhoto](https://learn.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0)  
  
Get the members of a group. | User.Read.All | `https://graph.microsoft.com/v1.0/users/<user_id>/photo/$value` |
| [Get site groups](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/determine-sharepoint-rest-service-endpoint-uris?tabs=csom)  
  
Get the default site groups and associated user memberships for a given site. | Sites.FullControl.All | `https://<site_domain>.sharepoint.com/sites/<subsite_url>/_api/web/SiteGroups?$expand=Users` |

## Content Endpoints[​](#content-endpoints "Direct link to Content Endpoints")

### Sites[​](#sites "Direct link to Sites")

Sites include both the SharePoint site pages, and associated site metadata required for document library crawls.

| Endpoint | Permissions | URL |
| --- | --- | --- |
| [List sites](https://learn.microsoft.com/en-us/graph/api/site-list?view=graph-rest-1.0)  
  
List all site collections within the tenant. | Sites.Read.All | `https://graph.microsoft.com/v1.0/sites/delta` |
| [List subsites](https://learn.microsoft.com/en-us/graph/api/site-list-subsites?view=graph-rest-1.0&tabs=http)  
  
List all the subsites within a site or subsite. | Sites.Read.All | `https://graph.microsoft.com/v1.0/sites/<id>/sites` |
| [List lists](https://learn.microsoft.com/en-us/graph/api/list-list?view=graph-rest-1.0&tabs=http)  
  
List all the lists within the site. | Sites.Read.All | `https://graph.microsoft.com/v1.0/sites/<site_id>/lists` |
| [List columns](https://learn.microsoft.com/en-us/graph/api/site-list-columns?view=graph-rest-1.0&tabs=http)  
  
List all columns within the site (attributes of site). | Sites.Read.All | `https://graph.microsoft.com/v1.0/sites/<id>/sites/<id>/columns` |
| [List items delta](https://learn.microsoft.com/en-us/graph/api/listitem-delta?view=graph-rest-beta&tabs=http)  
  
List all items from delta endpoint (metadata). Used heavily in conjunction with the \`List sites\` endpoint, as it only returns site collections from the main geolocation on its own. | Sites.FullControl.All | `https://graph.microsoft.com/v1.0/sites/<id>/sites/ <id>/lists/ <id>/item /delta` |
| [Get site list items](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/determine-sharepoint-rest-service-endpoint-uris?tabs=csom)  
  
Get the items within a list for a site. SharePoint REST API is used as some content for classic sites is not available via Graph API. | Sites.FullControl.All | `https://<site_domain>.sharepoint.com/sites/<subsite_url>/_api/web/lists('<list_id>')/item` |
| [Get site item permissions](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/determine-sharepoint-rest-service-endpoint-uris?tabs=csom)  
  
Get the permissions for an item on the site. The SharePoint REST API is required for site pages / web components, as Graph API only exposes permissions for Document Library items. | Sites.FullControl.All | `https://<site_domain>.sharepoint.com/sites/<subsite_url>/_api/web/lists('<list_id>')/items('<item_id>')/roleassignments` |
| [Get page content](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/determine-sharepoint-rest-service-endpoint-uris?tabs=csom)  
  
Get the web parts on a particular page (e.g. blocks of content within text boxes, titles, etc.) | Sites.FullControl.All | `https://<site_domain>.sharepoint.com/sites/<subsite_url>/_api/web/GetFileById('<id>')/GetLimitedWebPartManager(scope=1)/ExportWebPart` |

### Drives[​](#drives "Direct link to Drives")

Drives include both OneDrive for Business (user drives) and Document Libraries on SharePoint Sites.

| Endpoint | Permissions | URL |
| --- | --- | --- |
| [List drives](https://learn.microsoft.com/en-us/graph/api/drive-list?view=graph-rest-1.0&tabs=http#list-a-sites-drives)  
  
List all the drives within a given site. | Files.Read.All | `https://graph.microsoft.com/v1.0/sites/<site_id>/drives` |
| [Get driveItem](https://learn.microsoft.com/en-us/graph/api/driveitem-delta?view=graph-rest-1.0&tabs=http)  
  
List all the items within a drive (change-based, as per Microsoft's scanning guidance) | Files.Read.All | `https://graph.microsoft.com/v1.0/drives/<drive_id>/root/delta` |
| [Get driveItem resource](https://learn.microsoft.com/en-us/graph/api/driveitem-get?view=graph-rest-1.0&tabs=http)  
  
Retrieve metadata for an item in a specified drive. | Files.Read.All | `https://graph.microsoft.com/v1.0/drives/<drive_id>/items/<item_id>` |
| [Download file](https://learn.microsoft.com/en-us/graph/api/driveitem-get-content?view=graph-rest-1.0&tabs=http)  
  
Fetch the contents of an item to index its body. | Files.Read.All | `https://graph.microsoft.com/v1.0/drives/<drive_id>/items/<item_id>/content` |
| [Get permissions](https://learn.microsoft.com/en-us/graph/api/driveitem-list-permissions?view=graph-rest-1.0&tabs=http)  
  
Get the permissions of a given item within a drive. | Files.Read.All | `https://graph.microsoft.com/v1.0/drives/<drive_id>/items/<item_id>/permissions` |

## Activity Endpoints[​](#activity-endpoints "Direct link to Activity Endpoints")

Activity data is critical to ensuring search results are ranked correctly, and for ensuring timely updates of content within Glean.

### Insights[​](#insights "Direct link to Insights")

The insights endpoint is used to enhance search rankings.

| Endpoint | Permissions | URL |
| --- | --- | --- |
| [List used](https://learn.microsoft.com/en-us/graph/api/insights-list-used?view=graph-rest-1.0&tabs=http)  
  
Lists recent activities performed by the user on specific items | Sites.Read.All | `https://graph.microsoft.com/v1.0/users/<user_id>/insights/used` |

### Reports[​](#reports "Direct link to Reports")

Glean uses the `reports` API endpoint to obtain site, page, user, and file usage information for SharePoint & OneDrive. This data is used to validate crawler progress, and to ensure your search index is scaled correctly in relation to the volume of data expected.

| Endpoint | Permissions | URL |
| --- | --- | --- |
| [Get OneDrive Usage: File Count](https://learn.microsoft.com/en-us/graph/api/reportroot-getonedriveusagefilecounts?view=graph-rest-1.0&tabs=http)  
  
Get the total number of files across all sites and how many have been created, modified, and shared within the time period. | Reports.Read.All | `https://graph.microsoft.com/v1.0/reports/getOneDriveUsageFileCounts(period='{period_value}')` |
| [Get SharePoint Usage: Site Count](https://learn.microsoft.com/en-us/graph/api/reportroot-getsharepointsiteusagesitecounts?view=graph-rest-1.0&tabs=http)  
  
Get the total number of active sites within the time period. | Reports.Read.All | `https://graph.microsoft.com/v1.0/reports/getSharePointSiteUsageSiteCounts(period='{period_value}')` |
| [Get SharePoint Usage: User Count](https://learn.microsoft.com/en-us/graph/api/reportroot-getsharepointactivityusercounts?view=graph-rest-1.0&tabs=http)  
  
Get the total number of active SharePoint users within the time period. | Reports.Read.All | `https://graph.microsoft.com/v1.0/reports/getSharePointActivityUserCounts(period='{period_value}')` |
| [Get SharePoint Usage: Pages](https://learn.microsoft.com/en-us/graph/api/reportroot-getsharepointsiteusagepages?view=graph-rest-1.0&tabs=http)  
  
Get the number of pages viewed across all sites within the time period. | Reports.Read.All | `https://graph.microsoft.com/v1.0/reports/getSharePointSiteUsagePages(period='{period_value}')` |

### Webhooks[​](#webhooks "Direct link to Webhooks")

Webhooks allow Glean to sync changes to content in your environment as those changes occur; instead of waiting for the daily incremental crawl to complete. For example: If a document is deleted, or the access permissions on it change.

| Endpoint | Permissions | URL |
| --- | --- | --- |
| [Create a webhook subscription](https://learn.microsoft.com/en-us/graph/api/subscription-post-subscriptions?view=graph-rest-1.0&tabs=http)  
  
Glean subscribes to the \`driveItem\` resource which requires (as least privilege) the \`Files.ReadWrite.All\` permission to create the subscription. | Files.Read.All | `https://webhook.azurewebsites.net/api/send/<client>` |
| [Reauthorize a webhook subscription](https://learn.microsoft.com/en-us/graph/api/subscription-reauthorize?view=graph-rest-1.0)  
  
Reauthorize a subscription after timeout when a \`reauthorizationRequired\` challenge is received. | Files.ReadWrite.All | `https://graph.microsoft.com/v1.0/subscriptions/<subscriptionsId>/reauthorize` |

warning

Without webhooks, changes within SharePoint and OneDrive can take up to 24 hours to be processed (via incremental crawling), compared to within <2 hours with webhooks. This includes any changes to document permissions.
