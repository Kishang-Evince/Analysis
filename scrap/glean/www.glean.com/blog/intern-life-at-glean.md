---
url: "https://www.glean.com/blog/intern-life-at-glean"
canonical: "https://www.glean.com/blog/intern-life-at-glean"
title: "Intern life at Glean: Making an impact, together"
description: "Sabrina Ham  | Glean’s 2025 interns made an impact across engineering, design, product, and marketing initiatives that delivered lasting value."
fetched_at: "2026-09-01T13:26:45.916Z"
---
Last updated Oct 03, 2025.

# Intern life at Glean: Making an impact, together

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68e5759c75ee63233056e531_TGLEMJFFG-U05N5H74RNC-6536d714621a-512.png)

Sabrina Ham

University Talent Partner



](/authors/sabrina-ham)

![Intern life at Glean: Making an impact, together](https://cdn.prod.website-files.com/613513981b0efaf850830620/68e0685af10a7b05fa455e96_22.png)

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

This summer, Glean welcomed its largest and most dynamic group of interns yet, with over 20 talented students contributing across various teams. Among those shaping Glean’s future are Aurelia Wang, Sydney Schirrmeister, Param Thakkar, Varun Vobilisetty, Christina Wu, and Maria Morris. These innovative minds drove impactful projects, shared their experiences, and made meaningful contributions during their internships.

## Developer documentation revamp

Aurelia Wang (Software Engineer Intern) spearheaded the overhaul of **Glean’s developer documentation**, driving the migration to Docusaurus so the site can scale alongside our fast-growing builder community. While the broader team refreshed copy and reorganized pages, she untangled the circular references in our OpenAPI spec that had been blocking automated API-reference generation, then wired up a GitHub Actions workflow to catch similar issues on every commit. To protect every existing bookmark, she also scripted a redirect layer that smoothly steers visitors from two legacy doc sites to their new homes.

With the new platform live, Aurelia went further by contributing to an open source plugin that embeds public Glean Search directly into the docs, giving developers instant, familiar search from any page. She followed up by using Glean’s indexing SDK to build a custom connector that flags API reference pages separately from tutorials, boosting both relevance and result presentation. The payoff: faster discovery, smoother navigation, and rave reviews from Gleanies and customers alike.

Her roadmap is still rolling. Aurelia is weaving public Glean Search into our developer docs and building a public MCP server that will let any LLM tap directly into Glean’s content — no Glean account required. The mission remains the same: make sure every developer finds the right answer, right when they need it.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68e06adf0bf150d8b7ed7ace_image6.png)

## Newsletter campaign

Sydney Schirrmeister (Marketing Intern) spent the summer embedded with Glean Marketing, partnering across campaigns while owning one initiative end-to-end: t**argeted newsletter sponsorships** for the Demand Generation team.

She began by scouting newsletter publishers that could put Glean in front of the right readers. After mapping each vendor’s reach against our ideal customer profile, she narrowed the field, pitched her plan, and secured a budget — all before negotiating rates that kept ROI front-of-mind.

With the lineup locked, Sydney matched each placement to the Glean asset most likely to resonate — white-papers, e-books, one-pagers, even on-demand webinars — then teamed up with Design to craft eye-catching banners. After analyzing other successful marketing copy and using Glean Assistant to help with the writing process, she crafted engaging copy to catch the attention of various audiences. She kept the production train on schedule, coordinating hand-offs so every file hit the vendor’s inbox on time.

Some placements will continue after her internship wraps, but Sydney is already tracking performance for the ads that are live. Early results will shape our next demand-gen moves, and longer-term, the campaign is projected to drive up to one million impressions among engaged tech readers — fueling pipeline and giving our brand a louder voice in the market.

## Deep Research

Param Thakkar (Software Engineer Intern) worked on Glean’s new [**Deep Research**](https://www.glean.com/product/deep-research) feature, which helps users generate expert-level reports by synthesizing knowledge across enterprise sources. To support rapid iteration and ensure quality, the team needed an automated way to evaluate these reports at scale. Param integrated the public [DeepResearch Bench](https://arxiv.org/abs/2506.11763) framework into Glean’s existing chat evaluation infrastructure, leveraging the LLM-as-a-judge methodology from the paper to measure output quality across four key dimensions: comprehensiveness, insightfulness, instruction-following, and readability. This setup enables rigorous assessment of Deep Research agents on public datasets, using gold-standard reference reports for comparison.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68e06b19548905717e0b8a6a_image1.png)

These results measure improvements to Glean’s Deep Research system and benchmark its performance against external Deep Research systems. (External agent results are sourced from the DeepResearch Bench paper, collected April 2025; Glean results were collected July 2025.) Beyond public benchmarks, Glean’s primary use case lies in the enterprise context where no public datasets or reference reports exist. To address this, Param extended the evaluation framework to support reference-free scoring by adapting the judge to produce consistent evaluations without gold standards. This allowed the team to assess quality across real-world enterprise scenarios and guided ongoing iteration on the Deep Research system.

In addition to his work on evaluations, Param contributed to the Deep Research architecture by introducing a clarifying questions step that prompts users to refine and disambiguate their input before research begins. This addition improves the relevance and quality of the final report by ensuring the system better understands the user’s intent, enhancing the overall user experience.

## Enabling self-serve feature rollout and Glean for Admin Support

Varun Vobilisetty’s (Product Management Intern) internship was focused on empowering client administrators and optimizing internal operations through key product initiatives.

As product lead for the **self-serve feature rollout** initiative, Varun rallied a tiger team across Product Ops, GTM, Sales, and User Research to replace our piecemeal, manual enablement process with a single, transparent dashboard. He prototyped early flows in Vercel and Lovable, iterated with Design, and partnered with Engineering and Data to wire everything up. The result is a scalable feature-management tool that lets admins turn betas on — or off — without filing a ticket, building trust while freeing R&D and Support to focus on harder problems.

In parallel, he tackled the support backlog head-on with **Glean for Admin Support**, a three-pillar model of prevention, robust self-service, and frictionless escalation. After mining thousands of admin interactions to surface the biggest pain points, Varun built and benchmarked an in-product Glean agent that resolves common questions on the spot and points users to smarter documentation when they need a deeper dive. The goal: slash time-to-resolution and keep our support team laser-focused on issues that truly need a human touch.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68e06b368d22b6af5aedd01c_image4.png)

Beyond these flagship projects, Varun helped shape the Admin & Workspace team’s FY26 strategy and roadmap and jumped in to lead the **Connector Health Visibility** project, an effort outside his assigned scope. When the existing approach wasn’t meeting customer needs, Varun proactively picked it up, conducted customer research, and reworked the product offering to launch a beta addressing the real user problems — turning a stalled initiative into a solution that gives admins real-time visibility into setup health and progress — another step toward making Glean effortless to deploy and manage.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68e06b7011c85940d1e378c3_image2.png)

## Implementing Agent Featuring in Glean

Christina Wu (Product Design Intern) put Glean’s new **Agent Featuring** capability on the fast track, adding a dedicated **Featured** row to the Agent Library that admins or moderators can rename, reorder, and populate — so every employee sees company-approved agents the instant they open Glean. Customer demand was sky-high, so the team sprinted from kickoff to ship in less than three weeks.

As design DRI, Christina locked in early alignment with PM and Engineering, stress-testing ideas against tech constraints before a single pixel was final. Weekly reviews, rapid Slack huddles, and Figma prototypes kept everyone moving in lockstep.

The results showed up fast: Dell green-lit its agent rollout the moment the feature landed, and early telemetry points to a sharp jump in agent launches from the zero-state feed where Featured agents now sit. By building on Glean’s existing Collections framework, Christina’s crew also laid a scalable foundation for future custom categories — letting admins surface the right agents, right when their teams need them.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68e06b848f54c138d9a7f640_image5.png)

## Building Glean's terminology framework

Maria Morris (Content Design Intern) led the charge on **terminology governance**, giving Glean a single, rock-solid source of truth for every user-facing term across product, docs, and marketing. She built a living database that pairs crisp definitions with real-world usage notes, then prototyped UX-writing agents that surface that guidance right inside creators’ workflows.

True to Glean style, she kept the process collaborative — running feedback loops with design, product marketing, and technical writing to pressure-test language standards and make sure the system would hold up long after hand-off. The payoff: tighter copy, quicker cross-team alignment, and a linguistic backbone that keeps our AI experiences on-brand and crystal clear for users. Maria’s framework turns careful word choice into durable value — for every Glean team and for everyone who reads our work.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68e06b9b5bfe12b2d0cae52b_image3.png)

We’re grateful to all of our summer 2025 interns for their energy, fresh ideas, and the positive mark they’ve left on our teams. Interested in making an impact at Glean? [Keep an eye out](https://www.glean.com/careers#open-positions) for internship or full-time opportunities and don’t hesitate to connect with us!

‍**Authors:** [Aurelia Wang](https://www.linkedin.com/in/wangaurelia/), [Sydney Schirrmeister](https://www.linkedin.com/in/sydney-schirrmeister-2a253a277/), [Param Thakkar](https://www.linkedin.com/in/paramt/), [Varun Vobilisetty](https://www.linkedin.com/in/varun-vobilisetty/), [Christina Wu](https://www.linkedin.com/in/christinawu19/), [Maria Morris](https://www.linkedin.com/in/maria-morris11/)[**‍**](mailto:aurelia.wang@glean.com)

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
