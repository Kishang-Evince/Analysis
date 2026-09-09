**Glean Tier 3 Advanced Evaluation**
**HIPAA Readiness & BAAs — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09. Field definition: "Verification of BAA execution capability, and HIPAA data encryption controls." Base file at [`../HIPAA Readiness & BAAs.md`](../HIPAA%20Readiness%20&%20BAAs.md) left untouched — this is a standalone V2 doc, not an edit of it. **This pass went further than most — the actual BAA and Security Standard PDFs were downloaded and read directly, page by page, not just summarized from search results.***

**Sr No mapping:** rows 1-10 below map 1:1 to the same Sr No in the companion test guide [test/V2/HIPAA Readiness & BAAs.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/HIPAA%20Readiness%20&%20BAAs.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The BAA is genuinely self-service — no sales negotiation required, signed via a public DocuSign link — and contains real, specific, numeric compliance SLAs (5-business-day breach reporting, 5/10-business-day PHI access/amendment windows). But a real discrepancy surfaced: the actual downloadable Security Standard document, read directly, does **not** itself name AES-256/TLS 1.2+ — it uses only generic "industry-standard" encryption language. Those specific standard names come from a different source (docs.glean.com), confirmed independently elsewhere in this research effort — citing the Security Standard PDF as the source for AES-256/TLS 1.2+ specifically would be inaccurate.

## Claims (Sr No 1-10, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The BAA is genuinely self-service, executable via a public DocuSign PowerForm link, with no sales/legal negotiation cycle required | [www.glean.com/legal](https://www.glean.com/legal) → [glean.com/legal/baa](https://www.glean.com/legal/baa) | The legal page links directly to *"Sign BAA"* via a standing DocuSign PowerForm URL. The BAA PDF itself confirms: *"Please note that this version of Glean's BAA is made available for review only. To sign this BAA, please use Glean's DocuSign PowerForm... the signer must verify their identity through email before accessing and signing the PowerForm."* |
| 2 | The publicly-linked BAA PDF (version "v9Apr2026") is explicitly a review-only reference copy — the actual executable document is the separate PowerForm, not the PDF | Directly read: `Glean Technologies- Inc. BAA Apr 9 2026.pdf` (fetched from `assets.glean.com`) | Confirmed via direct reading of the downloaded PDF's final page (quoted in claim 1). This is a meaningful distinction — the PDF is for legal review, the PowerForm is the actual binding signature mechanism, and email identity verification gates access to it. |
| 3 | The BAA contains real, specific, numeric compliance SLAs — not vague "reasonable time" language | Directly read: BAA PDF, Sections 4, 7, 8, 9 | Security Incident reporting: *"without undue delay, but in no event later than five (5) business days."* PHI copy furnishing to Covered Entity: within *"five (5) business days"* of request. PHI amendment completion: within *"ten (10) business days."* Accounting of Disclosures: within *"ten (10) business days."* |
| 4 | On termination, PHI must be returned or destroyed with no retention, and this obligation explicitly flows down to subcontractors | Directly read: BAA PDF, Sections 6, 12.3 | Section 6 (citing 45 C.F.R. §164.502(e)(1)(ii) and §164.608(b)(2)): subcontractors with PHI access must agree in writing to terms *"no less protective... as the terms contained in this BAA."* Section 12.3: on termination, *"Business Associate will not retain any copies... This provision shall also apply to PHI that is in the possession of Business Associate's Subcontractors."* |
| 5 | A separate "Security Standard" legal document confirms two deployment architectures with "virtually identical" security controls between them — directly corroborating the Tenancy Model field's earlier finding, now from a legal document rather than just technical docs | Directly read: `Glean Technologies, Inc. Security Standard Sep 3 2024.pdf` | Verbatim: *"Glean offers two architecture options: 1. Managed Service — Glean software runs in a customer's Google Cloud Platform Project... 2. Hosted solution — This is a standard SaaS solution in which Glean creates a single-tenant environment for each customer's data... For both of the above deployment options, the security controls are virtually identical."* |
| 6 | **Discrepancy found:** this specific Security Standard document does not itself name AES-256, FIPS 140-2, or TLS 1.2+ — it uses only generic language for both at-rest and in-transit encryption | Directly read: Security Standard PDF, Section 3 | Verbatim, in full: *"At rest: Glean uses Internet-industry standard secure encryption methods designed to protect stored Customer Data at rest... In transit: Glean uses Internet-industry-standard secure encryption methods designed to encrypt communications between its servers and the customer browsers, and between its servers... and customer's data source servers."* No AES-256, FIPS 140-2, or TLS version number appears anywhere in this document. (The specific AES-256/TLS 1.2+ figures found elsewhere in this research effort trace to `docs.glean.com` technical pages, not this legal document — the two sources should not be conflated as if one confirms the other's specific numbers.) |
| 7 | SOC 2 Type II report access is explicitly request-based, not self-serve download — consistent with, and now corroborated from a second independent source beyond, the Trust Portal NDA-gating finding in the Certifications Validated field | Directly read: Security Standard PDF, Section 1 | Verbatim, in full: *"SOC2 Type 2 Audit complete — Glean can provide a Soc2 Type 2 report upon request."* |
| 8 | Real, specific internal access-control mechanics for customer data are documented, not just asserted generically | Directly read: Security Standard PDF, "Access controls" and "Data Access Policy" sections | *"Glean engineers do not have default access to customer data. Instead, they are granted access, under management oversight, only when approved by the customer."* Access reviewed *"no less than quarterly."* User IDs must be *"unique"* with *"no shared or group User IDs."* Employee access to production/corporate environments requires *"strong passwords, passphrase protected SSH keys, two-factor authentication, and OTP tokens."* |
| 9 | A specific, real data-retention/Right-to-Erasure mechanism is documented: deleting data in the customer's production environment automatically cascades to Glean's own index copies | Directly read: Security Standard PDF, "Data Retention Policy" section | Verbatim: *"Glean's data index mirror's a customer's production environment with minimal delay that is configurable by the customer. Once the data is deleted in the production environment, it is securely deleted from servers running Glean software... simply delete the data on production environments and Glean will automatically handle deleting any copies of that data."* |
| 10 | A third, similarly-named-but-unrelated company ("Gleanin," gleanin.com) also surfaced during this research — the same company-confusion caution already flagged for "Glean.ai" in the Certifications Validated field applies here too | Search result observed this pass, not independently investigated further | *"Information Security Policy | Gleanin"* appeared in search results alongside legitimate glean.com sources. Not deeply investigated this pass (lower relevance to HIPAA/BAA specifically), but flagged as a second reminder that name-similar companies exist and must be checked by domain before citing. |

## Independent read

- Claims 1-4 make this one of the strongest-evidenced fields in this entire research effort — actual primary legal-document text, not paraphrase, with real numeric SLAs a healthcare buyer can hold Glean to contractually.
- Claim 6 is the most important accuracy catch: it would have been easy to assume the Security Standard document is where the AES-256/TLS 1.2+ claims come from (they're topically adjacent), but directly reading it confirms it does not contain those specific terms. The correct citation for those specific standards remains the `docs.glean.com` technical pages already used elsewhere in this project — this document should be cited only for what it actually says.
- Claim 5 is a valuable cross-confirmation: the Tenancy Model field's "single-tenant" finding was previously sourced only from technical documentation — now a legal document independently says the same thing, in nearly identical language, which is meaningfully stronger evidence than either source alone.
- Note the version-date gap: the BAA reviewed is dated April 2026, while the Security Standard is dated September 2024 — roughly 19 months older. It's worth confirming in tenant testing whether a more recent Security Standard version exists that better matches the BAA's currency.

## Confidence

**Doc-Verified, highest tier** for claims 1-9 — sourced from direct reading of the actual downloaded legal PDFs, not search summaries or paraphrase. **Observed but not independently investigated** for claim 10. Validation date 2026-09-09. Tenant/hands-on verification (an actual test signature and a direct question about the Security Standard's currency) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| BAA execution | Self-service via public DocuSign PowerForm, no negotiation required | 1 |
| BAA PDF vs. PowerForm | PDF is review-only; PowerForm is the actual signing mechanism | 2 |
| Numeric compliance SLAs | 5 business days (breach report, PHI access), 10 business days (amendment, disclosure accounting) | 3 |
| Subcontractor PHI obligations | Flow down contractually; no retention post-termination | 4 |
| Single-tenant confirmation | Corroborated in a legal document, matching prior technical-doc finding | 5 |
| Encryption standard naming | Security Standard uses generic language only — AES-256/TLS 1.2+ come from a different source | 6 |
| SOC 2 report access | Request-based, not self-serve — second independent confirmation | 7 |
| Internal access controls | No default engineer access; quarterly reviews; unique IDs; MFA/SSH/OTP | 8 |
| Data deletion cascade | Production deletion auto-triggers index-copy deletion, customer-configurable delay | 9 |
| Additional name-confusion risk | "Gleanin" also surfaced — same caution as Glean.ai | 10 |
