# Field 7: Time to Value Estimate

**Category:** 4.9.10 - Use Case Library  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** 8 use cases cataloged (Doc-Verified baseline) · Field 10 sandbox validation **Pending** for 6 of 8 · ROI metrics Pending pilot  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Library scope:** Use cases executable on tenant stack; healthcare ops variants where EHR/CRM not required.  
**Synthesis basis:** Fields 4.9.1–4.9.9 + Glean solutions/docs corpus.  
**Out of tenant stack (documented, not evaluated):** Claims/appeals automation (needs billing/claims systems), Zendesk ticket triage (needs ServiceNow/Zendesk), Deep Research strategic reports (web + multi-connector; admin enable required).
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Time to Value Estimate.md](../../../test/Glean/4.9.10 Use Case Library/Time to Value Estimate.md)

---

**Field definition:** Expected months to achieve measurable adoption and ROI.  
**Prerequisites / Licensing:** Pilot 100–300 users per Glean go-live docs.  
**Confidence Level:** **Doc-Verified** (methodology) · **Pending Sandbox** (measured)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Launch preparation](https://docs.glean.com/get-started/golive/launch-preparation) · [Post-launch tasks](https://docs.glean.com/get-started/start/post-launch-tasks) · Cross-ref [4.9.6 Field 2](../4.9.6%20Adoption%20&%20Readiness/Overview.md)

| ID | Connector ready → first value | Measurable ROI horizon | Adoption dependency |
|---|---|---|---|
| UC-01 | **Week 1–2** (post-index) | Month 1–2 | Extension/Teams deploy |
| UC-02 | **Week 2** | Month 1–2 | Answer quality; downvote rate |
| UC-03 | **Week 4–6** (content curated) | Month 2–3 | HR champion + Collection completeness |
| UC-04 | **Week 2–3** | Month 1–2 | Teams pin habit |
| UC-05 | **Week 3–6** | Month 2–4 | Agent publish + OAuth completion |
| UC-06 | **Week 4–6** | Month 2–3 | Top 20 FAQs authored |
| UC-07 | **Week 3–5** | Month 2–4 | Mail crawl lag (Gmail poll) |
| UC-08 | **Week 6–10** | Month 3–6 | Governance + folder hygiene |

### Glean rollout phases (Doc-Verified)

1. **Weeks 0–2:** Connectors + people-data + SSO  
2. **Weeks 2–4:** Pilot cohort + extension + populate Answers/Go Links  
3. **Week 4+:** Insights gate before wave-2 expansion (~80% survey response)

### Verification steps / test case

1. Set UC-specific success date: first cited answer / first agent run / first Go Link hit.
2. Insights: Coverage + Activity thresholds at week 4 per UC champion dept.
3. Record crawl-lag impact on UC-07 TTV (Gmail/OneDrive).

**Risk & Cost Impact:** Risk: Medium (adoption delay) | Cost: Delayed ROI

---
