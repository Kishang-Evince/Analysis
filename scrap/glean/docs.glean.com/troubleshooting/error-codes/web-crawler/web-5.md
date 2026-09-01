---
url: "https://docs.glean.com/troubleshooting/error-codes/web-crawler/web-5"
canonical: "https://docs.glean.com/troubleshooting/error-codes/web-crawler/web-5"
title: "WEB_5"
description: "WEB_5 Error Code"
fetched_at: "2026-09-01T13:30:33.436Z"
---
The canonicalization configs set are inconsistent. Contact Glean support to help with fixing this. Some common errors are:

-   The conflicting configs`urlCanonicalization.stripAllQueryParams` and `urlCanonicalization.greenlistedQueryParams` are both set. Remove one of the two depending on the desired behaviour.
-   `canonicalizingURLRegexes` contains an odd sized list of elements. It is expected to contain an even-sized list of matching group and corresponding replacement pairs.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
