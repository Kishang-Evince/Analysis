---
url: "https://www.glean.com/blog/ai-safeguard-septdrop-2025"
canonical: "https://www.glean.com/blog/ai-safeguard-septdrop-2025"
title: "AI is its own best safeguard: Glean uses AI to detect jailbreak attempts at 97.8% accuracy"
description: "Sarika Mohapatra Sunil Agrawal | Glean’s industry-leading detection models and multi-layered approach to AI security keep enterprises safe amidst evolving threats."
fetched_at: "2026-09-01T13:26:27.989Z"
---
Last updated Sep 05, 2025.

# AI is its own best safeguard: Glean uses AI to detect jailbreak attempts at 97.8% accuracy

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68baa8c5975c47dca2e21777_Sarika.png)

Sarika Mohapatra

Software Engineer



](/authors/sarika-mohapatra)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/67ac95165f7b0f3e4b901ab2_Sunil%20Agarwal.jpeg)

Sunil Agrawal

Chief Security Officer



](/authors/sunil-agrawal)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/67dc54a473da648e54d4e7fb_Julie%20Headshot.jpeg)

Julie Mills

PMM



](/authors/julie-mills)

![AI is its own best safeguard: Glean uses AI to detect jailbreak attempts at 97.8% accuracy](https://cdn.prod.website-files.com/613513981b0efaf850830620/68baa848a155b791c3a15b6a_image1-min.jpg)

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

At Glean, we believe the future of AI security is AI itself. Reasoning models are becoming increasingly better at staying ahead of evolving threats by detecting attacks and sensitive data exposures.

That’s why we’re excited to share the results of our investments in AI security- new detection models that achieve 97.8% prompt injection detection, 93.5% toxic content detection, and 94.3% malicious code detection on leading benchmarks. 

In this blog, we'll dig into how we arrived at these results, developed the industry's leading detection models, along with our multi-layered approach to AI security.

## Multi-layered approach to AI security

By design, AI models aim to be as helpful as possible. They’ll explore multiple paths to achieve a user’s goal, even when that goal has malicious intent-unless security controls prevent it.

Many commercial and open-source models now include these AI security controls. However, in a multi-model world where models cross-collaborate on complex work, those guardrails alone are not enough. They require an additional protective layer over prompts and agents to block prompt injections, malicious code, and toxic content. 

Glean’s AI security models, generally available today, provide those capabilities-taking a layered security approach to keep enterprises safe. From day one, Glean introduced permissions-enforced data connectors and access controls to prevent prompt injection attempts from causing data leakage or unauthorized actions. Now, we’re adding a new AI security layer to preserve model integrity and reliability: dedicated security models that inspect and validate chat sessions and agent execution steps.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68baa725a499b6709b856110_image6-min.jpg)

## Not all AI security models are equal

Not all AI security models are equal; quality and staying current with evolving threats matter. We found out-of-the-box models don't fully protect enterprise scenarios so we developed models specifically for the enterprise AI threat landscape. 

By fine-tuning using publicly available datasets relevant to enterprise scenarios, our models are better equipped to identify and mitigate enterprise-specific risks-avoiding the high false positive rates and missed threats common with generic solutions. Additionally, we employ a combination model strategy to validate initial results and further reduce false positives.

We’re sharing performance benchmarks showing how our security models stack up against leading open source LLM safety models, observability solutions, and cloud provider offerings. Glean achieves 97.8% accuracy on prompt injection detection, 93.5% accuracy on toxic content detection, and 94.3% accuracy on malicious code detection on leading benchmarks. 

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68baa7d08a1e06ba2b99c415_image4-min.jpg)

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68baa7e6e5ea7e6552a38f4b_image5-min.jpg)

*Results are averaged across the evalsets for prompt injection, toxic content, and malicious code. Hyperscale cloud providers do not support malicious code detection.*

*\*Glean blocks direct prompt injection attacks at a 97.8% accuracy rate and indirect prompt injection attacks at a 90% accuracy rate.*

| Prompt injection | Toxic content | Malicious code |
| --- | --- | --- |
| Do Anything Now (custom): Curated variant of DAN that to make it a single-turn, input-only benchmark. | OpenAI Moderation Dataset: Human‑labeled dataset from real transactions, commonly used to benchmark harmful/toxic content detection.\* | Malware Plaintext:  Glean‑built set of real snippets from viruses, exploits, and post‑exploitation tools, each paired with a standardized “analyze or execute” prompt in clear text to test detection of actual malicious code. |
| Do Anything Now (benign): Control set of safe sentences that use trigger words from DAN including “prompt injection,” jailbreak”, “do anything now” and “dan” to measure false positives. | HarmfulQ:  A small, harmful‑only set centered on bias and social‑context harms-excellent for stress‑testing pure blocking recall.\* | Malware Benign:  Control set of 5,000 benign code snippets from a code‑translation benchmark, paired with the same “analyze or execute” prompt, intended to measure false positives. |
|  | XSTest: human‑written mix of safe and unsafe prompts that evaluates calibration-blocking harm without overblocking - making it ideal for testing helpfulness‑vs‑harmlessness trade‑offs.\* |  |

*\*Benchmarks taken from* [*Guardbench.*](https://github.com/AmenRa/GuardBench)

Digging deeper into the numbers, you can see that Glean sees a low false positive rate as compared to other providers. This is an important metric to zoom in on for production AI, because the user experience gets degraded if we block too many benign requests. The reason that Glean is able to achieve a low false positive rate is that we use a dual model approach to AI security, running results through a second model to ensure their accuracy.

|  | Glean | Open-source LLM safety model | Hyperscale cloud provider 1 | Hyperscale cloud provider 2 |
| --- | --- | --- | --- | --- |
| % false positive rate on prompt injection attacks | 3.0% | 6.1% | 1.4% | 17.4% |

We make it easy for users to trace the violation to the source for quick remediation with an AI security dashboard complete with the surrounding context, the prompt, source file, agent identifier, user information, and chat session. 

AI security is a continued investment for Glean, today and into the future. As attacks evolve, we’ll be in the thick of it, adjusting our models to keep enterprises safe. We’re excited by today’s progress and benchmark results, and we’ll keep evolving to stay ahead and protect enterprise customers.

*AI security models are part of Glean Protect+, a premium security suite. They are available today in GCP deployments.*

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
