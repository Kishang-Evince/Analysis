---
url: "https://developers.glean.com/libraries/web-sdk/guides/zendesk"
canonical: "https://developers.glean.com/libraries/web-sdk/guides/zendesk"
title: "Zendesk | Glean Developer"
description: "Step-by-step guide for integrating Glean search functionality into Zendesk Guide using the Copenhagen template"
fetched_at: "2026-09-01T13:23:05.994Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

Glean offers two distinct options for implementing search functionality within Zendesk Guide:

### Modal Search

A modal search interface that overlays the current page when activated

### Autocomplete & Results Page

An integrated search experience with autocomplete and a dedicated results page

note

These implementation instructions are based on the [Copenhagen](https://support.zendesk.com/hc/en-us/articles/4408845834522) Zendesk Template. While they should work with other themes with minimal modifications, some adjustments may be needed depending on your specific theme.

## Modal Search Implementation[​](#modal-search-implementation "Direct link to Modal Search Implementation")

1

Access Theme Customization

Navigate to the Customize design section by clicking the "eye" icon in the left navigation

2

Select Theme

Locate the **Live theme** section and click **Customize** on your theme

warning

For live help centers, we recommend creating a copy of your theme for testing:

1.  Find your live theme
2.  Click the three vertical dots menu
3.  Select **Copy**

3

Edit Theme Code

1.  Click **Edit Code** to access the theme code editor

2.  Open **script.js** from the left panel
3.  Add the following code at the top level:

```
const gleanScript = document.createElement("script");gleanScript.src = "https://{YOUR_GLEAN_DOMAIN}/browser-api/embedded-search-latest.min.js";gleanScript.defer = true;gleanScript.addEventListener("load", function () {  EmbeddedSearch.attach(document.querySelector("input[type=search]"));});document.head.append(gleanScript);
```

4.  Click **Save**

4

Preview and Publish

1.  Click **Preview** in the left panel to verify your changes
2.  Once confirmed, apply the changes to your live theme
3.  Click **Publish** to make the changes live

## Autocomplete and Search Results Implementation[​](#autocomplete-and-search-results-implementation "Direct link to Autocomplete and Search Results Implementation")

1

Import JavaScript Files

1.  Access theme customization as described above
2.  Click **Edit Code**
3.  Open **document\_header.hbs**
4.  Add the following script tag:

```
<script defer src="https://{YOUR_GLEAN_DOMAIN}/browser-api/glean-for-zendesk-guide-latest.min.js"></script>
```

2

Replace Search UI Components

### Home Page Search[​](#home-page-search "Direct link to Home Page Search")

1.  Open **home\_page.hbs**
2.  Replace the existing `{{search}}` component with:

```
<div  class="glean-search-box"  style="width: 100%; height: 60px; max-width: 600px; margin:auto; position: relative;"></div>
```

### Search Results Page[​](#search-results-page "Direct link to Search Results Page")

1.  Open **search\_results.hbs**
2.  Replace all existing code with:

```
<div class="glean-search-results" style="width: 100%; margin:auto; position: relative;"></div>
```

3

Add Compact Search Box

1.  Open **article\_page.hbs**
2.  Replace the existing search code with:

```
<div  class="glean-search-box--compact"  style="width: 100%; height: 42px; max-width: 600px; margin:auto; position: relative;"></div>
```

4

Initialize Glean Search

1.  Open **script.js**
2.  Add the following code at the end of the file:

```
/** Setup Glean search **/function initializeGleanSearch () {  // Note: This should match the backend URL for your Glean setup  const backend = '<CHANGEME>';  // See available customizations here: https://developers.glean.com/libraries/web-sdk/reference/interfaces/SearchBoxCustomizations  const customizations = {    boxShadow: 'none',    borderRadius: 8,    placeholderText: 'Search...', // Change me to a placeholder of your choice  };  // Initialize GleanForZendesk  GleanForZendeskGuide.init({    // This should match the search page used by your theme -- this usually matches /hc/search    searchUrl: '/hc/search',    // If your Glean setup supports guest users, mark this as true.    // Note: If your Glean setup is internal users only, this option will be ignored.    anonymous: false,    backend,  }).then((instance) => {    // Attach hero search box    instance.renderSearchBox('.glean-search-box', {      searchBoxCustomizations: Object.assign({}, customizations, {        fontSize: 20,        // Additional customizations can be added here      }),      backend,    });    // Attach compact search box    instance.renderSearchBox('.glean-search-box--compact', {      searchBoxCustomizations: Object.assign({}, customizations, {        fontSize: 16,        // Additional customizations can be added here      }),      backend,    });    // Attach search results    instance.renderSearchResults('.glean-search-results', { backend, showInlineSearchBox: true });  });}if (document.readyState === 'loading') {  document.addEventListener('DOMContentLoaded', initializeGleanSearch);} else {  initializeGleanSearch();}
```

5

Verify and Publish

1.  Click **Preview** to test your changes
2.  Apply the changes to your live theme
3.  Click **Publish** to make the changes live
