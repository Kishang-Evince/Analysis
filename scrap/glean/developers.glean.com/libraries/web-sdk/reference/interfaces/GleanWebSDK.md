---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/GleanWebSDK"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/GleanWebSDK"
title: "GleanWebSDK | Glean Developer"
description: "Entry point for all Glean embedded widgets."
fetched_at: "2026-09-01T13:23:06.384Z"
---
On this page

Entry point for all Glean embedded widgets.

The SDK will dispatch a `glean:ready` event when the GleanWebSDK is ready to use, see below for examples of how to use the event.

Note that you only need this if you are integrating Glean via a deferred script tag.

## Example[​](#example "Direct link to Example")

```
// example via plain JSlet isGleanReady = !!window.GleanWebSDKwindow.addEventListener("glean:ready", () => { isGleanReady = true})if (isGleanReady) {  // ready to use window.GleanWebSDK.<method>}// example via react hookconst subscribe = (callback: () => void) => {  window.addEventListener("glean:ready", callback)  return window.removeEventListener("glean:ready", callback)}const useIsGleanReady = useSyncExternalStore(subscribe, () => !!window.GleanWebSDK)const YourComponent = () => {  const isGleanReady = useIsGleanReady()  useEffect(() => {    if (isGleanReady) {      // ready to use window.GleanWebSDK.<method>    }  }, [isGleanReady])}
```

## Properties[​](#properties "Direct link to Properties")

### attach[​](#attach "Direct link to attach")

```
attach: (element, options?) => WidgetHandle;
```

Attaches a complete, modal Glean Search to the given input element.

#### User interface[​](#user-interface "Direct link to User interface")

When the given input element is clicked, a modal dialog is immediately presented over the center of the page. It displays a more prominent search box and initial suggested documents and queries. As text is entered, autocomplete is performed, refining the suggestions. Upon pressing enter, the full search results are displayed in the modal. The modal is dismissed by clicking outside of its boundaries or on the close button. External links are opened in a new tab (`target=_blank`). If a non-empty query is passed in options the search modal will automatically open and display results for the query.

#### Usage[​](#usage "Direct link to Usage")

1.  Render a dummy search input box to the page with the desired styling.
2.  Pass a reference to it to this method along with appropriate options. This method will handle all user interaction.
3.  Handle the [SearchOptions.onSearch](/libraries/web-sdk/reference/interfaces/SearchOptions#onsearch) callback if desired (e.g. for tracking purposes).

#### Parameters[​](#parameters "Direct link to Parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | `HTMLElement` | A focusable element such as a text `input` or `contenteditable`. |
| `options?` | [`ModalSearchOptions`](/libraries/web-sdk/reference/interfaces/ModalSearchOptions) | Configuration options for the search modal. |

#### Returns[​](#returns "Direct link to Returns")

[`WidgetHandle`](/libraries/web-sdk/reference/interfaces/WidgetHandle)

An imperative handle ([WidgetHandle](/libraries/web-sdk/reference/interfaces/WidgetHandle)) for Glean modal search.

* * *

### ~attachAutocomplete~[​](#attachautocomplete "Direct link to attachautocomplete")

```
attachAutocomplete: (element, options) => WidgetHandle;
```

#### Parameters[​](#parameters-1 "Direct link to Parameters")

| Parameter | Type |
| --- | --- |
| `element` | `HTMLElement` |
| `options` | [`SearchBoxOptions`](/libraries/web-sdk/reference/interfaces/SearchBoxOptions) |

#### Returns[​](#returns-1 "Direct link to Returns")

[`WidgetHandle`](/libraries/web-sdk/reference/interfaces/WidgetHandle)

#### Deprecated[​](#deprecated "Direct link to Deprecated")

Renamed `renderSearchBox`.

* * *

### createGuestAuthProvider[​](#createguestauthprovider "Direct link to createGuestAuthProvider")

```
createGuestAuthProvider: (options) => GuestAuthProvider;
```

Creates an auth provider to generate auth tokens for guest users. This is only supported if you are using Glean External Search.

#### Parameters[​](#parameters-2 "Direct link to Parameters")

| Parameter | Type |
| --- | --- |
| `options` | [`GuestAuthProviderOptions`](/libraries/web-sdk/reference/interfaces/GuestAuthProviderOptions) |

#### Returns[​](#returns-2 "Direct link to Returns")

[`GuestAuthProvider`](/libraries/web-sdk/reference/interfaces/GuestAuthProvider)

* * *

### getChatOptionsFromUrl[​](#getchatoptionsfromurl "Direct link to getChatOptionsFromUrl")

```
getChatOptionsFromUrl: (deleteParams) => ChatUrlParams;
```

Attempts to read some configuration options for the embedded chat widget from the current URL of the embedding page. See [ChatOptions](/libraries/web-sdk/reference/interfaces/ChatOptions) for details.

#### Usage[​](#usage-1 "Direct link to Usage")

renderChat(containerRef.current, { ...getChatOptionsFromUrl(), chatId: searchParams.get("chatId") ?? "", onChat: (chatId: string) => setSearchParams({ chatId }), onSearch: (query: string) => navigate({ pathname: '/search', search: new URLSearchParams({ query }).toString() }), });

#### Parameters[​](#parameters-3 "Direct link to Parameters")

| Parameter | Type |
| --- | --- |
| `deleteParams` | `boolean` |

#### Returns[​](#returns-3 "Direct link to Returns")

`ChatUrlParams`

* * *

### ~openSidebar~[​](#opensidebar "Direct link to opensidebar")

```
openSidebar: (options) => Promise<void>;
```

Opens a sidebar with a search box, recommendations and results.

#### User interface[​](#user-interface-1 "Direct link to User interface")

A sidebar with a search box slides in from the right of the page.

If [SearchOptions.query](/libraries/web-sdk/reference/interfaces/SearchOptions#query) is given then search results are displayed for the given query by default.

When a search result is clicked, it is opened in a new tab (`target=_blank`). The sidebar is closed when the close button within the sidebar is clicked or the escape key is pressed.

#### Parameters[​](#parameters-4 "Direct link to Parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| `options` | [`SearchOptions`](/libraries/web-sdk/reference/interfaces/SearchOptions) | Configuration options for the search results. |

#### Returns[​](#returns-4 "Direct link to Returns")

`Promise`<`void`\>

#### Deprecated[​](#deprecated-1 "Direct link to Deprecated")

will be removed in future versions.

* * *

### renderChat[​](#renderchat "Direct link to renderChat")

```
renderChat: (element, options) => ChatHandle;
```

Renders Glean AI chat inside the given container element

#### Usage[​](#usage-2 "Direct link to Usage")

1.  Render a block level element in the page with the desired dimensions in the viewport.
2.  Pass it to this method along with appropriate options.

#### Parameters[​](#parameters-5 "Direct link to Parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | `HTMLElement` | A containing HTML element such as a `div` to render the widget into. The container must be a block-level element with a non static position such as 'relative'. |
| `options` | [`ChatOptions`](/libraries/web-sdk/reference/interfaces/ChatOptions) | Configuration options for the chat widget |

#### Returns[​](#returns-5 "Direct link to Returns")

[`ChatHandle`](/libraries/web-sdk/reference/interfaces/ChatHandle)

An imperative handle ([ChatHandle](/libraries/web-sdk/reference/interfaces/ChatHandle)) for Glean chat.

* * *

### renderRecommendations[​](#renderrecommendations "Direct link to renderRecommendations")

```
renderRecommendations: (element, options) => void;
```

Renders Glean recommendations inside the given container element

#### User Interface[​](#user-interface-2 "Direct link to User Interface")

The widget includes a Glean search box and shows contextual recommendations based on the current page.

On clicking the search box, autocomplete dropdown opens with suggestions based on the query being typed in. This may extend beyond the container bounds based on the suggestions. Upon pressing enter, the search results are displayed responsively in the container along with datasources tabs and facet filters. Search results, when clicked are opened in a new tab.

On the search page, a back button is shown beside the search box which can be used to navigate to the previous page.

#### Usage[​](#usage-3 "Direct link to Usage")

1.  Render a block level element in the page with the desired dimensions in the viewport. Minimum height recommended is 600px.
2.  Pass it to this method along with appropriate options.

#### Parameters[​](#parameters-6 "Direct link to Parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | `HTMLElement` | A containing HTML element such as a `div` to render the recommendations widget into. The container must be a block-level element with a non static position such as 'relative'. |
| `options` | [`RecommendationsOptions`](/libraries/web-sdk/reference/interfaces/RecommendationsOptions) | Configuration options for the recommendations widget |

#### Returns[​](#returns-6 "Direct link to Returns")

`void`

* * *

### renderSearchBox[​](#rendersearchbox "Direct link to renderSearchBox")

```
renderSearchBox: (element, options) => WidgetHandle;
```

Displays Glean Search autocomplete inside the given container element.

#### User interface[​](#user-interface-3 "Direct link to User interface")

A search box is rendered within the bounds of the provided container element. The box will take up the full space of the container minus any space required for the margins specified in the customization options [SearchBoxOptions.searchBoxCustomizations](/libraries/web-sdk/reference/interfaces/SearchBoxOptions#searchboxcustomizations). For example, if the search box should be 40px tall with a 5px margin on the top and bottom, the container should be 50px tall with `verticalMargin: 5`. If a `boxShadow` is specified, the margin should be large enough to display it.

#### Usage[​](#usage-4 "Direct link to Usage")

1.  Render a container element to the page with the desired size.
2.  Pass it to this method along with appropriate options.
3.  Handle the [SearchBoxOptions.onSearch](/libraries/web-sdk/reference/interfaces/SearchOptions#onsearch) callback as desired (e.g. by calling [GleanWebSDK.renderSearchResults](#rendersearchresults)) and updating the page title/url.

#### Parameters[​](#parameters-7 "Direct link to Parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | `HTMLElement` | A containing HTML element such as a `div` to render the search box into. The container must have both `position:relative` and `display:block` applied. |
| `options` | [`SearchBoxOptions`](/libraries/web-sdk/reference/interfaces/SearchBoxOptions) | Configuration options for the search box. |

#### Returns[​](#returns-7 "Direct link to Returns")

[`WidgetHandle`](/libraries/web-sdk/reference/interfaces/WidgetHandle)

An imperative handle ([WidgetHandle](/libraries/web-sdk/reference/interfaces/WidgetHandle)) for Glean autocomplete.

* * *

### renderSearchResults[​](#rendersearchresults "Direct link to renderSearchResults")

```
renderSearchResults: (element, options) => void;
```

Renders Glean Search results into the given element.

#### User interface[​](#user-interface-4 "Direct link to User interface")

The search results, datasource tabs and facet filters are displayed responsively to fill the entire element. The caller is responsible for rendering a search input box and handling callback events.

When a link that results in a new query is clicked (such as a spell correction), the [TabbedSearchOptions.onSearch](/libraries/web-sdk/reference/interfaces/SearchOptions#onsearch) callback is invoked but the query is not automatically changed. When the user changes datasource tabs, the interface is updated and the [TabbedSearchOptions.onDatasourceChange](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions#ondatasourcechange) callback is invoked. When a search result is clicked, it is opened in a new tab (`target=_blank`).

#### Usage[​](#usage-5 "Direct link to Usage")

1.  Render a block level element in the page with the desired dimensions in the viewport.
2.  Pass it to this method along with appropriate options.
3.  Respond to the [TabbedSearchOptions.onSearch](/libraries/web-sdk/reference/interfaces/SearchOptions#onsearch) callback by invoking this render method with the same element and the new query. At the same time, it's usually appropriate to update any search box text, page title and URL.
4.  Optionally, respond to the [TabbedSearchOptions.onDatasourceChange](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions#ondatasourcechange) callback by updating the URL to preserve state.

#### Parameters[​](#parameters-8 "Direct link to Parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | `HTMLElement` | A containing HTML element such as a `div` to render the search box into. The container must have both `position:relative` and `display:block` applied. |
| `options` | [`TabbedSearchOptions`](/libraries/web-sdk/reference/interfaces/TabbedSearchOptions) | Configuration options for the search results. |

#### Returns[​](#returns-8 "Direct link to Returns")

`void`

* * *

### renderSettings[​](#rendersettings "Direct link to renderSettings")

```
renderSettings: (element, options) => void;
```

**`Beta`**

Renders Glean settings inside the given container element

#### Usage[​](#usage-6 "Direct link to Usage")

1.  Render a block level element in the page with the desired dimensions in the viewport. It is recommended that the width be at least 800px and the height be at least 600px.
2.  Pass it to this method along with appropriate options.

#### Parameters[​](#parameters-9 "Direct link to Parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | `HTMLElement` | A containing HTML element such as a `div` to render the widget into. The container must be a block-level element with a non static position such as 'relative'. |
| `options` | [`SettingsOptions`](/libraries/web-sdk/reference/interfaces/SettingsOptions) | Configuration options for the settings widget This API is experimental and may change at any time. |

#### Returns[​](#returns-9 "Direct link to Returns")

`void`
