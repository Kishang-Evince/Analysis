---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/GuestAuthProvider"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/GuestAuthProvider"
title: "Abstract Interface: GuestAuthProvider | Glean Developer"
description: "Creates and manages auth tokens for guest users."
fetched_at: "2026-09-01T13:23:06.309Z"
---
On this page

Creates and manages auth tokens for guest users. Used primarily in Glean external search deployments

## Properties[​](#properties "Direct link to Properties")

### createAuthToken[​](#createauthtoken "Direct link to createAuthToken")

```
createAuthToken: () => Promise<AuthTokenDetails>;
```

Creates a new guest auth token and returns the same

#### Returns[​](#returns "Direct link to Returns")

`Promise`<[`AuthTokenDetails`](/libraries/web-sdk/reference/interfaces/AuthTokenDetails)\>

* * *

### getAuthToken[​](#getauthtoken "Direct link to getAuthToken")

```
getAuthToken: () => Promise<AuthTokenDetails>;
```

Retrieves a stored guest auth token if it exists. If no token exists, a new guest auth token is created.

#### Returns[​](#returns-1 "Direct link to Returns")

`Promise`<[`AuthTokenDetails`](/libraries/web-sdk/reference/interfaces/AuthTokenDetails)\>
