---
url: "https://www.glean.com/blog/how-glean-loads-instantly"
canonical: "https://www.glean.com/blog/how-glean-loads-instantly"
title: "How Glean loads instantly - Glean"
description: "Tony Gentilcore  | At a company where we’re unencumbered by any motivation to hold people’s eyeballs as long as possible just to show them ads, Speed is our favorite feature."
fetched_at: "2026-09-01T13:26:42.629Z"
---
Last updated Feb 21, 2022.

# How Glean loads instantly - Glean

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/61e5680d236052c0f039b4ed_05-Tony.png)

Tony Gentilcore

Engineering



](/authors/tony-gentilcore)

![How Glean loads instantly - Glean](https://cdn.prod.website-files.com/613513981b0efaf850830620/621538c49b06f1f4134afb73_NTP.png)

Listen to article

0:00

0.5x 1x 1.5x 2x

### Table of contents

[

Heading 2

](#)

[

Heading 3

](#)

[

Heading 4

](#)

[

Heading 5

](#)

[

Heading 6

](#)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

Share this article:

Listen to article

0:00

0.5x 1x 1.5x 2x

At [Glean](https://www.glean.com), *Speed* is our favorite [feature](https://www.glean.com/product/features). Unlike some companies, we’re unencumbered by any motivation to hold people’s eyeballs as long as possible just to show them ads. We’re free to optimize for helping people and teams find what they need and get out as fast as possible, so they can get big things done.  

One of the quickest ways to find things with Glean is via its New Tab Page. It’s personalized and customized by each user – the layout, background, favorite sites, and suggested documents. Even with all this dynamic content, everyone expects a new tab to open immediately, with no perceptible delay. That presented a fun challenge for our [engineering team](https://www.glean.com/about) – one that required a novel solution.  

Take a look at the result in this video. This technical post explains how we did it.

‍

‍

## Step 1 - Service Worker

When a web browser loads a page, it first has to fetch all of its resources. Historically this required several seconds of waiting for the network. [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) have changed that entirely. So, the first thing we did was to set up [Workbox](https://developers.google.com/web/tools/workbox), an excellent open source framework which makes it simple to create a Service Worker that loads your page entirely from cache, even when offline.  

## Step 2 - Redux-Persist

Now that loading our code and resources was fast, the next problem was that it still required a round trip to the server to fetch the preferences. To avoid this, we cached everything locally to IndexedDB using [redux-persist](https://github.com/rt2zz/redux-persist).  

This seemed to work at first, but caused all kinds of performance issues in the app, especially for machines under load. Luckily, two of the founding members of Google’s Chrome Speed Team now work at Glean so we knew the tool to debug - [Chrome Tracing](https://help.glean.com/en/articles/4536336-recording-a-chrome-trace). It uncovered that, by default, Chrome waits to flush all IndexedDB writes to disk via an fsync. Some browsers like Firefox do not, but at least Chrome gave us a tool to avoid it – [relaxed durability](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/durability). So we wrote our own redux-persist backend and also contributed a fix to Workbox. Now filesystem operations no longer get pathologically backed up.

## Step 3 - Render Caching

Even though our caching was complete and efficient, it still wasn’t fast enough. The browser was still spending several hundred milliseconds compiling our JavaScript and bringing up React for that first render. So we had to think out of the box by taking a cue from [Server Side Rendering](https://reactjs.org/docs/react-dom.html#hydrate). This is a technique to render a DOM on the server and ship its HTML to the browser so that it can present it immediately with only CSS/HTML parsing and layout while React is loading.  

The insight was that this could also work for a page dynamically built on the client. After it loads, we snapshot the DOM’s HTML and persist it to the Service Worker so that upon the next load, there’s already a pre-rendered HTML page in the cache that requires no JavaScript in order to be displayed. The details are esoteric. They required some careful considerations in order to avoid pitfalls like clearing search inputs, improper hydration and avoiding staleness.

But the end result speaks for itself. As far as we can tell, this is a novel technique. If there’s interest, we’d be happy to open source a generalized Workbox plugin.

## What’s Next?

We’re hoping you know! Interested in solving fun challenges like this and pushing the web platform to its limits with us? Check out our [careers](https://www.glean.com/careers) page.  

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

[Get The Resource](#)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
