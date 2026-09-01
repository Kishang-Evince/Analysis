---
url: "https://docs.glean.com/connectors/native/jira-onprem/"
canonical: "https://docs.glean.com/connectors/native/jira-onprem/"
title: "Jira Data Center"
description: "Learn how to integrate Jira Data Center (Jira On-Prem) connector with Glean."
fetched_at: "2026-09-01T13:29:33.304Z"
---
On this page

The Jira Data Center (DC) connector enables you to index and search content from your self-hosted Jira Data Center instance within Glean. The connector provides secure, permission-respecting access to issues, projects, and related metadata.

The connector strictly mirrors Jira’s own Role-Based Access Control (RBAC), ensuring that project and issue-level permissions are enforced in Glean search results. This allows users to find critical incidents and project data quickly without compromising security.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Objects | Description |
| --- | --- |
| **Projects** | All Jira projects accessible to the service account. |
| **Issues & Comments** | All issues and their associated comments within accessible projects. |
| **Identity** | Users, groups, and group memberships required for permission mapping. |
| **Activity** | View events and update events (via webhook) to keep the index current. |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

| Purpose | Endpoint | Permission |
| --- | --- | --- |
| Get users from group | [group/member](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-groups/#api-rest-api-2-group-member-get) | Jira Administrators |
| Find groups | [groups/picker](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-groups/#api-rest-api-2-groups-picker-get) |  |
| Get issue | [issue](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-rest-api-2-issue-issueidorkey-get)s |  |
| Get issue security level members | [issue security schemes\_members](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-security-level/#api-rest-api-2-issuesecurityschemes-issuesecurityschemeid-members-get) |  |
| Get project | [projects](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-projects/#api-rest-api-2-project-projectidorkey-get) |  |
| Get project issue security scheme | [projects/issuesecuritylevelscheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-permission-schemes/#api-rest-api-3-project-projectkeyorid-issuesecuritylevelscheme-get) | Administer Projects |
| Get project permission scheme | [projects/permissionscheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-permission-schemes/#api-rest-api-3-project-projectkeyorid-permissionscheme-get) | Administer Projects |
| Get project role for project | [projects/roles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-roles/#api-rest-api-3-project-projectidorkey-role-id-get) | Administer Projects |
| Search for issues using JQL | [search](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search#api-rest-api-3-search-get) |  |
| Get request types | [servicedesk/projectKey:s/requesttype](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-requesttype-get) |  |
| Get request type fields | [servicedesk/projectKey:s/requesttype/field](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-requesttype-requesttypeid-field-get) |  |
| Search for filters | [filter/search](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-filters/#api-rest-api-2-filter-search-get) |  |
| Get filter | [filters](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-filters/#api-rest-api-2-filter-id-get) |  |
| List projects | [project](https://docs.atlassian.com/software/jira/docs/api/REST/7.6.1/#api/2/project-getAllProjects) |  |
| Get user groups | [user](https://docs.atlassian.com/software/jira/docs/api/REST/7.6.1/#api/2/user-getUser) |  |
| Register a webhook | • Before Jira DC 10: [webhooks/1.0/webhook](https://developer.atlassian.com/server/jira/platform/webhooks/)  
• After Jira DC 10: [jira-webhook/1.0/webhooks](https://developer.atlassian.com/server/jira/platform/webhooks/) | Jira Administrators |
| Configure a webhook URL to send *Update* events | configure |  |
| Get issue security schemes for older Jira DC versions | /issue\_security\_scheme\_members |  |

## Limitations[​](#limitations "Direct link to Limitations")

-   **Unsupported objects:** Dashboards and filters are not supported due to API limitations in Jira Data Center.
-   **Access:** The connector cannot index content that the service account cannot access (e.g., restricted issues or projects).
-   **Advanced permissions:** The connector does not support advanced permission scenarios like user-custom-fields and group-custom-fields in issue security.
-   **Authentication:** OAuth is supported but not through the standard self-serve flow; basic authentication (username/password) is the default.

## Crawling and activity strategy[​](#crawling-and-activity-strategy "Direct link to Crawling and activity strategy")

Glean uses a mixed strategy of periodic crawls and real-time event updates to maintain data freshness.

| Crawl Type | Frequency | Webhook required | Notes |
| --- | --- | --- | --- |
| **Content** (Issues, Projects) | Configurable (Default: Full every 7 days, Incremental every 3 hours) | Yes | Incremental crawls capture changes since the last crawl. |
| **Identity** (Users, Groups) | Hourly | No | Captures user/group membership changes. |
| **View Activity** | Real-time | Yes (Requires Glean activity plugin) | Provides highly personalized search results based on user views. |

## API rate limit configuration[​](#api-rate-limit-configuration "Direct link to API rate limit configuration")

-   The API rate is set to 10 Queries Per Second (QPS) by default.
-   For reasonable data freshness on larger Jira instances, Glean recommends configuring the rate to at least 10 QPS.
-   You can increase this rate in the connector setup page, balancing the need for freshness against your Jira Data Center instance's capacity.

## Requirements[​](#requirements "Direct link to Requirements")

Proper setup in both Jira and Glean is essential for secure and reliable operation.

### Technical Requirements[​](#technical-requirements "Direct link to Technical Requirements")

-   **Jira version:** Jira Data Center (self-hosted) instance, version 8.0.0 or higher.
    
-   **Network:** Network connectivity must be established between Glean and your Jira DC instance. (Glean instance IPs must be allowlisted in your firewall.)
    
-   **Glean Plugin:** The Glean activity plugin must be installed in Jira (see table below for version compatibility).
    
    | Jira DC version | Required plugin version |
    | --- | --- |
    | **< 9.0.0** | ≤ 1.6.1 |
    | **≥ 9.0.0 and < 10.0.0** | 1.7.0 |
    | **≥ 10.0.0** | ≥ 2.0.0 |
    

### Service account and permissions[​](#service-account-and-permissions "Direct link to Service account and permissions")

-   Jira Data Center (DC) utilizes three key permission types relevant to connector access: **two global permissions** (Jira System Administrators and Jira Administrators) and **one project permission** (Administer Projects).
-   The Glean service account needs at least the **Jira Administrators** global permission. The built-in `jira-administrators` group grants both global permissions by default.
-   You must create a dedicated service account in Jira for the connector. The required permissions depend on your chosen setup path:

| Privilege Level | Required Group | Permissions/Scopes |
| --- | --- | --- |
| **Recommended Setup (Admin)** | Add service account to the **`jira-administrators`** group. | Grants the Jira Administrators global permission by default, which simplifies setup by enabling automatic webhook and plugin configuration. |
| **Minimum Required** (Non-Admin Path) | **Browse Issues** for all projects to be indexed, and **Browse users and groups** global permission. | Provides the essential read access required for the crawler to function without full admin privileges. |

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Perform the following steps to connect your Jira DC instance to Glean:

### 1\. Prepare credentials and service account[​](#1-prepare-credentials-and-service-account "Direct link to 1. Prepare credentials and service account")

Perform the following steps in Jira:

#### Step 1: Create a service account[​](#step-1-create-a-service-account "Direct link to Step 1: Create a service account")

1.  Sign in to Jira as an administrator.
2.  Navigate to **User Management**.
3.  Create a new user by entering a username, email, and password. This will serve as the Glean service account.

#### Step 2: Assign administrative permissions[​](#step-2-assign-administrative-permissions "Direct link to Step 2: Assign administrative permissions")

1.  Click **Edit Groups** for the service account.
2.  Add the service account to the **`jira-administrators`** group. This permission is required for the Glean Crawler to function and for automatic webhook setup.
3.  **For Issue Security:** To ensure the service account can crawl issues that have an issue security level attached, **add the service account to all relevant issue security levels**.

#### Step 3: Install the Glean activity extension[​](#step-3-install-the-glean-activity-extension "Direct link to Step 3: Install the Glean activity extension")

1.  Install the **Glean activity extension** from the Atlassian Marketplace.
2.  Follow the installation instructions provided on the Marketplace page.

#### Step 4: Configure user email visibility[​](#step-4-configure-user-email-visibility "Direct link to Step 4: Configure user email visibility")

The Jira API does not return email addresses for users whose email visibility is hidden. Without these, Glean cannot crawl user emails, which can affect identity matching and search results.

1.  In the **Jira Administration Console** (gear icon at the top right), go to **System** → **General Configuration**.
2.  Locate the **User email visibility** setting.
3.  Change it to **Show to logged in users only** or **Public**.

### 2\. Configure connector settings[​](#2-configure-connector-settings "Direct link to 2. Configure connector settings")

Navigate to the Jira Data Center connector setup page in the Glean Admin Console and provide the following details:

#### Step 5: Provide instance and access details[​](#step-5-provide-instance-and-access-details "Direct link to Step 5: Provide instance and access details")

1.  **Base URL:** Enter the server's base URL (e.g., [`https://jira.mydomain.com`](https://jira.mydomain.com)). Ensure you include the correct protocol (`http` or `https`) and exclude any trailing slash.
2.  **Additional domains:** Enter all supplementary URLs for your Jira instance as a comma-separated list (e.g., `domain1.com,domain2.com`). Do not include the base URL.
3.  **Product access group(s):** Enter the group(s) containing all Jira users (e.g., `jira-software-users`) as a comma-separated list.
4.  **API calls per second:** Enter the number of API calls per second supported by your Jira instance.

#### Step 6: Enter service account credentials[​](#step-6-enter-service-account-credentials "Direct link to Step 6: Enter service account credentials")

1.  **Service account username:** Enter the username of the service account created in Step 1.
2.  **Service account password:** Enter the password of the service account created in Step 1.
    -   *(Note: Ensure you enter the correct username, as it may differ from the email address.)*

#### Step 7: Configure network and webhook[​](#step-7-configure-network-and-webhook "Direct link to Step 7: Configure network and webhook")

1.  **Local/VPC hosting:** If your Jira instance is hosted within your VPC and is not internet-exposed:
    -   Enter the server's **Hostname** and **IP address** in the **Server Host** and **Server IP** fields.
2.  **Network/SSL configuration:** If you plan to resolve the hostname using a nameserver or update an SSL certificate, configure them under **Platform → Network management**. In this case, **you do not need to specify the Server IP**.
3.  **Glean extension confirmation:** Check the **Activity Extension installed** checkbox.

#### Step 8: Finalize setup[​](#step-8-finalize-setup "Direct link to Step 8: Finalize setup")

Click **Save** to complete the configuration. Because the service account is in the `jira-administrators` group, Glean will automatically set up the webhook and configure the extension after installation.

## FAQs[​](#faqs "Direct link to FAQs")

### When setting up the connector, why am I getting the error: "Please try again. If this message persists, contact Glean for support"?

This can occur for several reasons. Confirm the following:

-   Confirm the protocol is included along with the domain for Base URL
-   Confirm Queries per second (QPS) value is entered as a small, non-blank value - 10 can be used if you are unsure what to set
-   Confirm your Glean instance IPs have been added to the allowlist within Jira DC. **Contact Glean Support to retrieve your instance's NAT IP and public proxy external IP.**
-   Ensure that traffic is allowed across your network for your instance's NAT IP and public proxy external IP.

### Why is the connector stuck in the "Activating" status?

This status is expected for up to 15 minutes. If this status persists for more than 15 minutes, **contact Glean Support for further assistance.**

## Troubleshooting and advanced notes[​](#troubleshooting-and-advanced-notes "Direct link to Troubleshooting and advanced notes")

-   **Network and IP allowlisting:** If your Jira DC instance is behind a firewall, allowlist **Glean’s public proxy external IP/private proxy IP** and **NAT IP** to ensure crawls and health checks succeed.
-   **Issue security enforcement:** For proper Issue Security enforcement, ensure the latest compatible Glean activity plugin is installed and that the related configuration for enforcing issue security is enabled in Glean.
-   **Non-admin setup path:** The non-admin path is supported but requires **manual configuration** of webhooks and plugin endpoints by the Jira Administrator. This path is slower and requires coordination between the Jira team and the Glean team.
