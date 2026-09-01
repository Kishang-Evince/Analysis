---
url: "https://docs.glean.com/connectors/native/salesforce/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/salesforce/choose-your-setup"
title: "Choose your Salesforce setup"
description: "Work out which of the two Salesforce setups is yours, the new setup or the previous setup, and how indexed search, live data, and tools fit together in each."
fetched_at: "2026-09-01T13:29:39.530Z"
---
On this page

Glean connects to Salesforce in two ways. Which one applies to you depends on your Glean deployment, not on when you personally connect Salesforce.

-   **New setup:** you're on a new Glean deployment, created on or after August 14, 2026.
-   **Previous setup:** you're on an existing Glean deployment. This is your path even if you're connecting Salesforce for the first time.

Both paths use the same connector, the same connected app, and the same permission model.

## Salesforce setup comparison: New vs. previous[​](#salesforce-setup-comparison-new-vs-previous "Direct link to Salesforce setup comparison: New vs. previous")

Both setups deliver the same three capabilities once complete, which are indexed search, live data, and tools. What differs is how much you configure up front and when each capability becomes usable.

-   **New setup:** authorization happens up front. Live data and Salesforce tools become usable as soon as the connection is authorized, and search indexing builds in the background. Permission-aware search is then enabled automatically when the initial crawl completes.
-   **Previous setup:** configuration happens up front, covering retrieval methods, object scope, and filters. Live data and tools become usable as soon as data fetching is enabled, and permission-aware search becomes available after the initial crawl completes.

Only permission-aware search waits for the initial crawl, and it waits in both setups. Live data and tools depend on the connection being authorized and on the live retrieval method being enabled, not on indexing being finished.

|  | New setup | Previous setup |
| --- | --- | --- |
| **What you prepare in Salesforce** | You authorize the Glean connected app during setup, over a single OAuth flow | You create an integration user and a connected app, and set its OAuth policies, before you begin setup in Glean |
| **What you configure in Glean** | Object coverage. The standard CRM objects are already selected, and you can add custom objects at any time | Retrieval methods, object scope, custom properties and facets, inclusion and exclusion rules, and query filters |
| **Who needs to be involved** | A Glean org admin, and a Salesforce administrator who can authorize the connected app | The same two roles, plus whoever administers the integration user and its Salesforce permissions |
| **How indexing runs** | In the background, with no crawl schedule for you to configure. Your teams use live data and tools while the index builds | On the crawl schedule you configure, and you confirm the initial sync once it completes |
| **What the live retrieval method is called** | **Live connection**, on the connector's **Overview** tab under **Data retrieval methods** | **Data fetching**, on the connector's **Overview** tab under **Data retrieval methods** |
| **What changes for your current setup** | Not applicable. You are connecting Salesforce for the first time | Nothing. Your connector, its configuration, and its crawl schedule continue to run unchanged |
| **Where to start** | [Set up Salesforce](/connectors/native/salesforce/new-setup) | [Connect Salesforce with Glean](/connectors/native/salesforce/setup) |

Both setups offer the same two retrieval methods, one that crawls and indexes your data and one that retrieves it live at query time, and both are enabled by default when a Salesforce connector is created. The live method remains editable afterward, so a connector on either path can enable it at any time, and each end user authorizes their own Salesforce account the first time they use a live capability. For what each method retrieves, whose permissions it enforces, and when each becomes available, see [How Glean retrieves Salesforce data](/connectors/native/salesforce/about#data-crawling-and-indexing-and-data-fetching).

## See also[​](#see-also "Direct link to See also")

-   [Salesforce overview](/connectors/native/salesforce/about): data, permissions, and sync behavior
-   [Use the Salesforce connector](/connectors/native/salesforce/use-salesforce-connector): live data, tools, and the Service Cloud integration
