---
url: "https://docs.glean.com/connectors/native/sharepoint/security/faq"
canonical: "https://docs.glean.com/connectors/native/sharepoint/security/faq"
title: "Security FAQ"
description: "Frequently asked questions from security teams regarding the Glean SharePoint connector"
fetched_at: "2026-09-01T13:29:41.380Z"
---
### Why does Glean require Sites.FullControl.All for the Graph API?

Previously, Glean only required `Sites.Read.All` as a permission to enable functionality of the SharePoint connector. This was despite [Microsoft's guidance](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/concepts/scan-guidance?view=odsp-graph-online#getting-the-right-permissions) to use `Sites.FullControl.All` for apps that scan content and content permissions (i.e. Glean).

Glean follows the principles of Least Privilege when integrating with other vendors, and we believe it counter to these principles to require a `FullControl` (writeable) permission when data is simply being read from an API. Hence, we made every effort to continue to use the `Sites.Read.All` permission for as long as practical.

The relevant snippet from Microsoft's guidance is as follows:

> To build trust with users it is important to use the correct minimal set of permission scopes needed for an app to function. Most scanning applications will want to operate with Application permissions, this indicates your application is running independently of any particular user.
> 
> -   To access files you should request either the Files.Read.All or Files.ReadWrite.All scope.
> -   For access to SharePoint resources, including the list of all site collections, Sites.Read.All or Sites.ReadWrite.All is appropriate.
> -   **In order to process permissions correctly you will also need to request Sites.FullControl.All.**
> 
> → [Getting the right permissions (learn.microsoft.com)](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/concepts/scan-guidance?view=odsp-graph-online#getting-the-right-permissions)

In December 2024, Glean QA observed that permission-only changes to content in SharePoint were no longer being reflected in Glean within expected timeframes. Changing from `Sites.Read.All` to `Sites.FullControl.All` (in accordance with Microsoft's documented guidance) fixed the issue. We believe Microsoft may have made a change to their API to enforce the permissions specified above in their guidance.

Given the sensitive nature of content often contained in company SharePoint sites, it is imperative that Glean is able to accurately reflect changes in access permissions for sites and site content, at a speed that is as close to real-time as possible.

As a result of `Sites.Read.All` no longer allowing permission-only updates to be fetched, we had no choice but to update our setup instructions for customers to leverage `Sites.FullControl.All` in order to ensure that updates continued to be processed in a timely manner.

To be clear:

-   Glean only ever **reads** content from your SharePoint instance.
-   With the exception of setting up a webhook subscription (to be notified of content and permission changes as they occur), our connectors are not programmed to write back to your environment.

### Why does Glean require Sites.FullControl.All for the SharePoint REST API?

The SharePoint REST API endpoints responsible for returning the role assignments needed by the Glean connector returns a HTTP 403 Forbidden error when the API endpoint is queried with any permission other than `FullControl`.

In other words, attempting to perform a GET operation with a read-only permission scope instead of `FullControl` results in the following response:

```
{    "odata.error": {    "code":"-2147024891, System.UnauthorizedAccessException",    "message": {        "lang":"en-US",        "value":"Access denied. You do not have permission to perform this action or access this resource."    }    }}
```

-   → More information: [Unexpected 403 in SharePoint rest api list items roleassignments call (stackoverflow.com)](https://stackoverflow.com/questions/66324448/unexpected-403-in-sharepoint-rest-api-list-items-roleassignments-call#comment125858296_66324448)

Glean will deprecate the use of the `FullControl` permission for the SharePoint REST API once Microsoft:

-   Reduces the minimum permission required to read data from the impacted SharePoint REST API endpoints, OR
-   Migrates the data that can only be fetched via the SharePoint REST API to the Microsoft Graph API.

To be clear:

-   Glean only ever **reads** content from your SharePoint instance.
-   With the exception of setting up a webhook subscription (to be notified of content and permission changes as they occur), our connectors are not programmed to write back to your environment.

### Will Glean stop using Sites.FullControl.All if Microsoft provides a read-only alternative?

Yes.

Glean does not agree with Microsoft's guidance on requiring a `FullControl` permission for a read-only operation, as this is counter to the principles of Least Privilege that are the cornerstone of good security practice. We are of the opinion that this is an oversight by Microsoft and that this will be fixed by them in time.

As soon as Microsoft allows the same permissions data to be extracted from the Graph API while leveraging the `Sites.Read.All` (or similar read-only) permission, we will update our permissions guidance to remove the need for `Sites.FullControl.All`.

Glean is committed to working with you and all our integration partners to advance security standards across the industry, and we encourage you to raise this issue with your Microsoft reps directly so that your company's name can be added to the discussion.

### What guardrails are there to control what SharePoint data Glean can access?

Organizations are able to set configuration in the Glean UI to restrict the scope of data that the Glean SharePoint crawler fetches. Restrictions can be specified as:

-   **Site Greenlist:** Crawl only the SharePoint sites explicitly specified.
-   **Site Redlist:** Crawl everything except the specified SharePoint sites.
-   **Time:** Crawl content only from a specific date.
-   **User Group:** Provide access to content only for users in a specific Entra ID group.

For more information on how to configure these restrictions, refer to:

-   [Supported Crawling Restrictions for SharePoint](/connectors/native/sharepoint/restrictions)

Alternatively, the `Sites.Selected` permission can be used on the Microsoft side to provide the `FullControl` permission to **specific sites only**, rather than at a global level.

warning

Leveraging `Sites.Selected` for the Graph API comes with significant drawbacks that should be understood before being used.

For more information on `Sites.Selected`, refer to:

-   [Permission & Security Controls for SharePoint - `Sites.Selected` (Graph API)](/connectors/native/sharepoint/security/controls#sites-selected-graph-api)
-   [Permission & Security Controls for SharePoint - `Sites.Selected` (SharePoint REST API)](/connectors/native/sharepoint/security/controls#sites-selected-sharepoint-rest-api)
-   [Configure SharePoint using `Sites.Selected`](/connectors/native/sharepoint/setup-selected-sites)

### What alternatives are there to the Sites.FullControl.All permission?

In order to be able to fetch permission-only updates, `FullControl` needs to be granted at some level. This is currently a limitation of Microsoft's Graph and SharePoint REST APIs.

The `Sites.Selected` permission can be used instead of `Sites.FullControl.All` to allow the `FullControl` permission to be applied at a **site-specific level** rather than at a global one.

warning

Leveraging `Sites.Selected` for the Graph API comes with significant drawbacks that should be understood before being used.

For more information on `Sites.Selected`, refer to:

-   [Permission & Security Controls for SharePoint - `Sites.Selected` (Graph API)](/connectors/native/sharepoint/security/controls#sites-selected-graph-api)
-   [Permission & Security Controls for SharePoint - `Sites.Selected` (SharePoint REST API)](/connectors/native/sharepoint/security/controls#sites-selected-sharepoint-rest-api)
-   [Configure SharePoint using `Sites.Selected`](/connectors/native/sharepoint/setup-selected-sites)

### Why does Glean need Files.ReadWrite.All for the Graph API?

The `Files.ReadWrite.All` permission is crucial for Glean to manage reauthorization of webhook subscriptions for SharePoint and OneDrive content updates.

Webhooks play a pivotal role in enabling Glean to immediately reflect changes, such as the creation, modification, or deletion of documents and site content. This real-time update capability is essential not only for keeping the search index current, but also for accurately maintaining the map of permission and access controls.

For example, if a user's access to specific content is revoked, the vendor (i.e. Microsoft) will send a webhook notification to Glean. Glean will use this notification to swiftly update its records, thereby preventing unauthorized access to sensitive data.

For SharePoint and OneDrive, Glean creates a subscription for the [driveItem](https://learn.microsoft.com/en-us/graph/api/resources/driveitem?view=graph-rest-1.0) resource type, which triggers an event notification to be sent from Microsoft to Glean whenever a drive item is created, modified, or deleted (this includes both content and permissions changes for the item). These webhook subscriptions frequently need to be re-authorized: That is, the secret that is used to sign and verify the webhook is frequently rotated.

While the subscription itself can be created using only the `Files.Read.All` permission, the endpoint to re-authorize the subscription has a minimum permission of `Files.ReadWrite.All`.

-   → More information: [subscription: reauthorize (learn.microsoft.com)](https://learn.microsoft.com/en-us/graph/api/subscription-reauthorize?view=graph-rest-1.0&tabs=http#permissions)

Failing to provide this permission prevents Glean from leveraging webhooks, which means that any updates to SharePoint content (including permissions) will only be reflected on completion of a manual fetch (incremental crawl) by Glean every 24 hours.

When Microsoft reduces the scope required for the reauthorization tool, Glean will follow suit. We encourage all of our customers to raise this issue with Microsoft.

### Can webhooks be manually configured to avoid the use of Files.ReadWrite.All?

No. This is because it is not feasible to manually reauthorize the webhook subscription at the frequency required.

When Microsoft reduces the scope required for the reauthorization tool, Glean will follow suit. We encourage all of our customers to raise this issue with Microsoft.

### What if we can't grant Glean the Files.ReadWrite.All permission for security reasons?

If the `Files.ReadWrite.All` permission is not granted, Glean cannot use webhooks for real-time notifications from Microsoft about SharePoint changes (such as document creation, modification, deletion, or permission updates).

The main consequence is a delay in reflecting these changes within Glean. Instead of near real-time updates, changes will only be captured during the next scheduled incremental crawl, which runs daily.

This means users may experience a delay of up to 24 hours before SharePoint content and permission updates appear in Glean.

### Why is the SharePoint REST API used and not just the Graph API for fetching SharePoint content?

Certain critical pieces of content and metadata can only be fetched from the SharePoint REST API. Currently this data cannot be fetched from the Graph API. Specifically:

-   The fetch of role assignments and access permissions for the site pages.
-   Classic web components for SharePoint sites.

The Graph API only exposes access permissions for Document Library items; hence it alone cannot be used to obtain the information needed by Glean.

Once this information is available via the Graph API, Glean will deprecate use of the SharePoint REST API.

### Why do you require Application Permissions for the Graph API? Why can't Delegated Permissions be used?

Application Permissions align with Microsoft's guidelines for application development based on the type of app Glean is. More specifically:

-   **Autonomous Operation:** Glean needs to run continuously and independently without user interaction, systematically crawling content, permissions, and activity data.
-   **Comprehensive Access:** Application permissions allow Glean to access all relevant data across the environment without being tied to individual user sessions or permissions, ensuring complete indexing capabilities.
-   **Efficiency and Scalability:** Fetching data asynchronously across the entire environment requires permissions that aren't limited by user sessions.

Delegated Permissions won't work because:

-   They restrict access to what individual users can see during their sessions, making comprehensive indexing impossible
-   They require user interaction, whereas Glean must operate independently
-   They would severely limit scalability and create delays in data availability
-   They could risk exposure of sensitive data if document access changes, as updates would depend on user sessions

For more information, please refer to: [Understanding Application vs. Delegated Permissions for Glean](/connectors/native/sharepoint/security/app-vs-delegated)
