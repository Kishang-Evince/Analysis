# Field 4: Resistance & Failure Signals

**Category:** 4.9.6 - Adoption & Readiness  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 4 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for pilot cohort Insights, extension A/B, user task scores  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Resistance & Failure Signals.md](../../../test/Glean/4.9.6 Adoption & Readiness/Resistance & Failure Signals.md)

---

**Field definition:** System bottlenecks or user-adoption failures that could trigger project termination.  
**Prerequisites / Licensing:** Admin go-live checklist complete; people data uploaded; connectors healthy.  
**Failure risk rating (Doc-Verified):** **Documented bottleneck catalog** + Insights diagnostic framework; no published abandonment rate benchmarks.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (28-day cohort abandonment proxy)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Items to prepare](https://docs.glean.com/get-started/prepare/items-to-prepare) · [Roll out to teammates](https://docs.glean.com/get-started/golive/roll-out-glean-to-teammates) · [Launch preparation](https://docs.glean.com/get-started/golive/launch-preparation) · [Assistant Insights](https://docs.glean.com/administration/insights/assistant-insights) · [People data issues](https://docs.glean.com/administration/identity/people-data/troubleshooting/people-data-issues) · [Notion choose your setup](https://docs.glean.com/connectors/native/notion/choose-your-setup) · [MAU exceeds employees](https://docs.glean.com/administration/insights/mau-exceeds-employees)

### Documented failure triggers

| Bottleneck | Impact | Tenant stack note |
|---|---|---|
| **App-owner / security approval delays** | Go-live slip | M365 cert + Entra consent for Outlook/OneDrive/Teams |
| **Connecting every app upfront** | Delays training and user access | Staged connector rollout recommended |
| **People-data gaps** | Broken search relevance, org chart, Insights segmentation | "Attention required" flags in Admin |
| **Skipping 5-step admin checklist** | SSO assignment, invites, extension gaps | Unassigned IdP users cannot access Glean |
| **Missing connectors at kickoff** | Users expect content Glean cannot surface | Set expectation: only connected apps searchable |
| **Poor source data / ambiguous prompts** | "Not helpful" feedback — not auto-fixed | Downvote tracking in Assistant Insights |
| **Notion over-share** | Trust erosion — wrong content visible org-wide | Governance failure signal |
| **ML indexing incomplete** | 2–14 day gate before full usage | Users abandon during empty-index period |

### Insights abandonment proxy framework

| Pattern | Likely cause | Remediation (doc) |
|---|---|---|
| Low Coverage | Awareness | Comms + extension deploy |
| Coverage OK, Activity low | Training / use-case gap | Office hours, Answers, champions |
| Activity OK, Stickiness low | Not embedded in workflow | Teams sidebar, Go Links, agents |
| High downvote rate | Answer quality / connector gaps | Fix connectors, populate content, Protect |

### Engineering observation (Doc-Verified)

- No packaged change-management methodology beyond rollout playbook — customer owns comms cadence.
- Kickoff must explicitly state Glean won't surface unconnected apps — prevents false failure attribution.
- 28-day cohort with signup but zero qualifying active actions = abandonment proxy for sandbox measurement.

### Verification steps / test case

1. Introduce people-data gap (missing dept) — confirm Admin flag + degraded Insights.
2. Query content from unconnected source — verify poor/empty results match kickoff messaging.
3. Track pilot cohort 28 days — flag signup + zero active actions.
4. Monitor downvote spike after intentional Notion misconfiguration test (disposable content).
5. Document connector approval timeline for M365 stack vs 1–3 week deployment baseline.

**Risk & Cost Impact:** Risk: **High** if people-data + M365 approval + Notion governance skipped | Cost: Professional services for rescue rollout
