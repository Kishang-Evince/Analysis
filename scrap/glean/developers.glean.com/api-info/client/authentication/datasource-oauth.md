---
url: "https://developers.glean.com/api-info/client/authentication/datasource-oauth"
canonical: "https://developers.glean.com/api-info/client/authentication/datasource-oauth"
title: "Datasource OAuth Redirects | Glean Developer"
description: "Control where users land after completing datasource OAuth authorization"
fetched_at: "2026-09-01T13:22:49.810Z"
---
On this page

Some datasources - such as Slack and GitHub - require individual users to complete an OAuth authorization flow before Glean can access their data. The [`checkdatasourceauth`](/api/client-api/authentication/checkdatasourceauth) endpoint identifies which datasources still need authorization and provides the URLs to initiate those flows.

By default, after a user completes datasource OAuth, they are redirected to the Glean web application. For API-only or headless integrations that don't use the Glean UI, you can control where users land after authorization using the mechanisms described below.

info

This guide covers **per-user datasource OAuth** redirects (connecting individual user accounts to datasources like Slack or GitHub). For general Client API authentication, see the [OAuth](/api-info/client/authentication/oauth) or [Glean Tokens](/api-info/client/authentication/glean-issued) guides.

* * *

## Controlling the Post-Auth Redirect[​](#controlling-the-post-auth-redirect "Direct link to Controlling the Post-Auth Redirect")

### Per-Request Redirect (`final_redirect_url`)[​](#per-request-redirect-final_redirect_url "Direct link to per-request-redirect-final_redirect_url")

The recommended approach for API and headless integrations. Pass the `final_redirect_url` query parameter when calling `checkdatasourceauth`:

```
POST /rest/api/v1/checkdatasourceauth?final_redirect_url=https://yourapp.example.com/oauth-complete
```

The returned `authUrlRelativePath` for each datasource instance automatically includes the redirect, so no additional URL construction is needed beyond the standard flow.

```
curl -X POST 'https://<instance>-be.glean.com/rest/api/v1/checkdatasourceauth?final_redirect_url=https%3A%2F%2Fyourapp.example.com%2Foauth-complete' \  -H 'Authorization: Bearer <token>' \  -H 'Content-Type: application/json'
```

### Tenant-Level Default (`oauth.postAuthRedirectUrl`)[​](#tenant-level-default-oauthpostauthredirecturl "Direct link to tenant-level-default-oauthpostauthredirecturl")

A tenant-wide fallback configured by an administrator. When set, all datasource OAuth flows that don't specify a per-request `final_redirect_url` will redirect to this URL instead of the default Glean landing page.

This is useful when all OAuth flows across your integration should redirect to the same destination.

* * *

## Redirect Resolution Order[​](#redirect-resolution-order "Direct link to Redirect Resolution Order")

The redirect destination is resolved in this order:

1.  **`final_redirect_url` query parameter** - if provided on the `checkdatasourceauth` request
2.  **`oauth.postAuthRedirectUrl` tenant config** - if set by an administrator
3.  **Default Glean landing page** - the standard fallback

* * *

## Example: Full Flow[​](#example-full-flow "Direct link to Example: Full Flow")

1

Call checkdatasourceauth with final\_redirect\_url

Include the `final_redirect_url` query parameter to specify where users should land after completing OAuth.

```
curl -X POST 'https://<instance>-be.glean.com/rest/api/v1/checkdatasourceauth?final_redirect_url=https%3A%2F%2Fyourapp.example.com%2Foauth-complete' \  -H 'Authorization: Bearer <token>' \  -H 'Content-Type: application/json'
```

2

Receive the response

The response includes datasource instances that need authorization. Each entry contains an `authUrlRelativePath` that already incorporates your redirect URL.

```
{  "unauthorizedDatasourceInstances": [    {      "datasourceInstance": "slack_0",      "displayName": "Slack",      "authStatus": "AWAITING_AUTH",      "authUrlRelativePath": "/auth/datasource/slack_0?token=..."    }  ]}
```

3

Construct the full OAuth URL

Prepend your Glean backend base URL to the `authUrlRelativePath`:

```
https://<instance>-be.glean.com/<authUrlRelativePath>
```

4

Redirect the user

Send the user to the constructed URL. They complete the datasource's OAuth flow (e.g., authorizing Glean in Slack).

5

User lands at your redirect URL

After completing OAuth, the user is redirected to the `final_redirect_url` you specified (`https://yourapp.example.com/oauth-complete` in this example) instead of the default Glean landing page.

* * *

## Related[​](#related "Direct link to Related")

[

### checkdatasourceauth API Reference

Full API reference for the checkdatasourceauth endpoint







](/api/client-api/authentication/checkdatasourceauth)[

### Web SDK Settings Component

The Settings component handles datasource OAuth in embedded UI integrations







](/libraries/web-sdk/components/settings)
