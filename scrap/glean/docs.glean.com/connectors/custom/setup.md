---
url: "https://docs.glean.com/connectors/custom/setup"
canonical: "https://docs.glean.com/connectors/custom/setup"
title: "Set up a custom connector"
description: "Create a custom connector in the Glean admin console, configure how its results appear, and run the first-run checklist before you index at scale."
fetched_at: "2026-09-01T13:29:20.450Z"
---
On this page

Before your connector pushes any documents, create it in Glean. The connector is the container that holds your documents and tells Glean how to display and secure them. This page walks through creating one, the advanced settings worth configuring up front, and a first-run checklist to validate the integration end to end.

Prerequisite

Decide where your connector will run first - see [Choose a deployment model](/connectors/custom/deployment). Setup is driven by environment variables in both models.

## Create a connector[​](#create-a-connector "Direct link to Create a connector")

1

Open the connector setup

In the Glean admin console, go to **Admin console → Connectors → Add connector** to begin creating a custom connector.

2

Choose a custom connector

Select the option to create a **custom** connector rather than a managed native connector.

3

Define the connector details

Give the connector a name and identifier, and configure the core metadata that controls how its documents appear in search.

## Configure how results appear[​](#configure-how-results-appear "Direct link to Configure how results appear")

When you define the connector, set the metadata that controls how each document is displayed and ranked:

-   **Title, URL, and icon** - what users see in results and how they click through to the source.
-   **Rendering behavior** - the category and how documents are presented in the results list.
-   **Permissions model** - whether documents are permission-aware (per-user ACLs pushed with each document) or visible to everyone in the org.

Advanced settings

You can fine-tune category, display options, and other behavior in the connector's advanced settings. See [Add or update a datasource](https://developers.glean.com/api/indexing-api/add-or-update-datasource) in the developer docs for the full set of fields.

## First-run checklist[​](#first-run-checklist "Direct link to First-run checklist")

Run through this checklist on your first integration before you index at scale. It mirrors the end-to-end "create → configure → test" path that catches the most common setup mistakes early.

1

Define the connector metadata

Set the name, identifier, and display name so the source is identifiable in search and in the admin console.

2

Configure title, URL, icon, and rendering behavior

Confirm documents link back to the source correctly and render with the right icon and category.

3

Confirm the permissions model

Decide and configure whether documents are permission-aware (per-user ACLs) or org-visible, and make sure your push payloads match that model.

4

Validate the indexing token scope

Confirm your indexing token has the scope required to write to this connector. See [Glean REST APIs](/connectors/custom/glean-apis) for how indexing tokens differ from client tokens.

5

Test one sample document and one permissioned document

Index a single public sample document and confirm it appears in search. Then index one permissioned document and confirm only authorized users can see it. Once both behave correctly, scale up.

## Developer resources[​](#developer-resources "Direct link to Developer resources")

The admin console creates and configures the connector; pushing documents is done through the Indexing API. For request formats, SDKs, and code samples:

-   [Glean developer docs - set up a datasource](https://glean-developer-site.vercel.app/api-info/indexing/getting-started/setup-datasource)
-   [Glean Developer Community](https://community.glean.com)
-   [Glean REST APIs](/connectors/custom/glean-apis) - the Indexing and Client APIs and the tokens each uses.

If you run into issues during setup, see [Troubleshooting](/connectors/custom/troubleshooting) or [contact Glean support](https://support.glean.com/hc/en-us/requests/new).

## Next steps[​](#next-steps "Direct link to Next steps")

[

### Available connectors

Browse setup guides for the available custom connectors.







](/connectors/custom/connector-guides/)[

### Troubleshooting

Diagnose indexing, permissions, and rendering problems.







](/connectors/custom/troubleshooting)
