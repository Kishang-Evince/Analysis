---
url: "https://docs.glean.com/connectors/native/bitbucket-server/"
canonical: "https://docs.glean.com/connectors/native/bitbucket-server/"
title: "Bitbucket Server"
description: "Learn how to connect your on-premise Bitbucket Server data with Glean."
fetched_at: "2026-09-01T13:29:23.188Z"
---
On this page

The Bitbucket Server connector enables you to ingest and search content from your on-premise Bitbucket Server instance. You can index repositories, pull requests, and associated metadata, with access controls enforced at the repository or project level. Search results from Bitbucket Server includes repository files, directories, pull requests, and comments, with metadata such as titles, authors, timestamps, and direct links to the Bitbucket Server instance.

info

Code Search is supported in Glean and Tools for repositories connected through BitBucket Server. Code Search is enabled by default after connected and the previous code tool toggle in the Admin console is removed. See [Code Search](/user-guide/assistant/code-search) for more details.

## Supported features and limitations[​](#supported-features-and-limitations "Direct link to Supported features and limitations")

The Bitbucket Server connector is designed to index core repository content and metadata, supporting granular access control and flexible crawling strategies. The following sections detail the supported objects, API endpoints, limitations, and crawling options.

### Supported objects types[​](#supported-objects-types "Direct link to Supported objects types")

| Object type | Description |
| --- | --- |
| Code | Users gain the ability to search through their deployment's code repository directly from Glean. This functionality is not just about finding code; it's about understanding it, creating snippets, and more. For more info see [Glean Code Search](/user-guide/assistant/code-search) |
| Repositories | Git repositories within Bitbucket Server |
| Users | Bitbucket Server user accounts |
| Pull Requests | Pull requests and their metadata |
| Pull Request Comments | Comments on pull requests |
| Files & Directories | File and directory structures in repositories. This can be crawled only if the [Code Search](/user-guide/assistant/code-search) is enabled for your repositories. |

### Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

API domain = `https://bitbucket.company.com/rest/api/latest`

Here `https://bitbucket.company.com` represents the server url for the customer.

-   Users (`/admin/users`)
-   Repositories (`/repos`)
-   Repository Permissions (`/projects/<project>/repos/<repo>/permissions/users`)
-   Pull Requests (`/projects/<project>/repos/<repo>/pull-requests`)
-   Pull Request Comments (`/projects/<project>/repos/<repo>/pull-requests/<pr>/activities`)

### Limitations[​](#limitations "Direct link to Limitations")

-   Projects scoped by permission may **require** a separate personal access token.
-   Webhook is not supported.
-   Issue tracking is **not be supported**.
-   Permissions granted at project and global scope are currently not supported.

### Requirements[​](#requirements "Direct link to Requirements")

To successfully configure the Bitbucket Server connector, ensure you meet the following requirements:

-   **Version:** Your Bitbucket Server instance must be running **version 5.5 or higher** (required for Personal Access Token support). For native Bitbucket group crawling, **version 8.5 or higher** is required.
-   **Admin Access:** You must have **Admin rights** on the Bitbucket Server instance to create the required Personal Access Token.
-   **Required permissions and scope**: The HTTP Access Token must be granted `Project: Read` and `Repository: Admin` permissions.
-   **Credentials**: You need to provide the following details into the Glean Admin Console:
    -   Bitbucket Server domain name
    -   Bitbucket Server IP address
    -   Username of the token creator
    -   HTTP access token

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Perform the following steps to connect your Bitbucket Server to Glean:

### Step 1. Determine API access token scopes[​](#step-1-determine-api-access-token-scopes "Direct link to Step 1. Determine API access token scopes")

To authorize Glean API calls, an [access token](https://confluence.atlassian.com/bitbucketserver/http-access-tokens-939515499.html) from a Bitbucket admin account with the permission combination of `Project: Read` and `Repository: Admin` is required.

`Repository:Admin` scope is needed to view explicit user permissions and explicit group permissions for a given repository, the crawl must have a repository[:admin](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-repositories/#api-repositories-workspace-repo-slug-permissions-config-users-selected-user-id-get) scope. Bitbucket Server does not offer a read-only version of this scope.

### Step 2. Create an HTTP access token[​](#step-2-create-an-http-access-token "Direct link to Step 2. Create an HTTP access token")

1.  Sign into a Bitbucket admin account.
2.  Create your HTTP access token. For more information, see [HTTP access tokens](https://confluence.atlassian.com/bitbucketserver/http-access-tokens-939515499.html).

### Step 3. Enter Bitbucket server instance details to Glean[​](#step-3-enter-bitbucket-server-instance-details-to-glean "Direct link to Step 3. Enter Bitbucket server instance details to Glean")

Provide the following information in the Glean admin console:

1.  Enter your Bitbucket Server hostname, for example, `https://bitbucket.<company>.com`.
2.  Enter your Bitbucket Server IP address.
3.  Enter username of the access token creator.
4.  Enter the access token that you created in the **Create an HTTP access token** step.

### Crawl configuration options[​](#crawl-configuration-options "Direct link to Crawl configuration options")

-   You can configure which repositories or projects to include or exclude using redlist/greenlist fields (e.g., blockedRepositories and allowedRepositories).
-   The format for specifying repositories is `<project>/<repository>`.
-   Crawl frequency and lookback period can be adjusted in the Glean admin console.

## Data ingestion and scope[​](#data-ingestion-and-scope "Direct link to Data ingestion and scope")

The connector collects **repository files, directories, pull requests, comments, and user metadata**. All API requests are made securely over **HTTPS**.

-   **Ingestion scope:** Only data accessible to the user associated with the HTTP access token is ingested. You must ensure this user’s access is appropriately scoped within Bitbucket to avoid unintentional data exposure.

## Access control and compliance[​](#access-control-and-compliance "Direct link to Access control and compliance")

Glean strictly enforces Bitbucket Server's access controls at query time.

-   **Access principle:** Only users who have explicit access to a repository in Bitbucket Server will see the corresponding results in Glean.
-   **Versions and permission mapping**:
    -   **Bitbucket Server 5.5–8.4**: Glean supports only users explicitly assigned at the repository level. Because Glean does not expand group-based permissions for these versions, only users directly listed on a repository can view it in Glean.
    -   **Bitbucket Server 8.5+**: Glean crawls native Bitbucket groups and expands the permission hierarchy into per-user access. This includes permissions granted to users and groups at the global, project, and repository levels.
-   **Authentication:** Authentication uses a HTTP access token created by a user with admin-level privileges.
