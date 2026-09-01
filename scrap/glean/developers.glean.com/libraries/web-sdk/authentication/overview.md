---
url: "https://developers.glean.com/libraries/web-sdk/authentication/overview"
canonical: "https://developers.glean.com/libraries/web-sdk/authentication/overview"
title: "Web SDK Authentication | Glean Developer"
description: "Choose the right authentication method for embedding Glean in your application"
fetched_at: "2026-09-01T13:23:05.425Z"
---
On this page

The Web SDK provides two authentication methods for integrating Glean's search and chat capabilities into your application. Choose the method that best fits your deployment scenario and user requirements.

SSO (default)User clicks widgetSees a sign-in prompt on first useYour identity providerStandard SSO flow in a popupWidget is liveSession persists like the Glean app

Server-to-serverYour backendMints a short-lived user token via the Client APIauthToken optionPassed to the SDK, refreshed via callbackWidget is liveNo visible sign-in step for the user

## Authentication Methods[​](#authentication-methods "Direct link to Authentication Methods")

### SSO Authentication (Default)[​](#sso-authentication-default "Direct link to SSO Authentication (Default)")

The default authentication method where users complete your organization's SSO login flow. When a user interacts with Glean components, they'll see a login button that opens an SSO authentication flow in a popup window.

**Best for:**

-   Enterprise deployments where users have Glean accounts
-   Internal applications and intranets
-   Scenarios requiring SSO compliance

**Configuration:**

```
{  authMethod: "sso"  // This is the default}
```

[Learn more about SSO Authentication →](/libraries/web-sdk/authentication/default-sso)

### Token-Based Authentication[​](#token-based-authentication "Direct link to Token-Based Authentication")

Your server obtains authentication tokens from Glean's API and provides them to the Web SDK, eliminating the need for users to log in through the SSO flow. This enables seamless authentication for users who may not have Glean accounts or for anonymous access scenarios.

**Best for:**

-   Public-facing applications where users don't have Glean accounts
-   Seamless authentication without user interaction
-   Anonymous or guest access to search functionality
-   Documentation sites and marketing pages

**Configuration:**

```
const config = {  authMethod: 'token',  authToken: 'GLEAN_AUTH_TOKEN_...',  onAuthTokenRequired: async () => {    // Fetch a new token when the current one expires.    return 'GLEAN_AUTH_TOKEN_...';  },};
```

[Learn more about Server-to-Server Authentication →](/libraries/web-sdk/authentication/server-to-server)

## Quick Decision Guide[​](#quick-decision-guide "Direct link to Quick Decision Guide")

| Question | Answer | Recommended Method |
| --- | --- | --- |
| Do your users have Glean accounts? | Yes | [SSO Authentication](/libraries/web-sdk/authentication/default-sso) |
| Do you want users to log in via SSO? | Yes | [SSO Authentication](/libraries/web-sdk/authentication/default-sso) |
| Do you need anonymous/guest access? | Yes | [Token-Based Authentication](/libraries/web-sdk/authentication/server-to-server) |
| Are you building a public documentation site? | Yes | [Token-Based Authentication](/libraries/web-sdk/authentication/server-to-server) |
| Do third-party cookies get blocked? | Yes | [Token-Based Authentication](/libraries/web-sdk/authentication/server-to-server) (recommended) |

## Getting Started[​](#getting-started "Direct link to Getting Started")

### Installation[​](#installation "Direct link to Installation")

Choose your preferred installation method:

-   NPM
-   Script Tag

```
npm install @gleanwork/web-sdk
```

Then import in your application:

```
import GleanWebSDK from '@gleanwork/web-sdk';// Or import specific methodsimport { attach, renderSearchBox } from '@gleanwork/web-sdk';
```

Add the Web SDK script to your page's `<head>`:

```
<script  defer  src="https://{GLEAN_APP_DOMAIN}/embedded-search-latest.min.js"></script>
```

The SDK will be available globally as `window.GleanWebSDK` or just `GleanWebSDK`.

Replace `{GLEAN_APP_DOMAIN}` with your Glean web app domain (typically `app.glean.com` or `your-company.glean.com`).

### Basic Usage[​](#basic-usage "Direct link to Basic Usage")

Once installed, you can render Glean components with your chosen authentication method:

-   SSO Auth
-   Token Auth

```
// No auth configuration needed - SSO is defaultGleanWebSDK.renderSearchBox(document.getElementById('search-container'), {  backend: 'https://{your}-be.glean.com/'});
```

```
GleanWebSDK.renderSearchBox(document.getElementById('search-container'), {  authMethod: 'token',  authToken: yourAuthToken,  backend: 'https://{your}-be.glean.com/',  onAuthTokenRequired: async () => {    const response = await fetch('/api/get-glean-token');    const { token } = await response.json();    return token;  }});
```

## Third-Party Cookie Considerations[​](#third-party-cookie-considerations "Direct link to Third-Party Cookie Considerations")

warning

When third-party cookies are blocked in the user's browser, SSO authentication may not work reliably. In these cases, token-based authentication is required for the Web SDK to function properly.

See [Third-Party Cookie Management](/libraries/web-sdk/3rd-party-cookies) for details.

## Next Steps[​](#next-steps "Direct link to Next Steps")

1.  **For standard enterprise deployments:** Start with [SSO Authentication](/libraries/web-sdk/authentication/default-sso) to leverage your existing Glean SSO setup
2.  **For public-facing sites:** Explore [Server-to-Server Authentication](/libraries/web-sdk/authentication/server-to-server) to provide seamless access without requiring user login
3.  **Not sure which to choose?** Review the detailed guides for each method to understand the implementation requirements

## Related Documentation[​](#related-documentation "Direct link to Related Documentation")

-   [Third-Party Cookie Management](/libraries/web-sdk/3rd-party-cookies)
-   [Web SDK Overview](/libraries/web-sdk/overview)
-   [Web SDK Options Reference](/libraries/web-sdk/reference/interfaces/Options)

* * *

**Sources:**

-   [@gleanwork/web-sdk on npm](https://www.npmjs.com/package/@gleanwork/web-sdk)
-   [Web SDK API Documentation](/libraries/web-sdk/reference/)
