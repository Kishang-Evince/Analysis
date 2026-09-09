---
url: "https://docs.glean.com/administration/oauth/headless-connector-auth"
canonical: "https://docs.glean.com/administration/oauth/headless-connector-auth"
title: "User Connector Authentication for Headless Integrations"
description: "When you use Glean in a headless way (custom UI, Web SDK, or API-only), users still need to authorize certain connectors (for example, Slack RTS, GitHub) so Glean can access their private data on their behalf."
fetched_at: "2026-09-01T13:29:10.396Z"
---
On this page

When you use Glean in a headless way (custom UI, Web SDK, or API-only), users still need to authorize certain connectors (for example, Slack RTS, GitHub) so Glean can access their private data on their behalf.

## Choosing the right approach[​](#choosing-the-right-approach "Direct link to Choosing the right approach")

Use this mapping to decide which option to implement based on how your users access Glean:

| Cohort | How users access Glean | Recommended option | Status |
| --- | --- | --- | --- |
| **A** | Users can log into the Glean web app (`app.glean.com` or `<vanity>.glean.com`) | [Option 1: Glean UI](#option-1-glean-ui-connectors-page) | Available now |
| **B** | Users interact with Glean through an embedded Web SDK experience | [Option 2: Web SDK settings component](#option-2-web-sdk-settings-component) | Available now |
| **C** | Users interact with Glean entirely through your own custom UI built on the Client API | [Option 3: checkdatasourceauth API](#option-3-checkdatasourceauth-api) | Available now |

All three options drive the same underlying per-user OAuth state. You can mix them as needed-for example, using Option 1 for admins who are comfortable in the Glean web app and Option 3 for a fully custom "Connect apps" page in your product.

## Option 1: Glean UI connectors page[​](#option-1-glean-ui-connectors-page "Direct link to Option 1: Glean UI connectors page")

Users with access to the Glean web app **Admin console** can authorize per-user connectors directly in the Glean UI. In **Admin Console → Connectors**, users can see which connectors need authentication and which are already connected.

### What users do[​](#what-users-do "Direct link to What users do")

Users can do the following to authorize per-user connectors:

1.  Sign in to Glean in the browser (via SSO or other configured auth).
2.  Open **Admin Console → Connectors**.
3.  Find sources such as **Slack (RTS)** or **GitHub** and click **Connect** or **Authorize**.
4.  Complete the OAuth consent flow with for the selected connector provider.

### Why this is preferred[​](#why-this-is-preferred "Direct link to Why this is preferred")

-   No engineering integration work is needed.
-   Works for search, chat, and any API clients that act as that user.
-   Handles Slack RTS and other per-user sources automatically once the user has authorized them.

## Option 2: Web SDK settings component[​](#option-2-web-sdk-settings-component "Direct link to Option 2: Web SDK settings component")

warning

It is possible for browser security features to prevent the OAuth popup from informing the SDK that a user has successfully authenticated. For the highest reliability, use the Glean web app or the checkdatasourceauth API

If you already embed Glean using the Glean Web SDK, or you want users to stay entirely inside your app, you can render a connectors component similar to Glean's own page. That component lists per-user connectors and you can embed **Connect** and **Authorize** actions directly in your application.

### Use this when[​](#use-this-when "Direct link to Use this when")

-   You have a first-class user settings or integrations page in your product.
-   You want a drop-in UI for per-user auth without sending users to the Glean web app.
-   You're fine using Glean's UX patterns (labels, flows) in your interface.

### High-level integration[​](#high-level-integration "Direct link to High-level integration")

1.  Initialize the Web SDK using your existing authentication mechanism so Glean can identify the current user.
2.  Mount the connectors component on your **Search settings** or **Connect apps** page. It lists per-user connectors that need auth for the active user and shows **Connect** and **Authorize** tools for each.
3.  When the user clicks **Connect**, the Web SDK starts the appropriate OAuth flow (for example, Slack or GitHub) and handles redirects and token storage via Glean.
4.  After completion, the component refreshes and marks the source as connected.

## Option 3: `checkdatasourceauth` API[​](#option-3-checkdatasourceauth-api "Direct link to option-3-checkdatasourceauth-api")

For API-only or highly customized headless integrations, you can call the Client API to discover which connector instances require per-user OAuth, then build your own UI around that.

tip

See the [Glean developer documentation](https://developers.glean.com) for examples of using this API to render a page where users can authorize their connectors.

### Endpoint[​](#endpoint "Direct link to Endpoint")

| Field | Value |
| --- | --- |
| **Method** | `POST` |
| **Path** | `/rest/api/v1/checkdatasourceauth` |
| **Base URL** | `https://tenant_id-be.glean.com` |
| **Auth** | Bearer Client API token for the authenticated user or service |

Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

### Response[​](#response "Direct link to Response")

The endpoint returns a `CheckDatasourceAuthResponse` containing an array of `unauthorizedDatasourceInstances`. Each entry includes:

| Field | Description |
| --- | --- |
| `datasourceInstance` | Instance identifier (for example, `slack_0`, `github_enterprise_0`) |
| `displayName` | Human-readable name (for example, "Slack") |
| `authStatus` | Current per-user auth status: `DISABLED`, `AWAITING_AUTH`, `AUTHORIZED`, `STALE_OAUTH`, or `SEG_MIGRATION` |
| `authUrlRelativePath` | Relative OAuth URL of this user + instance, including a one-time transient token |

### Example response[​](#example-response "Direct link to Example response")

```
{  "unauthorizedDatasourceInstances": [    {      "datasourceInstance": "slack_0",      "displayName": "Slack",      "authStatus": "AWAITING_AUTH",      "authUrlRelativePath": "/auth/slack/oauth?transient_auth_token=..."    }  ]}
```

### Example request[​](#example-request "Direct link to Example request")

```
curl -X POST \  "https://$GLEAN_INSTANCE-be.glean.com/rest/api/v1/checkdatasourceauth" \  -H "Authorization: Bearer $GLEAN_API_TOKEN" \  -H "Accept: application/json"
```

-   `GLEAN_INSTANCE` is your tenant instance ID (for example, `acme`).
-   `GLEAN_API_TOKEN` is a Client API token that authorizes calls on behalf of the user.

### Build your own "Connect apps" UI[​](#build-your-own-connect-apps-ui "Direct link to Build your own \"Connect apps\" UI")

A typical headless flow:

1.  Call `checkdatasourceauth` as the current user.
2.  For each item in `unauthorizedDatasourceInstances`, render tools such as **Connect Slack** or **Connect GitHub**, and build the full OAuth URL as `https://tenant_id-be.glean.com{authUrlRelativePath}`.
3.  When the user clicks **Connect**, redirect them (or open a popup) to that URL. They complete Glean's consent screen and then the provider's OAuth consent.
4.  After success, show a connected confirmation in your UI. Optionally call `checkdatasourceauth` again and confirm the instance no longer appears in `unauthorizedDatasourceInstances`.

Once a source is authorized, search, chat, and other Client API calls for that user will start including data from that source (for example, Slack RTS conversations), subject to permissions.

## Reauthorization[​](#reauthorization "Direct link to Reauthorization")

For most connectors, OAuth is effectively "set it and forget it": Glean receives a long-lived refresh token and uses it to keep access tokens up to date automatically. Users only need to reauthorize if the provider revokes or expires the refresh token (for example, they revoke the app, their org rotates apps, or the provider enforces a new consent).

When that happens, Glean surfaces the source as needing authorization-in the connectors settings UI (Options 1 and 2) or via the `checkdatasourceauth` endpoint (Option 3)-so you can prompt users to reconnect.

## See also[​](#see-also "Direct link to See also")

-   [OAuth overview](/administration/oauth/oauth-overview)
-   [Glean OAuth Authorization Server](/administration/oauth/authorization-server)
