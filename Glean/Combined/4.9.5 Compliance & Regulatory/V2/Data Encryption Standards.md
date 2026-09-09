**Glean Tier 3 Advanced Evaluation**
**Data Encryption Standards — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 across `docs.glean.com` and `www.glean.com`, plus the Glean Security Standard PDF already directly read in the HIPAA Readiness & BAAs field. Field definition: "Cryptographic standards used to secure data-at-rest and data-in-transit, including BYOK options." Base file at [`../Data Encryption Standards.md`](../Data%20Encryption%20Standards.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-8 below map 1:1 to the same Sr No in the companion test guide [test/V2/Data Encryption Standards.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Encryption%20Standards.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Two real findings pull in opposite directions. **No specific encryption algorithm/standard (AES-256, a TLS version, FIPS 140-2) was found named anywhere across every Glean-domain page and legal document checked this pass** — a repeated, consistent gap, not a one-off miss. But a genuine, first-party **BYOK confirmation was found for AWS Customer Hosted deployments specifically**: Glean does support customer-managed keys there — while actively recommending customers *not* use them. A separately-found "customer-managed encryption keys" quote on Glean's own marketing blog turned out to be generic industry framing, not a claim about Glean's own product — a real correction worth flagging.

## Claims (Sr No 1-8, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | No specific encryption standard name (AES-256, TLS version number, FIPS 140-2) was found on any Glean-domain page checked this pass | Checked directly: [docs.glean.com/security/security-principles](https://docs.glean.com/security/security-principles), [docs.glean.com/security/architecture/data-flow/processing](https://docs.glean.com/security/architecture/data-flow/processing), [docs.glean.com/security/cloud-prem/aws/faq](https://docs.glean.com/security/cloud-prem/aws/faq), plus a dedicated site-wide search for "AES-256" | Every source confirms encryption at rest/in transit exist as a *principle* but none names the specific algorithm or protocol version. The `security-principles` page: *"does not contain technical details about encryption mechanisms or key management features."* Site-wide search for "AES-256" on `docs.glean.com` returned zero genuine hits — the only AES-256 result found was from unrelated AWS documentation, not Glean's own. |
| 2 | This gap is consistent with, and now further corroborates, the HIPAA Readiness & BAAs field's finding that the Security Standard legal document itself uses only generic language | Cross-referenced from this project's own HIPAA Readiness & BAAs V2 research (directly read PDF), not re-derived fresh this pass | *"Glean uses Internet-industry standard secure encryption methods designed to protect stored Customer Data at rest"* / *"...to encrypt communications between its servers and the customer browsers"* — no algorithm or protocol version named there either. Two independent document types (legal PDF, technical docs) now both confirm the same gap. |
| 3 | **A real correction**: a "customer-managed encryption keys" quote found on Glean's marketing blog is generic industry framing, not a specific claim about Glean's own product | [www.glean.com/perspectives/how-claude-stacks-up-against-leading-secure-ai-solutions](https://www.glean.com/perspectives/how-claude-stacks-up-against-leading-secure-ai-solutions) | Full context, verbatim: *"Enterprise AI platforms offer the full range. Customer-managed encryption keys mean the vendor cannot decrypt your data even if compelled by a third party."* This is describing what *"enterprise AI platforms"* broadly offer, as part of a general evaluation framework — **it does not say "Glean offers this."** Citing this sentence as confirmed evidence of Glean's own BYOK capability would be a sourcing error, similar in kind to the earlier ABAC finding from prior research (generic industry concept, not a first-party product claim). |
| 4 | Despite claim 3, a genuine, first-party, Glean-specific BYOK/CMK confirmation *was* found — scoped specifically to AWS Customer Hosted deployments | [docs.glean.com/security/cloud-prem/aws/faq](https://docs.glean.com/security/cloud-prem/aws/faq) | Verbatim: *"Glean does support customer-managed CMKs, however, Glean strongly recommends the use of default AWS Managed KMS keys."* This is the real, checkable answer this field's evaluation methodology asks to verify ("test custom key support") — support exists, with an explicit vendor recommendation against using it. |
| 5 | Glean states a specific reason for recommending against customer-managed keys, not just a bare preference | [docs.glean.com/security/cloud-prem/aws/faq](https://docs.glean.com/security/cloud-prem/aws/faq) | *"Default keys provide strong AWS account level safeguards and eliminates the ability for misconfiguration."* The stated rationale is risk-reduction (avoiding customer misconfiguration), not vendor convenience — a defensible security argument, worth presenting accurately rather than as an unexplained preference. |
| 6 | A specific, real emergency-control mechanism exists tied to encryption keys for AWS Customer Hosted deployments | [docs.glean.com/security/cloud-prem/aws/faq](https://docs.glean.com/security/cloud-prem/aws/faq) | The customer *"at any time, [has] the ability to place an SCP [Service Control Policy] on the Glean AWS account to stop all KMS key activity in the unlikely event of an emergency."* A genuine, specific incident-response lever the customer controls directly, not something requiring a Glean support request. |
| 7 | No equivalent GCP-side customer-managed-key confirmation was found — this is an AWS-only confirmed finding, and GCP's status is a real, open gap | Absence checked across extensive search of `docs.glean.com/security/cloud-prem/gcp/` area | Multiple targeted searches for a GCP CMEK/customer-managed-key page returned no Glean-specific result — only generic Google Cloud KMS documentation. This should not be assumed to mean GCP lacks the capability; it means the public documentation doesn't confirm it either way, and needs a direct question to close. |
| 8 | The confirmed BYOK/CMK capability (claim 4) is scoped to Customer Hosted deployments only — no evidence was found of an equivalent option for the standard "Glean Hosted" SaaS default | Absence checked, consistent with this project's broader Tenancy Model and Model Hosting Location findings | Every source discussing customer-managed keys does so in the context of the customer's own AWS account (Customer Hosted) — none discuss a comparable option within Glean's own multi-instance GCP estate (standard SaaS). Consistent with the established pattern that the standard SaaS product offers fewer customer-controlled infrastructure levers than Customer Hosted. |

## Independent read

- Claim 3 is the most important finding methodologically — it's a real example of exactly the kind of citation error this V2 research effort exists to catch: a plausible-sounding sentence on the vendor's own domain that, read in full context, is not actually a claim about the vendor's own product.
- Claims 4-6 together give a genuinely useful, nuanced, and positive answer once the correct source is found: BYOK is real for AWS Customer Hosted, comes with a defensible reason to avoid it by default, and pairs with a real customer-controlled emergency kill-switch (the SCP mechanism) — a much richer and more accurate picture than either "yes, BYOK is supported" or "no BYOK evidence found" alone would convey.
- Claim 1's repeated, cross-checked absence of AES-256/TLS-version naming is worth taking seriously as a real documentation gap, not dismissed as a research miss — it was checked across technical docs, a legal PDF, and a dedicated site-wide search, with consistent results each time.

## Confidence

**Doc-Verified** for claims 1, 4, 5, 6, 7, 8 (direct fetches and searches). **Cross-referenced** for claim 2. **Independently verified via full-context reading** for claim 3 (the correction). Validation date 2026-09-09. Tenant/hands-on verification tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Specific encryption algorithm named anywhere? | No — consistent gap across all sources checked | 1-2 |
| "CMEK mentioned on Glean's blog = Glean offers it"? | **No** — that quote is generic industry framing, not a Glean-specific claim | 3 |
| Real, confirmed BYOK/CMK support | Yes — AWS Customer Hosted specifically | 4 |
| Reason given for recommending against CMK | Risk of customer misconfiguration | 5 |
| Emergency KMS control | Customer-placed AWS SCP, stops all KMS activity | 6 |
| GCP equivalent confirmed? | No — open gap, needs direct question | 7 |
| Scope of BYOK support | Customer Hosted only, not standard SaaS | 8 |
