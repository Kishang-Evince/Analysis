**Glean Tier 3 Advanced Evaluation**
**Access Control Granularity — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`. Field definition: "Ability to restrict access down to row, document, or field levels, inheriting source permissions." Base file at [`../Access Control Granularity.md`](../Access%20Control%20Granularity.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Access Control Granularity.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/Access%20Control%20Granularity.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The field's own definition names three granularity levels — row, document, field — and the honest answer splits sharply between them. **Row/document-level** permission inheritance is comprehensive and well-documented (Salesforce's full sharing-construct stack is mirrored). **Field-level** is explicitly, currently **not enforced** — a direct vendor admission: *"Today, FLS is not enforced at query time"* — meaning field-restricted content can leak into Glean search/AI answers for any user who has record-level access, unless an admin proactively excludes those fields from indexing.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean mirrors Salesforce's full record-level (row-level) sharing-construct stack, not a simplified subset | [docs.glean.com/connectors/native/salesforce/about](https://docs.glean.com/connectors/native/salesforce/about) | Verbatim: Glean respects *"all Salesforce sharing constructs"* — specifically *"profiles, permission sets, role hierarchy, share records, org-wide defaults, and Enterprise Territory Management"* — when computing record-level access control lists. This is comprehensive row-level inheritance. |
| 2 | **The field's central finding**: Salesforce Field-Level Security (FLS) is explicitly, currently not enforced at query time — a direct, dated vendor admission of a real gap | [docs.glean.com/connectors/native/salesforce/about](https://docs.glean.com/connectors/native/salesforce/about) | Verbatim, in full: *"Today, FLS is not enforced at query time. Once a field has been indexed for a record, if a user has access to that record through Salesforce sharing, that field's content may appear in search snippets or AI‑generated responses in Glean."* This is a direct admission, not an inference — worded as a current-state limitation ("Today"), implying it may change. |
| 3 | Mitigating this gap requires proactive, manual admin configuration — it is not automatic or default-protected | [docs.glean.com/connectors/native/salesforce/about](https://docs.glean.com/connectors/native/salesforce/about) | Verbatim: *"To mitigate this for highly sensitive fields and objects, Glean recommends: Excluding entire objects from indexing where FLS is used as a primary protection mechanism. Red‑listing or excluding sensitive fields from indexing even when the record itself is indexed."* Two manual admin actions — object exclusion or field red-listing — are the only stated protections; there is no automatic FLS-to-Glean translation. |
| 4 | This is stated as a present, dated limitation ("Today"), not a permanent architectural constraint — worth periodic re-verification | [docs.glean.com/connectors/native/salesforce/about](https://docs.glean.com/connectors/native/salesforce/about) | The specific word choice *"Today, FLS is not enforced"* signals this may be roadmapped for change. A buyer should ask Glean directly whether field-level enforcement is planned, and re-check this page periodically rather than treating the gap as fixed forever. |
| 5 | Row/document-level and field-level granularity are not uniformly supported — the field's own three-way definition (row, document, field) does not get one uniform answer | Synthesis of claims 1-3 | Row/document: strong, comprehensive, automatic. Field: explicitly not automatic, requires manual admin mitigation. A flat "yes, Glean supports granular access control" answer would materially overstate the field-level half of this capability. |
| 6 | Even row/document-level permission enforcement is not instantaneous — dynamic enforcement has real-world latency, cross-referenced from this project's own prior connector research | Cross-referenced from this project's own Native Connectors V2 research, not re-derived fresh this pass | Refresh/crawl rates vary by connector, from `<5m` (webhook-driven, e.g. Jira, Slack) to `1h`+ (e.g. Teams, Zoom) — a permission change at the source doesn't instantly propagate to Glean's index; there is a real, connector-dependent lag before newly-restricted (or newly-granted) content is correctly reflected in search results. |
| 7 | It is not confirmed whether the same field-level-security gap found for Salesforce applies to other connectors with similarly tiered field-security models (e.g. SharePoint, ServiceNow) — this specific finding is Salesforce-scoped only | Absence checked — no equivalent statement found for other connectors this pass | The FLS admission (claims 2-3) was found specifically on the Salesforce connector's own documentation page. No parallel statement was found (or specifically searched exhaustively) for other connectors this pass — a buyer relying on field-level security in a different source system should ask Glean directly whether the same caveat applies there, rather than assuming it's Salesforce-specific or universal. |

## Independent read

- Claim 2 is one of the most consequential findings across this entire research effort for a healthcare/compliance-focused evaluation — it is a direct, named, current-state gap in exactly the capability this field asks about, stated by the vendor itself rather than inferred.
- Claim 3's two mitigations (object exclusion, field red-listing) are real and actionable, but both require the customer's admin team to already know which fields are FLS-sensitive and proactively configure Glean accordingly — this is a burden-shifted control, not a default-safe one. A tenant that indexes Salesforce without doing this exclusion work is exposed to the gap in claim 2 by default.
- Claim 7 is an important scope boundary — this finding should not be generalized to "Glean never enforces field-level security anywhere" without direct confirmation for the specific connector a buyer cares about.

## Confidence

**Doc-Verified, highest tier** for claims 1-4 (direct, verbatim vendor admission, not inferred). **Analytical synthesis** for claim 5. **Cross-referenced** for claim 6. **Absence explicitly flagged as unconfirmed, not assumed** for claim 7. Validation date 2026-09-09. Tenant/hands-on verification tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Row/document-level (Salesforce record) inheritance | Comprehensive — all major sharing constructs mirrored | 1 |
| Field-level security (Salesforce FLS) enforcement | **Not enforced at query time** — direct vendor admission | 2 |
| Mitigation available? | Yes, but manual/proactive only (object/field exclusion) | 3 |
| Is this permanent? | Framed as current-state ("Today") — re-check periodically | 4 |
| Uniform answer across row/document/field? | No — splits sharply, field-level is the weak point | 5 |
| Permission-change propagation speed | Connector-dependent, not instant (<5min to 1h+) | 6 |
| Does the FLS gap apply beyond Salesforce? | Unconfirmed — Salesforce-specific finding only | 7 |
