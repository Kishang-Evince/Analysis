---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/RecommendationsResultsOptions"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/RecommendationsResultsOptions"
title: "RecommendationsResultsOptions | Glean Developer"
description: "Extends"
fetched_at: "2026-09-01T13:23:06.683Z"
---
On this page

## Extends[​](#extends "Direct link to Extends")

-   `Pick`<[`TabbedSearchOptions`](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions), `"hideDatasourceFilter"` | `"onDatasourceChange"`\>

## Extended by[​](#extended-by "Direct link to Extended by")

-   [`RecommendationsOptions`](/libraries/web-sdk/reference/interfaces/RecommendationsOptions)

## Properties[​](#properties "Direct link to Properties")

### hideDatasourceFilter?[​](#hidedatasourcefilter "Direct link to hideDatasourceFilter?")

```
optional hideDatasourceFilter?: boolean;
```

If true, hide the datasource filter in the righthand column of the search results page.

#### Inherited from[​](#inherited-from "Direct link to Inherited from")

[`TabbedSearchOptions`](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions).[`hideDatasourceFilter`](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions#hidedatasourcefilter)

* * *

### onDatasourceChange?[​](#ondatasourcechange "Direct link to onDatasourceChange?")

```
optional onDatasourceChange?: (datasource?) => void;
```

A callback invoked when the user changes search tabs to a different datasource. If `undefined`, all datasources are shown.

#### Parameters[​](#parameters "Direct link to Parameters")

| Parameter | Type |
| --- | --- |
| `datasource?` | `string` |

#### Returns[​](#returns "Direct link to Returns")

`void`

#### Inherited from[​](#inherited-from-1 "Direct link to Inherited from")

[`TabbedSearchOptions`](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions).[`onDatasourceChange`](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions#ondatasourcechange)
