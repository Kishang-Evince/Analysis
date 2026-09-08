# Field 7: Partner Agreement Status

**Category:** 4.9.8 - Partner & Channel Program  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** Fields 1–6 drafted (Doc-Verified / Vendor-Stated) · Fields 7–8 **Pending internal** (Stratos Edge agreement + portal registration)  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Partner Agreement Status.md](../../../test/Glean/4.9.8 Partner & Channel Program/Partner Agreement Status.md)

---

**Field definition:** Current execution status of the Stratos Edge partnership agreement with Glean.  
**Prerequisites / Licensing:** Stratos legal / BD records.  
**Agreement status (Pending internal):** _TBD — no Stratos Edge Glean partner agreement found in repo_  
**Confidence Level:** **Pending internal**  
**Validation Date:** September 3, 2026  
**Source URLs:** N/A (internal) · Glean requires **legal-approved referral agreement** before referral payouts ([referral program](https://www.glean.com/partners/referral))

### Internal status template

| Milestone | Status | Date | Owner |
|---|---|---|---|
| Initial outreach to Glean channel | Pending | | BD |
| NDA executed | Pending | | Legal |
| Referral agreement signed | Pending | | Legal |
| Commercial / Services agreement signed | Pending | | Legal |
| Partner Portal access granted | Pending | | BD |

### Engineering observation

- Repo uses "Stratos" only as **evaluator / test tenant** label — not as registered Glean partner entity.
- Commercial track likely needs separate agreement beyond referral for implementation margin.

### Verification steps / test case

1. Stratos legal: search for Glean partner agreement, NDA, SOW templates.
2. BD: confirm status with Glean channel contact (Director, Channel Partnerships per portal blog).
3. Update this field when agreement executed — status values: Under Legal Review / Executed / Active / Not Started.

**Risk & Cost Impact:** Risk: **High** (no agreement = no protected deals or referral fees) | Cost: N/A

---
