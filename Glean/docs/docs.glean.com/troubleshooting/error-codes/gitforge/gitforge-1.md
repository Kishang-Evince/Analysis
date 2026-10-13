---
url: "https://docs.glean.com/troubleshooting/error-codes/gitforge/gitforge-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitforge/gitforge-1"
title: "GITFORGE_1"
description: "GITFORGE_1 Error Code"
fetched_at: "2026-10-13T08:51:04.432Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean raises this error during Git Forge setup validation when it can't reach one of the first five repositories listed in your repository CSV using the configured personal access token. Two things cause it: the repository URLs or `repositoryName` values are wrong, or the personal access token doesn't have read access to those repositories.

## Resolution[​](#resolution "Direct link to Resolution")

Check your Git Forge connector configuration in the Glean **Admin console**:

-   Confirm **Git Server URL** is the correct HTTPS clone-base URL, including `https://`.
-   Confirm each `repositoryName` in the CSV resolves to a real repository on that server.
-   Confirm **Git Username** is the username the Git server requires for personal-access-token authentication.
-   Verify the **Personal Access Token** has read access to every repository in the CSV. If the token is incorrect or lacks that access, replace it and save the connector again.

For the full configuration steps, see the [Git Forge setup page](/connectors/native/gitforge/setup).

For additional assistance, contact [Glean Support](https://support.glean.com).
