# Field 1: Training Infrastructure

**Category:** 4.9.6 - Adoption & Readiness  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 4 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for pilot cohort Insights, extension A/B, user task scores  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Training Infrastructure.md](../../../test/Glean/4.9.6 Adoption & Readiness/Training Infrastructure.md)

---

**Field definition:** Availability of developer academies, certifications, and documentation.  
**Prerequisites / Licensing:** Gleaniverse / Academy access; partner program separate from end-user.  
**Training rating (Doc-Verified):** **Strong docs + Academy**; partner technical certifications; **no public end-user cert program** documented.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (Academy enrollment path for tenant)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Get started welcome](https://docs.glean.com/get-started/welcome) · [Post-launch tasks](https://docs.glean.com/get-started/start/post-launch-tasks) · [Glean Academy S1](https://www.glean.com/academy-s1) · [Glean Academy S2](https://www.glean.com/academy-s2) · [Partners / certifications](https://www.glean.com/partners) · [Client API getting started](https://developers.glean.com/api-info/client/getting-started/overview) · [Prompting 101 eBook](https://www.glean.com/resources/guides/glean-ebook-prompting-101) · [How agents work](https://docs.glean.com/agents/how-agents-work)

### Training asset inventory

| Asset type | What exists | Audience | Tenant relevance |
|---|---|---|---|
| **Glean Academy (Gleaniverse)** | Self-paced Agent Builder course; Season 1/2 guest lectures (AI adoption, ROI, change leadership) | Admins, builders, champions | Post-launch learning path |
| **Official docs** | 6-stage admin lifecycle; 100+ user-guide articles; developers.glean.com API docs | Admin + end-user + developer | Primary reference |
| **Partner certifications** | Structured learning paths for implementation partners | SI/consulting partners | Stratos Edge enablement path |
| **Rollout collateral** | Survey templates, kickoff/office-hours agendas, email templates, Prompting 101 eBook | Change champions | Non-technical enablement |
| **End-user certification** | **Not documented** | - | Gap vs Salesforce-style cert programs |
| **In-product onboarding** | Populate-content (Answers, Go Links), extension deploy guides | Business users | Reduces blank-slate friction |

### Engineering observation (Doc-Verified)

- Academy Agent Builder course linked from agent docs - aligns with 4.9.2 builder eval.
- Developer training is API/SDK focused; business-user training is user-guide + eBook + rollout playbook, not formal LMS with completion badges for employees.
- Gleaniverse Support Center requires **separate account** - not SSO-integrated with tenant by default (adoption friction in Field 2).

### Verification steps / test case

1. Enroll pilot admin in Glean Academy Agent Builder - confirm course access + completion tracking.
2. Walk business user through search user-guide + Assistant best practices with Notion/OneDrive query.
3. Inventory rollout collateral available from account team (surveys, email templates).
4. Confirm whether Stratos partner cert path is active (4.9.8 cross-ref).

**Risk & Cost Impact:** Risk: Low | Cost: Native (Academy free); partner cert may have program fees

---
