---
url: "https://developers.glean.com/libraries/web-sdk/authentication/server-to-server"
canonical: "https://developers.glean.com/libraries/web-sdk/authentication/server-to-server"
title: "Server-to-Server Authentication | Glean Developer"
description: "Bypass user authentication with token-based authentication"
fetched_at: "2026-09-01T13:23:05.396Z"
---
On this page

Server-to-server authentication enables your backend to provide authentication tokens to the Web SDK, bypassing the need for users to log in through Glean's SSO flow. This approach is essential for scenarios where users don't have Glean accounts or where you want to provide seamless, frictionless access to search and chat functionality.

The Web SDK supports two implementation approaches for server-to-server authentication:

1.  **Manual Token Management** - Your application fetches and manages auth tokens for authenticated users using a Glean API key or an access token from your OAuth provider
2.  **Guest Auth Provider** - The Web SDK automatically manages tokens for anonymous/guest users

## Overview[​](#overview "Direct link to Overview")

Unlike [Default SSO Authentication](/libraries/web-sdk/authentication/default-sso) where users see a login button and complete an SSO flow, server-to-server authentication (token-based) allows your backend to obtain short-lived authentication tokens on behalf of users. This eliminates the SSO login popup and enables use cases where users may not even have Glean accounts.

## When to Use Server-to-Server Authentication[​](#when-to-use-server-to-server-authentication "Direct link to When to Use Server-to-Server Authentication")

Server-to-server authentication is ideal when:

-   **Users Don't Have Glean Accounts:** Your audience includes external users, customers, or anonymous visitors
-   **Seamless Authentication Required:** You want to provide access without any user interaction or sign-in prompts
-   **Public-Facing Applications:** You're building documentation sites, marketing pages, or customer portals
-   **Anonymous Access Needed:** You want to enable search functionality for guest users
-   **Third-Party Cookies Are Blocked:** Browser restrictions prevent cookie-based authentication

Choose your implementation approach:

-   Use **Manual Token Management** when you have authenticated users in your system and want full control over token lifecycle
-   Use **Guest Auth Provider** for public-facing deployments where users don't need to sign in

## Approach 1: Manual Token Management[​](#approach-1-manual-token-management "Direct link to Approach 1: Manual Token Management")

This approach gives you complete control over token generation and refresh. Your application manages user authentication and fetches tokens from Glean's API.

-   API Key
-   OAuth Access Token

### Prerequisites

Before implementing server-to-server authentication, you need an admin API key from Glean:

1.  An admin with sufficient access navigates to the [Token Management page](https://app.glean.com/admin/platform/tokenManagement?tab=client)
2.  Generate a new API key
3.  Store this key securely on your server (e.g., in environment variables)
4.  Optionally set an expiration date or rotate the key as needed

warning

The API key must be stored very securely and **never exposed to client-side code**. It should only be accessible to your backend server.

tip

The default TTL for generated tokens is 2 hours, but this is configurable. Contact your Glean administrator to adjust this setting if needed.

### Implementation

1

Create Server Endpoint

Create a backend endpoint that your client can call to obtain Glean auth tokens. This endpoint calls Glean's `/createauthtoken` API with your admin API key.

**Node.js/Express Example:**

```
const express = require("express");const axios = require("axios");const app = express();app.use(express.json());app.post("/api/get-glean-token", async (req, res) => {  const { userEmail } = req.body;  // Your backend URL (find at https://app.glean.com/admin/about-glean)  const backend = process.env.GLEAN_BACKEND_URL;  const apiKey = process.env.GLEAN_API_KEY;  const tokenApiPath = backend.endsWith("/")    ? `${backend}rest/api/v1/createauthtoken`    : `${backend}/rest/api/v1/createauthtoken`;  try {    const response = await axios({      method: "POST",      url: tokenApiPath,      headers: {        Authorization: `Bearer ${apiKey}`,        "X-Scio-ActAs": userEmail,        accept: "application/json",      },    });    // Response contains: { token: "GLEAN_AUTH_TOKEN_...", expirationTime: 1234567890 }    res.json(response.data);  } catch (error) {    console.error("Failed to fetch Glean token:", error);    res.status(500).json({ error: "Failed to generate auth token" });  }});app.listen(3000);
```

**Key points:**

-   `Authorization: Bearer <apiKey>` - Your admin API key from Prerequisites
-   `X-Scio-ActAs: <userEmail>` - The authenticated user's email address
-   Response includes both `token` (the auth token) and `expirationTime` (Unix timestamp in seconds)

For more details on this API, see [Create Authentication Token API](/api/client-api/authentication/createauthtoken).

2

Install Web SDK

Install the Glean Web SDK in your frontend application:

-   Script Tag
-   NPM

Add to your page's `<head>`:

```
<script  defer  src="https://{GLEAN_APP_DOMAIN}/embedded-search-latest.min.js"></script>
```

The SDK will be available globally as `GleanWebSDK`.

```
npm install @gleanwork/web-sdk
```

Import in your application:

```
import GleanWebSDK from '@gleanwork/web-sdk';
```

3

Implement Client-Side Authentication

Fetch a token from your server endpoint and pass it to the Web SDK:

```
// Fetch initial token from your serverasync function getGleanToken() {  const response = await fetch('/api/get-glean-token', {    method: 'POST',    headers: { 'Content-Type': 'application/json' },    body: JSON.stringify({      userEmail: 'user@company.com' // The authenticated user's email    })  });  const data = await response.json();  return data; // Returns { token, expirationTime }}// Initialize Web SDK with token-based authconst authToken = await getGleanToken();GleanWebSDK.renderSearchBox(document.getElementById('search-container'), {  authMethod: 'token',  authToken: authToken,  backend: 'https://{your}-be.glean.com/',  onAuthTokenRequired: async () => {    // Called when token is approaching expiration    return await getGleanToken();  }});
```

**Key points:**

-   `authMethod: 'token'` - Use token-based authentication
-   `authToken` - Initial token object with `token` and `expirationTime`
-   `onAuthTokenRequired` - Callback invoked when token needs refresh (automatically called ~30 min before expiration)

You can use this pattern with any Web SDK component: `renderSearchBox()`, `renderChat()`, `renderSearchResults()`, `attach()`, etc.

### Implementation Checklist

-   [ ]  Generate and securely store API key from Glean admin panel
-   [ ]  Create backend endpoint (`/api/get-glean-token`) that calls Glean's `/createauthtoken` API
-   [ ]  Install Glean Web SDK in your frontend application
-   [ ]  Implement client-side token fetching and pass to Web SDK
-   [ ]  Implement `onAuthTokenRequired` callback for automatic token refresh
-   [ ]  Test token expiration and refresh flow (tokens expire after 2 hours by default)

### Prerequisites

Before implementing server-to-server authentication using OAuth access tokens, you need to configure Glean with information about your OAuth provider:

1.  Use Google Workspace, Microsoft Entra ID, Okta, or OneLogin as your OAuth provider
2.  An admin with sufficient access navigates to [Client API Settings](https://app.glean.com/admin/platform/tokenManagement?tab=client)
3.  Enable OAuth token-based access and provide the necessary SSO information

tip

The default TTL for Glean generated tokens is 2 hours, but this is configurable. Contact your Glean administrator to adjust this setting if needed.

### Implementation

1

Create Server Endpoint

Create a backend endpoint that your client can call to obtain Glean auth tokens. This endpoint calls Glean's `/createauthtoken` API with the user's OAuth access token.

**Node.js/Express Example:**

```
const express = require("express");const axios = require("axios");const app = express();app.use(express.json());app.post("/api/get-glean-token", async (req, res) => {  const { userEmail } = req.body;  // Retrieve the user's OAuth access token from the incoming request.  const accessToken = req.headers.authorization?.replace(/^Bearer\s+/i, "");  if (!accessToken) {    return res.status(401).json({ error: "Missing OAuth access token" });  }  // Your backend URL (find at https://app.glean.com/admin/about-glean)  const backend = process.env.GLEAN_BACKEND_URL;  const tokenApiPath = backend.endsWith("/")    ? `${backend}rest/api/v1/createauthtoken`    : `${backend}/rest/api/v1/createauthtoken`;  try {    const response = await axios({      method: "POST",      url: tokenApiPath,      headers: {        Authorization: `Bearer ${accessToken}`,        "X-Glean-Auth-Type": "OAUTH",        accept: "application/json",      },    });    // Response contains: { token: "GLEAN_AUTH_TOKEN_...", expirationTime: 1234567890 }    res.json(response.data);  } catch (error) {    console.error("Failed to fetch Glean token:", error);    res.status(500).json({ error: "Failed to generate auth token" });  }});app.listen(3000);
```

**Key points:**

-   `Authorization: Bearer <accessToken>` - The user's OAuth access token
-   `X-Glean-Auth-Type: OAUTH` - **Required header**
-   Response includes both `token` (the auth token) and `expirationTime` (Unix timestamp in seconds)

For more details on this API, see [Create Authentication Token API](/api/client-api/authentication/createauthtoken).

2

Install Web SDK

Install the Glean Web SDK in your frontend application:

-   Script Tag
-   NPM

Add to your page's `<head>`:

```
<script  defer  src="https://{GLEAN_APP_DOMAIN}/embedded-search-latest.min.js"></script>
```

The SDK will be available globally as `GleanWebSDK`.

```
npm install @gleanwork/web-sdk
```

Import in your application:

```
import GleanWebSDK from '@gleanwork/web-sdk';
```

3

Implement Client-Side Authentication

Fetch a token from your server endpoint and pass it to the Web SDK:

```
// Fetch initial token from your serverasync function getGleanToken() {  const response = await fetch('/api/get-glean-token', {    method: 'POST',    headers: { 'Content-Type': 'application/json' },    body: JSON.stringify({      userEmail: 'user@company.com' // The user's email, or other identifier used to retrieve their access token    })  });  const data = await response.json();  return data; // Returns { token, expirationTime }}// Initialize Web SDK with token-based authconst authToken = await getGleanToken();GleanWebSDK.renderSearchBox(document.getElementById('search-container'), {  authMethod: 'token',  authToken: authToken,  backend: 'https://{your}-be.glean.com/',  onAuthTokenRequired: async () => {    // Called when token is approaching expiration    return await getGleanToken();  }});
```

**Key points:**

-   `authMethod: 'token'` - Use token-based authentication
-   `authToken` - Initial token object with `token` and `expirationTime`
-   `onAuthTokenRequired` - Callback invoked when token needs refresh (automatically called ~30 min before expiration)

You can use this pattern with any Web SDK component: `renderSearchBox()`, `renderChat()`, `renderSearchResults()`, `attach()`, etc.

### Implementation Checklist

-   [ ]  Configure Glean with all your OAuth provider's details
-   [ ]  Create backend endpoint (`/api/get-glean-token`) that calls Glean's `/createauthtoken` API with the user's access token
-   [ ]  Install Glean Web SDK in your frontend application
-   [ ]  Implement client-side token fetching and pass to Web SDK
-   [ ]  Implement `onAuthTokenRequired` callback for automatic token refresh
-   [ ]  Test token expiration and refresh flow (tokens expire after 2 hours by default)

## Approach 2: Guest Auth Provider[​](#approach-2-guest-auth-provider "Direct link to Approach 2: Guest Auth Provider")

For public-facing deployments where users don't need to authenticate, the Web SDK provides a `GuestAuthProvider` that automatically handles token generation and refresh for anonymous users.

### How It Works[​](#how-it-works "Direct link to How It Works")

The Guest Auth Provider:

1.  Automatically requests authentication tokens from your Glean backend
2.  Caches tokens for reuse
3.  Handles token refresh transparently
4.  Requires minimal configuration

### Setup Process[​](#setup-process "Direct link to Setup Process")

1

Import the Guest Auth Provider

```
import { createGuestAuthProvider } from '@gleanwork/web-sdk';
```

2

Create the Provider

```
const authProvider = createGuestAuthProvider({  backend: 'https://{your}-be.glean.com/'});
```

The `backend` parameter should match your Glean external search deployment URL.

3

Use with Web SDK

##### Option A: Direct Token Usage[​](#option-a-direct-token-usage "Direct link to Option A: Direct Token Usage")

```
// Get the auth tokenconst token = await authProvider.getAuthToken();// Render a component with the tokenGleanWebSDK.renderSearchBox(document.getElementById('search-container'), {  authMethod: 'token',  authToken: token,  backend: 'https://{your}-be.glean.com/',  onAuthTokenRequired: async () => {    return await authProvider.getAuthToken();  }});
```

##### Option B: React Integration[​](#option-b-react-integration "Direct link to Option B: React Integration")

Here's a complete example using React context for guest authentication:

```
import { createContext, useContext, useEffect, useState } from 'react';import { createGuestAuthProvider } from '@gleanwork/web-sdk';interface GuestAuthContextType {  token: string | null;  loading: boolean;  error: Error | null;  refreshToken: () => Promise<void>;}const GuestAuthContext = createContext<GuestAuthContextType | null>(null);export function GuestAuthProvider({  children,  backend}: {  children: React.ReactNode;  backend: string;}) {  const [token, setToken] = useState<string | null>(null);  const [loading, setLoading] = useState(true);  const [error, setError] = useState<Error | null>(null);  const [provider, setProvider] = useState<any>(null);  useEffect(() => {    const initProvider = async () => {      try {        const authProvider = createGuestAuthProvider({ backend });        setProvider(authProvider);        const authToken = await authProvider.getAuthToken();        setToken(authToken);      } catch (err) {        setError(err as Error);      } finally {        setLoading(false);      }    };    initProvider();  }, [backend]);  const refreshToken = async () => {    if (!provider) return;    try {      setLoading(true);      const newToken = await provider.createAuthToken();      setToken(newToken);      setError(null);    } catch (err) {      setError(err as Error);    } finally {      setLoading(false);    }  };  return (    <GuestAuthContext.Provider value={{ token, loading, error, refreshToken }}>      {children}    </GuestAuthContext.Provider>  );}export function useGuestAuth() {  const context = useContext(GuestAuthContext);  if (!context) {    throw new Error('useGuestAuth must be used within GuestAuthProvider');  }  return context;}
```

4

Apply to Glean Components

```
import { useEffect, useRef } from 'react';import GleanWebSDK from '@gleanwork/web-sdk';function SearchComponent() {  const { token, loading } = useGuestAuth();  const searchRef = useRef<HTMLDivElement>(null);  useEffect(() => {    if (!token || loading || !searchRef.current) return;    GleanWebSDK.renderSearchBox(searchRef.current, {      authMethod: 'token',      authToken: token,      backend: 'https://{your}-be.glean.com/',      onAuthTokenRequired: async () => {        const authProvider = createGuestAuthProvider({          backend: 'https://{your}-be.glean.com/'        });        return await authProvider.getAuthToken();      }    });  }, [token, loading]);  if (loading) return <div>Loading...</div>;  return <div ref={searchRef} />;}
```

### Guest Auth Provider API[​](#guest-auth-provider-api "Direct link to Guest Auth Provider API")

The `GuestAuthProvider` class provides two key methods:

-   **`getAuthToken()`**: Returns an existing cached token or creates a new one if none exists
-   **`createAuthToken()`**: Always creates a fresh authentication token

Both methods return a `Promise<AuthTokenDetails>`.

### When to Use Guest Auth[​](#when-to-use-guest-auth "Direct link to When to Use Guest Auth")

Guest authentication is ideal for:

-   **Public documentation sites** - Allow visitors to search without signing in
-   **Marketing pages** - Provide search functionality to anonymous users
-   **Demo environments** - Quick setup without user management
-   **Internal tools with anonymous access** - Public-facing internal resources

### Implementation Checklist[​](#implementation-checklist "Direct link to Implementation Checklist")

-   [ ]  Ensure your Glean deployment supports external search
-   [ ]  Configure your backend URL
-   [ ]  Import and create the guest auth provider
-   [ ]  Integrate with your Web SDK initialization
-   [ ]  Test token generation and refresh
-   [ ]  Handle loading and error states in your UI

## Comparison: Manual vs Guest Auth[​](#comparison-manual-vs-guest-auth "Direct link to Comparison: Manual vs Guest Auth")

| Feature | Manual Token Management | Guest Auth Provider |
| --- | --- | --- |
| **Use Case** | Authenticated users with known identity | Anonymous/guest users |
| **Setup Complexity** | Higher - requires API key & server endpoint | Lower - client-side only |
| **Token Control** | Full control over token lifecycle | Automatic management |
| **User Experience** | Personalized to authenticated user | Generic guest access |
| **Security** | API key must be secured server-side | No sensitive credentials needed |
| **Best For** | Internal apps, user-specific content | Public docs, marketing sites |

## Related Documentation[​](#related-documentation "Direct link to Related Documentation")

-   [Authentication Overview](/libraries/web-sdk/authentication/overview)
-   [Default SSO Authentication](/libraries/web-sdk/authentication/default-sso)
-   [Create Authentication Token API](/api/client-api/authentication/createauthtoken)
-   [Web SDK Options Reference](/libraries/web-sdk/reference/interfaces/Options)
-   [GuestAuthProvider API](/libraries/web-sdk/reference/interfaces/GuestAuthProvider)
-   [GuestAuthProviderOptions](/libraries/web-sdk/reference/interfaces/GuestAuthProviderOptions)
