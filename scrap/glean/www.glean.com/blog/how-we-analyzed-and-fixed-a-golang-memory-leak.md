---
url: "https://www.glean.com/blog/how-we-analyzed-and-fixed-a-golang-memory-leak"
canonical: "https://www.glean.com/blog/how-we-analyzed-and-fixed-a-golang-memory-leak"
title: "How we analyzed and fixed a Golang memory leak"
description: "Sharva Pathak  | Optimizing resource costs for a cloud-only architecture often results in interesting technical challenges. How we discovered and debugged a Golang memory leak"
fetched_at: "2026-09-01T13:26:44.860Z"
---
Last updated Mar 16, 2022.

# How we analyzed and fixed a Golang memory leak

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/61e567f44e28763e5d291075_Sharva.png)

Sharva Pathak

Engineering



](/authors/sharva-pathak)

![How we analyzed and fixed a Golang memory leak](https://cdn.prod.website-files.com/613513981b0efaf850830620/62337e1d8db98f5e658e3d03_Golang%20memory%20leak.jpg)

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

At [Glean](https://www.glean.com) we’re building modern cloud-only architecture for solving some [hard enterprise search](https://www.glean.com/post/enterprise-search-is-hard-why-its-so-behind-and-what-itll-take-to-catch-up) and knowledge management-related problems. Performance and resource cost optimization is critical and often leads us into interesting technical challenges. Debugging one of these challenges led us to an interesting discovery that may be useful for others working on similar challenges. 

At Glean, we use Golang for a moderately memory-intensive service. We also use Google Cloud Platform (GCP) for most of our deployment. We run this service as an app engine flexible instance using a [custom runtime](https://cloud.google.com/appengine/docs/flexible/custom-runtimes) image that includes Go 1.15. We saw the following interesting behavior in our Golang service:

The memory would slowly ramp up, reach the limit (we were using 3GB as the AppEngine resource limit in this case) and then the instance would get killed, likely because it was exceeding the memory limit. Looking at the memory graph, the steady ramp-up smelled like a memory leak:

‍

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/62337dead0b4e330a14c114e_07FjtZXKn34Ta3_w8ON2dZgFSeofqtC_0uT_kDRq5JElnhSOCdONSN1wc34IhzxCXBTjwJsCu5nMOwKcOLepTo75UzUGB9Lrb1Q48sC9ZSSsPMAB35xsfCN0U8xOq-f_FBQRff0.png)

## Not an application memory leak

Thankfully, a memory leak on the application is not hard to debug in our case since we have access to continuous profiling data using the [cloud profiler](https://cloud.google.com/profiler). In the past, we have seen cases of unclosed Google Remote Procedure Call (gRPC) connections causing such issues, but those were easy to debug using the continuous profiler. In particular, the [flame graph](https://www.brendangregg.com/flamegraphs.html) in the profiler UI would clearly show heavy usage at a specific call site in such cases. In this case, that was not happening. One interesting thing the profiles revealed though was that the average heap size (i.e. by the in-use objects) was around 1.5G (i.e. ~2X less than the memory footprint app engine was seeing). This meant the memory was being held somewhere by the Golang runtime. The immediate next thought we had was whether this was a memory fragmentation issue because Golang is [known to be bad](https://news.ycombinator.com/item?id=12042593) in that aspect.

## Not a fragmentation case

Luckily it wasn’t too hard to conclude that fragmentation was not the culprit either. We added a background thread that periodically logs the [MemStats](https://pkg.go.dev/runtime#MemStats). An upper bound on fragmented memory can be easily obtained by subtracting HeapAlloc from HeapInuse. In particular, “HeapInuse minus HeapAlloc estimates the amount of memory that has been dedicated to particular size classes, but is not currently being used.” This amount was fairly small, ~3MB in our case.

It was also interesting to see that the values for HeapReleased were fairly large. We started looking more and came across [this thread](https://github.com/golang/go/issues/33376) on similar issues.

{{richtext-banner-component}}

## Golang / container environment interaction issue

The potential theory in the [Golang issue thread](https://github.com/golang/go/issues/33376) is that Go started using MADV\_FREE as the default in go 1.12. This meant it might not return the memory immediately to the OS, and the OS could choose to reclaim this memory when it felt memory pressure. However, if you go back to [how containers are implemented](https://www.linuxjournal.com/content/everything-you-need-know-about-linux-containers-part-i-linux-control-groups-and-process), these are essentially just processes running under separate Cgroups. The OS, therefore, might not feel the memory pressure and will not free up the memory even though the container might hit the memory limit and get killed. 

Fortunately, there’s a Golang debug flag to flip this behavior and use MADV\_DONTNEED instead, by setting the *GODEBUG* environment variable to “*madvdontneed=1*”. In fact, go 1.16 has [reverted to using this](https://github.com/golang/go/issues/42330) as the default now. The memory graph after this change looks much better and steady at 2G.

‍

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/62337dea4866427890c86084_oQdJZ_nD4yRA1OPsLTpCEcEQcQT05NOpAZXjRtTgFlM8KL4x6JOQMoZVcASgeDoFp157boYUncgt9GZbMIxqev5yBLBg2y_D9-PpFwkRqoeepxjxbDaKdDOy9cbeHCKOxK0asjU.png)

## Key takeaways

1.  [pprof](https://pkg.go.dev/net/http/pprof) and flame graphs are pretty useful to analyze application memory leaks. A continuous profiler can really help you look at multiple snapshots of the profile and quickly figure out the cause of leaks. [Cloud profiler](https://cloud.google.com/profiler) is definitely a handy tool for GCP workloads.
2.  MemStats logging can help analyze potential causes at a higher level. In particular, “HeapInuse minus HeapAlloc” can be used as an upper bound when estimating the amount of memory wasted fragmentation.
3.  If you are using go between 1.12 to 1.15 within containers, you likely want to set *madvdontneed=1 in GODEBUG.* :-)

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

![Integrating LLMs and GPT into enterprise workflows](https://cdn.prod.website-files.com/613513981b0efaf850830620/65fa99b935ec537dc5712492_642168aafc23be1931c8596e_LLM%2520Whitepaper%2520LinkedIn%2520Ad.jpeg)

## Integrating LLMs and GPT into enterprise workflows

Discover in our white paper how improvements to generative AIs brought them to the forefront of modern workplace transformation – and how best to integrate them into several key areas of enterprise business.

[Get The Resource](/resources/guides/llm-gpt-enterprise)

![Integrating LLMs and GPT into enterprise workflows](https://cdn.prod.website-files.com/613513981b0efaf850830620/65fa99b935ec537dc5712492_642168aafc23be1931c8596e_LLM%2520Whitepaper%2520LinkedIn%2520Ad.jpeg)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
