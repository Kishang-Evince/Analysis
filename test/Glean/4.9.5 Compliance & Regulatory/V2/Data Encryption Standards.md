# 4.9.5 Data Encryption Standards — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Data Encryption Standards.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Encryption%20Standards.md). The core finding there is two-sided: no specific encryption algorithm (AES-256, TLS version) is named anywhere in Glean's public documentation, but a real, first-party BYOK/customer-managed-key confirmation exists — specifically for AWS Customer Hosted deployments, with Glean actively recommending against using it. A separate "customer-managed encryption keys" quote on Glean's marketing blog turned out to be generic industry talk, not a Glean-specific claim — a real correction this guide should help lock in. Written so someone with no prior context on this project can pick it up and run it — entirely document review and account-team questions, no developer access needed.

**Tenant entry:** A normal web browser · your Glean account team (for the specific algorithm names and GCP-CMEK question)
**Companion research doc:** [V2/Data Encryption Standards.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Encryption%20Standards.md)
**Base field doc (untouched, original):** [../Data Encryption Standards.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/Data%20Encryption%20Standards.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A normal web browser.
- Access to your organization's Glean account team, for the rows that need a specific written answer beyond what's publicly documented.
- If your organization is on AWS Customer Hosted: access to whoever manages that AWS account, to confirm the actual key configuration in use.

**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Data Encryption Standards.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Encryption%20Standards.md#claims-sr-no-1-8-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine document read, quick to judge) or `Hard` (needs a written account-team answer, or AWS account access) — so you can plan which rows to tackle first.

---

## Section 1 — Closing the biggest gap: getting the actual encryption algorithm names in writing — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | No public Glean page names a specific encryption algorithm (AES-256) or TLS version — confirm this yourself, then get the real answer directly | 1. Search `docs.glean.com` yourself for "AES," "AES-256," and "TLS 1.2" or "TLS 1.3."<br>2. Confirm you find no genuine Glean-specific match (only unrelated results, if any).<br>3. Ask your Glean account team, in writing: *"Can you confirm the specific encryption standard (e.g. AES-256) used for data at rest, and the specific TLS version used for data in transit? Is either FIPS 140-2 validated?"* | You confirm the public-documentation gap yourself, then get a specific, written answer from your account team closing it for your organization. | | This is the most important row in this guide — a real specification your organization should have on file | ~15 min doc search + ~10 min active/wait for reply, Hard |
| 2 | The Security Standard legal document (from the HIPAA field's research) also only uses generic language — confirm this matches what your organization has on file | 1. Open the Security Standard document your organization has (or the one linked from `glean.com/legal`).<br>2. Confirm the "Data encryption" section uses only generic "industry-standard" language, not a named algorithm. | You confirm the same generic language, consistent with research. | | | ~10 min, Easy |

## Section 2 — Confirming the marketing-blog quote is NOT a Glean-specific BYOK claim — Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | The "customer-managed encryption keys" sentence on Glean's comparative blog post is talking about "enterprise AI platforms" generally, not making a specific claim about Glean's own product | 1. Open `www.glean.com/perspectives/how-claude-stacks-up-against-leading-secure-ai-solutions`.<br>2. Find the sentence about customer-managed encryption keys.<br>3. Read the full surrounding paragraph and confirm whether it's specifically claiming Glean offers this, or describing the category generally. | You confirm the sentence is general framing, not a specific Glean product claim — matching research. | | This prevents a real, easy-to-make citation mistake | ~10 min, Easy |

## Section 3 — Confirming the real AWS BYOK finding, and testing it if applicable — Sr No 4-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Glean genuinely supports customer-managed keys (CMKs) for AWS Customer Hosted deployments, while recommending against using them | 1. Open `docs.glean.com/security/cloud-prem/aws/faq` yourself and confirm the exact CMK language.<br>2. If your organization is on AWS Customer Hosted, ask whoever manages that AWS account whether Glean's KMS keys are currently the default AWS-managed keys or a customer-managed key. | You confirm the documented language, and — if applicable — find out which configuration your organization actually uses today. | | If not on AWS Customer Hosted, mark `Blocked (not applicable)` for the second half | ~15 min, Easy (doc) + optional AWS-account follow-up |
| 5 | Glean's stated reason for recommending against CMK is reducing misconfiguration risk, not vendor convenience | 1. Confirm the exact rationale sentence on the same FAQ page. | You confirm the rationale matches research. | | | ~5 min, Easy |
| 6 | A customer-controlled emergency mechanism (an AWS SCP) exists to halt all KMS key activity if needed | 1. Confirm this specific SCP-based emergency control is documented on the same page.<br>2. If your organization is on AWS Customer Hosted, ask your AWS account manager whether this control has ever been tested/rehearsed. | You confirm the documented mechanism, and — if applicable — find out whether your organization has ever tested it. | | | ~10 min, Easy + optional follow-up |

## Section 4 — Closing the GCP gap, and confirming the Customer-Hosted-only scope — Sr No 7-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | No equivalent GCP customer-managed-key documentation was found — get a direct answer for GCP specifically | 1. Search `docs.glean.com/security/cloud-prem/gcp/` yourself for any CMEK/customer-managed-key page.<br>2. If your organization is on GCP Customer Hosted (or considering it), ask your account team directly: *"Is customer-managed encryption key (CMEK) support available for GCP Customer Hosted deployments, similar to the AWS CMK option?"* | You confirm the public-documentation gap, and get a direct written answer closing it. | | This closes a real, flagged research gap | ~10 min doc search + ~10 min active/wait for reply, Hard |
| 8 | Customer-managed key support is specific to Customer Hosted deployments — not available on the standard "Glean Hosted" SaaS default | 1. If your organization is on standard Glean Hosted (SaaS), ask your account team whether any customer-managed-key option exists for your deployment type at all. | You get a clear confirmation of whether this capability is truly Customer-Hosted-only, or whether some option exists for standard SaaS too. | | | ~10 min active + wait for reply, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Data Encryption Standards.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Encryption%20Standards.md), and specifically record the specific algorithm names from Sr No 1 and the GCP answer from Sr No 7 — those close this field's two biggest gaps.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Specific encryption standard names (closes biggest gap) | 2 | | | | |
| 2. Marketing-blog quote correction confirmed | 1 | | | | |
| 3. AWS BYOK finding confirmed + tested | 3 | | | | |
| 4. GCP gap closed + Customer-Hosted-only scope confirmed | 2 | | | | |
