---
url: "https://developers.glean.com/libraries/web-sdk/guides/brightspot"
canonical: "https://developers.glean.com/libraries/web-sdk/guides/brightspot"
title: "Brightspot | Glean Developer"
description: "Guide for implementing Glean's modal search functionality within Brightspot sites"
fetched_at: "2026-09-01T13:23:05.677Z"
---
The following steps will guide you through replacing your Brightspot site's native search with Glean's modal search interface.

1

Access Site Settings

Navigate to **Admin > Sites & Settings** in your Brightspot dashboard and select the site(s) where you want to implement Glean search.

2

Navigate to Front-end Settings

In the **Edit Site** view: 1. Select the **Front-end** tab 2. Expand the **Advanced** section

3

Add Custom Head Elements Container

1.  Click **Add Custom Head Elements** 2. Set **Internal Name** to `Glean`

4

Configure Web SDK Script

Under **Elements**, add a Script Element with the following configuration:

| Field | Value | Required |
| --- | --- | --- |
| **Internal Name** | `Glean Web SDK` | ✅ |
| **Type** | `Link` | ✅ |
| **Script URL** | `https://app.glean.com/embedded-search-latest.min.js` | ✅ |
| **Defer** | `true` | ✅ |

5

Add Integration Script

Add another Script Element with these settings:

| Field | Value | Required |
| --- | --- | --- |
| **Internal Name** | `Glean Search Replace` | ✅ |
| **Type** | `Inline` | ✅ |
| **Body** | See script below | ✅ |

```
addEventListener('DOMContentLoaded', () => {  // If you've customized the page header, you'll need to adjust these selectors.  GleanWebSDK.attach(document.querySelector('.Page-header-search-open'));  GleanWebSDK.attach(document.querySelector('.Page-header-search-input'));})
```

6

Save Changes

Click **Save** to apply your configuration changes.

note

If you have customized your page header, you may need to modify the CSS selectors in the integration script to match your specific implementation.
