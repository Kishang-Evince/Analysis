---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/FilterConfig"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/FilterConfig"
title: "FilterConfig | Glean Developer"
description: "Properties"
fetched_at: "2026-09-01T13:23:06.273Z"
---
On this page

## Properties[​](#properties "Direct link to Properties")

### iconName[​](#iconname "Direct link to iconName")

```
iconName: string;
```

The name of a glyph icon to display next to the filter name. Supported values are a subset of those found at [https://www.feathericons.com](https://www.feathericons.com). Contact Glean to add support for new values.

* * *

### key[​](#key "Direct link to key")

```
key: string;
```

The unique identifier of the filter. If the filter is based on a property of custom datasource documents, the key should match the name of the custom property.

* * *

### placeholder[​](#placeholder "Direct link to placeholder")

```
placeholder: string;
```

Placeholder text to show when no filter value is selected.
