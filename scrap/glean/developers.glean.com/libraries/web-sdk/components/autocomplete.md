---
url: "https://developers.glean.com/libraries/web-sdk/components/autocomplete"
canonical: "https://developers.glean.com/libraries/web-sdk/components/autocomplete"
title: "Search Box + Results | Glean Developer"
description: "Build a custom search page by combining Glean's search box and search results components"
fetched_at: "2026-09-01T13:23:05.446Z"
---
On this page

Compose a full search experience from two coordinated components: an autocomplete search box (`renderSearchBox`) and a tabbed results page (`renderSearchResults`). This approach gives you the deepest UI control - you own the page layout, Glean renders the search surfaces.

PreviewLive - your instance

portal.sample.internal/search

payments

CPayments Service - Deploy & Rollback RunbookEngineering Wiki · Updated 2 days ago

Gpayments-servicegit.internal/payments-service · 1mo ago

from:teammate

type:bug, document, message, etc.

⏎ Enter Search

All filtersFrom: meUpdated

AllCGSJ

C

Payments Service - Deploy & Rollback RunbookPriya Natarajan · Updated 2 days ago · Engineering WikiCanary the payments service behind the feature gate, then promote once error rates hold under 0.1% for 15 minutes…

G

payments-serviceRepository · 42 open pull requestsOwns charge creation, refunds, and ledger writes. See the runbook before deploying to production…

S

#payments-oncall - canary alarm follow-upMarcus Webb · YesterdayThe alarm cleared after we rolled back - updating the runbook with the new dashboard links…

Illustrative previewRendered with sample data - in your app, this component renders live against your organization's Glean instance. Try it live →

## Install the SDK[​](#install-the-sdk "Direct link to Install the SDK")

-   npm
-   Script tag

```
npm install @gleanwork/web-sdk
```

Include the JavaScript library in the `<head>` section of your page. Replace `GLEAN_APP_DOMAIN` with your company's Glean web app domain (typically `app.glean.com` or `your-company.glean.com` if you use a custom subdomain).

```
<script  defer  src="https://{GLEAN_APP_DOMAIN}/embedded-search-latest.min.js"></script>
```

info

The Glean web app domain differs from your company's Glean backend domain (find yours at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under "Server instance (QE)"). The same methods are available on `window.GleanWebSDK` once the `glean:ready` event fires.

## Render the search page[​](#render-the-search-page "Direct link to Render the search page")

1.  Create two container elements - one for the search box, one for results - each with `position: relative`, `display: block`, and appropriate sizing.

Sizing the search box container

The search box fills its container (minus any margins from `searchBoxCustomizations`), so size the container to the box itself - around 50–90px tall - not to the dropdown. The autocomplete dropdown renders below the box and extends past the container's bounds, so make sure no ancestor clips it with `overflow: hidden`, and give the search box container a higher `z-index` than the content beneath it so the dropdown overlays that content instead of rendering behind it.

2.  Render both components, and connect them through their `onSearch` callbacks so a query typed in the box re-renders the results:

```
import { renderSearchBox, renderSearchResults } from '@gleanwork/web-sdk';const boxElement = document.getElementById('search-box');const resultsElement = document.getElementById('search-results');let currentQuery = '';function onSearch(query) {  currentQuery = query;  renderAll();}function renderAll() {  renderSearchBox(boxElement, { onSearch, query: currentQuery });  renderSearchResults(resultsElement, { onSearch, query: currentQuery });}renderAll();
```

In a real app you would typically also update the page URL from `onSearch` so searches are linkable and the back button works.

## Options[​](#options "Direct link to Options")

The search box accepts [`SearchBoxOptions`](/libraries/web-sdk/reference/interfaces/SearchBoxOptions) and the results page accepts [`TabbedSearchOptions`](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions). Commonly used options:

| Option | Applies to | Type | Description |
| --- | --- | --- | --- |
| `onSearch` | Both | `(query) => void` | **Required.** Invoked when the user performs a search. |
| `query` | Both | `string` | The query text to perform/display. |
| `autofocus` | Search box | `boolean` | Focus the box when it first renders. Defaults to `false`. |
| `searchBoxCustomizations` | Search box | `SearchBoxCustomizations` | Placeholder text, font size, icon, borders, and margins. |
| `hideAutocomplete` | Search box | `boolean` | Suppress the autocomplete dropdown. |
| `datasourcesFilter` | Both | `string[]` | Restrict results to specific datasources, e.g. `['jira', 'confluence']`. |
| `filters` | Both | `FilterValue[]` | Pinned, non-modifiable filters applied to every search. |
| `showInlineSearchBox` | Results | `boolean` | Render a search box inline above the results. |
| `autoExpand` | Results | `boolean` | Grow the results frame to fit content instead of scrolling internally. |
| `hideFiltersColumn` | Results | `boolean` | Hide the righthand filter column. |
| `onDatasourceChange` | Results | `(datasource) => void` | Invoked when the user switches result tabs. |

All components also accept the common [`Options`](/libraries/web-sdk/reference/interfaces/Options) - `backend`, `authToken`, `theme`, `themeVariant`, `locale`, and more.

## Theming[​](#theming "Direct link to Theming")

Customize the search box appearance with [SearchBoxCustomizations](/libraries/web-sdk/reference/interfaces/SearchBoxCustomizations). The theming system is regularly expanded with additional options based on customer needs.
