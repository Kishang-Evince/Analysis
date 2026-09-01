---
url: "https://www.glean.com/blog/glean-datastax-integration"
canonical: "https://www.glean.com/blog/glean-datastax-integration"
title: "Glean and DataStax join forces to help developers harness powerful enterprise search"
description: "Cédrick Lunven  | Integrate Glean with DataStax to harness enterprise search and provide a natural language query interface into Astra DB."
fetched_at: "2026-09-01T13:26:37.821Z"
---
Last updated Sep 23, 2024.

# Glean and DataStax join forces to help developers harness powerful enterprise search

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/66f21381ed56b73a8fbbffa4_cedrick_250_2.png)

Cédrick Lunven

DataStax



](/authors/cedrick-lunven)

![Glean and DataStax join forces to help developers harness powerful enterprise search](https://cdn.prod.website-files.com/613513981b0efaf850830620/66f2393d2ad4bd8ba95d5dc9_Q3%20Datastax.webp)

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

Glean and DataStax are pleased to announce a collaboration that will empower developers to build generative AI applications with ease and efficiency. This partnership enables developers to combine these best-in-class tools to harness the power of advanced search capabilities and robust database solutions.

## The DataStax Langflow Glean Component: Enhancing AI-driven workflows

The DataStax Langflow Glean Component is a tool designed to enhance Langflow agent flows. It enables developers to seamlessly integrate the [Glean](https://www.glean.com/) Work AI platform within their [Langflow](https://www.datastax.com/products/langflow) implementations, tapping into Glean's powerful retrieval capabilities to enrich the context of their operations and drive more informed decision-making processes. Users can take advantage of Glean’s native integrations with Google, Slack, and over 100 connectors to the world’s most-used applications. 

For GenAI practitioners using Langflow in their projects, the Glean Search API component represents an exciting new addition to their toolkit. By incorporating Glean into their Langflow implementations, developers can enhance their AI-driven workflows, making them more efficient, context-aware, and capable of delivering superior results. Because Glean can perform an aggregated search across multiple document and data repositories, it opens up new use cases for agentic workflows. 

For example, a Langflow developer could quickly build a flow for a new-hire onboarding agent. The agent could leverage the Search API to query the corporate knowledge base, provide basic information about corporate policies around vacation, and then offer to take further action in the HR system to submit a PTO request. Langflow promotes an iterative development experience where developers can rapidly experiment with different prompts, agent frameworks, LLMs, and connectors.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66f212c16083657a11a22eb4_AD_4nXcc3WyIrB2xMtFs_6PDZmQFfYOyMUECRzcZQYr261spo9qodwxfx06lv-il9so_qcnvviwFoGjTAMl9Eq-tv4PBbW8xan4f1xQpnTs1Ydo5nv37vao9UaE_2l4NIUWmCcvUKjbHLMUvCsBtnVdtdmEJAO1s.png)

## Seamless interoperability: A new era of data utilization

One of the most significant advantages of this partnership is the seamless interoperability it offers between DataStax and Glean solutions. Developers can now easily transfer and use data between the two platforms, whether they're pulling information from [Astra DB](https://www.datastax.com/products/datastax-astra) into Glean for advanced search and insights or integrating Glean's retrieval capabilities into their DataStax workflows. This interoperability streamlines the development process, allowing for more efficient and effective creation of GenAI applications.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66f212c117152bc83a16ab50_AD_4nXfTCZgTSt8L25cep0eOj-SdnYbcHynTYLKbbn5BpxFzZo6fUlmHJ4VowkHqoyLkYaNxM-V02DfrfWrvDLvs9wcXi7FzcqRF68q9dv4qcFoZkihcdk_nAHmEVET4ePgZeVtr7fN92SMRk6jIobDt7D-12cE.png)

## Bridging the gap between data and insights

At DataStax, we’re proud to use Glean daily. With Glean's comprehensive connectors, we integrated and aggregated data from multiple sources, such as Slack, Google Docs, our websites, and our issue management system.

Like most companies, we also have specialized tools, such as middleware with custom settings or even completely custom applications we own. In scenarios where Glean doesn't provide an out-of-the-box connector, we can leverage the Glean Indexing API to create our own data sources.

We first implemented a batch process to push our sales meeting minutes (we call them “TILs”: Things I Learned) into our Glean instance. This enables us to correlate customer and prospect requirements with most of the documents in our information system.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66f212c10d0c7c4c1ccb1b7f_AD_4nXfGPw7_nCMYnpwYkl4asdTDmA6unOpw8AhOM9k4Rzld3ZFjXDV4w1Slola28NKF9p-iKwA9hlbHnzOjK20w9M3YZ_tbmppIsKa0zwoHh0l9783nSTmpcVgu-5sHyJlpcCaqLDI77YQ8moOnYifMXL1eMqGm.png)

*Glean web view showing results coming from our custom source TIL*

## Indexing raw text data from Astra DB

The data you’re interested in may already be structured and stored in Astra DB. For that reason, we wanted to provide Astra DB users with a way to push their information to Glean using the Glean Indexing API. This enables Glean’s Chat assistant to provide a natural language query interface into Astra DB. Here’s an example. Using one of our standard Astra DB [data sets](https://huggingface.co/datasets/datastax/philosopher-quotes), we created a database populated with philosopher quotes. We then indexed this data with the Glean Indexing API and exposed it to our internal Glean users. Anyone could then ask questions against the data set. 

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66f212c1c46f9da58246c87a_AD_4nXeVEcn7WxkMzfNzRs8RKRlB8wSrDFIC-_l6jS6zfnH1qzc4GTk1dxLiKg9rARDCniS5JUwftysWcG0W7p7mJ32PfWMtodG3e7zuWilJ20f6NnW-yRprzgiekfJaUquzEtfRfPGDiPvz5hkbE3d4_P2m14A7.png)

To check the accuracy of the chat assistant’s response we ran a similar query against the collection in Astra DB’s Data Explorer and validated the passage that was returned from Glean Chat. 

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66f212c15a9ca096eaedc379_AD_4nXeWSOucFA9Vm5n5SmqArzFr9mK1nGt54z8VqJXmS087Yvd4q_UYRZuWHK2lSV-ZeffCL7e-r0ZPkXNMHeFtk5g3xCIGzYcGb3AolZ9hWbKCaFrU-vzt53ZjVobLGwvjPEBQjxWIbTDrFlgEI3anzA5NG19T.png)

While it’s more common to use Glean to index and search document repositories, we found that even for more structured data that’s stored in a database like Astra DB, Glean enables more types of users to access database data and ask interesting questions through a simple chat interface. 

You can try this yourself with [Google Colab](https://colab.research.google.com/github/datastaxdevs/mini-demo-astradb-glean/blob/main/AstraDB_Glean_Integration.ipynb). Use this [documentation](https://docs.datastax.com/en/astra-db-serverless/integrations/glean.html) with a notebook and a [standalone script,](https://github.com/datastaxdevs/mini-demo-astradb-glean) to learn how to move your data and use it in Glean Chat.

## Sign up today

Begin exploring how these tools can transform your data-driven projects and elevate your GenAI applications to new heights—register for Astra DB and [Glean](https://www.glean.com/get-a-demo) today.

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
