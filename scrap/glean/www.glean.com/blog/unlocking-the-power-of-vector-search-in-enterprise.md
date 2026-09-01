---
url: "https://www.glean.com/blog/unlocking-the-power-of-vector-search-in-enterprise"
canonical: "https://www.glean.com/blog/unlocking-the-power-of-vector-search-in-enterprise"
title: "Unlocking the Power of Vector Search in Enterprise"
description: "Chau Tran Arvind Jain | One of the biggest hurdles to enterprise LLM adoption is accuracy and trust.Discover how Glean solves for this by implementing a multi-dimensional approach"
fetched_at: "2026-09-01T13:26:55.150Z"
---
Last updated Feb 15, 2023.

# Unlocking the Power of Vector Search in Enterprise

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/63ee2d63b34d7f2e4c76aa72_chau-tran.png)

Chau Tran

Engineering



](/authors/chau-tran)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a07483653e8ea8ef7c77930_arvind.png)

Arvind Jain

CEO



](/authors/arvind-jain)

![Unlocking the Power of Vector Search in Enterprise](https://cdn.prod.website-files.com/613513981b0efaf850830620/63ee2c796609d626d091ec8c_Vector%20Search%20Cover.png)

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

The advance of large language models (LLMs) and generative AI has unlocked the potential of delivering more refined search experiences. To get the answers to their questions, people can now talk to AI chatbots such as ChatGPT and receive an answer within seconds, instead of spending hours sifting through long pages of search results. However, in its current form, LLM output is not [grounded in accurate and trustworthy knowledge](https://www.glean.com/blog/enterprises-need-more-from-llms-on-coherence-vs-knowledge), and can sometimes generate responses based on flawed or biased information. To address this, one solution is to integrate a search system that provides LLMs with credible information.

Thankfully, the advent of LLMs has also lent itself to search. [Vector search](https://www.glean.com/blog/guide-to-vector-search), which uses embeddings derived from these LLMs, has introduced a new level of intelligence to search systems. In this blog post, we will benchmark text embedding offerings in the market and show how Glean creates advanced embedding models for enterprises by refining them with specific company language. These enterprise-specific embedding models are then combined with traditional information retrieval methods and advanced personalization to create a hybrid system that elevates enterprise search capabilities.

## An Introduction to Vector Search

Embeddings are numerical representations of text that capture its semantic information, making it easier for computers to understand relationships between concepts. Unlike traditional keyword-matching information retrieval methods, vector search leverages these representations to deliver more accurate results in certain scenarios.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/649e23817c9c43cccfe78c07_dMC2g3mPYeBylDeZjNiQxtEh1agGSkyt6ypxybH4_Py6MPxsJjcuOp-z53_Hhimz-Bf5MzPg70LWLGjyOrGyVa0V1mnyjtHcnsfhmod1PqTS1w7prONGxuE1o18xytlXq5_YVLIPfo8c7ryjSSVRsq4.gif)

To understand the performance of embeddings in enterprise search, we conducted an experiment using the best text embeddings from two leading LLM providers, and three [top-performing open source models](https://huggingface.co/spaces/mteb/leaderboard). The experiment evaluated the performance of different text embedding models on an enterprise search evaluation set. To assess the effectiveness of these embeddings, we used two key metrics: NDCG@10 and R@100. NDCG@10 measures the quality of the top 10 search results by taking into account both relevance and ranking, while R@100 gauges the search system's ability to retrieve relevant results, expressed as a percentage of the top 100 search results that contain relevant information.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56ecb37e30ad04be268b_63ee2cbae0ea36e7aee931f4_Chart%25201.png)

The results of our experiment revealed that, in this enterprise search task, open source embeddings such as E5-large, Instructor-XL, and MPNet still outperformed the embeddings provided by commercial API providers such as OpenAI (text-embedding-ada-002) and Cohere (large). This indicates that, at least in this specific use case, open source embeddings are still a better choice for enterprise search than commercial API providers. However, AI is advancing rapidly, and it will be fascinating to observe how the field evolves in the future.

{{richtext-banner-component}}

## Adapting vector search to your company language

At Glean, we understand that the way you communicate within your company could differ greatly from other companies. For example, companies often have specific acronyms, project code names, or technical concepts that are unique to their business, contributing to an entirely endemic language for each particular workplace and vertical (medicine, legal, banking, etc). These terms and phrases may not be recognized by generic text embeddings, and thus may not deliver the desired results in enterprise search.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56ecb37e30ad04be268e_63ee2cd3edd0a547e2891b14_Chart%25202.png)

That's why we've developed a method for fine-tuning embeddings to the unique language of our clients, resulting in each customer having their own customized large language model that performs well in any business or vertical. In other words, no need for constructed vertical training sets! Our experiments demonstrate that this in-domain finetuning significantly improves vector search performance, surpassing both commercial API providers and top-performing open source models. This is in line with [external research](https://arxiv.org/abs/2104.08663) that highlights the shortcomings of dense vector search methods on out-of-domain data.

Not only does this method improve the initial search performance, but our research also shows that the longer a customer stays with us, the better their language model becomes. The continuous adaptation and fine-tuning of the model leads to an increasingly improved user experience and more accurate search results.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56ecb37e30ad04be2688_63ee2ce51ccb006b1301fff5_Chart%25203.png)

## Vector Search as a Component of Modern Enterprise Search and Knowledge Discovery

While vector search is a foundational technology to machine semantic understanding, it alone isn’t enough to solve the problem of delivering quality results in enterprise search and knowledge discovery. Glean utilizes a [multi-dimensional approach](https://www.glean.com/blog/enterprise-search-is-hard-why-its-so-behind-and-what-itll-take-to-catch-up) combining vector search, traditional keyword search, and advanced personalization into a powerful hybrid search system. 

Interested to see how it all works? [Get a demo](https://www.glean.com/get-a-demo) today and discover how we're revolutionizing search for enterprise environments.

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

![Enterprise search buyer’s guide](https://cdn.prod.website-files.com/613513981b0efaf850830620/6704b6b730a63693c90eadf3_enterprise-search-guide.webp)

## Enterprise search buyer’s guide

Enterprise search solutions have become essential to ensuring employee satisfaction, workflow efficiency, and business success. Discover what features and capabilities to look for when considering the best search solution for you.

[Get The Resource](/resources/guides/enterprise-search-buyers-guide)

![Enterprise search buyer’s guide](https://cdn.prod.website-files.com/613513981b0efaf850830620/6704b6b730a63693c90eadf3_enterprise-search-guide.webp)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
