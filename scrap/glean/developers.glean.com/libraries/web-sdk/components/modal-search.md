---
url: "https://developers.glean.com/libraries/web-sdk/components/modal-search"
canonical: "https://developers.glean.com/libraries/web-sdk/components/modal-search"
title: "Modal Search | Glean Developer"
description: "Add a powerful search modal dialog to your application with minimal code integration"
fetched_at: "2026-09-01T13:23:05.466Z"
---
On this page

Modal Search overlays a complete Glean search experience on your existing page. Attach it to any search input you already have - when the input is clicked, a modal opens with autocomplete, suggestions, and full results.

PreviewLive - your instance

portal.sample.internal

Sample CorpServicesRunbooksOn-call

payments service runbook

CPayments Service - Deploy & Rollback RunbookEngineering Wiki · Updated 2 days ago

Gpayments-servicegit.internal/payments-service · 1mo ago

from:teammate

type:bug, document, message, etc.

⏎ Enter Search

powered by Glean

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

## Attach to your search input[​](#attach-to-your-search-input "Direct link to Attach to your search input")

Point the [attach](/libraries/web-sdk/reference/interfaces/GleanWebSDK#attach) method at a focusable element - such as the search input your page already renders - and the SDK handles all user interaction from there:

```
import { attach } from '@gleanwork/web-sdk';attach(document.getElementById('search-box'), {  backend: 'https://{your}-be.glean.com/',});
```

## Options[​](#options "Direct link to Options")

The most commonly used [`ModalSearchOptions`](/libraries/web-sdk/reference/interfaces/ModalSearchOptions):

| Option | Type | Description |
| --- | --- | --- |
| `query` | `string` | If non-empty, the modal opens immediately with results for this query. |
| `onSearch` | `(query) => void` | Invoked when the user performs a search (e.g. for tracking). |
| `onDetach` | `() => void` | Invoked when the modal is dismissed and focus returns to your native input. |
| `showNativeSearchToggle` | `boolean` | Offer users an option to revert to your native search experience. |
| `searchBoxCustomizations` | `SearchBoxCustomizations` | Placeholder text, font size, icon, borders, and margins. |
| `datasourcesFilter` | `string[]` | Restrict results to specific datasources, e.g. `['jira', 'confluence']`. |

All components also accept the common [`Options`](/libraries/web-sdk/reference/interfaces/Options) - `backend`, `authToken`, `theme`, `themeVariant`, `locale`, and more.

## Theming[​](#theming "Direct link to Theming")

Customize the appearance of Modal Search with [SearchBoxCustomizations](/libraries/web-sdk/reference/interfaces/SearchBoxCustomizations). The theming system is regularly expanded with additional options based on customer needs.
