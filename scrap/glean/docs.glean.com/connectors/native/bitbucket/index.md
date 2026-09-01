---
url: "https://docs.glean.com/connectors/native/bitbucket/"
canonical: "https://docs.glean.com/connectors/native/bitbucket/"
title: "Bitbucket"
description: "Documentation for the Bitbucket connector, detailing its supported features, requirements, configuration and setup instructions."
fetched_at: "2026-09-01T13:29:23.332Z"
---
On this page

Bitbucket is a Git-based code hosting and collaboration tool for teams. The Bitbucket connector enables Glean to index and search code, files, pull requests, issues (if enabled), and associated comments from Bitbucket Cloud repositories. This integration applies repository-level user and group access controls as defined in Bitbucket, providing secure and scalable search across a developer’s codebase.

info

Code Search is supported in Glean and Tools for repositories connected through BitBucket. Code Search is enabled by default after connected and the previous code tool toggle in the Admin console is removed. See [Code Search](/user-guide/assistant/code-search) for more details.

## Supported Features and Limitations[​](#supported-features-and-limitations "Direct link to Supported Features and Limitations")

The Bitbucket connector supports a broad set of features designed to provide deep access to code and collaboration artifacts from Bitbucket Cloud, while enforcing source system permissions within Glean.

### Supported Objects/Entities[​](#supported-objectsentities "Direct link to Supported Objects/Entities")

The following data types and objects are supported for indexing and search:

-   Repositories (cloud only).
-   Projects within workspaces.
-   Pull Requests, including all states and inlined comments.
-   Code files, markdown, and plain text files.
-   File and directory names.
-   Issues and issue comments if the Bitbucket issue tracker is enabled for the repository.
-   Commits and commit metadata.
-   Code.

### Supported API Endpoints/Features[​](#supported-api-endpointsfeatures "Direct link to Supported API Endpoints/Features")

The connector leverages both Bitbucket’s REST API and repository cloning for content ingestion:

-   Users: `/workspaces/<workspace>/members`
-   Workspaces: `/workspaces`
-   Projects: `/workspaces/<workspace>/projects`
-   Repository permissions: `/workspaces/<workspace>/permissions/repositories/<repo>`
-   Repositories: `/repositories/<workspace>`
-   PRs: `/repositories/<workspace>/<repo>/pullrequests`
-   PR Comments: `/repositories/<workspace>/<repo>/pullrequests/<pull>/comments`
-   Issues: `/repositories/<workspace>/<repo>/issues` (if enabled)
-   Issue Comments: `/repositories/<workspace>/<repo>/issues/<issue>/comments` (if enabled)
-   Commits: `/repositories/<workspace>/<repo>/commit/<commit>`
-   Directory and file listing through API or repository clone.

### Limitations[​](#limitations "Direct link to Limitations")

-   Bitbucket Cloud is deprecating team-based endpoints, support is based on workspaces.
-   API rate limits: 1000 repository data requests/hour, 5000 raw file requests/hour and 60,000 git web requests/hour.
-   User email addresses are not available from the API by default. Emails can be associated only through individual OAuth flow.
-   Issue tracker visibility (public/private) is not exposed in Bitbucket’s REST API and unauthenticated requests are used as a workaround.
-   All Bitbucket connector access is read-only and write operations are not supported.
-   Permissions are enforced at the repository level. Public/private visibility of issue trackers is not surfaced by the API.
-   Repository *team* objects are not included in the implementation, as these are deprecated.

## Requirements[​](#requirements "Direct link to Requirements")

Before configuring the Bitbucket connector, ensure the following requirements are met.

### Technical Requirements[​](#technical-requirements "Direct link to Technical Requirements")

-   Bitbucket Cloud account. Admin-level access recommended for setup.
-   Glean cloud deployment.

### Credential Requirements[​](#credential-requirements "Direct link to Credential Requirements")

You need the following credentials:

-   **OAuth consumer**: Create an OAuth Consumer (key/secret pair) within Bitbucket workspace settings for API authentication.
    
-   **API token**: An Atlassian API token tied to a Bitbucket user with the following scopes:
    
    -   `read:issue:bitbucket`
    -   `read:permission:bitbucket`
    -   `read:project:bitbucket`
    -   `read:pullrequest:bitbucket`
    -   `read:repository:bitbucket`
    -   `read:user:bitbucket`
    -   `read:workspace:bitbucket`

Credentials must belong to a user (recommended: a bot account) with admin access to all relevant repositories and workspaces. These secrets are stored encrypted in Glean’s secure vault.

### Permission Requirements[​](#permission-requirements "Direct link to Permission Requirements")

-   **Admin account access:** The user account used to connect the integration must have Admin access to all repositories targeted for crawling. This is necessary because Glean utilizes the [Repository Permissions API](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-workspaces/#api-workspaces-workspace-permissions-repositories-repo-slug-get) to sync access controls, which is restricted to repository administrators.
    
-   **Read-only token scopes:** While the user account requires Admin status, the API token itself can be limited to read-only scopes. Glean only requires read access to retrieve metadata and permissions.
    

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Set up an OAuth Consumer[​](#set-up-an-oauth-consumer "Direct link to Set up an OAuth Consumer")

Perform the following steps for each workspace:

1.  Navigate to **Workspace Settings** → **Apps and features** → **OAuth consumers**.
2.  Click **Add Consumer**.
3.  Name the consumer as *Glean OAuth Consumer*.
4.  Set the **Callback URL**. Glean will provide the specific URL for your project.
5.  Under **Permissions**, select `Account:Read` (This will automatically select `Account:Email` as well).
6.  Click **Save**.
7.  Click on the name of your new consumer (Glean OAuth Consumer) to expand its details. You need to provide OAuth consumer key and OAuth Secret in Glean.

### Create a Bitbucket API token[​](#create-a-bitbucket-api-token "Direct link to Create a Bitbucket API token")

1.  In Bitbucket, navigate to **Personal settings** → [**API tokens**](https://id.atlassian.com/manage-profile/security/api-tokens).
2.  Click **Create API token with Scopes**.
3.  Configure the token details:
    -   **Name:** `Glean Bitbucket API Token`
    -   **Expires on:** Set to the maximum duration (1 year).
4.  Select **Bitbucket** as the app and grant the following **Read** scopes:
    -   `read:issue:bitbucket`
    -   `read:permission:bitbucket`
    -   `read:project:bitbucket`
    -   `read:pullrequest:bitbucket`
    -   `read:repository:bitbucket`
    -   `read:user:bitbucket`
    -   `read:workspace:bitbucket`
5.  Click **Create**, then **copy the token** immediately.

### Configure in Glean[​](#configure-in-glean "Direct link to Configure in Glean")

1.  In Glean, go to **Admin console** → **Connectors** and click **Add connector**.
2.  Search **Bitbucket**.
3.  Enter a **Name** and optional Icon for the Bitbucket connector. This label will appear for users in search results.
4.  On the Glean setup page, enter the following:
    -   **OAuth Client ID:** Paste the Key from your Bitbucket OAuth Consumer (see *Set up an OAuth Consumer*).
    -   **OAuth Client Secret:** Paste the Secret from your Bitbucket OAuth Consumer (see *Set up an OAuth Consumer*).
    -   **API Token:** Paste the token generated in the *Create a Bitbucket API token* step.
    -   **Auth Email:** Enter your Atlassian account email address.
5.  **Important:** Check the box for **Credential provided is API Token** (this ensures Glean does not treat the token as a legacy App Password).
6.  Click **Save**.

## Permissions & Security[​](#permissions--security "Direct link to Permissions & Security")

-   **Data and Metadata Ingested**: The connector indexes repository structures, code files, text or markdown documents, directory metadata, pull requests and comments, issue trackers (if enabled), and commit metadata. No write or destructive operations are performed.
-   **Permission Propagation**: User or group read permission data is ingested and applied so that search result access within Glean mirrors Bitbucket controls.
-   **Authentication Model**: OAuth and API token, stored encrypted.
-   **Known Security Restrictions**:
    -   Bitbucket Cloud only.
    -   User emails require additional OAuth.
    -   Issue tracker public or private detection is imperfect due to API limitations.
-   **Data Privacy**: Indexing scope and exposure are governed by Bitbucket account and permission configuration.
