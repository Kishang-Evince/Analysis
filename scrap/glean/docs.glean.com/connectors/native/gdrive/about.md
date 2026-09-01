---
url: "https://docs.glean.com/connectors/native/gdrive/about"
canonical: "https://docs.glean.com/connectors/native/gdrive/about"
title: "Google Drive overview"
description: "The Google Drive connector (referred to as GDrive) for Glean allows Glean to fetch and index content from Google Drive, ensuring that users can search and access documents they have authorized permissions to access."
fetched_at: "2026-09-01T13:29:27.547Z"
---
On this page

The Google Drive connector (referred to as GDrive) for Glean allows Glean to fetch and index content from Google Drive, ensuring that users can search and access documents they have authorized permissions to access.

-   **Authentication**: Glean requires authentication to the GDrive instance via a Service Account. This setup involves creating a Service Account in GDrive and configuring domain-wide delegation to allow the service account to impersonate users within the Google Workspace domain.
    
-   **Data Storage**: All data is stored in the GCP project within the customer's cloud account, ensuring no data leaves the customer's environment
    

**API Usage**

-   **Standard API**: Glean uses Google Drive's standard API to ingest all data

**Integration Features**

-   **Content Captured**: Glean captures folders, documents, and native file types such as Google Docs, Sheets, and Slides. It also supports content from both personal and shared drives.
    
-   **Permissions Enforcement**: Glean respects all user access permissions, ensuring users only see search results for documents they have access to. When a user clicks on a search result, they are taken to Google Drive from the Glean application, where Google Drive enforces the permissions
    

## Versions supported[​](#versions-supported "Direct link to Versions supported")

There are no specific version limitations of the GDrive connector.

## Objects supported[​](#objects-supported "Direct link to Objects supported")

The GDrive connector supports the following objects:

-   **Folders**: Glean captures and indexes folders within Google Drive.
    
-   **Documents**: This includes various types of documents stored in Google Drive.
    
-   **Native File Types**: Google Docs, Sheets, and Slides.  
    **Content from Personal and Shared Drives**: Glean supports content from both personal drives and shared drives within Google Drive.
    

## Multiple instances of an application[​](#multiple-instances-of-an-application "Direct link to Multiple instances of an application")

GDrive connector does support multiple instances. The process of creating multiple instances in GDrive differs from other instances due to the unique way GDrive handles secrets and configurations. Please contact your Glean representative for more information.

## Authentication mechanism[​](#authentication-mechanism "Direct link to Authentication mechanism")

### Connector credentials requirements[​](#connector-credentials-requirements "Direct link to Connector credentials requirements")

The Google Drive connector for Glean requires specific permissions to function correctly.

-   Glean requires authentication to the GDrive instance in order to fetch relevant information.
    
-   Authentication is done by creating a Service Account in GDrive.
    
-   Glean understands all user access permissions and strictly enforces them at the time of the query, ensuring that users are not able to see results to which they do not have access.
    
-   It's important to note that all data is stored in the customer's project in the customer's cloud account and no data leaves the customer's environment
    
-   Glean only requires READ-level permissions except to use the Google Drive API, the Glean service account needs to impersonate a user with certain privileges via [domain-wide delegation](https://knowledge.workspace.google.com/admin/apps/control-api-access-with-domain-wide-delegation). This can be the Super Admin performing this setup, or a custom admin role can be created with the required privileges and assigned to a different Google Workspace user (this can be an existing user or a new user created for this purpose).
    

**NOTE:** Super Admin privileges are not required for the Glean service account but only to set up the Glean roles for it.

### Why does Glean need Domain-wide delegation?[​](#why-does-glean-need-domain-wide-delegation "Direct link to Why does Glean need Domain-wide delegation?")

The GDrive connector requires domain-wide delegation to enable the Glean service account to impersonate users within the Google Workspace domain. This allows the connector to access and index content across all users' Google Drive accounts within the domain. Domain-wide delegation is necessary because it grants the service account the ability to perform actions on behalf of users, ensuring that Glean can fetch and index the relevant data while respecting user permissions and access controls.

Without domain-wide delegation, the connector would be limited to accessing only the data directly associated with the service account, which would not be sufficient for comprehensive indexing and search functionality across the entire organization. This setup ensures that Glean can provide accurate and complete search results based on the permissions and access levels of individual users.

**NOTE:** Green listing and red listing act as additional filters after domain-wide delegation, determining what content can be indexed

## Glean service account setup and permissions[​](#glean-service-account-setup-and-permissions "Direct link to Glean service account setup and permissions")

To use the Google Drive API, the Glean service account needs to impersonate a user with certain privileges via [domain-wide delegation](https://knowledge.workspace.google.com/admin/apps/control-api-access-with-domain-wide-delegation). This can be the Super Admin performing this setup, or a custom admin role can be created with the required privileges and assigned to a different Google Workspace user (this can be an existing user, or a new user created for this purpose).

If you would like to use the Super Admin account, simply enter the email of the Super Admin into the **Directory admin email** field in Glean. Otherwise, to create a custom admin role:

1.  Go to [https://admin.google.com/ac/roles](https://admin.google.com/ac/roles). Click **Create new role**. Name the role **Glean**. Click **Continue**.
    
2.  Select the following privileges:
    
    -   **Organization Units → Read**
    -   **Users → Read**
    -   **Groups → Read**
    -   **Services → Drive and Docs → Settings**
    -   **Domain Settings**
    -   **Services → Data Classification → Manage Labels**
    -   **Reports**
    -   **Domain Management**
3.  Click **Continue**, and then **Create Role**.
    
4.  You should be redirected to a page where you can assign users to the **Glean** role you just created. Click **Assign members**, and add a Google Workspace user. This user needs to have logged in at least once to the Google Workspace and accepted the Terms of Service. Click **Assign role**.
    
5.  Enter the email of the user from the previous step into the **Directory admin email** field in Glean.
    

### Authentication scope requirements[​](#authentication-scope-requirements "Direct link to Authentication scope requirements")

| Scope | Purpose |
| --- | --- |
| [https://admin.googleapis.com/admin/directory/v1/users](https://admin.googleapis.com/admin/directory/v1/users) | Retrieves a paginated list of either deleted users or all users in a domain. |
| [https://admin.googleapis.com/admin/directory/v1/users/{userKey}/photos/thumbnail](https://admin.googleapis.com/admin/directory/v1/users/%7B'%7BuserKey%7D'%7D/photos/thumbnail) | Retrieves the user's photo. |
| [https://admin.googleapis.com/admin/directory/v1/groups](https://admin.googleapis.com/admin/directory/v1/groups) | Retrieves all groups of a domain or of a user given a userKey (paginated). |
| [https://admin.googleapis.com/admin/directory/v1/groups/{groupKey}/members](https://admin.googleapis.com/admin/directory/v1/groups/%7B'%7BgroupKey%7D'%7D/members) | Retrieves a paginated list of all members in a group. |
| [https://admin.googleapis.com/admin/reports/v1/activity/users/all/applications/drive](https://admin.googleapis.com/admin/reports/v1/activity/users/all/applications/drive) | Retrieves a list of activities for a specific customer's account and the Google Drive application. |
| [https://www.googleapis.com/drive/v3/about](https://www.googleapis.com/drive/v3/about) | Gets information about the user, the user's Drive, and system capabilities. |
| [https://www.googleapis.com/drive/v3/files](https://www.googleapis.com/drive/v3/files) | Lists the user's files. |
| [https://www.googleapis.com/drive/v3/files/{fileId}](https://www.googleapis.com/drive/v3/files/%7B'%7BfileId%7D'%7D) | Gets a file's metadata or content by ID. |
| [https://www.googleapis.com/drive/v3/files/{fileId}/export](https://www.googleapis.com/drive/v3/files/%7B'%7BfileId%7D'%7D/export) | Exports a Google Workspace document to the requested MIME type and returns exported byte content. |
| [https://www.googleapis.com/drive/v3/files/{fileId}/comments](https://www.googleapis.com/drive/v3/files/%7B'%7BfileId%7D'%7D/comments) | Lists a file's comments. |
| [https://www.googleapis.com/drive/v3/files/{fileId}/revisions](https://www.googleapis.com/drive/v3/files/%7B'%7BfileId%7D'%7D/revisions) | Lists a file's revisions. |
| [https://www.googleapis.com/drive/v3/files/{fileId}/permissions](https://www.googleapis.com/drive/v3/files/%7B'%7BfileId%7D'%7D/permissions) | Lists a file's or shared drive's permissions. |
| [https://docs.googleapis.com/v1/documents/{documentId}](https://docs.googleapis.com/v1/documents/%7B'%7BdocumentId%7D'%7D) | Gets the latest version of the specified document. |
| [https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}](https://sheets.googleapis.com/v4/spreadsheets/%7B'%7BspreadsheetId%7D'%7D) | Returns the spreadsheet at the given ID. |
| [https://www.googleapis.com/drive/v3/drives](https://www.googleapis.com/drive/v3/drives) | Lists the user's shared drives. |
| [https://www.googleapis.com/drive/v3/drives/{driveId}](https://www.googleapis.com/drive/v3/drives/%7B'%7BdriveId%7D'%7D) | Gets a shared drive's metadata by ID. |

## Setup[​](#setup "Direct link to Setup")

### Pre-setup if not deploying in Glean GCP[​](#pre-setup-if-not-deploying-in-glean-gcp "Direct link to Pre-setup if not deploying in Glean GCP")

See document ["**GDrive Connector Pre-Setup Guide for non-GCP Customers**"](/connectors/native/gdrive/setup-non-gcp)

### Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

The user setting up this connector must be a [Google Super Admin](https://knowledge.workspace.google.com/admin/users/prebuilt-administrator-roles).

### Add API scopes[​](#add-api-scopes "Direct link to Add API scopes")

1.  Go to the [Domain-wide Delegation section in Google Admin Console](https://admin.google.com/ac/owl/domainwidedelegation). You'll need to be signed in as an admin.
    
2.  Click **Add new** and paste the 21-digit **Unique ID** (provided during the connector setup in the Glean instance) into the **Client ID** field viewed in the Gean setup panel (see example below of a Client ID).
    
    **Note:** if you have already connected Google Tools (Google Calendar and Gmail) with this same Client ID, you should instead click 'Edit' on the existing API client and then add the additional scopes below.
    
3.  Copy and paste the following into the **OAuth scopes (comma-delimited)** field and then click **Authorize**: [`https://www.googleapis.com/auth/admin.directory.group.readonly,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/drive.readonly,https://www.googleapis.com/auth/admin.reports.audit.readonly,https://www.googleapis.com/auth/drive.admin.labels.readonly`](https://www.googleapis.com/auth/admin.directory.group.readonly,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/drive.readonly,https://www.googleapis.com/auth/admin.reports.audit.readonly,https://www.googleapis.com/auth/drive.admin.labels.readonly)
    

### Add additional Google Drive domains (optional)[​](#add-additional-google-drive-domains-optional "Direct link to Add additional Google Drive domains (optional)")

Glean will automatically crawl all users and documents in the domain belonging to the directory admin email. If you would like to include additional domains from your Google Workspace account, follow these steps:

#### (Recommended) Fetch additional domains from your Google Workspace account.[​](#recommended-fetch-additional-domains-from-your-google-workspace-account "Direct link to (Recommended) Fetch additional domains from your Google Workspace account.")

1.  In the [admin role](https://admin.google.com/ac/roles) you created, add the following privileges:
    
    -   Domain Settings
    -   Domain Management
2.  In the [API client](https://admin.google.com/ac/owl/domainwidedelegation) you created, add the following to the **OAuth scopes (comma-delimited)** field: [https://www.googleapis.com/auth/admin.directory.domain.readonly](https://www.googleapis.com/auth/admin.directory.domain.readonly)
    
3.  Click **Retrieve domains** in Glean to fetch the domains in your Google Workspace account. You can then select the domains you want to include in Glean.
    

#### (Alternative) Manually add additional domains[​](#alternative-manually-add-additional-domains "Direct link to (Alternative) Manually add additional domains")

Enter the domains you want to include into the text box in Glean, separated by commas, without any additional spaces. For example: `example.com,example.org`.

Finally, click **Save** in Glean.

### Known limitations[​](#known-limitations "Direct link to Known limitations")

-   [Google Drive Support file types](https://developers.google.com/workspace/drive/api/guides/mime-types)
    
-   GDrive crawl speed is dependent on the API rate limits, which by default, is [12,000QPM](https://developers.google.com/drive/api/guides/limits) (or 200 QPS)
    
-   Glean doesn't crawl items identified as code in GDrive, unless it's the following formats:
    
    -   text/markdown
    -   text/x-markdown
    -   text/x-web-markdown
    -   application/vnd.google.colaboratory
    -   For a full list of code types excluded, please contact your Glean representative
-   For documents with a body size larger than 16MB in GDrive, Glean will only index the document title and metadata, not the body.
    

### Content[​](#content "Direct link to Content")

-   Folders
-   Documents
-   Native file types such as Google Docs, Sheets, and Slides
-   Supported files in GDrive

### Identity[​](#identity "Direct link to Identity")

-   **Users**: Information about users within the Google Workspace domain.
-   **Groups**: Details about groups within the domain.
-   **Memberships**: Information about group memberships, indicating which users belong to which groups.

The identity crawl operates with the following configurations:

-   **Incremental Identity Crawls**: These are performed to capture changes since the last crawl.
-   **Full Identity Crawls**: These are conducted periodically to ensure all identity data is up-to-date.

### Activity[​](#activity "Direct link to Activity")

-   **Adds**: New files or folders added to Google Drive.
-   **Updates**: Modifications made to existing files or folders.
-   **Permissions Changes**: Changes in file or folder sharing permissions.
-   **Deletions**: Files or folders that have been deleted.
-   **View Activity**: Events indicating when a file or folder has been viewed.

The detailed list below of GDrive API items Glean checks and would trigger an activity crawl. **Note:** If an application or user modifies the data within the file, but does not affect any of the items listed below, then Glean will not be notified of the change and it will not be re-recrawled

-   add\_to\_folder
-   create
-   delete
-   edit
-   move
-   remove\_from\_folder
-   rename
-   untrash
-   sheets\_import\_range
-   trash
-   upload
-   change\_acl\_editors
-   change\_document\_access\_scope
-   change\_document\_access\_scope\_hierarchy\_reconciled
-   change\_document\_visibility
-   change\_document\_visibility\_hierarchy\_reconciled
-   sheets\_import\_range\_access\_change
-   team\_drive\_membership\_change
-   team\_drive\_settings\_change
-   change\_user\_access
-   change\_user\_access\_hierarchy\_reconciled
-   shared\_drive\_membership\_change
-   shared\_drive\_settings\_change
-   change\_owner

The activity crawl operates with the following configurations:

-   **Incremental Activity Crawls**: These are performed every 10 minutes to capture recent changes.
-   **Full Activity Crawls**: These are conducted periodically to ensure all activity data is up-to-date.

## Rate limits[​](#rate-limits "Direct link to Rate limits")

-   **Queries per Second (QPS)**: The default rate limit is set to 30 queries per second per user.
-   **Quota Limits**: The default quota limit is 12,000 queries per minute (QPM), which translates to 200 QPS
-   [Google Cloud documentation on requesting higher quotas](https://cloud.google.com/docs/quota#requesting_higher_quota)
-   To update rate limit configuration settings in Glean, please reach out to support

### Update frequency[​](#update-frequency "Direct link to Update frequency")

Content updates for the GDrive connector in Glean can happen quite rapidly, depending on the type of update and the configuration settings. Here are the key areas:

-   **Activity Reports**: Adds, updates, and permissions changes are crawled every 10 minutes. This means that any new files, modifications to existing files, or changes in sharing permissions are detected and processed quickly.
    
-   **People / Identity Crawls**: Changes to group memberships are picked up by the identity crawl, which runs every hour. This ensures that any updates to user groups and their permissions are reflected promptly.
    
-   **Incremental Crawls**: These occur every 3 hours to provide additional reliability beyond the minute-by-minute activity reports.
    
-   **Full Crawls**: The frequency of full crawls can be configured, but they are generally less frequent than incremental crawls at 28 days
    

For the most up-to-date crawler refresh information, please refer to [Crawling frequency](/connectors/crawling-refresh-rates)

### How the crawl works[​](#how-the-crawl-works "Direct link to How the crawl works")

The GDrive crawler follows the traditional crawler strategy including utilizing the Google Drive API and the following ways to get and update data:

-   **Identity Crawl:** updating and adding of People data including users, groups, and other information
-   **Activity Crawl:** Adds, updates, and permissions changes to content
-   **Webhooks:** are messages sent by the application to notify Glean of changes in real-time and then Glean either initiates crawl or picks up the change on the next crawl
-   **Content Crawls:** Full crawls the entire defined scope of the application whereas incremental crawls only capture the changes from the previous full or incremental crawl

## Content configuration[​](#content-configuration "Direct link to Content configuration")

**Note:** If green listing options are enabled, only content from the greenlisted content will be indexed. If red listing options are enabled all content in the red list will be removed. If both rules are applied to the same piece of content, then the content will NOT be indexed as the red listing rule takes priority

The rules below should be used minimally to preserve the enterprise search experience, as most end-users expect to find all content. Most customers do not apply any rules, or apply red listing rules sparingly for sensitive folders

### Inclusion rules options[​](#inclusion-rules-options "Direct link to Inclusion rules options")

These options can be configured by the Glean Admin and are self-service in the Glean application.

-   **Shared drives.** This takes in a shared drive ID list. Glean only crawls documents/folders inside these shared drives.

### Exclusion rules options[​](#exclusion-rules-options "Direct link to Exclusion rules options")

These options can be configured by the Glean Admin and are self-service in the Glean application.

-   **Containers** - Takes in a list of folder IDs or Shared Drive IDs.
    
    -   **Note:** Glean *cannot* exclude folder IDs recursively. Meaning, that if a folder (A) has a subfolder (B) inside of it, Glean will not automatically exclude the subfolder if only folder A is added to the exclusion rule. Glean needs both folder IDs.
    -   **Note:** Glean *can* support recursive exclusions for Shared Drives. If there are folders inside of an excluded shared drive, Glean can exclude everything inside of these folders without needing the individual IDs.
-   **Shared Drives.** Excludes all drives from the crawl with a name matching the prefix.
    
-   **Google Group.** This function takes in a Google group name. For everyone in this Google group, Glean will exclude all the files they own.
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If a user can not view a document that you believe should be in Glean's search results, please check the verification pane and gather a snapshot of the user accessing in GDrive before contacting support.
