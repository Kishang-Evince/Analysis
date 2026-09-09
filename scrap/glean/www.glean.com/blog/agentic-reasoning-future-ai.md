---
url: "https://www.glean.com/blog/agentic-reasoning-future-ai"
canonical: "https://www.glean.com/blog/agentic-reasoning-future-ai"
title: "Agentic reasoning: The future of Work AI"
description: "Arvind Jain  | The future of AI in the workplace requires agentic reasoning to match growing expectations. Discover how we’re building Glean’s agentic reasoning capabilities to drive the work you do - better and faster."
fetched_at: "2026-09-01T13:26:25.104Z"
---
Last updated Nov 19, 2024.

# Agentic reasoning: The future of Work AI

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a07483653e8ea8ef7c77930_arvind.png)

Arvind Jain

CEO



](/authors/arvind-jain)

![Agentic reasoning: The future of Work AI](https://cdn.prod.website-files.com/613513981b0efaf850830620/673c7f22648187f4854a0ae4_image4.webp)

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

When we started Glean in 2019, our goal was to make finding answers at work as easy as using Google. At my previous company, Rubrik, we hit a productivity wall after growing to 2,000 employees in under four years because no one could find the information or experts they needed. When I failed to find a solution to this productivity challenge, I set out to build it. 

Since then, Glean has not only built the world’s most advanced AI-powered enterprise search, but has also become the AI assistant employees rely on to do their everyday work. How did we get here? With the launch of ChatGPT in 2022, companies quickly saw the potential of large language models (LLMs) to transform work. But these models had a major flaw: they lacked company-specific context and often hallucinated. That’s when Retrieval Augmented Generation (RAG) emerged- using search to ground LLMs in reliable knowledge.

While assistants can help with simple queries and tasks, they’ve struggled with complex workflows. The latest advancements in LLMs, combined with insights into optimizing these models for specific tasks, have enhanced the capabilities of assistants to be more like agents. Agents are able to plan, execute, evaluate, and take actions to achieve goals, continuously adapting based on feedback. These agents expand the potential of AI to get work done, allowing it to resolve customer support tickets, help engineers debug production issues, and adapt tone of voice for corporate communications.

Today I’m excited to share a preview of Glean's new agentic reasoning architecture, built to help users complete complex workflows by employing Glean’s state-of-the-art search and RAG technology. Below I’ve shared more on our journey from enterprise search to Work AI platform, and our vision for the future of agentic AI in the workplace.

## Search

Glean was started to help employees find answers within their organizations, across hundreds to thousands of fragmented SaaS applications. Previous attempts to solve enterprise search had fallen short because they didn’t adopt a Google-like approach with continuous data crawling, indexing, normalizing, and ranking designed for the enterprise. Many relied on federated search, which pulls information from available search APIs. This method is often incomplete and fails to account for relationships across people, content, and activity.

As one of the first search engineers at Google, I understood the importance of both personalization and authority of content when designing enterprise search at Glean. One of Google’s most significant early innovations was the PageRank algorithm, which determined webpage importance and relevance based on the number of other pages linking to it. At Glean, we drew inspiration from the PageRank algorithm to develop our own authority algorithms for the enterprise.

We designed a hybrid search architecture that includes a self-learning language model, a lexical search algorithm, and a knowledge graph. This architecture supports various user search methods, ranging from specific keyword-based searches, such as the exact title of a document, to broader searches, like best practices for resolving a support ticket, and personalized searches, such as meeting notes.

![Hybrid Search Graph](https://cdn.prod.website-files.com/613513981b0efaf850830620/673cccb1d3c2edee1828c80b_673ccc51e6d5e0688907f284_image3%2520\(3\).webp)

### Self-learning language model

Google introduced BERT (Bidirectional Encoder Representations from Transformers), which significantly improved natural language understanding by considering the full context of words. This shifted the focus from keyword matching to understanding the meaning behind words, a concept known today as semantic search. 

Glean built a proprietary self-learning language model using the foundational elements of BERT. Glean creates a custom model for each enterprise that continuously learns the company’s dialect, providing context into projects, terms, teams, and more. In a company’s first six months with Glean, search quality typically improves by 20% due to continuous self-learning.

### Lexical search algorithm

After running hundreds of experiments for months, we discovered that the heterogeneity of enterprise data makes it hard to shift consumer search algorithms to the enterprise. Slack comments, for example, are very short and don’t have titles, which would negatively affect their scoring on consumer algorithms.

We fundamentally redesigned lexical search for the enterprise, accounting for nuances and edge cases that other solutions may easily miss.

### Knowledge graph

With semantic and lexical search alone, Glean would still struggle to find authoritative information like “benefits.” In the enterprise, users have diverse preferences seeking the most authoritative (e.g. “benefits”), personal, (e.g. “OKRs”) or recent (e.g. “outage”) content. Furthermore, there is a myriad of relationships that influence search results, including close collaborators, location, tenure, team, and more. Glean built a knowledge graph across hundreds of applications to deeply understand relationships between people, activity data, and content.  

### Permissions

As I mentioned above, one of the reasons other [enterprise search solutions](https://www.glean.com/enterprise-search-software) failed is that they relied on federated connectors. Glean built a connector ecosystem of 100+ enterprise applications that ingests and indexes content, activity, and identity data. This approach includes a permissions structure that aligns with each application's permissions. Users searching for information will only see information that they’re authorized to access.

## Retrieval Augmented Generation (RAG)

RAG is a search problem at its core. It involves finding relevant information and feeding it to a large language model (LLM) to generate a response. 

Initially, the RAG architecture was explained in a straightforward way: use an LLM for reasoning and a vector database for knowledge. It quickly became known that RAG requires more nuanced considerations such as data modeling for embeddings, permissioning for LLMs, prompt engineering, fine-tuning, and implementing AI guardrails to ensure quality and security. 

**We recognized early on that reasoning could not be left solely to the LLM; the RAG system needed to guide the reasoning process.** Without a RAG system, the LLM is prone to generating hallucinations, leaking data, and providing irrelevant responses. 

Glean helps LLMs generate relevant and accurate chat responses while ensuring data security and permissioning. Instead of building our own LLMs, we focused on optimizing the retrieval system to get work done. 

Our initial RAG architecture consisted of three key components: plan, retrieve, and generate.

![RAG Graph](https://cdn.prod.website-files.com/613513981b0efaf850830620/673cccb1d3c2edee1828c802_673ccc8482203e98fdf375dd_image2%2520\(4\).webp)

### Plan

In traditional search, results are optimized using a multitude of factors, including clicks, positioning of clicks, and how much time the user spent on a page. An assistant, on the other hand, has a single shot at providing a relevant response using limited interaction data. 

One way we optimized the assistant experience was through query planning. During query planning, we teach the LLM how to use the Glean search engine to retrieve the information necessary to answer the user's question. This includes rewriting the query to bring in enterprise-specific knowledge about the data sources available and how they can be queried.

As LLMs continue to expand their context windows, Glean can incorporate more enterprise knowledge into LLM responses. We continually iterate on context selection, balancing latency and accuracy, for the best user experience. 

### Retrieve

During retrieval, relevant information is fetched from Glean and sent to an LLM. Retrieval relies on the same search system originally built for enterprise search. Just like with enterprise search, retrieval is permissions-enforced, ensuring the LLM formulates its response using only data that a user has access to. By designing permissions upstream of LLMs, Glean effectively addresses the problem of data leakage. Additionally, we have contractual agreements with LLM providers to ensure zero-day data retention and to prevent models from training on enterprise data.

### Generate

The LLM generates a response based on the relevant context provided from Glean. After the response is generated, we review the response and provide citations. These citations make it easy for users to verify the results and jump into the original documents for additional context.

### AI evaluation

Glean uses LLMs to programmatically evaluate and monitor assistant responses. This enables us to both continually improve our assistant system as well as evaluate and support the latest models. We grade the LLM performance on both retrieval (whether it retrieved the most relevant documents related to the user’s question) and generation (whether it extracted the information from those documents to generate a response). 

There is a belief that human graders are more accurate than AI evaluators. To test our LLM-based system, we had team members rate queries and responses.  Our team agreed only 79% of the time, while the AI agreed 74% of the time, highlighting the potential of AI-based evaluation in achieving near-human accuracy.

## Agentic reasoning

When Glean customers first began using our assistant, they asked basic search questions like, “Summarize my OKRs,” and we built our system to support these queries. As our customers progress in their adoption of AI, they’re now asking Glean to handle more complex work, such as, “Respond to this support ticket.” 

To provide the optimal response, Glean must execute several steps, including understanding the root of the customer’s problem, searching the knowledge base or documentation articles with that problem in mind, synthesizing relevant information, and crafting a helpful response using company-specific knowledge. 

Responding to a support ticket is just one example of the more complex work that users are looking to Glean for help with. As users demand more from Work AI, technological advancements have been underway to enhance the reasoning capabilities of LLMs and improve our own ability at Glean to train agents for specific tasks. Early research on our new architecture has shown a significant increase of 24% in the relevance of responses and actions using agentic reasoning.

**With agentic reasoning, agents decompose questions into multi-step plans. Each step is executed by agents using tools, such as search, reasoning, data analysis, employee search, and expert search. Agents self-reflect to optimize how they achieve the goal.**

Let’s walk through a preview of Glean’s new agentic reasoning architecture below.

![Hybrid Search along with Glean Graph](https://cdn.prod.website-files.com/613513981b0efaf850830620/673cccb1d3c2edee1828c805_673ccca4ce1c19b59a5bedc3_image1%2520\(5\).webp)

### Search

We evaluate the query and, using heuristics, determine whether it can be answered using search or agentic reasoning. Search is used for fast and accurate answers backed by company knowledge. For example, “What are the OKRs for the engineering department?” would be ideal for search. Agentic reasoning is designed for more complex queries.

### Reflect

By self-reflecting, agents can learn from their mistakes and successes. This enables them to adapt to new situations and improve their performance over time. The agent self-reflects on the initial search results and assesses its own confidence in its answer. It can also peer ahead at the tools available in the agentic route and reason as to whether or not they would help answer the question. At this point, the agent is at a crossroads: they can end at search or elect to move forward on the agentic path. 

At Glean, we’ve been experimenting with self-reflection at different points in the agentic reasoning architecture. We’ve tried using self-reflection as part of an agentic loop, letting the LLM continuously iterate until it achieves the goal. With the reasoning capabilities of LLMs today, we found they could not reliably check if the answer was in the indexed data, causing the loop to spiral. We’ve observed the potential of LLMs to enhance precision (i.e. grounding responses in knowledge) and are optimistic that future improvements in recall (i.e. determining if the answer is in the indexed data) will make the agentic loop achievable.

### Plan

In the plan step, we formulate our strategy. We first want to deeply understand the question that the user is trying to answer. To get more clarity, we run a series of initial questions to the LLM to gather background information. The background information helps Glean think strategically about how to achieve the overall goal and break down the steps to achieve it. Based on the background information, we rewrite the query into a multi-step plan.

The plan, like any solid project plan, outlines the sequence of steps, keeps work on track, and ensures the goal is achieved. Glean plans are influenced by memory or the context from past user interactions.

### Execute

Sub-agents carry out each execution step. They reason about the tools to use (search, data analysis, email, calendar, employee search, expert search, etc.) and how to stitch them together to achieve individual goals. 

The basis for many tools in Glean is search. We were able to infuse agentic reasoning into our architecture at breakneck pace because we spent years honing search, and building the knowledge graph, self-learning language model, and lexical search algorithm.

When we built our agentic reasoning architecture, we considered several agent archetypes, including tool-usage agents:

-   **Computer use agents (high generalization)**: These agents are capable of any task a human can do on a computer, performing basic actions like clicks and keyboard inputs.
-   **Tool use agents (medium generalization)**: These agents use mid-level actions that balance flexibility and efficiency, handling tasks like workflow automation and data processing.
-   **Specialized agents (low generalization)**: These orchestrator agents coordinate specialized sub-agents, each optimized for specific tasks like customer support, contract drafting, and engineering debugging.

At Glean, we decided to use tool-based agents because they offer a nice tradeoff between task breadth and complexity. I like to think of tools as a Swiss Army knife-they’re versatile, multi-functional, and can accomplish a wide range of tasks. 

We’ve also invested in multi-specialized agents, partnering with customers to understand their repetitive workflows across company departments. Specialized agents are trained on the nuances of their task and plug in the right set of tools to get the job done. 

### Respond

There are different flavors of responses, from a natural language chat response generated by a LLM to an action like creating a Jira ticket. In the future, we see a multitude of simultaneous, related actions to get work done. In the case of resolving a support ticket, that includes responding to a support ticket, closing out a support request, and notifying internal teams.  

## Reimagining Work AI

Reimagining Work AI is an ongoing journey that builds on Glean’s foundational technologies. We began with search and advanced to RAG; now we're progressing from RAG to agentic reasoning. We’ve always employed the latest technological advancements at the time- whether that was BERT, LLMs, or agents- and our culture of experimentation enabled us to develop a proprietary self-learning language model and lexical search algorithm, and now an agentic reasoning architecture. 

At Glean, we believe that AI transformation begins with employees- the people at work. Our vision is to deliver Work AI for all, helping everyone in the organization find information, generate answers, and automate work. We're proud to see our customers progress from simple search queries to automating complex workflows, and we remain committed to pushing the boundaries of continuous innovation and practical application, which go hand in hand to transform the future of work.

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
