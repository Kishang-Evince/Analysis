# 4.9.3 Model Hosting Validated - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Model Hosting Validated.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Hosting%20Validated.md). One real documentation gap was flagged there - "where data is stored" and "where model inference actually runs" are answered differently in Glean's own docs, and only the storage question has a clean answer for the standard SaaS path. This guide tries to close that gap through direct observation. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → About Glean (for deployment type) · Admin Console → Platform → Models (for provider setup) · a terminal (for the network-trace tests)
**Companion research doc:** [V2/Model Hosting Validated.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Hosting%20Validated.md)
**Base field doc (untouched, original):** [../Model Hosting Location.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Model%20Hosting%20Location.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console.
- Knowing (or being able to ask your Glean account team) which deployment model your tenant uses: standard "Glean Hosted" (SaaS), or "Customer Hosted" on your own AWS/GCP account.
- If your tenant is Customer Hosted: know which cloud (AWS or GCP) and which region it runs in.
- Basic comfort running one terminal command (`nslookup` or `whois`) - no special software needed, both come built into Mac/Linux/Windows terminals.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Model Hosting Validated.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Hosting%20Validated.md#claims-sr-no-1-7-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine UI clicking, quick to judge) or `Hard` (needs a terminal, account-team contact, or waiting on a written answer) - so you can plan which rows to tackle first.

---

## Section 1 - Where does the standard (non-customer-hosted) service actually run? - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | If your tenant uses the standard "Glean Hosted" plan (not Customer Hosted), your data and model calls run on Glean's own Google Cloud (GCP) infrastructure | 1. Log in as Admin.<br>2. Go to **Admin Console → About Glean** and confirm your deployment type says something like "Glean Hosted" / standard SaaS (not "Customer Hosted").<br>3. If it's Customer Hosted instead, skip to Section 2 - this row doesn't apply to you (mark `Blocked (Customer Hosted tenant)`). | Your tenant is confirmed as standard Glean Hosted, and you accept (per the docs) that this means Google Cloud is the underlying infrastructure. | | | ~5 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | You can independently double-check this GCP claim yourself, without trusting the docs alone, by looking up who owns Glean's published IP addresses | 1. Open **Admin Console → About Glean** and find your **Server instance URL** (looks like `https://<yourcompany>-be.glean.com`).<br>2. In a terminal, run: `nslookup <yourcompany>-be.glean.com` (replace with your real instance URL) to get its IP address.<br>3. Take that IP address and look up who owns it - either run `whois <the-ip-address>` in the terminal, or paste the IP into a public "IP lookup" website in your browser. | The ownership lookup result names **Google** / **Google Cloud** (e.g. "Google LLC") as the network owner - matching the docs' claim independently. | | If a different owner shows up (e.g. Amazon), note that exactly - it may mean your specific tenant is Customer Hosted on AWS instead | ~15 min, Hard (needs terminal comfort with `nslookup`/`whois`) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - If you're on Customer Hosted, does compute really move into your own cloud account? - Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | "Customer Hosted" deployment puts Glean's compute inside your own AWS or GCP account - but you still can't manually patch or modify it yourself, since Glean fully manages it | 1. Confirm your tenant is Customer Hosted (from Sr No 1's check). If not, mark this `Blocked (not a Customer Hosted tenant)`.<br>2. Ask whoever manages your cloud billing/account to confirm Glean's resources appear inside **your own** AWS or GCP account (not a separate Glean-owned account).<br>3. Ask your Glean admin/account team whether you are permitted to directly SSH into or manually patch those resources yourself. | Glean's compute resources are confirmed to live inside your own cloud account (visible on your own cloud bill), but you're told you cannot manually deploy/patch/alter them yourself - Glean remains the operator even though it's on your infrastructure. | | | ~20 min, Hard (needs your cloud billing/account admin's help) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 - For the AWS Bedrock model path specifically, does data stay in one region? - Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | If your tenant uses Amazon Bedrock as a model provider, that Bedrock service runs in the *same* AWS region as your Glean instance - it isn't routed to some unrelated region | 1. Confirm your tenant uses AWS/Bedrock as a model provider (Admin Console → Platform → Models - look for Bedrock/Amazon in the enabled providers list). If not enabled, mark `Blocked (Bedrock not enabled on this tenant)`.<br>2. Find your Glean AWS instance's region (ask your account team if not shown in the console).<br>3. Find which AWS region your Bedrock model access was granted in (this is chosen during setup - check your setup records or ask whoever configured it). | The two regions match (or the Bedrock region is explicitly the "nearest supported" one, per the setup instructions) - confirming co-location, not a mismatch. | | | ~20 min, Hard (needs setup records or account-team input) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 4 - Does your GCP region choice affect the actual hardware running your AI models? - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | If you're on GCP (Customer Hosted), choosing a region outside a short "preferred" list means your AI workloads run on more expensive GPUs instead of cheaper/faster TPUs | 1. Confirm your tenant is GCP-based (Customer Hosted on GCP, or ask your account team which cloud the standard SaaS tenant uses for you specifically).<br>2. Identify your deployment's GCP region.<br>3. Compare it against the 3 "preferred" regions found in research: `us-central1` (Iowa), `asia-east1` (Taiwan), `europe-west4` (Netherlands).<br>4. If you're in a different region, ask your Glean account team to confirm whether your infrastructure costs reflect the "non-preferred/GPU" pricing tier mentioned in their region documentation. | Either you're in one of the 3 preferred regions (TPU-based), or you're in a different region and your account team confirms the higher, non-preferred/GPU cost tier applies to you - matching what the docs describe. | | This is a concrete cost/hardware tradeoff worth surfacing to any client picking a region for data-sovereignty reasons | ~15 min, Hard (needs account-team cost confirmation) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 5 - Is "where my data is stored" the same question as "where my model inference runs"? (closing a real documentation gap) - Sr No 6-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Glean confidently tells you where your data is *stored* (your own tenant/project), but does not clearly tell you where the model *inference compute itself* physically executes for the standard (non-Bedrock) path | 1. Ask your Glean account team directly, in writing: *"Can you confirm the exact region/data-center where model inference compute executes for our tenant - not just where our data is stored?"*<br>2. Compare their answer against what the public docs say (which only commit to a storage-location guarantee, not an inference-location guarantee, for the standard path). | You get either: (a) a clear, specific written answer that closes this gap for your tenant, or (b) confirmation that even your account team can't give a more specific answer than "Glean's cloud environment" - either outcome is useful information to record. | | Whichever answer you get, write it down verbatim - this is the single most valuable finding this test guide can produce | ~10 min active + wait for account-team reply, Hard [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 7 | Glean deliberately doesn't publish exact core-infrastructure region/data-center details in its public docs, and instead tells customers to contact Support for anything more specific | 1. Search `docs.glean.com` yourself for any page listing Glean's own core infrastructure's specific geographic region or data center (not customer-hosted regions - Glean's *own* infrastructure).<br>2. Note whether you find one, or whether every relevant page instead says something like "contact Glean Support" for tenant-specific details. | You either find no such public page (matching the research finding), or you find one and should note exactly which page and what it says (this would update the research finding). | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Model Hosting Validated.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Hosting%20Validated.md), and specifically record whatever answer you got in Sr No 6 - that's the field's real open question.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Standard SaaS hosting on GCP | 2 | | | | |
| 2. Customer Hosted compute location | 1 | | | | |
| 3. Bedrock region co-location | 1 | | | | |
| 4. GCP region hardware impact | 1 | | | | |
| 5. Storage-vs-inference-location gap | 2 | | | | |
