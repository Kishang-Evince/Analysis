---
url: "https://docs.glean.com/connectors/native/github/"
canonical: "https://docs.glean.com/connectors/native/github/"
title: "GitHub"
description: "Connect Glean to GitHub for permission-aware search across repositories, code, commits, issues, and pull requests."
fetched_at: "2026-09-01T13:29:28.971Z"
---
On this page

![GitHub logo](/img/connectors/icons/github.svg)GitHub

# Make your GitHub code and activity searchable in Glean

Indexes repositories, code, commits, issues, and pull requests across GitHub Cloud, Enterprise Server, and Server. Always scoped to each user's permissions.

GitHub CloudEnterprise ServerServerPermission-awareCode searchPer-user OAuth

[Set up GitHub Cloud](/connectors/native/github/about)[Compare deployments](/connectors/native/github/#compare-deployments)

## Choose your deployment[​](#choose-your-deployment "Direct link to Choose your deployment")

Glean has a connector for each GitHub hosting model. Pick the one that matches how your organization runs GitHub.

[

Most common

### GitHub Cloud

For GitHub.com, including GitHub Enterprise Cloud. An admin installs a GitHub App and each user authorizes their own account through per-user OAuth.







](/connectors/native/github/about)[

### GitHub Enterprise Server

For self-hosted GitHub Enterprise Server, including multiple instances on one Glean deployment. Uses a GitHub App plus an admin personal access token.







](/connectors/native/github-enterprise-server/)[

### GitHub Server

For on-prem GitHub Server instances the Glean crawler can reach. Uses a GitHub App created on your instance.







](/connectors/native/github-server/)

## Compare deployments[​](#compare-deployments "Direct link to Compare deployments")

All three connectors index the same GitHub content (repositories, code, commits, issues, and pull requests) and enforce permissions at query time. They differ in where GitHub is hosted, how Glean authenticates, and a few capabilities.

|  | GitHub Cloud | Enterprise Server | Server |
| --- | --- | --- | --- |
| **Best for** | GitHub.com, including GitHub Enterprise Cloud | Self-hosted GitHub Enterprise Server | On-prem GitHub Server the crawler can reach |
| **Authentication** | GitHub App + per-user OAuth | GitHub App + admin personal access token | GitHub App created on your instance |
| **Per-user OAuth for private repos** | Required | Not used | Not used |
| **Multiple instances** | No | Supported on one Glean deployment | No |
| **Network** | Glean-hosted; nothing to expose | Instance must be reachable by the crawler | Instance must be reachable by the crawler |
| **Code Search** | On by default | On by default | On by default |
| **GitHub Pages** | Legacy `gh-pages` sites, by repo list | Legacy `gh-pages` sites, by repo list | Legacy `gh-pages` sites, by repo list |

Not sure which you run? Most GitHub.com customers use **GitHub Cloud**. Choose **Enterprise Server** or **Server** only if GitHub is self-hosted in your own environment.

## Explore by deployment[​](#explore-by-deployment "Direct link to Explore by deployment")

-   GitHub Cloud
-   GitHub Enterprise Server
-   GitHub Server

[

### Overview

What the GitHub Cloud connector indexes, how identity works, and how often it crawls.







](/connectors/native/github/about)[

### Setup

Install the Glean GitHub App, configure the connector, and enable per-user OAuth for private repositories.







](/connectors/native/github/setup)[

### Crawling restrictions

Control which repositories Glean crawls using repository inclusion and exclusion lists.







](/connectors/native/github/restrictions)

[

### Overview

What the connector indexes on self-hosted Enterprise Server, including support for multiple instances on one Glean deployment.







](/connectors/native/github-enterprise-server/)[

### Setup

Create the GitHub App, provide the admin personal access token, and connect each instance.







](/connectors/native/github-enterprise-server/setup)

[

### Overview

What the connector indexes on an on-prem GitHub Server instance the Glean crawler can reach.







](/connectors/native/github-server/)[

### Setup

Create the GitHub App on your instance and configure the connector in Glean.







](/connectors/native/github-server/setup)

## Security[​](#security "Direct link to Security")

[

### API endpoints

The GitHub REST API endpoints the connector calls and the read-only scopes it requests.







](/connectors/native/github/api)[

### Permissions

The fixed, read-only GitHub App permissions Glean uses and how they map to indexed content.







](/connectors/native/github/api#github-app-permissions)

## Support[​](#support "Direct link to Support")

[

### Troubleshooting and FAQs

Fixes for setup, missing content, permissions, and authentication issues.







](/connectors/native/github/troubleshooting)[

### Error codes

Look up connector error codes and what they mean.







](/troubleshooting/error-codes/)
