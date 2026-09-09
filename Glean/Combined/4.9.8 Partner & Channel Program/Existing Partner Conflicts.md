# Field 6: Existing Partner Conflicts

**Category:** 4.9.8 - Partner & Channel Program  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** Fields 1–6 drafted (Doc-Verified / Vendor-Stated) · Fields 7–8 **Pending internal** (Stratos Edge agreement + portal registration)  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Existing Partner Conflicts.md](../../../test/Glean/4.9.8 Partner & Channel Program/Existing Partner Conflicts.md)

---

**Field definition:** Competitive consulting overlaps with other integrators selling the same platform.  
**Prerequisites / Licensing:** Partner Finder search; regional healthcare SI landscape knowledge.  
**Conflict assessment (Doc-Verified / inferred):** **High partner density** - open ecosystem, no published exclusivity; multiple SIs compete per region/vertical.  
**Confidence Level:** **Medium** (density inferable; no conflict policy in public docs)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Partner Finder](https://www.glean.com/partners/partner-finder) · [2026 Partner Award winners](https://www.glean.com/blog/2026-glean-partner-award-winners) · [Partners healthcare vertical](https://www.glean.com/partners)

### Overlap signals

| Signal | Evidence | Stratos implication |
|---|---|---|
| **~84 partners in Finder** | Open ecosystem | Many firms can claim Glean expertise |
| **Award winners: Deloitte, Bain, Caylent, Carahsoft** | 2026 blog | Enterprise + public sector SI overlap |
| **US implementers: AHEAD, Alchemy, Bridge IT, Softcat** | Partner logos + Finder | Regional competition for implementations |
| **Healthcare vertical called out** | Partners page | Healthcare SI density likely |
| **No territory exclusivity published** | Absence in docs | Deal registration = primary protection |
| **Carahsoft public sector concentration** | 2026 award | May compete on gov/healthcare public sector deals |

### Engineering observation (Doc-Verified)

- **Edge Solutions and Consulting** appears in Partner Finder - **not** Stratos Edge; name collision risk only.
- Channel conflict resolution = **deal registration precedence**, not geographic lockout - register early.
- Stratos differentiation: Tier 3 eval methodology (this repo) + tenant-stack depth (Notion/M365) vs generic SI pitch.

### Verification steps / test case

1. Partner Finder: filter US + consulting - count healthcare-capable partners in target states.
2. For active opportunity: check if another partner already registered (Field 3).
3. Ask Glean channel: account conflict policy and co-sell vs compete rules.
4. Document 3–5 direct competitor partners for Stratos battle cards.

**Risk & Cost Impact:** Risk: **High** (crowded SI field) | Cost: Lost deals if late to register

---
