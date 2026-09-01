---
url: "https://www.glean.com/blog/glean-ai-evaluator"
canonical: "https://www.glean.com/blog/glean-ai-evaluator"
title: "Using AI Evaluator to ensure Glean Assistant meets modern enterprise needs"
description: "Megha Jhunjhunwala Riddhima Narravula | Evaluating and monitoring the quality of AI is a complex challenge, especially when done manually. Instead, we've created a cutting-edge, systemic approach that accelerates experiment velocity and helps us better improve Glean Assistant."
fetched_at: "2026-09-01T13:26:36.703Z"
---
Last updated Jun 18, 2024.

# Using AI Evaluator to ensure Glean Assistant meets modern enterprise needs

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/66713af5c3a2e3ae3d243301_Megha.jpeg)

Megha Jhunjhunwala

Engineering



](/authors/megha-jhunjhunwala)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/66713b6eaf38e6a1f897dea4_Riddhima.jpeg)

Riddhima Narravula

Engineering



](/authors/riddhima-narravula)

![Using AI Evaluator to ensure Glean Assistant meets modern enterprise needs](https://cdn.prod.website-files.com/613513981b0efaf850830620/66713a73eb880fee5cc9b078_image2-min%20\(2\)%20\(1\).webp)

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

The Glean Assistant enables knowledge workers to quickly find answers by pairing large language models (LLMs) with enterprise search, via a technique known as Retrieval Augmented Generation (RAG). A major challenge is evaluating the quality of this system at scale while maintaining the privacy of each company's data.

At Glean, we have developed a system called AI Evaluator, which uses LLMs to automatically measure the performance of the Glean Assistant inside each customer's deployment without their data ever being publicly revealed. AI Evaluator enables us to make decisions on proposed improvements to the Glean Assistant and measure our progress over time.

## Challenges evaluating generative AI systems

Evaluating and monitoring the quality of AI assistants is a significant challenge. We evaluate the quality of the Glean search engine using traditional click-based metrics, but this approach does not work with an AI assistant that automatically generates answers from the search results and does not require further user interaction. User feedback provides only a very sparse signal since only a subset of users will provide upvotes & downvotes. This feedback can also be biased, as this behavior changes in correlation to the tenure of each user. 

Until recently, Glean engineers would manually evaluate changes to our system, which was time-consuming and limited in scope to either Glean's own data or inconsistent answers reported by our customers. However, LLMs present a promising solution for automating this evaluation and monitoring of AI assistant responses, a concept currently being explored in both industry and academia. However, we must address several challenges in order to create an effective LLM-based evaluation system:

1.  **Biases**: LLMs can exhibit various biases, including position bias (preference for responses based on their position), verbosity bias (favoring longer responses), and self-enhancement bias (preferring one's own responses).
2.  **Inconsistency in grading**: LLMs are non-deterministic, which causes inconsistent and unreliable grading. 
3.  **Alignment with human grading and end-user experience**: Ensuring the LLM's evaluations match human judgments and user satisfaction is crucial. 

To mitigate these challenges, current research suggests several best practices for building an effective LLM-based evaluation system:  

1.  **Single-answer grading:** Whenever possible, use single-answer grading instead of pairwise comparisons to avoid position bias. 
2.  **Categorical rating over numerical:** Use categorical ratings instead of numerical ones, as they are more interpretable and less prone to variations due to prompt changes. When numerical labels are necessary, a low precision range (e.g., 0-3) is preferred over a high precision range (e.g., 0-100).
3.  **Prompt engineering techniques:** Employ widely accepted prompt engineering techniques such as chain-of-thought reasoning and in-context learning examples to align with human ratings and enhance the quality of the LLM-as-a-judge. 
4.  **Model ensemble**: Use a panel of models to judge LLMs, preventing self-enhancement bias. 

By adhering to these practices, we have created a robust and reliable LLM-based evaluation system that can effectively monitor and improve the performance of our enterprise AI assistant. In the future, we will explore techniques like utilizing an ensemble of models (effectively an “LLM jury”) to mitigate biases such as self-enhancement. 

## Our evaluation approach

The Glean Assistant has two major components:  

-   The retrieval stage utilizes a query planner to determine the set of queries to issue, executes those queries against the Glean enterprise search engine, and obtains a ranked set of potentially relevant documents in a permission-safe way.
-   The generation stage prompts an LLM to reason about which of the retrieved documents are actually relevant to the user's question and then generate an answer that is grounded in those documents.

To ensure the highest quality of our assistant’s performance, we have designed an evaluation system that assesses both the retrieval and generation components separately, following a similar approach to the RAGAS (Retrieval Augmented Generation Assessment) framework. 

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1cb77a8ece1d1b6210_6671391e986cb72c84164553_image5-min%2520\(1\)%2520\(1\).webp)

### Evaluating the retrieval component

On the retrieval front, our evaluation system focuses on determining whether the retrieved documents are relevant to the user’s query. We leverage traditional retrieval metrics and concentrate on the following ones:  

1.  **Context relevance rate:** This metric measures the percentage of retrieved documents relevant to the query. By assessing the relevance of the retrieved context, we can gauge the effectiveness of our retrieval system in identifying and surfacing the most pertinent information.
2.  **Context recall rate:** This metric evaluates the percentage of queries for which the canonical document (i.e., the most authoritative and comprehensive source of information) is successfully retrieved. While context recall is an important metric, automatically evaluating it without access to grounded answers can be challenging, especially in an enterprise context where procuring reference answers may not be scalable.

To address the difficulty in automatically evaluating context recall, we have developed targeted evaluation sets that allow our engineers to iterate and refine the context recall aspect of our system. Here are some examples of how we’ve sourced these evalsets:  

-   Assistant sessions where dissatisfied users ultimately turn to search and refine their queries to find the information they’re looking for
-   Assistant sessions where the queries are similar to offline mined question-answer pairs that we’ve generated from documents in the corpus  
    

Through both of the above approaches, we’re able to directly attribute which document would’ve contained the right context and can then start to diagnose why our system missed retrieving these documents in the first place.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1cb77a8ece1d1b620a_667139610911d98f5f4da082_image3-min%2520\(2\).webp)

Fig. Context Retrieval Dimension

### Evaluating the generation component

On the generation front, our evaluation process focuses on assessing the quality of the final generated response presented to the user. We consider several crucial aspects of the generated answer, including:  

1.  **Answer relevance:** This metric evaluates whether the generated answer is relevant to the user's query. A relevant answer should directly address the key components of the question and provide information pertinent to the user's intent. This is a binary classification of relevant and irrelevant. 
2.  **Answer completeness:** This metric assesses whether the generated answer completely addresses all aspects of the query. A complete answer should cover all relevant details and leave no significant information gaps or unanswered questions. We defined three different options here—complete, incomplete, and no-answer—to capture the different levels of answer completeness. 
3.  **Groundedness:** This metric evaluates whether the generated answer is grounded in factual information and evidence from the retrieved context. A grounded answer should be supported by credible sources and should not contain any unsupported claims or speculative information. We found that in some cases, LLMs can hallucinate, leading to ungrounded answers.  

For the relevance and completeness evaluation, we prompt the LLM to choose one of the defined options, providing few-shot examples to illustrate what different response types look like. We also prompt the LLM to first provide reasoning before choosing a label (chain-of-thought) to improve its adherence to our instructions.

For the groundedness evaluation, the LLM is first asked to generate all the claims made in the generated answer. For each of these claims, it must pick one of the following options: inferable, generic, or ungrounded. “Inferable” means the claim can be inferred from the context, “generic” refers to statements that don’t need backing, and “ungrounded” refers to false or contradictory claims.  The groundedness score is then calculated based on the number of grounded claims relative to the total number of claims.

By combining these evaluation metrics for both the retrieval and generation components, we gain a holistic understanding of our Glean Assistant's overall effectiveness and identify areas for further improvement.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1cb77a8ece1d1b6214_6671399753abc21b4ec5d7a9_image6-min%2520\(1\).webp)

Fig. Answer Relevance Dimension  

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1cb77a8ece1d1b620d_667139b4f8f9278c1b3970ff_image1-min%2520\(1\)%2520\(2\).webp)

Fig. Answer Completeness Dimension  

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1cb77a8ece1d1b6217_667139d26b20d1424790fb74_image4-min%2520\(2\).webp)

Fig. Answer Groundedness Dimension

## Results

To establish a baseline for our LLM-based evaluation system, we collected an internal dataset comprising queries and assistant responses. We tasked multiple team members with rating all queries in this dataset according to the schema described earlier. We used their ratings to compute the inter-rater agreement and found that in only **79%** of the queries, the team chose the same label. This inter-rater agreement can be seen as an upper bound of what we can potentially achieve with an automated evaluation system.

Our current system achieved a human-agreement rate of 74%, meaning that in 74% of the queries, the label assigned by the AI Evaluator matched the human rating. Achieving such a high human-agreement rate is a significant milestone, demonstrating that our system is already closely aligning with human judgment. We believe this is a promising direction for evaluation systems, and the current gap can be further closed with more powerful language models and additional research. 

We also analyzed the correlation between the AI Evaluator predictions and user retention on our AI Assistant product. User retention was defined as the probability that a user would return for their next Assistant session within one weekday. We found that incorporating signals from the AI Evaluator as features to our user retention model improved prediction accuracy by 18.8% over using only the user interaction signals. In particular, we found that receiving No Answers and low groundedness scores were strong predictors of user churn. 

## Conclusion

Aside from our main motivation to proactively monitor Assistant Quality, our LLM-based evaluation system brings value in many other ways. This system enables us to identify the query classes where the Assistant excels and pinpoint areas that need improvement. On the development front, Glean engineers can now increase their experiment velocity by tracking how their changes impact these metrics and iterating on more targeted evaluation sets. For instance, we’ve created “hard” Assistant evaluation sets from queries where we performed poorly on completeness, indicating a failure earlier in our system. This allows our engineers to focus on specific areas that need improvement and enhance the overall quality of the Assistant.

We’ll continue to innovate and improve our AI Evaluator system moving forward, driving further enhancements and ensuring that our AI Assistant meets the evolving needs of modern enterprises. If you're interested in helping us build advanced applications of LLMs, please check out the [open roles](https://www.glean.com/careers) at Glean!

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
