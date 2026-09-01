---
url: "https://www.glean.com/blog/glean-nvidia-nim-microservices-customer-support-agent"
canonical: "https://www.glean.com/blog/glean-nvidia-nim-microservices-customer-support-agent"
title: "Building an Intelligent Customer Support Agent with Glean APIs and NVIDIA NIM Microservices"
description: "Arvind Jain  | Glean and NVIDIA announce a collaboration to integrate Glean's contextual knowledge graph and NVIDIA NIM microservices to deploy AI-driven solutions."
fetched_at: "2026-09-01T13:26:39.310Z"
---
Last updated Mar 18, 2025.

# Building an Intelligent Customer Support Agent with Glean APIs and NVIDIA NIM Microservices

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a07483653e8ea8ef7c77930_arvind.png)

Arvind Jain

CEO



](/authors/arvind-jain)

![Building an Intelligent Customer Support Agent with Glean APIs and NVIDIA NIM Microservices](https://cdn.prod.website-files.com/613513981b0efaf850830620/67d93f6f913cf6cc7a22f559_Glean-Nvidia.webp)

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

## Introduction

The collaboration between Glean and NVIDIA unlocks a powerful, enterprise-grade AI architecture that is the foundation for modern customer support agents. By leveraging Glean's contextual knowledge graph and NVIDIA NIM™ microservices, organizations can create agentic AI applications that deliver precise, context-aware responses to complex queries while securely safeguarding enterprise data and prompts within their network. Read more about our collaboration announcement [here](https://www.glean.com/blog/nvidia-nvbot-glean-partnership). This post will outline how businesses can integrate Glean APIs with NVIDIA NIM microservices to deploy a cutting-edge AI support agent.

## What is NVIDIA NIM? 

[NIM](https://www.nvidia.com/en-us/ai-data-science/products/nim-microservices/) microservices are included in the [NVIDIA AI Enterprise](https://www.nvidia.com/en-us/data-center/products/ai-enterprise/) software platform and speed up generative AI deployment in enterprises. Supporting a wide range of AI models, including [NVIDIA AI Foundation and custom models](https://www.nvidia.com/en-us/ai-data-science/foundation-models/), NIM microservices provide seamless, scalable AI inferencing, on-premises or in the cloud, leveraging industry-standard APIs.

With NIM, our customers can choose from a wide variety of language models to self-host on their own infrastructure. Customers can use the [NVIDIA API catalog](https://build.nvidia.com/explore/discover) to experiment with the latest GPU-accelerated LLMs the day they are released, and easily integrate them with Glean Assistant. NIM makes it easy to deliver optimized LLM inference at scale, no matter where the model is hosted.

A key advantage of NIM is that it enables organizations to maintain complete control over their AI infrastructure and intellectual property. By allowing enterprises to self-host models on their own infrastructure, NIM ensures that sensitive company information, prompts, and customizations remain secure within their network, while still delivering high-performance AI inferencing capabilities.

Learn more about NVIDIA NIM microservices [here](https://developer.nvidia.com/blog/nvidia-nim-offers-optimized-inference-microservices-for-deploying-ai-models-at-scalhttps://www.nvidia.com/en-us/ai-data-science/products/nim-microservices/). Each layer in the stack highlights key components or capabilities designed to enhance the deployment and performance of machine learning models. Here's what each part represents:

1.  **Prebuilt Container**: At the top of the stack, this indicates that NVIDIA provides preconfigured, containerized environments that simplify model deployment by including necessary dependencies and configurations.  
    
2.  **Industry Standard APIs**: This layer ensures compatibility and ease of integration with commonly used APIs, facilitating seamless use of the module across various platforms and applications.  
    
3.  **Support for Custom Models**: NVIDIA NIM accommodates not only pre-trained models but also user-defined or customized models, offering flexibility for specialized use cases.  
    
4.  **Domain-Specific Code**: This layer signifies that the module includes optimizations and code tailored for specific industries or applications, such as healthcare, automotive, or retail.**‍**
5.  **Optimized Inference Engines**: At the base of the stack, this layer ensures that the underlying inference engines are highly optimized for performance, leveraging NVIDIA hardware to deliver efficient and fast inferencing.  
    

The stack emphasizes a combination of ease of use, flexibility, and high performance tailored to industry-specific needs.

## How Glean APIs and NVIDIA NIM Work Together

The diagram below illustrates a customer service agent architecture that combines Glean APIs with NVIDIA NIM and NeMo microservices. This setup operates in four stages, aiming to enhance customer experience and improve operational efficiency: **initial query processing**, **retrieval system**, **reranking**, and **answer generation**. Integrating with Glean APIs ensures enterprise-grade accuracy, contextual relevance, and reliable content retrieval for these stages. **Glean APIs** provide powerful data retrieval, ensuring results are securely permissions-aware and contextually relevant. By indexing enterprise data across diverse sources, Glean APIs surface information that is both accessible and impactful for users. [**NVIDIA NeMo**](https://www.nvidia.com/en-us/ai-data-science/generative-ai/nemo-framework/) **and NIM** microservices enhance retrieval precision and ranking while enabling multimodal input support.

![Glean NVIDIA Graph](https://cdn.prod.website-files.com/613513981b0efaf850830620/67d93f4120208dfd95bb1a6e_Screen%20Shot%202024-12-20%20at%201.21.41%20PM%20\(1\).webp)

### Workflow Summary

1.  **User Query Contextualization**:  
    1.  The user submits a query in text and/or image format. 
    2.  Images are converted into natural language using NVIDIA NeMo’s image-to-text capabilities ([NeVA 22B NIM](https://build.nvidia.com/nvidia/neva-22b)) and NVIDIA NIM for LLM for Chat History Query Contextualization.
2.  **Query Guardrailing**:  
    1.  [NVIDIA NeMo Guardrails](https://docs.nvidia.com/nemo-guardrails/index.html) evaluates queries to filter restricted queries and protect enterprise sensitive information.
    2.  The non-sensitive queries are sent to the ReAct Agent which uses another NIM to identify and filter the data sources that should feed into the answer.
3.  **Retrieval System**:  
    1.  Multiple rephrased queries with different facets (e.g., date filters, keywords, user context) are sent to **Glean’s Search APIs**.
    2.  Glean’s APIs retrieve results from its **contextual knowledge graph**, providing highly relevant, real-time and permission-aware content.
    3.  **Snippet Size**: Glean supports up to 25,000-character snippets, ensuring comprehensive retrieval for long or detailed responses.
    4.  **Deduplication**: Results from multiple queries are deduplicated to remove redundant chunks and provide clean outputs.
4.  **Reranking**:  
    1.   [The NeMo Retriever reranking NVIDIA NIM](https://docs.nvidia.com/nim/nemo-retriever/text-reranking/latest/overview.html) microservice prioritizes retrieved content based on relevance and accuracy.
5.  **Answer Generation**:  
    1.  The LLM NIM for customer’s foundational model of choice (in this case, Llama 3.1) synthesizes the final response using the top-ranked content.
    2.  **References**: Answers are enriched with inline citations using the [NeMo Retriever embedding microservice](https://docs.nvidia.com/nim/nemo-retriever/text-embedding/latest/overview.html) to maintain transparency and display material below the complete answer for ease of access.

## Deployment Flexibility

Glean APIs and NVIDIA NIM provide a highly adaptable framework for deploying advanced AI solutions across diverse environments.

-   **Scalable Cloud Deployments:** Both platforms seamlessly integrate with major cloud providers, including AWS and GCP, offering businesses the scalability and resilience needed for enterprise-grade AI workloads.
-   **On-Premises Compatibility:** NVIDIA NIM, as part of the NVIDIA AI Enterprise suite, extends deployment options to on-premises data centers, enabling organizations to leverage optimized infrastructure for sensitive or regulated environments. Glean complements this by connecting securely to on-premise systems, ensuring unified access to enterprise data.
-   **Optimized Performance:** Glean's efficient retrieval mechanisms and NVIDIA's tailored inference engines ensure high throughput and low latency, delivering responsive performance for even the most demanding applications.
-   **Unified Architecture:** Together, Glean and NVIDIA NIM create a robust solution that adapts to cloud-first, hybrid, and specialized on-premises strategies. This enables organizations to deploy cutting-edge AI with confidence.

For more information, visit the [NVIDIA AI Enterprise overview](https://www.nvidia.com/en-us/data-center/products/ai-enterprise/) or explore [Glean's deployment options](https://help.glean.com/en/articles/10093412-glean-deployment-options).

## What Glean APIs Provide

Glean APIs play a critical role in the overall architecture by offering:

-   **Contextual Knowledge Graph**: Glean builds a knowledge graph that indexes structured and unstructured enterprise data, ensuring responses are grounded in reliable and permission-aware information.
-   **Search with Facets**: Glean Search APIs provide advanced filtering capabilities (e.g., date, document type, user context), enabling highly targeted query responses.
-   **Large Snippet Support**: Glean retrieves up to 25,000-character content chunks, which ensures sufficient context for accurate answer generation.
-   **User and Access Context**: Glean integrates user permissions and access controls, ensuring that only authorized content is surfaced in responses.
-   **Query Deduplication**: Redundant results are removed automatically to deliver clean, unique data for downstream processing.
-   **Real-Time Performance**: Glean APIs deliver responses with high throughput and low latency, ensuring smooth user experiences in production environments.

## Why Use Glean and NVIDIA for Customer Support Bots?

-   **Accuracy at Scale**: NVIDIA's RAG-based architecture paired with Glean’s extensive knowledge graph ensures high-quality responses.
-   **Enterprise-Grade AI**: Robust security, access control, and data deduplication align with enterprise needs.
-   **Multimodal Capabilities**: Support for both text and image inputs enhances the bot’s usability.
-   **Seamless Integration**: Glean APIs and NVIDIA NIM inference microservices work together effortlessly.
-   **Private Infrastructure Control**: Organizations can deploy AI models on their own infrastructure, ensuring sensitive company data, prompts, and intellectual property remain secure within their network while maintaining enterprise-grade performance and scalability.

## Getting Started

For more technical documentation, visit:

-   [NVIDIA NIM Deployment Guide](https://docs.nvidia.com/nim/large-language-models/latest/deployment-guide.html)
-   [NVIDIA NeMo Retriever NIM Microservices](https://docs.nvidia.com/nim/large-language-models/latest/deployment-guide.html)[‍](https://github.com/NVIDIA/GenerativeAIExamples/tree/main/community/chat-and-rag-glean)
-   [NVIDIA Generative AI Examples on GitHub](https://github.com/NVIDIA/GenerativeAIExamples/tree/main/community/chat-and-rag-glean)‍
-   [Build an Agentic AI With NVIDIA NIM and Glean](https://developers.glean.com/guides/agents/nvidia-example) on Glean’s Developer Portal

 Ready to build your intelligent support bot? Get started with Glean APIs and NVIDIA NIM today.

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
