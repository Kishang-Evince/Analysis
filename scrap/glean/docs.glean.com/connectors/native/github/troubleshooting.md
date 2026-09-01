---
url: "https://docs.glean.com/connectors/native/github/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/github/troubleshooting"
title: "Troubleshooting and FAQs"
description: "Common issues and questions for the GitHub connector."
fetched_at: "2026-09-01T13:29:29.634Z"
---
On this page

This page covers issues most often reported on the GitHub Cloud connector. For setup steps, see the [GitHub Cloud setup guide](/connectors/native/github/setup).

## Setup and installation[​](#setup-and-installation "Direct link to Setup and installation")

### Connector validation fails right after installing the GitHub App[​](#connector-validation-fails-right-after-installing-the-github-app "Direct link to Connector validation fails right after installing the GitHub App")

**Symptoms:**

-   **Setup cannot complete:** Validation returns an error instead of transitioning the connector to a healthy, crawling state.
-   **Error messaging:** The error references authentication, installation, connectivity, or organization configuration.

| Cause | Fix |
| --- | --- |
| **Blocked egress IPs:** Glean cannot reach GitHub because Glean's egress IPs are not allowlisted on your network firewall or your GitHub IP allowlist (GitHub Enterprise Cloud). | Add Glean's documented egress IP ranges to both allowlists, then rerun validation. *Note: Connectivity issues surface immediately during validation. They will not silently fail crawls later.* See [GITHUB\_3](/troubleshooting/error-codes/github/github-3) for the full troubleshooting steps. |
| **Incomplete installation:** The GitHub App was not installed, or the installation event was not received by Glean. | Navigate to GitHub, confirm the Glean App is successfully installed on your organization, and rerun validation. See [GITHUB\_1](/troubleshooting/error-codes/github/github-1) for the full troubleshooting steps. |
| **Credential mismatch:** The App credentials in Glean (App ID, Client ID, Client Secret, or private key) do not match the GitHub App. | Copy the correct values directly from the GitHub App's settings page and re-enter them into the Glean admin console. See [GITHUB\_5](/troubleshooting/error-codes/github/github-5) (Client ID or Secret) and [GITHUB\_3](/troubleshooting/error-codes/github/github-3) (App ID or private key) for the full troubleshooting steps. |
| **Organization name mismatch:** The organization name configured in Glean does not match the actual GitHub organization where the App is installed. | Correct the organization name in the Glean admin console and rerun validation. See [GITHUB\_1](/troubleshooting/error-codes/github/github-1) for the full troubleshooting steps. |

**Still not resolved?** Contact Glean Support with your GitHub organization name and the exact text of the validation error.

## Missing content[​](#missing-content "Direct link to Missing content")

### Only some repositories are searchable in Glean[​](#only-some-repositories-are-searchable-in-glean "Direct link to Only some repositories are searchable in Glean")

**Symptoms:**

-   Users can find content in some repositories but not others.
-   Specific repositories that should be indexed do not appear in search results at all.

| Cause | Fix |
| --- | --- |
| **Repository filtering lists:** An active allowlist or blocklist is excluding the repository. | Glean indexes only the repositories granted to the GitHub App installation. Check the connector's configuration for allowedRepositories and blockedRepositories. If adjusted, wait for the next repository discovery crawl to reflect changes. See [GITHUB\_4](/troubleshooting/error-codes/github/github-4) for the full troubleshooting steps. |
| **Private repository access limitations:** The repository is private, meaning strict collaborator permissions apply. | The requesting users are either not collaborators on the repository or have not completed per-user OAuth. See [Developers can't see their private GitHub repositories in Glean](/connectors/native/github/troubleshooting#developers-cant-see-their-private-github-repositories-in-glean). |

### Developers can't see their private GitHub repositories in Glean[​](#developers-cant-see-their-private-github-repositories-in-glean "Direct link to Developers can't see their private GitHub repositories in Glean")

**Symptoms:**

-   A developer searches for code or PRs from a private repository they have access to in GitHub, but receives no results.
-   Public content from the same GitHub organization returns normally in search results.

| Cause | Fix |
| --- | --- |
| **Missing per-user OAuth authentication:** The user has not individually authorized the GitHub connector. | GitHub does not expose user emails directly to the connector. Instruct the user to navigate to **Glean → Settings → Connectors → GitHub** and click **Authorize**. This provides Glean with their GitHub email to match identity mappings, enabling visibility into private repos they already collaborate on without granting new access. |
| **Missing GitHub repository permissions:** The user is not a collaborator on the repository within GitHub itself. | Glean grants private repository visibility strictly based on the repository's explicit collaborator list. Confirm the user is added as a collaborator within GitHub before troubleshooting Glean indexing. |
| **Incorrect GitHub identity authorized:** The user authorized GitHub using a different account identity. | The user may have logged into an incorrect or personal GitHub account during the OAuth process. Have the user disconnect and re-authorize using the specific GitHub account that holds the necessary enterprise permissions. |

### A specific document (issue, PR, or file) is missing from search[​](#a-specific-document-issue-pr-or-file-is-missing-from-search "Direct link to A specific document (issue, PR, or file) is missing from search")

**Symptoms:**

-   A user expects to find a known GitHub issue, PR, or source file, but it is not returned.
-   Other documents within the exact same repository are searchable.
-   A PR or issue appears in Glean, but related details such as diffs, reviews, or comments are still missing.

| Cause | Fix |
| --- | --- |
| **Crawl synchronization delay:** The document was created or updated recently. | New and updated GitHub content is picked up by the incremental content crawl. Allow a scheduled crawl cycle to run, then check again. |
| **Auxiliary data freshness lag:** Related details can take longer to update than the PR or issue itself. | A PR or issue can already appear in search while related data such as diffs, reviews, or comments is still updating. Because this auxiliary data is indexed as part of the existing PR or issue rather than as separate top-level documents, search completeness can improve over time even when overall document counts stay flat. |

**Still not resolved?** Contact Glean Support with the exact URL of the missing document.

### GitHub Pages content doesn't appear in search[​](#github-pages-content-doesnt-appear-in-search "Direct link to GitHub Pages content doesn't appear in search")

**Symptoms:**

-   Documentation hosted on GitHub Pages does not appear in Glean search results.

| Cause | Fix |
| --- | --- |
| **GitHub Pages crawling is disabled:** Glean does not index GitHub Pages by default. | Contact Glean Support to explicitly enable GitHub Pages crawling for your specific connector instance. |
| **Unsupported deployment method:** The Pages site uses a custom GitHub Actions workflow rather than GitHub's branch-based build. | Even when Pages crawling is enabled, Glean only indexes Pages sites that use GitHub's branch-based build (Pages deployed from a branch). Sites built with a custom GitHub Actions workflow aren't indexed. |

Limitation

GitHub Pages crawling is disabled by default. When it's enabled, only sites using GitHub's branch-based build (deployed from a branch) are indexed; Pages built with custom GitHub Actions workflows are not.

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### Users see no results or access-denied messaging across GitHub content[​](#users-see-no-results-or-access-denied-messaging-across-github-content "Direct link to Users see no results or access-denied messaging across GitHub content")

**Symptoms:**

-   **Complete lack of results:** Many users in the organization get no GitHub results at all.
-   **Access-denied messages:** Users see explicit access-denied messaging on GitHub documents within Glean.
-   **Stale data:** Identity data in Glean appears outdated or incomplete.

| Cause | Fix |
| --- | --- |
| **Incomplete initial identity sync:** The first full identity crawl pass is still in progress since the connector was installed. | On large GitHub organizations, the initial identity sync can take time to complete. Glean also processes membership and team changes through identity webhooks in near real time. Check connector status and consult the [GitHub connector documentation](/connectors/native/github/) for more details before debugging individual accounts. |
| **Missing per-user OAuth:** Users have not authenticated their individual GitHub accounts. | For private content, each user must authorize GitHub once by navigating to **Glean → Settings → Connectors → GitHub**. |
| **Pending permission sync:** A recent repository-collaborator assignment or team-membership change in GitHub has not been picked up yet. | The next identity crawl will automatically reflect the change. Allow at least one crawl cycle for permissions to update. |

### Document count or GitHub details are not increasing as expected[​](#document-count-or-github-details-are-not-increasing-as-expected "Direct link to Document count or GitHub details are not increasing as expected")

**Symptoms:**

-   A pull request, issue, or repository appears in Glean, but related details such as PR diffs, review comments, reviews, or other auxiliary content are missing.
-   The overall document count does not increase even though additional GitHub activity has occurred.

| Cause | Fix |
| --- | --- |
| **Auxiliary data processing queue:** Associated GitHub metadata is queued behind the parent entity. | Elements like PR diffs, reviews, and comments are indexed sequentially after the primary document surfaces. Allow time for the connector to finish crawling this auxiliary content. |
| **Flat document count metrics:** Granular updates modify existing document parts rather than creating new records. | Because diffs, reviews, and comments are nested parts of a top-level document, a PR can update with rich text and metadata—improving search completeness—without increasing the overall document count metric. |

### A user account with service-account-like terms in its name or email can't see GitHub content[​](#a-user-account-with-service-account-like-terms-in-its-name-or-email-cant-see-github-content "Direct link to A user account with service-account-like terms in its name or email can't see GitHub content")

**Symptoms:**

-   **Isolated user visibility issues:** A specific user account cannot see any GitHub content in Glean, while other users in the same GitHub organization search content normally.
-   **Service account naming patterns:** The affected account's display name or email contains terms like svc, service, bot, or account.

| Cause | Fix |
| --- | --- |
| **Automated identity filtering:** The account was automatically filtered during identity ingestion because its display name or email triggered service-account exclusion rules. | Check the user's identity profile. If necessary, adjust the display name or email alias to avoid using service-account-like terms. |
| **Missing required identity attributes:** The account is missing critical metadata fields needed for proper mapping. | Confirm the user has all required attributes populated in your primary identity provider, including a department value if your identity setup requires it. |

**Still not resolved?** Contact Glean Support with the affected user's work email and GitHub username.

## Authentication[​](#authentication "Direct link to Authentication")

### Persistent authentication errors after a working install[​](#persistent-authentication-errors-after-a-working-install "Direct link to Persistent authentication errors after a working install")

**Symptoms:**

-   **Sudden connector failure:** The connector worked initially, but subsequently started failing with authentication errors.
-   **Unresolved errors:** Authentication errors persist across multiple crawl attempts and do not self-heal.

| Cause | Fix |
| --- | --- |
| **App uninstalled or suspended:** The Glean GitHub App was manually uninstalled or suspended within the GitHub organization. | Organization administrators cannot change the App's permission scopes, but they can suspend or uninstall it. In GitHub, verify the Glean App is still installed and active. Unsuspend or reinstall it if necessary. See [GITHUB\_3](/troubleshooting/error-codes/github/github-3) for the full troubleshooting steps. |

**Still not resolved?** Contact Glean Support. Persistent authentication failures often require the connector instance to be manually re-validated by the Glean team.

### OAuth or webhook calls between Glean and GitHub are blocked at the network[​](#oauth-or-webhook-calls-between-glean-and-github-are-blocked-at-the-network "Direct link to OAuth or webhook calls between Glean and GitHub are blocked at the network")

**Symptoms:**

-   **Authentication timeouts:** OAuth authorization flows hang indefinitely or fail with timeout errors.
-   **Real-time update failures:** Webhook deliveries from GitHub are not reaching Glean (e.g., new PRs do not appear until the next scheduled incremental crawl).

| Cause | Fix |
| --- | --- |
| **Missing firewall or allowlist rules:** Glean's egress IPs are not allowed on your corporate network firewall or your GitHub IP allowlist (GitHub Enterprise Cloud). | Add Glean's documented egress IP ranges to both your corporate firewall and your GitHub IP allowlist configurations. See [GITHUB\_2](/troubleshooting/error-codes/github/github-2), [GITHUB\_3](/troubleshooting/error-codes/github/github-3), and [GITHUB\_5](/troubleshooting/error-codes/github/github-5) for the full troubleshooting steps. |
| **TLS interception or proxy disruption:** A corporate proxy server is breaking TLS encryption or rewriting critical HTTP headers. | Confirm with your network team that traffic moving between Glean and GitHub is excluded from inspection and is not being intercepted. |

## FAQs[​](#faqs "Direct link to FAQs")

### Does the GitHub connector support GitHub Cloud and GitHub Enterprise Server?

Yes. Glean provides separate connectors for different GitHub hosting models:

-   **GitHub** — for GitHub.com (Cloud), including GitHub Enterprise Cloud. An admin installs a GitHub App (Glean's central app, or your own custom GitHub App), and each end user authorizes their own GitHub account through per-user OAuth.
-   **GitHub Enterprise Server** — for self-hosted GitHub Enterprise Server. It also uses a GitHub App, and additionally requires an admin-issued classic personal access token (with the `user:email`, `read:enterprise`, and `read:org` scopes) for enterprise- and org-level reads.

Choose the connector that matches your hosting model.

### How does Glean enforce GitHub permissions?

Glean's GitHub connector separates content access from identity:

-   An admin installs a GitHub App that crawls org metadata, repositories, issues, pull requests, and each repository's collaborators.
-   Each end user authorizes Glean once through OAuth, which aliases their GitHub email to their crawled GitHub identity.

Glean creates one access group per private repository. That group includes the repository’s direct collaborators and any GitHub Teams that have access to the repository. At search time, a user can see private repository content only if their GitHub identity is a direct collaborator or a member of a team with access to that repository. OAuth determines which Glean user a GitHub identity maps to, while the collaborator and team crawls determine what that identity can access. Public repository content is searchable by any authenticated Glean user in the organization.

### How often does the GitHub connector crawl?

Crawl timing can vary by deployment, repository size, and connector configuration.

-   **Repository discovery:** Glean refreshes repository metadata on a regular schedule.
-   **Content (code, issues, and pull requests):** Glean uses webhooks plus recurring incremental and full crawls to pick up new and updated content.
-   **Identity:** Glean syncs GitHub users, teams, team memberships, and repository access data, and also processes identity webhook events for membership and team changes.

Initial crawls on large organizations can take significantly longer than a single cycle to complete.

### What GitHub content does Glean index?

By default, the connector indexes:

-   Repositories and their metadata.
-   Source code files, including file contents for common code and text file types.
-   Commits and README files.
-   Issues and issue comments.
-   Pull requests, reviews, comments, changed files, and diffs.

The following are **not** indexed by default:

-   Wikis.
-   GitHub Pages content (and when Pages crawling is enabled, only sites using GitHub's branch-based build are indexed — not sites built with custom GitHub Actions workflows).

### How do webhooks, OAuth, and network access work for the GitHub connector?

The GitHub connector can crawl content without webhooks, but webhooks are strongly recommended because they help Glean pick up new and updated GitHub activity faster.

Per-user OAuth serves a different purpose: it maps a user's GitHub identity to their Glean identity so private-repository access can be enforced correctly. It is not a second authentication step required for crawling.

Your network configuration can affect both webhook delivery and OAuth flows. If your firewall or allowlist blocks GitHub webhook events or GitHub-to-Glean traffic, new and updated content may take longer to appear. If OAuth redirects or token exchanges are blocked, users may not be mapped correctly for private-repository access.

If you suspect a network issue, confirm that the required GitHub and Glean traffic is allowed, then check whether webhook deliveries and per-user OAuth are working as expected.

### Can I limit which GitHub repositories Glean indexes?

Yes, through the connector's repository inclusion and exclusion lists (`allowedRepositories` and `blockedRepositories`).

Glean indexes only the repositories granted to the GitHub App installation. If you installed the app on **All repositories**, every repository in the organization is eligible. If you chose **Only select repositories**, only those repositories are eligible. Use the connector's repository filters to further control which repositories within that set are indexed.
