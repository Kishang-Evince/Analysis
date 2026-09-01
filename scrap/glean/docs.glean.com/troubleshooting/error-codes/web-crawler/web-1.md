---
url: "https://docs.glean.com/troubleshooting/error-codes/web-crawler/web-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/web-crawler/web-1"
title: "WEB_1"
description: "WEB_1 Error Code"
fetched_at: "2026-09-01T13:30:32.937Z"
---
Authorization type to be used (BASIC\_AUTH, OAUTH, NTLM or NONE) is not consistent with the secrets and / or configs present.

The secrets required for each Auth type are

-   BASIC\_AUTH: username and password must be populated under the secret keys USERNAME and PASSWORD respectively
-   NLTM: USERNAME, PASSWORD and DOMAIN secret keys should be populated with the respective values
-   OAUTH: OAUTH\_CLIENT\_ID, OAUTH\_CLIENT\_SECRET, OAUTH\_ACCESS\_TOKEN secrets should be set with the respective values.

The error message displayed will have information about what the inconsistency is which should help resolve this.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
