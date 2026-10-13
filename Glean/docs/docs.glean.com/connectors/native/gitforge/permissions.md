---
url: "https://docs.glean.com/connectors/native/gitforge/permissions"
canonical: "https://docs.glean.com/connectors/native/gitforge/permissions"
title: "Git Forge permissions and security"
description: "Understand Git Forge authentication and its source-permission limitations."
fetched_at: "2026-10-13T08:49:54.374Z"
---
On this page

## Permission model[​](#permission-model "Direct link to Permission model")

Git Forge authenticates to the Git server with the configured personal access token. It does not use OAuth or per-user Git credentials.

The connector does not implement per-document ACLs or per-user permissions. The processor clears document permissions and enables unrestricted access. Source repository ACLs are not enforced, and indexed content is available to all authenticated users in the Glean instance.

warning

Before you configure Git Forge, confirm that all repositories in the CSV are appropriate for all authenticated users in the Glean instance. Do not use Git Forge for repositories whose source-system ACLs must be enforced per user or per repository.

## Required access[​](#required-access "Direct link to Required access")

The personal access token must be able to read every repository listed in the repository CSV. The exact token scope and role names depend on the Git server. Use the minimum read access that allows Git Smart HTTP operations for the configured repositories.

The value in **Git Username** is sent with the personal access token for HTTP Basic authentication. Some Git servers require a specific username value; use the value documented by your Git server administrator.

## Credential handling[​](#credential-handling "Direct link to Credential handling")

-   Store the personal access token only in the Git Forge connector configuration.
-   Do not put the personal access token in the repository CSV.
-   Do not put the personal access token in a repository URL.
-   Rotate the personal access token according to your organization's credential policy.
-   After rotating the personal access token, validate the connector and confirm that the next crawl can access the configured repositories.

## Read-only behavior[​](#read-only-behavior "Direct link to Read-only behavior")

Git Forge uses the personal access token to clone and pull repository content from the checked-out branch. It does not write content to the Git server.

## Security checklist[​](#security-checklist "Direct link to Security checklist")

Before saving the connector, verify that:

-   Every CSV repository is intended to be searchable in Glean.
-   The personal access token has no more access than required for the configured repositories.
-   The Git server is reachable only through the network path approved for your deployment.
-   The personal access token is stored as a secret and is not present in CSV content, URLs, screenshots, or support logs.
