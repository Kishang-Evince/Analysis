---
url: "https://docs.glean.com/connectors/custom/about"
canonical: "https://docs.glean.com/connectors/custom/about"
title: "Overview of custom data source"
description: "Learn how to configure custom connectors in Glean to index content from internal tools and systems that don't have native integrations"
fetched_at: "2026-09-01T13:29:18.399Z"
---
On this page

Custom connectors allow organizations to integrate Glean with proprietary or less common applications using Glean's API. These connectors are highly flexible and you can tailor them to meet specific needs. Custom connectors in Glean are specialized integrations built to ingest and index data from sources that are not natively supported by Glean’s standard connector library.

Custom connectors have the following benefits:

-   **Custom connectors**: Organizations can add custom connectors into Glean’s enterprise search software using the API to index application content.
-   **Developer platform**: Glean provides a developer platform to facilitate the creation of custom connectors.
-   **Specific use cases**: Custom connectors are ideal for applications with unique integration needs not met by native or web connectors, particularly for internal company-specific tools where native integration is not feasible.

## Key features[​](#key-features "Direct link to Key features")

-   **Configuration:** Custom connectors use backend configuration to specify settings, environment variables, and secrets like API keys, which are managed securely in the customer’s environment.
-   **Indexing:** Custom connectors leverage Glean’s indexing API to push documents, metadata, and permissions into the Glean platform.
-   **Scheduling:** Crawls and syncs are scheduled like native connectors for daily, weekly, or custom intervals. This is applicable if the connector is deployed in the Glean cloud instance.
-   **Security:** Sensitive configuration data is stored securely, often using the cloud provider’s secret management services.
-   **Flexibility:** Custom connectors can handle different file types, APIs, user permission models, incremental updates, and are robustly designed for error handling and logging.
-   **Image support in Assistant and Agents:** Some custom connectors can include image content as part of indexed content. When a custom connector is configured to send supported image content to Glean, Glean can caption, index, and render relevant images in Assistant and Agent responses, subject to source permissions.

Custom connectors allows you to bring any unique or proprietary data source into Glean, enabling unified search and AI-driven experiences across all their enterprise data.

A connector is custom based on its purpose and deployment:

-   **Purpose:** Custom connectors are designed for data sources that do not have a native Glean connector, such as in-house databases, obscure SaaS tools, or proprietary systems. This could include anything from file shares, legacy applications, external APIs, or even custom document repositories.
    
-   **Deployment:** Glean offers flexibility in how you deploy your custom connector. You can choose to run your connector anywhere you prefer, as there are no platform constraints from Glean on the runtime or hosting pattern. You can either utilize Glean's managed, containerized option or run your own job or service and push data through the Indexing API. Ensure that you adhere to the Indexing API contract and that the basic connector setup is completed, so results render and permissioning functions as expected.
    
    -   On a Glean instance (Glean‑hosted), the connector is packaged as a Docker image and configured in the customer’s deployment. Secrets are managed in the cloud project, and it is deployed or scheduled like a native connector so that the crawls run automatically.
    -   On a customer instance (self‑hosted in GCP or AWS), the same container runs inside the customer’s cloud account. Secrets live in their secret manager, networking allows pushes to Glean’s indexing endpoints, and scheduling or orchestration is handled within that environment.

In all modes of setup, the setup is driven by environment variables and the connector is managed similarly to other connectors once deployed.

## Typical use cases[​](#typical-use-cases "Direct link to Typical use cases")

-   Bringing data from bespoke platforms or legacy systems into the Glean index.
-   Integrating with external APIs for specialized content.
-   Connecting on-premises software or customer-hosted deployments.
-   Enabling real-time or batch ingestion of data where webhook/event-driven models are needed.

note

To set up a custom connector, follow the steps in [Glean developer documentation](https://glean-developer-site.vercel.app/api-info/indexing/getting-started/setup-datasource). If you have any questions, you can ask in the [Glean developer community](https://community.glean.com/groups/).

## Creating a connector[​](#creating-a-connector "Direct link to Creating a connector")

To set up a custom connector:

1.  Navigate to Glean **Admin console** → **Connectors**.

note

You can also use Glean's API or SDK for development of custom connectors and integrate it directly with your internal system.

2.  Click **Add connector**.

![Adding connector](/img/custom-connector-add-connectors.png)

3.  Scroll down in the list of available connectors and click on **Custom**.

![Adding a custom connector in Glean](/img/custom-connector-1.png)

4.  Customize the connector by adding the following details:

-   Name of the connector
-   How results for this connector appear (including the icon that users see)
-   Quick actions users can take directly from the Glean Home or New Tab Page

![Configuring a custom connector](/img/connectors/custom/about/ff9e61f608ae22983aa83d6824db839c.png)

Advanced settings are available to configure the display of search result titles and URLs, specify app object types, and customize app filters. You can find more information on options in the [Glean developer documentation](https://developers.glean.com/api/indexing-api/add-or-update-datasource).

For dedicated setup guides covering specific custom connectors, see [Available connectors](/connectors/custom/connector-guides/).

If you have any queries or concerns, reach out to the [Glean support team](https://support.glean.com/hc/en-us/requests/new).
