---
url: "https://docs.glean.com/connectors/custom/deployment"
canonical: "https://docs.glean.com/connectors/custom/deployment"
title: "Choose a deployment model"
description: "Compare the two ways to run a custom connector — Glean-hosted or self-hosted in your own cloud — and decide which fits your environment."
fetched_at: "2026-09-01T13:29:20.291Z"
---
On this page

Glean places no constraints on where a custom connector runs — there's no required runtime or hosting pattern. You can use Glean's managed, containerized option, or run your own job or service and push data through the [Indexing API](https://developers.glean.com/). Choose where it runs **before you build**, because it determines how secrets, scheduling, and networking are handled.

There are two deployment models:

### Glean-hosted

The connector is packaged as a Docker image and configured in your Glean deployment. Glean manages secrets, scheduling, and runtime for you.

### Self-hosted (GCP or AWS)

The same container runs inside your own cloud account. You manage secrets, scheduling, and networking to Glean's indexing endpoints.

## Compare the models[​](#compare-the-models "Direct link to Compare the models")

| Dimension | Glean-hosted | Self-hosted (GCP or AWS) |
| --- | --- | --- |
| **Runtime** | Packaged as a Docker image and configured in your Glean deployment. | The same container runs inside your own cloud account. |
| **Secrets** | Managed in the Glean cloud project. | Stored in your own secret manager. |
| **Scheduling** | Crawls run automatically, scheduled like a native connector. | You handle scheduling and orchestration in your environment. |
| **Networking** | Managed within the Glean deployment. | Your environment must allow pushes to Glean's indexing endpoints. |
| **Best for** | Teams who want Glean to manage runtime and scheduling. | Teams with strict data-residency or network controls. |

In both models, setup is driven by environment variables, and the connector is managed like any other connector once deployed.

## How each model works[​](#how-each-model-works "Direct link to How each model works")

-   Glean-hosted
-   Self-hosted

On a Glean instance, the connector is packaged as a Docker image and configured in your deployment:

-   **Secrets** are managed in the Glean cloud project.
-   The connector is **deployed and scheduled like a native connector**, so crawls run automatically.
-   Glean manages the runtime — you don't operate any infrastructure.

This is the simplest option when you don't have a specific requirement to keep the connector inside your own cloud.

On a customer instance, the same container runs inside your own cloud account (GCP or AWS):

-   **Secrets** live in your own secret manager.
-   **Networking** must allow the connector to push to Glean's indexing endpoints.
-   **Scheduling and orchestration** are handled within your environment.

Choose this when data-residency, network isolation, or internal security policies require the connector to run inside your infrastructure.

Which should you choose?

Pick **Glean-hosted** if you want Glean to manage runtime and scheduling and you have no requirement to keep the connector in your own cloud. Pick **self-hosted** if data-residency or network controls require the connector to run inside your GCP or AWS account.

## Next steps[​](#next-steps "Direct link to Next steps")

[

### Set up a custom connector

Create the connector and run the first-run checklist.







](/connectors/custom/setup)[

### Glean REST APIs

The Indexing and Client APIs, and the tokens each uses.







](/connectors/custom/glean-apis)
