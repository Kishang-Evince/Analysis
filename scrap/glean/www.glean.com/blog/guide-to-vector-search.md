---
url: "https://www.glean.com/blog/guide-to-vector-search"
canonical: "https://www.glean.com/blog/guide-to-vector-search"
title: "What is Vector Search?"
description: "Emrecan Dogan  | Discover the perfect vector search tool for managing your internal knowledge. Our comprehensive guide provides all the information you need. Find out more here!"
fetched_at: "2026-09-01T13:26:42.113Z"
---
Last updated Oct 18, 2023.

# What is Vector Search?

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/65dee49587cf3c6a326a1d18_Emrecan.jpeg)

Emrecan Dogan

Head of Product



](/authors/emrecan-dogan)

![What is Vector Search?](https://cdn.prod.website-files.com/613513981b0efaf850830620/65316a494fb106d0b5dde09e_image3.webp)

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

In today's ever-evolving digital landscape, the demand for efficient and precise search capabilities within the enterprise is at an all-time high. Senior decision-makers and executives understand the critical role that effective information retrieval plays in driving productivity, decision-making, and innovation. One revolutionary approach that's transforming the way businesses navigate their vast repositories of data is vector search.

## What is Vector Search?

Vector search is a search technique that retrieves information by understanding the meaning of a query rather than relying on exact keywords. Unlike traditional keyword search, which depends on exact matches, vector search improves the search process by delivering more relevant results without requiring precise phrasing.

In traditional search engines, results are retrieved by matching exact keywords which are treated as discrete tokens or features in documents or web pages. For example, a search query like “cars that are good in snow” may miss results containing phrases like “excellent traction on icy roads.” Vector based search overcomes this limitation by focusing on semantic similarity instead of exact word matches.

This is achieved using vector embeddings, which are numerical representations of data. A machine learning model, also called an embedding model, converts textual data, images, or other unstructured data into dense vector representations in a high dimensional continuous vector space. Each document vector represents the meaning of the content.

When a user enters a query, it is converted into a query vector using the same model. The vector search system then performs similarity search by comparing vectors using distance metrics such as cosine similarity. It identifies similar vectors and retrieves results from the vector index.

A vector database manages this process efficiently. It stores embeddings and uses a search algorithm, often based on approximate nearest neighbor techniques, to enable efficient retrieval of relevant results even across large datasets. This makes vector search technology scalable compared to traditional search methods in many modern applications.

Vector search also supports multiple data types such as text data, image search, and audio, making it suitable for handling unstructured data. This allows systems to retrieve documents and data points based on meaning rather than exact keywords.

In modern AI systems, vector search plays an important role in retrieval augmented generation (RAG) framework. It works with large language models to fetch relevant information from a vector database index before generating responses. This improves accuracy and ensures context aware outputs.

Vector search is also referred to as semantic search, similarity search, or nearest neighbor search. All these terms describe the same process of measuring vector similarity and retrieving the most relevant results based on meaning.

‍

## Benchmarking vector search performance

We conducted a rigorous experiment comparing various text embedding models to gauge the effectiveness of vector search in an enterprise context. Our evaluation included embeddings from leading LLM providers and top-performing open-source models. We employed two key metrics to assess the quality of search results and retrieval performance: NDCG@10 and R@10.

Surprisingly, open-source embeddings like E5-large, Instructor-XL, and MPNet outperformed commercial API providers such as OpenAI and Cohere in this specific case. It highlights the ongoing superiority of open-source alternatives, but it's important to note that AI is rapidly evolving.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66a8e81051b2bb6c3fca5998_653169cdc10cc14fb53304e2_image2.webp)

## **What Are Vector Embeddings?**

Vector embeddings are numerical representations of data and its context, also known as vector representations. They are stored as high dimensional dense vectors and are generated using machine learning models trained on large datasets. These embeddings capture the semantic meaning of words, sentences, images, or documents, enabling systems to measure vector similarity and produce more relevant search results.

By using vector embeddings, recommendation systems can analyze user behavior and preferences to deliver personalized suggestions. This improves the user experience in e commerce and streaming services.

For example, consider the sentence: “How do I reset my SSO credentials?” An embedding model converts this into a vector such as \[0.82, -0.14, 0.57, 0.33 …\], typically consisting of hundreds or thousands of values. These values represent the meaning of the sentence, not just the exact words.

Each embedding acts as a coordinate in a high dimensional space, where semantically similar content is positioned closer together. For instance, “How do I log back in after my password expired?” would be located near the previous sentence, even without sharing the same keywords.

In a real world scenario, suppose a system indexes documents like “Steps to reset your Glean password,” “Troubleshooting VPN access after credential expiry,” and “How to submit a PTO request in HRMS.” When a user searches for “I can’t log in,” the query is converted into a vector and compared against stored embeddings. The system retrieves the most relevant results based on similarity, even without exact keyword matches.

### **How embedding models actually generate these numbers**

A model like bidirectional encoder representations from transformers (BERT) or a modern transformer reads your content in full context. It doesn't treat words as isolated tokens; it understands that "Apple" in a conversation about iPhones maps somewhere completely different from "Apple" in a recipe. The model was trained on massive text datasets to learn these relationships, so by the time it processes your company's Confluence pages or Slack threads, it already understands language at a semantic level.

For images, the same logic applies through convolutional neural networks. A photo of a server rack and a data center floor plan will be embedded close together because the model learned visual concepts, not just pixel patterns.

‍

## Customizing vector search for your enterprise

At Glean, we recognize that each enterprise possesses unique language and domain-specific terminology. This distinct vocabulary, which includes acronyms, project codes, and technical concepts, often eludes generic text embeddings, leading to suboptimal search results.

To address this challenge, we've developed a fine-tuning method. It customizes embeddings to your enterprise's language. This tailored approach ensures that your [vector search](https://www.glean.com/blog/unlocking-the-power-of-vector-search-in-enterprise) understands and retrieves contextually relevant information. Our experiments have consistently demonstrated the superiority of in-domain fine-tuned embeddings over off-the-shelf models, whether from commercial API providers or open-source options.

Moreover, our research has unveiled a compelling trend: the longer your enterprise utilizes our services, the more refined and accurate your language model becomes. Adaptation and persistent fine-tuning result in an increasingly enhanced user experience and more precise search outcomes.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66a8e81051b2bb6c3fca5993_653169b46f58ad51ba0696aa_image1.webp)

##   
‍

## **How Vector Search Works**

Vector search works as a pipeline where each stage builds on the previous one. The quality of the final result depends on how well each step is executed.

A support engineer at a SaaS company asks: “What was the root cause of last Friday's checkout outage?”

### **Step 1: Data ingestion**

All documents, such as incident postmortems, Slack threads, engineering retros, and runbooks, are ingested as raw content. The system cleans and converts them into plain text so they can be processed by the embedding model.

### **Step 2: Embedding generation**

Each document is passed through an embedding model such as text-embedding-3-large. The model converts it into a high dimensional dense vector like \[0.61, -0.22, 0.88 …\], capturing its semantic meaning, such as payment failures or API degradation. These vectors are stored for later retrieval.

### **Step 3: Indexing**

The vectors are stored in an Hierarchical Navigable Small World vector index. This graph based structure groups similar vectors into connected neighborhoods, enabling fast search by linking related data points efficiently.

### **Step 4: Query processing**

The engineer’s query is passed through the same embedding model and converted into a query vector in the same vector space. This ensures that both documents and queries can be compared directly based on meaning.

### **Step 5: Similarity search**

Using Approximate Nearest Neighbor search, the system navigates the graph to find the most relevant vectors. Instead of comparing against every document, it quickly explores the most promising regions, reducing the search space from millions to a few thousand candidates in milliseconds.

### **Step 6: Scoring and ranking**

Each candidate is scored using Cosine Similarity, which measures how closely two vectors align. Scores closer to 1 indicate higher similarity. The system ranks the results, applies permission checks, and returns the most relevant documents.

‍

## Vector search as a pillar of modern enterprise search

While vector search represents a fundamental shift in semantic understanding, it is just one piece of the puzzle in delivering high-quality results for enterprise search. Glean adopts a multidimensional approach by combining vector search with traditional keyword-based search and advanced personalization. This [holistic hybrid search system](https://www.glean.com/blog/lessons-and-learnings-from-building-an-enterprise-ready-ai-assistant) provides a comprehensive solution that caters to the diverse needs of your enterprise.

The paramount importance of efficient information retrieval in fostering innovation and driving growth is undeniable. Vector search has the ability to bridge the gap between LLMs and reliable data. It is a transformative technology that can elevate your enterprise's search capabilities.

If you're eager to witness the power of vector search in revolutionizing the search function within your enterprise, we invite you to [schedule a personalized demo](https://www.glean.com/get-a-demo) with us. Experience firsthand how Glean is redefining the landscape of enterprise search and knowledge discovery.

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

![How Glean search works](https://cdn.prod.website-files.com/613513981b0efaf850830620/65fa99b847083131838f9520_6407dc17762a0d50e91425c7_Glean-Persona-Prospecting%2520Offer%2520\(ebook%25201\)%25201080x1080.png)

## How Glean search works

Discover how Glean enables users to search across all their company’s apps and discover what they need to know through innovative machine learning and indexing.

[Get The Resource](/resources/guides/how-glean-search-works)

![How Glean search works](https://cdn.prod.website-files.com/613513981b0efaf850830620/65fa99b847083131838f9520_6407dc17762a0d50e91425c7_Glean-Persona-Prospecting%2520Offer%2520\(ebook%25201\)%25201080x1080.png)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
