---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/Theme"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/Theme"
title: "Theme | Glean Developer"
description: "Properties"
fetched_at: "2026-09-01T13:23:06.985Z"
---
On this page

## Properties[​](#properties "Direct link to Properties")

### background?[​](#background "Direct link to background?")

```
optional background?: string;
```

The primary page background color.

* * *

### backgroundLight?[​](#backgroundlight "Direct link to backgroundLight?")

```
optional backgroundLight?: string;
```

The background color for content that is lightly promoted and sits one level higher than `backgroundMid`.

* * *

### backgroundMid?[​](#backgroundmid "Direct link to backgroundMid?")

```
optional backgroundMid?: string;
```

The background color for cards and other content that sits one level higher than `background`.

* * *

### ~backgroundSuccess?~[​](#backgroundsuccess "Direct link to backgroundsuccess")

```
optional backgroundSuccess?: string;
```

#### Deprecated[​](#deprecated "Direct link to Deprecated")

use successBackground instead. The background color for success content. Must have sufficient contrast with textPrimary.

* * *

### bannerPrimaryBackground?[​](#bannerprimarybackground "Direct link to bannerPrimaryBackground?")

```
optional bannerPrimaryBackground?: string;
```

The background color used for primary banners

* * *

### bannerSecondaryBackground?[​](#bannersecondarybackground "Direct link to bannerSecondaryBackground?")

```
optional bannerSecondaryBackground?: string;
```

The background color used for secondary banners

* * *

### borderDark?[​](#borderdark "Direct link to borderDark?")

```
optional borderDark?: string;
```

The border colors for cards and form elements that should be strongly distinguished from their surroundings. Should be discernable from all background colors.

* * *

### borderLight?[​](#borderlight "Direct link to borderLight?")

```
optional borderLight?: string;
```

The border colors for cards and form elements that should be subtly distinguished from their surroundings. Should be discernable from all background colors.

* * *

### chatBackground?[​](#chatbackground "Direct link to chatBackground?")

```
optional chatBackground?: string;
```

The background color for chat. Should be a hex color code.

* * *

### companyBackgroundTextPrimary?[​](#companybackgroundtextprimary "Direct link to companyBackgroundTextPrimary?")

```
optional companyBackgroundTextPrimary?: string;
```

The color for prominent text on the company provided background image. Should have sufficient contrast with the company background image.

* * *

### disabled?[​](#disabled "Direct link to disabled?")

```
optional disabled?: string;
```

The color for disabled elements

* * *

### disabledBackground?[​](#disabledbackground "Direct link to disabledBackground?")

```
optional disabledBackground?: string;
```

Background color for disabled elements

* * *

### disabledHighlight?[​](#disabledhighlight "Direct link to disabledHighlight?")

```
optional disabledHighlight?: string;
```

The color for disabled elements

* * *

### error?[​](#error "Direct link to error?")

```
optional error?: string;
```

The color that is used for text and icons that indicate an error condition. Should have sufficient contrast with all background colors.

* * *

### errorBackground?[​](#errorbackground "Direct link to errorBackground?")

```
optional errorBackground?: string;
```

The background color for error content. Must have sufficient contrast with textPrimary.

* * *

### hover?[​](#hover "Direct link to hover?")

```
optional hover?: string;
```

The background color used upon hovering over interactable elements such as buttons.

* * *

### info?[​](#info "Direct link to info?")

```
optional info?: string;
```

The background color used for info content.

* * *

### infoBackground?[​](#infobackground "Direct link to infoBackground?")

```
optional infoBackground?: string;
```

The background color for info content.

* * *

### infoForeground?[​](#infoforeground "Direct link to infoForeground?")

```
optional infoForeground?: string;
```

The foreground color for info content.

* * *

### navBarBackground?[​](#navbarbackground "Direct link to navBarBackground?")

```
optional navBarBackground?: string;
```

The background color for the app-wide navigation bar.

* * *

### navBarForeground?[​](#navbarforeground "Direct link to navBarForeground?")

```
optional navBarForeground?: string;
```

The foreground icon color for the app-wide navigation bar. Should have sufficient contrast with `navBarBackground`.

* * *

### navigationInPageBackground?[​](#navigationinpagebackground "Direct link to navigationInPageBackground?")

```
optional navigationInPageBackground?: string;
```

The background color for the app-wide in-page menu.

* * *

### primaryHighlight?[​](#primaryhighlight "Direct link to primaryHighlight?")

```
optional primaryHighlight?: string;
```

The primary accent color used for hyperlinks, buttons, and overall branding. Should have sufficient contrast with all background colors.

* * *

### primaryHover?[​](#primaryhover "Direct link to primaryHover?")

```
optional primaryHover?: string;
```

The hover color for interactable `primaryHighlight`. Should have sufficient contrast with all background colors.

* * *

### selected?[​](#selected "Direct link to selected?")

```
optional selected?: string;
```

The background color used when an interactable element such as a menu option or toggle is actively applied.

* * *

### shellBackground?[​](#shellbackground "Direct link to shellBackground?")

```
optional shellBackground?: string;
```

The background for the app shell. This can be hex value, linear-gradient or image (url).

* * *

### success?[​](#success "Direct link to success?")

```
optional success?: string;
```

The color that is used for text and icons that indicate an success condition. Should have sufficient contrast with all background colors.

* * *

### successBackground?[​](#successbackground "Direct link to successBackground?")

```
optional successBackground?: string;
```

The background color used to indicate successes. For ex, in: banners, toasts, etc.

* * *

### textHighlight?[​](#texthighlight "Direct link to textHighlight?")

```
optional textHighlight?: string;
```

The color for text that is highlighted. Should have sufficient contrast with all background colors.

* * *

### textPrimary?[​](#textprimary "Direct link to textPrimary?")

```
optional textPrimary?: string;
```

The color for prominent text. Should have sufficient contrast with all background colors.

* * *

### textSecondary?[​](#textsecondary "Direct link to textSecondary?")

```
optional textSecondary?: string;
```

The color for secondary text. Should have sufficient contrast with all background colors, but less than `textPrimary`.

* * *

### visited?[​](#visited "Direct link to visited?")

```
optional visited?: string;
```

The color for visited hyperlinks.

* * *

### warning?[​](#warning "Direct link to warning?")

```
optional warning?: string;
```

The color that is used for distinguishing warning elements from their surroundings

* * *

### warningBackground?[​](#warningbackground "Direct link to warningBackground?")

```
optional warningBackground?: string;
```

The background color for warning content. Must have sufficient contrast with textPrimary.

* * *

### warningDark?[​](#warningdark "Direct link to warningDark?")

```
optional warningDark?: string;
```

The color that is used for strongly distinguishing warning elements from their surroundings

* * *

### warningLight?[​](#warninglight "Direct link to warningLight?")

```
optional warningLight?: string;
```

The color that is used for subtly distinguishing warning elements from their surroundings

* * *

### warningText?[​](#warningtext "Direct link to warningText?")

```
optional warningText?: string;
```

The color that is used for distinguishing warning text from their surroundings
