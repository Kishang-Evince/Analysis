---
url: "https://developers.glean.com/libraries/web-sdk/components/settings"
canonical: "https://developers.glean.com/libraries/web-sdk/components/settings"
title: "Glean Settings | Glean Developer"
description: "Integrate Glean settings into an internal application"
fetched_at: "2026-09-01T13:23:05.739Z"
---
On this page

Embed Glean settings in your internal app so users can connect datasources that require separate authentication (for example, Slack RTS or GitHub), letting Glean access their private data on their behalf.

Beta

`renderSettings` is marked experimental in the SDK's type definitions and may change at any time.

PreviewLive - your instance

portal.sample.internal/settings

Search connectors

Connected

View and manage the connectors available.

GGitHub

JJira

SSlackConnect

CConfluenceConnect

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

## Render settings[​](#render-settings "Direct link to Render settings")

1.  Create a container element with `position: relative`, `display: block`, and a defined size - at least 800px wide and 600px tall is recommended.
    
2.  Render the settings widget into your container:
    

```
import GleanWebSDK from '@gleanwork/web-sdk';GleanWebSDK.renderSettings(document.getElementById('settings'), {  backend: 'https://{your}-be.glean.com/',});
```

note

Unlike the other components, `renderSettings` is not exported individually - call it on the SDK's default export (or on `window.GleanWebSDK` when using the script tag).

For the full surface, see the [renderSettings API documentation](/libraries/web-sdk/reference/interfaces/GleanWebSDK#rendersettings).

## Options[​](#options "Direct link to Options")

[`SettingsOptions`](/libraries/web-sdk/reference/interfaces/SettingsOptions):

| Option | Type | Description |
| --- | --- | --- |
| `hideUnconfigurableDatasources` | `boolean` | Hide admin-managed datasources that the user cannot configure themselves. |

All components also accept the common [`Options`](/libraries/web-sdk/reference/interfaces/Options) - `backend`, `authToken`, `theme`, `themeVariant`, `locale`, and more.

warning

Browser security features can prevent the OAuth popup from informing the SDK that a user has successfully authenticated. For the highest reliability, use the Glean web app or the [`checkdatasourceauth`](/api/client-api/authentication/checkdatasourceauth) API.
