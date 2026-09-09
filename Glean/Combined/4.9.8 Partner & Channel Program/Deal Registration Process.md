# Field 3: Deal Registration Process

**Category:** 4.9.8 - Partner & Channel Program  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** Fields 1–6 drafted (Doc-Verified / Vendor-Stated) · Fields 7–8 **Pending internal** (Stratos Edge agreement + portal registration)  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Deal Registration Process.md](../../../test/Glean/4.9.8 Partner & Channel Program/Deal Registration Process.md)

---

**Field definition:** Submission guidelines, lead protection windows, and approval timelines.  
**Prerequisites / Licensing:** Approved partner status; Partner Portal access.  
**Deal registration (Doc-Verified):** Portal-based **automated deal registration and partner protection**; referral eligibility ~**1 business day**.  
**Protection window (Pending Contract):** _TBD - "defined validity window" not published as days_  
**Confidence Level:** **Doc-Verified** (process exists) · **Pending Contract** (protection duration)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Partner Portal blog 2025](https://www.glean.com/blog/glean-partner-portal-2025) · [Referral program](https://www.glean.com/partners/referral) · [Partners FAQ](https://www.glean.com/partners)

### Registration flow

| Step | Referral track | Timeline |
|---|---|---|
| 1. Sign up | Partner application | 1–2 weeks review |
| 2. Register deal | Portal or referral form | Minimal fields |
| 3. Validation | Accept / reject / needs-info | **~1 business day** target (referral) |
| 4. Protection | "Defined validity window + confirmation" | Duration not public |
| 5. Progress | Track in portal | Glean drives sales process |

### Disqualifiers (Doc-Verified - referral)

- Account already in Glean pipeline
- Existing customer (expansion unless approved)
- Recent Glean sales engagement with buying center

### Engineering observation (Doc-Verified)

- SOW tier3 methodology cites **90-day** protection as example - **not confirmed** in Glean public docs; verify in portal agreement.
- Automated portal process reduces manual channel conflict vs email-based deal reg.

### Verification steps / test case

1. Register test opportunity in portal (or referral flow) - record eligibility response time.
2. Capture protection window days from approved agreement.
3. Test duplicate registration rejection (account already in pipeline).
4. Document escalation path for disputed attribution.

**Risk & Cost Impact:** Risk: Medium (unprotected deals lose commission) | Cost: N/A

---
