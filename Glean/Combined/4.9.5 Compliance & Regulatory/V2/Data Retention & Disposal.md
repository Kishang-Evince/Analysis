**Glean Tier 3 Advanced Evaluation**
**Data Retention & Disposal - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09. Field definition: "Controls and policy governing customer data purge limits and post-termination scrubbing." Base file at [`../Data Retention & Disposal.md`](../Data%20Retention%20&%20Disposal.md) left untouched - this is a standalone V2 doc, not an edit of it. **This pass read the actual Terms of Service and DPA PDFs directly, page by page**, continuing the primary-source approach from the HIPAA field.*

**Sr No mapping:** rows 1-9 below map 1:1 to the same Sr No in the companion test guide [test/V2/Data Retention & Disposal.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/Data%20Retention%20&%20Disposal.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

A genuine legal nuance surfaced from reading the actual documents: the **Terms of Service** says post-termination data deletion is **automatic** ("Glean will delete the Customer Data"), while the **DPA** says deletion of the GDPR-scoped "Customer Personal Data" subset is **request-based** ("Upon Customer's written request"). Neither document gives a specific timeframe for the deletion itself. No automated bulk-purge tool was found in the Admin panel - the actual mechanism is a cascade (delete at source, Glean's index follows) plus these two contract-level termination clauses.

## Claims (Sr No 1-9, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The Terms of Service states post-termination Customer Data deletion is automatic - no customer request required | Directly read: `Glean Technologies, Inc. Terms of Service Sep 3 2024 (Online).pdf`, Section 12.3 | Verbatim: *"12.3 Effect of Termination. Upon expiration or termination of any Subscription Term: (i) Glean will delete the Customer Data stored in the Service..."* No conditional "upon request" language - stated as an automatic consequence of termination. |
| 2 | The DPA states deletion of "Customer Personal Data" specifically is request-based, not automatic | Directly read: `Glean Technologies, Inc. DPA Sep 3 2024 (Online).pdf`, Section 7 | Verbatim, in full: *"7. DATA ERASURE. Upon Customer's written request, Glean will return or delete all Customer Personal Data following the termination of the Agreement, unless such Customer Personal Data is required to be maintained by Data Protection Laws, in which case it shall be held in accordance with the terms of this DPA."* |
| 3 | **A genuine nuance worth flagging**: these two clauses use different triggers (automatic vs. request-based) for overlapping-but-distinct data categories ("Customer Data" broadly vs. "Customer Personal Data" specifically) | Direct comparison of claims 1-2 | Not necessarily contradictory - the ToS may govern general deletion while the DPA's more specific mechanism exists for GDPR-driven erasure rights - but a buyer should get explicit written confirmation of which clause governs in practice, especially for the personal-data subset, rather than assuming one automatically supersedes the other. |
| 4 | Neither document states a specific numeric timeframe for how quickly post-termination deletion actually happens | Directly read: both PDFs, full text | Both clauses say Glean *"will delete"* without a stated deadline (e.g. "within 30 days") - a real contrast with the BAA's specific 5/10-business-day windows for PHI-related requests (confirmed in the HIPAA Readiness & BAAs field). This is a genuine, checkable gap. |
| 5 | No automated bulk-purge or retention-scheduling tool was found in the Admin panel | [docs.glean.com/administration/protect/sensitive-findings/about](https://docs.glean.com/administration/protect/sensitive-findings/about) | Checked directly and confirmed absent: this page (the most plausible location for such a tool, under Glean Protect+) covers sensitive-content detection and hiding policies only - *"none of these functions relate to data retention scheduling or bulk deletion capabilities... does not mention any administrative tools for setting retention periods or purging data at scale."* |
| 6 | The actual operative deletion mechanism during an active (non-terminated) relationship is a cascade: deleting data at the source system automatically removes it from Glean's index | Cross-referenced from this project's own HIPAA Readiness & BAAs V2 research (directly read from the Glean Security Standard PDF), not re-derived fresh this pass | *"Glean's data index mirror's a customer's production environment with minimal delay that is configurable by the customer. Once the data is deleted in the production environment, it is securely deleted from servers running Glean software."* This is the day-to-day disposal mechanism; claims 1-2 govern the separate, one-time termination event. |
| 7 | The DPA contains a real, specific breach-notification SLA relevant to the disposal/incident context | Directly read: DPA PDF, Section 4 | Verbatim: Glean *"shall notify Customer without undue delay, but in no event more than seventy-two (72) hours after becoming aware of any Personal Data Breach."* Standard GDPR Article 33 alignment, confirmed as Glean's own specific contractual commitment, not just a general regulatory reference. |
| 8 | Subprocessor changes require 30 days' advance written notice with customer objection rights - relevant governance context around where/how customer data is handled | Directly read: DPA PDF, Section 9 | *"Before appointment of any new Subprocessor, Glean shall notify Customer in writing with at least thirty (30) days' written notice. If Customer does not object... within thirty (30) days... Customer will be deemed as having provided its consent."* Not disposal-specific, but directly relevant to the broader data-handling governance this field sits within. |
| 9 | A "12-month" user-account permanent-deletion figure was found via search summary only - not independently confirmed by direct document reading this pass, and likely lives in the Privacy Policy rather than the Terms of Service | Search-summary only; the full 5-page Terms of Service was read directly this pass and did not contain this specific clause | The claim found via search: *"a user's Glean account will be marked for permanent deletion 12 months from the date their access to the services expires or was terminated."* **Confidence caveat:** since this wasn't located in the directly-read ToS, it most likely sits in the Privacy Policy or another document not fully read this pass - flagged for live re-verification rather than treated as confirmed. |

## Independent read

- Claim 3 is the field's most important nuance - it's exactly the kind of discrepancy a surface-level read (citing only one document) would miss entirely. Reading both primary documents directly, rather than relying on a single search summary, is what surfaced it.
- Claim 5 directly answers this field's own evaluation methodology ("verify availability of automated database purging tools in the admin panel") with a clean, confirmed negative - there isn't one; disposal is contract-driven (claims 1-2) plus the reactive cascade (claim 6).
- Claim 4's timeframe gap is worth a direct written question to Glean's account team - a healthcare buyer with strict post-termination scrubbing requirements should not assume "will delete" means "will delete immediately."
- Claim 9 is deliberately not presented as confirmed - it's flagged honestly as a search-only finding that the direct document read this pass could not corroborate, and the test guide is built to resolve it.

## Confidence

**Doc-Verified, highest tier** for claims 1, 2, 4, 5, 7, 8 - sourced from direct reading of the actual downloaded legal PDFs. **Cross-referenced, not re-derived** for claim 6. **Analytical synthesis** for claim 3 (a direct, defensible comparison of claims 1-2, not a separate citation). **Search-summary only, unconfirmed** for claim 9. Validation date 2026-09-09. Tenant/hands-on verification tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| ToS: post-termination Customer Data deletion | Automatic, no request needed | 1 |
| DPA: Customer Personal Data erasure | Request-based (written request required) | 2 |
| Tension between the two | Real - different triggers for overlapping data categories, needs clarification | 3 |
| Specific deletion timeframe stated? | No, in either document | 4 |
| Automated admin-panel purge tool | Not found | 5 |
| Live-relationship deletion mechanism | Cascade - delete at source, Glean's index follows | 6 |
| Breach notification SLA | 72 hours, DPA-confirmed | 7 |
| Subprocessor change notice | 30 days, with objection rights | 8 |
| "12-month" account deletion figure | Unconfirmed this pass - needs live re-verification | 9 |
