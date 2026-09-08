**Glean Tier 3 Advanced Evaluation**  
**Performance Under Load**

*Section 4.10.1, "Performance Under Load" \- the least-verified functional area in the entire evaluation, re-checked for any available signal*

| Confidence Score | Verification Status | Source Basis |
| :---- | :---- | :---- |
| **30 / 100** | Partially Verified (scale reference \+ vendor admission of gap) | Glean's own blog, a named customer story, third-party comparison |

*This remains the single least-verified functional area in the entire evaluation \- but this pass turned up more useful signal than a flat "nothing found," including a genuinely notable first-party admission.*

# **1\. Glean's Own Admission: "We Didn't Measure Latency or Cost"**

*"...we didn't measure latency or cost, as every tool call is an expense."*

*Source: Glean's own blog, "Not all enterprise context is created equal" (Feb 12, 2026\)*

This blog post is Glean's own published evaluation comparing itself against ChatGPT and Claude on enterprise search accuracy \- and it found Glean's answers preferred roughly 2x more than ChatGPT and 1.6x more than Claude. That's a genuine, first-party quality benchmark. But it is explicitly NOT a performance benchmark: the same post states plainly that latency and cost were not measured. This is a stronger signal than a third party simply failing to find a benchmark \- it's the vendor itself confirming this gap exists, even in their own most rigorous public evaluation to date.

# **2\. The Best Available Scale Reference: Booking.com, 14,000 Employees**

*"Booking.com scales AI across 14,000 employees with Glean. Glean became Booking.com's first AI platform adopted company-wide..."*

*Source: glean.com (customer stories)*

This is the largest confirmed real-world scale reference found in this entire research pass. It's genuinely useful as a proof point that the platform functions at a meaningful employee count in production \- but it says nothing about query latency, concurrent-user ceilings, or document-volume limits. "It works at 14,000 employees" and "it performs well under load at 14,000 employees" are two different claims, and only the first is actually supported here.

# **3\. A Specific, Plausible Technical Trade-Off (Third-Party)**

*"Query latency is where you'll feel the difference. Complex queries across many systems feel slower than indexed alternatives."*

*Source: domo.com/learn/article/glean-alternatives (third-party)*

Unlike most unsubstantiated marketing claims tracked elsewhere in this evaluation, this one has a genuinely plausible technical mechanism behind it: Glean's architecture combines pre-indexed content with real-time/federated lookups (e.g., "Live Mode" for some connectors, which fetches at query time rather than on a batch schedule). Fetching fresh data live is inherently slower than reading from a pre-built index \- so a complex query touching several federated systems would plausibly be slower than a purely indexed competitor. This is a real architectural trade-off (freshness vs. speed), not a random unsupported claim \- though it still wasn't independently measured.

# **4\. What's Still Completely Unverified**

| Metric | Status |
| :---- | :---- |
| **Query Latency (p50/p95/p99)** | No published figures from Glean or any independent third party. |
| **Throughput (queries/sec, platform-wide)** | Only the 30 qpm per-endpoint rate limit is documented \- that describes allowed client request volume, not platform capacity. |
| **Concurrent-user ceiling** | Not documented anywhere. |
| **Millions-of-documents indexing benchmark** | Not documented anywhere \- "petabytes of enterprise data" is marketing language from a third-party comparison, not a Glean-published figure. |
| **Horizontal scaling approach** | Only referenced generally via a dated 2023 AWS architecture blog \- may not reflect the current stack. |

# **What Was Hands-On Tested (Not Load, But Adjacent)**

The only piece of this puzzle validated hands-on in this research is the documented API rate limit itself: a 30 queries-per-minute token-bucket limit that behaves exactly as documented, including 429 responses and backoff timing. This confirms the client-side request ceiling is real and enforced correctly \- but it is a rate limit, not a performance benchmark, and says nothing about how the platform behaves at scale.

# **Enterprise Impact**

**14,000 employees at Booking.com is a reasonable proof that Glean functions at meaningful scale in production, but it provides no basis for estimating latency or throughput at a different organization's scale, query volume, or connector mix. Combined with Glean's own admission that latency wasn't measured even in their most rigorous public evaluation, this remains the single item in the entire evaluation most in need of a direct, hands-on answer before committing to a large deployment. Request a load-test result, a reference-customer call specifically about performance (not just adoption), or run a bounded pilot with realistic query volume before sizing anything beyond a small deployment.**

# **Sources**

\- glean.com/blog/enterprise-search-evaluation-2026 (official, Feb 2026\)

\- glean.com (Booking.com customer story)

\- domo.com/learn/article/glean-alternatives (third-party)

\- developers.glean.com/get-started/rate-limits (official, rate limit documentation)

\- aws.amazon.com/blogs/awsmarketplace (dated 2023 architecture reference)