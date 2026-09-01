---
url: "https://docs.glean.com/troubleshooting/chrome-trace"
canonical: "https://docs.glean.com/troubleshooting/chrome-trace"
title: "Record a trace (HAR file requests)"
description: "Learn how to record and share Chrome traces or HAR files to help diagnose performance issues"
fetched_at: "2026-09-01T13:30:08.182Z"
---
On this page

When you experience performance issues, our engineering team may request a Chrome trace to diagnose and resolve the problem.

info

Chrome traces help our engineers understand exactly what's causing performance bottlenecks, allowing us to optimize the experience for you.

warning

**Privacy considerations**

Chrome traces may contain sensitive information including:

-   URLs and titles of open tabs
-   Running browser extensions

To protect your privacy, consider closing unnecessary tabs before you record. Note that traces do **not** include your browser history.

We recommend using the [CloudFlare HAR File Sanitizer](https://har-sanitizer.pages.dev/) to remove any sensitive information from the trace file before you share it with Glean.

## Record a trace[​](#record-a-trace "Direct link to Record a trace")

1

Open Chrome tracing

In a new Chrome tab, navigate to **chrome://tracing**

2

Start the recording

Click the **Record** button located in the upper left corner

3

Configure settings

1.  Click **Manually select settings**
2.  In the Record categories section, click the **All** button in the left column
3.  Click **Record** to begin

4

Reproduce the issue

Perform the action that was slow, such as running a search or opening a new tab.

5

Save the trace

1.  Return to the tracing tab
2.  Click **Stop**
3.  Click **Save** in the upper left corner
4.  Share the resulting trace file with our support team

6

Additional settings

-   Make sure you have checked the box to "Preserve log"
-   Under the DevTools settings make sure to also check the "Auto-open DevTools for popups" as well ![](/assets/images/NetworTab-PreserveLog-339c906d97bfc10392593758342547d8.png) ![](/assets/images/Enable-DevTools-Popups-6f06e80be71de194450d515d3c7f3f6a.png)

7

Before you send a HAR file to support

1.  Rename AND zip or compress your HAR files.

-   Uncompressed HAR files are often over attachment size limits.
-   By default, HAR files use the page URL as the name of the file.
-   Files with .com extensions look suspicious to spam and phishing filters, give the HAR file a descriptive name that doesn't include their full URL.

## If you don't use Chrome or the steps above don't work[​](#if-you-dont-use-chrome-or-the-steps-above-dont-work "Direct link to If you don't use Chrome or the steps above don't work")

If you are blocked from Chrome tracing (chrome://tracing) or Chrome is not your preferred browser, you can open the browser dev tools (cmd + opt +i , or right click + inspect) and follow the rest of the above steps from the network tab.
