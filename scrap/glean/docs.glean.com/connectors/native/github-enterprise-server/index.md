---
url: "https://docs.glean.com/connectors/native/github-enterprise-server/"
canonical: "https://docs.glean.com/connectors/native/github-enterprise-server/"
title: "GitHub Enterprise Server"
description: "How the Glean GitHub Enterprise Server connector indexes content across one or more self-hosted instances."
fetched_at: "2026-09-01T13:29:28.776Z"
---
On this page

The GitHub Enterprise Server connector lets Glean fetch and index content from a self-hosted GitHub Enterprise Server instance, so users can search the repositories, code, and activity they have access to. Each instance you connect is its own connector instance in Glean, with its own authentication, domain, and crawler configuration. Glean authenticates by creating a GitHub App on your instance, and enforces all user access permissions at query time. All data is stored in the customer's cloud account and no data leaves the customer's environment.

Network reachability

These instructions work for on-prem instances the Glean crawler can access. Glean supports deployments on both GCP and AWS. Your GitHub Enterprise Server instance must be network-accessible to the Glean crawler running in your cloud. Contact Glean Support for any network configuration required.

When you are ready to connect, follow the [setup guide](/connectors/native/github-enterprise-server/setup).

## Multiple instances[​](#multiple-instances "Direct link to Multiple instances")

You can connect multiple GitHub Enterprise Server instances to a single Glean deployment. Each is a separate connector instance that crawls and indexes independently, and Glean combines results from all of them for end users while enforcing GitHub permissions on each.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

For GitHub Enterprise Server, Glean captures the following content:

-   PR descriptions
-   PR conversations and comments
-   Issue threads
-   Commit messages for the main branch
-   Wikis
-   Code (for use in Glean)
-   GitHub Pages: you must enter a comma-separated list of repository names to include Pages in your search index. Only repositories that use the legacy `gh-pages` branch based workflow are supported, and within that branch only HTML and Markdown files are indexed.

Code Search

Code Search is supported in Glean and Tools for repositories connected through GitHub Enterprise Server. It is enabled by default once connected; the previous Admin console toggle has been removed. See [Code Search](/user-guide/assistant/code-search) for more details.

File types

Content indexing is limited to specific file types for Text and Markdown (.txt, .md) and Code and Configuration files (.cmd, .c, .h, .cs, .csx, .cpp, .c++, .cc, .h++, .hh, .hpp, .cmake, .cob, .cbl, .css, .clj, .cljs, .cls, .dockerfile, .go, .graphql, .gql, .graphqls, .hs, .ini, .cfg, .cnf, .java, .js, .json, .jsx, .jl, .kt, .kts, .lua, .ml, .php, .pas, .pl, .perl, .proto, .py, .py3, .r, .rd, .rb, .rs, .scss, .sql, .mysql, .scala, .sc, .sh, .bash, .swift, .tf, .ts, .tsx, .us, .vhdl, .vhd, .vlg, .verilog, .yaml, .yml).

note

Contact Glean Support to explore crawling additional content types beyond those listed above.

## Files on non-default branches, tags, and commits[​](#files-on-non-default-branches-tags-and-commits "Direct link to Files on non-default branches, tags, and commits")

Glean indexes code files on each repository's default branch. When a user opens or references a file on another branch, a tag, or a specific commit, Glean can fetch that file directly from your GitHub Enterprise Server instance at that moment using the user's own access. This makes files outside the default branch available even though they aren't indexed, and the user's GitHub permissions are still enforced.

Files on a branch whose name contains a forward slash (for example, `feature/login`) can't be fetched this way. To reach such a file on demand, reference it by its commit SHA instead of the branch name.

## API usage[​](#api-usage "Direct link to API usage")

Glean uses the standard API to ingest all data. To capture changes as quickly as possible, you configure the GitHub App to send webhook push notifications to an endpoint in your cloud infrastructure.

When you create the GitHub App during setup, you grant it the following **read-only** permissions:

-   **Repository permissions:** Administration, Contents, Issues, Metadata, Pull requests, Commit statuses, Pages
-   **Organization permissions:** Members
-   **User permissions:** Email addresses

You also subscribe the App to these events: Commit comment, Issue comment, Member, Organization, Pull request, Pull request review, Pull request review comment, Push, Repository, Team, and Team add.

Setup additionally requires an admin-issued classic personal access token with the `user:email`, `read:enterprise`, and `read:org` scopes. See the [setup guide](/connectors/native/github-enterprise-server/setup) for details.

## Identity[​](#identity "Direct link to Identity")

-   **Users:** Glean syncs GitHub users for permission resolution.
-   **Repositories and collaborators:** Glean builds a per-repository access group from each private repository's collaborators, so users see only the repositories they can access.
-   **Full identity crawls:** Conducted periodically to ensure all identity data stays up to date.

Additive permission changes, such as adding or removing a repository's collaborators, or adding and removing users from the organization, are picked up by Glean's periodic identity crawls.
