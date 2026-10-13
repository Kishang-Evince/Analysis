---
url: "https://docs.glean.com/connectors/native/gitforge/about"
canonical: "https://docs.glean.com/connectors/native/gitforge/about"
title: "Git Forge overview"
description: "Learn what the Git Forge connector indexes, how it crawls repositories, and what it requires."
fetched_at: "2026-10-13T08:49:54.445Z"
---
On this page

The Git Forge connector indexes content from Git repositories hosted on an HTTPS-accessible Git server that supports the [Git Smart HTTP protocol](https://git-scm.com/docs/http-protocol). It is designed for Git servers with compatible clone paths and browser URL patterns.

Git Forge does not use a provider-specific API to discover repositories. An administrator defines the crawl scope by uploading a CSV file that lists the repositories to index.

To connect Git Forge, see [Setup](/connectors/native/gitforge/setup). Before you configure it, review [Permissions and security](/connectors/native/gitforge/permissions).

## Supported Git servers[​](#supported-git-servers "Direct link to Supported Git servers")

Git Forge can connect to a Git server when all of the following are true:

-   The server is reachable from the Glean crawler over HTTPS.
-   The server supports Git Smart HTTP operations.
-   The configured personal access token can read every repository listed in the CSV file.
-   The server's clone paths and browser URLs can be represented by the Git Forge configuration.

Git Forge is provider-neutral and can work with Git platforms that meet these protocol and URL requirements. Compatibility depends on the platform's clone URL and browser URL formats. Provider-specific features such as pull requests, issues, merge requests, wikis, and provider permission APIs are not indexed.

## Repository scope[​](#repository-scope "Direct link to Repository scope")

The uploaded repository CSV is the authoritative list of repositories that Git Forge crawls. Git Forge does not enumerate repositories from the Git server.

Each row contains these columns:

| Column | Purpose |
| --- | --- |
| `repositoryName` | The server-relative repository path used to construct the clone URL. |
| `repositoryUrl` | The repository URL used to clone the repository and build links from Glean results. |
| `defaultBranch` | The branch name used in result URLs and document metadata. This value must match the branch that Git Forge crawls. |

The same repository name must not appear more than once in the CSV. For the exact file format and an example, see [Prepare the repository CSV](/connectors/native/gitforge/setup#prepare-the-repository-csv).

## What Git Forge indexes[​](#what-git-forge-indexes "Direct link to What Git Forge indexes")

Git Forge currently produces these document types:

-   **Files:** Files from the branch selected by the Git server during the initial clone. When the crawler supplies a file body and the file type is configured for body indexing, the body is indexed with its media type.
-   **README.md files:** Files named `README.md`, matched without case sensitivity, are indexed as README documents. Their titles can be inferred from Markdown headings.
-   **Directories:** Directory documents represent folders in the repository and link to the corresponding tree URL.
-   **Commits:** Commit documents include commit authorship, timestamps, commit hashes, and repository metadata.

Repository, branch, and path information is available through document metadata and payloads. File documents can also have a repository facet and an extension facet when the file has an extension.

## Branch and crawl behavior[​](#branch-and-crawl-behavior "Direct link to Branch and crawl behavior")

During the initial full crawl, Git Forge clones the single branch selected as the remote default branch by the Git server. Incremental crawls pull the branch that was checked out during the initial clone.

The CSV `defaultBranch` value does not select the branch to crawl. Git Forge uses it to construct file and directory result URLs and to populate branch metadata. Set it to the name of the branch that the Git server selects during the initial clone. If these values differ, result links and branch metadata can be incorrect.

Git Forge supports full and incremental crawl states:

-   **Full crawls** enumerate the configured repositories and process their current content.
-   **Incremental crawls** compare the current repository state with the previously recorded state and process changes since the previous crawl.

Git Forge does not consume provider-specific webhooks. Content freshness depends on scheduled full and incremental crawls.

## File-body indexing[​](#file-body-indexing "Direct link to File-body indexing")

File-body indexing is controlled by the connector's configured text-file and code-file extension lists and code-file name list. Files that do not match these lists can still be indexed for metadata without searchable file bodies.

The exact lists are deployment configuration. If a file appears in search but its contents are not searchable, check whether its extension or file name is enabled for body indexing.

## Result URLs[​](#result-urls "Direct link to Result URLs")

Git Forge builds file and directory result links from `repositoryUrl`, `defaultBranch`, the file or directory path, and the configured URL path segments. Commit links use `repositoryUrl`, the commit hash, and the configured commit path segment. The default path segments are:

-   `blob` for files
-   `tree` for directories
-   `commit` for commits

The configured URL pattern must match the Git server's browser URL format. Content URL matching expects two repository path segments before the configured content segment, such as `/organization/repository/blob/...`. Browser URLs with nested namespace segments do not match this pattern.

If result links do not open the expected file, directory, or commit, check the repository URL, the `defaultBranch` value, and the server's URL path format.

## Limitations[​](#limitations "Direct link to Limitations")

-   Git Forge does not enumerate repositories from the source server; repository scope is controlled by the CSV.
-   The Git server selects the branch during the initial clone. The CSV `defaultBranch` value does not change the crawl branch.
-   Provider-specific objects such as pull requests, issues, merge requests, wikis, and activity are not indexed.
-   Submodules are not indexed as independent Git Forge repositories.
-   Webhooks are not supported.
-   Files whose extensions or file names are not enabled for body indexing can be indexed without searchable bodies.
-   Content URL matching does not support repository browser URLs with nested namespace segments.
-   Git servers do not provide a standardized deletion webhook or tombstone API. Deletion detection therefore depends on crawls.
-   Source repository ACLs are not enforced per user or per repository in Glean. The processor clears document permissions and enables unrestricted access, so indexed content is available to all authenticated users in the Glean instance. See [Permissions and security](/connectors/native/gitforge/permissions).
