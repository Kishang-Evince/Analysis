---
url: "https://developers.glean.com/libraries/web-sdk/authentication/default-sso"
canonical: "https://developers.glean.com/libraries/web-sdk/authentication/default-sso"
title: "SSO Authentication | Glean Developer"
description: "Default authentication method using your organization's SSO login flow"
fetched_at: "2026-09-01T13:23:05.267Z"
---
On this page

SSO authentication is the default authentication method for the Glean Web SDK. When users interact with Glean components, they see a login button that opens your organization's SSO authentication flow in a popup window. This approach is ideal for enterprise deployments where users already have Glean accounts.

## How It Works[​](#how-it-works "Direct link to How It Works")

The SSO authentication flow follows these steps:

1.  **User Interaction:** User clicks on a Glean component (search box, chat, etc.)
2.  **Login Prompt:** If not authenticated, user sees a login button
3.  **SSO Flow:** Clicking the login button opens an SSO authentication popup
4.  **Email Entry:** User enters their work email address
5.  **SSO Redirect:** User is redirected to your organization's SSO provider
6.  **Authentication Complete:** After successful SSO login, the popup closes and the user can access Glean

## Installation & Setup[​](#installation--setup "Direct link to Installation & Setup")

1

Install the Web SDK

-   NPM
-   Script Tag

```
npm install @gleanwork/web-sdk
```

Import in your application:

```
import GleanWebSDK from '@gleanwork/web-sdk';
```

Add to your page's `<head>`:

```
<script  defer  src="https://{GLEAN_APP_DOMAIN}/embedded-search-latest.min.js"></script>
```

Replace `{GLEAN_APP_DOMAIN}` with your Glean web app domain (e.g., `app.glean.com`).

2

Render a Component

SSO authentication is the default - no auth configuration is required:

-   Search Box
-   Modal Search
-   Chat

```
GleanWebSDK.renderSearchBox(document.getElementById('search-container'), {  backend: 'https://{your}-be.glean.com/'});
```

```
GleanWebSDK.attach(document.getElementById('search-input'), {  backend: 'https://{your}-be.glean.com/'});
```

```
GleanWebSDK.renderChat(document.getElementById('chat-container'), {  backend: 'https://{your}-be.glean.com/'});
```

## Optimizing the Authentication Flow[​](#optimizing-the-authentication-flow "Direct link to Optimizing the Authentication Flow")

### Skip Email Entry[​](#skip-email-entry "Direct link to Skip Email Entry")

You can bypass the email entry step by providing the `backend` parameter (shown in examples above). This routes users directly to your SSO provider:

```
{  backend: 'https://{your}-be.glean.com/'  // Skip email entry}
```

When the backend is specified, the authentication flow becomes:

1.  User clicks login button
2.  Immediately redirected to SSO provider (no email entry)
3.  Complete SSO authentication
4.  Access Glean

## When to Use SSO Authentication[​](#when-to-use-sso-authentication "Direct link to When to Use SSO Authentication")

SSO authentication is ideal when:

-   ✅ **Users Have Glean Accounts:** Your audience consists of employees or members provisioned in your Glean instance
-   ✅ **Enterprise Deployments:** You're building internal applications, intranets, or employee-facing tools
-   ✅ **SSO Compliance Required:** Your security policies require users to authenticate through your SSO provider
-   ✅ **Third-Party Cookies Enabled:** Users' browsers allow third-party cookies (see warning below)

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before implementing SSO authentication:

-   ☑️ **Users are provisioned** in your Glean instance with active accounts
-   ☑️ **SSO is configured** for your Glean deployment
-   ☑️ **Backend URL is known** - your Glean backend domain (format: `{company}-be.glean.com`)

## Complete React Example[​](#complete-react-example "Direct link to Complete React Example")

Here's a full example using React:

```
import { useEffect, useRef } from 'react';import GleanWebSDK from '@gleanwork/web-sdk';function SearchComponent() {  const searchRef = useRef<HTMLDivElement>(null);  useEffect(() => {    if (!searchRef.current) return;    // Render search box with SSO auth (default)    GleanWebSDK.renderSearchBox(searchRef.current, {      backend: 'https://your-server-id-be.glean.com/',      searchBoxCustomizations: {        placeholderText: 'Search your company...'      }    });  }, []);  return <div ref={searchRef} />;}export default SearchComponent;
```

## Third-Party Cookie Requirements[​](#third-party-cookie-requirements "Direct link to Third-Party Cookie Requirements")

warning

SSO authentication relies on browser cookies. When third-party cookies are blocked, users will be prompted to enable Glean's access. To avoid user prompts, implement [server-to-server (i.e. token-based) authentication](/libraries/web-sdk/authentication/server-to-server) instead.

See [Third-Party Cookie Management](/libraries/web-sdk/3rd-party-cookies) for details.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**Users see login prompt repeatedly:**

-   Check that third-party cookies are enabled in the browser
-   Verify your Glean backend URL is correct
-   Consider implementing [Server-to-Server Authentication](/libraries/web-sdk/authentication/server-to-server) for better cross-browser compatibility

**Login popup doesn't close:**

-   Ensure popup blockers are disabled for your domain
-   Verify SSO configuration in your Glean admin panel
-   Check browser console for error messages

**Users see "Unauthorized" errors:**

-   Confirm users are provisioned in your Glean instance
-   Verify SSO is configured correctly
-   Check that the backend URL matches your deployment

## Related Documentation[​](#related-documentation "Direct link to Related Documentation")

-   [Authentication Overview](/libraries/web-sdk/authentication/overview)
-   [Server-to-Server Authentication](/libraries/web-sdk/authentication/server-to-server)
-   [Third-Party Cookie Management](/libraries/web-sdk/3rd-party-cookies)
-   [Web SDK Options Reference](/libraries/web-sdk/reference/interfaces/Options)
