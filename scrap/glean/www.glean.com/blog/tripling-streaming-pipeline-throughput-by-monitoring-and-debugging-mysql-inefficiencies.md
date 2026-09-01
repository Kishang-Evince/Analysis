---
url: "https://www.glean.com/blog/tripling-streaming-pipeline-throughput-by-monitoring-and-debugging-mysql-inefficiencies"
canonical: "https://www.glean.com/blog/tripling-streaming-pipeline-throughput-by-monitoring-and-debugging-mysql-inefficiencies"
title: "Tripling streaming pipeline throughput by monitoring and debugging MySQL inefficiencies"
description: "Varshaa Naganathan  | Know how to triple streaming pipeline throughput by effectively monitoring and debugging MySQL inefficiencies, optimizing performance for enhanced efficiency."
fetched_at: "2026-09-01T13:26:54.865Z"
---
Last updated Apr 09, 2023.

# Tripling streaming pipeline throughput by monitoring and debugging MySQL inefficiencies

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/63e4f1ea0240b275c03fa865_team-member-varsha.jpg)

Varshaa Naganathan

Engineering



](/authors/varshaa-naganathan)

![Tripling streaming pipeline throughput by monitoring and debugging MySQL inefficiencies](https://cdn.prod.website-files.com/613513981b0efaf850830620/64343a049c41bb6c904ed023_Pipeline%20streaming.png)

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

At Glean, we process on the order of hundreds of millions of documents on a daily basis. In a previous blog [post](https://www.glean.com/blog/how-glean-uses-apache-beam-streaming-to-efficiently-read-a-large-corpus-from-mysql), we described how we use Apache Beam Streaming to read such a large corpus efficiently from MySQL. While we focused on the details of the streaming pipeline there, this blog will go into details of our MySQL queries and the monitoring in place that identifies, debugs and addresses inefficiencies in the system. We’ll also walk through an example of how we debugged a pipeline that had low throughput because of slow reads from MySQL.

## Room for improvement

On one of our larger deployments, we found that we were taking around 3 days to process the full corpus. While the streaming setup described [earlier](https://www.glean.com/blog/how-glean-uses-apache-beam-streaming-to-efficiently-read-a-large-corpus-from-mysql) provides massive horizontal scalability, we noticed that CPU usage was not near 100% on this deployment. This was the first clue that there was some inefficiency in the system that could be optimized without scaling compute resources.

On multi-core deployments like this one, we issue several parallel MySQL read queries, each fetching a batch of **k** documents in an attempt to increase throughput. All these documents are held in an in-memory buffer from which they are fetched for processing. When the number of documents in this in-memory buffer is low, a new set of parallel MySQL queries is made to fetch more documents. 

On this particular deployment, the in-memory buffer was being reported as empty fairly often. This meant that our pipeline was processing documents faster than they were being fetched. This was the second clue and allowed us to narrow down the inefficiency to the time taken by the MySQL reads.

Say we have **n** cores in a deployment, the MySQL query to fetch a batch of **k** documents looked something like this:

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56eb23b29e5080b34b69_643578f4bbd07075dfb2c275_Screen%2520Shot%25202023-04-11%2520at%25208.09.55%2520AM.png)

  
We started monitoring the read latencies for this query and noticed that the larger the offset (**n\*k**), the slower the query. This was the third and final clue. While the same MySQL query pattern was being used on all our deployments, what was unique to this deployment was the much higher value of **n**. On digging into MySQL’s handling of this query, we realized that with larger offsets, it was fetching a total of **(n+1)\*k** documents before discarding the first **n\*k** ones, hence contributing to the larger query times. To force MySQL to perform late row lookups and thus retrieve only the required **k** documents, the MySQL query was changed to the following:

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56eb23b29e5080b34b6d_6435791ce53d8d31ad052c38_Screen%2520Shot%25202023-04-11%2520at%25208.10.20%2520AM.png)

## Bug squashed, throughput tripled

This reduced MySQL latencies on a test query with **k = 1, n\*k = 1150** from ~4 seconds to ~0.1 seconds, and resulted in the pipeline’s throughput tripling (See Figure 1). This increased throughput translates to reduced staleness in content, permissions, and statistics thus improving our ranking to deliver a better search experience.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56eb23b29e5080b34b76_64343a9ba49b49d6769430d9_image1.png)

*Figure 1: Increase in document processing rate after optimizing the SQL query*

  
We hope this blog post gives an idea of not just the kind of technical challenges we encounter, but also the monitoring in place to detect them and the process followed to debug them. If you are interested in working on similar problems, check out our [careers page](https://www.glean.com/careers)!

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
