---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/RecommendationsSearchOptions"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/RecommendationsSearchOptions"
title: "RecommendationsSearchOptions | Glean Developer"
description: "Extends"
fetched_at: "2026-09-01T13:23:06.704Z"
---
On this page

## Extends[​](#extends "Direct link to Extends")

-   `Pick`<[`SearchOptions`](/libraries/web-sdk/reference/interfaces/SearchOptions), `"hideAutocomplete"` | `"onSearch"` | `"datasource"` | `"datasourcesFilter"`\>

## Extended by[​](#extended-by "Direct link to Extended by")

-   [`RecommendationsOptions`](/libraries/web-sdk/reference/interfaces/RecommendationsOptions)

## Properties[​](#properties "Direct link to Properties")

### datasource?[​](#datasource "Direct link to datasource?")

```
optional datasource?: string;
```

Select the search tab for the given datasource (e.g. `'confluence'`, `'gdrive'`, `'people'`) instead of the all tab. Other datasource tabs will be shown if results are available for the current query. See also [SearchOptions.datasourcesFilter](/libraries/web-sdk/reference/interfaces/SearchOptions#datasourcesfilter).

#### Inherited from[​](#inherited-from "Direct link to Inherited from")

[`SearchOptions`](/libraries/web-sdk/reference/interfaces/SearchOptions).[`datasource`](/libraries/web-sdk/reference/interfaces/SearchOptions#datasource)

* * *

### datasourcesFilter?[​](#datasourcesfilter "Direct link to datasourcesFilter?")

```
optional datasourcesFilter?: string[];
```

Filter search results to only the given list of datasources (e.g. `['figma']`, `['jira', 'zendesk']`). Results from other datasources will not be available. See also [SearchOptions.datasource](/libraries/web-sdk/reference/interfaces/SearchOptions#datasource).

#### Inherited from[​](#inherited-from-1 "Direct link to Inherited from")

[`SearchOptions`](/libraries/web-sdk/reference/interfaces/SearchOptions).[`datasourcesFilter`](/libraries/web-sdk/reference/interfaces/SearchOptions#datasourcesfilter)

* * *

### hideAutocomplete?[​](#hideautocomplete "Direct link to hideAutocomplete?")

```
optional hideAutocomplete?: boolean;
```

If true, search boxes will not render the autocomplete dropdown.

#### Inherited from[​](#inherited-from-2 "Direct link to Inherited from")

[`SearchOptions`](/libraries/web-sdk/reference/interfaces/SearchOptions).[`hideAutocomplete`](/libraries/web-sdk/reference/interfaces/SearchOptions#hideautocomplete)

* * *

### onSearch[​](#onsearch "Direct link to onSearch")

```
onSearch: (query) => void;
```

A callback invoked when the user performs a search query.

#### Parameters[​](#parameters "Direct link to Parameters")

| Parameter | Type |
| --- | --- |
| `query` | `string` |

#### Returns[​](#returns "Direct link to Returns")

`void`

#### Inherited from[​](#inherited-from-3 "Direct link to Inherited from")

[`SearchOptions`](/libraries/web-sdk/reference/interfaces/SearchOptions).[`onSearch`](/libraries/web-sdk/reference/interfaces/SearchOptions#onsearch)
