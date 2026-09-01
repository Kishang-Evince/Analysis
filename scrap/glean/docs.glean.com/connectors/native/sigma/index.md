---
url: "https://docs.glean.com/connectors/native/sigma/"
canonical: "https://docs.glean.com/connectors/native/sigma/"
title: "Sigma"
description: "Find Sigma dashboards and ask natural-language questions about Sigma data in Glean."
fetched_at: "2026-09-01T13:29:42.246Z"
---
On this page

![Sigma logo](/img/connectors/icons/sigma.svg)Sigma

# Find Sigma dashboards and ask natural-language questions about Sigma data in Glean

Search for Sigma workbooks, pages, and elements through the indexed connector — then add Glean Assistant to let users ask natural-language questions about Sigma data. Always scoped to each user's Sigma permissions.

Indexed by defaultNatural-language queriesAPI key authPermission-aware

[Set up search integration](/connectors/native/sigma/connector)[Compare integration methods](#at-a-glance)

## At a glance[​](#at-a-glance "Direct link to At a glance")

Glean offers two ways to integrate with Sigma. Each serves a different purpose, and together they give your organization both searchable Sigma content and natural-language data access in one place.

|  | Search integration | Assistant |
| --- | --- | --- |
| **Purpose** | Index Sigma workbooks, pages, and elements into Glean search | Let users ask natural-language questions about Sigma data |
| **Data model** | Crawled and indexed | Live access at request time |
| **Authentication** | API client credentials (machine-to-machine) | Per-user impersonation via token exchange |
| **Setup owner** | Sigma admin and Glean admin | Glean admin (reuses connector credentials) |
| **End-user experience** | Search and open indexed Sigma results | Ask natural-language questions and get answers from Sigma data in Glean Assistant |

## Which one should you start with?[​](#which-one-should-you-start-with "Direct link to Which one should you start with?")

Start with the **search integration** to make Sigma content broadly discoverable in Glean. Then add **Sigma in Assistant** to let users ask natural-language questions about Sigma data.

The search integration handles discovery and navigation. Assistant handles natural-language data questions. We recommend enabling both for the best Sigma experience in Glean.

info

Sigma in Assistant requires the Sigma connector to be set up first.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

[

Start here

### Search integration

Set up the Sigma connector to index workbooks, pages, and elements into Glean search. This is the foundation for all Sigma integrations.







](/connectors/native/sigma/connector)[

Beta

### Sigma in Assistant

Enable Sigma data access in Glean Assistant so users can ask natural-language questions about dashboards and metrics.







](/connectors/native/sigma/assistant)

## Using Sigma in Glean[​](#using-sigma-in-glean "Direct link to Using Sigma in Glean")

[

### Use Sigma in Glean

Learn what you can do with Sigma content in Glean — from finding dashboards to asking natural-language questions about your data.







](/connectors/native/sigma/use-sigma)
