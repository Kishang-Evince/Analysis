---
url: "https://www.glean.com/blog/using-our-identity-schema-to-deliver-personalized-permissions-aware-results"
canonical: "https://www.glean.com/blog/using-our-identity-schema-to-deliver-personalized-permissions-aware-results"
title: "Using our identity schema to deliver personalized, permissions-aware results"
description: "Shreya Shekhar  | Identity is at the core of ensuring that Glean users see the best. Here’s how we do it, while respecting the permissions model of each connector."
fetched_at: "2026-09-01T13:26:55.410Z"
---
Last updated Aug 31, 2022.

# Using our identity schema to deliver personalized, permissions-aware results

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/641443b7208e558a59f93731_glean-author-symbol.jpg)

Shreya Shekhar

Engineering



](/authors/shreya-shekhar)

![Using our identity schema to deliver personalized, permissions-aware results](https://cdn.prod.website-files.com/613513981b0efaf850830620/630fa889d7733b6ff801f691_Using%20our%20identity%20schema.png)

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

As an intern at [Glean](https://www.glean.com) this past summer, I worked on many impactful projects on our backend Connectors team. Our team works on efficiently querying and indexing everyday SaaS applications, such as Slack, Jira, Confluence, and so on. These projects allowed me to contribute to our backend infrastructure to help serve queries for applications such as Greenhouse and Salesforce, and get a detailed understanding of how Glean keeps information as up-to-date as possible.

Working as an engineer on the Connectors team exponentially increased my learnings in such a short time, and really resonated with my idea of what an ideal internship should be. Learning from and bonding with such close-knit coworkers made the internship fulfilling, and helped me understand what I believe is important in my career going forward. This brings me to an important concept here at Glean: identity.

Identity is the core concept behind what a user sees on their Glean homepage every day, and what they see in all of their search results. Being the powerful [search](https://www.glean.com/product/features) tool that Glean is, it’s imperative that users be able to see results most related to their job, and only ones that they are allowed to see. Respecting the permissions model of each connector is an important challenge we tackle in the backend, especially since these permissions can be changed at any time! We incorporate these permissions through periodic crawls, and by fitting users into our own identity schema of groups and memberships. 

Given that these connector applications serve large companies with hundreds of thousands of users, sometimes these crawls can take exceptionally long to complete, especially for complex permissions models. One such project involved our Salesforce connector, and its incredibly inefficient identity crawl.

## **Salesforce crawl: the problem** 

When performing identity crawls for connector applications, many steps are involved, such as crawling users, groups, and members, and making API requests in order to verify permissions at each of these stages.The crawl speed is determined by the rate at which we can make these requests, and how many of them we have to make. 

In Salesforce’s case, the crawl was being limited by both of these factors, and my job was to investigate how to optimize it. 

## **Our solution**

After meticulously documenting our current crawl structure, I was able to put together a plan for optimization based on the different steps which did and did not require API calls. Salesforce in particular has a large number of different permissions groups, based on documents, document types, profiles, networks, roles, and more. Not all of these groups, however, require the use of API calls to be created, since some are internal groups which we use to filter results for Glean users. 

By executing tasks which did not require them concurrently, and at a faster pace than API related tasks, I was able to gain up to a 98% identity crawl time improvement for one of our customers, and at least a 22% improvement for some others! Furthermore, I implemented filtering based on user domains in order to ensure there were no fake or stale users included in the identity crawl. These kinds of improvements are crucial in an early and ever-evolving system like ours.

Working on interesting problems like this throughout my internship made the experience unparalleled. If [building](https://www.glean.com/careers) or [using](https://www.glean.com/get-a-demo) a best-in-class search product sounds interesting to you, reach out!

***Author:*** *Shreya Shekhar, software engineering intern*

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
