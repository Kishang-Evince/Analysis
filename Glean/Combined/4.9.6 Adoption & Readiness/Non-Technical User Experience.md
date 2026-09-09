# Field 3: Non-Technical User Experience

**Category:** 4.9.6 - Adoption & Readiness  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 4 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for pilot cohort Insights, extension A/B, user task scores  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Non-Technical User Experience.md](../../../test/Glean/4.9.6 Adoption & Readiness/Non-Technical User Experience.md)

---

**Field definition:** Intuitive onboarding and daily usage for non-technical business employees.  
**Prerequisites / Licensing:** Teams app deployed; browser extension pushed; populate-content (Answers, Go Links) seeded.  
**UX rating (Doc-Verified):** **Strong when embedded** in Teams/extension/desktop - weak if SSO tile only.  
**Task scores (Pending Sandbox):** _TBD - 1–5 ratings from 4.9.1 Field 5 walkthrough_  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (business-user stopwatch scores)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Glean in Teams user guide](https://docs.glean.com/administration/platform/embedded-integrations/glean-in-teams/glean-in-microsoft-teams--user-guide) · [Glean Chat user guide](https://docs.glean.com/user-guide/assistant/glean-chat/) · [How to search](https://docs.glean.com/user-guide/search/how-to-search-in-glean) · [Populate content](https://docs.glean.com/get-started/golive/populate-content) · [Glean for desktop](https://docs.glean.com/user-guide/apps/glean-for-desktop) · [Deploy apps](https://docs.glean.com/get-started/golive/deploy-apps)

### Daily surfaces (tenant-relevant)

| Surface | Entry point | Business-user task | Friction |
|---|---|---|---|
| **Microsoft Teams** | Sidebar app, pinned | Ask policy question with citations | Install + pin required |
| **Browser extension** | New tab, sidebar, native Drive search | Find doc without opening app.glean.com | IT deploy push |
| **Desktop app** | `Ctrl+Shift+J` quick entry | Quick search from any app | Optional install |
| **Web app** | app.glean.com / SSO tile | Full Assistant + Search | High friction if only path |
| **Outlook** | Federated search in Assistant | "Emails from manager about Q4" | Permission-aware; indexing limits |
| **Mobile** | iOS/Android apps | Search on the go | Out of baseline eval |

### Pre-launch content seeding (Doc-Verified)

- Go-live docs recommend **10 Answers + 5 Go Links** for HR/ops FAQs (PTO, WFH, benefits) - reduces blank-slate for non-technical staff.
- Conversational UX: single bar for keyword + natural language; citations from permitted Drive/Notion/Outlook sources.

### Engineering observation (Doc-Verified)

- Teams Gleanbot interactions count as **active usage** in Insights - good adoption metric for M365-heavy tenants.
- Notion indexed content org-wide visible - business users may get surprising results if admins over-shared (4.9.5 Field 6).
- Gmail 6-month / 5K-thread default may confuse users searching older mail - set kickoff expectations.

### Verification steps / test case

1. **User B hat:** Teams sidebar - *"What is our PTO policy?"* - find Answer or Drive/Notion citation in <60s.
2. Extension: native Drive search for `Stratos_Connector_Test_Doc`.
3. Outlook/Gmail natural-language query - confirm permission-aware results.
4. Score layout/latency/friction 1–5 per 4.9.1 Field 5 scorecard rows 1–2, 7.
5. Ask: *Can non-admin finish search + chat without training?*

**Risk & Cost Impact:** Risk: Low (with extension + Teams) / High (SSO-only) | Cost: Native

---
