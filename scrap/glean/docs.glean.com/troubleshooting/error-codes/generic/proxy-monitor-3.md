---
url: "https://docs.glean.com/troubleshooting/error-codes/generic/proxy-monitor-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/generic/proxy-monitor-3"
title: "Proxy_Monitor_3"
description: "Proxy_Monitor_3 Error Code"
fetched_at: "2026-09-01T13:30:18.333Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   The onprem host was not resolved to an ip address, by the proxy vm. This is required to crawl data from the on prem connector instance.

## Resolution:[​](#resolution "Direct link to Resolution:")

\-There are 2 ways to resolve the host to an ip address.

1.  Set onprem.host and onprem.ip
2.  Set onprem.host and setup.proxy.nameservers.
    -   setup.proxy.nameservers should be a CSV of the nameservers which will help in resolving the onprem.host

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
