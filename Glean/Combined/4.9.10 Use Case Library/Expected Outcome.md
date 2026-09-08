# Field 8: Expected Outcome

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
**Companion test guide:** [Expected Outcome.md](../../../test/Glean/4.9.10 Use Case Library/Expected Outcome.md)

---

**Field definition:** Target metrics, deflection rates, or productivity savings achieved.  
**Prerequisites / Licensing:** Insights Moderator; GCE logs for agent metrics (optional).  
**Confidence Level:** **Pending Sandbox** · Vendor-Stated benchmarks flagged  
**Validation Date:** September 3, 2026  
**Source URLs:** [Insights data dictionary](https://docs.glean.com/administration/gce-logs/data-dictionary-examples) · [Healthcare solutions](https://www.glean.com/solutions/industries/healthcare)

| ID | Target metric | Measurement source | Baseline (Pending) | Target (pilot) |
|---|---|---|---|---|
| UC-01 | Time-to-find doc | Stopwatch task (5 users) | TBD | **<60s** (4.9.1 UX target) |
| UC-02 | Answer usefulness | Assistant upvote rate | TBD | **>70%** upvote |
| UC-03 | Onboarding questions to manager | New-hire survey | TBD | **-30%** repeat asks |
| UC-04 | Teams-side search sessions | Insights embedded search | TBD | **+25%** vs web-only cohort |
| UC-05 | Manual summary time | Task timing | TBD | **-50%** vs manual |
| UC-06 | L1 ticket deflection | ITSM count (if integrated) / Go Link clicks | TBD | **10–15%** FAQ deflection (Vendor-Stated range) |
| UC-07 | Pre-meeting prep time | Rep self-report + timing | TBD | **-20–30 min/meeting** |
| UC-08 | Audit prep doc retrieval time | Compliance team timing | TBD | **-40%** retrieval time |

### Insights KPIs (cross-UC)

| Metric | Definition | Healthy pilot signal |
|---|---|---|
| Coverage | Signups / Employees | >80% |
| Activity | MAU / Signups | >50% |
| Stickiness | WAU / MAU | >40% |
| AI answer feedback | Upvote / (up+down) | >70% |

### Verification steps / test case

1. Capture week-0 baseline per UC metric before pilot.
2. Export GCE chat citation + agent lifecycle logs at week 4.
3. Do not quote vendor ROI % in client materials without tenant measurement.

**Risk & Cost Impact:** Risk: Low | Cost: Native (Insights included)

---
