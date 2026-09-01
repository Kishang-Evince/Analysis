---
url: "https://www.glean.com/blog/agentic-reasoning-modern-work"
canonical: "https://www.glean.com/blog/agentic-reasoning-modern-work"
title: "Building agentic reasoning for the modern workspace"
description: "Chau Tran  | Agentic AI will transform the very way we work, along with our expectations for AI itself. Discover in this blog how AI is evolving, which technologies are key to developing agents, and how Glean is approaching the development of agentic reasoning systems."
fetched_at: "2026-09-01T13:26:24.949Z"
---
Last updated Nov 19, 2024.

# Building agentic reasoning for the modern workspace

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/63ee2d63b34d7f2e4c76aa72_chau-tran.png)

Chau Tran

Engineering



](/authors/chau-tran)

![Building agentic reasoning for the modern workspace](https://cdn.prod.website-files.com/613513981b0efaf850830620/673c80f46fa28abaf733ee46_image1%20\(4\).webp)

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

The rise of agentic AI has captured the imagination of knowledge workers, promising to transform how we work by creating AI systems that can autonomously pursue goals and complete complex tasks. From AutoGPT to BabyAGI, we've seen increasingly more projects attempting to create AI agents that can navigate tools, make decisions, and achieve concrete outcomes with minimal human intervention. While the hype cycle has produced its share of overblown claims, the core premise remains compelling: AI systems that can understand objectives, plan appropriate actions, and execute tasks autonomously in a workspace environment could dramatically amplify human productivity.

At its core, agentic AI is built on the foundation of reinforcement learning's agent-environment loop. An AI agent observes its environment (like a workspace with various documents, tools, and data), decides on actions based on those observations and its objectives, and then executes those actions to effect change in the environment. This loop continues as the agent works toward its goals, learning and adapting along the way. The promise is that such agents could autonomously handle everything from data analysis and report generation to complex workflow automation and decision support.

In this blog post, we will go over changing expectations that drive the need for agentic systems, some of the key technical decisions for building agentic reasoning for the enterprise, and Glean’s approach to developing agentic reasoning systems.

## Changing expectations 

When users began working with generative AI, they started with a basic understanding of what they could accomplish. They asked ChatGPT questions like, “What’s a three-day itinerary for a weekend trip in Barcelona?” Users learned through experimentation, beginning with simple questions and gradually becoming more advanced by testing and learning. 

In the last year, user expectations of AI have shifted to now expect the completion of complex tasks specific to enterprise data and work. Their needs moved from information retrieval and insights discovery to workflow execution, where AI reasons and makes decisions for them. At the same time, generative AI has been commercialized and businesses want to invest in generative AI to power these employees and drive their own competitive advantage. Engineers want automated code reviews for pull requests, customer service organizations are looking for automated ticket resolutions, and sales teams want AI to help them process and review trends across hundreds of calls. 

While large language models (LLMs) demonstrated impressive reasoning capabilities for early queries, their out-of-the-box reasoning is akin to hiring a brilliant but brand-new employee who doesn’t have enterprise context. As expectations grow increasingly complex, most initial systems built to support simple queries won't be enough — agentic systems are needed for the reasoning and execution required for these tasks. With Glean’s RAG technology and agentic reasoning, that brilliant employee gains the context needed to understand information and processes across their entire enterprise. 

## Action space: The generalization-specialization spectrum

One of the most crucial architectural decisions in building an agentic AI system is defining its action space – the set of operations the agent can perform to interact with its environment. At Glean, we've found that this choice fundamentally shapes an agent's capabilities, performance, and reliability. The action space exists on a spectrum from highly generalized to highly specialized, with each point offering distinct advantages and trade-offs.

### Understanding the generalization-specialization spectrum

The granularity of actions available to an agent determines its position on the generalization-specialization spectrum. At one end, agents with low-level primitive actions offer maximum flexibility but require more complex chains of operations, where the output of one operation becomes the input for the next. At the other end, specialized agents with high-level actions can perform complex tasks efficiently but within a narrower scope.

Let's explore this through concrete examples:

1.  **Computer use agents (high generalization)**
    -   Operate with atomic primitives like clicks, keyboard input, and cursor movements
    -   Can theoretically accomplish any task a human can do on a computer
    -   Examples: browser automation, UI interaction agents
2.  **Tool use agents (medium generalization)**
    -   Work with mid-level primitives like API calls and tool operations
    -   Balance flexibility with operational efficiency
    -   Examples: workflow automation agents, data processing pipelines
3.  **Specialized agents (low generalization)**
    -   Orchestrator agents that coordinate between multiple domain-specific agents
    -   Each sub-agent is optimized for a particular use case
    -   Examples: a master agent that routes requests to customer support agent, contract drafting agent, engineering debugging agent, sales RFP agent

![Complexity of actions vs Number of actions graph](https://cdn.prod.website-files.com/613513981b0efaf850830620/673ccd7c8f4a892971935167_673ccd48ce1c19b59a5ca704_image2.png)

### Key trade-offs

The choice of action space granularity comes with important trade-offs that must be carefully considered:

**Generalized agents:**

-   ➕ Can handle a wider range of tasks and adapt to new scenarios
-   ➕ More resilient to changes in the environment
-   ➖ Higher latency to achieve the same task due to longer action sequences
-   ➖ Greater outcome variability and potential for errors
-   ➖ More complex to develop and maintain

**Specialized agents:**

-   ➕ Faster execution of domain-specific tasks
-   ➕ More consistent and reliable outcomes
-   ➕ Can leverage deep domain knowledge and optimization
-   ➖ Limited to specific use cases
-   ➖ Less adaptable to changes or new requirements

As the field of agentic AI evolves, we're observing a natural bifurcation in approach based on use case distribution. This bifurcation suggests that successful enterprise AI agent architectures will likely need to support both paradigms, potentially through a hybrid approach that can leverage both specialized and generalized agents depending on the task at hand.

### Combining agentic reasoning with enterprise knowledge

True enterprise reasoning requires combining the general intelligence of LLMs with deep organizational knowledge and business processes. At Glean, we've developed an agentic reasoning engine to tackle complex workflows that are native to any enterprise.

![Agentic Reasoning Graph](https://cdn.prod.website-files.com/613513981b0efaf850830620/673cccb1d3c2edee1828c805_673ccca4ce1c19b59a5bedc3_image1%2520\(5\).webp)

The foundation begins with search – our knowledge retrieval layer that indexes the entirety of company knowledge, spread across potentially hundreds of SaaS applications, data repositories, and communications systems.  This enables the entire company data corpus to be accessible for analysis with AI.

Building on this foundation, Glean’s prompting capabilities enable organizations to encode their institutional expertise (a.k.a. business processes) into reusable workflows. Using prompts, customers can express their intent using natural language and Glean will convert it into a sequence of steps using building blocks that they can then choose to modify. Glean visually creates these prompts by combining building blocks that retrieve content from the Glean index with LLM reasoning steps. These prompts capture not just the steps of a process, but the nuanced understanding of how things should be done within the company's specific context. It transforms tribal knowledge into systematic, repeatable processes that adhere to compliance rules, while maintaining the flexibility to adapt to each situation's unique requirements.

At the highest level, our agentic reasoning system handles both types of use cases that either have or don’t have predefined patterns. This system doesn't operate in isolation; instead, it builds upon all the layers below it, combining workflow building blocks with general reasoning capabilities. It can adapt known patterns to novel situations while maintaining alignment with organizational practices and preferences.

This layered architecture creates agents that truly understand your organization. They can parse requests in the context of company operations, access relevant organizational knowledge, and either leverage existing workflows or construct new approaches that align with company practices. Agents learn what works over time, planning and evaluating different paths to achieve goals, and doing so autonomously while keeping the best interest of your organization in mind. Most importantly, agents can adapt and respond to feedback while maintaining consistency with enterprise standards and expectations.

At Glean, we are innovating and continuously evolving our agentic reasoning architecture to power complex workflows. We’ve seen our agentic architecture help Glean customers resolve customer tickets. For every ticket that is opened in Zendesk or Service Cloud, Glean can identify suggested resolution paths and provide all the needed context in order to close a ticket faster - even figuring out the root cause and how to solve the customer support ticket. In the future, our agentic architecture will include increased reasoning and expanded use cases where insurance companies can review applications and determine eligibility for coverage, medical companies can synthesize past medical records to assist in diagnosis, and research & development teams can develop new products by combining qualitative call records, market insights, and quantitative survey data within a single query.

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
