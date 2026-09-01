---
url: "https://www.glean.com/blog/testing-and-deploying-our-search-engine-cluster"
canonical: "https://www.glean.com/blog/testing-and-deploying-our-search-engine-cluster"
title: "Testing and deploying our search engine cluster"
description: "Stephen Chu  | Testing and deploying our search engine cluster is critical for delivering a best-in-class search product. Read this blog to learn how we do it."
fetched_at: "2026-09-01T13:26:53.601Z"
---
Last updated Jul 27, 2022.

# Testing and deploying our search engine cluster

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/61e5676bd022ae53203a5549_Stephen.png)

Stephen Chu

Engineering



](/authors/stephen-chu)

![Testing and deploying our search engine cluster](https://cdn.prod.website-files.com/613513981b0efaf850830620/62e2eab6a48a8c22024bac73_Testing%20and%20deploying%20our%20search%20engine%20cluster.png)

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

At [Glean](https://www.glean.com/), we have a lofty goal of delivering a best-in-class search product.

In a [previous post](https://www.glean.com/blog/incrementally-deploying-ranking-code-at-glean), we talked about how we quickly deploy new ranking code. In this post, we focus the discussion on how we test and deploy the search engine cluster.

While this discussion may be technical in nature, we strive to always keep our focus on the top-level goal of improving the customer experience. This means all the engineering we do, even in the infrastructure layers, should result in faster feature updates and performance, fewer bugs and interruptions, and an overall building of trust by consistently holding ourselves to higher standards.

## Fast and reliable simulation and testing

At Glean, we heavily test all layers of our search stack. Each release qualification goes through a bevy of end-to-end search tests on fully loaded deployments. In addition to this, we realized the need to enable all our search engineers to simulate the full search stack within seconds. Every day we aim to put in new improvements while closely guarding the quality and robustness of the search engine.

To that end, we’ve invested heavily in being able to quickly bootstrap an in-memory multi-node search engine within our unit tests. This framework enables us to very quickly verify any changes we make to our search stack. This may involve updates to our index schemas, retrieval and scoring logic, text tokenization, and more.

While for every release we go through a battery of end-to-end tests using fully loaded deployments, we prioritized this fast, lightweight path because:

1.  The earlier engineers can catch a bug within their local setup, the fewer leaks we’ll have. We all know the arduous experience of having to isolate a bug on a fully loaded setup.
2.  The quicker engineers can verify a fix, the faster we can help customers get back on track.
3.  The more we are able to simulate the end-to-end search logic as part of our regular build process, the more we actually deeply understand our product instead of just making assumptions about how things ought to work.

We’ve been pleasantly surprised by how much can be caught through our end-to-end simulations. When working on optimizing our text tokenization path, we discovered that even simple search query tests run against the embedded cluster were able to find issues that weren’t caught by the tokenization unit tests themselves. We love when leaks are caught before even merging the bug to the codebase!

## Fast and safe deployment operations

We aim to quickly and reliably deliver thousands of search engines. This is a very high-level statement, and in practice, it means every day we need to evaluate and improve our processes for how we operate and maintain all these search engines. This is a constant work-in-progress that keeps paying off as we continue to expand our customer base.

Recently we invested in an overhaul of all our deploy operations. We reviewed every operation and asked ourselves how we can make every step faster, safer, and more easily testable.

1.  We’ve revamped our setup and teardown operation to more quickly and safely rebuild search engines across our entire customer base.  This allows us to easily move customers to new clusters that have new search features and important performance improvements.
2.  We’ve added a battery of unit tests for every deployment operation. Catching a bug while running on a customer is not somewhere we want to find ourselves.
3.  We’ve added important verification procedures for sensitive steps such as cluster switchover (moving from an old to new search engine). We run test queries on any new search engine before we proceed with switchover. We run this same verification procedure on the active search engine before we ever proceed to delete the old search engine in case we need to rollback.
4.  We’ve implemented a fast rollback operation in case we discover problems in the new search engine.  While we’ve never had to use this on a customer deployment, we have this because we would rather be safe than sorry.

Through these efforts, we’re now spending much less time monitoring and babysitting previously arduous maintenance routines. We’re also catching bugs earlier which is helping reduce on-call incidents.

## Going forward

While these investments have yielded some serious improvements and given us some peace of mind, we’re constantly revisiting and iterating. In future posts, we’ll share more about the other investments we’re making to provide the best search possible. We’re learning every day and excited about the opportunity to build an industry-defining product.

If [building](https://www.glean.com/careers) or [using](https://www.glean.com/get-a-demo) a best-in-class search product sounds interesting to you, please reach out! We’d love to talk with you.

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
