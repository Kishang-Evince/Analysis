---
url: "https://www.glean.com/blog/why-you-should-join-glean-part-2-the-problem"
canonical: "https://www.glean.com/blog/why-you-should-join-glean-part-2-the-problem"
title: "Why you should join Glean | Part 2: The problem"
description: "Deedy Das  | Choosing which startup you want to join is a decision made with imperfect information. One of the most ambiguous parts of the decision is understanding the problem they’re trying to solve."
fetched_at: "2026-09-01T13:26:57.458Z"
---
Last updated Apr 13, 2022.

# Why you should join Glean | Part 2: The problem

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/61e567cfd022ae20a33a9f04_25-Deedy.png)

Deedy Das

Engineering



](/authors/deedy-das)

![Why you should join Glean | Part 2: The problem](https://cdn.prod.website-files.com/613513981b0efaf850830620/6258a3d254076c410dee134a_Why%20you%20should%20join%20Glean_the%20problem.jpg)

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

Joining a startup is a difficult decision, and unlike many of the bigger technology companies, it’s an imperfect information problem. In [Big Tech](https://en.wikipedia.org/wiki/Big_Tech), you have predictable professional growth, predictable compensation ranges, a more tangible set of roles, and a product you can understand (you know what “Google Maps” or “Instagram” or <name your favorite consumer app> *is*). At the thousands of startups which make the news every day, this information isn’t freely available. What is the talent like at this startup? What problems are they trying to solve? How strong has their business been? In my [first post](https://www.glean.com/blog/why-you-should-join-glean-part-1-the-team) in this series, I spoke about the extraordinary [team](https://www.glean.com/blog/why-you-should-join-glean-part-1-the-team) at Glean ([Why you should join Glean | Part 1: The Team](https://www.glean.com/blog/why-you-should-join-glean-part-1-the-team)). Today, I’ll write about the problem we’re trying to solve-first, I’ll talk specifically about why an enterprise software company may be a better bet for you than a consumer product company, and then I’ll dive into what Glean is trying to solve and why it is technically challenging.

## SaaS vs Consumer 

Before I joined [Glean](https://www.glean.com), I worked on Google Search. I was hesitant to jump from a formative internet company with billions of users every day to the esoteric world of enterprise software. Consumer companies are instantly relatable and tangible-often your users are the people around you. You’re solving a basic human need or desire. In enterprise, you’re often solving a problem you may not directly be able to relate to.

Why did I eventually make the jump? The odds of success for consumer companies with broad appeal-self-driving cars, web3 startups, social apps-are too reliant on technical or macro factors out of your control. Just take a look at the wide range of consumer products that were once the flavor of the week-they may be phenomenal products, but trends can fall just as quickly as they rise. Ultimately, you only have one career. When planning out how to build one, a reasonable approach is to de-risk the problem you're working on as far as possible while still solving a hard, interesting problem. You want to mitigate your risk of failure! For example, there’s no predicting when self-driving cars will actually make it to market. There may be technical and regulatory barriers that are out of your control. We’ve been promised full self-driving for over 6 years, but it’s yet to make it past the finish line. Your career’s time span or a 7-10 year investor fund cycle may not digest that delay too easily. Your startup can be acquihired early or worse, run out of money. 

In stark contrast, in SaaS, the outcome is in your control. If you execute well on solving a user need and sell your product, nothing stops you from succeeding as a business. Predictable growth, (hopefully) low churn and recurring growing revenue all make SaaS a lucrative business. Don’t take my word for it, just take a look at the successful companies of late. From Zoom, Slack, Datadog, Snowflake, Twilio, Box, HashiCorp, GitLab, Confluent and more, many technology companies who have gone public recently have been SaaS companies. You may not be an expert in enterprise software now, and find it alien, but everyone starts somewhere. I encourage you to learn more!

Lastly, just not all SaaS is obscure and unknown. Slack and Zoom are poster children for the new era of [consumer grade SaaS](https://www.appcues.com/blog/consumerization-enterprise-b2b-saas) products. These are not just obscure micro-optimizations to businesses, but applications with delightful UI that are designed for the entire employee-base to use. Many of my friends tell me that Glean was deployed at their company and that it's been a game changer for their productivity.

## The Problem

Glean is an enterprise software company with search at its core that aims to solve every information need for every single kind of employee at the company. You may have heard about enterprise search applications in the past, but it’s important to define what we consider *true* enterprise search.

-   It should look through *all* the apps that you use at your workplace.
-   It should be permission-sensitive and only show you content you can view on the app itself.
-   It should search across documents you may not have ever accessed.
-   It should search not just by text-matching on the title of the document, but with a full understanding of the text, metadata and all such information about a document. A robust understanding of synonyms, natural language and semantic meaning.
-   It should be designed for power users. That means supporting multiple different ways to slice and dice the results, say, by type, creation time, author, and more.
-   It should be designed for every single employee at the company.

At Glean, we believe no search query is wrong and we aim to satisfy every single information need you may have. There have been several companies who have attempted to tackle this problem in the past many of whom have failed purely because it wasn't *true* enterprise search by this definition.

## Technical Difficulty 

Engineers, myself included, are often drawn towards solving difficult problems. In pursuit of a de-risked problem, you don’t want to settle for an easy one! For a startup, solving a technically difficult problem is one of the most effective ways to build a tremendous moat for your business. Perhaps controversially, I find that many-dare I say most-enterprise products typically do not solve a very interesting core Computer Science problem. To quote a memorable classic Hacker News comment, “Is Dropbox just a fancy wrapper around fsync”? How many modern successful startups are building fundamental new technologies instead of just packaging existing applications of technologies in a better way? There's a reason they say [Excel is every SaaS company's greatest competitor](https://twitter.com/amitranjan/status/1139449388072239104?s=20&t=Oz6qY1BeMhA08aycrwawjg).

In stark contrast, I’d argue that consumer search, much less enterprise search, is still a difficult and unsolved problem. Despite all the [criticism](https://dkb.io/post/google-search-is-dying) [of](https://news.ycombinator.com/item?id=29392702) [Google Search](https://twitter.com/mwseibel/status/1477701120319361026), it seems technically nearly impossible to create a worthy competitor (and not for lack of trying). Building a search engine is a multimodal problem combining many core research areas of Computer Science-information retrieval, distributed systems, security, natural language understanding, machine learning and more. With the rise of Google in the 00s, even novel academic research in search-focused fields have been a far cry from what works in the real world.  

Enterprise Search adds an additional layer of complexity on top of consumer search. Now, not all your documents are visible to all your users. In the consumer search world, Google’s systems can learn very quickly from the behavior of users on nearly 10B queries a day to figure out how users click, hover or engage with the search results page. In the enterprise world, within a single customer, you simply will not be exposed to that volume of data. Worse still, the distribution of queries is far more evenly distributed, and a far more significant chunk of queries are seen for the first time every day. This makes framing search as a learning problem far more difficult. 

At Glean, we think deeply about how to rank in the absence of large feedback data. Furthermore, most academic research ignores enterprise search completely, often focusing on algorithms that work well for much simpler information needs. Even Google’s own internal search, [Moma](https://www.quora.com/Why-is-Googles-intranet-system-named-Moma), was notorious for being far worse at finding what you need compared to its consumer version. Taking on this difficult, multi-faceted technical problem with limited academic research to rely on makes the problem we’re solving at Glean extremely interesting. My colleagues [Eddie](https://www.linkedin.com/in/eddie-zhou-70364b54/) and [Mrinal](https://www.linkedin.com/in/mrinalmohit/) have written about this problem in [more technical detail](https://www.glean.com/post/enterprise-search-is-hard-why-its-so-behind-and-what-itll-take-to-catch-up).

One of the most common things I hear about candidates is-<Insert startup here>? What do they even do? Many people are afraid to take the plunge into building a startup because they don't even understand the problem they're trying to solve. At Glean, we’re trying to bring people the knowledge they need to make a difference in the world. With search at its core, the problems at Glean are unsolved, tackling a variety of fundamental computer science problems while keeping our users front and center. My favorite bit of feedback from one of our users was “If you had to go back to the way things were before Glean, there would be an uproar… employees might revolt.” 

In this post and the previous post, I spoke about the team and the problem. In the next post, I’ll be speaking about the business. If you’re excited to solve difficult and interesting problems, check out our [open roles](https://www.glean.com/careers) and reach out. This is just the beginning.

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
