---
url: "https://www.glean.com/blog/glean-kv-caches-llm-latency"
canonical: "https://www.glean.com/blog/glean-kv-caches-llm-latency"
title: "How KV caches impact time to first token for LLMs"
description: "Veraj Paruthi  | For part two of our series on LLM latency, we examined how KV caching impacts time to first token latency and throughput efficiency for calls."
fetched_at: "2026-09-01T13:26:38.443Z"
---
Last updated Jul 23, 2024.

# How KV caches impact time to first token for LLMs

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/66840a221b73b7ede8cfb10f_Veraj.webp)

Veraj Paruthi

Engineering



](/authors/veraj-paruthi)

![How KV caches impact time to first token for LLMs](https://cdn.prod.website-files.com/613513981b0efaf850830620/669fdb1e844e75372ffd999a_image2-min.webp)

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

Welcome back to our series on LLM latency! In our [previous blog](https://www.glean.com/blog/glean-input-token-llm-latency), we took a close look at how input token count impacts the latency of LLM chat tools. In this blog, we’ll explore how KV (key-value) caching impacts time to first token (TTFT) latency and throughput for LLM calls. 

## The impact of KV caches on TTFT

LLMs are autoregressive models, where the generation of the ith token depends on all the tokens generated prior. This means that computing the attention scores for the ith token involves *all the same* operations as done for the i-1th token, plus the additional computations for this latest token. This is a great opportunity to cache.

Caching these values has the following implications:

1.  The initiation phase, which we learned in the [previous blog](https://www.glean.com/blog/glean-input-token-llm-latency) refers to generating the first token, is unaffected by the KV caching strategy since there are no previous steps. This phase now populates the KV cache for subsequent stages.
2.  For the decoding phase we no longer use the whole sequence as input but only the last generated token and the KV cache.

So, how does attention computation scale now? As we discussed in the last blog, computing [attention scores](https://www.youtube.com/watch?v=eMlx5fFNoYc&ab_channel=3Blue1Brown) within a Transformer involves doing matrix multiplications and multiplying a matrix of shape (n, p), with another matrix (p, m), involves approximately 2\*m\*n\*p operations. In the case of the of the attention layer, m and n are both equal to the size of the context window, w, meaning the cost of this operation becomes 2\*p\*w^2-a **quadratic** relation. However, since the query for subsequent generations is now a single token, the computation is **linear** (2\*p\*1^2).

This explains how completions within a *single* LLM call benefit from caching, but if this cache is persisted, it can be used *across* LLM calls. Two *possible* ways this can be taken advantage of are:  

1\. Caching in multi-turn use cases within a single conversation

![Within a single conversation, the chat history is an ever growing string prefix that can be cached across turns!](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1b9b6e6c28cfd4b770_669fda720d35110a2e4b94d5_image1-min.webp)

*Within a single conversation, the chat history is an ever growing string prefix that can be cached across turns!*

2\. Caching across workflows that have similar prefixes

Being able to reuse the KV cache *across* requests should enable TTFT latency wins as well as throughput improvements due to the memory footprint of concurrent requests with a shared prefix.

### Experiment results

Luckily for us, Azure’s KV cache can persist these computations *across* LLM calls. Their [documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/latency#system-level-throughput) states that “the amount of throughput that you can achieve on the endpoint is a factor of the input size, output size, call rate, and cache match rate.” In fact, they suggest “mixing the calls can reduce your cache hit rate as they're both competing for the same space. When possible, it's recommended to have separate deployments for each workload”.

The data of using this cache across requests can be seen below. Each data point was obtained via 25 GPT4 Turbo calls using Azure’s provisioned throughput units (PTU). Cached calls had the *exact* same prompt over the 25 calls. Meanwhile, the uncached runs had the current request time as a prefix in each prompt, invalidating the prefix cache. 

To note here again, in case you missed our [first latency blog](https://www.glean.com/blog/glean-input-token-llm-latency), we used Azure’s PTU model deployments to run these tests. PTUs are a way to obtain reserved processing capacity just for you-unlocking predictable performance and mitigating the latency swings seen via their pay-a-you-go services. This ensures that our data isn't being muddled due to data center loads.

![The plot below zooms into the bottom left corner for better readability. ](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1b9b6e6c28cfd4b76a_669fdabd019df3f792ecebc0_image4-min.webp)

The plot below zooms into the bottom left corner for better readability. 

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/66c44e1b9b6e6c28cfd4b76d_669fdae887bc34b984311107_image3-min.webp)

‍

This shows us that each cached input token saves ~0.15ms, the difference between the two slopes. I’d like to emphasize that 0.15ms might seem like a negligible amount, but the data illustrates that caching 1000 tokens across calls results in a reduction in TTFT by 100 ms!

### Making Glean a better experience 

When it comes to user experiences, we know that even a few milliseconds can make or break a satisfactory session. We’ll keep these results in mind as we continue to build and improve Glean Assistant to deliver a better, speedier service for our users. 

Looking to learn more about Glean? Get a free [demo](https://www.glean.com/get-a-demo) today-or check out our [careers](https://www.glean.com/careers) page if you’re interested in helping us build the future of enterprise AI yourself! 

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
