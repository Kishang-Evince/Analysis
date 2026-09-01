---
url: "https://www.glean.com/blog/glean-skills-launch-2026"
canonical: "https://www.glean.com/blog/glean-skills-launch-2026"
title: "Glean skills: A new way to package and reuse enterprise expertise"
description: "Abhilash Samantapudi Matt Ding | Glean supports skills, an open standard, so that you can create personal skills or share them company-wide, turning your expertise into reusable standards for getting work done."
fetched_at: "2026-09-01T13:26:40.312Z"
---
Last updated Feb 09, 2026.

# Glean skills: A new way to package and reuse enterprise expertise

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/698b49499603e9054f4c9c07_abhi-samantapudi.jpeg)

Abhilash Samantapudi

Product Manager



](/authors/abhilash-samantapudi)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/698b49f5d44a8165d204323a_matthew-ding.jpeg)

Matt Ding

Technical Product Marketing Manager



](/authors/matt-ding)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/67dc54a473da648e54d4e7fb_Julie%20Headshot.jpeg)

Julie Mills

PMM



](/authors/julie-mills)

![Glean skills: A new way to package and reuse enterprise expertise](https://cdn.prod.website-files.com/613513981b0efaf850830620/698b4dc212917c19dc1f5130_banner.png)

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

With the advent of the Model Context Protocol (MCP) and the sudden rise of hundreds of tools, a pivotal question emerged: how can we teach AI to use multiple tools together to achieve a meaningful block of work? At the same time, it became clear that general-purpose models were powerful but struggled with domain knowledge and expertise — things like financial modeling, life sciences research, and legal contract reviews.

In response, the ecosystem has converged on the open standard [Agent Skills.](https://agentskills.io/home) Agent Skills are reusable packages of instructions, scripts, and tools that teach AI how to tackle a specific task. Instead of prompting from scratch every time, a skill captures the structure, decision points, and expertise behind a task, and pairs that knowledge with the tools needed for execution.

Skills have since become widespread and are now adopted by OpenAI (in their API), Anthropic, LangChain, Cursor, Manus, Antigravity, and more, giving AI a standard way to orchestrate tools and apply expertise.

Today, we're announcing Glean’s support for the Agent Skills standard, and we're starting a private beta to get feedback on how our customers are using it in Glean Assistant. You can create your own personal skills to share your expertise more broadly with your company and help standardize how work gets done. With skills, Glean Assistant brings the power of a team of experts to everything you do—from deep account research to crafting knowledge base articles to writing personalized outreach emails. These new capabilities change the way your employees work, giving them the ability to automate tasks, reduce dependencies, and expand their skillset. Everyone in your organization upskills and expertise becomes a reusable and shared asset.

Additionally, you can bring the broader ecosystem of skills into Glean and layer in your own ways of working, remixing skills to reflect your enterprise. This is part of Glean’s commitment to open standards across our AI platform, from being cloud‑agnostic and model‑agnostic to supporting open technologies like MCP. When enterprise stacks converge on open standards, they unlock faster innovation and more durable AI investments.

## Using Glean skills for account planning

An account plan is a living document that captures everything a sales team needs to win, grow, and retain customers. It usually includes the mutually-agreed upon vision with the customer, details of the organization and key stakeholders, an understanding of the customer’s strategic priorities, deal and opportunity details, along with the risks and next steps for the sales team’s plan. 

While the components of an account plan across sales organizations are similar, the devil is in the details. Sales teams don’t just operate in a fixed view—they have to take into account the broader landscape. Where do deals typically fall down? Is it multi-threading or champion departure? Is it the onslaught of competitors undercutting their market? Or, is it that the sales team needs to pivot their product-market fit and go after a new ICP, with sales leaders being on the lookout and providing guidance around that movement? All of these nuances boil down to different expectations from sales leaders about what “good” looks like. 

With Glean, you can standardize your account planning best practices by uploading them as a company skill. The skill can encode the required sections and structure, the questions reps should answer, which systems to pull data from, and how to summarize risk, opportunity, and next steps.

With this skill in place, you’re upleveling your entire sales team with AI and teaching everyone to think about account health the same way. New reps ramp faster, frontline managers review consistent plans, and leadership can quickly converge on risks and opportunities and align the team around a shared strategy.

## Tips for skill crafting

How you create skills matters for how useful they are. 

For a skills primer, skills are made up of three types of content, each loaded at different phases of execution. The skill description (or metadata) is always loaded. The skill instructions load only when the skill is triggered. And, the resources or code behind the skill load only as needed. The AI decides how and when to invoke the skill during execution, which is referred to as skills routing. 

When we first implemented skill routing in Glean, we did it naively and saw the trigger rate for skills versus tools drop 20%. If a skill isn’t called, it isn’t very useful. We found that by adding negative examples and edge cases to the skill description (the part of the skill that’s always loaded), we could improve the trigger rate. For example, in our account research skill, strong negative examples include avoiding using this skill for opportunity stage updates in Salesforce, or for support and troubleshooting requests, neither of which is relevant to account planning. 

When it came to the skill instructions themselves, we found that a few high‑quality few‑shot skills examples performed better than long, detailed system prompts. The largest gains in both accuracy and latency came from adding concrete examples directly into the skills. Because skills are only loaded when they’re triggered, these examples add zero overhead to non‑triggered queries, and they outperform system‑level prompting when used correctly.

Skills, while useful for capturing deep expertise, are also particularly well‑suited for multi‑tool orchestration. Multi‑tool orchestration often results in an accuracy drop when a model has to coordinate several tools, but skills close this gap by explicitly teaching models how to plan and sequence tool calls. In our evals, a Salesforce skill that walked the model through using multiple Salesforce tools to analyze data increased accuracy from 73% to 85% and reduced time to first token by 18%.

We also discovered that model choice matters for skills. Agentic tasks require the latest-gen reasoning models that can iterate and act over the data, which is critical for performant skills.

## The symbiotic relationship between skills and agents

Skills work alongside agents. Skills capture how to execute a specific task consistently, like applying the same brand guidelines across all documents, providing specialized domain knowledge, or capturing expertise that’s part of a larger workflow.

Agents are orchestrators that automate end-to-end processes. Let’s assume there’s an agent to automate the creation and sharing of account plans. Each week, a Glean agent is triggered to aggregate weekly account plan updates, write them directly to the plan, and then share those updates more broadly with sales leadership so everyone is on the same page and collaborating on next steps.

In other words, skills are units of expertise, and agents are end-to-end workflows that decide when and how to apply those skills. As the space evolves, we’ll see the formation of entire libraries of reusable skills that different agents can call, creating a composable way to scale automation without losing control over quality and standards.

## The future of skills in Glean

While today we have a private beta of skills where users can create and upload their own skills in Glean, we see a future where Glean does most of the skill-building for you.

Glean’s personal graph understands how people actually work: how someone gets an account plan done, what their first draft looks like, who reviews it, what feedback they leave, and what a great final plan looks like. With that knowledge, Glean can package these patterns as skills, helping AI take on more of the account planning work so sales teams can focus on strategy and customer relationships. And, as your organization’s priorities shift, the mined skills constantly adapt in the background, keeping skills aligned with how your teams actually operate. Throughout this process, you stay in control, reviewing and refining skills so they work for your organization.

With Glean building the skills on your behalf, skills become first-class citizens in your AI stack, and expertise stops living in a few people’s heads. Instead of relying on experts to flesh everything out in writing, that knowledge starts showing up automatically in how everyday work gets done.

Availability: Skills are available in private beta in Glean Assistant.

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
