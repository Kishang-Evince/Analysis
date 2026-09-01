---
url: "https://www.glean.com/blog/go-glean-cowork"
canonical: "https://www.glean.com/blog/go-glean-cowork"
title: "Right-sizing intelligence: Glean saves 81% on token costs and is preferred 78% of the time versus Claude Cowork"
description: "Matthew Zhao Jessica Kwok | A benchmark of 180+ enterprise tasks shows that auto routing, backed by high-quality context, can deliver token cost savings while achieving better performance."
fetched_at: "2026-09-01T13:26:41.308Z"
---
Last updated Aug 26, 2026.

# Right-sizing intelligence: Glean saves 81% on token costs and is preferred 78% of the time versus Claude Cowork

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/698cf8afdc94f4c0969da8fa_Matt.png)

Matthew Zhao

Engineering



](/authors/matthew-zhao)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec942d15209655a4308d7_Jess%20Kwok.jpeg)

Jessica Kwok

Product Manager



](/authors/jessica-kwok)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/698cf94bd1b022aaa167835f_Karthik.png)

Karthik Rajkumar

Applied Scientist



](/authors/karthik-rajkumar)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/698b49f5d44a8165d204323a_matthew-ding.jpeg)

Matt Ding

Technical Product Marketing Manager



](/authors/matt-ding)

![Right-sizing intelligence: Glean saves 81% on token costs and is preferred 78% of the time versus Claude Cowork](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ed201e4b8f1567ff77642_go-benchmark-Banner.webp)

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

At Glean, we've long believed that prioritizing intelligence in isolation, without considering cost, is the wrong approach. With the model landscape constantly evolving, chasing frontier intelligence alone is a costly endeavor. Instead, understanding the tradeoffs that different models make between cost and performance and using that understanding to put the right intelligence on the right job is much more important.

We ran two analyses that work in tandem to prove this out. First, we internally benchmarked Glean Assistant, with auto routing on, against Claude Cowork, running its recommended model for [everyday work](https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide), Claude Sonnet 5, across 180+ enterprise tasks. Glean saved 81% on token costs and was picked as the preferred answer 78% of the time. **Claude Cowork averaged $2.98 per task; Glean came in at $0.58.**

Second, we built a Pareto frontier analysis that maps cost and performance tradeoffs across the broader model landscape on enterprise tasks, and this analysis helps to inform how Glean makes auto routing decisions. With auto routing, Glean matches tasks to models and their reasoning levels based on the effort and capability required.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec88b5b07a61fe6a2381f_1-benchmark.webp)

### The token whiplash of 2026

[Tokenmaxxing](https://www.nytimes.com/2026/03/20/technology/tokenmaxxing-ai-agents.html) was hot early in 2026, with enterprises tracking who burned the most tokens as a productivity metric. The reckoning came fast: [Uber](https://www.theinformation.com/newsletters/applied-ai/uber-cto-shows-claude-code-can-blow-ai-budgets) disclosed it had exhausted its entire 2026 AI coding budget in just four months, with [ServiceNow](https://x.com/LauraBratton5/status/2054558503436755350?lang=en) reporting the same fate weeks later, its CIO calling it "a really hard problem." As new frontier models kept shipping and agentic coding moved further into the mainstream, enterprises reached the same conclusion: betting on one frontier model, with no discipline around how it's actually used, is an expensive habit.

The past month brought a shakeup to the model landscape. New open models like GLM 5.2, Kimi K3, and DeepSeek V4 Flash entered at lower price points, alongside OpenAI's own cuts to GPT-5.6 Luna and Terra in July. And, businesses responded, with many adding more open models into the mix, and [inference and model-serving platforms](https://ramp.com/data/ai-index-august-2026) that support them are seeing their market share rise as a result. 

### Pareto frontier analysis: Evaluating models on cost and quality together

With this much spread between cost and capability, we ran a separate analysis to see how these models stack up on intelligence relative to cost, this time across a broader set of 1,000 enterprise tasks across 37 models and reasoning effort configurations in a production environment. This analysis gives us the resolution to see how different task types perform across models, and to use those findings to optimize routing decisions. 

To make sense of that tradeoff, we turned to the Pareto frontier: the set of models offering the best possible tradeoff between performance and cost. A model is Pareto optimal if no other option offers better performance at its price point, or equivalently, if no cheaper model is available at its performance level. Plotted as a curve, inexpensive and less capable models sit in the bottom left, expensive and highly capable models sit in the top right, and the line between them traces the optimal frontier.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec89cfa911bc46ce4ac54_2-benchmark.webp)

Glean’s analysis is unique in that most Pareto frontiers are typically built on public datasets and not tuned to the complexities and diversity of enterprise work. Glean’s Pareto frontier is calculated based on secure evaluation of enterprise production traffic using methods that only make aggregate statistics visible to evaluators.

To construct the Pareto frontier graph, Glean evaluated model responses head-to-head, query by query, using an agentic judge focused on correctness, task completion, and output readiness. Our comparison design combined a round-robin tournament among the 11 model families at their default reasoning levels with comparisons between adjacent reasoning levels within each family, for 81 model-pair matchups in total. We used Bradley–Terry methodology, a standard statistical technique for turning head-to-head results into a single relative rating, to calculate the Glean quality score. The score represents a model’s expected preference performance against the benchmark field: a score of 60 means the model is expected to win on quality on 60% of the tasks in a head-to-head matchup against a randomly chosen competitor, with ties split evenly in this analysis. Higher scores are better, with a score of 50 indicating the middle of the quality distribution.

What we found: 

-   **GPT-5.6 Luna (xhigh)** sits on the frontier, scoring 55 on the Glean quality score while remaining highly cost-efficient at $0.0819.
-   **GLM 5.2 (high)**, for open source model enthusiasts, is slightly better than GPT-5.6 Luna (xhigh) at a score of 57, but at a more expensive cost of $0.3489.
-   **Claude Opus 5 (high)** also sits on the frontier, scoring 67, at a much steeper cost of $2.9605. 
-   **Kimi K3 (high)** represents a more balanced middle ground, achieving significant quality gains over GPT-5.6 Luna at a score of 63 and a cost of $0.8995. 
-   **Gemini 3.7 Flash (high)** is another example of this, with a score of 61 and a cost of $0.4748.

What this analysis shows is that the frontier isn’t dominated by one provider, and that the cost spread between Luna 5.6 (xhigh) and the most expensive model sitting on the frontier, Opus 5 (high), is 36x for a 22% gain in quality score. Furthermore, there are a number of models Kimi K3 and Gemini 3.7 Flash (high), that can capture quality gains over GPT-5.6 Luna (xhigh), while being 3-6x lower cost than Opus 5 (high). 

These insights show there’s no single “best” model and that there’s an optimal range, which is why model choice and auto routing can achieve the quality at a fraction of the cost. The Pareto frontier evals join thousands of evals that Glean runs a quarter to inform routing decisions. 

### How Glean auto routing works 

Auto routing is Glean's approach to matching the right model, at the right reasoning level, to the task at hand, so that no user needs to be a model expert and think about which one to pick. We look at routing through two lenses. The first is model selection: which of the 40+ open and frontier models available is best suited to a given task. The second is effort routing: how hard the model should think about it, using reasoning level as the lever. 

To decide the optimal reasoning level at runtime, Glean uses a small specialist model, [Glean Waldo](https://www.glean.com/blog/waldo-launch), post-trained on NVIDIA Nemotron 3 Nano. Once Waldo determines the reasoning level, it can hand off to a specialist model if needed to accomplish the task. We've found, for example, that Claude Opus 4.8 excels at visual artifact creation, so the harness graduates to Opus 4.8 based on its understanding of the task.

### Benchmark analysis: Glean versus Claude Cowork across departmental work

Glean offers a lower cost per task based on two input metrics. One, is the blended cost for each token across the mix of models that auto routing used. Second, the number of tokens that were used. Glean used fewer tokens, 1.3 million versus Claude Cowork's 4.4 million, a 70% reduction. Combined, that's what brought the average cost down in Glean to $0.58 per task, against Cowork's $2.98.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec8af7d2434e09da72727_3-benchmark.webp)

The reason we delivered a 70% reduction in token usage is based on architectural decisions in Glean:

-   [Enterprise context foundations:](https://www.glean.com/blog/enterprise-ai-indexing-context) Glean starts from a unified, pre-indexed, ranked view of enterprise information, while Claude Cowork's federated MCP approach has to search each system individually, often overfetching results and burning tokens to normalize data, resolve conflicts, and repeat reasoning loops it shouldn't need to. 
-   [Harness design:](https://www.glean.com/blog/enterprise-agent-harness) Glean keeps tool outputs and intermediate state in sandbox files instead of reloading everything into the model's context window each time. It progressively loads only the tools, skills, and schemas a task needs, while isolated sub-agents keep unrelated context out of the main reasoning loop too.

### Benchmark analysis: Glean achieves higher quality than Claude Cowork at lower cost 

Cost efficiency only matters if the output is usable, and that's where quality comes in. Glean was preferred 78% of the time over Claude Cowork across 180+ queries, winning on:

-   **Overall preference:** Which response they'd actually use on the job
-   **Correctness:** Which response was more factually accurate, logically sound, and grounded in current sources
-   **Completeness:** Which response did more to fulfill the request and left less work unfinished
-   **Interaction quality:** Which system required less steering, repair, re-prompting, waiting, or manual rescue

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec8c184189fb0277a0548_4-benchmark.webp)

Glean’s preference held across every department evaluated, including sales, engineering, marketing, HR and people, product, finance, and customer support and success. Tasks selected for the evalset were inspired by how customers use Glean today, though all queries were synthetically generated to protect user privacy. The tasks were reviewed by subject matter experts in each area, with sales team members checking sales tasks, marketers checking marketing tasks, and so on to ensure they were representative of their work.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec8d4d1c9710ab86b5627_5-benchmark.webp)

Glean's advantage held across task types as well. The evalset spanned the range of enterprise work: drafting and refining content (including artifacts like slides, spreadsheets, and HTML that are increasingly central to enterprise coworking use cases), summarizing and synthesizing sources, analyzing data, locating resources, automating workflows, and understanding complex topics.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec8e3705a69bdf876e1f2_6-benchmark.webp)

### Benchmark analysis: Glean preferred responses help tackle botsitting

We also found Glean’s preferred responses curb [botsitting,](https://www.glean.com/work-ai-institute/reports/work-ai-index) the largely unbudgeted work employees take on to make AI usable by feeding it context, supervising output, and cleaning up mistakes. Research from [Glean's Work AI Institute](https://www.glean.com/work-ai-institute/reports/work-ai-index), surveying 6,000 full-time digital workers, found that employees spend 6.4 hours a week on botsitting, more time than they spend using AI to actually produce work. Our own grader feedback surfaced failure patterns that create this kind of correction labor:

-   Tasks that were misread
-   Outputs that were hard to read or share
-   Missing roles or account context
-   Evidence that was incomplete or stale
-   Conclusions that were unsupported or even incorrect

Each of these is a small tax on the person using the output, the very labor the Work AI Institute quantifies as botsitting. When a system starts with the right context already in place, it needs less of this correction, and workers get back the hours that would otherwise go into managing AI.

### Benchmark analysis: Evaluation methodology

The internal evaluation was based on synthetic queries accessing Glean's own production data, with graders scoring 180+ responses on a 5-point preference scale, comparing Glean Assistant and Claude Cowork side by side. For enterprise data access, Glean used its native and MCP-based connectors, while Claude Cowork was set up with off-the-shelf MCP connectors covering Google Drive, Gmail, Google Calendar, Slack, Atlassian Rovo, Linear, Intercom, and Sigma, along with local MCP servers for Salesforce, GitHub, and GCP. Glean ran with auto routing enabled; Claude Cowork was held constant on Claude Sonnet 5 with high reasoning, Anthropic’s [recommended](https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings) reasoning level that balances quality and speed.

### The rise of the Pareto frontier and evaluating models on cost-performance 

The rise of the Pareto frontier marks the decline of max intelligence as the default strategy for enterprise AI. Enterprises no longer need to choose between what AI costs and what it delivers, and betting on a single frontier model, without discipline around how it's actually used, is not a sustainable habit. Glean’s results make the case: pairing routing across a fast-moving model landscape with enterprise context reduces token costs by 81%, while the outputs themselves are preferred 78% of the time. Glean is committed to helping enterprises dramatically reduce token costs so they can dramatically expand the work they give to AI. 

Join us at [Glean:GO](https://www.glean.com/events/glean-go-2025) to learn more about these results.

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
