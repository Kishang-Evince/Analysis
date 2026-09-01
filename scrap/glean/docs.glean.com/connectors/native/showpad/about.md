---
url: "https://docs.glean.com/connectors/native/showpad/about"
canonical: "https://docs.glean.com/connectors/native/showpad/about"
title: "Showpad overview"
description: "Learn how the Glean Showpad connector uses federated search and federated fetch, how it enforces Showpad permissions, and what content it can retrieve."
fetched_at: "2026-09-01T13:29:41.817Z"
---
On this page

Showpad is a cloud-based sales enablement platform for storing, organizing, and sharing sales content. Use the Showpad connector so that your users can search Showpad assets from Glean without leaving their workflow.

Glean retrieves Showpad results live at query time using the searching user's Showpad authorization, so results always reflect the current state of your Showpad library.

To connect Showpad to Glean, see [Setup](/connectors/native/showpad/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The connector uses federated search to query Showpad each time a user searches, and federated fetch to retrieve content from eligible, downloadable document assets on demand. Each user authorizes Glean with their own Showpad account, so every query runs with that user's own Showpad Experience permissions and returns only the assets they are entitled to see. The connector is strictly read-only and never modifies data in Showpad.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Assets | Showpad assets of any type, including documents, presentations, spreadsheets, images, videos, pages, and links. Glean returns the asset title, type, creation and update times, the first listed author, and a link to the asset in Showpad. |
| Users | Resolved live when the corresponding filter is used. Users are also looked up to display the first listed author. |
| Tags | Resolved live when the corresponding filter is used to translate tag names into the identifiers that Showpad expects. |

## Supported filters[​](#supported-filters "Direct link to Supported filters")

Glean translates a user's query into ShowQL, Showpad's query language, and supports the following filters.

| Filter | How Glean applies it |
| --- | --- |
| Free text | Matches against the asset name, description, and extracted text. |
| Type | Restricts results to a Showpad asset type, such as a document, photo, video, audio, page, or link. |
| Author and owner | Resolves the person you name to a Showpad user and restricts results to assets by that author. Both filters apply to the asset's author list. |
| Updated before and after | Restricts results by the date an asset was last updated. |
| Created before and after | Restricts results by the date an asset was created. |
| Tag | Resolves the tag you name to a Showpad tag and restricts results to assets carrying it. |

If Glean cannot resolve a filter, for example when a named person or tag does not exist in Showpad, the search returns no results rather than a broader set of matches.

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector calls the following Showpad endpoints. All calls are read-only.

-   `POST /v4/assets/query`: runs the [ShowQL query](https://developer.showpad.com/docs/apis/references/v4#/operations/postAssetsQuery) that produces search results.
-   `GET /v4/assets`: [looks up an asset](https://developer.showpad.com/docs/apis/references/v4#/operations/getAssets) by its slug when a user opens a Showpad link.
-   `GET /v4/users`: [resolves users](https://developer.showpad.com/docs/apis/references/v4#/operations/getUsers) for author and owner filters and for author display names.
-   `GET /v4/tags`: [resolves tags](https://developer.showpad.com/docs/apis/references/v4#/operations/getTags) for tag filters.
-   `GET /v3/assets/{id}.json`: reads [asset details](https://developer.showpad.com/docs/apis/references/v3#/operations/get_assets_id) such as file type, size, and download availability before Glean retrieves content.

## Permissions[​](#permissions "Direct link to Permissions")

Authorization happens at two levels.

-   **Deployment level:** a Showpad administrator registers an OAuth client for Glean and grants it read-only access to content, users, and divisions, plus the ability to refresh its own tokens. See [Setup](/connectors/native/showpad/setup).
-   **User level:** each user authorizes Glean with their own Showpad account the first time they search Showpad. Glean uses that user's token for both search and content retrieval, so Showpad itself decides what the user can see. Users who have not authorized Glean receive no Showpad results.

## Limitations[​](#limitations "Direct link to Limitations")

-   Glean returns Showpad results only while the live connection is working.
-   Search results include Showpad asset metadata only, such as the title, type, dates, author, and link. Glean doesn't return the asset body or a content snippet in the search response.
-   Glean can retrieve content only from downloadable Showpad documents with supported file types and within the connector's file-size limit. ZIP and other archive files aren't supported for content retrieval.
-   Federated fetch doesn't support folder, collection, or Experience landing URLs that lack an individual asset slug. To retrieve an asset, use a direct asset link or a `/webapp2` URL that includes the asset's `slug`. The asset must exist and pass the fetchability requirements.
-   When an asset lists multiple authors, Glean shows only the first author.
-   Showpad assets aren't available in features that require indexed content.

## See also[​](#see-also "Direct link to See also")

-   [Showpad setup](/connectors/native/showpad/setup)
