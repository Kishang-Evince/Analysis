---
url: "https://www.glean.com/blog/the-unsolved-problem-of-enterprise-autocomplete"
canonical: "https://www.glean.com/blog/the-unsolved-problem-of-enterprise-autocomplete"
title: "The unsolved problem of enterprise autocomplete"
description: "Shivaal Roy Ayushi Mrigen | Glean uses autocomplete to surface search suggestions with near-zero delay. Glean’s Search Features addresses the technical challenges of suggestions."
fetched_at: "2026-09-01T13:26:54.044Z"
---
Last updated Oct 30, 2022.

# The unsolved problem of enterprise autocomplete

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/61e567c63f039d2c35a1900e_27-Shivaal.png)

Shivaal Roy

Engineering



](/authors/shivaal-roy)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6462f2e79401364b82dca8bf_TGLEMJFFG-U03E273NP8R-88c93dfd4003-512.png)

Ayushi Mrigen

Engineering



](/authors/ayushi-mrigen)

![The unsolved problem of enterprise autocomplete](https://cdn.prod.website-files.com/613513981b0efaf850830620/63603821aa5bac684941675b_Enterprise%20autocomplete.png)

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

Autocomplete is an assistive search feature for getting users where they’re trying to go, *faster*, by suggesting potential queries or documents for a user to jump directly into as they form their query. Glean is able to surface many different types of content, such as query suggestions, documents, operators, and structured results, like people and teams, with each content type giving the user a unique modality for expediting their search.

No matter what we display in the dropdown, one thing is constant – we want to surface these results to the user as they type with near-zero delay. Since we can’t just run a search after every keystroke (as it would not meet our near-zero latency requirement), the [Glean](https://www.glean.com) Search Features team has built out Autocomplete from the ground up to ensure a snappy experience. Today, Autocomplete already helps to lower our average time to satisfaction by 40%. This blog post will discuss the technical challenges associated with making fast and useful suggestions, wins we’ve had to-date, and active areas of development for the team. 

## Developing query suggestions for “small data” 

Suggesting potential queries as a user types is the most familiar form of autocomplete on the open web. Query suggestions can help the user in two ways: 1) save the user time by not having to type out their full query, and 2) help the user formulate a (better) query that’s more likely to land them the information they’re ultimately seeking.

A standard practice among public search engines is to leverage sheer query volume to generate query suggestions. For example, an engine might mark a query as a public suggestion once it’s been issued by 100K+ unique users, a fairly reasonable threshold when the engine has 100M+ users.

Unfortunately, the same technique applied to the enterprise setting will fall short. Most companies have far fewer than 100K employees total, and enterprise queries are empirically ~3x less likely to be repeated compared to the public web. Though it’s certainly possible to generate suggestions from lower query volumes, the system will not be able generate as many high-quality query candidates, which, at worst, could even result in privacy-violating suggestions. Each launch with a new customer, moreover, would suffer from the “[cold start problem](https://en.wikipedia.org/wiki/Cold_start_\(recommender_systems\))”: such a system will not yet have sufficient information about user behavior to draw useful inferences. 

We at Glean have instead focused our efforts on mining queries from already-indexed documents. Though this approach circumvents some of the issues discussed above, it does not come without challenges. First, mined queries need to be permission-aware so that no sensitive information is leaked. Furthermore, language used in a document doesn’t necessarily make for a good query, so document language must be translated into a query space. And finally, the mined queries need to be scored and ranked against each other so the system can return a tractable set of suggestions back to the user. Both translation and scoring are open problems the Search Features team continues to iterate on, as each is critical to the overall quality of query suggestions.

## Smart document suggestions

25% of the time, users come to Glean looking to quickly jump to a document *they know* exists: a task they are working on, a document they remember reading last week, or a recently-presented company all-hands deck. The Autocomplete team has the unique opportunity to craft a stellar user experience by showing the user the document they were looking for – without having to press enter!

Because the document space is relatively small in an enterprise setting, we’re able to directly take users to documents from Autocomplete. As with Glean Search and query suggestions, we make sure to respect each document’s underlying permissions and only suggest a document to a user if they already have access. 

A small document space, on the other hand, doesn’t mean that it’s easy for the system to find the exact document the user is looking for. Because users expect autocomplete to be near-instantaneous, the system doesn’t have the liberty to do the full set of computations that Glean Search can do to find the most useful result. To satisfy these demands, we’ve developed a low-latency model to predict what documents a user will visit next. As a user types, we further filter and rank the predicted document set by matching the input against keywords extracted from each document in the set. This step prevents noisy, difficult-to-explain suggestions from bubbling up to the user.

Even so, multiple documents in the predicted set often end up having similar keywords. If a user is staffed on Project X, there’s a good chance most documents, tickets, and presentations in the set are prefixed by “Project X: ”! Most users, moreover, tend to look at just the first few suggestions on the list. Thus, crafting an optimal ranking of this list becomes quite an important – and challenging – task. 

The good news is that when done right, document suggestions can drastically decrease user friction. We see today that almost a fifth of our result clicks come from Autocomplete. On the flipside, about half of all users who see a document suggestion click on it - we still have a long way to go!

Better Autocomplete means being able to find things faster for our enterprise customers, and we’re constantly looking to improve our Autocomplete systems here at Glean. If the intersection of ranking and performance is something that interests you, please get in touch about [careers at Glean](https://www.glean.com/careers)! And if powerful workplace search sounds like something your team needs, [request a demo](https://www.glean.com/get-a-demo).

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
