---
url: "https://www.glean.com/perspectives/key-questions-to-evaluate-vendor-retrieval-systems-for-quality-context"
canonical: "https://www.glean.com/perspectives/key-questions-to-evaluate-vendor-retrieval-systems-for-quality-context"
title: "Key questions to evaluate vendor retrieval systems for quality context"
description: "The Glean Team | Key questions to evaluate vendor retrieval systems: accuracy metrics, relevance scoring, context preservation, scalability, and integration capacity."
fetched_at: "2026-09-01T13:27:59.480Z"
---
Last updated Jul 14, 2026.

# Key questions to evaluate vendor retrieval systems for quality context

0

minutes read

![Key questions to evaluate vendor retrieval systems for quality context](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

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

# Key Questions to Evaluate Vendor Retrieval Systems for Quality Context

Evaluating vendor retrieval systems starts with one test: whether the system returns the right evidence for the question you asked or floods the prompt with everything that looks vaguely related.

Most vendor demos showcase polished AI-generated answers. But a fluent response can mask weak retrieval. If the system pulled 40 loosely related chunks instead of the 5 that actually matter, the answer might read well while missing the point entirely.

The difference between a [retrieval augmented generation](https://www.glean.com/blog/retrieval-augmented-generation-rag-the-key-to-enabling-generative-ai-for-the-enterprise) system that works and one that frustrates users comes down to signal-per-token: how much of the context window carries real evidence versus noise. The sections below walk through specific criteria, scorecards, and persona-based tests you can use to separate strong retrieval from expensive guessing.

## How to evaluate vendor retrieval systems for quality context

Start your evaluation with live queries, not slide decks. Ask each vendor to run real questions from your environment across internal policies, project documentation, support tickets, Slack threads, and engineering specs. Canned demos use curated data and pre-tuned prompts. Your data is messy, multi-format, and permissioned differently across teams.

That gap between demo conditions and your real corpus is where most retrieval systems break down.

Score retrieval separately from generation. A well-written answer can hide the fact that the right evidence never appeared in the context window. Ask vendors to show you the retrieved passages before the language model touches them.

If those passages don't contain the answer, the model is either guessing or stitching fragments together. Both are signs of weak retrieval. According to [Barnett et al. (2024)](https://arxiv.org/abs/2401.05856), most failures in retrieval-augmented generation (RAG) stem from retrieval accuracy and ranking, not from model intelligence.

Tell vendors up front what you're testing: whether their system can answer the question behind the query by retrieving less but better, instead of over-fetching noisy context. The "retrieve less, but better" principle means the system returns the smallest set of high-signal, permission-aware sources needed to answer a question well.

Every extra token sent to the language model increases latency and cost, even when irrelevant. Research on [token elimination in retrieval-augmented models](https://arxiv.org/abs/2310.13682) shows that selectively removing non-critical tokens from retrieved passages can reduce decoding time by up to 62% with only a 2% reduction in performance. A vendor whose system consistently retrieves 30 chunks when 4 would suffice is optimizing for recall at the expense of precision. Your users will feel that trade-off in slower, less focused answers.

Use a consistent scorecard across every vendor you test. Track these dimensions for each query:

-   **Relevance of retrieved items:** Do the returned passages directly address the question, or are they tangentially related?
-   **Evidence quality:** Are the passages from authoritative, current sources, or from archived drafts and outdated wikis?
-   **Permission safety:** Does the system enforce access controls before retrieval, not after? Permissions checked downstream of the language model create data leakage risk.
-   **Duplicate rate:** How many retrieved passages repeat the same information in slightly different words? Duplicates waste tokens and dilute signal.
-   **Token count:** How many tokens does the system use per answer? Lower token counts with the same answer quality indicate tighter retrieval.
-   **Latency:** What is the time to first answer? Systems that over-retrieve often show higher latency because they process and rerank larger candidate sets.
-   **Answer support:** Can every claim in the generated answer be traced back to a specific retrieved passage?

Evaluate by persona and task, not just by topic. A sales rep looking for competitive positioning needs different retrieval behavior than an engineer debugging a production incident or an HR partner checking a benefits policy. Even when the underlying information retrieval best practices are shared, the weighting and source prioritization should shift by role.

Run at least 3 to 5 queries per persona to test whether the system adapts retrieval to the user's context and access level. Glean's [Enterprise Graph](https://www.glean.com) handles this by mapping relationships between people, content, and activity across the organization, so retrieval results reflect not just what's relevant to the query but what's relevant to the person asking it.

One concrete example: a support agent asks, "What is our refund policy for enterprise contracts?" A strong retrieval system returns the current refund policy document and the most recent internal update on exceptions. That's two or three passages, tightly scoped.

A weak system returns 15 passages including the consumer refund policy, an archived draft from two years ago, a Slack thread debating policy changes, and a blog post mentioning "refund" in passing. The support agent now has to sift through noise to find the answer, which defeats the purpose of the system entirely.

## 1\. Ask what the system optimizes for and how it defines relevant context

A strong retrieval system optimizes for answerability, not just similarity. The first question to ask any vendor is simple: what does a "good" retrieval result mean in your system? If the answer is "passages closest to the query embedding," you're hearing a description of vector search, not a retrieval strategy.

Strong answers describe trade-offs. The vendor should explain how their system balances precision against recall, freshness against authority, and citation quality against coverage. A retrieval result is only useful if the language model can cite it to answer the user's actual question.

Ask for examples where the system intentionally retrieved fewer items. A vendor confident in their noise reduction will show you a query where returning 3 passages outperformed returning 20. If every answer to "how do you handle weak evidence?" is "we increase top-k," the system treats retrieval as a volume problem instead of a quality problem.

Good retrieval also means the system understands what the user is trying to do, not just what words they typed. A query like "onboarding checklist" from a new hire needs the current HR policy document. The same query from an IT admin needs the provisioning runbook. Relevance depends on the user's role and task.

Red flags at this stage: the vendor can't explain how their retrieval metrics connect to what users actually experience, or they default to "bigger context window" as the fix for every missed answer. A larger window doesn't help when the passages inside it are noise.

Glean's [Enterprise Graph](https://www.glean.com) connects query intent to the user's role, team, and recent activity, so retrieval results reflect what matters to the person asking, not just what matches the words.

## 2\. Ask how the system builds context from your company's knowledge, people, and permissions

Retrieval that only matches text to text misses the signals that make enterprise answers trustworthy. The system needs to weigh source type, document ownership, team relationships, recency, and permissions before a single passage reaches the language model.

Permissions are the non-negotiable starting point. Access controls must be enforced upstream of generation. A recent framework for [enterprise RAG trade-offs](https://www.ijsrtjournal.com/article/a-conceptual-framework-for-enterprise-rag-trade-offs-balancing-democratization-against-security-and-data-pedigree) identifies "permission bypass" via blind semantic similarity as the primary vulnerability when scaling RAG for knowledge democratization, proposing a "Policy-Before-Retrieval" standard as the fix. If a system retrieves a restricted document and then strips it out before the model responds, the content has already entered the pipeline. That creates a data leakage path. Ask the vendor: does your system check permissions before or after retrieval?

Beyond permissions, a retrieval system should understand how people, projects, and documents relate to each other through a [knowledge graph](https://www.glean.com/blog/enterprise-ai-knowledge-graph). When a product manager asks about Q3 launch status, the system should know which project documents are active, which Slack channels are relevant, and which team members own the deliverables. Flat search over isolated chunks can't make those connections.

Ranking should change by user, which requires a robust [permissions structure](https://www.glean.com/blog/secure-generative-ai-for-the-enterprise-requires-the-right-permissions-structure). A sales engineer and a support lead asking the same question about a product integration need different evidence. The sales engineer needs the technical architecture doc and the competitive positioning brief. The support lead needs the troubleshooting guide and the known-issues list. Same query, different retrieval results.

For example, consider "What's the latest on Project Atlas?" An engineering lead should see the sprint retrospective, the architecture decision record, and the open pull request summary. A VP of product should see the milestone tracker, the customer feedback synthesis, and the roadmap alignment doc. If both users get the same 15 chunks, the system isn't using organizational context.

Red flags here: the vendor describes retrieval as "search over chunks" with no mention of how source authority, team proximity, or document recency affect ranking. A system that treats every indexed passage as equally weighted is unlikely to surface the right evidence for the right person.

## 3\. Ask how content is chunked, enriched, and cleaned before retrieval

The quality of retrieval depends on decisions made long before the query arrives. How a system breaks documents into chunks, what metadata it attaches, and how it handles stale or duplicate content all shape what the language model sees.

Different content types need different chunking. A technical specification with nested headings and tables requires structure-aware parsing that preserves section boundaries. A Slack thread needs message-level segmentation that keeps replies grouped with their parent. A spreadsheet needs row-and-column awareness. Applying the same fixed-size chunking to all of these guarantees that some content types lose critical structure.

Metadata stored with each chunk determines whether the retriever can filter and rank effectively. At minimum, every chunk should carry its source application, document owner, last-updated timestamp, document type, section title, and access label. Without this metadata, the retriever has no way to distinguish a current policy from an archived draft or to prioritize a document written by the subject matter expert over a casual comment.

Content hygiene and [data governance](https://www.glean.com/blog/data-gov-product-blog) matter as much as chunking. Enterprises accumulate duplicate documents, outdated policies, conflicting versions, and boilerplate templates. A system that indexes everything without deduplication or staleness detection sends the language model contradictory evidence. Ask the vendor: how does your system handle two versions of the same policy, one current and one from 18 months ago?

[Glean Search](https://www.glean.com/glean-search) processes over 100 different content types through connectors that understand the native structure of each application, preserving table layouts, heading hierarchies, and thread structures instead of flattening everything into uniform text blocks. The system also tracks document freshness and ownership through the Enterprise Graph, so stale content doesn't compete equally with current sources.

One useful test: ask the vendor to show how their system handles a quarterly financial review spreadsheet with merged cells and embedded formulas. If the retriever treats the spreadsheet as a bag of text strings, the numbers and relationships between columns are lost. Structure-aware chunking should preserve the table as a queryable unit.

Red flags at this stage: the vendor focuses on their vector database technology but can't describe a strategy for preserving exact language in tables, lists, or structured documents. Vector embeddings capture meaning, but they don't preserve formatting, and formatting often carries the answer.

## 4\. Ask how the system ranks, reranks, and limits what reaches the model

After initial retrieval, the real work begins: deciding which passages are worth sending to the language model and which are noise. A system that retrieves 50 candidates and passes all 50 into the prompt is wasting tokens and diluting the signal that matters.

[Hybrid retrieval](https://www.glean.com/blog/hybrid-vs-rag-vector) combining dense and sparse signals is table stakes. Dense retrieval (vector embeddings) captures semantic meaning. Sparse retrieval (keyword matching) captures exact terms, acronyms, project identifiers, and ticket numbers. Enterprise queries are full of these. A developer searching for "PROJ-4782 timeout error" needs the system to match that identifier exactly, not return every document about timeouts.

A reranking layer after initial retrieval reads each query-candidate pair together and scores relevance more precisely than vector distance alone. Recent research on [agentic retrieval systems](https://arxiv.org/html/2605.05538v1) shows that iterative, tool-augmented retrieval can achieve 49.6% recall@1 - a 21.8 percentage point improvement over the best embedding baselines - by letting the model decide what to search for and when enough evidence has been gathered. Ask the vendor whether their reranker runs a cross-encoder or equivalent model that compares the query against each passage. Reranking is often the single biggest lever for improving answer grounding while reducing what reaches the prompt.

Query rewriting and decomposition should be bounded, and [agentic retrieval](https://www.glean.com/blog/agentic-rag-explained) approaches handle this by letting the model iteratively decide what to search next. Good systems rewrite queries to match indexed terminology. For example, a user asking "how do I expense a flight?" should also match documents titled "travel reimbursement policy." But decomposition of complex questions into sub-queries needs a limit. Unbounded decomposition generates retrieval calls that multiply latency without improving precision.

Top-k should vary by query type. A direct lookup ("what's our parental leave policy?") might need 2 to 3 passages. A synthesis question ("summarize the last quarter's customer churn trends") might need 8 to 10 from different sources. A comparison ("how does our enterprise plan differ from our growth plan?") needs paired evidence. Static top-k is a sign the system hasn't thought about these differences.

Glean applies intent-based retrieval through the [Agentic Engine](https://www.glean.com/agentic-engine), classifying queries by type and adjusting how many passages are retrieved, reranked, and passed to the model. The system also filters near-duplicates, boilerplate, and low-authority passages before the language model sees them.

Red flag: the vendor's answer to "how do you handle missing evidence?" is always "increase k" or "use a bigger context window." More tokens don't fix a relevance problem. They hide it behind longer processing times and higher costs.

## 5\. Ask how they measure quality, token efficiency, and failure modes in production

Retrieval quality isn't something you test once during a proof-of-concept and then trust forever. Production workloads shift. New content gets indexed. User behavior changes. The vendor should show you ongoing measurement, not just evaluation results from before deployment.

Start with retrieval-specific metrics. Precision at k measures whether the top results are actually relevant. Citation hit rate tracks how often generated answers cite a retrieved passage. Answer-supported rate measures how many claims in the response trace back to evidence in the context window. Duplicate rate reveals how much of the context window repeats the same information. Abstention rate shows how often the system declines to answer when evidence is weak. Retrieval latency tracks the time from query to context delivery, separate from generation time.

Passage-level relevance scoring is where most vendors fall short. A [systematic review of 63 enterprise RAG studies](https://www.mdpi.com/2076-3417/16/1/368) found that 80.5% relied on technical metrics like precision and recall, but only 19.5% included human evaluation and just 15.6% measured business impact. Aggregate win rates tell you that "70% of answers were rated good" but don't explain why the other 30% failed. Ask whether the vendor measures contextual relevance at the individual passage level. A system that sends 10 passages where 4 are relevant and 6 are noise looks acceptable in aggregate but wastes 60% of its context window.

Token-level reporting reveals cost and quality in the same view. Ask the vendor: how many tokens are retrieved per query? How many tokens survive filtering and reranking? What happens to answer quality when token volume increases? In many systems, doubling the retrieved tokens does not double answer quality. It flattens or degrades it.

Track time to first answer alongside prompt size. Research into how [input token count impacts latency](https://www.glean.com/blog/glean-input-token-llm-latency) confirms that retrieval volume directly affects response times. If retrieval volume increases and latency stays flat, the system is doing efficient filtering. If latency scales linearly with token count, the system is passing unfiltered context to the model.

Separate retrieval failures from generation failures. When an answer is wrong, was the right evidence never retrieved, or was the evidence there but the model extracted the wrong information? These require different fixes. A vendor that can't distinguish between the two can't systematically improve either.

Glean measures retrieval and generation quality independently using its [AI evaluation pipeline](https://www.glean.com/blog/agentic-reasoning-future-ai), which grades whether the system retrieved the most relevant documents and whether the model extracted the correct information from them. Internal benchmarks show that human evaluators agree with each other 79% of the time, while AI evaluators agree with human ratings 74% of the time, making automated evaluation a reliable production-grade signal.

Red flags: the vendor shows only win rates with no breakdown by use case, role, or source type. They can't tell you what happens to answer quality as token volume changes. They conflate retrieval failures with generation failures.

## 6\. Ask them to prove it on your data, your permissions, and your hardest queries

A live proof on your data is worth more than any roadmap slide. Before signing a contract, build a structured test set from your own environment and ask the vendor to run it end to end.

Include failure-oriented queries. These are the queries that expose retrieval weaknesses, not the ones that make demos look polished. Build your test set with exact identifiers (ticket numbers, project codes), ambiguous acronyms that mean different things across departments, stale policies with newer replacements, cross-document comparisons that require evidence from multiple sources, multi-part questions, and permission-restricted content that some users should see and others should not.

For each test query, ask the vendor to show the full retrieval path. You want to see what the system considered, what it filtered out, what made the final context window, and why. If the vendor can only show you the generated answer without the supporting retrieval trace, you can't evaluate whether the answer is grounded or confabulated.

Pay attention to when the system chooses not to answer. A retrieval system that always produces a response, even when the evidence is thin, is over-generating. The ability to abstain signals that the system can assess its own confidence. Ask the vendor to demonstrate a case where their system declined to answer because the retrieved evidence was insufficient.

Run side-by-side tests where a smaller context window outperforms a larger one. Ask the system to answer the same question using 3 passages and then using 15. If the 3-passage answer is equally accurate and 4 times faster, you have evidence that the system's filtering works. If the 15-passage answer is better, the system may be relying on volume instead of precision.

Score every test query on 5 outcomes: relevance (did the passages address the question?), trustworthiness (are the sources current and authoritative?), permission safety (did the system respect access controls?), latency (how long from query to answer?), and explainability (can you trace the answer back to specific retrieved passages?).

Glean's [permission-aware retrieval](https://www.glean.com) enforces access controls before any content enters the retrieval pipeline. During evaluations, the system shows the full retrieval trace, including which sources were considered, which were filtered, and which contributed to the final answer. That transparency lets you audit the system on your own terms.

Red flags: the vendor avoids running on customer data, sidesteps permission-sensitive test cases, or can't explain how any specific retrieval decision was made.

## Key questions to evaluate vendor retrieval systems for quality context: frequently asked questions

### What specific features should we look for in a retrieval system to ensure it retrieves less but better?

Look for hybrid search (combining dense and sparse retrieval), a dedicated reranking layer that scores passages against the query, intent-based top-k adjustment that varies retrieval volume by query type, and upstream permission enforcement that filters restricted content before it reaches the model.

### How can we assess the quality of context provided by a vendor's retrieval system?

Ask the vendor to show retrieved passages before the language model processes them. Score each passage for direct relevance to the query, source authority, freshness, and whether the final answer can cite it. Run this test on your own data with real user queries, not vendor-curated examples.

### What metrics can we use to evaluate the effectiveness of a retrieval system?

Track precision at k, citation hit rate, answer-supported rate, duplicate rate, abstention rate, tokens retrieved per query, and time to first answer. Measure these at the passage level, not just in aggregate, and separate retrieval quality from generation quality to identify which stage is failing.

### What common pitfalls should we be aware of when assessing retrieval systems?

Watch for vendors who use canned demo data instead of your real corpus, treat "increase top-k" as a universal fix, enforce permissions after retrieval instead of before, conflate retrieval metrics with generation metrics, or show only aggregate win rates without per-query breakdowns by role, source type, or use case.

### How do we ensure that a vendor's system minimizes noise in the retrieved context?

Test with queries designed to surface noise: stale documents with newer replacements, duplicate content across platforms, boilerplate templates, and ambiguous terms with multiple meanings. A system that returns clean context should show deduplication, staleness filtering, and structure-aware chunking that preserves document layout instead of flattening everything into plain text.

The vendors who earn your trust will be the ones who show their retrieval results before their generated answers, run your hardest queries on your own data, and explain what they filtered out along the way. Retrieval quality is the foundation every AI answer depends on, and you deserve to see it working before you sign.

[Request a demo](https://www.glean.com/get-a-demo) to explore how Glean and AI can transform your workplace.

[

Back to Perspectives home

](/perspectives)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

## Recent posts

[

![Glean’s proactive AI suite drives organizational transformation for single and multiplayer work](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8f0b8957e021f85e681e07_Banner%20\(2\).jpg)

August 26, 2026

### Glean’s proactive AI suite drives organizational transformation for single and multiplayer work

Glean introduces proactive AI that anticipates priorities, takes action, and improves how individuals and teams get work done.

![Marisa Huff](https://cdn.prod.website-files.com/613513981b0efaf850830620/6909cff45d623a5c2428374d_Marisa.jpeg)

Marisa Huff

Product Marketing

![Kelly Huang](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a0ae02225a70d46713e5d4f_Kelly%20Huang.webp)

Kelly Huang

Product Marketing Manager

](/blog/proactive-ai-for-enterprises)

No items found.

[

![Glean Agents can now work independently, build faster, and stay governed at scale](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecd5c847f851871aa6214_agents-banner.webp)

August 26, 2026

### Glean Agents can now work independently, build faster, and stay governed at scale

Our latest updates to Glean Agents provide them with the intelligence, governance, and reliability needed to drive and scale real work.

![Anuraag Gupta](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecdd4522f428d26e3d4a5_anurag-gupta.jpeg)

Anuraag Gupta

Product Manager Lead, Agents

](/blog/glean-agents-go-2026)

No items found.

[

![Introducing Glean Transform, your company's mission control for AI transformation](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a95ea719f88eaa3cb10fb33_ai-transform.png)

August 26, 2026

### Introducing Glean Transform, your company's mission control for AI transformation

Glean Transform maps how work gets done, identifies high-impact AI opportunities, and measures automation value after deployment across your entire enterprise.

![Malik Ismail](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecc88202eae656d145868_Malik%20Ismail.jpeg)

Malik Ismail

Head of applied AI

![Haohan Tang](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ef80123c83ebce56b354e_Haohan.jpeg)

Haohan Tang

Software Engineer

](/blog/glean-transform-ai-transformation)

No items found.

[

![Scale AI usage without runaway spend with Glean’s AI usage controls ](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecae4634c80145cdffe88_cost-governance-banner.webp)

August 26, 2026

### Scale AI usage without runaway spend with Glean’s AI usage controls

Glean gives enterprises the visibility and controls they need to expand AI usage confidently while keeping costs predictable

![Kathleen Qin](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecb7bc4d60fcd4d9b63d8_Kathleen%20Qin.jpeg)

Kathleen Qin

Product Manager

](/blog/go-cost-governance-2026)

No items found.

[

![Right-sizing intelligence: Glean saves 81% on token costs and is preferred 78% of the time versus Claude Cowork](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ed201e4b8f1567ff77642_go-benchmark-Banner.webp)

August 26, 2026

### Right-sizing intelligence: Glean saves 81% on token costs and is preferred 78% of the time versus Claude Cowork

A benchmark of 180+ enterprise tasks shows that auto routing, backed by high-quality context, can deliver token cost savings while achieving better performance.

![Matthew Zhao](https://cdn.prod.website-files.com/613513981b0efaf850830620/698cf8afdc94f4c0969da8fa_Matt.png)

Matthew Zhao

Engineering

![Jessica Kwok](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec942d15209655a4308d7_Jess%20Kwok.jpeg)

Jessica Kwok

Product Manager

![Karthik Rajkumar](https://cdn.prod.website-files.com/613513981b0efaf850830620/698cf94bd1b022aaa167835f_Karthik.png)

Karthik Rajkumar

Applied Scientist

](/blog/go-glean-cowork)

No items found.

[

![Celebrating the 2026 Glean Partner Award Winners](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8deebe4a5b39c6e255d913_Glean%20Partner%20Award%20winners.png)

August 25, 2026

### Celebrating the 2026 Glean Partner Award Winners

Meet the 2026 Glean Partner Award winners, recognizing the partners driving transformation, collaboration, delivery excellence, customer impact, innovation, and regional growth with Glean.

![Glean](https://cdn.prod.website-files.com/613513981b0efaf850830620/641443b7208e558a59f93731_glean-author-symbol.jpg)

Glean

](/blog/2026-glean-partner-award-winners)

No items found.

## Work AI that works.

[Get a demo](/get-a-demo)

![CTA BG](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/67a9cf6a0c3b882fc397780c_9bc5d6fcbe55519f7e2590b28a3ddc3e_Home%20-%20Universal%20CTA.webp)
