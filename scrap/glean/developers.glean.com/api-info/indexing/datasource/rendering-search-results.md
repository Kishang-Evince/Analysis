---
url: "https://developers.glean.com/api-info/indexing/datasource/rendering-search-results"
canonical: "https://developers.glean.com/api-info/indexing/datasource/rendering-search-results"
title: "Rendering Search Results | Glean Developer"
description: "The rendering behavior of the search results from a datasource are determined by 3 ways (in increasing order of preference):"
fetched_at: "2026-09-01T13:22:50.627Z"
---
On this page

The rendering behavior of the search results from a datasource are determined by 3 ways (in increasing order of preference):

1.  Default rendering behavior, based on the datasourceCategory (no further action required)
2.  Customized render config based on requirements (please contact glean support to set this up)
3.  Re-using the rendering configuration of another datasource (eg. gdrive)

## Default rendering behavior based on datasource category[​](#default-rendering-behavior-based-on-datasource-category "Direct link to Default rendering behavior based on datasource category")

Datasource categories are set for a datasource during the data source setup phase (or `/adddatasource` endpoint). The [field](/api-info/indexing/datasource/category) is typically set for all custom data sources. For information on the meaning of each category, refer to this document: [Selecting datasource category](/api-info/indexing/datasource/category)

With no further action required from the developer, we will aim to render results from the datasource of the specified datasource categories with information typically surfaced in results from that category.

We have specific default rendering behaviour for the following datasource categories:

-   `PUBLISHED_CONTENT`
-   `KNOWLEDGE_HUB`

For other categories, the rendering would be a vanilla icon + title + snippet (see screenshot below).

-   The [icon URL](/api/indexing-api/add-or-update-datasource#request) is fetched from the datasource config (as defined during the /adddatasource call (or) in the datasource setup page in the admin console).
-   The snippets are generated based on the relevance between the query and the provided body text.
-   The title is provided in the [display name](/api/indexing-api/add-or-update-datasource#request) while indexing documents.

Contact glean support to further customize rendering for your datasource (option 2).

### PUBLISHED\_CONTENT[​](#published_content "Direct link to PUBLISHED_CONTENT")

Results from datasources with the datasourceCategory set to `PUBLISHED_CONTENT` would include the [last updated time](/api/indexing-api/bulk-index-documents#request), [author](/api/indexing-api/bulk-index-documents#request) and [container](/api/indexing-api/bulk-index-documents#request) (if any) in the meta line.

### KNOWLEDGE\_HUB[​](#knowledge_hub "Direct link to KNOWLEDGE_HUB")

Similar to `PUBLISHED_CONTENT`, datasources with `KNOWLEDGE_HUB` would include the [last updated time](/api/indexing-api/bulk-index-documents#request), [owner](/api/indexing-api/bulk-index-documents#request) (instead of author) and [container](/api/indexing-api/bulk-index-documents#request) (if any) in the meta line.

Datasources with the above 2 categories, typically look like the following:

## Customized render config based on requirements[​](#customized-render-config-based-on-requirements "Direct link to Customized render config based on requirements")

info

Currently, this step requires contacting glean support to get the behaviour support.

Examples of requests include:

-   I need a custom list of attributes to show up in the ‘meta line’ (ie. the line below the title)
-   I need a different icon to show up for different object types

For now, this will be setup by Glean internally - but in the future we expect to enable admins/developers to configure this themselves via the Glean admin console.

Here is an example of customized rendering for a search result:

The example above is for an internal job portal datasource and shows how we can add custom attributes like level, location, job role, engineering manager (as a person field).

## Re-using rendering configuration of another datasource[​](#re-using-rendering-configuration-of-another-datasource "Direct link to Re-using rendering configuration of another datasource")

To do this, you can set the [renderConfigPreset](/api/indexing-api/add-or-update-datasource#request) in the datasource config (when making /adddatasource calls or setting up a datasource via the admin console).

This field can be set to the name of any datasource supported by glean (in lower case). While it is recommended to contact Glean support to help get this setup - some of the common values used for this field include:

-   gdrive
-   jira
-   zendesk
-   salesforce

info

If you want to go back to using the default rendering behaviour (option 1) OR the custom rendering setup through option 2, you **must unset the renderConfigPreset in the datasource config.**
