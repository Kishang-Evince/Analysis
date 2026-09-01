---
url: "https://www.glean.com/blog/how-glean-uses-apache-beam-streaming-to-efficiently-read-a-large-corpus-from-mysql"
canonical: "https://www.glean.com/blog/how-glean-uses-apache-beam-streaming-to-efficiently-read-a-large-corpus-from-mysql"
title: "How Glean uses Apache Beam Streaming to efficiently read a large corpus from MySQL"
description: "Varshaa Naganathan  | Discover how Glean leverages Apache Beam Streaming to efficiently read a large corpus from MySQL databases, optimizing data retrieval for enhanced performance."
fetched_at: "2026-09-01T13:26:43.348Z"
---
Last updated Feb 07, 2023.

# How Glean uses Apache Beam Streaming to efficiently read a large corpus from MySQL

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/63e4f1ea0240b275c03fa865_team-member-varsha.jpg)

Varshaa Naganathan

Engineering



](/authors/varshaa-naganathan)

![How Glean uses Apache Beam Streaming to efficiently read a large corpus from MySQL](https://cdn.prod.website-files.com/613513981b0efaf850830620/63e1fc54a71b6b4f12ec2441_Varshaa%20Apache%20Beam.png)

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

At Glean, we crawl corpuses of hundreds of millions of documents every day. Once all these documents are crawled, we need to ensure they are constantly parsed and processed to keep content, permissions, and statistics fresh in order to deliver the best possible search experience. 

Running a batch job for this purpose was costly, fragile, and difficult to integrate with MySQL. With a streaming job, however, we were able to re-process every document at least once a day. In this blog post, we describe how this was achieved using Cloud SQL (MySQL) and Apache Beam on Google Cloud Dataflow. All the pipelines described henceforth use a single worker, multi-core setup on Google Cloud Platform (GCP) which provides massive vertical scalability which is sufficient for our use cases.

On crawling a new document, the raw content is written to a MySQL table. We also maintain a Pub/Sub queue that is notified with the unique ID of the newly crawled document. This document needs to be processed to parse and extract structured information which is written back to the same MySQL table and indexed by our search system. The Pub/Sub queue ensures this is done in real time. Documents also need to be re-processed periodically to handle any events dropped by the Pub/Sub queue and to re-compute any statistics that change as the corpus evolves over time. This is achieved by continuously scanning and re-processing data from the MySQL table. In the rest of this blog post, we will mainly focus on how the system reads and processes data from MySQL.

To read documents from the MySQL table we use a streaming pipeline. Two main factors influenced our choice of streaming over batch – scalability and cost. With an ever growing corpus, a weekly batch job was not scalable and using a streaming pipeline enabled us to process each document at least once a day. A significant portion of this cost benefit came from the fact that we already needed to maintain a streaming pipeline to handle the Pub/Sub queue. Those machines were being underutilized and hence could be used to perform a streaming scan on the MySQL database at no additional cost.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56ec5f31181ead582514_63e1ff6877ff37a503767c22_image3.png)

*Figure 1: Pipeline Architecture*

‍

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56ec5f31181ead58251b_63e1ff3d7a197109cfdbfe44_image1.png)

*Figure 2: Document processing rate on a single core*

‍

To set up a streaming pipeline (See Figure 1), we use Apache Beam with the Google Cloud Dataflow runner. We define a custom UnboundedSource, each instance of which creates a custom UnboundedReader that queries a cache of documents to fetch the next document that should be processed. This cache of documents is maintained by a static instance of a scanner object. Several parallel database reads are issued by this scanner to the MySQL table based on the number of cores in the worker in use. These reads fetch documents in batches ordered by document ID to ensure each document is processed at most once in each full scan of the corpus. With this setup, we achieve processing rates on the order of hundreds of docs per second on a single core (See Figure 2). 

The scanner also keeps track of the cache state - the ID of the last document read, the number of documents left in the cache etc. It uses these to determine when to fetch additional documents as well as to determine when a full scan over the corpus is complete. Then it resets its state and starts scanning the corpus from the beginning again. Thus, this sets up an infinite queue of data for our streaming pipeline. 

This design and optimizations process have made it possible to ensure that we are scalable and cost effective from our smallest to our largest customers. We are constantly iterating to ensure our users can find the documents they need, when they need them to get things done at work. 

We’ll go into the details of additional SQL queries and optimizations in an upcoming blog, so stay tuned! If you found this blog post interesting and would like to work on such systems please [reach out](https://www.glean.com/careers)!

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
