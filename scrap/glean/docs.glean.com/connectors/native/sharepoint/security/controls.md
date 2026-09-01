---
url: "https://docs.glean.com/connectors/native/sharepoint/security/controls"
canonical: "https://docs.glean.com/connectors/native/sharepoint/security/controls"
title: "Permissions and security controls"
description: "Available alternatives for when Sites.FullControl.All and/or Files.ReadWrite.All cannot be used in your company environment"
fetched_at: "2026-09-01T13:29:41.176Z"
---
On this page

Glean's integration with Microsoft SharePoint utilizes both the Microsoft Graph API and SharePoint REST API to index your content. As part of our security practices, Glean requests only the minimum permission scopes required by these APIs to perform necessary operations.

When working with Microsoft's APIs, the following permission scopes are required for standard read functionality for certain API endpoints:

-   **Graph API - `Sites.FullControl.All`:**  
    Required to read permission changes, which ensures Glean only shows content to users who have appropriate access in the source system
-   **Graph API - `Files.ReadWrite.All`:**  
    Required to rotate webhook secrets on expiry, enabling Glean to process content changes as they occur
-   **SharePoint REST API - `Sites.FullControl.All`:**  
    Required to read site content and fetch role assignments for accurate permission mapping

We recognize that these permission requirements may not align with your organization's Security Guidelines or Standard Operating Procedures (SOPs).

For more information on why these permissions are necessary, please refer to [SharePoint Permission Design & Management at Glean](/connectors/native/sharepoint/security/permission-design).

This document provides alternative approaches to enable Glean's integration while addressing various security considerations. Each option includes an analysis of potential limitations and associated risks to help your team make an informed decision based on your specific requirements.

* * *

## Supported controls and alternatives[​](#supported-controls-and-alternatives "Direct link to Supported controls and alternatives")

Some security teams may not be comfortable providing Glean with either the `Sites.FullControl.All` and/or `Files.ReadWrite.All` Graph API permissions required to integrate with SharePoint.

To constrain the scope of data that the SharePoint crawler has access to and the tools it can perform via the Graph API and SharePoint REST API, there are multiple methods of control that can be leveraged.

**Recommended controls:**

-   Crawling Restrictions
-   IP Restrictions (Conditional access)
-   Extended monitoring and alerting with Microsoft Purview

**Other supported controls (not recommended):**

-   `Sites.Selected` permission for Graph API access
-   `Sites.Selected` permission for SharePoint REST API access

### Crawling restrictions[​](#crawling-restrictions "Direct link to Crawling restrictions")

note

Content restrictions can adversely affect the usefulness of Glean for your users as it means that the excluded content will not be searchable in Glean; despite remaining accessible at the source.

tip

Glean has built-in DLP reporting that can assist security teams with identifying content that is too broadly accessible throughout the organization so that it can be remediated; negating the need to restrict content.

Glean supports a variety of configurations for the SharePoint connector that allow your organization to restrict the content that is crawled and brought into the Glean search index.

These restrictions include:

-   **Greenlist (allowlist) sites to be explicitly crawled** The SharePoint crawler will only fetch content from the site URLs set by your organization.
-   **Redlist (blocklist) sites to be explicitly excluded from crawling** The SharePoint crawler will fetch content from all SharePoint sites EXCEPT the site URLs set by your organization.
-   **User Group / Entra ID Group** SharePoint content will only be visible to a user in Glean if they are a member of a specified Entra ID group.

For more information on the restrictions supported, and how to configure them, please refer to:

-   [Supported Crawling Restrictions for SharePoint](/connectors/native/sharepoint/restrictions)

* * *

### IP restrictions (Conditional access)[​](#ip-restrictions-conditional-access "Direct link to IP restrictions (Conditional access)")

note

This feature requires a license for [Microsoft Entra Workload ID](https://www.microsoft.com/en-au/security/business/identity-access/microsoft-entra-workload-id). Please contact your Microsoft representative for more information.

#### Overview[​](#overview "Direct link to Overview")

Using Entra ID Conditional Access, you can restrict usage of the App Registration (and associated certificate) created for the Glean SharePoint crawler to only be permitted from the IP range of your Glean tenant.

This involves:

-   Adding the static IP address of NAT gateway used by the crawlers in your Glean tenant as a location within Entra ID.
-   Adding a new Conditional Access policy targeting specific source workload identities corresponding to the Service Principal(s) created for the Glean SharePoint crawler.
-   Excluding the location created in step 1 from the Conditional Access policy.
-   Setting the policy to **block** as a tool.

#### Configuration[​](#configuration "Direct link to Configuration")

tip

For detailed information on how to configure a Conditional Access policy involving a Workload Identity, please refer to the following Microsoft help article: [Conditional Access for Workload Identities (learn.microsoft.com)](https://learn.microsoft.com/en-us/entra/identity/conditional-access/workload-identity)

tip

You will need the static IP address assigned to the crawler infrastructure in your Glean tenant to proceed. As this IP address is different for every Glean deployment, please contact Glean support to obtain this information.

### Step 1. Access the Microsoft Entra admin center

1.  Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/) with the Conditional Access Administrator role (or above).
2.  Navigate to the [Conditional Access section](https://entra.microsoft.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Overview): **Protection** → **Conditional Access**

### Step 2. Create a new named location

1.  In the Conditional Access section, navigate to **Named locations**.
2.  Click the **+IP ranges location** at the top to add a new location.
3.  Provide a name for the location, for example: `Glean SharePoint Crawler`.
4.  Click the **+** button to add a new IP range. Enter the static IP address(es) of your Glean tenant provided by Glean support.
5.  Click **Save** to create the location.

### Step 3. Create a new Conditional Access policy

1.  In the Conditional Access section, navigate to **Policies**.
    
2.  Click the **New policy** button at the top.
    
3.  Provide a name for the policy, for example: `IP Restrictions - Glean Crawler`.
    
4.  Under **Assignments**, select **Users or workload identities**.
    
    1.  Under **What does this policy apply to?**, select **Workload identities** from the dropdown.
    2.  Under **Include**, choose **Select service principals**, and select the names of all App Registrations created for the Glean SharePoint crawler.
    
    tip
    

If you do not see "workload identities" mentioned, it is likely that you do not have a license for Microsoft Entra Workload ID. Please contact your Microsoft representative for more information. :::

5.  Under **Target resources** → **Resources (formerly cloud apps)** → **Include**, select **All resources (formerly 'All cloud apps')**.
    
    tip
    

The policy applies only when a service principal requests a token. :::

6.  Under **Network** (formerly Locations), set the **Configure** option to **Yes**. Select **Include** → \*\* Selected networks and locations\*\*, then select the location created earlier.
    
7.  Under **Grant**, select **Block access** as a tool.
    
8.  Under **Enable policy**, select either **Report-only** or **On**.
    
    -   **Report-only** will not block access, but will log all requests to the location in the Microsoft Entra audit logs. This is useful for checking to ensure the policy is working as expected before enforcing it.
    -   **On** will block access to the location immediately.
    
9.  Click **Create** to create the policy.
    

### Step 4. Test the policy

The **What If** feature can be used to test the policy from different IP addresses to ensure it is working as expected.

1.  In the Conditional Access section, navigate to **Policies**.
2.  Click the **What If** button at the top.
3.  For **Users or workload identities**, select ONE of the service principals created for the Glean SharePoint crawler.
4.  For the **IP address** and **Country** fields, fill in a random IP address and country, e.g. `192.0.2.1` and `United States`. Alternatively, enter the IP address of your Glean tenant and the country it is hosted in.
5.  Click **What If** to test the policy.

* * *

### Monitoring with Microsoft Purview[​](#monitoring-with-microsoft-purview "Direct link to Monitoring with Microsoft Purview")

#### Overview[​](#overview-1 "Direct link to Overview")

Microsoft Purview can be used to monitor the Glean SharePoint crawler and alert on any attempts to misuse granted permissions to write data back to SharePoint.

Glean recommends configuring monitoring at three levels:

1.  Application-specific activity
2.  Endpoint-specific activity
3.  Write activities

#### Configuration[​](#configuration-1 "Direct link to Configuration")

tip

You will need the **Application ID** of each of the App Registrations created for the Glean SharePoint crawler in Entra ID to proceed.

### Step 1. Access the Microsoft Purview Compliance Portal

1.  Sign in to the [Microsoft Purview Compliance Portal](https://purview.microsoft.com/).
2.  Navigate to **Solutions** → **Audit** → **Search**.
3.  If prompted, select **Start recording user and admin activity**. This is required for logs to captured.

### Step 2. Review audit logs for the SharePoint crawler

1.  Ensure you are in the **Audit Search** section of Purview.
    
2.  For the **Keyword search** filter, enter the **Application ID** of the App Registration created for the Glean SharePoint crawler in Entra ID.
    
3.  Review the audit logs displayed. Pay particular attention to the following activities:
    
    -   **File accessed:** Logs when files or pages are read.
        -   This is a common activity from the SharePoint crawler and is expected.
    -   **List accessed:** Logs list-level operations, such as reading items.
        -   This is a common activity from the SharePoint crawler and is expected.
    -   **Permissions viewed or changed:** Identifies whether Glean is accessing or modifying permissions.
        -   Glean should only be accessing permissions. There should be no activities where permissions are being modified.

tip

The Glean crawler should not be performing any activities that would modify content or write back to the tenant. E.g. Activities such as "Deleted site", "File created", etc, should not be present in the audit logs from the SharePoint crawler.

### Step 3. Monitor specific API-endpoints

1.  Review the list of [API-endpoints](/connectors/native/sharepoint/security/api) that the Glean SharePoint crawler is configured to use.
    
2.  For each API-endpoint, cross reference the Purview audit logs for activities related to these endpoints.
    
    -   Verify that all activities are read-only operations.
    -   The **Keyword search** field can be used to search for specific endpoints.
    
    tip
    

Focus on any API-endpoints that are marked as requiring a `ReadWrite` or `FullControl` permission. E.g. `https://graph.microsoft.com/v1.0/subscriptions/<subscriptionsId>/reauthorize` :::

note

A HTTP POST activity is not indicative of a write operation. Some API-endpoints expect a HTTP POST method to fetch data instead of a GET request. Additionally, a POST request is required for Glean to create and reauthorize webhook subscriptions.

### Step 4. Configure alerts for Write activities

1.  In the Purview portal, [navigate to **Solutions** → **Compliance alerts**](https://purview.microsoft.com/compliancealerts/compliancealerts).
2.  Click the **View alert policies in Defender** button: This will open the [Microsoft 365 Defender portal](https://security.microsoft.com/alertpoliciesv2) where you will be able to configure new alerts.
3.  Create a new alert policy for each high-risk write activity you wish to monitor.

* * *

### Sites.Selected (Graph API)[​](#sites-selected-graph-api "Direct link to Sites.Selected (Graph API)")

warning

Glean already requests the minimum permissions required to fetch and update SharePoint content and permissions.

Alternative permissions discussed here will begin to restrict Glean's ability to function correctly, introducing other risks that will need to be considered. These will be highlighted so that you can make an informed decision.

Be advised that there is currently no risk-free solution to fetching SharePoint content with narrow scopes due to the way Microsoft has structured the minimum permissions required for certain API endpoints. We are confident this will be rectified in time, and encourage all customers to raise this with their Microsoft representative as an area of concern.

#### Overview[​](#overview-2 "Direct link to Overview")

The `Sites.Selected` permission replaces **both** the global `Sites.FullControl.All` and `Files.ReadWrite.All` permissions for the Graph API.

`Sites.Selected` **still** requires the `FullControl` permission, but unlike before, this is granted at a site-level to each site and sub-site individually, rather than at a global level.

While `Sites.Selected` alleviates the need for global `Sites.FullControl.All` and `Files.ReadWrite.All` permissions, it comes with significant drawbacks as a result.

`Sites.Selected` **replaces** the following permissions:

-   `Sites.FullControl.All`
-   `Files.Read.All`
-   `Files.ReadWrite.All`

The following permissions are still required alongside `Sites.Selected`:

-   `User.Read.All`
-   `GroupMember.Read.All`
-   `Reports.Read.All`
-   `Member.Read.Hidden`
-   `FullControl` (site level)

`User.Read.All` and `GroupMember.Read.All` are required for Glean to obtain and enforce document and site permissions. `Member.Read.All` is also used to obtain and enforce document/site permissions for any group member that may have been marked as 'hidden' in Entra ID.

`Reports.Read.All` is used to verify crawling state and progress, and to ensure that your search infrastructure is correctly scaled (SharePoint is one of the largest connectors typically connected to Glean).

#### Comparison table[​](#comparison-table "Direct link to Comparison table")

| Tool | `Sites.FullControl.All` | `Sites.Selected`  
(with site-specific FullControl) |
| --- | --- | --- |
| Adheres to Microsoft Best Practices for Apps requiring access to permissions | Yes | Yes |
| Supported by Glean | Yes | Yes |
| Processing frequency for content updates | <2 hours (can vary) | 24 hours |
| Processing frequency for permission-only updates | <2 hours (can vary) | 24 hours |
| Availability of Signals & Metadata to enhance Search Rankings | Excellent | Poor |
| Automatic detection of sites and sub-sites to scan | Yes | No |
| Management Overhead | Low | Very High |
| Permission Scope | Wide | Narrow |

#### Limitations[​](#limitations "Direct link to Limitations")

warning

Using `Sites.Selected` will **heavily** impact the end-user experience for both Search and Glean, and may have alternative impacts to your security posture.

Glean generally recommends against its use.

**🚨 Changes to sites/documents will take up to 24 hours to be reflected in Glean.**

-   `Sites.Selected` prevents Glean from leveraging webhook subscriptions to be notified of changes within SharePoint when they occur.
-   Without webhook subscriptions, changes in SharePoint will only be reflected in Glean once a scheduled incremental crawl takes place every 24 hours. **This includes changes to site and file permissions**.

**🚨 Search Ranking of SharePoint results will be poor compared to other connectors.**

-   `Sites.Selected` prevents Glean from accessing activity and insights data for SharePoint content. This data is used extensively for ranking results in search.
-   Without access to activity and insights data, you will notice a **significant** degradation in search quality for SharePoint results. SharePoint results will typically be ranked lower than results from other connectors where activity data is able to be accessed.

**🚨 You must manually authorize every site AND sub-site that you want to be available in Glean.**

-   `Sites.Selected` prevents Glean from discovering sites and site content that need to be fetched.
-   Every site and sub-site must be explicitly added to the `Sites.Selected` permission set by your M365 administrator AND must be added to a list of sites to crawl in the Glean UI.
    -   Without the former step, Glean will not have the correct permissions to fetch content from a site.
    -   Without the latter step, Glean has no way of knowing what sites to crawl.
-   This creates a high degree of friction and can hinder expansion of Glean within your organization.

#### Configuration[​](#configuration-2 "Direct link to Configuration")

The setup process for `Sites.Selected` differs from the standard setup steps for SharePoint.

-   Refer to [Configure SharePoint using `Sites.Selected`](/connectors/native/sharepoint/setup-selected-sites).

* * *

### Sites.Selected (SharePoint REST API)[​](#sites-selected-sharepoint-rest-api "Direct link to Sites.Selected (SharePoint REST API)")

#### Overview[​](#overview-3 "Direct link to Overview")

The `Sites.Selected` permission replaces the global `Sites.FullControl.All` permission for the SharePoint REST API.

`Sites.Selected` **still** requires the `FullControl` permission, but unlike before, this is granted at a site-level to each site and sub-site individually, rather than at a global level.

`Sites.Selected` **replaces** the following permissions:

-   `Sites.FullControl.All`

The following permissions are still required alongside `Sites.Selected`:

-   `FullControl` (site level)

`FullControl` for the SharePoint REST API is mandatory at some level (either site or global) due to limitations in the SharePoint REST API: It is the minimum permission scope needed to read data from certain API endpoints that are critical for Glean functionality (permissions mapping).

If `Read` permission is used instead of `FullControl`, the API returns a HTTP 403 Unauthorized error; preventing any data from being fetched.

-   → More information: [About SharePoint Connector Permissions - SharePoint REST API](/connectors/native/sharepoint/security/permissions#sharepoint-rest-api-permissions)

#### Comparison table[​](#comparison-table-1 "Direct link to Comparison table")

| Tool | `Sites.FullControl.All` | `Sites.Selected`  
(with site-specific FullControl) |
| --- | --- | --- |
| Adheres to Microsoft Best Practices for Apps requiring access to permissions | Yes | Yes |
| Supported by Glean | Yes | Yes |
| Automatic detection of sites and sub-sites to scan | Yes | No |
| Management Overhead | Low | Very High |
| Permission Scope | Wide | Narrow |

#### Limitations[​](#limitations-1 "Direct link to Limitations")

**🚨 You must manually authorize every site AND sub-site that you want to be available in Glean.**

-   `Sites.Selected` prevents Glean from discovering sites and site content that need to be fetched.
-   Every site and sub-site must be explicitly added to the `Sites.Selected` permission set by your M365 administrator AND must be added to a list of sites to crawl in the Glean UI.
    -   Without the former step, Glean will not have the correct permissions to fetch content from a site.
    -   Without the latter step, Glean has no way of knowing what sites to crawl.
-   This creates a high degree of friction and can hinder expansion of Glean within your organization.

#### Configuration[​](#configuration-3 "Direct link to Configuration")

The setup process for `Sites.Selected` differs from the standard setup steps for SharePoint.

-   Refer to [Configure SharePoint using `Sites.Selected`](/connectors/native/sharepoint/setup-selected-sites).
