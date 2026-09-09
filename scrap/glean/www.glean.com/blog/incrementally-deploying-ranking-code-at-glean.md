---
url: "https://www.glean.com/blog/incrementally-deploying-ranking-code-at-glean"
canonical: "https://www.glean.com/blog/incrementally-deploying-ranking-code-at-glean"
title: "Incrementally deploying ranking code at Glean"
description: "Jeremy Lilley  | While frequent iterative releases are helpful when making ranking improvements, they can be tricky, especially in a stateful service, here's how its done"
fetched_at: "2026-09-01T13:26:45.264Z"
---
Last updated Jul 07, 2022.

# Incrementally deploying ranking code at Glean

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/61e567c3a2a07fc3875cd091_29-Jeremy.png)

Jeremy Lilley

Engineering



](/authors/jeremy-lilley)

![Incrementally deploying ranking code at Glean](https://cdn.prod.website-files.com/613513981b0efaf850830620/62c5db77ab16e7ce06313898_Incrementally%20deploying%20ranking%20code.png)

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

In [Glean](https://www.glean.com/) search, we’re always trying to return the most relevant results. When we merge results from a variety of sources-from Slack threads to Jira bugs to O365 docs-there are many dimensions in which to experiment with our ranking functions.

To help build these features, we wanted frequent iterative releases for our ranking team. But rapid turn-around can be tricky in the context of a stateful service. Particularly, our main Index Servers need to preload significant amounts of index data into memory when they restart. In many cases, preloading this data could take 15+ minutes, which required either scheduled service downtime or somewhat involved mitigation.

In practice, with this constraint, we found we weren’t deploying customer updates as often as we wanted. And our engineers found that their development cadence was unnecessarily slowed down by long server restart times.

How did we fix this problem, and move towards faster incremental deployment?

-   We realized that much of the problem was solved if we could avoid restarting our Index Server to receive code updates in the common case.
-   Fortunately, this particular server was written in Java, which has a mechanism for dynamically loading code. After looking into custom ClassLoaders, we prototyped loading a Java JAR archive from Cloud Storage and using the classes in our process, without a restart.
-   Even with the ability to load code from Cloud Storage without restarting, Java only allows a single implementation for a given class name. That said, we realized we could add the release tag to our class package names. For instance, for the class *com.glean.ranking.TermInfo*, we could load any number of versions in the server if we wrote a tool to rewrite and put the release tag in the name: *com.glean.ranking.release123.TermInfo, com.glean.ranking.release124.TermInfo, etc*. We used some open source libraries (e.g. ObjectWeb ASM) to help build this remapping tool. In the end, we had a script to remap the build artifacts for a specified release tag and upload to the cloud in seconds.
-   With the ability to load multiple versions of code dynamically from Cloud Storage, it was then a matter of plumbing these release tags through the system, so that the correct release or experiment was being used for a given query. 

‍

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56ef5bb8eb1b42f47d49_62c8868970269a354373d3d5_Screen%2520Shot%25202022-07-08%2520at%252012.32.56%2520PM.png)

We soon found the advantages of this approach:

-   More frequent, less disruptive releases: Since server restarts were no longer normally needed, we started rolling out ranking changes more frequently-nightly for internal deployment, and weekly for customers.
-   Experimentation: We also started using this mechanism for developer experiments; rather than coordinating use of a development cluster and waiting for a server restart, they could just upload a Jar file and quickly see the results.
-   Strong versioning: Errors could be associated with specific release tags, and different experiments were isolated from each other.
-   Rolling back support: Rolling back a problematic release could be done instantly with an online configuration change.

Like in any implementation, there was some tuning needed to make the mechanism work well. For instance:

-   Deciding which sets of packages to remap (the initial version didn’t remap some protobuf packages, which we quickly realized was a mistake!)
-   Caching/loading appropriately to avoid duplicate Jar file scans
-   Suppressing parallel fetches for the same classes

We found that the initial use of a given release tag has an additional latency of about a second, given the Cloud Storage retrieval and Jar decoding overhead, but that subsequent uses are cached and indistinguishable from a regular implementation. Hence for production releases, we typically send a warmup request before switching the configuration.

That said, the ability to dynamically load new releases and experiments without restarting a stateful service gives us some great flexibility and ability to iterate on improving the Glean service.

If [building](https://www.glean.com/careers) or [using](https://www.glean.com/get-a-demo) a best-in-class search product sounds interesting to you, reach out!

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
