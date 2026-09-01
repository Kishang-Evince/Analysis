---
url: "https://www.glean.com/blog/glean-input-token-llm-latency"
canonical: "https://www.glean.com/blog/glean-input-token-llm-latency"
title: "How input token count impacts the latency of AI chat tools"
description: "Veraj Paruthi  | Ever wonder what the impact of input token count is on the responsiveness of AI chat tools? We did—after some testing, here’s what we discovered regarding the correlation between input counts and time to first token."
fetched_at: "2026-09-01T13:26:38.323Z"
---
Last updated Jul 02, 2024.

# How input token count impacts the latency of AI chat tools

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/66840a221b73b7ede8cfb10f_Veraj.webp)

Veraj Paruthi

Engineering



](/authors/veraj-paruthi)

![How input token count impacts the latency of AI chat tools](https://cdn.prod.website-files.com/613513981b0efaf850830620/668408a6f7a34d6db8489cb5_image4-min.webp)

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

Lately, foundational LLM companies have been racing to create LLMs with larger and larger context window sizes. After all, if the user can fit more information into the input window, the better it is, right? And if that’s true, shouldn’t tools like Glean Assistant make use of the entirety of those windows to provide a more powerful and comprehensive experience? 

Curious to know the answer, we conducted a few tests to discover exactly how input token counts impact metrics such as time to first token (TTFT) and chat latency, in addition to their impact on the overall experience for our users.

## What is the correlation between input token counts and TTFT?

The first correlation we wanted to investigate was between the volume of input tokens and time to first token. Before diving into the empirical data, here’s a quick explanation of what we expected to observe. 

Generating the **first** completion token from an LLM at a *high* level consists of tokenizing the incoming prompt, and running the token tensor through the Transformer network—typically called the *initiation* phase. To generate subsequent tokens, the latest token is appended to the prompt and the process is repeated—this is commonly referred to as the *decoding* phase. Tokenizing is generally a linear time operation, but running the initial prompt through the transformer is *not.* In fact, it’s a quadratic time operation. 

Why is this the case? The short answer is, computing [attention scores](https://www.youtube.com/watch?v=eMlx5fFNoYc&ab_channel=3Blue1Brown) within a Transformer involves doing matrix multiplications, and multiplying a matrix of shape (n, p), with another matrix (p, m), involves approximately 2\*m\*n\*p operations. In the case of the of the attention layer, m and n are both equal to the size of the context window, w, meaning the cost of this operation becomes 2\*p\*w^2—a **quadratic** relation. The subtlety here is that the relation is with respect to the context window size, and *not* the number of incoming tokens. 

### Testing the correlation

Below we can see the empirical data of running such an experiment. Here we plot the TTFT P95 for GPT-4 Turbo versus the number of prompt tokens. For each data point, 25 LLM calls were run. 

As a small, yet important aside, these tests were run using Azure’s provisioned throughput unit ([PTU](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/provisioned-throughput)) model deployments. PTUs are a way to obtain reserved processing capacity just for you—unlocking predictable performance and mitigating the latency swings seen via their pay-a-you-go services. This ensures that our data isn't being muddled due to data center loads.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1ca2fb4d7e8eace5fa_66840930acbbbd44b189903b_image3-min.webp)

The plot below zooms into the bottom left corner for better readability. 

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1ca2fb4d7e8eace5f7_6684094c7cca1090b18b8ffd_image2-min%2520\(1\).webp)

Lastly, here is a plot of the average TTFT versus the number of prompt tokens.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1ca2fb4d7e8eace5f4_668409604ca44c00d2b1d0a9_image1-min%2520\(1\).webp)

Key observations here are:  

1.  We immediately notice a **linear** relationship between these two variables – with the number of prompt tokens ranging from 50 to 100,000.
2.  We see that for every additional input token, the P95 TTFT increases by ~0.24ms and the average TTFT increases by ~0.20ms.

The next question to ask is, why was the correlation linear? This likely has to do with the fact that the Transformers mask all the unpopulated values in the context window vector with zeros, allowing GPUs to skip large portions of the matrix multiplication. Note here that the relation mentioned earlier was with respect to the context window size. 

Many sources online state that reducing the number of input tokens does result in lower latency, but this is usually not a significant factor. In fact [Open AI states](https://platform.openai.com/docs/guides/latency-optimization/3-use-fewer-input-tokens) that “cutting 50% of your prompt may only result in a 1-5% latency improvement.” I suspect the latency improvements mentioned here and elsewhere are E2E latency and *not* TTFT. This seems to line up with the numbers as well. 

Finally, I’d like to emphasize that 0.24ms might seem like a negligible amount, but the data illustrates that splitting a complicated 3000 token prompt into three parallel 1000 token prompts, results in a reduction in the TTFT by 480 ms – a sizable drop in user perceived latency. 

### Improving Glean for the better

We’ll keep these results in mind as we continue to build and improve Glean Assistant to deliver a better, speedier service for our users. If you’re interested in learning more about topics like speeding up embedding calls, or the correlation between latency and output tokens, stay turned for new blogs coming up in the near future! 

Looking to learn more about Glean? Get a free demo today—or check out our [careers](https://www.glean.com/careers) page if you’re interested in helping us build the future of enterprise AI yourself!

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
