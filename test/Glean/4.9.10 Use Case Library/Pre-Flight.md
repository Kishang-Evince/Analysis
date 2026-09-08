# 4.9.10 Admin Test Guide — Glean Use Case Library

**Purpose:** Build and validate 8 cataloged use cases; update Field 10 YES/NO in eval log.  
**Companion eval log:** `Glean/Combined/4.9.10 Use Case Library/Overview.md`  
**Depends on:** 4.9.1 connector corpus (`Stratos_Connector_Test_*`), 4.9.1–4.9.9 findings.

**Tenant stack:** Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets.

---

## 0. Pre-Flight

1. All 7 connectors green (note: green ≠ fully indexed)
2. `Stratos_Connector_Test_Doc`, `_Sheet`, Notion page, Gmail+Outlook mail, Teams post exist
3. Admin A + User B accounts (ACL test)
4. Browser extension + Teams app deployed to pilot cohort
5. Optional: 10 Answers + 5 Go Links pre-seeded (UC-03, UC-06)
6. Insights Moderator for week-4 metrics (Field 8)

---

## Library validation matrix

| UC | Test ID | Run? | Pass? | Field 10 |
|---|---|---|---|---|
| UC-01 Cross-App Search | UC10-T01 | | | |
| UC-02 Cited Policy Q&A | UC10-T02 | | | |
| UC-03 Onboarding Discovery | UC10-T03 | | | |
| UC-04 Teams Lookup | UC10-T04 | | | |
| UC-05 Agent Summarize | UC10-T05 | | | |
| UC-06 Go Link Deflection | UC10-T06 | | | |
| UC-07 Email Prep | UC10-T07 | | | |
| UC-08 Compliance Retrieval | UC10-T08 | | | |

Pass = happy path complete, citations correct, no unhandled error. Partial = works with documented gap (crawl lag, OAuth).

---

## UC10-T01 — Cross-App Unified Search (UC-01)

**Deps:** All connectors indexed.

1. Search unique phrase from `Stratos_Connector_Test_Doc`
2. Filter by Google Drive — hit?
3. Filter by OneDrive — hit? (note lag)
4. Filter by Notion — hit?
5. Filter by Gmail or Outlook — hit?
6. User B: private Drive doc — **must NOT appear**

| Step | Result | Time (s) |
|---|---|---|
| 1–5 | | |
| 6 ACL deny | | |

Target: find doc **<60s**. Field 10 YES if steps 1–4 pass + ACL deny.

---

## UC10-T02 — Cited Policy & SOP Q&A (UC-02)

**Setup:** Upload `Exhibit_A_SOW_Stratos.pdf` or policy-like doc to Drive; note folder ACL.

1. Assistant prompt: *"What is the SOW scope for Stratos? Cite the document."*
2. Verify ≥1 citation with deep link
3. User B: prompt same — must not cite private doc
4. Downvote/upvote — log feedback path

| Citation valid? | ACL hold? | Upvote? |
|---|---|---|
| | | |

Field 10 YES if cited + ACL pass.

---

## UC10-T03 — New Hire Onboarding (UC-03)

**Setup (admin):**
1. Create Collection `Stratos Onboarding`
2. Add Drive doc, Notion page, Go Link `go/stratos-sow`
3. Create Answer: *"How do I access Stratos SOW?"* → Go Link

**User B test:**
1. Search Collection name — find all 3 assets?
2. Ask Assistant onboarding question — Answer surfaces?
3. Time to answer vs manual hunt (stopwatch)

| Asset in Collection? | Answer hit? | Time (s) |
|---|---|---|
| | | |

Field 10 YES if Collection + Answer resolve in <120s.

---

## UC10-T04 — Teams-Embedded Lookup (UC-04)

1. Open Teams → Glean app/sidebar
2. Query: `Stratos_Connector_Test` — results with citations?
3. Compare same query on web app — same top result?

| Teams result? | Matches web? | Sec |
|---|---|---|
| | | |

Field 10 YES if Teams returns cited result <90s.

---

## UC10-T05 — Auto Agent Summarization (UC-05)

1. Create Auto agent: *"Summarize Stratos_Connector_Test_Sheet and cite sources"*
2. Run as User A (OAuth complete)
3. Run as User B before OAuth — expect `tools_unauthorized` or graceful fail
4. Complete OAuth — rerun

| Run | Citations? | Error? |
|---|---|---|
| A | | |
| B pre-OAuth | | |
| B post-OAuth | | |

Field 10 YES if A succeeds with citations. Partial if OAuth gap only.

---

## UC10-T06 — Go Link + Answer Deflection (UC-06)

**Setup:**
1. Go Link `go/stratos-sow` → target doc
2. Answer for "Stratos SOW" FAQ

**Test:**
1. Extension: type `go/stratos-sow` — resolves?
2. Search FAQ phrase — Answer card appears?
3. (Optional) Compare ticket count week before/after — Field 8 metric

| Go Link? | Answer card? | Deflection logged? |
|---|---|---|
| | | |

Field 10 YES if both resolve without ticket.

---

## UC10-T07 — Email & Meeting Prep (UC-07)

**Setup:** Send test thread with subject `Stratos_Connector_Test_Meeting` via Gmail + Outlook; reference Drive doc in body.

1. Wait for mail index (note poll lag)
2. Assistant: *"Summarize my Stratos_Connector_Test_Meeting emails and related docs"*
3. Citations include mail + Drive?

| Mail indexed? | Summary + cites? | Lag (min) |
|---|---|---|
| | | |

Field 10 YES if mail + doc cited in one answer.

---

## UC10-T08 — Credentialing & Compliance Retrieval (UC-08)

**Setup (admin):**
1. Folder `Stratos_Credentialing_Packet` on Drive — sample policy PDF
2. Notion page (workspace-admin shared to integration only) — credentialing checklist
3. Collection `Compliance — Credentialing`

**Governance test:**
1. Share sensitive Notion page with integration — confirm User B sees (ACL gap probe)
2. Remove over-shared page; rebuild Collection
3. Search: *"credentialing requirements Stratos"* — Collection results + cited policy?

| Collection works? | ACL gap confirmed? | Cited policy? |
|---|---|---|
| | | |

Field 10 YES if search works **after** Notion segmentation. **NO** if only over-shared Notion path.

---

## Field 8 metrics capture (week 0 / week 4)

| UC | Metric | W0 | W4 |
|---|---|---|---|
| UC-01 | Time-to-find (5 users avg sec) | | |
| UC-02 | Assistant upvote % | | |
| UC-03 | New-hire repeat questions | | |
| UC-04 | Teams search sessions | | |
| UC-05 | Summary task time (min) | | |
| UC-06 | Go Link clicks / FAQ hits | | |
| UC-07 | Prep time (min) | | |
| UC-08 | Compliance retrieval time (min) | | |

Insights export: Coverage, Activity, Stickiness, downvote rate.

---

## Evidence → Eval Log mapping

| Work product | Eval field |
|---|---|
| UC10-T01–T08 pass matrix | Field 10 Validated Through Testing |
| Per-UC complexity hours | Field 6 Implementation Complexity |
| W0/W4 metrics | Field 8 Expected Outcome |
| Dependency blockers log | Field 9 Dependencies |
| Dept + industry tags | Fields 3–4 |

Update [`Glean/Combined/4.9.10 Use Case Library/Pre-Flight.md`](../../../Glean/Combined/4.9.10%20Use%20Case%20Library/Pre-Flight.md).

---

## Safety

1. UC-08: use **synthetic** credentialing content — no real PHI/PII.
2. Notion ACL gap test — delete disposable page after.
3. Do not mark Field 10 YES for healthcare claims/appeals (out of tenant stack).
4. Label Partial vs YES vs NO explicitly in eval log.

