---
url: "https://www.glean.com/blog/why-a-great-crawler-is-essential-for-building-a-workplace-chatgpt"
canonical: "https://www.glean.com/blog/why-a-great-crawler-is-essential-for-building-a-workplace-chatgpt"
title: "Why building a workplace ChatGPT requires a great crawler"
description: "Alice Wang  | Discover why a great crawler is crucial for building a workplace ChatGPT. Explore how efficient crawling processes ensure accurate retrieval for performance."
fetched_at: "2026-09-01T13:26:56.925Z"
---
Last updated Aug 14, 2023.

# Why building a workplace ChatGPT requires a great crawler

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/61e567f8fbe8c15769cd6212_11-Alice.png)

Alice Wang

Engineering



](/authors/alice-wang)

![Why building a workplace ChatGPT requires a great crawler](https://cdn.prod.website-files.com/613513981b0efaf850830620/64daf610a6baab24d89d1166_Crawler.png)

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

Over the last five years, we’ve steadily built Glean into the market’s leading [enterprise search solution](https://www.glean.com/enterprise-search-software). Like no other knowledge management solution on the market, Glean is capable of delivering up-to-date search and chat results that are always permissions aware and personalized – while smoothly scaling to and indexing corpuses billions of documents in size.

However, getting to this point was a journey full of head-scratching challenges. Contrary to what some folks think, an ad-hoc solution of throwing a chatbot AI over company files won’t get them the results they want. A better way is to build a search solution to fuel the model with the right answers, every time – but building the foundations of enterprise-ready search is a serious engineering challenge that requires years of work and cutting-edge expertise across machine learning, search, and scalable data infrastructure. 

If you’ve recently become interested in building an in-house ChatGPT and are looking to index all your enterprise information through [vector search](https://www.glean.com/blog/unlocking-the-power-of-vector-search-in-enterprise) and embeddings, I’d love to share a few things that’ll help you on your way. In this blog, I’ll specifically be talking about the **crawler** – the foundational component that keeps search results and chat responses consistently fresh, permissions-aware, and correct. 

## Quick, yet resilient

Is your crawler interacting with third-party systems? Then the infrastructure must be fault-tolerant to a variety of nuances with each individual datasource. When we built ours, we had to consider: 

-   How can we define a transient error uniformly within the system in the context of each datasource? 
-   How do we ensure that we retry appropriately, whether the API or the system hits these transient errors? 
-   When retries occur, how do we know what’s already performed and only perform what needs to be re-run?

We concluded that we needed a system that allows us to easily define a single unit of retryable execution, along with all the associated steps from start to completion.

For example, for each API invocation, we need to track:

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/64daf46c566d773f7ad8df6e_EvB5OCJI8Lb_eKuX3qhOk2Vp8a14dMVZT7rcn-DGi-Yl2_ih-sZZ1SiwNT71hXuPGBWOS5mo6Wr71LE8_PwXA3FO6gru5XhyOO0v4Ui0JhhBk3_3eGwcBYmxnz6k3WF8Y-PHHvMUqjMs_V0tvjIHjAE.png)

At each step, the system needs to be able to signal how to handle errors. If step 3 succeeds but step 4 fails, it must persist this partial-completion somehow and ensure only step 4 is retried. That implies step 4 must be defined as a separate unit of retryable execution somewhere within the system. Without these precautions, results would be missing content – and partial-completion might be handled improperly. For example, if we have all the document data but are missing some of its permissions, we should not surface it in the results.

We also have different types of work (like incremental updates, full crawls, and handling webhooks) that help prevent staleness in our results. Not all datasources can provide full fidelity in all work modes, so it’s important to utilize multiple disparate types to get a complete picture. A full crawl or webhook can identify deleted documents – an incremental crawl cannot. 

Prioritizing these types of work against a single API quota is also essential to avoid rate-limit overloading the datasource’s system. Your system should be capable of assigning weights between these workloads and enforcing quota limits before each unit of work begins executing. If it does hit errors, it should signal to the enforcement layer to be stricter in constraining all the workloads in addition to common retry mechanisms for that particular unit of execution (e.g. exponential backoff). 

It’s also essential that your system is flexible enough to handle different API rate limit policies, as they vary for each application. Rate limits can be dynamically determined by the server, can be global for the entire tenant, different for each API, limited on a per-user basis, vary by time of day/week, or any combination thereof. If your system is incapable of handling a variety of policies, you’ll constantly get alerted about crawl errors. Some datasources even penalize you for going over – so you’ll end up slowing down significantly for even the most minor infractions. Worst case, the datasource will just block your crawl entirely. 

Flexible and resilient crawlers that are capable of accommodating these diverse requirements form the foundations of a streamlined, fault-free experience that users can depend on. 

## Preventing staleness

It’s also important to ensure that no stale data is left around in the system. If the system receives limited updates on what content is deleted, how do we guarantee that all stored data is fresh? It’s more challenging than it seems. 

It’s incredibly difficult for any system to immediately know when content gets deleted, but it’s essential to ensuring data security and information relevance. Some data sources surface deleted documents in API calls or send webhook events upon deletion, but this doesn't always give 100% coverage. 

-   Webhook events and API endpoints can be unreliable – often sent ‘best-effort’, and usually not retried or retrieved if something goes wrong on their side or ours. This might result in stale documentation surfacing – potentially catastrophic! Deleted a sensitive document that should never have been uploaded, or was accidentally overshared? It may continue being served to everyone. Added an important new document employees need to view today? It might not surface for hours, or even days.  
    
-   Managing crawler race conditions and trying to model what's happening on the datasource from bits of information is tricky. Say for example a user deletes a document by accident, hastily restoring it from the trash. However, the information received from the crawl can get jumbled, or processed out of order. Is the document in the trash? Is it not? These complications risk platforms delivering stale and outdated answers – resulting in a system that workers hesitate to trust. 

To build robust crawlers that combat staleness, we need another layer to help purge stale data. We do this by performing regular crawls of the entire corpus, and clearing out data we didn't see after the crawl finishes. To avoid erroneous deletions, however, our crawler will also ensure that these full crawls succeed before deleting unseen data, and also flag deletions that look legitimate but impact a noticeably large volume of the corpus. 

By addressing staleness comprehensively and safely in this manner, we’re able to ensure that the results of each search or query never returns an answer sourced from material that’s outdated or no longer exists. 

## Scalability for any corpus

Most importantly, the crawler needs to operate correctly in the face of immense scale. Optimization and synchronization is key and it all needs to hold together, whether tackling corpuses with a few thousand documents to those with hundreds of millions. To that end, you should be constantly looking to find ways to reduce redundant work, prioritize the most important crawl tasks – and think outside the box. 

For example, how do we extract the most information and metadata from certain platforms that have particularly stingy quotas? Without sophisticated, well thought-out models that eliminate redundancy, prioritize smart work, and synchronize carefully, crawls may end up taking months instead of days, or potentially index and display the wrong information. 

It's also important to remember that crawlers need to be able to scale horizontally. Beyond just speed and efficiency, crawlers need to be able to process information from a wide variety of datasources, all of which may have complicated permission schemas that need to be accounted for and resolved on our end. That includes other tricky edge cases, like API gaps that need to be worked around (datasources might not have straightforward, non-redundant ways to crawl all documents in a corpus), along with specific prioritization tuning that's required for each unique datasource. 

{{richtext-banner-component}}

## Great results require a great crawler

Building a centralized index by crawling and indexing from all sources is the best way to fuel the knowledge your model needs to deliver the right answers to your queries. However, building the right crawler (quick, resilient, flexible, fresh, and correct!) is a tricky feat of engineering that’ll require years of development and tuning.

A ChatGPT for work is essential to unlocking the full potential and productivity of workers, but building one on your own may be more complicated than you’re expecting. Complications can result in delayed time to value, difficulties with internal alignment, along with considerable costs down the line when it comes to developing, maintaining, and training it on your own. If you’re looking for a fast-track on what you’ll need to focus on when building the infrastructure of a great crawler for your generative AI and search solution, check out our on-demand [webinar](https://get.glean.com/20230824-Webinar-TechTalkCrawlers_On-DemandRegistrationPage.html?utm_source=internal-link&utm_medium=blog). 

If you’re more interested in getting started with truly enterprise-ready generative AI today – not tomorrow – sign up for a Glean [demo](https://www.glean.com/get-a-demo)!

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

![Glean: AI-powered enterprise search and knowledge discovery](https://cdn.prod.website-files.com/613513981b0efaf850830620/66e28e8baf57acdc2d99a481_Frame%2020839350861.jpg)

## Glean: AI-powered enterprise search and knowledge discovery

Glean is the workplace search and generative AI assistant that uses its deep understanding of all your company's content, employees, and activity to help workers find exactly what they need- across all applications, in every situation. With enterprise-grade permissions, data governance, and referenceability, Glean is the generative AI solution you can trust.‍Circumvent digital complexity, information overload, and SaaS sprawl with the market’s leading enterprise search and workplace AI assistant. Get a better picture by downloading the free two-pager!

[Get The Resource](/resources/guides/glean-ai-enterprise-search-knowledge-discovery)

![Glean: AI-powered enterprise search and knowledge discovery](https://cdn.prod.website-files.com/613513981b0efaf850830620/66e28e8baf57acdc2d99a481_Frame%2020839350861.jpg)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
