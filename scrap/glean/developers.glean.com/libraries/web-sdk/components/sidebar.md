---
url: "https://developers.glean.com/libraries/web-sdk/components/sidebar"
canonical: "https://developers.glean.com/libraries/web-sdk/components/sidebar"
title: "Sidebar Search | Glean Developer"
description: "Integrate contextual search, chat, and recommendations in a convenient sidebar interface"
fetched_at: "2026-09-01T13:23:05.653Z"
---
On this page

Deprecated

`openSidebar` is marked deprecated in the SDK's type definitions and will be removed in a future version. For new integrations, consider the [Recommendations](/libraries/web-sdk/components/recommendations) component for contextual suggestions or [Modal Search](/libraries/web-sdk/components/modal-search) for on-demand search.

The Glean Sidebar opens a Glean Assistant panel - with chat and search - that slides out from the right side of your page.

PreviewLive - your instance

portal.sample.internal/runbooks/payments

Sample CorpServicesRunbooksOn-call

ChatSearch

Ask Assistant anything

Reference current page

Ask Assistant anything…

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

## Open the sidebar[​](#open-the-sidebar "Direct link to Open the sidebar")

Call [openSidebar](/libraries/web-sdk/reference/interfaces/GleanWebSDK#opensidebar) in response to a user action, such as clicking a button:

```
import { openSidebar } from '@gleanwork/web-sdk';openSidebar({  backend: 'https://{your}-be.glean.com/',});
```

The sidebar closes when the user clicks its close button or presses the escape key.

## Options[​](#options "Direct link to Options")

`openSidebar` accepts [`SearchOptions`](/libraries/web-sdk/reference/interfaces/SearchOptions):

| Option | Type | Description |
| --- | --- | --- |
| `query` | `string` | If provided, the sidebar opens showing results for this query. |
| `onSearch` | `(query) => void` | Invoked when the user performs a search. |
| `datasourcesFilter` | `string[]` | Restrict results to specific datasources, e.g. `['jira', 'confluence']`. |
| `filters` | `FilterValue[]` | Pinned, non-modifiable filters applied to every search. |

All components also accept the common [`Options`](/libraries/web-sdk/reference/interfaces/Options) - `backend`, `authToken`, `theme`, `themeVariant`, `locale`, and more.
