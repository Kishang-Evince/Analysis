---
url: "https://www.glean.com/blog/sonnet-4-5"
canonical: "https://www.glean.com/blog/sonnet-4-5"
title: "Claude Sonnet 4.5 optimizes tool execution to unlock 10% of queries that were previously out of reach"
description: "Kunal Patil Nikhil Mandava | Glean supports Claude Sonnet 4.5 this week, giving users the ability to try the new model on real enterprise workloads."
fetched_at: "2026-09-01T13:26:53.253Z"
---
Last updated Sep 29, 2025.

# Claude Sonnet 4.5 optimizes tool execution to unlock 10% of queries that were previously out of reach

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68da5c08090cb5cda10b8e27_Kunal%20Patil.png)

Kunal Patil

Software Engineer



](/authors/kunal-patil)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/620e86b206d0ccac81e58f9f_Nikhil.png)

Nikhil Mandava

Engineering



](/authors/nikhil-mandava)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/67ac9bb4745633aa286a2616_Seema.jpeg)

Seema Jethani

Product Lead



](/authors/seema-jethani)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68da5cbf60c2c876b7c51fa5_Nilesh%20Dalvi.jpeg)

Nilesh Dalvi

Software Engineer



](/authors/nilesh-dalvi)

![Claude Sonnet 4.5 optimizes tool execution to unlock 10% of queries that were previously out of reach](https://cdn.prod.website-files.com/613513981b0efaf850830620/68dad6f07023ad0544e0873c_Glean%20supports%20Anthropic%20Sonnet%204.5%20-%20Blog%20\(1\).webp)

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

Glean is an open platform that supports the latest open-source and commercial models, giving enterprises access to the most advanced LLMs. Glean provides the context these models need by tapping into 100+ data sources across the enterprise and building an Enterprise Graph that understands how your company works-the people, the relationships, the projects, the tasks, and the processes. As a result, we help enterprises get more done with AI-from debugging and writing to data analysis and more, all grounded in context.

Glean is committed to quickly supporting cutting-edge models, including Claude Sonnet 4.5, and giving users the ability to try them on real enterprise workloads. We are happy to support Sonnet 4.5 this week in our no-code agent builder, letting users pick the best model for the job from Sonnet 4.5 and 15+ models on a per-agent or per-agent-step basis. 

At Glean, we evaluate models and our agentic engine on completeness, correctness, and alignment with human feedback. We then share those results so users can make informed decisions on which models to use. Our evaluations found that compared with Sonnet 4.0, Sonnet 4.5 delivers higher correctness and completeness and, more importantly, successfully tackles an additional 10% of queries with human feedback (downvoted queries), a class of queries that was out of reach for Sonnet 4.0. Sonnet 4.5 gets to the final answer with fewer iterations in planning-driving stronger performance more efficiently.

## Sonnet 4.5 tackles queries that Sonnet 4.0 just couldn’t answer

Glean saw its biggest improvement with Sonnet 4.5 on alignment with human feedback, which measures how often newer models successfully resolve previously downvoted queries.

Alignment with human feedback is a moving target. We recently made a significant upgrade to [Glean’s Agentic Engine 2](https://www.glean.com/blog/live-fall-25-agentic-engine2-performance), the engine that adaptively plans and iterates over enterprise context. This enabled us to solve a class of queries representing 20% of all downvote queries that were previously out of reach. With this new Engine, the bar for addressing human feedback rose substantially, making it harder for Sonnet 4.5 to show performance gains. With this context, we’re impressed with the 10% improvement jump in the newer Sonnet model.

## Sonnet 4.5 is more efficient with improved tool calling and better use of adaptive planning

While Sonnet 4.5 made gains on correctness and completeness over Sonnet 4.0, the more notable win is that the model achieved these results efficiently. We track efficiency with two metrics:

-   **Tool calling**: The number of times the agent uses external data or actions during problem solving.**‍**
-   **Adaptive planning cycles**: The number of iterations in which the agent revises and executes its plan based on intermediate results until the task is accomplished.

|  | Tool calls (mean) | Parallel tool calls (mean) | Adaptive planning cycles (mean) |
| --- | --- | --- | --- |
| Claude Sonnet 4.5 | 1.61 | 1.34 | 2.19 |
| Claude Sonnet 4.0 | 2.08 | 1.00 | 3.08 |

Not only is the model better at honing in on the right tools faster, it’s also more efficient using parallel tool calling without forceful prompting. The model can infer the right execution order for dependent steps and recognize when calls can be parallelized. 

While we see adaptive planning being valuable for open‑ended or research questions, its overuse can increase latency and resource consumption. Sonnet 4.5 is better at parsing large result sets and committing to an answer when its confidence is high, enabling it to answer without running an extra confirmation step.

**What’s impressive is that Sonnet 4.5 uses tool calling and adaptive planning more efficiently without degrading performance on completeness or correctness.**

## How Sonnet 4.5 optimizes tool calling  

In the evaluation data, we see that Sonnet 4.5 parses the user’s query and figures out the operators to use, effectively applying the right filters and parameters for tools-resulting in more accurate results with fewer tool calls. It’s also better at pinpointing the tools that measurably advance the task-either by reducing uncertainty, ruling out possible execution paths, or producing the final result.

We see the improvements in tool calling and adaptive planning in this query:

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68dab6535dbc830b85103c24_Anthropic%20Response%20-%20Blog.webp)

With Sonnet 4.5, this query was answered with 3 parallelized searches rather than 3 sequential searches, saving 2 LLM calls and delivering lower latency. 

## Access Sonnet 4.5 and leading open-source and commercial models in the Glean model hub

Sonnet 4.5 delivers more accurate, more complete answers for enterprise AI than Sonnet 4.0-and uses enterprise tools more effectively to solve tougher questions with better efficiency. Sonnet 4.5 is coming this week to the Glean model hub alongside 15+ leading open-source and commercial models, so you can see how it works on your own enterprise agents.

If you’re not a Glean user and want to see Sonnet 4.5 at work, sign up for a free [demo](https://www.glean.com/get-a-demo) today.

‍

**Authors:** [Kunal Patil](https://www.linkedin.com/in/kunalpatil01/), [Nikhil Mandava](https://www.linkedin.com/in/nikmandava/), [Seema Jethani](https://www.linkedin.com/in/seemajethani/), [Nilesh Dalvi](https://www.linkedin.com/in/nileshdalvi/), [Julie Mills](https://www.linkedin.com/in/julie-mills/)

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
