---
url: "https://developers.glean.com/libraries/web-sdk/components/recommendations"
canonical: "https://developers.glean.com/libraries/web-sdk/components/recommendations"
title: "Recommendations | Glean Developer"
description: "Display contextual recommendations and search functionality based on the current page content"
fetched_at: "2026-09-01T13:23:05.720Z"
---
On this page

The Recommendations component surfaces intelligent, context-aware suggestions for the page the user is currently viewing, with a built-in Glean search box for manual searches.

PreviewLive — your instance

portal.sample.internal/runbooks/payments

Search for anything at Glean

Recommended for this page

C

Checkout — On-call RunbookUpdated 4 days ago

J

PAY-2114: Canary alarms during deployIn review

P

Priya Natarajan — Payments PlatformTech lead

Illustrative previewRendered with sample data — in your app, this component renders live against your organization's Glean instance. Try it live →

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

## Render recommendations[​](#render-recommendations "Direct link to Render recommendations")

1.  Create a container element with `position: relative`, `display: block`, and a defined width (800px maximum recommended — the widget adjusts to its container).
    
2.  Render the widget into your container:
    

```
import { renderRecommendations } from '@gleanwork/web-sdk';renderRecommendations(document.getElementById('recommendations'), {  backend: 'https://{your}-be.glean.com/',  height: 700,  customizations: {    border: '1px solid grey',    borderRadius: 4,    horizontalMargin: 3,    verticalMargin: 3,    searchBox: {      placeholderText: 'Search for anything...',    },  },});
```

## Options[​](#options "Direct link to Options")

The most commonly used [`RecommendationsOptions`](/libraries/web-sdk/reference/interfaces/RecommendationsOptions):

| Option | Type | Description |
| --- | --- | --- |
| `height` | `number` | Total widget height in the open state, in pixels. Defaults to `650`. |
| `customizations` | `RecommendationsBoxCustomizations` | Border, shadow, margins, search-box styling, and the empty-state hint. |
| `sourceDocument` | `DocumentContext` | The document to recommend against. Defaults to the embedding page itself. |
| `onSearch` | `(query) => void` | Invoked when the user performs a search from the built-in box. |
| `datasourcesFilter` | `string[]` | Restrict results to specific datasources, e.g. `['jira', 'confluence']`. |

All components also accept the common [`Options`](/libraries/web-sdk/reference/interfaces/Options) — `backend`, `authToken`, `theme`, `themeVariant`, `locale`, and more.

note

When adding a `boxShadow`, provide enough `verticalMargin` and `horizontalMargin` for it to be visible — margin values must be positive and apply to both sides of the component.
