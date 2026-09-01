---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/RecommendationsBoxCustomizations"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/RecommendationsBoxCustomizations"
title: "RecommendationsBoxCustomizations | Glean Developer"
description: "Properties"
fetched_at: "2026-09-01T13:23:06.476Z"
---
On this page

## Properties[​](#properties "Direct link to Properties")

### border?[​](#border "Direct link to border?")

```
optional border?: string;
```

The CSS border of the widget box

* * *

### borderRadius?[​](#borderradius "Direct link to borderRadius?")

```
optional borderRadius?: number;
```

The border radius of the widget box

* * *

### boxShadow?[​](#boxshadow "Direct link to boxShadow?")

```
optional boxShadow?: string;
```

The CSS box-shadow of the widget box

* * *

### horizontalMargin?[​](#horizontalmargin "Direct link to horizontalMargin?")

```
optional horizontalMargin?: number;
```

A CSS margin to the left and right of the widget box

* * *

### searchBox?[​](#searchbox "Direct link to searchBox?")

```
optional searchBox?: Pick<SearchBoxCustomizations, "searchIconUrl" | "placeholderText" | "fontSize">;
```

Optional style customizations for the search box

* * *

### showNoRecommendationsHint?[​](#shownorecommendationshint "Direct link to showNoRecommendationsHint?")

```
optional showNoRecommendationsHint?: boolean;
```

Whether a hint should be displayed when no recommendations are present. default: true

* * *

### verticalMargin?[​](#verticalmargin "Direct link to verticalMargin?")

```
optional verticalMargin?: number;
```

A CSS margin above and below the widget box
