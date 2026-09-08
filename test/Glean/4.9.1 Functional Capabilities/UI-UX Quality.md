# Field 5 — UI/UX Quality

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [UI-UX Quality.md](../../../Glean/Combined/4.9.1 Functional Capabilities/UI-UX Quality.md)

---

**Goal:** 1–5 ratings for Admin + end-user surfaces.  
**Write results to:** eval log Field 5 scorecard.

### Walkthrough matrix

| # | Surface | Task | Layout 1–5 | Latency 1–5 | Friction 1–5 | Min | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Home / Search | Find `Stratos_Connector_Test_Doc` <60s | | | | | |
| 2 | Chat / Assistant | Ask + open Drive citation | | | | | Paste URL if lag |
| 3 | Agent Builder | Create + run Auto agent | | | | | OAuth for tools |
| 4 | Admin Connectors | OneDrive/Notion health + crawl | | | | | Green ≠ indexed |
| 5 | Model Hub | View / enable model | | | | | |
| 6 | Users & permissions | Invite User B + roles | | | | | Was "Identity" in docs |
| 7 | Go Links / People | `go/stratos-sow` + people search | | | | | Extension needed? |

### Known friction to validate (pre-documented)
- Users & permissions nav rename vs docs
- Notion personal-account setup mismatch
- Connector green check vs crawl lag (OneDrive/Notion)
- Per-user OAuth before agent tools (`tools_unauthorized`)

### Method
1. User B hat: rows 1–2, 7. Admin A hat: rows 3–6.
2. Stopwatch each task; score 1–5.
3. ≤3 friction screenshots.
4. Mean scores → eval log; answer: *Can non-admin finish search + chat without training?*

---
