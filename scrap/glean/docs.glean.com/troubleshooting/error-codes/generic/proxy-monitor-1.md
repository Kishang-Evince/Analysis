---
url: "https://docs.glean.com/troubleshooting/error-codes/generic/proxy-monitor-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/generic/proxy-monitor-1"
title: "Proxy_Monitor_1"
description: "Proxy_Monitor_1 Error Code"
fetched_at: "2026-09-01T13:30:18.212Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   The proxy vm is not present.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   We need to enable setup.proxy.enabled config and set one of the following configs:
    -   **setup.proxy.standalone = true**
    -   **setup.sharedvpc.subnet**
    -   **setup.transit.range** If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
