---
url: "https://docs.glean.com/connectors/native/github-enterprise-server/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/github-enterprise-server/troubleshooting"
title: "Troubleshooting and FAQs"
description: "Common issues and questions for the GitHub Enterprise Server connector."
fetched_at: "2026-09-01T13:29:29.032Z"
---
On this page

This page covers issues most often reported on the GitHub Enterprise Server connector. For setup steps, see the [GitHub Enterprise Server setup guide](/connectors/native/github-enterprise-server/setup).

## Setup and installation[​](#setup-and-installation "Direct link to Setup and installation")

### Connector validation fails right after setup[​](#connector-validation-fails-right-after-setup "Direct link to Connector validation fails right after setup")

**Symptoms:**

-   **Setup cannot complete:** Validation returns an error instead of transitioning the connector to a healthy, crawling state.
-   **Error messaging:** The error references fetching users or organizations, the GitHub App installation, the admin token, or connectivity.

| Cause | Fix |
| --- | --- |
| **GitHub App not installed:** The GitHub App was created but not installed in any organization on your GitHub Enterprise Server instance, so Glean cannot list organizations or mint an installation token. | Install the GitHub App in at least one organization on your instance, then rerun validation. See [GITHUB\_9](/troubleshooting/error-codes/github/github-9) for the full troubleshooting steps. |
| **Admin token scopes or ownership:** The admin classic personal access token is missing required scopes, or its owner lacks the privileges needed to read enterprise members and organizations. | Provide a classic personal access token owned by an enterprise owner with the `user:email`, `read:enterprise`, and `read:org` scopes, then rerun validation. See [GITHUB\_7](/troubleshooting/error-codes/github/github-7) for the full troubleshooting steps. |
| **No readable resources:** Glean cannot fetch members, repositories, or issues from an organization - for example because the organization has no resources of a given type, or the App is not installed on it. | Confirm the organization contains at least one member, repository, and issue, and that the GitHub App is installed on it. See [GITHUB\_2](/troubleshooting/error-codes/github/github-2) for the full troubleshooting steps. |
| **Credential mismatch:** The App credentials entered in Glean (App ID, private key, Client ID, or Client Secret) do not match the GitHub App on your instance. | Copy the correct values directly from the GitHub App's settings page and re-enter them in the Glean admin console. See [GITHUB\_5](/troubleshooting/error-codes/github/github-5) (Client ID or Secret) and [GITHUB\_9](/troubleshooting/error-codes/github/github-9) (App ID or private key) for the full troubleshooting steps. |

**Still not resolved?** Contact Glean Support with your GitHub Enterprise Server instance domain and the exact text of the validation error.

## Network and connectivity[​](#network-and-connectivity "Direct link to Network and connectivity")

### Glean can't reach your GitHub Enterprise Server instance[​](#glean-cant-reach-your-github-enterprise-server-instance "Direct link to Glean can't reach your GitHub Enterprise Server instance")

**Symptoms:**

-   **Connectivity errors:** Validation or crawls fail with errors referencing DNS resolution, connection timeouts, or an unknown host.
-   **No content is ingested:** The connector never transitions to a healthy crawling state, or content stops updating.

| Cause | Fix |
| --- | --- |
| **Instance unreachable from Glean:** Because GitHub Enterprise Server is self-hosted, Glean's crawler must be able to reach your instance over the network. A firewall, private network, or missing IP allowlist entry is blocking the connection. | Confirm your GitHub Enterprise Server instance is reachable from the Glean crawler. [Contact Glean Support](https://support.glean.com) for the [IP addresses assigned to your Glean tenant](/security/networking/glean-ip-ranges), then allowlist them on your network firewall and on your instance. |
| **TLS interception or proxy disruption:** A corporate proxy is breaking TLS encryption or rewriting HTTP headers between Glean and your instance. | Confirm with your network team that traffic between Glean and your GitHub Enterprise Server instance is excluded from inspection and is not being intercepted. |

note

GitHub Enterprise Server is self-hosted, so the Glean crawler must be able to reach your instance's API over the network. Verify network reachability before debugging credentials or scopes.

**Still not resolved?** Contact Glean Support with your instance domain and the exact text of the connectivity error.

## Missing content[​](#missing-content "Direct link to Missing content")

### Users don't see private or internal GitHub content until they authorize[​](#users-dont-see-private-or-internal-github-content-until-they-authorize "Direct link to Users don't see private or internal GitHub content until they authorize")

**Symptoms:**

-   A user sees no private or internal GitHub content, even though public content appears normally.
-   Other users who have authorized the connector see their private and internal content.

| Cause | Fix |
| --- | --- |
| **Per-user OAuth not completed:** On GitHub Enterprise Server, a user must individually authorize the connector before they can see private and internal repository content. Authorizing maps their GitHub identity to their Glean identity so Glean can enforce their repository access. Public repository content appears without OAuth. | Have the user authorize GitHub once by navigating to **Glean → Settings → Connectors → GitHub Enterprise Server**. Their aliases sync on the next identity crawl, after which their private and internal content appears. |

Limitation

Until a user completes per-user OAuth, private and internal GitHub Enterprise Server content doesn't appear in their search results. Public repository content appears regardless.

### Only some repositories are searchable in Glean[​](#only-some-repositories-are-searchable-in-glean "Direct link to Only some repositories are searchable in Glean")

**Symptoms:**

-   Content from some repositories appears, but specific repositories that should be indexed are missing.

| Cause | Fix |
| --- | --- |
| **Organization or repository filtering:** An organization allow or block list, or a repository inclusion or exclusion list, is excluding the content. | Review the connector's organization and repository lists under **Admin console → Connectors → GitHub Enterprise Server → Manage Data**. After adjusting them, allow the next discovery crawl to reflect the change. |
| **Private repository access:** The repository is private, so only its collaborators can see it. | Confirm the user is a collaborator on the repository in GitHub and has completed per-user OAuth. |

### GitHub Pages content doesn't appear in search[​](#github-pages-content-doesnt-appear-in-search "Direct link to GitHub Pages content doesn't appear in search")

**Symptoms:**

-   Documentation hosted on GitHub Pages doesn't appear in Glean search results.

| Cause | Fix |
| --- | --- |
| **Unsupported Pages deployment:** Glean indexes GitHub Pages only for repositories that publish from the legacy `gh-pages` branch workflow, and only HTML and Markdown content. | Confirm the site uses the legacy `gh-pages` branch workflow, and add the repository to the GitHub Pages repository inclusion list under **Admin console → Connectors → GitHub Enterprise Server → Manage Data**. |

Limitation

GitHub Pages indexing supports only the legacy `gh-pages` branch workflow and only HTML and Markdown content. Sites built with custom GitHub Actions workflows aren't indexed.

**Still not resolved?** Contact Glean Support with the repository name and, for a missing document, its exact URL.

## Real-time updates[​](#real-time-updates "Direct link to Real-time updates")

### New or updated content is slow to appear[​](#new-or-updated-content-is-slow-to-appear "Direct link to New or updated content is slow to appear")

**Symptoms:**

-   New pull requests, issues, or commits do not appear until a later scheduled crawl.

| Cause | Fix |
| --- | --- |
| **Webhook delivery blocked:** GitHub webhook events from your instance are not reaching Glean, so updates wait for the next incremental crawl. | Confirm your network allows webhook delivery from your GitHub Enterprise Server instance to Glean. Glean also picks up new and updated content through scheduled incremental and full crawls, so content still syncs without webhooks - just less quickly. |

## FAQs[​](#faqs "Direct link to FAQs")

### Which GitHub connector should I use?

Glean provides separate connectors for different GitHub hosting models:

-   **GitHub** - for GitHub.com (Cloud), including GitHub Enterprise Cloud. An admin installs a GitHub App and each end user authorizes their own GitHub account through per-user OAuth.
-   **GitHub Enterprise Server** - for self-hosted GitHub Enterprise Server. It uses a GitHub App plus an admin-issued classic personal access token (with the `user:email`, `read:enterprise`, and `read:org` scopes) for enterprise- and organization-level reads, and supports multiple organizations.
-   **GitHub Server** - for a self-hosted GitHub instance scoped to a single organization. It uses a GitHub App with per-user OAuth and does not require an admin personal access token.

Choose the connector that matches your hosting model.

### What credentials and permissions does the GitHub Enterprise Server connector need?

The connector needs two things:

-   A **GitHub App** with read-only permissions, installed in each organization you want to index. It reads repository administration, contents, issues, metadata, pull requests, commit statuses, and Pages, along with organization members and user email addresses.
-   An **admin classic personal access token** with the `user:email`, `read:enterprise`, and `read:org` scopes, used for enterprise- and organization-level reads.

### Why don't users see private or internal GitHub content until they authorize?

On GitHub Enterprise Server, per-user OAuth maps each user's GitHub identity to their Glean identity so Glean can enforce their repository access. Public repository content appears without OAuth, but private and internal content stays hidden until a user authorizes. After they authorize, their aliases sync on the next identity crawl and their accessible content becomes searchable.

### Can I connect more than one GitHub Enterprise Server instance?

Yes. Each GitHub Enterprise Server instance is configured as its own connector instance with its own GitHub App. Set up one connector instance for each GitHub Enterprise Server instance you want to index.

### How does Glean handle files on non-default branches?

Files on the default branch are indexed by the content crawl. Files on non-default branches, tags, or specific commits are fetched on demand using the requesting user's own GitHub access. Branches whose names contain a `/` cannot be fetched this way - reference the file by its commit SHA instead.

### How can I control which organizations, repositories, and content types Glean indexes?

Use **Admin console → Connectors → GitHub Enterprise Server → Manage Data**. There you can set organization allow and block lists, repository inclusion and exclusion lists, and GitHub Pages repository lists. You can also toggle content types (such as wikis, issues, and pull request diffs) and choose which code file extensions are indexed.
