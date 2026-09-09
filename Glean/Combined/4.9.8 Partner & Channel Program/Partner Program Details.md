# Field 1: Partner Program Details

**Category:** 4.9.8 - Partner & Channel Program  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** Fields 1–6 drafted (Doc-Verified / Vendor-Stated) · Fields 7–8 **Pending internal** (Stratos Edge agreement + portal registration)  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Partner Program Details.md](../../../test/Glean/4.9.8 Partner & Channel Program/Partner Program Details.md)

---

**Field definition:** Structure, tiers, and certification pathways of the vendor's partner ecosystem.  
**Prerequisites / Licensing:** Glean Partner Network application at `partners.glean.com`.  
**Program structure (Doc-Verified / Vendor-Stated):** **Glean Partner Network** - four pathways, four ecosystem classifications, certification + Boost Camps; **no fee to join**.  
**Stratos pathway (Pending internal):** _TBD - Referral vs Commercial vs Services & Solutions_  
**Confidence Level:** **Doc-Verified** (structure) · **Vendor-Stated** (tier names not fully public)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Partners](https://www.glean.com/partners) · [Glean Partner Network blog](https://www.glean.com/blog/glean-partner-network) · [Referral program](https://www.glean.com/partners/referral) · [Partner Portal blog 2025](https://www.glean.com/blog/glean-partner-portal-2025) · [Partner Finder](https://www.glean.com/partners/partner-finder)

### Program architecture

| Dimension | Documented structure |
|---|---|
| **Program name** | Glean Partner Network (global) |
| **Partner pathways** | Referral · Commercial · Services & Solutions · Technology (multiple simultaneous OK) |
| **Ecosystem classifications** | Cloud Providers · Consulting & GSI · Value-Added Resellers · Technology Partners |
| **Certifications** | 2,000+ accreditations (Vendor-Stated); competencies in Agent Building, Custom Connectors, Embedded Experiences |
| **Training** | Self-service baseline + tiered **Boost Camps** |
| **Onboarding** | Apply → review **1–2 weeks** → Partner Portal + partner manager assigned |
| **Join fee** | **None** documented |

### Named strategic partners (Vendor-Stated logos)

AWS, Microsoft, Google Cloud, Carahsoft, Databricks, Snowflake, AHEAD, Caylent, Softcat, Alchemy Tech Group, and others on `/partners`.

### Engineering observation (Doc-Verified)

- Public pages reference **"tier"** incentives but do **not** publish Silver/Gold/Platinum ladder names - portal login required for full tier definitions.
- Healthcare listed as supported vertical for partner implementations - relevant to Perimeter Healthcare advisory context.
- Partner Finder lists **~84 partners** - open multi-partner ecosystem, not exclusive franchise model.

### Verification steps / test case

1. Review `/partners` and partner-network blog for pathway fit (Stratos likely **Services & Solutions** or **Referral** initially).
2. Submit application at `partners.glean.com` - record review timeline.
3. After approval: capture tier name, cert requirements, and partner manager contact in portal.
4. Cross-check Partner Finder for competitive density in target geography.

**Risk & Cost Impact:** Risk: Low | Cost: No join fee documented

---
