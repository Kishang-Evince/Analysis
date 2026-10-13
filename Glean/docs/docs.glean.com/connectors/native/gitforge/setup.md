---
url: "https://docs.glean.com/connectors/native/gitforge/setup"
canonical: "https://docs.glean.com/connectors/native/gitforge/setup"
title: "Set up Git Forge"
description: "Configure the Git Forge connector with an HTTPS Git server URL, personal access token, and repository CSV."
fetched_at: "2026-10-13T08:49:54.383Z"
---
On this page

Setting up Git Forge involves these steps:

-   [Confirm the requirements](#requirements).
-   [Prepare the repository CSV](#prepare-the-repository-csv).
-   [Configure Git Forge in Glean](#configure-git-forge-in-glean).
-   [Validate the setup](#validate-the-setup).
-   [Verify indexed content](#verify-indexed-content).

## Requirements[​](#requirements "Direct link to Requirements")

Before you begin, gather the following:

-   The HTTPS URL of the Git server that hosts the repositories, including `https://`.
-   A personal access token that can read every repository you plan to index.
-   The username to send with the personal access token for HTTP Basic authentication. The required value depends on the Git server.
-   A repository CSV file with the required columns and one row for each repository to crawl.
-   Network access from the Glean crawler to the Git server over HTTPS.

The Git server must support Git Smart HTTP. Git Forge does not use a provider-specific API to enumerate repositories.

Git Forge constructs each clone URL as the **Git Server URL**, followed by `repositoryName` and `.git`. Include any additional clone-base path required by your Git server in **Git Server URL**.

## Prepare the repository CSV[​](#prepare-the-repository-csv "Direct link to Prepare the repository CSV")

Create a CSV with this header:

```
repositoryName,repositoryUrl,defaultBranch
```

Add one row for each repository. For example:

```
repositoryName,repositoryUrl,defaultBranchorg/repo,https://git.example.com/org/repo,main
```

### CSV columns[​](#csv-columns "Direct link to CSV columns")

| Column | Required value |
| --- | --- |
| `repositoryName` | The server-relative repository path used to construct the clone URL. Include the organization or namespace, such as `org/repo`. |
| `repositoryUrl` | The browser URL of the repository. Git Forge uses this value to construct links to files, directories, and commits in Glean results. |
| `defaultBranch` | The branch name used in file and directory result URLs and branch metadata. This value must match the branch selected by the Git server during the initial clone. It does not select the branch to crawl. |

Repository names must be unique. Do not include two rows with the same `repositoryName`.

warning

`repositoryName`, `repositoryUrl`, and `defaultBranch` serve different purposes. Git Forge combines **Git Server URL** with `repositoryName` to access the repository. It uses `repositoryUrl` and `defaultBranch` to build result links. Check all three values against your Git server before uploading the file.

## Configure Git Forge in Glean[​](#configure-git-forge-in-glean "Direct link to Configure Git Forge in Glean")

1.  In the Glean **Admin console**, go to **Data sources** and add **Git Forge**.
2.  In **Git Server URL**, enter the HTTPS clone-base URL, including `https://`.
3.  In **Personal Access Token**, enter the token that can read the configured repositories.
4.  In **Git Username**, enter the username required by the Git server for personal-access-token authentication.
5.  Upload the repository CSV.
6.  Save the connector.

Git Forge stores **Personal Access Token** and **Git Username** as connector secrets and uses them when it accesses repositories. Do not include credentials in the CSV or repository URLs.

## Validate the setup[​](#validate-the-setup "Direct link to Validate the setup")

When you save the connector, Glean runs these validation checks:

1.  The **Git Username** secret exists.
2.  The **Personal Access Token** secret exists.
3.  The repository CSV exists, is readable, has the exact header, contains at least one row, and has no duplicate `repositoryName` values.
4.  The configured credentials can access the first five repositories in the CSV, or all repositories if the CSV contains fewer than five rows. This check constructs each clone URL from **Git Server URL** and `repositoryName`.

Setup validation does not verify that `repositoryUrl` is a working browser URL or that `defaultBranch` matches the branch selected during cloning. Verify these values manually.

A successful validation of the first five rows does not prove that every repository in a larger CSV is accessible. Confirm that the personal access token has read access to every configured repository.

If repository access validation fails, check **Git Server URL**, `repositoryName`, **Git Username**, and **Personal Access Token** permissions. For more help, see [Troubleshooting and FAQs](/connectors/native/gitforge/troubleshooting).

## Verify indexed content[​](#verify-indexed-content "Direct link to Verify indexed content")

After the initial crawl completes:

1.  Search for a repository name.
2.  Open a file result and confirm that its link opens the expected file in the Git server.
3.  Open a directory result and confirm that its link opens the expected tree path.
4.  Open a commit result and confirm that its link opens the expected commit.
5.  Check a text or code file to confirm that its body is searchable.

If links or file bodies are incorrect, see [Troubleshooting and FAQs](/connectors/native/gitforge/troubleshooting).

## Update the connector[​](#update-the-connector "Direct link to Update the connector")

To change the repositories or result-link values:

1.  Update the repository CSV.
2.  Upload the updated CSV in the connector configuration.
3.  Save the connector.
4.  Allow the next crawl to process the updated repository list.

Changing `defaultBranch` updates result URLs and branch metadata. It does not change the branch that Git Forge crawls.

To rotate the personal access token, replace **Personal Access Token** in the connector configuration and save it again. Ensure the replacement token has read access to every repository in the CSV.
