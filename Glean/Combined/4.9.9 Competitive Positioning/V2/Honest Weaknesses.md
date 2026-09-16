**Glean Tier 3 Advanced Evaluation**
**Honest Weaknesses - Independent Fresh Research (V2)**

*Independent research, checked 2026-09-09. The ten cataloged weaknesses in the base research all trace to this project's own prior hands-on V2 findings (4.9.1, 4.9.4, 4.9.5, 4.9.7) and are reconfirmed by cross-reference, not re-derived from scratch. This pass's actual fresh contribution is pinning down Glean's own marketing language with precise, verbatim, directly-sourced quotes - turning a general "marketing vs. reality" observation into a specific, citable contradiction. Field definition: "Validated system limitations, missing features, and necessary workarounds." Base file at [`../Honest Weaknesses.md`](../Honest%20Weaknesses.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Honest Weaknesses.md](../../../../test/Glean/4.9.9%20Competitive%20Positioning/V2/Honest%20Weaknesses.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The single most important addition this pass is a precise, verbatim source for Glean's own permissions/sync marketing claim - found directly on `glean.com/platform/connectors`, not paraphrased. That claim states permissions are *"strictly enforced"* and updates are *"reflected immediately in results."* This directly and specifically contradicts two of this project's own already-confirmed findings: the Notion connector's real, structural lack of per-user ACL enforcement (4.9.5), and real multi-hour crawl lag for Notion and OneDrive (4.9.4). Having the exact marketing quote alongside the exact contradicting fact makes this field's "honesty check" far more concrete than a paraphrased summary.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean's own platform page makes a strong, unqualified permissions-enforcement claim, found and quoted directly this pass | [glean.com/platform/connectors](https://www.glean.com/platform/connectors) | Verbatim: *"All data permissions are inherited and strictly enforced, so users only see what they're allowed to."* No connector-specific caveat or exception is stated on this page - the claim reads as universal across "275+ apps." |
| 2 | The same page makes an equally strong, unqualified real-time sync claim - also confirmed verbatim this pass | [glean.com/platform/connectors](https://www.glean.com/platform/connectors) | Verbatim: *"Data updates as soon as it changes in the source application - including permissioning rules, which are reflected immediately in results."* |
| 3 | **The field's central, now precisely-sourced contradiction**: claim 1's "strictly enforced" language is directly contradicted by this project's own confirmed finding (4.9.5 Access Control Granularity V2) that Notion's indexed content is explicitly NOT enforced per-user at query time - Glean's own documentation elsewhere admits this exception exists | Cross-referenced from this project's 4.9.5 V2 field, contrasted against claim 1 | The 4.9.5 field directly quoted Glean's own connector documentation admitting *"Today, FLS is not enforced at query time... that field's content may appear in search snippets or AI-generated responses in Glean"* for Salesforce, and a structurally identical gap for Notion (any content shared with the integration is visible to all Glean users regardless of Notion's own sharing settings). This is not a hypothetical edge case - it is a real, admitted exception directly at odds with the platform page's blanket "strictly enforced" language. |
| 4 | Claim 2's "reflected immediately" language is directly contradicted by this project's own confirmed crawl-lag findings for the exact connectors in Stratos's own tenant stack | Cross-referenced from this project's 4.9.4 V2 field, contrasted against claim 2 | Confirmed elsewhere in this project: Notion content refreshes on a multi-hour cycle (not immediate), and OneDrive similarly lags behind real-time. "Reflected immediately" is accurate for some connectors (webhook-driven ones) but is stated as a blanket claim on this page with no per-connector caveat - a real, citable gap between marketing language and documented technical behavior. |
| 5 | "Avoids vendor lock-in" language is real Glean positioning, but was found this pass specifically in job-posting content rather than customer-facing marketing - worth noting as a slightly unusual sourcing location that should be double-checked against actual customer-facing pages before being cited as a customer-facing claim | Search-corroborated - Glean job postings (job-boards.greenhouse.io/gleanwork) | The specific phrasing found - giving organizations infrastructure to govern, scale, and customize AI *"without vendor lock-in"* via *"100+ enterprise SaaS connectors, flexible LLM choice, and robust APIs"* - appeared in recruiting content, not a dedicated customer-facing marketing page. This should be verified against actual sales/marketing materials before being cited as Glean's standing customer promise, since job-posting language is written for a different audience and purpose. |
| 6 | All ten weaknesses in the base research's catalog remain valid on cross-reference - no new weakness was surfaced this pass, and none of the ten should be considered outdated or resolved | Cross-referenced across this project's own 4.9.1, 4.9.4, 4.9.5, 4.9.7 V2 fields | Every item in the base catalog (Notion ACL gap, crawl lag, per-user OAuth friction, pricing opacity, missing content triggers, no air-gap, Protect+ as paid add-on, fragmented audit logging, immature personal-Notion path, no customer fine-tuning) traces to a specific, already-confirmed finding elsewhere in this project. This pass's contribution is precision on the marketing-claim side (claims 1-4), not new weakness discovery - an honest "reconfirmed, nothing changed" status for the catalog itself. |

## Independent read

- Claims 1-4 are this field's real value-add: turning "marketing says X, reality is Y" from a paraphrased summary into a verbatim-quote-versus-verbatim-quote contradiction is a meaningfully stronger, more defensible way to present this to a client - it removes any question of whether the eval team is characterizing Glean's marketing fairly.
- Claim 5's sourcing-location caution matters for citation hygiene: recruiting copy and customer-facing marketing copy are written for different audiences and sometimes make bolder claims than a sales page would - this specific "no lock-in" language should be re-confirmed against Glean's actual customer-facing site before being treated as equivalent to claims 1-2.
- Claim 6's honest "nothing new" is the right call - this field's job in this pass was to sharpen sourcing, not to invent additional weaknesses that don't trace to real evidence.

## Confidence

**Doc-Verified** for claims 1, 2 (direct fresh fetch, verbatim quotes). **Cross-referenced, high confidence, now precisely sourced** for claims 3, 4 (contrasting a fresh direct quote against this project's own prior confirmed findings). **Search-corroborated, sourcing-location caveat** for claim 5. **Cross-referenced** for claim 6. Validation date 2026-09-09. Tenant/hands-on re-verification (the Notion ACL gap test, the OneDrive crawl-lag timing test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| "Strictly enforced" permissions claim | Confirmed verbatim on glean.com/platform/connectors | 1 |
| "Reflected immediately" sync claim | Confirmed verbatim, same page | 2 |
| Permissions claim vs. Notion ACL gap | Direct, now precisely-sourced contradiction | 3 |
| Sync claim vs. Notion/OneDrive crawl lag | Direct, now precisely-sourced contradiction | 4 |
| "No vendor lock-in" claim | Real, but sourced from job postings - verify against customer-facing pages | 5 |
| Ten-item weakness catalog | Reconfirmed via cross-reference; no new items this pass | 6 |
