---
url: "https://docs.glean.com/connectors/native/seismic/"
canonical: "https://docs.glean.com/connectors/native/seismic/"
title: "Seismic"
description: "Index published Seismic content profiles and library documents in Glean with the Reporting API, OAuth 2.0, and permission-aware search."
fetched_at: "2026-09-01T13:29:40.245Z"
---
On this page

The Seismic connector indexes published content profiles so people can search them in Glean. Permissions are enforced at query time down to the record level, so results match what each user may access in Seismic. The connector uses Seismic’s **Reporting API** and only surfaces published library content—not workspace or unpublished files.

## Supported features and limitations[​](#supported-features-and-limitations "Direct link to Supported features and limitations")

The connector focuses on **published** content profiles and **library** documents. It uses incremental crawls to stay current and does not use webhooks.

### Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object type | Description |
| --- | --- |
| Content profiles | Published information in Seismic content profiles |
| Library documents | Documents within content profiles (library only) |

### Key features[​](#key-features "Direct link to Key features")

-   **Content profiles:** Indexes published content profiles and library documents.
-   **Permission enforcement:** Applies Seismic permissions so users only see allowed content.
-   **Custom properties:** You can use Seismic custom properties to grant document access to specific groups in Glean.
-   **Incremental crawling:** Syncs new and updated items efficiently.
-   **Indexing controls:** You can narrow what is crawled and fully indexed:
    -   **File extension allowlist:** Specify file types (for example `pdf`, `docx`, `pptx`) whose content Glean should fully index.
    -   **Folder allowlist:** Provide Library folder IDs that Glean should crawl **exclusively**.
    -   **Folder denylist:** Provide Library folder IDs to **exclude** from crawling.

### Limitations[​](#limitations "Direct link to Limitations")

-   **Content scope:** Only **published content profiles and library documents** are indexed. Workspace files and unpublished content are excluded.
-   **Embedded documents:** Embedded items (for example Google Slides exported as PowerPoint) appear as links only; their content is not crawled.
-   **User visibility:** Because of Seismic API behavior, **published content profile links can appear for all Seismic users in Glean**. Users still cannot open content in Seismic without native access.
-   **Updates:** There are no webhooks; updates are picked up on the crawl schedule.
-   **Licensing:** The **Seismic Reporting API** may require a specific Seismic license.

### Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Crawl type | Full crawl | Incremental crawl | People data | Activity | Update rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Content profile | Yes | Yes | No | Yes | Scheduled | No | Published content profiles only; activity via API |
| Library documents | Yes | Yes | No | No | Scheduled | No | Library documents only (not workspace); incremental supported |

You can configure folder **allowlists** (include) and **denylists** (exclude) at the library level to control which folders are crawled.

### Results display[​](#results-display "Direct link to Results display")

Seismic results in Glean show titles, metadata, and links to Seismic. Embedded documents appear as links; their bodies are not indexed.

## Requirements[​](#requirements "Direct link to Requirements")

You need the right Seismic API access, OAuth app permissions, and Glean admin access before you connect the connector.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   **API access:** Your Seismic tenant must have the **Reporting API** enabled, which may require a specific Seismic license.
-   **Seismic permissions:** You need **admin** access in Seismic to register and configure OAuth 2.0 apps.
-   **Glean access:** You need admin privileges in the Glean **Admin console**.

### Scope[​](#scope "Direct link to Scope")

The Seismic app must be granted the following OAuth scopes:

-   `seismic.user.view`
-   `seismic.user.manage`
-   `seismic.configuration.view`
-   `seismic.configuration.manage`
-   `seismic.reporting`
-   `seismic.delivery`
-   `seismic.library.view`
-   `seismic.library.manage`
-   `seismic.workspace.view`
-   `seismic.workspace.manage`

note

Do not use `seismic.self.view` or `seismic.self.manage`; they are not sufficient for the connector.

Also ensure:

-   The authenticated user can access the content profiles you want to index.
-   The Reporting API is enabled for your Seismic account.

## Setup[​](#setup "Direct link to Setup")

Most setup happens in Seismic (app registration) and in the Glean **Admin console** (tenant, client credentials, and tokens).

-   Enter the **Client ID** and **Client secret** when you add the Seismic connector in Glean.
-   Complete the OAuth 2.0 authorization code flow so Glean can access Seismic.

### Register a Seismic app for crawling[​](#register-a-seismic-app-for-crawling "Direct link to Register a Seismic app for crawling")

To obtain the client ID and client secret in your Seismic tenant:

1.  Create and register a new app in the [Seismic apps console](https://apps.seismic.com/) for your tenant. Name the app so it is clear it is for Glean (for example **Glean search integration**).
    
2.  Set up the authorization code flow:
    
    1.  In the **Authentication** tab, select **OAuth2 - Authorization Code Flow**.
        
    2.  On the **OAuth2 Information** page, set the redirect URL to your tenant URL (for example `https://yourtenant.seismic.com/`). The client ID is generated automatically. Generate the **Client secret** (it is hidden at first—show and copy it when ready).
        
    3.  Under scopes, select exactly:
        
        -   `seismic.user.view`
        -   `seismic.user.manage`
        -   `seismic.configuration.view`
        -   `seismic.configuration.manage`
        -   `seismic.reporting`
        -   `seismic.delivery`
        -   `seismic.library.view`
        -   `seismic.library.manage`
        -   `seismic.workspace.view`
        -   `seismic.workspace.manage`
        
3.  In the Glean **Admin console**, enter values from the steps above:
    
    1.  **Tenant name:** Enter only the tenant subdomain (do not include `seismic.com`). For example, if your site is `https://yourtenant.seismic.com`, enter `yourtenant`.
    2.  **Client ID:** Paste the client ID from Seismic.
    3.  **Client secret:** Paste the client secret from Seismic.

### Get access and refresh tokens[​](#get-access-and-refresh-tokens "Direct link to Get access and refresh tokens")

To obtain access and refresh tokens for Glean:

1.  Read Seismic’s [Authorization code login](https://developer.seismic.com/seismicsoftware/reference/authorization-code-login) documentation for the POST request details.
2.  Open the authorization URL from [Get the user’s authorization](https://developer.seismic.com/seismicsoftware/reference/get-tokens-using-authorization_code-flow). Separate scopes with a **space** in the query string.

warning

When you authorize, grant **all** scopes listed under [Scope](#scope). The `scope` query parameter must match **exactly**:

```
scope=seismic.reporting seismic.workspace.manage seismic.workspace.view seismic.library.manage seismic.library.view seismic.delivery seismic.configuration.manage seismic.configuration.view seismic.user.manage seismic.user.view offline_access
```

If any scope is missing, crawling can fail.

3.  After you sign in, the redirect URL includes an authorization `code` (for example `https://yourtenant.seismic.com/app?code=...`).
    
4.  Exchange the code for tokens:
    
    1.  Follow [Exchange the authorization code for an access token](https://developer.seismic.com/seismicsoftware/reference/authorization-code-get-the-token).
        
    2.  Enter the required fields and click **Try it**.
        
    3.  Copy the **access token** and **refresh token** from the response.
        
    4.  In Glean, paste the access token into **Access Token** and the refresh token into **Refresh Token**.
        
5.  Click **Save** in Glean.
    

## Optional: manage indexed data[​](#optional-manage-indexed-data "Direct link to Optional: manage indexed data")

After the connector is connected, you can control what is indexed and how document access maps to groups in Glean.

### Configure content indexing by file extension[​](#configure-content-indexing-by-file-extension "Direct link to Configure content indexing by file extension")

Only file types you list here get their **full file body** indexed.

1.  In the Glean **Admin console**, open the **Seismic** connector → **Manage data** tab.
    
2.  Expand the **File Extensions** section.
    
3.  In **Greenlisted File Extensions** (your file-extension allowlist), enter a comma-separated list, for example `pdf, docx, pptx`.
    
4.  Run a fresh crawl so existing documents pick up the change.
    

### Configure folder allowlists and denylists[​](#configure-folder-allowlists-and-denylists "Direct link to Configure folder allowlists and denylists")

Use library folder rules to include or exclude folders from the crawl.

1.  **Retrieve folder IDs:** In Seismic, open the folder. The folder ID is the path segment immediately after `/LIST/` in the browser URL.
    
    **Example URL:** `https://<domain>.seismic.com/app#/contentmanager/main/.../<FolderID>/LIST/title`  
    **Folder ID:** `<FolderID>`
    
2.  **Folder allowlist (inclusion):** In **Library folder inclusion rules**, add folder IDs Glean should crawl **exclusively**. If you leave this empty, all folders are crawled by default.
    
3.  **Folder denylist (exclusion):** In **Library folder exclusion rules**, add folder IDs to **exclude**. If the allowlist has any entries, exclusion rules are ignored.
    

Click **Save** when you are done.

### Grant document access with custom properties[​](#grant-document-access-with-custom-properties "Direct link to Grant document access with custom properties")

You can drive access from Seismic group membership using a custom property on documents.

1.  In Seismic, open **Custom properties** (your admin URL may look like `https://<domain>.seismic.com/apps/adminsettings/system/CustomPropertiesV2`).
2.  Create a property (for example **Glean content profile**):
    -   **Type:** **Multi-select**
    -   **Values:** Exact names of the groups that should receive access (for example internal group names your org already uses in Seismic).
3.  Assign the property to documents individually or with bulk edit.
4.  In the property field, select the groups that should have view access in Glean.

When assignments are ready, contact your Glean account team to turn on this mapping in your deployment. After they confirm, run a fresh crawl so members of the selected groups can see those documents in Glean.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

### Data and metadata ingested[​](#data-and-metadata-ingested "Direct link to Data and metadata ingested")

-   Published content profile documents, metadata (title, author, last modified), and links to embedded documents.

### Permission behavior[​](#permission-behavior "Direct link to Permission behavior")

-   Glean enforces Seismic permissions at query time. If Seismic’s API does not expose content profile membership, **published content profile links may appear to all Seismic users in Glean**, but users still cannot open content in Seismic without native access.

### Security notes[​](#security-notes "Direct link to Security notes")

-   Authentication uses **OAuth 2.0**.
-   Data stays in your cloud environment.
-   There are no webhooks; updates are detected on the crawl schedule.

### Known limitations[​](#known-limitations "Direct link to Known limitations")

-   Multi-instance Seismic deployments are not supported.
-   Published content profile links can surface broadly in Glean because of API limitations, as described above.

### Privacy[​](#privacy "Direct link to Privacy")

-   Unpublished and workspace content is not exposed by the connector.
-   Users cannot open Seismic content they are not entitled to, even when a result appears in Glean search.

For help, contact the [Glean support team](https://support.glean.com/hc/en-us/requests/new).
