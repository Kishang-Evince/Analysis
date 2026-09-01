---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/SearchOptions"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/SearchOptions"
title: "SearchOptions | Glean Developer"
description: "Extends"
fetched_at: "2026-09-01T13:23:07.145Z"
---
On this page

## Extends[​](#extends "Direct link to Extends")

-   [`Options`](/libraries/web-sdk/reference/interfaces/Options)

## Extended by[​](#extended-by "Direct link to Extended by")

-   [`SearchBoxOptions`](/libraries/web-sdk/reference/interfaces/SearchBoxOptions)
-   [`ModalSearchOptions`](/libraries/web-sdk/reference/interfaces/ModalSearchOptions)
-   [`TabbedSearchOptions`](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions)

## Properties[​](#properties "Direct link to Properties")

### authMethod?[​](#authmethod "Direct link to authMethod?")

```
optional authMethod?: "sso" | "token";
```

The authentication method to use in the embedded widget.

sso - Logged out users will see a login button in the embedded widget. Clicking the button will open the SSO login flow in a new window.

token - The embedding page obtains an auth token on behalf of the user and passes it to the embedded widget. If this method is specified the [Options.authToken](/libraries/web-sdk/reference/interfaces/Options#authtoken) and [Options.onAuthTokenRequired](/libraries/web-sdk/reference/interfaces/Options#onauthtokenrequired) options must also be specified.

#### Inherited from[​](#inherited-from "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`authMethod`](/libraries/web-sdk/reference/interfaces/Options#authmethod)

* * *

### authToken?[​](#authtoken "Direct link to authToken?")

```
optional authToken?: AuthTokenDetails;
```

An authentication token for the user. Providing this obviates the need for the user to separately login to Glean. May be obtained via: [https://developers.glean.com/api/client-api/authentication/createauthtoken](https://developers.glean.com/api/client-api/authentication/createauthtoken)

If an authToken is provided, [Options.onAuthTokenRequired](/libraries/web-sdk/reference/interfaces/Options#onauthtokenrequired) must also be provided.

#### Inherited from[​](#inherited-from-1 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`authToken`](/libraries/web-sdk/reference/interfaces/Options#authtoken)

* * *

### backend?[​](#backend "Direct link to backend?")

```
optional backend?: string;
```

Overrides the search backend server to use.

Setting this explicitly is always recommended as it alleviates the user from from having to manually enter their email address in order to route to the backend instance to log into.

It's also useful for routing users to a production vs staging server (if available).

Example: `https://{your}-be.glean.com/`

#### Inherited from[​](#inherited-from-2 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`backend`](/libraries/web-sdk/reference/interfaces/Options#backend)

* * *

### datasource?[​](#datasource "Direct link to datasource?")

```
optional datasource?: string;
```

Select the search tab for the given datasource (e.g. `'confluence'`, `'gdrive'`, `'people'`) instead of the all tab. Other datasource tabs will be shown if results are available for the current query. See also [SearchOptions.datasourcesFilter](#datasourcesfilter).

* * *

### datasourcesFilter?[​](#datasourcesfilter "Direct link to datasourcesFilter?")

```
optional datasourcesFilter?: string[];
```

Filter search results to only the given list of datasources (e.g. `['figma']`, `['jira', 'zendesk']`). Results from other datasources will not be available. See also [SearchOptions.datasource](#datasource).

* * *

### disableAnalytics?[​](#disableanalytics "Direct link to disableAnalytics?")

```
optional disableAnalytics?: boolean;
```

If true, Glean will not collect client analytics or log activity for the embedded session.

Analytics data is used to monitor and improve the product experience, so it's recommended to leave data collection on unless the user has specifically requested otherwise.

#### Inherited from[​](#inherited-from-3 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`disableAnalytics`](/libraries/web-sdk/reference/interfaces/Options#disableanalytics)

* * *

### disableAssistant?[​](#disableassistant "Direct link to disableAssistant?")

```
optional disableAssistant?: boolean;
```

If true, Glean Assistant will not be enabled for the embedded session, including but not limited to generated answers, summaries, chat, and other features.

#### Inherited from[​](#inherited-from-4 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`disableAssistant`](/libraries/web-sdk/reference/interfaces/Options#disableassistant)

* * *

### domainsToOpenInCurrentTab?[​](#domainstoopenincurrenttab "Direct link to domainsToOpenInCurrentTab?")

```
optional domainsToOpenInCurrentTab?: string[];
```

Always open links from these domains in the current tab.

Expects a list of one or more domain suffixes, e.g. `['example.com', 'foo.example.org']`.

#### Inherited from[​](#inherited-from-5 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`domainsToOpenInCurrentTab`](/libraries/web-sdk/reference/interfaces/Options#domainstoopenincurrenttab)

* * *

### enable3PCookieAccessRequest?[​](#enable3pcookieaccessrequest "Direct link to enable3PCookieAccessRequest?")

```
optional enable3PCookieAccessRequest?: boolean;
```

Enable flow to request the user for access if third-party cookies are blocked. If true, the user will be prompted to allow cookie access for glean.com when they try to login.

Default to true since api version >= 2025-06-19.

Note: This flag will have no impact if third-party cookies are already allowed. Users will be able to login as usual.

Refer to [Guide to third-party cookies in Glean](https://developers.glean.com/docs/browser_api/third_party_cookies/) for more details.

#### Inherited from[​](#inherited-from-6 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`enable3PCookieAccessRequest`](/libraries/web-sdk/reference/interfaces/Options#enable3pcookieaccessrequest)

* * *

### enableActivityLogging?[​](#enableactivitylogging "Direct link to enableActivityLogging?")

```
optional enableActivityLogging?: boolean;
```

Logs an activity event for each URL change of the embedding page.

This improves search quality when embedded within a datasource for which there are not other activity signals (e.g. Salesforce).

Note: if disableAnalytics is true, activity logging will be disabled regardless of the value of this option.

#### Inherited from[​](#inherited-from-7 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`enableActivityLogging`](/libraries/web-sdk/reference/interfaces/Options#enableactivitylogging)

* * *

### externalSessionId?[​](#externalsessionid "Direct link to externalSessionId?")

```
optional externalSessionId?: string;
```

An external session identifier provided by the embedder. Included in all analytics events so embedders can join Glean logs with their own session telemetry.

#### Inherited from[​](#inherited-from-8 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`externalSessionId`](/libraries/web-sdk/reference/interfaces/Options#externalsessionid)

* * *

### externalUserId?[​](#externaluserid "Direct link to externalUserId?")

```
optional externalUserId?: string;
```

An external user identifier provided by the embedder. Included in all analytics events so embedders can join Glean logs with their own user telemetry.

#### Inherited from[​](#inherited-from-9 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`externalUserId`](/libraries/web-sdk/reference/interfaces/Options#externaluserid)

* * *

### filters?[​](#filters "Direct link to filters?")

```
optional filters?: FilterValue[];
```

Filters applied on all searches done by the user. Any filters in this list will override any manually input filters from users or filters defined in [initialFilters](#initialfilters) that share the same key. These filters are non-modifiable by the user, and will not show up in the UI as being applied.

For example, if a filter with some key `keyA` is specified here, then:

-   Users will not be able to modify any filters corresponding to `keyA` in the UI in any way
-   The filter dropdown for that key will not show up on the UI (nor in the overflow button)
-   Search bar operators (i.e. `keyA:[value]`) with that key will be overridden and removed from the search bar query
-   Any filters defined in [initialFilters](#initialfilters) with `keyA` will be ignored.

When specifying the list of filters the same `key` may be specified more than once, in which case the `value`s for that key are combined via an 'OR' operation. The `value`s for different `key`s are combined via 'AND'. For example, this set of filters will match all results that were updated in the past week AND are of type "bug" OR "task":

```
 [{ key: "type", value: "bug" }, { key: "type", value: "task" }, { key: "updated", value: "past_week" }]
```

* * *

### fontFaces?[​](#fontfaces "Direct link to fontFaces?")

```
optional fontFaces?: FontFaceDetails[];
```

A list of custom font-faces to include in the embedded page. When provided, the custom font-faces can be selected via the fontFamily option.

#### Inherited from[​](#inherited-from-10 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`fontFaces`](/libraries/web-sdk/reference/interfaces/Options#fontfaces)

* * *

### fontFamily?[​](#fontfamily "Direct link to fontFamily?")

```
optional fontFamily?: string;
```

The font-family used for text in the embedded widget.

#### Inherited from[​](#inherited-from-11 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`fontFamily`](/libraries/web-sdk/reference/interfaces/Options#fontfamily)

* * *

### fontSize?[​](#fontsize "Direct link to fontSize?")

```
optional fontSize?: "medium" | "large" | "larger";
```

The base font size of the embedded app.

Defaults to 'medium' which corresponds to the browser's default font size, typically 16px. The actual font sizes of elements are relative to this value, some will be larger or smaller.

#### Inherited from[​](#inherited-from-12 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`fontSize`](/libraries/web-sdk/reference/interfaces/Options#fontsize)

* * *

### hideAutocomplete?[​](#hideautocomplete "Direct link to hideAutocomplete?")

```
optional hideAutocomplete?: boolean;
```

If true, search boxes will not render the autocomplete dropdown.

* * *

### ~initialFilters?~[​](#initialfilters "Direct link to initialfilters")

```
optional initialFilters?: FilterValue[];
```

#### Deprecated[​](#deprecated "Direct link to Deprecated")

Use [filters](#filters) instead.

* * *

### key?[​](#key "Direct link to key?")

```
optional key?: string;
```

Uniquely identify the widget. Must be used if more than one Glean widget of the same type are rendered on the page

Allowed characters: \[a-z A-Z - \_ . ; :\]

#### Inherited from[​](#inherited-from-13 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`key`](/libraries/web-sdk/reference/interfaces/Options#key)

* * *

### locale?[​](#locale "Direct link to locale?")

```
optional locale?: string;
```

Overrides the default locale for the embedded widget users. If 'auto' (default) is used, Glean will automatically detect the locale from user's browser. If an unsupported locale is provided, Glean will fallback to use the closest supported locale.

If user picked their locale for Glean, their choice will be respected.

#### Inherited from[​](#inherited-from-14 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`locale`](/libraries/web-sdk/reference/interfaces/Options#locale)

* * *

### onAuthTokenRequired?[​](#onauthtokenrequired "Direct link to onAuthTokenRequired?")

```
optional onAuthTokenRequired?:   | (() => Promise<AuthTokenDetails>)  | (() => void);
```

A callback invoked when the user requires a new authentication token. Only invoked if an [Options.authToken](/libraries/web-sdk/reference/interfaces/Options#authtoken) is provided initially and is nearing expiration.

This option is required when [Options.authMethod](/libraries/web-sdk/reference/interfaces/Options#authmethod) is 'token'.

**Signatures:**

1.  `() => Promise<AuthTokenDetails>` - (Recommended) Return a Promise that resolves to the new token details. The SDK will update the token internally without requiring a re-render.

#### Example[​](#example "Direct link to Example")

```
onAuthTokenRequired: async () => {     const token = await fetchNewToken()     return { token: token.value, expirationTime: token.expiresAt }   }2. `() => void` - (Legacy) The callback must fetch a new token and call the   SDK's render method with updated options containing the new token.
```

#### Inherited from[​](#inherited-from-15 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`onAuthTokenRequired`](/libraries/web-sdk/reference/interfaces/Options#onauthtokenrequired)

* * *

### onChat?[​](#onchat "Direct link to onChat?")

```
optional onChat?: (chatId?) => void;
```

A callback invoked when the user tries to initiate a chat from search pages, like follow ups from AI Answer.

If provided, we will allow and show follow ups on AI Answer for user to continue to chat from there, typical usage can be:

1.  open the chat in a new page
2.  or open chat with `renderChat` method on the same page

#### Parameters[​](#parameters "Direct link to Parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| `chatId?` | `string` | An opaque id that stores the context of the current / new chat for the current session |

#### Returns[​](#returns "Direct link to Returns")

`void`

* * *

### onSearch[​](#onsearch "Direct link to onSearch")

```
onSearch: (query) => void;
```

A callback invoked when the user performs a search query.

#### Parameters[​](#parameters-1 "Direct link to Parameters")

| Parameter | Type |
| --- | --- |
| `query` | `string` |

#### Returns[​](#returns-1 "Direct link to Returns")

`void`

* * *

### query?[​](#query "Direct link to query?")

```
optional query?: string;
```

The initial query text to perform/display.

* * *

### theme?[​](#theme "Direct link to theme?")

```
optional theme?: Partial<Record<ThemeVariant, Theme>>;
```

A theme applied throughout the embedded widget. If a theme variant (e.g. dark) isn't supplied, the default Glean theme will be used when the user has applied that variant. If any color is not supplied for a variant, the default Glean color will be used.

#### Inherited from[​](#inherited-from-16 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`theme`](/libraries/web-sdk/reference/interfaces/Options#theme)

* * *

### themeVariant?[​](#themevariant "Direct link to themeVariant?")

```
optional themeVariant?: ThemeVariantOrAuto;
```

Overrides the theme variant for the embedded widget (default: light) If 'auto' is selected, Glean will automatically switch between light and dark mode and remain in sync with the user device.

#### Inherited from[​](#inherited-from-17 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`themeVariant`](/libraries/web-sdk/reference/interfaces/Options#themevariant)

* * *

### unauthorizedMessage?[​](#unauthorizedmessage "Direct link to unauthorizedMessage?")

```
optional unauthorizedMessage?: string;
```

A message to display when the current session does not have valid authorization.

The message only applies when [Options.authToken](/libraries/web-sdk/reference/interfaces/Options#authtoken) is used ([Options.authMethod](/libraries/web-sdk/reference/interfaces/Options#authmethod) is 'token'). It can be used to instruct the user on how to get back to an authorized session, e,g, "Please refresh the page" or "Sign in to \[SSO provider\]".

#### Inherited from[​](#inherited-from-18 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`unauthorizedMessage`](/libraries/web-sdk/reference/interfaces/Options#unauthorizedmessage)

* * *

### urlsToOpenInCurrentTab?[​](#urlstoopenincurrenttab "Direct link to urlsToOpenInCurrentTab?")

```
optional urlsToOpenInCurrentTab?: string[];
```

Always open matching URLs in the current tab

Should be an array of strings representing a regular expression. For example: "^https://example\\.com.\*$" will match any URL that starts with '[https://example.com](https://example.com)'.

Rules:

-   Every regular expression MUST start with '^' to ensure it matches from the start of the URL.
-   Regular expressions do not include search params when matching the URL.
-   A maximum of 10 entries are allowed in the array.

#### Inherited from[​](#inherited-from-19 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`urlsToOpenInCurrentTab`](/libraries/web-sdk/reference/interfaces/Options#urlstoopenincurrenttab)

* * *

### webAppUrl?[​](#webappurl "Direct link to webAppUrl?")

```
optional webAppUrl?: string;
```

The web page URL where users access Glean. For example: https://<subdomain>.glean.com.

Admins can find this value at [https://app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) in the `Web app URL` field.

#### Inherited from[​](#inherited-from-20 "Direct link to Inherited from")

[`Options`](/libraries/web-sdk/reference/interfaces/Options).[`webAppUrl`](/libraries/web-sdk/reference/interfaces/Options#webappurl)
