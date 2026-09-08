# Field 2: Adoption Friction Signals

**Category:** 4.9.6 - Adoption & Readiness  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 4 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for pilot cohort Insights, extension A/B, user task scores  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Adoption Friction Signals.md](../../../test/Glean/4.9.6 Adoption & Readiness/Adoption Friction Signals.md)

---

**Field definition:** Indicators of employee resistance or structural workflow friction during pilot setups.  
**Prerequisites / Licensing:** Insights Moderator role; pilot cohort 100–300 users per go-live docs.  
**Friction diagnostic framework (Doc-Verified):** Staggered pilot + survey gates; Insights Coverage/Activity/Stickiness; documented SSO-only access friction.  
**Pilot metrics (Pending Sandbox):** _TBD — 4-week pilot Insights export_  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (measured drop-off)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Launch preparation](https://docs.glean.com/get-started/golive/launch-preparation) · [Post-launch tasks](https://docs.glean.com/get-started/start/post-launch-tasks) · [Deploy apps](https://docs.glean.com/get-started/golive/deploy-apps) · [Insights overview](https://docs.glean.com/administration/insights/overview) · [Departments and managers insights](https://docs.glean.com/administration/insights/departments-and-managers/) · [User feedback troubleshooting](https://docs.glean.com/troubleshooting/user-feedback) · [Support center](https://docs.glean.com/troubleshooting/support-center/)

### Documented friction signals

| Signal | Source | Interpretation |
|---|---|---|
| **SSO tile / app.glean.com only** | Deploy apps doc: *"significant friction… lead to poor adoption"* | Must deploy browser extension + Teams/desktop apps |
| **Pilot survey gate** | Post-launch: wave-2 expansion gated on ~4-week follow-up survey (~80% response target) | Explicit drop-off checkpoint |
| **Low Coverage** | Signups / Employees | Awareness problem |
| **High Coverage + low Activity** | MAU / Signups | Signed up but not using — training/use-case gap |
| **High Activity + low Stickiness** | WAU / MAU | No weekly habit — embedding problem |
| **Downvote rate** | Assistant Insights + user feedback routing to admins | Answer quality friction |
| **Support portal split** | Gleaniverse requires new account; tickets limited to Designated Support Contacts | Support access friction |

### Engineering observation (Doc-Verified)

- Docs describe **diagnostic framework** but publish **no benchmark drop-off percentages** — tenant must measure.
- Departments/Managers Insights flags users who signed up but don't use regularly.
- Tenant-specific friction from prior eval: Notion share model, OneDrive crawl lag, per-user OAuth for tools — amplify pilot abandonment if not pre-communicated.

### Verification steps / test case

1. Run 50–100 user pilot; at week 4 send follow-up survey before wave-2.
2. Export Insights Coverage, Activity, Stickiness for pilot dept vs org.
3. A/B: half pilot gets extension new-tab deploy — compare Stickiness after 2 weeks.
4. Submit Assistant downvote — confirm admin notification + Insights downvote rate movement.
5. Log support ticket friction (Designated Contact requirement).

**Risk & Cost Impact:** Risk: Medium (pilot stall without extension deploy) | Cost: Native

---
