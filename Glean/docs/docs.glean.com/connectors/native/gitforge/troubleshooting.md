---
url: "https://docs.glean.com/connectors/native/gitforge/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/gitforge/troubleshooting"
title: "Git Forge troubleshooting and FAQs"
description: "Resolve common Git Forge connector setup, authentication, CSV, crawl, and indexing issues."
fetched_at: "2026-10-13T08:49:54.665Z"
---
On this page

This page covers common Git Forge setup and indexing problems. If an issue persists after you try the suggested resolution, contact [Glean Support](https://support.glean.com).

## Setup and installation[​](#setup-and-installation "Direct link to Setup and installation")

### Setup validation fails[​](#setup-validation-fails "Direct link to Setup validation fails")

**Symptoms:**

-   The connector cannot be saved.
-   The initial crawl does not start.
-   The setup flow reports a credential, CSV, or repository-access problem.

| Cause | Fix |
| --- | --- |
| **Git Username** or **Personal Access Token** is missing. | Enter both values in the Git Forge setup form, then save the connector again. |
| The CSV header is incorrect, the file has no repository rows, or repository names are duplicated. | Confirm that the header is exactly `repositoryName,repositoryUrl,defaultBranch`, add at least one repository row, and remove duplicate `repositoryName` values. |
| **Git Server URL** is incorrect or unreachable from the Glean crawler. | Check that the URL includes `https://` and any required clone-base path. Then check the network route, firewall, proxy, certificate, and allowlist configuration. |
| The server does not support Git Smart HTTP. | Confirm that the Git server exposes the repository through the Git Smart HTTP protocol over the configured HTTPS connection. |
| **Personal Access Token** cannot read a repository checked during validation. | Confirm **Git Server URL**, `repositoryName`, **Git Username**, and the token's read access. Git Forge checks at most the first five CSV repositories during setup validation. |

Setup validation does not verify `repositoryUrl` or `defaultBranch`. Incorrect values in these columns can cause broken result links or incorrect branch metadata after a successful setup.

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## CSV and repository scope[​](#csv-and-repository-scope "Direct link to CSV and repository scope")

### A repository is not indexed after setup succeeds[​](#a-repository-is-not-indexed-after-setup-succeeds "Direct link to A repository is not indexed after setup succeeds")

**Symptoms:**

-   Setup succeeds, but one or more repositories do not appear in search.
-   Some repositories in the CSV are indexed while others are missing.

| Cause | Fix |
| --- | --- |
| The repository is not in the latest uploaded CSV. | Add the repository as a new row, upload the updated CSV, and save the connector. |
| `repositoryName` is a display name instead of the server-relative repository path. | Use a path that includes the organization or namespace, such as `org/repo`. |
| The personal access token can access the first five repositories but not this repository. | Confirm that the token has read access to every repository listed in the CSV. Setup validation does not check every row when the CSV contains more than five repositories. |
| The Git server does not expose a usable remote default branch. | Confirm that the server's remote `HEAD` points to the branch that Git Forge should clone. The CSV `defaultBranch` value does not select the crawl branch. |
| The initial or subsequent crawl is still in progress. | Check the connector crawl status and wait for the applicable crawl to complete. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### The CSV is rejected[​](#the-csv-is-rejected "Direct link to The CSV is rejected")

**Symptoms:**

-   The upload or setup flow reports a CSV problem.
-   The connector cannot validate the repository list.

| Cause | Fix |
| --- | --- |
| The file is not a CSV or has an unexpected header. | Use a CSV with the exact header `repositoryName,repositoryUrl,defaultBranch`. |
| The CSV has no repository rows. | Add at least one repository row below the header. |
| `repositoryName` values are duplicated. | Keep one row per repository and make every `repositoryName` unique. |
| The CSV cannot be parsed. | Check the CSV quoting and delimiters, then upload the corrected file. |

Git Forge does not semantically validate `repositoryUrl` or `defaultBranch` during setup. Confirm manually that `repositoryUrl` opens the repository in the Git server and that `defaultBranch` matches the branch selected during the initial clone.

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### The personal access token is rejected[​](#the-personal-access-token-is-rejected "Direct link to The personal access token is rejected")

**Symptoms:**

-   Repository access validation fails.
-   The connector cannot read repository content.

| Cause | Fix |
| --- | --- |
| **Personal Access Token** is expired or revoked. | Create or obtain an active token and replace **Personal Access Token** in the Git Forge setup form. |
| **Git Username** is incorrect for the Git server. | Confirm the username required for HTTP Basic authentication with your Git server administrator. |
| **Personal Access Token** does not have repository read access. | Grant the minimum read access required for every configured repository, or use a token with access to the configured repository set. |
| The Git server does not support the required Git Smart HTTP operation. | Confirm the server configuration and test the repository through Git Smart HTTP from the Glean crawler's network path. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### Users see content they should not see[​](#users-see-content-they-should-not-see "Direct link to Users see content they should not see")

Git Forge does not implement per-document ACLs or per-user permissions. The processor clears document permissions and enables unrestricted access. Source repository ACLs are not enforced, and indexed content is available to all authenticated users in the Glean instance. Remove repositories that are not appropriate for all authenticated Glean users and review the [permissions and security guidance](/connectors/native/gitforge/permissions).

## Content freshness and indexing[​](#content-freshness-and-indexing "Direct link to Content freshness and indexing")

### Changes are not appearing[​](#changes-are-not-appearing "Direct link to Changes are not appearing")

**Symptoms:**

-   New or updated content does not appear in search.
-   Deleted content remains visible.

| Cause | Fix |
| --- | --- |
| The next crawl has not completed. | Git Forge does not support provider-specific webhooks. Wait for the next scheduled full or incremental crawl, then check the crawl status. |
| The change is on a branch other than the checked-out branch. | Git Forge clones the Git server's remote default branch during the initial crawl and pulls that checked-out branch during incremental crawls. The CSV `defaultBranch` value does not select the crawl branch. |
| A deleted file has not been processed by a crawl. | Confirm that the file is absent from the source and allow a subsequent crawl to complete. |
| The content is in a submodule. | Git Forge does not index submodules as independent content. Add the referenced repository separately to the CSV if it should be crawled and is supported. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### A file appears, but its contents are not searchable[​](#a-file-appears-but-its-contents-are-not-searchable "Direct link to A file appears, but its contents are not searchable")

**Symptoms:**

-   A file result appears in search, but its body is empty or not searchable.

| Cause | Fix |
| --- | --- |
| The file's extension or file name is not enabled for body indexing. | Ask your Glean administrator to review the configured text-file extensions, code-file extensions, and code-file names. |
| The file is too large or its content cannot be fetched. | Git Forge can create a file document without a searchable body when content retrieval is skipped or fails for a supported nonfatal condition. |
| The crawl has not processed the file yet. | Check the crawl status and wait for the applicable crawl to complete. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## Result links and metadata[​](#result-links-and-metadata "Direct link to Result links and metadata")

### A result link opens the wrong location[​](#a-result-link-opens-the-wrong-location "Direct link to A result link opens the wrong location")

**Symptoms:**

-   A file, directory, or commit link does not open the expected page in the Git server.

| Cause | Fix |
| --- | --- |
| `repositoryUrl` is not the browser URL of the repository. | Replace it with the URL that opens the repository in the Git server's web interface. |
| `defaultBranch` does not match the branch that Git Forge crawled. | Replace it with the name of the branch selected by the Git server during the initial clone. This changes result links and metadata, not the crawl branch. |
| The Git server uses different URL path segments. | Confirm that the configured file, directory, and commit URL segments match the server's browser URLs. Git Forge uses `blob`, `tree`, and `commit` by default. |
| The URL contains nested namespace segments. | Git Forge content URL matching expects two repository path segments before the configured file, directory, or commit segment. Nested namespace URLs do not match this pattern. |
| The URL points to a different project or namespace. | Check `repositoryUrl` and `repositoryName` against the source Git server. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### Repository or extension facets are missing[​](#repository-or-extension-facets-are-missing "Direct link to Repository or extension facets are missing")

**Symptoms:**

-   A result does not show the expected repository or file-extension facet.

| Cause | Fix |
| --- | --- |
| A file-extension facet is missing from a directory or commit result. | File-extension facets apply only to files that have an extension. Directory and commit results still receive a repository facet. |
| The file name has no extension. | Git Forge does not add an extension facet to files without extensions. |
| The crawl has not processed the latest metadata. | Wait for the applicable crawl to complete, then search again. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## FAQs[​](#faqs "Direct link to FAQs")

### Does Git Forge enumerate repositories automatically?

No. The administrator uploads a CSV that defines the repositories Git Forge crawls.

### Can I index more than one repository?

Yes. Add one row for each repository in the CSV. Each repository must have a unique `repositoryName`.

### Does Git Forge enforce repository permissions?

No. Git Forge does not implement per-document ACLs or per-user permissions. Indexed content is available to all authenticated users in the Glean instance. Confirm that every repository in the CSV is appropriate for that audience before setup.

### Does Git Forge support webhooks?

No. Git Forge relies on scheduled full and incremental crawls and does not consume provider-specific webhooks.

### What document types does Git Forge index?

Git Forge indexes files, README.md files, directories, and commits from the branch selected by the Git server during the initial clone.
